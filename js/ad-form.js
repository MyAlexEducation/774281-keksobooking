'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var adFormElements = adForm.elements;
  var adFormRoomNumber = adForm.querySelector('#room_number');
  var adFormCapacity = adForm.querySelector('#capacity');
  var adFormType = adForm.querySelector('#type');
  var adFormPrice = adForm.querySelector('#price');
  var adFormTimeIn = adForm.querySelector('#timein');
  var adFormTimeOut = adForm.querySelector('#timeout');
  var adFormTitle = adForm.querySelector('#title');
  var adFormResetButon = adForm.querySelector('.ad-form__reset');
  var adFormFeatures = adForm.querySelectorAll('input[name = features]');
  var adFormAvatarLoader = adForm.querySelector('#avatar');
  var afFormAvatarPreview = adForm.querySelector('.ad-form-header__preview img');
  var adFormPhotoLoader = adForm.querySelector('#images');
  var adFormPhotoContainer = adForm.querySelector('.ad-form__photo');

  var popapSuccessAdForm = document.querySelector('#success').content.querySelector('.success');
  var popapErrorAdForm = document.querySelector('#error').content.querySelector('.error');
  var popapErorAdFormClose = popapErrorAdForm.querySelector('.error__button');

  var showAdForm = function () {
    adForm.classList.remove('ad-form--disabled');
    adFormOpen();
  };
  var hideAdForm = function () {
    adForm.classList.add('ad-form--disabled');
    adFormClose();
  };

  var adFormClose = function () {
    Array.prototype.forEach.call(adFormElements, function (element) {
      element.disabled = true;
    });
  };
  var adFormOpen = function () {
    Array.prototype.forEach.call(adFormElements, function (element) {
      element.disabled = false;
    });
  };
  var adFormRoomNumberInit = function () {
    adFormRoomNumber.options[0].selected = true;
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
  var adFormFeatresInit = function () {
    adFormFeatures.forEach(function (feature) {
      feature.checked = false;
    });
  };
  var afFormAvatarPreviewInit = function () {
    afFormAvatarPreview.src = 'img/muffin-grey.svg';
  };
  var adFormPhotoContainerInit = function () {
    adFormPhotoContainer.innerHTML = '';
  };

  var adFormReset = function () {
    adFormAddressInit();
    adFormRoomNumberInit();
    adFormCapacityInit();
    adFormPriceInit();
    adFormTypeInit();
    adFormTimeInit();
    adFormTitleInit();
    adFormFeatresInit();
    hideAdForm();
    afFormAvatarPreviewInit();
    adFormPhotoContainerInit();

    window.pins.delete();
    window.map.hide();
    window.card.current.style.display = 'none';
  };

  var onDocumentClick = function () {
    if (document.contains(popapSuccessAdForm)) {
      popapSuccessAdForm.parentNode.removeChild(popapSuccessAdForm);
      document.removeEventListener('click', onDocumentClick);
    } else if (document.contains(popapErrorAdForm)) {
      popapErrorAdForm.parentNode.removeChild(popapErrorAdForm);
      document.removeEventListener('click', onDocumentClick);
    }
  };
  var onDocumentKeydown = function (evt) {
    if (evt.keyCode === window.data.ESC_KEYCODE && document.contains(popapSuccessAdForm)) {
      popapSuccessAdForm.parentNode.removeChild(popapSuccessAdForm);
      document.removeEventListener('keydown', onDocumentKeydown);
    } else if (evt.keyCode === window.data.ESC_KEYCODE && document.contains(popapErrorAdForm)) {
      popapErrorAdForm.parentNode.removeChild(popapErrorAdForm);
      document.removeEventListener('click', onDocumentKeydown);
    }
  };
  var onPopapErrorAdFormCloseClick = function () {
    if (document.contains(popapErrorAdForm)) {
      popapErrorAdForm.parentNode.removeChild(popapErrorAdForm);
      popapErorAdFormClose.removeEventListener('click', onPopapErrorAdFormCloseClick);
    }
  };
  var onPopapErrorAdFormCloseKeydown = function (evt) {
    if (evt.keyCode === window.data.ENTER_KEYCODE && document.contains(popapErrorAdForm)) {
      popapErrorAdForm.parentNode.removeChild(popapErrorAdForm);
      popapErorAdFormClose.removeEventListener('keydown', onPopapErrorAdFormCloseKeydown);
    }
  };

  var successUpLoadAdForm = function () {
    adFormReset();

    document.querySelector('main').appendChild(popapSuccessAdForm);
    document.addEventListener('click', onDocumentClick);
    document.addEventListener('keydown', onDocumentKeydown);
  };

  var errorUpLoadAddForm = function () {
    document.querySelector('main').appendChild(popapErrorAdForm);

    document.addEventListener('click', onDocumentClick);
    document.addEventListener('keydown', onDocumentKeydown);
    popapErorAdFormClose.addEventListener('click', onPopapErrorAdFormCloseClick);
    popapErorAdFormClose.addEventListener('keydown', onPopapErrorAdFormCloseKeydown);
  };


  adFormAddressInit();
  adFormCapacityInit();
  adFormPriceInit();
  adFormTypeInit();
  adFormTimeInit();
  adFormClose();
  adFormRoomNumber.addEventListener('change', function () {
    if (adFormRoomNumber.options.selectedIndex === 0) {
      adFormCapacity.options[0].disabled = true;
      adFormCapacity.options[1].disabled = true;
      adFormCapacity.options[2].disabled = false;
      adFormCapacity.options[3].disabled = true;
    } else if (adFormRoomNumber.options.selectedIndex === 1) {
      adFormCapacity.options[0].disabled = true;
      adFormCapacity.options[1].disabled = false;
      adFormCapacity.options[2].disabled = false;
      adFormCapacity.options[3].disabled = true;
    } else if (adFormRoomNumber.options.selectedIndex === 2) {
      adFormCapacity.options[0].disabled = false;
      adFormCapacity.options[1].disabled = false;
      adFormCapacity.options[2].disabled = false;
      adFormCapacity.options[3].disabled = true;
    } else if (adFormRoomNumber.options.selectedIndex === 3) {
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
    } else if (adFormType.options.selectedIndex === 1) {
      adFormPrice.min = 1000;
      adFormPrice.placeholder = '1000';
    } else if (adFormType.options.selectedIndex === 2) {
      adFormPrice.min = 5000;
      adFormPrice.placeholder = '5000';
    } else if (adFormType.options.selectedIndex === 3) {
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
    window.backend.LoadParametr.method = 'POST';
    window.backend.LoadParametr.url = 'https://js.dump.academy/keksobooking';
    window.backend.LoadParametr.data = new FormData(adForm);
    window.backend.load(successUpLoadAdForm, errorUpLoadAddForm);
    evt.preventDefault();
  });

  adFormResetButon.addEventListener('click', function () {
    adFormReset();
  });
  adFormResetButon.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.data.ENTER_KEYCODE) {
      adFormReset();
    }
  });

  adFormAvatarLoader.addEventListener('change', function () {
    var file = adFormAvatarLoader.files[0];
    var fileName = file.name.toLocaleLowerCase();

    var matches = window.data.IMAGE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        afFormAvatarPreview.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  });
  adFormPhotoLoader.addEventListener('change', function () {
    var file = adFormPhotoLoader.files[adFormPhotoLoader.files.length - 1];
    var fileName = file.name.toLocaleLowerCase();

    var matches = window.data.IMAGE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        var img = document.createElement('img');
        img.src = reader.result;
        adFormPhotoContainer.appendChild(img);
      });
      reader.readAsDataURL(file);
    }
  });

  window.adForm = {
    show: showAdForm
  };
})();
