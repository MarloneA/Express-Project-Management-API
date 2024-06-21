import { hashPassword } from "../../../utils/helpers.js";
import { prisma } from "../../models/client.js";

export const getAllUsers = async ({ filter, value }) => {
  try {
    if ((filter, value)) {
      const users = await prisma.user.findMany({
        where: {
          [filter]: {
            contains: value,
            mode: "insensitive",
          },
        },
        include: {
          tasks: true,
        },
      });

      return { users, count: users.length, error: null };
    }

    const users = await prisma.user.findMany({
      include: {
        tasks: true
      }
    });

    return { users, count: users.length, error: null };
  } catch (error) {
    return { users: null, count: null, error: error };
  }
};

export const searchUsersByQTerm = async (params) => {
  const { q } = params;

  try {
    const users = await prisma.user.findMany({
      where: {
        name: {
          contains: q,
          mode: "insensitive",
        },
      },
    });
    return { users, count: users.length, error: null };
  } catch (error) {
    return { users: null, count: null, error: error };
  }
};

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

export const updateUser = async (payload) => {
  const { id, body } = payload;

  try {
    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        ...body,
      },
    });

    return { user, error: null };
  } catch (error) {
    return { user: null, error };
  }
};

export const deleteUser = async ({ id }) => {
  try {
    const user = await prisma.user.delete({
      where: {
        id,
      },
    });

    return { user, error: null };
  } catch (error) {
    return { user: null, error };
  }
};

export const findUserByUniqueEmail = async (email) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  } catch (error) {
    throw error;
  }
};

export const findUserByUniqueId = async (id) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  } catch (error) {
    throw error;
  }
};
