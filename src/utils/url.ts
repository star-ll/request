export function mergeUrl(baseUrl:string,url:string): string {
    return baseUrl.replace(/\/+$/,'') + '/'+url.replace(/^\/+/,'')
}