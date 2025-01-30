const express = require("express");
const cors = require("cors");
const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config(); // Load environment variables from .env file

const app = express();
const port = 5000;

// Middleware setup
app.use(cors());
app.use(express.json());

// OpenAI API configuration
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // Use the API key from the .env file
});
const openai = new OpenAIApi(configuration);

// In-memory conversation history
let conversationHistory = [];

// API endpoint to handle user queries
app.post("/api/query", async (req, res) => {
  const { query } = req.body;

  // Validate the query
  if (!query) {
    return res.status(400).json({ error: "Query is required" });
  }

  try {
    // Prepare messages for OpenAI API
    const messages = conversationHistory.map((msg) => ({
      role: msg.type === 'bot' ? 'assistant' : msg.type,
      content: msg.text,
    }));

    messages.push({ role: "user", content: query });

    // Send the query to OpenAI API
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo", // Use a valid model here
      messages: messages,
    });

    const aiResponse = response.data.choices[0].message.content;

    // Update conversation history
    conversationHistory.push({ text: query, type: "user" });
    conversationHistory.push({ text: aiResponse, type: "assistant" });

    // Send the response back to the frontend
    res.json({ reply: aiResponse, history: conversationHistory });
  } catch (error) {
    console.error("Error:", error.response ? error.response.data : error.message);
    res.status(500).json({ error: "Failed to get response from AI" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
