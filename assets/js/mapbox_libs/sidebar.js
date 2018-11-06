L.mapbox.accessToken = 'pk.eyJ1IjoiYmxrLXNoZXJsb2NrIiwiYSI6ImNqbmFnZDZ6ejdvaDMza255dHRudzFlZWgifQ.OWDzc19DrC3xJKEaOglEIA';

// instantiate viewshed map
var viewshed = L.mapbox.map('viewshed', 'peterqliu.aaa01f1e', {
    minZoom: 0,
    maxZoom:0,
    zoomControl:false
})
.on('click', function(e) {
    console.log(e);
    setCenter([e.latlng.lng, e.latlng.lat]);
})

//disable map interaction
viewshed.dragging.disable();
viewshed.touchZoom.disable();
viewshed.doubleClickZoom.disable();
viewshed.scrollWheelZoom.disable();

//minimap marker lines
var iconx= L.divIcon({
  iconSize: [1500,1500],
  html:'<div class="dottedline"></div><div class="dottedline"></div>'
});

var markerx =
L.marker([0, 0], {icon: iconx})
    .addTo(viewshed);


//Filter UI
var imageAttributes = ['contrast','saturation','brightness'];
var webgl = document.getElementById('webgl');
var defaultValue = 100;
var inputElements = [];
imageAttributes.forEach(function(thing,i){
    inputElements[i] = new DraggableNumber(document.getElementById(thing),
        {
          min: 0,
          max: 200,
          dragThreshold: 5,
          changeCallback: function(){setFilter()}
        });
})

function setFilter(){
    var vals = (imageAttributes.map(function(attr){return document.getElementById(attr).value}))
    webgl.style.filter = 'contrast('+vals[0]+'%) saturate('+vals[1]+'%) brightness('+vals[2]+'%)'

}

function resetFilter(){
    inputElements.forEach(function(thing){
        thing.set(100)
    })
    webgl.style.filter = ''
}

var highlights =
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "Name": "Ayers Rock (Uluru)",
        "Position": "14.7341/-25.3493/131.0375/31.8413/36"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [131.0343,-25.3454]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "Name": "Mt. St. Helens",
        "Position": "13.2853/46.1988/-122.1921/128.38/36"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          -121.48827552795409,
          46.2029434011261
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "Name": "Santa Cruz Island",
        "Position": "#14.617/34.0701/-119.8965/170.5263/36"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          -119.90967750549315,
          34.06908486885084
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "Name": "Heiterwanger See, Austria",
        "Position": "13.2777/47.4467/10.7927/51.1841/36"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [10.7927,47.4467]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "marker-color": "#7e7e7e",
        "Name": "Mt. Taranaki, New Zealand",
        "Position": "13.0795/-39.2629/174.0233/92.5263/36"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          174.06463623046875,
          -39.296247512702465
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "marker-color": "#7e7e7e",
        "Name": "Glacier Grey",
        "Position": "13.3341/-50.3948/-73.2052/43.3254/31.2584"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          -73.49853515625,
          -50.20503326494332
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "Name": "Lubango escarpment, Angola",
        "Position": "12.3192/-15.0757/13.1664/16.8741/36"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          13.2275390625,
          -15.093339268117337
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "Name": "Grand Canyon",
        "Position": "13.4682/36.3871/-112.6445/18.0142/30.5289"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          -112.43820190429688,
          36.20660692859011
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "Name": "Løkvollen, Norway",
        "Position": "13.2701/69.4934/20.7319/-158.7079/30.2736"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          20.582199096679688,
          69.5227504344807
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "Name": "Machhapuchare Base Camp, Nepal",
        "Position": "13.2999/28.5318/83.9103/34.0697/25.7872"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          83.90936851501465,
          28.52526502198749
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "Name": "Quillota, Chile",
        "Position": "14.5487/-32.8473/-71.2623/39.7895/36"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [-71.2623,-32.8473]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "Name": "Morocco",
        "Position": "13.3645/31.1323/-7.7748/168.7411/29.0699"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [-7.7748,31.1323]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "Name": "Pyrenees",
        "Position": "13.0427/42.825/0.1251/-40.133/25.0578"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [0.1266,42.826]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "Name": "Japanese countryside",
        "Position": "13.4119/35.876/137.4547/-42.6414/22.8693"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [137.4547,35.876]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "Name": "Hong Kong",
        "Position": "14.2494/22.2572/114.1802/35.7148/36"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [114.1802,22.2572]
      }
    }
  ]
}
var locations = viewshed.featureLayer.setGeoJSON(highlights)

// Add each point as a divIcon and bind a popup to it.
locations.eachLayer(function(l) {
    var props = l.feature.properties;
    var m = L.divIcon({
        className: 'count-icon',
        iconSize: [14,14],
        html:'<div></div>'
    });

    l.setIcon(m);
});

var caption = document.getElementById('caption');
// Optionally show tooltips on hover
locations.on('mouseover', function(e) {
    caption.innerText = e.layer.feature.properties.Name
})
.on('mouseout', function(e) {
    caption.innerText = ''
})
.on('click', function(e){
    setView(controls, e.layer.feature.properties.Position)
    console.log(e);
    console.log(e.layer.feature.properties.Position);
    //setCenter(e.layer.feature.geometry.coordinates)
    window.setTimeout(function(){updateCompass()},100);
});


viewshed.setView([28,0], 0)

//initial view
setView(controls, "13.2701/69.4934/20.7319/-158.7079/30.2736");
window.setTimeout(function(){updateCompass()},100);
