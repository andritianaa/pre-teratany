import { useEffect, useState } from "react";
import MapContainerForm from "../../components/common/MapContainer";
import { SlideOver } from "../../components/common/SlideOver";
import { Marker, Popup, useMap } from "react-leaflet";
import { MARKER_USER } from "../../constants/MarkerIcon";
import { MARKER_ASSOCIATION } from "../../constants/MarkerIcon";
import { MARKER_ENTREPRISE } from "../../constants/MarkerIcon";
import { getProfileWithCoordonates } from "../../api/ProfileApi";
import { withAsync } from "../../helpers/withAsync";
import useToken from "../../hooks/useToken";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { IProfile } from "../../types/profile.type";
import { Link } from "react-router-dom";
import { FileServerURL } from "../../api/FileApi";
import ProfilePicture from "../../assets/userPics.jpg";
import {
  setCoordonates,
  setProfilesWithCoordonates,
} from "../../store/reducer/page.reducer";
import MarkerClusterGroup from "react-leaflet-cluster";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

const MapCoordonatesProfileSelected = () => {
  const profileCoordonates = useAppSelector(
    (state) => state.teratany_page.profileCoordonates
  );
  const map = useMap();

  useEffect(() => {
    map.flyTo(
      {
        lat: profileCoordonates?.latitude!,
        lng: profileCoordonates?.longitude!,
      },
      map.getZoom(),
      { animate: true }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileCoordonates?.latitude!, profileCoordonates?.longitude!]);

  return null;
};

const Map = () => {
  const [slideOpen, setSlideOpen] = useState<boolean>();
  const token = useToken();
  const [profiles, setProfiles] = useState<IProfile[]>();
  const [profilesSearched, setProfilesSearched] = useState<IProfile[]>();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const initialiseMapCoordonates = () => {
    dispatch(
      setCoordonates({
        profileCoordonates: {
          latitude: -18.91368,
          longitude: 47.53613,
        },
      })
    );
  };

  const handleChildData = (data: IProfile[]) => {
    // Faites quelque chose avec les données reçues du composant enfant
    setProfilesSearched(data);
  };

  const changeSlideStatus = () => {
    window.history.pushState({ page: "" }, "", "?isModal=true");

    setSlideOpen(true);
  };
  const closeSlide = () => {
    setSlideOpen(false);
  };
  window.addEventListener("popstate", () => {
    closeSlide();
    const currentUrl = window.location.href;
    const newUrl = currentUrl.replace(/(\?|&)isModal=true/, "");
    window.history.replaceState({ page: "" }, "", newUrl);
  });
  const fetchProfileWithCoordonates = async () => {
    const { response, error } = await withAsync(() =>
      getProfileWithCoordonates(token)
    );
    if (error instanceof AxiosError) {
      const error_message: string =
        error?.response?.data.error.description ?? error.message;
      toast.error(error_message);
      return;
    } else {
      setProfiles(response?.data as IProfile[]);
      dispatch(
        setProfilesWithCoordonates({ profiles: response?.data as IProfile[] })
      );
    }
  };
  useEffect(() => {
    // Mettre à jour profiles avec profilesSearched si la longueur est supérieure à 0
    if (profilesSearched && profilesSearched.length > 0) {
      setProfiles(profilesSearched);
    }
  }, [profilesSearched]);

  useEffect(() => {
    initialiseMapCoordonates();
    fetchProfileWithCoordonates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getMarkerIcon = (profileType: string | undefined) => {
    switch (profileType) {
      case "user":
        return MARKER_USER;
      case "association":
        return MARKER_ASSOCIATION;
      case "entreprise":
        return MARKER_ENTREPRISE;
      default:
        return MARKER_USER;
    }
  };
  return (
    <div>
      {/* slideover */}
      <div>
        <button
          onClick={changeSlideStatus}
          className="fixed bottom-16 left-3 z-1000 flex items-center gap-1 bg-gray-900 text-white p-2.5 rounded-md transition duration-300 ease-in-out transform"
        >
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </button>
      </div>
      <SlideOver
        isOpen={slideOpen}
        onClose={closeSlide}
        onChildData={handleChildData}
      />
      <MapContainerForm
        lat={-18.91368}
        lng={47.53613}
        className="w-full h-screen"
      >
        <MarkerClusterGroup chunkedLoading polygonOptions={{ opacity: 0 }}>
          <MapCoordonatesProfileSelected />
          {profiles?.map((profile) => (
            <Marker
              icon={getMarkerIcon(profile.profileType)}
              position={[
                profile?.localisation?.coordonates?.latitude!,
                profile?.localisation?.coordonates?.longitude!,
              ]}
              interactive
            >
              <Popup closeButton={false}>
                <Link
                  to={`/profile/${profile?._id}`}
                  className="flex flex-col items-start justify-start overflow-hidden  max-w-[138px]"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 overflow-hidden">
                      <img
                        src={
                          profile?.image
                            ? FileServerURL + profile?.image
                            : ProfilePicture
                        }
                        className="w-full h-full object-cover border-2 rounded-full border-black"
                        alt=""
                      />
                    </div>
                    <div className="flex flex-col pl-2">
                      <span className="overflow-ellipsis text-md font-semibold whitespace-nowrap">
                        {profile?.name}
                      </span>
                      <span className="text-gray-800 text-xs">
                        {profile?.profileType === "association"
                          ? t("details.association")
                          : profile?.profileType === "entreprise"
                          ? t("details.entreprise")
                          : t("details.user")}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start pt-2  text-gray-500 w-52">
                    <span className="pr-1">
                      {profile?.publications?.length! > 1
                        ? t("posts.number.plural", {
                            post: profile?.publications?.length,
                          })
                        : t("posts.number.singular", {
                            post: profile?.publications?.length,
                          })}
                    </span>
                    <span className="pl-1">
                      {profile?.followers?.length !== undefined &&
                        (profile.followers.length > 1
                          ? t("followers.number.plural", {
                              followers: profile.followers.length,
                            })
                          : t("followers.number.singular", {
                              followers: profile.followers.length,
                            }))}
                    </span>
                  </div>
                </Link>{" "}
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainerForm>
    </div>
  );
};

export default Map;
