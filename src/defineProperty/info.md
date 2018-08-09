> defineProperty
> defineProperties
> getOwnPropertyDescriptor
> getOwnPropertyDescriptors

##### 数据(数据描述符)属性

* Configurable

> 表示能否通过delete删除此属性，能否修改属性的特性，活能否修改吧属性修改为访问器属性

* Enumerable

> 是否可枚举 默认为true

* Writable

> 是否修改 默认为true

* Value

> 值 默认为undefined

##### 访问器(存取描述符)属性

访问器属性也有4个描述内部属性的特性

* Configurable

> 表示能否通过delete删除此属性，能否修改属性的特性，活能否修改吧属性修改为访问器属性

* Enumerable

> 是否可枚举 默认为true

* get

> 一个给属性提供getter的方法(访问对象属性时调用的函数,返回值就是当前属性的值),如果没有getter则为undefined。该方法返回值

* set

> 值 默认为undefined

##### Object.defineProperty

