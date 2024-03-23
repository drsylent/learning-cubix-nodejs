import express from "express";

function initRoutes(app, { addTodoMw, getAllTodoMw, findTodoMw, deleteTodoMw, saveDatabaseMw,
    jsonAllTodosMw, emptyCreatedMw, emptyNoContentMw }) {
    app.get("/api/todos", getAllTodoMw, jsonAllTodosMw);
    app.post("/api/todos", addTodoMw, saveDatabaseMw, emptyCreatedMw);
    app.delete("/api/todos/:id", findTodoMw, deleteTodoMw, saveDatabaseMw, emptyNoContentMw);
}

function initServer(middlewares) {
    const app = express();

    // parse application/json
    app.use(express.json());
    initRoutes(app, middlewares);

    app.listen(8080, function () {
        console.log('Running on :8080');
    });
}

export { initServer };
