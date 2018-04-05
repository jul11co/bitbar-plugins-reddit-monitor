#!/usr/bin/env /Users/manhthiep/.nvm/versions/node/v5.12.0/bin/node

// <bitbar.title>Reddit Monitor</bitbar.title>
// <bitbar.author>Jul11Co</bitbar.author>
// <bitbar.author.github>Jul11Co</bitbar.author.github>
// <bitbar.desc>Get updates from r/SUBREDDIT</bitbar.desc>
// <bitbar.dependencies>node</bitbar.desc>

// To install
// npm install moment nraw async ajax-request resize-img jsonfile fs-extra

var path = require('path');
var fs = require('fs');
var crypto = require('crypto');

var moment = require('moment');
var nraw = require('nraw');
var async = require('async');

var request = require('ajax-request');
var resizeImg = require('resize-img');

var jsonfile = require('jsonfile');
var fse = require('fs-extra');

// name: 'SUBREDDIT'
// opts: {
//   scope: String, // 'new', 'top', 'hot', 'rising'; default: 'new'
//   no_thumb: Boolean, // default: false 
//   interval: Integer, // default: 5 minutes
//   max_posts: Integer, // default: 25
//   thumbs: { POST_TYPE: IMAGE_URL, ...} // POST_TYPE = 'default', 'self', 'nsfw', 'image'
// }
var subreddits = [
  {
    name: 'funny',
    opts: {
      scope: 'hot', 
      interval: 30
    }
  }, 
  {
    name: 'pics',
    opts: {
      scope: 'hot', 
      interval: 15
    }
  }, 
  {
    name: 'EarthPorn',
    opts: {
      scope: 'hot', 
      interval: 30
    }
  }, 
  {
    name: 'movies',
    opts: {
      scope: 'hot', 
      interval: 15
    }
  }, 
  {
    name: 'television',
    opts: {
      scope: 'hot', 
      interval: 15
    }
  }, 
  {
    name: 'videos',
    opts: {
      scope: 'hot', 
      interval: 15
    }
  }, 
  {
    name: 'tech',
    opts: {
      scope: 'new', 
      interval: 30
    }
  },
  {
    name: 'askscience',
    opts: {
      scope: 'new', 
      interval: 30
    }
  },
  {
    name: 'explainlikeimfive',
    opts: {
      scope: 'new', 
      interval: 30,
      no_thumb: true
    }
  },
  {
    name: 'history',
    opts: {
      scope: 'new', 
      interval: 30,
      no_thumb: true
    }
  },
  {
    name: 'lifehacks',
    opts: {
      scope: 'new', 
      interval: 20
    }
  },
  {
    name: 'manga',
    opts: {
      scope: 'hot', 
      interval: 15,
      thumbs: {
        'default': 'https://a.thumbs.redditmedia.com/3Ed51A-eafXqS28ulntBodFuQJOXF5xJNGjpyrcMpu0.png',
        'self': 'https://b.thumbs.redditmedia.com/8oG9z_WABav5V3947rVlqfa240rRM1-awEZkxNwuTgE.png',
        'nsfw': 'https://b.thumbs.redditmedia.com/R8Bo9EY3WBs0CC9qAwWwZ8EsiWqGxzppEP0Vl4212Lk.png',
        'spoiler': 'https://b.thumbs.redditmedia.com/yBs3PfBnqAPLuYwucoIEp8XBLiGzTWosJqRQ7LywP9k.png'
      }
    }
  }, 
  {
    name: 'ProgrammerHumor',
    opts: {
      scope: 'new', 
      interval: 30
    }
  },
  {
    name: 'personalfinance',
    opts: {
      scope: 'new', 
      interval: 30
    }
  },
  {
    name: 'Showerthoughts',
    opts: {
      scope: 'new', 
      interval: 30,
      no_thumb: true
    }
  },
  {
    name: 'todayilearned',
    opts: {
      scope: 'new', 
      interval: 20
    }
  }
];

