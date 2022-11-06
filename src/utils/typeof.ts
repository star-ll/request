export function getType(type: unknown): string {
	return Object.prototype.toString.call(type).slice(8, -1);
}

export function isString(type: any) {
	return typeof type === "string";
}

export function isDefine(type: any) {
	return type !== null && type !== undefined;
}

export function jsonSafeParse(data: any, errReplace?: any) {
    try {
        return JSON.parse(data)
	} catch (err) {
		return isDefine(errReplace) ? errReplace : data;
	}
}
