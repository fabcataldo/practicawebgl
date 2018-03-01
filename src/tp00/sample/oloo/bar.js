var Foo = require('./foo')

var Bar = Object.create(Foo)

Bar.init = function (text, other) {
  Foo.init.call(this, text)
  this.other = other
}

Bar.barMethod = function () {
  return 'invoked barMethod()'
}

Bar.fooMethod = function () {
  // or with parameters
  // Foo.fooMethod.call(this, arg0, arg1)
  // Foo.fooMethod.apply(this, [arg0, arg1])
  return Foo.fooMethod.call(this) + ' from Bar'
}

// See
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/
// Global_Objects/Object/defineProperty
Object.defineProperty(Bar, 'myBarProp', {
  get: function () {
    return 'myBarProp: ' + this._myBarProp
  },
  set: function (value) {
    this._myBarProp = value
  }
})

module.exports = Bar
