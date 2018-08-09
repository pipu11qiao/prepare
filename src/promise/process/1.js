;(function (scope) {
  var PENGDING = 'pending';
  var RESOLVED = 'resolved';
  var REJECTED = 'rejected';
  var UNDEFINED = void 0;
  function getThen(obj) {
    var then = obj && obj.then;
    if(typeof obj === 'object' && typeof then === 'function') {
      return function applyThen() {
        then.apply(obj,arguments);
      }
    }
  }
  function executeCallback(type,x) {
    var isResolved = type === 'resolve',
      thenable;
    if (isResolved && (typeof x === 'object' || typeof x === 'function')) {
      try {
        thenable = getThen(x);
      } catch (e) {
        return executeCallback.bind(this)('reject', e);
      }
    }
    if (isResolved && thenable) {
      executeResolver.bind(this)(thenable);
    } else {
      this.state = isResolved ? RESOLVED : REJECTED;
      this.data = x;
      this.callbackQueue.forEach(function (v) {
        v[type](x);
      });
    }
    return this;
  }
  function executeResolver(resolver) {
    var called = false,_this = this;
    function onError(y) {
      if(called){
        return;
      }
      called = true;
      executeCallback.bind(_this)('reject',y);
    }
    function onSuccess(y) {
      if(called){
        return;
      }
      called = true;
      executeCallback.bind(_this)('resolve',y);
    }
    try{
      resolver(onSuccess,onError);
    } catch (e){
      onError(e)
    }
  }
  function executeCallbackAsync(callback,value) {
    var _this = this; // promise
    setTimeout(function () {
      var res;
      try{
        res = callback(value);
      } catch (e){
        return executeCallback.bind(_this)('reject',e)
      }
      if(res !== _this){
        return executeCallback.bind(_this)('resolve',res)
      }else {
        return executeCallback.bind(_this)('reject', new TypeError('Cannot resolve promise with itself'));
      }
    },4)
  }
  function CallbackItem(promise,onResolved,onRejected) {
    this.promise = promise;
    this.onResolved = typeof onResolved === 'function' ? onResolved : function (v) {return v};
    this.onRejected = typeof onRejected === 'function' ? onRejected : function (v) {return v};
  }
  CallbackItem.prototype.resolve = function (value) {
    executeCallbackAsync.bind(this.promise)(this.onResolved,value);
  };
  CallbackItem.prototype.reject = function (value) {
    executeCallbackAsync.bind(this.promise)(this.onRejected,value);
  };
  function Promise(resolver) {
    if(resolver && typeof resolver !== "function"){throw new Error('Promise resover is not a function')};
    this.state = PENGDING;
    this.data = null
    this.callbackQueue = [];
    if(resolver) executeResolver.call(this,resolver);
  }
  Promise.prototype.then = function (onResolved,onRejected) {
    if(typeof onResolved !== "function" && this.state === RESOLVED ||
        typeof onRejected !== "function" && this.state === REJECTED
    ){
      return this;
    }
    var promise = new this.constructor();
    if(this.state !== PENGDING) {
      var callback = this.state === RESOLVED ? onResolved : onRejected;
      executeCallbackAsync.bind(promise)(callback,this.data);
    }else {
      this.callbackQueue.push(new CallbackItem(promise,onResolved,onRejected))
    }
  }
})(this);