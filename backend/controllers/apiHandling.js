const History = require("../models/History");
const Groq = require("groq-sdk")

exports.Humanize = async (req, res) => {
   try {
      const content = req.body.content;
      const ip = req.ip;

      if(!ip) return res.status(404).json({success:false,message:"Ip address not found"});

      if (content.trim() === "" || !content)
         return res.status(400).json({
         success: false,
         message: "PLease send content along with the req.",
      });

      const groq = new Groq({
         apiKey: process.env.GROQ_API,
      });

      const chatCompletion = await groq.chat.completions.create({
         messages: [
         {
            role: "user",
            content: `You are a skilled writer with the ability to transform robotic, overly formal, or technical text into natural, 
            human-like, and conversational language. Rewrite the following content to sound like it’s written by a real person—engaging,
            clear, and friendly—while preserving the original meaning. Avoid jargon, stiff phrasing, and excessive complexity. Make 
            it flow naturally as if someone were speaking or writing it casually but clearly. Here is the text:${content}`,
         },
         ],
         model: "llama-3.3-70b-versatile",
         temperature: 1,
         max_tokens: 1024, 
         top_p: 1,
         stream: false,
         stop: null,
      });

      const payload = {
         userIp : ip,
         method:"humanize",
         originalText:content,
         outputText :  chatCompletion.choices[0].message.content,
         isFavorite:false
      }

      const historyData = await History.create(payload);

      return res.status(200).json({
         success: true,
         message: "Text humanized successfully",
         data:historyData,
      });
   } catch (e) {
      console.log(e);
      return res
         .status(500)
         .json({ success: false, message: "Error occuren in simplifing message" });
   }
};

exports.Summarize = async (req, res) => {
   try {
      const content = req.body.content;

      const ip = req.ip;
      if(!ip) return res.status(404).json({success:false,message:"Ip address not found"});

      if (content.trim() === "" || !content )
         return res.status(400).json({
         success: false,
         message: "PLease send content along with the req.",
      });

      const groq = new Groq({
         apiKey: process.env.GROQ_API,
      });

      const chatCompletion = await groq.chat.completions.create({
         messages: [
         {
            role: "user",
            content: `You are an expert summarizer. Read the following text carefully and extract the most important points, key ideas, 
            and essential information. Write a concise, clear, and coherent paragraph that accurately captures the main message without
            including unnecessary details or repeating phrases. Maintain the original meaning, tone, and intent of the content. 
            Here is the text:${content}`,
         },
         ],
         model: "llama-3.3-70b-versatile",
         temperature: 1,
         max_tokens: 1024, 
         top_p: 1,
         stream: false,
         stop: null,
      });


      const payload = {
         userIp : ip,
         method:"summarize",
         originalText:content,
         outputText :  chatCompletion.choices[0].message.content,
         isFavorite:false
      }

      const historyData = await History.create(payload);

      return res.status(200).json({
         success: true,
         message: "Text Summarized successfully",
         data: historyData,
      });
   } catch (e) {
      console.log(e);
      return res
         .status(500)
         .json({ success: false, message: "Error occuren in simplifing message" });
   }
};

exports.Simplify = async (req, res) => {
   try {
      const content = req.body.content;

      const ip = req.ip;
      if(!ip) return res.status(404).json({success:false,message:"Ip address not found"});
      
      if (content.trim() === "" || !content )
         return res.status(400).json({
         success: false,
         message: "PLease send content along with the req.",
      });

      const groq = new Groq({
         apiKey: process.env.GROQ_API,
      });

      const chatCompletion = await groq.chat.completions.create({
         messages: [
            {
               role: "user",
               content: `You are a skilled explainer for young learners. Read the following complex text and rewrite it in a very simple, 
               easy-to-understand way that a curious 10-year-old could understand. Use short sentences, familiar words, and clear examples 
               if needed. Avoid technical terms or explain them simply. Keep the explanation under 200 words and make sure it remains 
               accurate and engaging. Here is the text:${content}`,
            },
         ],
         model: "llama-3.3-70b-versatile",
         temperature: 1,
         max_tokens: 1024, 
         top_p: 1,
         stream: false,
         stop: null,
      });

      const payload = {
         userIp : ip,
         method:"simplify",
         originalText:content,
         outputText :  chatCompletion.choices[0].message.content,
         isFavorite:false
      }

      const historyData = await History.create(payload);

      return res.status(200).json({
         success: true,
         message: "Text simplified successfully",
         data: historyData,
      });
   } catch (e) {
      console.log(e);
      return res
         .status(500)
         .json({ success: false, message: "Error occuren in simplifing message" });
   }
};
