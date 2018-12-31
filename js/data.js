'use strict';

(function () {
  var fragment = document.createDocumentFragment();

  var buildings = [];
  var types = ['palace', 'flat', 'house', 'bungalo'];

  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');

  var WIDTH_PIN = 50; // как в случае тега template узнать размеры дочерних элементов? установка display не помогает.
  var HEIGHT_PIN = 70;
  var SVG_AFTER_MAIN_PIN_HEIGHT = 15;
  var WIDTH_MAIN_PIN = mainPin.offsetWidth;
  var HEIGHT_MAIN_PIN = mainPin.offsetHeight + SVG_AFTER_MAIN_PIN_HEIGHT;
  var WIDTH_MAP = map.offsetWidth;
  var HEIGHT_MAP = map.offsetHeight;
  var MIN_LOCATION_X = Math.round(-mainPin.offsetWidth / 2);
  var MAX_LOCATION_X = WIDTH_MAP - mainPin.offsetWidth / 2;
  var MIN_LOCATION_Y = 130 - HEIGHT_MAIN_PIN;
  var MAX_LOCATION_Y = 630 - HEIGHT_MAIN_PIN;

  window.data = {
    fragment: fragment,

    buildings: buildings,
    types: types,

    map: map,
    mainPin: mainPin,

    WIDTH_PIN: WIDTH_PIN,
    HEIGHT_PIN: HEIGHT_PIN,
    SVG_AFTER_MAIN_PIN_HEIGHT: SVG_AFTER_MAIN_PIN_HEIGHT,
    WIDTH_MAIN_PIN: WIDTH_MAIN_PIN,
    HEIGHT_MAIN_PIN: HEIGHT_MAIN_PIN,
    WIDTH_MAP: WIDTH_MAP,
    HEIGHT_MAP: HEIGHT_MAP,
    MIN_LOCATION_X: MIN_LOCATION_X,
    MAX_LOCATION_X: MAX_LOCATION_X,
    MIN_LOCATION_Y: MIN_LOCATION_Y,
    MAX_LOCATION_Y: MAX_LOCATION_Y
  };
})();
