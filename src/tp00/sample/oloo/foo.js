var Foo = {
  init: function (text) {
    this.text = text
  },
  method: function () {
    return 'invoked method()'
  },
  fooMethod: function () {
    return 'invoked fooMethod()'
  },
  get myFooProp () {
    return 'myFooProp: ' + this._myFooProp
  },
  set myFooProp (value) {
    this._myFooProp = value
  }
}

module.exports = Foo
