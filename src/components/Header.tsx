import { FC } from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useLogout } from "../utils/hooks/useLogout";

const Header: FC = () => {
  const logout = useLogout();
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Мое приложение
        </Typography>
        <Button variant="contained" color="secondary" onClick={logout}>
          Выйти
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