var default_thumbs = {
  'default': 'https://b.thumbs.redditmedia.com/P-2XZmqukHqQk8d0UFxDtC24jPfq4fSZyJLAMNcv9-U.jpg',
  'self': 'https://b.thumbs.redditmedia.com/P-2XZmqukHqQk8d0UFxDtC24jPfq4fSZyJLAMNcv9-U.jpg',
  'image': 'https://b.thumbs.redditmedia.com/P-2XZmqukHqQk8d0UFxDtC24jPfq4fSZyJLAMNcv9-U.jpg',
  'nsfw': 'https://b.thumbs.redditmedia.com/R8Bo9EY3WBs0CC9qAwWwZ8EsiWqGxzppEP0Vl4212Lk.png'
};

function getUserHome() {
  return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
}

var config_file = path.join(getUserHome(), 'reddit-monitor.json');
var config = {};

var cache_dir = path.join(getUserHome(), '.jul11co', 'reddit-monitor');
fse.ensureDirSync(cache_dir);

// Correct datetime
moment.updateLocale('en', {
  relativeTime : {
    future: "in %s",
    past  : "%s",
    s     : "just now",
    ss    : "%ds",
    m     : "1min",
    mm    : "%dmin",
    h     : "1h",
    hh    : "%dh",
    d     : "1d",
    dd    : "%dd",
    M     : "1m",
    MM    : "%dm",
    y     : "1y",
    yy    : "%dy"
  }
});

var post_fields = [ // kind: 't3'
  "id", "name", "title", "url",
  "author", "domain",
  "permalink",
  // "created", 
  "created_utc",
  "subreddit", 
  // "subreddit_id", "subreddit_type",
  "over_18",
  "thumbnail", "thumbnail_width", "thumbnail_height",
  // "selftext", "selftext_html",
  "post_hint",
  "stickied", 
  // "locked", "archived",
  // "spoiler",
  "is_video", "is_self",
  // "preview",
];

var post_return_fields = post_fields.concat([
  'num_comments', 
  // 'num_reports', 
  'score', 
  // 'ups', 'downs', 'upvote_ratio', 
  // 'likes',
  // 'edited',
  // 'quarantine', 'distinguished',
  // 'preview', 'media', 'media_embed'
]);

///

function md5Hash(string) {
  return crypto.createHash('md5').update(string).digest('hex');
}

