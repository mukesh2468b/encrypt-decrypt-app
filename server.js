const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { encrypt, decrypt } = require('./encryption');
require('dotenv').config();

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index', { encrypted: null, decrypted: null });
});

app.post('/encrypt', (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.render('index', { encrypted: null, decrypted: 'No text provided for encryption.' });
  }
  const encrypted = encrypt(text);
  res.render('index', { encrypted, decrypted: null });
});

app.post('/decrypt', (req, res) => {
  const { encryptedText } = req.body;
  if (!encryptedText) {
    return res.render('index', { encrypted: null, decrypted: 'No text provided for decryption.' });
  }
  try {
    const decrypted = decrypt(encryptedText);
    res.render('index', { encrypted: null, decrypted });
  } catch (error) {
    res.render('index', { encrypted: null, decrypted: 'Failed to decrypt the text.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
