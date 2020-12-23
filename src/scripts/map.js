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
    let arrOfCases = [];
    let pointSize;
    let color = '#941414';
    if(mode === 'deaths'){color = '#e7ba26';} else if(mode === 'recovered'){
      color = '#017767';
    } else {color = '#941414'};
    for(let i = 0; i < this.countriesNumber; i++){
      let cas = this.data[i].cases;
      arrOfCases.push(cas);
    }

    let sum = arrOfCases.reduce(function(previousValue, currentValue) {
      return previousValue + currentValue;
    });
    let mid = sum/arrOfCases.length;

    for(let i = 0; i < this.countriesNumber; i++){
      if(this.data[i].cases > mid*10){
        pointSize = '45px';
      } else if (this.data[i].cases > mid*8){
        pointSize = '40px';
      } else if (this.data[i].cases > mid*6){
        pointSize = '35px';
      } else if (this.data[i].cases > mid*4){
        pointSize = '30px';
      } else if (this.data[i].cases > mid*2){
        pointSize = '25px';
      } else if (this.data[i].cases > mid*1){
        pointSize = '20px';
      } else if (this.data[i].cases > mid*0.5){
        pointSize = '15px';
      } else {
        pointSize = '10px';
      };
      
      let obj = {
        type: "Feature",
        geometry: {
          type: "Point",
          size: pointSize,
          coordinates: [this.data[i].countryInfo.long, this.data[i].countryInfo.lat],
        },
        properties: {
          title: this.data[i].country,
          description: `Cases: ${this.data[i].cases}`,
        },
      };
      features.push(obj);
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
      el.style.backgroundColor = color;
      el.style.boxShadow = `0px 0px 5px 0px ${color}`;

      new mapboxgl.Marker(el)
      .setLngLat(marker.geometry.coordinates)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }).setHTML(
            "<h3>" +
              marker.properties.title +
              "</h3><p>" +
              marker.properties.description +
              "</p>"
          )
        )
        .addTo(map);
    });

  }

  showLong() {
    alert(this.data.countries[10].countryInfo.long);
  }
}
