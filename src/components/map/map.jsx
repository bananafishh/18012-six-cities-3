import React, {PureComponent, createRef} from 'react';
import PropTypes from 'prop-types';
import leaflet from 'leaflet';

const MapPinIcon = {
  URL: `img/pin.svg`,
  URL_ACTIVE: `img/pin-active.svg`,
  SIZE: [27, 39],
};

class Map extends PureComponent {
  constructor(props) {
    super(props);

    this.mapRef = createRef();
  }

  componentDidMount() {
    this.initMap();
  }

  componentDidUpdate() {
    const center = this.getMapCenter();

    this.addMarkersToMap();
    this.map.flyTo(center);
  }

  componentWillUnmount() {
    this.destroyMap();
  }

  initMap() {
    const center = this.getMapCenter();
    const zoom = this.getMapZoom();

    const mapElement = this.mapRef.current;

    if (mapElement) {
      this.map = leaflet.map(mapElement, {
        center,
        zoom,
        zoomControl: false,
        marker: true
      });

      this.map.setView(center, zoom);

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
    const {
      offers,
      activeOfferId,
    } = this.props;

    if (this.markers) {
      this.markers.forEach((marker) => {
        this.map.removeLayer(marker);
      });
    }

    this.markers = offers.map(({id, location: {latitude, longitude}}) => {
      const icon = this.getMapPinIcon(id === activeOfferId);

      return leaflet
        .marker([latitude, longitude], {icon})
        .addTo(this.map);
    });
  }

  getMapCenter() {
    const {
      city: {
        location: {
          latitude,
          longitude,
        },
      },
    } = this.props.offers[0];

    return [latitude, longitude];
  }

  getMapZoom() {
    const {
      city: {
        location: {
          zoom,
        },
      },
    } = this.props.offers[0];

    return zoom;
  }

  getMapPinIcon(isIconActive) {
    return leaflet.icon({
      iconUrl: isIconActive ? MapPinIcon.URL_ACTIVE : MapPinIcon.URL,
      iconSize: MapPinIcon.SIZE,
    });
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
  offers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    city: PropTypes.shape({
      name: PropTypes.string,
      location: PropTypes.shape({
        latitude: PropTypes.number,
        longitude: PropTypes.number,
        zoom: PropTypes.number,
      }),
    }),
    location: PropTypes.shape({
      latitude: PropTypes.number,
      longitude: PropTypes.number,
      zoom: PropTypes.number,
    }),
  })).isRequired,
  activeOfferId: PropTypes.number,
};

export default Map;
