const express = require('express')
var mysql = require('mysql2');
var async = require("async");
require("dotenv").config();

const app = express()


var db_con = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWD
});




app.get('/search/:movie_id', (req, res) => {
    movie = req.params.movie_id;
    query = `SELECT b.movie_id, freq, title, summary, rating, num_ratings
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
            ORDER BY freq DESC`;

    db_con.query(query, function(err, rows, fields)    {
        arraylength = rows.length
        output = []
        console.log("CALL")
        for (i = 0; i < arraylength; i++){
            output.push(rows[i].title)
        }
        res.send(output);
    })
})

app.listen(3001)