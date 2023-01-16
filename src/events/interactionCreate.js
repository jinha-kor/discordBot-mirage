import { Events } from '../index.js';

const eventExecute = async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);
    if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
    }

    try {
        return await command.execute(interaction);
    } catch (error) {
        return console.error(`Error executing ${interaction.commandName}`);
    }
}

export const event = () => {
     return {
         name: Events.InteractionCreate,
         execute: async (interaction) => {
             return eventExecute(interaction);
         }
     }
}