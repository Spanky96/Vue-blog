import qs from 'qs';
import _ from 'lodash/lang';
export default {
  stringify: qs.stringify,
  toggleAttr: function (arr, index, attrName = 'active') {
    arr.forEach(element => {
        element[attrName] = false;
    });
    arr[index][attrName] = true;
  },
  isEmpty: _.isEmpty
};
