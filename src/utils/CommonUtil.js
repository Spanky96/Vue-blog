import qs from 'qs';
export default {
  stringify: qs.stringify,
  toggleAttr: function (arr, index, attrName = 'active') {
    arr.forEach(element => {
        element[attrName] = false;
    });
    arr[index][attrName] = true;
  }
};
