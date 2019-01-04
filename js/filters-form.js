'use strict';

(function () {
  var MAX_NUMBER_PINS = 5;
  var filtersBuildings = [];

  var filtersForm = document.querySelector('.map__filters');
  var filtersHousingType = filtersForm.querySelector('#housing-type');
  var filtersHousingPrice = filtersForm.querySelector('#housing-price');
  var filtersHousingRooms = filtersForm.querySelector('#housing-rooms');
  var filtersHousingGuests = filtersForm.querySelector('#housing-guests');
  var filtersHousingFeaturesWifi = filtersForm.querySelector('#filter-wifi');
  var filtersHousingFeaturesDishwasher = filtersForm.querySelector('#filter-dishwasher');
  var filtersHousingFeaturesParking = filtersForm.querySelector('#filter-parking');
  var filtersHousingFeaturesWasher = filtersForm.querySelector('#filter-washer');
  var filtersHousingFeaturesElevator = filtersForm.querySelector('#filter-elevator');
  var filtersHousingFeaturesConditioner = filtersForm.querySelector('#filter-conditioner');

  var isBuildingProperty = function (filtersProperty, buildingProperty) {
    return filtersProperty.value === 'any' || filtersProperty.value === buildingProperty;
  };
  var isBuildingFeature = function (filtersFeature, buildingFeatures) {
    return !filtersFeature.checked || buildingFeatures.includes(filtersFeature.value);
  };
  var isFiltersBuilding = function (building) {
    return isBuildingProperty(filtersHousingType, building.offer.type);
  };

  filtersForm.addEventListener('change', function () {
    filtersBuildings = window.data.buildings;
    filtersBuildings = window.data.buildings.filter(isFiltersBuilding);
  });

  window.filtersForm = {
    filtersBuildings: filtersBuildings
  };
})();
