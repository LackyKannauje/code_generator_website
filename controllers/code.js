const BardAPI = require("../src/ai_chat");
require("dotenv").config();

async function testAssistant(msg) {
  try {
    const bard = new BardAPI();
    const apiKey = process.env.API_KEY;
    bard.initializeChat(apiKey);

    const response = await bard.getBardResponse(msg);
    const resp = response.text;
    if (resp.startsWith("[GoogleGenerativeAI Error]") == true)
      return "Please Try Again Later!!";
    return resp;
  } catch (error) {
    return "Please Try Again Later!!";
  }
}

async function handleCodeReqRes(req, res) {
  const { query, language } = req.body;
  try {
    const getCode = async (query, language, level) => {
      const prompt = `Write a program for ${query} in ${language} language ${level} solution, only give me the code even do not give any other words`;
      const response = await testAssistant(prompt);
      const removeFront = response.split("```" + language)[1] + "end";
      return removeFront.split("```end")[0];
    };

    const [code1, code2, code3] = await Promise.all([
      getCode(query, language, "brute force"),
      getCode(query, language, "better"),
      getCode(query, language, "optimal"),
    ]);

    res.render("home", { code1, code2, code3, language });
  } catch (error) {
    res.send("Error");
  }
}

module.exports = { handleCodeReqRes };
