/* global describe, it, expect */

const Style = require('./style')
const RGBA = require('./rgba')

describe('Style Color - OLOO', function () {
  it('should be prototype of RGBA', function () {
    var color = Object.create(Style)
    expect(RGBA.isPrototypeOf(color)).toBeTruthy()
  })

  it('should have own properties r,g,b,a', function () {
    var color = Object.create(Style)
    color.init('#ffffff')
    expect(color.hasOwnProperty('r')).toBeTruthy()
    expect(color.hasOwnProperty('g')).toBeTruthy()
    expect(color.hasOwnProperty('b')).toBeTruthy()
    expect(color.hasOwnProperty('a')).toBeTruthy()
  })

  it('should have defined #vec3()', function () {
    var color = Object.create(Style)
    color.init('#ffffff')
    expect(color.vec3).toBeDefined()
  })

  it('should have defined #vec4()', function () {
    var color = Object.create(Style)
    color.init('#ffffff')
    expect(color.vec4).toBeDefined()
  })

  describe('#vec4()', function () {
    it('should return [1,1,1,1] for #ffffff', function () {
      var color = Object.create(Style)
      var expected = []

      color.init('#ffffff')

      expected[0] = 1
      expected[1] = 1
      expected[2] = 1
      expected[3] = 1
      expect(color.vec4()).toEqual(expected)
    })
    it('should return [0,0,0,1] for #000000', function () {
      var color = Object.create(Style)
      var expected = []

      color.init('#000000')

      expected[0] = 0
      expected[1] = 0
      expected[2] = 0
      expected[3] = 1
      expect(color.vec4()).toEqual(expected)
    })
    it('should return [1,0,0,1] for #ff0000', function () {
      var color = Object.create(Style)
      var expected = []

      color.init('#ff0000')

      expected[0] = 1
      expected[1] = 0
      expected[2] = 0
      expected[3] = 1
      expect(color.vec4()).toEqual(expected)
    })
    it('should return [0,1,0,1] for #00ff00', function () {
      var color = Object.create(Style)
      var expected = []

      color.init('#00ff00')

      expected[0] = 0
      expected[1] = 1
      expected[2] = 0
      expected[3] = 1
      expect(color.vec4()).toEqual(expected)
    })
    it('should return [0,0,1,1] for #0000ff', function () {
      var color = Object.create(Style)
      var expected = []

      color.init('#0000ff')

      expected[0] = 0
      expected[1] = 0
      expected[2] = 1
      expected[3] = 1
      expect(color.vec4()).toEqual(expected)
    })

    it('should return [0,0,0,1] for #000', function () {
      var color = Object.create(Style)
      var expected = []

      color.init('#000')

      expected[0] = 0
      expected[1] = 0
      expected[2] = 0
      expected[3] = 1
      expect(color.vec4()).toEqual(expected)
    })

    it('should return [0,0,1,1] for #00f', function () {
      var color = Object.create(Style)
      var expected = []

      color.init('#00f')

      expected[0] = 0
      expected[1] = 0
      expected[2] = 1
      expected[3] = 1
      expect(color.vec4()).toEqual(expected)
    })

    it('should return [0,1,1,1] for #0ff', function () {
      var color = Object.create(Style)
      var expected = []

      color.init('#0ff')

      expected[0] = 0
      expected[1] = 1
      expected[2] = 1
      expected[3] = 1
      expect(color.vec4()).toEqual(expected)
    })

    it('should return [1,1,1,1] for #fff', function () {
      var color = Object.create(Style)
      var expected = []

      color.init('#fff')

      expected[0] = 1
      expected[1] = 1
      expected[2] = 1
      expected[3] = 1
      expect(color.vec4()).toEqual(expected)
    })
  })
})
