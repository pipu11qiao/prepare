var defineReactive = function (data,key,val) {
  observer(val);
  Object.defineProperty(data,key,{
    enumerable: true,
    configurable: false
  });
};
var observer = function (data) {
  if(!data || typeof data !== 'obj'){
    return;
  }
  // 去除所有属性遍历
  Object.keys(data).forEach(function (key) {
    defineReactive(data,key,data[key]);
  });
};
var data = {name: 'kkk'};
objerver(data);