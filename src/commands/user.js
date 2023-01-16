import { SlashCommandBuilder } from '../index.js';

export const data = () => {
    return new SlashCommandBuilder()
        .setName('user')
        .setDescription('Provides information about the user.').toJSON()
}

export const execute = async (interaction) => {
    return await interaction.reply(`This command was run by ${interaction.user.username}, who joined on ${interaction.member.joinedAt}.`);
}