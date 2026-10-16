

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


describe('ListEditionsModelEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when OPEN_LIBRARY_SDK_TEST_LIVE=TRUE.
  afterEach(liveDelay('OPEN_LIBRARY_SDK_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = OpenLibrarySdkSDK.test()
    const ent = testsdk.ListEditionsModel()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = OpenLibrarySdkSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.ListEditionsModel().list({"series_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.OPEN_LIBRARY_SDK_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'list_editions_model.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"end":{"a":true,"h":"End","n":"end","r":true,"t":"`$INTEGER`","key$":"end","index$":0},"entries":{"a":true,"h":"Entries","n":"entries","r":true,"t":"`$ARRAY`","key$":"entries","index$":1},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":2},"links":{"a":true,"h":"Links","n":"links","r":true,"t":"`$OBJECT`","key$":"links","index$":3},"size":{"a":true,"h":"Size","n":"size","r":true,"t":"`$INTEGER`","key$":"size","index$":4},"start":{"a":true,"h":"Start","n":"start","r":true,"t":"`$INTEGER`","key$":"start","index$":5}},"id":{"field":"id","name":"id"},"name":"list_editions_model","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /people/{username}/lists/{olid}/editions.json","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"olid","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"username","or":"username","r":true,"t":"`$STRING`","index$":1}],"query":[{"a":true,"ex":50,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"ex":0,"k":"query","n":"offset","or":"offset","r":false,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/people/{username}/lists/{olid}/editions.json","q":{"$action":"editions.json","exist":["id","username"]},"r":{"param":{"olid":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"people"},{"var":"username"},{"lit":"lists"},{"var":"id"},{"lit":"editions.json"}],"t":{"req":"`reqdata`","res":"`body.entries`"},"index$":0},{"a":true,"co":{"id":"GET /lists/{olid}/editions.json","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"olid","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"ex":50,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"ex":0,"k":"query","n":"offset","or":"offset","r":false,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/lists/{olid}/editions.json","q":{"$action":"editions.json","exist":["id"]},"r":{"param":{"olid":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"lists"},{"var":"id"},{"lit":"editions.json"}],"t":{"req":"`reqdata`","res":"`body.entries`"},"index$":1},{"a":true,"co":{"id":"GET /series/{olid}/editions.json","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"series_id","or":"olid","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"ex":50,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"ex":0,"k":"query","n":"offset","or":"offset","r":false,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/series/{olid}/editions.json","q":{"exist":["series_id"]},"r":{"param":{"olid":"series_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"series"},{"var":"series_id"},{"lit":"editions.json"}],"t":{"req":"`reqdata`","res":"`body.entries`"},"index$":2}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"list_editions_model","name__orig":"list_editions_model","Name":"ListEditionsModel","name_":"list_editions_model","name-":"list-editions-model","NAME":"LIST_EDITIONS_MODEL","index$":18}, {"active":true,"entity":"list_editions_model","key$":"BasicListEditionsModelFlow","kind":"basic","name":"BasicListEditionsModelFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"series_id":"series01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"list_editions_model_ref01"}}]}]}, 'ListEditionsModel', {"GET /people/{username}/lists/{olid}/editions.json":{"protocol":"http","parameters":[{"name":"username","in":"path","required":true,"schema":{"type":"string","description":"The patron's username","title":"Username"},"description":"The patron's username","index$":0},{"name":"olid","in":"path","required":true,"schema":{"type":"string","pattern":"OL\\d+L","description":"The OLID, e.g. OL123L","title":"Olid"},"description":"The OLID, e.g. OL123L","index$":1},{"name":"limit","in":"query","required":false,"schema":{"type":"integer","minimum":0,"description":"Number of items to return","default":50,"title":"Limit"},"description":"Number of items to return","index$":2},{"name":"offset","in":"query","required":false,"schema":{"type":"integer","minimum":0,"description":"Pagination offset","default":0,"title":"Offset"},"description":"Pagination offset","index$":3}]},"GET /lists/{olid}/editions.json":{"protocol":"http","parameters":[{"name":"olid","in":"path","required":true,"schema":{"type":"string","pattern":"OL\\d+L","description":"The OLID, e.g. OL123L","title":"Olid"},"description":"The OLID, e.g. OL123L","index$":0},{"name":"limit","in":"query","required":false,"schema":{"type":"integer","minimum":0,"description":"Number of items to return","default":50,"title":"Limit"},"description":"Number of items to return","index$":1},{"name":"offset","in":"query","required":false,"schema":{"type":"integer","minimum":0,"description":"Pagination offset","default":0,"title":"Offset"},"description":"Pagination offset","index$":2}]},"GET /series/{olid}/editions.json":{"protocol":"http","parameters":[{"name":"olid","in":"path","required":true,"schema":{"type":"string","pattern":"OL\\d+L","description":"The OLID, e.g. OL123L","title":"Olid"},"description":"The OLID, e.g. OL123L","index$":0},{"name":"limit","in":"query","required":false,"schema":{"type":"integer","minimum":0,"description":"Number of items to return","default":50,"title":"Limit"},"description":"Number of items to return","index$":1},{"name":"offset","in":"query","required":false,"schema":{"type":"integer","minimum":0,"description":"Pagination offset","default":0,"title":"Offset"},"description":"Pagination offset","index$":2}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let list_editions_model_ref01_data = Object.values(setup.data.existing.list_editions_model)[0] as any

    // LIST
    const list_editions_model_ref01_ent = client.ListEditionsModel()
    const list_editions_model_ref01_match: any = {}
    list_editions_model_ref01_match['series_id'] = setup.idmap['series01']

    const list_editions_model_ref01_list = (await list_editions_model_ref01_ent.list(list_editions_model_ref01_match)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/list_editions_model/ListEditionsModelTestData.json')

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
    ['list_editions_model01','list_editions_model02','list_editions_model03','series01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'OPEN_LIBRARY_SDK_TEST_LIST_EDITIONS_MODEL_ENTID': idmap,
    'OPEN_LIBRARY_SDK_TEST_LIVE': 'FALSE',
    'OPEN_LIBRARY_SDK_TEST_EXPLAIN': 'FALSE',
    'OPEN_LIBRARY_SDK_APIKEY': '',
    'OPEN_LIBRARY_SDK_SERVER_BASE': "",
  })

  idmap = env['OPEN_LIBRARY_SDK_TEST_LIST_EDITIONS_MODEL_ENTID']

  const live = 'TRUE' === env.OPEN_LIBRARY_SDK_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['OPEN_LIBRARY_SDK_TEST_LIST_EDITIONS_MODEL_ENTID']
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
  
