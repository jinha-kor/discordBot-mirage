const Discord = require('discord.js');
// { Client, GatewayIntentBits, Partials }
const token = 'MTA2Mjk2ODgyMzE5MzUzNDQ5NQ.Gbpa_j.T-F65KjcrBP1KXjjokSv-AWd6kQ8G76au1nQ7U';

const client = new Discord.Client({
    intents: [
        Discord.GatewayIntentBits.Guilds
    ],
    partials: [
        Discord.Partials.Channel
    ]
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    if (interaction.commandName === 'ping') {
        await interaction.reply('Pong!');
    }
});
// 봇과 서버를 연결해주는 부분
client.login(token);
