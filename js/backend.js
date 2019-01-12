'use strict';

(function () {
  var MAX_LOAD_TIME = 10000;
  var ServerCode = {
    OK: 200
  };

  var response = function (xhr, onSuccess, onError) {
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

    xhr.timeout = MAX_LOAD_TIME;
  };

  var load = function (url, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    response(xhr, onSuccess, onError);
    xhr.open('GET', url);
    xhr.send();
  };

  var save = function (url, data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    response(xhr, onSuccess, onError);
    xhr.open('POST', url);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save
  };
})();
