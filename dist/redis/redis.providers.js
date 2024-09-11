"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisProvider = void 0;
const ioredis_1 = require("ioredis");
exports.RedisProvider = {
    provide: 'REDIS_CLIENT',
    useFactory: () => {
        return new ioredis_1.default({
            host: 'localhost',
            port: 6379,
        });
    },
};
//# sourceMappingURL=redis.providers.js.map