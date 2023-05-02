import {validatIp} from './helpers'

const ipInput = document.querySelector('.search-bar__input')
const btn = document.querySelector('.search-bar__btn')
const ipInfo = document.querySelector('#ip')
const locationInfo = document.querySelector('#location')
const timezoneInfo = document.querySelector('#timezone')
const ispInfo = document.querySelector('#isp')
const map = document.querySelector('#map')

let maps
let myGeoObject

btn.addEventListener('click', getData)

ipInput.addEventListener('keydown', headleKey)

function getData() {
    if(validatIp(ipInput.value)) {
        fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_73pMXJDR7CorsCxUElLBRrIALgVqH&ipAddress=${ipInput.value}`)
            .then(response => response.json())
            .then(data => setInfo(data))
    }
}

function headleKey(event) {
    if(event.key === 'Enter') {
        getData()
    }
}

function setInfo(mapData) {
    let lat = mapData.location.lat
    let lng = mapData.location.lng
    let coord = [lat, lng]
    
    ipInfo.textContent = mapData.ip;
    locationInfo.textContent = `${mapData.location.country} ${mapData.location.region}`
    timezoneInfo.textContent = `UTC ${mapData.location.timezone}`
    ispInfo.textContent = mapData.isp

    if (maps) {
        ymaps.ready(function() {
            maps.destroy()
        })
    }
    ymaps.ready(function () {
        maps = new ymaps.Map("map", {
                center: coord,
                zoom: 15
            }, {
                searchControlProvider: 'yandex#search'
        });
    
        myGeoObject = new ymaps.Placemark(coord);
        maps.geoObjects.add(myGeoObject)    
    });
}


// Yandex map default

ymaps.ready(init);

function init() {
    let coords = [55.746998, 37.595761];
    maps = new ymaps.Map("map", {
            center: coords,
            zoom: 12
        }, {
            searchControlProvider: 'yandex#search'
    });

    myGeoObject = new ymaps.Placemark(coords);
    
    maps.geoObjects
        .add(myGeoObject)       
}

