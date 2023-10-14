import { Router } from 'express';
import { createTweet, deleteTweet, getAllTweets, getTweet, updateTweet, getTweetsByUserId } from '../controllers/tweetController';


const router = Router();

router.get('/', getAllTweets);

router.post('/', createTweet);

router.get('/user/:id', getTweetsByUserId)

router.get('/:id', getTweet);

router.put('/:id', updateTweet);

router.delete('/:id', deleteTweet);

export default router;