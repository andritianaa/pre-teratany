import L from "leaflet";
import userIcon from "../assets/icon_leaflet/marker-icon-blue.png"
import associationIcon from "../assets/icon_leaflet/marker-icon-green.png"
import entrepriseIcon from "../assets/icon_leaflet/marker-icon-red.png"

export const MARKER_USER = new L.Icon({
    iconUrl: userIcon,
    className: "leaflet-marker-icon leaflet-zoom-animated leaflet-interactive",
    iconRetinaUrl:
        userIcon,
    shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
    iconAnchor: [12 * 1.3, 32 * 1.3],
    popupAnchor: [0, -32 * 1.3],
    shadowRetinaUrl:
        "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
    shadowSize: [41 * 1.3, 41 * 1.3],
    shadowAnchor: [14 * 1.3, 41 * 1.3],
});
export const MARKER_ASSOCIATION = new L.Icon({
    iconUrl: associationIcon,
    className: "leaflet-marker-icon leaflet-zoom-animated leaflet-interactive",
    iconRetinaUrl:
        associationIcon,
    shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
    iconAnchor: [12 * 1.3, 32 * 1.3],
    popupAnchor: [0, -32 * 1.3],
    shadowRetinaUrl:
        "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
    shadowSize: [41 * 1.3, 41 * 1.3],
    shadowAnchor: [14 * 1.3, 41 * 1.3],
});
export const MARKER_ENTREPRISE = new L.Icon({
    iconUrl: entrepriseIcon,
    className: "leaflet-marker-icon leaflet-zoom-animated leaflet-interactive",
    iconRetinaUrl:
        entrepriseIcon,
    shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
    iconAnchor: [12 * 1.3, 32 * 1.3],
    popupAnchor: [0, -32 * 1.3],
    shadowRetinaUrl:
        "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
    shadowSize: [41 * 1.3, 41 * 1.3],
    shadowAnchor: [14 * 1.3, 41 * 1.3],
});