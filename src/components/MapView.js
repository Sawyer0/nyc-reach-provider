import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const MapView = ({ providers }) => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-74.006, 40.7128],
      zoom: 12,
    });

    providers.forEach((provider) => {
      new mapboxgl.Marker()
        .setLngLat([provider.longitude, provider.latitude])
        .setPopup(
          new mapboxgl.Popup({ offset: 30 }).setHTML(
            `<h3>${provider.practice_name}</h3><p>${provider.practice_mailing_address}</p>`
          )
        )
        .addTo(map);
    });

    return () => map.remove();
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
