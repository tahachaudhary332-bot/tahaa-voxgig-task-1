import { OpenLibrarySdkEntityBase } from '../OpenLibrarySdkEntityBase';
import type { OpenLibrarySdkSDK } from '../OpenLibrarySdkSDK';
import type { Control } from '../types';
import type { Archiveorg, ArchiveorgLoadMatch } from '../OpenLibrarySdkTypes';
declare class ArchiveorgEntity extends OpenLibrarySdkEntityBase<Archiveorg> {
    constructor(client: OpenLibrarySdkSDK, entopts: any);
    make(this: ArchiveorgEntity): ArchiveorgEntity;
    load(this: any, reqmatch?: ArchiveorgLoadMatch, ctrl?: Control): Promise<ArchiveorgEntity>;
}
export { ArchiveorgEntity };
