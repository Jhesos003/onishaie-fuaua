module.exports = {
  config: {
    name: "join",
    version: "1.0",
    author: "LiANE",
    role: 0, //admin lang AHAHAHA
    shortDescription: {
      en: "Adds the user to a specific thread."
    },
    longDescription: {
      en: "Adds the user to a specific thread and sends them a notification message."
    },
    category: "System",
    guide: {
      en: "Use {p}join to add yourself to the specified thread."
    }
  },
  onStart: async function ({ api, event, args, message }) {
    const threadID = args[0];
const note = args.slice(1).join(" ");

    try {
      await api.addUserToGroup(event.senderID, threadID);
      message.reply("Na add na kita sa support GC namin, thanks for using the bot!");
api.sendMessage(`Ang ating masipag na admin ay mag joi join sa gc na to sa dahilan na: ${note}`, threadID);
    } catch (error) {
      message.reply("Hindi kita ma add sa support gc namin, add friend mo muna yung account ko. Or maybe nasa support gc kana kaya talagang hindi gagana");
    }
  }
};