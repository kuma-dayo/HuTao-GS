import KillMonsterTrigger from "$/dungeon/trigger/killMonsterTrigger"
import Entity from "$/entity"
import Weapon from "$/equip/weapon"
import AbilityData from "$/gameData/data/AbilityData"
import GrowCurveData from "$/gameData/data/GrowCurveData"
import MonsterData from "$/gameData/data/MonsterData"
import Player from "$/player"
import ConfigEntityAbilityEntry from "$DT/BinOutput/Config/ConfigEntityAbilityEntry"
import ConfigGlobalValue from "$DT/BinOutput/Config/ConfigGlobalValue"
import { EntityTypeEnum, FightPropEnum, MonsterTypeEnum } from "@/types/enum"
import { SceneMonsterInfo } from "@/types/proto"
import { AbilityScalarTypeEnum, ChangeHpReasonEnum, MonsterBornTypeEnum, ProtEntityTypeEnum } from "@/types/proto/enum"
import EntityUserData from "@/types/user/EntityUserData"

export default class Monster extends Entity {
  player: Player

  monsterId: number

  affixList: number[]
  weaponList: Weapon[]

  hpDropList: { id: number; hp: number }[]
  killDropId: number

  poseId: number
  isElite: boolean

  monsterType: MonsterTypeEnum
  bornType: MonsterBornTypeEnum

  titleId: number
  specialNameId: number

  constructor(monsterId: number, player: Player) {
    super()

    this.player = player

    this.monsterId = monsterId

    this.affixList = []
    this.weaponList = []

    this.hpDropList = []
    this.killDropId = 0

    this.monsterType = MonsterTypeEnum.MONSTER_NONE
    this.bornType = MonsterBornTypeEnum.MONSTER_BORN_DEFAULT

    this.poseId = 0
    this.isElite = false

    this.protEntityType = ProtEntityTypeEnum.PROT_ENTITY_MONSTER
    this.entityType = EntityTypeEnum.Monster

    this.monster = this

    super.initHandlers(this)
  }

  private async loadMonsterData() {
    const { player, monsterId } = this

    this.config = await MonsterData.getFightPropConfig(monsterId)
    this.growCurve = await GrowCurveData.getGrowCurve("Monster")

    const monsterData = await MonsterData.getMonster(monsterId)
    const abilityData = await AbilityData.getData()

    if (!monsterData || !abilityData) return

    this.affixList = monsterData.Affix || []
    this.weaponList = monsterData.Equips.map((id) => Weapon.createByGadgetId(id, player, true))

    for (const weapon of this.weaponList) await weapon.initNew()

    this.hpDropList = (monsterData.HpDrops || [])
      .filter((d) => d.DropId != null && d.HpPercent != null)
      .map((d) => ({ id: d.DropId || 0, hp: (d.HpPercent || 0) / 100 }))
    this.killDropId = monsterData.KillDropId || 0

    this.monsterType = MonsterTypeEnum[monsterData.Type] || MonsterTypeEnum.MONSTER_NONE

    const describeData = await MonsterData.getDescribe(monsterData.DescribeId)

    if (describeData) {
      this.titleId = describeData.TitleID || 0
      this.specialNameId = (await MonsterData.getSpecialName(describeData.SpecialNameLabID))?.Id || 0
    }

    let abilityList: ConfigEntityAbilityEntry[] = []
    let globalValue: ConfigGlobalValue = {
      ServerGlobalValues: [],
      InitServerGlobalValues: {},
    }

    abilityData.Monster[monsterData.Name.replace("Monster_", "")]?.map((abilityData) => {
      abilityData["Default"]?.AbilityMixins?.map((abilityMixin) => {
        if (
          abilityMixin.$type == "AttachModifierToSelfGlobalValueMixin" &&
          abilityMixin.GlobalValueKey.includes("SGV_") //ConfigAbility has multiple serverGlobalValues, but to get the same values as ConfigMonster, only those with SGV_ in the value are taken.
        ) {
          globalValue.ServerGlobalValues.push(abilityMixin.GlobalValueKey)
          globalValue.InitServerGlobalValues[abilityMixin.GlobalValueKey] = 0 //InitServerGlobalValues value is fixed at 0 to substitute ConfigMonster
        }
      })

      if (abilityData["Default"]?.AbilityName)
        abilityList.push({
          AbilityName: abilityData["Default"].AbilityName,
          AbilityID: undefined, //Sometimes AbilityName can be substituted. AbilityId may not exist, so set it to undefined.
          AbilityOverride: undefined,
        })
    })

    this.loadAbilities(abilityList, true)
    this.loadGlobalValue(globalValue)
  }

