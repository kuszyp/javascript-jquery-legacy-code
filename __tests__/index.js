// __tests__/index.js

const assert = require('assert')
const Lexer = require('../src/Lexer')
const lexerTests = require('./Lexer.test')


lexerTests.forEach(test => {
  const lex = new Lexer(test.input)

  test.expect.forEach(expectedToken => {
    assert.deepEqual(lex.nextToken(), expectedToken)
  })
});

console.info('All tests are passed!!!')
