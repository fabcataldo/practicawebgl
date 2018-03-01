const Foo = require('./foo')

function Bar (text, other) {
  Foo.call(this, text)
  this.other = other
}

Bar.prototype = Object.create(Foo.prototype)
Bar.prototype.constructor = Bar
Bar.prototype.barMethod = function () {
  return 'invoked barMethod()'
}

Bar.prototype.fooMethod = function () {
  // or with parameters
  // Foo.prototype.fooMethod.call(this, arg0, arg1)
  // Foo.prototype.fooMethod.apply(this, [arg0, arg1])
  return Foo.prototype.fooMethod.call(this) + ' from Bar'
}

// See
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/
// Global_Objects/Object/defineProperty
Object.defineProperty(Bar.prototype, 'myBarProp', {
  get: function () {
    return 'myBarProp: ' + this._myBarProp
  },
  set: function (value) {
    this._myBarProp = value
  }
})

module.exports = Bar
