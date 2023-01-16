import { SlashCommandBuilder } from '../index.js';

export const data = () => {
    return new SlashCommandBuilder()
        .setName('server')
        .setDescription('Provides information about the server.').toJSON()
}

export const execute = async (interaction) => {
    return await interaction.reply(`This server is ${interaction.guild.name} and has ${interaction.guild.memberCount} members.`);
}