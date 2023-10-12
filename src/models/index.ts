import { Sequelize } from "sequelize";
import { AssociateUserTweet, TweetFactory } from "./tweet";
import { UserFactory } from "./user";


const dbName = 'tweeterDB';
const username = 'root';
const password = 'davidmugisha';

const sequelize = new Sequelize(dbName, username, password, {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
});

TweetFactory(sequelize);
UserFactory(sequelize);
AssociateUserTweet();

export const db = sequelize;