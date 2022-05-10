import jwt from "jsonwebtoken";

// Enum
import { Hierarchy } from "../enum";

interface AccessJWT {
  id: string;
  name: string;
  hierarchy: Hierarchy;
}

const signToken = (tokenData: AccessJWT) => {
  if (!process.env.SECRET_SEED_JWT) {
    throw new Error("Seed's JWT not exists!");
  }

  return jwt.sign(tokenData, process.env.SECRET_SEED_JWT, {
    expiresIn: "1d",
  });
};

export { signToken };
