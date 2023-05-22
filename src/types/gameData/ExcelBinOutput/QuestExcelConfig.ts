export interface QuestExcelConfig {
  SubId: number
  MainId: number
  Order: number
  DescTextMapHash: number
  StepDescTextMapHash: number
  GuideTipsTextMapHash: number
  ShowType?: string
  Guide: {
    Param: string[]
    Type?: string
    GuideScene?: number
    GuideStyle?: string
    GuideLayer?: string
    AutoGuide?: string
  }
  FinishCondComb: {}
  ShowGuide?: string
  BanType?: string
  IsMpBlock?: boolean
  SubIdSet?: number
  FailParentShow?: string
}

type QuestExcelConfigList = QuestExcelConfig[]

export default QuestExcelConfigList
