/* global describe, it, expect */

const RGB = require('./rgb')
const RGBA = require('./rgba')
const glMatrix = require('gl-matrix')

describe('RGB Color - OLOO', function () {
  it('should be prototype of RGBA', function () {
    var color = Object.create(RGB)
    expect(RGBA.isPrototypeOf(color)).toBeTruthy()
  })

  it('should have own properties r,g,b,a', function () {
    var color = Object.create(RGB)
    color.init()
    expect(color.hasOwnProperty('r')).toBeTruthy()
    expect(color.hasOwnProperty('g')).toBeTruthy()
    expect(color.hasOwnProperty('b')).toBeTruthy()
    expect(color.hasOwnProperty('a')).toBeTruthy()
  })

  it('should have defined #vec3()', function () {
    var color = Object.create(RGB)
    color.init()
    expect(color.vec3).toBeDefined()
  })

  it('should have defined #vec4()', function () {
    var color = Object.create(RGB)
    color.init()
    expect(color.vec4).toBeDefined()
  })

  describe('#vec4()', function () {
    it('should return [1,1,1,1] as default', function () {
      var color = Object.create(RGB)
      var expected = glMatrix.vec4.create()

      color.init()

      expected[0] = 1
      expected[1] = 1
      expected[2] = 1
      expected[3] = 1
      expect(color.vec4()).toEqual(expected)
    })
    it('should return [1,0.5,0.25,1] for (1, 0.5, 0.25)', function () {
      var color = Object.create(RGB)
      var expected = glMatrix.vec4.create()

      color.init(1, 0.5, 0.25)

      expected[0] = 1
      expected[1] = 0.5
      expected[2] = 0.25
      expected[3] = 1
      expect(color.vec4()).toEqual(expected)
    })
  })
})
