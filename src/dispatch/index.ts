import { ResponseResult, SendReturnType } from "../types/index";
import { formatHeaders } from "../utils/headers.js";
import { jsonSafeParse } from "../utils/typeof.js";

export function dispatch(config: any) {
	return fetch(config.url, {
		...config,
	}).then(
		async (res: ResponseResult) => {
			let data = null;

			if (res.headers.get("content-type") === "application/json") {
				data = await res.json();
				data = jsonSafeParse(data);
			} else {
				data = await res.text();
			}

			const result: SendReturnType = {
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
