var jar = require('selenium-server-standalone-jar');

exports.config = {
	framework: 'jasmine',
	seleniumServerJar: jar.path,
  	specs: ['./src/**/*.test.js'],
  	baseUrl: 'http://localhost:3000',
  	chromeDriver: './node_modules/chromedriver/lib/chromedriver/chromedriver.exe',
  	capabilities: {
        'browserName': 'chrome'
    }
};