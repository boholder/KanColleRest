"use strict";

const numberHandler = {
    get: function (target, name) {
        return name in target ? target[name] : NaN;
    }
};

function buildNumberGetterProxy(dto) {
    return new Proxy(dto, numberHandler);
}

const stringHandler = {
    get: function (target, name) {
        return name in target ? target[name] : "";
    }
};

function buildStringGetterProxy(dto) {
    return new Proxy(dto, stringHandler);
}

export {buildNumberGetterProxy, buildStringGetterProxy};