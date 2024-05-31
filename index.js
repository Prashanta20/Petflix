const express = require('express');
const Datastore = require('nedb');
const app = express();
app.listen(3000, () => console.log('listening at 3000'));
app.use(express.json());
app.use(express.static('public_files'));

const database = new Datastore('database.db')
database.loadDatabase();

// getting data from client
app.post('/create', (request, response) => {
    //console.log("I got a request!");
    //console.log(request.body);
    const data = request.body;
    
    database.find({email: data.email},(err, doc) =>{
        if (err) {
            response.end();
        }
        // if there is no error check the size to see if there is something with the same email
        const length = doc.length;
        console.log(doc);
        //console.log(length);
        if (length > 0){
            // this email already exists
            response.json({
                status: false,
            });
        }
        else {
            database.insert(data);
            //console.log(database);
            //response.end();
            response.json({
                status: true,
            });
        }
        //response.json(data);
    });
     
 });


 // getting data from client
app.post('/sign', (request, response) => {
    console.log("I got a request!");
    //console.log(request.body);
    const data = request.body;
    
    database.find({email: data.email},(err, doc) =>{
        if (err) {
            response.end();
        }
        // if there is no error check the size to see if there is something with the same email
        const length = doc.length;
        console.log(doc);
        if (length > 0){
            // this email exists so check if passwords match
            if (doc.password = data.password){
                // passwords match
                response.json({
                    status: true,
                });
            } else {
                // passwords do not match
                response.json({
                    status: false,
                });
            }
        }
        else {
            // email doesnt exist so cannot sign in
            //console.log(database);
            //response.end();
            response.json({
                status: false,
            });
        }
        //response.json(data);
    });
     
 });
