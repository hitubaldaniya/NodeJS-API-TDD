const request = require("supertest");
const app = require("./app");

describe("List API", () => {
  it("GET /lists ---> Array List", () => {
    return request(app)
      .get("/lists")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual(
            expect.arrayContaining([
              expect.objectContaining({
                id: expect.any(Number),
                name: expect.any(String),
                completed: expect.any(Boolean),
              }),
            ])
          );
      })
  });

  it("GET /lists/id ---> Specific Array Item by ID", () => {
    return request(app)
      .get("/lists/1")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            name: expect.any(String),
            completed: expect.any(Boolean),
          })
        );
      });
  });

  it("GET /lists/id ---> 404 if array item not found by ID", () => {
    return request(app).get("/lists/99999").expect(404);
  });

  it("POST /lists ---> Create List", () => {
    return request(app)
      .post("/lists")
      .send({
        name: "TestList",
      })
      .expect("Content-Type", /json/)
      .expect(201)
      .then((res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            name: "TestList",
            completed: false,
          })
        );
      });
  });

  it("POST /list ---> Validates request body", () => {
    return request(app)
      .post("/lists")
      .send({
        name: 123,
      })
      .expect(422);
  });
});
