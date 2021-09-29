// Require dependencies
const { Client, Constants } = require('discord.js');
const dotenv = require('dotenv');
const axios = require('axios'); 
// Load environment variables

dotenv.config();
const data = {
  1: ["23:42",	"01:42",	"03:42",	"05:42",	"07:42",	"09:42",	"11:42",	"13:42",	"15:42",	"17:42",	"19:42",	"21:42"],
  2: ["00:12",	"02:12",	"04:12",	"06:12",	"08:12",	"10:12",	"12:12",	"14:12",	"16:12",	"18:12",	"20:12",	"22:12"],
  3: ["00:42",	"02:42",	"04:42",	"06:42",	"08:42",	"10:42",	"12:42",	"14:42",	"16:42",	"18:42",	"20:42",	"22:42"],
  4: ["01:12",	"03:12",	"05:12",	"07:12",	"09:12",	"11:12",	"13:12",	"15:12",	"17:12",	"19:12",	"21:12",	"23:12"],
}

const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwdWJsaWNBZGRyZXNzIjoiMHhlZWUyYzg1NjBiNjI3NTc5ZjQyMjgxZDljODYzNzkxZTRiMGJkMGI0IiwibG9naW5UaW1lIjoxNjMwNzQ2MDk4MzAzLCJjcmVhdGVEYXRlIjoiMjAyMS0wOC0yOCAxMTozMzo1MCIsImlhdCI6MTYzMDc0NjA5OH0.d2MbdyI9jRIiWbI2DZvxN3-Z94LCszkt5fmyClMwz5Q`
const token1 = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwdWJsaWNBZGRyZXNzIjoiMHgyNGFiODNhNjFkMzNlYzU0YmJmNTE3NWZhZDY2ZDBmNjg5M2VlMGIzIiwibG9naW5UaW1lIjoxNjMxNTU5Mzc0Njc3LCJjcmVhdGVEYXRlIjoiMjAyMS0wOS0wNyAwNTo1ODowOCIsImlhdCI6MTYzMTU1OTM3NH0.PeIymDmfEQzH6r2POWkRAwYW5amjm3C_APOUtthVp1E`;

