
module.exports = {
	default_thumbs: {
	  'default': 'https://b.thumbs.redditmedia.com/P-2XZmqukHqQk8d0UFxDtC24jPfq4fSZyJLAMNcv9-U.jpg',
	  'self': 'https://b.thumbs.redditmedia.com/P-2XZmqukHqQk8d0UFxDtC24jPfq4fSZyJLAMNcv9-U.jpg',
	  'image': 'https://b.thumbs.redditmedia.com/P-2XZmqukHqQk8d0UFxDtC24jPfq4fSZyJLAMNcv9-U.jpg',
	  'nsfw': 'https://b.thumbs.redditmedia.com/R8Bo9EY3WBs0CC9qAwWwZ8EsiWqGxzppEP0Vl4212Lk.png',
	  'spoiler': 'https://b.thumbs.redditmedia.com/yBs3PfBnqAPLuYwucoIEp8XBLiGzTWosJqRQ7LywP9k.png'
	},
	
	// name: 'SUBREDDIT' // set name: '---' to create menu separator
	// opts: {
	//   scope: String, // 'new', 'top', 'hot'; default: 'new'
	//   no_thumb: Boolean, // default: false 
	//   interval: Integer, // default: 5 minutes
	//   max_posts: Integer, // default: 25
	//   thumbs: { POST_TYPE: IMAGE_URL, ...} // POST_TYPE = 'default', 'self', 'nsfw', 'image'
	// }
	subreddits: [
	  {
	    group: 'MANGA & ANIME' // group name
	  },
	  {
	    name: 'manga',
	    opts: {
	      scope: 'new', 
	      interval: 10,
	      thumbs: {
	        'default': 'https://a.thumbs.redditmedia.com/3Ed51A-eafXqS28ulntBodFuQJOXF5xJNGjpyrcMpu0.png',
	        'self': 'https://b.thumbs.redditmedia.com/8oG9z_WABav5V3947rVlqfa240rRM1-awEZkxNwuTgE.png',
	        'nsfw': 'https://b.thumbs.redditmedia.com/R8Bo9EY3WBs0CC9qAwWwZ8EsiWqGxzppEP0Vl4212Lk.png',
	        'spoiler': 'https://b.thumbs.redditmedia.com/yBs3PfBnqAPLuYwucoIEp8XBLiGzTWosJqRQ7LywP9k.png'
	      }
	    }
	  }, 
	  {
	    name: 'anime',
	    opts: {
	      scope: 'new', 
	      interval: 15
	    }
	  },
	  {
	    name: '---' // menu separator
	  },
	  {
	    group: 'FUN & INTERESTING' // group name
	  },
	  {
	    name: 'funny',
	    opts: {
	      scope: 'hot', 
	      interval: 30
	    }
	  }, 
	  {
	    name: 'CrappyDesign',
	    opts: {
	      scope: 'hot', 
	      interval: 30
	    }
	  },
	  {
	    name: 'engrish',
	    opts: {
	      scope: 'hot', 
	      interval: 45
	    }
	  },
	  {
	    name: 'iamverysmart',
	    opts: {
	      scope: 'new', 
	      interval: 30
	    }
	  },
	  {
	    name: 'interestingasfuck',
	    opts: {
	      scope: 'new', 
	      interval: 30
	    }
	  },
	  {
	    name: 'mildyinteresting',
	    opts: {
	      scope: 'hot', 
	      interval: 30
	    }
	  },
	  {
	    name: 'mildlyinfuriating',
	    opts: {
	      scope: 'hot', 
	      interval: 30
	    }
	  },
	  {
	    name: 'oddlysatisfying',
	    opts: {
	      scope: 'new', 
	      interval: 30
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
	    disable: true, // disabled
	    name: 'WTF',
	    opts: {
	      scope: 'new', 
	      interval: 30
	    }
	  },
	  {
	    name: '---' // menu separator
	  },
	  {
	    group: 'ENTERTAINMENT' // group name
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
	    name: '---' // menu separator
	  },
	  {
	    group: 'TECHNOLOGY'
	  },
	  {
	    name: 'tech',
	    opts: {
	      scope: 'new', 
	      interval: 20
	    }
	  },
	  {
	    name: 'technology',
	    opts: {
	      scope: 'new', 
	      interval: 20
	    }
	  },
	  {
	    name: 'software',
	    opts: {
	      scope: 'new', 
	      interval: 20
	    }
	  },
	  {
	    name: '---' // menu separator
	  },
	  {
	    group: 'PICTURES & PHOTOS' // group name
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
	    name: '---' // menu separator
	  },
	  {
	    group: 'NSFW' // group name
	  },
	  {
	    name: 'Celebs',
	    opts: {
	      scope: 'new', 
	      interval: 15
	    }
	  },
	  {
	    disable: true, // disabled
	    name: 'NSFW',
	    opts: {
	      scope: 'new', 
	      interval: 15
	    }
	  },
	  {
	    name: '---' // menu separator
	  },
	  {
	    group: 'LEARNING' // group name
	  },
	  {
	    name: 'askscience',
	    opts: {
	      scope: 'new', 
	      interval: 30
	    }
	  },
	  {
	  	disable: true, // disabled
	    name: 'DIY',
	    opts: {
	      scope: 'new', 
	      interval: 20
	    }
	  },
	  {
	    name: 'DataIsBeautiful',
	    opts: {
	      scope: 'hot', 
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
	  },
	]
}