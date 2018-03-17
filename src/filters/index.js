exports.formatMoney = (value) => {
  if (value) {
    value = Number(value);
    return '￥ ' + value.toFixed(2);
  }
};

exports.getOrderStatusName = (val) => {
  let statusName = '';
  switch (val) {
    case 0: {
      statusName = '已取消';
      break;
    }
    case 10: {
      statusName = '未付款';
      break;
    }
    case 20: {
      statusName = '已付款';
      break;
    }
    case 40: {
      statusName = '交易成功';
      break;
    }
    case '50': {
      statusName = '交易关闭';
      break;
    }
    case '60': {
      statusName = '已发货';
      break;
    }
  }
  return statusName;
};
