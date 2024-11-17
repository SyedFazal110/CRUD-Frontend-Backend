// dotenv
import dotenv from "dotenv";
dotenv.config();

import express from "express";

const app = express();
const port = 3000;

// middleware
app.use(express.json());

// app.use((req, res, next) => {
//   console.log("Time:", Date.now());
//   next();
// });

const users = [];

app.get("/", (req, res) => {
    res.send("hello world!");
});

// add new user
app.post("/user", (req, res) => {
    const { title } = req.body;
    if (!title) {
        res.status(400).json({
            message: "title is required",
        });
        return;
    }

    users.push({
        title,
        id: Date.now(),
    });

    res.status(201).json({
        message: "user is created",
        data: users,
    });
});

// get all user
app.get("/users", (req, res) => {
    res.status(200).json({
        data: users,
    });
});

// get single user
app.get("/user/:id", (req, res) => {
    const { id } = req.params;

    const index = users.findIndex((item) => item.id === +id);

    if (index === -1) {
        res.status(404).json({
            message: "user not found",
        });
        return;
    }

    res.status(200).json({
        data: users[index],
    });
});

app.delete(`/user/:id`, (req, res) => {
    const { id } = req.params;

    const index = users.findIndex((item) => {
        return item.id === +id
    })

    if (index === -1) {
        res.status(404).json({
            message: `no user found`
        })
        return;
    }
    users.splice(index, 1)
    res.status(200).json({
        message: `user deleted successfully`,
        data: users,
    })

})


app.put("/todo/:id", (req, res) => {
    const { id } = req.params;
    const index = Todo.findIndex((item) => item.id === +id);
    if (index === -1) {
      res.status(400).json({
        message: "No todo found",
      });
      return;
    }
    Todo.splice(index, 1);
    const { editTodo } = req.body;
  
    if (!editTodo) {
      res.status(400).json({
        message: "First edit a Todo",
      });
      return;
    }
    Todo[index] = {
      ...Todo[index],
      id,
      title: editTodo,
    };
    res.status(200).json({
      message: "Todo Edited Successfully",
      Todo,
    });
  });



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

// get
// post
// delete
// put

// 404 not found