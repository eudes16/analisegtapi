import IDataResponse from "../../../dataSources/apiClient/ports/IDataResponse";
import { User } from "../../../generated/client";

export interface ISaveUserIN {
    users: SaveUser[]
}


export interface ISaveUserOUT extends IDataResponse {}

export interface SaveUser extends Partial<User> {}