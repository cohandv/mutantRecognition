'use strict';

//This allows you to test it locally
if (process.env.CMD) {

}


//Show the output when running locally
if (process.env.CMD) {
  const Console = require('./implementations/console')
  new Console().execute()
} else {
  const Http = require('./implementations/http')
  new Http().start()
}
