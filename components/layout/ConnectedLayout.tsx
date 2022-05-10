// Components
import { Box } from "@mui/system";
import { Sidebar } from "../../components/ui";
import { BreadcrumbsC } from "../ui/breadcrumbs";

interface Props {
  children: React.ReactNode;
}

const ConnectedLayout = ({ children }: Props) => {
  return (
    <Box className={"main__container"}>
      <Sidebar />
      <Box className="main__application">
        <BreadcrumbsC />
        {children}
      </Box>
    </Box>
  );
};

export { ConnectedLayout };
