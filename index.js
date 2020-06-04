const Discord = require('discord.js');
const client = new Discord.Client();

client.once('ready', () => {
  console.log('Success!');
});

client.on('message', (message) => {
  if (message.content === '!hello') {
    message.channel.send(
      `Hello ${message.author.username}, how are you doing today?`
    );
  }
});
