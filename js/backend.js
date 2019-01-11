'use strict';

(function () {
  var maxLoadTime = 10000;
  var ServerCode = {
    ok: 200
  };
  var LoadParameter = {
    method: 'POST',
    url: 'https://js.dump.academy/keksobooking/data',
    data: undefined
  };

  var load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === ServerCode.ok) {
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

    xhr.open(LoadParameter.method, LoadParameter.url);
    if (LoadParameter.data) {
      xhr.send(LoadParameter.data);
    } else {
      xhr.send();
    }
  };

  window.backend = {
    LoadParameter: LoadParameter,
    load: load
  };
})();
