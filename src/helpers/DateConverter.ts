import { useTranslation } from 'react-i18next';

export const ConvertDate = (date: string): string => {
    const { t } = useTranslation();

    const originalDate = new Date(date);
    const day = String(originalDate.getDate()).padStart(2, '0');

    const monthNames = [
        t('months.january'),
        t('months.february'),
        t('months.march'),
        t('months.april'),
        t('months.may'),
        t('months.june'),
        t('months.july'),
        t('months.august'),
        t('months.september'),
        t('months.october'),
        t('months.november'),
        t('months.december'),
    ];

    const month = monthNames[originalDate.getMonth()];
    const year = originalDate.getFullYear();

    const formattedDate = `${month} ${day}, ${year}`;

    return formattedDate;
};
