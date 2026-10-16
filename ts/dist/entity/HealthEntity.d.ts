import { OpenLibrarySdkEntityBase } from '../OpenLibrarySdkEntityBase';
import type { OpenLibrarySdkSDK } from '../OpenLibrarySdkSDK';
import type { Control } from '../types';
import type { Health, HealthLoadMatch } from '../OpenLibrarySdkTypes';
declare class HealthEntity extends OpenLibrarySdkEntityBase<Health> {
    constructor(client: OpenLibrarySdkSDK, entopts: any);
    make(this: HealthEntity): HealthEntity;
    load(this: any, reqmatch?: HealthLoadMatch, ctrl?: Control): Promise<HealthEntity>;
}
export { HealthEntity };
