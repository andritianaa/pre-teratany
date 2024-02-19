import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";
import React, { ReactNode } from "react";

type MapProps = {
  children?: ReactNode;
  className: string;
  width?: string;
  height?: string;
  lat?: number;
  lng?: number;
};

const MapContainerForm: React.FC<MapProps> = ({
  children,
  className,
  width,
  height,
  lat,
  lng,
}) => {
  return (
    <MapContainer
      className={className}
      center={[lat! !== 0 ? lat! : -18.91368, lng! !== 0 ? lng! : 47.53613]}
      zoom={13}
      minZoom={3}
      style={{
        width,
        height,
      }}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {children}
    </MapContainer>
  );
};

export default MapContainerForm;
