

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


describe('MergeEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when OPEN_LIBRARY_SDK_TEST_LIVE=TRUE.
  afterEach(liveDelay('OPEN_LIBRARY_SDK_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = OpenLibrarySdkSDK.test()
    const ent = testsdk.Merge()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = OpenLibrarySdkSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Merge().create({"duplicates":"x","master":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.OPEN_LIBRARY_SDK_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'merge.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"comment":{"a":true,"h":"Comment","n":"comment","r":false,"t":"`$ANY`","key$":"comment","index$":0},"duplicates":{"a":true,"h":"Duplicates","n":"duplicates","r":true,"t":"`$ARRAY`","key$":"duplicates","index$":1},"master":{"a":true,"h":"Master","n":"master","r":true,"t":"`$STRING`","key$":"master","index$":2},"mrid":{"a":true,"h":"Mrid","n":"mrid","r":false,"t":"`$ANY`","key$":"mrid","index$":3},"olids":{"a":true,"h":"Olids","n":"olids","r":false,"t":"`$STRING`","key$":"olids","index$":4}},"name":"merge","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["comment","duplicates","master","mrid","olids"],"co":{"id":"POST /authors/merge.json","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/authors/merge.json","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"authors"},{"lit":"merge.json"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"merge","name__orig":"merge","Name":"Merge","name_":"merge","name-":"merge","NAME":"MERGE","index$":22}, {"active":true,"entity":"merge","key$":"BasicMergeFlow","kind":"basic","name":"BasicMergeFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"merge_ref01"},"m":{},"o":"create","s":[],"v":[]}]}, 'Merge', {"POST /authors/merge.json":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"properties":{"master":{"type":"string","title":"Master","key$":"master"},"duplicates":{"items":{"type":"string"},"type":"array","title":"Duplicates","key$":"duplicates"},"mrid":{"anyOf":[{"type":"string"},{"type":"null"}],"title":"Mrid","key$":"mrid"},"comment":{"anyOf":[{"type":"string"},{"type":"null"}],"title":"Comment","key$":"comment"},"olids":{"type":"string","title":"Olids","default":"","key$":"olids"}},"type":"object","required":["master","duplicates"],"title":"MergeAuthorsBody","x-ref":"#/components/schemas/MergeAuthorsBody","index$":1}}},"required":true},"parameters":[]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const merge_ref01_ent = client.Merge()
    let merge_ref01_data = setup.data.new.merge['merge_ref01']

    merge_ref01_data = (await merge_ref01_ent.create(merge_ref01_data)).data()
    assert(null != merge_ref01_data)


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
      '../../../../.sdk/test/entity/merge/MergeTestData.json')

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
    ['merge01','merge02','merge03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'OPEN_LIBRARY_SDK_TEST_MERGE_ENTID': idmap,
    'OPEN_LIBRARY_SDK_TEST_LIVE': 'FALSE',
    'OPEN_LIBRARY_SDK_TEST_EXPLAIN': 'FALSE',
    'OPEN_LIBRARY_SDK_APIKEY': '',
    'OPEN_LIBRARY_SDK_SERVER_BASE': "",
  })

  idmap = env['OPEN_LIBRARY_SDK_TEST_MERGE_ENTID']

  const live = 'TRUE' === env.OPEN_LIBRARY_SDK_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['OPEN_LIBRARY_SDK_TEST_MERGE_ENTID']
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
  
