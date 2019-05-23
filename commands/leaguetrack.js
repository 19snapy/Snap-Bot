const request = require('request');
const Discord = require('discord.js');
const config = JSON.parse(fs.readFileSync("./config.json", "utf8"));
const leagueapikey = config.keys.League;

const REGIONS = ['na1', 'euw1', 'eun1', 'br', 'la1', 'la2', 'od1', 'ru', 'tr1', 'jp1', 'kr'];

module.exports = 
{
	name: 'leaguetrack',
	description: 'Tracks LoL summoner stats.',
	execute(msg, args)
	{
		var region = args[1].toLowerCase();
		for (var i = 0; i < REGIONS.length; i++)
		{
			if (REGIONS[i].includes(region)) region = REGIONS[i];
		}
		var summonerName = args[2];

		if (typeof region === 'undefined' || typeof summonerName === 'undefined')
		{
			msg.channel.send("Please add a region and summoner name respectively.");
			return;
		}

		if (!REGIONS.includes(region)) msg.channel.send("You need to add an existing region.");

		if (typeof summonerName != 'string') msg.channel.send("You need to add an existing summoner");

		var profileURL = `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${leagueapikey}`;

		request ({
    	url: profileURL,
    	json: true
			}, function (error, response, profileHeader) 
			{
				var summonerID = profileHeader.id;
				var rankedURL = `https://${region}.api.riotgames.com/lol/league/v4/positions/by-summoner/${summonerID}?api_key=${leagueapikey}`;

				request({
					url: rankedURL,
					json: true
				}, function (error, response, rankedHeader)
				{
					if (typeof rankedHeader[0] === 'undefined')
					{
						msg.channel.send("Summoner does not have a rank.");
						return;
					}

					if (!error && response.statusCode === 200) 
					{
						msg.channel.send({embed: new Discord.RichEmbed()
						.setColor("#40FF00")
						.setThumbnail(`https://ddragon.leagueoflegends.com/cdn/9.5.1/img/profileicon/${profileHeader.profileIconId}.png`)
						.setTitle("Stats for Summoner: " + profileHeader.name)
						.addField("Level: ", profileHeader.summonerLevel)
					  .addField("Rank:", rankedHeader[0].tier + " " + rankedHeader[0].rank + " with " + rankedHeader[0].leaguePoints + " LP | " + "Wins: " + rankedHeader[0].wins + ", Losses: " + rankedHeader[0].losses)
						})
					}
				})
			})
	},
};
