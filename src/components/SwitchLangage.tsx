import moment from "moment";
import { useTranslation } from "react-i18next";
import "moment/locale/mg";
import "moment/locale/fr";
import { useEffect, useState } from "react";

export const SwitchLangage = () => {
  const { i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState<string>(
    localStorage.getItem("lang") || "en"
  );

  const onClickLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = e.target.value;
    localStorage.setItem("lang", lang);
    i18n.changeLanguage(lang);
    moment.locale(lang);
    setSelectedLanguage(lang);
  };
  useEffect(() => {
    setSelectedLanguage(localStorage.getItem("lang") || "en");
  }, [i18n.language]);
  return (
    <select onChange={onClickLanguageChange} value={selectedLanguage} id="">
      <option value="en">English</option>
      <option value="fr">Français</option>
      <option value="mg">Malagasy</option>
    </select>
  );
};
export default SwitchLangage;
