import {InferAttributes, InferCreationAttributes, Model, DataTypes, Sequelize} from "sequelize";

export class User extends Model<InferAttributes<User>,InferCreationAttributes<User>> {
  declare userId: number;
  declare username: string;
  declare password: string;
  declare firstName: string;
  declare lastName: string;
  declare img: string;
  declare bio: string;
  declare createdAt?: Date;
  declare updatedAt?: Date;
}

export function UserFactory(sequelize: Sequelize) {
  User.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        // unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      img: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      bio: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "users",
      freezeTableName: true,
      sequelize
    }
  );
}
