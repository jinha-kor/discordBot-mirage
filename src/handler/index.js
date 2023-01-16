import { Routes } from 'discord.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const Handler = async (client, rest, token, clientId) => {
    const __dirname = fileURLToPath(new URL('..', import.meta.url));

    /* Command */
    const commandsPath = path.join(__dirname, 'commands');
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        // const command = await import(`${process.cwd()}/src/commands/${file}`);
        const { data, execute } = await import(`../../src/commands/${file}`);

        // Set a new item in the Collection with the key as the command name and the value as the exported module
        if (data) {
            await client.commands.set(data().name, { ...data(), execute });
            // await client.slashCommands.set(data().data.name, data().data);
        } else {
            console.log(`[WARNING] The command at ../../src/commands/${file} is missing a required "data" or "execute" property.`);
        }
    }

    /* Event */
    const eventsPath = path.join(__dirname, 'events');
    const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
    for (const file of eventFiles) {
        // const event = await import(`${process.cwd()}/src/events/${file}`);
        const { event } = await import(`../../src/events/${file}`);

        if (event) {
            if (event().once) {
                await client.once(event().name, event().execute);
            } else {
                await client.on(event().name, event().execute);
            }
        } else {
            console.log(`[WARNING] The events at ../../src/events/${file} is missing a required "event" or "execute" property.`);
        }
    }

    try {
        await rest.put(Routes.applicationCommands(clientId), {body: client.commands})
        return client.login(token).then();
    } catch (err) {
        console.log(err);
    }
}

export default Handler;