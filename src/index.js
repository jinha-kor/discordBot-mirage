import Discord, { REST } from 'discord.js';
import Handler from '../src/handler/index.js';
import { config } from 'dotenv';

config();
const token = process.env.DISCORD_TOKEN;
const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;
export const { Client, GatewayIntentBits, Partials, Collection, Events, SlashCommandBuilder } = Discord;

export const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.MessageContent
    ],
    partials: [
        Partials.Channel,
        Partials.Message,
        Partials.User,
        Partials.GuildMember,
        Partials.Reaction
    ]
});

const rest = new REST({ version : '10' }).setToken(token);

client.commands = new Collection();
client.slashCommands = new Collection();
Handler(client, rest, token, clientId).then();

// 봇과 서버를 연결해주는 부분
/*(async () => {
    const commands = [{
        name: 'ping',
        description : 'Replies with Pong!'
    }];
    try {
        console.log('Started Bot!');
        await rest.put(Routes.applicationCommands(clientId), {body: commands})
        client.login(token).then();
    } catch (err) {
        console.log(err);
    }
})();*/
