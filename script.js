"use strict";

if (navigator.geolocation)
  // Usig two functionn(sucess,error)
  navigator.geolocation.getCurrentPosition(
    function (position) {
      const { latitude } = position.coords; // destructuring based on latitudes property of coords
      const { longitude } = position.coords;
      //   console.log(latitude, longitude);
      //   console.log(position);

      const coords = [latitude, longitude];
      ///////////------------Leaft-let oveview COde-----------------
      const map = L.map("map").setView(coords, 7); // maps refers to an id named map

      L.tileLayer(
        "https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png",
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }
      ).addTo(map);
      var myStyle = {
        fillColor: "black",
        color: "#595959",
        weight: 3,
        opacity: 0.8,
      };

      function getColor(d) {
        return d > 1700
          ? "#800026"
          : d > 1500
          ? "#BD0026"
          : d > 1300
          ? "#E31A1C"
          : d > 1100
          ? "#FC4E2A"
          : d > 800
          ? "#FD8D3C"
          : d > 600
          ? "#FEB24C"
          : d > 300
          ? "#FED976"
          : "#FFEDA0";
      }
      function style(feature) {
        return {
          fillColor: getColor(feature.properties.density),
          weight: 2,
          opacity: 1,
          color: "white",
          dashArray: "3",
          fillOpacity: 0.7,
        };
      }
      function myStyle(feature) {
        return {
          fillColor: "black",
          weight: 2,
          opacity: 1,
          color: "white",
          dashArray: "3",
          fillOpacity: 0.7,
        };
      }
      function onEachFeature(feature, layer) {
        // does this feature have a property named popupContent?
        if (feature.properties && feature.properties.DISTRICT) {
          layer.bindPopup(feature.properties.DISTRICT);
        }
      }
      function onEachFeature1(feature, layer) {
        // does this feature have a property named popupContent?
        if (feature.properties && feature.properties.NAME_1) {
          layer.bindPopup(feature.properties.NAME_1);
        }
      }
      //-----------Districts--------------
      L.geoJSON(districts, {
        onEachFeature: onEachFeature,
        style: style,
      }).addTo(map);

      ////---States-----
      L.geoJSON(states, {
        style: myStyle,
        onEachFeature: onEachFeature1,
      }).addTo(map);
    },
    function () {
      alert("Could not get your position");
    }
  );
