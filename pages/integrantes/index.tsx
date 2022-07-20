// Components
import { Box, Typography } from "@mui/material";
import { Layout } from "../../components/layout";

const IntegrantesPage = () => {
  return (
    <Layout>
      <Box sx={{ p: 2 }}>
        <Typography variant="h5">Integrantes:</Typography>
        <Box sx={{ p: 2 }}>
          <ul>
            <li>Ariel Ernesto Forero Meneses - 20181020135</li>
            <li>Julián Andrés Sánchez Rivera - 20181020169</li>
            <li>Juan Camilo Ramírez Rátiva - 20181020089</li>
            <li>Pablo Esteban Espinosa Granados - 20181020015</li>
          </ul>
        </Box>
      </Box>
    </Layout>
  );
};

export default IntegrantesPage;
