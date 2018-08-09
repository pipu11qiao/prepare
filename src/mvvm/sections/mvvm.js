// MVVM 作为数据数据绑定的入口，整合Observer，Compile和Watcher三者，通过Observer来监听自己的model数据变化，通过Compile来解析编译模版指令，最终利用Watcher大气Observser和Compile之间的通信桥梁，达到数据变化 -> 视图更新；视图交互变化 -> 数据model变更的双向绑定效果。

function MVVM(options){
  this.$options = options;
  var data = this._data = this.$options.data;
  observer(data,this);
  this.$compile = new Compile(options.el || document.body,this);
}

// 给MVVM实例添加一个属性代理的方法，是访问vm的属性代理为访问vm._data的属性，改造后的代码如下：

function MVVM(options) {
  this.$options = options;
  var data = this._data = this.$options.data,me = this;
  // 属性代理，实现vm.xx -> vm._data.xxx
  Object.keys(data).forEach(function (key) {
    me._poxy(key);
  });
  observer(data,this);
  this.$compile = new Compile(options.el || document.body,this);
}
MVVM.prototype = {
  watch: function(key, cb, options) {
    new Watcher(this, key, cb);
  },
  $watch: function (key,cb,options) {
    new Watcher(this,key,cb);
  },
  _proxy: function (key) {
    var me = this;
    Object.defineProperty(me,key,{
      configurable: false,
      enumerable: true,
      get: function proxyGetter() {
        return me._data[key];
      },
      set: function proxySetter(newVal) {
        me._data[key] = newVal;
      }
    })
  }
};