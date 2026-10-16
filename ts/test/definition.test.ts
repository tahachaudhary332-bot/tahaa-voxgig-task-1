import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
  {
    "entity": "account_loan",
    "accessor": "AccountLoan",
    "op": "list",
    "method": "GET",
    "path": "/account/loans.json",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "cookie",
          "name": "session"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "loans": [
        {}
      ]
    },
    "idField": "id"
  },
  {
    "entity": "account_loan_history",
    "accessor": "AccountLoanHistory",
    "op": "load",
    "method": "GET",
    "path": "/account/loan-history.json",
    "args": [],
    "select": {
      "page": 1
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "page"
    ],
    "queryArgs": [
      {
        "name": "page",
        "wire": "page"
      }
    ],
    "auth": [
      [
        {
          "in": "cookie",
          "name": "session"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "loans_history": {}
    },
    "idField": "id"
  },
  {
    "entity": "archiveorg",
    "accessor": "Archiveorg",
    "op": "load",
    "method": "GET",
    "path": "/cdn/archive.org/{filename}",
    "args": [
      {
        "name": "id",
        "wire": "filename",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [],
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "author",
    "accessor": "Author",
    "op": "load",
    "method": "GET",
    "path": "/search/authors.json",
    "args": [],
    "select": {
      "field": "*",
      "limit": 100,
      "offset": "v1",
      "page": "v1",
      "q": "",
      "sort": ""
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "limit",
      "offset",
      "page",
      "q",
      "fields",
      "sort"
    ],
    "queryArgs": [
      {
        "name": "field",
        "wire": "fields"
      },
      {
        "name": "limit",
        "wire": "limit"
      },
      {
        "name": "offset",
        "wire": "offset"
      },
      {
        "name": "page",
        "wire": "page"
      },
      {
        "name": "q",
        "wire": "q"
      },
      {
        "name": "sort",
        "wire": "sort"
      }
    ],
    "auth": [],
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "book",
    "accessor": "Book",
    "op": "load",
    "method": "GET",
    "path": "/api/books.json",
    "args": [],
    "select": {
      "bibkey": "v1",
      "callback": "v1",
      "detail": "false",
      "format": "v1",
      "high_priority": "v1",
      "jscmd": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "bibkeys",
      "details",
      "jscmd",
      "callback",
      "high_priority",
      "format"
    ],
    "queryArgs": [
      {
        "name": "bibkey",
        "wire": "bibkeys"
      },
      {
        "name": "callback",
        "wire": "callback"
      },
      {
        "name": "detail",
        "wire": "details"
      },
      {
        "name": "format",
        "wire": "format"
      },
      {
        "name": "high_priority",
        "wire": "high_priority"
      },
      {
        "name": "jscmd",
        "wire": "jscmd"
      }
    ],
    "auth": [],
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "borrow",
    "accessor": "Borrow",
    "op": "create",
    "method": "POST",
    "path": "/books/{olid}/{slug}/borrow",
    "args": [
      {
        "name": "book_id",
        "wire": "olid",
        "value": "p1"
      },
      {
        "name": "slug",
        "wire": "slug",
        "value": "p2"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [],
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "borrow",
    "accessor": "Borrow",
    "op": "load",
    "method": "GET",
    "path": "/books/{olid}/{slug}/borrow",
    "args": [
      {
        "name": "book_id",
        "wire": "olid",
        "value": "p1"
      },
      {
        "name": "slug",
        "wire": "slug",
        "value": "p2"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [],
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "check_in",
    "accessor": "CheckIn",
    "op": "remove",
    "method": "DELETE",
    "path": "/check-ins/{check_in_id}",
    "args": [
      {
        "name": "id",
        "wire": "check_in_id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "cookie",
          "name": "session"
        }
      ]
    ],
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "create_list",
    "accessor": "CreateList",
    "op": "create",
    "method": "POST",
    "path": "/people/{username}/lists.json",
    "args": [
      {
        "name": "username",
        "wire": "username",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "cookie",
          "name": "session"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "key": "x",
      "revision": 1
    },
    "idField": "id"
  },
  {
    "entity": "feed",
    "accessor": "Feed",
    "op": "list",
    "method": "GET",
    "path": "/tasks/feed.json",
    "args": [],
    "select": {
      "limit": 20,
      "offset": 0
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "limit",
      "offset"
    ],
    "queryArgs": [
      {
        "name": "limit",
        "wire": "limit"
      },
      {
        "name": "offset",
        "wire": "offset"
      }
    ],
    "auth": [],
    "status": 200,
    "sample": {
      "rows": [
        {
          "id": "x",
          "key": "x",
          "title": "x",
          "authors": "x",
          "cover_url": "x",
          "kind": "x",
          "action": "x",
          "editor": "x",
          "editor_key": "x",
          "comment": "x",
          "timestamp": "x"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "graphite",
    "accessor": "Graphite",
    "op": "load",
    "method": "GET",
    "path": "/cdn/graphite/{name}",
    "args": [
      {
        "name": "id",
        "wire": "name",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [],
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "health",
    "accessor": "Health",
    "op": "load",
    "method": "GET",
    "path": "/health",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [],
    "status": 200,
    "sample": {},
    "idField": "id"
  },
  {
    "entity": "ian",
    "accessor": "Ian",
    "op": "create",
    "method": "POST",
    "path": "/borrow/ia/{ocaid}",
    "args": [
      {
        "name": "ocaid",
        "wire": "ocaid",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [],
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "ian",
    "accessor": "Ian",
    "op": "load",
    "method": "GET",
    "path": "/borrow/ia/{ocaid}",
    "args": [
      {
        "name": "ocaid",
        "wire": "ocaid",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [],
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "idval",
    "accessor": "Idval",
    "op": "load",
    "method": "GET",
    "path": "/api/volumes/{brief_or_full}/{idtype}/{idval}.json",
    "args": [
      {
        "name": "idtype",
        "wire": "idtype",
        "value": "p1"
      },
      {
        "name": "idval",
        "wire": "idval",
        "value": "p2"
      },
      {
        "name": "volume_id",
        "wire": "brief_or_full",
        "value": "p3"
      }
    ],
    "select": {
      "show_all_item": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "show_all_items"
    ],
    "queryArgs": [
      {
        "name": "show_all_item",
        "wire": "show_all_items"
      }
    ],
    "auth": [],
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "import",
    "accessor": "Import",
    "op": "create",
    "method": "POST",
    "path": "/import/preview.json",
    "action": "preview",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "cookie",
          "name": "session"
        }
      ]
    ],
    "status": 200,
    "sample": {},
    "idField": "id"
  },
  {
    "entity": "import",
    "accessor": "Import",
    "op": "load",
    "method": "GET",
    "path": "/import/preview.json",
    "action": "preview",
    "args": [],
    "select": {
      "identifier": "v1",
      "provider": "v1",
      "source": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "source",
      "provider",
      "identifier"
    ],
    "queryArgs": [
      {
        "name": "identifier",
        "wire": "identifier"
      },
      {
        "name": "provider",
        "wire": "provider"
      },
      {
        "name": "source",
        "wire": "source"
      }
    ],
    "auth": [
      [
        {
          "in": "cookie",
          "name": "session"
        }
      ]
    ],
    "status": 200,
    "sample": {},
    "idField": "id"
  },
  {
    "entity": "inside",
    "accessor": "Inside",
    "op": "load",
    "method": "GET",
    "path": "/search/inside.json",
    "args": [],
    "select": {
      "q": "v1",
      "facet": "v1",
      "language": "v1",
      "limit": 20,
      "offset": "v1",
      "page": "v1",
      "readable": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "q",
      "facets",
      "readable",
      "language",
      "limit",
      "offset",
      "page"
    ],
    "queryArgs": [
      {
        "name": "facet",
        "wire": "facets"
      },
      {
        "name": "language",
        "wire": "language"
      },
      {
        "name": "limit",
        "wire": "limit"
      },
      {
        "name": "offset",
        "wire": "offset"
      },
      {
        "name": "page",
        "wire": "page"
      },
      {
        "name": "q",
        "wire": "q"
      },
      {
        "name": "readable",
        "wire": "readable"
      }
    ],
    "auth": [],
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "language",
    "accessor": "Language",
    "op": "list",
    "method": "GET",
    "path": "/languages.json",
    "args": [],
    "select": {
      "limit": 15,
      "sort": "count"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "sort",
      "limit"
    ],
    "queryArgs": [
      {
        "name": "limit",
        "wire": "limit"
      },
      {
        "name": "sort",
        "wire": "sort"
      }
    ],
    "auth": [],
    "status": 200,
    "sample": [
      {
        "name": "x",
        "key": "x",
        "marc_code": "x",
        "count": 1,
        "ebook_edition_count": 1
      }
    ],
    "idField": "id"
  },
  {
    "entity": "list",
    "accessor": "List",
    "op": "create",
    "method": "POST",
    "path": "/people/{username}/lists/{list_id}/delete.json",
    "action": "delete",
    "args": [
      {
        "name": "id",
        "wire": "list_id",
        "value": "p1"
      },
      {
        "name": "username",
        "wire": "username",
        "value": "p2"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "cookie",
          "name": "session"
        }
      ]
    ],
    "status": 200,
    "sample": {},
    "idField": "id"
  },
  {
    "entity": "list",
    "accessor": "List",
    "op": "create",
    "method": "POST",
    "path": "/people/{username}/lists/{olid}/seeds.json",
    "action": "seed",
    "args": [
      {
        "name": "id",
        "wire": "olid",
        "value": "p1"
      },
      {
        "name": "username",
        "wire": "username",
        "value": "p2"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "cookie",
          "name": "session"
        }
      ]
    ],
    "status": 200,
    "sample": {},
    "idField": "id"
  },
  {
    "entity": "list",
    "accessor": "List",
    "op": "create",
    "method": "POST",
    "path": "/people/{username}/series/{olid}/seeds.json",
    "args": [
      {
        "name": "series_id",
        "wire": "olid",
        "value": "p1"
      },
      {
        "name": "username",
        "wire": "username",
        "value": "p2"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "cookie",
          "name": "session"
        }
      ]
    ],
    "status": 200,
    "sample": {},
    "idField": "id"
  },
  {
    "entity": "list",
    "accessor": "List",
    "op": "create",
    "method": "POST",
    "path": "/lists/{list_id}/delete.json",
    "action": "delete",
    "args": [
      {
        "name": "id",
        "wire": "list_id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "cookie",
          "name": "session"
        }
      ]
    ],
    "status": 200,
    "sample": {},
    "idField": "id"
  },
  {
    "entity": "list",
    "accessor": "List",
    "op": "create",
    "method": "POST",
    "path": "/lists/{olid}/seeds.json",
    "action": "seed",
    "args": [
      {
        "name": "id",
        "wire": "olid",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "cookie",
          "name": "session"
        }
      ]
    ],
    "status": 200,
    "sample": {},
    "idField": "id"
  },
  {
    "entity": "list",
    "accessor": "List",
    "op": "create",
    "method": "POST",
    "path": "/series/{olid}/seeds.json",
    "args": [
      {
        "name": "series_id",
        "wire": "olid",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "cookie",
          "name": "session"
        }
      ]
    ],
    "status": 200,
    "sample": {},
    "idField": "id"
  },
  {
    "entity": "list",
    "accessor": "List",
    "op": "list",
    "method": "GET",
    "path": "/authors/OL{author_id}A/lists.json",
    "args": [
      {
        "name": "author_id",
        "wire": "author_id",
        "value": "p1"
      }
    ],
    "select": {
      "limit": 50,
      "offset": 0
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "offset",
      "limit"
    ],
    "queryArgs": [
      {
        "name": "limit",
        "wire": "limit"
      },
      {
        "name": "offset",
        "wire": "offset"
      }
    ],
    "auth": [],
    "status": 200,
    "sample": {
      "links": {
        "self": "x",
        "next": "x",
        "prev": "x"
      },
      "size": 1,
      "entries": [
        {
          "url": "x",
          "full_url": "x",
          "name": "x",
          "seed_count": 1,
          "last_update": "x"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "list",
    "accessor": "List",
    "op": "list",
    "method": "GET",
    "path": "/books/OL{edition_id}M/lists.json",
    "args": [
      {
        "name": "edition_id",
        "wire": "edition_id",
        "value": "p1"
      }
    ],
    "select": {
      "limit": 50,
      "offset": 0
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "offset",
      "limit"
    ],
    "queryArgs": [
      {
        "name": "limit",
        "wire": "limit"
      },
      {
        "name": "offset",
        "wire": "offset"
      }
    ],
    "auth": [],
    "status": 200,
    "sample": {
      "links": {
        "self": "x",
        "next": "x",
        "prev": "x"
      },
      "size": 1,
      "entries": [
        {
          "url": "x",
          "full_url": "x",
          "name": "x",
          "seed_count": 1,
          "last_update": "x"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "list",
    "accessor": "List",
    "op": "list",
    "method": "GET",
    "path": "/subjects/{subject_key}/lists.json",
    "args": [
      {
        "name": "subject_key",
        "wire": "subject_key",
        "value": "p1"
      }
    ],
    "select": {
      "limit": 50,
      "offset": 0
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "offset",
      "limit"
    ],
    "queryArgs": [
      {
        "name": "limit",
        "wire": "limit"
      },
      {
        "name": "offset",
        "wire": "offset"
      }
    ],
    "auth": [],
    "status": 200,
    "sample": {
      "links": {
        "self": "x",
        "next": "x",
        "prev": "x"
      },
      "size": 1,
      "entries": [
        {
          "url": "x",
          "full_url": "x",
          "name": "x",
          "seed_count": 1,
          "last_update": "x"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "list",
    "accessor": "List",
    "op": "list",
    "method": "GET",
    "path": "/people/{username}/lists.json",
    "args": [
      {
        "name": "username",
        "wire": "username",
        "value": "p1"
      }
    ],
    "select": {
      "limit": 50,
      "offset": 0
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "offset",
      "limit"
    ],
    "queryArgs": [
      {
        "name": "limit",
        "wire": "limit"
      },
      {
        "name": "offset",
        "wire": "offset"
      }
    ],
    "auth": [],
    "status": 200,
    "sample": {
      "links": {
        "self": "x",
        "next": "x",
        "prev": "x"
      },
      "size": 1,
      "entries": [
        {
          "url": "x",
          "full_url": "x",
          "name": "x",
          "seed_count": 1,
          "last_update": "x"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "list",
    "accessor": "List",
    "op": "list",
    "method": "GET",
    "path": "/works/OL{work_id}W/lists.json",
    "args": [
      {
        "name": "work_id",
        "wire": "work_id",
        "value": "p1"
      }
    ],
    "select": {
      "limit": 50,
      "offset": 0
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "offset",
      "limit"
    ],
    "queryArgs": [
      {
        "name": "limit",
        "wire": "limit"
      },
      {
        "name": "offset",
        "wire": "offset"
      }
    ],
    "auth": [],
    "status": 200,
    "sample": {
      "links": {
        "self": "x",
        "next": "x",
        "prev": "x"
      },
      "size": 1,
      "entries": [
        {
          "url": "x",
          "full_url": "x",
          "name": "x",
          "seed_count": 1,
          "last_update": "x"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "list",
    "accessor": "List",
    "op": "load",
    "method": "GET",
    "path": "/people/{username}/lists/{olid}/seeds.json",
    "action": "seed",
    "args": [
      {
        "name": "id",
        "wire": "olid",
        "value": "p1"
      },
      {
        "name": "username",
        "wire": "username",
        "value": "p2"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [],
    "status": 200,
    "sample": {},
    "idField": "id"
  },
  {
    "entity": "list",
    "accessor": "List",
    "op": "load",
    "method": "GET",
    "path": "/people/{username}/lists/{list_id}.json",
    "args": [
      {
        "name": "list_id",
        "wire": "list_id",
        "value": "p1"
      },
      {
        "name": "username",
        "wire": "username",
        "value": "p2"
      }
    ],
    "select": {
      "raw": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "_raw"
    ],
    "queryArgs": [
      {
        "name": "raw",
        "wire": "_raw"
      }
    ],
    "auth": [],
    "status": 200,
    "sample": {},
    "idField": "id"
  },
  {
    "entity": "list",
    "accessor": "List",
    "op": "load",
    "method": "GET",
    "path": "/people/{username}/series/{olid}/seeds.json",
    "args": [
      {
        "name": "series_id",
        "wire": "olid",
        "value": "p1"
      },
      {
        "name": "username",
        "wire": "username",
        "value": "p2"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [],
    "status": 200,
    "sample": {},
    "idField": "id"
  },
  {
    "entity": "list",
    "accessor": "List",
    "op": "load",
    "method": "GET",
    "path": "/lists/{olid}/seeds.json",
    "action": "seed",
    "args": [
      {
        "name": "id",
        "wire": "olid",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [],
    "status": 200,
    "sample": {},
    "idField": "id"
  },
  {
    "entity": "list",
    "accessor": "List",
    "op": "load",
    "method": "GET",
    "path": "/series/{olid}/seeds.json",
    "args": [
      {
        "name": "series_id",
        "wire": "olid",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [],
    "status": 200,
    "sample": {},
    "idField": "id"
  },
  {
    "entity": "list",
    "accessor": "List",
    "op": "load",
    "method": "GET",
    "path": "/search/lists.json",
    "args": [],
    "select": {
      "api": "",
      "field": "",
      "limit": 20,
      "offset": "v1",
      "page": "v1",
      "q": "",
      "sort": ""
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "limit",
      "offset",
      "page",
      "q",
      "fields",
      "sort",
      "api"
    ],
    "queryArgs": [
      {
        "name": "api",
        "wire": "api"
      },
      {
        "name": "field",
        "wire": "fields"
      },
      {
        "name": "limit",
        "wire": "limit"
      },
      {
        "name": "offset",
        "wire": "offset"
      },
      {
        "name": "page",
        "wire": "page"
      },
      {
        "name": "q",
        "wire": "q"
      },
      {
        "name": "sort",
        "wire": "sort"
      }
    ],
    "auth": [],
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "list_editions_model",
    "accessor": "ListEditionsModel",
    "op": "list",
    "method": "GET",
    "path": "/people/{username}/lists/{olid}/editions.json",
    "action": "editions.json",
    "args": [
      {
        "name": "id",
        "wire": "olid",
        "value": "p1"
      },
      {
        "name": "username",
        "wire": "username",
        "value": "p2"
      }
    ],
    "select": {
      "limit": 50,
      "offset": 0
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "limit",
      "offset"
    ],
    "queryArgs": [
      {
        "name": "limit",
        "wire": "limit"
      },
      {
        "name": "offset",
        "wire": "offset"
      }
    ],
    "auth": [],
    "status": 200,
    "sample": {
      "size": 1,
      "start": 1,
      "end": 1,
      "entries": [
        {}
      ],
      "links": {
        "self": "x",
        "next": "x",
        "prev": "x",
        "list": "x"
      }
    },
    "idField": "id"
  },
  {
    "entity": "list_editions_model",
    "accessor": "ListEditionsModel",
    "op": "list",
    "method": "GET",
    "path": "/lists/{olid}/editions.json",
    "action": "editions.json",
    "args": [
      {
        "name": "id",
        "wire": "olid",
        "value": "p1"
      }
    ],
    "select": {
      "limit": 50,
      "offset": 0
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "limit",
      "offset"
    ],
    "queryArgs": [
      {
        "name": "limit",
        "wire": "limit"
      },
      {
        "name": "offset",
        "wire": "offset"
      }
    ],
    "auth": [],
    "status": 200,
    "sample": {
      "size": 1,
      "start": 1,
      "end": 1,
      "entries": [
        {}
      ],
      "links": {
        "self": "x",
        "next": "x",
        "prev": "x",
        "list": "x"
      }
    },
    "idField": "id"
  },
  {
    "entity": "list_editions_model",
    "accessor": "ListEditionsModel",
    "op": "list",
    "method": "GET",
    "path": "/series/{olid}/editions.json",
    "args": [
      {
        "name": "series_id",
        "wire": "olid",
        "value": "p1"
      }
    ],
    "select": {
      "limit": 50,
      "offset": 0
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "limit",
      "offset"
    ],
    "queryArgs": [
      {
        "name": "limit",
        "wire": "limit"
      },
      {
        "name": "offset",
        "wire": "offset"
      }
    ],
    "auth": [],
    "status": 200,
    "sample": {
      "size": 1,
      "start": 1,
      "end": 1,
      "entries": [
        {}
      ],
      "links": {
        "self": "x",
        "next": "x",
        "prev": "x",
        "list": "x"
      }
    },
    "idField": "id"
  },
  {
    "entity": "list_subjects_model",
    "accessor": "ListSubjectsModel",
    "op": "list",
    "method": "GET",
    "path": "/people/{username}/lists/{olid}/subjects.json",
    "action": "subjects.json",
    "args": [
      {
        "name": "id",
        "wire": "olid",
        "value": "p1"
      },
      {
        "name": "username",
        "wire": "username",
        "value": "p2"
      }
    ],
    "select": {
      "limit": 20
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "limit"
    ],
    "queryArgs": [
      {
        "name": "limit",
        "wire": "limit"
      }
    ],
    "auth": [],
    "status": 200,
    "sample": {
      "subjects": [
        {
          "name": "x",
          "count": 1,
          "url": "x"
        }
      ],
      "places": [
        {
          "name": "x",
          "count": 1,
          "url": "x"
        }
      ],
      "people": [
        {
          "name": "x",
          "count": 1,
          "url": "x"
        }
      ],
      "times": [
        {
          "name": "x",
          "count": 1,
          "url": "x"
        }
      ],
      "links": {
        "self": "x",
        "list": "x"
      }
    },
    "idField": "id"
  },
  {
    "entity": "list_subjects_model",
    "accessor": "ListSubjectsModel",
    "op": "list",
    "method": "GET",
    "path": "/lists/{olid}/subjects.json",
    "action": "subjects.json",
    "args": [
      {
        "name": "id",
        "wire": "olid",
        "value": "p1"
      }
    ],
    "select": {
      "limit": 20
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "limit"
    ],
    "queryArgs": [
      {
        "name": "limit",
        "wire": "limit"
      }
    ],
    "auth": [],
    "status": 200,
    "sample": {
      "subjects": [
        {
          "name": "x",
          "count": 1,
          "url": "x"
        }
      ],
      "places": [
        {
          "name": "x",
          "count": 1,
          "url": "x"
        }
      ],
      "people": [
        {
          "name": "x",
          "count": 1,
          "url": "x"
        }
      ],
      "times": [
        {
          "name": "x",
          "count": 1,
          "url": "x"
        }
      ],
      "links": {
        "self": "x",
        "list": "x"
      }
    },
    "idField": "id"
  },
  {
    "entity": "list_subjects_model",
    "accessor": "ListSubjectsModel",
    "op": "list",
    "method": "GET",
    "path": "/series/{olid}/subjects.json",
    "args": [
      {
        "name": "series_id",
        "wire": "olid",
        "value": "p1"
      }
    ],
    "select": {
      "limit": 20
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "limit"
    ],
    "queryArgs": [
      {
        "name": "limit",
        "wire": "limit"
      }
    ],
    "auth": [],
    "status": 200,
    "sample": {
      "subjects": [
        {
          "name": "x",
          "count": 1,
          "url": "x"
        }
      ],
      "places": [
        {
          "name": "x",
          "count": 1,
          "url": "x"
        }
      ],
      "people": [
        {
          "name": "x",
          "count": 1,
          "url": "x"
        }
      ],
      "times": [
        {
          "name": "x",
          "count": 1,
          "url": "x"
        }
      ],
      "links": {
        "self": "x",
        "list": "x"
      }
    },
    "idField": "id"
  },
  {
    "entity": "login",
    "accessor": "Login",
    "op": "create",
    "method": "POST",
    "path": "/account/login",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [],
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "logout",
    "accessor": "Logout",
    "op": "create",
    "method": "POST",
    "path": "/account/logout",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [],
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "merge",
    "accessor": "Merge",
    "op": "create",
    "method": "POST",
    "path": "/authors/merge.json",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "cookie",
          "name": "session"
        }
      ]
    ],
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "reading_goal",
    "accessor": "ReadingGoal",
    "op": "create",
    "method": "POST",
    "path": "/reading-goal.json",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "cookie",
          "name": "session"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "status": "x"
    },
    "idField": "id"
  },
  {
    "entity": "reading_goal",
    "accessor": "ReadingGoal",
    "op": "list",
    "method": "GET",
    "path": "/reading-goal.json",
    "args": [],
    "select": {
      "year": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "year"
    ],
    "queryArgs": [
      {
        "name": "year",
        "wire": "year"
      }
    ],
    "auth": [
      [
        {
          "in": "cookie",
          "name": "session"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "status": "x",
      "goal": [
        {
          "year": 1,
          "goal": 1
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "reading_log",
    "accessor": "ReadingLog",
    "op": "list",
    "method": "GET",
    "path": "/people/{username}/books/{key}.json",
    "args": [
      {
        "name": "key",
        "wire": "key",
        "value": "p1"
      },
      {
        "name": "username",
        "wire": "username",
        "value": "p2"
      }
    ],
    "select": {
      "limit": 100,
      "mode": "everything",
      "offset": "v1",
      "page": "v1",
      "q": ""
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "q",
      "mode",
      "limit",
      "offset",
      "page"
    ],
    "queryArgs": [
      {
        "name": "limit",
        "wire": "limit"
      },
      {
        "name": "mode",
        "wire": "mode"
      },
      {
        "name": "offset",
        "wire": "offset"
      },
      {
        "name": "page",
        "wire": "page"
      },
      {
        "name": "q",
        "wire": "q"
      }
    ],
    "auth": [
      [
        {
          "in": "cookie",
          "name": "session"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "page": 1,
      "numFound": 1,
      "reading_log_entries": [
        {
          "work": {
            "title": "x",
            "key": "x",
            "author_keys": [
              "x"
            ],
            "author_names": [
              "x"
            ],
            "first_publish_year": 1,
            "lending_edition_s": "x",
            "edition_key": [
              "x"
            ],
            "cover_id": 1,
            "cover_edition_key": "x"
          },
          "logged_edition": "x",
          "logged_date": "x"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "req",
    "accessor": "Req",
    "op": "load",
    "method": "GET",
    "path": "/api/volumes/{brief_or_full}/json/{req}.json",
    "args": [
      {
        "name": "req",
        "wire": "req",
        "value": "p1"
      },
      {
        "name": "volume_id",
        "wire": "brief_or_full",
        "value": "p2"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [],
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "search",
    "accessor": "Search",
    "op": "list",
    "method": "GET",
    "path": "/search.json",
    "args": [],
    "select": {
      "author": "v1",
      "author_facet": "v1",
      "author_key": "v1",
      "contributor": "v1",
      "field": "v1",
      "first_publish_year": "v1",
      "has_fulltext": "v1",
      "isbn": "v1",
      "language": "v1",
      "lccn": "v1",
      "limit": 100,
      "oclc": "v1",
      "offset": "v1",
      "page": "v1",
      "person": "v1",
      "person_facet": "v1",
      "place": "v1",
      "place_facet": "v1",
      "print_disabled": "v1",
      "public_scan": "v1",
      "public_scan_b": "v1",
      "publisher": "v1",
      "publisher_facet": "v1",
      "q": "",
      "query": "v1",
      "sort": "v1",
      "spellcheck_count": 3,
      "subject": "v1",
      "subject_facet": "v1",
      "time": "v1",
      "time_facet": "v1",
      "title": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "limit",
      "offset",
      "page",
      "q",
      "title",
      "publisher",
      "oclc",
      "lccn",
      "contributor",
      "subject",
      "place",
      "person",
      "time",
      "has_fulltext",
      "public_scan_b",
      "public_scan",
      "print_disabled",
      "author_key",
      "subject_facet",
      "person_facet",
      "place_facet",
      "time_facet",
      "first_publish_year",
      "publisher_facet",
      "language",
      "author_facet",
      "isbn",
      "author",
      "fields",
      "query",
      "sort",
      "spellcheck_count"
    ],
    "queryArgs": [
      {
        "name": "author",
        "wire": "author"
      },
      {
        "name": "author_facet",
        "wire": "author_facet"
      },
      {
        "name": "author_key",
        "wire": "author_key"
      },
      {
        "name": "contributor",
        "wire": "contributor"
      },
      {
        "name": "field",
        "wire": "fields"
      },
      {
        "name": "first_publish_year",
        "wire": "first_publish_year"
      },
      {
        "name": "has_fulltext",
        "wire": "has_fulltext"
      },
      {
        "name": "isbn",
        "wire": "isbn"
      },
      {
        "name": "language",
        "wire": "language"
      },
      {
        "name": "lccn",
        "wire": "lccn"
      },
      {
        "name": "limit",
        "wire": "limit"
      },
      {
        "name": "oclc",
        "wire": "oclc"
      },
      {
        "name": "offset",
        "wire": "offset"
      },
      {
        "name": "page",
        "wire": "page"
      },
      {
        "name": "person",
        "wire": "person"
      },
      {
        "name": "person_facet",
        "wire": "person_facet"
      },
      {
        "name": "place",
        "wire": "place"
      },
      {
        "name": "place_facet",
        "wire": "place_facet"
      },
      {
        "name": "print_disabled",
        "wire": "print_disabled"
      },
      {
        "name": "public_scan",
        "wire": "public_scan"
      },
      {
        "name": "public_scan_b",
        "wire": "public_scan_b"
      },
      {
        "name": "publisher",
        "wire": "publisher"
      },
      {
        "name": "publisher_facet",
        "wire": "publisher_facet"
      },
      {
        "name": "q",
        "wire": "q"
      },
      {
        "name": "query",
        "wire": "query"
      },
      {
        "name": "sort",
        "wire": "sort"
      },
      {
        "name": "spellcheck_count",
        "wire": "spellcheck_count"
      },
      {
        "name": "subject",
        "wire": "subject"
      },
      {
        "name": "subject_facet",
        "wire": "subject_facet"
      },
      {
        "name": "time",
        "wire": "time"
      },
      {
        "name": "time_facet",
        "wire": "time_facet"
      },
      {
        "name": "title",
        "wire": "title"
      }
    ],
    "auth": [],
    "status": 200,
    "sample": {
      "numFound": 1,
      "start": 1,
      "numFoundExact": true,
      "num_found": 1,
      "documentation_url": "x",
      "q": "x",
      "offset": 1,
      "docs": [
        {}
      ]
    },
    "idField": "id"
  },
  {
    "entity": "search",
    "accessor": "Search",
    "op": "load",
    "method": "GET",
    "path": "/search/editions.json",
    "action": "edition",
    "args": [],
    "select": {
      "field": "v1",
      "limit": 100,
      "offset": "v1",
      "page": "v1",
      "q": "",
      "sort": "",
      "work_key": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "limit",
      "offset",
      "page",
      "q",
      "work_key",
      "fields",
      "sort"
    ],
    "queryArgs": [
      {
        "name": "field",
        "wire": "fields"
      },
      {
        "name": "limit",
        "wire": "limit"
      },
      {
        "name": "offset",
        "wire": "offset"
      },
      {
        "name": "page",
        "wire": "page"
      },
      {
        "name": "q",
        "wire": "q"
      },
      {
        "name": "sort",
        "wire": "sort"
      },
      {
        "name": "work_key",
        "wire": "work_key"
      }
    ],
    "auth": [],
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "subject",
    "accessor": "Subject",
    "op": "load",
    "method": "GET",
    "path": "/search/subjects.json",
    "args": [],
    "select": {
      "limit": 100,
      "offset": "v1",
      "page": "v1",
      "q": ""
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "q",
      "limit",
      "offset",
      "page"
    ],
    "queryArgs": [
      {
        "name": "limit",
        "wire": "limit"
      },
      {
        "name": "offset",
        "wire": "offset"
      },
      {
        "name": "page",
        "wire": "page"
      },
      {
        "name": "q",
        "wire": "q"
      }
    ],
    "auth": [],
    "status": 200,
    "sample": null,
    "idField": "id"
  }
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
