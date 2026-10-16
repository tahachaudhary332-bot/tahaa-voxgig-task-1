import { OpenLibrarySdkEntityBase } from '../OpenLibrarySdkEntityBase';
import type { OpenLibrarySdkSDK } from '../OpenLibrarySdkSDK';
import type { Control } from '../types';
import type { Subject, SubjectLoadMatch } from '../OpenLibrarySdkTypes';
declare class SubjectEntity extends OpenLibrarySdkEntityBase<Subject> {
    constructor(client: OpenLibrarySdkSDK, entopts: any);
    make(this: SubjectEntity): SubjectEntity;
    load(this: any, reqmatch?: SubjectLoadMatch, ctrl?: Control): Promise<SubjectEntity>;
}
export { SubjectEntity };
