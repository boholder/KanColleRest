# v1/ship/info

## 0. Introduction 介绍

Ship's information in json or image format. Don't be afraid of the length of this document, You can use API with just a
few readings about parameters descriptions.

舰娘信息，包括游戏数据和声优画师之类咨询和CG链接。不要害怕文章长度，你只需读一下关于参数的介绍便可使用。

Query URL quick example 简单示例URL :
**http://domain/v1/ship/info? `match=murasame` [& `matchfmt=en_us`] [& `resfmt=json`]**

## 1. Parameters 参数

### 1.1. Overall list 一览表

For details, please refer to the corresponding section below.

具体属性介绍请参见下文对应部分。

|parameter name|must required parameter|values|default value|brief description|
|---|---|---|---|---|
|match|Yes|user input|N/A|value for matching ship, ship's name or id* |
|matchfmt|No|`id`<br>`ja_kana`<br>`ja_jp`<br>`en_us` <br>`zh_cn`|`zh_cn`|match value's format|
|resfmt|No|`json`<br>`img`|`json`|response format|

* `id` match format is specially relative to the database record id, not the id in the in-game memory album.

---

|参数名|是否必须|取值|默认值|简单说明|
|---|---|---|---|---|
|match|是|用户输入|N/A|匹配值，可为舰娘名或id*|
|matchfmt|否|`id`<br>`ja_kana`<br>`ja_jp`<br>`en_us` <br>`zh_cn`|`zh_cn`|匹配值的格式|
|resfmt|否|`json`<br>`img`|`json`|响应的格式|

* 匹配格式的舰娘id为数据库id，非游戏内图鉴id。

### 1.1.1. match  (match value 匹配值)

|must required parameter?|是否必须？|Yes|
|---|---|---|
|-|-|-|

#### Value&meaning 取值与含义

* String or Number type.
* Represent for ship's name or in-database id.
* Be used to matching ship.
* For the match formats, see the `matchfmt` parameter.
* 字符串或数字，舰娘名或数据库内id，具体格式参照`matchfmt`参数。

### 1.1.2. matchfmt (match format) 匹配格式

|must required parameter?|是否必须？|No|
|---|---|---|
|Default value|默认值|`zh_cn`|

#### Values&meaning 取值与含义

* `id`
    * In-database record id.
    * 数据库舰娘记录id.

* `ja_jp`
    * Japanese kanji format, example match value : 長門
    * 日文汉字格式，例：長門
    * 台灣朋友應該也可以使用該格式作繁體中文的搜索

* `ja_kana`
    * Japanese kana format, example match value : ながと
    * 日语假名格式，例：ながと

* `en_us`
    * In fact, it's Japanese romaji format, example match value : Nagato
    * Not case-sensitive.
    * 日语罗马音格式，例：Nagato
    * 大小写不敏感

* `zh_cn`
    * Simplified Chinese format, example match value : 长门
    * 简体中文格式，例：长门
    * 不支持别称，别忘了丸优之类的正名，会伤心的，她们。

#### Additional explanation 额外说明

