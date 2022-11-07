import { Interceptor } from "./types/interceptor.d";
import {
	InitConfig,
	ResponseResult,
	SendOptions,
	SendReturnType,
} from "./types/index.d";
import {
	Request as RequestInterceptor,
	Response as ResponseInterceptor,
} from "./interceptor/index.js";
import { dispatch } from "./dispatch/index.js";
import { mergeUrl } from "./utils/url.js";

class Request {
	private readonly config: Partial<InitConfig> | {};

	interceptor: Interceptor;

	constructor(config?: InitConfig) {
		this.interceptor = {
			response: new ResponseInterceptor(),
			request: new RequestInterceptor(),
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
			result = result.then(
				interceptQueue.shift(),
				interceptQueue.shift()
			);
		}

		return result;
	}

	create(config?: InitConfig) {
		const _request = new Request(config);
		// 构建request函数
		function request(this: any, options: SendOptions) {
			return this.send(options);
		}

		const proto = Object.getPrototypeOf(request);
		Object.setPrototypeOf(proto, _request);

		return request.bind(_request);
	}
}

export default new Request().create();
