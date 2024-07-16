import Log from "../../utils/log";
import { myEmitter, EmitterEvents } from "../../events/emitter.events";

class CacheObjectManager {
    CACHING_TIME_IN_MINUTES: number;
    cache: { [key: string]: CachedObject } = {};
    ResetCacheEveryDay = false;

    constructor(cachingTimeInMinutes: number = Number(process.env.CACHING_TIME_IN_MINUTES ?? 300)) {
        this.CACHING_TIME_IN_MINUTES = Number(cachingTimeInMinutes);

        myEmitter.on(EmitterEvents.ResetFullCache, () => {
            Log.Cyan("Event Emitter ResetFullCache has been triggered");
            this.ResetCache();
        });
    }

    TryGetCachedObject<T>(key: string): T | null {
        const cachedObject = this.cache[key];
        if (cachedObject == null) return null;

        const cachedTime = cachedObject.time;
        const diffInMin = ((new Date().getTime() - cachedTime) / 1000) / 60;
        if (diffInMin < this.CACHING_TIME_IN_MINUTES) {
            Log.Cyan(`New hit from CacheObjectManager, key: ${key}`);
            return cachedObject.object as T;
        }

        delete this.cache[key];
        return null;
    }

    SaveObject(key: string, object: any) {
        Log.Magenta(`New result cached from CacheObjectManager, key: ${key}`);
        this.cache[key] = CachedObject.New(object);
    }

    ResetCache() {
        Log.Magenta(`${Object.keys(this.cache).length} keys has been removed: ${Object.keys(this.cache).join(",")}`);
        this.cache = {};
    }

    DeleteObjectByKey(key: string) {
        delete this.cache[key];
    }

    SetResetCacheEveryDay() {
        this.CACHING_TIME_IN_MINUTES = 60 * 24;
        this.ResetCacheEveryDay = true;
    }
}

class CachedObject {
    time: number;
    object: any;

    constructor(time: number, object: any) {
        this.time = time;
        this.object = object;
    }

    static New(object: any): CachedObject {
        return new CachedObject(new Date().getTime(), object);
    }
}

export { CacheObjectManager };
