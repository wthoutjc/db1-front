import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Chip,
  Divider,
  InputAdornment,
  Link,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Layout, AuthLayout } from "../../../components/layout";

// Redux
import { useAppSelector, useAppDispatch } from "../../../hooks";
import { incrementClicks } from "../../../reducers";

// Components
// UI
import { ActiveLink } from "../../../components/ui";

// Icons
import GitHubIcon from "@mui/icons-material/GitHub";
import PasswordIcon from "@mui/icons-material/Password";
import EmailIcon from "@mui/icons-material/Email";
import NextLink from "next/link";

// API - Next
import { getProviders } from "next-auth/react";

// Next Auth
import { signIn } from "next-auth/react";

interface LoginInfo {
  email: string;
  password: string;
}

const LogInPage = () => {
  const dispatch = useAppDispatch();

  const { ux } = useAppSelector((state) => state);

  const clicksCurrent = useMemo(() => ux.clicks, [ux.clicks]);

  const [providers, setProviders] = useState<any>({});

  const [clicked, setClicked] = useState(false);
  const [loginInfo, setLoginInfo] = useState<LoginInfo>({
    email: "",
    password: "",
  });

  const [touchedUser, setTouchedUser] = useState(false);
  const [touchedPassword, setTouchedPassword] = useState(false);

  const validEmail = useMemo(
    () => loginInfo.email.length <= 0 && touchedUser,
    [loginInfo.email, touchedUser]
  );

  const validPassword = useMemo(
    () => loginInfo.password.length <= 0 && touchedPassword,
    [loginInfo.password, touchedPassword]
  );

  const handleLogin = async () => {
    await signIn("credentials", {
      ...loginInfo,
    });
  };

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

  return (
    <Layout title={"App - Login"}>
      <AuthLayout>
        <Box className="login__container">
          <Box
            className={
              clicksCurrent > 1
                ? "login__left login__animation-toRight"
                : "login__left fade-animation"
            }
          >
            <Typography variant="h4">Sign in to App - CRUD</Typography>
            <Box display={"flex"}>
              {Object.values(providers).map((provider: any) => {
                if (provider.id === "credentials") {
                  return null;
                }

                return (
                  <Tooltip
                    title={`Sign in with ${provider.name}`}
                    key={provider.id}
                  >
                    <Button
                      variant="outlined"
                      className="login__providers"
                      onClick={async () => await signIn(provider.id)}
                    >
                      {provider.name === "GitHub" && <GitHubIcon />}
                    </Button>
                  </Tooltip>
                );
              })}
            </Box>
            <Typography variant="body2" sx={{ fontStyle: "italic" }}>
              or use your email account
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
                onBlur={() => setTouchedUser(true)}
                onChange={(e) =>
                  setLoginInfo({ ...loginInfo, email: e.target.value })
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
                placeholder="Password"
                label="Password"
                error={validPassword}
                helperText={
                  validPassword ? "Invalid data" : "Type your password..."
                }
                onBlur={() => setTouchedPassword(true)}
                onChange={(e) =>
                  setLoginInfo({ ...loginInfo, password: e.target.value })
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PasswordIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <Divider sx={{ marginBottom: "1em" }}>
                <Chip
                  label={
                    <NextLink href="/auth/restore-password" passHref>
                      <Link sx={{ textDecoration: "none" }}>
                        Forgot your password?
                      </Link>
                    </NextLink>
                  }
                />
              </Divider>
              <Button variant="contained" fullWidth onClick={handleLogin}>
                SIGN IN
              </Button>
            </Box>
          </Box>
          <Box
            className={
              clicksCurrent > 1
                ? "login__right login__animation-toLeft"
                : "login__right fade-animation"
            }
          >
            <Typography variant="h4" className="fade-animation">
              Welcome back!
            </Typography>
            <Typography variant="body1" className="fade-animation">
              To keep connected with us please login with your personal info
            </Typography>
            <ActiveLink href="/auth/signup">
              <Button
                variant={"outlined"}
                className="fade-animation"
                onClick={() => setClicked(true)}
              >
                <Typography variant="body1">SIGN UP</Typography>
              </Button>
            </ActiveLink>
          </Box>
        </Box>
      </AuthLayout>
    </Layout>
  );
};

export default LogInPage;
