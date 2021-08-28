require('dotenv').config();
const { Client, Intents } = require('discord.js');
var ethers = require('ethers');
const sdk = require('api')('@opensea/v1.0#10ly3a2fkr6dkwq4');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
	channel = client.channels.fetch(process.env.DISCORD_CHANNEL_ID);
});

// Login to Discord with your client's token
//client.login(token);
client.login(process.env.DISCORD_BOT_TOKEN);
