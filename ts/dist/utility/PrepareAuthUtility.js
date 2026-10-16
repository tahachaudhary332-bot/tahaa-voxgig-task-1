"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepareAuth = prepareAuth;
const PrepareHeadersUtility_1 = require("./PrepareHeadersUtility");
const CRED_name = 'session';
const COOKIE_header = 'cookie';
const OPTION_apikey = 'apikey';
const OPTION_secret = 'secret';
const NOTFOUND = '__NOTFOUND__';
// The client's `auth.name` option, when set, replaces the name the API declares.
function credName(name) {
    return 'string' === typeof name && '' !== name ? name : CRED_name;
}
function prepareAuth(ctx) {
    const utility = ctx.utility;
    const struct = utility.struct;
    const getprop = struct.getprop;
    const setprop = struct.setprop;
    const delprop = struct.delprop;
    const client = ctx.client;
    const spec = ctx.spec;
    if (null == spec) {
        return ctx.error('auth_no_spec', 'Expected context spec property to be defined.');
    }
    const headers = spec.headers;
    function cookieSet(headers, name, value) {
        const existing = getprop(headers, COOKIE_header, '');
        const kept = 'string' === typeof existing ? (0, PrepareHeadersUtility_1.cookieKeep)(existing, [name]) : [];
        if (null != value) {
            kept.push(name + '=' + value);
        }
        if (0 === kept.length) {
            delprop(headers, COOKIE_header);
        }
        else {
            setprop(headers, COOKIE_header, kept.join('; '));
        }
    }
    const options = client.options();
    // Public APIs that need no auth omit the options.auth block entirely.
    if (null == options.auth) {
        cookieSet(headers, CRED_name, null);
        return spec;
    }
    const prefix = options.auth.prefix;
    const name = credName(options.auth.name);
    // A credential left under the declared name would travel beside the renamed one.
    if (CRED_name !== name) {
        cookieSet(headers, CRED_name, null);
    }
    const apikey = getprop(options, OPTION_apikey, NOTFOUND);
    if (NOTFOUND === apikey || null == apikey || '' === apikey) {
        cookieSet(headers, name, null);
    }
    else {
        cookieSet(headers, name, apikey);
    }
    return spec;
}
//# sourceMappingURL=PrepareAuthUtility.js.map