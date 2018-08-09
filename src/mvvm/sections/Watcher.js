// Watcher 订阅者作为Observer 和 Compile 之间的通信的桥梁，主要做的事情是： 1，在自身实例化是网属性订阅器里面添加自己
// 2. 自身必须有一个update方法 3。 带属性变动dep.notify 通知是，能调用吱声的update方法，并处罚Compile中绑定回到，则
/**
 *
 * @param vm vm实例
 * @param exp 某个属性
 * @param cb 更新方法
 * @constructor Watcher
 */
function Watcher(vm,exp,cb) {
  this.cb = cb;
  this.vm = vm;
  this.exp = exp;
  // 此处为了出发属性getter，从而在dep添加自己，结婚Observer更易理解
  this.value = this.get();
};
Watcher.prototype = {
  update: function () {
    this.run(); // 属性值变化时收到通知
  },
  run: function () {
    var value = this.get(); // 取到最新值
    var oldValue = this.value;
    if(value !== oldValue){
      this.value = value;
      this.cb.call(this.vm,value,oldValue); // 执行Compile中绑定的回调，更新视图
    }
  },
  get:function () {
    Dep.target = this; // 将当前订阅者指向自己
    var value = this.vm[exp];  // 出发getter，添加自己到属性订阅器中
    Dep.target = null; // 添加完毕，重置
    return value;
  },
};


