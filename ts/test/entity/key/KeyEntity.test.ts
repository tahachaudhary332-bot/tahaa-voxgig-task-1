

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


describe('KeyEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when OPEN_LIBRARY_SDK_TEST_LIVE=TRUE.
  afterEach(liveDelay('OPEN_LIBRARY_SDK_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = OpenLibrarySdkSDK.test()
    const ent = testsdk.Key()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = OpenLibrarySdkSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Key().load({"key":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.OPEN_LIBRARY_SDK_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'key.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{},"name":"key","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /publishers/{key}.json","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"key","or":"key","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"ex":false,"k":"query","n":"detail","or":"details","r":false,"t":"`$BOOLEAN`","index$":0},{"a":true,"ex":false,"k":"query","n":"has_fulltext","or":"has_fulltext","r":false,"t":"`$BOOLEAN`","index$":1},{"a":true,"ex":12,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":2},{"a":true,"k":"query","n":"offset","or":"offset","r":false,"t":"`$INTEGER`","index$":3},{"a":true,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":4},{"a":true,"k":"query","n":"published_in","or":"published_in","r":false,"t":"`$ANY`","index$":5},{"a":true,"ex":"editions","k":"query","n":"sort","or":"sort","r":false,"t":"`$STRING`","index$":6}]},"k":"http","m":"GET","o":"/publishers/{key}.json","q":{"exist":["key"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"publishers"},{"lit":"{key}.json"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /subjects/{key}.json","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"key","or":"key","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"ex":false,"k":"query","n":"detail","or":"details","r":false,"t":"`$BOOLEAN`","index$":0},{"a":true,"ex":false,"k":"query","n":"has_fulltext","or":"has_fulltext","r":false,"t":"`$BOOLEAN`","index$":1},{"a":true,"ex":12,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":2},{"a":true,"k":"query","n":"offset","or":"offset","r":false,"t":"`$INTEGER`","index$":3},{"a":true,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":4},{"a":true,"k":"query","n":"published_in","or":"published_in","r":false,"t":"`$ANY`","index$":5},{"a":true,"ex":"editions","k":"query","n":"sort","or":"sort","r":false,"t":"`$STRING`","index$":6}]},"k":"http","m":"GET","o":"/subjects/{key}.json","q":{"exist":["key"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"subjects"},{"lit":"{key}.json"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"key","name__orig":"key","Name":"Key","name_":"key","name-":"key","NAME":"KEY","index$":15}, {"active":true,"entity":"key","key$":"BasicKeyFlow","kind":"basic","name":"BasicKeyFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"key_ref01","srcdatavar":"key_ref01_data","suffix":"_dt0"},"m":{"key":"key01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-key_ref01"}}]}]}, 'Key', {"GET /publishers/{key}.json":{"protocol":"http","parameters":[{"name":"key","in":"path","required":true,"schema":{"type":"string","title":"Key"},"index$":0},{"name":"limit","in":"query","required":false,"schema":{"type":"integer","maximum":1000,"minimum":0,"default":12,"title":"Limit"},"index$":1},{"name":"offset","in":"query","required":false,"schema":{"anyOf":[{"type":"integer","minimum":0},{"type":"null"}],"title":"Offset"},"index$":2},{"name":"page","in":"query","required":false,"schema":{"anyOf":[{"type":"integer","minimum":1},{"type":"null"}],"title":"Page"},"index$":3},{"name":"details","in":"query","required":false,"schema":{"type":"boolean","default":false,"title":"Details"},"index$":4},{"name":"has_fulltext","in":"query","required":false,"schema":{"type":"boolean","default":false,"title":"Has Fulltext"},"index$":5},{"name":"sort","in":"query","required":false,"schema":{"type":"string","default":"editions","title":"Sort"},"index$":6},{"name":"published_in","in":"query","required":false,"schema":{"anyOf":[{"type":"string"},{"type":"null"}],"title":"Published In"},"index$":7}]},"GET /subjects/{key}.json":{"protocol":"http","parameters":[{"name":"key","in":"path","required":true,"schema":{"type":"string","title":"Key"},"index$":0},{"name":"limit","in":"query","required":false,"schema":{"type":"integer","maximum":1000,"minimum":0,"default":12,"title":"Limit"},"index$":1},{"name":"offset","in":"query","required":false,"schema":{"anyOf":[{"type":"integer","minimum":0},{"type":"null"}],"title":"Offset"},"index$":2},{"name":"page","in":"query","required":false,"schema":{"anyOf":[{"type":"integer","minimum":1},{"type":"null"}],"title":"Page"},"index$":3},{"name":"details","in":"query","required":false,"schema":{"type":"boolean","default":false,"title":"Details"},"index$":4},{"name":"has_fulltext","in":"query","required":false,"schema":{"type":"boolean","default":false,"title":"Has Fulltext"},"index$":5},{"name":"sort","in":"query","required":false,"schema":{"type":"string","default":"editions","title":"Sort"},"index$":6},{"name":"published_in","in":"query","required":false,"schema":{"anyOf":[{"type":"string"},{"type":"null"}],"title":"Published In"},"index$":7}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let key_ref01_data = Object.values(setup.data.existing.key)[0] as any

    // LOAD: skipped — no entity id field and load requires path params.
    // Entity-var is declared here so later flow steps still compile.
    const key_ref01_ent = client.Key()


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
      '../../../../.sdk/test/entity/key/KeyTestData.json')

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
    ['key01','key02','key03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'OPEN_LIBRARY_SDK_TEST_KEY_ENTID': idmap,
    'OPEN_LIBRARY_SDK_TEST_LIVE': 'FALSE',
    'OPEN_LIBRARY_SDK_TEST_EXPLAIN': 'FALSE',
    'OPEN_LIBRARY_SDK_APIKEY': '',
    'OPEN_LIBRARY_SDK_SERVER_BASE': "",
  })

  idmap = env['OPEN_LIBRARY_SDK_TEST_KEY_ENTID']

  const live = 'TRUE' === env.OPEN_LIBRARY_SDK_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['OPEN_LIBRARY_SDK_TEST_KEY_ENTID']
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
  
