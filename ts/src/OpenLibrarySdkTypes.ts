// Typed models for the OpenLibrarySdk SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface AccountLoan {
  loans: any[]
}

export interface AccountLoanListMatch {
  loans?: any[]
}

export interface AccountLoanHistory {
}

export interface AccountLoanHistoryLoadMatch {
  page?: number
}

export interface Archiveorg {
  id?: string
}

export interface ArchiveorgLoadMatch {
  id: string
}

export interface Author {
}

export interface AuthorLoadMatch {
  field?: string
  limit?: number
  offset?: number
  page?: number
  q?: string
  sort?: string
}

export interface Book {
}

export interface BookLoadMatch {
  bibkey: any[]
  callback?: any
  detail?: string
  format?: any
  high_priority?: boolean
  jscmd?: any
}

export interface Borrow {
}

export interface BorrowLoadMatch {
  book_id: string
  slug: string
}

export interface BorrowCreateData {
  book_id: string
  slug: string
}

export interface CheckIn {
  day?: any
  edition_key?: any
  event_id?: string
  event_type: number
  id: number
  month?: any
  status: string
  year: number
}

export interface CheckInCreateData {
  work_id: number
  day?: any
  edition_key?: any
  event_id?: string
  event_type: number
  id: number
  month?: any
  status: string
  year: number
}

export interface CheckInRemoveMatch {
  id: number
}

export interface CreateList {
  description?: string
  key: string
  name?: string
  revision: number
  seeds?: any[]
  tags?: any[]
}

export interface CreateListCreateData {
  username: string
  description?: string
  key: string
  name?: string
  revision: number
  seeds?: any[]
  tags?: any[]
}

export interface Feed {
  action: string
  authors: string
  comment: string
  cover_url: string
  editor: string
  editor_key: string
  id: string
  key: string
  kind: string
  timestamp: string
  title: string
}

export interface FeedListMatch {
  limit?: number
  offset?: number
}

export interface Graphite {
  id?: string
}

export interface GraphiteLoadMatch {
  id: string
}

export interface Health {
}

export interface HealthLoadMatch {
}

export interface Ian {
}

export interface IanLoadMatch {
  ocaid: string
}

export interface IanCreateData {
  ocaid: string
}

export interface Idval {
}

export interface IdvalLoadMatch {
  idtype: string
  idval: string
  volume_id: string
  show_all_item?: boolean
}

export interface Import {
}

export interface ImportLoadMatch {
  identifier?: any
  provider?: any
  source?: any

  // Selects a custom action instead of the plain load:
  //   'preview'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface ImportCreateData {

  // Selects a custom action instead of the plain create:
  //   'preview'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface Inside {
}

export interface InsideLoadMatch {
  facet?: boolean
  language?: any
  limit?: number
  offset?: number
  page?: number
  q: string
  readable?: boolean
}

export interface Key {
}

export interface KeyLoadMatch {
  key: string
  detail?: boolean
  has_fulltext?: boolean
  limit?: number
  offset?: number
  page?: number
  published_in?: any
  sort?: string
}

export interface Language {
  count: number
  ebook_edition_count: number
  key: string
  marc_code: string
  name: string
}

export interface LanguageListMatch {
  limit?: number
  sort?: string
}

export interface List {
  full_url: string
  id?: string
  last_update?: any
  name: string
  seed_count: number
  url: string
}

export interface ListLoadMatch {
  list_id: string
  raw?: boolean

  // Selects a custom action instead of the plain load:
  //   'seed' | 'seed'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface ListListMatch {
  author_id: number
  limit?: number
  offset?: number
}

export interface ListCreateData {
  series_id: string
  username?: string
  full_url: string
  id?: string
  last_update?: any
  name: string
  seed_count: number
  url: string

  // Selects a custom action instead of the plain create:
  //   'delete' | 'delete' | 'seed' | 'seed'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface ListEditionsModel {
  end: number
  entries: any[]
  id?: string
  links: Record<string, any>
  size: number
  start: number
}

export interface ListEditionsModelListMatch {
  series_id: string
  limit?: number
  offset?: number

  // Selects a custom action instead of the plain list:
  //   'editions.json' | 'editions.json'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface ListSubjectsModel {
  id?: string
  links: Record<string, any>
  people: any[]
  places: any[]
  subjects: any[]
  times: any[]
}

export interface ListSubjectsModelListMatch {
  series_id: string
  limit?: number

  // Selects a custom action instead of the plain list:
  //   'subjects.json' | 'subjects.json'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface Login {
}

export interface LoginCreateData {
}

export interface Logout {
}

export interface LogoutCreateData {
}

export interface Merge {
  comment?: any
  duplicates: any[]
  master: string
  mrid?: any
  olids?: string
}

export interface MergeCreateData {
  comment?: any
  duplicates: any[]
  master: string
  mrid?: any
  olids?: string
}

export interface ReadingGoal {
  goal: number
  status?: string
  year: number
}

export interface ReadingGoalListMatch {
  year?: any
}

export interface ReadingGoalCreateData {
  goal: number
  status?: string
  year: number
}

export interface ReadingLog {
  logged_date: any
  logged_edition: any
  work: Record<string, any>
}

export interface ReadingLogListMatch {
  key: string
  username: string
  limit?: number
  mode?: string
  offset?: number
  page?: number
  q?: string
}

export interface Req {
}

export interface ReqLoadMatch {
  req: string
  volume_id: string
}

export interface Search {
  docs?: any[]
  documentation_url?: string
  numFound: number
  numFoundExact: boolean
  num_found: number
  offset: number
  q: string
  start: number
}

export interface SearchLoadMatch {
  field?: any[]
  limit?: number
  offset?: number
  page?: number
  q?: string
  sort?: string
  work_key?: any

  // Selects a custom action instead of the plain load:
  //   'edition'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface SearchListMatch {
  author?: any
  author_facet?: any[]
  author_key?: any[]
  contributor?: any
  field?: any[]
  first_publish_year?: any[]
  has_fulltext?: boolean
  isbn?: any
  language?: any[]
  lccn?: any
  limit?: number
  oclc?: any
  offset?: number
  page?: number
  person?: any
  person_facet?: any[]
  place?: any
  place_facet?: any[]
  print_disabled?: any
  public_scan?: any
  public_scan_b?: any[]
  publisher?: any
  publisher_facet?: any[]
  q?: string
  query?: any
  sort?: any
  spellcheck_count?: number
  subject?: any
  subject_facet?: any[]
  time?: any
  time_facet?: any[]
  title?: string
}

export interface Subject {
}

export interface SubjectLoadMatch {
  limit?: number
  offset?: number
  page?: number
  q?: string
}

