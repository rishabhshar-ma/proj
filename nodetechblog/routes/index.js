var express = require('express');
var router = express.Router();
var conn = require("../dbConfig/connection");
var session = require("express-session")
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});
router.post("/add-admin-action", (req, res) => {
    console.log(req.body);
    let {username, password, fullname, phone} = req.body;
    let selectSQL = "select * from admin where username='" + username + "'";
    conn.query(selectSQL, (err, rows) => {
        if (err)
            res.send(err.message);
        if (rows.length > 0) {
            res.send("exists");
        } else {
            let insertSQL = `insert into admin values('${username}','${password}','${fullname}','${phone}','active')`
            conn.query(insertSQL, (er) => {
                if (er)
                    res.send(er.message);
                res.send("inserted");
            })
        }
    })
})

router.get("/fetch-admins", (req, res) => {
    let selectSQL = "select * from admin where username !='" + session.adminSession + "'";
    conn.query(selectSQL, (err, rows) => {
        if (err)
            res.send(err.message);
        res.send(rows);
    })
})

router.post("/admin-login-action", (req, res) => {
    console.log(req.body);
    let {username, password} = req.body;
    let selectSQL = `select * from admin where username='${username}' and password='${password}' and status='active'`;
    //console.log(selectSQL);
    conn.query(selectSQL, (err, row) => {
        if (err)
            res.send(err.message);
        if (row.length > 0) {
            session.adminSession = username;
            //console.log("success");
            res.send("success");
        } else {
            res.send("fail");
        }
    })
})

router.get("/admin-check-authentication", (req, res) => {
    if (session.adminSession !== undefined) {
        res.send(session.adminSession);
    } else {
        res.send("fails")
    }
})

router.post("/update-password", (req, res) => {
    console.log(req.body);
    let {opassword, npassword, cpassword} = req.body;
    let username = session.adminSession;
    let selectSQL = `select * from admin where username='${username}' and password='${opassword}'`;
    // console.log(selectSQL);
    conn.query(selectSQL, (err, row) => {
        if (err)
            res.send(err.message);
        if (row.length > 0) {
            if (npassword === cpassword) {
                let updateSQL = `update admin set password='${npassword}' where username='${username}'`;
                //console.log(updateSQL);
                conn.query(updateSQL, (err) => {
                    if (err)
                        res.send(err.message);
                    res.send("updated");
                })
            } else {
                res.send("new and confirm not");
            }
        } else {
            res.send("Old not");
        }
    })
})

router.get("/admin-logout", (req, res) => {
    session.adminSession = undefined;
    res.send("logged out")
})

router.post("/update-status-admin", (req, res) => {
    console.log(req.body);
    let {username, status} = req.body;
    let updateSQL = `update admin set status='${status}' where username='${username}'`;
    conn.query(updateSQL, (err) => {
        if (err)
            res.send(err.message);
        res.send("updated");
    })
})

router.post("/add-category", (req, res) => {
    console.log(req.body);
    let {category} = req.body;
    let select = `select * from categories where cat_name='${category}'`;
    conn.query(select, (err, row) => {
        if (err)
            res.send(err.message);
        if (row.length > 0)
            res.send("exists")
        else {
            let insertSQL = `insert into categories values(null,'${category}')`;
            conn.query(insertSQL, (err) => {
                if (err)
                    res.send(err.message);
                res.send("inserted");
            })
        }
    })
})

router.get("/view-categories", (req, res) => {
    let selectSQL = "select * from categories";
    conn.query(selectSQL, (err, rows) => {
        if (err)
            res.send(err.message)
        res.send(rows);
    })
})
router.get("/del-category/:id", (req, res) => {
    console.log(req.params);
    let {id} = req.params;
    let delSQL = "delete from categories where cat_id=" + id;
    conn.query(delSQL, (err) => {
        if (err)
            res.send(err.message);
        res.send("deleted");
    })
})
router.post("/user-registration", (req, res) => {
    console.log(req.body);
    let {email, fullname, password, phone} = req.body
    let select = `select * from users where email='${email}'`;
    conn.query(select, (err, row) => {
        if (err)
            res.send(err.message)
        if (row.length > 0) {
            res.send("exists")
        } else {
            let insertSQL = `insert into users values('${email}','${fullname}','${password}','${phone}')`;
            conn.query(insertSQL, (err) => {
                if (err)
                    res.send(err.message);
                res.send("inserted");
            })
        }
    })
})

