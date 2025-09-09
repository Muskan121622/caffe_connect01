import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { useEffect, useRef, useState } from "react";

const MapComponent = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();
  
  useEffect(() => {
    if (ref.current && !map) {
      // Default center location (New York City)
      const defaultCenter = { lat: 40.7128, lng: -74.0060 };
      
      setMap(new window.google.maps.Map(ref.current, {
        center: defaultCenter,
        zoom: 14,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        zoomControl: true,
        styles: [
          { 
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }]
          }
        ]
      }));
      
      // Add a marker for a sample cafe
      new window.google.maps.Marker({
        position: defaultCenter,
        map: map,
        title: "Sample Cafe",
      });
    }
  }, [map]);

  return (
    <div ref={ref} className="w-full h-64 rounded-lg overflow-hidden" style={{ minHeight: '12rem' }} />
  );
};

const GoogleMap = () => {
  // In a real app, you would get this from an environment variable
  // For now, we'll use a placeholder
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "YOUR_API_KEY_HERE";
  
  const render = (status: Status) => {
    switch (status) {
      case Status.LOADING:
        return <div className="w-full h-64 flex items-center justify-center">Loading map...</div>;
      case Status.FAILURE:
        return <div className="w-full h-64 flex items-center justify-center text-red-500">Failed to load map</div>;
      case Status.SUCCESS:
        return <MapComponent />;
      default:
        return null;
    }
  };

  // If no API key, show a placeholder
  if (apiKey === "YOUR_API_KEY_HERE") {
    return (
      <div className="w-full h-64 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center text-gray-500 dark:text-gray-400">
        <div className="text-center">
          <div className="text-4xl mb-2">🗺️</div>
          <p>Google Maps API key required</p>
          <p className="text-sm mt-1">Add your API key to .env file</p>
        </div>
      </div>
    );
  }

  return (
    <Wrapper apiKey={apiKey} render={render} />
  );
};

export default GoogleMap;
