import { OpenLibrarySdkEntityBase } from '../OpenLibrarySdkEntityBase';
import type { OpenLibrarySdkSDK } from '../OpenLibrarySdkSDK';
import type { Control } from '../types';
import type { Borrow, BorrowLoadMatch, BorrowCreateData } from '../OpenLibrarySdkTypes';
declare class BorrowEntity extends OpenLibrarySdkEntityBase<Borrow> {
    constructor(client: OpenLibrarySdkSDK, entopts: any);
    make(this: BorrowEntity): BorrowEntity;
    load(this: any, reqmatch?: BorrowLoadMatch, ctrl?: Control): Promise<BorrowEntity>;
    create(this: any, reqdata?: BorrowCreateData, ctrl?: Control): Promise<BorrowEntity>;
}
export { BorrowEntity };
