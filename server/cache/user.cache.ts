import { CacheObjectManager } from "./utils/cache-object-manager.model";
import { User } from "../models/user.model";

const periodicCache = new CacheObjectManager();
periodicCache.SetResetCacheEveryDay();

export class UsersCache {

    public static ResetAll(): void {
        periodicCache.ResetCache();
    }

    public static async GetAllUsersAsync() {
        const cacheKey = "GetAllUsersAsync";
        const cachedObject = periodicCache.TryGetCachedObject<User[]>(cacheKey);
        if (cachedObject != null)
            return cachedObject;

        const newObject = await User.GetUsersFromDBAsync();
        periodicCache.SaveObject(cacheKey, newObject);
        return newObject;
    }
}