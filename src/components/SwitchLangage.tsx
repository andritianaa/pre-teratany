import { useTranslation } from "react-i18next";

export const SwitchLangage = () => {
  const { t, i18n } = useTranslation();

  const onClickLanguageChange = (e: any) => {
    const lang = e.target.value;
    localStorage.setItem("lang", lang);
    i18n.changeLanguage(lang);
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
