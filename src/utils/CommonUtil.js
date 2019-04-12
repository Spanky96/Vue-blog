import qs from 'qs';
import _ from 'lodash';
import moment from 'moment';
export default {
  stringify: qs.stringify,
  toggleAttr: function (arr, index, attrName = 'active') {
    arr.forEach(element => {
      element[attrName] = false;
    });
    arr[index][attrName] = true;
  },
  isEmpty: _.isEmpty,
  split: (str, reg = ',') => {
    var arr = str.split(reg);
    return _.without(arr, '');
  },
  getCurrentTime: (fmt = 'YYYY-MM-DD hh:mm:ss') => {
    return moment().format(fmt);
  }
};
