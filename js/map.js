'use strict';

var NUMBER_ADS = 8;
var PATH_AVATAR_IMGS = 'img/avatars/';
var MIN_ADDRESS_X = 0;
var MAX_ADDRESS_X = 1000;
var MIN_ADDRESS_Y = 0;
var MAX_ADDRESS_Y = 1000;
var MIN_PRICE = 1000;
var MAX_PRICE = 1000000;
var MIN_ROOMS = 1;
var MAX_ROOMS = 5;
var MIN_GUESTS = 0;
var MAX_GUESTS = 100;
var MIN_LOCATION_X = 130;
var MAX_LOCATION_X = 630;
var MIN_LOCATION_Y = 130;
var MAX_LOCATION_Y = 630;

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

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};
var getRandomData = function (arrayData) {
  return arrayData[getRandomInt(0, arrayData.length)];
};
var fillArray = function (array, Fill, length) {
  for (var i = 0; i < length; i++) {
    array[i] = new Fill(i);
  }
};

var Author = function (i) {
  this.avatar = PATH_AVATAR_IMGS + avatarImgs[i].toString();
};
var Offer = function (i) {
  this.title = titles[i];
  this.address = getRandomInt(MIN_ADDRESS_X, MAX_ADDRESS_X).toString() + ', ' + getRandomInt(MIN_ADDRESS_Y, MAX_ADDRESS_Y).toString();
  this.price = getRandomInt(MIN_PRICE, MAX_PRICE);
  this.type = getRandomData(types);
  this.rooms = getRandomInt(MIN_ROOMS, MAX_ROOMS);
  this.guests = getRandomInt(MIN_GUESTS, MAX_GUESTS);
  this.checkin = getRandomData(checkin);
  this.checkout = getRandomData(checkout);
  this.features = [];
  for (var j = 0; j < features.length; j++) {
    if (getRandomInt(0, 1)) {
      this.features.push(features[j]);
    }
  }
  this.description = '';
  this.photos = photos;
};
var Location = function () {
  this.x = getRandomInt(MIN_LOCATION_X, MAX_LOCATION_X);
  this.y = getRandomInt(MIN_LOCATION_Y, MAX_LOCATION_Y);
};
var Building = function (i) {
  this.author = new Author(i);
  this.offer = new Offer(i);
  this.location = new Location();
};
var addLocationPin = function (pin, building) {
  pin.style.left = (building.location.x - WIDTH_PIN / 2).toString() + 'px';
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

fillArray(buildings, Building, NUMBER_ADS);
createPins(buildings);

mainPin.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
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

    mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
    mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
    adFormAddress.value = (mainPin.offsetTop - shift.y) + ',' + (mainPin.offsetLeft - shift.x);
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
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
