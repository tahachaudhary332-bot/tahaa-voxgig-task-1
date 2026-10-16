import { OpenLibrarySdkEntityBase } from '../OpenLibrarySdkEntityBase';
import type { OpenLibrarySdkSDK } from '../OpenLibrarySdkSDK';
import type { Control } from '../types';
import type { AccountLoan, AccountLoanListMatch } from '../OpenLibrarySdkTypes';
declare class AccountLoanEntity extends OpenLibrarySdkEntityBase<AccountLoan> {
    constructor(client: OpenLibrarySdkSDK, entopts: any);
    make(this: AccountLoanEntity): AccountLoanEntity;
    list(this: any, reqmatch?: AccountLoanListMatch, ctrl?: Control): Promise<AccountLoanEntity[]>;
}
export { AccountLoanEntity };
