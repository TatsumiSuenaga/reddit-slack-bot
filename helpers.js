const axios = require("axios");

const extractPosts = (results) => {
  const posts = results.data.children;
  return posts.reduce((acc, curr) => {
    const post = curr.data;
    if (post.link_flair_text !== 'CLOSED') {
      acc.push({
        author: post.author_flair_text,
        title: post.title,
        flair: post.link_flair_text,
        attachmentColor: post.link_flair_background_color ? post.link_flair_background_color : '#36a64f',
        url: post.url,
        created: post.created_utc,
        subreddit: post.subreddit_name_prefixed,
        selftext: post.selftext ? post.selftext : 'No description found!'
      });
    }
    return acc;
  }, []);
};

const searchForPosts = async (subreddit, keyword, limit) => {
  return await axios.get(`https://www.reddit.com/r/${subreddit}/search.json?q=${keyword}&limit=${limit}&sort=new&restrict_sr=1`);
};

const formatSlackMessage = (posts, messageTitle) => {
  const attachments = posts.map(post => ({
    "fallback": "Required plain-text summary of the attachment.",
    "color": post.attachmentColor,
    "author_name": post.subreddit,
    "author_link": `https://reddit.com/${post.subreddit}`,
    "title": post.title,
    "title_link": post.url,
    "text": post.selftext,
    "fields": [
      {
        "title": "Flair",
        "value": post.flair
      },
      {
        "title": "Post Author",
        "value": post.author
      }
    ],
    "footer": "NookBot",
    "footer_icon": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR43XbyILI8UXGYD_9iLTPOx_JBsvJVZYcnsQ&usqp=CAU",
    "ts": post.created
  }));

  return {
    "text": messageTitle,
    "attachments": attachments
  };
};

module.exports = {
  extractPosts,
  formatSlackMessage,
  searchForPosts
};
