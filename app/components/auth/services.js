import { hashPassword } from "../../../utils/helpers.js";
import { prisma } from "../../models/client.js";

export const createNewUser = async (userDetails) => {
  if (!userDetails) {
    throw new Error("Invalid user details");
  }

  try {
    const user = await prisma.user.create({
      data: {
        ...userDetails,
        password: hashPassword(userDetails.password),
      },
    });

    return { user, error: null };
  } catch (error) {
    return { user: null, error };
  }
};

const parseError = (error) => {
  const err = {};

  switch (error) {
    case error.code === "P2002":
      err.message =
        "unique constraint violation, new user cannot be created with this email";
      return err;

    default:
      return error;
  }
};
