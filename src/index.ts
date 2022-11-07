import { Interceptor } from "./types/interceptor.d";
import {
	InitConfig,
	ResponseResult,
	SendOptions,
	SendReturnType,
} from "./types/index.d";
import { Request, Response } from "./interceptor/index.js";
import { dispatch } from "./dispatch/index.js";
import { jsonSafeParse } from "./utils/typeof.js";
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
		let res: any = head;

		while (interceptQueue.length) {
			res = res.then(interceptQueue.shift(), interceptQueue.shift());
		}

		return res.then(
			async (res: ResponseResult) => {
				let data = null;

				if (res.headers.get("content-type") === "application/json") {
					data = await res.json();
					data = jsonSafeParse(data);
				} else {
					data = await res.text();
				}

				const result = {
					data,
					headers: formatHeaders(res),
					ok: res.ok,
					redirected: res.redirected,
					status: res.status,
					statusText: res.statusText,
					url: res.url,
					source: res,
				};

				return result;
			},
			(err: Error) => Promise.reject(err)
		);
	}
}

export default Fetcher;
