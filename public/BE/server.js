const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
const port = 3000;

// Cors configuration - Allows requests from localhost:4200
const corsOptions = {
    origin: "http://localhost:4200",
    optionsSuccessStatus: 204,
    methods: "GET, POST, PUT, DELETE",
};

// Use cors middleware
app.use(cors(corsOptions));

// Use express.json() middleware to parse JSON bodies of requests
app.use(express.json());

// GET route - Allows to get all the employees
app.get("/employee", (req, res) => {

    fs.readFile("db.json", "utf8", (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send("Internal Server Error");
            return;
        }

        const jsonData = JSON.parse(data);

        res.status(200).json(jsonData.employees);
    });
});

// POST route - Allows to add a new item
app.post("/employee", (req, res) => {
    const employee = req.body;

    fs.readFile("db.json", "utf8", (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send("Internal Server Error");
            return;
        }

        const jsonData = JSON.parse(data);

        const maxId = jsonData.employees.reduce(
            (max, item) => Math.max(max, item.id),
            0
        );

        const newItem = {
            ...employee,
            id: maxId + 1,
        };

        jsonData.employees.push(newItem);

        fs.writeFile("db.json", JSON.stringify(jsonData), (err) => {
            if (err) {
                console.log(err);
                res.status(500).send("Internal Server Error");
                return;
            }

            res.status(200).json(jsonData.employees);
        });
    });
});

// PUT route - Allows to update an item
app.put("/employee/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const employee = req.body;

    fs.readFile("db.json", "utf8", (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send("Internal Server Error");
            return;
        }

        const jsonData = JSON.parse(data);

        const index = jsonData.employees.findIndex((item) => item.id === id);

        if (index === -1) {
            res.status(404).send("Not Found");
            return;
        }

        jsonData.employees[index] = {
            ...employee,
            id
        }

        fs.writeFile("db.json", JSON.stringify(jsonData), (err) => {
            if (err) {
                console.log(err);
                res.status(500).send("Internal Server Error");
                return;
            }

            res.status(200).json(jsonData.employees);
        });
    });
});

// DELETE route - Allows to delete an item
app.delete("/employee/:id", (req, res) => {
    const id = parseInt(req.params.id);

    fs.readFile("db.json", "utf8", (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send("Internal Server Error");
            return;
        }

        const jsonData = JSON.parse(data);

        const index = jsonData.employees.findIndex((item) => item.id === id);

        if (index === -1) {
            res.status(404).send("Not Found");
            return;
        }

        jsonData.employees.splice(index, 1);

        fs.writeFile("db.json", JSON.stringify(jsonData), (err) => {
            if (err) {
                console.log(err);
                res.status(500).send("Internal Server Error");
                return;
            }

            res.status(200).send(jsonData.employees);
        });
    });
});

// GET route - Allows to get all the messages
app.get("/messages", (req, res) => {

    fs.readFile("db.json", "utf8", (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send("Internal Server Error");
            return;
        }

        const jsonData = JSON.parse(data);

        res.status(200).json(jsonData.messages);
    });
});

// PUT route - Allows to update an item
app.put("/messages/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { readStatus } = req.body;

    fs.readFile("db.json", "utf8", (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send("Internal Server Error");
            return;
        }

        const jsonData = JSON.parse(data);

        const index = jsonData.messages.findIndex((item) => item.id === id);

        if (index === -1) {
            res.status(404).send("Not Found");
            return;
        }

        jsonData.messages[index] = {
            ...jsonData.messages[index],
            readStatus: readStatus === 'read' ? 'unread' : 'read'
        }

        fs.writeFile("db.json", JSON.stringify(jsonData), (err) => {
            if (err) {
                console.log(err);
                res.status(500).send("Internal Server Error");
                return;
            }

            res.status(200).json(jsonData.messages);
        });
    });
});

// GET route - Allows to get all the dropdown values
app.get("/dropdown", (req, res) => {

    fs.readFile("db.json", "utf8", (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send("Internal Server Error");
            return;
        }

        const jsonData = JSON.parse(data);
        delete jsonData.employees;

        res.status(200).json(jsonData);
    });
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});