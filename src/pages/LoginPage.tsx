import { Button, Container, TextField, Typography } from "@mui/material";
import { FC, useState } from "react";
import { useLogin } from "../utils/hooks/API/useLogin";

export const LoginPage: FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { login } = useLogin();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(JSON.stringify({ username, password }));
    login({ username, password });
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
