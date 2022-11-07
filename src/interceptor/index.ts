import { SendOptions } from "../types/index";
import {
	RequestReject,
	RequestResolve,
	ResponseReject,
	ResponseResolve,
} from "../types/interceptor";
import { getType, isDefine } from "../utils/typeof.js";

export class Response {
	queue: Function[] = [];

	use(resolveFn: ResponseResolve, rejectFn: ResponseReject) {
		if (
			getType(resolveFn) !== "Function" ||
			getType(rejectFn) !== "Function"
		) {
			throw new Error(
				"use必须传递两个函数参数，分别处理成功和失败的场景"
			);
		}

		const resolve = (options: SendOptions) => {
			const config = resolveFn.call(null, options);
			if (!isDefine(config)) {
				throw new Error("响应拦截器resolve函数必须return response");
			}
			return config;
		};

		this.queue.push(resolve, rejectFn);
	}
}

export class Request {
	queue: Function[] = [];

	use(resolveFn: RequestResolve, rejectFn: RequestReject) {
		if (
			getType(resolveFn) !== "Function" ||
			getType(rejectFn) !== "Function"
		) {
			throw new Error(
				"use必须传递两个函数参数，分别处理成功和失败的场景"
			);
		}

		const resolve = (options: SendOptions) => {
			const config = resolveFn.call(null, options);
			if (!isDefine(config)) {
				throw new Error("请求拦截器resolve函数必须return config");
			}
			return config;
		};

		this.queue.push(resolve, rejectFn);
	}
}
