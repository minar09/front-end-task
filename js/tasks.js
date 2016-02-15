var map;
$(document).ready(function(){
      map = new GMaps({
        el: '#map',
        lat: 37.7833,
        lng: 22.4167,
        zoom: 6
      });
      map2 = new GMaps({
        el: '#map2',
        lat: 37.7833,
        lng: 22.4167,
        zoom: 9
      });
      $('#search').click(function(e){
        e.preventDefault();
        GMaps.geocode({
          address: $('#first_name').val().trim(),
          callback: function(results, status){
            if(status=='OK'){
              var latlng = results[0].geometry.location;
              map.setCenter(latlng.lat(), latlng.lng());
              map.addMarker({
                lat: latlng.lat(),
                lng: latlng.lng()
              });
            }
          }
        });
        GMaps.geocode({
          address: $('#last_name').val().trim(),
          callback: function(results, status){
            if(status=='OK'){
              var latlng = results[0].geometry.location;
              map.setCenter(latlng.lat(), latlng.lng());
              map.addMarker({
                lat: latlng.lat(),
                lng: latlng.lng()
              });
            }
          }
        });
        GMaps.geocode({
          address: $('#first_name').val().trim(),
          callback: function(results, status){
            if(status=='OK'){
              var latlng = results[0].geometry.location;
              map2.setCenter(latlng.lat(), latlng.lng());
              map2.addMarker({
                lat: latlng.lat(),
                lng: latlng.lng(),
                title: 'A',
                infoWindow: {
                  content: '<h4>Location A</h4>'
                }
              });
              
              for(var i=1;i<=3;i++){
                  var mpoint = randomGeo(latlng,10000)
                  map2.addMarker({
                    lat: mpoint.latitude,
                    lng: mpoint.longitude,
                    title: 'A'+i,
                    infoWindow: {
                      content: '<h4>Location A'+i+'</h4>'
                    }
                  });
              }
            }
          }
        });
        GMaps.geocode({
          address: $('#last_name').val().trim(),
          callback: function(results, status){
            if(status=='OK'){
              var latlng = results[0].geometry.location;
              map2.setCenter(latlng.lat(), latlng.lng());
              map2.addMarker({
                lat: latlng.lat(),
                lng: latlng.lng(),
                title: 'B',
                infoWindow: {
                  content: '<h4>Location B</h4>'
                }
              });
                
              for(var i=1;i<=3;i++){
                  var mpoint = randomGeo(latlng,10000)
                  map2.addMarker({
                    lat: mpoint.latitude,
                    lng: mpoint.longitude2,
                    title: 'B'+i,
                    infoWindow: {
                      content: '<h4>Location B'+i+'</h4>'
                    }
                  });
              }
            }
          }
        });
      });
        
        $(document).keypress(function(e){
            if (e.which == 13){
                $("#search").trigger("click");
            }
        });
});

function randomGeo(center, radius) {
    var y0 = center.lat();
    var x0 = center.lng();
    var rd = radius / 111300; //about 111300 meters in one degree

    var u = Math.random();
    var v = Math.random();

    var w = rd * Math.sqrt(u);
    var t = 2 * Math.PI * v;
    var x = w * Math.cos(t);
    var y = w * Math.sin(t);

    //Adjust the x-coordinate for the shrinking of the east-west distances
    var xp = x / Math.cos(y0);

    var newlat = y + y0;
    var newlon = x + x0;
    var newlon2 = xp + x0;

    return {
        'latitude': newlat.toFixed(5),
        'longitude': newlon.toFixed(5),
        'longitude2': newlon2.toFixed(5)
    };
}