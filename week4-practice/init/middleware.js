import { v4 as uuid } from 'uuid';
import { addTodo } from "../middleware/logic/addTodo.js";
import { getAllTodo } from "../middleware/logic/getAllTodo.js";
import { deleteTodo } from "../middleware/logic/deleteTodo.js"
import { findTodo } from "../middleware/logic/findTodo.js"
import { saveDatabase } from "../middleware/logic/saveDatabase.js"
import { jsonAllTodos } from "../middleware/view/jsonAllTodos.js"
import { emptyCreated } from "../middleware/view/emptyCreated.js"
import { emptyNoContent } from "../middleware/view/emptyNoContent.js"

function initMiddlewares({ db, todoModel }) {
    const addTodoMw = addTodo({ todoModel, uuid });
    const getAllTodoMw = getAllTodo({ todoModel });
    const deleteTodoMw = deleteTodo({ todoModel });
    const findTodoMw = findTodo({ todoModel });
    const saveDatabaseMw = saveDatabase({ db });
    const jsonAllTodosMw = jsonAllTodos;
    const emptyCreatedMw = emptyCreated;
    const emptyNoContentMw = emptyNoContent;
    return {
        addTodoMw, getAllTodoMw, findTodoMw, deleteTodoMw, saveDatabaseMw,
        jsonAllTodosMw, emptyCreatedMw, emptyNoContentMw
    };
}

export { initMiddlewares };
