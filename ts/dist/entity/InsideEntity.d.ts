import { OpenLibrarySdkEntityBase } from '../OpenLibrarySdkEntityBase';
import type { OpenLibrarySdkSDK } from '../OpenLibrarySdkSDK';
import type { Control } from '../types';
import type { Inside, InsideLoadMatch } from '../OpenLibrarySdkTypes';
declare class InsideEntity extends OpenLibrarySdkEntityBase<Inside> {
    constructor(client: OpenLibrarySdkSDK, entopts: any);
    make(this: InsideEntity): InsideEntity;
    load(this: any, reqmatch?: InsideLoadMatch, ctrl?: Control): Promise<InsideEntity>;
}
export { InsideEntity };
