const { AkairoClient, CommandHandler, InhibitorHandler, ListenerHandler } = require('discord-akairo');

class MyClient extends AkairoClient {
    constructor() {
        super({
            ownerID: '257825765528174593',
        }, {
            disableEveryone: true
        });

        this.commandHandler = new CommandHandler(this, {
            directory: './commands/',
            prefix: '.'
        });

        this.inhibitorHandler = new InhibitorHandler(this, {
            directory: './inhibitors/'
        });

        this.listenerHandler = new ListenerHandler(this, {
            directory: './listeners/'
        });

        this.setup();
    }

    setup() {
        this.commandHandler.useInhibitorHandler(this.inhibitorHandler);
        this.commandHandler.useListenerHandler(this.listenerHandler);

        this.listenerHandler.setEmitters({
            commandHandler: this.commandHandler,
            inhibitorHandler: this.inhibitorHandler,
            listenerHandler: this.listenerHandler
        });

        this.commandHandler.loadAll();
        this.inhibitorHandler.loadAll();
        this.listenerHandler.loadAll();

        const resolver = this.commandHandler.resolver;
        resolver.addType('1-10', (message, phrase) => {
            const num = resolver.type('integer')(phrase);
            if (num == null) return null;
            if (num < 1 || num > 10) return null;
            return num;
        });
    }

    async start(token) {
        await this.login(token);
        console.log('Ready!'); // eslint-disable-line no-console
    }
}
const client = new MyClient();

client.start('');
