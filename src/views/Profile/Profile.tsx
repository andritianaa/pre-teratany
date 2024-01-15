import React, { useEffect } from "react";
import TopNavBarProfile from "components/TopNavBarProfile";
import Publication from "components/Publication/Publication";
import SwitchAccountDrawer from "components/SwitchAccountDrawer";
import { IProfile } from "types/profile.type";
import { BottomDrawer } from "components/common/BottomDrawer";
import { withAsync } from "helpers/withAsync";
import { followProfile, getById } from "api/ProfileApi";
import { useParams } from "react-router-dom";
import useToken from "hooks/useToken";
import useFetchProfile from "hooks/useFetchProfile";
import { getPublicationByProfile } from "../../api/PublicationApi";
import { IPublication } from "../../types/publication.type";
import UserProfile from "./UserProfile";
import PageProfile from "./PageProfile";
import DetailsPage from "./DetailsPage";
import { ErrorData, ThrowErrorHandler } from "../../helpers/HandleError";
import { useTranslation } from "react-i18next";

const Profile: React.FC = () => {
  const token = useToken();
  const profileConnectedUser = useFetchProfile();

  const [profile, setProfile] = React.useState<IProfile>();
  const [openBottom, setOpenBottom] = React.useState<boolean>(false);
  const [drawerOpen, setDrawerOpen] = React.useState<boolean>(false);
  const [followText, setFollowText] = React.useState<string>();
  const [publications, setPublications] = React.useState<IPublication[]>();
  const [isProfileFetched, setIsProfileFetched] =
    React.useState<Boolean>(false);
  const { t } = useTranslation();

  const openDrawerBottom = () => {
    window.history.pushState({ page: "" }, "", "?isModal2=true");
    setOpenBottom(true);
  };

  const closeDrawerBottom = () => {
    setOpenBottom(false);
  };
  window.addEventListener("popstate", () => {
    closeDrawerBottom();
    const currentUrl = window.location.href;
    const newUrl = currentUrl.replace(/(\?|&)isModal2=true/, "");
    window.history.replaceState({ page: "" }, "", newUrl);
  });

  const closeDrawer = () => setDrawerOpen(false);
  const changeDrawerStatus = () => setDrawerOpen(true);

  const { id } = useParams();

  const fetchProfile = async () => {
    if (profileConnectedUser) {
      const { error, response } = await withAsync(() =>
        getById(token, id, profileConnectedUser?._id)
      );

      if (error) {
        ThrowErrorHandler(error as ErrorData);
      } else {
        setProfile(response?.data as IProfile);
        console.log("profile ", response?.data);
        const isProfileFollowed = response?.data as IProfile;
        setFollowText(
          isProfileFollowed?.isFollowed
            ? t("followers.unfollow")
            : t("followers.follow")
        );
        setIsProfileFetched(true);
      }
    }
  };

  const fetchPublications = async () => {
    if (profileConnectedUser) {
      const { error, response } = await withAsync(() =>
        getPublicationByProfile(token, id!, profileConnectedUser?._id!)
      );
      if (error) {
        ThrowErrorHandler(error as ErrorData);
      } else {
        setPublications(response?.data as Array<IPublication>);
      }
    }
  };

  const follow = async () => {
    setFollowText(
      followText === t("followers.follow")
        ? t("followers.unfollow")
        : t("followers.follow")
    );
    const { error } = await withAsync(() =>
      followProfile(token, profileConnectedUser?._id, id)
    );
    if (error) {
      ThrowErrorHandler(error as ErrorData);
    }
  };

  const RenderProfileComponent = (): JSX.Element => {
    if (isProfileFetched) {
      if (profile?.profileType === "user") {
        return (
          <UserProfile
            profileConnectedUser={profileConnectedUser!}
            profile={profile}
            idUserViewed={id!}
            followText={followText!}
            onClick={follow}
          />
        );
      } else {
        return (
          <PageProfile
            profile={profile!}
            followText={followText!}
            follow={follow}
            changeDrawerStatus={changeDrawerStatus}
          />
        );
      }
    } else {
      return <></>;
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchPublications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, profileConnectedUser?._id]);

  return (
    <>
      <div>
        {profileConnectedUser && (
          <TopNavBarProfile
            user={profileConnectedUser?.name as string}
            path="/profile/edit/menu"
            onClick={openDrawerBottom}
          />
        )}
      </div>

      <RenderProfileComponent />

      <div className="flex flex-col-reverse">
        {publications?.map((pub) => (
          <Publication
            key={pub?._id}
            _id={pub?._id}
            profileId={pub?.profile?._id}
            profileName={pub?.profile?.name}
            profileImage={pub?.profile?.image}
            date={pub?.date}
            comments={pub?.numberOfComments}
            reactions={pub?.numberOfReactions}
            content={pub?.content}
            images={pub?.images!}
            isReacted={pub.isReacted}
          />
        ))}
      </div>

      {profile?.profileType === "user" ? (
        <SwitchAccountDrawer
          id={id}
          openBottom={openBottom}
          closeBottom={closeDrawerBottom}
        />
      ) : (
        <>
          <BottomDrawer
            isOpen={drawerOpen}
            onClose={closeDrawer}
            content={
              <DetailsPage
                profileType={profile?.profileType}
                address={profile?.localisation?.address?.value}
                description={profile?.description}
                email={profile?.contact?.email}
                location={profile?.localisation?.country?.value}
                phone={profile?.contact?.phone}
                website={profile?.contact?.website}
                wallet={profile?.deviantWalletId}
              />
            }
            title="Details"
          />
          <SwitchAccountDrawer
            openBottom={openBottom}
            closeBottom={closeDrawerBottom}
          />
        </>
      )}
    </>
  );
};

export default Profile;

interface IODD {
  text: string;
}
export const ODD: React.FC<IODD> = ({ text }) => {
  return (
    <label className="inline-flex items-center mt-1">
      <span className="text-gray-500 bg-white rounded-full border border-gray-200 text-sm font-medium px-5 py-2.5 mr-3">
        {text}
      </span>
    </label>
  );
};
