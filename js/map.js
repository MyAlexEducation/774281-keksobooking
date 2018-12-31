'use strict';

var SVG_AFTER_MAIN_PIN_HEIGHT = 15;

var fragment = document.createDocumentFragment();

var map = document.querySelector('.map');
var pinsContainer = document.querySelector('.map__pins');
var mapPinTemplateContainer = document.querySelector('#pin');
var mapPinTemplate = mapPinTemplateContainer.content.querySelector('.map__pin');
var mapFiltersContainer = document.querySelector('.map__filters-container');
var mainPin = document.querySelector('.map__pin--main');

var WIDTH_MAP = map.offsetWidth;
var HEIGHT_MAP = map.offsetHeight;
var WIDTH_PIN = 50; // как в случае тега template узнать размеры дочерних элементов? установка display не помогает.
var HEIGHT_PIN = 70;
var WIDTH_MAIN_PIN = mainPin.offsetWidth;
var HEIGHT_MAIN_PIN = mainPin.offsetHeight + SVG_AFTER_MAIN_PIN_HEIGHT;
var MIN_LOCATION_X = Math.round(-mainPin.offsetWidth / 2);
var MAX_LOCATION_X = WIDTH_MAP - mainPin.offsetWidth / 2;
var MIN_LOCATION_Y = 130 - HEIGHT_MAIN_PIN;
var MAX_LOCATION_Y = 630 - HEIGHT_MAIN_PIN;

var adForm = document.querySelector('.ad-form');
var adFormAddress = adForm.querySelector('#address');
var adFormRoomNumber = adForm.querySelector('#room_number');
var adFormCapacity = adForm.querySelector('#capacity');
var adFormType = adForm.querySelector('#type');
var adFormPrice = adForm.querySelector('#price');
var adFormTimeIn = adForm.querySelector('#timein');
var adFormTimeOut = adForm.querySelector('#timeout');

var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var currentCard = cardTemplate;
var cardClose = cardTemplate.querySelector('.popup__close');

var avatarImgs = ['user01.png', 'user02.png', 'user03.png', 'user04.png', 'user05.png', 'user06.png', 'user07.png', 'user08.png'];
var titles = ['Большая уютная квартира', 'Маленькая неуютная квартира',
  'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик',
  'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var types = ['palace', 'flat', 'house', 'bungalo'];
var checkin = ['12:00', '13:00', '14:00'];
var checkout = ['12:00', '13:00', '14:00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var buildings = [];


var addLocationPin = function (pin, building) {
  pin.style.left = (building.location.x - Math.round(WIDTH_PIN / 2)).toString() + 'px';
  pin.style.top = (building.location.y - HEIGHT_PIN).toString() + 'px';
};
var addInfoPin = function (pin, building) {
  var imgPin = pin.querySelector('img');
  imgPin.src = building.author.avatar;
  imgPin.alt = building.offer.title;
};
var addInfoCard = function (card, building) {
  var textTypes = ['Дворец', 'Квартира', 'Дом', 'Бунгало'];
  var indexType = 0;

  card.querySelector('.popup__title').textContent = building.offer.title;
  card.querySelector('.popup__text--address').textContent = building.offer.address;
  card.querySelector('.popup__text--price').textContent = building.offer.price + '₽/ночь';
  while (building.offer.type !== types[indexType] && indexType < textTypes.length) {
    indexType++;
  }
  card.querySelector('.popup__type').textContent = types[indexType];
  card.querySelector('.popup__text--capacity').textContent = building.offer.rooms + ' комнаты для ' + building.offer.guests + ' гостей';
  card.querySelector('.popup__text--time').textContent = 'Заезд после ' + building.offer.checkin + ', выезд до ' + building.offer.checkout;
  card.querySelector('.popup__features').textContent = '';
  for (var i = 0; i < building.offer.features.length; i++) {
    card.querySelector('.popup__features').textContent += building.offer.features[i];
  }
  card.querySelector('.popup__description').textContent = building.offer.description;
  var popupPhoto = card.querySelector('.popup__photo');
  for (i = 0; i < building.offer.photos.length; i++) {
    var img = popupPhoto.cloneNode(true);
    img.src = building.offer.photos[i];
    fragment.appendChild(img);
  }
  card.querySelector('.popup__photos').removeChild(popupPhoto);
  card.querySelector('.popup__photos').appendChild(fragment);
  card.querySelector('.popup__avatar').src = building.author.avatar;
};
var createPins = function (buildingsList) {
  for (var i = 0; i < buildingsList.length; i++) {
    var pinElement = mapPinTemplate.cloneNode(true);
    addLocationPin(pinElement, buildingsList[i]);
    addInfoPin(pinElement, buildingsList[i]);
    pinElement.dataset.PinIndex = i.toString();
    fragment.appendChild(pinElement);
  }
};
var createCards = function (buildingsList, index) {
  var cardElement = cardTemplate.cloneNode(true);
  addInfoCard(cardElement, buildingsList[index]);
  fragment.appendChild(cardElement);
};
var showMap = function () {
  map.classList.remove('map--faded');
};
var showPins = function () {
  pinsContainer.appendChild(fragment);
};
var showCards = function () {
  map.insertBefore(fragment, mapFiltersContainer);
};
var showAdForm = function () {
  adForm.classList.remove('ad-form--disabled');
};
var adFormCapacityInit = function () {
  adFormCapacity.options[0].disabled = true;
  adFormCapacity.options[1].disabled = true;
  adFormCapacity.options[2].selected = true;
  adFormCapacity.options[3].disabled = true;
};
var adFormPriceInit = function () {
  adFormPrice.min = 1000;
  adFormPrice.placeholder = '1000';
};
var adFormTypeInit = function () {
  adFormType.options[1].selected = true;
};
var adFormTimeInit = function () {
  adFormTimeIn.options[0].selected = true;
  adFormTimeOut.options[0].selected = true;
};
var adFormAddressInit = function () {
  adFormAddress.value = WIDTH_MAP / 2 + ',' + HEIGHT_MAP / 2;
};

window.utils.fillArray(buildings, Building, NUMBER_ADS);
createPins(buildings);

mainPin.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };
  var isCorrectCoords = function (x, y) {
    return (x >= MIN_LOCATION_X && x <= MAX_LOCATION_X) && (y >= MIN_LOCATION_Y && y <= MAX_LOCATION_Y);
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

    if (isCorrectCoords((mainPin.offsetLeft - shift.x), (mainPin.offsetTop - shift.y))) {
      mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
      mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
      adFormAddress.value = (mainPin.offsetLeft - shift.x + Math.round(WIDTH_MAIN_PIN / 2)) + ',' + (mainPin.offsetTop - shift.y + HEIGHT_MAIN_PIN);
    }
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    map.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
    adFormAddress.value = (parseInt(mainPin.style.left, 10) + Math.round(WIDTH_MAIN_PIN / 2)) + ',' + (parseInt(mainPin.style.top, 10) + HEIGHT_MAIN_PIN);
  };

  map.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);

  showMap();
  showAdForm();
  showPins();
});

