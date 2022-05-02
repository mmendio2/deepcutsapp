const express = require('express')
var mysql = require('mysql2');
require("dotenv").config();

const app = express()

// Home route, doesn't do anything
app.get('/', (req, res) => {
    res.send("No movies here....")
})

// Route for querying
app.get('/search/:movie_id', (req, res) => {
    // Connection to database
    var db_con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "8wLE11Xf2h&9Xm"
      });
    // Query the database--
    movie = req.params.movie_id;
    query = `SELECT * from movies.movie_recs where movie_like = '${movie}' order by freq DESC`;

    db_con.query(query, function(err, rows, fields)    {
        arraylength = rows.length
        // if it can't get it from the indexed database, it does the slow query from the full database
        output = []
        console.log("CALL")
        for (i = 0; i < arraylength; i++){
            output.push([rows[i].rec_title, rows[i].rec_summary, rows[i].rec_rating, rows[i].rec_num_ratings,  rows[i].rec_id])
        }
        if (arraylength != 0){
            res.send(output);
        }
        else{
            emp_query = `SELECT b.movie_id, title, summary, rating, num_ratings, freq
                        FROM
                        (SELECT a.movie_id, freq
                        FROM
                        (SELECT movie_id, count(movie_id) as freq
                        from movies.user_movies 
                        WHERE user in
                        (SELECT user 
                        FROM movies.user_movies
                        WHERE movies.user_movies.movie_id = '${movie}' AND rating >= 4.5)
                        AND  rating >= 4.5 AND movie_id != '${movie}' 
                        GROUP BY movie_id) AS a 
                        WHERE
                        (SELECT COUNT(1) FROM (SELECT genre_name FROM movies.genre_table WHERE movies.genre_table.movie_id = '${movie}' ) as cur
                        LEFT OUTER JOIN (SELECT genre_name FROM movies.genre_table WHERE movies.genre_table.movie_id = a.movie_id ) AS cur2 ON cur.genre_name =cur2.genre_name
                        WHERE cur2.genre_name IS NULL) = 0) as b
                        INNER JOIN movies.movie_table on b.movie_id = movie_table.movie_id
                        ORDER BY freq DESC`
            db_con.query(emp_query, function(emp_err, emp_rows, emp_fields)    {
                emp_arraylength = emp_rows.length
                for (i = 0; i < emp_arraylength; i++){
                    // pushes the movie information to a database
                    output.push([emp_rows[i].title, emp_rows[i].summary, emp_rows[i].rating, emp_rows[i].num_ratings])
                }
                res.send(output);
            })
        } 
    })
})

app.listen(process.env.PORT || 3001)    