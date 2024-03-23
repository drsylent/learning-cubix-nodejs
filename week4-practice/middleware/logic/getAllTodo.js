function getAllTodo({ todoModel }) {
    return (req, res, next) => {
        res.locals.todos = todoModel.find();
        return next();
    }
}

export { getAllTodo };
