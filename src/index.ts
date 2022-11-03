import { InitConfig, SendOptions } from "./types/fetcher.d";

class Fetcher {
	private readonly config: Partial<InitConfig> = {
		methods: "get",
	};

	constructor(config: InitConfig) {}

	send(
		url: string,
		options: SendOptions = {
			methods: "get",
		}
	) {
		return fetch(url, options as RequestInit);
	}
}

export default Fetcher;
