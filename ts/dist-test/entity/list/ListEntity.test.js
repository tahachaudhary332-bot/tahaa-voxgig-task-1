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
(0, node_test_1.describe)('ListEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when OPEN_LIBRARY_SDK_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('OPEN_LIBRARY_SDK_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.OpenLibrarySdkSDK.test();
        const ent = testsdk.List();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.OpenLibrarySdkSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.List().list({ "author_id": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.OPEN_LIBRARY_SDK_TEST_LIVE;
        for (const op of ['create', 'list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'list.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "full_url": { "a": true, "h": "Full Url", "n": "full_url", "r": true, "t": "`$STRING`", "key$": "full_url", "index$": 0 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "t": "`$STRING`", "key$": "id", "index$": 1 }, "last_update": { "a": true, "h": "Last Update", "n": "last_update", "r": false, "t": "`$ANY`", "key$": "last_update", "index$": 2 }, "name": { "a": true, "h": "Name", "n": "name", "r": true, "t": "`$STRING`", "key$": "name", "index$": 3 }, "seed_count": { "a": true, "h": "Seed Count", "n": "seed_count", "r": true, "t": "`$INTEGER`", "key$": "seed_count", "index$": 4 }, "url": { "a": true, "h": "Url", "n": "url", "r": true, "t": "`$STRING`", "key$": "url", "index$": 5 } }, "id": { "field": "id", "name": "id" }, "name": "list", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /people/{username}/lists/{list_id}/delete.json", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "list_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "username", "or": "username", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "POST", "o": "/people/{username}/lists/{list_id}/delete.json", "q": { "$action": "delete", "exist": ["id", "username"] }, "r": { "param": { "list_id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "people" }, { "var": "username" }, { "lit": "lists" }, { "var": "id" }, { "lit": "delete.json" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "bf": false, "co": { "id": "POST /people/{username}/lists/{olid}/seeds.json", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "olid", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "username", "or": "username", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "POST", "o": "/people/{username}/lists/{olid}/seeds.json", "q": { "$action": "seed", "exist": ["id", "username"] }, "r": { "param": { "olid": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "people" }, { "var": "username" }, { "lit": "lists" }, { "var": "id" }, { "lit": "seeds.json" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }, { "a": true, "bf": false, "co": { "id": "POST /people/{username}/series/{olid}/seeds.json", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "series_id", "or": "olid", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "username", "or": "username", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "POST", "o": "/people/{username}/series/{olid}/seeds.json", "q": { "exist": ["series_id", "username"] }, "r": { "param": { "olid": "series_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "people" }, { "var": "username" }, { "lit": "series" }, { "var": "series_id" }, { "lit": "seeds.json" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 2 }, { "a": true, "co": { "id": "POST /lists/{list_id}/delete.json", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "list_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/lists/{list_id}/delete.json", "q": { "$action": "delete", "exist": ["id"] }, "r": { "param": { "list_id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "lists" }, { "var": "id" }, { "lit": "delete.json" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 3 }, { "a": true, "bf": false, "co": { "id": "POST /lists/{olid}/seeds.json", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "olid", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/lists/{olid}/seeds.json", "q": { "$action": "seed", "exist": ["id"] }, "r": { "param": { "olid": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "lists" }, { "var": "id" }, { "lit": "seeds.json" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 4 }, { "a": true, "bf": false, "co": { "id": "POST /series/{olid}/seeds.json", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "series_id", "or": "olid", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/series/{olid}/seeds.json", "q": { "exist": ["series_id"] }, "r": { "param": { "olid": "series_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "series" }, { "var": "series_id" }, { "lit": "seeds.json" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 5 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /authors/OL{author_id}A/lists.json", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "author_id", "or": "author_id", "r": true, "t": "`$INTEGER`", "index$": 0 }], "query": [{ "a": true, "ex": 50, "k": "query", "n": "limit", "or": "limit", "r": false, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "ex": 0, "k": "query", "n": "offset", "or": "offset", "r": false, "t": "`$INTEGER`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/authors/OL{author_id}A/lists.json", "q": { "exist": ["author_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "authors" }, { "lit": "OL{author_id}A" }, { "lit": "lists.json" }], "t": { "req": "`reqdata`", "res": "`body.entries`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /books/OL{edition_id}M/lists.json", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "edition_id", "or": "edition_id", "r": true, "t": "`$INTEGER`", "index$": 0 }], "query": [{ "a": true, "ex": 50, "k": "query", "n": "limit", "or": "limit", "r": false, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "ex": 0, "k": "query", "n": "offset", "or": "offset", "r": false, "t": "`$INTEGER`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/books/OL{edition_id}M/lists.json", "q": { "exist": ["edition_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "books" }, { "lit": "OL{edition_id}M" }, { "lit": "lists.json" }], "t": { "req": "`reqdata`", "res": "`body.entries`" }, "index$": 1 }, { "a": true, "co": { "id": "GET /subjects/{subject_key}/lists.json", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "subject_key", "or": "subject_key", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "ex": 50, "k": "query", "n": "limit", "or": "limit", "r": false, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "ex": 0, "k": "query", "n": "offset", "or": "offset", "r": false, "t": "`$INTEGER`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/subjects/{subject_key}/lists.json", "q": { "exist": ["subject_key"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "subjects" }, { "var": "subject_key" }, { "lit": "lists.json" }], "t": { "req": "`reqdata`", "res": "`body.entries`" }, "index$": 2 }, { "a": true, "co": { "id": "GET /people/{username}/lists.json", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "username", "or": "username", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "ex": 50, "k": "query", "n": "limit", "or": "limit", "r": false, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "ex": 0, "k": "query", "n": "offset", "or": "offset", "r": false, "t": "`$INTEGER`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/people/{username}/lists.json", "q": { "exist": ["username"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "people" }, { "var": "username" }, { "lit": "lists.json" }], "t": { "req": "`reqdata`", "res": "`body.entries`" }, "index$": 3 }, { "a": true, "co": { "id": "GET /works/OL{work_id}W/lists.json", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "work_id", "or": "work_id", "r": true, "t": "`$INTEGER`", "index$": 0 }], "query": [{ "a": true, "ex": 50, "k": "query", "n": "limit", "or": "limit", "r": false, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "ex": 0, "k": "query", "n": "offset", "or": "offset", "r": false, "t": "`$INTEGER`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/works/OL{work_id}W/lists.json", "q": { "exist": ["work_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "works" }, { "lit": "OL{work_id}W" }, { "lit": "lists.json" }], "t": { "req": "`reqdata`", "res": "`body.entries`" }, "index$": 4 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /people/{username}/lists/{olid}/seeds.json", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "olid", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "username", "or": "username", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/people/{username}/lists/{olid}/seeds.json", "q": { "$action": "seed", "exist": ["id", "username"] }, "r": { "param": { "olid": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "people" }, { "var": "username" }, { "lit": "lists" }, { "var": "id" }, { "lit": "seeds.json" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /people/{username}/lists/{list_id}.json", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "list_id", "or": "list_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "username", "or": "username", "r": true, "t": "`$STRING`", "index$": 1 }], "query": [{ "a": true, "ex": false, "k": "query", "n": "raw", "or": "_raw", "r": false, "t": "`$BOOLEAN`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/people/{username}/lists/{list_id}.json", "q": { "exist": ["list_id", "username"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "people" }, { "var": "username" }, { "lit": "lists" }, { "lit": "{list_id}.json" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }, { "a": true, "co": { "id": "GET /people/{username}/series/{olid}/seeds.json", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "series_id", "or": "olid", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "username", "or": "username", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/people/{username}/series/{olid}/seeds.json", "q": { "exist": ["series_id", "username"] }, "r": { "param": { "olid": "series_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "people" }, { "var": "username" }, { "lit": "series" }, { "var": "series_id" }, { "lit": "seeds.json" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 2 }, { "a": true, "co": { "id": "GET /lists/{olid}/seeds.json", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "olid", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/lists/{olid}/seeds.json", "q": { "$action": "seed", "exist": ["id"] }, "r": { "param": { "olid": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "lists" }, { "var": "id" }, { "lit": "seeds.json" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 3 }, { "a": true, "co": { "id": "GET /lists/{list_id}.json", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "list_id", "or": "list_id", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "ex": false, "k": "query", "n": "raw", "or": "_raw", "r": false, "t": "`$BOOLEAN`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/lists/{list_id}.json", "q": { "exist": ["list_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "lists" }, { "lit": "{list_id}.json" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 4 }, { "a": true, "co": { "id": "GET /series/{list_id}.json", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "list_id", "or": "list_id", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "ex": false, "k": "query", "n": "raw", "or": "_raw", "r": false, "t": "`$BOOLEAN`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/series/{list_id}.json", "q": { "exist": ["list_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "series" }, { "lit": "{list_id}.json" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 5 }, { "a": true, "co": { "id": "GET /series/{olid}/seeds.json", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "series_id", "or": "olid", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/series/{olid}/seeds.json", "q": { "exist": ["series_id"] }, "r": { "param": { "olid": "series_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "series" }, { "var": "series_id" }, { "lit": "seeds.json" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 6 }, { "a": true, "co": { "id": "GET /search/lists.json", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": "", "k": "query", "n": "api", "or": "api", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "", "k": "query", "n": "field", "or": "fields", "r": false, "t": "`$STRING`", "index$": 1 }, { "a": true, "ex": 20, "k": "query", "n": "limit", "or": "limit", "r": false, "t": "`$INTEGER`", "index$": 2 }, { "a": true, "k": "query", "n": "offset", "or": "offset", "r": false, "t": "`$INTEGER`", "index$": 3 }, { "a": true, "k": "query", "n": "page", "or": "page", "r": false, "t": "`$INTEGER`", "index$": 4 }, { "a": true, "ex": "", "k": "query", "n": "q", "or": "q", "r": false, "t": "`$STRING`", "index$": 5 }, { "a": true, "ex": "", "k": "query", "n": "sort", "or": "sort", "r": false, "t": "`$STRING`", "index$": 6 }] }, "k": "http", "m": "GET", "o": "/search/lists.json", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "search" }, { "lit": "lists.json" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 7 }], "key$": "load" } }, "relations": { "ancestors": [["$.main.kit.entity.subject"]] }, "key$": "list", "name__orig": "list", "Name": "List", "name_": "list", "name-": "list", "NAME": "LIST", "index$": 17 }, { "active": true, "entity": "list", "key$": "BasicListFlow", "kind": "basic", "name": "BasicListFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "list_ref01" }, "m": { "author_id": "author01", "edition_id": "edition01", "list_id": "list01", "series_id": "series01", "subject_key": "subject_key01", "username": "username01", "work_id": "work01" }, "o": "create", "s": [], "v": [] }, { "a": true, "d": {}, "i": {}, "m": { "work_id": "work01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "list_ref01" } }] }, { "a": true, "d": {}, "i": { "ref": "list_ref01", "srcdatavar": "list_ref01_data", "suffix": "_dt0" }, "m": {}, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-list_ref01" } }] }] }, 'List', { "POST /people/{username}/lists/{list_id}/delete.json": { "protocol": "http", "parameters": [{ "name": "username", "in": "path", "required": true, "schema": { "type": "string", "description": "The patron's username", "title": "Username" }, "description": "The patron's username", "index$": 0 }, { "name": "list_id", "in": "path", "required": true, "schema": { "type": "string", "pattern": "OL\\d+L", "description": "The OLID, e.g. OL123L", "title": "List Id" }, "description": "The OLID, e.g. OL123L", "index$": 1 }] }, "POST /people/{username}/lists/{olid}/seeds.json": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true, "title": "Payload" } } } }, "parameters": [{ "name": "username", "in": "path", "required": true, "schema": { "type": "string", "description": "The patron's username", "title": "Username" }, "description": "The patron's username", "index$": 0 }, { "name": "olid", "in": "path", "required": true, "schema": { "type": "string", "pattern": "OL\\d+L", "description": "The OLID, e.g. OL123L", "title": "Olid" }, "description": "The OLID, e.g. OL123L", "index$": 1 }] }, "POST /people/{username}/series/{olid}/seeds.json": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true, "title": "Payload", "index$": 1 } } } }, "parameters": [{ "name": "username", "in": "path", "required": true, "schema": { "type": "string", "description": "The patron's username", "title": "Username" }, "description": "The patron's username", "index$": 0 }, { "name": "olid", "in": "path", "required": true, "schema": { "type": "string", "pattern": "OL\\d+L", "description": "The OLID, e.g. OL123L", "title": "Olid" }, "description": "The OLID, e.g. OL123L", "index$": 1 }] }, "POST /lists/{list_id}/delete.json": { "protocol": "http", "parameters": [{ "name": "list_id", "in": "path", "required": true, "schema": { "type": "string", "pattern": "OL\\d+L", "description": "The OLID, e.g. OL123L", "title": "List Id" }, "description": "The OLID, e.g. OL123L", "index$": 0 }] }, "POST /lists/{olid}/seeds.json": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true, "title": "Payload" } } } }, "parameters": [{ "name": "olid", "in": "path", "required": true, "schema": { "type": "string", "pattern": "OL\\d+L", "description": "The OLID, e.g. OL123L", "title": "Olid" }, "description": "The OLID, e.g. OL123L", "index$": 0 }] }, "POST /series/{olid}/seeds.json": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true, "title": "Payload", "index$": 1 } } } }, "parameters": [{ "name": "olid", "in": "path", "required": true, "schema": { "type": "string", "pattern": "OL\\d+L", "description": "The OLID, e.g. OL123L", "title": "Olid" }, "description": "The OLID, e.g. OL123L", "index$": 0 }] }, "GET /authors/OL{author_id}A/lists.json": { "protocol": "http", "parameters": [{ "name": "author_id", "in": "path", "required": true, "schema": { "type": "integer", "title": "Author Id" }, "index$": 0 }, { "name": "offset", "in": "query", "required": false, "schema": { "type": "integer", "minimum": 0, "description": "Pagination offset", "default": 0, "title": "Offset" }, "description": "Pagination offset", "index$": 1 }, { "name": "limit", "in": "query", "required": false, "schema": { "type": "integer", "maximum": 100, "minimum": 0, "description": "Number of items to return (max 100)", "default": 50, "title": "Limit" }, "description": "Number of items to return (max 100)", "index$": 2 }] }, "GET /books/OL{edition_id}M/lists.json": { "protocol": "http", "parameters": [{ "name": "edition_id", "in": "path", "required": true, "schema": { "type": "integer", "title": "Edition Id" }, "index$": 0 }, { "name": "offset", "in": "query", "required": false, "schema": { "type": "integer", "minimum": 0, "description": "Pagination offset", "default": 0, "title": "Offset" }, "description": "Pagination offset", "index$": 1 }, { "name": "limit", "in": "query", "required": false, "schema": { "type": "integer", "maximum": 100, "minimum": 0, "description": "Number of items to return (max 100)", "default": 50, "title": "Limit" }, "description": "Number of items to return (max 100)", "index$": 2 }] }, "GET /subjects/{subject_key}/lists.json": { "protocol": "http", "parameters": [{ "name": "subject_key", "in": "path", "required": true, "schema": { "type": "string", "title": "Subject Key" }, "index$": 0 }, { "name": "offset", "in": "query", "required": false, "schema": { "type": "integer", "minimum": 0, "description": "Pagination offset", "default": 0, "title": "Offset" }, "description": "Pagination offset", "index$": 1 }, { "name": "limit", "in": "query", "required": false, "schema": { "type": "integer", "maximum": 100, "minimum": 0, "description": "Number of items to return (max 100)", "default": 50, "title": "Limit" }, "description": "Number of items to return (max 100)", "index$": 2 }] }, "GET /people/{username}/lists.json": { "protocol": "http", "parameters": [{ "name": "username", "in": "path", "required": true, "schema": { "type": "string", "title": "Username" }, "index$": 0 }, { "name": "offset", "in": "query", "required": false, "schema": { "type": "integer", "minimum": 0, "description": "Pagination offset", "default": 0, "title": "Offset" }, "description": "Pagination offset", "index$": 1 }, { "name": "limit", "in": "query", "required": false, "schema": { "type": "integer", "maximum": 100, "minimum": 0, "description": "Number of items to return (max 100)", "default": 50, "title": "Limit" }, "description": "Number of items to return (max 100)", "index$": 2 }] }, "GET /works/OL{work_id}W/lists.json": { "protocol": "http", "parameters": [{ "name": "work_id", "in": "path", "required": true, "schema": { "type": "integer", "title": "Work Id" }, "index$": 0 }, { "name": "offset", "in": "query", "required": false, "schema": { "type": "integer", "minimum": 0, "description": "Pagination offset", "default": 0, "title": "Offset" }, "description": "Pagination offset", "index$": 1 }, { "name": "limit", "in": "query", "required": false, "schema": { "type": "integer", "maximum": 100, "minimum": 0, "description": "Number of items to return (max 100)", "default": 50, "title": "Limit" }, "description": "Number of items to return (max 100)", "index$": 2 }] }, "GET /people/{username}/lists/{olid}/seeds.json": { "protocol": "http", "parameters": [{ "name": "username", "in": "path", "required": true, "schema": { "type": "string", "description": "The patron's username", "title": "Username" }, "description": "The patron's username", "index$": 0 }, { "name": "olid", "in": "path", "required": true, "schema": { "type": "string", "pattern": "OL\\d+L", "description": "The OLID, e.g. OL123L", "title": "Olid" }, "description": "The OLID, e.g. OL123L", "index$": 1 }] }, "GET /people/{username}/lists/{list_id}.json": { "protocol": "http", "parameters": [{ "name": "username", "in": "path", "required": true, "schema": { "type": "string", "description": "The patron's username", "title": "Username" }, "description": "The patron's username", "index$": 0 }, { "name": "list_id", "in": "path", "required": true, "schema": { "type": "string", "pattern": "OL\\d+L", "description": "The OLID, e.g. OL123L", "title": "List Id" }, "description": "The OLID, e.g. OL123L", "index$": 1 }, { "name": "_raw", "in": "query", "required": false, "schema": { "type": "boolean", "description": "Return raw database record", "default": false, "title": " Raw" }, "description": "Return raw database record", "index$": 2 }] }, "GET /people/{username}/series/{olid}/seeds.json": { "protocol": "http", "parameters": [{ "name": "username", "in": "path", "required": true, "schema": { "type": "string", "description": "The patron's username", "title": "Username" }, "description": "The patron's username", "index$": 0 }, { "name": "olid", "in": "path", "required": true, "schema": { "type": "string", "pattern": "OL\\d+L", "description": "The OLID, e.g. OL123L", "title": "Olid" }, "description": "The OLID, e.g. OL123L", "index$": 1 }] }, "GET /lists/{olid}/seeds.json": { "protocol": "http", "parameters": [{ "name": "olid", "in": "path", "required": true, "schema": { "type": "string", "pattern": "OL\\d+L", "description": "The OLID, e.g. OL123L", "title": "Olid" }, "description": "The OLID, e.g. OL123L", "index$": 0 }] }, "GET /lists/{list_id}.json": { "protocol": "http", "parameters": [{ "name": "list_id", "in": "path", "required": true, "schema": { "type": "string", "pattern": "OL\\d+L", "description": "The OLID, e.g. OL123L", "title": "List Id" }, "description": "The OLID, e.g. OL123L", "index$": 0 }, { "name": "_raw", "in": "query", "required": false, "schema": { "type": "boolean", "description": "Return raw database record", "default": false, "title": " Raw" }, "description": "Return raw database record", "index$": 1 }] }, "GET /series/{list_id}.json": { "protocol": "http", "parameters": [{ "name": "list_id", "in": "path", "required": true, "schema": { "type": "string", "pattern": "OL\\d+L", "description": "The OLID, e.g. OL123L", "title": "List Id" }, "description": "The OLID, e.g. OL123L", "index$": 0 }, { "name": "_raw", "in": "query", "required": false, "schema": { "type": "boolean", "description": "Return raw database record", "default": false, "title": " Raw" }, "description": "Return raw database record", "index$": 1 }] }, "GET /series/{olid}/seeds.json": { "protocol": "http", "parameters": [{ "name": "olid", "in": "path", "required": true, "schema": { "type": "string", "pattern": "OL\\d+L", "description": "The OLID, e.g. OL123L", "title": "Olid" }, "description": "The OLID, e.g. OL123L", "index$": 0 }] }, "GET /search/lists.json": { "protocol": "http", "parameters": [{ "name": "limit", "in": "query", "required": false, "schema": { "type": "integer", "minimum": 0, "default": 20, "title": "Limit" }, "index$": 0 }, { "name": "offset", "in": "query", "required": false, "schema": { "anyOf": [{ "type": "integer", "minimum": 0 }, { "type": "null" }], "title": "Offset" }, "index$": 1 }, { "name": "page", "in": "query", "required": false, "schema": { "anyOf": [{ "type": "integer", "minimum": 1 }, { "type": "null" }], "title": "Page" }, "index$": 2 }, { "name": "q", "in": "query", "required": false, "schema": { "type": "string", "default": "", "title": "Q" }, "index$": 3 }, { "name": "fields", "in": "query", "required": false, "schema": { "type": "string", "default": "", "title": "Fields" }, "index$": 4 }, { "name": "sort", "in": "query", "required": false, "schema": { "type": "string", "enum": ["name asc", "last_modified", "last_modified asc", "last_modified desc", "seed_count", "seed_count asc", "seed_count desc", "random", "random asc", "random desc", "random.hourly", "random.daily", ""], "default": "", "title": "Sort" }, "index$": 5 }, { "name": "api", "in": "query", "required": false, "schema": { "enum": ["next", ""], "type": "string", "default": "", "title": "Api" }, "index$": 6 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const list_ref01_ent = client.List();
        let list_ref01_data = setup.data.new.list['list_ref01'];
        list_ref01_data['author_id'] = setup.idmap['author01'];
        list_ref01_data['edition_id'] = setup.idmap['edition01'];
        list_ref01_data['list_id'] = setup.idmap['list01'];
        list_ref01_data['series_id'] = setup.idmap['series01'];
        list_ref01_data['subject_key'] = setup.idmap['subject_key01'];
        list_ref01_data['username'] = setup.idmap['username01'];
        list_ref01_data['work_id'] = setup.idmap['work01'];
        list_ref01_data = (await list_ref01_ent.create(list_ref01_data)).data();
        (0, node_assert_1.default)(null != list_ref01_data.id);
        // LIST
        const list_ref01_match = {};
        list_ref01_match['work_id'] = setup.idmap['work01'];
        const list_ref01_list = (await list_ref01_ent.list(list_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(list_ref01_list, { id: list_ref01_data.id })));
        // LOAD
        const list_ref01_match_dt0 = {};
        list_ref01_match_dt0.id = list_ref01_data.id;
        const list_ref01_data_dt0 = (await list_ref01_ent.load(list_ref01_match_dt0)).data();
        (0, node_assert_1.default)(list_ref01_data_dt0.id === list_ref01_data.id);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/list/ListTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.OpenLibrarySdkSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['list01', 'list02', 'list03', 'subject01', 'subject02', 'subject03', 'author01', 'edition01', 'series01', 'subject_key01', 'username01', 'work01'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'OPEN_LIBRARY_SDK_TEST_LIST_ENTID': idmap,
        'OPEN_LIBRARY_SDK_TEST_LIVE': 'FALSE',
        'OPEN_LIBRARY_SDK_TEST_EXPLAIN': 'FALSE',
        'OPEN_LIBRARY_SDK_APIKEY': '',
        'OPEN_LIBRARY_SDK_SERVER_BASE': "",
    });
    idmap = env['OPEN_LIBRARY_SDK_TEST_LIST_ENTID'];
    const live = 'TRUE' === env.OPEN_LIBRARY_SDK_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['OPEN_LIBRARY_SDK_TEST_LIST_ENTID'];
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
//# sourceMappingURL=ListEntity.test.js.map