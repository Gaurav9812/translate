# Translation Caching
Goal Develop a web server that exposes an API to translate a text.

A Effective caching mechnism during text translation process.

Task Create a web server with a RESTful API to translate a text from one language to another give target language.

For the actual text translation, an external service like Google Translate used.

The source and target language should be definable via the API, if source language is not defined then it should detect it.

In addition, cache (store in Database) translations, in order to avoid repeated hits to the translation API.

The cache must be persistent! The server should have an extensible architecture.

E.g. We should be able to change our caching strategy or switch out our translation service without any hassle.

Tech stack used NodeJS & ExpressJS (a flexible Node.js web application framework) as beckend.

Google translate as an external service for actual text translation. mongoose to store cache in database.

chai to test the APIs.

# Bonus task
As a bonus task, implement smart pre-caching.

This means we assume that if a user translates a text into Kannada, he is likely to also translate the same text to Hindi.

Therefore we want to not only request Kannada from the external service but also other languages like Hindi, Tamil, etc. and store it in our cache.

The smart caching should not affect the response time of the translation API.

# Install Dependencies
npm install Run the app

# Run in development mode
npm run devStart

# Run in production mode
npm start Exposed Api To get the text translation,

we can use Postman : and in body parameter(x-www-form-urlencoded) you have to pass content as key and value u wan to translate and

url ->http://localhost:8000/

# Caching
In order to avoid repeated hits to the translation API, caching of translation is done.

If the HTTP method is POST then we cache the translation. first time when a unique request is made it will take actual time to fetch the response.

some Language like tamil telugu are stored in data base for smart caching when first request are made for smart cahing.

After that it get stored in database. Now after each time if same request is made it will get fetched from database.

In case same sentence is asked to translate in different language then again it fetched using external translation library.

# Testing
Testing on our REST API is done using chai along with mocha(which provide less complex structure to handle request.)

Test cases where written to provide whether the the request return statusCode as 200.

To test the APIs.

Test once on hitting this command npm test
