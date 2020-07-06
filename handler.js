'use strict';

const axios = require("axios");
const { extractPosts, formatSlackMessage, searchForPosts } = require('./helpers');

module.exports.getCelestePosts = async () => {
  try {
    const results = await searchForPosts('NoFeeAC', 'Celeste', 5);
    const posts = extractPosts(results.data);
    const headers = {
      'Content-type': 'application/json'
    };
    await axios.post(
      `${process.env.SLACK_WEB_HOOK_URL}`,
      formatSlackMessage(posts, 'Hello! Hope one of these posts leads you to Celeste!'),
      headers
      );
  } catch (error) {
    console.log(error);
    return `${error.name}: ${error.message}`;
  }
};
