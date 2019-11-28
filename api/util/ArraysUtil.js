/**
 * 
 * @param {array} arr 
 * @param {*} arrNames 
 */
exports.toObject = function(arr, arrNames) {
  var rv = {};
  for (var i = 0; i < arr.length; ++i)
    rv[arrNames[i]] = arr[i];
  return rv;
}

/**
 * 
 * @param {*} columns 
 * @param {*} rows 
 */
exports.mergeArrays = function(columns, rows) {
  var result = rows.reduce(function (result, field, index) {
    result[columns[index]] = field;
    return result;
  }, {})
  return result
}

/**
 * 
 * @param {*} values 
 */
exports.arrayToObj = function(values) {
  var finalObject = values.reduce((obj, item) => Object.assign(obj, item), {});
  return finalObject
}

/**
 * 
 * @param {*} valuesDockerAll 
 */
exports.listDockerContainersNames = function(valuesDockerAll) {
  //Array parameter
  let resolveIntonameid = valuesDockerAll.reduce(function (s, a) {
    s[a.name] = a.id;
    return s;
  }, {});

  var arrayOfNames = Object.keys(resolveIntonameid);
  return arrayOfNames
}