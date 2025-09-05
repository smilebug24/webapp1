export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { name, nickname } = req.body || {};

    if (!name || !nickname) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const GAS_URL = " https://script.google.com/macros/s/AKfycbwcQTpUc-Nwe7uKHWtQfCp3zIjwB5ofUBDMJd39WeXGEsz6Ie2LcrN_QzJX6MaMfs73/exec";

    const response = await fetch(GAS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, nickname }),
    });

    const text = await response.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = { raw: text };
    }

    if (!response.ok) {
      return res.status(response.status).json({ error: data });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error("❌ API error:", error);
    res.status(500).json({ error: "Server error: " + error.message });
  }
}
