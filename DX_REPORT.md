# Developer-experience report: Open Library SDK

## Selection

This assessment uses the Open Library API, a public catalogue API for books, authors, works, lists, and related records. Its official documentation exposes an OpenAPI description at <https://openlibrary.org/openapi.json>. On 16 October 2026, I checked the public Voxgig SDK catalogue organisation for an Open Library SDK and did not find one. This is a time-specific check, not a guarantee that one will never be added.

The generated project is an unofficial TypeScript client. It is MIT-licensed and is not affiliated with Open Library or the Internet Archive. No API key or authenticated request was used while preparing this assessment.

The repository URL is intentionally marked `tahachaudhary332-bot` until Taha creates the destination GitHub repository. It must be replaced before publication.

## Generator workflow

I downloaded the official OpenAPI document, then scaffolded the project with:

```powershell
npx --yes @voxgig/create-sdkgen@0.30.7 open-library-sdk -o . -d .\openapi.json
```

I installed the scaffold dependencies, added the `ts` target and the `test` feature, built the generator components, and generated the SDK. The resulting model contained 28 semantic entities, 49 paths, and 58 HTTP methods.

## What worked

- The scaffold created a self-contained project with the model, templates, components, generated TypeScript package, generated documentation, MIT license, and an offline test feature.
- `ts` installed successfully and `npm run build` completed successfully.
- The generator created 65 compiled offline test files.
- The generated SDK has useful high-level surfaces for common concepts such as `Author`, `Book`, `Search`, `Subject`, and `Health`, while retaining `direct` and `prepare` methods for paths that need lower-level control.
- No live API calls or credentials were required for the build and offline testing work.

## Friction and findings

### Windows working-directory sensitivity

The normal `.sdk` generation command tried to resolve `api/api-info.aontu` below `.sdk/` instead of `.sdk/model/`. Running the model from `.sdk/model/` resolved the API model correctly, but then templates were expected relative to that directory. A local NTFS junction from `.sdk/model/tm` to `.sdk/tm` allowed generation to complete without editing generated TypeScript.

The model test has the same working-directory sensitivity: it resolved successfully when run from `.sdk/test/`, but not when launched from `.sdk/`.

### Route and flow warnings

The Open Library description does not provide a concrete server URL, so the generated SDK exposes `server.base` as a required setting. The parser also warned about ambiguous route selectors for some similarly shaped paths, and the generator reported unreachable `BasicIdvalFlow` and `BasicReqFlow` steps. These are valuable warnings, but the next diagnostic step is not obvious to a first-time user.

### Offline test runner on Windows

`npm test` rebuilt the package but the quoted glob `"dist-test/**/*.test.js"` did not expand under this Windows shell, so it did not execute the compiled tests. Running the 65 files explicitly through Node's test runner exercised the suite. Two generated direct-operation tests failed:

- `IdvalDirect` — `direct-load-idval`
- `KeyDirect` — `direct-load-key`

Both failures were `result.ok === true` assertions. The API parser had already warned about the relevant ambiguous or unreachable routing patterns, so these failures are useful evidence that the warnings should identify the affected generated tests and provide a concrete model-action suggestion.

## Overall assessment

The SDK generator is effective at turning a substantial OpenAPI description into a readable, offline-testable TypeScript package very quickly. The main developer-experience issue encountered here is Windows path handling: generation and model tests should resolve relative includes from the input file rather than the current working directory. Clearer follow-up guidance for route warnings and a cross-platform test-file discovery strategy would make the workflow more dependable for first-time users.

## Sources

- <https://openlibrary.org/docs>
- <https://openlibrary.org/openapi.json>
- <https://github.com/voxgig/sdkgen>
