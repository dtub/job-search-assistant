export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { messages, max_tokens = 1200 } = req.body;
    const prompt = messages.map(m => m.content).join('\n\n');

    // First pass: extract company name from the prompt
    const isAssessment = prompt.includes('SUMMARY_CHECKS');
    let companyContext = '';

    if (isAssessment) {
      const extractRes = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: `Extract only the company name from this job description. Return just the company name, nothing else.\n\n${prompt}` }] }],
            generationConfig: { maxOutputTokens: 20 }
          })
        }
      );
      const extractData = await extractRes.json();
      const companyName = extractData.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

      if (companyName && companyName.length < 60) {
        // Second pass: get company context using Google Search grounding
        const searchRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: `In 3 sentences, describe ${companyName}: what they do, their industry/mission, company size, and funding stage if known. Be factual and concise.` }] }],
              tools: [{ googleSearch: {} }],
              generationConfig: { maxOutputTokens: 150 }
            })
          }
        );
        const searchData = await searchRes.json();
        const searchText = searchData.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
        if (searchText) {
          companyContext = `\n\nCOMPANY CONTEXT (from web search):\n${searchText}`;
        }
      }
    }

    // Main assessment call
    const finalPrompt = prompt + companyContext;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: finalPrompt }] }],
          generationConfig: { maxOutputTokens: max_tokens }
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data.error?.message || 'API error' });
    }

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    return res.status(200).json({ content: [{ text }] });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
