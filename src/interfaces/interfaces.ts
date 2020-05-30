import { Argument, AkairoClient } from "discord-akairo";

export interface Args extends Argument {
	query: string
}

export interface SongQueueClient extends AkairoClient {
	songQueue: SongQueue
}

export interface VideoDetails {
	title: string
	url: string
}

export interface SongQueue {
	[x: string]: VideoDetails[]
}
