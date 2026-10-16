import { OpenLibrarySdkEntityBase } from '../OpenLibrarySdkEntityBase';
import type { OpenLibrarySdkSDK } from '../OpenLibrarySdkSDK';
import type { Control } from '../types';
import type { Login, LoginCreateData } from '../OpenLibrarySdkTypes';
declare class LoginEntity extends OpenLibrarySdkEntityBase<Login> {
    constructor(client: OpenLibrarySdkSDK, entopts: any);
    make(this: LoginEntity): LoginEntity;
    create(this: any, reqdata?: LoginCreateData, ctrl?: Control): Promise<LoginEntity>;
}
export { LoginEntity };
