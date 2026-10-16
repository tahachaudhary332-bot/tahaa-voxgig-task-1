import { OpenLibrarySdkEntityBase } from '../OpenLibrarySdkEntityBase';
import type { OpenLibrarySdkSDK } from '../OpenLibrarySdkSDK';
import type { Control } from '../types';
import type { Ian, IanLoadMatch, IanCreateData } from '../OpenLibrarySdkTypes';
declare class IanEntity extends OpenLibrarySdkEntityBase<Ian> {
    constructor(client: OpenLibrarySdkSDK, entopts: any);
    make(this: IanEntity): IanEntity;
    load(this: any, reqmatch?: IanLoadMatch, ctrl?: Control): Promise<IanEntity>;
    create(this: any, reqdata?: IanCreateData, ctrl?: Control): Promise<IanEntity>;
}
export { IanEntity };
