
var express  = require('express');
var mongoose = require('mongoose');
var app      = express();
var database = require('./config/database');
var bodyParser = require('body-parser');         // pull information from HTML POST (express4)
 
var port     = process.env.PORT || 8000;
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json


mongoose.connect(database.url);

var Employee = require('./models/employee');
 
 
//get all employee data from db
app.get('/api/employees', function(req, res) {
	// use mongoose to get all todos in the database
	Employee.find(function(err, employees) {
		// if there is an error retrieving, send the error otherwise send data
		if (err)
			res.send(err)
		res.json(employees); // return all employees in JSON format
	});
});

// get a employee with ID of 1
// Get employee by ID
app.get('/api/employees/:employee_id', function(req, res) {
    let id = req.params.employee_id;
    // Use promise with findById method to get employee by ID
    Employee.findById(id)
        .then(employee => {
            // Send employee as response
            res.json(employee);
        })
        .catch(err => {
            // If error occurs, send it as response
            res.status(500).send(err);
        });
});

// create employee and send back all employees after creation
app.post('/api/employees', function(req, res) {

    // create mongose method to create a new record into collection
    console.log(req.body);

	Employee.create({
		name : req.body.name,
		salary : req.body.salary,
		age : req.body.age
    })
    .then(employee => {
        // Once employee is created, fetch all employees
        return Employee.find();
    })
    .then(employees => {
        // Send all employees as response
        res.json(employees);
    })
    .catch(err => {
        // If error occurs, send it as response
        res.status(500).send(err);
	});
 
});


// create employee and send back all employees after creation
app.put('/api/employees/:employee_id', function(req, res) {
	// create mongose method to update an existing record into collection
    console.log(req.body);

	let id = req.params.employee_id;
	var data = {
		name : req.body.name,
		salary : req.body.salary,
		age : req.body.age
	}

	// save the user
	Employee.findByIdAndUpdate(id, data, function(err, employee) {
	if (err) throw err;

	res.send('Successfully! Employee updated - '+employee.name);
	});
});

// delete a employee by id
app.delete('/api/employees/:employee_id', function(req, res) {
	console.log(req.params.employee_id);
	let id = req.params.employee_id;
	Employee.remove({
		_id : id
	}, function(err) {
		if (err)
			res.send(err);
		else
			res.send('Successfully! Employee has been Deleted.');	
	});
});

app.listen(port);
console.log("App listening on port : " + port);