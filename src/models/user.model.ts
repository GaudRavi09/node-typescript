import { DataTypes, Model, Sequelize } from "sequelize";

export interface UserInterface {
    id?: number;
    phone: string;
    email: string;
    password: string;
    lastName: string;
    firstName: string;
    createdAt?: Date;
    updatedAt?: Date;
    token?: string;
};

export class User extends Model {
    static initModel(connection: Sequelize){
        User.init(
            {
                firstName: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                lastName: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                email: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                phone: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                password: {
                    type: DataTypes.STRING,
                    allowNull: false
                }
            },
            {
                tableName: 'users',
                sequelize: connection,
                freezeTableName: true,
            }
        )
    }

    static initAssociations(){
        // User.hasMany(Category, {foreignKey: "user_id", as: "categories"})
    }
}