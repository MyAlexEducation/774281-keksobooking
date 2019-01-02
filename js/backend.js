'use strict';

(function () {
  var adFormAction = 'https://js.dump.academy/keksobooking';
  var getBuildingsURL = 'https://js.dump.academy/keksobooking/data';

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
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.open('GET', getBuildingsURL);

    xhr.addEventListener('load', function () {
      onLoad(xhr.response);
    });

    xhr.send();
  };

  window.backend = {
    adFormUpload: adFormUpload,
    buildingsLoad: buildingsLoad
  };
})();
