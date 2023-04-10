import { QuestCond, QuestContent, QuestType } from "$/quest/enum"

export interface QuestData {
  Id: number
  ELEPLNPCHAA?: number
  Series?: number
  TitleTextMapHash?: number
  DescTextMapHash?: number
  LuaPath: string
  SuggestTrackMainQuestList?: number[]
  RewardIdList?: number[]
  ChapterId?: number
  ShowRedPoint?: boolean
  SubQuests?: SubQuest[]
  Talks?: Talk[]
  BPKCHMHEIEE?: number[]
  MLPLKFJDMIK?: number[]
  FreeStyleDic?: { [key: string]: number[] }
  Type?: QuestType
  ShowType?: ShowType
  ForcePreloadLuaList?: number[]
  HBPBFHKEDLF?: number
  MainQuestTag?: MainQuestTag
  ActiveMode?: ActiveMode
  PreloadLuaList?: number[]
  DialogList?: DialogList[]
  SuggestTrackOutOfOrder?: boolean
  Repeatable?: boolean
  TaskID?: number
  ActivityId?: number
  RecommendLevel?: number
}

export enum ActiveMode {
  PlayModeAll = "PLAY_MODE_ALL",
  PlayModeHost = "PLAY_MODE_HOST",
}

export interface DialogList {
  id: number
  nextDialogs?: number[]
  talkRole: TalkRole
  talkContentTextMapHash?: number
  talkAssetPath: string
  talkAssetPathAlter: string
  talkAudioName: string
  actionBefore: string
  actionWhile: ActionWhile
  actionAfter: string
  optionIcon: string
  talkShowType?: TalkShowType
  talkRoleNameTextMapHash?: number
  showDuration?: number
}

export enum ActionWhile {
  Empty = "",
  SimpleTalkConfuse = "SimpleTalk/Confuse",
  SimpleTalkNodHead = "SimpleTalk/NodHead",
  SimpleTalkPutHand = "SimpleTalk/PutHand",
  SimpleTalkRandomTalk = "SimpleTalk/RandomTalk",
  SimpleTalkStandby = "SimpleTalk/Standby",
  SimpleTalkThink = "SimpleTalk/Think",
}

export interface TalkRole {
  Type?: TalkRoleType
  Id: string
}

export enum TalkRoleType {
  TalkRoleBlackScreen = "TALK_ROLE_BLACK_SCREEN",
  TalkRoleNeedClickBlackScreen = "TALK_ROLE_NEED_CLICK_BLACK_SCREEN",
  TalkRoleNpc = "TALK_ROLE_NPC",
  TalkRolePlayer = "TALK_ROLE_PLAYER",
}

export enum TalkShowType {
  TalkShowForceSelect = "TALK_SHOW_FORCE_SELECT",
}

export enum MainQuestTag {
  MainquestTagActivity = "MAINQUEST_TAG_ACTIVITY",
  MainquestTagGuide = "MAINQUEST_TAG_GUIDE",
  MainquestTagMainWq = "MAINQUEST_TAG_MAIN_WQ",
  MainquestTagRankZeroWq = "MAINQUEST_TAG_RANK_ZERO_WQ",
}

export enum ShowType {
  QuestHidden = "QUEST_HIDDEN",
}

export interface SubQuest {
  SubId: number
  MainId: number
  Order: number
  DescTextMapHash?: number
  FinishCond?: Cond[]
  Guide: Guide
  AcceptCondComb: AcceptCondComb
  IsRewind?: boolean
  VersionBegin: string
  VersionEnd: string
  IsMpBlock?: boolean
  SubIdSet?: number
  FinishExec?: FailExec[]
  ShowType?: ShowType
  BanType?: BanType
  FailCond?: Cond[]
  FinishParent?: boolean
  FailExec?: FailExec[]
  ShowGuide?: ShowGuide
  StepDescTextMapHash?: number
  FailParentShow?: ShowType
  GuideTipsTextMapHash?: number
  FailParent?: boolean
}

export interface AcceptCondComb {
  ODAOGCJFIHC: string
  Type?: AcceptCondCombType
}

