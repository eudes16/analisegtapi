export interface AchievementsResponse {
    xuid:   string;
    titles: Title[];
}

export interface Title {
    titleId:               string;
    pfn:                   null | string;
    bingId:                null | string;
    windowsPhoneProductId: null;
    name:                  string;
    type:                  Type;
    devices:               Device[];
    displayImage:          string;
    mediaItemType:         MediaItemType;
    modernTitleId:         null | string;
    isBundle:              boolean;
    achievement:           Achievement;
    stats:                 Stats;
    gamePass:              null;
    images:                null;
    titleHistory:          TitleHistory;
    titleRecord:           null;
    detail:                null;
    friendsWhoPlayed:      null;
    alternateTitleIds:     null;
    contentBoards:         null;
    xboxLiveTier?:         XboxLiveTier;
    isStreamable?:         boolean;
}

export interface Achievement {
    currentAchievements: number;
    totalAchievements:   number;
    currentGamerscore:   number;
    totalGamerscore:     number;
    progressPercentage:  number;
    sourceVersion:       number;
}

export enum Device {
    Android = "Android",
    Mobile = "Mobile",
    PC = "PC",
    Win32 = "Win32",
    Xbox360 = "Xbox360",
    XboxOne = "XboxOne",
    XboxSeries = "XboxSeries",
}

export enum MediaItemType {
    Application = "Application",
    Xbox360Game = "Xbox360Game",
    XboxArcadeGame = "XboxArcadeGame",
}

export interface Stats {
    sourceVersion: number;
}

export interface TitleHistory {
    lastTimePlayed: Date;
    visible:        boolean;
    canHide:        boolean;
}

export enum Type {
    Game = "Game",
}

export enum XboxLiveTier {
    Full = "Full",
    None = "None",
}
