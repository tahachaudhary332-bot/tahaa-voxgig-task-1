# OpenLibrarySdk TypeScript SDK



The TypeScript SDK for the OpenLibrarySdk API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.AccountLoan()` — each with a small set of operations (`list`, `load`, `create`, `remove`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`, see [Tags](https://github.com/tahachaudhary332-bot/open-library-voxgig-sdk/tags)), or from a
clone, which carries the compiled `dist/`:

```bash
git clone https://github.com/tahachaudhary332-bot/open-library-voxgig-sdk
npm install ./open-library-voxgig-sdk/ts
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record. The client sends the API key as the `session` cookie.

### 1. Create a client

```ts
import { OpenLibrarySdkSDK } from '@voxgig-sdk/open-library-sdk'

const client = new OpenLibrarySdkSDK({
  apikey: process.env.OPEN_LIBRARY_SDK_APIKEY,
  // Required: this API's server URL is templated on these.
  server: {
    base: '<base>',
  },
})
```

### 2. List accountloan records

`list()` resolves to an array of AccountLoan ENTITIES — every operation
resolves to entities, not raw records. Iterate them directly, and call
`.data()` on one for the record it holds:

```ts
const accountloans = await client.AccountLoan().list()

for (const accountloan of accountloans) {
  console.log(accountloan.data())
}
```

### 3. Load a borrow

Borrow is nested under book, so provide the `book_id`.
`load()` returns the entity and throws on failure; `.data()` reads its record:

```ts
try {
  const borrow = await client.Borrow().load({
    book_id: 'example_book_id',
    slug: 'example_slug',
  })
  console.log(borrow.data())
} catch (err) {
  console.error('load failed:', err)
}
```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const author = await client.Author().load()
  console.log(author.data())
} catch (err) {
  console.error('load failed:', err)
}
```

The low-level `direct()` method does **not** throw — it returns the
result envelope. Branch on `ok`; on failure `status` holds the HTTP status
(for error responses) and `err` holds the error:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example_id' },
})

