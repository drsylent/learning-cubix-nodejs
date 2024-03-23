function findTodo({ todoModel }) {
    return (req, res, next) => {
        const foundTodo = todoModel.findOne({ id: req.params.id });

        if (!foundTodo) {
            return res.status(404).end();
        }

        res.locals.todo = foundTodo;
        return next();
    }
}

export { findTodo };
