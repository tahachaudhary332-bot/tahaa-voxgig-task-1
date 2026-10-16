# OpenLibrarySdk TypeScript SDK Reference

Complete API reference for the OpenLibrarySdk TypeScript SDK.


## OpenLibrarySdkSDK

### Constructor

```ts
new OpenLibrarySdkSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `OpenLibrarySdkSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = OpenLibrarySdkSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `OpenLibrarySdkSDK` instance in test mode.


### Instance Methods

#### `AccountLoan(data?: object)`

Create a new `AccountLoan` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AccountLoanEntity` instance.

#### `AccountLoanHistory(data?: object)`

Create a new `AccountLoanHistory` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AccountLoanHistoryEntity` instance.

#### `Archiveorg(data?: object)`

Create a new `Archiveorg` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ArchiveorgEntity` instance.

#### `Author(data?: object)`

Create a new `Author` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AuthorEntity` instance.

#### `Book(data?: object)`

Create a new `Book` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `BookEntity` instance.

#### `Borrow(data?: object)`

Create a new `Borrow` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `BorrowEntity` instance.

#### `CheckIn(data?: object)`

Create a new `CheckIn` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CheckInEntity` instance.

#### `CreateList(data?: object)`

Create a new `CreateList` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CreateListEntity` instance.

#### `Feed(data?: object)`

Create a new `Feed` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `FeedEntity` instance.

#### `Graphite(data?: object)`

Create a new `Graphite` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `GraphiteEntity` instance.

#### `Health(data?: object)`

Create a new `Health` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `HealthEntity` instance.

#### `Ian(data?: object)`

Create a new `Ian` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `IanEntity` instance.

#### `Idval(data?: object)`

Create a new `Idval` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `IdvalEntity` instance.

#### `Import(data?: object)`

Create a new `Import` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ImportEntity` instance.

#### `Inside(data?: object)`

Create a new `Inside` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `InsideEntity` instance.

#### `Key(data?: object)`

Create a new `Key` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `KeyEntity` instance.

#### `Language(data?: object)`

Create a new `Language` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `LanguageEntity` instance.

#### `List(data?: object)`

Create a new `List` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ListEntity` instance.

#### `ListEditionsModel(data?: object)`

Create a new `ListEditionsModel` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ListEditionsModelEntity` instance.

#### `ListSubjectsModel(data?: object)`

Create a new `ListSubjectsModel` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ListSubjectsModelEntity` instance.

#### `Login(data?: object)`

Create a new `Login` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `LoginEntity` instance.

#### `Logout(data?: object)`

Create a new `Logout` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `LogoutEntity` instance.

#### `Merge(data?: object)`

Create a new `Merge` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `MergeEntity` instance.

#### `ReadingGoal(data?: object)`

Create a new `ReadingGoal` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ReadingGoalEntity` instance.

#### `ReadingLog(data?: object)`

Create a new `ReadingLog` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ReadingLogEntity` instance.

#### `Req(data?: object)`

Create a new `Req` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ReqEntity` instance.

#### `Search(data?: object)`

Create a new `Search` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `SearchEntity` instance.

#### `Subject(data?: object)`

Create a new `Subject` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `SubjectEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |
| `fetchargs.ctrl.signal` | `AbortSignal` | Aborts the request in flight: `ok` is then `false` and `err.code` is `request_aborted`. |

**Returns:** `Promise<{ ok, status, headers, data }>`. On a failure
`ok` is `false` and `err` holds the error.

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `OpenLibrarySdkSDK.test()`.

**Returns:** `OpenLibrarySdkSDK` instance in test mode.

#### Cancelling a call

Every entity operation takes an optional `ctrl` object after its match or
data, and an `AbortSignal` in `ctrl.signal` cancels the request in flight.
The operation then rejects with an error whose `code` is
`request_aborted` and whose `cause` is the signal's reason. A request
whose signal has already aborted is not sent. `stream()` takes the signal
as `callopts.signal`, and ends when it aborts.


---

## AccountLoanEntity

```ts
const account_loan = client.AccountLoan()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `loans` | `any[]` | Yes | List of the user's current loans, each containing ocaid, book, resource_type, expiry, etc. |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.AccountLoan().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AccountLoanEntity` instance with the same client and
options.

