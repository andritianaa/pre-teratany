import React from "react";
import TopNavBarProfile from "components/layouts/TopNavBarProfile";
import Publication from "components/publication/Publication";
import SwitchAccountDrawer from "components/drawer/SwitchAccountDrawer";
import { BottomDrawer } from "components/drawer/BottomDrawer";
import { withAsync } from "helpers/withAsync";
import { followProfile } from "api/ProfileApi";
import { useParams } from "react-router-dom";
import useToken from "hooks/useToken";
import UserProfile from "./UserProfile";
import PageProfile from "./PageProfile";
import DetailsPage from "./DetailsPage";
import { ErrorData, ThrowErrorHandler } from "../../helpers/HandleError";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../store/hooks";
import { useGetProfileByIdQuery } from "services/api-services/profile/profile.endpoints";
import { useGetPublicationByProfileQuery } from "../../services/api-services/publication/publication.endpoints";
const Profile: React.FC = () => {
  const token = useToken();

  const { profile: profileConnectedUser } = useAppSelector(
    (state) => state.teratany_user
  );

  const [openBottom, setOpenBottom] = React.useState<boolean>(false);
  const [drawerOpen, setDrawerOpen] = React.useState<boolean>(false);

  const { t } = useTranslation();

  const { id } = useParams();

  const { data: profile, isSuccess } = useGetProfileByIdQuery(
    { id: id!, ownId: profileConnectedUser?._id! },
    {
      skip: !id && !profileConnectedUser?._id,
      refetchOnMountOrArgChange: true,
    }
  );

  const [followText, setFollowText] = React.useState<string>(
    profile?.isFollowed ? t("followers.unfollow") : t("followers.follow")
  );

  const { data: publications } = useGetPublicationByProfileQuery(
    { profileId: id!, ownId: profileConnectedUser?._id! },
    {
      skip: !id && !profileConnectedUser?._id,
      refetchOnMountOrArgChange: true,
    }
  );

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
    if (isSuccess) {
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