var getTime = {
  method: 'get',
  url: `https://backend-farm.plantvsundead.com/farm-status`,
  headers: {
    origin: 'https://marketplace.plantvsundead.com',
    'user-agent':
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36',
    Authorization: `Bearer ${token1}`,
  },
};



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
          `https://api.pancakeswap.info/api/v2/tokens/0x31471e0791fcdbe82fbf4c44943255e923f1b794`
        );
       
        bot.user.setActivity(`PVU = ${Math.round(data.data.price * 100) / 100} $`);
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
    
      // Reply to !ping
      if (message.content.startsWith('cuong')) {
        return message.channel.send('Cường nguu!');
      }
      // if (message.content.startsWith('truong')) {
      //   return message.channel.send('Thuyền trưởng đu đỉnh!');
      // }
      // if (message.content.startsWith('hung')) {
      //   return message.channel.send('Hưng fun vẫn chưa thấy bờ đâu!');
      // }
      // if (message.content.startsWith('tung')) {
      //   return message.channel.send('2k2 600k, 2k1 450k');
      // }
      // if (message.content.startsWith('duy')) {
      //   return message.channel.send('Khi nào thì được về quê m tiếp?');
      // }
      // if (message.content.startsWith('long')) {
      //   return message.channel.send('Vẫn còn xa bờ!');
      // }
      if (message.content.startsWith('time')) {
        //return message.channel.send(`List không cố định nên tự check đi :)))`); 
        return message.channel.send({files:["list.jpg"]});
        
      }
      if (message.content.startsWith('check')) {
        const result = await axios(getTime);
        let min = 0;
        let time = 55;
        let group = 10;
        let date_ob = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Tomsk'}));
        if (result.data.data.status == 1) {
          if (date_ob.getMinutes() <  (time-30)) {
            min =  (time-30) - date_ob.getMinutes();
          }else if (date_ob.getMinutes() <  time) {
            min = time - date_ob.getMinutes();
          }else{
            min =  (time+30)- date_ob.getMinutes()
          }
          return message.channel.send(`Đang trong list 7 còn ${min} phút nữa là đến list 8`);
        } else if (result.data.data.currentGroup) {
          let next =result.data.data.currentGroup+1;
          if (date_ob.getMinutes() <  (time-30)) {
            min =  (time-30) - date_ob.getMinutes();
          }else if (date_ob.getMinutes() <  time) {
            min = time - date_ob.getMinutes();
          }else{
            min =  (time+30)- date_ob.getMinutes()
          }
          if (next>group) {
              next-=group;
          }
          return message.channel.send(`Đang trong list ${result.data.data.currentGroup} còn ${min} phút nữa là đến list ${next}`);
        }else{
          return message.channel.send(`Server bảo trì!!!`);
        }
      }

      // if (message.content.startsWith('check')) {
      //   let date_ob = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Tomsk'}));
      //   for (let j = 0; j < data[1].length; j++) {
      //       for (let i = 1; i <= 4; i++) {
      //         let [hours , min] = data[i][j].split(":");
      //         if (date_ob.getHours() == [hours])  {
      //           let next=0;
      //           let m= 0;
      //           let list = 0;
      //           if (date_ob.getMinutes() >= 42) {
      //             next = i+2;
      //             list = i+1
      //             if (list>4) {
      //               list=1;
      //           }
      //             if (next>4) {
      //                 next-=4;
      //             }
      //               m = 30-(date_ob.getMinutes()-42)
      //               return message.channel.send(`Đang trong list ${list} còn ${m} phút nữa là đến list ${next}`);
      //           }else
      //           if (date_ob.getMinutes() < 12) {
      //             next = i;
      //             list = i-1
      //             if (list>4) {
      //               list=1;
      //           }
      //             if (next>4) {
      //                 next-=4;
      //             }
      //               m = 12-(date_ob.getMinutes())
      //               return message.channel.send(`Đang trong list ${list} còn ${m} phút nữa là đến list ${next}`);
      //           }
      //           else{
      //               next = i+1;
      //               list = i;
      //               if (list>4) {
      //                 list=1;
      //             }
      //               if (next>4) {
      //                   next-=4;
      //               }
      //               m = 30-(date_ob.getMinutes()-12)
      //               return message.channel.send(`Đang trong list ${list} còn ${m} phút nữa là đến list ${next}`);
      //           }
      //         }
      //     }
      //   }
      // }
      if (message.content.startsWith('pvu')) {
            try {
              // Get crypto price from coingecko API
              const { data } = await axios.get(
                `https://api.pancakeswap.info/api/v2/tokens/0x31471e0791fcdbe82fbf4c44943255e923f1b794 `
              );
      
              //console.log(data);
      
              return message.channel.send(
                `Giá PVU = ${Math.round(data.data.price * 100) / 100} $`
              );
            } catch (err) {
              return message.channel.send(
                'Cường vẫn nguu'
              );
            }
        }
      //   if (message.content.startsWith('bnb')) {
      //     try {
      //       // Get crypto price from coingecko API
      //       const { data } = await axios.get(
      //         `https://api.pancakeswap.info/api/v2/tokens/0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c`
      //       );
    
      //       //console.log(data);
      //       return message.channel.send(
      //         `Giá BNB = ${Math.round(data.data.price * 100) / 100} $`
      //       );
      //     } catch (err) {
      //       return message.channel.send(
      //         'Cường vẫn nguu'
      //       );
      //     }
      // }
      if (message.content.startsWith('price')) {
        // Get the params
        const [command, ...args] = message.content.split(' ');
    
        // Check if there are two arguments present
        if (args.length !== 2) {
          return message.channel.send(
            'You must provide the crypto and the currency to compare with!'
          );
        } else {
          const [coin, vsCurrency] = args;
          try {
            // Get crypto price from coingecko API
            const { data } = await axios.get(
              `https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=${vsCurrency}`
            );
    
            // Check if data exists
            if (!data[coin][vsCurrency]) throw Error();
    
            return message.channel.send(
              `The current price of 1 ${coin} = ${data[coin][vsCurrency]} ${vsCurrency}`
            );
          } catch (err) {
            return message.channel.send(
              'example: price bitcoin usd'
            );
          }
        }
      }
    });


  // Log our bot in
  bot.login(process.env.DISCORD_BOT_TOKEN_PVU);

