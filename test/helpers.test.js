/*
Copyright 2019 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

const { wrapGeneralError, createRequestOptions } = require('../src/helpers')

test('createRequestOptions', () => {
  const tenant = 'my-tenant'
  const apiKey = 'my-api-key'
  const token = 'my-token'

  const options = createRequestOptions({
    tenant,
    apiKey,
    token
  })

  expect(options).toEqual({
    requestBody: {},
    securities: {
      authorized: {
        BearerAuth: { value: token },
        ApiKeyAuth: { value: apiKey }
      }
    },
    serverVariables: {
      ORGANIZATION: tenant
    }
  })
})

test('wrapGeneralError', () => {
  const err = new Error('bar')
  const functionName = 'foo'

  const wrappedErr = wrapGeneralError(functionName, err)

  expect(wrappedErr.message).toEqual(`Error while calling Adobe Campaign Standard ${functionName} - ${err}`)
})
