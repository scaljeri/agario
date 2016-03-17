## Bundle

To bundle run 

    $> npm run bundle
    
which is equivalent to

    $> browserify -t [ babelify --presets [ es2015 ] ] src/index.js -o bundle.js
    
## Run tests

To run the tests 

    $> npm test
    
which is equivalent to

    $> ./node_modules/.bin/mocha --compilers js:babel-core/register --harmony
    
This command uses the `.babelrc` file in order to compile ES2015

## Facebook

To automatically login with your facebook account create a file called `credentails.txt` which should contain
your credentials in JSON format

    {
        "username": "my-name@facebook.com",
        "password": "my-password"
    }