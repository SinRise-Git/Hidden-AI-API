const express = require('express');
const { google } = require('googleapis');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/getAccessToken', async (req, res) => {
  try {;
    const client = new google.auth.JWT(
      req.body.client_email,
      null,
      req.body.private_key,
      ['https://www.googleapis.com/auth/cloud-platform']
    );
    const { token } = await client.getAccessToken();
    res.json({ accessToken: token });
  } catch (error) {
    console.error('Error obtaining access token:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(3000, () => {
  console.log(`Server is running!`);
});