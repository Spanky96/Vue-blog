function isSuccessFmt (val) {
  return val ? '成功' : '失败';
}
function isOrNoFmt (val) {
  if (val == 'true') {
    return '是';
  } else if (val == 'false') {
    return '否';
  } else {
    return '未知';
  }
}
export default {
  isSuccessFmt,
  isOrNoFmt
};
