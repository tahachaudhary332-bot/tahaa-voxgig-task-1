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
(0, node_test_1.describe)('SearchEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when OPEN_LIBRARY_SDK_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('OPEN_LIBRARY_SDK_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.OpenLibrarySdkSDK.test();
        const ent = testsdk.Search();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('search hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.OpenLibrarySdkSDK.test(offline).Search().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.OpenLibrarySdkSDK.test(offline).Search()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.OpenLibrarySdkSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.Search().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.OpenLibrarySdkSDK.test().Search().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.OpenLibrarySdkSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.Search().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.Search().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.OpenLibrarySdkSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Search().list({ "has_fulltext": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.OPEN_LIBRARY_SDK_TEST_LIVE;
        for (const op of ['list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'search.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "docs": { "a": true, "h": "Docs", "n": "docs", "r": false, "t": "`$ARRAY`", "key$": "docs", "index$": 0 }, "documentation_url": { "a": true, "h": "Documentation Url", "n": "documentation_url", "r": false, "t": "`$STRING`", "key$": "documentation_url", "index$": 1 }, "numFound": { "a": true, "h": "Num Found", "n": "numFound", "r": true, "t": "`$INTEGER`", "key$": "numFound", "index$": 2 }, "numFoundExact": { "a": true, "h": "Num Found Exact", "n": "numFoundExact", "r": true, "t": "`$BOOLEAN`", "key$": "numFoundExact", "index$": 3 }, "num_found": { "a": true, "h": "Num Found", "n": "num_found", "r": true, "t": "`$INTEGER`", "key$": "num_found", "index$": 4 }, "offset": { "a": true, "h": "Offset", "n": "offset", "r": true, "t": "`$INTEGER`", "key$": "offset", "index$": 5 }, "q": { "a": true, "h": "Q", "n": "q", "r": true, "t": "`$STRING`", "key$": "q", "index$": 6 }, "start": { "a": true, "h": "Start", "n": "start", "r": true, "t": "`$INTEGER`", "key$": "start", "index$": 7 } }, "name": "search", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /search.json", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "author", "or": "author", "r": false, "t": "`$ANY`", "index$": 0 }, { "a": true, "k": "query", "n": "author_facet", "or": "author_facet", "r": false, "t": "`$ARRAY`", "index$": 1 }, { "a": true, "k": "query", "n": "author_key", "or": "author_key", "r": false, "t": "`$ARRAY`", "index$": 2 }, { "a": true, "k": "query", "n": "contributor", "or": "contributor", "r": false, "t": "`$ANY`", "index$": 3 }, { "a": true, "ex": ["author_key", "author_name", "cover_edition_key", "cover_height", "cover_i", "cover_width", "ebook_access", "edition_count", "first_publish_year", "has_fulltext", "ia", "ia_collection", "id_cita_press", "id_librivox", "id_openstax", "id_project_gutenberg", "id_project_runeberg", "id_standard_ebooks", "id_wikisource", "key", "language", "lending_edition_s", "lending_identifier_s", "public_scan_b", "series_key", "series_name", "series_position", "subtitle", "title"], "k": "query", "n": "field", "or": "fields", "r": false, "t": "`$ARRAY`", "index$": 4 }, { "a": true, "k": "query", "n": "first_publish_year", "or": "first_publish_year", "r": false, "t": "`$ARRAY`", "index$": 5 }, { "a": true, "k": "query", "n": "has_fulltext", "or": "has_fulltext", "r": false, "t": "`$BOOLEAN`", "index$": 6 }, { "a": true, "k": "query", "n": "isbn", "or": "isbn", "r": false, "t": "`$ANY`", "index$": 7 }, { "a": true, "k": "query", "n": "language", "or": "language", "r": false, "t": "`$ARRAY`", "index$": 8 }, { "a": true, "k": "query", "n": "lccn", "or": "lccn", "r": false, "t": "`$ANY`", "index$": 9 }, { "a": true, "ex": 100, "k": "query", "n": "limit", "or": "limit", "r": false, "t": "`$INTEGER`", "index$": 10 }, { "a": true, "k": "query", "n": "oclc", "or": "oclc", "r": false, "t": "`$ANY`", "index$": 11 }, { "a": true, "k": "query", "n": "offset", "or": "offset", "r": false, "t": "`$INTEGER`", "index$": 12 }, { "a": true, "k": "query", "n": "page", "or": "page", "r": false, "t": "`$INTEGER`", "index$": 13 }, { "a": true, "k": "query", "n": "person", "or": "person", "r": false, "t": "`$ANY`", "index$": 14 }, { "a": true, "k": "query", "n": "person_facet", "or": "person_facet", "r": false, "t": "`$ARRAY`", "index$": 15 }, { "a": true, "k": "query", "n": "place", "or": "place", "r": false, "t": "`$ANY`", "index$": 16 }, { "a": true, "k": "query", "n": "place_facet", "or": "place_facet", "r": false, "t": "`$ARRAY`", "index$": 17 }, { "a": true, "k": "query", "n": "print_disabled", "or": "print_disabled", "r": false, "t": "`$ANY`", "index$": 18 }, { "a": true, "k": "query", "n": "public_scan", "or": "public_scan", "r": false, "t": "`$ANY`", "index$": 19 }, { "a": true, "k": "query", "n": "public_scan_b", "or": "public_scan_b", "r": false, "t": "`$ARRAY`", "index$": 20 }, { "a": true, "k": "query", "n": "publisher", "or": "publisher", "r": false, "t": "`$ANY`", "index$": 21 }, { "a": true, "k": "query", "n": "publisher_facet", "or": "publisher_facet", "r": false, "t": "`$ARRAY`", "index$": 22 }, { "a": true, "ex": "", "k": "query", "n": "q", "or": "q", "r": false, "t": "`$STRING`", "index$": 23 }, { "a": true, "k": "query", "n": "query", "or": "query", "r": false, "t": "`$ANY`", "index$": 24 }, { "a": true, "k": "query", "n": "sort", "or": "sort", "r": false, "t": "`$ANY`", "index$": 25 }, { "a": true, "ex": 3, "k": "query", "n": "spellcheck_count", "or": "spellcheck_count", "r": false, "t": "`$INTEGER`", "index$": 26 }, { "a": true, "k": "query", "n": "subject", "or": "subject", "r": false, "t": "`$ANY`", "index$": 27 }, { "a": true, "k": "query", "n": "subject_facet", "or": "subject_facet", "r": false, "t": "`$ARRAY`", "index$": 28 }, { "a": true, "k": "query", "n": "time", "or": "time", "r": false, "t": "`$ANY`", "index$": 29 }, { "a": true, "k": "query", "n": "time_facet", "or": "time_facet", "r": false, "t": "`$ARRAY`", "index$": 30 }, { "a": true, "k": "query", "n": "title", "or": "title", "r": false, "t": "`$STRING`", "index$": 31 }] }, "k": "http", "m": "GET", "o": "/search.json", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "search.json" }], "t": { "req": "`reqdata`", "res": "`body.docs`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /search/editions.json", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": ["cover_i", "ebook_access", "isbn", "key", "language", "publish_date", "publisher", "subtitle", "title", "work_key"], "k": "query", "n": "field", "or": "fields", "r": false, "t": "`$ARRAY`", "index$": 0 }, { "a": true, "ex": 100, "k": "query", "n": "limit", "or": "limit", "r": false, "t": "`$INTEGER`", "index$": 1 }, { "a": true, "k": "query", "n": "offset", "or": "offset", "r": false, "t": "`$INTEGER`", "index$": 2 }, { "a": true, "k": "query", "n": "page", "or": "page", "r": false, "t": "`$INTEGER`", "index$": 3 }, { "a": true, "ex": "", "k": "query", "n": "q", "or": "q", "r": false, "t": "`$STRING`", "index$": 4 }, { "a": true, "ex": "", "k": "query", "n": "sort", "or": "sort", "r": false, "t": "`$STRING`", "index$": 5 }, { "a": true, "k": "query", "n": "work_key", "or": "work_key", "r": false, "t": "`$ANY`", "index$": 6 }] }, "k": "http", "m": "GET", "o": "/search/editions.json", "q": { "$action": "edition" }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "search" }, { "lit": "editions.json" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "search", "name__orig": "search", "Name": "Search", "name_": "search", "name-": "search", "NAME": "SEARCH", "index$": 26 }, { "active": true, "entity": "search", "key$": "BasicSearchFlow", "kind": "basic", "name": "BasicSearchFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "search_ref01" } }] }, { "a": true, "d": {}, "i": { "ref": "search_ref01", "srcdatavar": "search_ref01_data", "suffix": "_dt0" }, "m": {}, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-search_ref01" } }] }] }, 'Search', { "GET /search.json": { "protocol": "http", "parameters": [{ "name": "limit", "in": "query", "required": false, "schema": { "type": "integer", "minimum": 0, "description": "Maximum number of results to return.", "default": 100, "title": "Limit" }, "description": "Maximum number of results to return.", "index$": 0 }, { "name": "offset", "in": "query", "required": false, "schema": { "anyOf": [{ "type": "integer", "minimum": 0 }, { "type": "null" }], "description": "Number of results to skip.", "title": "Offset" }, "description": "Number of results to skip.", "index$": 1 }, { "name": "page", "in": "query", "required": false, "schema": { "anyOf": [{ "type": "integer", "minimum": 1 }, { "type": "null" }], "description": "Page number (1-indexed).", "title": "Page" }, "description": "Page number (1-indexed).", "index$": 2 }, { "name": "q", "in": "query", "required": false, "schema": { "type": "string", "description": "The search query string.", "default": "", "title": "Q" }, "description": "The search query string.", "index$": 3 }, { "name": "title", "in": "query", "required": false, "schema": { "anyOf": [{ "type": "string" }, { "type": "null" }], "title": "Title" }, "index$": 4 }, { "name": "publisher", "in": "query", "required": false, "schema": { "anyOf": [{ "type": "string" }, { "type": "null" }], "title": "Publisher" }, "index$": 5 }, { "name": "oclc", "in": "query", "required": false, "schema": { "anyOf": [{ "type": "string" }, { "type": "null" }], "title": "Oclc" }, "index$": 6 }, { "name": "lccn", "in": "query", "required": false, "schema": { "anyOf": [{ "type": "string" }, { "type": "null" }], "title": "Lccn" }, "index$": 7 }, { "name": "contributor", "in": "query", "required": false, "schema": { "anyOf": [{ "type": "string" }, { "type": "null" }], "title": "Contributor" }, "index$": 8 }, { "name": "subject", "in": "query", "required": false, "schema": { "anyOf": [{ "type": "string" }, { "type": "null" }], "title": "Subject" }, "index$": 9 }, { "name": "place", "in": "query", "required": false, "schema": { "anyOf": [{ "type": "string" }, { "type": "null" }], "title": "Place" }, "index$": 10 }, { "name": "person", "in": "query", "required": false, "schema": { "anyOf": [{ "type": "string" }, { "type": "null" }], "title": "Person" }, "index$": 11 }, { "name": "time", "in": "query", "required": false, "schema": { "anyOf": [{ "type": "string" }, { "type": "null" }], "title": "Time" }, "index$": 12 }, { "name": "has_fulltext", "in": "query", "required": false, "schema": { "anyOf": [{ "enum": ["true", "false"], "type": "string" }, { "type": "null" }], "title": "Has Fulltext" }, "index$": 13 }, { "name": "public_scan_b", "in": "query", "required": false, "schema": { "type": "array", "items": { "enum": ["true", "false"], "type": "string" }, "default": [], "title": "Public Scan B" }, "index$": 14 }, { "name": "public_scan", "in": "query", "required": false, "schema": { "anyOf": [{ "enum": ["true", "false"], "type": "string" }, { "type": "null" }], "title": "Public Scan" }, "index$": 15 }, { "name": "print_disabled", "in": "query", "required": false, "schema": { "anyOf": [{ "enum": ["true", "false"], "type": "string" }, { "type": "null" }], "title": "Print Disabled" }, "index$": 16 }, { "name": "author_key", "in": "query", "required": false, "schema": { "type": "array", "items": { "type": "string" }, "description": "Filter by author key.", "examples": ["OL1394244A"], "default": [], "title": "Author Key" }, "description": "Filter by author key.", "index$": 17 }, { "name": "subject_facet", "in": "query", "required": false, "schema": { "type": "array", "items": { "type": "string" }, "description": "Filter by subject.", "examples": ["Fiction", "City planning"], "default": [], "title": "Subject Facet" }, "description": "Filter by subject.", "index$": 18 }, { "name": "person_facet", "in": "query", "required": false, "schema": { "type": "array", "items": { "type": "string" }, "description": "Filter by person. Not the author but the person who is the subject of the work.", "examples": ["Jane Jacobs (1916-2006)", "Cory Doctorow"], "default": [], "title": "Person Facet" }, "description": "Filter by person. Not the author but the person who is the subject of the work.", "index$": 19 }, { "name": "place_facet", "in": "query", "required": false, "schema": { "type": "array", "items": { "type": "string" }, "description": "Filter by place.", "examples": ["New York", "Xiamen Shi"], "default": [], "title": "Place Facet" }, "description": "Filter by place.", "index$": 20 }, { "name": "time_facet", "in": "query", "required": false, "schema": { "type": "array", "items": { "type": "string" }, "description": "Filter by time. It can be formatted many ways.", "examples": ["20th century", "To 70 A.D."], "default": [], "title": "Time Facet" }, "description": "Filter by time. It can be formatted many ways.", "index$": 21 }, { "name": "first_publish_year", "in": "query", "required": false, "schema": { "type": "array", "items": { "type": "string" }, "description": "Filter by first publish year.", "examples": ["2020"], "default": [], "title": "First Publish Year" }, "description": "Filter by first publish year.", "index$": 22 }, { "name": "publisher_facet", "in": "query", "required": false, "schema": { "type": "array", "items": { "type": "string" }, "description": "Filter by publisher.", "examples": ["Urban Land Institute"], "default": [], "title": "Publisher Facet" }, "description": "Filter by publisher.", "index$": 23 }, { "name": "language", "in": "query", "required": false, "schema": { "type": "array", "items": { "type": "string" }, "description": "Filter by language using three-letter language codes.", "examples": [["eng"], ["spa"], ["eng", "spa"]], "default": [], "title": "Language" }, "description": "Filter by language using three-letter language codes.", "index$": 24 }, { "name": "author_facet", "in": "query", "required": false, "schema": { "type": "array", "items": { "type": "string" }, "description": "(alias for author_key) Filter by author key.", "examples": ["OL1394244A"], "default": [], "title": "Author Facet" }, "description": "(alias for author_key) Filter by author key.", "index$": 25 }, { "name": "isbn", "in": "query", "required": false, "schema": { "anyOf": [{ "type": "string" }, { "type": "null" }], "title": "Isbn" }, "index$": 26 }, { "name": "author", "in": "query", "required": false, "schema": { "anyOf": [{ "type": "string" }, { "type": "null" }], "title": "Author" }, "index$": 27 }, { "name": "fields", "in": "query", "required": false, "schema": { "type": "array", "items": { "type": "string" }, "description": "The fields to return.", "default": ["author_key", "author_name", "cover_edition_key", "cover_height", "cover_i", "cover_width", "ebook_access", "edition_count", "first_publish_year", "has_fulltext", "ia", "ia_collection", "id_cita_press", "id_librivox", "id_openstax", "id_project_gutenberg", "id_project_runeberg", "id_standard_ebooks", "id_wikisource", "key", "language", "lending_edition_s", "lending_identifier_s", "public_scan_b", "series_key", "series_name", "series_position", "subtitle", "title"], "title": "Fields" }, "description": "The fields to return.", "index$": 28 }, { "name": "query", "in": "query", "required": false, "schema": { "anyOf": [{ "type": "object", "additionalProperties": true }, { "type": "null" }], "description": "A full JSON encoded solr query.", "examples": ["{\"q\": \"mark\"}"], "title": "Query" }, "description": "A full JSON encoded solr query.", "index$": 29 }, { "name": "sort", "in": "query", "required": false, "schema": { "anyOf": [{ "type": "string" }, { "type": "null" }], "description": "The sort order of results.", "title": "Sort" }, "description": "The sort order of results.", "index$": 30 }, { "name": "spellcheck_count", "in": "query", "required": false, "schema": { "anyOf": [{ "type": "integer" }, { "type": "null" }], "description": "The number of spellcheck suggestions.", "default": 3, "title": "Spellcheck Count" }, "description": "The number of spellcheck suggestions.", "index$": 31 }] }, "GET /search/editions.json": { "protocol": "http", "parameters": [{ "name": "limit", "in": "query", "required": false, "schema": { "type": "integer", "minimum": 0, "description": "Maximum number of results to return.", "default": 100, "title": "Limit" }, "description": "Maximum number of results to return.", "index$": 0 }, { "name": "offset", "in": "query", "required": false, "schema": { "anyOf": [{ "type": "integer", "minimum": 0 }, { "type": "null" }], "description": "Number of results to skip.", "title": "Offset" }, "description": "Number of results to skip.", "index$": 1 }, { "name": "page", "in": "query", "required": false, "schema": { "anyOf": [{ "type": "integer", "minimum": 1 }, { "type": "null" }], "description": "Page number (1-indexed).", "title": "Page" }, "description": "Page number (1-indexed).", "index$": 2 }, { "name": "q", "in": "query", "required": false, "schema": { "type": "string", "description": "The search query", "default": "", "title": "Q" }, "description": "The search query", "index$": 3 }, { "name": "work_key", "in": "query", "required": false, "schema": { "anyOf": [{ "type": "string" }, { "type": "null" }], "description": "Filter results to editions of a specific work.", "examples": ["/works/OL82536W"], "title": "Work Key" }, "description": "Filter results to editions of a specific work.", "index$": 4 }, { "name": "fields", "in": "query", "required": false, "schema": { "type": "array", "items": { "type": "string" }, "description": "The fields to return.", "default": ["cover_i", "ebook_access", "isbn", "key", "language", "publish_date", "publisher", "subtitle", "title", "work_key"], "title": "Fields" }, "description": "The fields to return.", "index$": 5 }, { "name": "sort", "in": "query", "required": false, "schema": { "type": "string", "enum": ["old", "new", "title", "ebook_access", "ebook_access asc", "ebook_access desc", "key", "key asc", "key desc", "access_score", "access_score asc", "access_score desc", "discovery_score", "discovery_score asc", "discovery_score desc", "evaluation_score", "evaluation_score asc", "evaluation_score desc", "usefulness_score", "usefulness_score asc", "usefulness_score desc", "random", "random asc", "random desc", "random.hourly", "random.daily", ""], "default": "", "title": "Sort" }, "description": "Sort order", "index$": 6 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let search_ref01_data = Object.values(setup.data.existing.search)[0];
        // LIST
        const search_ref01_ent = client.Search();
        const search_ref01_match = {};
        const search_ref01_list = (await search_ref01_ent.list(search_ref01_match)).map((e) => e.data());
        // LOAD
        const search_ref01_match_dt0 = {};
        const search_ref01_data_dt0 = (await search_ref01_ent.load(search_ref01_match_dt0)).data();
        (0, node_assert_1.default)(null != search_ref01_data_dt0);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/search/SearchTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.OpenLibrarySdkSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['search01', 'search02', 'search03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'OPEN_LIBRARY_SDK_TEST_SEARCH_ENTID': idmap,
        'OPEN_LIBRARY_SDK_TEST_LIVE': 'FALSE',
        'OPEN_LIBRARY_SDK_TEST_EXPLAIN': 'FALSE',
        'OPEN_LIBRARY_SDK_APIKEY': '',
        'OPEN_LIBRARY_SDK_SERVER_BASE': "",
    });
    idmap = env['OPEN_LIBRARY_SDK_TEST_SEARCH_ENTID'];
    const live = 'TRUE' === env.OPEN_LIBRARY_SDK_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['OPEN_LIBRARY_SDK_TEST_SEARCH_ENTID'];
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
//# sourceMappingURL=SearchEntity.test.js.map