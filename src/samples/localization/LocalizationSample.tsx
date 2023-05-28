import React, {
  ChangeEvent, useState, FC, useEffect,
} from 'react';
import i18next from 'i18next';
import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import translationKeys from './translationKeys';
import { getLocalizedString } from '../../domains/localization/server/api';

const LocalizationSample: FC = () => {
  const [currentLanguage, setCurrentLanguage] = useState(i18next.languages[0]);
  const { t, i18n } = useTranslation();
  const { title, description } = translationKeys;
  const { data: localizedString, refetch } = useQuery('localizedString', async () => (await getLocalizedString(currentLanguage)).data);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { refetch(); }, [currentLanguage]);
  const onCurrentLanguageChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = event.target.value;

    i18n.changeLanguage(newLanguage);
    setCurrentLanguage(newLanguage);
  };

  return (
    <>
      <h2>Localization</h2>

      <div>
        Current language is :
        {currentLanguage}
      </div>
      <div>{t(title)}</div>
      <div>{t(description)}</div>
      <div>{localizedString}</div>

      <select value={currentLanguage} onChange={onCurrentLanguageChange}>
        <option value='fr'>Français</option>
        <option value='en'>English</option>
      </select>
    </>
  );
};

export default LocalizationSample;
