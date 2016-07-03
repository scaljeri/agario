## AGAR.IO Driver [![Build Status](https://travis-ci.org/scaljeri/agario-driver.svg?branch=master)](https://travis-ci.org/scaljeri/agario-driver) [![Code Climate](https://codeclimate.com/github/scaljeri/agario-driver/badges/gpa.svg)](https://codeclimate.com/github/scaljeri/agario-driver) [![Coverage Status](https://coveralls.io/repos/github/scaljeri/agario-driver/badge.svg?branch=master)](https://coveralls.io/github/scaljeri/agario-driver?branch=master) [![Dependency Status](https://david-dm.org/scaljeri/agario-driver.svg)](https://david-dm.org/scaljeri/agario-driver) [![devDependency Status](https://david-dm.org/scaljeri/agario-driver/dev-status.svg)](https://david-dm.org/scaljeri/agario-driver#info=devDependencies)

[![Join the chat at https://gitter.im/scaljeri/agario-driver](https://badges.gitter.im/scaljeri/agario-driver.svg)](https://gitter.im/scaljeri/agario-driver?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

The goal of this project is twofold:

    1) Manage the environment for an agar.io bot game play
        * Facebook login
        * black and white and low res setup
        * Start/stop the game  (restart on game-over)
        * Shared libraries for agar.io bots in general
    2) A bot implementation

The basis for endless bot play :)

## Project status
Currently the focus is on image processing. After that a bot will be built. 

## Setup

    $> git clone https://github.com/scaljeri/agario-driver.git
    $> cd agario-driver
    $> npm install
    $> npm run bundle
    
## Testing
All code is tested except for the page objects. To run the tests do

    $> npm test
    
To checkout the code-coverage report 

    $> open coverage/lcov-report/index.html
    
## Commandline arguments
There are many command-line-options available which I will explain below

### --facebook
Before using this option make sure you have a file called `facebook.json`. This
JSON file holds your facebook credentials and should look like the following

    {
        username: "bar"
        password: "foo123"
    }
    
and the CLI
    
    $> ./driver.js --facebook

### [--snapshots=output_dir]
This option enables you to take screenshots while playing the game manually

    $> ./driver.js --snapshots
    
Hit `t` to take a snapshot which will be written into the `./snapshots` folder.
If you would like to change the output directory 

    $> ./driver.js --snapshots ./screenshots

If the directory does not exists it will be create for you.
These screenshots can be used to test and improve your bot if necessary.

### [--dry=image_file]
As a bot developer you can use this option to test your bot against a specific snapshot. Although
the response from the bot is written to the console, the whole analysis is also written to image.
For example, if the input image was `img.png`, the analysed version is `img-proc.png`. Note that
you have to use `--bot` to incorporate the results from the bot!

    $> ./driver.js --dry=./snapshots/MdHfeD.png
    
### [--bot=[bot_file.js]
TODO





TODO ------------

## Chromedriver

is a perfect tool to control pages
like [agario](http://agar.io). In theory you can use any browser, but this project is only tested
with Chrome. Download the Chromedriver from [here](https://sites.google.com/a/chromium.org/chromedriver/downloads)

TODO: Run the executable or is there more ????

## Bundle


Because Webdriver is used to control the page, but the javascript doing all the hard work gets injected 
into the page to boost performance (Webdriver is so extremely slow!)

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
    
## Snapshots

    $> ./bot.js --facebook --snapshots=./snapshots
    
    
## Manual load bundle

First start a webserver in the root of the project. For example

    $> python -m SimpleHTTPServer
    
Next, open the console and enter the following code

    console> $.getScript('http://localhost:8000/bundle.js')
    
TODO: Start the bot


Open the console of Chrome and enter the f

## Bookmarks

  * https://github.com/agariohack/agario-hack: Fake mouse movement
  
a=document.getElementById("canvas"),b=this.onkeydown,c=this.onkeyup,d=a.onmousemove,e=a.width/2,f=a.height/2,this.onkeydown=function(g){b(g),83!=g.keyCode||(e=-100000),68!=g.keyCode||(f=100000),69!=g.keyCode||(f=-100000),70!=g.keyCode||(e=100000),d({clientX:e,clientY:f})},this.onkeyup=function(g){c(g),83!=g.keyCode||(e=a.width/2),68!=g.keyCode||(f=a.height/2),69!=g.keyCode||(f=a.height/2),70!=g.keyCode||(e=a.width/2),d({clientX:e,clientY:f})},a.onmousemove=null,alert("You're ready to play Agar.io with ESDF!");

let okd =  window.onkeydown; window.onkeydown = (e) => {console.log('down:' + e.keyCode);okd({keyCode: e.keyCode === 32 ? 32 : 87});}
let oku =  window.onkeyup; window.onkeyup = (e) => { console.log('up:' + e.keyCode);oku({keyCode: e.keyCode === 32 ? 32 : 87});}

### agarly.com - Play it like a PRO
Although agar.io is a great game, [agarly](http://agarly.com/2W41j) is a variant of this game with a lot of
action and a lot more fun. It is a game where you have to be fast and trick your opponents all the time. 
Maybe in the far future I'll write a bot for this game too, but until then you have to do it with human-play only.
I've written a hack which enables you to shoot with any key (not **spacebar** of course). This way you can switch 
faster between splitting and merging by shooting. Copy-past the code below into your browser's console 
(tested in Chrome only) and you can play as a PRO!

    (function (w) {
       let timer;
       
        function changeKeyListeneres() {
            let okd, oku, burst;
            
            function onKeyDown(e) {
                let count = 0;
                
                // Any key (except `w` and `space-bar`
                if (!~[32, 87].indexOf(e.keyCode) && !burst) {
                    burst = setInterval(() => {
                        count ++;
                        if (count === 20) {
                            clearInterval(burst);
                            burst = null;
                        }
                        
                        okd({keyCode: 87});
                        oku({keyCode: 87});
                    }, 20);
                } else {
                    okd({keyCode: e.keyCode === 32 ? 32 : 87});
                }
            }

            if (w.onkeydown !== okd) {
                okd = w.onkeydown;
                w.onkeydown = onKeyDown;

                oku = w.onkeyup;
                w.onkeyup = (e) => {
                        oku({keyCode: e.keyCode === 32 ? 32 : 87});
                }
                
                clearInterval(timer);
                console.log('Setup is ready, enjoy playing!!!');
            }
        }

        timer = setInterval(() => {
            if (window.onkeydown) {
                changeKeyListeneres();
            }
        }, 500);
    })(window);

NOTE: You have to run this code as soon as possible when the intro-spinner is gone. Wait until you see the message 
that it is ready before you begin!

IMPORTANT: If you see a cell with the name `TeAm XtreMe` it most likely will be me - please don't eat me!!!
