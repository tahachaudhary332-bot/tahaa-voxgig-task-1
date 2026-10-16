"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const TestFeature_1 = require("./feature/test/TestFeature");
const FEATURE_CLASS = {
    test: TestFeature_1.TestFeature,
};
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'OpenLibrarySdk',
        slug: "open-library-sdk",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        test: {
            "options": {
                "active": false
            },
            "optspec": {
                "entity": "`$MAP`",
                "net": "`$MAP`"
            },
            "strict": false,
            "transport": "base"
        },
    };
    options = {
        base: "{base}",
        server: {
            "base": "",
        },
        auth: {
            prefix: '',
            in: 'cookie',
            name: 'session',
        },
        headers: {
            "content-type": "application/json"
        },
        entity: {
            account_loan: {},
            account_loan_history: {},
            archiveorg: {},
            author: {},
            book: {},
            borrow: {},
            check_in: {},
            create_list: {},
            feed: {},
            graphite: {},
            health: {},
            ian: {},
            idval: {},
            import: {},
            inside: {},
            key: {},
            language: {},
            list: {},
            list_editions_model: {},
            list_subjects_model: {},
            login: {},
            logout: {},
            merge: {},
            reading_goal: {},
            reading_log: {},
            req: {},
            search: {},
            subject: {},
        }
    };
    entity = {
        "account_loan": {
            "fields": [
                {
                    "name": "loans",
                    "title": "Loans",
                    "type": "`$ARRAY`",
                    "req": true,
                    "short": "List of the user's current loans, each containing ocaid, book, resource_type, expiry, etc."
                }
            ],
            "name": "account_loan",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/account/loans.json",
                            "segments": [
                                {
                                    "lit": "account"
                                },
                                {
                                    "lit": "loans.json"
                                }
                            ],
                            "parts": [
                                "account",
                                "loans.json"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.loans`"
                            },
                            "args": {},
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "account_loan_history": {
            "fields": [],
            "name": "account_loan_history",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/account/loan-history.json",
                            "segments": [
                                {
                                    "lit": "account"
                                },
                                {
                                    "lit": "loan-history.json"
                                }
                            ],
                            "parts": [
                                "account",
                                "loan-history.json"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.loans_history`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "page",
                                        "orig": "page",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 1
                                    }
                                ]
                            },
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "archiveorg": {
            "fields": [
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "archiveorg",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/cdn/archive.org/{filename}",
                            "segments": [
                                {
                                    "lit": "cdn"
                                },
                                {
                                    "lit": "archive.org"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "cdn",
                                "archive.org",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "filename": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "filename",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "author": {
            "fields": [],
            "name": "author",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/search/authors.json",
                            "segments": [
                                {
                                    "lit": "search"
                                },
                                {
                                    "lit": "authors.json"
                                }
                            ],
                            "parts": [
                                "search",
                                "authors.json"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "field",
                                        "orig": "fields",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "*"
                                    },
                                    {
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 100
                                    },
                                    {
                                        "name": "offset",
                                        "orig": "offset",
                                        "type": "`$INTEGER`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "page",
                                        "orig": "page",
                                        "type": "`$INTEGER`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "q",
                                        "orig": "q",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": ""
                                    },
                                    {
                                        "name": "sort",
                                        "orig": "sort",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": ""
                                    }
                                ]
                            },
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "book": {
            "fields": [],
            "name": "book",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/api/books.json",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "books.json"
                                }
                            ],
                            "parts": [
                                "api",
                                "books.json"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "bibkey",
                                        "orig": "bibkeys",
                                        "type": "`$ARRAY`",
                                        "kind": "query",
                                        "reqd": true
                                    },
                                    {
                                        "name": "callback",
                                        "orig": "callback",
                                        "type": "`$ANY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "detail",
                                        "orig": "details",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "false"
                                    },
                                    {
                                        "name": "format",
                                        "orig": "format",
                                        "type": "`$ANY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "high_priority",
                                        "orig": "high_priority",
                                        "type": "`$BOOLEAN`",
                                        "kind": "query",
                                        "example": false
                                    },
                                    {
                                        "name": "jscmd",
                                        "orig": "jscmd",
                                        "type": "`$ANY`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "bibkey"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "borrow": {
            "fields": [],
            "name": "borrow",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/books/{olid}/{slug}/borrow",
                            "segments": [
                                {
                                    "lit": "books"
                                },
                                {
                                    "var": "book_id"
                                },
                                {
                                    "var": "slug"
                                },
                                {
                                    "lit": "borrow"
                                }
                            ],
                            "parts": [
                                "books",
                                "{book_id}",
                                "{slug}",
                                "borrow"
                            ],
                            "rename": {
                                "param": {
                                    "olid": "book_id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "book_id",
                                        "orig": "olid",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "slug",
                                        "orig": "slug",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "book_id",
                                    "slug"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/books/{olid}/{slug}/borrow",
                            "segments": [
                                {
                                    "lit": "books"
                                },
                                {
                                    "var": "book_id"
                                },
                                {
                                    "var": "slug"
                                },
                                {
                                    "lit": "borrow"
                                }
                            ],
                            "parts": [
                                "books",
                                "{book_id}",
                                "{slug}",
                                "borrow"
                            ],
                            "rename": {
                                "param": {
                                    "olid": "book_id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "book_id",
                                        "orig": "olid",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "slug",
                                        "orig": "slug",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "book_id",
                                    "slug"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": [
                    [
                        "$.main.kit.entity.book"
                    ]
                ]
            }
        },
        "check_in": {
            "fields": [
                {
                    "name": "day",
                    "title": "Day",
                    "type": "`$ANY`",
                    "short": "Day (1-31)"
                },
                {
                    "name": "edition_key",
                    "title": "Edition Key",
                    "type": "`$ANY`",
                    "short": "Edition OLID (e.g."
                },
                {
                    "name": "event_id",
                    "title": "Event Id",
                    "type": "`$STRING`"
                },
                {
                    "name": "event_type",
                    "title": "Event Type",
                    "type": "`$INTEGER`",
                    "req": true,
                    "short": "Event type enum value (1=start, 2=update, 3=finish)"
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$INTEGER`",
                    "req": true
                },
                {
                    "name": "month",
                    "title": "Month",
                    "type": "`$ANY`",
                    "short": "Month (1-12)"
                },
                {
                    "name": "status",
                    "title": "Status",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "year",
                    "title": "Year",
                    "type": "`$INTEGER`",
                    "req": true,
                    "short": "Four-digit year (1-9999)"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "check_in",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/works/OL{work_id}W/check-ins",
                            "segments": [
                                {
                                    "lit": "works"
                                },
                                {
                                    "lit": "OL{work_id}W"
                                },
                                {
                                    "lit": "check-ins"
                                }
                            ],
                            "parts": [
                                "works",
                                "OL{work_id}W",
                                "check-ins"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "work_id",
                                        "orig": "work_id",
                                        "type": "`$INTEGER`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "work_id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/works/OL{work_id}W/check-ins.json",
                            "segments": [
                                {
                                    "lit": "works"
                                },
                                {
                                    "lit": "OL{work_id}W"
                                },
                                {
                                    "lit": "check-ins.json"
                                }
                            ],
                            "parts": [
                                "works",
                                "OL{work_id}W",
                                "check-ins.json"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "work_id",
                                        "orig": "work_id",
                                        "type": "`$INTEGER`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "work_id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "remove": {
                    "input": "data",
                    "name": "remove",
                    "points": [
                        {
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/check-ins/{check_in_id}",
                            "segments": [
                                {
                                    "lit": "check-ins"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "check-ins",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "check_in_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "check_in_id",
                                        "type": "`$INTEGER`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "create_list": {
            "fields": [
                {
                    "name": "description",
                    "title": "Description",
                    "type": "`$STRING`"
                },
                {
                    "name": "key",
                    "title": "Key",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "name",
                    "title": "Name",
                    "type": "`$STRING`"
                },
                {
                    "name": "revision",
                    "title": "Revision",
                    "type": "`$INTEGER`",
                    "req": true
                },
                {
                    "name": "seeds",
                    "title": "Seeds",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "tags",
                    "title": "Tags",
                    "type": "`$ARRAY`"
                }
            ],
            "name": "create_list",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/people/{username}/lists.json",
                            "segments": [
                                {
                                    "lit": "people"
                                },
                                {
                                    "var": "username"
                                },
                                {
                                    "lit": "lists.json"
                                }
                            ],
                            "parts": [
                                "people",
                                "{username}",
                                "lists.json"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "username",
                                        "orig": "username",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "username"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "feed": {
            "fields": [
                {
                    "name": "action",
                    "title": "Action",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "authors",
                    "title": "Authors",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "comment",
                    "title": "Comment",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "cover_url",
                    "title": "Cover Url",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "editor",
                    "title": "Editor",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "editor_key",
                    "title": "Editor Key",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "key",
                    "title": "Key",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "kind",
                    "title": "Kind",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "timestamp",
                    "title": "Timestamp",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "title",
                    "title": "Title",
                    "type": "`$STRING`",
                    "req": true
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "feed",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/tasks/feed.json",
                            "segments": [
                                {
                                    "lit": "tasks"
                                },
                                {
                                    "lit": "feed.json"
                                }
                            ],
                            "parts": [
                                "tasks",
                                "feed.json"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.rows`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 20
                                    },
                                    {
                                        "name": "offset",
                                        "orig": "offset",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 0
                                    }
                                ]
                            },
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "graphite": {
            "fields": [
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "graphite",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/cdn/graphite/{name}",
                            "segments": [
                                {
                                    "lit": "cdn"
                                },
                                {
                                    "lit": "graphite"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "cdn",
                                "graphite",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "name": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "name",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "health": {
            "fields": [],
            "name": "health",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/health",
                            "segments": [
                                {
                                    "lit": "health"
                                }
                            ],
                            "parts": [
                                "health"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "ian": {
            "fields": [],
            "name": "ian",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/borrow/ia/{ocaid}",
                            "segments": [
                                {
                                    "lit": "borrow"
                                },
                                {
                                    "lit": "ia"
                                },
                                {
                                    "var": "ocaid"
                                }
                            ],
                            "parts": [
                                "borrow",
                                "ia",
                                "{ocaid}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "ocaid",
                                        "orig": "ocaid",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "ocaid"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/borrow/ia/{ocaid}",
                            "segments": [
                                {
                                    "lit": "borrow"
                                },
                                {
                                    "lit": "ia"
                                },
                                {
                                    "var": "ocaid"
                                }
                            ],
                            "parts": [
                                "borrow",
                                "ia",
                                "{ocaid}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "ocaid",
                                        "orig": "ocaid",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "ocaid"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "idval": {
            "fields": [],
            "name": "idval",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/api/volumes/{brief_or_full}/{idtype}/{idval}.json",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "volumes"
                                },
                                {
                                    "var": "volume_id"
                                },
                                {
                                    "var": "idtype"
                                },
                                {
                                    "lit": "{idval}.json"
                                }
                            ],
                            "parts": [
                                "api",
                                "volumes",
                                "{volume_id}",
                                "{idtype}",
                                "{idval}.json"
                            ],
                            "rename": {
                                "param": {
                                    "brief_or_full": "volume_id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "idtype",
                                        "orig": "idtype",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "idval",
                                        "orig": "idval",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "volume_id",
                                        "orig": "brief_or_full",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "show_all_item",
                                        "orig": "show_all_items",
                                        "type": "`$BOOLEAN`",
                                        "kind": "query",
                                        "example": false
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "idtype",
                                    "idval",
                                    "volume_id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "import": {
            "fields": [],
            "name": "import",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/import/preview.json",
                            "segments": [
                                {
                                    "lit": "import"
                                },
                                {
                                    "lit": "preview.json"
                                }
                            ],
                            "parts": [
                                "import",
                                "preview.json"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {
                                "$action": "preview"
                            },
                            "body": {
                                "fields": [
                                    {
                                        "name": "identifier"
                                    },
                                    {
                                        "name": "provider"
                                    },
                                    {
                                        "name": "save"
                                    },
                                    {
                                        "name": "source"
                                    }
                                ],
                                "kind": "form",
                                "media": "application/x-www-form-urlencoded"
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/import/preview.json",
                            "segments": [
                                {
                                    "lit": "import"
                                },
                                {
                                    "lit": "preview.json"
                                }
                            ],
                            "parts": [
                                "import",
                                "preview.json"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "identifier",
                                        "orig": "identifier",
                                        "type": "`$ANY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "provider",
                                        "orig": "provider",
                                        "type": "`$ANY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "source",
                                        "orig": "source",
                                        "type": "`$ANY`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "$action": "preview"
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "inside": {
            "fields": [],
            "name": "inside",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/search/inside.json",
                            "segments": [
                                {
                                    "lit": "search"
                                },
                                {
                                    "lit": "inside.json"
                                }
                            ],
                            "parts": [
                                "search",
                                "inside.json"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "facet",
                                        "orig": "facets",
                                        "type": "`$BOOLEAN`",
                                        "kind": "query",
                                        "example": true
                                    },
                                    {
                                        "name": "language",
                                        "orig": "language",
                                        "type": "`$ANY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 20
                                    },
                                    {
                                        "name": "offset",
                                        "orig": "offset",
                                        "type": "`$INTEGER`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "page",
                                        "orig": "page",
                                        "type": "`$INTEGER`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "q",
                                        "orig": "q",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true
                                    },
                                    {
                                        "name": "readable",
                                        "orig": "readable",
                                        "type": "`$BOOLEAN`",
                                        "kind": "query",
                                        "example": false
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "q"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "key": {
            "fields": [],
            "name": "key",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/publishers/{key}.json",
                            "segments": [
                                {
                                    "lit": "publishers"
                                },
                                {
                                    "lit": "{key}.json"
                                }
                            ],
                            "parts": [
                                "publishers",
                                "{key}.json"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "key",
                                        "orig": "key",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "detail",
                                        "orig": "details",
                                        "type": "`$BOOLEAN`",
                                        "kind": "query",
                                        "example": false
                                    },
                                    {
                                        "name": "has_fulltext",
                                        "orig": "has_fulltext",
                                        "type": "`$BOOLEAN`",
                                        "kind": "query",
                                        "example": false
                                    },
                                    {
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 12
                                    },
                                    {
                                        "name": "offset",
                                        "orig": "offset",
                                        "type": "`$INTEGER`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "page",
                                        "orig": "page",
                                        "type": "`$INTEGER`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "published_in",
                                        "orig": "published_in",
                                        "type": "`$ANY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "sort",
                                        "orig": "sort",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "editions"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "key"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/subjects/{key}.json",
                            "segments": [
                                {
                                    "lit": "subjects"
                                },
                                {
                                    "lit": "{key}.json"
                                }
                            ],
                            "parts": [
                                "subjects",
                                "{key}.json"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "key",
                                        "orig": "key",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "detail",
                                        "orig": "details",
                                        "type": "`$BOOLEAN`",
                                        "kind": "query",
                                        "example": false
                                    },
                                    {
                                        "name": "has_fulltext",
                                        "orig": "has_fulltext",
                                        "type": "`$BOOLEAN`",
                                        "kind": "query",
                                        "example": false
                                    },
                                    {
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 12
                                    },
                                    {
                                        "name": "offset",
                                        "orig": "offset",
                                        "type": "`$INTEGER`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "page",
                                        "orig": "page",
                                        "type": "`$INTEGER`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "published_in",
                                        "orig": "published_in",
                                        "type": "`$ANY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "sort",
                                        "orig": "sort",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "editions"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "key"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "language": {
            "fields": [
                {
                    "name": "count",
                    "title": "Count",
                    "type": "`$INTEGER`",
                    "req": true
                },
                {
                    "name": "ebook_edition_count",
                    "title": "Ebook Edition Count",
                    "type": "`$INTEGER`",
                    "req": true
                },
                {
                    "name": "key",
                    "title": "Key",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "marc_code",
                    "title": "Marc Code",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "name",
                    "title": "Name",
                    "type": "`$STRING`",
                    "req": true
                }
            ],
            "name": "language",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/languages.json",
                            "segments": [
                                {
                                    "lit": "languages.json"
                                }
                            ],
                            "parts": [
                                "languages.json"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 15
                                    },
                                    {
                                        "name": "sort",
                                        "orig": "sort",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "count"
                                    }
                                ]
                            },
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "list": {
            "fields": [
                {
                    "name": "full_url",
                    "title": "Full Url",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`"
                },
                {
                    "name": "last_update",
                    "title": "Last Update",
                    "type": "`$ANY`"
                },
                {
                    "name": "name",
                    "title": "Name",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "seed_count",
                    "title": "Seed Count",
                    "type": "`$INTEGER`",
                    "req": true
                },
                {
                    "name": "url",
                    "title": "Url",
                    "type": "`$STRING`",
                    "req": true
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "list",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/people/{username}/lists/{list_id}/delete.json",
                            "segments": [
                                {
                                    "lit": "people"
                                },
                                {
                                    "var": "username"
                                },
                                {
                                    "lit": "lists"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "delete.json"
                                }
                            ],
                            "parts": [
                                "people",
                                "{username}",
                                "lists",
                                "{id}",
                                "delete.json"
                            ],
                            "rename": {
                                "param": {
                                    "list_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "list_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "username",
                                        "orig": "username",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "delete",
                                "exist": [
                                    "id",
                                    "username"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/people/{username}/lists/{olid}/seeds.json",
                            "segments": [
                                {
                                    "lit": "people"
                                },
                                {
                                    "var": "username"
                                },
                                {
                                    "lit": "lists"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "seeds.json"
                                }
                            ],
                            "parts": [
                                "people",
                                "{username}",
                                "lists",
                                "{id}",
                                "seeds.json"
                            ],
                            "rename": {
                                "param": {
                                    "olid": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "olid",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "username",
                                        "orig": "username",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "seed",
                                "exist": [
                                    "id",
                                    "username"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/people/{username}/series/{olid}/seeds.json",
                            "segments": [
                                {
                                    "lit": "people"
                                },
                                {
                                    "var": "username"
                                },
                                {
                                    "lit": "series"
                                },
                                {
                                    "var": "series_id"
                                },
                                {
                                    "lit": "seeds.json"
                                }
                            ],
                            "parts": [
                                "people",
                                "{username}",
                                "series",
                                "{series_id}",
                                "seeds.json"
                            ],
                            "rename": {
                                "param": {
                                    "olid": "series_id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "series_id",
                                        "orig": "olid",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "username",
                                        "orig": "username",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "series_id",
                                    "username"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/lists/{list_id}/delete.json",
                            "segments": [
                                {
                                    "lit": "lists"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "delete.json"
                                }
                            ],
                            "parts": [
                                "lists",
                                "{id}",
                                "delete.json"
                            ],
                            "rename": {
                                "param": {
                                    "list_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "list_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "delete",
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/lists/{olid}/seeds.json",
                            "segments": [
                                {
                                    "lit": "lists"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "seeds.json"
                                }
                            ],
                            "parts": [
                                "lists",
                                "{id}",
                                "seeds.json"
                            ],
                            "rename": {
                                "param": {
                                    "olid": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "olid",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "seed",
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/series/{olid}/seeds.json",
                            "segments": [
                                {
                                    "lit": "series"
                                },
                                {
                                    "var": "series_id"
                                },
                                {
                                    "lit": "seeds.json"
                                }
                            ],
                            "parts": [
                                "series",
                                "{series_id}",
                                "seeds.json"
                            ],
                            "rename": {
                                "param": {
                                    "olid": "series_id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "series_id",
                                        "orig": "olid",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "series_id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/authors/OL{author_id}A/lists.json",
                            "segments": [
                                {
                                    "lit": "authors"
                                },
                                {
                                    "lit": "OL{author_id}A"
                                },
                                {
                                    "lit": "lists.json"
                                }
                            ],
                            "parts": [
                                "authors",
                                "OL{author_id}A",
                                "lists.json"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.entries`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "author_id",
                                        "orig": "author_id",
                                        "type": "`$INTEGER`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 50
                                    },
                                    {
                                        "name": "offset",
                                        "orig": "offset",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 0
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "author_id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/books/OL{edition_id}M/lists.json",
                            "segments": [
                                {
                                    "lit": "books"
                                },
                                {
                                    "lit": "OL{edition_id}M"
                                },
                                {
                                    "lit": "lists.json"
                                }
                            ],
                            "parts": [
                                "books",
                                "OL{edition_id}M",
                                "lists.json"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.entries`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "edition_id",
                                        "orig": "edition_id",
                                        "type": "`$INTEGER`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 50
                                    },
                                    {
                                        "name": "offset",
                                        "orig": "offset",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 0
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "edition_id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/subjects/{subject_key}/lists.json",
                            "segments": [
                                {
                                    "lit": "subjects"
                                },
                                {
                                    "var": "subject_key"
                                },
                                {
                                    "lit": "lists.json"
                                }
                            ],
                            "parts": [
                                "subjects",
                                "{subject_key}",
                                "lists.json"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.entries`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "subject_key",
                                        "orig": "subject_key",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 50
                                    },
                                    {
                                        "name": "offset",
                                        "orig": "offset",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 0
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "subject_key"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/people/{username}/lists.json",
                            "segments": [
                                {
                                    "lit": "people"
                                },
                                {
                                    "var": "username"
                                },
                                {
                                    "lit": "lists.json"
                                }
                            ],
                            "parts": [
                                "people",
                                "{username}",
                                "lists.json"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.entries`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "username",
                                        "orig": "username",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 50
                                    },
                                    {
                                        "name": "offset",
                                        "orig": "offset",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 0
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "username"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/works/OL{work_id}W/lists.json",
                            "segments": [
                                {
                                    "lit": "works"
                                },
                                {
                                    "lit": "OL{work_id}W"
                                },
                                {
                                    "lit": "lists.json"
                                }
                            ],
                            "parts": [
                                "works",
                                "OL{work_id}W",
                                "lists.json"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.entries`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "work_id",
                                        "orig": "work_id",
                                        "type": "`$INTEGER`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 50
                                    },
                                    {
                                        "name": "offset",
                                        "orig": "offset",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 0
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "work_id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/people/{username}/lists/{olid}/seeds.json",
                            "segments": [
                                {
                                    "lit": "people"
                                },
                                {
                                    "var": "username"
                                },
                                {
                                    "lit": "lists"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "seeds.json"
                                }
                            ],
                            "parts": [
                                "people",
                                "{username}",
                                "lists",
                                "{id}",
                                "seeds.json"
                            ],
                            "rename": {
                                "param": {
                                    "olid": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "olid",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "username",
                                        "orig": "username",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "seed",
                                "exist": [
                                    "id",
                                    "username"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/people/{username}/lists/{list_id}.json",
                            "segments": [
                                {
                                    "lit": "people"
                                },
                                {
                                    "var": "username"
                                },
                                {
                                    "lit": "lists"
                                },
                                {
                                    "lit": "{list_id}.json"
                                }
                            ],
                            "parts": [
                                "people",
                                "{username}",
                                "lists",
                                "{list_id}.json"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "list_id",
                                        "orig": "list_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "username",
                                        "orig": "username",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "raw",
                                        "orig": "_raw",
                                        "type": "`$BOOLEAN`",
                                        "kind": "query",
                                        "example": false
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "list_id",
                                    "username"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/people/{username}/series/{olid}/seeds.json",
                            "segments": [
                                {
                                    "lit": "people"
                                },
                                {
                                    "var": "username"
                                },
                                {
                                    "lit": "series"
                                },
                                {
                                    "var": "series_id"
                                },
                                {
                                    "lit": "seeds.json"
                                }
                            ],
                            "parts": [
                                "people",
                                "{username}",
                                "series",
                                "{series_id}",
                                "seeds.json"
                            ],
                            "rename": {
                                "param": {
                                    "olid": "series_id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "series_id",
                                        "orig": "olid",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "username",
                                        "orig": "username",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "series_id",
                                    "username"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/lists/{olid}/seeds.json",
                            "segments": [
                                {
                                    "lit": "lists"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "seeds.json"
                                }
                            ],
                            "parts": [
                                "lists",
                                "{id}",
                                "seeds.json"
                            ],
                            "rename": {
                                "param": {
                                    "olid": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "olid",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "seed",
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/lists/{list_id}.json",
                            "segments": [
                                {
                                    "lit": "lists"
                                },
                                {
                                    "lit": "{list_id}.json"
                                }
                            ],
                            "parts": [
                                "lists",
                                "{list_id}.json"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "list_id",
                                        "orig": "list_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "raw",
                                        "orig": "_raw",
                                        "type": "`$BOOLEAN`",
                                        "kind": "query",
                                        "example": false
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "list_id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/series/{list_id}.json",
                            "segments": [
                                {
                                    "lit": "series"
                                },
                                {
                                    "lit": "{list_id}.json"
                                }
                            ],
                            "parts": [
                                "series",
                                "{list_id}.json"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "list_id",
                                        "orig": "list_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "raw",
                                        "orig": "_raw",
                                        "type": "`$BOOLEAN`",
                                        "kind": "query",
                                        "example": false
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "list_id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/series/{olid}/seeds.json",
                            "segments": [
                                {
                                    "lit": "series"
                                },
                                {
                                    "var": "series_id"
                                },
                                {
                                    "lit": "seeds.json"
                                }
                            ],
                            "parts": [
                                "series",
                                "{series_id}",
                                "seeds.json"
                            ],
                            "rename": {
                                "param": {
                                    "olid": "series_id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "series_id",
                                        "orig": "olid",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "series_id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/search/lists.json",
                            "segments": [
                                {
                                    "lit": "search"
                                },
                                {
                                    "lit": "lists.json"
                                }
                            ],
                            "parts": [
                                "search",
                                "lists.json"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "api",
                                        "orig": "api",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": ""
                                    },
                                    {
                                        "name": "field",
                                        "orig": "fields",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": ""
                                    },
                                    {
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 20
                                    },
                                    {
                                        "name": "offset",
                                        "orig": "offset",
                                        "type": "`$INTEGER`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "page",
                                        "orig": "page",
                                        "type": "`$INTEGER`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "q",
                                        "orig": "q",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": ""
                                    },
                                    {
                                        "name": "sort",
                                        "orig": "sort",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": ""
                                    }
                                ]
                            },
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": [
                    [
                        "$.main.kit.entity.subject"
                    ]
                ]
            }
        },
        "list_editions_model": {
            "fields": [
                {
                    "name": "end",
                    "title": "End",
                    "type": "`$INTEGER`",
                    "req": true
                },
                {
                    "name": "entries",
                    "title": "Entries",
                    "type": "`$ARRAY`",
                    "req": true
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`"
                },
                {
                    "name": "links",
                    "title": "Links",
                    "type": "`$OBJECT`",
                    "req": true
                },
                {
                    "name": "size",
                    "title": "Size",
                    "type": "`$INTEGER`",
                    "req": true
                },
                {
                    "name": "start",
                    "title": "Start",
                    "type": "`$INTEGER`",
                    "req": true
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "list_editions_model",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/people/{username}/lists/{olid}/editions.json",
                            "segments": [
                                {
                                    "lit": "people"
                                },
                                {
                                    "var": "username"
                                },
                                {
                                    "lit": "lists"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "editions.json"
                                }
                            ],
                            "parts": [
                                "people",
                                "{username}",
                                "lists",
                                "{id}",
                                "editions.json"
                            ],
                            "rename": {
                                "param": {
                                    "olid": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.entries`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "olid",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "username",
                                        "orig": "username",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 50
                                    },
                                    {
                                        "name": "offset",
                                        "orig": "offset",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 0
                                    }
                                ]
                            },
                            "select": {
                                "$action": "editions.json",
                                "exist": [
                                    "id",
                                    "username"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/lists/{olid}/editions.json",
                            "segments": [
                                {
                                    "lit": "lists"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "editions.json"
                                }
                            ],
                            "parts": [
                                "lists",
                                "{id}",
                                "editions.json"
                            ],
                            "rename": {
                                "param": {
                                    "olid": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.entries`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "olid",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 50
                                    },
                                    {
                                        "name": "offset",
                                        "orig": "offset",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 0
                                    }
                                ]
                            },
                            "select": {
                                "$action": "editions.json",
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/series/{olid}/editions.json",
                            "segments": [
                                {
                                    "lit": "series"
                                },
                                {
                                    "var": "series_id"
                                },
                                {
                                    "lit": "editions.json"
                                }
                            ],
                            "parts": [
                                "series",
                                "{series_id}",
                                "editions.json"
                            ],
                            "rename": {
                                "param": {
                                    "olid": "series_id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.entries`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "series_id",
                                        "orig": "olid",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 50
                                    },
                                    {
                                        "name": "offset",
                                        "orig": "offset",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 0
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "series_id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "list_subjects_model": {
            "fields": [
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`"
                },
                {
                    "name": "links",
                    "title": "Links",
                    "type": "`$OBJECT`",
                    "req": true
                },
                {
                    "name": "people",
                    "title": "People",
                    "type": "`$ARRAY`",
                    "req": true
                },
                {
                    "name": "places",
                    "title": "Places",
                    "type": "`$ARRAY`",
                    "req": true
                },
                {
                    "name": "subjects",
                    "title": "Subjects",
                    "type": "`$ARRAY`",
                    "req": true
                },
                {
                    "name": "times",
                    "title": "Times",
                    "type": "`$ARRAY`",
                    "req": true
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "list_subjects_model",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/people/{username}/lists/{olid}/subjects.json",
                            "segments": [
                                {
                                    "lit": "people"
                                },
                                {
                                    "var": "username"
                                },
                                {
                                    "lit": "lists"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "subjects.json"
                                }
                            ],
                            "parts": [
                                "people",
                                "{username}",
                                "lists",
                                "{id}",
                                "subjects.json"
                            ],
                            "rename": {
                                "param": {
                                    "olid": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "olid",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "username",
                                        "orig": "username",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 20
                                    }
                                ]
                            },
                            "select": {
                                "$action": "subjects.json",
                                "exist": [
                                    "id",
                                    "username"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/lists/{olid}/subjects.json",
                            "segments": [
                                {
                                    "lit": "lists"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "subjects.json"
                                }
                            ],
                            "parts": [
                                "lists",
                                "{id}",
                                "subjects.json"
                            ],
                            "rename": {
                                "param": {
                                    "olid": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "olid",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 20
                                    }
                                ]
                            },
                            "select": {
                                "$action": "subjects.json",
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/series/{olid}/subjects.json",
                            "segments": [
                                {
                                    "lit": "series"
                                },
                                {
                                    "var": "series_id"
                                },
                                {
                                    "lit": "subjects.json"
                                }
                            ],
                            "parts": [
                                "series",
                                "{series_id}",
                                "subjects.json"
                            ],
                            "rename": {
                                "param": {
                                    "olid": "series_id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "series_id",
                                        "orig": "olid",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 20
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "series_id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "login": {
            "fields": [],
            "name": "login",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/account/login",
                            "segments": [
                                {
                                    "lit": "account"
                                },
                                {
                                    "lit": "login"
                                }
                            ],
                            "parts": [
                                "account",
                                "login"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {},
                            "body": {
                                "fields": [
                                    {
                                        "name": "access"
                                    },
                                    {
                                        "name": "action"
                                    },
                                    {
                                        "name": "password"
                                    },
                                    {
                                        "name": "redirect"
                                    },
                                    {
                                        "name": "remember"
                                    },
                                    {
                                        "name": "secret"
                                    },
                                    {
                                        "name": "test"
                                    },
                                    {
                                        "name": "username"
                                    }
                                ],
                                "kind": "form",
                                "media": "application/x-www-form-urlencoded"
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "logout": {
            "fields": [],
            "name": "logout",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/account/logout",
                            "segments": [
                                {
                                    "lit": "account"
                                },
                                {
                                    "lit": "logout"
                                }
                            ],
                            "parts": [
                                "account",
                                "logout"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "merge": {
            "fields": [
                {
                    "name": "comment",
                    "title": "Comment",
                    "type": "`$ANY`"
                },
                {
                    "name": "duplicates",
                    "title": "Duplicates",
                    "type": "`$ARRAY`",
                    "req": true
                },
                {
                    "name": "master",
                    "title": "Master",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "mrid",
                    "title": "Mrid",
                    "type": "`$ANY`"
                },
                {
                    "name": "olids",
                    "title": "Olids",
                    "type": "`$STRING`"
                }
            ],
            "name": "merge",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/authors/merge.json",
                            "segments": [
                                {
                                    "lit": "authors"
                                },
                                {
                                    "lit": "merge.json"
                                }
                            ],
                            "parts": [
                                "authors",
                                "merge.json"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "reading_goal": {
            "fields": [
                {
                    "name": "goal",
                    "title": "Goal",
                    "type": "`$INTEGER`",
                    "req": true,
                    "short": "The target number of books to read"
                },
                {
                    "name": "status",
                    "title": "Status",
                    "type": "`$STRING`",
                    "short": "Response status"
                },
                {
                    "name": "year",
                    "title": "Year",
                    "type": "`$INTEGER`",
                    "req": true,
                    "short": "The year for this reading goal (1-9999)"
                }
            ],
            "name": "reading_goal",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/reading-goal.json",
                            "segments": [
                                {
                                    "lit": "reading-goal.json"
                                }
                            ],
                            "parts": [
                                "reading-goal.json"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {},
                            "body": {
                                "fields": [
                                    {
                                        "name": "goal"
                                    },
                                    {
                                        "name": "is_update"
                                    },
                                    {
                                        "name": "year"
                                    }
                                ],
                                "kind": "form",
                                "media": "application/x-www-form-urlencoded"
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/reading-goal.json",
                            "segments": [
                                {
                                    "lit": "reading-goal.json"
                                }
                            ],
                            "parts": [
                                "reading-goal.json"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.goal`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "year",
                                        "orig": "year",
                                        "type": "`$ANY`",
                                        "kind": "query",
                                        "field": true
                                    }
                                ]
                            },
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "reading_log": {
            "fields": [
                {
                    "name": "logged_date",
                    "title": "Logged Date",
                    "type": "`$ANY`",
                    "req": true
                },
                {
                    "name": "logged_edition",
                    "title": "Logged Edition",
                    "type": "`$ANY`",
                    "req": true
                },
                {
                    "name": "work",
                    "title": "Work",
                    "type": "`$OBJECT`",
                    "req": true,
                    "short": "Work data in reading log."
                }
            ],
            "name": "reading_log",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/people/{username}/books/{key}.json",
                            "segments": [
                                {
                                    "lit": "people"
                                },
                                {
                                    "var": "username"
                                },
                                {
                                    "lit": "books"
                                },
                                {
                                    "lit": "{key}.json"
                                }
                            ],
                            "parts": [
                                "people",
                                "{username}",
                                "books",
                                "{key}.json"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.reading_log_entries`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "key",
                                        "orig": "key",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "username",
                                        "orig": "username",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 100
                                    },
                                    {
                                        "name": "mode",
                                        "orig": "mode",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "everything"
                                    },
                                    {
                                        "name": "offset",
                                        "orig": "offset",
                                        "type": "`$INTEGER`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "page",
                                        "orig": "page",
                                        "type": "`$INTEGER`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "q",
                                        "orig": "q",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": ""
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "key",
                                    "username"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "req": {
            "fields": [],
            "name": "req",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/api/volumes/{brief_or_full}/json/{req}.json",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "volumes"
                                },
                                {
                                    "var": "volume_id"
                                },
                                {
                                    "lit": "json"
                                },
                                {
                                    "lit": "{req}.json"
                                }
                            ],
                            "parts": [
                                "api",
                                "volumes",
                                "{volume_id}",
                                "json",
                                "{req}.json"
                            ],
                            "rename": {
                                "param": {
                                    "brief_or_full": "volume_id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "req",
                                        "orig": "req",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "volume_id",
                                        "orig": "brief_or_full",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "req",
                                    "volume_id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "search": {
            "fields": [
                {
                    "name": "docs",
                    "title": "Docs",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "documentation_url",
                    "title": "Documentation Url",
                    "type": "`$STRING`"
                },
                {
                    "name": "numFound",
                    "title": "Num Found",
                    "type": "`$INTEGER`",
                    "req": true
                },
                {
                    "name": "numFoundExact",
                    "title": "Num Found Exact",
                    "type": "`$BOOLEAN`",
                    "req": true
                },
                {
                    "name": "num_found",
                    "title": "Num Found",
                    "type": "`$INTEGER`",
                    "req": true
                },
                {
                    "name": "offset",
                    "title": "Offset",
                    "type": "`$INTEGER`",
                    "req": true
                },
                {
                    "name": "q",
                    "title": "Q",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "start",
                    "title": "Start",
                    "type": "`$INTEGER`",
                    "req": true
                }
            ],
            "name": "search",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/search.json",
                            "segments": [
                                {
                                    "lit": "search.json"
                                }
                            ],
                            "parts": [
                                "search.json"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.docs`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "author",
                                        "orig": "author",
                                        "type": "`$ANY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "author_facet",
                                        "orig": "author_facet",
                                        "type": "`$ARRAY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "author_key",
                                        "orig": "author_key",
                                        "type": "`$ARRAY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "contributor",
                                        "orig": "contributor",
                                        "type": "`$ANY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "field",
                                        "orig": "fields",
                                        "type": "`$ARRAY`",
                                        "kind": "query",
                                        "example": [
                                            "author_key",
                                            "author_name",
                                            "cover_edition_key",
                                            "cover_height",
                                            "cover_i",
                                            "cover_width",
                                            "ebook_access",
                                            "edition_count",
                                            "first_publish_year",
                                            "has_fulltext",
                                            "ia",
                                            "ia_collection",
                                            "id_cita_press",
                                            "id_librivox",
                                            "id_openstax",
                                            "id_project_gutenberg",
                                            "id_project_runeberg",
                                            "id_standard_ebooks",
                                            "id_wikisource",
                                            "key",
                                            "language",
                                            "lending_edition_s",
                                            "lending_identifier_s",
                                            "public_scan_b",
                                            "series_key",
                                            "series_name",
                                            "series_position",
                                            "subtitle",
                                            "title"
                                        ]
                                    },
                                    {
                                        "name": "first_publish_year",
                                        "orig": "first_publish_year",
                                        "type": "`$ARRAY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "has_fulltext",
                                        "orig": "has_fulltext",
                                        "type": "`$BOOLEAN`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "isbn",
                                        "orig": "isbn",
                                        "type": "`$ANY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "language",
                                        "orig": "language",
                                        "type": "`$ARRAY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "lccn",
                                        "orig": "lccn",
                                        "type": "`$ANY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 100
                                    },
                                    {
                                        "name": "oclc",
                                        "orig": "oclc",
                                        "type": "`$ANY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "offset",
                                        "orig": "offset",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "field": true
                                    },
                                    {
                                        "name": "page",
                                        "orig": "page",
                                        "type": "`$INTEGER`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "person",
                                        "orig": "person",
                                        "type": "`$ANY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "person_facet",
                                        "orig": "person_facet",
                                        "type": "`$ARRAY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "place",
                                        "orig": "place",
                                        "type": "`$ANY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "place_facet",
                                        "orig": "place_facet",
                                        "type": "`$ARRAY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "print_disabled",
                                        "orig": "print_disabled",
                                        "type": "`$ANY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "public_scan",
                                        "orig": "public_scan",
                                        "type": "`$ANY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "public_scan_b",
                                        "orig": "public_scan_b",
                                        "type": "`$ARRAY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "publisher",
                                        "orig": "publisher",
                                        "type": "`$ANY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "publisher_facet",
                                        "orig": "publisher_facet",
                                        "type": "`$ARRAY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "q",
                                        "orig": "q",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "",
                                        "field": true
                                    },
                                    {
                                        "name": "query",
                                        "orig": "query",
                                        "type": "`$ANY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "sort",
                                        "orig": "sort",
                                        "type": "`$ANY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "spellcheck_count",
                                        "orig": "spellcheck_count",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 3
                                    },
                                    {
                                        "name": "subject",
                                        "orig": "subject",
                                        "type": "`$ANY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "subject_facet",
                                        "orig": "subject_facet",
                                        "type": "`$ARRAY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "time",
                                        "orig": "time",
                                        "type": "`$ANY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "time_facet",
                                        "orig": "time_facet",
                                        "type": "`$ARRAY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "title",
                                        "orig": "title",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/search/editions.json",
                            "segments": [
                                {
                                    "lit": "search"
                                },
                                {
                                    "lit": "editions.json"
                                }
                            ],
                            "parts": [
                                "search",
                                "editions.json"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "field",
                                        "orig": "fields",
                                        "type": "`$ARRAY`",
                                        "kind": "query",
                                        "example": [
                                            "cover_i",
                                            "ebook_access",
                                            "isbn",
                                            "key",
                                            "language",
                                            "publish_date",
                                            "publisher",
                                            "subtitle",
                                            "title",
                                            "work_key"
                                        ]
                                    },
                                    {
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 100
                                    },
                                    {
                                        "name": "offset",
                                        "orig": "offset",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "field": true
                                    },
                                    {
                                        "name": "page",
                                        "orig": "page",
                                        "type": "`$INTEGER`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "q",
                                        "orig": "q",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "",
                                        "field": true
                                    },
                                    {
                                        "name": "sort",
                                        "orig": "sort",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": ""
                                    },
                                    {
                                        "name": "work_key",
                                        "orig": "work_key",
                                        "type": "`$ANY`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "$action": "edition"
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "subject": {
            "fields": [],
            "name": "subject",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/search/subjects.json",
                            "segments": [
                                {
                                    "lit": "search"
                                },
                                {
                                    "lit": "subjects.json"
                                }
                            ],
                            "parts": [
                                "search",
                                "subjects.json"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 100
                                    },
                                    {
                                        "name": "offset",
                                        "orig": "offset",
                                        "type": "`$INTEGER`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "page",
                                        "orig": "page",
                                        "type": "`$INTEGER`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "q",
                                        "orig": "q",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": ""
                                    }
                                ]
                            },
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map