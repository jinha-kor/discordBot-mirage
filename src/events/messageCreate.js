import { Events } from '../index.js';

const eventExecute = async (msg) => {
    console.log('msg >>>', msg.content)
}

export const event = () => {
     return {
         name: Events.MessageCreate,
         execute: async (msg) => {
             return eventExecute(msg);
         }
     }
}