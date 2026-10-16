

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


describe('ReadingLogEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when OPEN_LIBRARY_SDK_TEST_LIVE=TRUE.
  afterEach(liveDelay('OPEN_LIBRARY_SDK_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = OpenLibrarySdkSDK.test()
    const ent = testsdk.ReadingLog()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = OpenLibrarySdkSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.ReadingLog().list({"key":1,"username":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.OPEN_LIBRARY_SDK_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'reading_log.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"logged_date":{"a":true,"h":"Logged Date","n":"logged_date","r":true,"t":"`$ANY`","key$":"logged_date","index$":0},"logged_edition":{"a":true,"h":"Logged Edition","n":"logged_edition","r":true,"t":"`$ANY`","key$":"logged_edition","index$":1},"work":{"a":true,"h":"Work","n":"work","r":true,"sh":"Work data in reading log.","t":"`$OBJECT`","key$":"work","index$":2}},"name":"reading_log","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /people/{username}/books/{key}.json","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"key","or":"key","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"username","or":"username","r":true,"t":"`$STRING`","index$":1}],"query":[{"a":true,"ex":100,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"ex":"everything","k":"query","n":"mode","or":"mode","r":false,"t":"`$STRING`","index$":1},{"a":true,"k":"query","n":"offset","or":"offset","r":false,"t":"`$INTEGER`","index$":2},{"a":true,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":3},{"a":true,"ex":"","k":"query","n":"q","or":"q","r":false,"t":"`$STRING`","index$":4}]},"k":"http","m":"GET","o":"/people/{username}/books/{key}.json","q":{"exist":["key","username"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"people"},{"var":"username"},{"lit":"books"},{"lit":"{key}.json"}],"t":{"req":"`reqdata`","res":"`body.reading_log_entries`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"reading_log","name__orig":"reading_log","Name":"ReadingLog","name_":"reading_log","name-":"reading-log","NAME":"READING_LOG","index$":24}, {"active":true,"entity":"reading_log","key$":"BasicReadingLogFlow","kind":"basic","name":"BasicReadingLogFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"key":"key01","username":"username01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"reading_log_ref01"}}]}]}, 'ReadingLog', {"GET /people/{username}/books/{key}.json":{"protocol":"http","parameters":[{"name":"username","in":"path","required":true,"schema":{"type":"string","title":"Username"},"index$":0},{"name":"key","in":"path","required":true,"schema":{"enum":["want-to-read","currently-reading","already-read","stopped-reading"],"type":"string","title":"Key"},"index$":1},{"name":"q","in":"query","required":false,"schema":{"type":"string","minLength":0,"maxLength":100,"default":"","title":"Q"},"index$":2},{"name":"mode","in":"query","required":false,"schema":{"type":"string","default":"everything","title":"Mode"},"index$":3},{"name":"limit","in":"query","required":false,"schema":{"type":"integer","minimum":0,"default":100,"title":"Limit"},"index$":4},{"name":"offset","in":"query","required":false,"schema":{"anyOf":[{"type":"integer","minimum":0},{"type":"null"}],"title":"Offset"},"index$":5},{"name":"page","in":"query","required":false,"schema":{"anyOf":[{"type":"integer","minimum":1},{"type":"null"}],"title":"Page"},"index$":6}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let reading_log_ref01_data = Object.values(setup.data.existing.reading_log)[0] as any

    // LIST
    const reading_log_ref01_ent = client.ReadingLog()
    const reading_log_ref01_match: any = {}
    reading_log_ref01_match['key'] = setup.idmap['key01']
    reading_log_ref01_match['username'] = setup.idmap['username01']

    const reading_log_ref01_list = (await reading_log_ref01_ent.list(reading_log_ref01_match)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/reading_log/ReadingLogTestData.json')

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
    ['reading_log01','reading_log02','reading_log03','key01','username01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'OPEN_LIBRARY_SDK_TEST_READING_LOG_ENTID': idmap,
    'OPEN_LIBRARY_SDK_TEST_LIVE': 'FALSE',
    'OPEN_LIBRARY_SDK_TEST_EXPLAIN': 'FALSE',
    'OPEN_LIBRARY_SDK_APIKEY': '',
    'OPEN_LIBRARY_SDK_SERVER_BASE': "",
  })

  idmap = env['OPEN_LIBRARY_SDK_TEST_READING_LOG_ENTID']

  const live = 'TRUE' === env.OPEN_LIBRARY_SDK_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['OPEN_LIBRARY_SDK_TEST_READING_LOG_ENTID']
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
  
