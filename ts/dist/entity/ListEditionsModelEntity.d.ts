import { OpenLibrarySdkEntityBase } from '../OpenLibrarySdkEntityBase';
import type { OpenLibrarySdkSDK } from '../OpenLibrarySdkSDK';
import type { Control } from '../types';
import type { ListEditionsModel, ListEditionsModelListMatch } from '../OpenLibrarySdkTypes';
declare class ListEditionsModelEntity extends OpenLibrarySdkEntityBase<ListEditionsModel> {
    constructor(client: OpenLibrarySdkSDK, entopts: any);
    make(this: ListEditionsModelEntity): ListEditionsModelEntity;
    list(this: any, reqmatch?: ListEditionsModelListMatch, ctrl?: Control): Promise<ListEditionsModelEntity[]>;
}
export { ListEditionsModelEntity };
