## Introduction 介绍

Here is [KanColleREST](https://github.com/boholder/KanColleREST) project's API document.

All APIs only accept `GET` requests now. Maybe we can implement a `POST` api with auth func for people who are willing
to submit data.

这里是 [KanColleREST](https://github.com/boholder/KanColleREST) 项目的Web API 使用介绍。

目前所有API只接受 `GET` 方法，也许以后会实现 `POST` 方法来方便提交数据，但这个要以后再说。

## How to use each API 各个API的使用方式

`v1` in URL stands for version 1.0, who know if one day when we need v2 to fix unreasonable design?

URL中的`v1`表示1.0版本，留个修改的口总是好的。

## API usage introduction pages 各API介绍分页面

### Ship 舰娘

* [v1/ship/info](https://github.com/boholder/KanColleREST/wiki/api.ship.info)
    * Ships information
    * 舰娘属性，以及其他附加内容

* [v1/ship/cg](https://github.com/boholder/KanColleREST/wiki/api.ship.cg)
    * Ships CG (regular CG/ seasonal limited CG/ other images about ships)
    * 舰娘的常规立绘，限定立绘及其他图片