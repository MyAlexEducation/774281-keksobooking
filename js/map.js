'use strict';

var adForm = document.querySelector('.ad-form');
var adFormAddress = adForm.querySelector('#address');
var adFormRoomNumber = adForm.querySelector('#room_number');
var adFormCapacity = adForm.querySelector('#capacity');
var adFormType = adForm.querySelector('#type');
var adFormPrice = adForm.querySelector('#price');
var adFormTimeIn = adForm.querySelector('#timein');
var adFormTimeOut = adForm.querySelector('#timeout');

var showMap = function () {
  window.data.map.classList.remove('map--faded');
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
  adFormAddress.value = window.data.WIDTH_MAP / 2 + ',' + window.data.HEIGHT_MAP / 2;
};

window.data.mainPin.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

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
      adFormAddress.value = (window.data.mainPin.offsetLeft - shift.x
        + Math.round(window.data.WIDTH_MAIN_PIN / 2)) + ','
        + (window.data.mainPin.offsetTop - shift.y + window.data.HEIGHT_MAIN_PIN);
    }
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    window.data.map.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
    adFormAddress.value = (parseInt(window.data.mainPin.style.left, 10)
      + Math.round(window.data.WIDTH_MAIN_PIN / 2)) + ','
      + (parseInt(window.data.mainPin.style.top, 10) + window.data.HEIGHT_MAIN_PIN);
  };

  window.data.map.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);

  showMap();
  showAdForm();
  window.pins.showPins();
});

window.data.map.addEventListener('click', function (evt) {
  var target = evt.target;
  while (target !== window.data.map) {
    if (target.hasAttribute('data--pin-index')) {
      window.card.createCards(window.data.buildings, parseInt(target.dataset.PinIndex, 10));
      window.card.showCards();
      window.card.currentCard.remove();
      window.card.currentCard = window.data.map.querySelector('.map__card');
      window.card.cardClose = window.data.map.querySelector('.popup__close');
      window.card.cardClose.addEventListener('click', function () {
        window.card.currentCard.style.display = 'none';
      });
      adFormAddress.value = window.card.currentCard.querySelector('.popup__text--address').innerHTML;
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
