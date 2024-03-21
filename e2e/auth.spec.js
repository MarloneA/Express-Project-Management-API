import request from "supertest";
import createApp from "../app";
import { response } from "express";

const app = createApp();

describe("Test user authentication", () => {
  it("registers a new user", (done) => {
    request(app)
      .post("/api/auth/register")
      .send({
        name: "Marlone Akidiva",
        email: "marlone.akidiva@gmail.com",
        password: "test1234",
        role: "client",
      })
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        return done();
      });
  });

  it("logins a user", (done) => {
    request(app)
      .post("/api/auth/login")
      .send({
        email: "marlone.akidiva@gmail.com",
        password: "test1234",
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  it("checks auth status", async () => {
    request(app)
      .get("/api/auth/status")
      .expect(200)
      // .then((response) => {
      //   expect(response.body.status).toEqual("authenticated");
      // })
      .end(function (err, res) {
        if (err) throw err;
      });
  });
});

// describe("Test sessioin", () => {
//   beforeEach(() => {
//     request(app)
//       .post("/api/auth/login")
//       .send({
//         email: "marlone.akidiva@gmail.com",
//         password: "test1234",
//       })
//       .expect(200)
//       .then((res) => {
//         expect(response.body).toBe("OK");
//       });
//   });
//   it("checks auth status", () => {
//     request(app)
//       .get("/api/auth/status")
//       .expect(200)
//       .then((response) => {
//         expect(response.body.status).toEqual("authenticated");
//       })
//       .end(function (err, res) {
//         if (err) throw err;
//       });
//   });

//   it("logs user out", () => {
//     request(app)
//       .post("/api/auth/logout")
//       .expect(200)
//       .then((response) => {
//         expect(response.body.message).toEqual("loggod out");
//       })
//       .end((err, res) => {
//         if (err) return done(err);
//         return done();
//       });
//   });
// });
