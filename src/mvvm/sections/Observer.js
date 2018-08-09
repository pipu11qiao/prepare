var defineReactive = function (data,key,val) {
  var dep = new Dep();
  observer(val);
  Object.defineProperty(data,key,{
    enumerable: true,// 可枚举
    configurable: false, // 不能再define
    get: function () {
      Dep.target && dep.addDep(Dep.target);
      return val
    },
    set: function (newVal) {
      console.log('监听到变化了 ',val, ' --> ',newVal);
      val = newVal;
      dep.notify();
    }
  });
};
var observer = function (data) {
  if(!data || typeof data !== 'object'){
    return;
  }
  // 去除所有属性遍历
  Object.keys(data).forEach(function (key) {
    defineReactive(data,key,data[key]);
  });
};
function Dep() {
  this.subs = []
};
Dep.prototype = {
  addSub: function (sub) {
    this.subs.push(sub);
  },
  notify: function () {
    this.subs.forEach(function (sub) {
      sub.update();
    });
  }
};
var data = {name: 'kkk'};
observer(data);
data.name = 'aaa';
