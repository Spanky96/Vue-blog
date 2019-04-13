function genderFmt (val) {
  return ['', '男', '女'][val];
}
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
function deleteHtmlTag (v) {
  return v.replace(/<[^<>]+>/g, '');
}
export default {
  genderFmt,
  isSuccessFmt,
  isOrNoFmt,
  deleteHtmlTag
};
