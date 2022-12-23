# HuTao-GS
Supported version: 1.4.50 - 3.3.52

# Fidder Script
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