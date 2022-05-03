import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { AuthLayout, Layout } from "../../../components/layout";

// Redux
import { useAppSelector, useAppDispatch } from "../../../hooks";
import { incrementClicks } from "../../../reducers";

// Components
import { ActiveLink } from "../../../components/ui";

// Icons
import GoogleIcon from "@mui/icons-material/Google";
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from "@mui/icons-material/Person";
import PasswordIcon from '@mui/icons-material/Password';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';

interface LoginInfo {
  email: string;
  name: string;
  password: string;
  password2: string;
}

const SignUpPage = () => {
  const dispatch = useAppDispatch();

  const { ux } = useAppSelector((state) => state);
  const { clicks } = ux;

  const [clicked, setClicked] = useState(false);

  const [registerInfo, setLoginInfo] = useState<LoginInfo>({
    email: "",
    name: "",
    password: "",
    password2: "",
  });

  const [touchedEmail, setTouchedEmail] = useState(false);
  const [touchedName, setTouchedName] = useState(false);
  const [touchedPassword, setTouchedPassword] = useState(false);
  const [touchedPassword2, setTouchedPassword2] = useState(false);

  const validEmail = useMemo(
    () => registerInfo.email.length <= 0 && touchedEmail,
    [registerInfo.email, touchedEmail]
  );

  const validName = useMemo(
    () => registerInfo.name.length <= 0 && touchedName,
    [registerInfo.name, touchedName]
  );

  const validPassword = useMemo(
    () => registerInfo.password.length <= 0 && touchedPassword,
    [registerInfo.password, touchedPassword]
  );

  const validPassword2 = useMemo(
    () => registerInfo.password2.length <= 0 && touchedPassword2,
    [registerInfo.password2, touchedPassword2]
  );

  useEffect(() => {
    if (clicked) {
      dispatch(incrementClicks());
    }
  }, [clicked, dispatch]);

  return (
    <Layout title={"App - Signup"}>
      <AuthLayout>
        <Box className={"signup__container"}>
          <Box
            className={
              clicks > 1
                ? "signup__right signup__animation-toLeft"
                : "signup__right fade-animation"
            }
          >
            <Typography variant="h4">Create Account</Typography>
            <Button variant="outlined">
              <GoogleIcon />
            </Button>
            <Typography variant="body2" sx={{ fontStyle: "italic" }}>
            or use your email account for registration
            </Typography>
            <Box
              sx={{ boxSizing: "border-box", padding: "2em", width: "100%" }}
            >
              <TextField
                fullWidth
                sx={{ marginBottom: "1em" }}
                placeholder="E-mail"
                label="E-mail"
                error={validEmail}
                helperText={validEmail ? "Invalid data" : "Type your e-mail..."}
                onBlur={() => setTouchedEmail(true)}
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
                onBlur={() => setTouchedName(true)}
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
                onBlur={() => setTouchedPassword(true)}
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
                onBlur={() => setTouchedPassword2(true)}
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
              <Button variant="contained" fullWidth>
                SIGN UP
              </Button>
            </Box>
          </Box>
          <Box
            className={
              clicks > 1
                ? "signup__left signup__animation-toRight "
                : "signup__left fade-animation"
            }
          >
            <Typography variant="h4">Hello, Friend!</Typography>
            <Typography variant="body1">
              Enter your personal details and start journey with us
            </Typography>
            <ActiveLink href="/auth/login">
              <Button variant={"outlined"} onClick={() => setClicked(true)}>
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
