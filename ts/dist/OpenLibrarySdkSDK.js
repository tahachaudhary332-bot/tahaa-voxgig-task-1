"use strict";
// OpenLibrarySdk Ts SDK
Object.defineProperty(exports, "__esModule", { value: true });
exports.SDK = exports.OpenLibrarySdkSDK = exports.OpenLibrarySdkEntityBase = exports.BaseFeature = exports.config = exports.stdutil = void 0;
const AccountLoanEntity_1 = require("./entity/AccountLoanEntity");
const AccountLoanHistoryEntity_1 = require("./entity/AccountLoanHistoryEntity");
const ArchiveorgEntity_1 = require("./entity/ArchiveorgEntity");
const AuthorEntity_1 = require("./entity/AuthorEntity");
const BookEntity_1 = require("./entity/BookEntity");
const BorrowEntity_1 = require("./entity/BorrowEntity");
const CheckInEntity_1 = require("./entity/CheckInEntity");
const CreateListEntity_1 = require("./entity/CreateListEntity");
const FeedEntity_1 = require("./entity/FeedEntity");
const GraphiteEntity_1 = require("./entity/GraphiteEntity");
const HealthEntity_1 = require("./entity/HealthEntity");
const IanEntity_1 = require("./entity/IanEntity");
const IdvalEntity_1 = require("./entity/IdvalEntity");
const ImportEntity_1 = require("./entity/ImportEntity");
const InsideEntity_1 = require("./entity/InsideEntity");
const KeyEntity_1 = require("./entity/KeyEntity");
const LanguageEntity_1 = require("./entity/LanguageEntity");
const ListEntity_1 = require("./entity/ListEntity");
const ListEditionsModelEntity_1 = require("./entity/ListEditionsModelEntity");
const ListSubjectsModelEntity_1 = require("./entity/ListSubjectsModelEntity");
const LoginEntity_1 = require("./entity/LoginEntity");
const LogoutEntity_1 = require("./entity/LogoutEntity");
const MergeEntity_1 = require("./entity/MergeEntity");
const ReadingGoalEntity_1 = require("./entity/ReadingGoalEntity");
const ReadingLogEntity_1 = require("./entity/ReadingLogEntity");
const ReqEntity_1 = require("./entity/ReqEntity");
const SearchEntity_1 = require("./entity/SearchEntity");
const SubjectEntity_1 = require("./entity/SubjectEntity");
const node_util_1 = require("node:util");
const Config_1 = require("./Config");
Object.defineProperty(exports, "config", { enumerable: true, get: function () { return Config_1.config; } });
const OpenLibrarySdkEntityBase_1 = require("./OpenLibrarySdkEntityBase");
Object.defineProperty(exports, "OpenLibrarySdkEntityBase", { enumerable: true, get: function () { return OpenLibrarySdkEntityBase_1.OpenLibrarySdkEntityBase; } });
const Utility_1 = require("./utility/Utility");
const ResultBodyUtility_1 = require("./utility/ResultBodyUtility");
const MakeRequestUtility_1 = require("./utility/MakeRequestUtility");
const PrepareMethodUtility_1 = require("./utility/PrepareMethodUtility");
const BaseFeature_1 = require("./feature/base/BaseFeature");
Object.defineProperty(exports, "BaseFeature", { enumerable: true, get: function () { return BaseFeature_1.BaseFeature; } });
const stdutil = new Utility_1.Utility();
exports.stdutil = stdutil;
class OpenLibrarySdkSDK {
    _mode = 'live';
    _options;
    _utility = new Utility_1.Utility();
    _features;
    _rootctx;
    constructor(options) {
        this._rootctx = this._utility.makeContext({
            client: this,
            utility: this._utility,
            config: Config_1.config,
            options,
            shared: new WeakMap()
        });
        this._options = this._utility.makeOptions(this._rootctx);
        for (const key of ['_options', '_rootctx', '_features']) {
            Object.defineProperty(this, key, {
                value: this[key], enumerable: false, writable: true, configurable: true
            });
        }
        const struct = this._utility.struct;
        const getpath = struct.getpath;
        if (true === getpath(this._options.feature, 'test.active')) {
            this._mode = 'test';
        }
        this._rootctx.options = this._options;
        this._features = [];
        const featureAdd = this._utility.featureAdd;
        const featureInit = this._utility.featureInit;
        // Add features in the resolved order (makeOptions puts an explicit
        // array order first, else defaults to test-first). Ordering matters:
        // the `test` feature installs the base mock transport and the transport
        // features (retry/cache/netsim/proxy/ratelimit) wrap whatever is current,
        // so `test` must be added before them to sit at the base of the chain.
        const extend = this._options.extend || [];
        const featureorder = getpath(this._options, '__derived__.featureorder') || [];
        for (const fname of featureorder) {
            const fopts = this._options.feature[fname] || {};
            if (fopts.active) {
                // An active name with no generated class is legal when an
                // extend-supplied instance carries that name (station's adopt
                // path): the instance is added below, positioned by its own
                // __after__ entry, so skip it here rather than fail construction.
                if (!this._rootctx.config.hasFeature(fname) &&
                    extend.some((f) => fname === f.name)) {
                    continue;
                }
                featureAdd(this._rootctx, this._rootctx.config.makeFeature(fname));
            }
        }
        for (let f of extend) {
            featureAdd(this._rootctx, f);
        }
        for (let f of this._features) {
            featureInit(this._rootctx, f);
        }
        const featureHook = this._utility.featureHook;
        featureHook(this._rootctx, 'PostConstruct');
    }
    options() {
        return this._utility.struct.clone(this._options);
    }
    utility() {
        return this._utility.struct.clone(this._utility);
    }
    async prepare(fetchargs) {
        const utility = this._utility;
        const struct = utility.struct;
        const clone = struct.clone;
        const { makeContext, makeFetchDef, prepareHeaders, prepareAuth, } = utility;
        fetchargs = fetchargs || {};
        let ctx = makeContext({
            opname: 'prepare',
            ctrl: fetchargs.ctrl || {},
        }, this._rootctx);
        const options = this._options;
        const method = String(fetchargs.method || 'GET').toUpperCase();
        if (!(0, PrepareMethodUtility_1.allowed)(options.allow.method, method)) {
            return ctx.error('spec_method_allow', 'Method "' + method +
                '" not allowed by SDK option allow.method value: "' + options.allow.method + '"');
        }
        const spec = {
            base: options.base,
            prefix: options.prefix,
            suffix: options.suffix,
            path: fetchargs.path || '',
            method,
            params: fetchargs.params || {},
            query: fetchargs.query || {},
            headers: prepareHeaders(ctx),
            body: fetchargs.body,
            step: 'start',
        };
        ctx.spec = spec;
        if (fetchargs.headers) {
            const uheaders = fetchargs.headers;
            for (let key in uheaders) {
                spec.headers[key] = uheaders[key];
            }
        }
        const authResult = prepareAuth(ctx);
        if (authResult instanceof Error) {
            return authResult;
        }
        return makeFetchDef(ctx);
    }
    // Raw endpoint access is operator-controllable, like every entity op.
    // Blocking it means denying BOTH the 'direct' and 'graphql' tokens, since
    // either one reaches the same endpoint.
    async direct(fetchargs) {
        if (!(0, PrepareMethodUtility_1.allowed)(this._options.allow.op, 'direct')) {
            return {
                ok: false,
                err: new Error('OpenLibrarySdkSDK: direct: operation not allowed by' +
                    ' SDK option allow.op value: "' + this._options.allow.op + '"'),
            };
        }
        return this._rawRequest(fetchargs);
    }
    // Ungated request path shared by direct() and graphql(), each of which
    // checks its own allow.op token first. Private, rather than a flag on
    // fetchargs: a caller-supplied marker would let anyone opt straight back
    // out of the gate by passing it.
    async _rawRequest(fetchargs) {
        const utility = this._utility;
        const fetcher = utility.fetcher;
        const makeContext = utility.makeContext;
        const fetchdef = await this.prepare(fetchargs);
        if (fetchdef instanceof Error) {
            return { ok: false, err: utility.clean(this._rootctx, fetchdef) };
        }
        let ctx = makeContext({
            opname: 'direct',
            ctrl: (fetchargs || {}).ctrl || {},
        }, this._rootctx);
        try {
            if (true === fetchdef.signal?.aborted) {
                throw fetchdef.signal.reason;
            }
            const fetched = await fetcher(ctx, fetchdef.url, fetchdef);
            if (null == fetched) {
                return { ok: false, err: ctx.error('direct_no_response', 'response: undefined') };
            }
            else if (fetched instanceof Error) {
                return { ok: false, err: utility.clean(ctx, (0, MakeRequestUtility_1.abortError)(ctx, fetched)) };
            }
            const status = fetched.status;
            // No body responses (204 No Content, 304 Not Modified) and explicit
            // zero content-length must skip JSON parsing — fetched.json() would
            // throw `Unexpected end of JSON input` on an empty body.
            const headers = fetched.headers;
            const contentLength = headers && 'function' === typeof headers.get
                ? headers.get('content-length')
                : (headers || {})['content-length'];
            const noBody = 204 === status || 304 === status || '0' === String(contentLength);
            let json = undefined;
            let err = undefined;
            if (!noBody) {
                let text = undefined;
                try {
                    const raw = fetched;
                    if ('function' === typeof raw.text) {
                        text = await raw.text();
                        json = '' === text.trim() ? undefined : JSON.parse(text);
                    }
                    else {
                        json = 'function' === typeof fetched.json ? await fetched.json() : fetched.json;
                    }
                }
                catch (parseErr) {
                    if ('SyntaxError' !== parseErr?.name) {
                        throw parseErr;
                    }
                    err = (0, ResultBodyUtility_1.unreadableBody)(ctx, {
                        status, headers, text: text ?? parseErr.text, sent: fetchdef.headers,
                        failed: 200 <= status && status < 300 ? undefined :
                            ctx.error('request_status', 'request: ' + status + ': ' + fetched.statusText),
                    });
                }
            }
            return {
                ok: null == err && status >= 200 && status < 300,
                status,
                headers: fetched.headers,
                data: json,
                ...(null == err ? {} : { err: utility.clean(ctx, err) }),
            };
        }
        catch (err) {
            return { ok: false, err: utility.clean(ctx, (0, MakeRequestUtility_1.abortError)(ctx, err)) };
        }
    }
    async graphql(query, variables, ctrl) {
        const options = this._options;
        if (!(0, PrepareMethodUtility_1.allowed)(options.allow.op, 'graphql')) {
            return {
                ok: false,
                err: new Error('OpenLibrarySdkSDK: graphql: operation not allowed by' +
                    ' SDK option allow.op value: "' + options.allow.op + '"'),
            };
        }
        const res = await this._rawRequest({
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: { query, variables: variables || {} },
            ctrl,
        });
        // Errors are read BEFORE any status check: a GraphQL parse or validation
        // failure comes back as HTTP 400 carrying the standard { errors: [...] }
        // body, and the raw path represents a non-2xx as { ok: false } with no
        // err — so returning early on status would discard the server's own
        // diagnostics, which are the only useful part of that response.
        const errors = null == res.data ? undefined : res.data.errors;
        if (null != errors && Array.isArray(errors) && 0 < errors.length) {
            const first = errors[0] || {};
            const err = new Error('OpenLibrarySdkSDK: graphql: ' +
                (first.message || 'graphql error'));
            err.graphql = errors;
            return { ok: false, status: res.status, headers: res.headers, err, data: res.data };
        }
        return res;
    }
    // Entity access: `client.AccountLoan().list()` / `client.AccountLoan().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AccountLoan(entopts) {
        const self = this;
        return new AccountLoanEntity_1.AccountLoanEntity(self, entopts);
    }
    // Entity access: `client.AccountLoanHistory().list()` / `client.AccountLoanHistory().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AccountLoanHistory(entopts) {
        const self = this;
        return new AccountLoanHistoryEntity_1.AccountLoanHistoryEntity(self, entopts);
    }
    // Entity access: `client.Archiveorg().list()` / `client.Archiveorg().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Archiveorg(entopts) {
        const self = this;
        return new ArchiveorgEntity_1.ArchiveorgEntity(self, entopts);
    }
    // Entity access: `client.Author().list()` / `client.Author().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Author(entopts) {
        const self = this;
        return new AuthorEntity_1.AuthorEntity(self, entopts);
    }
    // Entity access: `client.Book().list()` / `client.Book().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Book(entopts) {
        const self = this;
        return new BookEntity_1.BookEntity(self, entopts);
    }
    // Entity access: `client.Borrow().list()` / `client.Borrow().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Borrow(entopts) {
        const self = this;
        return new BorrowEntity_1.BorrowEntity(self, entopts);
    }
    // Entity access: `client.CheckIn().list()` / `client.CheckIn().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    CheckIn(entopts) {
        const self = this;
        return new CheckInEntity_1.CheckInEntity(self, entopts);
    }
    // Entity access: `client.CreateList().list()` / `client.CreateList().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    CreateList(entopts) {
        const self = this;
        return new CreateListEntity_1.CreateListEntity(self, entopts);
    }
    // Entity access: `client.Feed().list()` / `client.Feed().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Feed(entopts) {
        const self = this;
        return new FeedEntity_1.FeedEntity(self, entopts);
    }
    // Entity access: `client.Graphite().list()` / `client.Graphite().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Graphite(entopts) {
        const self = this;
        return new GraphiteEntity_1.GraphiteEntity(self, entopts);
    }
    // Entity access: `client.Health().list()` / `client.Health().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Health(entopts) {
        const self = this;
        return new HealthEntity_1.HealthEntity(self, entopts);
    }
    // Entity access: `client.Ian().list()` / `client.Ian().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Ian(entopts) {
        const self = this;
        return new IanEntity_1.IanEntity(self, entopts);
    }
    // Entity access: `client.Idval().list()` / `client.Idval().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Idval(entopts) {
        const self = this;
        return new IdvalEntity_1.IdvalEntity(self, entopts);
    }
    // Entity access: `client.Import().list()` / `client.Import().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Import(entopts) {
        const self = this;
        return new ImportEntity_1.ImportEntity(self, entopts);
    }
    // Entity access: `client.Inside().list()` / `client.Inside().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Inside(entopts) {
        const self = this;
        return new InsideEntity_1.InsideEntity(self, entopts);
    }
    // Entity access: `client.Key().list()` / `client.Key().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Key(entopts) {
        const self = this;
        return new KeyEntity_1.KeyEntity(self, entopts);
    }
    // Entity access: `client.Language().list()` / `client.Language().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Language(entopts) {
        const self = this;
        return new LanguageEntity_1.LanguageEntity(self, entopts);
    }
    // Entity access: `client.List().list()` / `client.List().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    List(entopts) {
        const self = this;
        return new ListEntity_1.ListEntity(self, entopts);
    }
    // Entity access: `client.ListEditionsModel().list()` / `client.ListEditionsModel().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ListEditionsModel(entopts) {
        const self = this;
        return new ListEditionsModelEntity_1.ListEditionsModelEntity(self, entopts);
    }
    // Entity access: `client.ListSubjectsModel().list()` / `client.ListSubjectsModel().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ListSubjectsModel(entopts) {
        const self = this;
        return new ListSubjectsModelEntity_1.ListSubjectsModelEntity(self, entopts);
    }
    // Entity access: `client.Login().list()` / `client.Login().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Login(entopts) {
        const self = this;
        return new LoginEntity_1.LoginEntity(self, entopts);
    }
    // Entity access: `client.Logout().list()` / `client.Logout().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Logout(entopts) {
        const self = this;
        return new LogoutEntity_1.LogoutEntity(self, entopts);
    }
    // Entity access: `client.Merge().list()` / `client.Merge().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Merge(entopts) {
        const self = this;
        return new MergeEntity_1.MergeEntity(self, entopts);
    }
    // Entity access: `client.ReadingGoal().list()` / `client.ReadingGoal().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ReadingGoal(entopts) {
        const self = this;
        return new ReadingGoalEntity_1.ReadingGoalEntity(self, entopts);
    }
    // Entity access: `client.ReadingLog().list()` / `client.ReadingLog().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ReadingLog(entopts) {
        const self = this;
        return new ReadingLogEntity_1.ReadingLogEntity(self, entopts);
    }
    // Entity access: `client.Req().list()` / `client.Req().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Req(entopts) {
        const self = this;
        return new ReqEntity_1.ReqEntity(self, entopts);
    }
    // Entity access: `client.Search().list()` / `client.Search().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Search(entopts) {
        const self = this;
        return new SearchEntity_1.SearchEntity(self, entopts);
    }
    // Entity access: `client.Subject().list()` / `client.Subject().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Subject(entopts) {
        const self = this;
        return new SubjectEntity_1.SubjectEntity(self, entopts);
    }
    static test(testoptsarg, sdkoptsarg) {
        const struct = stdutil.struct;
        const setpath = struct.setpath;
        const getdef = struct.getdef;
        const clone = struct.clone;
        const setprop = struct.setprop;
        const sdkopts = getdef(clone(sdkoptsarg), {});
        const testopts = getdef(clone(testoptsarg), {});
        setprop(testopts, 'active', true);
        setpath(sdkopts, 'feature.test', testopts);
        const testsdk = new OpenLibrarySdkSDK(sdkopts);
        testsdk._mode = 'test';
        return testsdk;
    }
    tester(testopts, sdkopts) {
        return OpenLibrarySdkSDK.test(testopts, sdkopts);
    }
    toJSON() {
        return { name: 'OpenLibrarySdk' };
    }
    toString() {
        return 'OpenLibrarySdk ' + this._utility.struct.jsonify(this.toJSON());
    }
    [node_util_1.inspect.custom]() {
        return this.toString();
    }
}
exports.OpenLibrarySdkSDK = OpenLibrarySdkSDK;
const SDK = OpenLibrarySdkSDK;
exports.SDK = SDK;
//# sourceMappingURL=OpenLibrarySdkSDK.js.map