router.post("/userLoginAction", (req, res) => {
    let {email, password} = req.body;
    let selectSQL = `select * from users where email='${email}' and password='${password}'`;
    conn.query(selectSQL, (err, row) => {
        if (err)
            res.send(err.message);
        if (row.length > 0) {
            session.userSession = email;
            res.send("loggedIn");
        } else {
            res.send("invalid")
        }
    })
})

router.get('/user-check-authentication', (req, res) => {
    if (session.userSession !== undefined) {
        res.send(session.userSession);
    } else {
        res.send("fails")
    }

})


router.post("/post-question", (req, res) => {
    console.log(req.body);
    let {category, nquestion} = req.body;
    let dt = new Date();
    let user = session.userSession
    let qdate = dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate();
    let insertSQL = `insert into questions values(null,'${nquestion}',${category},'${user}','${qdate}')`
    console.log(insertSQL);
    conn.query(insertSQL, (err) => {
        if (err)
            res.send(err.message);
        res.send("inserted");
    })
})

router.get("/view-my-questions", (req, res) => {
    let selectSQL = "select DATE_FORMAT(ques_date,'%d %M,%Y') as qdate,questions.*,categories.* from questions inner join categories on questions.category=categories.cat_id where user='" + session.userSession + "'";
    conn.query(selectSQL, (err, rows) => {
        if (err)
            res.send(err.message)
        res.send(rows);
    })
})
router.get("/del-question/:qid", (req, res) => {
    let {qid} = req.params;
    console.log(qid);
    let deleteSQL = `delete from questions where ques_id=${qid}`;
    conn.query(deleteSQL, (err) => {
        if (err)
            res.send(err.message);
        res.send("deleted");
    })
})

router.post("/add-answers", (req, res) => {
    console.log(req.body);
    let {qid, answer} = req.body;
    let dt = new Date();
    let user = session.userSession
    let a_date = dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate();
    let insertSQL = `insert into answers values(null,'${answer}',${qid},'${user}','${a_date}','pending',0)`;
    conn.query(insertSQL, (err) => {
        if (err)
            res.send(err.message);
        res.send("inserted");
    })
})

router.get("/fetch-answers/:ques_id", (req, res) => {
    console.log(req.params);
    let {ques_id} = req.params;
    let user = session.userSession;
    let selectSQL = `select DATE_FORMAT(ans_date,'%d %M,%Y') as adate,answers.* from answers inner join questions on 
answers.question=questions.ques_id where ques_id=${ques_id}`;
    console.log(selectSQL);
    conn.query(selectSQL, (err, rows) => {
        if (err)
            res.send(err.message);
        res.send(rows);
    })
})

router.get("/get-questions", (req, res) => {

    let checkCorrect = "select * from questions order by ques_id desc";
    conn.query(checkCorrect, (e, rows) => {
        if (e)
            res.send(e.message);
        if (rows.length > 0) {
            let selectSQL = `select DATE_FORMAT(ques_date,'%d %M %Y') as quesDate,questions.* from questions inner join categories on 
questions.category = categories.cat_id where user != '${session.userSession}'`;
            conn.query(selectSQL, (err, rows) => {
                if (err)
                    res.send(err.message)
                res.send(rows);
            })
        }
    })


})

router.get("/get-answers/:qid", (req, res) => {
    console.log(req.params);
    let {qid} = req.params;
    let selectSQL = "select DATE_FORMAT(ans_date,'%d %M,%Y') as adate,answers.* from answers where question=" + qid;
    console.log(selectSQL)
    conn.query(selectSQL, (e, rows) => {
        if (e)
            res.send(e.message);
        res.send(rows)
    })
})

