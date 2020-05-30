import { AkairoClient, CommandHandler, ListenerHandler, InhibitorHandler } from 'discord-akairo';
import { akairoOptions, TOKEN, clientOptions } from './config';
import { SongQueue } from './interfaces/interfaces';

class Client extends AkairoClient {
	commandHandler: CommandHandler;
	listenerHandler: ListenerHandler;
	inhibitorHandler: InhibitorHandler;
	songQueue: SongQueue;
	constructor() {
		super(akairoOptions, clientOptions);

		this.commandHandler = new CommandHandler(this, {
			directory: './dist/commands/',
			prefix: '.',
			allowMention: true
		});

		this.inhibitorHandler = new InhibitorHandler(this, {
			directory: './dist/inhibitors'
		});

		this.listenerHandler = new ListenerHandler(this, {
			directory: './dist/listeners'
		});

		this.listenerHandler.setEmitters({
			commandHandler: this.commandHandler,
			listenerHandler: this.listenerHandler
		});

		this.commandHandler.useListenerHandler(this.listenerHandler).useInhibitorHandler(this.inhibitorHandler);
		this.inhibitorHandler.loadAll();
		this.listenerHandler.loadAll();
		this.commandHandler.loadAll();

		this.songQueue = {};
	}
}

const client = new Client();

client.login(TOKEN);
