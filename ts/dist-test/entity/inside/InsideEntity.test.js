"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('InsideEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when OPEN_LIBRARY_SDK_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('OPEN_LIBRARY_SDK_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.OpenLibrarySdkSDK.test();
        const ent = testsdk.Inside();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.OpenLibrarySdkSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Inside().load({ "facet": "x", "q": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.OPEN_LIBRARY_SDK_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'inside.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": {}, "name": "inside", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /search/inside.json", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": true, "k": "query", "n": "facet", "or": "facets", "r": false, "t": "`$BOOLEAN`", "index$": 0 }, { "a": true, "k": "query", "n": "language", "or": "language", "r": false, "t": "`$ANY`", "index$": 1 }, { "a": true, "ex": 20, "k": "query", "n": "limit", "or": "limit", "r": false, "t": "`$INTEGER`", "index$": 2 }, { "a": true, "k": "query", "n": "offset", "or": "offset", "r": false, "t": "`$INTEGER`", "index$": 3 }, { "a": true, "k": "query", "n": "page", "or": "page", "r": false, "t": "`$INTEGER`", "index$": 4 }, { "a": true, "k": "query", "n": "q", "or": "q", "r": true, "t": "`$STRING`", "index$": 5 }, { "a": true, "ex": false, "k": "query", "n": "readable", "or": "readable", "r": false, "t": "`$BOOLEAN`", "index$": 6 }] }, "k": "http", "m": "GET", "o": "/search/inside.json", "q": { "exist": ["q"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "search" }, { "lit": "inside.json" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "inside", "name__orig": "inside", "Name": "Inside", "name_": "inside", "name-": "inside", "NAME": "INSIDE", "index$": 14 }, { "active": true, "entity": "inside", "key$": "BasicInsideFlow", "kind": "basic", "name": "BasicInsideFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "inside_ref01", "srcdatavar": "inside_ref01_data", "suffix": "_dt0" }, "m": {}, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-inside_ref01" } }] }] }, 'Inside', { "GET /search/inside.json": { "protocol": "http", "parameters": [{ "name": "q", "in": "query", "required": true, "schema": { "type": "string", "title": "Search query" }, "index$": 0 }, { "name": "facets", "in": "query", "required": false, "schema": { "type": "boolean", "description": "Include facet aggregations in the response.", "default": true, "title": "Facets" }, "description": "Include facet aggregations in the response.", "index$": 1 }, { "name": "readable", "in": "query", "required": false, "schema": { "type": "boolean", "description": "Drop matches that aren't readable (public or borrowable) scans. hits.total still counts them.", "default": false, "title": "Readable" }, "description": "Drop matches that aren't readable (public or borrowable) scans. hits.total still counts them.", "index$": 2 }, { "name": "language", "in": "query", "required": false, "schema": { "anyOf": [{ "type": "array", "items": { "type": "string" } }, { "type": "null" }], "description": "Filter by language — a MARC code (e.g. fre) or language name. The FTS backend takes one language; extra values are ignored.", "title": "Language" }, "description": "Filter by language — a MARC code (e.g. fre) or language name. The FTS backend takes one language; extra values are ignored.", "index$": 3 }, { "name": "limit", "in": "query", "required": false, "schema": { "type": "integer", "minimum": 0, "default": 20, "title": "Limit" }, "index$": 4 }, { "name": "offset", "in": "query", "required": false, "schema": { "anyOf": [{ "type": "integer", "minimum": 0 }, { "type": "null" }], "title": "Offset" }, "index$": 5 }, { "name": "page", "in": "query", "required": false, "schema": { "anyOf": [{ "type": "integer", "minimum": 1 }, { "type": "null" }], "title": "Page" }, "index$": 6 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let inside_ref01_data = Object.values(setup.data.existing.inside)[0];
        // LOAD
        const inside_ref01_ent = client.Inside();
        const inside_ref01_match_dt0 = {};
        const inside_ref01_data_dt0 = (await inside_ref01_ent.load(inside_ref01_match_dt0)).data();
        (0, node_assert_1.default)(null != inside_ref01_data_dt0);
    });
});
// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true;
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/inside/InsideTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.OpenLibrarySdkSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['inside01', 'inside02', 'inside03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'OPEN_LIBRARY_SDK_TEST_INSIDE_ENTID': idmap,
        'OPEN_LIBRARY_SDK_TEST_LIVE': 'FALSE',
        'OPEN_LIBRARY_SDK_TEST_EXPLAIN': 'FALSE',
        'OPEN_LIBRARY_SDK_APIKEY': '',
        'OPEN_LIBRARY_SDK_SERVER_BASE': "",
    });
    idmap = env['OPEN_LIBRARY_SDK_TEST_INSIDE_ENTID'];
    const live = 'TRUE' === env.OPEN_LIBRARY_SDK_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['OPEN_LIBRARY_SDK_TEST_INSIDE_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.OpenLibrarySdkSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {
                apikey: env.OPEN_LIBRARY_SDK_APIKEY,
                server: {
                    base: env.OPEN_LIBRARY_SDK_SERVER_BASE,
                },
            },
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.OPEN_LIBRARY_SDK_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=InsideEntity.test.js.map