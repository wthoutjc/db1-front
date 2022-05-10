import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Chip,
  Divider,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { Layout, AuthLayout } from "../../../components/layout";

// Redux
import { useAppSelector, useAppDispatch } from "../../../hooks";
import { incrementClicks, login } from "../../../reducers";

// Components
// UI
import { ActiveLink } from "../../../components/ui";

// Icons
import GoogleIcon from "@mui/icons-material/Google";
import PasswordIcon from "@mui/icons-material/Password";
import EmailIcon from "@mui/icons-material/Email";
import NextLink from "next/link";

interface LoginInfo {
  email: string;
  password: string;
}

const LogInPage = () => {
  const router = useRouter()
  const dispatch = useAppDispatch();

  const { ux } = useAppSelector((state) => state);

  const clicksCurrent = useMemo(() => ux.clicks, [ux.clicks])

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

  const handleLoggin = () => {
    dispatch(login())
    router.push('/home')
  }

  useEffect(() => {
    if (clicked) {
      dispatch(incrementClicks());
    }
  }, [clicked, dispatch]);

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
            <Button variant="outlined">
              <GoogleIcon />
            </Button>
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
              <Button variant="contained" fullWidth onClick={handleLoggin} >
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
