import React, {Component, createRef} from 'react';
import PropTypes from 'prop-types';
import leaflet from 'leaflet';

import {areArraysEqual} from '../../utils';
import {MapPinIcon} from '../../constants';

class Map extends Component {
  constructor(props) {
    super(props);

    this.mapRef = createRef();
  }

  componentDidMount() {
    this.initMap();
  }

  shouldComponentUpdate(nextProps) {
    const {
      offers,
      activeOfferId,
    } = this.props;

    const {
      offers: nextOffers,
      activeOfferId: nextActiveOfferId,
    } = nextProps;

    const offersId = offers.map((offer) => offer.id);
    const nextOffersId = nextOffers.map((offer) => offer.id);

    return !areArraysEqual(offersId, nextOffersId) || activeOfferId !== nextActiveOfferId;
  }

  componentDidUpdate() {
    this.addMarkersToMap();

    this.map.flyTo(this.props.center);
  }

  componentWillUnmount() {
    this.destroyMap();
  }

  initMap() {
    const {center} = this.props;

    const mapElement = this.mapRef.current;
    const zoom = 12;

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

    const getIcon = (isIconActive) => leaflet.icon({
      iconUrl: isIconActive ? MapPinIcon.URL_ACTIVE : MapPinIcon.URL,
      iconSize: MapPinIcon.SIZE,
    });

    if (this.markers) {
      this.markers.forEach((marker) => {
        this.map.removeLayer(marker);
      });
    }

    this.markers = offers.map((offer) => {
      const icon = getIcon(offer.id === activeOfferId);

      return leaflet
        .marker(offer.coords, {icon})
        .addTo(this.map);
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
    coords: PropTypes.arrayOf(PropTypes.number),
  })).isRequired,
  center: PropTypes.arrayOf(PropTypes.number).isRequired,
  activeOfferId: PropTypes.number,
};

export default Map;
