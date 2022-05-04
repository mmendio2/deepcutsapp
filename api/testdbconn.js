var mysql = require('mysql2');
var async = require("async");


// tests the connection to the database
var db_con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "8wLE11Xf2h&9Xm"
});


movie = "21-jump-street";
query = `SELECT a.movie_id, a.freq
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
        WHERE cur2.genre_name IS NULL) = 0
        ORDER BY a.freq DESC;`;

db_con.query(query, function(err, rows, fields)    {
    arraylength = rows.length
    for (i = 0; i < arraylength; i++){
        console.log(rows[i].movie_id)
    }
});
db_con.end()



//         if (err) {
//             // You must `return` in this branch to avoid using callback twice.
//             return callback(err);
//         }
//         users = Object.values(rows)
//         var arrayLength = output.length;
//         for (var i = 0; i < arrayLength; i++) {
//             users.add(output[i]["user"]);
//         }
        
//         callback(null, users);
//     });
// }

// movie = '12-angry-men';
// var queryString = `SELECT user FROM movies.user_movies where movie_id = "${movie}" and rating > 4.5;`;

// db_con.query(queryString, function(err, rows, fields) {
//     if (err) throw err;

//     async.each(rows, function (row, callback) {
//         var emp_query = `SELECT user FROM movies.user_movies where movie_id = "${user}" and rating > 4.5;`;
//         connection.query(emp_query, function(emp_err, emp_rows, emp_fields) {
//             if (emp_err) callback(emp_err);
//             for (var e in emp_rows) {
//                 console.log('Employer Name: ', emp_rows[e].company_name);
//             }
//             callback();
//         }); 
//     });
//     }, function (err) {
//         db_con.end();
//     }
// });



// var output = [];  
// const setOutput = (rows) => {
//     output = rows;
//     // console.log(output);
// }


// const setTest = (rows) => {
//     test = rows;
//     // console.log(output);
// }


// var movie = "12-angry-men";

// function fetchUsers(callback){
//     var users = new Set();
//     db_con.query(`SELECT user FROM movies.user_movies where movie_id = "${movie}" and rating > 4.5;`, function(err, rows, fields) {
//         if (err) {
//             // You must `return` in this branch to avoid using callback twice.
//             return callback(err);
//         }
//         users = Object.values(rows)
//         var arrayLength = output.length;
//         for (var i = 0; i < arrayLength; i++) {
//             users.add(output[i]["user"]);
//         }
        
//         callback(null, users);
//     });
// }

// function handleResult(err, result) {
//     if (err) {
//         // Just an example. You may want to do something with the error.
//         console.error(err.stack || err.message);

//         // You should return in this branch, since there is no result to use
//         // later and that could cause an exception.
//         return;
//     }

// // }

// fetchUsers(handleResult);


// // test_users = new Set();



// console.log(test_users)

// function getMovies(callback){
//     db_con.query(`SELECT user FROM movies.user_movies where movie_id = "" and rating > 4.5;`, function(err, rows, fields) {
//         if (err) {
//             // You must `return` in this branch to avoid using callback twice.
//             return callback(err);
//         }
//         users = Object.values(rows)
//         var arrayLength = output.length;
//         for (var i = 0; i < arrayLength; i++) {
//             users.add(output[i]["user"]);
//         }
        
//         callback(null, users);
//     });
// }


// db_con.connect(async(err) => {
//     if (err) {
//         console.log("Database Connection Failed !!!", err);
//         return; 
//     }
  
//     console.log("Connected to Database");
  
//     let query = `SELECT user FROM movies.user_movies where movie_id = "${movie}" and rating > 4.5;`;
//     db_con.query(query, (err, rows) => {
//         if (err) {
//             console.log("internal error", err);
//             return;
//         }
//         setOutput(rows);
//         users = Object.values(output)
//         var arrayLength = output.length;
//         users = new Set();
//         for (var i = 0; i < arrayLength; i++) {
//             users.add(output[i]["user"]);
//         }
//         movies = {};
//         async.each(users, function (row, callback)  {
//             emp_query = `SELECT movie_id FROM movies.user_movies where user = "${row}" and rating > 4.5;`;
//             db_con.query(emp_query, function(emp_err, emp_rows, emp_fields) {
//                 console.log(emp_rows.length)
//                 for (var e in emp_rows) {
//                     console.log(e.movie_id)
//                     if(!(e.movie_id) in movies){
//                         movies.push({
//                             key:   e.movie_id,
//                             value: 1
//                         });
//                     }
//                     else{
//                         movies[e.movie_id] += 1;
//                     }
//                 }                
//             });
//         });
//     });
// });

