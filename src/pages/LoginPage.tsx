import { Button, Container, TextField, Typography } from "@mui/material";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import routes from "../utils/routes";

export const LoginPage: FC = () => {
  const [username, setUsername] = useState<string>("");
  localStorage.removeItem("token");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const handleSubmit = () => {
    console.log("Submit");
    localStorage.setItem("token", "token");
    navigate(routes.tablePagePath());
  };
  return (
    <Container>
      <Typography variant="h4">Вход</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Имя пользователя"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button type="submit">Войти</Button>
      </form>
    </Container>
  );
};
