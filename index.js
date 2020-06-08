const Discord = require('discord.js');
const client = new Discord.Client();
const { prefix, age, bot_info } = require('./config.json');
const { getPokemon } = require('./poke.js');
const { Client, MessageEmbed } = require('discord.js');

client.once('ready', () => {
  console.log('Success!');
  console.log(prefix);
  console.log(age);
  console.log(bot_info);
});

const fortunes = {
  cookieReadings: [
    'A feather in the hand is better than a bird in the air.',
    'A fresh start will put you on your way.',
    'A hunch is creativity trying to tell you something.',
    'A person of words and not deeds is like a garden full of weeds.',
    'Accept something that you cannot change, and you will feel better.',
    'The greatest danger could be your stupidity.',
    "It's about time I got out of that cookie.",
  ],
};
const joke = {
  jokes: [
    "Why don't eggs tell jokes? They'd crack each other up.",
    'What concert costs just 45 cents? 50 Cent featuring Nickelback!',
    'I made a pencil with two erasers. It was pointless.',
    'How does a penguin build its house? Igloos it together.',
    "Why couldn't the bicycle stand up by itself? It was two tired.",
    "Did you hear the rumor about butter? Well, I'm not going to spread it!",
    'To whoever stole my copy of Microsoft Office, I will find you. You have my Word!',
    'If you see a robbery at an Apple Store does that make you an iWitness?!',
    'I invented a new word today: Plagiarism!',
  ],
};

const diceRoll = () => Math.floor(Math.random() * 6) + 1;
const fortuneCookie = () =>
  fortunes.cookieReadings[Math.floor(Math.random() * 2) + 1];
const dadjokes = () => joke.jokes[Math.floor(Math.random() * 8) + 1];

client.on('message', async (message) => {
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
  if (message.content === `${prefix}dadjoke`) {
    message.channel.send(dadjokes());
  }
  if (message.content.toLowerCase().startsWith('!pokemon')) {
    const pokemon = message.content.toLowerCase().split(' ')[1];
    try {
      const pokeData = await getPokemon(pokemon);
      const { sprites, stats, weight, name, id, types } = pokeData;
      const embed = new MessageEmbed();
      embed.setTitle(`${name} #${id}`);
      embed.setThumbnail(`${sprites.front_default}`);
      stats.forEach((stat) =>
        embed.addField(stat.stat.name, stat.base_stat, true)
      );
      types.forEach((type) => embed.addField('Type', type.type.name, true));
      embed.addField('Weight', weight);
      message.channel.send(embed);
    } catch (err) {
      console.log(err);
      message.channel.send(`Pokemon ${pokemon} does not exist.`);
    }
  }
});
