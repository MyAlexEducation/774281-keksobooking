'use strict';

(function () {
  var avatarImgs = ['user01.png', 'user02.png', 'user03.png', 'user04.png', 'user05.png', 'user06.png', 'user07.png', 'user08.png'];
  var titles = ['Большая уютная квартира', 'Маленькая неуютная квартира',
    'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик',
    'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var checkin = ['12:00', '13:00', '14:00'];
  var checkout = ['12:00', '13:00', '14:00'];
  var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

  var NUMBER_ADS = 8;
  var PATH_AVATAR_IMGS = 'img/avatars/';
  var MIN_PRICE = 1000;
  var MAX_PRICE = 1000000;
  var MIN_ROOMS = 1;
  var MAX_ROOMS = 5;
  var MIN_GUESTS = 0;
  var MAX_GUESTS = 100;

  var pinX = window.utils.getRandomInt(window.data.MIN_LOCATION_X, window.data.MAX_LOCATION_X);
  var pinY = window.utils.getRandomInt(window.data.MIN_LOCATION_Y, window.data.MAX_LOCATION_Y);
  var Author = function (i) {
    this.avatar = PATH_AVATAR_IMGS + avatarImgs[i].toString();
  };
  var Offer = function (i) {
    this.title = titles[i];
    this.address = (pinX + Math.round(-window.data.mainPin.offsetWidth / 2)).toString() + ', ' + (pinY + window.data.HEIGHT_MAIN_PIN).toString();
    this.price = window.utils.getRandomInt(MIN_PRICE, MAX_PRICE);
    this.type = window.utils.getRandomData(window.data.types);
    this.rooms = window.utils.getRandomInt(MIN_ROOMS, MAX_ROOMS);
    this.guests = window.utils.getRandomInt(MIN_GUESTS, MAX_GUESTS);
    this.checkin = window.utils.getRandomData(checkin);
    this.checkout = window.utils.getRandomData(checkout);
    this.features = [];
    for (var j = 0; j < features.length; j++) {
      if (window.utils.getRandomInt(0, 1)) {
        this.features.push(features[j]);
      }
    }
    this.description = '';
    this.photos = photos;
  };
  var Location = function () {
    this.x = pinX + Math.round(-window.data.mainPin.offsetWidth / 2);
    this.y = pinY + window.data.HEIGHT_MAIN_PIN;
  };
  var Building = function (i) {
    pinX = window.utils.getRandomInt(window.data.MIN_LOCATION_X, window.data.MAX_LOCATION_X);
    pinY = window.utils.getRandomInt(window.data.MIN_LOCATION_Y, window.data.MAX_LOCATION_Y);
    this.author = new Author(i);
    this.offer = new Offer(i);
    this.location = new Location();
  };

  window.utils.fillArray(window.data.buildings, Building, NUMBER_ADS);

  window.mock = {

  };
})();
