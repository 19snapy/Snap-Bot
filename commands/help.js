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
		.addField(`${prefix}ping`, "Pong.")
		.addField(`${prefix}userinfo`, `Displays information about specified user (Use the specified users id)\nSyntax: ${prefix}userinfo for self, ${prefix}userinfo <discordID>`)
		.addField(`${prefix}leaguetrack`, `Gives information about specified summoner. \nSyntax: ${prefix}leaguetrack <region> <summonername without spaces>`)
		.addField(`${prefix}csgotrack`, `Gives information about specified steamID. \nSyntax: ${prefix}csgotrack <steamID>`)
		})
	}
};
