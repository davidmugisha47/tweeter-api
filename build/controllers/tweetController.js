"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTweetsByUserId = exports.deleteTweet = exports.updateTweet = exports.getTweet = exports.createTweet = exports.getAllTweets = void 0;
const tweet_1 = require("../models/tweet");
const user_1 = require("../models/user");
const auth_1 = require("../services/auth");
const getAllTweets = async (req, res, next) => {
    let tweets = await tweet_1.Tweet.findAll();
    res.status(200).json(tweets);
};
exports.getAllTweets = getAllTweets;
const createTweet = async (req, res, next) => {
    let user = await (0, auth_1.verifyUser)(req);
    if (!user) {
        return res.status(403).send();
    }
    let newTweet = req.body;
    newTweet.userId = user.userId;
    if (newTweet.title && newTweet.image) {
        let created = await tweet_1.Tweet.create(newTweet);
        res.status(201).json(created);
    }
    else {
        res.status(400).send();
    }
};
exports.createTweet = createTweet;
const getTweet = async (req, res, next) => {
    let tweetId = req.params.id;
    let tweet = await tweet_1.Tweet.findByPk(tweetId);
    if (tweet) {
        res.status(200).json(tweet);
    }
    else {
        res.status(404).json({});
    }
};
exports.getTweet = getTweet;
const updateTweet = async (req, res, next) => {
    let tweetId = req.params.id;
    let newTweet = req.body;
    let foundTweet = await tweet_1.Tweet.findByPk(tweetId);
    if (foundTweet && foundTweet.tweetId == newTweet.tweetId
        && newTweet.title && newTweet.image) {
        await tweet_1.Tweet.update(newTweet, {
            where: { tweetId: tweetId }
        });
        res.status(200).json();
    }
    else {
        res.status(400).json();
    }
};
exports.updateTweet = updateTweet;
const deleteTweet = async (req, res, next) => {
    let user = await (0, auth_1.verifyUser)(req);
    if (!user) {
        return res.status(403).send();
    }
    let tweetId = req.params.id;
    let found = await tweet_1.Tweet.findByPk(tweetId);
    if (found) {
        await tweet_1.Tweet.destroy({
            where: { tweetId: tweetId }
        });
        res.status(200).json();
    }
    else {
        res.status(404).json();
    }
};
exports.deleteTweet = deleteTweet;
const getTweetsByUserId = async (req, res, next) => {
    let userId = req.params.id;
    let tweets = await tweet_1.Tweet.findAll({
        include: { model: user_1.User },
        where: { userId: userId }
    });
    res.status(200).json(tweets);
};
exports.getTweetsByUserId = getTweetsByUserId;
