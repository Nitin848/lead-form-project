const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

app.use(bodyParser.json());

app.post('/submit-form', async (req, res) => {
    const { name, phone, email, description } = req.body;

    try {
        await pool.query(
            'INSERT INTO contacts (name, phone, email, description) VALUES ($1, $2, $3, $4)',
            [name, phone, email, description]
        );
        res.status(200).send('Form submitted successfully!');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error saving form data');
    }
});

app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running');
});
