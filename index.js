const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Set the views directory
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

const BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=';

app.get('/', async (req, res) => {
    const query = req.query.search || 'a'; // Default to 'a' if no search query is provided
    const url = `${BASE_URL}${query}`;

    try {
        const response = await axios.get(url);
        const cocktails = response.data.drinks;

        res.render('index', {
            cocktails: cocktails || [],
            error: cocktails ? null : 'No cocktails found for this search query.'
        });
    } catch (error) {
        console.error('Error fetching data from API:', error);
        res.render('index', {
            cocktails: [],
            error: 'Error fetching data from API. Please try again later.'
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
