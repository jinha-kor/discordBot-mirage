import { SlashCommandBuilder } from '../index.js';

export const data = () => {
    return new SlashCommandBuilder().setName('ping').setDescription('현재 서버의 응답속도를 확인합니다.').toJSON()
}

export const execute = async (interaction) => {
    const { client, member } = interaction;
    return await interaction.reply(`Server: ${member.guild.name} \rPing: ${client.ws.ping}ms`);
}