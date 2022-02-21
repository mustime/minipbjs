## minipbjs ![npm](https://img.shields.io/npm/v/minipbjs?color=0c0&style=flat-square)

中文 | [English](https://github.com/mustime/minipbjs/blob/main/README.md)

**minipbjs**是一个基于[protobuf.js](https://github.com/protobufjs/protobuf.js)下命令行工具`pbjs`的扩展，目的在于大大减少其生成的Javascript胶水代码大小，兼容`Node.js`、浏览器和各类微信小程序（游戏）等。对于小程序（游戏）等对代码包大小有严格要求的场景尤其适用。

## 安装使用

### 安装

```bash
# -g指定全局安装
$> npm install minipbjs -g
```

### 生成js代码

```bash
# minipbjs的使用方法和参数与pbjs基本一致
$> minipbjs --keep-case # 保留字段名，不强行作驼峰式转换
            --root PB   # 指定根节点名称
            # --path指定include目录，然后指定目标proto文件
            --path /path/to/protofiles a.proto b.proto c.proto ...
            # 注意：pbjs的--out指定的是文件名，而minipbjs里需要指定**目录**
            --out /path/to/protobuf-bundles/
            # minipbjs额外新增了以下参数：
            #   --name 指定生成的文件名，默认缺省'protobuf-bundles'
            --name protobuf-bundles-mini

# 自动生成--name指定的Javascript，以及对应uglifyjs处理后的min.js
$> ls -al /path/to/protobuf-bundles/
 > -rw-r--r--   1 mustime staff  xxxx  protobuf-bundles-mini.js
 > -rw-r--r--   1 mustime staff  xxxx  protobuf-bundles-mini.min.js
 
```

### 程序中使用

```javascript
// 先加载protobuf-library
require('protobuf-library.js');
require('protobuf-bundles-mini.js');

// 简单测试（PB这个变量是通过`--root PB`指定的
var payload = { 'a': 1, 'b': 'test' };
var foo = PB.foo.Foo.create(payload);
var bytes = PB.foo.Foo.encode(foo).finish();
var foo2 = PB.foo.Foo.decode(bytes);
var foo3 = PB.foo.Foo.fromObject(PB.foo.Foo.toObject(foo2));

// 输出一致
console.log(foo.a, foo2.a, foo3.a);
console.log(foo.b, foo2.b, foo3.b);

// 可以查看 'minipbjs/tests' 目录下进一步的测试
```


## 压缩率比较

### 原理

通过`pbjs --target static`方式生成的胶水代码对每一个message都生成了`constructor`、`create`、`encode`、`decode`、`fromObject`、`toObject`等独立的函数入口，这些函数中的逻辑是和特定message结构紧密关联的，无法共用。因此当proto文件数量较为庞大，message定义较多的时候，生成的胶水代码大小往往非常巨大，哪怕开发者通过`--no-xxx`的选项指定仅保留了基础的`encode`/`decode`函数代码，其生成的min.js代码在中大型项目中往往能达到几兆大小。

`minipbjs`通过扩展`--target`实现，通过对message的基本信息（id、名称、默认值、额外options等）进行提取标记成一个map参数，把主要的函数实现（目前支持`create`/`encode`/`decode`/`encodeDelimited`/`decodeDelimited`/`fromObject`/`toObject`/`toJSON`/`verify`）进行了统一实现，用于处理所有message对象。因此理论上message定义的数量越多，压缩效果越发明显。与pbjs相比，生成的代码大小几乎可以忽略，不需要再关心代码量问题了。

### 代码压缩效果

以实际项目为例，包含2500+ message定义的微信小游戏项目，在我的2019 rmbp 15上使用`pbjs --target static`生成的min.js代码约为5.2m，耗时约40秒；但是同样命令改用`minipbjs`（注意不要带`--target static`参数，否则生成js代码与`pbjs`一致）生成的min.js代码仅为160+kB，耗时约1.6秒。

## 使用许可

本项目基于`The MIT Liscense`发布。

如果你遇到任何问题，可以将建议或可复现的错误[提交issue](https://github.com/mustime/minipbjs/issues)，我会尽快处理 ：）。

