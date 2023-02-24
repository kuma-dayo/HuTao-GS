import Packet, { PacketInterface, PacketContext } from "#/packet"
import { RetcodeEnum } from "@/types/proto/enum"
import { ShopGoods } from "@/types/proto"
import ItemAddHint from "./ItemAddHint"
import Material from "$/material"

export interface BuyGoodsReq {
  buyCount: number
  shopType: number
  goods: ShopGoods
}

export interface BuyGoodsRsp {
  retcode: RetcodeEnum
  buyCount: number
  goods: ShopGoods
  goodList?: ShopGoods[]
  shopType: number
}

class BuyGoodsPacket extends Packet implements PacketInterface {
  constructor() {
    super("BuyGoods")
  }

  async request(context: PacketContext, data: BuyGoodsReq): Promise<void> {
    const notifydata: BuyGoodsRsp = {
      retcode: RetcodeEnum.RET_SUCC,
      buyCount: data.buyCount,
      goods: data.goods,
      shopType: data.shopType,
    }
    const buyItem = await Material.create(context.player, data.goods.goodsItem.itemId, data.buyCount)

    context.player.inventory.add(buyItem)

    await ItemAddHint.sendNotify(context, {
      itemList: [{ count: data.buyCount, itemId: data.goods.goodsItem.itemId, guid: buyItem.guid }],
      reason: 4, //enum?
    })
    await this.response(context, notifydata)
  }

  async response(context: PacketContext, data: BuyGoodsRsp): Promise<void> {
    await super.response(context, data)
  }
}

let packet: BuyGoodsPacket
export default (() => (packet = packet || new BuyGoodsPacket()))()
