import config from 'config'

class BaseRouteUtil {
    static #apiVersion = config.get('api.current_version');
    static #rootUrl = this.getRootUrl();
    static #versionUrl = `${this.#rootUrl}/${this.#apiVersion}`;

    /*
    return: http://[domain]
    */
    static getRootUrl() {
        let protocol = config.get('server.use_TLS') ? "https" : "http";
        let domain = config.get('server.domain');
        return `${protocol}://${domain}`;
    }

    /*
    return: http://[domain]/[api version]
     */
    static getVersionUrl() {
        return this.#versionUrl;
    }

    /*
    return config key 'api.[current_version].[apiConfigKey]' for config getter.
    */
    static getConfigKey(apiConfigKey) {
        return 'api.' + this.#apiVersion + '.' + apiConfigKey;
    }

    /*
    return http://[domain]/[api version]/[urlPrefix]/[config.get(apiConfigKey.route)]
    example: http://example.com/v1/ship/info
     */
    static concatUrlWith(urlPrefix, apiConfigKey) {
        let route = config.get(`${apiConfigKey}.route`);
        return BaseRouteUtil.#concatVersionUrlWith(`${urlPrefix}/${route}`);
    }

    /*
    return http://[domain]/[api version]/[apiPart]
     */
    static #concatVersionUrlWith(apiPart) {
        return `${this.#versionUrl}/${apiPart}`;
    }

    /*
    return: /[api version]/[urlPrefix]/[config.get(apiConfigKey.route)] for router routing
    example: /v1/ship/info
     */
    static concatVersionRouteWIth(urlPrefix, apiConfigKey) {
        let route = config.get(`${apiConfigKey}.route`);
        return `/${this.#apiVersion}/${urlPrefix}/${route}`;
    }
}

export {BaseRouteUtil}