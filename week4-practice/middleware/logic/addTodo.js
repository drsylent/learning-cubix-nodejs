function addTodo({ todoModel, uuid }) {
    return (req, res, next) => {
        const newTodo = {
            id: uuid(),
            todo: req.body.todo
        }
        todoModel.insert(newTodo);
        return next();
    }
}

export { addTodo };
