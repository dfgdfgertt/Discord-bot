// Require dependencies
const { Client } = require('discord.js');
const dotenv = require('dotenv');
const axios = require('axios'); 
// Load environment variables

dotenv.config();

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Create a bot instance
const bot = new Client();

bot.on('ready', async () => {
  console.log(`Logged in as ${bot.user.tag}!`);
  bot.user.setStatus('online');
  do{
    try {
      // Get crypto price from coingecko API
      const { data } = await axios.get(
        `https://api.pancakeswap.info/api/v2/tokens/0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c`
      );
      //console.log(data);
      bot.user.setActivity(`BNB = ${Math.round(data.data.price * 100) / 100} $`);
      await sleep(1000);
  } catch (err) {
    bot.user.setActivity(
      'Cường nguu'
    );
  }

  }while(true)
});

bot.on('message', async (message) => {
    // Do not reply if message was sent by bot
    if (message.author.bot) return;
      if (message.content.startsWith('bnb')) {
        try {
          // Get crypto price from coingecko API
          const { data } = await axios.get(
            `https://api.pancakeswap.info/api/v2/tokens/0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c`
          );
  
          //console.log(data);
          return message.channel.send(
            `Giá BNB = ${Math.round(data.data.price * 100) / 100} $`
          );
        } catch (err) {
          return message.channel.send(
            'Cường vẫn nguu'
          );
        }
    }
  });


// Log our bot in
bot.login(process.env.DISCORD_BOT_TOKEN_BNB);