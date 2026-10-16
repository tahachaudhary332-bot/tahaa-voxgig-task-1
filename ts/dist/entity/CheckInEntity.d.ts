import { OpenLibrarySdkEntityBase } from '../OpenLibrarySdkEntityBase';
import type { OpenLibrarySdkSDK } from '../OpenLibrarySdkSDK';
import type { Control } from '../types';
import type { CheckIn, CheckInCreateData, CheckInRemoveMatch } from '../OpenLibrarySdkTypes';
declare class CheckInEntity extends OpenLibrarySdkEntityBase<CheckIn> {
    constructor(client: OpenLibrarySdkSDK, entopts: any);
    make(this: CheckInEntity): CheckInEntity;
    create(this: any, reqdata?: CheckInCreateData, ctrl?: Control): Promise<CheckInEntity>;
    remove(this: any, reqmatch?: CheckInRemoveMatch, ctrl?: Control): Promise<CheckInEntity>;
}
export { CheckInEntity };
