import { CheckboxButton } from "../../components/page/CategoryCheckbox";
import Button from "../../components/common/Button";
import TopBar from "../../components/layouts/TopBar";
import useLoadingButton from "../../hooks/useLoadingButton";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { withAsync } from "../../helpers/withAsync";
import { addPage } from "../../api/PageApi";
import useToken from "../../hooks/useToken";
import {
  PageInitialState,
  resetPageInfo,
} from "../../store/reducer/page.reducer";
import { AxiosError } from "axios";
import { CategorieList } from "../../constants/PageCategory";
import { addAccountConnected } from "../../store/reducer/account.reducer";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

const AddPageStep3: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, startLoading, endLoading] = useLoadingButton();
  const token = useToken();
  const dispatch = useAppDispatch();
  const { profile } = useAppSelector((state) => state.teratany_user);
  const { t } = useTranslation();

  const page: PageInitialState = useAppSelector((state) => state.teratany_page);

  let categories: Array<string> = [];

  const getCheckValue = (e: any, isChecked: boolean) => {
    if (!isChecked) {
      categories.push(e.target.dataset.type);
    } else {
      categories = categories.filter((cat) => cat !== e.target.dataset.type);
    }
  };

  const addPageLastStep = async () => {
    startLoading();

    const { error, response } = await withAsync(() =>
      addPage(
        token,
        page.name,
        page.profileType,
        categories.join(""),
        page.coordonates,
        page.description,
        page.address,
        page.email,
        page.phoneNumber,
        page.website,
        page.country
      )
    );

    if (error instanceof AxiosError) {
      endLoading();
      const error_message: string =
        error?.response?.data.description ||
        error?.response?.data ||
        error.message;
      toast.error(error_message);
    } else {
      const account: any = response?.data;
      dispatch(
        addAccountConnected({
          id: account?._id,
          name: account?.name,
          followers: 0,
          image: account?.image,
        })
      );
      dispatch(
        addAccountConnected({
          id: profile?._id!,
          name: profile?.name!,
          followers: profile?.followers?.length!,
          image: profile?.image!,
        })
      );
      endLoading();
      const toastSuccess = t("settings.addPage.step3.success");
      toast(toastSuccess);

      setTimeout(() => {
        navigate(`/profile/${profile?._id}`);
        dispatch(resetPageInfo());
      }, 2000);
    }
  };
  const translatedCategories = CategorieList[
    page.profileType === "association" ? 0 : 1
  ].map((category) => ({
    ...category,
    text: t(
      `settings.categories.${category.text.toLowerCase().replace(/\s/g, "")}`
    ),
  }));

  return (
    <>
      <TopBar text={t("settings.addPage.step3.title")} />

      <div className=" mt-16 0 flex items-center p-4 w-full flex-col">
        <div className="flex flex-wrap mb-8">
          {translatedCategories.map((category) => (
            <CheckboxButton
              value={category.value}
              onClick={getCheckValue}
              text={category.text}
            />
          ))}
        </div>
        <Button
          isLoading={isLoading}
          width="w-[90%]"
          height="py-3"
          className="mb-4"
          name={t("settings.finish")}
          onClick={addPageLastStep}
        />
      </div>
    </>
  );
};

export default AddPageStep3;
