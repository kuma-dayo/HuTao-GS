# HuTao-GS
Supported version: 1.4.0 - 3.7.0

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
## Fidder Script
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