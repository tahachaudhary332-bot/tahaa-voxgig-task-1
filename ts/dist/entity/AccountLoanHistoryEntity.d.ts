import { OpenLibrarySdkEntityBase } from '../OpenLibrarySdkEntityBase';
import type { OpenLibrarySdkSDK } from '../OpenLibrarySdkSDK';
import type { Control } from '../types';
import type { AccountLoanHistory, AccountLoanHistoryLoadMatch } from '../OpenLibrarySdkTypes';
declare class AccountLoanHistoryEntity extends OpenLibrarySdkEntityBase<AccountLoanHistory> {
    constructor(client: OpenLibrarySdkSDK, entopts: any);
    make(this: AccountLoanHistoryEntity): AccountLoanHistoryEntity;
    load(this: any, reqmatch?: AccountLoanHistoryLoadMatch, ctrl?: Control): Promise<AccountLoanHistoryEntity>;
}
export { AccountLoanHistoryEntity };
