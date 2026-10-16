// OpenLibrarySdk Ts SDK

import { AccountLoanEntity } from './entity/AccountLoanEntity'
import { AccountLoanHistoryEntity } from './entity/AccountLoanHistoryEntity'
import { ArchiveorgEntity } from './entity/ArchiveorgEntity'
import { AuthorEntity } from './entity/AuthorEntity'
import { BookEntity } from './entity/BookEntity'
import { BorrowEntity } from './entity/BorrowEntity'
import { CheckInEntity } from './entity/CheckInEntity'
import { CreateListEntity } from './entity/CreateListEntity'
import { FeedEntity } from './entity/FeedEntity'
import { GraphiteEntity } from './entity/GraphiteEntity'
import { HealthEntity } from './entity/HealthEntity'
import { IanEntity } from './entity/IanEntity'
import { IdvalEntity } from './entity/IdvalEntity'
import { ImportEntity } from './entity/ImportEntity'
import { InsideEntity } from './entity/InsideEntity'
import { KeyEntity } from './entity/KeyEntity'
import { LanguageEntity } from './entity/LanguageEntity'
import { ListEntity } from './entity/ListEntity'
import { ListEditionsModelEntity } from './entity/ListEditionsModelEntity'
import { ListSubjectsModelEntity } from './entity/ListSubjectsModelEntity'
import { LoginEntity } from './entity/LoginEntity'
import { LogoutEntity } from './entity/LogoutEntity'
import { MergeEntity } from './entity/MergeEntity'
import { ReadingGoalEntity } from './entity/ReadingGoalEntity'
import { ReadingLogEntity } from './entity/ReadingLogEntity'
import { ReqEntity } from './entity/ReqEntity'
import { SearchEntity } from './entity/SearchEntity'
import { SubjectEntity } from './entity/SubjectEntity'

export type * from './OpenLibrarySdkTypes'


import { inspect } from 'node:util'

import type { Context, Feature } from './types'

import { config } from './Config'
import { OpenLibrarySdkEntityBase } from './OpenLibrarySdkEntityBase'
import { Utility } from './utility/Utility'
import { unreadableBody } from './utility/ResultBodyUtility'
import { abortError } from './utility/MakeRequestUtility'
import { allowed } from './utility/PrepareMethodUtility'


import { BaseFeature } from './feature/base/BaseFeature'



const stdutil = new Utility()


// A request's outcome: ok is false alone on an error with no response, so a
// caller narrowing on it reaches the status and the data.
type DirectResult =
  | { ok: false, err: any, status?: undefined, headers?: undefined, data?: undefined }
  | { ok: boolean, status: number, headers: any, data: any, err?: any }


class OpenLibrarySdkSDK {
  _mode: string = 'live'
  _options: any
  _utility = new Utility()
  _features: Feature[]
  _rootctx: Context
  

  constructor(options?: any) {

    this._rootctx = this._utility.makeContext({
      client: this,
      utility: this._utility,
      config,
      options,
      shared: new WeakMap()
    })

    this._options = this._utility.makeOptions(this._rootctx)

    for (const key of ['_options', '_rootctx', '_features']) {
      Object.defineProperty(this, key, {
        value: (this as any)[key], enumerable: false, writable: true, configurable: true
      })
    }

    const struct = this._utility.struct
    const getpath = struct.getpath

    if (true === getpath(this._options.feature, 'test.active')) {
      this._mode = 'test'
    }

    this._rootctx.options = this._options

    this._features = []

    const featureAdd = this._utility.featureAdd
    const featureInit = this._utility.featureInit

    // Add features in the resolved order (makeOptions puts an explicit
    // array order first, else defaults to test-first). Ordering matters:
    // the `test` feature installs the base mock transport and the transport
    // features (retry/cache/netsim/proxy/ratelimit) wrap whatever is current,
    // so `test` must be added before them to sit at the base of the chain.
    const extend = this._options.extend || []

    const featureorder = getpath(this._options, '__derived__.featureorder') || []
    for (const fname of featureorder) {
      const fopts = this._options.feature[fname] || {}
      if (fopts.active) {
        // An active name with no generated class is legal when an
        // extend-supplied instance carries that name (station's adopt
        // path): the instance is added below, positioned by its own
        // __after__ entry, so skip it here rather than fail construction.
        if (!this._rootctx.config.hasFeature(fname) &&
          extend.some((f: any) => fname === f.name)) {
          continue
        }
        featureAdd(this._rootctx, this._rootctx.config.makeFeature(fname))
      }
    }

    for (let f of extend) {
      featureAdd(this._rootctx, f)
    }

    for (let f of this._features) {
      featureInit(this._rootctx, f)
    }

    const featureHook = this._utility.featureHook
    featureHook(this._rootctx, 'PostConstruct')
  }