function getAnswers(rows) {
    return new Promise((resolve, reject) => {
        let counter = 0;
        for (let i = 0; i < rows.length; i++) {
            let sql = `SELECT * FROM answers where question=${rows[0].ques_id}`
            conn.query(sql, (e, row) => {
                rows[i].answers = row
                counter++
                if (counter === rows.length) {
                    resolve(rows)
                }
            })
        }
    })
}

router.get("/get-questions-user", (req, res) => {
    let selectSQL = `select DATE_FORMAT(ques_date,'%d %M,%Y') as qdate,questions.*, categories.cat_name  from questions inner join categories on categories.cat_id = questions.category where user!='${session.userSession}'`;
    console.log(selectSQL)
    conn.query(selectSQL, async (err, rows) => {
        if (err)
            res.send(err.message);
        // console.log(rows)
        await getAnswers(rows)
        res.send(rows);
    })
})
router.post("/update-ans-status", (req, res) => {
    let {answer, question} = req.body;
    let updateSQL = `update answers set status='correct' where ans_id=${answer}`;
    conn.query(updateSQL, (err) => {
        if (err)
            res.send(err.message);
        res.send("updated");
    })
})
router.get("/search/:str", (req, res) => {
    console.log(req.params);
    let {str} = req.params;
    let selectSQL = `select DATE_FORMAT(ques_date,'%D %M,%Y') as quesDate,questions.* from questions where question like '%${str}%'`;
    console.log(selectSQL);
    conn.query(selectSQL, (err, rows) => {
        if (err)
            res.send(err.message);
        res.send(rows)
    })
})
router.get("/user-logout", (req, res) => {
    session.userSession = undefined;
    res.send("logged out")
})

router.post("/add-blog", (req, res) => {
    console.log(req.body);
    let user = session.userSession;
    let {category, message,title} = req.body;
    let dt = new Date();
    let b_date = dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate() + " " + dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
    let insertSQL = `insert into blogs values(null,'${message}','${user}','${b_date}',${category},'${title}')`;
    console.log(insertSQL);
    conn.query(insertSQL, (err) => {
        if (err)
            res.send(err.message);
        res.send("inserted");
    })
})

router.get("/view-my-blogs", (req, res) => {
    let user = session.userSession;
    let selectSQL = `select DATE_FORMAT(blog_dt,'%d %M,%Y %h:%i %p') as bdt, blogs.*,categories.cat_name as cat_name from blogs inner join categories on blogs.category=categories.cat_id where user='${user}' order by blog_dt desc`;
    console.log(selectSQL);

    conn.query(selectSQL, (err, rows) => {
        if (err)
            res.send(err.message);
        res.send(rows);
    })
})
router.get("/del-blog/:blogId",(req,res)=>{
    let {blogId} = req.params;
    let delSQL = "delete from blogs where blog_id="+blogId;
    conn.query(delSQL,(err)=>{
        if(err)
            res.send(err.message);
        res.send("deleted");
    })
})

router.get("/fetch-blogs",(req,res)=>{
    let selectSQL = "select DATE_FORMAT(blog_dt,'%d %M,%y') as bdt, blogs.*,categories.cat_name as cat_name,users.fullname from blogs inner join users on blogs.user= users.email inner join categories on blogs.category=categories.cat_id order by blog_dt desc";
    console.log(selectSQL);
    conn.query(selectSQL,(err,rows)=>{
        if(err)
            res.send(err.message);
        res.send(rows);
    })
})

router.get("/blog-details/:blog_id",(req,res)=>{
    console.log(req.params);
    let {blog_id} = req.params;
    let selectSQL = `select DATE_FORMAT(blog_dt,'%d %M,%y') as bdt, blogs.*,categories.cat_name as cat_name,users.fullname from blogs inner join users on blogs.user= users.email inner join categories on blogs.category=categories.cat_id where blog_id=${blog_id}`;
    conn.query(selectSQL,(err,rows)=>{
        if(err)
            res.send(err.message);
        res.send(rows);
    })
})

module.exports = router;
