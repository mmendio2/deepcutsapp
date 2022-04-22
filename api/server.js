const express = require('express')
var mysql = require('mysql2');
require("dotenv").config();

const app = express()


app.get('/', (req, res) => {
    res.send("No movies here....")
})

app.get('/search/:movie_id', (req, res) => {
    var db_con = mysql.createConnection({
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWD
      });
    movie = req.params.movie_id;
    query = `SELECT * from movies.movie_recs where movie_like = '${movie}' order by freq DESC`;

    db_con.query(query, function(err, rows, fields)    {
        arraylength = rows.length
        output = []
        console.log("CALL")
        for (i = 0; i < arraylength; i++){
            output.push([rows[i].rec_title, rows[i].rec_summary, rows[i].rec_rating, rows[i].rec_num_ratings])
        }
        if (arraylength == 0){
            output = [["Will be added fully in the future :/", "N/A", "?", "?"]]
        } 
        res.send(output);
    })
})

app.listen(process.env.PORT || 3001)