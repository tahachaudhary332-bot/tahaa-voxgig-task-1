import { OpenLibrarySdkEntityBase } from '../OpenLibrarySdkEntityBase';
import type { OpenLibrarySdkSDK } from '../OpenLibrarySdkSDK';
import type { Control } from '../types';
import type { Language, LanguageListMatch } from '../OpenLibrarySdkTypes';
declare class LanguageEntity extends OpenLibrarySdkEntityBase<Language> {
    constructor(client: OpenLibrarySdkSDK, entopts: any);
    make(this: LanguageEntity): LanguageEntity;
    list(this: any, reqmatch?: LanguageListMatch, ctrl?: Control): Promise<LanguageEntity[]>;
}
export { LanguageEntity };