function escapeRegExp(string) {
  return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

function replaceAll(string, find, replace) {
  return string.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

function saveFileSync(output_file, text, encoding) {
  var output_dir = path.dirname(output_file);
  fse.ensureDirSync(output_dir);

  fs.writeFileSync(output_file, text, encoding || 'utf8');
}

function loadFileSync(input_file, encoding) {
  if (!fs.existsSync(input_file)) return '';

  return fs.readFileSync(input_file, encoding || 'utf8');
}

var loadFromJsonFile = function(file) {
  var info = {};
  try {
    var stats = fs.statSync(file);
    if (stats.isFile()) {
      info = jsonfile.readFileSync(file);
    }
  } catch (e) {
    console.log(e);
  }
  return info;
}

var saveToJsonFile = function(info, file) {
  var err = null;
  try {
    jsonfile.writeFileSync(file, info, { spaces: 2 });
  } catch (e) {
    err = e;
  }
  return err;
}

var getImageBase64 = function(image_src, callback) {

  var hashed_src = md5Hash(image_src);
  var local_file = path.join(cache_dir, hashed_src[0], hashed_src[1]+hashed_src[2], hashed_src);
  if (fs.existsSync(local_file)) {
    var image_base64 = loadFileSync(local_file);
    if (image_base64) {
      return callback(null, image_base64);
    }
  }

  request({
    url: image_src,
    isBuffer: true
  }, function (err, res, body) {
    if (err) return callback(err);

    resizeImg(body, {width: 70, height: 70}).then(function(buf) {
      // var data = 'data:' + res.headers['content-type'] + ';base64,' + buf.toString('base64');

      var image_data = buf.toString('base64');
      saveFileSync(local_file, image_data);

      callback(null, image_data);
    });
  });
}

///

var extractPostInfo = function(post_data, return_fields) {
  var post_info = {};
  return_fields = return_fields || post_return_fields;
  for (var i = 0; i < return_fields.length; i++) {
    if (typeof post_data[return_fields[i]] != 'undefined') {
      post_info[return_fields[i]] = post_data[return_fields[i]];
    }
  }
  return post_info;
}

var getSubredditPosts = function(subreddit, options, callback) {
  if (typeof options == 'function') {
    callback = options;
    options = {};
  }

  var Reddit = new nraw("Archivebot");
  var reddit_query = Reddit.subreddit(subreddit);

  if (options.top) {
    reddit_query = reddit_query.top();
  } else if (options.hot) {
    reddit_query = reddit_query.hot();
  } else if (options.new) {
    reddit_query = reddit_query.new();
  } else if (options.rising) {
    reddit_query = reddit_query.rising();
  } else if (options.controversial) {
    reddit_query = reddit_query.controversial();
  } else if (options.promoted) {
    reddit_query = reddit_query.promoted();
  }
  if (options.after) {
    reddit_query = reddit_query.after(options.after);
  }
  if (options.limit) {
    reddit_query = reddit_query.limit(options.limit);
  }
  try {
    reddit_query.exec(function(data) {
      var posts = [];
      if (data && data.data && data.data.children  && data.data.children.length) {
        data.data.children.forEach(function(post_item) {
          if (post_item.kind != 't3') return;
          posts.push(extractPostInfo(post_item.data));
        });
      }
      return callback(null, {
        posts: posts,
        after: data.data.after,
        before: data.data.before
      });
    }, function(err) {
      return callback(err);
    });
  } catch(e) {
    return callback(e);
  } 
};

var getPosts = function(subreddit, opts, callback) {

  var params = {};
  var subreddit_url = "https://www.reddit.com/r/" + subreddit
  if (opts.scope == 'top') {
    params.top = true;
    subreddit_url += "/top/";
  } else if (opts.scope == 'hot') {
    params.hot = true;
    subreddit_url += "/hot/";
  } else {
    params.new = true;
    subreddit_url += "/new/";
  }

  if (config[subreddit_url] && config[subreddit_url].last_update && config[subreddit_url].posts) {
    var interval = opts.interval || 5;
    if (moment().diff(moment(config[subreddit_url].last_update), 'minutes') < interval) {
      return callback(null, config[subreddit_url]);
    }
  }

  getSubredditPosts(subreddit, params, function(err, result) {
    if (err) {
      callback(err);
    } else if (result && result.posts) {
      config[subreddit_url] = {
        last_update: new Date(),
        posts: result.posts
      };
      callback(null, config[subreddit_url]);
    } else {
      callback(null, {});
    }
  });
}

////

var renderPost = function(post, opts, prefix) {
  if (post.stickied) return;
  prefix = prefix || '';

  var post_title = post.title;
  post_title = replaceAll(post_title, '|', '-');

  var created_moment = moment.utc(post.created_utc*1000);

  console.log(prefix + post_title + ' | href=' + post.url + ' length=80');
  console.log(prefix + post.domain 
    + ' • u/' + post.author 
    + ' • ' + created_moment.fromNow() 
    + (post.num_comments ? (' • 💬' + post.num_comments) : '')
    + ' | color=#FF6600 href=https://www.reddit.com/' + post.permalink);
  console.log(prefix + '---');
}

var renderPostWithThumb = function(post, opts, prefix, callback) {
  if (typeof prefix == 'function') {
    callback = prefix;
    prefix = '';
  }

  if (post.stickied) return callback();

  prefix = prefix || '';
  var post_title = post.title;
  post_title = replaceAll(post_title, '|', '-');

  var created_moment = moment.utc(post.created_utc*1000);

  var post_thumbnail = post.thumbnail;
  if (post_thumbnail && post_thumbnail.indexOf('http') != 0) {
    if (opts.thumbs && opts.thumbs[post.thumbnail]) {
      post_thumbnail = opts.thumbs[post.thumbnail];
    } else {
      post_thumbnail = default_thumbs[post.thumbnail];
    }
  }

  if (post_thumbnail && post_thumbnail.indexOf('http') == 0) {
    getImageBase64(post_thumbnail, function(err, data) {
      if (err) {
        console.log(err.message);
      }

      var image_data = ''
      if (!err && data) image_data = ' image=' + data;

      console.log(prefix + post_title + ' | href=' + post.url + ' length=80' + (image_data||''));
      console.log(prefix + post.domain 
        + ' • u/' + post.author 
        + ' • ' + created_moment.fromNow() 
        + (post.num_comments ? (' • 💬' + post.num_comments) : '')
        + ' | color=#FF6600 href=https://www.reddit.com/' + post.permalink);
      console.log(prefix + '---');

      callback();
    });
  } else {
    if (post_thumbnail) console.log(prefix + post_thumbnail + ' | href=' + post_thumbnail);

    console.log(prefix + post_title + ' | href=' + post.url + ' length=80');
    console.log(prefix + post.domain 
      + ' • u/' + post.author 
      + ' • ' + created_moment.fromNow() 
      + (post.num_comments ? (' • 💬' + post.num_comments) : '')
      + ' | color=#FF6600 href=https://www.reddit.com/' + post.permalink);
    console.log(prefix + '---');

    callback();
  }
}

var fetchAndDisplay = function(subreddit, opts, done) {
  done = done || function(){};

  var sub_prefix = opts.prefix||'--';

  getPosts(subreddit, opts, function(err, result) {
    if (err) {
      console.log(err.message);
      return done(err);
    } else if (result && result.posts) {
      var last_update_moment = moment(result.last_update);

      if (opts.scope == 'top') {
        console.log("r/" + subreddit + ' • TOP • ' + last_update_moment.fromNow()  + " | href=https://www.reddit.com/r/" + subreddit);
        console.log(sub_prefix+"TOP • r/" + subreddit + " | href=https://www.reddit.com/r/" + subreddit + "/top/ size=11");
      } else if (opts.scope == 'hot') {
        console.log("r/" + subreddit + ' • HOT • ' + last_update_moment.fromNow()  + " | href=https://www.reddit.com/r/" + subreddit);
        console.log(sub_prefix+"HOT • r/" + subreddit + " | href=https://www.reddit.com/r/" + subreddit + "/hot/ size=11");
      } else {
        console.log("r/" + subreddit + ' • NEW • ' + last_update_moment.fromNow()  + " | href=https://www.reddit.com/r/" + subreddit);
        console.log(sub_prefix+"NEW • r/" + subreddit + " | href=https://www.reddit.com/r/" + subreddit + "/new/ size=11");
      }
      // console.log(sub_prefix+'---');

      var posts = result.posts;
      if (opts.max_posts && !isNaN(opts.max_posts) && opts.max_posts < 25) {
        posts = posts.slice(0, opts.max_posts);
      }

      if (opts.no_thumb) {
        posts.forEach(function(post) {
          renderPost(post, opts, sub_prefix);
        });
        done();
      } else {
        async.eachSeries(posts, function(post, cb) {
          renderPostWithThumb(post, opts, sub_prefix, cb);
        }, function() {
          done();
        });
      }
    } else {
      done();
    }
  });
}

if (fs.existsSync(config_file)) {
  config = loadFromJsonFile(config_file);
}

console.log("😱");console.log('---');

async.eachSeries(subreddits, function(subreddit, cb) {
  fetchAndDisplay(subreddit.name, subreddit.opts || {}, function() {
    setTimeout(cb, 2000);
  });
}, function() {
  saveToJsonFile(config, config_file);
});


