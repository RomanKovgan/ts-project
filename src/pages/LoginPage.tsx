import { Button, Container, TextField, Typography } from "@mui/material";
import { FC, useState } from "react";
import { useLogin } from "../utils/hooks/API/useLogin";
import { useTranslation } from "react-i18next";

export const LoginPage: FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { t } = useTranslation();
  const { login } = useLogin(t);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({ username, password });
  };
  return (
    <Container>
      <Typography variant="h4">{t("login.login")}</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label={t("login.username")}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label={t("login.password")}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button type="submit">{t("login.login")}</Button>
      </form>
    </Container>
  );
};
