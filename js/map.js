'use strict';

var NUMBER_ADS = 8;
var NUMBER_CARDS = 1;
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
var WIDTH_MAIN_PIN = mainPin.offsetWidth;
var HEIGHT_MAIN_PIN = mainPin.offsetHeight;

var adForm = document.querySelector('.ad-form');
var adFormAddress = adForm.querySelector('#address');

var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

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
var createCards = function (buildingsList) {
  for (var i = 0; i < NUMBER_CARDS; i++) {
    var cardElement = cardTemplate.cloneNode(true);
    addInfoCard(cardElement, buildingsList[i]);
    fragment.appendChild(cardElement);
  }
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

fillArray(buildings, Building, NUMBER_ADS);

adFormAddress.value = WIDTH_MAP / 2 + ',' + HEIGHT_MAP / 2;
mainPin.addEventListener('mouseup', function () {
  showMap();
  showAdForm();
});

createPins(buildings);
showPins();

createCards(buildings);
showCards();
