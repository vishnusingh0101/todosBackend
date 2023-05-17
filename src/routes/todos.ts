import { Router } from 'express';

import { Todo } from '../models/todo';

type requestBody = { text: string }
type requestParams = { todoId: string }

const todos: Todo[] = [];

const router = Router();

router.get('/', (req, res, next) => {
    res.status(200).json({ todos: todos });
})

router.post('/todo', (req, res, next) => {
    const body = req.body as requestBody;
    const newTodo: Todo = {
        id: new Date().toISOString(),
        text: body.text,
    };
    todos.push(newTodo);
})

router.delete('/delete/:todoId', (req, res, next) => {
    const params = req.params as requestParams;
    todos.filter(todo => todo.id !== params.todoId)
    return res.status(200).json({message: 'Successfully deleted'});
});

router.put('/update/:todoId', (req, res, next) => {
    const params = req.params as requestParams;
    const id = params.todoId;
    const body = req.body as requestBody;
    const index = todos.findIndex(todo => todo.id === id);
    if(index >= 0){
        todos[index] = {id: todos[index].id, text: body.text};
        return res.status(200).json({message: 'Update Successfull'});
    }
    return res.status(404).json({message: 'No record found'});
})

export default router;