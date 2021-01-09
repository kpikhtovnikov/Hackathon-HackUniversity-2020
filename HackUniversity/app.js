
const url = 'http://84.201.186.137:8000/api/wheel';

var position = {
    lat: 59.9501,
    lng: 30.3165
}
 
function addMarkerToGroup(group, coordinate, html) {
    var marker = new H.map.Marker(coordinate);
    // add custom data to the marker
    marker.setData(html);
    group.addObject(marker);
  }

//
function addInfoBubbleKrestIsland(map, deleteFlag) {
    
    var group = new H.map.Group();
    map.addObject(group);
      group.addEventListener('tap', function (evt) {
      
      var bubble =  new H.ui.InfoBubble(evt.target.getGeometry(), {
        content: evt.target.getData()
      });
      ui.addBubble(bubble);
    }, false);
  
    addMarkerToGroup(group, {lat:59.9714, lng: 30.2304},
      '<div><p>Легкоатлетический манеж</p>');

      addMarkerToGroup(group, {lat:59.9697, lng:30.2458},
        '<div><p>Воркаут площадка</p></div>');
    
      addMarkerToGroup(group, {lat:59.967, lng: 30.2424},
        '<div><p>Спорт площадка</p>');
       
     addMarkerToGroup(group, {lat:59.9748, lng: 30.2524},
        '<div><p>Спорт площадка</p>');

}


  function addInfoBubble1(map, deleteFlag) {
    
        var group = new H.map.Group();
  
        map.addObject(group);
      
        // add 'tap' event listener, that opens info bubble, to the group
        group.addEventListener('tap', function (evt) {
          // event target is the marker itself, group is a parent event target
          // for all objects that it contains
          var bubble =  new H.ui.InfoBubble(evt.target.getGeometry(), {
            // read custom data
            content: evt.target.getData()
          });
          // show info bubble
          ui.addBubble(bubble);
        }, false);
      
        addMarkerToGroup(group, {lat:59.9439, lng:30.3065},
          '<div><p>Стрелка Васильевского острова</p></div>');
      
        addMarkerToGroup(group, {lat:59.949, lng: 30.3273},
          '<div><p>Троицкий мост</p>');
  
  }




 // Initialize the platform object:
 var platform = new H.service.Platform({
    'apikey': '{f4NC-FkjBJD3E1nDf1rPQNiUzDugHQdwNZIUd0du5sY}'
  });

var defaultLayers = platform.createDefaultLayers();

// Instantiate (and display) a map object:
var map = new H.Map(
    document.getElementById('map'),
    defaultLayers.vector.normal.map,
    {
      zoom: 10,
      center: { lat: position.lat, lng: position.lng }
    });

    window.addEventListener('resize', () => map.getViewPort().resize());

//Step 3: make the map interactive
// MapEvents enables the event system
// Behavior implements default interactions for pan/zoom (also on mobile touch environments)
var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));


function setUpClickListener(map) {
   var marker = new H.map.Marker(position);
   map.addObject(marker);
      
    map.addEventListener('tap', function (evt) {
        map.removeObject(marker);
        var coord = map.screenToGeo(evt.currentPointer.viewportX,
              evt.currentPointer.viewportY);
              position.lat = Math.abs(coord.lat.toFixed(4));
              position.lng = Math.abs(coord.lng.toFixed(4));
              
              marker = new H.map.Marker(position);
              map.addObject(marker);
            
              if (position.lat > 59.9 && position.lat < 60.1  && position.lng >30.3 && position.lng< 30.6){
                  addInfoBubble1(map);
              }

              if (position.lat > 59.967 && position.lat < 59.98  && position.lng >30.21 && position.lng< 30.26){
                addInfoBubbleKrestIsland(map);
            }

              
             
              console.log(position);
             
    });
  }


  var ui = H.ui.UI.createDefault(map, defaultLayers);

  setUpClickListener(map);
  

 

  