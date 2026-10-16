import { OpenLibrarySdkEntityBase } from '../OpenLibrarySdkEntityBase';
import type { OpenLibrarySdkSDK } from '../OpenLibrarySdkSDK';
import type { Control } from '../types';
import type { Book, BookLoadMatch } from '../OpenLibrarySdkTypes';
declare class BookEntity extends OpenLibrarySdkEntityBase<Book> {
    constructor(client: OpenLibrarySdkSDK, entopts: any);
    make(this: BookEntity): BookEntity;
    load(this: any, reqmatch?: BookLoadMatch, ctrl?: Control): Promise<BookEntity>;
}
export { BookEntity };
