let express = require("express");
let app = express();
let port = process.env.NODE_ENV || 4800;
// console.log(app);
app.use(express.json()); //in-built middleware
let Joi = require("@hapi/joi");

let courses = [
    {id:1, name:"Angular"},
    {id:2, name:"Rxjs"},
    {id:3, name:"react native"},
    {id:4, name:"Javascript"}
];

app.get("/api/courses", (req,res) => {
    // res.send("hello world");
    res.send(courses);
});

app.get("/api/course/:id", (req,res) => {
    // let id = req.params.id;
    // res.send(id);
    let course = courses.find(item => item.id === parseInt(req.params.id));
    if(!course) {return res.status(404).send({message:"Invalid course id"})};
    let {id,name} = course;
    res.send(name);
    // res.send(course.name);
});

app.post("/api/course/newcourse", (req,res) => {

    let {error} = ValidationError(req.body);
    // console.log(result);
    if(error){return res.send(error.details[0].message)}

    let course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(courses);
});

app.put("/api/course/updatecourse/:id", (req,res) => {
    let course = courses.find(item => item.id === parseInt(req.params.id));
    if(!course) {return res.status(404).send({message:"Invalid course id"})};

    
    let {error} = ValidationError(req.body);
    // console.log(result);
    if(error){return res.send(error.details[0].message)}

    course.name = req.body.name;
    res.send(courses);
});

app.delete("/api/course/removecourse/:id", (req,res) => {
    let course = courses.find(item => item.id === parseInt(req.params.id));
    if(!course) {return res.status(404).send({message:"Invalid course id"})};
    let index = courses.indexOf(course); //2
    courses.splice(index, 1);
    // res.send(courses);
    res.send({message: "Removed the data", c: courses});
});

function ValidationError(error){
    let Schema = Joi.object({
        name: Joi.string().min(4).max(100).alphanum().required()
    });
    return Schema.validate(error);
}

app.listen(port, () => {console.log(`port working on ${port}`)})