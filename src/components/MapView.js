import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "./MapView.css";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const MapView = ({ providers }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markersRef = useRef([]);

  useEffect(() => {
    if (!map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [-73.935242, 40.73061],
        zoom: 10,
      });
    }

    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    if (providers && providers.length > 0) {
      console.log("Providers for mapping:", providers);

      providers.forEach((provider) => {
        if (provider.longitude && provider.latitude) {
          const marker = new mapboxgl.Marker()
            .setLngLat([provider.longitude, provider.latitude])
            .setPopup(
              new mapboxgl.Popup({ offset: 25 }).setHTML(
                `<h3>${provider.practice_name || "Provider"}</h3>
                                     <p>${provider.practice_address || ""}</p>
                                     <p>${provider.practice_borough || ""}</p>`
              )
            )
            .addTo(map.current);

          markersRef.current.push(marker);
        }
      });

      if (markersRef.current.length > 0) {
        const bounds = new mapboxgl.LngLatBounds();
        providers.forEach((provider) => {
          if (provider.longitude && provider.latitude) {
            bounds.extend([provider.longitude, provider.latitude]);
          }
        });
        map.current.fitBounds(bounds, { padding: 50 });
      }
    }
  }, [providers]);

  return (
    <div className="map-container">
      <div ref={mapContainer} className="map" />
    </div>
  );
};

export default MapView;
