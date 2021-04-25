"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patch = exports.del = exports.post = exports.put = exports.get = void 0;
require("reflect-metadata");
var Method_1 = require("./Method");
var MetadataKeys_1 = require("./MetadataKeys");
function routeBinder(method) {
    return function get(path) {
        return function (target, key, desc) {
            Reflect.defineMetadata(MetadataKeys_1.MetadataKeys.path, path, target, key);
            Reflect.defineMetadata(MetadataKeys_1.MetadataKeys.method, method, target, key);
        };
    };
}
exports.get = routeBinder(Method_1.Methods.get);
exports.put = routeBinder(Method_1.Methods.put);
exports.post = routeBinder(Method_1.Methods.post);
exports.del = routeBinder(Method_1.Methods.del);
exports.patch = routeBinder(Method_1.Methods.patch);
