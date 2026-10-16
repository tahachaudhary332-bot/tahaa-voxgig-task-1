import { OpenLibrarySdkEntityBase } from '../OpenLibrarySdkEntityBase';
import type { OpenLibrarySdkSDK } from '../OpenLibrarySdkSDK';
import type { Control } from '../types';
import type { Import, ImportLoadMatch, ImportCreateData } from '../OpenLibrarySdkTypes';
declare class ImportEntity extends OpenLibrarySdkEntityBase<Import> {
    constructor(client: OpenLibrarySdkSDK, entopts: any);
    make(this: ImportEntity): ImportEntity;
    load(this: any, reqmatch?: ImportLoadMatch, ctrl?: Control): Promise<ImportEntity>;
    create(this: any, reqdata?: ImportCreateData, ctrl?: Control): Promise<ImportEntity>;
}
export { ImportEntity };
