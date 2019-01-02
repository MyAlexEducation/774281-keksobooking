'use strict';

(function () {
  var adFormAction = 'https://js.dump.academy/keksobooking';
  var getBuildingsURL = 'https://js.dump.academy/keksobooking/data';

  var adFormUpload = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.open('POST', adFormAction);
    xhr.send(data);
  };

  var buildingsLoad = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.timeout = 10000;

    xhr.open('GET', getBuildingsURL);
    xhr.send();
  };

  window.backend = {
    adFormUpload: adFormUpload,
    buildingsLoad: buildingsLoad
  };
})();
