import { OpenLibrarySdkEntityBase } from '../OpenLibrarySdkEntityBase';
import type { OpenLibrarySdkSDK } from '../OpenLibrarySdkSDK';
import type { Control } from '../types';
import type { Graphite, GraphiteLoadMatch } from '../OpenLibrarySdkTypes';
declare class GraphiteEntity extends OpenLibrarySdkEntityBase<Graphite> {
    constructor(client: OpenLibrarySdkSDK, entopts: any);
    make(this: GraphiteEntity): GraphiteEntity;
    load(this: any, reqmatch?: GraphiteLoadMatch, ctrl?: Control): Promise<GraphiteEntity>;
}
export { GraphiteEntity };
