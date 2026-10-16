import { OpenLibrarySdkEntityBase } from '../OpenLibrarySdkEntityBase';
import type { OpenLibrarySdkSDK } from '../OpenLibrarySdkSDK';
import type { Control } from '../types';
import type { List, ListLoadMatch, ListListMatch, ListCreateData } from '../OpenLibrarySdkTypes';
declare class ListEntity extends OpenLibrarySdkEntityBase<List> {
    constructor(client: OpenLibrarySdkSDK, entopts: any);
    make(this: ListEntity): ListEntity;
    load(this: any, reqmatch?: ListLoadMatch, ctrl?: Control): Promise<ListEntity>;
    list(this: any, reqmatch?: ListListMatch, ctrl?: Control): Promise<ListEntity[]>;
    create(this: any, reqdata?: ListCreateData, ctrl?: Control): Promise<ListEntity>;
}
export { ListEntity };
