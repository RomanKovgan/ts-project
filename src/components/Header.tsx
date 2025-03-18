import { FC } from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useLogout } from "../utils/hooks/useLogout";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher/LanguageSwitcher";

const Header: FC = () => {
  const logout = useLogout();
  const { t } = useTranslation();
  return (
    <AppBar position="static">
      <Toolbar>
        <LanguageSwitcher />
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          {t("navbar.header")}
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          onClick={logout}
          sx={{ minWidth: 80 }}
        >
          {t("navbar.logout")}
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
