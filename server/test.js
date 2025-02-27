import { GoogleGenerativeAI } from "@google/generative-ai";


const main = async () => {
const genAI = new GoogleGenerativeAI("AIzaSyAKE1coDSooLqj799HWabxV4HM89tu77mc");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const prompt = "What is the meaning of life?";

const result = await model.generateContent(prompt);

console.log(result.response.text());
}

main();