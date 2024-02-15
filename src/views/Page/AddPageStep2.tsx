import MapContainerForm from "../../components/common/MapContainer";
import { InfoModal } from "../../components/common/InfoModal";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Marker, useMapEvents } from "react-leaflet";
import { MARKER_USER } from "../../constants/MarkerIcon";
import Button from "../../components/common/Button";
import useLoadingButton from "../../hooks/useLoadingButton";
import { toast } from "react-toastify";
import { setPageCoordonates } from "../../store/reducer/page.reducer";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../../store/hooks";

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
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

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
      const toastMessageError = t("settings.addPage.error");
      toast.error(toastMessageError);
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
      <div className="fixed bottom-12 z-1000 flex items-center justify-center p-4 w-full">
        <Button
          isLoading={isLoading}
          width="w-[90%]"
          height="py-3"
          name={t("settings.addPage.savePosition")}
          onClick={addPageSecondStep}
        />
      </div>
      <InfoModal
        title={t("settings.addPage.titleStep2")}
        text={t("settings.addPage.step2Notice")}
      />
    </>
  );
};

export default AddPageStep2;
