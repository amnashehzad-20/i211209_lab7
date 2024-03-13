const express = require('express');
const User = require('./user');
const Task=require("./task")
const router = express.Router();
//user
//login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user || !user.isValidPassword(password)) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
//signup
router.post('/signup', async (req, res) => {
    try {
        const { username, password } = req.body;
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }
        const newUser = new User({ username, password });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
//Tasks
//create task
router.post('/createtask', async (req, res) => {
    const { title, description, dueDate } = req.body;

    try {
        const task = new Task({
            title,
            description,
            dueDate,
            completed: false 
        });

        await task.save();

        res.status(201).send(task);
    } catch (error) {
        res.status(400).send(error);
    }
});
//add category
router.put('/task/:id', async (req, res) => {
    const { category } = req.body;

    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).send({ message: 'Task not found' });
        }

        task.category = category;
        await task.save();

        res.send(task);
    } catch (error) {
        res.status(500).send({ message: 'Error updating task' });
    }
});
//mark as complete
router.put('/task/:id/complete', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).send({ message: 'Task not found' });
        }

        task.completed = true;
        await task.save();

        res.send(task);
    } catch (error) {
        res.status(500).send({ message: 'Error updating task' });
    }
});
//view tasks
router.get('/tasks', async (req, res) => {
    const { sortby } = req.query;

    try {
        let tasks;

        if (sortby === 'dueDate') {
            tasks = await Task.find().sort('dueDate');
        } else if (sortby === 'category') {
            tasks = await Task.find().sort('category');
        } else if (sortby === 'completed') {
            tasks = await Task.find().sort('completed');
        } else {
            tasks = await Task.find();
        }

        res.send(tasks);
    } catch (error) {
        res.status(500).send({ message: 'Error fetching tasks' });
    }
});
//add priority
router.put('/task/:id/priority', async (req, res) => {
    const { priority } = req.body;

    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).send({ message: 'Task not found' });
        }

        task.priority = priority;
        await task.save();

        res.send(task);
    } catch (error) {
        res.status(500).send({ message: 'Error updating task' });
    }
});
module.exports=router;