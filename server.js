const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/bfhl", (req, res) => {
  return res.status(200).json({ operation_code: 1 });
});

app.post("/bfhl", (req, res) => {
  const { data } = req.body;

  if (!Array.isArray(data)) {
    return res.status(400).json({ is_success: false, message: "Format wrong" });
  }

  const numbers = data.filter((item) => !isNaN(item));
  const alphabets = data.filter((item) => isNaN(item));
  const highest_alphabet = alphabets.length > 0 ? [alphabets.reduce((a, b) => (a > b ? a : b))] : [];

  let file_valid = false;
  let file_mime_type = null;
  let file_size_kb = 0;

  if (req.files && req.files.file) {
    const file = req.files.file;

    try {
      const fileBuffer = Buffer.from(file.data, "base64");
      file_valid = true;
      file_mime_type = file.mimetype;
      file_size_kb = Math.round(fileBuffer.length / 1024);
    } catch (error) {
      console.error("Error processing file:", error);
      file_valid = false;
    }
  }

  const response = {
    is_success: true,
    user_id: "varunkuna07",
    email: "varunkuna0407@gmail.com",
    roll_number: "RA2111003020365",
    numbers,
    alphabets,
    highest_alphabet,
    file_valid,
    file_mime_type,
    file_size_kb
  };

  res.json(response);
});

app.listen(port, () => {
  console.log(`Running at http://localhost:${port}`);
});
