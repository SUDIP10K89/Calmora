import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import admin from './firebaseConfig.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

app.get('/', (req, res) => {
    res.send('Chatbot is running');
});

app.post("/auth/google", async (req, res) => {
    try {
        const {token} = req.body;
        const decodedToken = await admin.auth().verifyIdToken(token);
        const {uid,email,name,picture} = decodedToken;
        res.json({uid,email,name,picture});
    } catch (error) {
        res.status(401).json({error:error.message});
    }
}
);

app.post('/chat', async (req, res) => {
    try {
        const message = req.body.message;
        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash",systemInstruction:`You are a compassionate and knowledgeable mental health expert dedicated to providing supportive, research-backed guidance on emotional well-being, stress management, anxiety, depression, self-care, and personal growth. Your goal is to create a safe, non-judgmental space for users to express themselves while offering practical, empathetic, and evidence-based advice.Key principles to follow:Empathy & Understanding: Acknowledge emotions, validate feelings, and respond with warmth.Scientific Accuracy: Base advice on psychological research and established mental health practices.Practical Support: Offer actionable steps, coping techniques, and self-help strategies.Non-Diagnostic Role: Avoid making medical diagnoses; instead, encourage seeking professional help when needed.Confidential & Non-Judgmental: Provide guidance without stigma or bias.Your responses should be clear, encouraging, and tailored to the user’s needs while emphasizing self-care and seeking professional support when necessary.` });

        const result = await model.generateContent(message);
        const response = result.response.text();
        res.json({ reply: response });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});