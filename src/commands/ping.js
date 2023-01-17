import { SlashCommandBuilder } from '../index.js';
import Embed from '../component/embedBuilder.js';

export const data = () => {
    return new SlashCommandBuilder().setName('ping').setDescription('현재 서버의 응답속도를 확인합니다.').toJSON()
}

export const execute = async (interaction) => {
    const { client, member } = interaction;
    const props = {
        color: 0x7289da,
        title: 'Ping',
        fields: [
            [
                {
                    name: '서버',
                    value: member.guild.name,
                    inline: true
                },
                {
                    name: '| 응답속도',
                    value: '| ' + client.ws.ping + 'ms',
                    inline: true
                },
            ]
        ],
        timestamp: new Date()
    }
    return await interaction.reply(Embed(props));
    // return await interaction.reply(`Server: ${member.guild.name} \rPing: ${client.ws.ping}ms`);
}