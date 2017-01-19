var helsinki = {
  lat: 60.192059,
  lng: 24.945831
};
var map;
var geoCoder;
var searchValue = document.querySelector('#location');


var form = document.querySelector('#searchForm');
form.addEventListener('submit', onSearch);

function onSearch (e) {
  e.preventDefault();
  console.log(searchValue);
  geoSearch(searchValue.value);
};

var geoSearch = (input) => {
  console.log(input);
  geoCoder = new google.maps.Geocoder();
  geoCoder.geocode({'address': input}, searchResult);
};

var searchResult = (result, res) => {
  // console.log(res);
  if(res === google.maps.GeocoderStatus.OK){
    console.log("Result: ", res);
    var cord = result[0].geometry.location;
    map.setCenter(cord);
  };

   var markerResult = new google.maps.Marker({
     position: cord,
     map: map,
     mapTypeId: 'roadmap'
   });
};


function initMap() {
  
  map = new google.maps.Map(document.querySelector('#map'), {
    zoom: 18,
    center: helsinki
    // mapTypeId: 'satellite'
  });

  var marker1 = new google.maps.Marker({
    position: helsinki,
    map: map,
  });



  console.log(map);

  var infoWindow = new google.maps.InfoWindow({
    map: map,
    mapTypeId: 'satellite'
  });
  // Try HTML5 geolocation.

  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
      'Error: The Geolocation service failed.' :
      'Error: Your browser doesn\'t support geolocation.');
  };

  var getLocation = () => {
    navigator.geolocation.getCurrentPosition(position => {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      var marker2 = new google.maps.Marker({
        position: pos,
        map: map
      });

      infoWindow.setPosition(pos);
      infoWindow.setContent('You are here');
      infoWindow.add
      map.setCenter(pos);
      map.setTilt(45);
    }, () => {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  }

  var myLocate = document.querySelector('#myLocate');

  myLocate.addEventListener('click',
    navigator.geolocation ? getLocation : handleLocationError(false, infoWindow, map.getCenter())
  );
}
