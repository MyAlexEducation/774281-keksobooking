'use strict';

(function () {
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var currentCard = cardTemplate;
  var cardClose = cardTemplate.querySelector('.popup__close');

  var addInfoCard = function (card, building) {
    var textTypes = ['Дворец', 'Квартира', 'Дом', 'Бунгало'];
    var indexType = 0;

    card.querySelector('.popup__title').textContent = building.offer.title;
    card.querySelector('.popup__text--address').textContent = building.offer.address;
    card.querySelector('.popup__text--price').textContent = building.offer.price + '₽/ночь';
    while (building.offer.type !== window.data.types[indexType] && indexType < textTypes.length) {
      indexType++;
    }
    card.querySelector('.popup__type').textContent = textTypes[indexType];
    card.querySelector('.popup__text--capacity').textContent = building.offer.rooms + ' комнаты для ' + building.offer.guests + ' гостей';
    card.querySelector('.popup__text--time').textContent = 'Заезд после ' + building.offer.checkin + ', выезд до ' + building.offer.checkout;
    card.querySelector('.popup__features').textContent = '';
    for (var i = 0; i < building.offer.features.length; i++) {
      var feature = document.createElement('li');
      feature.classList.add('popup__feature');
      feature.classList.add('popup__feature--' + building.offer.features[i]);
      window.data.fragment.appendChild(feature);
    }
    card.querySelector('.popup__features').appendChild(window.data.fragment);
    card.querySelector('.popup__description').textContent = building.offer.description;
    var popupPhoto = card.querySelector('.popup__photo');
    for (i = 0; i < building.offer.photos.length; i++) {
      var img = popupPhoto.cloneNode(true);
      img.src = building.offer.photos[i];
      window.data.fragment.appendChild(img);
    }
    card.querySelector('.popup__photos').removeChild(popupPhoto);
    card.querySelector('.popup__photos').appendChild(window.data.fragment);
    card.querySelector('.popup__avatar').src = building.author.avatar;
  };

  var createCards = function (buildingsList, index) {
    var cardElement = cardTemplate.cloneNode(true);
    addInfoCard(cardElement, buildingsList[index]);
    window.data.fragment.appendChild(cardElement);
  };

  var showCards = function () {
    window.data.map.insertBefore(window.data.fragment, window.data.mapFiltersContainer);
  };

  window.card = {
    currentCard: currentCard,
    cardClose: cardClose,
    createCards: createCards,
    showCards: showCards,
  };
})();
