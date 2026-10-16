

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


describe('ImportEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when OPEN_LIBRARY_SDK_TEST_LIVE=TRUE.
  afterEach(liveDelay('OPEN_LIBRARY_SDK_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = OpenLibrarySdkSDK.test()
    const ent = testsdk.Import()
    assert(null != ent)
  })




  test('basic', async (t) => {

    const live = 'TRUE' === process.env.OPEN_LIBRARY_SDK_TEST_LIVE
    for (const op of ['create', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'import.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{},"name":"import","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /import/preview.json","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/import/preview.json","q":{"$action":"preview"},"r":{},"rb":{"fields":[{"name":"identifier"},{"name":"provider"},{"name":"save"},{"name":"source"}],"kind":"form","media":"application/x-www-form-urlencoded"},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"import"},{"lit":"preview.json"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /import/preview.json","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"identifier","or":"identifier","r":false,"t":"`$ANY`","index$":0},{"a":true,"k":"query","n":"provider","or":"provider","r":false,"t":"`$ANY`","index$":1},{"a":true,"k":"query","n":"source","or":"source","r":false,"t":"`$ANY`","index$":2}]},"k":"http","m":"GET","o":"/import/preview.json","q":{"$action":"preview"},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"import"},{"lit":"preview.json"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"import","name__orig":"import","Name":"Import","name_":"import","name-":"import","NAME":"IMPORT","index$":13}, {"active":true,"entity":"import","key$":"BasicImportFlow","kind":"basic","name":"BasicImportFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"import_ref01"},"m":{},"o":"create","s":[],"v":[]},{"a":true,"d":{},"i":{"ref":"import_ref01","srcdatavar":"import_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-import_ref01"}}]}]}, 'Import', {"POST /import/preview.json":{"protocol":"http","requestBody":{"content":{"application/x-www-form-urlencoded":{"schema":{"properties":{"source":{"anyOf":[{"type":"string"},{"type":"null"}],"title":"Source"},"provider":{"anyOf":[{"type":"string"},{"type":"null"}],"title":"Provider"},"identifier":{"anyOf":[{"type":"string"},{"type":"null"}],"title":"Identifier"},"save":{"type":"boolean","title":"Save","default":false}},"type":"object","title":"Body_import_preview_json_post_import_preview_json_post","x-ref":"#/components/schemas/Body_import_preview_json_post_import_preview_json_post"}}}},"parameters":[]},"GET /import/preview.json":{"protocol":"http","parameters":[{"name":"source","in":"query","required":false,"schema":{"anyOf":[{"type":"string"},{"type":"null"}],"description":"Source in format 'provider:identifier' (e.g. 'amazon:ASIN')","title":"Source"},"description":"Source in format 'provider:identifier' (e.g. 'amazon:ASIN')","index$":0},{"name":"provider","in":"query","required":false,"schema":{"anyOf":[{"type":"string"},{"type":"null"}],"description":"Metadata provider: amazon, ia, or marc","title":"Provider"},"description":"Metadata provider: amazon, ia, or marc","index$":1},{"name":"identifier","in":"query","required":false,"schema":{"anyOf":[{"type":"string"},{"type":"null"}],"description":"Identifier for the given provider","title":"Identifier"},"description":"Identifier for the given provider","index$":2}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const import_ref01_ent = client.Import()
    let import_ref01_data = setup.data.new.import['import_ref01']

    import_ref01_data = (await import_ref01_ent.create(import_ref01_data)).data()
    assert(null != import_ref01_data)


    // LOAD
    const import_ref01_match_dt0: any = {}
    const import_ref01_data_dt0 = (await import_ref01_ent.load(import_ref01_match_dt0)).data()
    assert(null != import_ref01_data_dt0)


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
      '../../../../.sdk/test/entity/import/ImportTestData.json')

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
    ['import01','import02','import03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'OPEN_LIBRARY_SDK_TEST_IMPORT_ENTID': idmap,
    'OPEN_LIBRARY_SDK_TEST_LIVE': 'FALSE',
    'OPEN_LIBRARY_SDK_TEST_EXPLAIN': 'FALSE',
    'OPEN_LIBRARY_SDK_APIKEY': '',
    'OPEN_LIBRARY_SDK_SERVER_BASE': "",
  })

  idmap = env['OPEN_LIBRARY_SDK_TEST_IMPORT_ENTID']

  const live = 'TRUE' === env.OPEN_LIBRARY_SDK_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['OPEN_LIBRARY_SDK_TEST_IMPORT_ENTID']
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
  
