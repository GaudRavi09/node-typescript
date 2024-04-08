import { User } from "./user.model";
import { Sequelize } from "sequelize";

export function initializeModels(connection: Sequelize){
    // Initialize models
    User.initModel(connection);

    // Initialize associations
    User.initAssociations();
}