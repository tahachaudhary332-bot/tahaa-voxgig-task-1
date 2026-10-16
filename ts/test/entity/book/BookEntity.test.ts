

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { OpenLibrarySdkSDK, BaseFeature, config, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('BookEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when OPEN_LIBRARY_SDK_TEST_LIVE=TRUE.
  afterEach(liveDelay('OPEN_LIBRARY_SDK_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = OpenLibrarySdkSDK.test()
    const ent = testsdk.Book()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = OpenLibrarySdkSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Book().load({"bibkey":"x","detail":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.OPEN_LIBRARY_SDK_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'book.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{},"name":"book","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/books.json","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"bibkey","or":"bibkeys","r":true,"t":"`$ARRAY`","index$":0},{"a":true,"k":"query","n":"callback","or":"callback","r":false,"t":"`$ANY`","index$":1},{"a":true,"ex":"false","k":"query","n":"detail","or":"details","r":false,"t":"`$STRING`","index$":2},{"a":true,"k":"query","n":"format","or":"format","r":false,"t":"`$ANY`","index$":3},{"a":true,"ex":false,"k":"query","n":"high_priority","or":"high_priority","r":false,"t":"`$BOOLEAN`","index$":4},{"a":true,"k":"query","n":"jscmd","or":"jscmd","r":false,"t":"`$ANY`","index$":5}]},"k":"http","m":"GET","o":"/api/books.json","q":{"exist":["bibkey"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"books.json"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"book","name__orig":"book","Name":"Book","name_":"book","name-":"book","NAME":"BOOK","index$":4}, {"active":true,"entity":"book","key$":"BasicBookFlow","kind":"basic","name":"BasicBookFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"book_ref01","srcdatavar":"book_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-book_ref01"}}]}]}, 'Book', {"GET /api/books.json":{"protocol":"http","parameters":[{"name":"bibkeys","in":"query","required":true,"schema":{"type":"array","items":{"type":"string"},"description":"Comma-separated list of bibliography keys (ISBN, LCCN, OCLC, etc.)","title":"Bibkeys"},"description":"Comma-separated list of bibliography keys (ISBN, LCCN, OCLC, etc.)","index$":0},{"name":"details","in":"query","required":false,"schema":{"enum":["true","false"],"type":"string","description":"Include detailed book information","default":"false","title":"Details"},"description":"Include detailed book information","index$":1},{"name":"jscmd","in":"query","required":false,"schema":{"anyOf":[{"enum":["details","data","viewapi"],"type":"string"},{"type":"null"}],"description":"Format of returned data","title":"Jscmd"},"description":"Format of returned data","index$":2},{"name":"callback","in":"query","required":false,"schema":{"anyOf":[{"type":"string"},{"type":"null"}],"description":"JSONP callback function name","title":"Callback"},"description":"JSONP callback function name","index$":3},{"name":"high_priority","in":"query","required":false,"schema":{"type":"boolean","description":"Attempt import immediately for missing ISBNs","default":false,"title":"High Priority"},"description":"Attempt import immediately for missing ISBNs","index$":4},{"name":"format","in":"query","required":false,"schema":{"anyOf":[{"enum":["json","js"],"type":"string"},{"type":"null"}],"description":"Explicitly set response format (overrides path-based detection)","title":"Format"},"description":"Explicitly set response format (overrides path-based detection)","index$":5}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let book_ref01_data = Object.values(setup.data.existing.book)[0] as any

    // LOAD
    const book_ref01_ent = client.Book()
    const book_ref01_match_dt0: any = {}
    const book_ref01_data_dt0 = (await book_ref01_ent.load(book_ref01_match_dt0)).data()
    assert(null != book_ref01_data_dt0)


  })
})



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/book/BookTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = OpenLibrarySdkSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['book01','book02','book03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'OPEN_LIBRARY_SDK_TEST_BOOK_ENTID': idmap,
    'OPEN_LIBRARY_SDK_TEST_LIVE': 'FALSE',
    'OPEN_LIBRARY_SDK_TEST_EXPLAIN': 'FALSE',
    'OPEN_LIBRARY_SDK_APIKEY': '',
    'OPEN_LIBRARY_SDK_SERVER_BASE': "",
  })

  idmap = env['OPEN_LIBRARY_SDK_TEST_BOOK_ENTID']

  const live = 'TRUE' === env.OPEN_LIBRARY_SDK_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['OPEN_LIBRARY_SDK_TEST_BOOK_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new OpenLibrarySdkSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
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
    ]))
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
  }

  return setup
}
  
