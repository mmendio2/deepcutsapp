'use strict';
const express = require('express')
const mysql = require('mysql2');
require("dotenv").config({ override: true });



const DATABASE = process.env.DB;

const app = express()
//cors - THIS IS DEFINITELY NOT SAFE BUT IT WORKS *********MAYBE FIX**********
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
    const db_con = mysql.createPool({
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD
    });
    // Query the database, there is two. If the movie is large enough, we hvae it cached in the movie_recs database - so just pull from that
    const movie = req.params.movie_id;
    const query = `SELECT * from ${DATABASE}.movie_recs where movie_like = '${movie}' order by freq DESC`;
    // Else use the full query. This query came to me in a dream -- I do not quite fully understand how it works. So please do not change it
    const emp_query = `SELECT movie_id, title, summary, rating, num_ratings, freq, count(*) AS ct FROM
	(SELECT b.movie_id, title, summary, rating, num_ratings, freq, genre_name
		FROM
			(SELECT a.movie_id, freq, genre_name
				FROM
					(SELECT movie_id, count(movie_id) as freq
						FROM ${DATABASE}.user_movies 
						WHERE user IN
							(SELECT user 
								FROM ${DATABASE}.user_movies
								WHERE ${DATABASE}.user_movies.movie_id = '${movie}' AND rating >= 4.5)
								AND  rating >= 4.5 AND movie_id != '${movie}' 
								GROUP BY movie_id) as a
						LEFT JOIN ${DATABASE}.genre_table on a.movie_id = genre_table.movie_id) AS b
			INNER JOIN ${DATABASE}.movie_table ON b.movie_id = movie_table.movie_id) AS c
	RIGHT JOIN (SELECT genre_name FROM ${DATABASE}.genre_table WHERE movie_id = '${movie}') AS d ON  c.genre_name = d.genre_name
    GROUP BY movie_id
    ORDER BY ct DESC, freq DESC`

    db_con.query(query, function (err, rows, fields) {
        if (err) {
            throw new Error('DB Error: ' + JSON.stringify(err));
        }

        const arraylength = rows.length
        // if it can't get it from the indexed database, it does the slow query from the full database
        const output = []
        for (let i = 0; i < arraylength; i++) {
            output.push([rows[i].rec_title, rows[i].rec_summary, rows[i].rec_rating, rows[i].rec_num_ratings, rows[i].rec_id])
        }
        if (arraylength != 0) {
            res.send(output);
        }
        else {
            // res.send([['coming soon, sorry!'], ['coming soon'], ['coming soon'], ['coming soon'], ['coming soon']])
            db_con.query(emp_query, function (emp_err, emp_rows, emp_fields) {
                const emp_arraylength = emp_rows.length
                for (let i = 0; i < emp_arraylength; i++) {
                    // pushes the movie information to a database
                    output.push([emp_rows[i].title, emp_rows[i].summary, emp_rows[i].rating, emp_rows[i].num_ratings])
                }
                res.send(output);
            })
        }
    })
})

app.listen(process.env.PORT || 3001)

