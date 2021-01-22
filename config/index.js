require('dotenv').config();

const config = {
  username: process.env.TWITTER_USERNAME,
  password: process.env.TWITTER_PASSWORD
}

module.exports = config;