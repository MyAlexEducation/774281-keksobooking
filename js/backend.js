'use strict';

(function () {
  var adFormAction = 'https://js.dump.academy/keksobooking';

  var adFormUpload = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      onLoad(xhr.response);
    });

    xhr.open('POST', adFormAction);
    xhr.send(data);
  };

  var buildingsLoad = function (onLoad, onError) {
    
  };

  window.backend = {
    adFormUpload: adFormUpload,
    buildingsLoad: buildingsLoad
  };
})();