1. Some names seem to missing in the database, especially languages other than Simplified Chinese and Japanese. If you
   encounter a missing name, please help update and commit to the
   project [WhoCallsTheFleet-DB](https://github.com/TeamFleet/WhoCallsTheFleet-DB).

2. For the matching of foreign ships, the translation may be ambiguous. Please use the `ja_jp` format as the priority
   format. Some foreign ships only have names in `ja_jp` and `zh_cn` formats, and the `ja_jp` name is the name in the
   game, which may be English (U-511), Russian (Ташкент) etc.


1. 数据集里好像有一些名字是缺失的，碰到缺失情况请帮忙更新并commit到项目 [WhoCallsTheFleet-DB](https://github.com/TeamFleet/WhoCallsTheFleet-DB)。
2. 关于海外舰的匹配，译名可能引起歧义，请以`ja_jp`为优先格式。部分海外舰只有`ja_jp`和`zh_cn`格式的名字，且`ja_jp`名字为游戏内名字，可能为英语（U-511）,俄语（Ташкент）等.

### 1.1.3. resfmt    (response format)    响应格式

|must required parameter?|是否必须？|No|
|---|---|---|
|Default value|默认值|`json`|

#### Values&meaning 取值与含义

* `json`
    * Response in json format
    * 以json格式作为响应

* `img`
    * Response a low resolution png format image,
    * which contains the in-game ship data such as state, default equipments etc.
    * By the way, the image is in Chinese.
    * 以一张低分辨率的png图片作为响应，
    * 图片包含了一些最重要的信息，比如舰娘属性和初始装备等。
    * (萌娘百科舰C板的数据表格的截图)

<!--
I write a small story in Chinese below about 
why I go to require and build image format response,
which is irrelevant for API usage, so I will not translate it.

设置image这个响应格式，是我对于人机交互方面的一种观察，
说一个小故事：
给我图片数据集的眠，在我们玩家QQ群里架设了一个群聊机器人分享舰c游戏数据。
她优先使用了图片作为数据存储与展示的手段（给wiki大量截图并保存到本地）。
这使我想起大学时学的人机交互课，在现有人机交互手段中，图形一直是很“人类友好”的通信方式。
一张图片的信息量很大，本身就是一个信息集合。
抛开修改不便的缺点，图像很方便保存，索引与展示（作为一个整体）。
本项目暂时不考虑GET以外的HTTP方法，服务对象可以是类似酷Q机器人一样的终端，
这个图片格式很适合本项目。
-->

## 2. Response description 响应属性解释

### 2.0 Short explanation

The server accurately matches all models of **one** ship according to the request and respond. When the name in the
name-based request is incomplete, the server will return 400 with possible complete name
(example:
request: "雨","zh_cn name format", response: 400,"Similar names: ["时雨","五月雨","春雨"...]")

### 2.1 HTTP status code used in API response 响应资源状态码

[HTTP response status codes - MDN web docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)

|code|massage|explanation|
|---|---|---|
|200|OK|The server gets at least ship's one model in db<br> and successfully translates them into response format.|
|400|Bad Request|There is something wrong in request params,<br> maybe unsupported format, unreasonable value...<br> readable explanation will be sent with response as body.|
|404|Not Found|It seems no typical wrong in request,<br> but server matches nothing based on request.<br> Maybe request is correct but server's resource missing that record,<br> or requested record isn't exist<br> (e.g. a ship name that does not exist in game).|
|500|Internal Server Error|Unhandled error occurred when server processing request,<br> tell the server administrator to check log <br> or report it as an issue on issue page.|

### 2.2. Json format json格式

```
status code:200, Content-Type: application/json; charset=utf-8
body:
[
  {ship's model1 object},
  {ship's model2 object},
  {ship's model3 pbject}...
]
```

#### 2.2.1 One ship's model object structure 对单个舰娘形态Json的解释

##### 2.2.1.1 Introduction 介绍

This structure basically exposes all the fields
of [this collection](https://github.com/TeamFleet/WhoCallsTheFleet-DB/blob/master/db/ships.nedb), and I do some
modifications on fields name and value.

本结构基本暴露了[这个集合](https://github.com/TeamFleet/WhoCallsTheFleet-DB/blob/master/db/ships.nedb) 的所有字段，我做了一些字段名称和内容上的改动。

The name model replace rule of the missing value of en_us:  
`en_us` -> `ja_romaji` -> `ja_jp`, so some names such as equipment names, because of the lack of `en_us` AND `ja_romaji`
names, will be replaced with ja_jp names, which are Japanese characters. This is unreasonable, but it is guaranteed the
value of en_us is not empty, note that `ja_jp` name is in-game name of one entity, they should be always existed.

名称模型对en_us缺失值的替代规则：  
`en_us` -> `ja_romaji` -> `ja_jp`，因此部分名称比如装备名，因为缺少`en_us`与`ja_romaji`名称，会被替代为`ja_jp`名称即日语汉字。
这不合理，但这保证了en_us的值非空。注意`ja_jp`是游戏内名称，不管它是日语还是其他外语，它应当一直存在，是一个良好的默认值。

##### 2.2.1.2 Details 详细介绍

* `id` 数据库中舰娘ID *in-database ship id*
* `no` 游戏内图鉴ID *in-game memory album ship card id*

* `name` 名称
    * `ja_jp` 日文 (村雨改二)
    * `ja_kana` 日文假名 (むらさめ改二)
    * `en_ud` 日文罗马音 (MurasameKai Ni)
    * `zh_cn` 简体中文 (村雨改二)
    *

* `type` 舰种名 *Ship type*
    * `id`  数据库内id *in-database id*
    * `name`
        * `ja_jp` 日文 (駆逐艦)
        * `en_us` 英语 (Destroyer)
        * `zh_cn` 简体中文 (驱逐舰)

* `class` 舰级名 *Ship Class name*
    * `id`  数据库内id *in-database id*
    * `name`
        * `ja_jp` 日文 (白露)
        * `en_us` 英语 (Shiratsuyu)
        * `zh_cn` 简体中文 (白露)

* `class_no` 舰级编号
* `remodel_series_id` 记录舰娘所有形态的关系表id，暂无用
* `base_level`
    * 该改造版本的基础等级
    * *level requested to perform remodel*
* `buildtime` 建造时间，分钟 *build time in minutes*
* `rare` 稀有度等级，1~8

* `stat` number 属性
    * `fire` 火力
    * `fire_max` 火力最大值
    * `torpedo` 雷装
    * `torpedo_max` 雷装最大值
    * `anti_air` 对空
    * `anti_air_max` 对空最大值
    * `anti_submarine` 对潜
    * `anti_submarine_max` 对潜99级时
    * `hp` 耐久
    * `hp_max`
        * 耐久最大值，有可能大于婚后理论值，此时以婚后理论值为准
        * *Max hp,it may be greater than the theoretical max value after marriage,*
        * *please base on the theoretical max value of marriage.*
    * `armor` 装甲
    * `armosr_max` 装甲最大值
    * `evasion` 回避
    * `evasion_max` 回避99级时 *EVA when lv.99*
    * `line_of_sight` 索敌
    * `line_of_sight_max` 索敌99级时 *LOS when lv.99*
    * `luck` 运
    * `luck_max` 运最大值
    * `carry` 总搭载量
    * `speed`
        * 航速，5或10，5表低速，10表高速
        * *ship speed, the value is 5 (represent low speed) or 10 (represent high speed)*
    * `range`
        * 射程，1~4，越大射程越长
        * *fire range*

* `max_consumption` 补给时最大消耗 *max consumption when re-supplied*
    * `fuel` 油耗
    * `ammo` 弹耗

* `equipment_slot` [number] 装备格 & 每格搭载
    * *The length of the array is the number of slots.*
    * *Each number means that slot's carrier load number.*
    * 长度表示装备格数
    * 每个元素数字表示该格搭载量

* `initial_equipments` [object]  默认装备
    * for each object:
    * `id`  数据库内id *in-database id*
    * `name`
        * `ja_jp` (12.7cm連装砲C型改二)
        * `en_us` (12.7cm連装砲C型改二)
            * *notice that the default replace logic copy ja_jp name to en_us name*
            * 注意这里en_us名称被默认替换为ja_jp名称
        * `zh_cn` (12.7cm连装炮C型改二)
    * `improvement_star` 初始改修星数 *initial improvement level*

* `dismentlement_gain` 废弃所得资源 *Gain after dismantle*
    * `fuel`
    * `ammo`
    * `steel`
    * `bauxite`
    * 按顺序资源为：油、弹、钢、铝

* `modernization_provides` [number] 近代化改修（合成）所得属性
    * `fire`
    * `torpedo`
    * `anti_air`
    * `armor`
    * `luck`
    * 按顺序资源为：火力、雷装、对空、装甲、运

* `remodel` 改造信息
    * `prev`
        * `ship_id` 改造前舰娘ID *ship's prev-model id*
        * `have_more_than_one_prev_form` boolean
            * *value is true, means this model has more than one prev-model*
            * 值为ture，表示不止一个前形态
    * `next`
        * `ship_id` 改装后舰娘ID *ship's next-model id*
        * `level_request` 改装所需等级
        * `have_more_than_one_next_form`
            * *like `have_more_than_one_prev_form`*
            * 值为ture，表示不止一个新形态
        * `cost` 改装消耗
            * `ammo` 弹耗
            * `steel` 钢耗

* `additional_item_types` 额外可装备类型
    * `id` [string] ([38, 43])
    * `name`
        * `ja_jp` [string] (["上陸用舟艇","司令部施設"])
        * `en_us` [string] (["Landing Craft","Command Facility"])
        * `zh_cn` [string] (["登陆艇","司令部设施"])

* `additional_disable_item_types` {[string]} 额外不可装备类型
    * `id` [string]
    * `name`
        * `ja_jp` [string]
        * `en_us` [string]
        * `zh_cn` [string]
    * *This field only appears on a very small number of ships, such as Tatsuta Kai Ni, who can't equip with a seaplane,
      which is a general ability of CL.*
    * 该字段只在极少数船上出现，比如龙田改二，她不能装备一般轻巡能装备的水侦

* `relations` 相关信息 *This Ship's CV & Illustrator name*
    * `cv` 声优
        * `id`  数据库内id *in-database id*
        * `name`
            * `ja_jp` (谷邊 由美)
            * `en_us` (谷邊 由美)
            * `zh_cn` (谷边 由美)
    * `illustrator` 画师
        * `id`  数据库内id *in-database id*
        * `name`
            * `ja_jp` (玖条イチソ)
            * `en_us` (玖条イチソ)
            * `zh_cn` (玖条ITISO)

* `links` [object] 相关链接 *Related Links*
    * for each object:
    * `name` 链接名 *link name*
    * `url` 链接地址 *URL*

* `special_capabilities` 额外能力
    * `count_as_landing_craft` 算作：登陆艇
    * `count_as_night_operation_aviation_personnel` 算作：夜间航空要员
    * `participate_night_battle_when_equip_swordfish` 当装备剑鱼时可参与夜战

* `cg`  ship's CG image request urls
    * `normal`
        * `banner`  ("http://localhost:3000/v1/ship/cg?shipid=498&cgid=n0")
        * `banner_masked`
        * `banner_dmged`
        * `banner_dmged_masked`
        * `card`
        * `card_dmged`
        * `whole_body`
        * `whole_body_dmged`
        * `head_masked`
        * `head_dmged_masked`
    * `seasonal` [object]
        * for each object:
        * `id`  *in-database seasonal cg id*
        * `type`
            * `id` *in-database seasonal cg type id*
            * `name`
                * `ja_jp` (梅雨)
                * `en_us` (Rainy Season)
                * `zh_cn` (梅雨)
            * `time`
                * `ja_jp` (6月上旬)
                * `en_us` (Early June)
                * `zh_cn` (6月初)
        * `url`
            * `whole_body` ("http://localhost:3000/v1/ship/cg?shipid=498&cgid=e20")
            * `whole_body_dmged`
    * `all_in_one`
        * 对该舰娘所有CG的截图
        * *Screenshot about all CG of this ship*

## 3.Example 例子

Take Shiratsuyu Class Destroyer: **Murasame** as an example.

以白露型驱逐舰:**村雨**为例。

### 3.1. Json format	json格式

request url: **host/v1/ship/info? `match=村雨` & `matchfmt=zh_cn` & `resfmt=json`**

[It's too long, I've put it to another page.](https://github.com/boholder/KanColleREST/wiki/example-ship-info-response)

### 3.2. Image format 图片格式

request url: **host/v1/ship/info? `match=村雨` & `matchfmt=zh_cn` & `resfmt=img`**

![example image](https://github.com/boholder/KanColleREST/tree/master/doc/wiki/api/example-ship-info-image.png)