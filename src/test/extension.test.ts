//
// Note: This example test is leveraging the Mocha test framework.
// Please refer to their documentation on https://mochajs.org/ for help.
//
import * as assert from 'assert';

import { parseJsonString, stringifyJsonString } from '../lib';

// The module 'assert' provides assertion methods from node
// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
// import * as vscode from 'vscode';
// import * as myExtension from '../extension';

// Defines a Mocha test suite to group tests of similar kind together
suite('JSON Operations', () => {
  // Defines a Mocha unit test
  test('Parse', () => {
    assert.equal(parseJsonString('"this is a test"'), 'this is a test');
    assert.deepEqual(parseJsonString('"{\\"this\\": \\"is a test\\"}"'), {
      this: 'is a test'
    });
    assert.deepEqual(
      parseJsonString(
        `'{"name":"Emmett Brown","age":55,"occupation":"Scientist","address":{"number":1640,"street":"Riverside Drive","city":"Hill Valley"}}'`
      ),
      {
        name: 'Emmett Brown',
        age: 55,
        occupation: 'Scientist',
        address: {
          number: 1640,
          street: 'Riverside Drive',
          city: 'Hill Valley'
        }
      }
    );
  });

  test('stringify', () => {
    assert.equal(
      stringifyJsonString('this is a test'),
      '"\\"this is a test\\""'
    );
    assert.equal(
      stringifyJsonString(`{ this: 'is a test' }`),
      '"{\\"this\\":\\"is a test\\"}"'
    );
  });
});
