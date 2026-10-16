import { OpenLibrarySdkEntityBase } from '../OpenLibrarySdkEntityBase';
import type { OpenLibrarySdkSDK } from '../OpenLibrarySdkSDK';
import type { Control } from '../types';
import type { Logout, LogoutCreateData } from '../OpenLibrarySdkTypes';
declare class LogoutEntity extends OpenLibrarySdkEntityBase<Logout> {
    constructor(client: OpenLibrarySdkSDK, entopts: any);
    make(this: LogoutEntity): LogoutEntity;
    create(this: any, reqdata?: LogoutCreateData, ctrl?: Control): Promise<LogoutEntity>;
}
export { LogoutEntity };
