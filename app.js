const express = require('express');
const cors = require('cors');
const data = require('./api/students');
const port = parseInt(process.env.PORT || 8080);

const app = express();
app.use(cors());

function findMatch(data, id) {
    for (i=0; i<data.length; i++) {
        if(data[i].id == id) {
            return data[i];
        }
    }
    return null;
}

app.get('/', (req, res) => {
    res.json({ data });
})

app.get('/:id', function (req, res) {
    const student = findMatch(data, req.params.id);
    if(!student) {
        res.status(404).json({
            error: {
                message: 'Error, id does not exist!'
            }
        })
    } else {
        res.json({ data: student })
    }
})
app.listen(port, () => console.log(`listening on http://localhost:${port}`))