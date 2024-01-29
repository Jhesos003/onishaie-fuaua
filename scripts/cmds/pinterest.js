const axios = require('axios');
const fs = require('fs-extra');

module.exports = {
  config: {
    name: 'Pinterest',
    aliases: ["pint", "pinter"],
    version: '1.2',
    author: 'Jhe',//api by hazey
    countDown: 5,
    role: 0,
    category: 'Image Search',
    shortDescription: {
      en: "Search for images on \n| Pinterest based on a keyword",
    },
    longDescription: {
      en: "This command searches for images on Pinterest based on a provided keyword.",
    },
    guide: {
      en: "{pn} 'keyword' -'number of search results'\nExample: {pn} cute -10\nIf no number is provided, the command will return the first 5 images.",
    },
  },

  onStart: async function ({ api, args, event, message }) {
    const search = args[0];
    let count = args[1] || 5;

    try {
      const response = await axios.get(`https://code-merge-api-hazeyy01.replit.app/pinterest/api?search=${search}`);
      const data = response.data;

      if (data.error) {
        return api.sendMessage(data.error, event.threadID);
      } else {
        let attachment = [];
        let storedPath = [];

        for (let i = 0; i < data.count && i < count; i++) {
          let path = __dirname + `/cache/pinterest_${i + 1}.jpg`;
          let pic = await axios.get(data.data[i], { responseType: "arraybuffer" });
          fs.writeFileSync(path, pic.data);
          storedPath.push(path);
          attachment.push(fs.createReadStream(path));
        }

        api.sendMessage({ body: `🤖 Pinterest Search - ${search}\n\n» Results: ${attachment.length} - ${data.count} «`, attachment: attachment }, event.threadID, () => {
          for (const item of storedPath) {
            fs.unlinkSync(item);
          }
        }, event.messageID);
      }
    } catch (error) {
      console.error(error);
      return api.sendMessage("🚫 An error occurred while fetching data from Pinterest API.", event.threadID);
    }
  },
};