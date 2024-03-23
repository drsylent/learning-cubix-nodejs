function jsonAllTodos(req, res, next) {
    const todos = res.locals.todos.map((result) => ({ id: result.id, todo: result.todo }));
    return res.json(todos);
}

export { jsonAllTodos };
