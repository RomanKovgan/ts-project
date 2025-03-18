import { FC } from "react";
import { useTranslation } from "react-i18next";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Box,
} from "@mui/material";

const LanguageSwitcher: FC = () => {
  const { i18n, t } = useTranslation();
  const availableLanguages = Object.keys(i18n.options.resources ?? {});

  const handleLanguageChange = (event: SelectChangeEvent) => {
    i18n.changeLanguage(event.target.value as string);
  };

  return (
    <Box>
      <FormControl fullWidth sx={{ minWidth: 80, margin: 2 }}>
        <InputLabel
          id="language-select-label"
          sx={{
            position: "absolute",
            clip: "rect(0, 0, 0, 0)",
            height: "1px",
            width: "1px",
            margin: "-1px",
            padding: 0,
            overflow: "hidden",
            border: 0,
          }}
        >
          {t("navbar.lang")}
        </InputLabel>
        <Select
          labelId="language-select-label"
          id="language-select"
          value={i18n.language}
          onChange={handleLanguageChange}
          sx={{
            backgroundColor: "white",
            borderRadius: "4px",
          }}
        >
          {availableLanguages.map((language) => (
            <MenuItem key={language} value={language}>
              {language}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default LanguageSwitcher;
