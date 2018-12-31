'use strict';

(function () {
  var PATH_AVATAR_IMGS = 'img/avatars/';
  var MIN_PRICE = 1000;
  var MAX_PRICE = 1000000;
  var MIN_ROOMS = 1;
  var MAX_ROOMS = 5;
  var MIN_GUESTS = 0;
  var MAX_GUESTS = 100;

  var pinX = window.utils.getRandomInt(MIN_LOCATION_X, MAX_LOCATION_X);
  var pinY = window.utils.getRandomInt(MIN_LOCATION_Y, MAX_LOCATION_Y);
  var Author = function (i) {
    this.avatar = PATH_AVATAR_IMGS + avatarImgs[i].toString();
  };
  var Offer = function (i) {
    this.title = titles[i];
    this.address = (pinX + Math.round(-mainPin.offsetWidth / 2)).toString() + ', ' + (pinY + HEIGHT_MAIN_PIN).toString();
    this.price = window.utils.getRandomInt(MIN_PRICE, MAX_PRICE);
    this.type = window.utils.getRandomData(types);
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
    this.x = pinX + Math.round(-mainPin.offsetWidth / 2);
    this.y = pinY + HEIGHT_MAIN_PIN;
  };
  var Building = function (i) {
    pinX = window.utils.getRandomInt(MIN_LOCATION_X, MAX_LOCATION_X);
    pinY = window.utils.getRandomInt(MIN_LOCATION_Y, MAX_LOCATION_Y);
    this.author = new Author(i);
    this.offer = new Offer(i);
    this.location = new Location();
  };

  window.data = {

  };
})();
