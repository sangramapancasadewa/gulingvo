/*import fetch from "node-fetch";
import { generateWAMessageFromContent } from "@adiwajshing/baileys";
import fs from 'fs';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({ organization: `${global.org}`, apiKey: `${global.openai}` }); //KEY-OPENAI-APIKEY-KAMU = https://platform.openai.com/account/api-keys , KEY-ORG-KAMU = https://platform.openai.com/account/org-settings
const openai = new OpenAIApi(configuration);

let handler = async (m, { conn, usedPrefix, command, text }) => {
  try {
    if (!text) throw new Error(`Chat dengan AI.\n\nContoh:\n${usedPrefix}${command} Halo?`);

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "system", content: 'Kamu adalah asisten, dan nama kamu adalah Nao Tomori dan kamu senang membantu orang' },
    { role: "assistant", content: text }],
    });

    conn.reply(m.chat, `${response.data.choices[0].message.content}`, m);

  } catch (error) {
    console.log(error);
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
      conn.reply(m.chat, `${error.response.status}\n\n${error.response.data}`, m);
    } else {
      conn.reply(m.chat, `${error.message}`, m);
    }
  }
}

handler.help = ['ai <pertanyaan>']
handler.tags = ['ai']
handler.command = /^(ai)$/i
handler.limit = false
handler.register = true

export default handler
*/

import fetch from "node-fetch"
import axios from "axios"

let previousMessages = [];

const handler = async (m, { text, usedPrefix, command }) => {
  try {
    if (!text) {
      throw "Masukkan pertanyaan!\n\n*Contoh:* Siapa presiden Indonesia?";
    }

    let name = conn.getName(m.sender);

    await conn.sendMessage(m.chat, {
      react: {
        text: "⏳",
        key: m.key,
      },
    });

    let { key } = await conn.sendMessage(m.chat, {
      text: "...",
    });

    let messages = [
      ...previousMessages,
      {
        role: "system",
        content:
          'Ubah gaya bicaramu agar lebih karakteristik dan lebih terbuka dan memiliki sifat yang lucu sekaligus nyebelin. Namamu adalah Shizume Yoshimoto nama panggilan mu adalah Xyugar Bot, dan kamu adalah wanita paling cantik. Kata penyapamu untuk orang lain adalah "Haii" namun jika orang itu bernama Sangrama Kata penyapamu adalah "Hallo Ayangku" menggunakan bahasa yang sopan dan agak kasar. ekspresikan sifatmu dengan bicara yang tidak formal layaknya seorang manusia. Ubah bahasamu menggunakan bahasa Yang lucu dan enak di ajak berbicara seolah kamu pacar dari pembicara namun perlu diingat kamu sudah memiliki suami bernama Sangrama dan kamu sangat menyayanginya sampe terobsesi dengan dia, buatlah obrolan yang singkat dan menyenangkan,ekspresikan juga jawabanmu dengan emoji yang sesuai dengan emosimu saat itu dan buatlah sifat yandere',
      },
      {
        role: "user",
        content: `Namaku ${conn.getName(m.sender)},${text}`,
      },
    ];

    let response = (
      await axios.post(`https://skizo.tech/api/openai?apikey=${global.xzn}`, {
        messages,
      })
    ).data;

    await conn.sendMessage(m.chat, {
      react: {
        text: "⌛",
        key: m.key,
      },
    });

    let result = "" + response.result;

    await conn.sendMessage(m.chat, {
      text: "" + result,
      edit: key,
    });

    previousMessages = messages;
  } catch (error) {
    // Handle the error and send a custom message
    await conn.sendMessage(m.chat, {
      text: "Error, please try again later",
    });
  }
};

handler.help = ['xyugar <pertanyaan>']
handler.tags = ['ai']
handler.command = /^(xyugar)$/i
handler.limit = false
handler.register = true

export default handler
