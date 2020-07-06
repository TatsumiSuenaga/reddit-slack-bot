'use strict';

const axios = require('axios');
const { extractPosts, formatSlackMessage, searchForPosts } = require('./helpers');

module.exports.getCelestePosts = async (event, context, callback) => {
  try {
    const results = await searchForPosts('NoFeeAC', 'Celeste', 5);
    const posts = extractPosts(results.data);
    const headers = {
      'Content-type': 'application/json'
    };
    await axios.post(
      'https://hooks.slack.com/services/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',
      formatSlackMessage(posts),
      headers
      );
    callback(null, {posts});
  } catch (error) {
    return `${error.name}: ${error.message}`;
  }
};
