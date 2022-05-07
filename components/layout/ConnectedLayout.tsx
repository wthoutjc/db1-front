// Components
import { Box } from "@mui/system";
import { Sidebar } from "../../components/ui"

interface Props {
    children: React.ReactNode;
}

const ConnectedLayout = ({children}: Props) => {
    return (
        <Box className={"main__container"}>
            <Sidebar />
            {children}
        </Box>
    )
}

export {ConnectedLayout}
