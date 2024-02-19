import React, { useEffect } from "react";
import TopNavBarProfile from "components/layouts/TopNavBarProfile";
import Publication from "components/Publication/Publication";
import SwitchAccountDrawer from "components/drawer/SwitchAccountDrawer";
import { IProfile } from "types/profile.type";
import { BottomDrawer } from "components/drawer/BottomDrawer";
import { withAsync } from "helpers/withAsync";
import { followProfile, getById } from "api/ProfileApi";
import { useParams } from "react-router-dom";
import useToken from "hooks/useToken";
import { getPublicationByProfile } from "../../api/PublicationApi";
import { IPublication } from "../../types/publication.type";
import UserProfile from "./UserProfile";
import PageProfile from "./PageProfile";
import DetailsPage from "./DetailsPage";
import { ErrorData, ThrowErrorHandler } from "../../helpers/HandleError";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../store/hooks";
const Profile: React.FC = () => {
  const token = useToken();

  const { profile: profileConnectedUser } = useAppSelector(
    (state) => state.teratany_user
  );

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
  }, []);

  return (
    <div className="flex flex-col items-center w-full ">
      <div className="flex items-center justify-center w-full">
        {profileConnectedUser && (
          <TopNavBarProfile
            user={profileConnectedUser?.name as string}
            path="/profile/edit/menu"
            onClick={openDrawerBottom}
          />
        )}
      </div>

      <RenderProfileComponent />

      <div className="flex flex-col-reverse w-full max-w-[600px]">
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
            title={t("details.name")}
          />
          <SwitchAccountDrawer
            openBottom={openBottom}
            closeBottom={closeDrawerBottom}
          />
        </>
      )}
    </div>
  );
};

export default Profile;
