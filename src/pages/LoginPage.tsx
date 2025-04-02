import {
  Button,
  Container,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { FC, useState } from "react";
import { useLogin } from "../utils/hooks/API/useLogin";
import { useTranslation } from "react-i18next";
import { useLoginSchema } from "../utils/schemas/loginValidationShema";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Visibility, VisibilityOff } from "@mui/icons-material";

type LoginFormData = {
  username: string;
  password: string;
};

export const LoginPage: FC = () => {
  const { t } = useTranslation();
  const { login } = useLogin(t);
  const schema = useLoginSchema();
  const [visibilityPassword, setVisibilityPassword] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const onSubmit = (data: LoginFormData) => {
    login(data);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        {t("login.login")}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t("login.username")}
              fullWidth
              margin="normal"
              error={!!errors.username}
              helperText={errors.username?.message}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t("login.password")}
              type={visibilityPassword ? "text" : "password"}
              fullWidth
              margin="normal"
              error={!!errors.password}
              helperText={errors.password?.message}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          setVisibilityPassword(!visibilityPassword)
                        }
                        edge="end"
                      >
                        {visibilityPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
          )}
        />
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          {t("login.login")}
        </Button>
      </form>
    </Container>
  );
};
