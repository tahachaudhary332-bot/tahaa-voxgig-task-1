# Open Library API

The Open Library API provides comprehensive access to library catalog data including books, authors, works, lists, and user data. Supports both public and authenticated endpoints with full data validation and type safety.

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 28 entities and 58 HTTP routes. There are 1 SDK targets.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### AccountLoan

Results: Successful Response.

SDK operations: `list`.

Key fields to recognise:

- `loans`: List of the user&#39;s current loans, each containing ocaid, book, `resource_type`, expiry, etc.

### AccountLoanHistory

Results: Successful Response.

SDK operations: `load`.

### Archiveorg

Results: Successful Response.

SDK operations: `load`.

### Author

Results: Successful Response.

SDK operations: `load`.

### Book

Results: Successful Response.

SDK operations: `load`.

### Borrow

Results: Successful Response.

SDK operations: `create`, `load`.

### CheckIn

Results: Successful Response.

SDK operations: `create`, `remove`.

Key fields to recognise:

- `day`: Day (1-31)
- `edition_key`: Edition OLID (for example
- `event_type`: Event type enum value (1=start, 2=update, 3=finish)
- `month`: Month (1-12)
- `year`: Four-digit year (1-9999)

### CreateList

Results: Successful Response.

SDK operations: `create`.

### Feed

Results: Successful Response.

SDK operations: `list`.

### Graphite

Results: Successful Response.

SDK operations: `load`.

### Health

Results: Successful Response.

SDK operations: `load`.

### Ian

Results: Successful Response.

SDK operations: `create`, `load`.

### Idval

Results: Successful Response.

SDK operations: `load`.

### Import

Results: Successful Response.

SDK operations: `create`, `load`.

### Inside

Results: Successful Response.

SDK operations: `load`.

### Key

Results: Successful Response.

SDK operations: `load`.

### Language

Results: Successful Response.

SDK operations: `list`.

### List

Results: Successful Response.

SDK operations: `create`, `list`, `load`.

### ListEditionsModel

Results: Successful Response.

SDK operations: `list`.

### ListSubjectsModel

Results: Successful Response.

SDK operations: `list`.

### Login

Results: Successful Response.

SDK operations: `create`.

### Logout

Results: Successful Response.

SDK operations: `create`.

### Merge

Results: Successful Response.

SDK operations: `create`.

### ReadingGoal

Results: Successful Response.

SDK operations: `create`, `list`.

Key fields to recognise:

- `goal`: List of reading goals
- `status`: Response status
- `year`: The year for this reading goal (1-9999)

### ReadingLog

Results: Successful Response.

SDK operations: `list`.

Key fields to recognise:

- `work`: Work data in reading log.

### Req

Results: Successful Response.

SDK operations: `load`.

### Search

Results: Successful Response.

SDK operations: `list`, `load`.

### Subject

Results: Successful Response.

SDK operations: `load`.

### Route map

Use this map to locate a capability. Consult the entity reference before supplying request data; routes for the same operation can require different fields.

| Entity | SDK operation | HTTP route | Authentication |
| --- | --- | --- | --- |
| AccountLoan | `list` | `GET /account/loans.json` | Required |
| AccountLoanHistory | `load` | `GET /account/loan-history.json` | Required |
| Archiveorg | `load` | `GET /cdn/archive.org/{filename}` | See reference |
| Author | `load` | `GET /search/authors.json` | See reference |
| Book | `load` | `GET /api/books.json` | See reference |
| Borrow | `create` | `POST /books/{olid}/{slug}/borrow` | See reference |
| Borrow | `load` | `GET /books/{olid}/{slug}/borrow` | See reference |
| CheckIn | `create` | `POST /works/OL{work_id}W/check-ins` | Required |
| CheckIn | `create` | `POST /works/OL{work_id}W/check-ins.json` | Required |
| CheckIn | `remove` | `DELETE /check-ins/{check_in_id}` | Required |
| CreateList | `create` | `POST /people/{username}/lists.json` | Required |
| Feed | `list` | `GET /tasks/feed.json` | See reference |
| Graphite | `load` | `GET /cdn/graphite/{name}` | See reference |
| Health | `load` | `GET /health` | See reference |
| Ian | `create` | `POST /borrow/ia/{ocaid}` | See reference |
| Ian | `load` | `GET /borrow/ia/{ocaid}` | See reference |
| Idval | `load` | `GET /api/volumes/{brief_or_full}/{idtype}/{idval}.json` | See reference |
| Import | `create` | `POST /import/preview.json` | Required |
| Import | `load` | `GET /import/preview.json` | Required |
| Inside | `load` | `GET /search/inside.json` | See reference |
| Key | `load` | `GET /publishers/{key}.json` | See reference |
| Key | `load` | `GET /subjects/{key}.json` | See reference |
| Language | `list` | `GET /languages.json` | See reference |
| List | `create` | `POST /people/{username}/lists/{list_id}/delete.json` | Required |
| List | `create` | `POST /people/{username}/lists/{olid}/seeds.json` | Required |
| List | `create` | `POST /people/{username}/series/{olid}/seeds.json` | Required |
| List | `create` | `POST /lists/{list_id}/delete.json` | Required |
| List | `create` | `POST /lists/{olid}/seeds.json` | Required |
| List | `create` | `POST /series/{olid}/seeds.json` | Required |
| List | `list` | `GET /authors/OL{author_id}A/lists.json` | See reference |
| List | `list` | `GET /books/OL{edition_id}M/lists.json` | See reference |
| List | `list` | `GET /subjects/{subject_key}/lists.json` | See reference |
| List | `list` | `GET /people/{username}/lists.json` | See reference |
| List | `list` | `GET /works/OL{work_id}W/lists.json` | See reference |
| List | `load` | `GET /people/{username}/lists/{olid}/seeds.json` | See reference |
| List | `load` | `GET /people/{username}/lists/{list_id}.json` | See reference |
| List | `load` | `GET /people/{username}/series/{olid}/seeds.json` | See reference |
| List | `load` | `GET /lists/{olid}/seeds.json` | See reference |
| List | `load` | `GET /lists/{list_id}.json` | See reference |
| List | `load` | `GET /series/{list_id}.json` | See reference |
| List | `load` | `GET /series/{olid}/seeds.json` | See reference |
| List | `load` | `GET /search/lists.json` | See reference |
| ListEditionsModel | `list` | `GET /people/{username}/lists/{olid}/editions.json` | See reference |
| ListEditionsModel | `list` | `GET /lists/{olid}/editions.json` | See reference |
| ListEditionsModel | `list` | `GET /series/{olid}/editions.json` | See reference |
| ListSubjectsModel | `list` | `GET /people/{username}/lists/{olid}/subjects.json` | See reference |
| ListSubjectsModel | `list` | `GET /lists/{olid}/subjects.json` | See reference |
| ListSubjectsModel | `list` | `GET /series/{olid}/subjects.json` | See reference |
| Login | `create` | `POST /account/login` | See reference |
| Logout | `create` | `POST /account/logout` | See reference |
| Merge | `create` | `POST /authors/merge.json` | Required |
| ReadingGoal | `create` | `POST /reading-goal.json` | Required |
| ReadingGoal | `list` | `GET /reading-goal.json` | Required |
| ReadingLog | `list` | `GET /people/{username}/books/{key}.json` | Required |
| Req | `load` | `GET /api/volumes/{brief_or_full}/json/{req}.json` | See reference |
| Search | `list` | `GET /search.json` | See reference |
| Search | `load` | `GET /search/editions.json` | See reference |
| Subject | `load` | `GET /search/subjects.json` | See reference |

## Connect to the API

- API server: `{base}`

The default credential is sent in the `session` cookie.

Check authentication for the route you plan to call. A route that declares no authentication can be used without credentials; this does not change the requirements of other routes. Keep credentials in environment variables or a configured secret provider, and keep them out of source control and logs.

## Make a first request

1. Choose the API server and an operation that matches your task.
2. Check the operation’s required input and authentication. Use values valid for your account and environment.
3. Send one request and inspect the returned data before adding retries, concurrency, or a larger batch.

For an SDK call, install or build the chosen client, create a client instance with its documented configuration, and call the required entity operation. Language references describe the argument shape, asynchronous behaviour, and returned values.

## Choose an SDK

Choose the language already used by your application or service. The clients represent the same API model, while package setup, naming, and return types follow each language. Check the selected client’s reference and tests before integrating it into an existing application.

| Client | Repository directory | Distribution |
| --- | --- | --- |
| TypeScript | `ts/` | Build from source |

Build-from-source entries are not marked as published in the project model. Follow the build instructions in that target’s README, then consume the resulting package using your language’s local dependency mechanism. Published entries give the installation command recorded for that client.

## Operational features

Features supply behaviour around API calls, such as request handling, diagnostics, or local testing. Inclusion in this project does not mean a feature is enabled at runtime. Check the selected SDK’s supported features and configuration defaults, then enable the behaviour your application needs.

- `test`: In-memory mock transport for testing without a live server

Start with the default client configuration. Add request limits and diagnostics as needed, test error paths, and review retry behaviour before using operations that change data. A retry can repeat an operation unless the API provides a suitable guarantee.

## Continue with the documentation

- Follow the first-call guide for the setup sequence.
- Read the authentication guide before using protected routes.
- Use the API reference for request schemas, response formats, and status codes.
- Check the chosen SDK or companion tool reference for its configuration and supported operations.

