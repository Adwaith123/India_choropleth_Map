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

      function style() {
        return {
          fillColor: "green",
          weight: 1,
          opacity: 1,
          color: "black",
          dashArray: "3",
          fillOpacity: 0.5,
          dashArray: 0,
        };
      }
      function onEachFeature2(feature, layer) {
        // does this feature have a property named popupContent?
        if (feature.properties && feature.properties.ADMIN) {
          layer.bindPopup(feature.properties.ADMIN);
        }
      }
      ////---countries-----
      L.geoJSON(countries, {
        style: style,
        onEachFeature: onEachFeature2,
      }).addTo(map);
    },
    function () {
      alert("Could not get your position");
    }
  );
