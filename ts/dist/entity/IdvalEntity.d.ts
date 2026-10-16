import { OpenLibrarySdkEntityBase } from '../OpenLibrarySdkEntityBase';
import type { OpenLibrarySdkSDK } from '../OpenLibrarySdkSDK';
import type { Control } from '../types';
import type { Idval, IdvalLoadMatch } from '../OpenLibrarySdkTypes';
declare class IdvalEntity extends OpenLibrarySdkEntityBase<Idval> {
    constructor(client: OpenLibrarySdkSDK, entopts: any);
    make(this: IdvalEntity): IdvalEntity;
    load(this: any, reqmatch?: IdvalLoadMatch, ctrl?: Control): Promise<IdvalEntity>;
}
export { IdvalEntity };
