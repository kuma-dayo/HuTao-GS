export interface QuestExcelConfig {
  subId: number
  mainId: number
  order: number
  descTextMapHash: number
  stepDescTextMapHash: number
  guideTipsTextMapHash: number
  showType?: FailParentShow
  guide: Guide
  finishCondComb: FinishCondComb
  showGuide?: ShowGuide
  banType?: BanType
  isMpBlock?: boolean
  subIdSet?: number
  failParentShow?: FailParentShow
}

export enum BanType {
  BanGroupCommon = "BAN_GROUP_COMMON",
  BanGroupTransporGotoScene = "BAN_GROUP_TRANSPOR_GOTO_SCENE",
  BanGroupTransportMap = "BAN_GROUP_TRANSPORT_MAP",
  BanGroupTransportOnly = "BAN_GROUP_TRANSPORT_ONLY",
}

export enum FailParentShow {
  QuestHidden = "QUEST_HIDDEN",
}

export interface FinishCondComb {}

export interface Guide {
  param: string[]
  type?: Type
  guideScene?: number
  guideStyle?: GuideStyle
  guideLayer?: GuideLayer
  autoGuide?: AutoGuide
}

export enum AutoGuide {
  QuestGuideAutoDisable = "QUEST_GUIDE_AUTO_DISABLE",
  QuestGuideAutoEnable = "QUEST_GUIDE_AUTO_ENABLE",
}

export enum GuideLayer {
  QuestGuideLayerScene = "QUEST_GUIDE_LAYER_SCENE",
  QuestGuideLayerUI = "QUEST_GUIDE_LAYER_UI",
}

export enum GuideStyle {
  QuestGuideStyleFinish = "QUEST_GUIDE_STYLE_FINISH",
  QuestGuideStylePoint = "QUEST_GUIDE_STYLE_POINT",
  QuestGuideStyleStart = "QUEST_GUIDE_STYLE_START",
  QuestGuideStyleTarget = "QUEST_GUIDE_STYLE_TARGET",
}

export enum Type {
  QuestGuideGadget = "QUEST_GUIDE_GADGET",
  QuestGuideLocation = "QUEST_GUIDE_LOCATION",
  QuestGuideNpc = "QUEST_GUIDE_NPC",
  QuestGuideShowOrHideNpc = "QUEST_GUIDE_SHOW_OR_HIDE_NPC",
}

export enum ShowGuide {
  QuestGuideItemDisable = "QUEST_GUIDE_ITEM_DISABLE",
  QuestGuideItemMoveHide = "QUEST_GUIDE_ITEM_MOVE_HIDE",
}

type QuestExcelConfigList = QuestExcelConfig[]

export default QuestExcelConfigList
