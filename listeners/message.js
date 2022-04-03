const Discord = require('discord.js');
const { Listener } = require('discord-akairo');

class MessageListener extends Listener {
    constructor() {
        super('message', {
            emitter: 'client',
            event: 'message'
        });
    }

    exec(msg) {
    }
}

module.exports = MessageListener;
