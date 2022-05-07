import { Box } from "@mui/material";

interface Props {
  children: React.ReactNode;
}

const AuthLayout: React.FC<Props> = ({ children }) => {
  return (
    <Box className={"authLayout__main"}>
      <Box className={"authLayout__content"}>{children}</Box>
    </Box>
  );
};

export { AuthLayout };
