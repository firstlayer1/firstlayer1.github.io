import express from "express";
import cors from "cors";
import { OAuth2Client } from "google-auth-library";

const app = express();

// Replace this with your Google Client ID
const CLIENT_ID = "891808987477-m07uj9nprpccd0v70cc5i393e7u3solt.apps.googleusercontent.com";
const client = new OAuth2Client(CLIENT_ID);

app.use(cors());
app.use(express.json());

// Handle Google login
app.post("/api/auth/google", async (req, res) => {
  const token = req.body.id_token;
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    });
    const payload = ticket.getPayload();
    res.json({ ok: true, user: payload });
  } catch (err) {
    console.error("Token verification failed:", err);
    res.status(400).json({ ok: false, error: "Invalid token" });
  }
});

app.listen(3000, () => {
  console.log("✅ Server running on http://localhost:3000");
});
