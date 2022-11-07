import { ResponseResult } from "../types/index.js";
import { isFunction } from "./typeof.js";

export function formatHeaders(responseResult: ResponseResult) {
	const proto: any = {};
	const result: any = Object.create(proto);

	for (const [key, fn] of Object.entries(
		Object.getPrototypeOf(responseResult.headers)
	)) {
		if (isFunction(fn)) {
			proto[key] = (...args: any[]) =>
				responseResult.headers[key]?.(...args);
		}
	}

	for (let [key, value] of responseResult.headers.entries()) {
		result[key] = value;
	}

	return result;
}
