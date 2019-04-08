export default {
  toggleAttr: function (arr, index, attrName = 'active') {
    arr.forEach(element => {
        element[attrName] = false;
    });
    arr[index][attrName] = true;
  }
};
