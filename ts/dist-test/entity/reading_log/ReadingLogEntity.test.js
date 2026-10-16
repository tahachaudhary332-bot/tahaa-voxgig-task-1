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
(0, node_test_1.describe)('ReadingLogEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when OPEN_LIBRARY_SDK_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('OPEN_LIBRARY_SDK_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.OpenLibrarySdkSDK.test();
        const ent = testsdk.ReadingLog();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.OpenLibrarySdkSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.ReadingLog().list({ "key": 1, "username": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.OPEN_LIBRARY_SDK_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'reading_log.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "logged_date": { "a": true, "h": "Logged Date", "n": "logged_date", "r": true, "t": "`$ANY`", "key$": "logged_date", "index$": 0 }, "logged_edition": { "a": true, "h": "Logged Edition", "n": "logged_edition", "r": true, "t": "`$ANY`", "key$": "logged_edition", "index$": 1 }, "work": { "a": true, "h": "Work", "n": "work", "r": true, "sh": "Work data in reading log.", "t": "`$OBJECT`", "key$": "work", "index$": 2 } }, "name": "reading_log", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /people/{username}/books/{key}.json", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "key", "or": "key", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "username", "or": "username", "r": true, "t": "`$STRING`", "index$": 1 }], "query": [{ "a": true, "ex": 100, "k": "query", "n": "limit", "or": "limit", "r": false, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "ex": "everything", "k": "query", "n": "mode", "or": "mode", "r": false, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "query", "n": "offset", "or": "offset", "r": false, "t": "`$INTEGER`", "index$": 2 }, { "a": true, "k": "query", "n": "page", "or": "page", "r": false, "t": "`$INTEGER`", "index$": 3 }, { "a": true, "ex": "", "k": "query", "n": "q", "or": "q", "r": false, "t": "`$STRING`", "index$": 4 }] }, "k": "http", "m": "GET", "o": "/people/{username}/books/{key}.json", "q": { "exist": ["key", "username"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "people" }, { "var": "username" }, { "lit": "books" }, { "lit": "{key}.json" }], "t": { "req": "`reqdata`", "res": "`body.reading_log_entries`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "reading_log", "name__orig": "reading_log", "Name": "ReadingLog", "name_": "reading_log", "name-": "reading-log", "NAME": "READING_LOG", "index$": 24 }, { "active": true, "entity": "reading_log", "key$": "BasicReadingLogFlow", "kind": "basic", "name": "BasicReadingLogFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": { "key": "key01", "username": "username01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "reading_log_ref01" } }] }] }, 'ReadingLog', { "GET /people/{username}/books/{key}.json": { "protocol": "http", "parameters": [{ "name": "username", "in": "path", "required": true, "schema": { "type": "string", "title": "Username" }, "index$": 0 }, { "name": "key", "in": "path", "required": true, "schema": { "enum": ["want-to-read", "currently-reading", "already-read", "stopped-reading"], "type": "string", "title": "Key" }, "index$": 1 }, { "name": "q", "in": "query", "required": false, "schema": { "type": "string", "minLength": 0, "maxLength": 100, "default": "", "title": "Q" }, "index$": 2 }, { "name": "mode", "in": "query", "required": false, "schema": { "type": "string", "default": "everything", "title": "Mode" }, "index$": 3 }, { "name": "limit", "in": "query", "required": false, "schema": { "type": "integer", "minimum": 0, "default": 100, "title": "Limit" }, "index$": 4 }, { "name": "offset", "in": "query", "required": false, "schema": { "anyOf": [{ "type": "integer", "minimum": 0 }, { "type": "null" }], "title": "Offset" }, "index$": 5 }, { "name": "page", "in": "query", "required": false, "schema": { "anyOf": [{ "type": "integer", "minimum": 1 }, { "type": "null" }], "title": "Page" }, "index$": 6 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let reading_log_ref01_data = Object.values(setup.data.existing.reading_log)[0];
        // LIST
        const reading_log_ref01_ent = client.ReadingLog();
        const reading_log_ref01_match = {};
        reading_log_ref01_match['key'] = setup.idmap['key01'];
        reading_log_ref01_match['username'] = setup.idmap['username01'];
        const reading_log_ref01_list = (await reading_log_ref01_ent.list(reading_log_ref01_match)).map((e) => e.data());
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/reading_log/ReadingLogTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.OpenLibrarySdkSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['reading_log01', 'reading_log02', 'reading_log03', 'key01', 'username01'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'OPEN_LIBRARY_SDK_TEST_READING_LOG_ENTID': idmap,
        'OPEN_LIBRARY_SDK_TEST_LIVE': 'FALSE',
        'OPEN_LIBRARY_SDK_TEST_EXPLAIN': 'FALSE',
        'OPEN_LIBRARY_SDK_APIKEY': '',
        'OPEN_LIBRARY_SDK_SERVER_BASE': "",
    });
    idmap = env['OPEN_LIBRARY_SDK_TEST_READING_LOG_ENTID'];
    const live = 'TRUE' === env.OPEN_LIBRARY_SDK_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['OPEN_LIBRARY_SDK_TEST_READING_LOG_ENTID'];
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
//# sourceMappingURL=ReadingLogEntity.test.js.map