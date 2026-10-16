

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


describe('BorrowEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when OPEN_LIBRARY_SDK_TEST_LIVE=TRUE.
  afterEach(liveDelay('OPEN_LIBRARY_SDK_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = OpenLibrarySdkSDK.test()
    const ent = testsdk.Borrow()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = OpenLibrarySdkSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Borrow().load({"book_id":1,"slug":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.OPEN_LIBRARY_SDK_TEST_LIVE
    for (const op of ['create', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'borrow.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{},"name":"borrow","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /books/{olid}/{slug}/borrow","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"book_id","or":"olid","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"slug","or":"slug","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/books/{olid}/{slug}/borrow","q":{"exist":["book_id","slug"]},"r":{"param":{"olid":"book_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"books"},{"var":"book_id"},{"var":"slug"},{"lit":"borrow"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /books/{olid}/{slug}/borrow","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"book_id","or":"olid","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"slug","or":"slug","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/books/{olid}/{slug}/borrow","q":{"exist":["book_id","slug"]},"r":{"param":{"olid":"book_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"books"},{"var":"book_id"},{"var":"slug"},{"lit":"borrow"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[["$.main.kit.entity.book"]]},"key$":"borrow","name__orig":"borrow","Name":"Borrow","name_":"borrow","name-":"borrow","NAME":"BORROW","index$":5}, {"active":true,"entity":"borrow","key$":"BasicBorrowFlow","kind":"basic","name":"BasicBorrowFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"borrow_ref01"},"m":{"book_id":"book01","slug":"slug01"},"o":"create","s":[],"v":[]},{"a":true,"d":{},"i":{"ref":"borrow_ref01","srcdatavar":"borrow_ref01_data","suffix":"_dt0"},"m":{"book_id":"book01","id":"borrow01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-borrow_ref01"}}]}]}, 'Borrow', {"POST /books/{olid}/{slug}/borrow":{"protocol":"http","parameters":[{"name":"olid","in":"path","required":true,"schema":{"type":"string","title":"Olid"},"index$":0},{"name":"slug","in":"path","required":true,"schema":{"type":"string","title":"Slug"},"index$":1}]},"GET /books/{olid}/{slug}/borrow":{"protocol":"http","parameters":[{"name":"olid","in":"path","required":true,"schema":{"type":"string","title":"Olid"},"index$":0},{"name":"slug","in":"path","required":true,"schema":{"type":"string","title":"Slug"},"index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const borrow_ref01_ent = client.Borrow()
    let borrow_ref01_data = setup.data.new.borrow['borrow_ref01']
    borrow_ref01_data['book_id'] = setup.idmap['book01']
    borrow_ref01_data['slug'] = setup.idmap['slug01']

    borrow_ref01_data = (await borrow_ref01_ent.create(borrow_ref01_data)).data()
    assert(null != borrow_ref01_data)



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
      '../../../../.sdk/test/entity/borrow/BorrowTestData.json')

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
    ['borrow01','borrow02','borrow03','book01','book02','book03','slug01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'OPEN_LIBRARY_SDK_TEST_BORROW_ENTID': idmap,
    'OPEN_LIBRARY_SDK_TEST_LIVE': 'FALSE',
    'OPEN_LIBRARY_SDK_TEST_EXPLAIN': 'FALSE',
    'OPEN_LIBRARY_SDK_APIKEY': '',
    'OPEN_LIBRARY_SDK_SERVER_BASE': "",
  })

  idmap = env['OPEN_LIBRARY_SDK_TEST_BORROW_ENTID']

  const live = 'TRUE' === env.OPEN_LIBRARY_SDK_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['OPEN_LIBRARY_SDK_TEST_BORROW_ENTID']
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
  
