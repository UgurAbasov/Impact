import mongoose from "mongoose";
import { Client, MessageEmbed, User, VoiceState } from "discord.js";
import { Guild } from "discord.js";
export declare class VoiceClient {
    client: Client;
    options: VoiceClientOptions;
    schemas: {
        timer: mongoose.Model<unknown, {}, {}>;
        user: mongoose.Model<userObject, {}, {}>;
    };
    constructor(options: VoiceClientOptions);
    /**
     * @description Put this inside your voiceStateChange client event!
     * @param {VoiceState} oldState discord.js's VoiceState
     * @param {VoiceState} newState discord.js's VoiceState
     * @returns {Promise<void>}
     */
    startListener(oldState: VoiceState, newState: VoiceState): Promise<void>;
    /**
     * @description Fetching and sorting raw data from guild
     * @param {Guild} guild discord.js's guild aka `message.guild`
     */
    sortUsers(guild: Guild): Promise<userObject[]>;
    /**
     * @description Gives you all the data you need about a user
     * @param {Guild} guild discord.js's guild class aka `message.guild`
     * @param {User} user discord.js's User class
     */
    getUserData(guild: Guild, user: User): Promise<userData>;
    /**
     * @description Generating a leaderbord
     */
    generateLeaderboard(options: generateLeaderboardOptions): Promise<MessageEmbed>;
    /**
     * @description Reset the entire voice system database!
     * @param {Guild} guild discord.js's guild class aka `message.guild`
     */
    reset(guild: Guild): Promise<void>;
    /**
     * @description Change a user's voice channel time in a specific guild
     * @param {Guild} guild discord.js's guild class aka `message.guild`
     * @param user discord.js's User class
     * @param time Time you want to change in miliseconds
     */
    setTime(guild: Guild, user: User, time: number): void;
    /**
     * @description Chunk arrays into smaller arrays
     */
    chunkArrays(arr: any[], size: number): any[][];
}
export interface generateLeaderboardOptions {
    guild: Guild;
    title?: string;
    color?: string;
    top?: number;
    thumbnail?: string;
}
export interface userObject {
    User: string;
    Time: number;
    Guild: string;
}
export interface userData extends userObject {
    position: number;
    _id: any;
}
export interface VoiceClientOptions {
    /**
     * @description MongoDB connection string
     */
    mongooseConnectionString: string;
    /**
     * @description discord.js Client
     */
    client: Client;
    /**
     * @description Allow bots to be saved to the database?
     * @default false
     */
    allowBots: boolean;
    /**
     * @description Logging out all activities (user join, user leave, etc)
     * @default false
     */
    debug: boolean;
}
