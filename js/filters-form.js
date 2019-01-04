'use strict';

(function () {
  var MAX_NUMBER_PINS = 5;
  var filtersBuildings = [];
  var rangePrice = {
    middle: {
      min: 10000,
      max: 50000
    },
    low: {
      min: 0,
      max: 10000
    },
    high: {
      min: 50000,
      max: Infinity
    },
    any: {
      min: 0,
      max: Infinity
    }
  };

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
    return filtersProperty.value === 'any' || filtersProperty.value === buildingProperty.toString();
  };
  var isBuildingPrice = function (buildingProperty) {
    return buildingProperty >= rangePrice[filtersHousingPrice.value].min
      && buildingProperty < rangePrice[filtersHousingPrice.value].max;
  };
  var isBuildingFeature = function (filtersFeature, buildingFeatures) {
    return !filtersFeature.checked || buildingFeatures.includes(filtersFeature.value);
  };
  var isFiltersBuilding = function (building) {
    return isBuildingProperty(filtersHousingType, building.offer.type)
      && isBuildingPrice(building.offer.price)
      && isBuildingProperty(filtersHousingRooms, building.offer.rooms)
      && isBuildingProperty(filtersHousingGuests, building.offer.guests)
      && isBuildingFeature(filtersHousingFeaturesWifi, building.offer.features)
      && isBuildingFeature(filtersHousingFeaturesDishwasher, building.offer.features)
      && isBuildingFeature(filtersHousingFeaturesParking, building.offer.features)
      && isBuildingFeature(filtersHousingFeaturesWasher, building.offer.features)
      && isBuildingFeature(filtersHousingFeaturesElevator, building.offer.features)
      && isBuildingFeature(filtersHousingFeaturesConditioner, building.offer.features);
  };

  filtersForm.addEventListener('change', function () {
    filtersBuildings = window.data.buildings;
    filtersBuildings = window.data.buildings.filter(isFiltersBuilding);
    if (filtersBuildings.length > 5) {
      filtersBuildings.length = 5;
    }
    console.log(filtersBuildings);
  });

  window.filtersForm = {
    filtersBuildings: filtersBuildings
  };
})();
