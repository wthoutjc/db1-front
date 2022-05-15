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

const verifyToken = (token: string): Promise<string> => {
  if (!process.env.SECRET_SEED_JWT) {
    throw new Error("Seed's JWT not exists!");
  }

  return new Promise((res, rej) => {
    try {
      jwt.verify(token, process.env.SECRET_SEED_JWT || "", (err, payload) => {
        if (err) {
          return rej(err);
        }

        const { _id } = payload as { _id: string };

        res(_id);
      });
    } catch (error) {
      rej("JWT not valid");
    }
  });
};

export { signToken, verifyToken };