#### `client()`

Return the parent `OpenLibrarySdkSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AccountLoanHistoryEntity

```ts
const account_loan_history = client.AccountLoanHistory()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.AccountLoanHistory().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AccountLoanHistoryEntity` instance with the same client and
options.

#### `client()`

Return the parent `OpenLibrarySdkSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ArchiveorgEntity

```ts
const archiveorg = client.Archiveorg()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Archiveorg().load({ id: 'archiveorg_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ArchiveorgEntity` instance with the same client and
options.

#### `client()`

Return the parent `OpenLibrarySdkSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AuthorEntity

```ts
const author = client.Author()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Author().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AuthorEntity` instance with the same client and
options.

#### `client()`

Return the parent `OpenLibrarySdkSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## BookEntity

```ts
const book = client.Book()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Book().load({ bibkey: [] })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `BookEntity` instance with the same client and
options.

#### `client()`

Return the parent `OpenLibrarySdkSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## BorrowEntity

```ts
const borrow = client.Borrow()
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.Borrow().create({
  book_id: 'example_book_id',
  slug: 'example_slug',
})
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Borrow().load({ book_id: 'book_id', slug: 'slug' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `BorrowEntity` instance with the same client and
options.

#### `client()`

Return the parent `OpenLibrarySdkSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CheckInEntity

```ts
const check_in = client.CheckIn()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `day` | `any` | No | Day (1-31) |
| `edition_key` | `any` | No | Edition OLID (e.g. |
| `event_id` | `string` | No |  |
| `event_type` | `number` | Yes | Event type enum value (1=start, 2=update, 3=finish) |
| `id` | `number` | Yes |  |
| `month` | `any` | No | Month (1-12) |
| `status` | `string` | Yes |  |
| `year` | `number` | Yes | Four-digit year (1-9999) |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.CheckIn().create({
  work_id: 1,
  event_type: 1,
  id: 1,
  status: 'example_status',
  year: 1,
})
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.CheckIn().remove({ id: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CheckInEntity` instance with the same client and
options.

#### `client()`

