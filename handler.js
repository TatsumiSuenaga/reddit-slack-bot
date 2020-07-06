'use strict';

const axios = require("axios");
const { extractPosts, formatSlackMessage, searchForPosts } = require('./helpers');

module.exports.getCelestePosts = async (event, context, callback) => {
  try {
    const results = await searchForPosts('NoFeeAC', 'Celeste', 5);
    console.log(results);
    const posts = extractPosts(results.data);
    const headers = {
      'Content-type': 'application/json'
    };
    await axios.post(
      process.env.SLACK_WEB_HOOK_URL,
      formatSlackMessage(posts),
      headers
      );
    callback(null, {posts});
  } catch (error) {
    console.log(error);
    return `${error.name}: ${error.message}`;
  }
};
