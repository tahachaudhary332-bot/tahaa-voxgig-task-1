import { OpenLibrarySdkEntityBase } from '../OpenLibrarySdkEntityBase';
import type { OpenLibrarySdkSDK } from '../OpenLibrarySdkSDK';
import type { Control } from '../types';
import type { ReadingGoal, ReadingGoalListMatch, ReadingGoalCreateData } from '../OpenLibrarySdkTypes';
declare class ReadingGoalEntity extends OpenLibrarySdkEntityBase<ReadingGoal> {
    constructor(client: OpenLibrarySdkSDK, entopts: any);
    make(this: ReadingGoalEntity): ReadingGoalEntity;
    list(this: any, reqmatch?: ReadingGoalListMatch, ctrl?: Control): Promise<ReadingGoalEntity[]>;
    create(this: any, reqdata?: ReadingGoalCreateData, ctrl?: Control): Promise<ReadingGoalEntity>;
}
export { ReadingGoalEntity };
