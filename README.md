# HuTao-GS
Supported version: 1.0.0 - 3.7.0

1.0.0 - 1.2.0 It probably should work, but we haven't tested it.  

Please let us know which version you would like us to support.  
We'll consider adding it.
## HuTao-GS's current features

* Logging in
* Automatically gives all characters
* Combat
* Spawning monsters
* Scene Script
* Challenge

## Requirements

* [Node-Js](https://nodejs.org/en/)
* [Openssl](https://slproweb.com/products/Win32OpenSSL.html)
* [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
* [Typescript](https://www.npmjs.com/package/typescript)
* [Tsc-Alias](https://www.npmjs.com/package/tsc-alias)


## Setup
```shell
git clone https://github.com/kuma-dayo/HuTao-GS.git
cd HuTao-GS
npm i
npm run start:dev
```
## Resource
Generate resources using [HuTao-GD](https://github.com/kuma-dayo/Hutao-GD)
```
data
├── game
│   └── x.x.x
│       ├── Scripts
│       │   └── Scene
│       ├── AbilityData.json
│       ├── AvatarData.json
│       ├── DropData.json
│       ├── DungeonData.json
│       ├── GadgetData.json
│       ├── GrowCurveData.json
│       ├── MapAreaData.json
│       ├── MaterialData.json
│       ├── MonsterData.json
│       ├── ReliquaryData.json
│       ├── SceneData.json
│       ├── ShopData.json
│       ├── SkillData.json
│       ├── TalentData.json
│       ├── WeaponData.json
│       ├── WeatherData.json
│       └── WorldData.json
└── proto
    ├── x.x.x
    ├── ForceUpdateInfo.proto
    ├── PacketHead.proto
    ├── QueryCurrRegionHttpRsp.proto
    ├── QueryRegionListHttpRsp.proto
    ├── RegionInfo.proto
    ├── RegionSimpleInfo.proto
    ├── ResVersionConfig.proto
    └── StopServerInfo.proto
```
## Fiddler Script
```
import System;
import System.Windows.Forms;
import Fiddler;
import System.Text.RegularExpressions;

class Handlers
{
    static function OnBeforeRequest(oS: Session) {
        if(oS.host.EndsWith(".yuanshen.com") || oS.host.EndsWith(".hoyoverse.com") || oS.host.EndsWith(".mihoyo.com") || oS.uriContains("http://overseauspider.yuanshen.com:8888/log")){
            oS.bypassGateway = true;
            oS["x-overrideHost"] = '127.0.0.1';
        }
    }
}
```

## TODO
Changed most of the processing in szrc/kcpServer/game/gameData/data to not use async.  
We have not removed async in the section that calls this function, so it needs to be removed.

## Contact
```
    Please DM me with any questions about this project.
    Discord: kumadayo#2407
```

## Credit
Wangsheng-Funeral-Parlor for Original [Hutao-GS](https://github.com/Wangsheng-Funeral-Parlor/HuTao-GS)
