const express = require('express');
const Question = require('../models/quiz'); 
const router = express.Router();

// GET all questions for a specific set
router.get('/:setType', async (req, res) => {
    try {
        const questions = await Question.find({ setType: req.params.setType });
        res.json(questions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET a single question by ID
router.get('/question/:id', async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }
        res.json(question);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new question
router.post('/', async (req, res) => {
    const question = new Question(req.body);
    try {
        const newQuestion = await question.save();
        res.status(201).json(newQuestion);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PATCH to update an existing question
router.patch('/:id', async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }

        // Update fields that are available in the request body
        Object.keys(req.body).forEach(key => {
            question[key] = req.body[key];
        });

        const updatedQuestion = await question.save();
        res.json(updatedQuestion);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE a question by ID
router.delete('/:id', async (req, res) => {
    try {
        const result = await Question.findByIdAndDelete(req.params.id);
        if (!result) {
            return res.status(404).json({ message: 'Question not found' });
        }
        res.json({ message: 'Question deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
