import { OpenLibrarySdkEntityBase } from '../OpenLibrarySdkEntityBase';
import type { OpenLibrarySdkSDK } from '../OpenLibrarySdkSDK';
import type { Control } from '../types';
import type { ReadingLog, ReadingLogListMatch } from '../OpenLibrarySdkTypes';
declare class ReadingLogEntity extends OpenLibrarySdkEntityBase<ReadingLog> {
    constructor(client: OpenLibrarySdkSDK, entopts: any);
    make(this: ReadingLogEntity): ReadingLogEntity;
    list(this: any, reqmatch?: ReadingLogListMatch, ctrl?: Control): Promise<ReadingLogEntity[]>;
}
export { ReadingLogEntity };
