const express = require('express');
const router = express.Router();

/* GET users listing. */

//fake database

const tasksDatabase = {
    1: {
        name: 'Sam',
        families_id: '1',
        birthDate: '1,13,2023'
    }
}

router.get('/', (req, res) => {
    //   res.json({title: "Add New Task Page"});
    res.json({ tasksDatabase });
});

module.exports = router;
