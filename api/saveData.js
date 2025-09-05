import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { name, nickname } = req.body;

    const GAS_URL = "https://script.google.com/macros/s/AKfycby0NgbqZkAjn4ybTUTGOI0ghOLLxiYW5TPPwxTDBTyH6Z8A3Z8RciMl2oRKvgyyz5yN/exec";

    const response = await fetch(GAS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, nickname }),
    });

    const text = await response.text();
    res.status(200).json({ result: text });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