  options() {
    return this._utility.struct.clone(this._options)
  }


  utility() {
    return this._utility.struct.clone(this._utility)
  }

  


  async prepare(fetchargs?: any) {
    const utility = this._utility
    const struct = utility.struct
    const clone = struct.clone

    const {
      makeContext,
      makeFetchDef,
      prepareHeaders,
      prepareAuth,
    } = utility

    fetchargs = fetchargs || {}

    let ctx: Context = makeContext({
      opname: 'prepare',
      ctrl: fetchargs.ctrl || {},
    }, this._rootctx)

    const options = this._options
    const method = String(fetchargs.method || 'GET').toUpperCase()

    if (!allowed(options.allow.method, method)) {
      return ctx.error('spec_method_allow', 'Method "' + method +
        '" not allowed by SDK option allow.method value: "' + options.allow.method + '"')
    }

    const spec: any = {
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
    }

    ctx.spec = spec

    if (fetchargs.headers) {
      const uheaders = fetchargs.headers
      for (let key in uheaders) {
        spec.headers[key] = uheaders[key]
      }
    }

    

    const authResult = prepareAuth(ctx)
    if (authResult instanceof Error) {
      return authResult
    }

    return makeFetchDef(ctx)
  }


  // Raw endpoint access is operator-controllable, like every entity op.
  // Blocking it means denying BOTH the 'direct' and 'graphql' tokens, since
  // either one reaches the same endpoint.
  async direct(fetchargs?: any): Promise<DirectResult> {
    if (!allowed(this._options.allow.op, 'direct')) {
      return {
        ok: false,
        err: new Error('OpenLibrarySdkSDK: direct: operation not allowed by' +
          ' SDK option allow.op value: "' + this._options.allow.op + '"'),
      }
    }

    return this._rawRequest(fetchargs)
  }


  // Ungated request path shared by direct() and graphql(), each of which
  // checks its own allow.op token first. Private, rather than a flag on
  // fetchargs: a caller-supplied marker would let anyone opt straight back
  // out of the gate by passing it.
  async _rawRequest(fetchargs?: any): Promise<DirectResult> {
    const utility = this._utility

    const fetcher = utility.fetcher
    const makeContext = utility.makeContext

    const fetchdef = await this.prepare(fetchargs)
    if (fetchdef instanceof Error) {
      return { ok: false, err: utility.clean(this._rootctx, fetchdef) }
    }

    let ctx: Context = makeContext({
      opname: 'direct',
      ctrl: (fetchargs || {}).ctrl || {},
    }, this._rootctx)

    try {
      if (true === fetchdef.signal?.aborted) {
        throw fetchdef.signal.reason
      }

      const fetched = await fetcher(ctx, fetchdef.url, fetchdef)

      if (null == fetched) {
        return { ok: false, err: ctx.error('direct_no_response', 'response: undefined') }
      }
      else if (fetched instanceof Error) {
        return { ok: false, err: utility.clean(ctx, abortError(ctx, fetched)) }
      }

      const status = fetched.status

      // No body responses (204 No Content, 304 Not Modified) and explicit
      // zero content-length must skip JSON parsing — fetched.json() would
      // throw `Unexpected end of JSON input` on an empty body.
      const headers = fetched.headers
      const contentLength = headers && 'function' === typeof headers.get
        ? headers.get('content-length')
        : (headers || {})['content-length']
      const noBody = 204 === status || 304 === status || '0' === String(contentLength)

      let json: any = undefined
      let err: any = undefined
      if (!noBody) {
        let text: any = undefined
        try {
          const raw: any = fetched
          if ('function' === typeof raw.text) {
            text = await raw.text()
            json = '' === text.trim() ? undefined : JSON.parse(text)
          }
          else {
            json = 'function' === typeof fetched.json ? await fetched.json() : fetched.json
          }
        }
        catch (parseErr: any) {
          if ('SyntaxError' !== parseErr?.name) {
            throw parseErr
          }
          err = unreadableBody(ctx, {
            status, headers, text: text ?? parseErr.text, sent: fetchdef.headers,
            failed: 200 <= status && status < 300 ? undefined :
              ctx.error('request_status', 'request: ' + status + ': ' + fetched.statusText),
          })
        }
      }

      return {
        ok: null == err && status >= 200 && status < 300,
        status,
        headers: fetched.headers,
        data: json,
        ...(null == err ? {} : { err: utility.clean(ctx, err) }),
      }
    }
    catch (err: any) {
      return { ok: false, err: utility.clean(ctx, abortError(ctx, err)) }
    }
  }



