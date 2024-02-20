import { RouteObject } from "react-router-dom";
import { routes } from "../constants/route.contant";
import AddPublication from "views/Publication/AddPublication";
import EditPublication from "../views/Publication/EditPublication";
import Map from "../views/Map/Map";
import PageList from "../views/Page/PageList";
import { HomeChat } from "../views/Chat/HomeChat";
import Search from "../views/Search/Search";
import SearchResult from "../views/Search/SearchResultPage";
import Notification from "../views/Notification/Notification";
import SearchFilterResult from "../views/Search/SearchFilterResult";
import ProfileGeneral from "../views/Profile/ProfileGeneral";
import ProfilePassword from "../views/Profile/ProfilePassword";
import ProfilePicture from "../views/Profile/ProfilePicture";
import EditProfileMenu from "../views/Profile/EditProfileMenu";
import ProfileLocation from "../views/Profile/ProfileLocation";
import ProfileCategory from "../views/Profile/ProfileCategory";
import Profile from "../views/Profile/Profile";
import Home from "../views/Home";
import AddPageStep1 from "../views/Page/AddPageStep1";
import AddPageStep2 from "../views/Page/AddPageStep2";
import AddPageStep3 from "../views/Page/AddPageStep3";

const withNavRouter: RouteObject[] = [
  {
    path: routes.home,
    element: <Home />,
  },
  {
    path: routes.publication,
    element: <AddPublication />,
  },
  {
    path: routes.editPublication,
    element: <EditPublication />,
  },
  {
    path: routes.map,
    element: <Map />,
  },
  {
    path: routes.pagesList,
    element: <PageList />,
  },
  {
    path: routes.pageStepOne,
    element: <AddPageStep1 />,
  },
  {
    path: routes.pageStepTwo,
    element: <AddPageStep2 />,
  },
  {
    path: routes.pageStepThree,
    element: <AddPageStep3 />,
  },
  {
    path: routes.chatList,
    element: <HomeChat />,
  },
  {
    path: routes.search,
    element: <Search />,
  },
  {
    path: routes.searchResult,
    element: <SearchResult />,
  },
  {
    path: routes.notifications,
    element: <Notification />,
  },
  {
    path: routes.searchFilterPublicationResult,
    element: <SearchFilterResult />,
  },
  {
    path: routes.searchFilterUserResult,
    element: <SearchFilterResult />,
  },
  {
    path: routes.editUserMenu,
    element: <EditProfileMenu />,
  },
  {
    path: routes.profileGeneral,
    element: <ProfileGeneral />,
  },
  {
    path: routes.profileEditPassword,
    element: <ProfilePassword />,
  },
  {
    path: routes.profileEditPicture,
    element: <ProfilePicture />,
  },
  {
    path: routes.profileEditLocation,
    element: <ProfileLocation />,
  },
  {
    path: routes.profileEditCategory,
    element: <ProfileCategory />,
  },
  {
    path: routes.profile,
    element: <Profile />,
  },
];

export default withNavRouter;
