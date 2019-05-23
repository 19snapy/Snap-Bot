const Discord = require('discord.js'); 				     // api for nodejs discord
const fs = require('fs');					     // allows for reading files
const config = JSON.parse(fs.readFileSync("./config.json", "utf8")); // config json access

const client = new Discord.Client();
const token = config.keys.DiscordToken;

client.commands = new Discord.Collection();		// array of commands found in the commands folder
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js')); // finds all command files
const prefix = config.prefix; // temporary, eventually add a prefix change option

for (const file of commandFiles) // loop that adds every command in the commands folder into the client.commands collection
{
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.on('ready', () =>	// when bot is ready it does the stuff here
{
  console.log("I'm on");
  console.log(client.user.username);
});

client.on('message', msg => // when there is a message sent, the stuff in here happens
{
    if (msg.author.id === client.user.id) return; // doesnt message if the user msging is the bot

		const args = msg.content.slice(prefix.length).split(/ +/);

		if (msg.content.startsWith(prefix)) // checks if message is a command
		{
			let commandName = args[0];
			let command = client.commands.get(commandName);

			if (typeof client.commands.get(commandName) === 'undefined')
			{
				msg.channel.send("Command does not exist.");
				return;
			}
			command.execute(msg, args, client);
		}
});

client.login(token); // client logs into the bot via token
