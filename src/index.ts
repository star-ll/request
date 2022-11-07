import { Interceptor } from "./types/interceptor.d";
import {
	InitConfig,
	ResponseResult,
	SendOptions,
	SendReturnType,
} from "./types/index.d";
import { Request, Response } from "./interceptor/index.js";
import { dispatch } from "./dispatch/index.js";
import { isDefine, jsonSafeParse } from "./utils/typeof.js";
import { mergeUrl } from "./utils/url.js";
import { formatHeaders } from "./utils/headers.js";

class Fetcher {
	private readonly config: Partial<InitConfig> | {};

	interceptor: Interceptor;

	constructor(config?: InitConfig) {
		this.interceptor = {
			response: new Response(),
			request: new Request(),
		};

		this.config = config || {};
	}

	private mergeConfig(
		config: Partial<InitConfig>,
		sendOptions: SendOptions
	): SendOptions {
		const url = mergeUrl(config.baseURL || "", sendOptions.url);

		return {
			...sendOptions,
			url,
		};
	}

	send(options: SendOptions): SendReturnType {
		options = this.mergeConfig(this.config, options);

		const interceptQueue = [dispatch, undefined];
		interceptQueue.unshift(...this.interceptor.request.queue);
		interceptQueue.push(...this.interceptor.response.queue);

		const head = Promise.resolve(options);
		let result: any = head;

		while (interceptQueue.length) {
			result = result.then(interceptQueue.shift(), interceptQueue.shift());
		}

		return result;
	}

	create(config?: InitConfig) {
		const _fetcher = new Fetcher(config);
		// 构建fetcher函数
		function fetcher(this: any, options: SendOptions) {
			return this.send(options);
		}

		const proto = Object.getPrototypeOf(fetcher);
		Object.setPrototypeOf(proto, _fetcher);

		return fetcher.bind(_fetcher);
	}
}

export default new Fetcher().create();
