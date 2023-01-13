import ActivityManager from "$/manager/activityManager"
import Player from "$/player"
import { ActivityInfo } from "@/types/proto"
import Activity from "."

export default class CustomGameActivity extends Activity {
  constructor(manager: ActivityManager, schedule: number, beginTime: number, endTime: number, id: number) {
    super(manager, id, 2202, schedule, beginTime, endTime)
  }

  exportActivityInfo(player: Player): ActivityInfo {
    const info: ActivityInfo = super.exportActivityInfo(player)

    return info
  }
}
