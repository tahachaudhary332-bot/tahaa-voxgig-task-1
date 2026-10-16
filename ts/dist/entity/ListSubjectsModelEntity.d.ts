import { OpenLibrarySdkEntityBase } from '../OpenLibrarySdkEntityBase';
import type { OpenLibrarySdkSDK } from '../OpenLibrarySdkSDK';
import type { Control } from '../types';
import type { ListSubjectsModel, ListSubjectsModelListMatch } from '../OpenLibrarySdkTypes';
declare class ListSubjectsModelEntity extends OpenLibrarySdkEntityBase<ListSubjectsModel> {
    constructor(client: OpenLibrarySdkSDK, entopts: any);
    make(this: ListSubjectsModelEntity): ListSubjectsModelEntity;
    list(this: any, reqmatch?: ListSubjectsModelListMatch, ctrl?: Control): Promise<ListSubjectsModelEntity[]>;
}
export { ListSubjectsModelEntity };
