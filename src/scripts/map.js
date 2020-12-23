export default class Map {
  constructor(data) {
    this.data = data.countries;
    this.countriesNumber = this.data.length;
  }

  renderMap(mode) {
    mapboxgl.accessToken =
      "pk.eyJ1IjoicGxhbnNoaWJhIiwiYSI6ImNrMWFtY3R6NTAwOHUzbXA1Y2h1ZnpqemsifQ.DcipLDMfbBNnNm4JNik_lQ";
    let map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/planshiba/ckivwniik48sq19pf1lljffa3",
    });

    let features = [];
    let dataList = [];
    let pointSize = "10px";
    let pointColor = "#941414";

    for (let i = 0; i < this.countriesNumber; i++) {
      let dataItem;
      if (mode === "deaths") {
        dataItem = this.data[i].deaths;
      } else if (mode === "recovered") {
        dataItem = this.data[i].recovered;
      } else {
        dataItem = this.data[i].cases;
      }
      dataList.push(dataItem);
    }

    let allData = dataList.reduce(function (sum, item) {
      return sum + item;
    });

    let medianNumber = allData / dataList.length;

    for (let i = 0; i < this.countriesNumber; i++) {
      let dataItem;
      if (mode === "deaths") {
        dataItem = this.data[i].deaths;
        pointColor = "#e7ba26";
      } else if (mode === "recovered") {
        dataItem = this.data[i].recovered;
        pointColor = "#017767";
      } else {
        dataItem = this.data[i].cases;
        pointColor = "#941414";
      }
      if (dataItem > medianNumber * 10) {
        pointSize = "45px";
      } else if (dataItem > medianNumber * 8) {
        pointSize = "40px";
      } else if (dataItem > medianNumber * 6) {
        pointSize = "35px";
      } else if (dataItem > medianNumber * 4) {
        pointSize = "30px";
      } else if (dataItem > medianNumber * 2) {
        pointSize = "25px";
      } else if (dataItem > medianNumber * 1) {
        pointSize = "20px";
      } else if (dataItem > medianNumber * 0.5) {
        pointSize = "15px";
      } else {
        pointSize = "10px";
      }

      let featuresItem = {
        type: "Feature",
        geometry: {
          type: "Point",
          size: pointSize,
          color: pointColor,
          coordinates: [
            this.data[i].countryInfo.long,
            this.data[i].countryInfo.lat,
          ],
        },
        properties: {
          title: this.data[i].country,
          value: `${mode}: ${dataItem}`,
        },
      };
      features.push(featuresItem);
    }

    let geojson = {
      type: "FeatureCollection",
      features: features,
    };

    geojson.features.forEach(function (marker) {
      var el = document.createElement("div");
      el.className = "marker";
      el.style.width = marker.geometry.size;
      el.style.height = marker.geometry.size;
      el.style.backgroundColor = marker.geometry.color;
      el.style.boxShadow = `0px 0px 5px 0px ${marker.geometry.color}`;

      new mapboxgl.Marker(el)
        .setLngLat(marker.geometry.coordinates)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }).setHTML(
            "<h3>" +
              marker.properties.title +
              "</h3><p>" +
              marker.properties.value +
              "</p>"
          )
        )
        .addTo(map);
    });
  }
}
