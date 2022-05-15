import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { AuthLayout, Layout } from "../../../components/layout";

import { signInAuth } from "../../../auth";
import { getProviders, signIn } from "next-auth/react";

// Redux
import { useAppSelector, useAppDispatch } from "../../../hooks";
import { incrementClicks, newNotification } from "../../../reducers";

// Components
import { ActiveLink } from "../../../components/ui";

// uuid
import { v4 as uuid } from "uuid";

// Icons
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import PasswordIcon from "@mui/icons-material/Password";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";

// Interfaces
import { INotification } from "../../../interfaces";

interface LoginInfo {
  email: string;
  name: string;
  password: string;
  password2: string;
}

const SignUpPage = () => {
  const dispatch = useAppDispatch();

  const { ux } = useAppSelector((state) => state);

  const currentClicks = useMemo(() => ux.clicks, [ux.clicks]);

  const [providers, setProviders] = useState<any>({});

  const [clicked, setClicked] = useState(false);

  const [registerInfo, setLoginInfo] = useState<LoginInfo>({
    email: "",
    name: "",
    password: "",
    password2: "",
  });

  const [touchedInputs, setTouchedInputs] = useState({
    email: false,
    name: false,
    password: false,
    password2: false,
  });

  const validEmail = useMemo(
    () => registerInfo.email.length <= 0 && touchedInputs.email,
    [registerInfo.email, touchedInputs.email]
  );

  const validName = useMemo(
    () => registerInfo.name.length <= 0 && touchedInputs.name,
    [registerInfo.name, touchedInputs.name]
  );

  const validPassword = useMemo(
    () => registerInfo.password.length <= 0 && touchedInputs.password,
    [registerInfo.password, touchedInputs.password]
  );

  const validPassword2 = useMemo(
    () => registerInfo.password2.length <= 0 && touchedInputs.password2,
    [registerInfo.password2, touchedInputs.password2]
  );

  useEffect(() => {
    if (clicked) {
      dispatch(incrementClicks());
    }
  }, [clicked, dispatch]);

  useEffect(() => {
    getProviders().then((prov) => {
      setProviders(prov);
    });
  }, []);

  const handleSignUp = async () => {
    const { hasError, message } = await signInAuth({ ...registerInfo });
    if (hasError) {
      const payload: INotification = {
        id: uuid(),
        title: "Error:",
        message: message!,
        severity: "error",
      };
      dispatch(newNotification(payload));
      return;
    }

    const { email, password } = registerInfo;

    await signIn("credentials", { email, password });
  };

  return (
    <Layout title={"App - Signup"}>
      <AuthLayout>
        <Box className={"signup__container"}>
          <Box
            className={
              currentClicks > 1
                ? "signup__right signup__animation-toLeft"
                : "signup__right fade-animation"
            }
          >
            <Typography variant="h4">Create Account</Typography>
            <Box display={"flex"}>
              {Object.values(providers).map((provider: any) => {
                if (provider.id === "credentials") {
                  return null;
                }

                return (
                  <Tooltip
                    title={`Sign up with ${provider.name}`}
                    key={provider.id}
                  >
                    <Button
                      variant="outlined"
                      className="signup__providers"
                      onClick={async () => await signIn(provider.id)}
                    >
                      {provider.name === "GitHub" && <GitHubIcon />}
                    </Button>
                  </Tooltip>
                );
              })}
            </Box>
            <Typography variant="body2" sx={{ fontStyle: "italic" }}>
              or use your email account for registration
            </Typography>
            <Box
              sx={{ boxSizing: "border-box", padding: "1em", width: "100%" }}
            >
              <TextField
                fullWidth
                sx={{ marginBottom: "1em" }}
                placeholder="E-mail"
                label="E-mail"
                error={validEmail}
                helperText={validEmail ? "Invalid data" : "Type your e-mail..."}
                onBlur={() =>
                  setTouchedInputs({
                    ...touchedInputs,
                    email: true,
                  })
                }
                onChange={(e) =>
                  setLoginInfo({ ...registerInfo, email: e.target.value })
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                sx={{ marginBottom: "1em" }}
                placeholder="Name"
                label="Name"
                error={validName}
                helperText={validName ? "Invalid data" : "Type your name..."}
                onBlur={() =>
                  setTouchedInputs({
                    ...touchedInputs,
                    name: true,
                  })
                }
                onChange={(e) =>
                  setLoginInfo({ ...registerInfo, name: e.target.value })
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                sx={{ marginBottom: "1em" }}
                placeholder="Password"
                label="Password"
                error={validPassword}
                helperText={
                  validPassword ? "Invalid data" : "Type your new password..."
                }
                onBlur={() =>
                  setTouchedInputs({
                    ...touchedInputs,
                    password: true,
                  })
                }
                onChange={(e) =>
                  setLoginInfo({ ...registerInfo, password: e.target.value })
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PasswordIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                sx={{ marginBottom: "1em" }}
                placeholder="Confirm password"
                label="Confirm password"
                error={validPassword2}
                helperText={
                  validPassword2
                    ? "Invalid data"
                    : "Confirm your new password..."
                }
                onBlur={() =>
                  setTouchedInputs({
                    ...touchedInputs,
                    password2: true,
                  })
                }
                onChange={(e) =>
                  setLoginInfo({ ...registerInfo, password2: e.target.value })
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <ThumbUpAltIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <Button variant="contained" fullWidth onClick={handleSignUp}>
                SIGN UP
              </Button>
            </Box>
          </Box>
          <Box
            className={
              currentClicks > 1
                ? "signup__left signup__animation-toRight"
                : "signup__left fade-animation"
            }
          >
            <Typography variant="h4" className="fade-animation">
              Hello, Friend!
            </Typography>
            <Typography variant="body1" className="fade-animation">
              Enter your personal details and start journey with us
            </Typography>
            <ActiveLink href="/auth/login">
              <Button
                variant={"outlined"}
                className="fade-animation"
                onClick={() => setClicked(true)}
              >
                <Typography variant="body1">SIGN IN</Typography>
              </Button>
            </ActiveLink>
          </Box>
        </Box>
      </AuthLayout>
    </Layout>
  );
};

export default SignUpPage;
