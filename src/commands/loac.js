import axios from 'axios';
import { SlashCommandBuilder } from '../index.js';
import Embed from '../component/embedBuilder.js';

const textArea = (text) => {
    let newText = '```md\r';
    newText += `[${text}]:`;
    newText += '\r```';
    return newText
}

export const data = () => {
    return new SlashCommandBuilder()
        .setName('loac')
        .setDescription('로스트아크 캐릭터 목록을 조회합니다.')
        .addStringOption(option =>
           option.setName('nick')
               .setDescription('닉네임을 입력하세요.')).toJSON()
}

export const execute = async (interaction) => {
    const LOST_TOKEN = process.env.LOST_TOKEN;
    const nickName = interaction.options._hoistedOptions[0].value;
    // const url = `https://developer-lostark.game.onstove.com/characters/${nickName}/siblings`; // 전체 캐릭터
    const cUrl = `https://developer-lostark.game.onstove.com/armories/characters/${nickName}/profiles`; // 캐릭터
    const eUrl = `https://developer-lostark.game.onstove.com/armories/characters/${nickName}/equipment`; // 장비
    const config = {
        headers: {
            Authorization: `${LOST_TOKEN}`,
            Accept: 'application/json'
        }
    };

    const characterInfo =
        await axios.get(encodeURI(cUrl), config)
            .then((response) => {
                return response;
            })
            .catch((err) => {
                return err;
            });

    if (characterInfo.status === 200) {
        const equipmentInfo =
            await axios.get(encodeURI(eUrl), config)
                .then((response) => {
                    return response;
                })
                .catch((err) => {
                    return err;
                });

        console.log(equipmentInfo.status, equipmentInfo.data)
        const equiArray = [];
        equipmentInfo.data.map((res) => {
            return equiArray.push({
                name: res.Type,
                value: textArea(res.Name),
                inline: true
            })
        })

        const props = {
            title: '캐릭터 정보',
            thumbnail: {
                url: characterInfo.data.CharacterImage.toString(),
            },
            fields: [
                [
                    {
                        name: '서버',
                        value: textArea(characterInfo.data.ServerName),
                        inline: true
                    },
                    {
                        name: '원정대Lv',
                        value: textArea(characterInfo.data.ExpeditionLevel.toString()),
                        inline: true
                    },
                    { name: '\u200B', value: '\u200B' },
                ],
                [
                    {
                        name: '캐릭터명',
                        value: textArea(characterInfo.data.CharacterName),
                        inline: true
                    },
                    {
                        name: '직업',
                        value: textArea(characterInfo.data.CharacterClassName),
                        inline: true
                    },
                    {
                        name: 'Level',
                        value: textArea(characterInfo.data.ItemMaxLevel.toString()),
                        inline: true
                    },
                    {
                        name: '길드',
                        value: textArea(characterInfo.data.GuildName),
                        inline: true
                    },
                    { name: '\u200B', value: '\u200B' },
                ],
                equiArray
            ],
            timestamp: new Date()
        }
        return await interaction.reply(Embed(props));
    }
    return await interaction.reply(`요청하신 캐릭터를 찾을 수 없습니다.`);
}