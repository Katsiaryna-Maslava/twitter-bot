const Twitter = require('twitter');
const path = require('path');

// const config = require('./config')[0];

const config = {
	apiKey: 'A76JoDo4S0SGOwKSBPX2bpZYr',
	apiSecretKey: 'VvdwoxeRK4xprTXDKP5IkEYYJ8Zvxjd2sS7twtdHIyrlrSrOWm',
	accessToken: '1082702317177188353-aryAjGqCJjl73CQ7ke5AaUarQA79Fz',
	accessTokenSecret: 'rKU9saibp0P43fIlwg3qPzXUCVIhPI2hZMLOjbdSab4Kc'
};

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
