import React, { useState } from "react";
import SwitchToggle from "../../components/common/switchToggle";
import Button from "../../components/common/Button";
import TopBar from "../../components/common/TopBar";
import MapContainerForm from "../../components/MapContainer";
import { Marker, useMapEvents } from "react-leaflet";
import { MARKER_ICON } from "../../constants/MarkerIcon";
import { withAsync } from "../../helpers/withAsync";
import { updateLocationParameter } from "../../api/ProfileApi";
import useToken from "../../hooks/useToken";
import useLoadingButton from "../../hooks/useLoadingButton";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import useFetchProfile from "../../hooks/useFetchProfile";
import { useTranslation } from "react-i18next";

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
    <Marker position={position} icon={MARKER_ICON}></Marker>
  );
};

const ProfileLocation: React.FC = () => {
  const token = useToken();
  const profile = useFetchProfile();

  const [isLoading, startLoading, endLoading] = useLoadingButton();
  const [locationStatus, setLocationStatus] = useState<boolean>();
  const { t } = useTranslation();

  const changeLocationStatus = (status: any) => {
    setLocationStatus(status.target.checked);
  };

  const updateLocation = async () => {
    const lat: number = Number(localStorage.getItem("lat"));
    const lng: number = Number(localStorage.getItem("lng"));
    startLoading();
    const { error } = await withAsync(() =>
      updateLocationParameter(token, profile?._id, lat, lng, locationStatus!)
    );
    if (error instanceof AxiosError) {
      endLoading();
      const error_message: string =
        error?.response?.data.description ||
        error?.response?.data ||
        error.message;
      toast.error(error_message);
    } else {
      endLoading();
      const successToast = t("settings.location.successLocation");
      toast.success(successToast);
      localStorage.removeItem("lat");
      localStorage.removeItem("lng");
    }
  };

  return (
    <>
      <TopBar text={t("settings.location.name")} />
      {profile && (
        <MapContainerForm
          lat={profile?.localisation?.coordonates?.latitude! as number}
          lng={profile?.localisation?.coordonates?.longitude! as number}
          className="w-[90%] h-96 mx-auto mt-16 flex justify-center items-center"
        >
          <Marker
            position={[
              profile?.localisation?.coordonates?.latitude!,
              profile?.localisation?.coordonates?.longitude!,
            ]}
            icon={MARKER_ICON}
          ></Marker>
          <LocationMarker />
        </MapContainerForm>
      )}

      <div className="mt-4 flex flex-col items-center mx-4">
        <p className="font-medium">{t("settings.location.locationDesc")}</p>
        <div className="flex items-start mt-4">
          <SwitchToggle
            label={t("settings.location.switch")}
            isChecked={profile?.localisation?.coordonates?.isPublic}
            onClick={changeLocationStatus}
          />
        </div>
        <div className="my-10 w-full">
          <Button
            width="w-full"
            height="py-3"
            name={t("settings.save")}
            isLoading={isLoading}
            onClick={updateLocation}
          />
        </div>
      </div>
    </>
  );
};
export default ProfileLocation;
