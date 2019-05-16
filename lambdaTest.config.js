require('dotenv').config();

module.exports = {
  "src_folders": ["tests"],

  "selenium": {
    "start_process": false,
    "server_path": "",
    "log_path": "",
    "host": "hub.lambdatest.com",
    "port": 80,
    "cli_args": {
      "webdriver.chrome.driver": "",
      "webdriver.ie.driver": "",
      "webdriver.firefox.profile": ""
    }
  },

  "test_runner": "mocha",

  "test_workers": { "enabled": true, "workers": "auto" },

  "test_settings": {
    "default": {
      "launch_url": "https://lambdatest.com",
      "selenium_port": 80,
      "selenium_host": "hub.lambdatest.com",
      "screenshots": {
        "enabled": true,
        "path": ""
      },
      "username": process.env.LT_USERNAME,
      "access_key": process.env.LT_ACCESS_KEY,

      "skip_testcases_on_fail": false,

      "desiredCapabilities": {
        "build": "Nightwatch-Selenium-Sample",
        "visual": true,
        "video": true
      }
    },

    "chrome": {
      "desiredCapabilities": {
        "platform": "Windows 10",
        "browserName" : "chrome",
        "version" : "73.0",
        "resolution" : "1920x1080",
        "selenium_version" : "3.13.0",
        "tunnel" : true,
        "visual" : true,
        "chrome.driver" : 73.0
      }
    }
  }
}