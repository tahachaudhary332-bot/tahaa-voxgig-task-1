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
(0, node_test_1.describe)('ListSubjectsModelEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when OPEN_LIBRARY_SDK_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('OPEN_LIBRARY_SDK_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.OpenLibrarySdkSDK.test();
        const ent = testsdk.ListSubjectsModel();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.OpenLibrarySdkSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.ListSubjectsModel().list({ "series_id": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.OPEN_LIBRARY_SDK_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'list_subjects_model.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "id": { "a": true, "h": "Id", "n": "id", "r": false, "t": "`$STRING`", "key$": "id", "index$": 0 }, "links": { "a": true, "h": "Links", "n": "links", "r": true, "t": "`$OBJECT`", "key$": "links", "index$": 1 }, "people": { "a": true, "h": "People", "n": "people", "r": true, "t": "`$ARRAY`", "key$": "people", "index$": 2 }, "places": { "a": true, "h": "Places", "n": "places", "r": true, "t": "`$ARRAY`", "key$": "places", "index$": 3 }, "subjects": { "a": true, "h": "Subjects", "n": "subjects", "r": true, "t": "`$ARRAY`", "key$": "subjects", "index$": 4 }, "times": { "a": true, "h": "Times", "n": "times", "r": true, "t": "`$ARRAY`", "key$": "times", "index$": 5 } }, "id": { "field": "id", "name": "id" }, "name": "list_subjects_model", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /people/{username}/lists/{olid}/subjects.json", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "olid", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "username", "or": "username", "r": true, "t": "`$STRING`", "index$": 1 }], "query": [{ "a": true, "ex": 20, "k": "query", "n": "limit", "or": "limit", "r": false, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/people/{username}/lists/{olid}/subjects.json", "q": { "$action": "subjects.json", "exist": ["id", "username"] }, "r": { "param": { "olid": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "people" }, { "var": "username" }, { "lit": "lists" }, { "var": "id" }, { "lit": "subjects.json" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /lists/{olid}/subjects.json", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "olid", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "ex": 20, "k": "query", "n": "limit", "or": "limit", "r": false, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/lists/{olid}/subjects.json", "q": { "$action": "subjects.json", "exist": ["id"] }, "r": { "param": { "olid": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "lists" }, { "var": "id" }, { "lit": "subjects.json" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }, { "a": true, "co": { "id": "GET /series/{olid}/subjects.json", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "series_id", "or": "olid", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "ex": 20, "k": "query", "n": "limit", "or": "limit", "r": false, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/series/{olid}/subjects.json", "q": { "exist": ["series_id"] }, "r": { "param": { "olid": "series_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "series" }, { "var": "series_id" }, { "lit": "subjects.json" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 2 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "list_subjects_model", "name__orig": "list_subjects_model", "Name": "ListSubjectsModel", "name_": "list_subjects_model", "name-": "list-subjects-model", "NAME": "LIST_SUBJECTS_MODEL", "index$": 19 }, { "active": true, "entity": "list_subjects_model", "key$": "BasicListSubjectsModelFlow", "kind": "basic", "name": "BasicListSubjectsModelFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": { "series_id": "series01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "list_subjects_model_ref01" } }] }] }, 'ListSubjectsModel', { "GET /people/{username}/lists/{olid}/subjects.json": { "protocol": "http", "parameters": [{ "name": "username", "in": "path", "required": true, "schema": { "type": "string", "description": "The patron's username", "title": "Username" }, "description": "The patron's username", "index$": 0 }, { "name": "olid", "in": "path", "required": true, "schema": { "type": "string", "pattern": "OL\\d+L", "description": "The OLID, e.g. OL123L", "title": "Olid" }, "description": "The OLID, e.g. OL123L", "index$": 1 }, { "name": "limit", "in": "query", "required": false, "schema": { "type": "integer", "minimum": 0, "description": "Number of subjects to return", "default": 20, "title": "Limit" }, "description": "Number of subjects to return", "index$": 2 }] }, "GET /lists/{olid}/subjects.json": { "protocol": "http", "parameters": [{ "name": "olid", "in": "path", "required": true, "schema": { "type": "string", "pattern": "OL\\d+L", "description": "The OLID, e.g. OL123L", "title": "Olid" }, "description": "The OLID, e.g. OL123L", "index$": 0 }, { "name": "limit", "in": "query", "required": false, "schema": { "type": "integer", "minimum": 0, "description": "Number of subjects to return", "default": 20, "title": "Limit" }, "description": "Number of subjects to return", "index$": 1 }] }, "GET /series/{olid}/subjects.json": { "protocol": "http", "parameters": [{ "name": "olid", "in": "path", "required": true, "schema": { "type": "string", "pattern": "OL\\d+L", "description": "The OLID, e.g. OL123L", "title": "Olid" }, "description": "The OLID, e.g. OL123L", "index$": 0 }, { "name": "limit", "in": "query", "required": false, "schema": { "type": "integer", "minimum": 0, "description": "Number of subjects to return", "default": 20, "title": "Limit" }, "description": "Number of subjects to return", "index$": 1 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let list_subjects_model_ref01_data = Object.values(setup.data.existing.list_subjects_model)[0];
        // LIST
        const list_subjects_model_ref01_ent = client.ListSubjectsModel();
        const list_subjects_model_ref01_match = {};
        list_subjects_model_ref01_match['series_id'] = setup.idmap['series01'];
        const list_subjects_model_ref01_list = (await list_subjects_model_ref01_ent.list(list_subjects_model_ref01_match)).map((e) => e.data());
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/list_subjects_model/ListSubjectsModelTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.OpenLibrarySdkSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['list_subjects_model01', 'list_subjects_model02', 'list_subjects_model03', 'series01'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'OPEN_LIBRARY_SDK_TEST_LIST_SUBJECTS_MODEL_ENTID': idmap,
        'OPEN_LIBRARY_SDK_TEST_LIVE': 'FALSE',
        'OPEN_LIBRARY_SDK_TEST_EXPLAIN': 'FALSE',
        'OPEN_LIBRARY_SDK_APIKEY': '',
        'OPEN_LIBRARY_SDK_SERVER_BASE': "",
    });
    idmap = env['OPEN_LIBRARY_SDK_TEST_LIST_SUBJECTS_MODEL_ENTID'];
    const live = 'TRUE' === env.OPEN_LIBRARY_SDK_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['OPEN_LIBRARY_SDK_TEST_LIST_SUBJECTS_MODEL_ENTID'];
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
//# sourceMappingURL=ListSubjectsModelEntity.test.js.map