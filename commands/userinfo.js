const Discord = require('discord.js');

module.exports = 
{
	name: 'userinfo',
	description: 'Posts information on user',
	execute(msg, args, client)
	{
		if (typeof args[1] === 'undefined') var user = msg.author;
		else var user = client.users.get(args[1]);

		const embed = new Discord.RichEmbed()
		.setColor("DF0101")
		.setThumbnail(user.avatarURL)
		.setDescription("Information about the user")
		.addField("Username:", user.tag)
		.addField("UserID:", user.id)
		.addField("Account created at:", user.createdAt)
		.addField("Last Message Sent: ", user.lastMessage)
		.setTimestamp();

		msg.channel.send({embed});
	}
};