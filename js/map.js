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
var MIN_LOCATION_X = 130; // как получить размеры блока?
var MAX_LOCATION_X = 630;
var MIN_LOCATION_Y = 130;
var MAX_LOCATION_Y = 630;

var fragment = document.createDocumentFragment();
var map = document.querySelector('.map');
var mapPin = document.querySelector('#pin');

var avatarImgs = ['01.png', '02.png', '03.png', '04.png', '05.png', '06.png', '07.png', '08.png'];
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
  this.prise = getRandomInt(MIN_PRICE, MAX_PRICE);
  this.type = getRandomData(types);
  this.rooms = getRandomInt(MIN_ROOMS, MAX_ROOMS);
  this.guests = getRandomInt(MIN_GUESTS, MAX_GUESTS);
  this.checkin = getRandomData(checkin);
  this.checkout = getRandomData(checkout);
  this.features = '';
  for (var j = 0; j < features.length; j++) {
    if (getRandomInt(0, 1)) {
      this.features += features[j];
    }
  }
  this.description = '';
  this.photos = '';
  for (var j = 0; j < photos.length; j++) {
    this.photos += photos[j];
  }
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

fillArray(buildings, Building, NUMBER_ADS);
map.classList.remove('map--faded');
