
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { OpenLibrarySdkSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = OpenLibrarySdkSDK.test()
    equal(testsdk instanceof OpenLibrarySdkSDK, true,
      'OpenLibrarySdkSDK.test() must return a client synchronously')
  })

})
