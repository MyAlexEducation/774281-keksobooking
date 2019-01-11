'use strict';

(function () {
  var maxLoadTime = 10000;
  var ServerCode = {
    OK: 200
  };

  var response = function (xhr, time, onSuccess, onError) {
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === ServerCode.OK) {
        onSuccess(xhr.response);
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
  };

  var load = function (url, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    response(xhr, maxLoadTime, onSuccess, onError);
    xhr.open('GET', url);
    xhr.send();
  };

  var save = function (url, data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    response(xhr, maxLoadTime, onSuccess, onError);
    xhr.open('POST', url);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save
  };
})();
