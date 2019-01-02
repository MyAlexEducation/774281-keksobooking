'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var adFormRoomNumber = adForm.querySelector('#room_number');
  var adFormCapacity = adForm.querySelector('#capacity');
  var adFormType = adForm.querySelector('#type');
  var adFormPrice = adForm.querySelector('#price');
  var adFormTimeIn = adForm.querySelector('#timein');
  var adFormTimeOut = adForm.querySelector('#timeout');
  var adFormTitle = adForm.querySelector('#title');

  var popapSuccessAdForm = document.querySelector('#success').content.querySelector('.success');
  var popapErrorAdForm = document.querySelector('#error').content.querySelector('.error');

  var showAdForm = function () {
    adForm.classList.remove('ad-form--disabled');
  };
  var hideAdForm = function () {
    adForm.classList.add('ad-form--disabled');
  }

  var adFormCapacityInit = function () {
    adFormCapacity.options[0].disabled = true;
    adFormCapacity.options[1].disabled = true;
    adFormCapacity.options[2].selected = true;
    adFormCapacity.options[3].disabled = true;
  };
  var adFormPriceInit = function () {
    adFormPrice.min = 1000;
    adFormPrice.placeholder = '1000';
    adFormPrice.value = '';
  };
  var adFormTypeInit = function () {
    adFormType.options[1].selected = true;
  };
  var adFormTimeInit = function () {
    adFormTimeIn.options[0].selected = true;
    adFormTimeOut.options[0].selected = true;
  };
  var adFormAddressInit = function () {
    window.data.adFormAddress.value = window.data.WIDTH_MAP / 2 + ',' + window.data.HEIGHT_MAP / 2;
  };
  var adFormTitleInit = function () {
    adFormTitle.value = '';
  };

  var successUpLoadAdForm = function () {
    adFormAddressInit();
    adFormCapacityInit();
    adFormPriceInit();
    adFormTypeInit();
    adFormTimeInit();
    adFormTitleInit();
    hideAdForm();

    window.pins.deletePins();
    window.map.hideMap();

    document.querySelector('main').appendChild(popapSuccessAdForm);
  };

  var errorUpLoadAddForm = function () {
    document.querySelector('main').appendChild(popapErrorAdForm);
  };


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
      adFormCapacity.setCustomValidity('');
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

  adForm.addEventListener('submit', function (evt) {
    window.backend.adFormUpload(new FormData(adForm), successUpLoadAdForm, errorUpLoadAddForm);
    evt.preventDefault();
  });

  window.adForm = {
    showAdForm: showAdForm
  };
})();
