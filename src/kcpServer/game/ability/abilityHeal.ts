export class abilityHeal {
  healDataAvatarList: healDataAvatar[]
  constructor() {
    this.healDataAvatarList = []
    this.healDataAvatarList.push(
      new healDataAvatar(10000014, "Barbara", 0)
        .addHealData("E", "Avatar_Barbara_WetShiled_Heal", ["HealHP_Const", "HealHPOnAdded_Const"], 0.04, 385, false)
        .addHealData("Q", "Avatar_Barbara_IdolHeal", ["HealHP_Const"], 0.176, 1694, true),
      new healDataAvatar(10000054, "Kokomi", 0).addHealData(
        "Q",
        "Avatar_Kokomi_ElementalBurst_Heal",
        ["ElementalBurst_Heal_Base_Amount"],
        0.081,
        77,
        true
      )
    )
  }
}

class healData {
  abilityType: string
  abilityName: string
  cdRatioName: string[]
  HPRatio: number
  HPbase: number
  healAll: boolean

  constructor(
    abilityType: string,
    abilityName: string,
    cdRatioName: string[],
    HPRatio: number,
    HPbase: number,
    healAll: boolean
  ) {
    this.abilityType = abilityType
    this.abilityName = abilityName
    this.cdRatioName = cdRatioName
    this.HPRatio = HPRatio
    this.HPbase = HPbase
    this.healAll = healAll
  }
}

class healDataAvatar {
  avatarId: number
  avatarName: string
  fightPropertyType: number
  healdataList: healData[]

  /**
   * @param fightPropertyType 0: maxHP 1: curAttack 2: curDefense
   **/
  constructor(avatarId: number, avatarName: string, fightPropertyType: number) {
    this.avatarId = avatarId
    this.avatarName = avatarName
    this.fightPropertyType = fightPropertyType
    this.healdataList = []
  }

  addHealData(
    abilityType: string,
    abilityName: string,
    cdRatioName: string[],
    HPRatio: number,
    HPbase: number,
    healAll: boolean
  ): healDataAvatar {
    this.healdataList.push(new healData(abilityType, abilityName, cdRatioName, HPRatio, HPbase, healAll))
    return this
  }
}
