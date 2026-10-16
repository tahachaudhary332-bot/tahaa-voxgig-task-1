

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


describe('IdvalEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when OPEN_LIBRARY_SDK_TEST_LIVE=TRUE.
  afterEach(liveDelay('OPEN_LIBRARY_SDK_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = OpenLibrarySdkSDK.test()
    const ent = testsdk.Idval()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = OpenLibrarySdkSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Idval().load({"idtype":1,"idval":"x","volume_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.OPEN_LIBRARY_SDK_TEST_LIVE
    for (const op of []) {
      if (!live && maybeSkipControl(t, 'entityOp', 'idval.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{},"name":"idval","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/volumes/{brief_or_full}/{idtype}/{idval}.json","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"idtype","or":"idtype","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"idval","or":"idval","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"volume_id","or":"brief_or_full","r":true,"t":"`$STRING`","index$":2}],"query":[{"a":true,"ex":false,"k":"query","n":"show_all_item","or":"show_all_items","r":false,"t":"`$BOOLEAN`","index$":0}]},"k":"http","m":"GET","o":"/api/volumes/{brief_or_full}/{idtype}/{idval}.json","q":{"exist":["idtype","idval","volume_id"]},"r":{"param":{"brief_or_full":"volume_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"volumes"},{"var":"volume_id"},{"var":"idtype"},{"lit":"{idval}.json"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"idval","name__orig":"idval","Name":"Idval","name_":"idval","name-":"idval","NAME":"IDVAL","index$":12}, {"active":true,"entity":"idval","key$":"BasicIdvalFlow","kind":"basic","name":"BasicIdvalFlow","param":{},"step":[{"a":false,"d":{},"i":{"ref":"idval_ref01","srcdatavar":"idval_ref01_data","suffix":"_dt0"},"m":{"id":"idval01","idval":"idval01","volume_id":"volume01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-idval_ref01"}}],"unreachable":true}]}, 'Idval', {"GET /api/volumes/{brief_or_full}/{idtype}/{idval}.json":{"protocol":"http","parameters":[{"name":"brief_or_full","in":"path","required":true,"schema":{"enum":["brief","full"],"type":"string","title":"Brief Or Full"},"index$":0},{"name":"idtype","in":"path","required":true,"schema":{"enum":["oclc","lccn","issn","isbn","htid","olid","recordnumber"],"type":"string","title":"Idtype"},"index$":1},{"name":"idval","in":"path","required":true,"schema":{"type":"string","title":"Idval"},"index$":2},{"name":"show_all_items","in":"query","required":false,"schema":{"type":"boolean","description":"Show all items including restricted ones","default":false,"title":"Show All Items"},"description":"Show all items including restricted ones","index$":3}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let idval_ref01_data = Object.values(setup.data.existing.idval)[0] as any

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
      '../../../../.sdk/test/entity/idval/IdvalTestData.json')

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
    ['idval01','idval02','idval03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'OPEN_LIBRARY_SDK_TEST_IDVAL_ENTID': idmap,
    'OPEN_LIBRARY_SDK_TEST_LIVE': 'FALSE',
    'OPEN_LIBRARY_SDK_TEST_EXPLAIN': 'FALSE',
    'OPEN_LIBRARY_SDK_APIKEY': '',
    'OPEN_LIBRARY_SDK_SERVER_BASE': "",
  })

  idmap = env['OPEN_LIBRARY_SDK_TEST_IDVAL_ENTID']

  const live = 'TRUE' === env.OPEN_LIBRARY_SDK_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['OPEN_LIBRARY_SDK_TEST_IDVAL_ENTID']
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
  
