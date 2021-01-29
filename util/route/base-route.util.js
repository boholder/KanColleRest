import config from 'config'

class BaseRouteUtil {
    static #apiVersion = config.get('api.current_version');
    // http://[domain]
    static rootUrl = this.#getRootUrl();
    // http://[domain]/[api version]
    static versionUrl = `${this.rootUrl}/${this.#apiVersion}`;

    /*
    return: http://[domain]
    */
    static #getRootUrl() {
        let protocol = config.get('server.use_TLS') ? "https" : "http";
        let domain = config.get('server.domain');
        return `${protocol}://${domain}`;
    }

    /*
    return config key 'api.[current_version].[apiConfigKey]' for config getter.
    */
    static getConfigKey(apiConfigKey) {
        return 'api.' + this.#apiVersion + '.' + apiConfigKey;
    }

    /*
    return http://[domain]/[api version]/[middleUrlPart]/[config.get(apiConfigKey.route)]
    example: http://example.com/v1/ship/info
     */
    static concatVersionUrlWith(middleUrlPart, apiConfigKey) {
        let route = config.get(`${apiConfigKey}.route`);
        return BaseRouteUtil.#concatVersionUrlWithApi(`${middleUrlPart}/${route}`);
    }

    /*
    return http://[domain]/[api version]/[apiPart]
     */
    static #concatVersionUrlWithApi(apiPart) {
        return `${this.versionUrl}/${apiPart}`;
    }

    /*
    return: /[api version]/[middleUrlPart]/[config.get(apiConfigKey.route)] for router routing
    example: /v1/ship/info
     */
    static concatVersionRouteWIth(middleUrlPart, apiConfigKey) {
        let route = config.get(`${apiConfigKey}.route`);
        return `/${this.#apiVersion}/${middleUrlPart}/${route}`;
    }
}

export {BaseRouteUtil}