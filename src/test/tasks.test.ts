import chai from "chai";
import chaiHttp from "chai-http";
import app from "../app";
import { sequelize } from "../db.config";

const { expect } = chai;

chai.use(chaiHttp);

describe("Tasks API", () => {
  before(async () => {
    // Ensure the database is synchronized before running tests
    await sequelize.sync({ force: true });
  });

  it("should get all tasks", (done: any) => {
    chai
      .request(app)
      .get("/tasks")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("array");
        done();
      });
  });

  it("should create a new task", (done: any) => {
    const task = {
      title: "New Task",
      description: "Description for the new task",
      completed: false,
    };

    chai
      .request(app)
      .post("/tasks")
      .send(task)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an("object");
        expect(res.body.title).to.equal("New Task");
        done();
      });
  });

  it("should get a task by ID", (done: any) => {
    // Assume you have a task ID (replace with an actual ID)
    const taskId = 1;

    chai
      .request(app)
      .get(`/tasks/${taskId}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("object");
        // Add more assertions based on your data
        done();
      });
  });

  it("should update a task by ID", (done: any) => {
    // Assume you have a task ID (replace with an actual ID)
    const taskId = 1;
    const updatedTask = {
      title: "Updated Task",
      description: "Updated description",
      completed: true,
    };

    chai
      .request(app)
      .patch(`/tasks/${taskId}`)
      .send(updatedTask)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("object");
        expect(res.body.title).to.equal("Updated Task");
        // Add more assertions based on your data
        done();
      });
  });

  it("should delete a task by ID", (done: any) => {
    // Assume you have a task ID (replace with an actual ID)
    const taskId = 1;

    chai
      .request(app)
      .delete(`/tasks/${taskId}`)
      .end((err, res) => {
        expect(res).to.have.status(204);
        done();
      });
  });
});
