import { AttachmentBuilder, EmbedBuilder } from 'discord.js'

const Embed = (props) => {
    const { color, title, url, author, description, thumbnail, fields, image, timestamp, footer, file } = props;
    const formData = {};

    const tmpEmbed = new EmbedBuilder();
    if (color) tmpEmbed.setColor(color);
    if (title) tmpEmbed.setTitle(title);
    if (url) tmpEmbed.setURL(url);
    if (author) tmpEmbed.setAuthor(author);
    if (description) tmpEmbed.setDescription(description);
    if (thumbnail) tmpEmbed.setThumbnail(thumbnail.url);
    if (fields) {
        for (const field of fields) {
            tmpEmbed.addFields(field);
        }
    }
    if (image) tmpEmbed.setImage(image.url);
    if (timestamp) tmpEmbed.setTimestamp(timestamp);
    if (footer) tmpEmbed.setFooter(footer);

    formData.embeds = [tmpEmbed];

    if (file) {
        formData.files = [new AttachmentBuilder(file)];
    }

    return formData;
}

export default Embed;