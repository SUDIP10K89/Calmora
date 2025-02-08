const { GoogleGenerativeAI } = require("@google/generative-ai");


const main = async () => {
const genAI = new GoogleGenerativeAI("AIzaSyAMX9ddgvDVMc8pyogB6W-ItDEtL0ovNDs");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const prompt = "What is the meaning of life?";

const result = await model.generateContent(prompt);

console.log(result.response.text());
}

main();