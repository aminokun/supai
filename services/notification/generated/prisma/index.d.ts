
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model NotificationPreference
 * 
 */
export type NotificationPreference = $Result.DefaultSelection<Prisma.$NotificationPreferencePayload>
/**
 * Model NotificationLog
 * 
 */
export type NotificationLog = $Result.DefaultSelection<Prisma.$NotificationLogPayload>
/**
 * Model NotificationQueue
 * 
 */
export type NotificationQueue = $Result.DefaultSelection<Prisma.$NotificationQueuePayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more NotificationPreferences
 * const notificationPreferences = await prisma.notificationPreference.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more NotificationPreferences
   * const notificationPreferences = await prisma.notificationPreference.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.notificationPreference`: Exposes CRUD operations for the **NotificationPreference** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more NotificationPreferences
    * const notificationPreferences = await prisma.notificationPreference.findMany()
    * ```
    */
  get notificationPreference(): Prisma.NotificationPreferenceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.notificationLog`: Exposes CRUD operations for the **NotificationLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more NotificationLogs
    * const notificationLogs = await prisma.notificationLog.findMany()
    * ```
    */
  get notificationLog(): Prisma.NotificationLogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.notificationQueue`: Exposes CRUD operations for the **NotificationQueue** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more NotificationQueues
    * const notificationQueues = await prisma.notificationQueue.findMany()
    * ```
    */
  get notificationQueue(): Prisma.NotificationQueueDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.18.0
   * Query Engine version: 34b5a692b7bd79939a9a2c3ef97d816e749cda2f
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    NotificationPreference: 'NotificationPreference',
    NotificationLog: 'NotificationLog',
    NotificationQueue: 'NotificationQueue'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "notificationPreference" | "notificationLog" | "notificationQueue"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      NotificationPreference: {
        payload: Prisma.$NotificationPreferencePayload<ExtArgs>
        fields: Prisma.NotificationPreferenceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NotificationPreferenceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPreferencePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NotificationPreferenceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPreferencePayload>
          }
          findFirst: {
            args: Prisma.NotificationPreferenceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPreferencePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NotificationPreferenceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPreferencePayload>
          }
          findMany: {
            args: Prisma.NotificationPreferenceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPreferencePayload>[]
          }
          create: {
            args: Prisma.NotificationPreferenceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPreferencePayload>
          }
          createMany: {
            args: Prisma.NotificationPreferenceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NotificationPreferenceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPreferencePayload>[]
          }
          delete: {
            args: Prisma.NotificationPreferenceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPreferencePayload>
          }
          update: {
            args: Prisma.NotificationPreferenceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPreferencePayload>
          }
          deleteMany: {
            args: Prisma.NotificationPreferenceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NotificationPreferenceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.NotificationPreferenceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPreferencePayload>[]
          }
          upsert: {
            args: Prisma.NotificationPreferenceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPreferencePayload>
          }
          aggregate: {
            args: Prisma.NotificationPreferenceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNotificationPreference>
          }
          groupBy: {
            args: Prisma.NotificationPreferenceGroupByArgs<ExtArgs>
            result: $Utils.Optional<NotificationPreferenceGroupByOutputType>[]
          }
          count: {
            args: Prisma.NotificationPreferenceCountArgs<ExtArgs>
            result: $Utils.Optional<NotificationPreferenceCountAggregateOutputType> | number
          }
        }
      }
      NotificationLog: {
        payload: Prisma.$NotificationLogPayload<ExtArgs>
        fields: Prisma.NotificationLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NotificationLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NotificationLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationLogPayload>
          }
          findFirst: {
            args: Prisma.NotificationLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NotificationLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationLogPayload>
          }
          findMany: {
            args: Prisma.NotificationLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationLogPayload>[]
          }
          create: {
            args: Prisma.NotificationLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationLogPayload>
          }
          createMany: {
            args: Prisma.NotificationLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NotificationLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationLogPayload>[]
          }
          delete: {
            args: Prisma.NotificationLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationLogPayload>
          }
          update: {
            args: Prisma.NotificationLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationLogPayload>
          }
          deleteMany: {
            args: Prisma.NotificationLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NotificationLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.NotificationLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationLogPayload>[]
          }
          upsert: {
            args: Prisma.NotificationLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationLogPayload>
          }
          aggregate: {
            args: Prisma.NotificationLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNotificationLog>
          }
          groupBy: {
            args: Prisma.NotificationLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<NotificationLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.NotificationLogCountArgs<ExtArgs>
            result: $Utils.Optional<NotificationLogCountAggregateOutputType> | number
          }
        }
      }
      NotificationQueue: {
        payload: Prisma.$NotificationQueuePayload<ExtArgs>
        fields: Prisma.NotificationQueueFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NotificationQueueFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationQueuePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NotificationQueueFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationQueuePayload>
          }
          findFirst: {
            args: Prisma.NotificationQueueFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationQueuePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NotificationQueueFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationQueuePayload>
          }
          findMany: {
            args: Prisma.NotificationQueueFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationQueuePayload>[]
          }
          create: {
            args: Prisma.NotificationQueueCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationQueuePayload>
          }
          createMany: {
            args: Prisma.NotificationQueueCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NotificationQueueCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationQueuePayload>[]
          }
          delete: {
            args: Prisma.NotificationQueueDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationQueuePayload>
          }
          update: {
            args: Prisma.NotificationQueueUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationQueuePayload>
          }
          deleteMany: {
            args: Prisma.NotificationQueueDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NotificationQueueUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.NotificationQueueUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationQueuePayload>[]
          }
          upsert: {
            args: Prisma.NotificationQueueUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationQueuePayload>
          }
          aggregate: {
            args: Prisma.NotificationQueueAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNotificationQueue>
          }
          groupBy: {
            args: Prisma.NotificationQueueGroupByArgs<ExtArgs>
            result: $Utils.Optional<NotificationQueueGroupByOutputType>[]
          }
          count: {
            args: Prisma.NotificationQueueCountArgs<ExtArgs>
            result: $Utils.Optional<NotificationQueueCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    notificationPreference?: NotificationPreferenceOmit
    notificationLog?: NotificationLogOmit
    notificationQueue?: NotificationQueueOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model NotificationPreference
   */

  export type AggregateNotificationPreference = {
    _count: NotificationPreferenceCountAggregateOutputType | null
    _avg: NotificationPreferenceAvgAggregateOutputType | null
    _sum: NotificationPreferenceSumAggregateOutputType | null
    _min: NotificationPreferenceMinAggregateOutputType | null
    _max: NotificationPreferenceMaxAggregateOutputType | null
  }

  export type NotificationPreferenceAvgAggregateOutputType = {
    minValueThreshold: number | null
  }

  export type NotificationPreferenceSumAggregateOutputType = {
    minValueThreshold: number | null
  }

  export type NotificationPreferenceMinAggregateOutputType = {
    id: string | null
    userId: string | null
    enableSwaps: boolean | null
    enableTransfers: boolean | null
    enableApprovals: boolean | null
    enableMemecoinsOnly: boolean | null
    minValueThreshold: number | null
    quietHours: boolean | null
    quietHoursStart: string | null
    quietHoursEnd: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type NotificationPreferenceMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    enableSwaps: boolean | null
    enableTransfers: boolean | null
    enableApprovals: boolean | null
    enableMemecoinsOnly: boolean | null
    minValueThreshold: number | null
    quietHours: boolean | null
    quietHoursStart: string | null
    quietHoursEnd: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type NotificationPreferenceCountAggregateOutputType = {
    id: number
    userId: number
    enableSwaps: number
    enableTransfers: number
    enableApprovals: number
    enableMemecoinsOnly: number
    minValueThreshold: number
    quietHours: number
    quietHoursStart: number
    quietHoursEnd: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type NotificationPreferenceAvgAggregateInputType = {
    minValueThreshold?: true
  }

  export type NotificationPreferenceSumAggregateInputType = {
    minValueThreshold?: true
  }

  export type NotificationPreferenceMinAggregateInputType = {
    id?: true
    userId?: true
    enableSwaps?: true
    enableTransfers?: true
    enableApprovals?: true
    enableMemecoinsOnly?: true
    minValueThreshold?: true
    quietHours?: true
    quietHoursStart?: true
    quietHoursEnd?: true
    createdAt?: true
    updatedAt?: true
  }

  export type NotificationPreferenceMaxAggregateInputType = {
    id?: true
    userId?: true
    enableSwaps?: true
    enableTransfers?: true
    enableApprovals?: true
    enableMemecoinsOnly?: true
    minValueThreshold?: true
    quietHours?: true
    quietHoursStart?: true
    quietHoursEnd?: true
    createdAt?: true
    updatedAt?: true
  }

  export type NotificationPreferenceCountAggregateInputType = {
    id?: true
    userId?: true
    enableSwaps?: true
    enableTransfers?: true
    enableApprovals?: true
    enableMemecoinsOnly?: true
    minValueThreshold?: true
    quietHours?: true
    quietHoursStart?: true
    quietHoursEnd?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type NotificationPreferenceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NotificationPreference to aggregate.
     */
    where?: NotificationPreferenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NotificationPreferences to fetch.
     */
    orderBy?: NotificationPreferenceOrderByWithRelationInput | NotificationPreferenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NotificationPreferenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NotificationPreferences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NotificationPreferences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned NotificationPreferences
    **/
    _count?: true | NotificationPreferenceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: NotificationPreferenceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: NotificationPreferenceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NotificationPreferenceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NotificationPreferenceMaxAggregateInputType
  }

  export type GetNotificationPreferenceAggregateType<T extends NotificationPreferenceAggregateArgs> = {
        [P in keyof T & keyof AggregateNotificationPreference]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNotificationPreference[P]>
      : GetScalarType<T[P], AggregateNotificationPreference[P]>
  }




  export type NotificationPreferenceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationPreferenceWhereInput
    orderBy?: NotificationPreferenceOrderByWithAggregationInput | NotificationPreferenceOrderByWithAggregationInput[]
    by: NotificationPreferenceScalarFieldEnum[] | NotificationPreferenceScalarFieldEnum
    having?: NotificationPreferenceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NotificationPreferenceCountAggregateInputType | true
    _avg?: NotificationPreferenceAvgAggregateInputType
    _sum?: NotificationPreferenceSumAggregateInputType
    _min?: NotificationPreferenceMinAggregateInputType
    _max?: NotificationPreferenceMaxAggregateInputType
  }

  export type NotificationPreferenceGroupByOutputType = {
    id: string
    userId: string
    enableSwaps: boolean
    enableTransfers: boolean
    enableApprovals: boolean
    enableMemecoinsOnly: boolean
    minValueThreshold: number | null
    quietHours: boolean
    quietHoursStart: string | null
    quietHoursEnd: string | null
    createdAt: Date
    updatedAt: Date
    _count: NotificationPreferenceCountAggregateOutputType | null
    _avg: NotificationPreferenceAvgAggregateOutputType | null
    _sum: NotificationPreferenceSumAggregateOutputType | null
    _min: NotificationPreferenceMinAggregateOutputType | null
    _max: NotificationPreferenceMaxAggregateOutputType | null
  }

  type GetNotificationPreferenceGroupByPayload<T extends NotificationPreferenceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NotificationPreferenceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NotificationPreferenceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NotificationPreferenceGroupByOutputType[P]>
            : GetScalarType<T[P], NotificationPreferenceGroupByOutputType[P]>
        }
      >
    >


  export type NotificationPreferenceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    enableSwaps?: boolean
    enableTransfers?: boolean
    enableApprovals?: boolean
    enableMemecoinsOnly?: boolean
    minValueThreshold?: boolean
    quietHours?: boolean
    quietHoursStart?: boolean
    quietHoursEnd?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["notificationPreference"]>

  export type NotificationPreferenceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    enableSwaps?: boolean
    enableTransfers?: boolean
    enableApprovals?: boolean
    enableMemecoinsOnly?: boolean
    minValueThreshold?: boolean
    quietHours?: boolean
    quietHoursStart?: boolean
    quietHoursEnd?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["notificationPreference"]>

  export type NotificationPreferenceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    enableSwaps?: boolean
    enableTransfers?: boolean
    enableApprovals?: boolean
    enableMemecoinsOnly?: boolean
    minValueThreshold?: boolean
    quietHours?: boolean
    quietHoursStart?: boolean
    quietHoursEnd?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["notificationPreference"]>

  export type NotificationPreferenceSelectScalar = {
    id?: boolean
    userId?: boolean
    enableSwaps?: boolean
    enableTransfers?: boolean
    enableApprovals?: boolean
    enableMemecoinsOnly?: boolean
    minValueThreshold?: boolean
    quietHours?: boolean
    quietHoursStart?: boolean
    quietHoursEnd?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type NotificationPreferenceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "enableSwaps" | "enableTransfers" | "enableApprovals" | "enableMemecoinsOnly" | "minValueThreshold" | "quietHours" | "quietHoursStart" | "quietHoursEnd" | "createdAt" | "updatedAt", ExtArgs["result"]["notificationPreference"]>

  export type $NotificationPreferencePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "NotificationPreference"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      enableSwaps: boolean
      enableTransfers: boolean
      enableApprovals: boolean
      enableMemecoinsOnly: boolean
      minValueThreshold: number | null
      quietHours: boolean
      quietHoursStart: string | null
      quietHoursEnd: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["notificationPreference"]>
    composites: {}
  }

  type NotificationPreferenceGetPayload<S extends boolean | null | undefined | NotificationPreferenceDefaultArgs> = $Result.GetResult<Prisma.$NotificationPreferencePayload, S>

  type NotificationPreferenceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<NotificationPreferenceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NotificationPreferenceCountAggregateInputType | true
    }

  export interface NotificationPreferenceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['NotificationPreference'], meta: { name: 'NotificationPreference' } }
    /**
     * Find zero or one NotificationPreference that matches the filter.
     * @param {NotificationPreferenceFindUniqueArgs} args - Arguments to find a NotificationPreference
     * @example
     * // Get one NotificationPreference
     * const notificationPreference = await prisma.notificationPreference.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NotificationPreferenceFindUniqueArgs>(args: SelectSubset<T, NotificationPreferenceFindUniqueArgs<ExtArgs>>): Prisma__NotificationPreferenceClient<$Result.GetResult<Prisma.$NotificationPreferencePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one NotificationPreference that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {NotificationPreferenceFindUniqueOrThrowArgs} args - Arguments to find a NotificationPreference
     * @example
     * // Get one NotificationPreference
     * const notificationPreference = await prisma.notificationPreference.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NotificationPreferenceFindUniqueOrThrowArgs>(args: SelectSubset<T, NotificationPreferenceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NotificationPreferenceClient<$Result.GetResult<Prisma.$NotificationPreferencePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first NotificationPreference that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationPreferenceFindFirstArgs} args - Arguments to find a NotificationPreference
     * @example
     * // Get one NotificationPreference
     * const notificationPreference = await prisma.notificationPreference.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NotificationPreferenceFindFirstArgs>(args?: SelectSubset<T, NotificationPreferenceFindFirstArgs<ExtArgs>>): Prisma__NotificationPreferenceClient<$Result.GetResult<Prisma.$NotificationPreferencePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first NotificationPreference that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationPreferenceFindFirstOrThrowArgs} args - Arguments to find a NotificationPreference
     * @example
     * // Get one NotificationPreference
     * const notificationPreference = await prisma.notificationPreference.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NotificationPreferenceFindFirstOrThrowArgs>(args?: SelectSubset<T, NotificationPreferenceFindFirstOrThrowArgs<ExtArgs>>): Prisma__NotificationPreferenceClient<$Result.GetResult<Prisma.$NotificationPreferencePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more NotificationPreferences that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationPreferenceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all NotificationPreferences
     * const notificationPreferences = await prisma.notificationPreference.findMany()
     * 
     * // Get first 10 NotificationPreferences
     * const notificationPreferences = await prisma.notificationPreference.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const notificationPreferenceWithIdOnly = await prisma.notificationPreference.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NotificationPreferenceFindManyArgs>(args?: SelectSubset<T, NotificationPreferenceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPreferencePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a NotificationPreference.
     * @param {NotificationPreferenceCreateArgs} args - Arguments to create a NotificationPreference.
     * @example
     * // Create one NotificationPreference
     * const NotificationPreference = await prisma.notificationPreference.create({
     *   data: {
     *     // ... data to create a NotificationPreference
     *   }
     * })
     * 
     */
    create<T extends NotificationPreferenceCreateArgs>(args: SelectSubset<T, NotificationPreferenceCreateArgs<ExtArgs>>): Prisma__NotificationPreferenceClient<$Result.GetResult<Prisma.$NotificationPreferencePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many NotificationPreferences.
     * @param {NotificationPreferenceCreateManyArgs} args - Arguments to create many NotificationPreferences.
     * @example
     * // Create many NotificationPreferences
     * const notificationPreference = await prisma.notificationPreference.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NotificationPreferenceCreateManyArgs>(args?: SelectSubset<T, NotificationPreferenceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many NotificationPreferences and returns the data saved in the database.
     * @param {NotificationPreferenceCreateManyAndReturnArgs} args - Arguments to create many NotificationPreferences.
     * @example
     * // Create many NotificationPreferences
     * const notificationPreference = await prisma.notificationPreference.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many NotificationPreferences and only return the `id`
     * const notificationPreferenceWithIdOnly = await prisma.notificationPreference.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NotificationPreferenceCreateManyAndReturnArgs>(args?: SelectSubset<T, NotificationPreferenceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPreferencePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a NotificationPreference.
     * @param {NotificationPreferenceDeleteArgs} args - Arguments to delete one NotificationPreference.
     * @example
     * // Delete one NotificationPreference
     * const NotificationPreference = await prisma.notificationPreference.delete({
     *   where: {
     *     // ... filter to delete one NotificationPreference
     *   }
     * })
     * 
     */
    delete<T extends NotificationPreferenceDeleteArgs>(args: SelectSubset<T, NotificationPreferenceDeleteArgs<ExtArgs>>): Prisma__NotificationPreferenceClient<$Result.GetResult<Prisma.$NotificationPreferencePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one NotificationPreference.
     * @param {NotificationPreferenceUpdateArgs} args - Arguments to update one NotificationPreference.
     * @example
     * // Update one NotificationPreference
     * const notificationPreference = await prisma.notificationPreference.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NotificationPreferenceUpdateArgs>(args: SelectSubset<T, NotificationPreferenceUpdateArgs<ExtArgs>>): Prisma__NotificationPreferenceClient<$Result.GetResult<Prisma.$NotificationPreferencePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more NotificationPreferences.
     * @param {NotificationPreferenceDeleteManyArgs} args - Arguments to filter NotificationPreferences to delete.
     * @example
     * // Delete a few NotificationPreferences
     * const { count } = await prisma.notificationPreference.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NotificationPreferenceDeleteManyArgs>(args?: SelectSubset<T, NotificationPreferenceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more NotificationPreferences.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationPreferenceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many NotificationPreferences
     * const notificationPreference = await prisma.notificationPreference.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NotificationPreferenceUpdateManyArgs>(args: SelectSubset<T, NotificationPreferenceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more NotificationPreferences and returns the data updated in the database.
     * @param {NotificationPreferenceUpdateManyAndReturnArgs} args - Arguments to update many NotificationPreferences.
     * @example
     * // Update many NotificationPreferences
     * const notificationPreference = await prisma.notificationPreference.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more NotificationPreferences and only return the `id`
     * const notificationPreferenceWithIdOnly = await prisma.notificationPreference.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends NotificationPreferenceUpdateManyAndReturnArgs>(args: SelectSubset<T, NotificationPreferenceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPreferencePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one NotificationPreference.
     * @param {NotificationPreferenceUpsertArgs} args - Arguments to update or create a NotificationPreference.
     * @example
     * // Update or create a NotificationPreference
     * const notificationPreference = await prisma.notificationPreference.upsert({
     *   create: {
     *     // ... data to create a NotificationPreference
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the NotificationPreference we want to update
     *   }
     * })
     */
    upsert<T extends NotificationPreferenceUpsertArgs>(args: SelectSubset<T, NotificationPreferenceUpsertArgs<ExtArgs>>): Prisma__NotificationPreferenceClient<$Result.GetResult<Prisma.$NotificationPreferencePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of NotificationPreferences.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationPreferenceCountArgs} args - Arguments to filter NotificationPreferences to count.
     * @example
     * // Count the number of NotificationPreferences
     * const count = await prisma.notificationPreference.count({
     *   where: {
     *     // ... the filter for the NotificationPreferences we want to count
     *   }
     * })
    **/
    count<T extends NotificationPreferenceCountArgs>(
      args?: Subset<T, NotificationPreferenceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NotificationPreferenceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a NotificationPreference.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationPreferenceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NotificationPreferenceAggregateArgs>(args: Subset<T, NotificationPreferenceAggregateArgs>): Prisma.PrismaPromise<GetNotificationPreferenceAggregateType<T>>

    /**
     * Group by NotificationPreference.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationPreferenceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NotificationPreferenceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NotificationPreferenceGroupByArgs['orderBy'] }
        : { orderBy?: NotificationPreferenceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NotificationPreferenceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNotificationPreferenceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the NotificationPreference model
   */
  readonly fields: NotificationPreferenceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for NotificationPreference.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NotificationPreferenceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the NotificationPreference model
   */
  interface NotificationPreferenceFieldRefs {
    readonly id: FieldRef<"NotificationPreference", 'String'>
    readonly userId: FieldRef<"NotificationPreference", 'String'>
    readonly enableSwaps: FieldRef<"NotificationPreference", 'Boolean'>
    readonly enableTransfers: FieldRef<"NotificationPreference", 'Boolean'>
    readonly enableApprovals: FieldRef<"NotificationPreference", 'Boolean'>
    readonly enableMemecoinsOnly: FieldRef<"NotificationPreference", 'Boolean'>
    readonly minValueThreshold: FieldRef<"NotificationPreference", 'Float'>
    readonly quietHours: FieldRef<"NotificationPreference", 'Boolean'>
    readonly quietHoursStart: FieldRef<"NotificationPreference", 'String'>
    readonly quietHoursEnd: FieldRef<"NotificationPreference", 'String'>
    readonly createdAt: FieldRef<"NotificationPreference", 'DateTime'>
    readonly updatedAt: FieldRef<"NotificationPreference", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * NotificationPreference findUnique
   */
  export type NotificationPreferenceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationPreference
     */
    select?: NotificationPreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationPreference
     */
    omit?: NotificationPreferenceOmit<ExtArgs> | null
    /**
     * Filter, which NotificationPreference to fetch.
     */
    where: NotificationPreferenceWhereUniqueInput
  }

  /**
   * NotificationPreference findUniqueOrThrow
   */
  export type NotificationPreferenceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationPreference
     */
    select?: NotificationPreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationPreference
     */
    omit?: NotificationPreferenceOmit<ExtArgs> | null
    /**
     * Filter, which NotificationPreference to fetch.
     */
    where: NotificationPreferenceWhereUniqueInput
  }

  /**
   * NotificationPreference findFirst
   */
  export type NotificationPreferenceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationPreference
     */
    select?: NotificationPreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationPreference
     */
    omit?: NotificationPreferenceOmit<ExtArgs> | null
    /**
     * Filter, which NotificationPreference to fetch.
     */
    where?: NotificationPreferenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NotificationPreferences to fetch.
     */
    orderBy?: NotificationPreferenceOrderByWithRelationInput | NotificationPreferenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NotificationPreferences.
     */
    cursor?: NotificationPreferenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NotificationPreferences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NotificationPreferences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NotificationPreferences.
     */
    distinct?: NotificationPreferenceScalarFieldEnum | NotificationPreferenceScalarFieldEnum[]
  }

  /**
   * NotificationPreference findFirstOrThrow
   */
  export type NotificationPreferenceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationPreference
     */
    select?: NotificationPreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationPreference
     */
    omit?: NotificationPreferenceOmit<ExtArgs> | null
    /**
     * Filter, which NotificationPreference to fetch.
     */
    where?: NotificationPreferenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NotificationPreferences to fetch.
     */
    orderBy?: NotificationPreferenceOrderByWithRelationInput | NotificationPreferenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NotificationPreferences.
     */
    cursor?: NotificationPreferenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NotificationPreferences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NotificationPreferences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NotificationPreferences.
     */
    distinct?: NotificationPreferenceScalarFieldEnum | NotificationPreferenceScalarFieldEnum[]
  }

  /**
   * NotificationPreference findMany
   */
  export type NotificationPreferenceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationPreference
     */
    select?: NotificationPreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationPreference
     */
    omit?: NotificationPreferenceOmit<ExtArgs> | null
    /**
     * Filter, which NotificationPreferences to fetch.
     */
    where?: NotificationPreferenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NotificationPreferences to fetch.
     */
    orderBy?: NotificationPreferenceOrderByWithRelationInput | NotificationPreferenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing NotificationPreferences.
     */
    cursor?: NotificationPreferenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NotificationPreferences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NotificationPreferences.
     */
    skip?: number
    distinct?: NotificationPreferenceScalarFieldEnum | NotificationPreferenceScalarFieldEnum[]
  }

  /**
   * NotificationPreference create
   */
  export type NotificationPreferenceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationPreference
     */
    select?: NotificationPreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationPreference
     */
    omit?: NotificationPreferenceOmit<ExtArgs> | null
    /**
     * The data needed to create a NotificationPreference.
     */
    data: XOR<NotificationPreferenceCreateInput, NotificationPreferenceUncheckedCreateInput>
  }

  /**
   * NotificationPreference createMany
   */
  export type NotificationPreferenceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many NotificationPreferences.
     */
    data: NotificationPreferenceCreateManyInput | NotificationPreferenceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * NotificationPreference createManyAndReturn
   */
  export type NotificationPreferenceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationPreference
     */
    select?: NotificationPreferenceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationPreference
     */
    omit?: NotificationPreferenceOmit<ExtArgs> | null
    /**
     * The data used to create many NotificationPreferences.
     */
    data: NotificationPreferenceCreateManyInput | NotificationPreferenceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * NotificationPreference update
   */
  export type NotificationPreferenceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationPreference
     */
    select?: NotificationPreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationPreference
     */
    omit?: NotificationPreferenceOmit<ExtArgs> | null
    /**
     * The data needed to update a NotificationPreference.
     */
    data: XOR<NotificationPreferenceUpdateInput, NotificationPreferenceUncheckedUpdateInput>
    /**
     * Choose, which NotificationPreference to update.
     */
    where: NotificationPreferenceWhereUniqueInput
  }

  /**
   * NotificationPreference updateMany
   */
  export type NotificationPreferenceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update NotificationPreferences.
     */
    data: XOR<NotificationPreferenceUpdateManyMutationInput, NotificationPreferenceUncheckedUpdateManyInput>
    /**
     * Filter which NotificationPreferences to update
     */
    where?: NotificationPreferenceWhereInput
    /**
     * Limit how many NotificationPreferences to update.
     */
    limit?: number
  }

  /**
   * NotificationPreference updateManyAndReturn
   */
  export type NotificationPreferenceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationPreference
     */
    select?: NotificationPreferenceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationPreference
     */
    omit?: NotificationPreferenceOmit<ExtArgs> | null
    /**
     * The data used to update NotificationPreferences.
     */
    data: XOR<NotificationPreferenceUpdateManyMutationInput, NotificationPreferenceUncheckedUpdateManyInput>
    /**
     * Filter which NotificationPreferences to update
     */
    where?: NotificationPreferenceWhereInput
    /**
     * Limit how many NotificationPreferences to update.
     */
    limit?: number
  }

  /**
   * NotificationPreference upsert
   */
  export type NotificationPreferenceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationPreference
     */
    select?: NotificationPreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationPreference
     */
    omit?: NotificationPreferenceOmit<ExtArgs> | null
    /**
     * The filter to search for the NotificationPreference to update in case it exists.
     */
    where: NotificationPreferenceWhereUniqueInput
    /**
     * In case the NotificationPreference found by the `where` argument doesn't exist, create a new NotificationPreference with this data.
     */
    create: XOR<NotificationPreferenceCreateInput, NotificationPreferenceUncheckedCreateInput>
    /**
     * In case the NotificationPreference was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NotificationPreferenceUpdateInput, NotificationPreferenceUncheckedUpdateInput>
  }

  /**
   * NotificationPreference delete
   */
  export type NotificationPreferenceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationPreference
     */
    select?: NotificationPreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationPreference
     */
    omit?: NotificationPreferenceOmit<ExtArgs> | null
    /**
     * Filter which NotificationPreference to delete.
     */
    where: NotificationPreferenceWhereUniqueInput
  }

  /**
   * NotificationPreference deleteMany
   */
  export type NotificationPreferenceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NotificationPreferences to delete
     */
    where?: NotificationPreferenceWhereInput
    /**
     * Limit how many NotificationPreferences to delete.
     */
    limit?: number
  }

  /**
   * NotificationPreference without action
   */
  export type NotificationPreferenceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationPreference
     */
    select?: NotificationPreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationPreference
     */
    omit?: NotificationPreferenceOmit<ExtArgs> | null
  }


  /**
   * Model NotificationLog
   */

  export type AggregateNotificationLog = {
    _count: NotificationLogCountAggregateOutputType | null
    _avg: NotificationLogAvgAggregateOutputType | null
    _sum: NotificationLogSumAggregateOutputType | null
    _min: NotificationLogMinAggregateOutputType | null
    _max: NotificationLogMaxAggregateOutputType | null
  }

  export type NotificationLogAvgAggregateOutputType = {
    retryCount: number | null
    maxRetries: number | null
  }

  export type NotificationLogSumAggregateOutputType = {
    retryCount: number | null
    maxRetries: number | null
  }

  export type NotificationLogMinAggregateOutputType = {
    id: string | null
    userId: string | null
    telegramChatId: string | null
    channel: string | null
    messageType: string | null
    message: string | null
    status: string | null
    retryCount: number | null
    maxRetries: number | null
    txHash: string | null
    error: string | null
    sentAt: Date | null
    createdAt: Date | null
  }

  export type NotificationLogMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    telegramChatId: string | null
    channel: string | null
    messageType: string | null
    message: string | null
    status: string | null
    retryCount: number | null
    maxRetries: number | null
    txHash: string | null
    error: string | null
    sentAt: Date | null
    createdAt: Date | null
  }

  export type NotificationLogCountAggregateOutputType = {
    id: number
    userId: number
    telegramChatId: number
    channel: number
    messageType: number
    message: number
    metadata: number
    status: number
    retryCount: number
    maxRetries: number
    txHash: number
    error: number
    sentAt: number
    createdAt: number
    _all: number
  }


  export type NotificationLogAvgAggregateInputType = {
    retryCount?: true
    maxRetries?: true
  }

  export type NotificationLogSumAggregateInputType = {
    retryCount?: true
    maxRetries?: true
  }

  export type NotificationLogMinAggregateInputType = {
    id?: true
    userId?: true
    telegramChatId?: true
    channel?: true
    messageType?: true
    message?: true
    status?: true
    retryCount?: true
    maxRetries?: true
    txHash?: true
    error?: true
    sentAt?: true
    createdAt?: true
  }

  export type NotificationLogMaxAggregateInputType = {
    id?: true
    userId?: true
    telegramChatId?: true
    channel?: true
    messageType?: true
    message?: true
    status?: true
    retryCount?: true
    maxRetries?: true
    txHash?: true
    error?: true
    sentAt?: true
    createdAt?: true
  }

  export type NotificationLogCountAggregateInputType = {
    id?: true
    userId?: true
    telegramChatId?: true
    channel?: true
    messageType?: true
    message?: true
    metadata?: true
    status?: true
    retryCount?: true
    maxRetries?: true
    txHash?: true
    error?: true
    sentAt?: true
    createdAt?: true
    _all?: true
  }

  export type NotificationLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NotificationLog to aggregate.
     */
    where?: NotificationLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NotificationLogs to fetch.
     */
    orderBy?: NotificationLogOrderByWithRelationInput | NotificationLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NotificationLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NotificationLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NotificationLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned NotificationLogs
    **/
    _count?: true | NotificationLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: NotificationLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: NotificationLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NotificationLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NotificationLogMaxAggregateInputType
  }

  export type GetNotificationLogAggregateType<T extends NotificationLogAggregateArgs> = {
        [P in keyof T & keyof AggregateNotificationLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNotificationLog[P]>
      : GetScalarType<T[P], AggregateNotificationLog[P]>
  }




  export type NotificationLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationLogWhereInput
    orderBy?: NotificationLogOrderByWithAggregationInput | NotificationLogOrderByWithAggregationInput[]
    by: NotificationLogScalarFieldEnum[] | NotificationLogScalarFieldEnum
    having?: NotificationLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NotificationLogCountAggregateInputType | true
    _avg?: NotificationLogAvgAggregateInputType
    _sum?: NotificationLogSumAggregateInputType
    _min?: NotificationLogMinAggregateInputType
    _max?: NotificationLogMaxAggregateInputType
  }

  export type NotificationLogGroupByOutputType = {
    id: string
    userId: string
    telegramChatId: string | null
    channel: string
    messageType: string
    message: string
    metadata: JsonValue | null
    status: string
    retryCount: number
    maxRetries: number
    txHash: string | null
    error: string | null
    sentAt: Date | null
    createdAt: Date
    _count: NotificationLogCountAggregateOutputType | null
    _avg: NotificationLogAvgAggregateOutputType | null
    _sum: NotificationLogSumAggregateOutputType | null
    _min: NotificationLogMinAggregateOutputType | null
    _max: NotificationLogMaxAggregateOutputType | null
  }

  type GetNotificationLogGroupByPayload<T extends NotificationLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NotificationLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NotificationLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NotificationLogGroupByOutputType[P]>
            : GetScalarType<T[P], NotificationLogGroupByOutputType[P]>
        }
      >
    >


  export type NotificationLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    telegramChatId?: boolean
    channel?: boolean
    messageType?: boolean
    message?: boolean
    metadata?: boolean
    status?: boolean
    retryCount?: boolean
    maxRetries?: boolean
    txHash?: boolean
    error?: boolean
    sentAt?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["notificationLog"]>

  export type NotificationLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    telegramChatId?: boolean
    channel?: boolean
    messageType?: boolean
    message?: boolean
    metadata?: boolean
    status?: boolean
    retryCount?: boolean
    maxRetries?: boolean
    txHash?: boolean
    error?: boolean
    sentAt?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["notificationLog"]>

  export type NotificationLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    telegramChatId?: boolean
    channel?: boolean
    messageType?: boolean
    message?: boolean
    metadata?: boolean
    status?: boolean
    retryCount?: boolean
    maxRetries?: boolean
    txHash?: boolean
    error?: boolean
    sentAt?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["notificationLog"]>

  export type NotificationLogSelectScalar = {
    id?: boolean
    userId?: boolean
    telegramChatId?: boolean
    channel?: boolean
    messageType?: boolean
    message?: boolean
    metadata?: boolean
    status?: boolean
    retryCount?: boolean
    maxRetries?: boolean
    txHash?: boolean
    error?: boolean
    sentAt?: boolean
    createdAt?: boolean
  }

  export type NotificationLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "telegramChatId" | "channel" | "messageType" | "message" | "metadata" | "status" | "retryCount" | "maxRetries" | "txHash" | "error" | "sentAt" | "createdAt", ExtArgs["result"]["notificationLog"]>

  export type $NotificationLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "NotificationLog"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      telegramChatId: string | null
      channel: string
      messageType: string
      message: string
      metadata: Prisma.JsonValue | null
      status: string
      retryCount: number
      maxRetries: number
      txHash: string | null
      error: string | null
      sentAt: Date | null
      createdAt: Date
    }, ExtArgs["result"]["notificationLog"]>
    composites: {}
  }

  type NotificationLogGetPayload<S extends boolean | null | undefined | NotificationLogDefaultArgs> = $Result.GetResult<Prisma.$NotificationLogPayload, S>

  type NotificationLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<NotificationLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NotificationLogCountAggregateInputType | true
    }

  export interface NotificationLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['NotificationLog'], meta: { name: 'NotificationLog' } }
    /**
     * Find zero or one NotificationLog that matches the filter.
     * @param {NotificationLogFindUniqueArgs} args - Arguments to find a NotificationLog
     * @example
     * // Get one NotificationLog
     * const notificationLog = await prisma.notificationLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NotificationLogFindUniqueArgs>(args: SelectSubset<T, NotificationLogFindUniqueArgs<ExtArgs>>): Prisma__NotificationLogClient<$Result.GetResult<Prisma.$NotificationLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one NotificationLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {NotificationLogFindUniqueOrThrowArgs} args - Arguments to find a NotificationLog
     * @example
     * // Get one NotificationLog
     * const notificationLog = await prisma.notificationLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NotificationLogFindUniqueOrThrowArgs>(args: SelectSubset<T, NotificationLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NotificationLogClient<$Result.GetResult<Prisma.$NotificationLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first NotificationLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationLogFindFirstArgs} args - Arguments to find a NotificationLog
     * @example
     * // Get one NotificationLog
     * const notificationLog = await prisma.notificationLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NotificationLogFindFirstArgs>(args?: SelectSubset<T, NotificationLogFindFirstArgs<ExtArgs>>): Prisma__NotificationLogClient<$Result.GetResult<Prisma.$NotificationLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first NotificationLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationLogFindFirstOrThrowArgs} args - Arguments to find a NotificationLog
     * @example
     * // Get one NotificationLog
     * const notificationLog = await prisma.notificationLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NotificationLogFindFirstOrThrowArgs>(args?: SelectSubset<T, NotificationLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__NotificationLogClient<$Result.GetResult<Prisma.$NotificationLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more NotificationLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all NotificationLogs
     * const notificationLogs = await prisma.notificationLog.findMany()
     * 
     * // Get first 10 NotificationLogs
     * const notificationLogs = await prisma.notificationLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const notificationLogWithIdOnly = await prisma.notificationLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NotificationLogFindManyArgs>(args?: SelectSubset<T, NotificationLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a NotificationLog.
     * @param {NotificationLogCreateArgs} args - Arguments to create a NotificationLog.
     * @example
     * // Create one NotificationLog
     * const NotificationLog = await prisma.notificationLog.create({
     *   data: {
     *     // ... data to create a NotificationLog
     *   }
     * })
     * 
     */
    create<T extends NotificationLogCreateArgs>(args: SelectSubset<T, NotificationLogCreateArgs<ExtArgs>>): Prisma__NotificationLogClient<$Result.GetResult<Prisma.$NotificationLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many NotificationLogs.
     * @param {NotificationLogCreateManyArgs} args - Arguments to create many NotificationLogs.
     * @example
     * // Create many NotificationLogs
     * const notificationLog = await prisma.notificationLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NotificationLogCreateManyArgs>(args?: SelectSubset<T, NotificationLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many NotificationLogs and returns the data saved in the database.
     * @param {NotificationLogCreateManyAndReturnArgs} args - Arguments to create many NotificationLogs.
     * @example
     * // Create many NotificationLogs
     * const notificationLog = await prisma.notificationLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many NotificationLogs and only return the `id`
     * const notificationLogWithIdOnly = await prisma.notificationLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NotificationLogCreateManyAndReturnArgs>(args?: SelectSubset<T, NotificationLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a NotificationLog.
     * @param {NotificationLogDeleteArgs} args - Arguments to delete one NotificationLog.
     * @example
     * // Delete one NotificationLog
     * const NotificationLog = await prisma.notificationLog.delete({
     *   where: {
     *     // ... filter to delete one NotificationLog
     *   }
     * })
     * 
     */
    delete<T extends NotificationLogDeleteArgs>(args: SelectSubset<T, NotificationLogDeleteArgs<ExtArgs>>): Prisma__NotificationLogClient<$Result.GetResult<Prisma.$NotificationLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one NotificationLog.
     * @param {NotificationLogUpdateArgs} args - Arguments to update one NotificationLog.
     * @example
     * // Update one NotificationLog
     * const notificationLog = await prisma.notificationLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NotificationLogUpdateArgs>(args: SelectSubset<T, NotificationLogUpdateArgs<ExtArgs>>): Prisma__NotificationLogClient<$Result.GetResult<Prisma.$NotificationLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more NotificationLogs.
     * @param {NotificationLogDeleteManyArgs} args - Arguments to filter NotificationLogs to delete.
     * @example
     * // Delete a few NotificationLogs
     * const { count } = await prisma.notificationLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NotificationLogDeleteManyArgs>(args?: SelectSubset<T, NotificationLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more NotificationLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many NotificationLogs
     * const notificationLog = await prisma.notificationLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NotificationLogUpdateManyArgs>(args: SelectSubset<T, NotificationLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more NotificationLogs and returns the data updated in the database.
     * @param {NotificationLogUpdateManyAndReturnArgs} args - Arguments to update many NotificationLogs.
     * @example
     * // Update many NotificationLogs
     * const notificationLog = await prisma.notificationLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more NotificationLogs and only return the `id`
     * const notificationLogWithIdOnly = await prisma.notificationLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends NotificationLogUpdateManyAndReturnArgs>(args: SelectSubset<T, NotificationLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one NotificationLog.
     * @param {NotificationLogUpsertArgs} args - Arguments to update or create a NotificationLog.
     * @example
     * // Update or create a NotificationLog
     * const notificationLog = await prisma.notificationLog.upsert({
     *   create: {
     *     // ... data to create a NotificationLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the NotificationLog we want to update
     *   }
     * })
     */
    upsert<T extends NotificationLogUpsertArgs>(args: SelectSubset<T, NotificationLogUpsertArgs<ExtArgs>>): Prisma__NotificationLogClient<$Result.GetResult<Prisma.$NotificationLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of NotificationLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationLogCountArgs} args - Arguments to filter NotificationLogs to count.
     * @example
     * // Count the number of NotificationLogs
     * const count = await prisma.notificationLog.count({
     *   where: {
     *     // ... the filter for the NotificationLogs we want to count
     *   }
     * })
    **/
    count<T extends NotificationLogCountArgs>(
      args?: Subset<T, NotificationLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NotificationLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a NotificationLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NotificationLogAggregateArgs>(args: Subset<T, NotificationLogAggregateArgs>): Prisma.PrismaPromise<GetNotificationLogAggregateType<T>>

    /**
     * Group by NotificationLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NotificationLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NotificationLogGroupByArgs['orderBy'] }
        : { orderBy?: NotificationLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NotificationLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNotificationLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the NotificationLog model
   */
  readonly fields: NotificationLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for NotificationLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NotificationLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the NotificationLog model
   */
  interface NotificationLogFieldRefs {
    readonly id: FieldRef<"NotificationLog", 'String'>
    readonly userId: FieldRef<"NotificationLog", 'String'>
    readonly telegramChatId: FieldRef<"NotificationLog", 'String'>
    readonly channel: FieldRef<"NotificationLog", 'String'>
    readonly messageType: FieldRef<"NotificationLog", 'String'>
    readonly message: FieldRef<"NotificationLog", 'String'>
    readonly metadata: FieldRef<"NotificationLog", 'Json'>
    readonly status: FieldRef<"NotificationLog", 'String'>
    readonly retryCount: FieldRef<"NotificationLog", 'Int'>
    readonly maxRetries: FieldRef<"NotificationLog", 'Int'>
    readonly txHash: FieldRef<"NotificationLog", 'String'>
    readonly error: FieldRef<"NotificationLog", 'String'>
    readonly sentAt: FieldRef<"NotificationLog", 'DateTime'>
    readonly createdAt: FieldRef<"NotificationLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * NotificationLog findUnique
   */
  export type NotificationLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationLog
     */
    select?: NotificationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationLog
     */
    omit?: NotificationLogOmit<ExtArgs> | null
    /**
     * Filter, which NotificationLog to fetch.
     */
    where: NotificationLogWhereUniqueInput
  }

  /**
   * NotificationLog findUniqueOrThrow
   */
  export type NotificationLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationLog
     */
    select?: NotificationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationLog
     */
    omit?: NotificationLogOmit<ExtArgs> | null
    /**
     * Filter, which NotificationLog to fetch.
     */
    where: NotificationLogWhereUniqueInput
  }

  /**
   * NotificationLog findFirst
   */
  export type NotificationLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationLog
     */
    select?: NotificationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationLog
     */
    omit?: NotificationLogOmit<ExtArgs> | null
    /**
     * Filter, which NotificationLog to fetch.
     */
    where?: NotificationLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NotificationLogs to fetch.
     */
    orderBy?: NotificationLogOrderByWithRelationInput | NotificationLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NotificationLogs.
     */
    cursor?: NotificationLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NotificationLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NotificationLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NotificationLogs.
     */
    distinct?: NotificationLogScalarFieldEnum | NotificationLogScalarFieldEnum[]
  }

  /**
   * NotificationLog findFirstOrThrow
   */
  export type NotificationLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationLog
     */
    select?: NotificationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationLog
     */
    omit?: NotificationLogOmit<ExtArgs> | null
    /**
     * Filter, which NotificationLog to fetch.
     */
    where?: NotificationLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NotificationLogs to fetch.
     */
    orderBy?: NotificationLogOrderByWithRelationInput | NotificationLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NotificationLogs.
     */
    cursor?: NotificationLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NotificationLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NotificationLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NotificationLogs.
     */
    distinct?: NotificationLogScalarFieldEnum | NotificationLogScalarFieldEnum[]
  }

  /**
   * NotificationLog findMany
   */
  export type NotificationLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationLog
     */
    select?: NotificationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationLog
     */
    omit?: NotificationLogOmit<ExtArgs> | null
    /**
     * Filter, which NotificationLogs to fetch.
     */
    where?: NotificationLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NotificationLogs to fetch.
     */
    orderBy?: NotificationLogOrderByWithRelationInput | NotificationLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing NotificationLogs.
     */
    cursor?: NotificationLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NotificationLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NotificationLogs.
     */
    skip?: number
    distinct?: NotificationLogScalarFieldEnum | NotificationLogScalarFieldEnum[]
  }

  /**
   * NotificationLog create
   */
  export type NotificationLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationLog
     */
    select?: NotificationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationLog
     */
    omit?: NotificationLogOmit<ExtArgs> | null
    /**
     * The data needed to create a NotificationLog.
     */
    data: XOR<NotificationLogCreateInput, NotificationLogUncheckedCreateInput>
  }

  /**
   * NotificationLog createMany
   */
  export type NotificationLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many NotificationLogs.
     */
    data: NotificationLogCreateManyInput | NotificationLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * NotificationLog createManyAndReturn
   */
  export type NotificationLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationLog
     */
    select?: NotificationLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationLog
     */
    omit?: NotificationLogOmit<ExtArgs> | null
    /**
     * The data used to create many NotificationLogs.
     */
    data: NotificationLogCreateManyInput | NotificationLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * NotificationLog update
   */
  export type NotificationLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationLog
     */
    select?: NotificationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationLog
     */
    omit?: NotificationLogOmit<ExtArgs> | null
    /**
     * The data needed to update a NotificationLog.
     */
    data: XOR<NotificationLogUpdateInput, NotificationLogUncheckedUpdateInput>
    /**
     * Choose, which NotificationLog to update.
     */
    where: NotificationLogWhereUniqueInput
  }

  /**
   * NotificationLog updateMany
   */
  export type NotificationLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update NotificationLogs.
     */
    data: XOR<NotificationLogUpdateManyMutationInput, NotificationLogUncheckedUpdateManyInput>
    /**
     * Filter which NotificationLogs to update
     */
    where?: NotificationLogWhereInput
    /**
     * Limit how many NotificationLogs to update.
     */
    limit?: number
  }

  /**
   * NotificationLog updateManyAndReturn
   */
  export type NotificationLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationLog
     */
    select?: NotificationLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationLog
     */
    omit?: NotificationLogOmit<ExtArgs> | null
    /**
     * The data used to update NotificationLogs.
     */
    data: XOR<NotificationLogUpdateManyMutationInput, NotificationLogUncheckedUpdateManyInput>
    /**
     * Filter which NotificationLogs to update
     */
    where?: NotificationLogWhereInput
    /**
     * Limit how many NotificationLogs to update.
     */
    limit?: number
  }

  /**
   * NotificationLog upsert
   */
  export type NotificationLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationLog
     */
    select?: NotificationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationLog
     */
    omit?: NotificationLogOmit<ExtArgs> | null
    /**
     * The filter to search for the NotificationLog to update in case it exists.
     */
    where: NotificationLogWhereUniqueInput
    /**
     * In case the NotificationLog found by the `where` argument doesn't exist, create a new NotificationLog with this data.
     */
    create: XOR<NotificationLogCreateInput, NotificationLogUncheckedCreateInput>
    /**
     * In case the NotificationLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NotificationLogUpdateInput, NotificationLogUncheckedUpdateInput>
  }

  /**
   * NotificationLog delete
   */
  export type NotificationLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationLog
     */
    select?: NotificationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationLog
     */
    omit?: NotificationLogOmit<ExtArgs> | null
    /**
     * Filter which NotificationLog to delete.
     */
    where: NotificationLogWhereUniqueInput
  }

  /**
   * NotificationLog deleteMany
   */
  export type NotificationLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NotificationLogs to delete
     */
    where?: NotificationLogWhereInput
    /**
     * Limit how many NotificationLogs to delete.
     */
    limit?: number
  }

  /**
   * NotificationLog without action
   */
  export type NotificationLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationLog
     */
    select?: NotificationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationLog
     */
    omit?: NotificationLogOmit<ExtArgs> | null
  }


  /**
   * Model NotificationQueue
   */

  export type AggregateNotificationQueue = {
    _count: NotificationQueueCountAggregateOutputType | null
    _avg: NotificationQueueAvgAggregateOutputType | null
    _sum: NotificationQueueSumAggregateOutputType | null
    _min: NotificationQueueMinAggregateOutputType | null
    _max: NotificationQueueMaxAggregateOutputType | null
  }

  export type NotificationQueueAvgAggregateOutputType = {
    attempts: number | null
    maxAttempts: number | null
  }

  export type NotificationQueueSumAggregateOutputType = {
    attempts: number | null
    maxAttempts: number | null
  }

  export type NotificationQueueMinAggregateOutputType = {
    id: string | null
    userId: string | null
    telegramChatId: string | null
    message: string | null
    parseMode: string | null
    priority: string | null
    attempts: number | null
    maxAttempts: number | null
    status: string | null
    scheduledFor: Date | null
    processedAt: Date | null
    error: string | null
    txHash: string | null
    createdAt: Date | null
  }

  export type NotificationQueueMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    telegramChatId: string | null
    message: string | null
    parseMode: string | null
    priority: string | null
    attempts: number | null
    maxAttempts: number | null
    status: string | null
    scheduledFor: Date | null
    processedAt: Date | null
    error: string | null
    txHash: string | null
    createdAt: Date | null
  }

  export type NotificationQueueCountAggregateOutputType = {
    id: number
    userId: number
    telegramChatId: number
    message: number
    parseMode: number
    keyboard: number
    priority: number
    attempts: number
    maxAttempts: number
    status: number
    scheduledFor: number
    processedAt: number
    error: number
    txHash: number
    createdAt: number
    _all: number
  }


  export type NotificationQueueAvgAggregateInputType = {
    attempts?: true
    maxAttempts?: true
  }

  export type NotificationQueueSumAggregateInputType = {
    attempts?: true
    maxAttempts?: true
  }

  export type NotificationQueueMinAggregateInputType = {
    id?: true
    userId?: true
    telegramChatId?: true
    message?: true
    parseMode?: true
    priority?: true
    attempts?: true
    maxAttempts?: true
    status?: true
    scheduledFor?: true
    processedAt?: true
    error?: true
    txHash?: true
    createdAt?: true
  }

  export type NotificationQueueMaxAggregateInputType = {
    id?: true
    userId?: true
    telegramChatId?: true
    message?: true
    parseMode?: true
    priority?: true
    attempts?: true
    maxAttempts?: true
    status?: true
    scheduledFor?: true
    processedAt?: true
    error?: true
    txHash?: true
    createdAt?: true
  }

  export type NotificationQueueCountAggregateInputType = {
    id?: true
    userId?: true
    telegramChatId?: true
    message?: true
    parseMode?: true
    keyboard?: true
    priority?: true
    attempts?: true
    maxAttempts?: true
    status?: true
    scheduledFor?: true
    processedAt?: true
    error?: true
    txHash?: true
    createdAt?: true
    _all?: true
  }

  export type NotificationQueueAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NotificationQueue to aggregate.
     */
    where?: NotificationQueueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NotificationQueues to fetch.
     */
    orderBy?: NotificationQueueOrderByWithRelationInput | NotificationQueueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NotificationQueueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NotificationQueues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NotificationQueues.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned NotificationQueues
    **/
    _count?: true | NotificationQueueCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: NotificationQueueAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: NotificationQueueSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NotificationQueueMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NotificationQueueMaxAggregateInputType
  }

  export type GetNotificationQueueAggregateType<T extends NotificationQueueAggregateArgs> = {
        [P in keyof T & keyof AggregateNotificationQueue]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNotificationQueue[P]>
      : GetScalarType<T[P], AggregateNotificationQueue[P]>
  }




  export type NotificationQueueGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationQueueWhereInput
    orderBy?: NotificationQueueOrderByWithAggregationInput | NotificationQueueOrderByWithAggregationInput[]
    by: NotificationQueueScalarFieldEnum[] | NotificationQueueScalarFieldEnum
    having?: NotificationQueueScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NotificationQueueCountAggregateInputType | true
    _avg?: NotificationQueueAvgAggregateInputType
    _sum?: NotificationQueueSumAggregateInputType
    _min?: NotificationQueueMinAggregateInputType
    _max?: NotificationQueueMaxAggregateInputType
  }

  export type NotificationQueueGroupByOutputType = {
    id: string
    userId: string
    telegramChatId: string
    message: string
    parseMode: string
    keyboard: JsonValue | null
    priority: string
    attempts: number
    maxAttempts: number
    status: string
    scheduledFor: Date
    processedAt: Date | null
    error: string | null
    txHash: string | null
    createdAt: Date
    _count: NotificationQueueCountAggregateOutputType | null
    _avg: NotificationQueueAvgAggregateOutputType | null
    _sum: NotificationQueueSumAggregateOutputType | null
    _min: NotificationQueueMinAggregateOutputType | null
    _max: NotificationQueueMaxAggregateOutputType | null
  }

  type GetNotificationQueueGroupByPayload<T extends NotificationQueueGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NotificationQueueGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NotificationQueueGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NotificationQueueGroupByOutputType[P]>
            : GetScalarType<T[P], NotificationQueueGroupByOutputType[P]>
        }
      >
    >


  export type NotificationQueueSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    telegramChatId?: boolean
    message?: boolean
    parseMode?: boolean
    keyboard?: boolean
    priority?: boolean
    attempts?: boolean
    maxAttempts?: boolean
    status?: boolean
    scheduledFor?: boolean
    processedAt?: boolean
    error?: boolean
    txHash?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["notificationQueue"]>

  export type NotificationQueueSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    telegramChatId?: boolean
    message?: boolean
    parseMode?: boolean
    keyboard?: boolean
    priority?: boolean
    attempts?: boolean
    maxAttempts?: boolean
    status?: boolean
    scheduledFor?: boolean
    processedAt?: boolean
    error?: boolean
    txHash?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["notificationQueue"]>

  export type NotificationQueueSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    telegramChatId?: boolean
    message?: boolean
    parseMode?: boolean
    keyboard?: boolean
    priority?: boolean
    attempts?: boolean
    maxAttempts?: boolean
    status?: boolean
    scheduledFor?: boolean
    processedAt?: boolean
    error?: boolean
    txHash?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["notificationQueue"]>

  export type NotificationQueueSelectScalar = {
    id?: boolean
    userId?: boolean
    telegramChatId?: boolean
    message?: boolean
    parseMode?: boolean
    keyboard?: boolean
    priority?: boolean
    attempts?: boolean
    maxAttempts?: boolean
    status?: boolean
    scheduledFor?: boolean
    processedAt?: boolean
    error?: boolean
    txHash?: boolean
    createdAt?: boolean
  }

  export type NotificationQueueOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "telegramChatId" | "message" | "parseMode" | "keyboard" | "priority" | "attempts" | "maxAttempts" | "status" | "scheduledFor" | "processedAt" | "error" | "txHash" | "createdAt", ExtArgs["result"]["notificationQueue"]>

  export type $NotificationQueuePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "NotificationQueue"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      telegramChatId: string
      message: string
      parseMode: string
      keyboard: Prisma.JsonValue | null
      priority: string
      attempts: number
      maxAttempts: number
      status: string
      scheduledFor: Date
      processedAt: Date | null
      error: string | null
      txHash: string | null
      createdAt: Date
    }, ExtArgs["result"]["notificationQueue"]>
    composites: {}
  }

  type NotificationQueueGetPayload<S extends boolean | null | undefined | NotificationQueueDefaultArgs> = $Result.GetResult<Prisma.$NotificationQueuePayload, S>

  type NotificationQueueCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<NotificationQueueFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NotificationQueueCountAggregateInputType | true
    }

  export interface NotificationQueueDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['NotificationQueue'], meta: { name: 'NotificationQueue' } }
    /**
     * Find zero or one NotificationQueue that matches the filter.
     * @param {NotificationQueueFindUniqueArgs} args - Arguments to find a NotificationQueue
     * @example
     * // Get one NotificationQueue
     * const notificationQueue = await prisma.notificationQueue.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NotificationQueueFindUniqueArgs>(args: SelectSubset<T, NotificationQueueFindUniqueArgs<ExtArgs>>): Prisma__NotificationQueueClient<$Result.GetResult<Prisma.$NotificationQueuePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one NotificationQueue that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {NotificationQueueFindUniqueOrThrowArgs} args - Arguments to find a NotificationQueue
     * @example
     * // Get one NotificationQueue
     * const notificationQueue = await prisma.notificationQueue.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NotificationQueueFindUniqueOrThrowArgs>(args: SelectSubset<T, NotificationQueueFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NotificationQueueClient<$Result.GetResult<Prisma.$NotificationQueuePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first NotificationQueue that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationQueueFindFirstArgs} args - Arguments to find a NotificationQueue
     * @example
     * // Get one NotificationQueue
     * const notificationQueue = await prisma.notificationQueue.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NotificationQueueFindFirstArgs>(args?: SelectSubset<T, NotificationQueueFindFirstArgs<ExtArgs>>): Prisma__NotificationQueueClient<$Result.GetResult<Prisma.$NotificationQueuePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first NotificationQueue that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationQueueFindFirstOrThrowArgs} args - Arguments to find a NotificationQueue
     * @example
     * // Get one NotificationQueue
     * const notificationQueue = await prisma.notificationQueue.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NotificationQueueFindFirstOrThrowArgs>(args?: SelectSubset<T, NotificationQueueFindFirstOrThrowArgs<ExtArgs>>): Prisma__NotificationQueueClient<$Result.GetResult<Prisma.$NotificationQueuePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more NotificationQueues that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationQueueFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all NotificationQueues
     * const notificationQueues = await prisma.notificationQueue.findMany()
     * 
     * // Get first 10 NotificationQueues
     * const notificationQueues = await prisma.notificationQueue.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const notificationQueueWithIdOnly = await prisma.notificationQueue.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NotificationQueueFindManyArgs>(args?: SelectSubset<T, NotificationQueueFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationQueuePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a NotificationQueue.
     * @param {NotificationQueueCreateArgs} args - Arguments to create a NotificationQueue.
     * @example
     * // Create one NotificationQueue
     * const NotificationQueue = await prisma.notificationQueue.create({
     *   data: {
     *     // ... data to create a NotificationQueue
     *   }
     * })
     * 
     */
    create<T extends NotificationQueueCreateArgs>(args: SelectSubset<T, NotificationQueueCreateArgs<ExtArgs>>): Prisma__NotificationQueueClient<$Result.GetResult<Prisma.$NotificationQueuePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many NotificationQueues.
     * @param {NotificationQueueCreateManyArgs} args - Arguments to create many NotificationQueues.
     * @example
     * // Create many NotificationQueues
     * const notificationQueue = await prisma.notificationQueue.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NotificationQueueCreateManyArgs>(args?: SelectSubset<T, NotificationQueueCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many NotificationQueues and returns the data saved in the database.
     * @param {NotificationQueueCreateManyAndReturnArgs} args - Arguments to create many NotificationQueues.
     * @example
     * // Create many NotificationQueues
     * const notificationQueue = await prisma.notificationQueue.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many NotificationQueues and only return the `id`
     * const notificationQueueWithIdOnly = await prisma.notificationQueue.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NotificationQueueCreateManyAndReturnArgs>(args?: SelectSubset<T, NotificationQueueCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationQueuePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a NotificationQueue.
     * @param {NotificationQueueDeleteArgs} args - Arguments to delete one NotificationQueue.
     * @example
     * // Delete one NotificationQueue
     * const NotificationQueue = await prisma.notificationQueue.delete({
     *   where: {
     *     // ... filter to delete one NotificationQueue
     *   }
     * })
     * 
     */
    delete<T extends NotificationQueueDeleteArgs>(args: SelectSubset<T, NotificationQueueDeleteArgs<ExtArgs>>): Prisma__NotificationQueueClient<$Result.GetResult<Prisma.$NotificationQueuePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one NotificationQueue.
     * @param {NotificationQueueUpdateArgs} args - Arguments to update one NotificationQueue.
     * @example
     * // Update one NotificationQueue
     * const notificationQueue = await prisma.notificationQueue.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NotificationQueueUpdateArgs>(args: SelectSubset<T, NotificationQueueUpdateArgs<ExtArgs>>): Prisma__NotificationQueueClient<$Result.GetResult<Prisma.$NotificationQueuePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more NotificationQueues.
     * @param {NotificationQueueDeleteManyArgs} args - Arguments to filter NotificationQueues to delete.
     * @example
     * // Delete a few NotificationQueues
     * const { count } = await prisma.notificationQueue.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NotificationQueueDeleteManyArgs>(args?: SelectSubset<T, NotificationQueueDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more NotificationQueues.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationQueueUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many NotificationQueues
     * const notificationQueue = await prisma.notificationQueue.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NotificationQueueUpdateManyArgs>(args: SelectSubset<T, NotificationQueueUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more NotificationQueues and returns the data updated in the database.
     * @param {NotificationQueueUpdateManyAndReturnArgs} args - Arguments to update many NotificationQueues.
     * @example
     * // Update many NotificationQueues
     * const notificationQueue = await prisma.notificationQueue.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more NotificationQueues and only return the `id`
     * const notificationQueueWithIdOnly = await prisma.notificationQueue.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends NotificationQueueUpdateManyAndReturnArgs>(args: SelectSubset<T, NotificationQueueUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationQueuePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one NotificationQueue.
     * @param {NotificationQueueUpsertArgs} args - Arguments to update or create a NotificationQueue.
     * @example
     * // Update or create a NotificationQueue
     * const notificationQueue = await prisma.notificationQueue.upsert({
     *   create: {
     *     // ... data to create a NotificationQueue
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the NotificationQueue we want to update
     *   }
     * })
     */
    upsert<T extends NotificationQueueUpsertArgs>(args: SelectSubset<T, NotificationQueueUpsertArgs<ExtArgs>>): Prisma__NotificationQueueClient<$Result.GetResult<Prisma.$NotificationQueuePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of NotificationQueues.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationQueueCountArgs} args - Arguments to filter NotificationQueues to count.
     * @example
     * // Count the number of NotificationQueues
     * const count = await prisma.notificationQueue.count({
     *   where: {
     *     // ... the filter for the NotificationQueues we want to count
     *   }
     * })
    **/
    count<T extends NotificationQueueCountArgs>(
      args?: Subset<T, NotificationQueueCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NotificationQueueCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a NotificationQueue.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationQueueAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NotificationQueueAggregateArgs>(args: Subset<T, NotificationQueueAggregateArgs>): Prisma.PrismaPromise<GetNotificationQueueAggregateType<T>>

    /**
     * Group by NotificationQueue.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationQueueGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NotificationQueueGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NotificationQueueGroupByArgs['orderBy'] }
        : { orderBy?: NotificationQueueGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NotificationQueueGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNotificationQueueGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the NotificationQueue model
   */
  readonly fields: NotificationQueueFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for NotificationQueue.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NotificationQueueClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the NotificationQueue model
   */
  interface NotificationQueueFieldRefs {
    readonly id: FieldRef<"NotificationQueue", 'String'>
    readonly userId: FieldRef<"NotificationQueue", 'String'>
    readonly telegramChatId: FieldRef<"NotificationQueue", 'String'>
    readonly message: FieldRef<"NotificationQueue", 'String'>
    readonly parseMode: FieldRef<"NotificationQueue", 'String'>
    readonly keyboard: FieldRef<"NotificationQueue", 'Json'>
    readonly priority: FieldRef<"NotificationQueue", 'String'>
    readonly attempts: FieldRef<"NotificationQueue", 'Int'>
    readonly maxAttempts: FieldRef<"NotificationQueue", 'Int'>
    readonly status: FieldRef<"NotificationQueue", 'String'>
    readonly scheduledFor: FieldRef<"NotificationQueue", 'DateTime'>
    readonly processedAt: FieldRef<"NotificationQueue", 'DateTime'>
    readonly error: FieldRef<"NotificationQueue", 'String'>
    readonly txHash: FieldRef<"NotificationQueue", 'String'>
    readonly createdAt: FieldRef<"NotificationQueue", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * NotificationQueue findUnique
   */
  export type NotificationQueueFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationQueue
     */
    select?: NotificationQueueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationQueue
     */
    omit?: NotificationQueueOmit<ExtArgs> | null
    /**
     * Filter, which NotificationQueue to fetch.
     */
    where: NotificationQueueWhereUniqueInput
  }

  /**
   * NotificationQueue findUniqueOrThrow
   */
  export type NotificationQueueFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationQueue
     */
    select?: NotificationQueueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationQueue
     */
    omit?: NotificationQueueOmit<ExtArgs> | null
    /**
     * Filter, which NotificationQueue to fetch.
     */
    where: NotificationQueueWhereUniqueInput
  }

  /**
   * NotificationQueue findFirst
   */
  export type NotificationQueueFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationQueue
     */
    select?: NotificationQueueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationQueue
     */
    omit?: NotificationQueueOmit<ExtArgs> | null
    /**
     * Filter, which NotificationQueue to fetch.
     */
    where?: NotificationQueueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NotificationQueues to fetch.
     */
    orderBy?: NotificationQueueOrderByWithRelationInput | NotificationQueueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NotificationQueues.
     */
    cursor?: NotificationQueueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NotificationQueues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NotificationQueues.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NotificationQueues.
     */
    distinct?: NotificationQueueScalarFieldEnum | NotificationQueueScalarFieldEnum[]
  }

  /**
   * NotificationQueue findFirstOrThrow
   */
  export type NotificationQueueFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationQueue
     */
    select?: NotificationQueueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationQueue
     */
    omit?: NotificationQueueOmit<ExtArgs> | null
    /**
     * Filter, which NotificationQueue to fetch.
     */
    where?: NotificationQueueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NotificationQueues to fetch.
     */
    orderBy?: NotificationQueueOrderByWithRelationInput | NotificationQueueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NotificationQueues.
     */
    cursor?: NotificationQueueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NotificationQueues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NotificationQueues.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NotificationQueues.
     */
    distinct?: NotificationQueueScalarFieldEnum | NotificationQueueScalarFieldEnum[]
  }

  /**
   * NotificationQueue findMany
   */
  export type NotificationQueueFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationQueue
     */
    select?: NotificationQueueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationQueue
     */
    omit?: NotificationQueueOmit<ExtArgs> | null
    /**
     * Filter, which NotificationQueues to fetch.
     */
    where?: NotificationQueueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NotificationQueues to fetch.
     */
    orderBy?: NotificationQueueOrderByWithRelationInput | NotificationQueueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing NotificationQueues.
     */
    cursor?: NotificationQueueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NotificationQueues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NotificationQueues.
     */
    skip?: number
    distinct?: NotificationQueueScalarFieldEnum | NotificationQueueScalarFieldEnum[]
  }

  /**
   * NotificationQueue create
   */
  export type NotificationQueueCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationQueue
     */
    select?: NotificationQueueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationQueue
     */
    omit?: NotificationQueueOmit<ExtArgs> | null
    /**
     * The data needed to create a NotificationQueue.
     */
    data: XOR<NotificationQueueCreateInput, NotificationQueueUncheckedCreateInput>
  }

  /**
   * NotificationQueue createMany
   */
  export type NotificationQueueCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many NotificationQueues.
     */
    data: NotificationQueueCreateManyInput | NotificationQueueCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * NotificationQueue createManyAndReturn
   */
  export type NotificationQueueCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationQueue
     */
    select?: NotificationQueueSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationQueue
     */
    omit?: NotificationQueueOmit<ExtArgs> | null
    /**
     * The data used to create many NotificationQueues.
     */
    data: NotificationQueueCreateManyInput | NotificationQueueCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * NotificationQueue update
   */
  export type NotificationQueueUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationQueue
     */
    select?: NotificationQueueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationQueue
     */
    omit?: NotificationQueueOmit<ExtArgs> | null
    /**
     * The data needed to update a NotificationQueue.
     */
    data: XOR<NotificationQueueUpdateInput, NotificationQueueUncheckedUpdateInput>
    /**
     * Choose, which NotificationQueue to update.
     */
    where: NotificationQueueWhereUniqueInput
  }

  /**
   * NotificationQueue updateMany
   */
  export type NotificationQueueUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update NotificationQueues.
     */
    data: XOR<NotificationQueueUpdateManyMutationInput, NotificationQueueUncheckedUpdateManyInput>
    /**
     * Filter which NotificationQueues to update
     */
    where?: NotificationQueueWhereInput
    /**
     * Limit how many NotificationQueues to update.
     */
    limit?: number
  }

  /**
   * NotificationQueue updateManyAndReturn
   */
  export type NotificationQueueUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationQueue
     */
    select?: NotificationQueueSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationQueue
     */
    omit?: NotificationQueueOmit<ExtArgs> | null
    /**
     * The data used to update NotificationQueues.
     */
    data: XOR<NotificationQueueUpdateManyMutationInput, NotificationQueueUncheckedUpdateManyInput>
    /**
     * Filter which NotificationQueues to update
     */
    where?: NotificationQueueWhereInput
    /**
     * Limit how many NotificationQueues to update.
     */
    limit?: number
  }

  /**
   * NotificationQueue upsert
   */
  export type NotificationQueueUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationQueue
     */
    select?: NotificationQueueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationQueue
     */
    omit?: NotificationQueueOmit<ExtArgs> | null
    /**
     * The filter to search for the NotificationQueue to update in case it exists.
     */
    where: NotificationQueueWhereUniqueInput
    /**
     * In case the NotificationQueue found by the `where` argument doesn't exist, create a new NotificationQueue with this data.
     */
    create: XOR<NotificationQueueCreateInput, NotificationQueueUncheckedCreateInput>
    /**
     * In case the NotificationQueue was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NotificationQueueUpdateInput, NotificationQueueUncheckedUpdateInput>
  }

  /**
   * NotificationQueue delete
   */
  export type NotificationQueueDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationQueue
     */
    select?: NotificationQueueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationQueue
     */
    omit?: NotificationQueueOmit<ExtArgs> | null
    /**
     * Filter which NotificationQueue to delete.
     */
    where: NotificationQueueWhereUniqueInput
  }

  /**
   * NotificationQueue deleteMany
   */
  export type NotificationQueueDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NotificationQueues to delete
     */
    where?: NotificationQueueWhereInput
    /**
     * Limit how many NotificationQueues to delete.
     */
    limit?: number
  }

  /**
   * NotificationQueue without action
   */
  export type NotificationQueueDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationQueue
     */
    select?: NotificationQueueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationQueue
     */
    omit?: NotificationQueueOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const NotificationPreferenceScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    enableSwaps: 'enableSwaps',
    enableTransfers: 'enableTransfers',
    enableApprovals: 'enableApprovals',
    enableMemecoinsOnly: 'enableMemecoinsOnly',
    minValueThreshold: 'minValueThreshold',
    quietHours: 'quietHours',
    quietHoursStart: 'quietHoursStart',
    quietHoursEnd: 'quietHoursEnd',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type NotificationPreferenceScalarFieldEnum = (typeof NotificationPreferenceScalarFieldEnum)[keyof typeof NotificationPreferenceScalarFieldEnum]


  export const NotificationLogScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    telegramChatId: 'telegramChatId',
    channel: 'channel',
    messageType: 'messageType',
    message: 'message',
    metadata: 'metadata',
    status: 'status',
    retryCount: 'retryCount',
    maxRetries: 'maxRetries',
    txHash: 'txHash',
    error: 'error',
    sentAt: 'sentAt',
    createdAt: 'createdAt'
  };

  export type NotificationLogScalarFieldEnum = (typeof NotificationLogScalarFieldEnum)[keyof typeof NotificationLogScalarFieldEnum]


  export const NotificationQueueScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    telegramChatId: 'telegramChatId',
    message: 'message',
    parseMode: 'parseMode',
    keyboard: 'keyboard',
    priority: 'priority',
    attempts: 'attempts',
    maxAttempts: 'maxAttempts',
    status: 'status',
    scheduledFor: 'scheduledFor',
    processedAt: 'processedAt',
    error: 'error',
    txHash: 'txHash',
    createdAt: 'createdAt'
  };

  export type NotificationQueueScalarFieldEnum = (typeof NotificationQueueScalarFieldEnum)[keyof typeof NotificationQueueScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type NotificationPreferenceWhereInput = {
    AND?: NotificationPreferenceWhereInput | NotificationPreferenceWhereInput[]
    OR?: NotificationPreferenceWhereInput[]
    NOT?: NotificationPreferenceWhereInput | NotificationPreferenceWhereInput[]
    id?: StringFilter<"NotificationPreference"> | string
    userId?: StringFilter<"NotificationPreference"> | string
    enableSwaps?: BoolFilter<"NotificationPreference"> | boolean
    enableTransfers?: BoolFilter<"NotificationPreference"> | boolean
    enableApprovals?: BoolFilter<"NotificationPreference"> | boolean
    enableMemecoinsOnly?: BoolFilter<"NotificationPreference"> | boolean
    minValueThreshold?: FloatNullableFilter<"NotificationPreference"> | number | null
    quietHours?: BoolFilter<"NotificationPreference"> | boolean
    quietHoursStart?: StringNullableFilter<"NotificationPreference"> | string | null
    quietHoursEnd?: StringNullableFilter<"NotificationPreference"> | string | null
    createdAt?: DateTimeFilter<"NotificationPreference"> | Date | string
    updatedAt?: DateTimeFilter<"NotificationPreference"> | Date | string
  }

  export type NotificationPreferenceOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    enableSwaps?: SortOrder
    enableTransfers?: SortOrder
    enableApprovals?: SortOrder
    enableMemecoinsOnly?: SortOrder
    minValueThreshold?: SortOrderInput | SortOrder
    quietHours?: SortOrder
    quietHoursStart?: SortOrderInput | SortOrder
    quietHoursEnd?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NotificationPreferenceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: NotificationPreferenceWhereInput | NotificationPreferenceWhereInput[]
    OR?: NotificationPreferenceWhereInput[]
    NOT?: NotificationPreferenceWhereInput | NotificationPreferenceWhereInput[]
    enableSwaps?: BoolFilter<"NotificationPreference"> | boolean
    enableTransfers?: BoolFilter<"NotificationPreference"> | boolean
    enableApprovals?: BoolFilter<"NotificationPreference"> | boolean
    enableMemecoinsOnly?: BoolFilter<"NotificationPreference"> | boolean
    minValueThreshold?: FloatNullableFilter<"NotificationPreference"> | number | null
    quietHours?: BoolFilter<"NotificationPreference"> | boolean
    quietHoursStart?: StringNullableFilter<"NotificationPreference"> | string | null
    quietHoursEnd?: StringNullableFilter<"NotificationPreference"> | string | null
    createdAt?: DateTimeFilter<"NotificationPreference"> | Date | string
    updatedAt?: DateTimeFilter<"NotificationPreference"> | Date | string
  }, "id" | "userId">

  export type NotificationPreferenceOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    enableSwaps?: SortOrder
    enableTransfers?: SortOrder
    enableApprovals?: SortOrder
    enableMemecoinsOnly?: SortOrder
    minValueThreshold?: SortOrderInput | SortOrder
    quietHours?: SortOrder
    quietHoursStart?: SortOrderInput | SortOrder
    quietHoursEnd?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: NotificationPreferenceCountOrderByAggregateInput
    _avg?: NotificationPreferenceAvgOrderByAggregateInput
    _max?: NotificationPreferenceMaxOrderByAggregateInput
    _min?: NotificationPreferenceMinOrderByAggregateInput
    _sum?: NotificationPreferenceSumOrderByAggregateInput
  }

  export type NotificationPreferenceScalarWhereWithAggregatesInput = {
    AND?: NotificationPreferenceScalarWhereWithAggregatesInput | NotificationPreferenceScalarWhereWithAggregatesInput[]
    OR?: NotificationPreferenceScalarWhereWithAggregatesInput[]
    NOT?: NotificationPreferenceScalarWhereWithAggregatesInput | NotificationPreferenceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"NotificationPreference"> | string
    userId?: StringWithAggregatesFilter<"NotificationPreference"> | string
    enableSwaps?: BoolWithAggregatesFilter<"NotificationPreference"> | boolean
    enableTransfers?: BoolWithAggregatesFilter<"NotificationPreference"> | boolean
    enableApprovals?: BoolWithAggregatesFilter<"NotificationPreference"> | boolean
    enableMemecoinsOnly?: BoolWithAggregatesFilter<"NotificationPreference"> | boolean
    minValueThreshold?: FloatNullableWithAggregatesFilter<"NotificationPreference"> | number | null
    quietHours?: BoolWithAggregatesFilter<"NotificationPreference"> | boolean
    quietHoursStart?: StringNullableWithAggregatesFilter<"NotificationPreference"> | string | null
    quietHoursEnd?: StringNullableWithAggregatesFilter<"NotificationPreference"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"NotificationPreference"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"NotificationPreference"> | Date | string
  }

  export type NotificationLogWhereInput = {
    AND?: NotificationLogWhereInput | NotificationLogWhereInput[]
    OR?: NotificationLogWhereInput[]
    NOT?: NotificationLogWhereInput | NotificationLogWhereInput[]
    id?: StringFilter<"NotificationLog"> | string
    userId?: StringFilter<"NotificationLog"> | string
    telegramChatId?: StringNullableFilter<"NotificationLog"> | string | null
    channel?: StringFilter<"NotificationLog"> | string
    messageType?: StringFilter<"NotificationLog"> | string
    message?: StringFilter<"NotificationLog"> | string
    metadata?: JsonNullableFilter<"NotificationLog">
    status?: StringFilter<"NotificationLog"> | string
    retryCount?: IntFilter<"NotificationLog"> | number
    maxRetries?: IntFilter<"NotificationLog"> | number
    txHash?: StringNullableFilter<"NotificationLog"> | string | null
    error?: StringNullableFilter<"NotificationLog"> | string | null
    sentAt?: DateTimeNullableFilter<"NotificationLog"> | Date | string | null
    createdAt?: DateTimeFilter<"NotificationLog"> | Date | string
  }

  export type NotificationLogOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    telegramChatId?: SortOrderInput | SortOrder
    channel?: SortOrder
    messageType?: SortOrder
    message?: SortOrder
    metadata?: SortOrderInput | SortOrder
    status?: SortOrder
    retryCount?: SortOrder
    maxRetries?: SortOrder
    txHash?: SortOrderInput | SortOrder
    error?: SortOrderInput | SortOrder
    sentAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type NotificationLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: NotificationLogWhereInput | NotificationLogWhereInput[]
    OR?: NotificationLogWhereInput[]
    NOT?: NotificationLogWhereInput | NotificationLogWhereInput[]
    userId?: StringFilter<"NotificationLog"> | string
    telegramChatId?: StringNullableFilter<"NotificationLog"> | string | null
    channel?: StringFilter<"NotificationLog"> | string
    messageType?: StringFilter<"NotificationLog"> | string
    message?: StringFilter<"NotificationLog"> | string
    metadata?: JsonNullableFilter<"NotificationLog">
    status?: StringFilter<"NotificationLog"> | string
    retryCount?: IntFilter<"NotificationLog"> | number
    maxRetries?: IntFilter<"NotificationLog"> | number
    txHash?: StringNullableFilter<"NotificationLog"> | string | null
    error?: StringNullableFilter<"NotificationLog"> | string | null
    sentAt?: DateTimeNullableFilter<"NotificationLog"> | Date | string | null
    createdAt?: DateTimeFilter<"NotificationLog"> | Date | string
  }, "id">

  export type NotificationLogOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    telegramChatId?: SortOrderInput | SortOrder
    channel?: SortOrder
    messageType?: SortOrder
    message?: SortOrder
    metadata?: SortOrderInput | SortOrder
    status?: SortOrder
    retryCount?: SortOrder
    maxRetries?: SortOrder
    txHash?: SortOrderInput | SortOrder
    error?: SortOrderInput | SortOrder
    sentAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: NotificationLogCountOrderByAggregateInput
    _avg?: NotificationLogAvgOrderByAggregateInput
    _max?: NotificationLogMaxOrderByAggregateInput
    _min?: NotificationLogMinOrderByAggregateInput
    _sum?: NotificationLogSumOrderByAggregateInput
  }

  export type NotificationLogScalarWhereWithAggregatesInput = {
    AND?: NotificationLogScalarWhereWithAggregatesInput | NotificationLogScalarWhereWithAggregatesInput[]
    OR?: NotificationLogScalarWhereWithAggregatesInput[]
    NOT?: NotificationLogScalarWhereWithAggregatesInput | NotificationLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"NotificationLog"> | string
    userId?: StringWithAggregatesFilter<"NotificationLog"> | string
    telegramChatId?: StringNullableWithAggregatesFilter<"NotificationLog"> | string | null
    channel?: StringWithAggregatesFilter<"NotificationLog"> | string
    messageType?: StringWithAggregatesFilter<"NotificationLog"> | string
    message?: StringWithAggregatesFilter<"NotificationLog"> | string
    metadata?: JsonNullableWithAggregatesFilter<"NotificationLog">
    status?: StringWithAggregatesFilter<"NotificationLog"> | string
    retryCount?: IntWithAggregatesFilter<"NotificationLog"> | number
    maxRetries?: IntWithAggregatesFilter<"NotificationLog"> | number
    txHash?: StringNullableWithAggregatesFilter<"NotificationLog"> | string | null
    error?: StringNullableWithAggregatesFilter<"NotificationLog"> | string | null
    sentAt?: DateTimeNullableWithAggregatesFilter<"NotificationLog"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"NotificationLog"> | Date | string
  }

  export type NotificationQueueWhereInput = {
    AND?: NotificationQueueWhereInput | NotificationQueueWhereInput[]
    OR?: NotificationQueueWhereInput[]
    NOT?: NotificationQueueWhereInput | NotificationQueueWhereInput[]
    id?: StringFilter<"NotificationQueue"> | string
    userId?: StringFilter<"NotificationQueue"> | string
    telegramChatId?: StringFilter<"NotificationQueue"> | string
    message?: StringFilter<"NotificationQueue"> | string
    parseMode?: StringFilter<"NotificationQueue"> | string
    keyboard?: JsonNullableFilter<"NotificationQueue">
    priority?: StringFilter<"NotificationQueue"> | string
    attempts?: IntFilter<"NotificationQueue"> | number
    maxAttempts?: IntFilter<"NotificationQueue"> | number
    status?: StringFilter<"NotificationQueue"> | string
    scheduledFor?: DateTimeFilter<"NotificationQueue"> | Date | string
    processedAt?: DateTimeNullableFilter<"NotificationQueue"> | Date | string | null
    error?: StringNullableFilter<"NotificationQueue"> | string | null
    txHash?: StringNullableFilter<"NotificationQueue"> | string | null
    createdAt?: DateTimeFilter<"NotificationQueue"> | Date | string
  }

  export type NotificationQueueOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    telegramChatId?: SortOrder
    message?: SortOrder
    parseMode?: SortOrder
    keyboard?: SortOrderInput | SortOrder
    priority?: SortOrder
    attempts?: SortOrder
    maxAttempts?: SortOrder
    status?: SortOrder
    scheduledFor?: SortOrder
    processedAt?: SortOrderInput | SortOrder
    error?: SortOrderInput | SortOrder
    txHash?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type NotificationQueueWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: NotificationQueueWhereInput | NotificationQueueWhereInput[]
    OR?: NotificationQueueWhereInput[]
    NOT?: NotificationQueueWhereInput | NotificationQueueWhereInput[]
    userId?: StringFilter<"NotificationQueue"> | string
    telegramChatId?: StringFilter<"NotificationQueue"> | string
    message?: StringFilter<"NotificationQueue"> | string
    parseMode?: StringFilter<"NotificationQueue"> | string
    keyboard?: JsonNullableFilter<"NotificationQueue">
    priority?: StringFilter<"NotificationQueue"> | string
    attempts?: IntFilter<"NotificationQueue"> | number
    maxAttempts?: IntFilter<"NotificationQueue"> | number
    status?: StringFilter<"NotificationQueue"> | string
    scheduledFor?: DateTimeFilter<"NotificationQueue"> | Date | string
    processedAt?: DateTimeNullableFilter<"NotificationQueue"> | Date | string | null
    error?: StringNullableFilter<"NotificationQueue"> | string | null
    txHash?: StringNullableFilter<"NotificationQueue"> | string | null
    createdAt?: DateTimeFilter<"NotificationQueue"> | Date | string
  }, "id">

  export type NotificationQueueOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    telegramChatId?: SortOrder
    message?: SortOrder
    parseMode?: SortOrder
    keyboard?: SortOrderInput | SortOrder
    priority?: SortOrder
    attempts?: SortOrder
    maxAttempts?: SortOrder
    status?: SortOrder
    scheduledFor?: SortOrder
    processedAt?: SortOrderInput | SortOrder
    error?: SortOrderInput | SortOrder
    txHash?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: NotificationQueueCountOrderByAggregateInput
    _avg?: NotificationQueueAvgOrderByAggregateInput
    _max?: NotificationQueueMaxOrderByAggregateInput
    _min?: NotificationQueueMinOrderByAggregateInput
    _sum?: NotificationQueueSumOrderByAggregateInput
  }

  export type NotificationQueueScalarWhereWithAggregatesInput = {
    AND?: NotificationQueueScalarWhereWithAggregatesInput | NotificationQueueScalarWhereWithAggregatesInput[]
    OR?: NotificationQueueScalarWhereWithAggregatesInput[]
    NOT?: NotificationQueueScalarWhereWithAggregatesInput | NotificationQueueScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"NotificationQueue"> | string
    userId?: StringWithAggregatesFilter<"NotificationQueue"> | string
    telegramChatId?: StringWithAggregatesFilter<"NotificationQueue"> | string
    message?: StringWithAggregatesFilter<"NotificationQueue"> | string
    parseMode?: StringWithAggregatesFilter<"NotificationQueue"> | string
    keyboard?: JsonNullableWithAggregatesFilter<"NotificationQueue">
    priority?: StringWithAggregatesFilter<"NotificationQueue"> | string
    attempts?: IntWithAggregatesFilter<"NotificationQueue"> | number
    maxAttempts?: IntWithAggregatesFilter<"NotificationQueue"> | number
    status?: StringWithAggregatesFilter<"NotificationQueue"> | string
    scheduledFor?: DateTimeWithAggregatesFilter<"NotificationQueue"> | Date | string
    processedAt?: DateTimeNullableWithAggregatesFilter<"NotificationQueue"> | Date | string | null
    error?: StringNullableWithAggregatesFilter<"NotificationQueue"> | string | null
    txHash?: StringNullableWithAggregatesFilter<"NotificationQueue"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"NotificationQueue"> | Date | string
  }

  export type NotificationPreferenceCreateInput = {
    id?: string
    userId: string
    enableSwaps?: boolean
    enableTransfers?: boolean
    enableApprovals?: boolean
    enableMemecoinsOnly?: boolean
    minValueThreshold?: number | null
    quietHours?: boolean
    quietHoursStart?: string | null
    quietHoursEnd?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NotificationPreferenceUncheckedCreateInput = {
    id?: string
    userId: string
    enableSwaps?: boolean
    enableTransfers?: boolean
    enableApprovals?: boolean
    enableMemecoinsOnly?: boolean
    minValueThreshold?: number | null
    quietHours?: boolean
    quietHoursStart?: string | null
    quietHoursEnd?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NotificationPreferenceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    enableSwaps?: BoolFieldUpdateOperationsInput | boolean
    enableTransfers?: BoolFieldUpdateOperationsInput | boolean
    enableApprovals?: BoolFieldUpdateOperationsInput | boolean
    enableMemecoinsOnly?: BoolFieldUpdateOperationsInput | boolean
    minValueThreshold?: NullableFloatFieldUpdateOperationsInput | number | null
    quietHours?: BoolFieldUpdateOperationsInput | boolean
    quietHoursStart?: NullableStringFieldUpdateOperationsInput | string | null
    quietHoursEnd?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationPreferenceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    enableSwaps?: BoolFieldUpdateOperationsInput | boolean
    enableTransfers?: BoolFieldUpdateOperationsInput | boolean
    enableApprovals?: BoolFieldUpdateOperationsInput | boolean
    enableMemecoinsOnly?: BoolFieldUpdateOperationsInput | boolean
    minValueThreshold?: NullableFloatFieldUpdateOperationsInput | number | null
    quietHours?: BoolFieldUpdateOperationsInput | boolean
    quietHoursStart?: NullableStringFieldUpdateOperationsInput | string | null
    quietHoursEnd?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationPreferenceCreateManyInput = {
    id?: string
    userId: string
    enableSwaps?: boolean
    enableTransfers?: boolean
    enableApprovals?: boolean
    enableMemecoinsOnly?: boolean
    minValueThreshold?: number | null
    quietHours?: boolean
    quietHoursStart?: string | null
    quietHoursEnd?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NotificationPreferenceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    enableSwaps?: BoolFieldUpdateOperationsInput | boolean
    enableTransfers?: BoolFieldUpdateOperationsInput | boolean
    enableApprovals?: BoolFieldUpdateOperationsInput | boolean
    enableMemecoinsOnly?: BoolFieldUpdateOperationsInput | boolean
    minValueThreshold?: NullableFloatFieldUpdateOperationsInput | number | null
    quietHours?: BoolFieldUpdateOperationsInput | boolean
    quietHoursStart?: NullableStringFieldUpdateOperationsInput | string | null
    quietHoursEnd?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationPreferenceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    enableSwaps?: BoolFieldUpdateOperationsInput | boolean
    enableTransfers?: BoolFieldUpdateOperationsInput | boolean
    enableApprovals?: BoolFieldUpdateOperationsInput | boolean
    enableMemecoinsOnly?: BoolFieldUpdateOperationsInput | boolean
    minValueThreshold?: NullableFloatFieldUpdateOperationsInput | number | null
    quietHours?: BoolFieldUpdateOperationsInput | boolean
    quietHoursStart?: NullableStringFieldUpdateOperationsInput | string | null
    quietHoursEnd?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationLogCreateInput = {
    id?: string
    userId: string
    telegramChatId?: string | null
    channel: string
    messageType: string
    message: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    status: string
    retryCount?: number
    maxRetries?: number
    txHash?: string | null
    error?: string | null
    sentAt?: Date | string | null
    createdAt?: Date | string
  }

  export type NotificationLogUncheckedCreateInput = {
    id?: string
    userId: string
    telegramChatId?: string | null
    channel: string
    messageType: string
    message: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    status: string
    retryCount?: number
    maxRetries?: number
    txHash?: string | null
    error?: string | null
    sentAt?: Date | string | null
    createdAt?: Date | string
  }

  export type NotificationLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    telegramChatId?: NullableStringFieldUpdateOperationsInput | string | null
    channel?: StringFieldUpdateOperationsInput | string
    messageType?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    retryCount?: IntFieldUpdateOperationsInput | number
    maxRetries?: IntFieldUpdateOperationsInput | number
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    telegramChatId?: NullableStringFieldUpdateOperationsInput | string | null
    channel?: StringFieldUpdateOperationsInput | string
    messageType?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    retryCount?: IntFieldUpdateOperationsInput | number
    maxRetries?: IntFieldUpdateOperationsInput | number
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationLogCreateManyInput = {
    id?: string
    userId: string
    telegramChatId?: string | null
    channel: string
    messageType: string
    message: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    status: string
    retryCount?: number
    maxRetries?: number
    txHash?: string | null
    error?: string | null
    sentAt?: Date | string | null
    createdAt?: Date | string
  }

  export type NotificationLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    telegramChatId?: NullableStringFieldUpdateOperationsInput | string | null
    channel?: StringFieldUpdateOperationsInput | string
    messageType?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    retryCount?: IntFieldUpdateOperationsInput | number
    maxRetries?: IntFieldUpdateOperationsInput | number
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    telegramChatId?: NullableStringFieldUpdateOperationsInput | string | null
    channel?: StringFieldUpdateOperationsInput | string
    messageType?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    retryCount?: IntFieldUpdateOperationsInput | number
    maxRetries?: IntFieldUpdateOperationsInput | number
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationQueueCreateInput = {
    id?: string
    userId: string
    telegramChatId: string
    message: string
    parseMode?: string
    keyboard?: NullableJsonNullValueInput | InputJsonValue
    priority?: string
    attempts?: number
    maxAttempts?: number
    status?: string
    scheduledFor?: Date | string
    processedAt?: Date | string | null
    error?: string | null
    txHash?: string | null
    createdAt?: Date | string
  }

  export type NotificationQueueUncheckedCreateInput = {
    id?: string
    userId: string
    telegramChatId: string
    message: string
    parseMode?: string
    keyboard?: NullableJsonNullValueInput | InputJsonValue
    priority?: string
    attempts?: number
    maxAttempts?: number
    status?: string
    scheduledFor?: Date | string
    processedAt?: Date | string | null
    error?: string | null
    txHash?: string | null
    createdAt?: Date | string
  }

  export type NotificationQueueUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    telegramChatId?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    parseMode?: StringFieldUpdateOperationsInput | string
    keyboard?: NullableJsonNullValueInput | InputJsonValue
    priority?: StringFieldUpdateOperationsInput | string
    attempts?: IntFieldUpdateOperationsInput | number
    maxAttempts?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    scheduledFor?: DateTimeFieldUpdateOperationsInput | Date | string
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationQueueUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    telegramChatId?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    parseMode?: StringFieldUpdateOperationsInput | string
    keyboard?: NullableJsonNullValueInput | InputJsonValue
    priority?: StringFieldUpdateOperationsInput | string
    attempts?: IntFieldUpdateOperationsInput | number
    maxAttempts?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    scheduledFor?: DateTimeFieldUpdateOperationsInput | Date | string
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationQueueCreateManyInput = {
    id?: string
    userId: string
    telegramChatId: string
    message: string
    parseMode?: string
    keyboard?: NullableJsonNullValueInput | InputJsonValue
    priority?: string
    attempts?: number
    maxAttempts?: number
    status?: string
    scheduledFor?: Date | string
    processedAt?: Date | string | null
    error?: string | null
    txHash?: string | null
    createdAt?: Date | string
  }

  export type NotificationQueueUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    telegramChatId?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    parseMode?: StringFieldUpdateOperationsInput | string
    keyboard?: NullableJsonNullValueInput | InputJsonValue
    priority?: StringFieldUpdateOperationsInput | string
    attempts?: IntFieldUpdateOperationsInput | number
    maxAttempts?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    scheduledFor?: DateTimeFieldUpdateOperationsInput | Date | string
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationQueueUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    telegramChatId?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    parseMode?: StringFieldUpdateOperationsInput | string
    keyboard?: NullableJsonNullValueInput | InputJsonValue
    priority?: StringFieldUpdateOperationsInput | string
    attempts?: IntFieldUpdateOperationsInput | number
    maxAttempts?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    scheduledFor?: DateTimeFieldUpdateOperationsInput | Date | string
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type NotificationPreferenceCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    enableSwaps?: SortOrder
    enableTransfers?: SortOrder
    enableApprovals?: SortOrder
    enableMemecoinsOnly?: SortOrder
    minValueThreshold?: SortOrder
    quietHours?: SortOrder
    quietHoursStart?: SortOrder
    quietHoursEnd?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NotificationPreferenceAvgOrderByAggregateInput = {
    minValueThreshold?: SortOrder
  }

  export type NotificationPreferenceMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    enableSwaps?: SortOrder
    enableTransfers?: SortOrder
    enableApprovals?: SortOrder
    enableMemecoinsOnly?: SortOrder
    minValueThreshold?: SortOrder
    quietHours?: SortOrder
    quietHoursStart?: SortOrder
    quietHoursEnd?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NotificationPreferenceMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    enableSwaps?: SortOrder
    enableTransfers?: SortOrder
    enableApprovals?: SortOrder
    enableMemecoinsOnly?: SortOrder
    minValueThreshold?: SortOrder
    quietHours?: SortOrder
    quietHoursStart?: SortOrder
    quietHoursEnd?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NotificationPreferenceSumOrderByAggregateInput = {
    minValueThreshold?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NotificationLogCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    telegramChatId?: SortOrder
    channel?: SortOrder
    messageType?: SortOrder
    message?: SortOrder
    metadata?: SortOrder
    status?: SortOrder
    retryCount?: SortOrder
    maxRetries?: SortOrder
    txHash?: SortOrder
    error?: SortOrder
    sentAt?: SortOrder
    createdAt?: SortOrder
  }

  export type NotificationLogAvgOrderByAggregateInput = {
    retryCount?: SortOrder
    maxRetries?: SortOrder
  }

  export type NotificationLogMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    telegramChatId?: SortOrder
    channel?: SortOrder
    messageType?: SortOrder
    message?: SortOrder
    status?: SortOrder
    retryCount?: SortOrder
    maxRetries?: SortOrder
    txHash?: SortOrder
    error?: SortOrder
    sentAt?: SortOrder
    createdAt?: SortOrder
  }

  export type NotificationLogMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    telegramChatId?: SortOrder
    channel?: SortOrder
    messageType?: SortOrder
    message?: SortOrder
    status?: SortOrder
    retryCount?: SortOrder
    maxRetries?: SortOrder
    txHash?: SortOrder
    error?: SortOrder
    sentAt?: SortOrder
    createdAt?: SortOrder
  }

  export type NotificationLogSumOrderByAggregateInput = {
    retryCount?: SortOrder
    maxRetries?: SortOrder
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NotificationQueueCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    telegramChatId?: SortOrder
    message?: SortOrder
    parseMode?: SortOrder
    keyboard?: SortOrder
    priority?: SortOrder
    attempts?: SortOrder
    maxAttempts?: SortOrder
    status?: SortOrder
    scheduledFor?: SortOrder
    processedAt?: SortOrder
    error?: SortOrder
    txHash?: SortOrder
    createdAt?: SortOrder
  }

  export type NotificationQueueAvgOrderByAggregateInput = {
    attempts?: SortOrder
    maxAttempts?: SortOrder
  }

  export type NotificationQueueMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    telegramChatId?: SortOrder
    message?: SortOrder
    parseMode?: SortOrder
    priority?: SortOrder
    attempts?: SortOrder
    maxAttempts?: SortOrder
    status?: SortOrder
    scheduledFor?: SortOrder
    processedAt?: SortOrder
    error?: SortOrder
    txHash?: SortOrder
    createdAt?: SortOrder
  }

  export type NotificationQueueMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    telegramChatId?: SortOrder
    message?: SortOrder
    parseMode?: SortOrder
    priority?: SortOrder
    attempts?: SortOrder
    maxAttempts?: SortOrder
    status?: SortOrder
    scheduledFor?: SortOrder
    processedAt?: SortOrder
    error?: SortOrder
    txHash?: SortOrder
    createdAt?: SortOrder
  }

  export type NotificationQueueSumOrderByAggregateInput = {
    attempts?: SortOrder
    maxAttempts?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}