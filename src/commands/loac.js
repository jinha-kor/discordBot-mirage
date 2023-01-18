import axios from 'axios';
import { SlashCommandBuilder } from '../index.js';
import Embed from '../component/embedBuilder.js';
import { embedTextUtil, deleteHtmlText } from '../utils/commonUtils.js';
import { EffectEmbeddedText } from '../utils/effectUtils.js';
import { axiosGet } from '../utils/httpUtils.js';

export const data = () => {
    return new SlashCommandBuilder()
        .setName('loac')
        .setDescription('로스트아크 캐릭터 목록을 조회합니다.')
        .addStringOption(option =>
           option.setName('nick')
               .setDescription('닉네임을 입력하세요.')).toJSON()
}

export const execute = async (interaction) => {
    const nickName = interaction.options._hoistedOptions[0].value;
    const characterInfo = await axiosGet('/profiles', nickName);
    const equipmentInfo = await axiosGet('/equipment', nickName);
    const engravingsInfo = await axiosGet('/engravings', nickName);

    if (characterInfo.status === 200) {
        const nTextData = EffectEmbeddedText(equipmentInfo);

        let effectsText = '';
        engravingsInfo.data.Effects.map((res, idx) => {
            if (idx === 0) {
                return effectsText = `${res.Name}`;
            } else {
                return effectsText += `,${res.Name}`;
            }
        });

        const props = {
            title: '캐릭터 정보',
            thumbnail: {
                url: characterInfo.data.CharacterImage.toString(),
            },
            fields: [
                [
                    {
                        name: '서버',
                        value: embedTextUtil(characterInfo.data.ServerName),
                        inline: true
                    },
                    {
                        name: '원정대Lv',
                        value: embedTextUtil(characterInfo.data.ExpeditionLevel.toString()),
                        inline: true
                    },
                    { name: '\u200B', value: '\u200B' },
                ],
                [
                    {
                        name: '캐릭터명',
                        value: embedTextUtil(characterInfo.data.CharacterName),
                        inline: true
                    },
                    {
                        name: '직업',
                        value: embedTextUtil(characterInfo.data.CharacterClassName),
                        inline: true
                    },
                    {
                        name: 'Level',
                        value: embedTextUtil(characterInfo.data.ItemMaxLevel.toString()),
                        inline: true
                    },
                    {
                        name: '길드',
                        value: embedTextUtil(characterInfo.data.GuildName),
                        inline: true
                    },
                    { name: '\u200B', value: '\u200B' },
                ],
                [
                    {
                        name: '각인',
                        value: embedTextUtil(effectsText, 'effect')
                    },
                    { name: '\u200B', value: '\u200B' },
                ],
                [
                    {
                        name: '장비',
                        value: embedTextUtil(nTextData.equipmentText, 'equipment')
                    },
                    {
                        name: '악세',
                        value: embedTextUtil(nTextData.accText, 'equipment')
                    },
                    {
                        name: '기타',
                        value: embedTextUtil(nTextData.extText, 'equipment')
                    },
                    { name: '\u200B', value: '\u200B' },
                ],
            ],
            timestamp: new Date()
        }
        return await interaction.reply(Embed(props));
    }
    return await interaction.reply(`요청하신 캐릭터 ( ${nickName} ) 정보를 찾을 수 없습니다.`);
}