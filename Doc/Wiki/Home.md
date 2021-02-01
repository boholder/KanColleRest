## Welcome to the KanColleREST wiki!

These documents will be stored in the project's Document directory for offline reading. I'm not a native English
speaker, so please forgive and point out the grammar and spelling errors in this project, I'll be grateful for it.

## 欢迎来到 KanColleREST 项目的Wiki!

这些文档同时会存在项目的文档目录中，以供离线阅读。

## API

All APIs only accept `GET` requests now. Maybe we can implement a `POST` api with auth func for people who are willing
to submit data.

目前所有API只接受 `GET` 方法，也许以后会实现 `POST` 方法来方便提交数据，但这个要以后再说。

### How to use each API 各个API的使用方式

`v1` in URL stands for version 1.0.

URL中的`v1`表示1.0版本，留个修改的口总是好的。

#### Ship 舰娘

* [v1/ship/info](https://github.com/boholder/KanColleREST/wiki/api-ship-info)
    * Ships information
    * 舰娘属性，以及其他附加内容

* [v1/ship/cg](https://github.com/boholder/KanColleREST/wiki/api-ship-cg)
    * Ships CG (regular CG/ seasonal limited CG/ other images about ships)
    * 舰娘的常规立绘，限定立绘及其他图片

## Related projects and websites 相关项目及网站

* [Who calls the fleet DB -@Diablohu](https://github.com/TeamFleet/WhoCallsTheFleet-DB)
* [WhoCallsTheFleet-Pics -@Diablohu](https://github.com/TeamFleet/WhoCallsTheFleet-Pics)
* [Moegirl Wiki KanColle Column 萌娘百科舰C版块](https://zh.moegirl.org/%E8%88%B0%E9%98%9FCollection#)

## Acknowledgement 致谢

* [@Diablohu](https://github.com/Diablohu) - Who provides an excellent database & image resource and shows me how to use
  them.
* [@Bluefissure](https://github.com/Bluefissure) - Whose project [FFXIVBOT](https://github.com/Bluefissure/FFXIVBOT)
  inspired me.
* @Mian - Who provides screenshots of Moegirl Wiki KanColle Column, so I can provide an image format ship information
  response for convenient.
* @Wei - My friend who noticed me that I can't just leave a mess on Github then pretend it doesn't exist, that goes
  against professionalism.