

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


describe('AuthorEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when OPEN_LIBRARY_SDK_TEST_LIVE=TRUE.
  afterEach(liveDelay('OPEN_LIBRARY_SDK_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = OpenLibrarySdkSDK.test()
    const ent = testsdk.Author()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = OpenLibrarySdkSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Author().load({"field":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.OPEN_LIBRARY_SDK_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'author.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{},"name":"author","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /search/authors.json","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"*","k":"query","n":"field","or":"fields","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":100,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":1},{"a":true,"k":"query","n":"offset","or":"offset","r":false,"t":"`$INTEGER`","index$":2},{"a":true,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":3},{"a":true,"ex":"","k":"query","n":"q","or":"q","r":false,"t":"`$STRING`","index$":4},{"a":true,"ex":"","k":"query","n":"sort","or":"sort","r":false,"t":"`$STRING`","index$":5}]},"k":"http","m":"GET","o":"/search/authors.json","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"search"},{"lit":"authors.json"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"author","name__orig":"author","Name":"Author","name_":"author","name-":"author","NAME":"AUTHOR","index$":3}, {"active":true,"entity":"author","key$":"BasicAuthorFlow","kind":"basic","name":"BasicAuthorFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"author_ref01","srcdatavar":"author_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-author_ref01"}}]}]}, 'Author', {"GET /search/authors.json":{"protocol":"http","parameters":[{"name":"limit","in":"query","required":false,"schema":{"type":"integer","minimum":0,"default":100,"title":"Limit"},"index$":0},{"name":"offset","in":"query","required":false,"schema":{"anyOf":[{"type":"integer","minimum":0},{"type":"null"}],"title":"Offset"},"index$":1},{"name":"page","in":"query","required":false,"schema":{"anyOf":[{"type":"integer","minimum":1},{"type":"null"}],"title":"Page"},"index$":2},{"name":"q","in":"query","required":false,"schema":{"type":"string","default":"","title":"Q"},"index$":3},{"name":"fields","in":"query","required":false,"schema":{"type":"string","default":"*","title":"Fields"},"index$":4},{"name":"sort","in":"query","required":false,"schema":{"type":"string","enum":["work_count desc","name","birth_date asc","birth_date desc","random","random asc","random desc","random.hourly","random.daily",""],"default":"","title":"Sort"},"index$":5}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let author_ref01_data = Object.values(setup.data.existing.author)[0] as any

    // LOAD
    const author_ref01_ent = client.Author()
    const author_ref01_match_dt0: any = {}
    const author_ref01_data_dt0 = (await author_ref01_ent.load(author_ref01_match_dt0)).data()
    assert(null != author_ref01_data_dt0)


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
      '../../../../.sdk/test/entity/author/AuthorTestData.json')

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
    ['author01','author02','author03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'OPEN_LIBRARY_SDK_TEST_AUTHOR_ENTID': idmap,
    'OPEN_LIBRARY_SDK_TEST_LIVE': 'FALSE',
    'OPEN_LIBRARY_SDK_TEST_EXPLAIN': 'FALSE',
    'OPEN_LIBRARY_SDK_APIKEY': '',
    'OPEN_LIBRARY_SDK_SERVER_BASE': "",
  })

  idmap = env['OPEN_LIBRARY_SDK_TEST_AUTHOR_ENTID']

  const live = 'TRUE' === env.OPEN_LIBRARY_SDK_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['OPEN_LIBRARY_SDK_TEST_AUTHOR_ENTID']
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
  
