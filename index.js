const express = require('express');
const axios = require('axios');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

const BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=';

app.get('/', async (req, res) => {
    const query = req.query.search || 'a'; // Default to 'a' if no search query is provided
    const url = `${BASE_URL}${query}`;

    try {
        const response = await axios.get(url);
        const cocktails = response.data.drinks;

        res.render('index.ejs', {
            cocktails: cocktails || [],
            error: cocktails ? null : 'No cocktails found for this search query.'
        });
    } catch (error) {
        console.error('Error fetching data from API:', error);
        res.render('index.ejs', {
            cocktails: [],
            error: 'Error fetching data from API. Please try again later.'
        });
    }
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
