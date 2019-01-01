'use strict';

(function () {
  var getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };
  var getRandomData = function (arrayData) {
    return arrayData[getRandomInt(0, arrayData.length)];
  };
  var fillArray = function (array, Fill, length) {
    for (var i = 0; i < length; i++) {
      array[i] = new Fill(i);
    }
  };

  window.utils = {
    getRandomInt: getRandomInt,
    getRandomData: getRandomData,
    fillArray: fillArray
  };
})();
