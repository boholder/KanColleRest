# KanColleREST

A restful api server mainly using node.js with express framework and
using [nedb databse](https://github.com/louischatriot/nedb), to provide game information about a webpage game named "Kan
Tai Collection".

Game's official site:www.dmm.com/netgame/social/-/gadgets/=/app_id=854854/

For more information, check [Wiki](https://github.com/boholder/KanColleREST/wiki).

## API

All APIs only accept `GET` requests now.

### Ship

* [v1/ship/info](https://github.com/boholder/KanColleREST/wiki/api-ship-info)
    * Ships information

* [v1/ship/cg](https://github.com/boholder/KanColleREST/wiki/api-ship-cg)
    * Ships CG (regular CG/ seasonal limited CG/ other images about ships)

## Related projects and websites

* [Who calls the fleet DB -@Diablohu](https://github.com/TeamFleet/WhoCallsTheFleet-DB)
* [WhoCallsTheFleet-Pics -@Diablohu](https://github.com/TeamFleet/WhoCallsTheFleet-Pics)
* [Moegirl Wiki KanColle Column 萌娘百科舰C版块](https://zh.moegirl.org/%E8%88%B0%E9%98%9FCollection#)

## Acknowledgement

* [@Diablohu](https://github.com/Diablohu) - Who provides an excellent database & image resource and shows me how to use
  them.
* [@Bluefissure](https://github.com/Bluefissure) - Whose project [FFXIVBOT](https://github.com/Bluefissure/FFXIVBOT)
  inspired me.
* @Mian - Who provides screenshots of Moegirl Wiki KanColle Column, so I can provide an image format ship information
  response for convenient.
* @Wei - My friend who noticed me that I can't just leave a mess on Github then pretend it doesn't exist, that goes
  against professionalism.