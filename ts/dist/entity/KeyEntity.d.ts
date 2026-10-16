import { OpenLibrarySdkEntityBase } from '../OpenLibrarySdkEntityBase';
import type { OpenLibrarySdkSDK } from '../OpenLibrarySdkSDK';
import type { Control } from '../types';
import type { Key, KeyLoadMatch } from '../OpenLibrarySdkTypes';
declare class KeyEntity extends OpenLibrarySdkEntityBase<Key> {
    constructor(client: OpenLibrarySdkSDK, entopts: any);
    make(this: KeyEntity): KeyEntity;
    load(this: any, reqmatch?: KeyLoadMatch, ctrl?: Control): Promise<KeyEntity>;
}
export { KeyEntity };
