const express = require('express')
var mysql = require('mysql2');
require("dotenv").config();



DATABASE = "heroku_cfd51fbe1a7302a";

const app = express()
//cors
const cors = require('cors');
app.use(cors({
    origin: '*'
}));

// Home route, doesn't do anything
app.get('/', (req, res) => {
    res.send("No movies here presently....")
})

// Route for querying
app.get('/search/:movie_id', (req, res) => {
    // Connection to database, uses CLEARDB login
    var db_con = mysql.createPool({
        host: "us-cdbr-east-05.cleardb.net",
        user: "b17319eb0746e9",
        password: "6c10b643c71d5e7",
      });
    // Query the database--
    movie = req.params.movie_id;
    query = `SELECT * from ${DATABASE}.movie_recs where movie_like = '${movie}' order by freq DESC`;
    emp_query = `SELECT b.movie_id, title, summary, rating, num_ratings, freq
    FROM
    (SELECT a.movie_id, freq
    FROM
    (SELECT movie_id, count(movie_id) as freq
    from ${DATABASE}.user_movies 
    WHERE user in
    (SELECT user 
    FROM ${DATABASE}.user_movies
    WHERE ${DATABASE}.user_movies.movie_id = '${movie}' AND rating >= 4.5)
    AND  rating >= 4.5 AND movie_id != '${movie}' 
    GROUP BY movie_id) AS a 
    WHERE
    (SELECT COUNT(1) FROM (SELECT genre_name FROM ${DATABASE}.genre_table WHERE ${DATABASE}.genre_table.movie_id = '${movie}' ) as cur
    LEFT OUTER JOIN (SELECT genre_name FROM ${DATABASE}.genre_table WHERE ${DATABASE}.genre_table.movie_id = a.movie_id ) AS cur2 ON cur.genre_name =cur2.genre_name
    WHERE cur2.genre_name IS NULL) = 0) as b
    INNER JOIN ${DATABASE}.movie_table on b.movie_id = movie_table.movie_id
    ORDER BY freq DESC`

    db_con.query(query, function(err, rows, fields)    {
        arraylength = rows.length
        test = 'False'
        // if it can't get it from the indexed database, it does the slow query from the full database
        output = []
        console.log("CALL")
        for (i = 0; i < arraylength; i++){
            output.push([rows[i].rec_title, rows[i].rec_summary, rows[i].rec_rating, rows[i].rec_num_ratings, rows[i].rec_id])
        }
        if (arraylength != 0){
            test = 'True'
            console.log(test)
            res.send(output);
        }
        else{
            res.send([['coming soon'], ['coming soon'], ['coming soon'], ['coming soon']])

            // db_con.query(emp_query, function(emp_err, emp_rows, emp_fields)    {
            //     emp_arraylength = emp_rows.length
            //     for (i = 0; i < emp_arraylength; i++){
            //         // pushes the movie information to a database
            //        output.push([emp_rows[i].title, emp_rows[i].summary, emp_rows[i].rating, emp_rows[i].num_ratings])
            //     }
            //     res.send(output);
            // })
        } 
    })
})

app.listen(process.env.PORT || 3001)    

