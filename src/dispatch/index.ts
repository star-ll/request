export function dispatch(config: any) {
	return fetch(config.url, {
		...config,
	});
}
