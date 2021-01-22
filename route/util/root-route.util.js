import config from 'config'

class RootRouteUtil {
    /*
    return config key 'api.[current_version].[apiConfigKey]' for config getter.
    */
    static getConfigKey(apiConfigKey) {
        let apiVersion = config.get('api.current_version');
        return 'api.' + apiVersion + '.' + apiConfigKey;
    }

    /*
    return http://localhost:3000/[api version]/[urlPrefix]/[config.get(apiConfigKey.route)]
     */
    static concatUrlWith(urlPrefix, apiConfigKey) {
        let route = config.get(`${apiConfigKey}.route`);
        return RootRouteUtil.concatVersionedUrlWith(`${urlPrefix}/${route}`);
    }

    /*
    return [http://localhost:3000/[api version]/[apiPart]
     */
    static concatVersionedUrlWith(apiPart) {
        return `${this.getVersionedUrl()}/${apiPart}`;
    }

    /*
    example: http://localhost:3000/v1
     */
    static getVersionedUrl() {
        let apiVersion = config.get('api.current');
        return `${this.getRootUrl()}/${apiVersion}`;
    }

    /*
    example: http://localhost:3000
     */
    static getRootUrl() {
        let protocol = config.get('server.use_TLS') ? "https" : "http";
        let domain = config.get('server.domain');
        return `${protocol}://${domain}`;
    }
}

export {RootRouteUtil}