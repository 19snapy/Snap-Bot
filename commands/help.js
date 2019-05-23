const Discord = require('discord.js');
const fs = require('fs');

const config = JSON.parse(fs.readFileSync("./config.json", "utf8"));
var prefix = config.prefix;

module.exports = 
{
	name: 'help',
	description: 'Posts some info',
	execute(msg)
	{
		msg.channel.send({embed: new Discord.RichEmbed()
		.setColor("#8904B1")
		.setTitle("Commands:")
		.addField(`${prefix}help`, "Opens this menu.")
		.addField(`${prefix}changeprefix`, `Changes current prefix for bot.\nSyntax: ${prefix}changeprefix <newprefix>`)
		.addField(`${prefix}ping`, "Pong.")
		.addField(`${prefix}userinfo`, `Displays information about specified user (Use the specified users id)\nSyntax: ${prefix}userinfo for self, ${prefix}userinfo <discordID>`)
		.addField(`${prefix}leaguetrack`, `Gives information about specified summoner. \nSyntax: ${prefix}leaguetrack <region> <summonername without spaces>`)
		.addField(`${prefix}csgotrack`, `Gives information about specified steamID. \nSyntax: ${prefix}csgotrack <steamID>`)
		.addField(`${prefix}register or ${prefix}unregister`, `Associates or Disassociates discord ID to the specified game user (Put in 'steam' if its a steam game). \nSyntax" ${prefix}register <game> <discordID> <ingamename or id>`)
		})
	}
};