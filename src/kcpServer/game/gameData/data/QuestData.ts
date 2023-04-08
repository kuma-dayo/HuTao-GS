import Loader from "$/gameData/loader"
import QuestDataList, { QuestData } from "@/types/gameData/QuestData"

class QuestDataLoader extends Loader {
  declare data: QuestDataList

  constructor() {
    super("QuestData")
  }

  async getData(): Promise<QuestDataList> {
    return super.getData()
  }

  async getQuestData(Id: number): Promise<QuestData> {
    return (await this.getData()).Quest.find((data) => data.Id === Id)
  }
}

let loader: QuestDataLoader
export default (() => (loader = loader || new QuestDataLoader()))()
