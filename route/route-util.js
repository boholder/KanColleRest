import config from 'config'

class RouteUtil {
    static getCommonUrlPrefix() {
        let protocol = config.get('server.use_TLS') ? "https" : "http";
        let domain = config.get('server.domain');
        let apiVersion = config.get('api.current');
        // example: http://localhost:3000/v1/
        return `${protocol}://${domain}/${apiVersion}`;
    }

    static concatApiUrl(apiConfigKey) {
        // if api = 'ship-cg'
        let api = config.get(apiConfigKey);
        // then return http://localhost:3000/v1/ship-cg?
        return `${this.getCommonUrlPrefix()}/${api}`;
    }
}

export {RouteUtil}