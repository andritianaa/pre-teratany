import MapContainerForm from "../../components/MapContainer";
import { InfoModal } from "../../components/common/InfoModal";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Marker, useMapEvents } from "react-leaflet";
import { MARKER_USER } from "../../constants/MarkerIcon";
import Button from "../../components/common/Button";
import useLoadingButton from "../../hooks/useLoadingButton";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { setPageCoordonates } from "../../store/reducer/page.reducer";

type PositionMarkerType = {
  lat: number;
  lng: number;
};

const LocationMarker = () => {
  const [position, setPosition] = useState<PositionMarkerType | null>(null);
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
      localStorage.setItem("lat", String(e.latlng.lat));
      localStorage.setItem("lng", String(e.latlng.lng));
    },
  });

  return position === null ? null : (
    <Marker position={position} icon={MARKER_USER}></Marker>
  );
};

const AddPageStep2: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, startLoading] = useLoadingButton();
  const dispatch = useDispatch<AppDispatch>();

  const addPageSecondStep = () => {
    const lat: number = Number(localStorage.getItem("lat"));
    const lng: number = Number(localStorage.getItem("lng"));

    if (lat && lng) {
      startLoading();
      dispatch(
        setPageCoordonates({
          coordonates: {
            latitude: lat,
            longitude: lng,
          },
        })
      );
      localStorage.removeItem("lat");
      localStorage.removeItem("lng");
      setTimeout(() => {
        navigate("/page/add/step-3");
      }, 2000);
    } else {
      toast.error("Coordonates information required!!!");
    }
  };

  return (
    <>
      <MapContainerForm
        lat={-18.91368}
        lng={47.53613}
        className="w-full h-screen"
      >
        <LocationMarker />
      </MapContainerForm>
      <div className="fixed bottom-0 z-1000 flex items-center justify-center p-4 w-full">
        <Button
          isLoading={isLoading}
          width="w-[90%]"
          height="py-3"
          name="Save my position"
          onClick={addPageSecondStep}
        />
      </div>
      <InfoModal
        title="Select you position"
        text=" Enter the location of your organization by selecting it on the following interactive map. Organizations registering on our platform are required to be transparent. Your data will be used solely to inform users interested in your organization about your location and will not be used for advertising purposes."
      />
    </>
  );
};

export default AddPageStep2;
