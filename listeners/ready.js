const { Listener } = require('discord-akairo');

class ReadyListener extends Listener {
    constructor() {
        super('ready', {
            emitter: 'client',
            event: 'ready'
        });
    }

    exec() {
        this.client.user.setActivity('.도움',{type:'LISTENING'});
        this.client.generateInvite(['ADMINISTRATOR'])
        .then(link => console.log(link))
    }
}

module.exports = ReadyListener;