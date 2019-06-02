## Introduction 介绍

This structure basically exposes all the fields of [this collection](https://github.com/TeamFleet/WhoCallsTheFleet-DB/blob/master/db/ships.nedb).

But there are some modifications about field's value for this project

to remove the relationship with other collections.

Changes will be directly reflected in the field's value of the response.

本结构基本暴露了[这个集合](https://github.com/TeamFleet/WhoCallsTheFleet-DB/blob/master/db/ships.nedb)
的所有字段，

但为了切断本结构与其他集合的关联，我做了一些字段内容上的改动。

改动将直接体现在响应返回的键值对的值上。

## Details	详细属性

* `id` 游戏内舰娘ID&数据集中舰娘ID *ingame script level id & dataset ship ID*

* `no` 游戏内图鉴ID *ingame album card id*	

* `name` 名称
	* `ja_jp` 日文	(長門)
	* `ja_kana` 日文假名 (ながと)
	* `ja_romaji` 日文罗马音 (nagato)
	* `zh_cn` 简体中文 (长门)
		* If this form isn't initial form, each value will added a suffix.
		* 如果本形态不是初始形态，每个值后都会有对应的后缀添加（+“改二“ etc）
		
* `type` 舰种名 *Ship type*
	* `ja_jp` 日文 (駆逐艦)
	* `en_us` 英语 (Destroyer)
	* `zh_cn` 简体中文 (驱逐舰)

* `class` 舰级名 *Ship Class name*
	* `ja_jp` 日文 (長門)
	* `en_us` 英语 (Nagato)
	* `zh_cn` 简体中文 (长门)

* `class_no` 舰级编号

* `base_lvl` 该改造版本的基础等级	*basic level in this form*

* `buildtime` 建造时间，分钟 *in minutes*

* `rare` 稀有度

* `stat` number 属性 
	* `fire` 火力
	* `fire_max` 火力最大值
	* `torpedo` 雷装
	* `torpedo_max` 雷装最大值
	* `aa` 对空
	* `aa_max` 对空最大值
	* `asw` 对潜
	* `asw_max` 对潜99级时
	* `hp` 耐久
	* `hp_max`	
		* 耐久最大值，有可能大于婚后理论值，此时以婚后理论值为准
		* *Max hp,it may be greater than the theoretical value after marriage. *
		* *At this time, based on the theoretical value of marriage.*
	* `armor` 装甲
	* `armor_max` 装甲最大值
	* `evasion` 回避
	* `evasion_max` 回避99级时 *EVA when lv.99*
	* `los` 索敌
	* `los_max` 索敌99级时 *LOS when lv.99*
	* `luck` 运
	* `luck_max` 运最大值
	* `carry` 总搭载量
	* `speed` 航速
	* `range` 射程
	
* `consum` 最大消耗 *max consumption*
	* `fuel` 油耗
	* `ammo` 弹耗
	
* `slot` [number] 装备格 & 每格搭载
	* length表示装备格数
	* *The length of the array is the number of slots.*
	* 每个元素数字表示该格搭载量
	* *Each number means slot's carrier load.*

* `equip` [string]  默认装备 *initial equipments* 
	* `ja_jp` 日文
	* `zh_cn` 简体中文
		* Each language have a independent list.
		* There is almost no English equipment name in the data set.
		* So I won't design `en_us` key for now.
		* 每个列表包含有不同语言的默认装备的字符串。
		* 例，长门，["41cm连装炮","14cm单装炮","零式水上侦察机"]
	
* `scrap` [number] 废弃所得资源 *Gain after dismantle*
	* 按顺序资源为：油、弹、钢、铝
	* *[fuel,ammo,steel,bauxite]*
	
* `modernization` [number] 近代化改修（合成）所得属性
	* 按顺序资源为：火力、雷装、对空、装甲、运
	* *[fire,trop,aa,armor,luk]*

* `remodel` 改造信息
	* `prev` 改造前舰娘ID *ship's id value before this remodel*
	* `prev_loop` 
		* 值为ture，如果存在该属性 *value is true, if have this key* 
		* 可反复向前改装 *means this form has more than one pre-form*
	* `next` 改装后舰娘ID *ship's id value after this remodel*
	* `next_lvl` 改装所需等级
	* `next_loop` 可反复向后改装 *like `prev_loop`*
	
* `remodel_cost` 改装消耗
	* `ammo` 弹耗
	* `steel` 钢耗
	
* `additional_item_types` {[string]} 额外可装备类型
	* `ja_jp` 日文
	* `en_us` 英语
	* `zh_cn` 简体中文
		* Each language have a independent list.
		* 每个列表包含有不同语言的字符串。

* `additional_disable_item_types` {[string]} 额外不可装备类型
    * `ja_jp` 日文
	* `en_us` 英语
	* `zh_cn` 简体中文
		* Each language have a independent list.
		* 每个列表包含有不同语言的字符串。
		* This field only appears on a very small number of ships, such as Tatsuta Kai Ni, who can't be equipped with a seaplane for general CL equipment.
		* 该字段只在极少数船上出现，比如龙田改二，她不能装备一般轻巡能装备的水侦

* `rels` 相关信息 *This Ship's CV & Illustrator name*
	* `cv` 声优名
	* `illustrator` 画师名
	
* `links` 相关链接 *Related Links*
	* `name` 链接名 *link info*
	* `url` 链接地址 *URL*
	
* `capabilities` 额外能力
	* `count_as_landing_craft` 算作：登陆艇
	* `count_as_night_operation_aviation_personnel` 算作：夜间航空要员
	* `participate_night_battle_when_equip_swordfish` 当装备剑鱼时可参与夜战

* <del>`lines` 台词</del>
	* ...Not yet implemented