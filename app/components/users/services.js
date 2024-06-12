import { Prisma } from "@prisma/client";
import { usersList } from "../../../utils/constants.js";
import { hashPassword } from "../../../utils/helpers.js";
import { prisma } from "../../models/client.js";

export const filterUsersByParam = (params) => {
  const { filter, value } = params;

  const users = usersList.filter((user) => user[filter] === value);

  return { users, count: users.length };
};

export const searchUsersByQTerm = async (params) => {
  const { q } = params;

  const result = await prisma.user.findMany({
    where: {
      name: {
        contains: q,
      },
    },
  });

  return { users: result, count: result.length };
};

export const createNewUser = async (user) => {
  try {
    const data = await prisma.user.create({
      data: {
        ...user,
        password: hashPassword(user.password),
      },
    });

    return { data, error: null };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // The .code property can be accessed in a type-safe manner
      if (error.code === "P2002") {
        return {
          data: {},
          error:
            "unique constraint violation, new user cannot be created with this email",
        };
      }
      throw error;
    }
  }
};

export const updateUser = (payload) => {
  const { id, body } = payload;

  const findUserIndex = usersList.findIndex((user) => user.id === id);

  usersList.splice(findUserIndex, 1, {
    ...usersList[findUserIndex],
    ...body,
  });

  return { data: usersList, error: null };
};

export const deleteUser = (id) => {
  const findUserIndex = usersList.findIndex((user) => user.id === id);

  usersList.splice(findUserIndex, 1);

  return { data: usersList, error: null };
};
