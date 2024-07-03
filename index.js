const express = require('express');
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World');
});

let courses = [
    { id: 1, name: "java" },
    { id: 2, name: "javascript" },
    { id: 3, name: "python" }
];

app.get('/courses',(req,res) => {
    res.json(courses);
});

app.post('/courses',(req,res) => {
    // console.log(req.body);
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.put('/courses/:id',(req,res) =>{
    try{
        let singlecourse = courses.find((course) => {
            return course.id === +req.params.id;
        });

        if(!singlecourse){
            res.status(404).send('course does not exist');
        }

        singlecourse.name = req.body.name;
        res.send(courses);
    }
    catch(err){
        res.status(500).send(err);
    }
});

app.delete('/courses/:id',(req,res) => {
    try{
        let singlecourse = courses.find((course) => {
            return course.id === +req.params.id;
        });

        if(!singlecourse){
            res.status(404).send('course does not exist');
        }

        const index = courses.indexOf(singlecourse);
        courses.splice(index,1);
        res.send(courses);
    }
    catch(err){
        res.status(500).send(err);
    }
})

app.listen(3000, () => {
    console.log('Server started');
});