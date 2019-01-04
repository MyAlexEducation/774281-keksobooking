'use strict';

(function () {
  var currentPin = window.data.mainPin;

  var showMap = function () {
    window.data.map.classList.remove('map--faded');
  };
  var hideMap = function () {
    window.data.map.classList.add('map--faded');
    window.data.mainPin.style.left = '570px';
    window.data.mainPin.style.top = '375px';
  };

  window.data.mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    if (window.data.map.classList.contains('map--faded')) {
      window.backend.buildingsLoad(function (loadBuildings) {
        window.data.buildings = loadBuildings;
      });
      window.filtersForm.filtersBuildings = window.data.buildings;
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
    window.adForm.showAdForm();
    window.pins.showPins(window.filtersForm.filtersBuildings);
  });

  window.data.map.addEventListener('click', function (evt) {
    var target = evt.target;

    while (target !== window.data.map) {
      if (target.hasAttribute('data--pin-index')) {
        currentPin.classList.remove('map__pin--active');
        currentPin = target;
        currentPin.classList.add('map__pin--active');
        window.card.createCards(window.filtersForm.filtersBuildings, parseInt(target.dataset.PinIndex, 10));
        window.card.showCards();
        window.card.currentCard.remove();
        window.card.currentCard = window.data.map.querySelector('.map__card');
        window.card.cardClose = window.data.map.querySelector('.popup__close');
        window.card.cardClose.addEventListener('click', function () {
          window.card.currentCard.style.display = 'none';
        });
        window.data.adFormAddress.value = window.card.currentCard.querySelector('.popup__text--address').innerHTML;
      }
      target = target.parentNode;
    }
  });

  window.map = {
    hideMap: hideMap
  };
})();
