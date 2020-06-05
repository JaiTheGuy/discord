const Discord = require('discord.js');
const client = new Discord.Client();
const { prefix, age, bot_info } = require('./config.json');
const { cookieReadings } = require('./fortuneCookie.json');

client.once('ready', () => {
  console.log('Success!');
  console.log(prefix);
  console.log(age);
  console.log(bot_info);
});

const fortunes = {
  cookieReadings: ['yo', 'yooo', 'yoooooo', 'oernfo', 'nfkwnfkwnejf'],
};

const diceRoll = () => Math.floor(Math.random() * 6) + 1;
const fortuneCookie = () =>
  fortunes.cookieReadings[Math.floor(Math.random() * 2) + 1];

client.on('message', (message) => {
  if (message.author.bot) {
    return;
  }
  if (
    message.content === `${prefix}hi` ||
    message.content === `${prefix}hello`
  ) {
    message.channel.send(
      `Hello ${message.author.username}, how are you doing today?`
    );
  }
  if (
    message.content === `${prefix}goodbye` ||
    message.content === `${prefix}bye`
  ) {
    message.channel.send(`See you later ${message.author.username}!`);
  }
  if (message.content === `${prefix}rolldice`) {
    message.reply(`you rolled a ` + diceRoll() + '!');
  }
  if (message.content === `${prefix}cookie`) {
    message.reply(fortuneCookie());
  }
});
