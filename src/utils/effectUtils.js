import {deleteHtmlText} from "./commonUtils.js";

export const EffectEmbeddedText = (equipmentInfo) => {
    const nTextData = { equipmentText: '', accText: '', extText: '' };

    equipmentInfo.data.map((res, idx) => {
        const {
            Element_000,
            Element_001,
            Element_002,
            Element_003,
            Element_004,
            Element_005,
            Element_006,
            Element_007,
            Element_008
        } = JSON.parse(res.Tooltip);

        let tmpText = '';
        if (idx === 0) {
            tmpText = `[${res.Grade}] ${res.Name}`;
        } else {
            tmpText += `,[${res.Grade}] ${res.Name}`;
        }

        if (!(res.Name.includes('나침반') || res.Name.includes('부적') || res.Name.includes('문장'))) {
            if (res.Name.includes(' 돌') || res.Name.includes('팔찌')) {
                const itemLv = deleteHtmlText(Element_001.value.leftStr2);
                tmpText += `\r>>> ${itemLv}\r`;
            } else {
                const quality = deleteHtmlText(Element_001.value.leftStr1) + ': ' + Element_001.value.qualityValue;
                const itemLv = deleteHtmlText(Element_001.value.leftStr2);
                tmpText += `\r>>> ${quality}\t${itemLv}\r`;
            }
        }

        if (res.Name.includes('나침반') || res.Name.includes('부적') || res.Name.includes('문장')) {
            return nTextData.extText += tmpText;
        } else if (res.Name.includes('목걸이') || res.Name.includes('귀걸이') || res.Name.includes('반지') || res.Name.includes(' 돌')) {
            let effectText = '';
            if (Element_006.type === 'IndentStringGroup') {
                const {contentStr} = Element_006.value.Element_000;
                const effect0 = contentStr.Element_000.contentStr;
                const effect1 = contentStr.Element_001.contentStr;
                const effect2 = contentStr.Element_002.contentStr;
                effectText += '\t' + deleteHtmlText(effect0) + '\r\t' + deleteHtmlText(effect1) + '\r\t' + deleteHtmlText(effect2)
            }

            if (effectText !== '') {
                tmpText += `${effectText}\r`;
            }

            return nTextData.accText += tmpText;
        } else if (res.Name.includes('팔찌')) {
            const nText = Element_004.value.Element_001.split('<BR>');
            for (let i = 0; i < nText.length; i++) {
                if (i === 0) {
                    tmpText += '\t';
                    tmpText += deleteHtmlText(nText[i]).trimStart();
                } else {
                    tmpText += '\r\t' + deleteHtmlText(nText[i]).trimStart();
                }
            }
            return nTextData.accText += tmpText;
        } else {
            // if (res.Type.includes('무기') || res.Type.includes('투구') || res.Type.includes('상의') || res.Type.includes('하의') || res.Type.includes('어깨')) {
            const itemSetName = deleteHtmlText(Element_008.value.Element_000);
            const itemSetLv = deleteHtmlText(Element_008.value.Element_001);
            tmpText += `\t(${itemSetName}) ${itemSetLv}\r`;
            // }
            return nTextData.equipmentText += tmpText;
        }
    })

    return nTextData;
};