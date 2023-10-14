import { RequestHandler } from "express";
import { Tweet } from "../models/tweet";
import { User } from "../models/user";
import { verifyUser } from "../services/auth";

export const getAllTweets: RequestHandler = async (req, res, next) => {
    let tweets = await Tweet.findAll();
    res.status(200).json(tweets);
}

export const createTweet: RequestHandler = async (req, res, next) => {

    let user: User | null = await verifyUser(req);

    if (!user) {
        return res.status(403).send();
    }

    let newTweet: Tweet = req.body;
    newTweet.userId = user.userId

    if (newTweet.title && newTweet.image) {
        let created = await Tweet.create(newTweet);
        res.status(201).json(created);
    }
    else {
        res.status(400).send();
    }
}

export const getTweet: RequestHandler = async (req, res, next) => {
    let tweetId = req.params.id;
    let tweet = await Tweet.findByPk(tweetId);
    if (tweet) {
        res.status(200).json(tweet);
    }
    else {
        res.status(404).json({});
    }
}

export const updateTweet: RequestHandler = async (req, res, next) => {

    let tweetId = req.params.id;
    let newTweet: Tweet = req.body;
    
    let foundTweet = await Tweet.findByPk(tweetId);
    
    if (foundTweet && foundTweet.tweetId == newTweet.tweetId
        && newTweet.title && newTweet.image) {
            await Tweet.update(newTweet, {
                where: { tweetId: tweetId }
            });
            res.status(200).json();
    }
    else {
        res.status(400).json();
    }
}

export const deleteTweet: RequestHandler = async (req, res, next) => {

    let user: User | null = await verifyUser(req);

    if (!user) {
        return res.status(403).send();
    }


    let tweetId = req.params.id;
    let found = await Tweet.findByPk(tweetId);
    
    if (found) {
        await Tweet.destroy({
                where: { tweetId: tweetId }
        });
        res.status(200).json();
    }
    else {
        res.status(404).json();
    }
}

export const getTweetsByUserId: RequestHandler  = async (req, res, next) => {
    let userId = req.params.id;
    let tweets = await Tweet.findAll({
        include: { model: User },
        where: { userId: userId} 
    });

    res.status(200).json(tweets);
}