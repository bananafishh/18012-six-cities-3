import React, {PureComponent, createRef} from 'react';
import PropTypes from 'prop-types';
import leaflet from 'leaflet';

import {MapPinIcon} from '../../constants';

class Map extends PureComponent {
  constructor(props) {
    super(props);

    this.mapRef = createRef();
  }

  componentDidMount() {
    this.initMap();
  }

  initMap() {
    const mapElement = this.mapRef.current;

    const city = [52.38333, 4.9];
    const zoom = 12;

    if (mapElement) {
      const map = leaflet.map(mapElement, {
        center: city,
        zoom,
        zoomControl: false,
        marker: true
      });

      map.setView(city, zoom);

      this.addTileLayerTo(map);
      this.addMarkersTo(map);
    }
  }

  addTileLayerTo(map) {
    leaflet
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
      })
      .addTo(map);
  }

  addMarkersTo(map) {
    const icon = leaflet.icon({
      iconUrl: MapPinIcon.URL,
      iconSize: MapPinIcon.SIZE,
    });

    this.props.coords.forEach((coord) => {
      leaflet
        .marker(coord, {icon})
        .addTo(map);
    });
  }

  render() {
    return (
      <div ref={this.mapRef} style={{height: `100%`}}></div>
    );
  }
}

Map.propTypes = {
  coords: PropTypes.arrayOf(PropTypes.arrayOf(
      PropTypes.number
  )).isRequired,
};

export default Map;
