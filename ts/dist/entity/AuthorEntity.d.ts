import { OpenLibrarySdkEntityBase } from '../OpenLibrarySdkEntityBase';
import type { OpenLibrarySdkSDK } from '../OpenLibrarySdkSDK';
import type { Control } from '../types';
import type { Author, AuthorLoadMatch } from '../OpenLibrarySdkTypes';
declare class AuthorEntity extends OpenLibrarySdkEntityBase<Author> {
    constructor(client: OpenLibrarySdkSDK, entopts: any);
    make(this: AuthorEntity): AuthorEntity;
    load(this: any, reqmatch?: AuthorLoadMatch, ctrl?: Control): Promise<AuthorEntity>;
}
export { AuthorEntity };
