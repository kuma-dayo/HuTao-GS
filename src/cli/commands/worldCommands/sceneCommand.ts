import SceneData from "$/gameData/data/SceneData"
import Vector from "$/utils/vector"
import translate from "@/translate"
import { SceneEnterReasonEnum, SceneEnterTypeEnum } from "@/types/proto/enum"
import { CommandDefinition } from ".."
import { DynamicVector } from "$DT/BinOutput/Common/DynamicNumber"

const sceneCommand: CommandDefinition = {
  name: "scene",
  usage: 2,
  args: [
    { name: "id", type: "int" },
    { name: "uid", type: "int", optional: true },
  ],
  allowPlayer: true,
  exec: async (cmdInfo) => {
    const { args, sender, cli, kcpServer } = cmdInfo
    const { print, printError } = cli
    const [id, uid] = args
    let BornPos: DynamicVector, BornRot: DynamicVector

    const player = kcpServer.game.getPlayerByUid(uid || sender?.uid)
    if (!player) return printError(translate("generic.playerNotFound"))

    const { currentWorld, currentScene, context } = player
    if (!currentWorld) return printError(translate("generic.notInWorld"))

    const scene = await currentWorld.getScene(id)
    const sceneData = await SceneData.getScene(id)
    if (!scene || !sceneData) {
      BornPos = { X: 0, Y: 500, Z: 0 }
      BornRot = { X: 0, Y: 0, Z: 0 }
      print(translate("cli.commands.scene.warn.noData"))
    } else {
      BornPos = sceneData.BornPos
      BornRot = sceneData.BornRot
    }
    if (currentScene === scene) return printError(translate("cli.commands.scene.error.sameScene"))

    print(translate("cli.commands.scene.info.changeScene", scene.id || id))

    const pos = new Vector()
    const rot = new Vector()

    pos.setData(BornPos)
    rot.setData(BornRot)

    scene.join(context, pos, rot, SceneEnterTypeEnum.ENTER_JUMP, SceneEnterReasonEnum.TRANS_POINT)
  },
}

export default sceneCommand