  async init(userData: EntityUserData): Promise<void> {
    await this.loadMonsterData()
    await super.init(userData)
  }

  async initNew(level?: number): Promise<void> {
    await this.loadMonsterData()
    await super.initNew(level)
  }

  isBoss(): boolean {
    return this.monsterType === MonsterTypeEnum.MONSTER_BOSS
  }

  async takeDamage(
    attackerId: number,
    val: number,
    notify?: boolean,
    changeHpReason?: ChangeHpReasonEnum,
    seqId?: number
  ): Promise<void> {
    const { manager, motion, hpDropList } = this

    const maxHp = this.getProp(FightPropEnum.FIGHT_PROP_MAX_HP)
    const hpBefore = this.getProp(FightPropEnum.FIGHT_PROP_CUR_HP) / maxHp
    await super.takeDamage(attackerId, val, notify, changeHpReason, seqId)
    const hpAfter = this.getProp(FightPropEnum.FIGHT_PROP_CUR_HP) / maxHp

    for (const hpDrop of hpDropList) {
      const { id, hp } = hpDrop
      if (hpBefore <= hp || hpAfter > hp) continue

      await manager?.scene?.spawnDropsById(motion.pos, id, seqId)
    }
  }

  exportSceneMonsterInfo(): SceneMonsterInfo {
    const {
      authorityPeerId,
      monsterId,
      groupId,
      configId,
      affixList,
      weaponList,
      bornType,
      blockId,
      poseId,
      isElite,
      titleId,
      specialNameId,
    } = this

    return {
      monsterId,
      groupId,
      configId,
      affixList,
      weaponList: weaponList.map((weapon) => weapon.exportSceneWeaponInfo()),
      authorityPeerId,
      bornType,
      blockId,
      poseId,
      isElite,
      titleId,
      specialNameId,
    }
  }

  /**Events**/

  // Register
  async handleRegister() {
    const { manager, weaponList, abilityManager } = this
    const { sgvDynamicValueMapContainer } = abilityManager

    for (const weapon of weaponList) await manager?.register(weapon.entity)

    if (!this.isBoss()) return

    setTimeout(() => {
      const keys = sgvDynamicValueMapContainer.getKeys()
      for (const key of keys) {
        const { type, val } = sgvDynamicValueMapContainer.getValue(key)

        if (type !== AbilityScalarTypeEnum.FLOAT || val !== 0) continue

        sgvDynamicValueMapContainer.setValue({
          key,
          valueType: type,
          floatValue: 1,
        })
      }
    }, 5e3)
  }

  // Unregister
  async handleUnregister() {
    const { player, manager, weaponList } = this
    const { guidManager } = player

    for (const weapon of weaponList) {
      await manager?.unregister(weapon.entity)
      guidManager.freeGuid(weapon.guid)
    }
  }

  // Death
  async handleDeath(seqId?: number, batch = false) {
    const { manager, motion, killDropId } = this

    if (manager.scene.enableScript) {
      if (manager.scene.ischallenge) await new KillMonsterTrigger().MonsterDeath(manager.scene.challenge)
      await this.sceneGroup?.scriptManager.EVENT_ANY_MONSTER_DIE(this.configId)
    }
    await manager?.scene?.spawnDropsById(motion.pos, killDropId, seqId)
    await super.handleDeath(seqId, batch)
  }
}
