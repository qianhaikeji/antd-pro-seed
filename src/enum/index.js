const { XEnum, XEnumItem } = require('./xEnum')


const ENUM_SETTLEMENT_STATUS = new XEnum({
  NEW: new XEnumItem(0, '待申请'),
  APPLIED: new XEnumItem(1, '已申请'),
  CHECKED: new XEnumItem(2, '已审核'),
  FINISHED: new XEnumItem(3, '已打款'),
})

const ENUM_PRIZE_STATUS = new XEnum({
  UNDO: new XEnumItem(0, '未打款'),
  DONE: new XEnumItem(1, '已打款'),
})

const ENUM_SWITCH_STATUS = new XEnum({
  CLOSED: new XEnumItem(false, '已关闭'),
  OPENED: new XEnumItem(true, '已启用'),
})

const ENUM_BET_HASH_PRIZE_RESULT = new XEnum({
  NONE: new XEnumItem(0, '未中奖'),
  FIRST: new XEnumItem(1, '一等奖'),
  SECOND: new XEnumItem(2, '二等奖'),
  THIRD: new XEnumItem(3, '三等奖'),
})


module.exports = {
  ENUM_SETTLEMENT_STATUS,
  ENUM_PRIZE_STATUS,
  ENUM_SWITCH_STATUS,
  ENUM_BET_HASH_PRIZE_RESULT
}