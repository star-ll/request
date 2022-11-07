export type Methods = "get" | "post" | "delete" | "patch";

export type InitConfig = {
	baseURL: string;
};

export type SendOptions = {
	url: string;
	method: Methods = "get";
};

export type MergeConfig = InitConfig & SendOptions;

export interface ResponseResult {
	headers: any;
	ok: boolean;
	body: any;
	bodyUsed: boolean;
	redirected: boolean;
	status: number;
	statusText: string;
	type: string;
	url: string;

	json: () => any;
	text: () => any;
}

export interface SendReturnType {
	data:any;
	headers: any;
	ok: boolean;
	redirected: boolean;
	status: number;
	statusText: string;
	url: string;
	source: any;
}
