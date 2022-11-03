export type Methods = "get" | "post" | "delete" | "patch";

export interface InitConfig {}

export interface SendOptions {
	methods: Methods;
}
