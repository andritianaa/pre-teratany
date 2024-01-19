import moment from "moment";
import { useTranslation } from "react-i18next";
import "moment/locale/mg";
// import "moment/locale/fr";

export const SwitchLangage = () => {
  const { i18n } = useTranslation();

  const onClickLanguageChange = (e: any) => {
    const lang = e.target.value;
    localStorage.setItem("lang", lang);
    i18n.changeLanguage(lang);
    moment.locale(lang);
  };

  return (
    <select onChange={onClickLanguageChange} id="">
      <option value="en">English</option>
      <option value="fr">Français</option>
      <option value="mg">Malagasy</option>
    </select>
  );
};
export default SwitchLangage;
