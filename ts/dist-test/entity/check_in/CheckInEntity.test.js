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
(0, node_test_1.describe)('CheckInEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when OPEN_LIBRARY_SDK_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('OPEN_LIBRARY_SDK_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.OpenLibrarySdkSDK.test();
        const ent = testsdk.CheckIn();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.OpenLibrarySdkSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.CheckIn().create({ "work_id": "x", "event_type": 1, "id": 1, "status": "x", "year": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.OPEN_LIBRARY_SDK_TEST_LIVE;
        for (const op of ['create', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'check_in.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "day": { "a": true, "h": "Day", "n": "day", "r": false, "sh": "Day (1-31)", "t": "`$ANY`", "key$": "day", "index$": 0 }, "edition_key": { "a": true, "h": "Edition Key", "n": "edition_key", "r": false, "sh": "Edition OLID (e.g.", "t": "`$ANY`", "key$": "edition_key", "index$": 1 }, "event_id": { "a": true, "h": "Event Id", "n": "event_id", "r": false, "t": "`$STRING`", "key$": "event_id", "index$": 2 }, "event_type": { "a": true, "h": "Event Type", "n": "event_type", "r": true, "sh": "Event type enum value (1=start, 2=update, 3=finish)", "t": "`$INTEGER`", "key$": "event_type", "index$": 3 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "t": "`$INTEGER`", "key$": "id", "index$": 4 }, "month": { "a": true, "h": "Month", "n": "month", "r": false, "sh": "Month (1-12)", "t": "`$ANY`", "key$": "month", "index$": 5 }, "status": { "a": true, "h": "Status", "n": "status", "r": true, "t": "`$STRING`", "key$": "status", "index$": 6 }, "year": { "a": true, "h": "Year", "n": "year", "r": true, "sh": "Four-digit year (1-9999)", "t": "`$INTEGER`", "key$": "year", "index$": 7 } }, "id": { "field": "id", "name": "id" }, "name": "check_in", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["day", "edition_key", "event_id", "event_type", "month", "year"], "co": { "id": "POST /works/OL{work_id}W/check-ins", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "work_id", "or": "work_id", "r": true, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/works/OL{work_id}W/check-ins", "q": { "exist": ["work_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "works" }, { "lit": "OL{work_id}W" }, { "lit": "check-ins" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "bf": ["day", "edition_key", "event_id", "event_type", "month", "year"], "co": { "id": "POST /works/OL{work_id}W/check-ins.json", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "work_id", "or": "work_id", "r": true, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/works/OL{work_id}W/check-ins.json", "q": { "exist": ["work_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "works" }, { "lit": "OL{work_id}W" }, { "lit": "check-ins.json" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "create" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /check-ins/{check_in_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "check_in_id", "r": true, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "DELETE", "o": "/check-ins/{check_in_id}", "q": { "exist": ["id"] }, "r": { "param": { "check_in_id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "check-ins" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" } }, "relations": { "ancestors": [] }, "key$": "check_in", "name__orig": "check_in", "Name": "CheckIn", "name_": "check_in", "name-": "check-in", "NAME": "CHECK_IN", "index$": 6 }, { "active": true, "entity": "check_in", "key$": "BasicCheckInFlow", "kind": "basic", "name": "BasicCheckInFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "check_in_ref01" }, "m": { "work_id": "work01" }, "o": "create", "s": [], "v": [] }, { "a": true, "d": {}, "i": { "ref": "check_in_ref01", "suffix": "_rm0" }, "m": { "id": "check_in01" }, "o": "remove", "s": [], "v": [] }] }, 'CheckIn', { "POST /works/OL{work_id}W/check-ins": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "properties": { "event_type": { "type": "integer", "title": "Event Type", "description": "Event type enum value (1=start, 2=update, 3=finish)", "key$": "event_type" }, "year": { "type": "integer", "maximum": 9999, "exclusiveMinimum": 0, "title": "Year", "description": "Four-digit year (1-9999)", "key$": "year" }, "month": { "anyOf": [{ "type": "integer", "maximum": 12, "minimum": 1 }, { "type": "null" }], "title": "Month", "description": "Month (1-12)", "key$": "month" }, "day": { "anyOf": [{ "type": "integer", "maximum": 31, "minimum": 1 }, { "type": "null" }], "title": "Day", "description": "Day (1-31)", "key$": "day" }, "edition_key": { "anyOf": [{ "type": "string", "pattern": "(?i)^(?:/books/)?OL\\d+M$" }, { "type": "null" }], "title": "Edition Key", "description": "Edition OLID (e.g. OL123M)", "key$": "edition_key" }, "event_id": { "anyOf": [{ "type": "integer" }, { "type": "null" }], "title": "Event Id", "key$": "event_id" } }, "type": "object", "required": ["event_type", "year"], "title": "CheckInRequest", "description": "Request model for creating/updating check-in events.", "x-ref": "#/components/schemas/CheckInRequest", "index$": 1 } } } }, "parameters": [{ "name": "work_id", "in": "path", "required": true, "schema": { "type": "integer", "exclusiveMinimum": 0, "title": "Work Id" }, "index$": 0 }] }, "POST /works/OL{work_id}W/check-ins.json": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "properties": { "event_type": { "type": "integer", "title": "Event Type", "description": "Event type enum value (1=start, 2=update, 3=finish)", "key$": "event_type" }, "year": { "type": "integer", "maximum": 9999, "exclusiveMinimum": 0, "title": "Year", "description": "Four-digit year (1-9999)", "key$": "year" }, "month": { "anyOf": [{ "type": "integer", "maximum": 12, "minimum": 1 }, { "type": "null" }], "title": "Month", "description": "Month (1-12)", "key$": "month" }, "day": { "anyOf": [{ "type": "integer", "maximum": 31, "minimum": 1 }, { "type": "null" }], "title": "Day", "description": "Day (1-31)", "key$": "day" }, "edition_key": { "anyOf": [{ "type": "string", "pattern": "(?i)^(?:/books/)?OL\\d+M$" }, { "type": "null" }], "title": "Edition Key", "description": "Edition OLID (e.g. OL123M)", "key$": "edition_key" }, "event_id": { "anyOf": [{ "type": "integer" }, { "type": "null" }], "title": "Event Id", "key$": "event_id" } }, "type": "object", "required": ["event_type", "year"], "title": "CheckInRequest", "description": "Request model for creating/updating check-in events.", "x-ref": "#/components/schemas/CheckInRequest", "index$": 1 } } } }, "parameters": [{ "name": "work_id", "in": "path", "required": true, "schema": { "type": "integer", "exclusiveMinimum": 0, "title": "Work Id" }, "index$": 0 }] }, "DELETE /check-ins/{check_in_id}": { "protocol": "http", "parameters": [{ "name": "check_in_id", "in": "path", "required": true, "schema": { "type": "integer", "exclusiveMinimum": 0, "title": "Check In Id" }, "index$": 0 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const check_in_ref01_ent = client.CheckIn();
        let check_in_ref01_data = setup.data.new.check_in['check_in_ref01'];
        check_in_ref01_data['work_id'] = setup.idmap['work01'];
        check_in_ref01_data = (await check_in_ref01_ent.create(check_in_ref01_data)).data();
        (0, node_assert_1.default)(null != check_in_ref01_data.id);
        // REMOVE
        const check_in_ref01_match_rm0 = { id: check_in_ref01_data.id };
        await check_in_ref01_ent.remove(check_in_ref01_match_rm0);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/check_in/CheckInTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.OpenLibrarySdkSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['check_in01', 'check_in02', 'check_in03', 'work01'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'OPEN_LIBRARY_SDK_TEST_CHECK_IN_ENTID': idmap,
        'OPEN_LIBRARY_SDK_TEST_LIVE': 'FALSE',
        'OPEN_LIBRARY_SDK_TEST_EXPLAIN': 'FALSE',
        'OPEN_LIBRARY_SDK_APIKEY': '',
        'OPEN_LIBRARY_SDK_SERVER_BASE': "",
    });
    idmap = env['OPEN_LIBRARY_SDK_TEST_CHECK_IN_ENTID'];
    const live = 'TRUE' === env.OPEN_LIBRARY_SDK_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['OPEN_LIBRARY_SDK_TEST_CHECK_IN_ENTID'];
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
//# sourceMappingURL=CheckInEntity.test.js.map