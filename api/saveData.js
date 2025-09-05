import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { name, nickname } = req.body;

    if (!name || !nickname) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const GAS_URL = https://script.google.com/macros/s/AKfycbwcQTpUc-Nwe7uKHWtQfCp3zIjwB5ofUBDMJd39WeXGEsz6Ie2LcrN_QzJX6MaMfs73/exec";

    const response = await fetch(GAS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, nickname }),
    });

    const text = await response.text();
    let data;
    try {
      data = JSON.parse(text); // Apps Script가 JSON 응답일 때
    } catch {
      data = { raw: text };    // JSON 파싱 실패 시 원문 그대로 반환
    }

    if (!response.ok) {
      return res.status(response.status).json({ error: data });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Server error: " + error.message });
  }
}
