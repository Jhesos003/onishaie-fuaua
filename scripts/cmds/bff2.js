const axios = require('axios');

module.exports = {
  config: {
    name: 'bff2',
    version: '1.0',
    author: 'jhe',
    role: 0,
    category: 'Ai-Chat',
    shortDescription: {
      en: `Cassandra is the opposite of chesca, i don't think someone will enjoy talking to her.`
    },
    longDescription: {
      en: `Cassandra is the opposite of chesca, i don't think someone will enjoy talking to her.`
    },
    guide: {
      en: '{pn}cassandra [query]'
    },
  },

  onStart: async function ({ api, event }) {
    try {
      const query = args.join(" ") || "hello";

      if (query) {
        api.setMessageReaction("⏳", event.messageID, (err) => console.log(err), true);
        const processingMessage = await api.sendMessage(
          `Asking 🎁 Cassandra (v1). Please wait a moment...`,
          event.threadID
        );

        const apiUrl = `https://lianeapi.onrender.com/@LianeAPI_Reworks/api/cassandra? query=${encodeURIComponent(query)}`;
        const response = await axios.get(apiUrl);

        if (response.data && response.data.message) {
          const trimmedMessage = response.data.message.trim();
          api.setMessageReaction("✅", event.messageID, (err) => console.log(err), true);
          await api.sendMessage({ body: trimmedMessage }, event.threadID, event.messageID);

          console.log(`Sent 🎁 Cassandra (v1)'s response to the user`);
        } else {
          throw new Error(`Invalid or missing response from 🎁 Cassandra (v1) API`);
        }

        await api.unsendMessage(processingMessage.messageID);
      }
    } catch (error) {
      console.error(`❌ | Failed to get 🎁 Cassandra (v1)'s response: ${error.message}`);
      const errorMessage = `❌ | An error occurred. You can try typing your query again or resending it. There might be an issue with the server that's causing the problem, and it might resolve on retrying.`;
      api.sendMessage(errorMessage, event.threadID);
    }
  },
};