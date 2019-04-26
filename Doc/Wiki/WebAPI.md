## Introduction 介绍

Here is [KanColleREST](https://github.com/boholder/KanColleREST) project's Web API Usage Tutorial.

~~Have a try on this demo: [not yet set](www.example.com)~~

The design of this project does not involve authentication function for the time being.

Moreover, all APIs only accept `GET` requests now.

Maybe we can implement a `POST` api with auth func for people who are willing to submit data.

这里是 [KanColleREST](https://github.com/boholder/KanColleREST) 项目的Web API 使用介绍。

~~我已经搭建了一个demo，来试一下: [not yet set](www.example.com)~~

项目设计暂时不涉及认证模块（还没到实现非功能性需求）。

而且目前为止所有API只接受 `GET` 方法，也许以后会实现 `POST` 方法来方便提交数据，但这个要以后再说。

## How to use each API 各个API的使用方式

`v1` in URL stands for version 1.0, who know if there is a day when we need v2 to fix unreasonable design?

URL中的`v1`表示1.0版本，我不敢保证我的设计完美到不需要修改，留个口总是好的。

## API usage introduction pages 各API介绍分页面

### Ship 舰娘

* [v1/ship/info](https://github.com/boholder/KanColleREST/wiki/api.ship.info)	
	* Ship's figure&other text info	
	* 舰娘属性，以及其他能用文本表述的内容

* ~~[v1/ship/cg]()~~
	* Ship's ingame picture (card/regular image/seasonal image etc)
	* 舰娘的立绘卡片/常规立绘/限定立绘 etc