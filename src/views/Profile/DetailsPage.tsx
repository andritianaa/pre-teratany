import { BiTargetLock } from "@react-icons/all-files/bi/BiTargetLock";
import { BsInfoCircle } from "@react-icons/all-files/bs/BsInfoCircle";
import { BsPhone } from "@react-icons/all-files/bs/BsPhone";
import { BsWallet } from "@react-icons/all-files/bs/BsWallet";
import { GiWorld } from "@react-icons/all-files/gi/GiWorld";
import { IoMailUnreadOutline } from "@react-icons/all-files/io5/IoMailUnreadOutline";
import { MdLocationCity } from "@react-icons/all-files/md/MdLocationCity";
import React from "react";
import EditType from "../../components/EditType";
import { useTranslation } from "react-i18next";

interface DetailsProps {
  profileType?: string;
  description?: string;
  email?: string;
  phone?: string;
  location?: string;
  address?: string;
  website?: string;
  wallet?: string;
}

const DetailsPage: React.FC<DetailsProps> = ({
  profileType,
  description,
  email,
  phone,
  location,
  address,
  website,
  wallet,
}) => {
  const pageType = <BsInfoCircle size={23} />;
  const phoneIcon = <BsPhone size={23} />;
  const emailIcon = <IoMailUnreadOutline size={23} />;
  const locationIcon = <BiTargetLock size={23} />;
  const walletIcon = <BsWallet size={23} />;
  const addressIcon = <MdLocationCity size={23} />;
  const websiteIcon = <GiWorld size={23} />;
  const { t } = useTranslation();
  return (
    <>
      <div className="mt-2">
        <EditType
          name={
            profileType === "association"
              ? t("details.association")
              : t("details.entreprise")
          }
          type="page"
          path="/profile/edit/general"
          icon={pageType}
        />
        <div className=" rounded-md p-3 border my-2 ">
          <div className="flex gap-3 items-center">
            <h3 className="font-bold">{t("details.description")}</h3>
          </div>

          <p className="flex text-left text-gray-600 mt-2">{description}</p>
        </div>
        <EditType
          name={email!}
          type="page"
          path="/profile/edit/location"
          icon={emailIcon}
        />
        {phone && (
          <EditType
            name={phone!}
            type="page"
            path="/profile/edit/picture"
            icon={phoneIcon}
          />
        )}
        {location && (
          <EditType
            name={location!}
            type="page"
            path="/profile/edit/picture"
            icon={locationIcon}
          />
        )}
        {address && (
          <EditType
            name={address!}
            type="page"
            path="/profile/edit/picture"
            icon={addressIcon}
          />
        )}
        {website && (
          <EditType
            name={website!}
            type="page"
            path="/profile/edit/picture"
            icon={websiteIcon}
          />
        )}
        {wallet && (
          <EditType
            name={wallet!}
            type="page"
            path="/profile/edit/picture"
            icon={walletIcon}
          />
        )}
      </div>
    </>
  );
};

export default DetailsPage;