if (!result.ok) {
  console.error('request failed:', result.status, result.err)
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = OpenLibrarySdkSDK.test()

const author = await client.Author().load()
// author is the Author entity; .data() reads its mock record
console.log(author.data())
```

You can also use the instance method:

```ts
const client = new OpenLibrarySdkSDK({ apikey: '...' })
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.Author()

// First call runs the operation and stores its result
await entity.load()

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data)
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new OpenLibrarySdkSDK({
  apikey: '...',
  extend: [logger],
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
OPEN_LIBRARY_SDK_TEST_LIVE=TRUE
OPEN_LIBRARY_SDK_APIKEY=<your-key>
```

Then run:

```bash
cd ts && npm test
```

Live entity tests continue independent operations after errors and attempt
supported cleanup. Their final result reports failures and missing prerequisites
after the remaining work completes. The model and test inputs determine which
API operations the generated scenarios cover.


## Reference

### OpenLibrarySdkSDK

#### Constructor

```ts
new OpenLibrarySdkSDK(options?: {
  apikey?: string
  server?: { base: string }
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `server` | `object` | **Required.** Values for the server-URL variables: `base`. The API base URL is a template over them. |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `AccountLoan(data?)` | `AccountLoanEntity` | Create an AccountLoan entity instance. |
| `AccountLoanHistory(data?)` | `AccountLoanHistoryEntity` | Create an AccountLoanHistory entity instance. |
| `Archiveorg(data?)` | `ArchiveorgEntity` | Create an Archiveorg entity instance. |
| `Author(data?)` | `AuthorEntity` | Create an Author entity instance. |
| `Book(data?)` | `BookEntity` | Create a Book entity instance. |
| `Borrow(data?)` | `BorrowEntity` | Create a Borrow entity instance. |
| `CheckIn(data?)` | `CheckInEntity` | Create a CheckIn entity instance. |
| `CreateList(data?)` | `CreateListEntity` | Create a CreateList entity instance. |
| `Feed(data?)` | `FeedEntity` | Create a Feed entity instance. |
| `Graphite(data?)` | `GraphiteEntity` | Create a Graphite entity instance. |
| `Health(data?)` | `HealthEntity` | Create a Health entity instance. |
| `Ian(data?)` | `IanEntity` | Create an Ian entity instance. |
| `Idval(data?)` | `IdvalEntity` | Create an Idval entity instance. |
| `Import(data?)` | `ImportEntity` | Create an Import entity instance. |
| `Inside(data?)` | `InsideEntity` | Create an Inside entity instance. |
| `Key(data?)` | `KeyEntity` | Create a Key entity instance. |
| `Language(data?)` | `LanguageEntity` | Create a Language entity instance. |
| `List(data?)` | `ListEntity` | Create a List entity instance. |
| `ListEditionsModel(data?)` | `ListEditionsModelEntity` | Create a ListEditionsModel entity instance. |
| `ListSubjectsModel(data?)` | `ListSubjectsModelEntity` | Create a ListSubjectsModel entity instance. |
| `Login(data?)` | `LoginEntity` | Create a Login entity instance. |
| `Logout(data?)` | `LogoutEntity` | Create a Logout entity instance. |
| `Merge(data?)` | `MergeEntity` | Create a Merge entity instance. |
| `ReadingGoal(data?)` | `ReadingGoalEntity` | Create a ReadingGoal entity instance. |
| `ReadingLog(data?)` | `ReadingLogEntity` | Create a ReadingLog entity instance. |
| `Req(data?)` | `ReqEntity` | Create a Req entity instance. |
| `Search(data?)` | `SearchEntity` | Create a Search entity instance. |
| `Subject(data?)` | `SubjectEntity` | Create a Subject entity instance. |
| `tester(testopts?, sdkopts?)` | `OpenLibrarySdkSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `OpenLibrarySdkSDK.test(testopts?, sdkopts?)` | `OpenLibrarySdkSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Entity>` | Load a single entity by match criteria, and return it. |
| `list` | `list(reqmatch?, ctrl?): Promise<Entity[]>` | List entities matching the criteria, one per record. |
| `create` | `create(reqdata?, ctrl?): Promise<Entity>` | Create a new entity, and return it. |
| `remove` | `remove(reqmatch?, ctrl?): Promise<Entity>` | Remove an entity, and return it marked as deleted. |
| `data` | `data(data?: Partial<Entity>): Entity` | Get or set entity data. |
| `match` | `match(match?: Partial<Entity>): Partial<Entity>` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): OpenLibrarySdkSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity itself — there is no result
envelope, and an entity's `data()` reads its record:

- `load` and `create` resolve to a single entity object.
- `list` resolves to an **array** of entity objects (iterate it directly;
  there is no `.data` and no `.ok`).
- `remove` resolves to the entity, marked as deleted.

On a failed request these methods **throw**, so wrap calls in
`try`/`catch` to handle errors. Only `direct()` returns the result
envelope described below.

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

### Entities

#### AccountLoan

| Field | Description |
| --- | --- |
| `loans` | List of the user's current loans, each containing ocaid, book, resource_type, expiry, etc. |

Operations: list.

API path: `/account/loans.json`

#### AccountLoanHistory

| Field | Description |
| --- | --- |

Operations: load.

API path: `/account/loan-history.json`

#### Archiveorg

| Field | Description |
| --- | --- |
| `id` |  |

Operations: load.

API path: `/cdn/archive.org/{filename}`

#### Author

| Field | Description |
| --- | --- |

Operations: load.

API path: `/search/authors.json`

#### Book

| Field | Description |
| --- | --- |

Operations: load.

API path: `/api/books.json`

#### Borrow

| Field | Description |
| --- | --- |

Operations: create, load.

API path: `/books/{olid}/{slug}/borrow`

#### CheckIn

| Field | Description |
| --- | --- |
| `day` | Day (1-31) |
| `edition_key` | Edition OLID (e.g. |
| `event_id` |  |
| `event_type` | Event type enum value (1=start, 2=update, 3=finish) |
| `id` |  |
| `month` | Month (1-12) |
| `status` |  |
| `year` | Four-digit year (1-9999) |

Operations: create, remove.

API path: `/works/OL{work_id}W/check-ins`

#### CreateList

| Field | Description |
| --- | --- |
| `description` |  |
| `key` |  |
| `name` |  |
| `revision` |  |
| `seeds` |  |
| `tags` |  |

Operations: create.

API path: `/people/{username}/lists.json`

#### Feed

| Field | Description |
| --- | --- |
| `action` |  |
| `authors` |  |
| `comment` |  |
| `cover_url` |  |
| `editor` |  |
| `editor_key` |  |
| `id` |  |
| `key` |  |
| `kind` |  |
| `timestamp` |  |
| `title` |  |

Operations: list.

API path: `/tasks/feed.json`

#### Graphite

| Field | Description |
| --- | --- |
| `id` |  |

Operations: load.

API path: `/cdn/graphite/{name}`

#### Health

| Field | Description |
| --- | --- |

Operations: load.

API path: `/health`

#### Ian

| Field | Description |
| --- | --- |

Operations: create, load.

API path: `/borrow/ia/{ocaid}`

#### Idval

| Field | Description |
| --- | --- |

Operations: load.

API path: `/api/volumes/{brief_or_full}/{idtype}/{idval}.json`

#### Import

| Field | Description |
| --- | --- |

Operations: create, load.

API path: `/import/preview.json`

#### Inside

| Field | Description |
| --- | --- |

Operations: load.

API path: `/search/inside.json`

#### Key

| Field | Description |
| --- | --- |

Operations: load.

API path: `/publishers/{key}.json`

#### Language

| Field | Description |
| --- | --- |
| `count` |  |
| `ebook_edition_count` |  |
| `key` |  |
| `marc_code` |  |
| `name` |  |

Operations: list.

API path: `/languages.json`

#### List

| Field | Description |
| --- | --- |
| `full_url` |  |
| `id` |  |
| `last_update` |  |
| `name` |  |
| `seed_count` |  |
| `url` |  |

Operations: create, list, load.

API path: `/people/{username}/lists/{list_id}/delete.json`

#### ListEditionsModel

| Field | Description |
| --- | --- |
| `end` |  |
| `entries` |  |
| `id` |  |
| `links` |  |
| `size` |  |
| `start` |  |

Operations: list.

API path: `/people/{username}/lists/{olid}/editions.json`

#### ListSubjectsModel

| Field | Description |
| --- | --- |
| `id` |  |
| `links` |  |
| `people` |  |
| `places` |  |
| `subjects` |  |
| `times` |  |

Operations: list.

API path: `/people/{username}/lists/{olid}/subjects.json`

#### Login

| Field | Description |
| --- | --- |

Operations: create.

API path: `/account/login`

#### Logout

| Field | Description |
| --- | --- |

Operations: create.

API path: `/account/logout`

#### Merge

| Field | Description |
| --- | --- |
| `comment` |  |
| `duplicates` |  |
| `master` |  |
| `mrid` |  |
| `olids` |  |

Operations: create.

API path: `/authors/merge.json`

#### ReadingGoal

| Field | Description |
| --- | --- |
| `goal` | The target number of books to read |
| `status` | Response status |
| `year` | The year for this reading goal (1-9999) |

Operations: create, list.

API path: `/reading-goal.json`

#### ReadingLog

| Field | Description |
| --- | --- |
| `logged_date` |  |
| `logged_edition` |  |
| `work` | Work data in reading log. |

Operations: list.

API path: `/people/{username}/books/{key}.json`

#### Req

| Field | Description |
| --- | --- |

Operations: load.

API path: `/api/volumes/{brief_or_full}/json/{req}.json`

#### Search

| Field | Description |
| --- | --- |
| `docs` |  |
| `documentation_url` |  |
| `numFound` |  |
| `numFoundExact` |  |
| `num_found` |  |
| `offset` |  |
| `q` |  |
| `start` |  |

Operations: list, load.

API path: `/search.json`

#### Subject

| Field | Description |
| --- | --- |

Operations: load.

API path: `/search/subjects.json`



## Entities


### AccountLoan

Create an instance: `const account_loan = client.AccountLoan()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `loans` | `any[]` | List of the user's current loans, each containing ocaid, book, resource_type, expiry, etc. |

#### Example: List

```ts
const account_loans = await client.AccountLoan().list()
```


### AccountLoanHistory

Create an instance: `const account_loan_history = client.AccountLoanHistory()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const account_loan_history = await client.AccountLoanHistory().load()
```


### Archiveorg

Create an instance: `const archiveorg = client.Archiveorg()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```ts
const archiveorg = await client.Archiveorg().load({ id: 'archiveorg_id' })
```


### Author

Create an instance: `const author = client.Author()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const author = await client.Author().load()
```


### Book

Create an instance: `const book = client.Book()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const book = await client.Book().load({ bibkey: [] })
```


### Borrow

Create an instance: `const borrow = client.Borrow()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const borrow = await client.Borrow().load({ book_id: 'book_id', slug: 'slug' })
```

#### Example: Create

```ts
const borrow = await client.Borrow().create({
  book_id: 'example_book_id',
  slug: 'example_slug',
})
```


### CheckIn

Create an instance: `const check_in = client.CheckIn()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `day` | `any` | Day (1-31) |
| `edition_key` | `any` | Edition OLID (e.g. |
| `event_id` | `string` |  |
| `event_type` | `number` | Event type enum value (1=start, 2=update, 3=finish) |
| `id` | `number` |  |
| `month` | `any` | Month (1-12) |
| `status` | `string` |  |
| `year` | `number` | Four-digit year (1-9999) |

#### Example: Create

```ts
const check_in = await client.CheckIn().create({
  work_id: 1,
  event_type: 1,
  id: 1,
  status: 'example_status',
  year: 1,
})
```


### CreateList

Create an instance: `const create_list = client.CreateList()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `string` |  |
| `key` | `string` |  |
| `name` | `string` |  |
| `revision` | `number` |  |
| `seeds` | `any[]` |  |
| `tags` | `any[]` |  |

#### Example: Create

```ts
const create_list = await client.CreateList().create({
  username: 'example_username',
  key: 'example_key',
  revision: 1,
})
```


### Feed

Create an instance: `const feed = client.Feed()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `action` | `string` |  |
| `authors` | `string` |  |
| `comment` | `string` |  |
| `cover_url` | `string` |  |
| `editor` | `string` |  |
| `editor_key` | `string` |  |
| `id` | `string` |  |
| `key` | `string` |  |
| `kind` | `string` |  |
| `timestamp` | `string` |  |
| `title` | `string` |  |

#### Example: List

```ts
const feeds = await client.Feed().list()
```


### Graphite

Create an instance: `const graphite = client.Graphite()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```ts
const graphite = await client.Graphite().load({ id: 'graphite_id' })
```


### Health

Create an instance: `const health = client.Health()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const health = await client.Health().load()
```


### Ian

Create an instance: `const ian = client.Ian()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const ian = await client.Ian().load({ ocaid: 'ocaid' })
```

#### Example: Create

```ts
const ian = await client.Ian().create({
  ocaid: 'example_ocaid',
})
```


### Idval

Create an instance: `const idval = client.Idval()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const idval = await client.Idval().load({ idtype: 'idtype', idval: 'idval', volume_id: 'volume_id' })
```


### Import

Create an instance: `const import_ = client.Import()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const import_ = await client.Import().load()
```

#### Example: Create

```ts
const import_ = await client.Import().create({
})
```


### Inside

Create an instance: `const inside = client.Inside()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const inside = await client.Inside().load({ q: 'q' })
```


### Key

Create an instance: `const key = client.Key()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const key = await client.Key().load({ key: 'key' })
```


### Language

Create an instance: `const language = client.Language()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `count` | `number` |  |
| `ebook_edition_count` | `number` |  |
| `key` | `string` |  |
| `marc_code` | `string` |  |
| `name` | `string` |  |

#### Example: List

```ts
const languages = await client.Language().list()
```


### List

Create an instance: `const list = client.List()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `full_url` | `string` |  |
| `id` | `string` |  |
| `last_update` | `any` |  |
| `name` | `string` |  |
| `seed_count` | `number` |  |
| `url` | `string` |  |

#### Example: Load

```ts
const list = await client.List().load({ list_id: 'list_id' })
```

#### Example: List

```ts
const lists = await client.List().list({ author_id: 1 })
```

#### Example: Create

```ts
const list = await client.List().create({
  series_id: 'example_series_id',
  full_url: 'example_full_url',
  name: 'example_name',
  seed_count: 1,
  url: 'example_url',
})
```


### ListEditionsModel

Create an instance: `const list_editions_model = client.ListEditionsModel()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `end` | `number` |  |
| `entries` | `any[]` |  |
| `id` | `string` |  |
| `links` | `Record<string, any>` |  |
| `size` | `number` |  |
| `start` | `number` |  |

#### Example: List

```ts
const list_editions_models = await client.ListEditionsModel().list({ series_id: "example" })
```


### ListSubjectsModel

Create an instance: `const list_subjects_model = client.ListSubjectsModel()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |
| `links` | `Record<string, any>` |  |
| `people` | `any[]` |  |
| `places` | `any[]` |  |
| `subjects` | `any[]` |  |
| `times` | `any[]` |  |

#### Example: List

```ts
const list_subjects_models = await client.ListSubjectsModel().list({ series_id: "example" })
```


### Login

Create an instance: `const login = client.Login()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```ts
const login = await client.Login().create({
})
```


### Logout

Create an instance: `const logout = client.Logout()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```ts
const logout = await client.Logout().create({
})
```


### Merge

Create an instance: `const merge = client.Merge()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `comment` | `any` |  |
| `duplicates` | `any[]` |  |
| `master` | `string` |  |
| `mrid` | `any` |  |
| `olids` | `string` |  |

#### Example: Create

```ts
const merge = await client.Merge().create({
  duplicates: [],
  master: 'example_master',
})
```


### ReadingGoal

Create an instance: `const reading_goal = client.ReadingGoal()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `goal` | `number` | The target number of books to read |
| `status` | `string` | Response status |
| `year` | `number` | The year for this reading goal (1-9999) |

#### Example: List

```ts
const reading_goals = await client.ReadingGoal().list()
```

#### Example: Create

```ts
const reading_goal = await client.ReadingGoal().create({
  goal: 1,
  year: 1,
})
```


### ReadingLog

Create an instance: `const reading_log = client.ReadingLog()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `logged_date` | `any` |  |
| `logged_edition` | `any` |  |
| `work` | `Record<string, any>` | Work data in reading log. |

#### Example: List

```ts
const reading_logs = await client.ReadingLog().list({ key: "example", username: "example" })
```


### Req

Create an instance: `const req = client.Req()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const req = await client.Req().load({ req: 'req', volume_id: 'volume_id' })
```


### Search

Create an instance: `const search = client.Search()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `docs` | `any[]` |  |
| `documentation_url` | `string` |  |
| `numFound` | `number` |  |
| `numFoundExact` | `boolean` |  |
| `num_found` | `number` |  |
| `offset` | `number` |  |
| `q` | `string` |  |
| `start` | `number` |  |

#### Example: Load

```ts
const search = await client.Search().load()
```

#### Example: List

```ts
const searchs = await client.Search().list()
```


### Subject

Create an instance: `const subject = client.Subject()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const subject = await client.Subject().load()
```

## Features

This SDK ships 1 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`test`](#test) | Test transport |

### test

Test transport.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **TestFeature**: Test transport

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
open-library-sdk/
├── src/
│   ├── OpenLibrarySdkSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { OpenLibrarySdkSDK } from '@voxgig-sdk/open-library-sdk'
```

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const author = client.Author()
await author.load()

// author.data() now returns the author data from the last `load`
// author.match() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
