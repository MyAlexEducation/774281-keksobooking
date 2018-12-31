'use strict';

(function () {
  var mapPinTemplateContainer = document.querySelector('#pin');
  var mapPinTemplate = mapPinTemplateContainer.content.querySelector('.map__pin');

  var pinsContainer = document.querySelector('.map__pins');

  var addLocationPin = function (pin, building) {
    pin.style.left = (building.location.x - Math.round(window.data.WIDTH_PIN / 2)).toString() + 'px';
    pin.style.top = (building.location.y - window.data.HEIGHT_PIN).toString() + 'px';
  };
  var addInfoPin = function (pin, building) {
    var imgPin = pin.querySelector('img');
    imgPin.src = building.author.avatar;
    imgPin.alt = building.offer.title;
  };

  var createPins = function (buildingsList) {
    for (var i = 0; i < buildingsList.length; i++) {
      var pinElement = mapPinTemplate.cloneNode(true);
      addLocationPin(pinElement, buildingsList[i]);
      addInfoPin(pinElement, buildingsList[i]);
      pinElement.dataset.PinIndex = i.toString();
      window.data.fragment.appendChild(pinElement);
    }
  };

  var showPins = function () {
    pinsContainer.appendChild(window.data.fragment);
  };

  createPins(window.data.buildings);

  window.pins = {
    showPins: showPins
  };
})();
