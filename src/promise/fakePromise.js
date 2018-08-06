;(function () {
  let FakePromise = function(fun){
    this.state = 'pending';
    this.doneCb = null;
    this.faileCb = null;
    this.bindCb(fun)
  };
  FakePromise.prototype = {
    constructor: FakePromise,
    getState: function(){
      return this.state;
    },
    setState: function(state){
      this.setState = state;
    },
    bindCb: function (fun) {
      var me = this;
      fun(function (result) {
        me._resolve(result)
      },function (reson) {
        me._reject(reson)
      })
    },
    _resolve: function(result){
      this.setState('done');
      this.doneCb(result)
    },
    _reject: function(reson){
      this.setState('faile');
      this.faileCb(reson)
    },
    then: function(){
      if(arguments.length === 2){
        this.doneCb = arguments[0];
        this.faileCb = arguments[1];
      }else if(arguments.length === 1){
        this.doneCb = arguments[0];
      }
      return this;
    },
    catch: function(fun){
      this.faileCb = fun;
      return this;
    }
  }
  window.FakePromise = FakePromise;
})();