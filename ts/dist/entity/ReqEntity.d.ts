import { OpenLibrarySdkEntityBase } from '../OpenLibrarySdkEntityBase';
import type { OpenLibrarySdkSDK } from '../OpenLibrarySdkSDK';
import type { Control } from '../types';
import type { Req, ReqLoadMatch } from '../OpenLibrarySdkTypes';
declare class ReqEntity extends OpenLibrarySdkEntityBase<Req> {
    constructor(client: OpenLibrarySdkSDK, entopts: any);
    make(this: ReqEntity): ReqEntity;
    load(this: any, reqmatch?: ReqLoadMatch, ctrl?: Control): Promise<ReqEntity>;
}
export { ReqEntity };