export enum AcceptCondCombType {
  QuestGuideHintAranaraHandbookRecord = "QUEST_GUIDE_HINT_ARANARA_HANDBOOK_RECORD",
  QuestGuideHintDeshretManual = "QUEST_GUIDE_HINT_DESHRET_MANUAL",
  QuestGuideHintReadingDialog = "QUEST_GUIDE_HINT_READING_DIALOG",
}

export enum BanType {
  BanGroupCommon = "BAN_GROUP_COMMON",
  BanGroupTransporGotoScene = "BAN_GROUP_TRANSPOR_GOTO_SCENE",
  BanGroupTransportMap = "BAN_GROUP_TRANSPORT_MAP",
  BanGroupTransportOnly = "BAN_GROUP_TRANSPORT_ONLY",
}

export interface Cond {
  Type: QuestContent
  Param: number[]
  Count?: number
}

export interface FailExec {
  Type?: QuestCond
  Param?: string[]
}

export interface Guide {
  Type?: GuideType
  Param?: string[]
  GuideScene?: number
  GuideStyle?: GuideStyle
  GuideLayer?: GuideLayer
  AutoGuide?: AutoGuide
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

export enum GuideType {
  QuestGuideGadget = "QUEST_GUIDE_GADGET",
  QuestGuideLocation = "QUEST_GUIDE_LOCATION",
  QuestGuideNpc = "QUEST_GUIDE_NPC",
  QuestGuideShowOrHideNpc = "QUEST_GUIDE_SHOW_OR_HIDE_NPC",
}

export enum ShowGuide {
  QuestGuideItemDisable = "QUEST_GUIDE_ITEM_DISABLE",
  QuestGuideItemMoveHide = "QUEST_GUIDE_ITEM_MOVE_HIDE",
}

export interface Talk {
  Id: number
  BeginWay?: BeginWay
  BeginCond?: FailExec[]
  Priority?: number
  InitDialog?: number
  NpcId?: number[]
  PerformCfg: string
  HeroTalk?: HeroTalk
  QuestId: number
  AssetIndex: number
  PrePerformCfg: PrePerformCFG
  BeginCondComb?: BeginCondComb
  NextTalks?: number[]
  ONJHDOMNFOJ?: number[]
  DontBlockDaily?: boolean
  ActiveMode?: ActiveMode
  LockGameTime?: boolean
  QuestIdleTalk?: boolean
  LowPriority?: boolean
  StayFreeStyle?: boolean
  FinishExec?: FailExec[]
  EnableCameraDisplacement?: boolean
  PKKCHKIMBDM?: number[]
  NBCNFGJKLMG?: boolean
  TalkMarkType?: TalkMarkType
  FNOOFAGOKMN?: number
  NBJPAMCNCKC?: number
  FIHPIKGEAGK?: number[]
  ParticipantId?: number[]
  IJIOLOCLAAC?: number[]
  AKHDPOJKBNK?: number[]
}

export enum BeginCondComb {
  LogicAAndBAndEtcor = "LOGIC_A_AND_B_AND_ETCOR",
  LogicAAndBOrEtcand = "LOGIC_A_AND_B_OR_ETCAND",
  LogicAAndEtcor = "LOGIC_A_AND_ETCOR",
  LogicAOrBOrEtcand = "LOGIC_A_OR_B_OR_ETCAND",
  LogicAOrEtcand = "LOGIC_A_OR_ETCAND",
  LogicAnd = "LOGIC_AND",
  LogicOr = "LOGIC_OR",
}

export enum BeginWay {
  TalkBeginAuto = "TALK_BEGIN_AUTO",
  TalkBeginManual = "TALK_BEGIN_MANUAL",
}

export enum HeroTalk {
  TalkHeroMain = "TALK_HERO_MAIN",
}

export enum PrePerformCFG {
  Empty = "",
  QuestDialogueCOOPCoopBarbaraTest3 = "QuestDialogue/COOP/CoopBarbara/test3",
  QuestDialogueWQMengde70824Q70824Talk = "QuestDialogue/WQ/Mengde_70824/Q70824_Talk",
}

export enum TalkMarkType {
  TalkMarkCommon = "TALK_MARK_COMMON",
  TalkMarkHide = "TALK_MARK_HIDE",
}
