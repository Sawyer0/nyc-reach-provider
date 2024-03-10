import "../styles/styles.css";
import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { fetchProviders } from "../services/providerService";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const MapView = ({ providers, searchAttribute, searchTerm, isSearchSubmitted, setIsSearchSubmitted }) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const popupRef = useRef(new mapboxgl.Popup({ offset: 15, closeButton: false, closeOnClick: false }));

  useEffect(() => {
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-74.006, 40.7128],
      zoom: 12,
    });

    const popup = popupRef.current;

    return () => {
      markersRef.current.forEach((marker) => marker.remove());
      popup.remove();
      mapRef.current?.remove();
    };
  }, []);

  useEffect(() => {
    if (providers && isSearchSubmitted && searchAttribute && searchTerm) {
      fetchProviders(searchAttribute, searchTerm).then(newProviders => {
        providers(newProviders);
        setIsSearchSubmitted(false);
      }).catch(error => {
        console.error('Error fetching providers:', error);
      });
    }
  }, [providers, searchAttribute, searchTerm, isSearchSubmitted, setIsSearchSubmitted]);

  useEffect(() => {
    if (!mapRef.current || providers.length === 0) return;

    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    const bounds = new mapboxgl.LngLatBounds();

    providers.forEach((provider) => {
      if (provider.longitude && provider.latitude) {
        bounds.extend([provider.longitude, provider.latitude]);
        const el = document.createElement("div");
        el.className = "marker";

        const marker = new mapboxgl.Marker(el, { anchor: "bottom" })
          .setLngLat([provider.longitude, provider.latitude])
          .addTo(mapRef.current);

        marker.getElement().addEventListener('mouseenter', () => {
          popupRef.current.setLngLat([provider.longitude, provider.latitude])
            .setHTML(`<h3>${provider.practice_name}</h3><p>${provider.practice_mailing_address}</p>`)
            .addTo(mapRef.current);
        });

        marker.getElement().addEventListener('mouseleave', () => {
          popupRef.current.remove();
        });

        markersRef.current.push(marker);
      }
    });

    if (bounds.isEmpty() === false) {
      mapRef.current.fitBounds(bounds, { padding: 50 });
    }
  }, [providers]);

  return (
    <div
      className="map-container"
      ref={mapContainerRef}
      style={{ height: "100vh" }}
    />
  );
};

export default MapView;
