function deleteTodo({ todoModel }) {
    return (req, res, next) => {
        todoModel.remove(res.locals.todo);
        return next();
    }
}

export { deleteTodo };
