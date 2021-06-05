'use strict';

var gPlaces;
var gMarkers = [];

function createPlaces(){
    gPlaces = loadFromStorage('placesDB');
    if(!gPlaces){
        gPlaces = [];
    }
}

function createMarkers(){
    gMarkers = [];
    gPlaces.forEach(place => {
        var marker = new google.maps.Marker({
            position : place.position,
            map : gMap,
            title : place.title
        });
        var id = place.id;
        addToMarkers(marker , id);
    })
}

function removeMarker(id){
    console.log(id);
    var markerObj = gMarkers.find(marker => +marker.id === id);
    var markerObjIdx = gMarkers.findIndex(marker => +marker.id === id);
    var marker = markerObj.marker;
    gMarkers.splice(markerObjIdx,1);
    marker.setMap(null);
}

function removePlace(placeId){
    var placeIdx = gPlaces.findIndex(place => place.id === placeId+'');
    gPlaces.splice(placeIdx,1);
    saveToStorage('placesDB',gPlaces)
}

function addToMarkers(marker , id){
    var markerObj = {
        marker,
        id,
    }
    gMarkers.push(markerObj);
}

function addToPlaces(place){
    gPlaces.push(place);
    saveToStorage('placesDB',gPlaces);
}