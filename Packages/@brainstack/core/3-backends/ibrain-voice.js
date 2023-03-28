const express = require("express");
const multer = require("multer");
const axios = require("axios");
const FormData = require("form-data");
const cors = require('cors')
const {OpenAIApi} = require('openai')

const app = express();
app.use(cors)
// Initialize multer middleware for handling file uploads
const upload = multer({ storage: multer.memoryStorage() });
const apiKey = "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"

app.use(express.static('/', { root: __dirname }));

// Define an endpoint for receiving speech data
app.post("/speech", upload.single("file"), async (req, res) => {

  try {
    // Extract the uploaded file and OpenAI token from the request
    const file = req.file;
    const token = req.body.token;

    // Prepare form data for OpenAI transcription API
    const formData = new FormData();
    formData.append("file", file.buffer, file.originalname);
    formData.append("model", "whisper-1");

    // Fetch transcription from OpenAI API using axios
    const intentions = await axios.post(
      "https://api.openai.com/v1/audio/transcriptions",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          ...formData.getHeaders(), // Set the headers for the form data
        },
      }
    );

    // Prepare conversation history data
//    conversationHistory.push({ role: "user", content: intentions.text })

    // Perform additional processing, e.g., axios.post(this.conversationAPI)...
    // const openai = new OpenAIApi({apiKey});
    // const answer = openai.ChatCompletion.create(
    //   model="gpt-3.5-turbo",
    //   messages=language_sematic(answer.text)
    // )

    // Prepare conversation history data
 //   conversationHistory.push({ role: "assistant", content: answer.text })
    // Send a response to the client
    res.status(200).json({ success: true, data: language_sematic(answer.text)});

  } catch (error) {
    // Handle errors
    res.status(500).json({ success: false, error: error.message });
  }

});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});