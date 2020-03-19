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

  componentDidUpdate() {
    this.addMarkersToMap();
  }

  componentWillUnmount() {
    this.destroyMap();
  }

  initMap() {
    const mapElement = this.mapRef.current;

    const city = [52.38333, 4.9];
    const zoom = 12;

    if (mapElement) {
      this.map = leaflet.map(mapElement, {
        center: city,
        zoom,
        zoomControl: false,
        marker: true
      });

      this.map.setView(city, zoom);

      this.addTileLayerToMap();
      this.addMarkersToMap();
    }
  }

  addTileLayerToMap() {
    leaflet
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
      })
      .addTo(this.map);
  }

  addMarkersToMap() {
    const icon = leaflet.icon({
      iconUrl: MapPinIcon.URL,
      iconSize: MapPinIcon.SIZE,
    });

    if (this.markers) {
      this.markers.forEach((marker) => {
        this.map.removeLayer(marker);
      });
    }

    this.markers = this.props.coords.map((coord) => (leaflet
      .marker(coord, {icon})
      .addTo(this.map)
    ));
  }

  destroyMap() {
    this.map.remove();

    this.map = null;
    this.markers = null;
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
