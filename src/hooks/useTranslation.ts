import { useState, useEffect } from 'react';
import localizationService from '../services/LocalizationService';

// 自定义翻译hook
const useTranslation = () => {
  const [locale, setLocale] = useState(localizationService.getCurrentLanguage());
  const [translations, setTranslations] = useState({});

  // 翻译函数
  const t = (key: string, options?: any) => {
    return localizationService.t(key, options);
  };

  // 更改语言
  const changeLanguage = (language: string) => {
    localizationService.changeLanguage(language);
    setLocale(language);
  };

  return {
    t,
    locale,
    changeLanguage,
    supportedLanguages: localizationService.getSupportedLanguages(),
  };
};

export default useTranslation;