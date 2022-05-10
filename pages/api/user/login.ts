import { NextApiRequest, NextApiResponse } from "next";

// JWT Token
import { v4 as uuid } from "uuid";
import { signToken } from "../../../auth";

type Data =
  | {
      token: string;
      user: {
        email: string;
        name: string;
        role: string;
      };
    }
  | {
      message: string;
    };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      return loginUser(req, res);

    default:
      res.status(400).json({
        message: "Bad request",
      });
  }
}

const loginUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, hierarchy } = req.body;

  const token = signToken({
    id: uuid(),
    name,
    hierarchy,
  });

  return res.status(200).json({
    token,
    user: { name, hierarchy },
  });
};

export { loginUser };
