module.exports = {
	config: {
			name: "hi",
			version: "1.0",
			author: "Jhe",
			countDown: 5,
			role: 0,
			shortDescription: "sarcasm",
			longDescription: "sarcasm",
			category: "reply",
	},
onStart: async function(){}, 
onChat: async function({
	event,
	message,
	getLang
}) {
	if (event.body && event.body.toLowerCase() == "hi") return message.reply("*hes whispers softly* Okay, love... Now I'm going to kiss you for the first time. The longer the kiss, the better we'll know each other... And soon, we'll become one. Let's give each other the best kiss of our lives!");
}
};