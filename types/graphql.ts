import { DoodleType } from "~/types/NormalizedDoodle"
import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from "graphql"
import { NormalizedDoodle } from "~/types/NormalizedDoodle"
import { gql } from "@apollo/client"
import * as Apollo from "@apollo/client"
export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } &
  { [P in K]-?: NonNullable<T[P]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  DoodleType: DoodleType
}

export type Doodle = {
  id: Scalars["ID"]
  gid: Maybe<Scalars["Int"]>
  alternate_url: Scalars["String"]
  blog_text: Scalars["String"]
  call_to_action_image_url: Scalars["String"]
  collection_id: Scalars["Int"]
  countries: Array<Scalars["String"]>
  date: Scalars["String"]
  doodle_args: Array<DoodleArg>
  height: Scalars["Int"]
  high_res_height: Scalars["Int"]
  high_res_url: Scalars["String"]
  high_res_width: Scalars["Int"]
  history_doodles: Array<Doodle>
  is_animated_gif: Scalars["Boolean"]
  is_dynamic: Scalars["Boolean"]
  is_global: Scalars["Boolean"]
  is_highlighted: Scalars["Boolean"]
  name: Scalars["String"]
  next_doodle: Maybe<Doodle>
  persistent_id: Scalars["Int"]
  prev_doodle: Maybe<Doodle>
  query: Scalars["String"]
  related_doodles: Array<Doodle>
  share_text: Scalars["String"]
  standalone_html: Scalars["String"]
  tags: Array<Scalars["String"]>
  title: Scalars["String"]
  translated_blog_posts: Array<TranslatedBlogPost>
  translations: Array<Translation>
  type: Scalars["DoodleType"]
  url: Scalars["String"]
  width: Scalars["Int"]
  youtube_id: Scalars["String"]
}

export type DoodleArg = {
  name: Scalars["String"]
  value: Scalars["String"]
}

export type Translation = {
  _key: Scalars["String"]
  _value: _Translation
}

export type _Translation = {
  share_text: Scalars["String"]
  hover_text: Maybe<Scalars["String"]>
  query: Maybe<Scalars["String"]>
}

export type TranslatedBlogPost = {
  _key: Scalars["String"]
  _value: _TranslatedBlogPost
}

export type _TranslatedBlogPost = {
  blog_post: Scalars["String"]
  language: Scalars["String"]
}

export enum QueryOrder {
  Latest = "Latest",
  Oldest = "Oldest",
}

export type Filters = {
  types: Array<Scalars["String"]>
  countries: Array<Scalars["String"]>
  tags: Array<Scalars["String"]>
}

export type Query = {
  filters: Filters
  historyDoodles: Array<Doodle>
  doodles: Array<Doodle>
}

export type QueryHistoryDoodlesArgs = {
  month: Scalars["Int"]
  day: Scalars["Int"]
}

export type QueryDoodlesArgs = {
  limit: Maybe<Scalars["Int"]>
  offset: Maybe<Scalars["Int"]>
  order: Maybe<QueryOrder>
  searchText: Maybe<Scalars["String"]>
  type: Maybe<Scalars["String"]>
  countries: Maybe<Array<Scalars["String"]>>
  tags: Maybe<Array<Scalars["String"]>>
}

export type ResolverTypeWrapper<T> = Promise<T> | T

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}
export type StitchingResolver<TResult, TParent, TContext, TArgs> =
  | LegacyStitchingResolver<TResult, TParent, TContext, TArgs>
  | NewStitchingResolver<TResult, TParent, TContext, TArgs>
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>

export type NextResolverFn<T> = () => Promise<T>

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  DoodleType: ResolverTypeWrapper<Scalars["DoodleType"]>
  Doodle: ResolverTypeWrapper<NormalizedDoodle>
  ID: ResolverTypeWrapper<Scalars["ID"]>
  Int: ResolverTypeWrapper<Scalars["Int"]>
  String: ResolverTypeWrapper<Scalars["String"]>
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>
  DoodleArg: ResolverTypeWrapper<DoodleArg>
  Translation: ResolverTypeWrapper<Translation>
  _Translation: ResolverTypeWrapper<_Translation>
  TranslatedBlogPost: ResolverTypeWrapper<TranslatedBlogPost>
  _TranslatedBlogPost: ResolverTypeWrapper<_TranslatedBlogPost>
  QueryOrder: QueryOrder
  Filters: ResolverTypeWrapper<Filters>
  Query: ResolverTypeWrapper<{}>
}

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  DoodleType: Scalars["DoodleType"]
  Doodle: NormalizedDoodle
  ID: Scalars["ID"]
  Int: Scalars["Int"]
  String: Scalars["String"]
  Boolean: Scalars["Boolean"]
  DoodleArg: DoodleArg
  Translation: Translation
  _Translation: _Translation
  TranslatedBlogPost: TranslatedBlogPost
  _TranslatedBlogPost: _TranslatedBlogPost
  Filters: Filters
  Query: {}
}

