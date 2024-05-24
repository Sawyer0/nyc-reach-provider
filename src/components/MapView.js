import "../styles/styles.css";
import { useEffect, useRef, useMemo } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const MapView = ({
  providers,
  searchAttribute,
  searchTerm,
  isSearchSubmitted,
  setIsSearchSubmitted,
}) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const popupRef = useRef(
    new mapboxgl.Popup({ offset: 15, closeButton: false, closeOnClick: false })
  );

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

  const memoizedBounds = useMemo(() => {
    const bounds = new mapboxgl.LngLatBounds();
    providers.forEach((provider) => {
      if (provider.longitude && provider.latitude) {
        bounds.extend([provider.longitude, provider.latitude]);
      }
    });
    return bounds;
  }, [providers]);

  useEffect(() => {
    if (!mapRef.current || providers.length === 0) return;

    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    providers.forEach((provider) => {
      if (provider.longitude && provider.latitude) {
        const el = document.createElement("div");
        el.className = "marker";

        const marker = new mapboxgl.Marker(el, { anchor: "bottom" })
          .setLngLat([provider.longitude, provider.latitude])
          .addTo(mapRef.current);

        marker.getElement().addEventListener("mouseenter", () => {
          popupRef.current
            .setLngLat([provider.longitude, provider.latitude])
            .setHTML(
              `<h3>${provider.practice_name}</h3><p>${provider.practice_mailing_address}</p>`
            )
            .addTo(mapRef.current);
        });

        marker.getElement().addEventListener("mouseleave", () => {
          popupRef.current.remove();
        });

        markersRef.current.push(marker);
      }
    });

    if (!memoizedBounds.isEmpty()) {
      mapRef.current.fitBounds(memoizedBounds, { padding: 50 });
    }
  }, [providers, memoizedBounds]);

  return (
    <div
      className="map-container"
      ref={mapContainerRef}
      style={{ height: "100vh" }}
    />
  );
};

export default MapView;
