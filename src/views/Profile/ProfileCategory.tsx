import React from "react";
import { CategorieList } from "../../constants/PageCategory";
import { CheckboxButton } from "../../components/page/CategoryCheckbox";
import TopBar from "../../components/layouts/TopBar";
import Button from "../../components/common/Button";
import { withAsync } from "../../helpers/withAsync";
import { updateCategory } from "../../api/ProfileApi";
import useToken from "../../hooks/useToken";
import useLoadingButton from "../../hooks/useLoadingButton";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useAppSelector } from "../../store/hooks";

const ProfileCategory = () => {
  const token = useToken();
  
  const { profile } = useAppSelector((state) => state.teratany_user);

  let categories: any = profile?.categories?.split("");
  const [isLoading, startLoading, endLoading] = useLoadingButton();

  const getCheckValue = (e: any, isChecked: boolean, value: string) => {
    if (!isChecked && !categories.includes(value)) {
      categories.push(e.target.dataset.type);
    } else {
      categories = categories.filter(
        (cat: string) => cat !== e.target.dataset.type
      );
    }
  };

  const updateCategories = async () => {
    startLoading();
    const { error } = await withAsync(() =>
      updateCategory(token, profile?._id, categories.join(""))
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
      toast.success("Category updated successfully");
    }
  };

  return (
    <div className="mt-14 flex flex-col items-center mx-4 mb-16">
      <TopBar text="Category" />
      <div className="flex flex-wrap mx-4 mb-4">
        {CategorieList[profile?.profileType === "association" ? 0 : 1].map(
          (category) => (
            <CheckboxButton
              value={category.value}
              onClick={getCheckValue}
              text={category.text}
              defaultChecked={
                categories?.includes(category.value) ? true : false
              }
            />
          )
        )}
      </div>
      <Button
        onClick={updateCategories}
        name="Save"
        width="w-[90%]"
        className="mr-0"
        isLoading={isLoading}
      />
    </div>
  );
};

export default ProfileCategory;
