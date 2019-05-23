const Discord = require('discord.js');
const request = require('request');
const config = JSON.parse(fs.readFileSync("./config.json", "utf8")); // config json

const apikey = config.keys.Steam;

module.exports = 
{
	name: 'csgotrack',
	description: 'Tracks CSGO Stats',
	execute(msg, args, client) 
	{
		var steamid = args[1];
		var statsurl = `http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=730&key=${apikey}&steamid=${steamid}`;
		var profileurl = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${apikey}&steamids=${steamid}`;

		request({
		url: profileurl,
		json: true
		}, function (error, response, profilebody)
		{
		if (!error && response.statusCode === 200)
		{
			request({
    			url: statsurl,
    			json: true
			}, function (error, response, body) 
			{
				if (typeof body.playerstats === 'undefined' || typeof args[1] === 'undefined') msg.channel.send("The persons profile is either private, or a proper steamID was not entered.");

				if (!error && response.statusCode === 200) 
				{
						msg.channel.send({ embed: new Discord.RichEmbed()
						.setColor("#40FF00")
						.setTitle("Stats for SteamID: " + profilebody.response.players[0].personaname)
						.setThumbnail(profilebody.response.players[0].avatarfull)
						.addField("Total Kills:", body.playerstats.stats[0].value)
						.addField("Total Headshot Kills / Headshot %", body.playerstats.stats[25].value + ", " + parseInt(((body.playerstats.stats[25].value / body.playerstats.stats[0].value) * 100)) + "%")
						.addField("Total Deaths:", body.playerstats.stats[1].value)
						.addField("Total Wins:", body.playerstats.stats[5].value)
						})
				}
			})
		}
	})
	},
};
