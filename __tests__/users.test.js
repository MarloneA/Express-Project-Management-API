import { getUsersService } from "../services/users";
import { usersList } from "../utils/constants.js";

const request = {
  query: { filter: "", value: "" },
};

const response = {
  status: jest.fn().mockReturnThis(),
  send: jest.fn(),
};

describe("get all users", () => {
  it("should get a list of all users in the database", () => {
    getUsersService(request, response);

    expect(response.send).toHaveBeenCalled();
    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.send).toHaveBeenCalledWith({
      data: { users: usersList, count: usersList.length },
    });
    expect(response.status).toHaveBeenCalledTimes(1);
  });

  it("should filter a list of users by role", () => {
    const request = {
      query: { filter: "role", value: "admin" },
    };

    const filteredUsers = {
      data: {
        users: [
          {
            id: "4b4e8e12-ff18-4a06-9a6b-94515f1f25a0",
            name: "John Doe",
            email: "john.doe@example.com",
            age: 25,
            address: {
              street: "123 Main St",
              city: "Cityville",
              state: "CA",
              zip: "12345",
            },
            username: "john_doe_username",
            password: "Joh@nDoe12",
            role: "admin",
          },
        ],
        count: 1,
      },
    };

    getUsersService(request, response);

    expect(response.send).toHaveBeenCalled();
    expect(response.send).toHaveBeenCalledWith(filteredUsers);
    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.status).toHaveBeenCalledTimes(1);
  });
});
