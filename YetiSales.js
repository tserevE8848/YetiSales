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
main = () => {
	console.log('Ready2!');
  const seconds = process.env.SECONDS ? parseInt(process.env.SECONDS) : 3600;
  const hoursAgo = (Math.round(new Date().getTime() / 1000) - (seconds)); // in the last hour, run hourly?
  sdk['retrieving-asset-events']({
  asset_contract_address: '0x3f0785095a660fee131eebcd5aa243e529c21786',
  collection_slug: 'superyeti',
  event_type: 'successful',
  only_opensea: 'false',
  offset: '0',	 
  limit: '20'
})
  .then(res => {
  	console.log(res)
res.asset_events.reverse().map(async (sale) => {
	const message = buildMessage(sale);
      return channel.send(message)
})
  })
  .catch(err => console.error(err)); 
   
}
const buildMessage = (sale) => (
  new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle(sale.asset.name + ' sold!')
	.setURL(sale.asset.permalink)
	.setThumbnail(sale.asset.collection.image_url)
	.addFields(
		{ name: 'Amount', value: `${ethers.utils.formatEther(sale.total_price || '0')}${ethers.constants.EtherSymbol}`},
		{ name: 'Buyer', value: sale.winner_account.address },
		{ name: 'Seller', value: sale.seller.address  },
		{ name: 'Rarity', value: "[Check here](https://rarity.tools/superyeti/view/"+sale.asset.token_id+")"  },
	)
  .setImage(sale.asset.image_url)
	.setTimestamp(Date.parse(`${sale.created_date}Z`))
	.setFooter('Sold on OpenSea', 'https://files.readme.io/566c72b-opensea-logomark-full-colored.png')
);
// Login to Discord with your client's token
main();
client.login(process.env.DISCORD_BOT_TOKEN);