  async graphql(query: string, variables?: any, ctrl?: any) {
    const options = this._options

    if (!allowed(options.allow.op, 'graphql')) {
      return {
        ok: false,
        err: new Error('OpenLibrarySdkSDK: graphql: operation not allowed by' +
          ' SDK option allow.op value: "' + options.allow.op + '"'),
      }
    }

    const res: any = await this._rawRequest({
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: { query, variables: variables || {} },
      ctrl,
    })

    // Errors are read BEFORE any status check: a GraphQL parse or validation
    // failure comes back as HTTP 400 carrying the standard { errors: [...] }
    // body, and the raw path represents a non-2xx as { ok: false } with no
    // err — so returning early on status would discard the server's own
    // diagnostics, which are the only useful part of that response.
    const errors = null == res.data ? undefined : res.data.errors

    if (null != errors && Array.isArray(errors) && 0 < errors.length) {
      const first = errors[0] || {}
      const err: any = new Error('OpenLibrarySdkSDK: graphql: ' +
        (first.message || 'graphql error'))
      err.graphql = errors
      return { ok: false, status: res.status, headers: res.headers, err, data: res.data }
    }

    return res
  }



  // Entity access: `client.AccountLoan().list()` / `client.AccountLoan().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  AccountLoan(entopts?: Record<string, any>) {
    const self = this
    return new AccountLoanEntity(self, entopts)
  }


  // Entity access: `client.AccountLoanHistory().list()` / `client.AccountLoanHistory().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  AccountLoanHistory(entopts?: Record<string, any>) {
    const self = this
    return new AccountLoanHistoryEntity(self, entopts)
  }


  // Entity access: `client.Archiveorg().list()` / `client.Archiveorg().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Archiveorg(entopts?: Record<string, any>) {
    const self = this
    return new ArchiveorgEntity(self, entopts)
  }


  // Entity access: `client.Author().list()` / `client.Author().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Author(entopts?: Record<string, any>) {
    const self = this
    return new AuthorEntity(self, entopts)
  }


  // Entity access: `client.Book().list()` / `client.Book().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Book(entopts?: Record<string, any>) {
    const self = this
    return new BookEntity(self, entopts)
  }


  // Entity access: `client.Borrow().list()` / `client.Borrow().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Borrow(entopts?: Record<string, any>) {
    const self = this
    return new BorrowEntity(self, entopts)
  }


  // Entity access: `client.CheckIn().list()` / `client.CheckIn().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  CheckIn(entopts?: Record<string, any>) {
    const self = this
    return new CheckInEntity(self, entopts)
  }


  // Entity access: `client.CreateList().list()` / `client.CreateList().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  CreateList(entopts?: Record<string, any>) {
    const self = this
    return new CreateListEntity(self, entopts)
  }


  // Entity access: `client.Feed().list()` / `client.Feed().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Feed(entopts?: Record<string, any>) {
    const self = this
    return new FeedEntity(self, entopts)
  }


  // Entity access: `client.Graphite().list()` / `client.Graphite().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Graphite(entopts?: Record<string, any>) {
    const self = this
    return new GraphiteEntity(self, entopts)
  }


  // Entity access: `client.Health().list()` / `client.Health().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Health(entopts?: Record<string, any>) {
    const self = this
    return new HealthEntity(self, entopts)
  }


  // Entity access: `client.Ian().list()` / `client.Ian().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Ian(entopts?: Record<string, any>) {
    const self = this
    return new IanEntity(self, entopts)
  }


  // Entity access: `client.Idval().list()` / `client.Idval().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Idval(entopts?: Record<string, any>) {
    const self = this
    return new IdvalEntity(self, entopts)
  }


  // Entity access: `client.Import().list()` / `client.Import().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Import(entopts?: Record<string, any>) {
    const self = this
    return new ImportEntity(self, entopts)
  }


  // Entity access: `client.Inside().list()` / `client.Inside().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Inside(entopts?: Record<string, any>) {
    const self = this
    return new InsideEntity(self, entopts)
  }


  // Entity access: `client.Key().list()` / `client.Key().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Key(entopts?: Record<string, any>) {
    const self = this
    return new KeyEntity(self, entopts)
  }


  // Entity access: `client.Language().list()` / `client.Language().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Language(entopts?: Record<string, any>) {
    const self = this
    return new LanguageEntity(self, entopts)
  }


  // Entity access: `client.List().list()` / `client.List().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  List(entopts?: Record<string, any>) {
    const self = this
    return new ListEntity(self, entopts)
  }


  // Entity access: `client.ListEditionsModel().list()` / `client.ListEditionsModel().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ListEditionsModel(entopts?: Record<string, any>) {
    const self = this
    return new ListEditionsModelEntity(self, entopts)
  }


  // Entity access: `client.ListSubjectsModel().list()` / `client.ListSubjectsModel().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ListSubjectsModel(entopts?: Record<string, any>) {
    const self = this
    return new ListSubjectsModelEntity(self, entopts)
  }


  // Entity access: `client.Login().list()` / `client.Login().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Login(entopts?: Record<string, any>) {
    const self = this
    return new LoginEntity(self, entopts)
  }


  // Entity access: `client.Logout().list()` / `client.Logout().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Logout(entopts?: Record<string, any>) {
    const self = this
    return new LogoutEntity(self, entopts)
  }


  // Entity access: `client.Merge().list()` / `client.Merge().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Merge(entopts?: Record<string, any>) {
    const self = this
    return new MergeEntity(self, entopts)
  }


  // Entity access: `client.ReadingGoal().list()` / `client.ReadingGoal().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ReadingGoal(entopts?: Record<string, any>) {
    const self = this
    return new ReadingGoalEntity(self, entopts)
  }


  // Entity access: `client.ReadingLog().list()` / `client.ReadingLog().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ReadingLog(entopts?: Record<string, any>) {
    const self = this
    return new ReadingLogEntity(self, entopts)
  }


  // Entity access: `client.Req().list()` / `client.Req().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Req(entopts?: Record<string, any>) {
    const self = this
    return new ReqEntity(self, entopts)
  }


  // Entity access: `client.Search().list()` / `client.Search().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Search(entopts?: Record<string, any>) {
    const self = this
    return new SearchEntity(self, entopts)
  }


  // Entity access: `client.Subject().list()` / `client.Subject().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Subject(entopts?: Record<string, any>) {
    const self = this
    return new SubjectEntity(self, entopts)
  }




  static test(testoptsarg?: any, sdkoptsarg?: any) {
    const struct = stdutil.struct
    const setpath = struct.setpath
    const getdef = struct.getdef
    const clone = struct.clone
    const setprop = struct.setprop

    const sdkopts = getdef(clone(sdkoptsarg), {})
    const testopts = getdef(clone(testoptsarg), {})
    setprop(testopts, 'active', true)
    setpath(sdkopts, 'feature.test', testopts)

    const testsdk = new OpenLibrarySdkSDK(sdkopts)
    testsdk._mode = 'test'

    return testsdk
  }


  tester(testopts?: any, sdkopts?: any) {
    return OpenLibrarySdkSDK.test(testopts, sdkopts)
  }


  toJSON() {
    return { name: 'OpenLibrarySdk' }
  }

  toString() {
    return 'OpenLibrarySdk ' + this._utility.struct.jsonify(this.toJSON())
  }

  [inspect.custom]() {
    return this.toString()
  }

}




const SDK = OpenLibrarySdkSDK


export {
  stdutil,
  config,
  

  BaseFeature,
  OpenLibrarySdkEntityBase,

  OpenLibrarySdkSDK,
  SDK,
}


export type { DirectResult }
