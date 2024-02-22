import moment from "moment";
import { useTranslation } from "react-i18next";
import "moment/locale/fr";
import "helpers/mg";
import { useEffect, useState } from "react";

export const SwitchLangage = () => {
  const { i18n } = useTranslation();
  const { t } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState<string>(() => {
    const storedLang = localStorage.getItem("lang");
    return storedLang && ["en", "fr", "mg"].includes(storedLang)
      ? storedLang
      : "en";
  });

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
    <select
      onChange={onClickLanguageChange}
      value={selectedLanguage}
      id=""
      className="text-lg border-0 w-full"
    >
      <option value="en">{t("langage.english")}</option>
      <option value="fr">{t("langage.français")}</option>
      <option value="mg">{t("langage.malagasy")}</option>
    </select>
  );
};

export default SwitchLangage;
