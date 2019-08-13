var express = require('express');
var router = express.Router();

const Item = require('../model/task');

// Retrieving data 
router.get('/taskItems', (req, res, next) =>{
    Item.find(function(err, task){
        if (err){
            res.json(err);
        }else{
            res.json(task);
        }
    });
});

// Inserting data
router.post('/taskItem', (req, res, next) =>{
    let newTask = new Item({
        taskName: req.body.taskName
    });
    newTask.save((err, item) =>{
        if(err){
            res.json(err);
        }else{
            res.json({msg: 'Task has been successfully added'});
        }
    })

});

// Updating data
router.put('/taskItem/:id', (req, res, next) =>{
    Item.findOneAndUpdate({_id: req.params.id},{
        $set:{
            taskName: req.body.taskName
        }
    },
        function(err, result){
            if(err){
                res.json(err);
                } else{
                    res.json(result);
                }
        })
    });

// Deleting data
router.delete('/taskItem/:id', (req, res, next) =>{
    Item.deleteOne({_id: req.params.id}, function(err, result){
        if(err){
            res.json(err);
            } else{
                res.json(result);
            }
    });
});

module.exports = router;