import { client, Events } from '../index.js';

const eventExecute = (client) => {
    console.log(client.commands.map(c => c.name).join(', ') + ' 명령어가 로드됨.');
    console.log(`Bot Started is ${client.user.username}`);
}

export const event = () => {
     return {
         name: Events.ClientReady,
         once: true,
         execute: (client) => {
             return eventExecute(client)
         }
     }
}