map.addEventListener('click', function (evt) {
  var target = evt.target;
  while (target !== map) {
    if (target.hasAttribute('data--pin-index')) {
      createCards(buildings, parseInt(target.dataset.PinIndex, 10));
      showCards();
      currentCard.remove();
      currentCard = map.querySelector('.map__card');
      cardClose = map.querySelector('.popup__close');
      cardClose.addEventListener('click', function () {
        currentCard.style.display = 'none';
      });
      adFormAddress.value = currentCard.querySelector('.popup__text--address').innerHTML;
    }
    target = target.parentNode;
  }
});

adFormAddressInit();
adFormCapacityInit();
adFormPriceInit();
adFormTypeInit();
adFormTimeInit();
adFormRoomNumber.addEventListener('change', function () {
  if (adFormRoomNumber.options.selectedIndex === 0) {
    adFormCapacity.options[0].disabled = true;
    adFormCapacity.options[1].disabled = true;
    adFormCapacity.options[2].disabled = false;
    adFormCapacity.options[3].disabled = true;
  } else
  if (adFormRoomNumber.options.selectedIndex === 1) {
    adFormCapacity.options[0].disabled = true;
    adFormCapacity.options[1].disabled = false;
    adFormCapacity.options[2].disabled = false;
    adFormCapacity.options[3].disabled = true;
  } else
  if (adFormRoomNumber.options.selectedIndex === 2) {
    adFormCapacity.options[0].disabled = false;
    adFormCapacity.options[1].disabled = false;
    adFormCapacity.options[2].disabled = false;
    adFormCapacity.options[3].disabled = true;
  } else
  if (adFormRoomNumber.options.selectedIndex === 3) {
    adFormCapacity.options[0].disabled = true;
    adFormCapacity.options[1].disabled = true;
    adFormCapacity.options[2].disabled = true;
    adFormCapacity.options[3].disabled = false;
  }

  var indexSelected = adFormCapacity.options.selectedIndex;
  var selectCapacityOption = adFormCapacity.options[indexSelected];
  if ((selectCapacityOption.disabled)) {
    adFormCapacity.setCustomValidity('Неверное количество мест');
  } else {
    adFormCapacity.target.setCustomValidity('');
  }
});
adFormCapacity.addEventListener('change', function () {
  var indexSelected = adFormCapacity.options.selectedIndex;
  var selectCapacityOption = adFormCapacity.options[indexSelected];
  if (!(selectCapacityOption.disabled)) {
    adFormCapacity.setCustomValidity('');
  }
});

adFormType.addEventListener('change', function () {
  if (adFormType.options.selectedIndex === 0) {
    adFormPrice.min = 0;
    adFormPrice.placeholder = '0';
  } else
  if (adFormType.options.selectedIndex === 1) {
    adFormPrice.min = 1000;
    adFormPrice.placeholder = '1000';
  } else
  if (adFormType.options.selectedIndex === 2) {
    adFormPrice.min = 5000;
    adFormPrice.placeholder = '5000';
  } else
  if (adFormType.options.selectedIndex === 3) {
    adFormPrice.min = 10000;
    adFormPrice.placeholder = '10000';
  }
});

adFormTimeIn.addEventListener('change', function () {
  if (adFormTimeIn.options.selectedIndex === 0) {
    adFormTimeOut.options[0].selected = true;
  }
  if (adFormTimeIn.options.selectedIndex === 1) {
    adFormTimeOut.options[1].selected = true;
  }
  if (adFormTimeIn.options.selectedIndex === 2) {
    adFormTimeOut.options[2].selected = true;
  }
  if (adFormTimeIn.options.selectedIndex === 3) {
    adFormTimeOut.options[3].selected = true;
  }
});
adFormTimeOut.addEventListener('change', function () {
  if (adFormTimeOut.options.selectedIndex === 0) {
    adFormTimeIn.options[0].selected = true;
  }
  if (adFormTimeOut.options.selectedIndex === 1) {
    adFormTimeIn.options[1].selected = true;
  }
  if (adFormTimeOut.options.selectedIndex === 2) {
    adFormTimeIn.options[2].selected = true;
  }
  if (adFormTimeOut.options.selectedIndex === 3) {
    adFormTimeIn.options[3].selected = true;
  }
});
