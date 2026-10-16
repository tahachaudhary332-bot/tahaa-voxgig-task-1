

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


describe('ReadingGoalEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when OPEN_LIBRARY_SDK_TEST_LIVE=TRUE.
  afterEach(liveDelay('OPEN_LIBRARY_SDK_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = OpenLibrarySdkSDK.test()
    const ent = testsdk.ReadingGoal()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('reading_goal hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of OpenLibrarySdkSDK.test(offline).ReadingGoal().stream('list')) { }
    }, /offline/)

    for await (const _item of OpenLibrarySdkSDK.test(offline).ReadingGoal()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = OpenLibrarySdkSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.ReadingGoal().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of OpenLibrarySdkSDK.test().ReadingGoal().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new OpenLibrarySdkSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.ReadingGoal().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.ReadingGoal().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = OpenLibrarySdkSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.ReadingGoal().create({"goal":"x","year":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.OPEN_LIBRARY_SDK_TEST_LIVE
    for (const op of ['create', 'list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'reading_goal.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"goal":{"a":true,"h":"Goal","n":"goal","r":true,"sh":"The target number of books to read","t":"`$INTEGER`","key$":"goal","index$":0},"status":{"a":true,"h":"Status","n":"status","r":false,"sh":"Response status","t":"`$STRING`","key$":"status","index$":1},"year":{"a":true,"h":"Year","n":"year","r":true,"sh":"The year for this reading goal (1-9999)","t":"`$INTEGER`","key$":"year","index$":2}},"name":"reading_goal","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /reading-goal.json","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/reading-goal.json","q":{},"r":{},"rb":{"fields":[{"name":"goal"},{"name":"is_update"},{"name":"year"}],"kind":"form","media":"application/x-www-form-urlencoded"},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"reading-goal.json"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /reading-goal.json","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"year","or":"year","r":false,"t":"`$ANY`","index$":0}]},"k":"http","m":"GET","o":"/reading-goal.json","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"reading-goal.json"}],"t":{"req":"`reqdata`","res":"`body.goal`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"reading_goal","name__orig":"reading_goal","Name":"ReadingGoal","name_":"reading_goal","name-":"reading-goal","NAME":"READING_GOAL","index$":23}, {"active":true,"entity":"reading_goal","key$":"BasicReadingGoalFlow","kind":"basic","name":"BasicReadingGoalFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"reading_goal_ref01"},"m":{},"o":"create","s":[],"v":[]},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"reading_goal_ref01"}}]}]}, 'ReadingGoal', {"POST /reading-goal.json":{"protocol":"http","requestBody":{"required":true,"content":{"application/x-www-form-urlencoded":{"schema":{"properties":{"goal":{"type":"integer","maximum":10000,"minimum":0,"title":"Goal","description":"Target number of books to read (0-10000). Use 0 with is_update to delete.","default":0},"year":{"anyOf":[{"type":"integer","maximum":9999,"exclusiveMinimum":0},{"type":"null"}],"title":"Year","description":"Year for this reading goal. Defaults to current year for creates, required for updates."},"is_update":{"anyOf":[{"type":"string"},{"type":"null"}],"title":"Is Update","description":"Set to any value to indicate this is an update operation (not create)."}},"type":"object","title":"ReadingGoalForm","description":"Form data for creating or updating a reading goal.\n\nUses Pydantic model_validator to handle complex conditional validation\nthat depends on multiple fields (is_update flag affects goal validation).","x-ref":"#/components/schemas/ReadingGoalForm"}}}},"parameters":[]},"GET /reading-goal.json":{"protocol":"http","parameters":[{"name":"year","in":"query","required":false,"schema":{"anyOf":[{"type":"integer","maximum":9999,"exclusiveMinimum":0},{"type":"null"}],"description":"The year to filter goals by","title":"Year"},"description":"The year to filter goals by","index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const reading_goal_ref01_ent = client.ReadingGoal()
    let reading_goal_ref01_data = setup.data.new.reading_goal['reading_goal_ref01']

    reading_goal_ref01_data = (await reading_goal_ref01_ent.create(reading_goal_ref01_data)).data()
    assert(null != reading_goal_ref01_data)


    // LIST
    const reading_goal_ref01_match: any = {}

    const reading_goal_ref01_list = (await reading_goal_ref01_ent.list(reading_goal_ref01_match)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/reading_goal/ReadingGoalTestData.json')

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
    ['reading_goal01','reading_goal02','reading_goal03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'OPEN_LIBRARY_SDK_TEST_READING_GOAL_ENTID': idmap,
    'OPEN_LIBRARY_SDK_TEST_LIVE': 'FALSE',
    'OPEN_LIBRARY_SDK_TEST_EXPLAIN': 'FALSE',
    'OPEN_LIBRARY_SDK_APIKEY': '',
    'OPEN_LIBRARY_SDK_SERVER_BASE': "",
  })

  idmap = env['OPEN_LIBRARY_SDK_TEST_READING_GOAL_ENTID']

  const live = 'TRUE' === env.OPEN_LIBRARY_SDK_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['OPEN_LIBRARY_SDK_TEST_READING_GOAL_ENTID']
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
  
