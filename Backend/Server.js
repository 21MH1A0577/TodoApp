const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql2');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'vanitha',
    database:'TodoApps'
});

db.connect((err)=>{
    if(err){
        console.error('Error connecting to MySQL:', err);
    }else{
        console.log('Connected to MySQL database');
    }
});

app.get('/', (req,res)=>{

    console.log('Fetching Todos');

    db.query('SELECT * FROM TodoItems', (err,result)=>{
        if(err){
            console.error('Error :', err);
            return res.send('Database error');
        }else{
            console.log('Data fetched successfully:', result);
            res.json(result);
        }
    });

});

app.post('/add',(req,res)=>{

    const { name, email, age } = req.body;

    console.log("Received Data:", req.body);

    const sql = `INSERT INTO TodoItems (name,email,age) VALUES (?,?,?)`;

    db.query(sql,[name,email,age], (err,result)=>{ 
        
        if(err){
            console.error('Error inserting data into MySQL:', err);
            return res.send('Database error');
        }else{
            console.log('Data inserted successfully');
            // res.send('Data inserted successfully');
            res.json({ id: result.insertId, name, email, age });
        }

    });

});

app.delete('/delete/:id',(req,res)=>{

    const index = req.params.index;
    const sql = `DELETE FROM TodoItems WHERE id = ?`;

    db.query(sql, [index], (err, result) => {
        if(err){
            console.error('Error deleting data from MySQL:', err);
            return res.send('Database error');
        }else{
            console.log('Data deleted successfully');
            res.send('Data deleted successfully');
        }
    });

});



app.listen(3000,()=>{
    console.log('Server is running on port 3000');
});