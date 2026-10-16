

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


describe('CreateListEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when OPEN_LIBRARY_SDK_TEST_LIVE=TRUE.
  afterEach(liveDelay('OPEN_LIBRARY_SDK_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = OpenLibrarySdkSDK.test()
    const ent = testsdk.CreateList()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = OpenLibrarySdkSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.CreateList().create({"username":1,"key":"x","revision":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.OPEN_LIBRARY_SDK_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'create_list.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"description":{"a":true,"h":"Description","n":"description","r":false,"t":"`$STRING`","key$":"description","index$":0},"key":{"a":true,"h":"Key","n":"key","r":true,"t":"`$STRING`","key$":"key","index$":1},"name":{"a":true,"h":"Name","n":"name","r":false,"t":"`$STRING`","key$":"name","index$":2},"revision":{"a":true,"h":"Revision","n":"revision","r":true,"t":"`$INTEGER`","key$":"revision","index$":3},"seeds":{"a":true,"h":"Seeds","n":"seeds","r":false,"t":"`$ARRAY`","union":{"branches":2,"count":1,"depth":1},"key$":"seeds","index$":4},"tags":{"a":true,"h":"Tags","n":"tags","r":false,"t":"`$ARRAY`","key$":"tags","index$":5}},"name":"create_list","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["description","name","seeds","tags"],"co":{"id":"POST /people/{username}/lists.json","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"username","or":"username","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/people/{username}/lists.json","q":{"exist":["username"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"people"},{"var":"username"},{"lit":"lists.json"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"create_list","name__orig":"create_list","Name":"CreateList","name_":"create_list","name-":"create-list","NAME":"CREATE_LIST","index$":7}, {"active":true,"entity":"create_list","key$":"BasicCreateListFlow","kind":"basic","name":"BasicCreateListFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"create_list_ref01"},"m":{"username":"username01"},"o":"create","s":[],"v":[]}]}, 'CreateList', {"POST /people/{username}/lists.json":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"properties":{"name":{"type":"string","title":"Name","default":"","key$":"name"},"description":{"type":"string","title":"Description","default":"","key$":"description"},"tags":{"items":{"type":"string"},"type":"array","title":"Tags","default":[],"key$":"tags"},"seeds":{"items":{"anyOf":[{"additionalProperties":true,"type":"object"},{"type":"string"}]},"type":"array","title":"Seeds","default":[],"key$":"seeds"}},"type":"object","title":"CreateListBody","description":"Request body for creating a new list.","x-ref":"#/components/schemas/CreateListBody","index$":1}}}},"parameters":[{"name":"username","in":"path","required":true,"schema":{"type":"string","title":"Username"},"index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const create_list_ref01_ent = client.CreateList()
    let create_list_ref01_data = setup.data.new.create_list['create_list_ref01']
    create_list_ref01_data['username'] = setup.idmap['username01']

    create_list_ref01_data = (await create_list_ref01_ent.create(create_list_ref01_data)).data()
    assert(null != create_list_ref01_data)


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
      '../../../../.sdk/test/entity/create_list/CreateListTestData.json')

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
    ['create_list01','create_list02','create_list03','username01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'OPEN_LIBRARY_SDK_TEST_CREATE_LIST_ENTID': idmap,
    'OPEN_LIBRARY_SDK_TEST_LIVE': 'FALSE',
    'OPEN_LIBRARY_SDK_TEST_EXPLAIN': 'FALSE',
    'OPEN_LIBRARY_SDK_APIKEY': '',
    'OPEN_LIBRARY_SDK_SERVER_BASE': "",
  })

  idmap = env['OPEN_LIBRARY_SDK_TEST_CREATE_LIST_ENTID']

  const live = 'TRUE' === env.OPEN_LIBRARY_SDK_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['OPEN_LIBRARY_SDK_TEST_CREATE_LIST_ENTID']
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
  
