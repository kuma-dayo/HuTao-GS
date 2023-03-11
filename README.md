# HuTao-GS
Supported version: 1.4.50 - 3.5.0

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

## Todo

#### Fixed all skill behavior

- [ ] HealHP　:  
    healHP packets do not contain a value to recover, so using the skill will not recover  
    You must either hardcode the recovery amount or use a resource to get the value.
- [ ] LoseHP (Hutao xiao) :  
    Same cause as HealHP problem  
- [ ] Albedo Elevator :  
    This gadget is generated using an AbilityAction called CreateMovingPlatform  
    There are a few other things that need to be implemented, but see this [commit](https://github.com/Grasscutters/Grasscutter/pull/1845)