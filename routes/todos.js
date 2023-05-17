"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const todos = [];
const router = (0, express_1.Router)();
router.get('/', (req, res, next) => {
    res.status(200).json({ todos: todos });
});
router.post('/todo', (req, res, next) => {
    const newTodo = {
        id: new Date().toISOString(),
        text: req.body.text
    };
    todos.push(newTodo);
});
router.delete('/delete/:todoId', (req, res, next) => {
    const id = req.params.todoId;
    const index = todos.findIndex(todo => todo.id === id);
    if (index >= 0) {
        todos[index] = todos[index + 1];
        return res.status(200).json({ message: 'Successfully deleted' });
    }
    return res.status(404).json({ message: 'Id not Found' });
});
router.put('/update/:todoId', (req, res, next) => {
    const id = req.params.todoId;
    const index = todos.findIndex(todo => todo.id === id);
    if (index >= 0) {
        todos[index] = { id: todos[index].id, text: todos[index].text };
        return res.status(200).json({ message: 'Update Successfull' });
    }
    return res.status(404).json({ message: 'No record found' });
});
exports.default = router;
