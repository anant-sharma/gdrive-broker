/**
 * This file contains the code required to
 * establish connection and interface with Redis.
 */
import * as RedisPackage from 'ioredis';
import { RedisConn } from './redis.conn';

export class Redis {
    private redis: RedisPackage.Redis;
    constructor() {
        this.redis = RedisConn.getRedisConn();
    }

    public set(key: RedisPackage.KeyType, value: any): Promise<string> {
        return this.redis.set(key, value);
    }

    public get(key: RedisPackage.KeyType): Promise<string | null> {
        return this.redis.get(key);
    }
}
