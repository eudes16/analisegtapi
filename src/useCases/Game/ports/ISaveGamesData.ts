import IDataResponse from "../../../dataSources/apiClient/ports/IDataResponse";
import { Game } from "../../../generated/client";

export interface ISaveGamesIn {
    games: SaveGame[]
}

export interface ISaveGamesOut extends IDataResponse {}

export interface SaveGame extends Partial<Game> {}