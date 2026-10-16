import { OpenLibrarySdkEntityBase } from '../OpenLibrarySdkEntityBase';
import type { OpenLibrarySdkSDK } from '../OpenLibrarySdkSDK';
import type { Control } from '../types';
import type { Merge, MergeCreateData } from '../OpenLibrarySdkTypes';
declare class MergeEntity extends OpenLibrarySdkEntityBase<Merge> {
    constructor(client: OpenLibrarySdkSDK, entopts: any);
    make(this: MergeEntity): MergeEntity;
    create(this: any, reqdata?: MergeCreateData, ctrl?: Control): Promise<MergeEntity>;
}
export { MergeEntity };
