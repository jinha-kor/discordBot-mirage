export const embedTextUtil = (text, target) => {
    let embedText = '```';
    if (target === 'effect' || target === 'equipment') {
        embedText += '\r';
        const tmpText = text.split(',');
        for (let i=0; i<tmpText.length; i++) {
            if (i === tmpText.length - 1) {
                embedText += tmpText[i];
            } else {
                if (i === 0) embedText += '\r';
                embedText += `${tmpText[i]}\r`;
            }
        }
    } else {
        embedText += `\r`;
        embedText += text;
    }
    embedText += '\r```';

    return embedText;
}

export const deleteHtmlText = (text) => {
    return text.replace(/<[^<>]+>/gi, '');
}

export const deleteHtmlText2 = (text) => {
    let nText = text.replace(/<BR>/gi, ' | ');
    nText = nText.replace(/<[^<>]+>/gi, '');

    return nText;
}