import { useTranslation } from "react-i18next";

export const useTableHeaderTranslations = () => {
  const { t } = useTranslation();

  const getTableHeader = (field: string) => {
    return t(`table.${field}`, { defaultValue: field });
  };

  return { getTableHeader };
};
