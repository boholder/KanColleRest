"use strict";

var numberHandler = {
    get: function (target, name) {
        return name in target ? target[name] : NaN;
    }
};

function buildNumberGetterProxy(dto) {
    return new Proxy(dto, numberHandler);
}

var stringHander = {
    get: function (target, name) {
        return name in target ? target[name] : "";
    }
}

function buildStringGetterProxy(dto) {
    return new Proxy(dto, stringHander);
}

export { buildNumberGetterProxy, buildStringGetterProxy };