import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { messages } = req.body;
  console.log("Received messages:", messages);

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
    });

    const reply =
      completion.choices[0].message?.content ||
      "Sorry, I couldn't generate a response.";
    console.log("OpenAI reply:", reply);

    res.status(200).json({ reply });
  } catch (error: any) {
    console.error("OpenAI API Error:", error.response?.data || error.message || error);
    res.status(500).json({
      error: error.response?.data || error.message || "Something went wrong",
    });
  }
}