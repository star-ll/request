import { ResponseResult, SendOptions } from "./index.d";
import { Response, Request } from "../interceptor/index";

export interface Interceptor {
	response: InstanceType<Response>;
	request: InstanceType<Request>;
}

export type ResponseResolve = (ResponseResult) => ResponseResult;
export type ResponseReject = (Error) => Promise<any>;


export type RequestResolve = (SendOptions) => SendOptions;
export type RequestReject = (Error) => Promise<any>;
