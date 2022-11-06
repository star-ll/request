import { RequestReject, RequestResolve, ResponseReject, ResponseResolve } from "../types/interceptor";
import { getType } from "../utils/typeof.js";

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

		this.queue.push(resolveFn, rejectFn);
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

		this.queue.push(resolveFn, rejectFn);
	}
}
