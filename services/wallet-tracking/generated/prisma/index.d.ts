
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
 * Model TrackedWallet
 * 
 */
export type TrackedWallet = $Result.DefaultSelection<Prisma.$TrackedWalletPayload>
/**
 * Model AlchemyWebhook
 * 
 */
export type AlchemyWebhook = $Result.DefaultSelection<Prisma.$AlchemyWebhookPayload>
/**
 * Model WebhookAddress
 * 
 */
export type WebhookAddress = $Result.DefaultSelection<Prisma.$WebhookAddressPayload>
/**
 * Model WalletTransaction
 * 
 */
export type WalletTransaction = $Result.DefaultSelection<Prisma.$WalletTransactionPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more TrackedWallets
 * const trackedWallets = await prisma.trackedWallet.findMany()
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
   * // Fetch zero or more TrackedWallets
   * const trackedWallets = await prisma.trackedWallet.findMany()
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
   * `prisma.trackedWallet`: Exposes CRUD operations for the **TrackedWallet** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TrackedWallets
    * const trackedWallets = await prisma.trackedWallet.findMany()
    * ```
    */
  get trackedWallet(): Prisma.TrackedWalletDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.alchemyWebhook`: Exposes CRUD operations for the **AlchemyWebhook** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AlchemyWebhooks
    * const alchemyWebhooks = await prisma.alchemyWebhook.findMany()
    * ```
    */
  get alchemyWebhook(): Prisma.AlchemyWebhookDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.webhookAddress`: Exposes CRUD operations for the **WebhookAddress** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WebhookAddresses
    * const webhookAddresses = await prisma.webhookAddress.findMany()
    * ```
    */
  get webhookAddress(): Prisma.WebhookAddressDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.walletTransaction`: Exposes CRUD operations for the **WalletTransaction** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WalletTransactions
    * const walletTransactions = await prisma.walletTransaction.findMany()
    * ```
    */
  get walletTransaction(): Prisma.WalletTransactionDelegate<ExtArgs, ClientOptions>;
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
    TrackedWallet: 'TrackedWallet',
    AlchemyWebhook: 'AlchemyWebhook',
    WebhookAddress: 'WebhookAddress',
    WalletTransaction: 'WalletTransaction'
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
      modelProps: "trackedWallet" | "alchemyWebhook" | "webhookAddress" | "walletTransaction"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      TrackedWallet: {
        payload: Prisma.$TrackedWalletPayload<ExtArgs>
        fields: Prisma.TrackedWalletFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TrackedWalletFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackedWalletPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TrackedWalletFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackedWalletPayload>
          }
          findFirst: {
            args: Prisma.TrackedWalletFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackedWalletPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TrackedWalletFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackedWalletPayload>
          }
          findMany: {
            args: Prisma.TrackedWalletFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackedWalletPayload>[]
          }
          create: {
            args: Prisma.TrackedWalletCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackedWalletPayload>
          }
          createMany: {
            args: Prisma.TrackedWalletCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TrackedWalletCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackedWalletPayload>[]
          }
          delete: {
            args: Prisma.TrackedWalletDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackedWalletPayload>
          }
          update: {
            args: Prisma.TrackedWalletUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackedWalletPayload>
          }
          deleteMany: {
            args: Prisma.TrackedWalletDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TrackedWalletUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TrackedWalletUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackedWalletPayload>[]
          }
          upsert: {
            args: Prisma.TrackedWalletUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackedWalletPayload>
          }
          aggregate: {
            args: Prisma.TrackedWalletAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTrackedWallet>
          }
          groupBy: {
            args: Prisma.TrackedWalletGroupByArgs<ExtArgs>
            result: $Utils.Optional<TrackedWalletGroupByOutputType>[]
          }
          count: {
            args: Prisma.TrackedWalletCountArgs<ExtArgs>
            result: $Utils.Optional<TrackedWalletCountAggregateOutputType> | number
          }
        }
      }
      AlchemyWebhook: {
        payload: Prisma.$AlchemyWebhookPayload<ExtArgs>
        fields: Prisma.AlchemyWebhookFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AlchemyWebhookFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlchemyWebhookPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AlchemyWebhookFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlchemyWebhookPayload>
          }
          findFirst: {
            args: Prisma.AlchemyWebhookFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlchemyWebhookPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AlchemyWebhookFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlchemyWebhookPayload>
          }
          findMany: {
            args: Prisma.AlchemyWebhookFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlchemyWebhookPayload>[]
          }
          create: {
            args: Prisma.AlchemyWebhookCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlchemyWebhookPayload>
          }
          createMany: {
            args: Prisma.AlchemyWebhookCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AlchemyWebhookCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlchemyWebhookPayload>[]
          }
          delete: {
            args: Prisma.AlchemyWebhookDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlchemyWebhookPayload>
          }
          update: {
            args: Prisma.AlchemyWebhookUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlchemyWebhookPayload>
          }
          deleteMany: {
            args: Prisma.AlchemyWebhookDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AlchemyWebhookUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AlchemyWebhookUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlchemyWebhookPayload>[]
          }
          upsert: {
            args: Prisma.AlchemyWebhookUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlchemyWebhookPayload>
          }
          aggregate: {
            args: Prisma.AlchemyWebhookAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAlchemyWebhook>
          }
          groupBy: {
            args: Prisma.AlchemyWebhookGroupByArgs<ExtArgs>
            result: $Utils.Optional<AlchemyWebhookGroupByOutputType>[]
          }
          count: {
            args: Prisma.AlchemyWebhookCountArgs<ExtArgs>
            result: $Utils.Optional<AlchemyWebhookCountAggregateOutputType> | number
          }
        }
      }
      WebhookAddress: {
        payload: Prisma.$WebhookAddressPayload<ExtArgs>
        fields: Prisma.WebhookAddressFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WebhookAddressFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookAddressPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WebhookAddressFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookAddressPayload>
          }
          findFirst: {
            args: Prisma.WebhookAddressFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookAddressPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WebhookAddressFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookAddressPayload>
          }
          findMany: {
            args: Prisma.WebhookAddressFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookAddressPayload>[]
          }
          create: {
            args: Prisma.WebhookAddressCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookAddressPayload>
          }
          createMany: {
            args: Prisma.WebhookAddressCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WebhookAddressCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookAddressPayload>[]
          }
          delete: {
            args: Prisma.WebhookAddressDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookAddressPayload>
          }
          update: {
            args: Prisma.WebhookAddressUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookAddressPayload>
          }
          deleteMany: {
            args: Prisma.WebhookAddressDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WebhookAddressUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WebhookAddressUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookAddressPayload>[]
          }
          upsert: {
            args: Prisma.WebhookAddressUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookAddressPayload>
          }
          aggregate: {
            args: Prisma.WebhookAddressAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWebhookAddress>
          }
          groupBy: {
            args: Prisma.WebhookAddressGroupByArgs<ExtArgs>
            result: $Utils.Optional<WebhookAddressGroupByOutputType>[]
          }
          count: {
            args: Prisma.WebhookAddressCountArgs<ExtArgs>
            result: $Utils.Optional<WebhookAddressCountAggregateOutputType> | number
          }
        }
      }
      WalletTransaction: {
        payload: Prisma.$WalletTransactionPayload<ExtArgs>
        fields: Prisma.WalletTransactionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WalletTransactionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletTransactionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WalletTransactionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletTransactionPayload>
          }
          findFirst: {
            args: Prisma.WalletTransactionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletTransactionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WalletTransactionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletTransactionPayload>
          }
          findMany: {
            args: Prisma.WalletTransactionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletTransactionPayload>[]
          }
          create: {
            args: Prisma.WalletTransactionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletTransactionPayload>
          }
          createMany: {
            args: Prisma.WalletTransactionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WalletTransactionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletTransactionPayload>[]
          }
          delete: {
            args: Prisma.WalletTransactionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletTransactionPayload>
          }
          update: {
            args: Prisma.WalletTransactionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletTransactionPayload>
          }
          deleteMany: {
            args: Prisma.WalletTransactionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WalletTransactionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WalletTransactionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletTransactionPayload>[]
          }
          upsert: {
            args: Prisma.WalletTransactionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletTransactionPayload>
          }
          aggregate: {
            args: Prisma.WalletTransactionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWalletTransaction>
          }
          groupBy: {
            args: Prisma.WalletTransactionGroupByArgs<ExtArgs>
            result: $Utils.Optional<WalletTransactionGroupByOutputType>[]
          }
          count: {
            args: Prisma.WalletTransactionCountArgs<ExtArgs>
            result: $Utils.Optional<WalletTransactionCountAggregateOutputType> | number
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
    trackedWallet?: TrackedWalletOmit
    alchemyWebhook?: AlchemyWebhookOmit
    webhookAddress?: WebhookAddressOmit
    walletTransaction?: WalletTransactionOmit
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
   * Model TrackedWallet
   */

  export type AggregateTrackedWallet = {
    _count: TrackedWalletCountAggregateOutputType | null
    _min: TrackedWalletMinAggregateOutputType | null
    _max: TrackedWalletMaxAggregateOutputType | null
  }

  export type TrackedWalletMinAggregateOutputType = {
    id: string | null
    address: string | null
    userId: string | null
    name: string | null
    groupName: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TrackedWalletMaxAggregateOutputType = {
    id: string | null
    address: string | null
    userId: string | null
    name: string | null
    groupName: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TrackedWalletCountAggregateOutputType = {
    id: number
    address: number
    userId: number
    name: number
    groupName: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TrackedWalletMinAggregateInputType = {
    id?: true
    address?: true
    userId?: true
    name?: true
    groupName?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TrackedWalletMaxAggregateInputType = {
    id?: true
    address?: true
    userId?: true
    name?: true
    groupName?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TrackedWalletCountAggregateInputType = {
    id?: true
    address?: true
    userId?: true
    name?: true
    groupName?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TrackedWalletAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TrackedWallet to aggregate.
     */
    where?: TrackedWalletWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TrackedWallets to fetch.
     */
    orderBy?: TrackedWalletOrderByWithRelationInput | TrackedWalletOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TrackedWalletWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TrackedWallets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TrackedWallets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TrackedWallets
    **/
    _count?: true | TrackedWalletCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TrackedWalletMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TrackedWalletMaxAggregateInputType
  }

  export type GetTrackedWalletAggregateType<T extends TrackedWalletAggregateArgs> = {
        [P in keyof T & keyof AggregateTrackedWallet]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTrackedWallet[P]>
      : GetScalarType<T[P], AggregateTrackedWallet[P]>
  }




  export type TrackedWalletGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TrackedWalletWhereInput
    orderBy?: TrackedWalletOrderByWithAggregationInput | TrackedWalletOrderByWithAggregationInput[]
    by: TrackedWalletScalarFieldEnum[] | TrackedWalletScalarFieldEnum
    having?: TrackedWalletScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TrackedWalletCountAggregateInputType | true
    _min?: TrackedWalletMinAggregateInputType
    _max?: TrackedWalletMaxAggregateInputType
  }

  export type TrackedWalletGroupByOutputType = {
    id: string
    address: string
    userId: string
    name: string
    groupName: string | null
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: TrackedWalletCountAggregateOutputType | null
    _min: TrackedWalletMinAggregateOutputType | null
    _max: TrackedWalletMaxAggregateOutputType | null
  }

  type GetTrackedWalletGroupByPayload<T extends TrackedWalletGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TrackedWalletGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TrackedWalletGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TrackedWalletGroupByOutputType[P]>
            : GetScalarType<T[P], TrackedWalletGroupByOutputType[P]>
        }
      >
    >


  export type TrackedWalletSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    address?: boolean
    userId?: boolean
    name?: boolean
    groupName?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["trackedWallet"]>

  export type TrackedWalletSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    address?: boolean
    userId?: boolean
    name?: boolean
    groupName?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["trackedWallet"]>

  export type TrackedWalletSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    address?: boolean
    userId?: boolean
    name?: boolean
    groupName?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["trackedWallet"]>

  export type TrackedWalletSelectScalar = {
    id?: boolean
    address?: boolean
    userId?: boolean
    name?: boolean
    groupName?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TrackedWalletOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "address" | "userId" | "name" | "groupName" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["trackedWallet"]>

  export type $TrackedWalletPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TrackedWallet"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      address: string
      userId: string
      name: string
      groupName: string | null
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["trackedWallet"]>
    composites: {}
  }

  type TrackedWalletGetPayload<S extends boolean | null | undefined | TrackedWalletDefaultArgs> = $Result.GetResult<Prisma.$TrackedWalletPayload, S>

  type TrackedWalletCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TrackedWalletFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TrackedWalletCountAggregateInputType | true
    }

  export interface TrackedWalletDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TrackedWallet'], meta: { name: 'TrackedWallet' } }
    /**
     * Find zero or one TrackedWallet that matches the filter.
     * @param {TrackedWalletFindUniqueArgs} args - Arguments to find a TrackedWallet
     * @example
     * // Get one TrackedWallet
     * const trackedWallet = await prisma.trackedWallet.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TrackedWalletFindUniqueArgs>(args: SelectSubset<T, TrackedWalletFindUniqueArgs<ExtArgs>>): Prisma__TrackedWalletClient<$Result.GetResult<Prisma.$TrackedWalletPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TrackedWallet that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TrackedWalletFindUniqueOrThrowArgs} args - Arguments to find a TrackedWallet
     * @example
     * // Get one TrackedWallet
     * const trackedWallet = await prisma.trackedWallet.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TrackedWalletFindUniqueOrThrowArgs>(args: SelectSubset<T, TrackedWalletFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TrackedWalletClient<$Result.GetResult<Prisma.$TrackedWalletPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TrackedWallet that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrackedWalletFindFirstArgs} args - Arguments to find a TrackedWallet
     * @example
     * // Get one TrackedWallet
     * const trackedWallet = await prisma.trackedWallet.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TrackedWalletFindFirstArgs>(args?: SelectSubset<T, TrackedWalletFindFirstArgs<ExtArgs>>): Prisma__TrackedWalletClient<$Result.GetResult<Prisma.$TrackedWalletPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TrackedWallet that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrackedWalletFindFirstOrThrowArgs} args - Arguments to find a TrackedWallet
     * @example
     * // Get one TrackedWallet
     * const trackedWallet = await prisma.trackedWallet.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TrackedWalletFindFirstOrThrowArgs>(args?: SelectSubset<T, TrackedWalletFindFirstOrThrowArgs<ExtArgs>>): Prisma__TrackedWalletClient<$Result.GetResult<Prisma.$TrackedWalletPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TrackedWallets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrackedWalletFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TrackedWallets
     * const trackedWallets = await prisma.trackedWallet.findMany()
     * 
     * // Get first 10 TrackedWallets
     * const trackedWallets = await prisma.trackedWallet.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const trackedWalletWithIdOnly = await prisma.trackedWallet.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TrackedWalletFindManyArgs>(args?: SelectSubset<T, TrackedWalletFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrackedWalletPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TrackedWallet.
     * @param {TrackedWalletCreateArgs} args - Arguments to create a TrackedWallet.
     * @example
     * // Create one TrackedWallet
     * const TrackedWallet = await prisma.trackedWallet.create({
     *   data: {
     *     // ... data to create a TrackedWallet
     *   }
     * })
     * 
     */
    create<T extends TrackedWalletCreateArgs>(args: SelectSubset<T, TrackedWalletCreateArgs<ExtArgs>>): Prisma__TrackedWalletClient<$Result.GetResult<Prisma.$TrackedWalletPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TrackedWallets.
     * @param {TrackedWalletCreateManyArgs} args - Arguments to create many TrackedWallets.
     * @example
     * // Create many TrackedWallets
     * const trackedWallet = await prisma.trackedWallet.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TrackedWalletCreateManyArgs>(args?: SelectSubset<T, TrackedWalletCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TrackedWallets and returns the data saved in the database.
     * @param {TrackedWalletCreateManyAndReturnArgs} args - Arguments to create many TrackedWallets.
     * @example
     * // Create many TrackedWallets
     * const trackedWallet = await prisma.trackedWallet.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TrackedWallets and only return the `id`
     * const trackedWalletWithIdOnly = await prisma.trackedWallet.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TrackedWalletCreateManyAndReturnArgs>(args?: SelectSubset<T, TrackedWalletCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrackedWalletPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TrackedWallet.
     * @param {TrackedWalletDeleteArgs} args - Arguments to delete one TrackedWallet.
     * @example
     * // Delete one TrackedWallet
     * const TrackedWallet = await prisma.trackedWallet.delete({
     *   where: {
     *     // ... filter to delete one TrackedWallet
     *   }
     * })
     * 
     */
    delete<T extends TrackedWalletDeleteArgs>(args: SelectSubset<T, TrackedWalletDeleteArgs<ExtArgs>>): Prisma__TrackedWalletClient<$Result.GetResult<Prisma.$TrackedWalletPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TrackedWallet.
     * @param {TrackedWalletUpdateArgs} args - Arguments to update one TrackedWallet.
     * @example
     * // Update one TrackedWallet
     * const trackedWallet = await prisma.trackedWallet.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TrackedWalletUpdateArgs>(args: SelectSubset<T, TrackedWalletUpdateArgs<ExtArgs>>): Prisma__TrackedWalletClient<$Result.GetResult<Prisma.$TrackedWalletPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TrackedWallets.
     * @param {TrackedWalletDeleteManyArgs} args - Arguments to filter TrackedWallets to delete.
     * @example
     * // Delete a few TrackedWallets
     * const { count } = await prisma.trackedWallet.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TrackedWalletDeleteManyArgs>(args?: SelectSubset<T, TrackedWalletDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TrackedWallets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrackedWalletUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TrackedWallets
     * const trackedWallet = await prisma.trackedWallet.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TrackedWalletUpdateManyArgs>(args: SelectSubset<T, TrackedWalletUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TrackedWallets and returns the data updated in the database.
     * @param {TrackedWalletUpdateManyAndReturnArgs} args - Arguments to update many TrackedWallets.
     * @example
     * // Update many TrackedWallets
     * const trackedWallet = await prisma.trackedWallet.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TrackedWallets and only return the `id`
     * const trackedWalletWithIdOnly = await prisma.trackedWallet.updateManyAndReturn({
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
    updateManyAndReturn<T extends TrackedWalletUpdateManyAndReturnArgs>(args: SelectSubset<T, TrackedWalletUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrackedWalletPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TrackedWallet.
     * @param {TrackedWalletUpsertArgs} args - Arguments to update or create a TrackedWallet.
     * @example
     * // Update or create a TrackedWallet
     * const trackedWallet = await prisma.trackedWallet.upsert({
     *   create: {
     *     // ... data to create a TrackedWallet
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TrackedWallet we want to update
     *   }
     * })
     */
    upsert<T extends TrackedWalletUpsertArgs>(args: SelectSubset<T, TrackedWalletUpsertArgs<ExtArgs>>): Prisma__TrackedWalletClient<$Result.GetResult<Prisma.$TrackedWalletPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TrackedWallets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrackedWalletCountArgs} args - Arguments to filter TrackedWallets to count.
     * @example
     * // Count the number of TrackedWallets
     * const count = await prisma.trackedWallet.count({
     *   where: {
     *     // ... the filter for the TrackedWallets we want to count
     *   }
     * })
    **/
    count<T extends TrackedWalletCountArgs>(
      args?: Subset<T, TrackedWalletCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TrackedWalletCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TrackedWallet.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrackedWalletAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends TrackedWalletAggregateArgs>(args: Subset<T, TrackedWalletAggregateArgs>): Prisma.PrismaPromise<GetTrackedWalletAggregateType<T>>

    /**
     * Group by TrackedWallet.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrackedWalletGroupByArgs} args - Group by arguments.
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
      T extends TrackedWalletGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TrackedWalletGroupByArgs['orderBy'] }
        : { orderBy?: TrackedWalletGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, TrackedWalletGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTrackedWalletGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TrackedWallet model
   */
  readonly fields: TrackedWalletFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TrackedWallet.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TrackedWalletClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the TrackedWallet model
   */
  interface TrackedWalletFieldRefs {
    readonly id: FieldRef<"TrackedWallet", 'String'>
    readonly address: FieldRef<"TrackedWallet", 'String'>
    readonly userId: FieldRef<"TrackedWallet", 'String'>
    readonly name: FieldRef<"TrackedWallet", 'String'>
    readonly groupName: FieldRef<"TrackedWallet", 'String'>
    readonly isActive: FieldRef<"TrackedWallet", 'Boolean'>
    readonly createdAt: FieldRef<"TrackedWallet", 'DateTime'>
    readonly updatedAt: FieldRef<"TrackedWallet", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TrackedWallet findUnique
   */
  export type TrackedWalletFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrackedWallet
     */
    select?: TrackedWalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrackedWallet
     */
    omit?: TrackedWalletOmit<ExtArgs> | null
    /**
     * Filter, which TrackedWallet to fetch.
     */
    where: TrackedWalletWhereUniqueInput
  }

  /**
   * TrackedWallet findUniqueOrThrow
   */
  export type TrackedWalletFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrackedWallet
     */
    select?: TrackedWalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrackedWallet
     */
    omit?: TrackedWalletOmit<ExtArgs> | null
    /**
     * Filter, which TrackedWallet to fetch.
     */
    where: TrackedWalletWhereUniqueInput
  }

  /**
   * TrackedWallet findFirst
   */
  export type TrackedWalletFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrackedWallet
     */
    select?: TrackedWalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrackedWallet
     */
    omit?: TrackedWalletOmit<ExtArgs> | null
    /**
     * Filter, which TrackedWallet to fetch.
     */
    where?: TrackedWalletWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TrackedWallets to fetch.
     */
    orderBy?: TrackedWalletOrderByWithRelationInput | TrackedWalletOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TrackedWallets.
     */
    cursor?: TrackedWalletWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TrackedWallets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TrackedWallets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TrackedWallets.
     */
    distinct?: TrackedWalletScalarFieldEnum | TrackedWalletScalarFieldEnum[]
  }

  /**
   * TrackedWallet findFirstOrThrow
   */
  export type TrackedWalletFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrackedWallet
     */
    select?: TrackedWalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrackedWallet
     */
    omit?: TrackedWalletOmit<ExtArgs> | null
    /**
     * Filter, which TrackedWallet to fetch.
     */
    where?: TrackedWalletWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TrackedWallets to fetch.
     */
    orderBy?: TrackedWalletOrderByWithRelationInput | TrackedWalletOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TrackedWallets.
     */
    cursor?: TrackedWalletWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TrackedWallets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TrackedWallets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TrackedWallets.
     */
    distinct?: TrackedWalletScalarFieldEnum | TrackedWalletScalarFieldEnum[]
  }

  /**
   * TrackedWallet findMany
   */
  export type TrackedWalletFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrackedWallet
     */
    select?: TrackedWalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrackedWallet
     */
    omit?: TrackedWalletOmit<ExtArgs> | null
    /**
     * Filter, which TrackedWallets to fetch.
     */
    where?: TrackedWalletWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TrackedWallets to fetch.
     */
    orderBy?: TrackedWalletOrderByWithRelationInput | TrackedWalletOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TrackedWallets.
     */
    cursor?: TrackedWalletWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TrackedWallets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TrackedWallets.
     */
    skip?: number
    distinct?: TrackedWalletScalarFieldEnum | TrackedWalletScalarFieldEnum[]
  }

  /**
   * TrackedWallet create
   */
  export type TrackedWalletCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrackedWallet
     */
    select?: TrackedWalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrackedWallet
     */
    omit?: TrackedWalletOmit<ExtArgs> | null
    /**
     * The data needed to create a TrackedWallet.
     */
    data: XOR<TrackedWalletCreateInput, TrackedWalletUncheckedCreateInput>
  }

  /**
   * TrackedWallet createMany
   */
  export type TrackedWalletCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TrackedWallets.
     */
    data: TrackedWalletCreateManyInput | TrackedWalletCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TrackedWallet createManyAndReturn
   */
  export type TrackedWalletCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrackedWallet
     */
    select?: TrackedWalletSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TrackedWallet
     */
    omit?: TrackedWalletOmit<ExtArgs> | null
    /**
     * The data used to create many TrackedWallets.
     */
    data: TrackedWalletCreateManyInput | TrackedWalletCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TrackedWallet update
   */
  export type TrackedWalletUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrackedWallet
     */
    select?: TrackedWalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrackedWallet
     */
    omit?: TrackedWalletOmit<ExtArgs> | null
    /**
     * The data needed to update a TrackedWallet.
     */
    data: XOR<TrackedWalletUpdateInput, TrackedWalletUncheckedUpdateInput>
    /**
     * Choose, which TrackedWallet to update.
     */
    where: TrackedWalletWhereUniqueInput
  }

  /**
   * TrackedWallet updateMany
   */
  export type TrackedWalletUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TrackedWallets.
     */
    data: XOR<TrackedWalletUpdateManyMutationInput, TrackedWalletUncheckedUpdateManyInput>
    /**
     * Filter which TrackedWallets to update
     */
    where?: TrackedWalletWhereInput
    /**
     * Limit how many TrackedWallets to update.
     */
    limit?: number
  }

  /**
   * TrackedWallet updateManyAndReturn
   */
  export type TrackedWalletUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrackedWallet
     */
    select?: TrackedWalletSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TrackedWallet
     */
    omit?: TrackedWalletOmit<ExtArgs> | null
    /**
     * The data used to update TrackedWallets.
     */
    data: XOR<TrackedWalletUpdateManyMutationInput, TrackedWalletUncheckedUpdateManyInput>
    /**
     * Filter which TrackedWallets to update
     */
    where?: TrackedWalletWhereInput
    /**
     * Limit how many TrackedWallets to update.
     */
    limit?: number
  }

  /**
   * TrackedWallet upsert
   */
  export type TrackedWalletUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrackedWallet
     */
    select?: TrackedWalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrackedWallet
     */
    omit?: TrackedWalletOmit<ExtArgs> | null
    /**
     * The filter to search for the TrackedWallet to update in case it exists.
     */
    where: TrackedWalletWhereUniqueInput
    /**
     * In case the TrackedWallet found by the `where` argument doesn't exist, create a new TrackedWallet with this data.
     */
    create: XOR<TrackedWalletCreateInput, TrackedWalletUncheckedCreateInput>
    /**
     * In case the TrackedWallet was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TrackedWalletUpdateInput, TrackedWalletUncheckedUpdateInput>
  }

  /**
   * TrackedWallet delete
   */
  export type TrackedWalletDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrackedWallet
     */
    select?: TrackedWalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrackedWallet
     */
    omit?: TrackedWalletOmit<ExtArgs> | null
    /**
     * Filter which TrackedWallet to delete.
     */
    where: TrackedWalletWhereUniqueInput
  }

  /**
   * TrackedWallet deleteMany
   */
  export type TrackedWalletDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TrackedWallets to delete
     */
    where?: TrackedWalletWhereInput
    /**
     * Limit how many TrackedWallets to delete.
     */
    limit?: number
  }

  /**
   * TrackedWallet without action
   */
  export type TrackedWalletDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrackedWallet
     */
    select?: TrackedWalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrackedWallet
     */
    omit?: TrackedWalletOmit<ExtArgs> | null
  }


  /**
   * Model AlchemyWebhook
   */

  export type AggregateAlchemyWebhook = {
    _count: AlchemyWebhookCountAggregateOutputType | null
    _min: AlchemyWebhookMinAggregateOutputType | null
    _max: AlchemyWebhookMaxAggregateOutputType | null
  }

  export type AlchemyWebhookMinAggregateOutputType = {
    id: string | null
    webhookId: string | null
    webhookUrl: string | null
    signingKey: string | null
    isActive: boolean | null
    lastSyncedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AlchemyWebhookMaxAggregateOutputType = {
    id: string | null
    webhookId: string | null
    webhookUrl: string | null
    signingKey: string | null
    isActive: boolean | null
    lastSyncedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AlchemyWebhookCountAggregateOutputType = {
    id: number
    webhookId: number
    webhookUrl: number
    signingKey: number
    isActive: number
    lastSyncedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AlchemyWebhookMinAggregateInputType = {
    id?: true
    webhookId?: true
    webhookUrl?: true
    signingKey?: true
    isActive?: true
    lastSyncedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AlchemyWebhookMaxAggregateInputType = {
    id?: true
    webhookId?: true
    webhookUrl?: true
    signingKey?: true
    isActive?: true
    lastSyncedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AlchemyWebhookCountAggregateInputType = {
    id?: true
    webhookId?: true
    webhookUrl?: true
    signingKey?: true
    isActive?: true
    lastSyncedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AlchemyWebhookAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AlchemyWebhook to aggregate.
     */
    where?: AlchemyWebhookWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AlchemyWebhooks to fetch.
     */
    orderBy?: AlchemyWebhookOrderByWithRelationInput | AlchemyWebhookOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AlchemyWebhookWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AlchemyWebhooks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AlchemyWebhooks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AlchemyWebhooks
    **/
    _count?: true | AlchemyWebhookCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AlchemyWebhookMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AlchemyWebhookMaxAggregateInputType
  }

  export type GetAlchemyWebhookAggregateType<T extends AlchemyWebhookAggregateArgs> = {
        [P in keyof T & keyof AggregateAlchemyWebhook]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAlchemyWebhook[P]>
      : GetScalarType<T[P], AggregateAlchemyWebhook[P]>
  }




  export type AlchemyWebhookGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AlchemyWebhookWhereInput
    orderBy?: AlchemyWebhookOrderByWithAggregationInput | AlchemyWebhookOrderByWithAggregationInput[]
    by: AlchemyWebhookScalarFieldEnum[] | AlchemyWebhookScalarFieldEnum
    having?: AlchemyWebhookScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AlchemyWebhookCountAggregateInputType | true
    _min?: AlchemyWebhookMinAggregateInputType
    _max?: AlchemyWebhookMaxAggregateInputType
  }

  export type AlchemyWebhookGroupByOutputType = {
    id: string
    webhookId: string
    webhookUrl: string
    signingKey: string | null
    isActive: boolean
    lastSyncedAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: AlchemyWebhookCountAggregateOutputType | null
    _min: AlchemyWebhookMinAggregateOutputType | null
    _max: AlchemyWebhookMaxAggregateOutputType | null
  }

  type GetAlchemyWebhookGroupByPayload<T extends AlchemyWebhookGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AlchemyWebhookGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AlchemyWebhookGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AlchemyWebhookGroupByOutputType[P]>
            : GetScalarType<T[P], AlchemyWebhookGroupByOutputType[P]>
        }
      >
    >


  export type AlchemyWebhookSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    webhookId?: boolean
    webhookUrl?: boolean
    signingKey?: boolean
    isActive?: boolean
    lastSyncedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["alchemyWebhook"]>

  export type AlchemyWebhookSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    webhookId?: boolean
    webhookUrl?: boolean
    signingKey?: boolean
    isActive?: boolean
    lastSyncedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["alchemyWebhook"]>

  export type AlchemyWebhookSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    webhookId?: boolean
    webhookUrl?: boolean
    signingKey?: boolean
    isActive?: boolean
    lastSyncedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["alchemyWebhook"]>

  export type AlchemyWebhookSelectScalar = {
    id?: boolean
    webhookId?: boolean
    webhookUrl?: boolean
    signingKey?: boolean
    isActive?: boolean
    lastSyncedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AlchemyWebhookOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "webhookId" | "webhookUrl" | "signingKey" | "isActive" | "lastSyncedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["alchemyWebhook"]>

  export type $AlchemyWebhookPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AlchemyWebhook"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      webhookId: string
      webhookUrl: string
      signingKey: string | null
      isActive: boolean
      lastSyncedAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["alchemyWebhook"]>
    composites: {}
  }

  type AlchemyWebhookGetPayload<S extends boolean | null | undefined | AlchemyWebhookDefaultArgs> = $Result.GetResult<Prisma.$AlchemyWebhookPayload, S>

  type AlchemyWebhookCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AlchemyWebhookFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AlchemyWebhookCountAggregateInputType | true
    }

  export interface AlchemyWebhookDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AlchemyWebhook'], meta: { name: 'AlchemyWebhook' } }
    /**
     * Find zero or one AlchemyWebhook that matches the filter.
     * @param {AlchemyWebhookFindUniqueArgs} args - Arguments to find a AlchemyWebhook
     * @example
     * // Get one AlchemyWebhook
     * const alchemyWebhook = await prisma.alchemyWebhook.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AlchemyWebhookFindUniqueArgs>(args: SelectSubset<T, AlchemyWebhookFindUniqueArgs<ExtArgs>>): Prisma__AlchemyWebhookClient<$Result.GetResult<Prisma.$AlchemyWebhookPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AlchemyWebhook that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AlchemyWebhookFindUniqueOrThrowArgs} args - Arguments to find a AlchemyWebhook
     * @example
     * // Get one AlchemyWebhook
     * const alchemyWebhook = await prisma.alchemyWebhook.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AlchemyWebhookFindUniqueOrThrowArgs>(args: SelectSubset<T, AlchemyWebhookFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AlchemyWebhookClient<$Result.GetResult<Prisma.$AlchemyWebhookPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AlchemyWebhook that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlchemyWebhookFindFirstArgs} args - Arguments to find a AlchemyWebhook
     * @example
     * // Get one AlchemyWebhook
     * const alchemyWebhook = await prisma.alchemyWebhook.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AlchemyWebhookFindFirstArgs>(args?: SelectSubset<T, AlchemyWebhookFindFirstArgs<ExtArgs>>): Prisma__AlchemyWebhookClient<$Result.GetResult<Prisma.$AlchemyWebhookPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AlchemyWebhook that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlchemyWebhookFindFirstOrThrowArgs} args - Arguments to find a AlchemyWebhook
     * @example
     * // Get one AlchemyWebhook
     * const alchemyWebhook = await prisma.alchemyWebhook.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AlchemyWebhookFindFirstOrThrowArgs>(args?: SelectSubset<T, AlchemyWebhookFindFirstOrThrowArgs<ExtArgs>>): Prisma__AlchemyWebhookClient<$Result.GetResult<Prisma.$AlchemyWebhookPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AlchemyWebhooks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlchemyWebhookFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AlchemyWebhooks
     * const alchemyWebhooks = await prisma.alchemyWebhook.findMany()
     * 
     * // Get first 10 AlchemyWebhooks
     * const alchemyWebhooks = await prisma.alchemyWebhook.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const alchemyWebhookWithIdOnly = await prisma.alchemyWebhook.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AlchemyWebhookFindManyArgs>(args?: SelectSubset<T, AlchemyWebhookFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AlchemyWebhookPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AlchemyWebhook.
     * @param {AlchemyWebhookCreateArgs} args - Arguments to create a AlchemyWebhook.
     * @example
     * // Create one AlchemyWebhook
     * const AlchemyWebhook = await prisma.alchemyWebhook.create({
     *   data: {
     *     // ... data to create a AlchemyWebhook
     *   }
     * })
     * 
     */
    create<T extends AlchemyWebhookCreateArgs>(args: SelectSubset<T, AlchemyWebhookCreateArgs<ExtArgs>>): Prisma__AlchemyWebhookClient<$Result.GetResult<Prisma.$AlchemyWebhookPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AlchemyWebhooks.
     * @param {AlchemyWebhookCreateManyArgs} args - Arguments to create many AlchemyWebhooks.
     * @example
     * // Create many AlchemyWebhooks
     * const alchemyWebhook = await prisma.alchemyWebhook.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AlchemyWebhookCreateManyArgs>(args?: SelectSubset<T, AlchemyWebhookCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AlchemyWebhooks and returns the data saved in the database.
     * @param {AlchemyWebhookCreateManyAndReturnArgs} args - Arguments to create many AlchemyWebhooks.
     * @example
     * // Create many AlchemyWebhooks
     * const alchemyWebhook = await prisma.alchemyWebhook.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AlchemyWebhooks and only return the `id`
     * const alchemyWebhookWithIdOnly = await prisma.alchemyWebhook.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AlchemyWebhookCreateManyAndReturnArgs>(args?: SelectSubset<T, AlchemyWebhookCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AlchemyWebhookPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AlchemyWebhook.
     * @param {AlchemyWebhookDeleteArgs} args - Arguments to delete one AlchemyWebhook.
     * @example
     * // Delete one AlchemyWebhook
     * const AlchemyWebhook = await prisma.alchemyWebhook.delete({
     *   where: {
     *     // ... filter to delete one AlchemyWebhook
     *   }
     * })
     * 
     */
    delete<T extends AlchemyWebhookDeleteArgs>(args: SelectSubset<T, AlchemyWebhookDeleteArgs<ExtArgs>>): Prisma__AlchemyWebhookClient<$Result.GetResult<Prisma.$AlchemyWebhookPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AlchemyWebhook.
     * @param {AlchemyWebhookUpdateArgs} args - Arguments to update one AlchemyWebhook.
     * @example
     * // Update one AlchemyWebhook
     * const alchemyWebhook = await prisma.alchemyWebhook.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AlchemyWebhookUpdateArgs>(args: SelectSubset<T, AlchemyWebhookUpdateArgs<ExtArgs>>): Prisma__AlchemyWebhookClient<$Result.GetResult<Prisma.$AlchemyWebhookPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AlchemyWebhooks.
     * @param {AlchemyWebhookDeleteManyArgs} args - Arguments to filter AlchemyWebhooks to delete.
     * @example
     * // Delete a few AlchemyWebhooks
     * const { count } = await prisma.alchemyWebhook.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AlchemyWebhookDeleteManyArgs>(args?: SelectSubset<T, AlchemyWebhookDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AlchemyWebhooks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlchemyWebhookUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AlchemyWebhooks
     * const alchemyWebhook = await prisma.alchemyWebhook.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AlchemyWebhookUpdateManyArgs>(args: SelectSubset<T, AlchemyWebhookUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AlchemyWebhooks and returns the data updated in the database.
     * @param {AlchemyWebhookUpdateManyAndReturnArgs} args - Arguments to update many AlchemyWebhooks.
     * @example
     * // Update many AlchemyWebhooks
     * const alchemyWebhook = await prisma.alchemyWebhook.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AlchemyWebhooks and only return the `id`
     * const alchemyWebhookWithIdOnly = await prisma.alchemyWebhook.updateManyAndReturn({
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
    updateManyAndReturn<T extends AlchemyWebhookUpdateManyAndReturnArgs>(args: SelectSubset<T, AlchemyWebhookUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AlchemyWebhookPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AlchemyWebhook.
     * @param {AlchemyWebhookUpsertArgs} args - Arguments to update or create a AlchemyWebhook.
     * @example
     * // Update or create a AlchemyWebhook
     * const alchemyWebhook = await prisma.alchemyWebhook.upsert({
     *   create: {
     *     // ... data to create a AlchemyWebhook
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AlchemyWebhook we want to update
     *   }
     * })
     */
    upsert<T extends AlchemyWebhookUpsertArgs>(args: SelectSubset<T, AlchemyWebhookUpsertArgs<ExtArgs>>): Prisma__AlchemyWebhookClient<$Result.GetResult<Prisma.$AlchemyWebhookPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AlchemyWebhooks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlchemyWebhookCountArgs} args - Arguments to filter AlchemyWebhooks to count.
     * @example
     * // Count the number of AlchemyWebhooks
     * const count = await prisma.alchemyWebhook.count({
     *   where: {
     *     // ... the filter for the AlchemyWebhooks we want to count
     *   }
     * })
    **/
    count<T extends AlchemyWebhookCountArgs>(
      args?: Subset<T, AlchemyWebhookCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AlchemyWebhookCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AlchemyWebhook.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlchemyWebhookAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AlchemyWebhookAggregateArgs>(args: Subset<T, AlchemyWebhookAggregateArgs>): Prisma.PrismaPromise<GetAlchemyWebhookAggregateType<T>>

    /**
     * Group by AlchemyWebhook.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlchemyWebhookGroupByArgs} args - Group by arguments.
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
      T extends AlchemyWebhookGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AlchemyWebhookGroupByArgs['orderBy'] }
        : { orderBy?: AlchemyWebhookGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AlchemyWebhookGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAlchemyWebhookGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AlchemyWebhook model
   */
  readonly fields: AlchemyWebhookFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AlchemyWebhook.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AlchemyWebhookClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the AlchemyWebhook model
   */
  interface AlchemyWebhookFieldRefs {
    readonly id: FieldRef<"AlchemyWebhook", 'String'>
    readonly webhookId: FieldRef<"AlchemyWebhook", 'String'>
    readonly webhookUrl: FieldRef<"AlchemyWebhook", 'String'>
    readonly signingKey: FieldRef<"AlchemyWebhook", 'String'>
    readonly isActive: FieldRef<"AlchemyWebhook", 'Boolean'>
    readonly lastSyncedAt: FieldRef<"AlchemyWebhook", 'DateTime'>
    readonly createdAt: FieldRef<"AlchemyWebhook", 'DateTime'>
    readonly updatedAt: FieldRef<"AlchemyWebhook", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AlchemyWebhook findUnique
   */
  export type AlchemyWebhookFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlchemyWebhook
     */
    select?: AlchemyWebhookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AlchemyWebhook
     */
    omit?: AlchemyWebhookOmit<ExtArgs> | null
    /**
     * Filter, which AlchemyWebhook to fetch.
     */
    where: AlchemyWebhookWhereUniqueInput
  }

  /**
   * AlchemyWebhook findUniqueOrThrow
   */
  export type AlchemyWebhookFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlchemyWebhook
     */
    select?: AlchemyWebhookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AlchemyWebhook
     */
    omit?: AlchemyWebhookOmit<ExtArgs> | null
    /**
     * Filter, which AlchemyWebhook to fetch.
     */
    where: AlchemyWebhookWhereUniqueInput
  }

  /**
   * AlchemyWebhook findFirst
   */
  export type AlchemyWebhookFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlchemyWebhook
     */
    select?: AlchemyWebhookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AlchemyWebhook
     */
    omit?: AlchemyWebhookOmit<ExtArgs> | null
    /**
     * Filter, which AlchemyWebhook to fetch.
     */
    where?: AlchemyWebhookWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AlchemyWebhooks to fetch.
     */
    orderBy?: AlchemyWebhookOrderByWithRelationInput | AlchemyWebhookOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AlchemyWebhooks.
     */
    cursor?: AlchemyWebhookWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AlchemyWebhooks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AlchemyWebhooks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AlchemyWebhooks.
     */
    distinct?: AlchemyWebhookScalarFieldEnum | AlchemyWebhookScalarFieldEnum[]
  }

  /**
   * AlchemyWebhook findFirstOrThrow
   */
  export type AlchemyWebhookFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlchemyWebhook
     */
    select?: AlchemyWebhookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AlchemyWebhook
     */
    omit?: AlchemyWebhookOmit<ExtArgs> | null
    /**
     * Filter, which AlchemyWebhook to fetch.
     */
    where?: AlchemyWebhookWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AlchemyWebhooks to fetch.
     */
    orderBy?: AlchemyWebhookOrderByWithRelationInput | AlchemyWebhookOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AlchemyWebhooks.
     */
    cursor?: AlchemyWebhookWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AlchemyWebhooks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AlchemyWebhooks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AlchemyWebhooks.
     */
    distinct?: AlchemyWebhookScalarFieldEnum | AlchemyWebhookScalarFieldEnum[]
  }

  /**
   * AlchemyWebhook findMany
   */
  export type AlchemyWebhookFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlchemyWebhook
     */
    select?: AlchemyWebhookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AlchemyWebhook
     */
    omit?: AlchemyWebhookOmit<ExtArgs> | null
    /**
     * Filter, which AlchemyWebhooks to fetch.
     */
    where?: AlchemyWebhookWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AlchemyWebhooks to fetch.
     */
    orderBy?: AlchemyWebhookOrderByWithRelationInput | AlchemyWebhookOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AlchemyWebhooks.
     */
    cursor?: AlchemyWebhookWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AlchemyWebhooks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AlchemyWebhooks.
     */
    skip?: number
    distinct?: AlchemyWebhookScalarFieldEnum | AlchemyWebhookScalarFieldEnum[]
  }

  /**
   * AlchemyWebhook create
   */
  export type AlchemyWebhookCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlchemyWebhook
     */
    select?: AlchemyWebhookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AlchemyWebhook
     */
    omit?: AlchemyWebhookOmit<ExtArgs> | null
    /**
     * The data needed to create a AlchemyWebhook.
     */
    data: XOR<AlchemyWebhookCreateInput, AlchemyWebhookUncheckedCreateInput>
  }

  /**
   * AlchemyWebhook createMany
   */
  export type AlchemyWebhookCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AlchemyWebhooks.
     */
    data: AlchemyWebhookCreateManyInput | AlchemyWebhookCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AlchemyWebhook createManyAndReturn
   */
  export type AlchemyWebhookCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlchemyWebhook
     */
    select?: AlchemyWebhookSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AlchemyWebhook
     */
    omit?: AlchemyWebhookOmit<ExtArgs> | null
    /**
     * The data used to create many AlchemyWebhooks.
     */
    data: AlchemyWebhookCreateManyInput | AlchemyWebhookCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AlchemyWebhook update
   */
  export type AlchemyWebhookUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlchemyWebhook
     */
    select?: AlchemyWebhookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AlchemyWebhook
     */
    omit?: AlchemyWebhookOmit<ExtArgs> | null
    /**
     * The data needed to update a AlchemyWebhook.
     */
    data: XOR<AlchemyWebhookUpdateInput, AlchemyWebhookUncheckedUpdateInput>
    /**
     * Choose, which AlchemyWebhook to update.
     */
    where: AlchemyWebhookWhereUniqueInput
  }

  /**
   * AlchemyWebhook updateMany
   */
  export type AlchemyWebhookUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AlchemyWebhooks.
     */
    data: XOR<AlchemyWebhookUpdateManyMutationInput, AlchemyWebhookUncheckedUpdateManyInput>
    /**
     * Filter which AlchemyWebhooks to update
     */
    where?: AlchemyWebhookWhereInput
    /**
     * Limit how many AlchemyWebhooks to update.
     */
    limit?: number
  }

  /**
   * AlchemyWebhook updateManyAndReturn
   */
  export type AlchemyWebhookUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlchemyWebhook
     */
    select?: AlchemyWebhookSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AlchemyWebhook
     */
    omit?: AlchemyWebhookOmit<ExtArgs> | null
    /**
     * The data used to update AlchemyWebhooks.
     */
    data: XOR<AlchemyWebhookUpdateManyMutationInput, AlchemyWebhookUncheckedUpdateManyInput>
    /**
     * Filter which AlchemyWebhooks to update
     */
    where?: AlchemyWebhookWhereInput
    /**
     * Limit how many AlchemyWebhooks to update.
     */
    limit?: number
  }

  /**
   * AlchemyWebhook upsert
   */
  export type AlchemyWebhookUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlchemyWebhook
     */
    select?: AlchemyWebhookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AlchemyWebhook
     */
    omit?: AlchemyWebhookOmit<ExtArgs> | null
    /**
     * The filter to search for the AlchemyWebhook to update in case it exists.
     */
    where: AlchemyWebhookWhereUniqueInput
    /**
     * In case the AlchemyWebhook found by the `where` argument doesn't exist, create a new AlchemyWebhook with this data.
     */
    create: XOR<AlchemyWebhookCreateInput, AlchemyWebhookUncheckedCreateInput>
    /**
     * In case the AlchemyWebhook was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AlchemyWebhookUpdateInput, AlchemyWebhookUncheckedUpdateInput>
  }

  /**
   * AlchemyWebhook delete
   */
  export type AlchemyWebhookDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlchemyWebhook
     */
    select?: AlchemyWebhookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AlchemyWebhook
     */
    omit?: AlchemyWebhookOmit<ExtArgs> | null
    /**
     * Filter which AlchemyWebhook to delete.
     */
    where: AlchemyWebhookWhereUniqueInput
  }

  /**
   * AlchemyWebhook deleteMany
   */
  export type AlchemyWebhookDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AlchemyWebhooks to delete
     */
    where?: AlchemyWebhookWhereInput
    /**
     * Limit how many AlchemyWebhooks to delete.
     */
    limit?: number
  }

  /**
   * AlchemyWebhook without action
   */
  export type AlchemyWebhookDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlchemyWebhook
     */
    select?: AlchemyWebhookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AlchemyWebhook
     */
    omit?: AlchemyWebhookOmit<ExtArgs> | null
  }


  /**
   * Model WebhookAddress
   */

  export type AggregateWebhookAddress = {
    _count: WebhookAddressCountAggregateOutputType | null
    _min: WebhookAddressMinAggregateOutputType | null
    _max: WebhookAddressMaxAggregateOutputType | null
  }

  export type WebhookAddressMinAggregateOutputType = {
    id: string | null
    webhookId: string | null
    address: string | null
    addedAt: Date | null
  }

  export type WebhookAddressMaxAggregateOutputType = {
    id: string | null
    webhookId: string | null
    address: string | null
    addedAt: Date | null
  }

  export type WebhookAddressCountAggregateOutputType = {
    id: number
    webhookId: number
    address: number
    addedAt: number
    _all: number
  }


  export type WebhookAddressMinAggregateInputType = {
    id?: true
    webhookId?: true
    address?: true
    addedAt?: true
  }

  export type WebhookAddressMaxAggregateInputType = {
    id?: true
    webhookId?: true
    address?: true
    addedAt?: true
  }

  export type WebhookAddressCountAggregateInputType = {
    id?: true
    webhookId?: true
    address?: true
    addedAt?: true
    _all?: true
  }

  export type WebhookAddressAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WebhookAddress to aggregate.
     */
    where?: WebhookAddressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WebhookAddresses to fetch.
     */
    orderBy?: WebhookAddressOrderByWithRelationInput | WebhookAddressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WebhookAddressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WebhookAddresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WebhookAddresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WebhookAddresses
    **/
    _count?: true | WebhookAddressCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WebhookAddressMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WebhookAddressMaxAggregateInputType
  }

  export type GetWebhookAddressAggregateType<T extends WebhookAddressAggregateArgs> = {
        [P in keyof T & keyof AggregateWebhookAddress]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWebhookAddress[P]>
      : GetScalarType<T[P], AggregateWebhookAddress[P]>
  }




  export type WebhookAddressGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WebhookAddressWhereInput
    orderBy?: WebhookAddressOrderByWithAggregationInput | WebhookAddressOrderByWithAggregationInput[]
    by: WebhookAddressScalarFieldEnum[] | WebhookAddressScalarFieldEnum
    having?: WebhookAddressScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WebhookAddressCountAggregateInputType | true
    _min?: WebhookAddressMinAggregateInputType
    _max?: WebhookAddressMaxAggregateInputType
  }

  export type WebhookAddressGroupByOutputType = {
    id: string
    webhookId: string
    address: string
    addedAt: Date
    _count: WebhookAddressCountAggregateOutputType | null
    _min: WebhookAddressMinAggregateOutputType | null
    _max: WebhookAddressMaxAggregateOutputType | null
  }

  type GetWebhookAddressGroupByPayload<T extends WebhookAddressGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WebhookAddressGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WebhookAddressGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WebhookAddressGroupByOutputType[P]>
            : GetScalarType<T[P], WebhookAddressGroupByOutputType[P]>
        }
      >
    >


  export type WebhookAddressSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    webhookId?: boolean
    address?: boolean
    addedAt?: boolean
  }, ExtArgs["result"]["webhookAddress"]>

  export type WebhookAddressSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    webhookId?: boolean
    address?: boolean
    addedAt?: boolean
  }, ExtArgs["result"]["webhookAddress"]>

  export type WebhookAddressSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    webhookId?: boolean
    address?: boolean
    addedAt?: boolean
  }, ExtArgs["result"]["webhookAddress"]>

  export type WebhookAddressSelectScalar = {
    id?: boolean
    webhookId?: boolean
    address?: boolean
    addedAt?: boolean
  }

  export type WebhookAddressOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "webhookId" | "address" | "addedAt", ExtArgs["result"]["webhookAddress"]>

  export type $WebhookAddressPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WebhookAddress"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      webhookId: string
      address: string
      addedAt: Date
    }, ExtArgs["result"]["webhookAddress"]>
    composites: {}
  }

  type WebhookAddressGetPayload<S extends boolean | null | undefined | WebhookAddressDefaultArgs> = $Result.GetResult<Prisma.$WebhookAddressPayload, S>

  type WebhookAddressCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WebhookAddressFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WebhookAddressCountAggregateInputType | true
    }

  export interface WebhookAddressDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WebhookAddress'], meta: { name: 'WebhookAddress' } }
    /**
     * Find zero or one WebhookAddress that matches the filter.
     * @param {WebhookAddressFindUniqueArgs} args - Arguments to find a WebhookAddress
     * @example
     * // Get one WebhookAddress
     * const webhookAddress = await prisma.webhookAddress.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WebhookAddressFindUniqueArgs>(args: SelectSubset<T, WebhookAddressFindUniqueArgs<ExtArgs>>): Prisma__WebhookAddressClient<$Result.GetResult<Prisma.$WebhookAddressPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one WebhookAddress that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WebhookAddressFindUniqueOrThrowArgs} args - Arguments to find a WebhookAddress
     * @example
     * // Get one WebhookAddress
     * const webhookAddress = await prisma.webhookAddress.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WebhookAddressFindUniqueOrThrowArgs>(args: SelectSubset<T, WebhookAddressFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WebhookAddressClient<$Result.GetResult<Prisma.$WebhookAddressPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WebhookAddress that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookAddressFindFirstArgs} args - Arguments to find a WebhookAddress
     * @example
     * // Get one WebhookAddress
     * const webhookAddress = await prisma.webhookAddress.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WebhookAddressFindFirstArgs>(args?: SelectSubset<T, WebhookAddressFindFirstArgs<ExtArgs>>): Prisma__WebhookAddressClient<$Result.GetResult<Prisma.$WebhookAddressPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WebhookAddress that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookAddressFindFirstOrThrowArgs} args - Arguments to find a WebhookAddress
     * @example
     * // Get one WebhookAddress
     * const webhookAddress = await prisma.webhookAddress.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WebhookAddressFindFirstOrThrowArgs>(args?: SelectSubset<T, WebhookAddressFindFirstOrThrowArgs<ExtArgs>>): Prisma__WebhookAddressClient<$Result.GetResult<Prisma.$WebhookAddressPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more WebhookAddresses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookAddressFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WebhookAddresses
     * const webhookAddresses = await prisma.webhookAddress.findMany()
     * 
     * // Get first 10 WebhookAddresses
     * const webhookAddresses = await prisma.webhookAddress.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const webhookAddressWithIdOnly = await prisma.webhookAddress.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WebhookAddressFindManyArgs>(args?: SelectSubset<T, WebhookAddressFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WebhookAddressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a WebhookAddress.
     * @param {WebhookAddressCreateArgs} args - Arguments to create a WebhookAddress.
     * @example
     * // Create one WebhookAddress
     * const WebhookAddress = await prisma.webhookAddress.create({
     *   data: {
     *     // ... data to create a WebhookAddress
     *   }
     * })
     * 
     */
    create<T extends WebhookAddressCreateArgs>(args: SelectSubset<T, WebhookAddressCreateArgs<ExtArgs>>): Prisma__WebhookAddressClient<$Result.GetResult<Prisma.$WebhookAddressPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many WebhookAddresses.
     * @param {WebhookAddressCreateManyArgs} args - Arguments to create many WebhookAddresses.
     * @example
     * // Create many WebhookAddresses
     * const webhookAddress = await prisma.webhookAddress.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WebhookAddressCreateManyArgs>(args?: SelectSubset<T, WebhookAddressCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many WebhookAddresses and returns the data saved in the database.
     * @param {WebhookAddressCreateManyAndReturnArgs} args - Arguments to create many WebhookAddresses.
     * @example
     * // Create many WebhookAddresses
     * const webhookAddress = await prisma.webhookAddress.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many WebhookAddresses and only return the `id`
     * const webhookAddressWithIdOnly = await prisma.webhookAddress.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WebhookAddressCreateManyAndReturnArgs>(args?: SelectSubset<T, WebhookAddressCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WebhookAddressPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a WebhookAddress.
     * @param {WebhookAddressDeleteArgs} args - Arguments to delete one WebhookAddress.
     * @example
     * // Delete one WebhookAddress
     * const WebhookAddress = await prisma.webhookAddress.delete({
     *   where: {
     *     // ... filter to delete one WebhookAddress
     *   }
     * })
     * 
     */
    delete<T extends WebhookAddressDeleteArgs>(args: SelectSubset<T, WebhookAddressDeleteArgs<ExtArgs>>): Prisma__WebhookAddressClient<$Result.GetResult<Prisma.$WebhookAddressPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one WebhookAddress.
     * @param {WebhookAddressUpdateArgs} args - Arguments to update one WebhookAddress.
     * @example
     * // Update one WebhookAddress
     * const webhookAddress = await prisma.webhookAddress.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WebhookAddressUpdateArgs>(args: SelectSubset<T, WebhookAddressUpdateArgs<ExtArgs>>): Prisma__WebhookAddressClient<$Result.GetResult<Prisma.$WebhookAddressPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more WebhookAddresses.
     * @param {WebhookAddressDeleteManyArgs} args - Arguments to filter WebhookAddresses to delete.
     * @example
     * // Delete a few WebhookAddresses
     * const { count } = await prisma.webhookAddress.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WebhookAddressDeleteManyArgs>(args?: SelectSubset<T, WebhookAddressDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WebhookAddresses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookAddressUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WebhookAddresses
     * const webhookAddress = await prisma.webhookAddress.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WebhookAddressUpdateManyArgs>(args: SelectSubset<T, WebhookAddressUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WebhookAddresses and returns the data updated in the database.
     * @param {WebhookAddressUpdateManyAndReturnArgs} args - Arguments to update many WebhookAddresses.
     * @example
     * // Update many WebhookAddresses
     * const webhookAddress = await prisma.webhookAddress.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more WebhookAddresses and only return the `id`
     * const webhookAddressWithIdOnly = await prisma.webhookAddress.updateManyAndReturn({
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
    updateManyAndReturn<T extends WebhookAddressUpdateManyAndReturnArgs>(args: SelectSubset<T, WebhookAddressUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WebhookAddressPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one WebhookAddress.
     * @param {WebhookAddressUpsertArgs} args - Arguments to update or create a WebhookAddress.
     * @example
     * // Update or create a WebhookAddress
     * const webhookAddress = await prisma.webhookAddress.upsert({
     *   create: {
     *     // ... data to create a WebhookAddress
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WebhookAddress we want to update
     *   }
     * })
     */
    upsert<T extends WebhookAddressUpsertArgs>(args: SelectSubset<T, WebhookAddressUpsertArgs<ExtArgs>>): Prisma__WebhookAddressClient<$Result.GetResult<Prisma.$WebhookAddressPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of WebhookAddresses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookAddressCountArgs} args - Arguments to filter WebhookAddresses to count.
     * @example
     * // Count the number of WebhookAddresses
     * const count = await prisma.webhookAddress.count({
     *   where: {
     *     // ... the filter for the WebhookAddresses we want to count
     *   }
     * })
    **/
    count<T extends WebhookAddressCountArgs>(
      args?: Subset<T, WebhookAddressCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WebhookAddressCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WebhookAddress.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookAddressAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends WebhookAddressAggregateArgs>(args: Subset<T, WebhookAddressAggregateArgs>): Prisma.PrismaPromise<GetWebhookAddressAggregateType<T>>

    /**
     * Group by WebhookAddress.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookAddressGroupByArgs} args - Group by arguments.
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
      T extends WebhookAddressGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WebhookAddressGroupByArgs['orderBy'] }
        : { orderBy?: WebhookAddressGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, WebhookAddressGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWebhookAddressGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WebhookAddress model
   */
  readonly fields: WebhookAddressFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WebhookAddress.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WebhookAddressClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the WebhookAddress model
   */
  interface WebhookAddressFieldRefs {
    readonly id: FieldRef<"WebhookAddress", 'String'>
    readonly webhookId: FieldRef<"WebhookAddress", 'String'>
    readonly address: FieldRef<"WebhookAddress", 'String'>
    readonly addedAt: FieldRef<"WebhookAddress", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * WebhookAddress findUnique
   */
  export type WebhookAddressFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookAddress
     */
    select?: WebhookAddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookAddress
     */
    omit?: WebhookAddressOmit<ExtArgs> | null
    /**
     * Filter, which WebhookAddress to fetch.
     */
    where: WebhookAddressWhereUniqueInput
  }

  /**
   * WebhookAddress findUniqueOrThrow
   */
  export type WebhookAddressFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookAddress
     */
    select?: WebhookAddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookAddress
     */
    omit?: WebhookAddressOmit<ExtArgs> | null
    /**
     * Filter, which WebhookAddress to fetch.
     */
    where: WebhookAddressWhereUniqueInput
  }

  /**
   * WebhookAddress findFirst
   */
  export type WebhookAddressFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookAddress
     */
    select?: WebhookAddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookAddress
     */
    omit?: WebhookAddressOmit<ExtArgs> | null
    /**
     * Filter, which WebhookAddress to fetch.
     */
    where?: WebhookAddressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WebhookAddresses to fetch.
     */
    orderBy?: WebhookAddressOrderByWithRelationInput | WebhookAddressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WebhookAddresses.
     */
    cursor?: WebhookAddressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WebhookAddresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WebhookAddresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WebhookAddresses.
     */
    distinct?: WebhookAddressScalarFieldEnum | WebhookAddressScalarFieldEnum[]
  }

  /**
   * WebhookAddress findFirstOrThrow
   */
  export type WebhookAddressFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookAddress
     */
    select?: WebhookAddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookAddress
     */
    omit?: WebhookAddressOmit<ExtArgs> | null
    /**
     * Filter, which WebhookAddress to fetch.
     */
    where?: WebhookAddressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WebhookAddresses to fetch.
     */
    orderBy?: WebhookAddressOrderByWithRelationInput | WebhookAddressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WebhookAddresses.
     */
    cursor?: WebhookAddressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WebhookAddresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WebhookAddresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WebhookAddresses.
     */
    distinct?: WebhookAddressScalarFieldEnum | WebhookAddressScalarFieldEnum[]
  }

  /**
   * WebhookAddress findMany
   */
  export type WebhookAddressFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookAddress
     */
    select?: WebhookAddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookAddress
     */
    omit?: WebhookAddressOmit<ExtArgs> | null
    /**
     * Filter, which WebhookAddresses to fetch.
     */
    where?: WebhookAddressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WebhookAddresses to fetch.
     */
    orderBy?: WebhookAddressOrderByWithRelationInput | WebhookAddressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WebhookAddresses.
     */
    cursor?: WebhookAddressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WebhookAddresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WebhookAddresses.
     */
    skip?: number
    distinct?: WebhookAddressScalarFieldEnum | WebhookAddressScalarFieldEnum[]
  }

  /**
   * WebhookAddress create
   */
  export type WebhookAddressCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookAddress
     */
    select?: WebhookAddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookAddress
     */
    omit?: WebhookAddressOmit<ExtArgs> | null
    /**
     * The data needed to create a WebhookAddress.
     */
    data: XOR<WebhookAddressCreateInput, WebhookAddressUncheckedCreateInput>
  }

  /**
   * WebhookAddress createMany
   */
  export type WebhookAddressCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WebhookAddresses.
     */
    data: WebhookAddressCreateManyInput | WebhookAddressCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WebhookAddress createManyAndReturn
   */
  export type WebhookAddressCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookAddress
     */
    select?: WebhookAddressSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookAddress
     */
    omit?: WebhookAddressOmit<ExtArgs> | null
    /**
     * The data used to create many WebhookAddresses.
     */
    data: WebhookAddressCreateManyInput | WebhookAddressCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WebhookAddress update
   */
  export type WebhookAddressUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookAddress
     */
    select?: WebhookAddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookAddress
     */
    omit?: WebhookAddressOmit<ExtArgs> | null
    /**
     * The data needed to update a WebhookAddress.
     */
    data: XOR<WebhookAddressUpdateInput, WebhookAddressUncheckedUpdateInput>
    /**
     * Choose, which WebhookAddress to update.
     */
    where: WebhookAddressWhereUniqueInput
  }

  /**
   * WebhookAddress updateMany
   */
  export type WebhookAddressUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WebhookAddresses.
     */
    data: XOR<WebhookAddressUpdateManyMutationInput, WebhookAddressUncheckedUpdateManyInput>
    /**
     * Filter which WebhookAddresses to update
     */
    where?: WebhookAddressWhereInput
    /**
     * Limit how many WebhookAddresses to update.
     */
    limit?: number
  }

  /**
   * WebhookAddress updateManyAndReturn
   */
  export type WebhookAddressUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookAddress
     */
    select?: WebhookAddressSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookAddress
     */
    omit?: WebhookAddressOmit<ExtArgs> | null
    /**
     * The data used to update WebhookAddresses.
     */
    data: XOR<WebhookAddressUpdateManyMutationInput, WebhookAddressUncheckedUpdateManyInput>
    /**
     * Filter which WebhookAddresses to update
     */
    where?: WebhookAddressWhereInput
    /**
     * Limit how many WebhookAddresses to update.
     */
    limit?: number
  }

  /**
   * WebhookAddress upsert
   */
  export type WebhookAddressUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookAddress
     */
    select?: WebhookAddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookAddress
     */
    omit?: WebhookAddressOmit<ExtArgs> | null
    /**
     * The filter to search for the WebhookAddress to update in case it exists.
     */
    where: WebhookAddressWhereUniqueInput
    /**
     * In case the WebhookAddress found by the `where` argument doesn't exist, create a new WebhookAddress with this data.
     */
    create: XOR<WebhookAddressCreateInput, WebhookAddressUncheckedCreateInput>
    /**
     * In case the WebhookAddress was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WebhookAddressUpdateInput, WebhookAddressUncheckedUpdateInput>
  }

  /**
   * WebhookAddress delete
   */
  export type WebhookAddressDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookAddress
     */
    select?: WebhookAddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookAddress
     */
    omit?: WebhookAddressOmit<ExtArgs> | null
    /**
     * Filter which WebhookAddress to delete.
     */
    where: WebhookAddressWhereUniqueInput
  }

  /**
   * WebhookAddress deleteMany
   */
  export type WebhookAddressDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WebhookAddresses to delete
     */
    where?: WebhookAddressWhereInput
    /**
     * Limit how many WebhookAddresses to delete.
     */
    limit?: number
  }

  /**
   * WebhookAddress without action
   */
  export type WebhookAddressDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookAddress
     */
    select?: WebhookAddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookAddress
     */
    omit?: WebhookAddressOmit<ExtArgs> | null
  }


  /**
   * Model WalletTransaction
   */

  export type AggregateWalletTransaction = {
    _count: WalletTransactionCountAggregateOutputType | null
    _avg: WalletTransactionAvgAggregateOutputType | null
    _sum: WalletTransactionSumAggregateOutputType | null
    _min: WalletTransactionMinAggregateOutputType | null
    _max: WalletTransactionMaxAggregateOutputType | null
  }

  export type WalletTransactionAvgAggregateOutputType = {
    blockNumber: number | null
    priceUSD: number | null
  }

  export type WalletTransactionSumAggregateOutputType = {
    blockNumber: number | null
    priceUSD: number | null
  }

  export type WalletTransactionMinAggregateOutputType = {
    id: string | null
    txHash: string | null
    fromAddress: string | null
    toAddress: string | null
    value: string | null
    blockNumber: number | null
    timestamp: Date | null
    type: string | null
    status: string | null
    tokenAddress: string | null
    tokenSymbol: string | null
    tokenName: string | null
    amount: string | null
    priceUSD: number | null
    gasUsed: string | null
    gasPrice: string | null
    category: string | null
    processed: boolean | null
    createdAt: Date | null
  }

  export type WalletTransactionMaxAggregateOutputType = {
    id: string | null
    txHash: string | null
    fromAddress: string | null
    toAddress: string | null
    value: string | null
    blockNumber: number | null
    timestamp: Date | null
    type: string | null
    status: string | null
    tokenAddress: string | null
    tokenSymbol: string | null
    tokenName: string | null
    amount: string | null
    priceUSD: number | null
    gasUsed: string | null
    gasPrice: string | null
    category: string | null
    processed: boolean | null
    createdAt: Date | null
  }

  export type WalletTransactionCountAggregateOutputType = {
    id: number
    txHash: number
    fromAddress: number
    toAddress: number
    value: number
    blockNumber: number
    timestamp: number
    type: number
    status: number
    tokenAddress: number
    tokenSymbol: number
    tokenName: number
    amount: number
    priceUSD: number
    gasUsed: number
    gasPrice: number
    category: number
    processed: number
    metadata: number
    createdAt: number
    _all: number
  }


  export type WalletTransactionAvgAggregateInputType = {
    blockNumber?: true
    priceUSD?: true
  }

  export type WalletTransactionSumAggregateInputType = {
    blockNumber?: true
    priceUSD?: true
  }

  export type WalletTransactionMinAggregateInputType = {
    id?: true
    txHash?: true
    fromAddress?: true
    toAddress?: true
    value?: true
    blockNumber?: true
    timestamp?: true
    type?: true
    status?: true
    tokenAddress?: true
    tokenSymbol?: true
    tokenName?: true
    amount?: true
    priceUSD?: true
    gasUsed?: true
    gasPrice?: true
    category?: true
    processed?: true
    createdAt?: true
  }

  export type WalletTransactionMaxAggregateInputType = {
    id?: true
    txHash?: true
    fromAddress?: true
    toAddress?: true
    value?: true
    blockNumber?: true
    timestamp?: true
    type?: true
    status?: true
    tokenAddress?: true
    tokenSymbol?: true
    tokenName?: true
    amount?: true
    priceUSD?: true
    gasUsed?: true
    gasPrice?: true
    category?: true
    processed?: true
    createdAt?: true
  }

  export type WalletTransactionCountAggregateInputType = {
    id?: true
    txHash?: true
    fromAddress?: true
    toAddress?: true
    value?: true
    blockNumber?: true
    timestamp?: true
    type?: true
    status?: true
    tokenAddress?: true
    tokenSymbol?: true
    tokenName?: true
    amount?: true
    priceUSD?: true
    gasUsed?: true
    gasPrice?: true
    category?: true
    processed?: true
    metadata?: true
    createdAt?: true
    _all?: true
  }

  export type WalletTransactionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WalletTransaction to aggregate.
     */
    where?: WalletTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WalletTransactions to fetch.
     */
    orderBy?: WalletTransactionOrderByWithRelationInput | WalletTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WalletTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WalletTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WalletTransactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WalletTransactions
    **/
    _count?: true | WalletTransactionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: WalletTransactionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: WalletTransactionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WalletTransactionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WalletTransactionMaxAggregateInputType
  }

  export type GetWalletTransactionAggregateType<T extends WalletTransactionAggregateArgs> = {
        [P in keyof T & keyof AggregateWalletTransaction]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWalletTransaction[P]>
      : GetScalarType<T[P], AggregateWalletTransaction[P]>
  }




  export type WalletTransactionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WalletTransactionWhereInput
    orderBy?: WalletTransactionOrderByWithAggregationInput | WalletTransactionOrderByWithAggregationInput[]
    by: WalletTransactionScalarFieldEnum[] | WalletTransactionScalarFieldEnum
    having?: WalletTransactionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WalletTransactionCountAggregateInputType | true
    _avg?: WalletTransactionAvgAggregateInputType
    _sum?: WalletTransactionSumAggregateInputType
    _min?: WalletTransactionMinAggregateInputType
    _max?: WalletTransactionMaxAggregateInputType
  }

  export type WalletTransactionGroupByOutputType = {
    id: string
    txHash: string
    fromAddress: string
    toAddress: string | null
    value: string
    blockNumber: number
    timestamp: Date
    type: string
    status: string
    tokenAddress: string | null
    tokenSymbol: string | null
    tokenName: string | null
    amount: string | null
    priceUSD: number | null
    gasUsed: string | null
    gasPrice: string | null
    category: string | null
    processed: boolean
    metadata: JsonValue | null
    createdAt: Date
    _count: WalletTransactionCountAggregateOutputType | null
    _avg: WalletTransactionAvgAggregateOutputType | null
    _sum: WalletTransactionSumAggregateOutputType | null
    _min: WalletTransactionMinAggregateOutputType | null
    _max: WalletTransactionMaxAggregateOutputType | null
  }

  type GetWalletTransactionGroupByPayload<T extends WalletTransactionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WalletTransactionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WalletTransactionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WalletTransactionGroupByOutputType[P]>
            : GetScalarType<T[P], WalletTransactionGroupByOutputType[P]>
        }
      >
    >


  export type WalletTransactionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    txHash?: boolean
    fromAddress?: boolean
    toAddress?: boolean
    value?: boolean
    blockNumber?: boolean
    timestamp?: boolean
    type?: boolean
    status?: boolean
    tokenAddress?: boolean
    tokenSymbol?: boolean
    tokenName?: boolean
    amount?: boolean
    priceUSD?: boolean
    gasUsed?: boolean
    gasPrice?: boolean
    category?: boolean
    processed?: boolean
    metadata?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["walletTransaction"]>

  export type WalletTransactionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    txHash?: boolean
    fromAddress?: boolean
    toAddress?: boolean
    value?: boolean
    blockNumber?: boolean
    timestamp?: boolean
    type?: boolean
    status?: boolean
    tokenAddress?: boolean
    tokenSymbol?: boolean
    tokenName?: boolean
    amount?: boolean
    priceUSD?: boolean
    gasUsed?: boolean
    gasPrice?: boolean
    category?: boolean
    processed?: boolean
    metadata?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["walletTransaction"]>

  export type WalletTransactionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    txHash?: boolean
    fromAddress?: boolean
    toAddress?: boolean
    value?: boolean
    blockNumber?: boolean
    timestamp?: boolean
    type?: boolean
    status?: boolean
    tokenAddress?: boolean
    tokenSymbol?: boolean
    tokenName?: boolean
    amount?: boolean
    priceUSD?: boolean
    gasUsed?: boolean
    gasPrice?: boolean
    category?: boolean
    processed?: boolean
    metadata?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["walletTransaction"]>

  export type WalletTransactionSelectScalar = {
    id?: boolean
    txHash?: boolean
    fromAddress?: boolean
    toAddress?: boolean
    value?: boolean
    blockNumber?: boolean
    timestamp?: boolean
    type?: boolean
    status?: boolean
    tokenAddress?: boolean
    tokenSymbol?: boolean
    tokenName?: boolean
    amount?: boolean
    priceUSD?: boolean
    gasUsed?: boolean
    gasPrice?: boolean
    category?: boolean
    processed?: boolean
    metadata?: boolean
    createdAt?: boolean
  }

  export type WalletTransactionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "txHash" | "fromAddress" | "toAddress" | "value" | "blockNumber" | "timestamp" | "type" | "status" | "tokenAddress" | "tokenSymbol" | "tokenName" | "amount" | "priceUSD" | "gasUsed" | "gasPrice" | "category" | "processed" | "metadata" | "createdAt", ExtArgs["result"]["walletTransaction"]>

  export type $WalletTransactionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WalletTransaction"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      txHash: string
      fromAddress: string
      toAddress: string | null
      value: string
      blockNumber: number
      timestamp: Date
      type: string
      status: string
      tokenAddress: string | null
      tokenSymbol: string | null
      tokenName: string | null
      amount: string | null
      priceUSD: number | null
      gasUsed: string | null
      gasPrice: string | null
      category: string | null
      processed: boolean
      metadata: Prisma.JsonValue | null
      createdAt: Date
    }, ExtArgs["result"]["walletTransaction"]>
    composites: {}
  }

  type WalletTransactionGetPayload<S extends boolean | null | undefined | WalletTransactionDefaultArgs> = $Result.GetResult<Prisma.$WalletTransactionPayload, S>

  type WalletTransactionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WalletTransactionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WalletTransactionCountAggregateInputType | true
    }

  export interface WalletTransactionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WalletTransaction'], meta: { name: 'WalletTransaction' } }
    /**
     * Find zero or one WalletTransaction that matches the filter.
     * @param {WalletTransactionFindUniqueArgs} args - Arguments to find a WalletTransaction
     * @example
     * // Get one WalletTransaction
     * const walletTransaction = await prisma.walletTransaction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WalletTransactionFindUniqueArgs>(args: SelectSubset<T, WalletTransactionFindUniqueArgs<ExtArgs>>): Prisma__WalletTransactionClient<$Result.GetResult<Prisma.$WalletTransactionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one WalletTransaction that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WalletTransactionFindUniqueOrThrowArgs} args - Arguments to find a WalletTransaction
     * @example
     * // Get one WalletTransaction
     * const walletTransaction = await prisma.walletTransaction.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WalletTransactionFindUniqueOrThrowArgs>(args: SelectSubset<T, WalletTransactionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WalletTransactionClient<$Result.GetResult<Prisma.$WalletTransactionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WalletTransaction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletTransactionFindFirstArgs} args - Arguments to find a WalletTransaction
     * @example
     * // Get one WalletTransaction
     * const walletTransaction = await prisma.walletTransaction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WalletTransactionFindFirstArgs>(args?: SelectSubset<T, WalletTransactionFindFirstArgs<ExtArgs>>): Prisma__WalletTransactionClient<$Result.GetResult<Prisma.$WalletTransactionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WalletTransaction that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletTransactionFindFirstOrThrowArgs} args - Arguments to find a WalletTransaction
     * @example
     * // Get one WalletTransaction
     * const walletTransaction = await prisma.walletTransaction.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WalletTransactionFindFirstOrThrowArgs>(args?: SelectSubset<T, WalletTransactionFindFirstOrThrowArgs<ExtArgs>>): Prisma__WalletTransactionClient<$Result.GetResult<Prisma.$WalletTransactionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more WalletTransactions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletTransactionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WalletTransactions
     * const walletTransactions = await prisma.walletTransaction.findMany()
     * 
     * // Get first 10 WalletTransactions
     * const walletTransactions = await prisma.walletTransaction.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const walletTransactionWithIdOnly = await prisma.walletTransaction.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WalletTransactionFindManyArgs>(args?: SelectSubset<T, WalletTransactionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WalletTransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a WalletTransaction.
     * @param {WalletTransactionCreateArgs} args - Arguments to create a WalletTransaction.
     * @example
     * // Create one WalletTransaction
     * const WalletTransaction = await prisma.walletTransaction.create({
     *   data: {
     *     // ... data to create a WalletTransaction
     *   }
     * })
     * 
     */
    create<T extends WalletTransactionCreateArgs>(args: SelectSubset<T, WalletTransactionCreateArgs<ExtArgs>>): Prisma__WalletTransactionClient<$Result.GetResult<Prisma.$WalletTransactionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many WalletTransactions.
     * @param {WalletTransactionCreateManyArgs} args - Arguments to create many WalletTransactions.
     * @example
     * // Create many WalletTransactions
     * const walletTransaction = await prisma.walletTransaction.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WalletTransactionCreateManyArgs>(args?: SelectSubset<T, WalletTransactionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many WalletTransactions and returns the data saved in the database.
     * @param {WalletTransactionCreateManyAndReturnArgs} args - Arguments to create many WalletTransactions.
     * @example
     * // Create many WalletTransactions
     * const walletTransaction = await prisma.walletTransaction.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many WalletTransactions and only return the `id`
     * const walletTransactionWithIdOnly = await prisma.walletTransaction.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WalletTransactionCreateManyAndReturnArgs>(args?: SelectSubset<T, WalletTransactionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WalletTransactionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a WalletTransaction.
     * @param {WalletTransactionDeleteArgs} args - Arguments to delete one WalletTransaction.
     * @example
     * // Delete one WalletTransaction
     * const WalletTransaction = await prisma.walletTransaction.delete({
     *   where: {
     *     // ... filter to delete one WalletTransaction
     *   }
     * })
     * 
     */
    delete<T extends WalletTransactionDeleteArgs>(args: SelectSubset<T, WalletTransactionDeleteArgs<ExtArgs>>): Prisma__WalletTransactionClient<$Result.GetResult<Prisma.$WalletTransactionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one WalletTransaction.
     * @param {WalletTransactionUpdateArgs} args - Arguments to update one WalletTransaction.
     * @example
     * // Update one WalletTransaction
     * const walletTransaction = await prisma.walletTransaction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WalletTransactionUpdateArgs>(args: SelectSubset<T, WalletTransactionUpdateArgs<ExtArgs>>): Prisma__WalletTransactionClient<$Result.GetResult<Prisma.$WalletTransactionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more WalletTransactions.
     * @param {WalletTransactionDeleteManyArgs} args - Arguments to filter WalletTransactions to delete.
     * @example
     * // Delete a few WalletTransactions
     * const { count } = await prisma.walletTransaction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WalletTransactionDeleteManyArgs>(args?: SelectSubset<T, WalletTransactionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WalletTransactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletTransactionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WalletTransactions
     * const walletTransaction = await prisma.walletTransaction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WalletTransactionUpdateManyArgs>(args: SelectSubset<T, WalletTransactionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WalletTransactions and returns the data updated in the database.
     * @param {WalletTransactionUpdateManyAndReturnArgs} args - Arguments to update many WalletTransactions.
     * @example
     * // Update many WalletTransactions
     * const walletTransaction = await prisma.walletTransaction.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more WalletTransactions and only return the `id`
     * const walletTransactionWithIdOnly = await prisma.walletTransaction.updateManyAndReturn({
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
    updateManyAndReturn<T extends WalletTransactionUpdateManyAndReturnArgs>(args: SelectSubset<T, WalletTransactionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WalletTransactionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one WalletTransaction.
     * @param {WalletTransactionUpsertArgs} args - Arguments to update or create a WalletTransaction.
     * @example
     * // Update or create a WalletTransaction
     * const walletTransaction = await prisma.walletTransaction.upsert({
     *   create: {
     *     // ... data to create a WalletTransaction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WalletTransaction we want to update
     *   }
     * })
     */
    upsert<T extends WalletTransactionUpsertArgs>(args: SelectSubset<T, WalletTransactionUpsertArgs<ExtArgs>>): Prisma__WalletTransactionClient<$Result.GetResult<Prisma.$WalletTransactionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of WalletTransactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletTransactionCountArgs} args - Arguments to filter WalletTransactions to count.
     * @example
     * // Count the number of WalletTransactions
     * const count = await prisma.walletTransaction.count({
     *   where: {
     *     // ... the filter for the WalletTransactions we want to count
     *   }
     * })
    **/
    count<T extends WalletTransactionCountArgs>(
      args?: Subset<T, WalletTransactionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WalletTransactionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WalletTransaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletTransactionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends WalletTransactionAggregateArgs>(args: Subset<T, WalletTransactionAggregateArgs>): Prisma.PrismaPromise<GetWalletTransactionAggregateType<T>>

    /**
     * Group by WalletTransaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletTransactionGroupByArgs} args - Group by arguments.
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
      T extends WalletTransactionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WalletTransactionGroupByArgs['orderBy'] }
        : { orderBy?: WalletTransactionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, WalletTransactionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWalletTransactionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WalletTransaction model
   */
  readonly fields: WalletTransactionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WalletTransaction.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WalletTransactionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the WalletTransaction model
   */
  interface WalletTransactionFieldRefs {
    readonly id: FieldRef<"WalletTransaction", 'String'>
    readonly txHash: FieldRef<"WalletTransaction", 'String'>
    readonly fromAddress: FieldRef<"WalletTransaction", 'String'>
    readonly toAddress: FieldRef<"WalletTransaction", 'String'>
    readonly value: FieldRef<"WalletTransaction", 'String'>
    readonly blockNumber: FieldRef<"WalletTransaction", 'Int'>
    readonly timestamp: FieldRef<"WalletTransaction", 'DateTime'>
    readonly type: FieldRef<"WalletTransaction", 'String'>
    readonly status: FieldRef<"WalletTransaction", 'String'>
    readonly tokenAddress: FieldRef<"WalletTransaction", 'String'>
    readonly tokenSymbol: FieldRef<"WalletTransaction", 'String'>
    readonly tokenName: FieldRef<"WalletTransaction", 'String'>
    readonly amount: FieldRef<"WalletTransaction", 'String'>
    readonly priceUSD: FieldRef<"WalletTransaction", 'Float'>
    readonly gasUsed: FieldRef<"WalletTransaction", 'String'>
    readonly gasPrice: FieldRef<"WalletTransaction", 'String'>
    readonly category: FieldRef<"WalletTransaction", 'String'>
    readonly processed: FieldRef<"WalletTransaction", 'Boolean'>
    readonly metadata: FieldRef<"WalletTransaction", 'Json'>
    readonly createdAt: FieldRef<"WalletTransaction", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * WalletTransaction findUnique
   */
  export type WalletTransactionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WalletTransaction
     */
    select?: WalletTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WalletTransaction
     */
    omit?: WalletTransactionOmit<ExtArgs> | null
    /**
     * Filter, which WalletTransaction to fetch.
     */
    where: WalletTransactionWhereUniqueInput
  }

  /**
   * WalletTransaction findUniqueOrThrow
   */
  export type WalletTransactionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WalletTransaction
     */
    select?: WalletTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WalletTransaction
     */
    omit?: WalletTransactionOmit<ExtArgs> | null
    /**
     * Filter, which WalletTransaction to fetch.
     */
    where: WalletTransactionWhereUniqueInput
  }

  /**
   * WalletTransaction findFirst
   */
  export type WalletTransactionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WalletTransaction
     */
    select?: WalletTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WalletTransaction
     */
    omit?: WalletTransactionOmit<ExtArgs> | null
    /**
     * Filter, which WalletTransaction to fetch.
     */
    where?: WalletTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WalletTransactions to fetch.
     */
    orderBy?: WalletTransactionOrderByWithRelationInput | WalletTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WalletTransactions.
     */
    cursor?: WalletTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WalletTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WalletTransactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WalletTransactions.
     */
    distinct?: WalletTransactionScalarFieldEnum | WalletTransactionScalarFieldEnum[]
  }

  /**
   * WalletTransaction findFirstOrThrow
   */
  export type WalletTransactionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WalletTransaction
     */
    select?: WalletTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WalletTransaction
     */
    omit?: WalletTransactionOmit<ExtArgs> | null
    /**
     * Filter, which WalletTransaction to fetch.
     */
    where?: WalletTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WalletTransactions to fetch.
     */
    orderBy?: WalletTransactionOrderByWithRelationInput | WalletTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WalletTransactions.
     */
    cursor?: WalletTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WalletTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WalletTransactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WalletTransactions.
     */
    distinct?: WalletTransactionScalarFieldEnum | WalletTransactionScalarFieldEnum[]
  }

  /**
   * WalletTransaction findMany
   */
  export type WalletTransactionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WalletTransaction
     */
    select?: WalletTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WalletTransaction
     */
    omit?: WalletTransactionOmit<ExtArgs> | null
    /**
     * Filter, which WalletTransactions to fetch.
     */
    where?: WalletTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WalletTransactions to fetch.
     */
    orderBy?: WalletTransactionOrderByWithRelationInput | WalletTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WalletTransactions.
     */
    cursor?: WalletTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WalletTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WalletTransactions.
     */
    skip?: number
    distinct?: WalletTransactionScalarFieldEnum | WalletTransactionScalarFieldEnum[]
  }

  /**
   * WalletTransaction create
   */
  export type WalletTransactionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WalletTransaction
     */
    select?: WalletTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WalletTransaction
     */
    omit?: WalletTransactionOmit<ExtArgs> | null
    /**
     * The data needed to create a WalletTransaction.
     */
    data: XOR<WalletTransactionCreateInput, WalletTransactionUncheckedCreateInput>
  }

  /**
   * WalletTransaction createMany
   */
  export type WalletTransactionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WalletTransactions.
     */
    data: WalletTransactionCreateManyInput | WalletTransactionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WalletTransaction createManyAndReturn
   */
  export type WalletTransactionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WalletTransaction
     */
    select?: WalletTransactionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WalletTransaction
     */
    omit?: WalletTransactionOmit<ExtArgs> | null
    /**
     * The data used to create many WalletTransactions.
     */
    data: WalletTransactionCreateManyInput | WalletTransactionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WalletTransaction update
   */
  export type WalletTransactionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WalletTransaction
     */
    select?: WalletTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WalletTransaction
     */
    omit?: WalletTransactionOmit<ExtArgs> | null
    /**
     * The data needed to update a WalletTransaction.
     */
    data: XOR<WalletTransactionUpdateInput, WalletTransactionUncheckedUpdateInput>
    /**
     * Choose, which WalletTransaction to update.
     */
    where: WalletTransactionWhereUniqueInput
  }

  /**
   * WalletTransaction updateMany
   */
  export type WalletTransactionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WalletTransactions.
     */
    data: XOR<WalletTransactionUpdateManyMutationInput, WalletTransactionUncheckedUpdateManyInput>
    /**
     * Filter which WalletTransactions to update
     */
    where?: WalletTransactionWhereInput
    /**
     * Limit how many WalletTransactions to update.
     */
    limit?: number
  }

  /**
   * WalletTransaction updateManyAndReturn
   */
  export type WalletTransactionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WalletTransaction
     */
    select?: WalletTransactionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WalletTransaction
     */
    omit?: WalletTransactionOmit<ExtArgs> | null
    /**
     * The data used to update WalletTransactions.
     */
    data: XOR<WalletTransactionUpdateManyMutationInput, WalletTransactionUncheckedUpdateManyInput>
    /**
     * Filter which WalletTransactions to update
     */
    where?: WalletTransactionWhereInput
    /**
     * Limit how many WalletTransactions to update.
     */
    limit?: number
  }

  /**
   * WalletTransaction upsert
   */
  export type WalletTransactionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WalletTransaction
     */
    select?: WalletTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WalletTransaction
     */
    omit?: WalletTransactionOmit<ExtArgs> | null
    /**
     * The filter to search for the WalletTransaction to update in case it exists.
     */
    where: WalletTransactionWhereUniqueInput
    /**
     * In case the WalletTransaction found by the `where` argument doesn't exist, create a new WalletTransaction with this data.
     */
    create: XOR<WalletTransactionCreateInput, WalletTransactionUncheckedCreateInput>
    /**
     * In case the WalletTransaction was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WalletTransactionUpdateInput, WalletTransactionUncheckedUpdateInput>
  }

  /**
   * WalletTransaction delete
   */
  export type WalletTransactionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WalletTransaction
     */
    select?: WalletTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WalletTransaction
     */
    omit?: WalletTransactionOmit<ExtArgs> | null
    /**
     * Filter which WalletTransaction to delete.
     */
    where: WalletTransactionWhereUniqueInput
  }

  /**
   * WalletTransaction deleteMany
   */
  export type WalletTransactionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WalletTransactions to delete
     */
    where?: WalletTransactionWhereInput
    /**
     * Limit how many WalletTransactions to delete.
     */
    limit?: number
  }

  /**
   * WalletTransaction without action
   */
  export type WalletTransactionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WalletTransaction
     */
    select?: WalletTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WalletTransaction
     */
    omit?: WalletTransactionOmit<ExtArgs> | null
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


  export const TrackedWalletScalarFieldEnum: {
    id: 'id',
    address: 'address',
    userId: 'userId',
    name: 'name',
    groupName: 'groupName',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TrackedWalletScalarFieldEnum = (typeof TrackedWalletScalarFieldEnum)[keyof typeof TrackedWalletScalarFieldEnum]


  export const AlchemyWebhookScalarFieldEnum: {
    id: 'id',
    webhookId: 'webhookId',
    webhookUrl: 'webhookUrl',
    signingKey: 'signingKey',
    isActive: 'isActive',
    lastSyncedAt: 'lastSyncedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AlchemyWebhookScalarFieldEnum = (typeof AlchemyWebhookScalarFieldEnum)[keyof typeof AlchemyWebhookScalarFieldEnum]


  export const WebhookAddressScalarFieldEnum: {
    id: 'id',
    webhookId: 'webhookId',
    address: 'address',
    addedAt: 'addedAt'
  };

  export type WebhookAddressScalarFieldEnum = (typeof WebhookAddressScalarFieldEnum)[keyof typeof WebhookAddressScalarFieldEnum]


  export const WalletTransactionScalarFieldEnum: {
    id: 'id',
    txHash: 'txHash',
    fromAddress: 'fromAddress',
    toAddress: 'toAddress',
    value: 'value',
    blockNumber: 'blockNumber',
    timestamp: 'timestamp',
    type: 'type',
    status: 'status',
    tokenAddress: 'tokenAddress',
    tokenSymbol: 'tokenSymbol',
    tokenName: 'tokenName',
    amount: 'amount',
    priceUSD: 'priceUSD',
    gasUsed: 'gasUsed',
    gasPrice: 'gasPrice',
    category: 'category',
    processed: 'processed',
    metadata: 'metadata',
    createdAt: 'createdAt'
  };

  export type WalletTransactionScalarFieldEnum = (typeof WalletTransactionScalarFieldEnum)[keyof typeof WalletTransactionScalarFieldEnum]


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
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    
  /**
   * Deep Input Types
   */


  export type TrackedWalletWhereInput = {
    AND?: TrackedWalletWhereInput | TrackedWalletWhereInput[]
    OR?: TrackedWalletWhereInput[]
    NOT?: TrackedWalletWhereInput | TrackedWalletWhereInput[]
    id?: StringFilter<"TrackedWallet"> | string
    address?: StringFilter<"TrackedWallet"> | string
    userId?: StringFilter<"TrackedWallet"> | string
    name?: StringFilter<"TrackedWallet"> | string
    groupName?: StringNullableFilter<"TrackedWallet"> | string | null
    isActive?: BoolFilter<"TrackedWallet"> | boolean
    createdAt?: DateTimeFilter<"TrackedWallet"> | Date | string
    updatedAt?: DateTimeFilter<"TrackedWallet"> | Date | string
  }

  export type TrackedWalletOrderByWithRelationInput = {
    id?: SortOrder
    address?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    groupName?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TrackedWalletWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_address?: TrackedWalletUserIdAddressCompoundUniqueInput
    AND?: TrackedWalletWhereInput | TrackedWalletWhereInput[]
    OR?: TrackedWalletWhereInput[]
    NOT?: TrackedWalletWhereInput | TrackedWalletWhereInput[]
    address?: StringFilter<"TrackedWallet"> | string
    userId?: StringFilter<"TrackedWallet"> | string
    name?: StringFilter<"TrackedWallet"> | string
    groupName?: StringNullableFilter<"TrackedWallet"> | string | null
    isActive?: BoolFilter<"TrackedWallet"> | boolean
    createdAt?: DateTimeFilter<"TrackedWallet"> | Date | string
    updatedAt?: DateTimeFilter<"TrackedWallet"> | Date | string
  }, "id" | "userId_address">

  export type TrackedWalletOrderByWithAggregationInput = {
    id?: SortOrder
    address?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    groupName?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TrackedWalletCountOrderByAggregateInput
    _max?: TrackedWalletMaxOrderByAggregateInput
    _min?: TrackedWalletMinOrderByAggregateInput
  }

  export type TrackedWalletScalarWhereWithAggregatesInput = {
    AND?: TrackedWalletScalarWhereWithAggregatesInput | TrackedWalletScalarWhereWithAggregatesInput[]
    OR?: TrackedWalletScalarWhereWithAggregatesInput[]
    NOT?: TrackedWalletScalarWhereWithAggregatesInput | TrackedWalletScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TrackedWallet"> | string
    address?: StringWithAggregatesFilter<"TrackedWallet"> | string
    userId?: StringWithAggregatesFilter<"TrackedWallet"> | string
    name?: StringWithAggregatesFilter<"TrackedWallet"> | string
    groupName?: StringNullableWithAggregatesFilter<"TrackedWallet"> | string | null
    isActive?: BoolWithAggregatesFilter<"TrackedWallet"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"TrackedWallet"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"TrackedWallet"> | Date | string
  }

  export type AlchemyWebhookWhereInput = {
    AND?: AlchemyWebhookWhereInput | AlchemyWebhookWhereInput[]
    OR?: AlchemyWebhookWhereInput[]
    NOT?: AlchemyWebhookWhereInput | AlchemyWebhookWhereInput[]
    id?: StringFilter<"AlchemyWebhook"> | string
    webhookId?: StringFilter<"AlchemyWebhook"> | string
    webhookUrl?: StringFilter<"AlchemyWebhook"> | string
    signingKey?: StringNullableFilter<"AlchemyWebhook"> | string | null
    isActive?: BoolFilter<"AlchemyWebhook"> | boolean
    lastSyncedAt?: DateTimeNullableFilter<"AlchemyWebhook"> | Date | string | null
    createdAt?: DateTimeFilter<"AlchemyWebhook"> | Date | string
    updatedAt?: DateTimeFilter<"AlchemyWebhook"> | Date | string
  }

  export type AlchemyWebhookOrderByWithRelationInput = {
    id?: SortOrder
    webhookId?: SortOrder
    webhookUrl?: SortOrder
    signingKey?: SortOrderInput | SortOrder
    isActive?: SortOrder
    lastSyncedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AlchemyWebhookWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    webhookId?: string
    AND?: AlchemyWebhookWhereInput | AlchemyWebhookWhereInput[]
    OR?: AlchemyWebhookWhereInput[]
    NOT?: AlchemyWebhookWhereInput | AlchemyWebhookWhereInput[]
    webhookUrl?: StringFilter<"AlchemyWebhook"> | string
    signingKey?: StringNullableFilter<"AlchemyWebhook"> | string | null
    isActive?: BoolFilter<"AlchemyWebhook"> | boolean
    lastSyncedAt?: DateTimeNullableFilter<"AlchemyWebhook"> | Date | string | null
    createdAt?: DateTimeFilter<"AlchemyWebhook"> | Date | string
    updatedAt?: DateTimeFilter<"AlchemyWebhook"> | Date | string
  }, "id" | "webhookId">

  export type AlchemyWebhookOrderByWithAggregationInput = {
    id?: SortOrder
    webhookId?: SortOrder
    webhookUrl?: SortOrder
    signingKey?: SortOrderInput | SortOrder
    isActive?: SortOrder
    lastSyncedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AlchemyWebhookCountOrderByAggregateInput
    _max?: AlchemyWebhookMaxOrderByAggregateInput
    _min?: AlchemyWebhookMinOrderByAggregateInput
  }

  export type AlchemyWebhookScalarWhereWithAggregatesInput = {
    AND?: AlchemyWebhookScalarWhereWithAggregatesInput | AlchemyWebhookScalarWhereWithAggregatesInput[]
    OR?: AlchemyWebhookScalarWhereWithAggregatesInput[]
    NOT?: AlchemyWebhookScalarWhereWithAggregatesInput | AlchemyWebhookScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AlchemyWebhook"> | string
    webhookId?: StringWithAggregatesFilter<"AlchemyWebhook"> | string
    webhookUrl?: StringWithAggregatesFilter<"AlchemyWebhook"> | string
    signingKey?: StringNullableWithAggregatesFilter<"AlchemyWebhook"> | string | null
    isActive?: BoolWithAggregatesFilter<"AlchemyWebhook"> | boolean
    lastSyncedAt?: DateTimeNullableWithAggregatesFilter<"AlchemyWebhook"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"AlchemyWebhook"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"AlchemyWebhook"> | Date | string
  }

  export type WebhookAddressWhereInput = {
    AND?: WebhookAddressWhereInput | WebhookAddressWhereInput[]
    OR?: WebhookAddressWhereInput[]
    NOT?: WebhookAddressWhereInput | WebhookAddressWhereInput[]
    id?: StringFilter<"WebhookAddress"> | string
    webhookId?: StringFilter<"WebhookAddress"> | string
    address?: StringFilter<"WebhookAddress"> | string
    addedAt?: DateTimeFilter<"WebhookAddress"> | Date | string
  }

  export type WebhookAddressOrderByWithRelationInput = {
    id?: SortOrder
    webhookId?: SortOrder
    address?: SortOrder
    addedAt?: SortOrder
  }

  export type WebhookAddressWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    webhookId_address?: WebhookAddressWebhookIdAddressCompoundUniqueInput
    AND?: WebhookAddressWhereInput | WebhookAddressWhereInput[]
    OR?: WebhookAddressWhereInput[]
    NOT?: WebhookAddressWhereInput | WebhookAddressWhereInput[]
    webhookId?: StringFilter<"WebhookAddress"> | string
    address?: StringFilter<"WebhookAddress"> | string
    addedAt?: DateTimeFilter<"WebhookAddress"> | Date | string
  }, "id" | "webhookId_address">

  export type WebhookAddressOrderByWithAggregationInput = {
    id?: SortOrder
    webhookId?: SortOrder
    address?: SortOrder
    addedAt?: SortOrder
    _count?: WebhookAddressCountOrderByAggregateInput
    _max?: WebhookAddressMaxOrderByAggregateInput
    _min?: WebhookAddressMinOrderByAggregateInput
  }

  export type WebhookAddressScalarWhereWithAggregatesInput = {
    AND?: WebhookAddressScalarWhereWithAggregatesInput | WebhookAddressScalarWhereWithAggregatesInput[]
    OR?: WebhookAddressScalarWhereWithAggregatesInput[]
    NOT?: WebhookAddressScalarWhereWithAggregatesInput | WebhookAddressScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"WebhookAddress"> | string
    webhookId?: StringWithAggregatesFilter<"WebhookAddress"> | string
    address?: StringWithAggregatesFilter<"WebhookAddress"> | string
    addedAt?: DateTimeWithAggregatesFilter<"WebhookAddress"> | Date | string
  }

  export type WalletTransactionWhereInput = {
    AND?: WalletTransactionWhereInput | WalletTransactionWhereInput[]
    OR?: WalletTransactionWhereInput[]
    NOT?: WalletTransactionWhereInput | WalletTransactionWhereInput[]
    id?: StringFilter<"WalletTransaction"> | string
    txHash?: StringFilter<"WalletTransaction"> | string
    fromAddress?: StringFilter<"WalletTransaction"> | string
    toAddress?: StringNullableFilter<"WalletTransaction"> | string | null
    value?: StringFilter<"WalletTransaction"> | string
    blockNumber?: IntFilter<"WalletTransaction"> | number
    timestamp?: DateTimeFilter<"WalletTransaction"> | Date | string
    type?: StringFilter<"WalletTransaction"> | string
    status?: StringFilter<"WalletTransaction"> | string
    tokenAddress?: StringNullableFilter<"WalletTransaction"> | string | null
    tokenSymbol?: StringNullableFilter<"WalletTransaction"> | string | null
    tokenName?: StringNullableFilter<"WalletTransaction"> | string | null
    amount?: StringNullableFilter<"WalletTransaction"> | string | null
    priceUSD?: FloatNullableFilter<"WalletTransaction"> | number | null
    gasUsed?: StringNullableFilter<"WalletTransaction"> | string | null
    gasPrice?: StringNullableFilter<"WalletTransaction"> | string | null
    category?: StringNullableFilter<"WalletTransaction"> | string | null
    processed?: BoolFilter<"WalletTransaction"> | boolean
    metadata?: JsonNullableFilter<"WalletTransaction">
    createdAt?: DateTimeFilter<"WalletTransaction"> | Date | string
  }

  export type WalletTransactionOrderByWithRelationInput = {
    id?: SortOrder
    txHash?: SortOrder
    fromAddress?: SortOrder
    toAddress?: SortOrderInput | SortOrder
    value?: SortOrder
    blockNumber?: SortOrder
    timestamp?: SortOrder
    type?: SortOrder
    status?: SortOrder
    tokenAddress?: SortOrderInput | SortOrder
    tokenSymbol?: SortOrderInput | SortOrder
    tokenName?: SortOrderInput | SortOrder
    amount?: SortOrderInput | SortOrder
    priceUSD?: SortOrderInput | SortOrder
    gasUsed?: SortOrderInput | SortOrder
    gasPrice?: SortOrderInput | SortOrder
    category?: SortOrderInput | SortOrder
    processed?: SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type WalletTransactionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    txHash?: string
    AND?: WalletTransactionWhereInput | WalletTransactionWhereInput[]
    OR?: WalletTransactionWhereInput[]
    NOT?: WalletTransactionWhereInput | WalletTransactionWhereInput[]
    fromAddress?: StringFilter<"WalletTransaction"> | string
    toAddress?: StringNullableFilter<"WalletTransaction"> | string | null
    value?: StringFilter<"WalletTransaction"> | string
    blockNumber?: IntFilter<"WalletTransaction"> | number
    timestamp?: DateTimeFilter<"WalletTransaction"> | Date | string
    type?: StringFilter<"WalletTransaction"> | string
    status?: StringFilter<"WalletTransaction"> | string
    tokenAddress?: StringNullableFilter<"WalletTransaction"> | string | null
    tokenSymbol?: StringNullableFilter<"WalletTransaction"> | string | null
    tokenName?: StringNullableFilter<"WalletTransaction"> | string | null
    amount?: StringNullableFilter<"WalletTransaction"> | string | null
    priceUSD?: FloatNullableFilter<"WalletTransaction"> | number | null
    gasUsed?: StringNullableFilter<"WalletTransaction"> | string | null
    gasPrice?: StringNullableFilter<"WalletTransaction"> | string | null
    category?: StringNullableFilter<"WalletTransaction"> | string | null
    processed?: BoolFilter<"WalletTransaction"> | boolean
    metadata?: JsonNullableFilter<"WalletTransaction">
    createdAt?: DateTimeFilter<"WalletTransaction"> | Date | string
  }, "id" | "txHash">

  export type WalletTransactionOrderByWithAggregationInput = {
    id?: SortOrder
    txHash?: SortOrder
    fromAddress?: SortOrder
    toAddress?: SortOrderInput | SortOrder
    value?: SortOrder
    blockNumber?: SortOrder
    timestamp?: SortOrder
    type?: SortOrder
    status?: SortOrder
    tokenAddress?: SortOrderInput | SortOrder
    tokenSymbol?: SortOrderInput | SortOrder
    tokenName?: SortOrderInput | SortOrder
    amount?: SortOrderInput | SortOrder
    priceUSD?: SortOrderInput | SortOrder
    gasUsed?: SortOrderInput | SortOrder
    gasPrice?: SortOrderInput | SortOrder
    category?: SortOrderInput | SortOrder
    processed?: SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: WalletTransactionCountOrderByAggregateInput
    _avg?: WalletTransactionAvgOrderByAggregateInput
    _max?: WalletTransactionMaxOrderByAggregateInput
    _min?: WalletTransactionMinOrderByAggregateInput
    _sum?: WalletTransactionSumOrderByAggregateInput
  }

  export type WalletTransactionScalarWhereWithAggregatesInput = {
    AND?: WalletTransactionScalarWhereWithAggregatesInput | WalletTransactionScalarWhereWithAggregatesInput[]
    OR?: WalletTransactionScalarWhereWithAggregatesInput[]
    NOT?: WalletTransactionScalarWhereWithAggregatesInput | WalletTransactionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"WalletTransaction"> | string
    txHash?: StringWithAggregatesFilter<"WalletTransaction"> | string
    fromAddress?: StringWithAggregatesFilter<"WalletTransaction"> | string
    toAddress?: StringNullableWithAggregatesFilter<"WalletTransaction"> | string | null
    value?: StringWithAggregatesFilter<"WalletTransaction"> | string
    blockNumber?: IntWithAggregatesFilter<"WalletTransaction"> | number
    timestamp?: DateTimeWithAggregatesFilter<"WalletTransaction"> | Date | string
    type?: StringWithAggregatesFilter<"WalletTransaction"> | string
    status?: StringWithAggregatesFilter<"WalletTransaction"> | string
    tokenAddress?: StringNullableWithAggregatesFilter<"WalletTransaction"> | string | null
    tokenSymbol?: StringNullableWithAggregatesFilter<"WalletTransaction"> | string | null
    tokenName?: StringNullableWithAggregatesFilter<"WalletTransaction"> | string | null
    amount?: StringNullableWithAggregatesFilter<"WalletTransaction"> | string | null
    priceUSD?: FloatNullableWithAggregatesFilter<"WalletTransaction"> | number | null
    gasUsed?: StringNullableWithAggregatesFilter<"WalletTransaction"> | string | null
    gasPrice?: StringNullableWithAggregatesFilter<"WalletTransaction"> | string | null
    category?: StringNullableWithAggregatesFilter<"WalletTransaction"> | string | null
    processed?: BoolWithAggregatesFilter<"WalletTransaction"> | boolean
    metadata?: JsonNullableWithAggregatesFilter<"WalletTransaction">
    createdAt?: DateTimeWithAggregatesFilter<"WalletTransaction"> | Date | string
  }

  export type TrackedWalletCreateInput = {
    id?: string
    address: string
    userId: string
    name: string
    groupName?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TrackedWalletUncheckedCreateInput = {
    id?: string
    address: string
    userId: string
    name: string
    groupName?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TrackedWalletUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    groupName?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TrackedWalletUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    groupName?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TrackedWalletCreateManyInput = {
    id?: string
    address: string
    userId: string
    name: string
    groupName?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TrackedWalletUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    groupName?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TrackedWalletUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    groupName?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AlchemyWebhookCreateInput = {
    id?: string
    webhookId: string
    webhookUrl: string
    signingKey?: string | null
    isActive?: boolean
    lastSyncedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AlchemyWebhookUncheckedCreateInput = {
    id?: string
    webhookId: string
    webhookUrl: string
    signingKey?: string | null
    isActive?: boolean
    lastSyncedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AlchemyWebhookUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    webhookId?: StringFieldUpdateOperationsInput | string
    webhookUrl?: StringFieldUpdateOperationsInput | string
    signingKey?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastSyncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AlchemyWebhookUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    webhookId?: StringFieldUpdateOperationsInput | string
    webhookUrl?: StringFieldUpdateOperationsInput | string
    signingKey?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastSyncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AlchemyWebhookCreateManyInput = {
    id?: string
    webhookId: string
    webhookUrl: string
    signingKey?: string | null
    isActive?: boolean
    lastSyncedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AlchemyWebhookUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    webhookId?: StringFieldUpdateOperationsInput | string
    webhookUrl?: StringFieldUpdateOperationsInput | string
    signingKey?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastSyncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AlchemyWebhookUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    webhookId?: StringFieldUpdateOperationsInput | string
    webhookUrl?: StringFieldUpdateOperationsInput | string
    signingKey?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastSyncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WebhookAddressCreateInput = {
    id?: string
    webhookId: string
    address: string
    addedAt?: Date | string
  }

  export type WebhookAddressUncheckedCreateInput = {
    id?: string
    webhookId: string
    address: string
    addedAt?: Date | string
  }

  export type WebhookAddressUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    webhookId?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WebhookAddressUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    webhookId?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WebhookAddressCreateManyInput = {
    id?: string
    webhookId: string
    address: string
    addedAt?: Date | string
  }

  export type WebhookAddressUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    webhookId?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WebhookAddressUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    webhookId?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WalletTransactionCreateInput = {
    id?: string
    txHash: string
    fromAddress: string
    toAddress?: string | null
    value: string
    blockNumber: number
    timestamp: Date | string
    type: string
    status: string
    tokenAddress?: string | null
    tokenSymbol?: string | null
    tokenName?: string | null
    amount?: string | null
    priceUSD?: number | null
    gasUsed?: string | null
    gasPrice?: string | null
    category?: string | null
    processed?: boolean
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type WalletTransactionUncheckedCreateInput = {
    id?: string
    txHash: string
    fromAddress: string
    toAddress?: string | null
    value: string
    blockNumber: number
    timestamp: Date | string
    type: string
    status: string
    tokenAddress?: string | null
    tokenSymbol?: string | null
    tokenName?: string | null
    amount?: string | null
    priceUSD?: number | null
    gasUsed?: string | null
    gasPrice?: string | null
    category?: string | null
    processed?: boolean
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type WalletTransactionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    txHash?: StringFieldUpdateOperationsInput | string
    fromAddress?: StringFieldUpdateOperationsInput | string
    toAddress?: NullableStringFieldUpdateOperationsInput | string | null
    value?: StringFieldUpdateOperationsInput | string
    blockNumber?: IntFieldUpdateOperationsInput | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    tokenAddress?: NullableStringFieldUpdateOperationsInput | string | null
    tokenSymbol?: NullableStringFieldUpdateOperationsInput | string | null
    tokenName?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: NullableStringFieldUpdateOperationsInput | string | null
    priceUSD?: NullableFloatFieldUpdateOperationsInput | number | null
    gasUsed?: NullableStringFieldUpdateOperationsInput | string | null
    gasPrice?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    processed?: BoolFieldUpdateOperationsInput | boolean
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WalletTransactionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    txHash?: StringFieldUpdateOperationsInput | string
    fromAddress?: StringFieldUpdateOperationsInput | string
    toAddress?: NullableStringFieldUpdateOperationsInput | string | null
    value?: StringFieldUpdateOperationsInput | string
    blockNumber?: IntFieldUpdateOperationsInput | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    tokenAddress?: NullableStringFieldUpdateOperationsInput | string | null
    tokenSymbol?: NullableStringFieldUpdateOperationsInput | string | null
    tokenName?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: NullableStringFieldUpdateOperationsInput | string | null
    priceUSD?: NullableFloatFieldUpdateOperationsInput | number | null
    gasUsed?: NullableStringFieldUpdateOperationsInput | string | null
    gasPrice?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    processed?: BoolFieldUpdateOperationsInput | boolean
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WalletTransactionCreateManyInput = {
    id?: string
    txHash: string
    fromAddress: string
    toAddress?: string | null
    value: string
    blockNumber: number
    timestamp: Date | string
    type: string
    status: string
    tokenAddress?: string | null
    tokenSymbol?: string | null
    tokenName?: string | null
    amount?: string | null
    priceUSD?: number | null
    gasUsed?: string | null
    gasPrice?: string | null
    category?: string | null
    processed?: boolean
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type WalletTransactionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    txHash?: StringFieldUpdateOperationsInput | string
    fromAddress?: StringFieldUpdateOperationsInput | string
    toAddress?: NullableStringFieldUpdateOperationsInput | string | null
    value?: StringFieldUpdateOperationsInput | string
    blockNumber?: IntFieldUpdateOperationsInput | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    tokenAddress?: NullableStringFieldUpdateOperationsInput | string | null
    tokenSymbol?: NullableStringFieldUpdateOperationsInput | string | null
    tokenName?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: NullableStringFieldUpdateOperationsInput | string | null
    priceUSD?: NullableFloatFieldUpdateOperationsInput | number | null
    gasUsed?: NullableStringFieldUpdateOperationsInput | string | null
    gasPrice?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    processed?: BoolFieldUpdateOperationsInput | boolean
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WalletTransactionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    txHash?: StringFieldUpdateOperationsInput | string
    fromAddress?: StringFieldUpdateOperationsInput | string
    toAddress?: NullableStringFieldUpdateOperationsInput | string | null
    value?: StringFieldUpdateOperationsInput | string
    blockNumber?: IntFieldUpdateOperationsInput | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    tokenAddress?: NullableStringFieldUpdateOperationsInput | string | null
    tokenSymbol?: NullableStringFieldUpdateOperationsInput | string | null
    tokenName?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: NullableStringFieldUpdateOperationsInput | string | null
    priceUSD?: NullableFloatFieldUpdateOperationsInput | number | null
    gasUsed?: NullableStringFieldUpdateOperationsInput | string | null
    gasPrice?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    processed?: BoolFieldUpdateOperationsInput | boolean
    metadata?: NullableJsonNullValueInput | InputJsonValue
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

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type TrackedWalletUserIdAddressCompoundUniqueInput = {
    userId: string
    address: string
  }

  export type TrackedWalletCountOrderByAggregateInput = {
    id?: SortOrder
    address?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    groupName?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TrackedWalletMaxOrderByAggregateInput = {
    id?: SortOrder
    address?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    groupName?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TrackedWalletMinOrderByAggregateInput = {
    id?: SortOrder
    address?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    groupName?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
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

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type AlchemyWebhookCountOrderByAggregateInput = {
    id?: SortOrder
    webhookId?: SortOrder
    webhookUrl?: SortOrder
    signingKey?: SortOrder
    isActive?: SortOrder
    lastSyncedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AlchemyWebhookMaxOrderByAggregateInput = {
    id?: SortOrder
    webhookId?: SortOrder
    webhookUrl?: SortOrder
    signingKey?: SortOrder
    isActive?: SortOrder
    lastSyncedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AlchemyWebhookMinOrderByAggregateInput = {
    id?: SortOrder
    webhookId?: SortOrder
    webhookUrl?: SortOrder
    signingKey?: SortOrder
    isActive?: SortOrder
    lastSyncedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
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

  export type WebhookAddressWebhookIdAddressCompoundUniqueInput = {
    webhookId: string
    address: string
  }

  export type WebhookAddressCountOrderByAggregateInput = {
    id?: SortOrder
    webhookId?: SortOrder
    address?: SortOrder
    addedAt?: SortOrder
  }

  export type WebhookAddressMaxOrderByAggregateInput = {
    id?: SortOrder
    webhookId?: SortOrder
    address?: SortOrder
    addedAt?: SortOrder
  }

  export type WebhookAddressMinOrderByAggregateInput = {
    id?: SortOrder
    webhookId?: SortOrder
    address?: SortOrder
    addedAt?: SortOrder
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

  export type WalletTransactionCountOrderByAggregateInput = {
    id?: SortOrder
    txHash?: SortOrder
    fromAddress?: SortOrder
    toAddress?: SortOrder
    value?: SortOrder
    blockNumber?: SortOrder
    timestamp?: SortOrder
    type?: SortOrder
    status?: SortOrder
    tokenAddress?: SortOrder
    tokenSymbol?: SortOrder
    tokenName?: SortOrder
    amount?: SortOrder
    priceUSD?: SortOrder
    gasUsed?: SortOrder
    gasPrice?: SortOrder
    category?: SortOrder
    processed?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
  }

  export type WalletTransactionAvgOrderByAggregateInput = {
    blockNumber?: SortOrder
    priceUSD?: SortOrder
  }

  export type WalletTransactionMaxOrderByAggregateInput = {
    id?: SortOrder
    txHash?: SortOrder
    fromAddress?: SortOrder
    toAddress?: SortOrder
    value?: SortOrder
    blockNumber?: SortOrder
    timestamp?: SortOrder
    type?: SortOrder
    status?: SortOrder
    tokenAddress?: SortOrder
    tokenSymbol?: SortOrder
    tokenName?: SortOrder
    amount?: SortOrder
    priceUSD?: SortOrder
    gasUsed?: SortOrder
    gasPrice?: SortOrder
    category?: SortOrder
    processed?: SortOrder
    createdAt?: SortOrder
  }

  export type WalletTransactionMinOrderByAggregateInput = {
    id?: SortOrder
    txHash?: SortOrder
    fromAddress?: SortOrder
    toAddress?: SortOrder
    value?: SortOrder
    blockNumber?: SortOrder
    timestamp?: SortOrder
    type?: SortOrder
    status?: SortOrder
    tokenAddress?: SortOrder
    tokenSymbol?: SortOrder
    tokenName?: SortOrder
    amount?: SortOrder
    priceUSD?: SortOrder
    gasUsed?: SortOrder
    gasPrice?: SortOrder
    category?: SortOrder
    processed?: SortOrder
    createdAt?: SortOrder
  }

  export type WalletTransactionSumOrderByAggregateInput = {
    blockNumber?: SortOrder
    priceUSD?: SortOrder
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

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
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

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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