'use strict';

(function () {
  var currentPin = window.data.mainPin;
  var buildingsLoadURL = 'https://js.dump.academy/keksobooking/data';

  var showMap = function () {
    window.data.map.classList.remove('map--faded');
  };
  var hideMap = function () {
    window.data.map.classList.add('map--faded');
    window.data.mainPin.style.left = '570px';
    window.data.mainPin.style.top = '375px';
  };
  var onBuildingsLoad = function (loadBuildings) {
    window.data.buildings = loadBuildings;
    window.filtersForm.filtersBuildings = window.data.buildings.filter(window.filtersForm.isFiltersBuilding);
    if (window.filtersForm.filtersBuildings.length > window.filtersForm.MAX_NUMBER_PINS) {
      window.filtersForm.filtersBuildings.length = window.filtersForm.MAX_NUMBER_PINS;
    }
    window.pins.show(window.filtersForm.filtersBuildings);
  };

  window.data.mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    if (window.data.map.classList.contains('map--faded')) {
      window.backend.load(buildingsLoadURL, onBuildingsLoad);
    }

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    var isCorrectCoords = function (x, y) {
      return (x >= window.data.MIN_LOCATION_X && x <= window.data.MAX_LOCATION_X)
        && (y >= window.data.MIN_LOCATION_Y && y <= window.data.MAX_LOCATION_Y);
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      if (isCorrectCoords((window.data.mainPin.offsetLeft - shift.x), (window.data.mainPin.offsetTop - shift.y))) {
        window.data.mainPin.style.top = (window.data.mainPin.offsetTop - shift.y) + 'px';
        window.data.mainPin.style.left = (window.data.mainPin.offsetLeft - shift.x) + 'px';
        window.data.adFormAddress.value = (window.data.mainPin.offsetLeft - shift.x
          + Math.round(window.data.WIDTH_MAIN_PIN / 2)) + ','
          + (window.data.mainPin.offsetTop - shift.y + window.data.HEIGHT_MAIN_PIN);
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      window.data.map.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      window.data.adFormAddress.value = (parseInt(window.data.mainPin.style.left, 10)
        + Math.round(window.data.WIDTH_MAIN_PIN / 2)) + ','
        + (parseInt(window.data.mainPin.style.top, 10) + window.data.HEIGHT_MAIN_PIN);
    };

    window.data.map.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    showMap();
    window.adForm.show();
  });

  window.data.map.addEventListener('click', function (evt) {
    var target = evt.target;
    var onDocumentKeydown = function (evtCard) {
      if (evtCard.keyCode === window.data.ESC_KEYCODE) {
        window.card.current.style.display = 'none';
        document.removeEventListener('keydown', onDocumentKeydown);
      }
    };

    while (target !== window.data.map) {
      if (target.hasAttribute('data--pin-index')) {
        currentPin.classList.remove('map__pin--active');
        currentPin = target;
        currentPin.classList.add('map__pin--active');
        window.card.current.style.display = 'block';
        window.card.create(window.filtersForm.filtersBuildings, parseInt(target.dataset.PinIndex, 10));
        window.card.show();
        window.card.current.remove();
        window.card.current = window.data.map.querySelector('.map__card');
        window.card.cardClose = window.data.map.querySelector('.popup__close');
        window.card.cardClose.addEventListener('click', function () {
          window.card.current.style.display = 'none';
        });
        document.addEventListener('keydown', onDocumentKeydown);
        window.data.adFormAddress.value = window.card.current.querySelector('.popup__text--address').innerHTML;
      }
      target = target.parentNode;
    }
  });

  window.map = {
    hide: hideMap
  };
})();
