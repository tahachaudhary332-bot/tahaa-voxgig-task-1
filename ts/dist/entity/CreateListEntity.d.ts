import { OpenLibrarySdkEntityBase } from '../OpenLibrarySdkEntityBase';
import type { OpenLibrarySdkSDK } from '../OpenLibrarySdkSDK';
import type { Control } from '../types';
import type { CreateList, CreateListCreateData } from '../OpenLibrarySdkTypes';
declare class CreateListEntity extends OpenLibrarySdkEntityBase<CreateList> {
    constructor(client: OpenLibrarySdkSDK, entopts: any);
    make(this: CreateListEntity): CreateListEntity;
    create(this: any, reqdata?: CreateListCreateData, ctrl?: Control): Promise<CreateListEntity>;
}
export { CreateListEntity };
