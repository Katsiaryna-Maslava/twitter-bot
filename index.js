const Twitter = require('twitter');
const path = require('path');

const config = require('./config')[0];

const app = new Twitter(config);

let params = {
    q: '',
    count: 10,
    result_type: 'recent',
    lang: 'ru'
  };

app.get('search/tweets', params, (err, data, response) => {
	if (err) {
		return new Error('error:' + err.message);
	}

	const tweetsId = data.statuses
		.map(tweet => ({ id: tweet.id_str }));

	tweetsId.map(tweetId => {
		app.post('favorites/create', tweetId, (err, response) => {
			if (err) {
				return console.log(err[0].message);
			}

			const username = response.user.screen_name;
			const favoritedTweetId = response.id_str;
			console.log(`Favorited: https://twitter.com/${username}/status/${favoritedTweetId}`);

		});
	});
});