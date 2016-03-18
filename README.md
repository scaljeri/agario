## AGAR.IO

This is an agar.io bot, which does its magic by analysing the canvas (image processing). 
Webdriver is used to control the page, but the javascript doing all the hard work gets injected 
into the page to boost performance (Webdriver is so extremely slow!)

So, the code that is injected is bundje.js and should be created first before you start the 
main application.

## Bundle

The code inside `bundle.js` is the code that does the smart stuff, image processing and moving
the bot. The bundle is created as follows:

    $> npm run bundle
    
which is equivalent to

    $> browserify -t [ babelify --presets [ es2015 ] ] src/index.js -o bundle.js
    
## Run tests

Tu run the unit tests 

    $> npm test
    
which is equivalent to

    $> ./node_modules/.bin/mocha --compilers js:babel-core/register --harmony
    
This command uses the `.babelrc` file in order to compile ES2015 to ES5

## Facebook

If you like the bot can play using you Facebook account. For this to work you can provide you
credentials in a file called `facebook.json`. Example file:

    {
        "username": "my-name@facebook.com",
        "password": "my-password"
    }
    
docker run --rm -it --net my-network -v  /Users/lucas/WebstormProjects/agario:/home/dev/workspace --net=my-network --name n5ia n5i
