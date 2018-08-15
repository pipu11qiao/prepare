#### JSDoc 中的命令行参数

使用JSDoc最基本的

>  /path/to/jsdoc/ yourSourceCodeFile.js anotherCourceCodefile.js ..

其中 ...  是生成文档文件的路径

此外，可以提供一个[markdonw file]或者名为README文件的路径，它将被添加到文档的头部。

选项|描述
-|-
-a <value>,--access <value> | 只显示特定access方法属性的标识符，private,protected,public,or undefined 或者 all(表示所有的访问级别)。
-c <value>,--configure <value> | JSDoc配置文件的路径。默认为安装JSDoc目录下的conf.json
-d <value>, --destination | 输出生成文档的文件夹路径。 JSDoc内置的Haruki模版，使用console将数据转储到控制台。默认为 ./out
--debug | 打印日志信息，可以帮助调试JSDoc本身的问题
-e <value>,--encoding <value> | 编码
-h --help |
