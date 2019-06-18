/**
 * This file contains the code required to
 * establish connection with Redis.
 */

import * as RedisPackage from 'ioredis';
import { redisConfig } from '../../config/config';

export class RedisConn {
    public static getRedisConn() {
        if (this.redis) {
            return this.redis;
        }

        this.redis = new RedisPackage(redisConfig);
        return this.redis;
    }

    private static redis: RedisPackage.Redis;
}