Return the parent `OpenLibrarySdkSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CreateListEntity

```ts
const create_list = client.CreateList()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | No |  |
| `key` | `string` | Yes |  |
| `name` | `string` | No |  |
| `revision` | `number` | Yes |  |
| `seeds` | `any[]` | No |  |
| `tags` | `any[]` | No |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.CreateList().create({
  username: 'example_username',
  key: 'example_key',
  revision: 1,
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CreateListEntity` instance with the same client and
options.

#### `client()`

Return the parent `OpenLibrarySdkSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## FeedEntity

```ts
const feed = client.Feed()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `action` | `string` | Yes |  |
| `authors` | `string` | Yes |  |
| `comment` | `string` | Yes |  |
| `cover_url` | `string` | Yes |  |
| `editor` | `string` | Yes |  |
| `editor_key` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `key` | `string` | Yes |  |
| `kind` | `string` | Yes |  |
| `timestamp` | `string` | Yes |  |
| `title` | `string` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Feed().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `FeedEntity` instance with the same client and
options.

#### `client()`

Return the parent `OpenLibrarySdkSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## GraphiteEntity

```ts
const graphite = client.Graphite()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Graphite().load({ id: 'graphite_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `GraphiteEntity` instance with the same client and
options.

#### `client()`

Return the parent `OpenLibrarySdkSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## HealthEntity

```ts
const health = client.Health()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Health().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `HealthEntity` instance with the same client and
options.

#### `client()`

Return the parent `OpenLibrarySdkSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## IanEntity

```ts
const ian = client.Ian()
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.Ian().create({
  ocaid: 'example_ocaid',
})
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Ian().load({ ocaid: 'ocaid' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `IanEntity` instance with the same client and
options.

#### `client()`

Return the parent `OpenLibrarySdkSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## IdvalEntity

```ts
const idval = client.Idval()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Idval().load({ idtype: 'idtype', idval: 'idval', volume_id: 'volume_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `IdvalEntity` instance with the same client and
options.

#### `client()`

Return the parent `OpenLibrarySdkSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ImportEntity

```ts
const import_ = client.Import()
```

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `preview` | `/import/preview.json` | `client.Import().create({ $action: 'preview', ... })` |
| `preview` | `/import/preview.json` | `client.Import().load({ $action: 'preview', ... })` |

An action returns that action's OWN response, which is not necessarily a
Import record — check the API definition for its shape.

```ts
const result = await client.Import().create({
  $action: 'preview',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.Import().create({
})
```

Declares a `application/x-www-form-urlencoded` body, which this SDK does not encode yet: it sends the data as JSON.

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Import().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ImportEntity` instance with the same client and
options.

#### `client()`

Return the parent `OpenLibrarySdkSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## InsideEntity

```ts
const inside = client.Inside()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Inside().load({ q: 'q' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `InsideEntity` instance with the same client and
options.

#### `client()`

Return the parent `OpenLibrarySdkSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## KeyEntity

```ts
const key = client.Key()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Key().load({ key: 'key' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `KeyEntity` instance with the same client and
options.

#### `client()`

Return the parent `OpenLibrarySdkSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## LanguageEntity

```ts
const language = client.Language()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `count` | `number` | Yes |  |
| `ebook_edition_count` | `number` | Yes |  |
| `key` | `string` | Yes |  |
| `marc_code` | `string` | Yes |  |
| `name` | `string` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Language().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `LanguageEntity` instance with the same client and
options.

#### `client()`

Return the parent `OpenLibrarySdkSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ListEntity

```ts
const list = client.List()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `full_url` | `string` | Yes |  |
| `id` | `string` | No |  |
| `last_update` | `any` | No |  |
| `name` | `string` | Yes |  |
| `seed_count` | `number` | Yes |  |
| `url` | `string` | Yes |  |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `delete` | `/people/{username}/lists/{list_id}/delete.json` | `client.List().create({ $action: 'delete', ... })` |
| `delete` | `/lists/{list_id}/delete.json` | `client.List().create({ $action: 'delete', ... })` |
| `seed` | `/people/{username}/lists/{olid}/seeds.json` | `client.List().create({ $action: 'seed', ... })` |
| `seed` | `/lists/{olid}/seeds.json` | `client.List().create({ $action: 'seed', ... })` |
| `seed` | `/people/{username}/lists/{olid}/seeds.json` | `client.List().load({ $action: 'seed', ... })` |
| `seed` | `/lists/{olid}/seeds.json` | `client.List().load({ $action: 'seed', ... })` |

An action returns that action's OWN response, which is not necessarily a
List record — check the API definition for its shape.

```ts
const result = await client.List().create({
  $action: 'delete',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.List().create({
  series_id: 'example_series_id',
  full_url: 'example_full_url',
  name: 'example_name',
  seed_count: 1,
  url: 'example_url',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.List().list({ author_id: 1 })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.List().load({ list_id: 'list_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ListEntity` instance with the same client and
options.

#### `client()`

Return the parent `OpenLibrarySdkSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ListEditionsModelEntity

```ts
const list_editions_model = client.ListEditionsModel()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `end` | `number` | Yes |  |
| `entries` | `any[]` | Yes |  |
| `id` | `string` | No |  |
| `links` | `Record<string, any>` | Yes |  |
| `size` | `number` | Yes |  |
| `start` | `number` | Yes |  |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `editions.json` | `/people/{username}/lists/{olid}/editions.json` | `client.ListEditionsModel().list({ $action: 'editions.json', ... })` |
| `editions.json` | `/lists/{olid}/editions.json` | `client.ListEditionsModel().list({ $action: 'editions.json', ... })` |

An action returns that action's OWN response, which is not necessarily a
ListEditionsModel record — check the API definition for its shape.

```ts
const result = await client.ListEditionsModel().list({
  $action: 'editions.json',
  /* ...the action's own arguments */
})
```

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.ListEditionsModel().list({ series_id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ListEditionsModelEntity` instance with the same client and
options.

#### `client()`

Return the parent `OpenLibrarySdkSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ListSubjectsModelEntity

```ts
const list_subjects_model = client.ListSubjectsModel()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |
| `links` | `Record<string, any>` | Yes |  |
| `people` | `any[]` | Yes |  |
| `places` | `any[]` | Yes |  |
| `subjects` | `any[]` | Yes |  |
| `times` | `any[]` | Yes |  |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `subjects.json` | `/people/{username}/lists/{olid}/subjects.json` | `client.ListSubjectsModel().list({ $action: 'subjects.json', ... })` |
| `subjects.json` | `/lists/{olid}/subjects.json` | `client.ListSubjectsModel().list({ $action: 'subjects.json', ... })` |

An action returns that action's OWN response, which is not necessarily a
ListSubjectsModel record — check the API definition for its shape.

```ts
const result = await client.ListSubjectsModel().list({
  $action: 'subjects.json',
  /* ...the action's own arguments */
})
```

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.ListSubjectsModel().list({ series_id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ListSubjectsModelEntity` instance with the same client and
options.

#### `client()`

Return the parent `OpenLibrarySdkSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## LoginEntity

```ts
const login = client.Login()
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.Login().create({
})
```

Declares a `application/x-www-form-urlencoded` body, which this SDK does not encode yet: it sends the data as JSON.

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `LoginEntity` instance with the same client and
options.

#### `client()`

Return the parent `OpenLibrarySdkSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## LogoutEntity

```ts
const logout = client.Logout()
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.Logout().create({
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `LogoutEntity` instance with the same client and
options.

#### `client()`

Return the parent `OpenLibrarySdkSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## MergeEntity

```ts
const merge = client.Merge()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `comment` | `any` | No |  |
| `duplicates` | `any[]` | Yes |  |
| `master` | `string` | Yes |  |
| `mrid` | `any` | No |  |
| `olids` | `string` | No |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.Merge().create({
  duplicates: [],
  master: 'example_master',
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `MergeEntity` instance with the same client and
options.

#### `client()`

Return the parent `OpenLibrarySdkSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ReadingGoalEntity

```ts
const reading_goal = client.ReadingGoal()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `goal` | `number` | Yes | The target number of books to read |
| `status` | `string` | No | Response status |
| `year` | `number` | Yes | The year for this reading goal (1-9999) |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.ReadingGoal().create({
  goal: 1,
  year: 1,
})
```

Declares a `application/x-www-form-urlencoded` body, which this SDK does not encode yet: it sends the data as JSON.

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.ReadingGoal().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ReadingGoalEntity` instance with the same client and
options.

#### `client()`

Return the parent `OpenLibrarySdkSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ReadingLogEntity

```ts
const reading_log = client.ReadingLog()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `logged_date` | `any` | Yes |  |
| `logged_edition` | `any` | Yes |  |
| `work` | `Record<string, any>` | Yes | Work data in reading log. |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.ReadingLog().list({ key: "example", username: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ReadingLogEntity` instance with the same client and
options.

#### `client()`

Return the parent `OpenLibrarySdkSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ReqEntity

```ts
const req = client.Req()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Req().load({ req: 'req', volume_id: 'volume_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ReqEntity` instance with the same client and
options.

#### `client()`

Return the parent `OpenLibrarySdkSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## SearchEntity

```ts
const search = client.Search()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `docs` | `any[]` | No |  |
| `documentation_url` | `string` | No |  |
| `numFound` | `number` | Yes |  |
| `numFoundExact` | `boolean` | Yes |  |
| `num_found` | `number` | Yes |  |
| `offset` | `number` | Yes |  |
| `q` | `string` | Yes |  |
| `start` | `number` | Yes |  |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `edition` | `/search/editions.json` | `client.Search().load({ $action: 'edition', ... })` |

An action returns that action's OWN response, which is not necessarily a
Search record — check the API definition for its shape.

```ts
const result = await client.Search().load({
  $action: 'edition',
  /* ...the action's own arguments */
})
```

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Search().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Search().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `SearchEntity` instance with the same client and
options.

#### `client()`

Return the parent `OpenLibrarySdkSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## SubjectEntity

```ts
const subject = client.Subject()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Subject().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `SubjectEntity` instance with the same client and
options.

#### `client()`

Return the parent `OpenLibrarySdkSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | Test transport |


Features are activated via the `feature` option:

```ts
const client = new OpenLibrarySdkSDK({
  feature: {
    test: { active: true },
  }
})
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### `test`

Test transport.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

| Option | Type |
|---|---|
| `entity` | map |
| `net` | map |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

