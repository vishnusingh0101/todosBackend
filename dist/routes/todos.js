"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const todos = [];
const router = (0, express_1.Router)();
router.get('/', (req, res, next) => {
    res.status(200).json({ todos: todos });
});
router.post('/todo', (req, res, next) => {
    const body = req.body;
    const newTodo = {
        id: new Date().toISOString(),
        text: body.text,
    };
    todos.push(newTodo);
});
router.delete('/delete/:todoId', (req, res, next) => {
    const params = req.params;
    todos.filter(todo => todo.id !== params.todoId);
    return res.status(200).json({ message: 'Successfully deleted' });
});
router.put('/update/:todoId', (req, res, next) => {
    const params = req.params;
    const id = params.todoId;
    const body = req.body;
    const index = todos.findIndex(todo => todo.id === id);
    if (index >= 0) {
        todos[index] = { id: todos[index].id, text: body.text };
        return res.status(200).json({ message: 'Update Successfull' });
    }
    return res.status(404).json({ message: 'No record found' });
});
exports.default = router;
