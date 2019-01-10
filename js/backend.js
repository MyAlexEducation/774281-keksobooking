'use strict';

(function () {
  var adFormAction = 'https://js.dump.academy/keksobooking';
  var getBuildingsURL = 'https://js.dump.academy/keksobooking/data';

  var ServerCode = {
    ok: 200
  };
  var maxLoadTime = 10000;

  var adFormUpload = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === ServerCode.ok) {
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
      if (xhr.status === ServerCode.OK) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = maxLoadTime;

    xhr.open('GET', getBuildingsURL);
    xhr.send();
  };

  window.backend = {
    adFormUpload: adFormUpload,
    buildingsLoad: buildingsLoad
  };
})();
