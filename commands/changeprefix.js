const fs = require('fs');

module.exports =
{
	name: 'changeprefix',
	description: 'Changes the prefix used',
	execute(msg, args) 
	{
		let newPrefix = args[1];
		let config = JSON.parse(fs.readFileSync("./config.json", "utf8"));

		config[msg.guild.id] = 
		{
			config: newPrefix
		};

		// fs.writeFile("./config.json", config.prefix.replace(config.prefix, newPrefix), (err) => 
		// {
		// 	if (err) {console.log(err)}
		// });
		// msg.channel.send("Changed prefix to: " + newPrefix);
		msg.channel.send("Command is WIP.")
	}
};