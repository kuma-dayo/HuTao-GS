import Entity from "$/entity"
import Gadget from "$/entity/gadget"
import Monster from "$/entity/monster"
import Npc from "$/entity/npc"
import SceneData from "$/gameData/data/SceneData"
import WorldData from "$/gameData/data/WorldData"
import Vector from "$/utils/vector"
import Logger from "@/logger"
import {
  SceneGadgetScriptConfig,
  SceneMonsterScriptConfig,
  SceneNpcScriptConfig,
  SceneSuiteScriptConfig,
  SceneTriggerScriptConfig,
} from "@/types/gameData/Script/SceneScriptConfig"
import { VisionTypeEnum } from "@/types/proto/enum"
import { WaitOnBlock } from "@/utils/asyncWait"
import SceneBlock from "./sceneBlock"
import { GadgetStateEnum } from "@/types/enum"
import scriptManager from "$/script/scriptManager"

export default class SceneGroup {
  block: SceneBlock

  id: number
  pos: Vector
  dynamicLoad: boolean

  monsterList: Monster[]
  npcList: Npc[]
  gadgetList: Gadget[]

  loaded: boolean

  trigger: SceneTriggerScriptConfig[]
  scriptManager: scriptManager

  constructor(block: SceneBlock, id: number, pos: Vector, dynamicLoad: boolean) {
    this.block = block

    this.id = id
    this.pos = pos
    this.dynamicLoad = !!dynamicLoad

    this.monsterList = []
    this.npcList = []
    this.gadgetList = []

    this.trigger = []

    this.loaded = false

    this.scriptManager = new scriptManager(this)
  }

  get aliveMonsterCount(): number {
    return this.monsterList.filter((monster) => monster.isAlive()).length
  }

  private async reloadList(entityList: Entity[]) {
    const { block } = this
    const { scene } = block
    const { entityManager } = scene

    if (entityList.length === 0) return false

    for (const entity of entityList) {
      if (entity.isDead()) continue
      await entityManager.add(entity, VisionTypeEnum.VISION_MEET, undefined, undefined, true)
    }

    return true
  }

  private async loadMonsters(monsters: SceneMonsterScriptConfig[]) {
    const { block, id: groupId, monsterList } = this
    const { id: blockId, scene } = block
    const { world, entityManager } = scene

    if (await this.reloadList(monsterList)) return

    const worldLevelData = await WorldData.getWorldLevel(world.level)
    const levelOffset = worldLevelData == null ? 0 : worldLevelData.MonsterLevel - 22

    for (const monster of monsters) {
      const { MonsterId, ConfigId, PoseId, IsElite, Level, Pos, Rot } = monster
      const entity = new Monster(MonsterId, block.scene.host)

      entity.groupId = groupId
      entity.configId = ConfigId || 0
      entity.blockId = blockId
      entity.poseId = PoseId || 0
      entity.isElite = !!IsElite

      const { motion, bornPos } = entity
      const { pos, rot } = motion

      pos.setData(Pos)
      rot.setData(Rot)
      bornPos.setData(Pos)

      await entity.initNew(Math.max(1, Math.min(100, Level + levelOffset)))

      monsterList.push(entity)
      await entityManager.add(entity, undefined, undefined, undefined, true)
    }
  }

  private async loadNpcs(npcs: SceneNpcScriptConfig[], suites: SceneSuiteScriptConfig[]) {
    const { block, id: groupId, npcList } = this
    const { id: blockId, scene } = block
    const { entityManager } = scene

    if (await this.reloadList(npcList)) return

    for (const npc of npcs) {
      const { NpcId, ConfigId, Pos, Rot } = npc
      const entity = new Npc(NpcId)

      entity.groupId = groupId
      entity.configId = ConfigId || 0
      entity.blockId = blockId
      entity.suitIdList = suites
        .map((suite, index) => ({ index, suite }))
        .filter((e) => e.suite?.Npcs?.includes(ConfigId))
        .map((e) => e.index + 1)

      const { motion, bornPos } = entity
      const { pos, rot } = motion

      pos.setData(Pos)
      rot.setData(Rot)
      bornPos.setData(Pos)

      await entity.initNew()

      npcList.push(entity)
      await entityManager.add(entity, undefined, undefined, undefined, true)
    }
  }

  private async loadGadgets(gadgets: SceneGadgetScriptConfig[]) {
    const { block, id: groupId, gadgetList } = this
    const { id: blockId, scene } = block
    const { entityManager } = scene

    if (await this.reloadList(gadgetList)) return

    for (const gadget of gadgets) {
      const { GadgetId, ConfigId, Level, Pos, Rot, InteractId, State } = gadget
      const entity = new Gadget(GadgetId)

      entity.groupId = groupId
      entity.configId = ConfigId || 0
      entity.blockId = blockId
      entity.interactId = InteractId || null
      entity.gadgetState = State || GadgetStateEnum.Default

      const { motion, bornPos } = entity
      const { pos, rot } = motion

      pos.setData(Pos)
      rot.setData(Rot)
      bornPos.setData(Pos)

      await entity.initNew(Level)

      gadgetList.push(entity)
      await entityManager.add(entity, undefined, undefined, undefined, true)
    }
  }

  private async unloadList(entityList: Entity[]) {
    const { block, dynamicLoad } = this
    const { scene } = block
    const { entityManager } = scene

    if (dynamicLoad) {
      for (const entity of entityList) await entityManager.remove(entity, undefined, undefined, true)
    } else {
      while (entityList.length > 0) await entityManager.unregister(entityList.shift(), true)
    }
  }

  async load(wob: WaitOnBlock) {
    const { block, id: groupId, loaded } = this
    const { id: sceneId } = block.scene

    if (loaded) return
    this.loaded = true

    const groupData = await SceneData.getGroup(sceneId, groupId)
    if (!groupData) return

    const grpLoadPerfMark = `GroupLoad-${sceneId}-${groupId}`
    Logger.mark(grpLoadPerfMark)

    await wob.waitTick()

    await this.loadMonsters(
      Object.values(
        groupData.Monsters?.filter((monster) =>
          groupData.Suites?.[groupData?.InitConfig?.[0] - 1]?.Monsters?.includes(monster.ConfigId)
        ) || {}
      )
    )

    await wob.waitTick()
    await this.loadNpcs(Object.values(groupData.Npcs || {}), Object.values(groupData.Suites || {}))
    await wob.waitTick()
    await this.loadGadgets(
      Object.values(
        groupData.Gadgets?.filter((gadget) =>
          groupData.Suites?.[groupData?.InitConfig?.[0] - 1]?.Gadgets?.includes(gadget.ConfigId)
        ) || {}
      )
    )

    this.trigger = groupData.Triggers

    Logger.measure("Group load", grpLoadPerfMark)
    Logger.clearMarks(grpLoadPerfMark)
  }

  async unload() {
    const { id, monsterList, npcList, gadgetList, loaded } = this

    if (!loaded) return
    this.loaded = false

    const grpUnloadPerfMark = `GroupUnload-${this.block?.scene?.id}-${id}`
    Logger.mark(grpUnloadPerfMark)

    await this.unloadList(monsterList)
    await this.unloadList(npcList)
    await this.unloadList(gadgetList)

    Logger.measure("Group unload", grpUnloadPerfMark)
    Logger.clearMarks(grpUnloadPerfMark)
  }
}