export interface DoodleTypeScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["DoodleType"], any> {
  name: "DoodleType"
}

export type DoodleResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Doodle"] = ResolversParentTypes["Doodle"]
> = {
  id: Resolver<ResolversTypes["ID"], ParentType, ContextType>
  gid: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>
  alternate_url: Resolver<ResolversTypes["String"], ParentType, ContextType>
  blog_text: Resolver<ResolversTypes["String"], ParentType, ContextType>
  call_to_action_image_url: Resolver<ResolversTypes["String"], ParentType, ContextType>
  collection_id: Resolver<ResolversTypes["Int"], ParentType, ContextType>
  countries: Resolver<Array<ResolversTypes["String"]>, ParentType, ContextType>
  date: Resolver<ResolversTypes["String"], ParentType, ContextType>
  doodle_args: Resolver<Array<ResolversTypes["DoodleArg"]>, ParentType, ContextType>
  height: Resolver<ResolversTypes["Int"], ParentType, ContextType>
  high_res_height: Resolver<ResolversTypes["Int"], ParentType, ContextType>
  high_res_url: Resolver<ResolversTypes["String"], ParentType, ContextType>
  high_res_width: Resolver<ResolversTypes["Int"], ParentType, ContextType>
  history_doodles: Resolver<Array<ResolversTypes["Doodle"]>, ParentType, ContextType>
  is_animated_gif: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>
  is_dynamic: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>
  is_global: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>
  is_highlighted: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>
  name: Resolver<ResolversTypes["String"], ParentType, ContextType>
  next_doodle: Resolver<Maybe<ResolversTypes["Doodle"]>, ParentType, ContextType>
  persistent_id: Resolver<ResolversTypes["Int"], ParentType, ContextType>
  prev_doodle: Resolver<Maybe<ResolversTypes["Doodle"]>, ParentType, ContextType>
  query: Resolver<ResolversTypes["String"], ParentType, ContextType>
  related_doodles: Resolver<Array<ResolversTypes["Doodle"]>, ParentType, ContextType>
  share_text: Resolver<ResolversTypes["String"], ParentType, ContextType>
  standalone_html: Resolver<ResolversTypes["String"], ParentType, ContextType>
  tags: Resolver<Array<ResolversTypes["String"]>, ParentType, ContextType>
  title: Resolver<ResolversTypes["String"], ParentType, ContextType>
  translated_blog_posts: Resolver<
    Array<ResolversTypes["TranslatedBlogPost"]>,
    ParentType,
    ContextType
  >
  translations: Resolver<Array<ResolversTypes["Translation"]>, ParentType, ContextType>
  type: Resolver<ResolversTypes["DoodleType"], ParentType, ContextType>
  url: Resolver<ResolversTypes["String"], ParentType, ContextType>
  width: Resolver<ResolversTypes["Int"], ParentType, ContextType>
  youtube_id: Resolver<ResolversTypes["String"], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type DoodleArgResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["DoodleArg"] = ResolversParentTypes["DoodleArg"]
> = {
  name: Resolver<ResolversTypes["String"], ParentType, ContextType>
  value: Resolver<ResolversTypes["String"], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type TranslationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Translation"] = ResolversParentTypes["Translation"]
> = {
  _key: Resolver<ResolversTypes["String"], ParentType, ContextType>
  _value: Resolver<ResolversTypes["_Translation"], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type _TranslationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["_Translation"] = ResolversParentTypes["_Translation"]
> = {
  share_text: Resolver<ResolversTypes["String"], ParentType, ContextType>
  hover_text: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>
  query: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type TranslatedBlogPostResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["TranslatedBlogPost"] = ResolversParentTypes["TranslatedBlogPost"]
> = {
  _key: Resolver<ResolversTypes["String"], ParentType, ContextType>
  _value: Resolver<ResolversTypes["_TranslatedBlogPost"], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type _TranslatedBlogPostResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["_TranslatedBlogPost"] = ResolversParentTypes["_TranslatedBlogPost"]
> = {
  blog_post: Resolver<ResolversTypes["String"], ParentType, ContextType>
  language: Resolver<ResolversTypes["String"], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type FiltersResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Filters"] = ResolversParentTypes["Filters"]
> = {
  types: Resolver<Array<ResolversTypes["String"]>, ParentType, ContextType>
  countries: Resolver<Array<ResolversTypes["String"]>, ParentType, ContextType>
  tags: Resolver<Array<ResolversTypes["String"]>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = {
  filters: Resolver<ResolversTypes["Filters"], ParentType, ContextType>
  historyDoodles: Resolver<
    Array<ResolversTypes["Doodle"]>,
    ParentType,
    ContextType,
    RequireFields<QueryHistoryDoodlesArgs, "month" | "day">
  >
  doodles: Resolver<
    Array<ResolversTypes["Doodle"]>,
    ParentType,
    ContextType,
    RequireFields<QueryDoodlesArgs, never>
  >
}

export type Resolvers<ContextType = any> = {
  DoodleType: GraphQLScalarType
  Doodle: DoodleResolvers<ContextType>
  DoodleArg: DoodleArgResolvers<ContextType>
  Translation: TranslationResolvers<ContextType>
  _Translation: _TranslationResolvers<ContextType>
  TranslatedBlogPost: TranslatedBlogPostResolvers<ContextType>
  _TranslatedBlogPost: _TranslatedBlogPostResolvers<ContextType>
  Filters: FiltersResolvers<ContextType>
  Query: QueryResolvers<ContextType>
}

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>

export type DoodlesQueryVariables = Exact<{
  offset: Maybe<Scalars["Int"]>
  searchText: Maybe<Scalars["String"]>
}>

export type DoodlesQuery = { doodles: Array<Pick<Doodle, "id" | "title" | "url">> }

export type HistoryDoodlesQueryVariables = Exact<{
  month: Scalars["Int"]
  day: Scalars["Int"]
}>

export type HistoryDoodlesQuery = { historyDoodles: Array<Pick<Doodle, "id" | "title" | "url">> }

export const DoodlesDocument = gql`
  query doodles($offset: Int, $searchText: String) {
    doodles(limit: 4, offset: $offset, searchText: $searchText) {
      id
      title
      url
    }
  }
`

/**
 * __useDoodlesQuery__
 *
 * To run a query within a React component, call `useDoodlesQuery` and pass it any options that fit your needs.
 * When your component renders, `useDoodlesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDoodlesQuery({
 *   variables: {
 *      offset: // value for 'offset'
 *      searchText: // value for 'searchText'
 *   },
 * });
 */
export function useDoodlesQuery(
  baseOptions?: Apollo.QueryHookOptions<DoodlesQuery, DoodlesQueryVariables>
) {
  return Apollo.useQuery<DoodlesQuery, DoodlesQueryVariables>(DoodlesDocument, baseOptions)
}
export function useDoodlesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<DoodlesQuery, DoodlesQueryVariables>
) {
  return Apollo.useLazyQuery<DoodlesQuery, DoodlesQueryVariables>(DoodlesDocument, baseOptions)
}
export type DoodlesQueryHookResult = ReturnType<typeof useDoodlesQuery>
export type DoodlesLazyQueryHookResult = ReturnType<typeof useDoodlesLazyQuery>
export type DoodlesQueryResult = Apollo.QueryResult<DoodlesQuery, DoodlesQueryVariables>
export const HistoryDoodlesDocument = gql`
  query historyDoodles($month: Int!, $day: Int!) {
    historyDoodles(month: $month, day: $day) {
      id
      title
      url
    }
  }
`

/**
 * __useHistoryDoodlesQuery__
 *
 * To run a query within a React component, call `useHistoryDoodlesQuery` and pass it any options that fit your needs.
 * When your component renders, `useHistoryDoodlesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHistoryDoodlesQuery({
 *   variables: {
 *      month: // value for 'month'
 *      day: // value for 'day'
 *   },
 * });
 */
export function useHistoryDoodlesQuery(
  baseOptions: Apollo.QueryHookOptions<HistoryDoodlesQuery, HistoryDoodlesQueryVariables>
) {
  return Apollo.useQuery<HistoryDoodlesQuery, HistoryDoodlesQueryVariables>(
    HistoryDoodlesDocument,
    baseOptions
  )
}
export function useHistoryDoodlesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<HistoryDoodlesQuery, HistoryDoodlesQueryVariables>
) {
  return Apollo.useLazyQuery<HistoryDoodlesQuery, HistoryDoodlesQueryVariables>(
    HistoryDoodlesDocument,
    baseOptions
  )
}
export type HistoryDoodlesQueryHookResult = ReturnType<typeof useHistoryDoodlesQuery>
export type HistoryDoodlesLazyQueryHookResult = ReturnType<typeof useHistoryDoodlesLazyQuery>
export type HistoryDoodlesQueryResult = Apollo.QueryResult<
  HistoryDoodlesQuery,
  HistoryDoodlesQueryVariables
>
