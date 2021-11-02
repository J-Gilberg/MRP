const express = require('express'),
    router = express.Router();

// get user lists
router.get('/orders/all', function (req, res) {
    let sql = `SELECT * FROM orders`;
    db.query(sql, function (err, data, fields) {
        if (err) throw err;
        res.json({
            status: 200,
            data,
            message: "User lists retrieved successfully"
        })
    })
});

// create new order
router.post('/new', function (req, res) {
    let sql = `INSERT INTO orders(name, gender) VALUES (?)`;
    let values = [
        req.body.name,
        req.body.gender
    ];
    db.query(sql, [values], function (err, data, fields) {
        if (err) throw err;
        res.json({
            status: 200,
            data,
            message: "New order added successfully"
        })
    })
});

module.exports = router;

// module.exports = function (app) {
//     // Route to get all
//     app.get("/api/orders/all", (req, res) => {
//         db.query("SELECT * FROM orders", (err, result) => {
//             if (err) {
//                 console.log(err)
//             }
//             res.send(result)
//         }
//         );
//     });

//     // Route to get one post
//     app.get("/api/orders/product/:productid", (req, res) => {
//         const id = req.params.id;
//         db.query("SELECT * FROM orders WHERE product_id = ?", id, (err, result) => {
//             if (err) {
//                 console.log(err)
//             }
//             res.send(result)
//         }
//         );
//     });


// app.post('/api/create', (req, res) => {
//     const username = req.body.userName;
//     const title = req.body.title;
//     const text = req.body.text;
//     console.log(username, title, text)
//     db.query("INSERT INTO posts (title, post_text, user_name) VALUES (?,?,?)", [title, text, username], (err, result) => {
//         if (err) {
//             console.log(err)
//         }
//         console.log(result)
//     }
//     );
// })

// app.post('/api/like/:id', (req, res) => {
//     const id = req.params.id;
//     db.query("UPDATE posts SET likes = likes + 1 WHERE id = ?", id, (err, result) => {
//         if (err) {
//             console.log(err)
//         }
//         console.log(result)
//     }
//     );
// });

// app.delete('/api/delete/:id', (req, res) => {
//     const id = req.params.id;
//     db.query("DELETE FROM posts WHERE id= ?", id, (err, result) => {
//         if (err) {
//             console.log(err)
//         }
//     })
// })
// }
