import { OpenLibrarySdkEntityBase } from '../OpenLibrarySdkEntityBase';
import type { OpenLibrarySdkSDK } from '../OpenLibrarySdkSDK';
import type { Control } from '../types';
import type { Feed, FeedListMatch } from '../OpenLibrarySdkTypes';
declare class FeedEntity extends OpenLibrarySdkEntityBase<Feed> {
    constructor(client: OpenLibrarySdkSDK, entopts: any);
    make(this: FeedEntity): FeedEntity;
    list(this: any, reqmatch?: FeedListMatch, ctrl?: Control): Promise<FeedEntity[]>;
}
export { FeedEntity };
