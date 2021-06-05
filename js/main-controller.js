'use strict'

var gMap;

function onInit() {
    setPageByPref();
    createPlaces();
    createMarkers();
    renderPlaces();
}

function getPosition() {
    if (!navigator.geolocation) {
        alert("HTML5 Geolocation is not supported in your browser.");
        return;
    }
    navigator.geolocation.getCurrentPosition(showLocation, handleLocationError);
}

function showLocation(position) {
    initMap(position.coords.latitude, position.coords.longitude);
}

function handleLocationError(error) {
    var locationError = document.getElementById("locationError");
    switch (error.code) {
        case 0:
            locationError.innerHTML = "There was an error while retrieving your location: " + error.message;
            break;
        case 1:
            locationError.innerHTML = "The user didn't allow this page to retrieve a location.";
            break;
        case 2:
            locationError.innerHTML = "The browser was unable to determine your location: " + error.message;
            break;
        case 3:
            locationError.innerHTML = "The browser timed out before retrieving the location.";
            break;
    }
}

function initMap(lat, lng) {
    var elMap = document.querySelector('#map');
    var options = {
        center: { lat, lng },
        zoom: 16
    };
    gMap = new google.maps.Map(
        elMap,
        options
    );
        // if(gMarkers.length > 0) return
        createMarkers();  

    gMap.addListener("click", (mapsMouseEvent) => {
        var position = mapsMouseEvent.latLng.toJSON();
        var title = prompt('What is the name of this place?')
        var id = getRandomId()
        var place = {
            position,
            title,
            id,
        }
        addToPlaces(place);
        addMarker(position,title,id)
        renderPlaces();
    });
}

function addMarker(position , title , id){
    var marker = new google.maps.Marker({
        position,
        map : gMap,
        title,
    })
    addToMarkers(marker , id)
}

function renderPlaces() {
    var strHTML = gPlaces.map(place => {
        return `<tr>
                <td>${place.title}</td>
                <td>${place.position.lat}</td>
                <td>${place.position.lng}</td>
                <td><button onclick="onRemovePlace(${place.id})">Delete</button></td>
            </tr>
            `
    }).join('')
    document.querySelector('.locations-container').innerHTML = strHTML;
}



function onRemovePlace(placeId){
    removePlace(placeId);
    removeMarker(placeId);
    renderPlaces();
}

function setPageByPref() {
    var color = getPrefColor();
    document.querySelector('body').style.backgroundColor = color;
}

function onFormSubmit(ev) {
    ev.preventDefault();
    var name = document.querySelector('input[type=text]').value
    var color = document.querySelector('input[type=color]').value
    var birthdate = document.querySelector('input[type=date]').value
    var email = document.querySelector('input[type=email]').value
    var age = document.querySelector('input[type=range]').value
    var param = [name, color, birthdate, email, age];
    formSubmit(...param);
    var elInputs = document.querySelectorAll('form input');
    elInputs.forEach(input => input.value = '')
    setPageByPref();

}

function onSetAge(val) {
    document.querySelector('.age-value').innerText = val;
}

function moveToPage(link) {
    window.location.href = link
}

