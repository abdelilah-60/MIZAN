
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Farm
 * 
 */
export type Farm = $Result.DefaultSelection<Prisma.$FarmPayload>
/**
 * Model Field
 * 
 */
export type Field = $Result.DefaultSelection<Prisma.$FieldPayload>
/**
 * Model Operation
 * 
 */
export type Operation = $Result.DefaultSelection<Prisma.$OperationPayload>
/**
 * Model FieldDailyMetrics
 * 
 */
export type FieldDailyMetrics = $Result.DefaultSelection<Prisma.$FieldDailyMetricsPayload>
/**
 * Model FieldSeasonSummary
 * 
 */
export type FieldSeasonSummary = $Result.DefaultSelection<Prisma.$FieldSeasonSummaryPayload>
/**
 * Model IrrigationConfig
 * 
 */
export type IrrigationConfig = $Result.DefaultSelection<Prisma.$IrrigationConfigPayload>
/**
 * Model SoilAnalysis
 * 
 */
export type SoilAnalysis = $Result.DefaultSelection<Prisma.$SoilAnalysisPayload>
/**
 * Model YieldConfig
 * 
 */
export type YieldConfig = $Result.DefaultSelection<Prisma.$YieldConfigPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
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
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.PrismaClientConstructorArgs<ClientOptions>);
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
   * Read more in our [docs](https://pris.ly/d/raw-queries).
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
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
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
   * Read more in our [docs](https://pris.ly/d/raw-queries).
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
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.farm`: Exposes CRUD operations for the **Farm** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Farms
    * const farms = await prisma.farm.findMany()
    * ```
    */
  get farm(): Prisma.FarmDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.field`: Exposes CRUD operations for the **Field** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Fields
    * const fields = await prisma.field.findMany()
    * ```
    */
  get field(): Prisma.FieldDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.operation`: Exposes CRUD operations for the **Operation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Operations
    * const operations = await prisma.operation.findMany()
    * ```
    */
  get operation(): Prisma.OperationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.fieldDailyMetrics`: Exposes CRUD operations for the **FieldDailyMetrics** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FieldDailyMetrics
    * const fieldDailyMetrics = await prisma.fieldDailyMetrics.findMany()
    * ```
    */
  get fieldDailyMetrics(): Prisma.FieldDailyMetricsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.fieldSeasonSummary`: Exposes CRUD operations for the **FieldSeasonSummary** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FieldSeasonSummaries
    * const fieldSeasonSummaries = await prisma.fieldSeasonSummary.findMany()
    * ```
    */
  get fieldSeasonSummary(): Prisma.FieldSeasonSummaryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.irrigationConfig`: Exposes CRUD operations for the **IrrigationConfig** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more IrrigationConfigs
    * const irrigationConfigs = await prisma.irrigationConfig.findMany()
    * ```
    */
  get irrigationConfig(): Prisma.IrrigationConfigDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.soilAnalysis`: Exposes CRUD operations for the **SoilAnalysis** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SoilAnalyses
    * const soilAnalyses = await prisma.soilAnalysis.findMany()
    * ```
    */
  get soilAnalysis(): Prisma.SoilAnalysisDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.yieldConfig`: Exposes CRUD operations for the **YieldConfig** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more YieldConfigs
    * const yieldConfigs = await prisma.yieldConfig.findMany()
    * ```
    */
  get yieldConfig(): Prisma.YieldConfigDelegate<ExtArgs, ClientOptions>;
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
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.9.0
   * Query Engine version: e922089b7d7502aff4249d5da3420f6fa55fc6ad
   */
  export type PrismaVersion = {
    client: string
    engine: string
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
   * Resolved type of the argument passed to the `PrismaClient` constructor.
   *
   * When called without a narrower options type (the common case), this resolves
   * to `PrismaClientOptions` directly, which produces a clear TypeScript error
   * message (`not assignable to parameter of type 'PrismaClientOptions'`) when
   * the argument is missing or incomplete. When the user supplies a narrower
   * options type (e.g. via a literal), it falls back to `Subset` to keep
   * filtering out unknown properties.
   */
  export type PrismaClientConstructorArgs<Options extends PrismaClientOptions> =
    [PrismaClientOptions] extends [Options] ? PrismaClientOptions : Subset<Options, PrismaClientOptions>;

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
      ((Without<T, U> & U) | (Without<U, T> & T)) & object
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
    User: 'User',
    Farm: 'Farm',
    Field: 'Field',
    Operation: 'Operation',
    FieldDailyMetrics: 'FieldDailyMetrics',
    FieldSeasonSummary: 'FieldSeasonSummary',
    IrrigationConfig: 'IrrigationConfig',
    SoilAnalysis: 'SoilAnalysis',
    YieldConfig: 'YieldConfig'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "farm" | "field" | "operation" | "fieldDailyMetrics" | "fieldSeasonSummary" | "irrigationConfig" | "soilAnalysis" | "yieldConfig"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Farm: {
        payload: Prisma.$FarmPayload<ExtArgs>
        fields: Prisma.FarmFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FarmFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FarmPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FarmFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FarmPayload>
          }
          findFirst: {
            args: Prisma.FarmFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FarmPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FarmFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FarmPayload>
          }
          findMany: {
            args: Prisma.FarmFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FarmPayload>[]
          }
          create: {
            args: Prisma.FarmCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FarmPayload>
          }
          createMany: {
            args: Prisma.FarmCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FarmCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FarmPayload>[]
          }
          delete: {
            args: Prisma.FarmDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FarmPayload>
          }
          update: {
            args: Prisma.FarmUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FarmPayload>
          }
          deleteMany: {
            args: Prisma.FarmDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FarmUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FarmUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FarmPayload>[]
          }
          upsert: {
            args: Prisma.FarmUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FarmPayload>
          }
          aggregate: {
            args: Prisma.FarmAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFarm>
          }
          groupBy: {
            args: Prisma.FarmGroupByArgs<ExtArgs>
            result: $Utils.Optional<FarmGroupByOutputType>[]
          }
          count: {
            args: Prisma.FarmCountArgs<ExtArgs>
            result: $Utils.Optional<FarmCountAggregateOutputType> | number
          }
        }
      }
      Field: {
        payload: Prisma.$FieldPayload<ExtArgs>
        fields: Prisma.FieldFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FieldFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FieldPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FieldFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FieldPayload>
          }
          findFirst: {
            args: Prisma.FieldFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FieldPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FieldFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FieldPayload>
          }
          findMany: {
            args: Prisma.FieldFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FieldPayload>[]
          }
          create: {
            args: Prisma.FieldCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FieldPayload>
          }
          createMany: {
            args: Prisma.FieldCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FieldCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FieldPayload>[]
          }
          delete: {
            args: Prisma.FieldDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FieldPayload>
          }
          update: {
            args: Prisma.FieldUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FieldPayload>
          }
          deleteMany: {
            args: Prisma.FieldDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FieldUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FieldUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FieldPayload>[]
          }
          upsert: {
            args: Prisma.FieldUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FieldPayload>
          }
          aggregate: {
            args: Prisma.FieldAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateField>
          }
          groupBy: {
            args: Prisma.FieldGroupByArgs<ExtArgs>
            result: $Utils.Optional<FieldGroupByOutputType>[]
          }
          count: {
            args: Prisma.FieldCountArgs<ExtArgs>
            result: $Utils.Optional<FieldCountAggregateOutputType> | number
          }
        }
      }
      Operation: {
        payload: Prisma.$OperationPayload<ExtArgs>
        fields: Prisma.OperationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OperationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OperationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OperationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OperationPayload>
          }
          findFirst: {
            args: Prisma.OperationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OperationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OperationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OperationPayload>
          }
          findMany: {
            args: Prisma.OperationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OperationPayload>[]
          }
          create: {
            args: Prisma.OperationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OperationPayload>
          }
          createMany: {
            args: Prisma.OperationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OperationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OperationPayload>[]
          }
          delete: {
            args: Prisma.OperationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OperationPayload>
          }
          update: {
            args: Prisma.OperationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OperationPayload>
          }
          deleteMany: {
            args: Prisma.OperationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OperationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OperationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OperationPayload>[]
          }
          upsert: {
            args: Prisma.OperationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OperationPayload>
          }
          aggregate: {
            args: Prisma.OperationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOperation>
          }
          groupBy: {
            args: Prisma.OperationGroupByArgs<ExtArgs>
            result: $Utils.Optional<OperationGroupByOutputType>[]
          }
          count: {
            args: Prisma.OperationCountArgs<ExtArgs>
            result: $Utils.Optional<OperationCountAggregateOutputType> | number
          }
        }
      }
      FieldDailyMetrics: {
        payload: Prisma.$FieldDailyMetricsPayload<ExtArgs>
        fields: Prisma.FieldDailyMetricsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FieldDailyMetricsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FieldDailyMetricsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FieldDailyMetricsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FieldDailyMetricsPayload>
          }
          findFirst: {
            args: Prisma.FieldDailyMetricsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FieldDailyMetricsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FieldDailyMetricsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FieldDailyMetricsPayload>
          }
          findMany: {
            args: Prisma.FieldDailyMetricsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FieldDailyMetricsPayload>[]
          }
          create: {
            args: Prisma.FieldDailyMetricsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FieldDailyMetricsPayload>
          }
          createMany: {
            args: Prisma.FieldDailyMetricsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FieldDailyMetricsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FieldDailyMetricsPayload>[]
          }
          delete: {
            args: Prisma.FieldDailyMetricsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FieldDailyMetricsPayload>
          }
          update: {
            args: Prisma.FieldDailyMetricsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FieldDailyMetricsPayload>
          }
          deleteMany: {
            args: Prisma.FieldDailyMetricsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FieldDailyMetricsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FieldDailyMetricsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FieldDailyMetricsPayload>[]
          }
          upsert: {
            args: Prisma.FieldDailyMetricsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FieldDailyMetricsPayload>
          }
          aggregate: {
            args: Prisma.FieldDailyMetricsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFieldDailyMetrics>
          }
          groupBy: {
            args: Prisma.FieldDailyMetricsGroupByArgs<ExtArgs>
            result: $Utils.Optional<FieldDailyMetricsGroupByOutputType>[]
          }
          count: {
            args: Prisma.FieldDailyMetricsCountArgs<ExtArgs>
            result: $Utils.Optional<FieldDailyMetricsCountAggregateOutputType> | number
          }
        }
      }
      FieldSeasonSummary: {
        payload: Prisma.$FieldSeasonSummaryPayload<ExtArgs>
        fields: Prisma.FieldSeasonSummaryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FieldSeasonSummaryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FieldSeasonSummaryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FieldSeasonSummaryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FieldSeasonSummaryPayload>
          }
          findFirst: {
            args: Prisma.FieldSeasonSummaryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FieldSeasonSummaryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FieldSeasonSummaryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FieldSeasonSummaryPayload>
          }
          findMany: {
            args: Prisma.FieldSeasonSummaryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FieldSeasonSummaryPayload>[]
          }
          create: {
            args: Prisma.FieldSeasonSummaryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FieldSeasonSummaryPayload>
          }
          createMany: {
            args: Prisma.FieldSeasonSummaryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FieldSeasonSummaryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FieldSeasonSummaryPayload>[]
          }
          delete: {
            args: Prisma.FieldSeasonSummaryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FieldSeasonSummaryPayload>
          }
          update: {
            args: Prisma.FieldSeasonSummaryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FieldSeasonSummaryPayload>
          }
          deleteMany: {
            args: Prisma.FieldSeasonSummaryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FieldSeasonSummaryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FieldSeasonSummaryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FieldSeasonSummaryPayload>[]
          }
          upsert: {
            args: Prisma.FieldSeasonSummaryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FieldSeasonSummaryPayload>
          }
          aggregate: {
            args: Prisma.FieldSeasonSummaryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFieldSeasonSummary>
          }
          groupBy: {
            args: Prisma.FieldSeasonSummaryGroupByArgs<ExtArgs>
            result: $Utils.Optional<FieldSeasonSummaryGroupByOutputType>[]
          }
          count: {
            args: Prisma.FieldSeasonSummaryCountArgs<ExtArgs>
            result: $Utils.Optional<FieldSeasonSummaryCountAggregateOutputType> | number
          }
        }
      }
      IrrigationConfig: {
        payload: Prisma.$IrrigationConfigPayload<ExtArgs>
        fields: Prisma.IrrigationConfigFieldRefs
        operations: {
          findUnique: {
            args: Prisma.IrrigationConfigFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IrrigationConfigPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.IrrigationConfigFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IrrigationConfigPayload>
          }
          findFirst: {
            args: Prisma.IrrigationConfigFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IrrigationConfigPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.IrrigationConfigFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IrrigationConfigPayload>
          }
          findMany: {
            args: Prisma.IrrigationConfigFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IrrigationConfigPayload>[]
          }
          create: {
            args: Prisma.IrrigationConfigCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IrrigationConfigPayload>
          }
          createMany: {
            args: Prisma.IrrigationConfigCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.IrrigationConfigCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IrrigationConfigPayload>[]
          }
          delete: {
            args: Prisma.IrrigationConfigDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IrrigationConfigPayload>
          }
          update: {
            args: Prisma.IrrigationConfigUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IrrigationConfigPayload>
          }
          deleteMany: {
            args: Prisma.IrrigationConfigDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.IrrigationConfigUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.IrrigationConfigUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IrrigationConfigPayload>[]
          }
          upsert: {
            args: Prisma.IrrigationConfigUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IrrigationConfigPayload>
          }
          aggregate: {
            args: Prisma.IrrigationConfigAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateIrrigationConfig>
          }
          groupBy: {
            args: Prisma.IrrigationConfigGroupByArgs<ExtArgs>
            result: $Utils.Optional<IrrigationConfigGroupByOutputType>[]
          }
          count: {
            args: Prisma.IrrigationConfigCountArgs<ExtArgs>
            result: $Utils.Optional<IrrigationConfigCountAggregateOutputType> | number
          }
        }
      }
      SoilAnalysis: {
        payload: Prisma.$SoilAnalysisPayload<ExtArgs>
        fields: Prisma.SoilAnalysisFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SoilAnalysisFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SoilAnalysisPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SoilAnalysisFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SoilAnalysisPayload>
          }
          findFirst: {
            args: Prisma.SoilAnalysisFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SoilAnalysisPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SoilAnalysisFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SoilAnalysisPayload>
          }
          findMany: {
            args: Prisma.SoilAnalysisFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SoilAnalysisPayload>[]
          }
          create: {
            args: Prisma.SoilAnalysisCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SoilAnalysisPayload>
          }
          createMany: {
            args: Prisma.SoilAnalysisCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SoilAnalysisCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SoilAnalysisPayload>[]
          }
          delete: {
            args: Prisma.SoilAnalysisDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SoilAnalysisPayload>
          }
          update: {
            args: Prisma.SoilAnalysisUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SoilAnalysisPayload>
          }
          deleteMany: {
            args: Prisma.SoilAnalysisDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SoilAnalysisUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SoilAnalysisUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SoilAnalysisPayload>[]
          }
          upsert: {
            args: Prisma.SoilAnalysisUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SoilAnalysisPayload>
          }
          aggregate: {
            args: Prisma.SoilAnalysisAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSoilAnalysis>
          }
          groupBy: {
            args: Prisma.SoilAnalysisGroupByArgs<ExtArgs>
            result: $Utils.Optional<SoilAnalysisGroupByOutputType>[]
          }
          count: {
            args: Prisma.SoilAnalysisCountArgs<ExtArgs>
            result: $Utils.Optional<SoilAnalysisCountAggregateOutputType> | number
          }
        }
      }
      YieldConfig: {
        payload: Prisma.$YieldConfigPayload<ExtArgs>
        fields: Prisma.YieldConfigFieldRefs
        operations: {
          findUnique: {
            args: Prisma.YieldConfigFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$YieldConfigPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.YieldConfigFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$YieldConfigPayload>
          }
          findFirst: {
            args: Prisma.YieldConfigFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$YieldConfigPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.YieldConfigFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$YieldConfigPayload>
          }
          findMany: {
            args: Prisma.YieldConfigFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$YieldConfigPayload>[]
          }
          create: {
            args: Prisma.YieldConfigCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$YieldConfigPayload>
          }
          createMany: {
            args: Prisma.YieldConfigCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.YieldConfigCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$YieldConfigPayload>[]
          }
          delete: {
            args: Prisma.YieldConfigDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$YieldConfigPayload>
          }
          update: {
            args: Prisma.YieldConfigUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$YieldConfigPayload>
          }
          deleteMany: {
            args: Prisma.YieldConfigDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.YieldConfigUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.YieldConfigUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$YieldConfigPayload>[]
          }
          upsert: {
            args: Prisma.YieldConfigUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$YieldConfigPayload>
          }
          aggregate: {
            args: Prisma.YieldConfigAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateYieldConfig>
          }
          groupBy: {
            args: Prisma.YieldConfigGroupByArgs<ExtArgs>
            result: $Utils.Optional<YieldConfigGroupByOutputType>[]
          }
          count: {
            args: Prisma.YieldConfigCountArgs<ExtArgs>
            result: $Utils.Optional<YieldConfigCountAggregateOutputType> | number
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
     * Read more in our [docs](https://pris.ly/d/logging).
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
     * A driver adapter that PrismaClient uses to connect to your database, such as the ones provided by `@prisma/adapter-pg`, `@prisma/adapter-libsql`, `@prisma/adapter-planetscale`, etc.
     * 
     * A driver adapter is **required** unless you connect to your database through Prisma Accelerate (in which case use `accelerateUrl` instead).
     * 
     * Learn more: https://pris.ly/d/driver-adapters
     * 
     * @example
     * ```ts
     * import { PrismaPg } from '@prisma/adapter-pg'
     * import { PrismaClient } from './generated/prisma/client'
     * 
     * const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
     * const prisma = new PrismaClient({ adapter })
     * ```
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * The Prisma Accelerate connection URL. Use this option to connect to your database through Prisma Accelerate instead of using a driver adapter to connect directly.
     * 
     * Learn more: https://pris.ly/d/accelerate
     */
    accelerateUrl?: string
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
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    farm?: FarmOmit
    field?: FieldOmit
    operation?: OperationOmit
    fieldDailyMetrics?: FieldDailyMetricsOmit
    fieldSeasonSummary?: FieldSeasonSummaryOmit
    irrigationConfig?: IrrigationConfigOmit
    soilAnalysis?: SoilAnalysisOmit
    yieldConfig?: YieldConfigOmit
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
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    farms: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    farms?: boolean | UserCountOutputTypeCountFarmsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountFarmsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FarmWhereInput
  }


  /**
   * Count Type FarmCountOutputType
   */

  export type FarmCountOutputType = {
    fields: number
  }

  export type FarmCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    fields?: boolean | FarmCountOutputTypeCountFieldsArgs
  }

  // Custom InputTypes
  /**
   * FarmCountOutputType without action
   */
  export type FarmCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FarmCountOutputType
     */
    select?: FarmCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * FarmCountOutputType without action
   */
  export type FarmCountOutputTypeCountFieldsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FieldWhereInput
  }


  /**
   * Count Type FieldCountOutputType
   */

  export type FieldCountOutputType = {
    operations: number
    dailyMetrics: number
    seasonSummary: number
    soilAnalysis: number
  }

  export type FieldCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    operations?: boolean | FieldCountOutputTypeCountOperationsArgs
    dailyMetrics?: boolean | FieldCountOutputTypeCountDailyMetricsArgs
    seasonSummary?: boolean | FieldCountOutputTypeCountSeasonSummaryArgs
    soilAnalysis?: boolean | FieldCountOutputTypeCountSoilAnalysisArgs
  }

  // Custom InputTypes
  /**
   * FieldCountOutputType without action
   */
  export type FieldCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FieldCountOutputType
     */
    select?: FieldCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * FieldCountOutputType without action
   */
  export type FieldCountOutputTypeCountOperationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OperationWhereInput
  }

  /**
   * FieldCountOutputType without action
   */
  export type FieldCountOutputTypeCountDailyMetricsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FieldDailyMetricsWhereInput
  }

  /**
   * FieldCountOutputType without action
   */
  export type FieldCountOutputTypeCountSeasonSummaryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FieldSeasonSummaryWhereInput
  }

  /**
   * FieldCountOutputType without action
   */
  export type FieldCountOutputTypeCountSoilAnalysisArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SoilAnalysisWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    fullName: string | null
    email: string | null
    password: string | null
    phoneNumber: string | null
    role: string | null
    createdAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    fullName: string | null
    email: string | null
    password: string | null
    phoneNumber: string | null
    role: string | null
    createdAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    fullName: number
    email: number
    password: number
    phoneNumber: number
    role: number
    createdAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    fullName?: true
    email?: true
    password?: true
    phoneNumber?: true
    role?: true
    createdAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    fullName?: true
    email?: true
    password?: true
    phoneNumber?: true
    role?: true
    createdAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    fullName?: true
    email?: true
    password?: true
    phoneNumber?: true
    role?: true
    createdAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    fullName: string
    email: string
    password: string
    phoneNumber: string | null
    role: string
    createdAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fullName?: boolean
    email?: boolean
    password?: boolean
    phoneNumber?: boolean
    role?: boolean
    createdAt?: boolean
    farms?: boolean | User$farmsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fullName?: boolean
    email?: boolean
    password?: boolean
    phoneNumber?: boolean
    role?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fullName?: boolean
    email?: boolean
    password?: boolean
    phoneNumber?: boolean
    role?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    fullName?: boolean
    email?: boolean
    password?: boolean
    phoneNumber?: boolean
    role?: boolean
    createdAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "fullName" | "email" | "password" | "phoneNumber" | "role" | "createdAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    farms?: boolean | User$farmsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      farms: Prisma.$FarmPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      fullName: string
      email: string
      password: string
      phoneNumber: string | null
      role: string
      createdAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
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
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
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
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    farms<T extends User$farmsArgs<ExtArgs> = {}>(args?: Subset<T, User$farmsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FarmPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly fullName: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly phoneNumber: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.farms
   */
  export type User$farmsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Farm
     */
    select?: FarmSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Farm
     */
    omit?: FarmOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmInclude<ExtArgs> | null
    where?: FarmWhereInput
    orderBy?: FarmOrderByWithRelationInput | FarmOrderByWithRelationInput[]
    cursor?: FarmWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FarmScalarFieldEnum | FarmScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Farm
   */

  export type AggregateFarm = {
    _count: FarmCountAggregateOutputType | null
    _min: FarmMinAggregateOutputType | null
    _max: FarmMaxAggregateOutputType | null
  }

  export type FarmMinAggregateOutputType = {
    id: string | null
    name: string | null
    userId: string | null
    createdAt: Date | null
  }

  export type FarmMaxAggregateOutputType = {
    id: string | null
    name: string | null
    userId: string | null
    createdAt: Date | null
  }

  export type FarmCountAggregateOutputType = {
    id: number
    name: number
    userId: number
    createdAt: number
    _all: number
  }


  export type FarmMinAggregateInputType = {
    id?: true
    name?: true
    userId?: true
    createdAt?: true
  }

  export type FarmMaxAggregateInputType = {
    id?: true
    name?: true
    userId?: true
    createdAt?: true
  }

  export type FarmCountAggregateInputType = {
    id?: true
    name?: true
    userId?: true
    createdAt?: true
    _all?: true
  }

  export type FarmAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Farm to aggregate.
     */
    where?: FarmWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Farms to fetch.
     */
    orderBy?: FarmOrderByWithRelationInput | FarmOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FarmWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Farms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Farms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Farms
    **/
    _count?: true | FarmCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FarmMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FarmMaxAggregateInputType
  }

  export type GetFarmAggregateType<T extends FarmAggregateArgs> = {
        [P in keyof T & keyof AggregateFarm]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFarm[P]>
      : GetScalarType<T[P], AggregateFarm[P]>
  }




  export type FarmGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FarmWhereInput
    orderBy?: FarmOrderByWithAggregationInput | FarmOrderByWithAggregationInput[]
    by: FarmScalarFieldEnum[] | FarmScalarFieldEnum
    having?: FarmScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FarmCountAggregateInputType | true
    _min?: FarmMinAggregateInputType
    _max?: FarmMaxAggregateInputType
  }

  export type FarmGroupByOutputType = {
    id: string
    name: string
    userId: string
    createdAt: Date
    _count: FarmCountAggregateOutputType | null
    _min: FarmMinAggregateOutputType | null
    _max: FarmMaxAggregateOutputType | null
  }

  type GetFarmGroupByPayload<T extends FarmGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FarmGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FarmGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FarmGroupByOutputType[P]>
            : GetScalarType<T[P], FarmGroupByOutputType[P]>
        }
      >
    >


  export type FarmSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    userId?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    fields?: boolean | Farm$fieldsArgs<ExtArgs>
    _count?: boolean | FarmCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["farm"]>

  export type FarmSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    userId?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["farm"]>

  export type FarmSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    userId?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["farm"]>

  export type FarmSelectScalar = {
    id?: boolean
    name?: boolean
    userId?: boolean
    createdAt?: boolean
  }

  export type FarmOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "userId" | "createdAt", ExtArgs["result"]["farm"]>
  export type FarmInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    fields?: boolean | Farm$fieldsArgs<ExtArgs>
    _count?: boolean | FarmCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type FarmIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type FarmIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $FarmPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Farm"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      fields: Prisma.$FieldPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      userId: string
      createdAt: Date
    }, ExtArgs["result"]["farm"]>
    composites: {}
  }

  type FarmGetPayload<S extends boolean | null | undefined | FarmDefaultArgs> = $Result.GetResult<Prisma.$FarmPayload, S>

  type FarmCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FarmFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FarmCountAggregateInputType | true
    }

  export interface FarmDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Farm'], meta: { name: 'Farm' } }
    /**
     * Find zero or one Farm that matches the filter.
     * @param {FarmFindUniqueArgs} args - Arguments to find a Farm
     * @example
     * // Get one Farm
     * const farm = await prisma.farm.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FarmFindUniqueArgs>(args: SelectSubset<T, FarmFindUniqueArgs<ExtArgs>>): Prisma__FarmClient<$Result.GetResult<Prisma.$FarmPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Farm that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FarmFindUniqueOrThrowArgs} args - Arguments to find a Farm
     * @example
     * // Get one Farm
     * const farm = await prisma.farm.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FarmFindUniqueOrThrowArgs>(args: SelectSubset<T, FarmFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FarmClient<$Result.GetResult<Prisma.$FarmPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Farm that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FarmFindFirstArgs} args - Arguments to find a Farm
     * @example
     * // Get one Farm
     * const farm = await prisma.farm.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FarmFindFirstArgs>(args?: SelectSubset<T, FarmFindFirstArgs<ExtArgs>>): Prisma__FarmClient<$Result.GetResult<Prisma.$FarmPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Farm that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FarmFindFirstOrThrowArgs} args - Arguments to find a Farm
     * @example
     * // Get one Farm
     * const farm = await prisma.farm.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FarmFindFirstOrThrowArgs>(args?: SelectSubset<T, FarmFindFirstOrThrowArgs<ExtArgs>>): Prisma__FarmClient<$Result.GetResult<Prisma.$FarmPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Farms that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FarmFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Farms
     * const farms = await prisma.farm.findMany()
     * 
     * // Get first 10 Farms
     * const farms = await prisma.farm.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const farmWithIdOnly = await prisma.farm.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FarmFindManyArgs>(args?: SelectSubset<T, FarmFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FarmPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Farm.
     * @param {FarmCreateArgs} args - Arguments to create a Farm.
     * @example
     * // Create one Farm
     * const Farm = await prisma.farm.create({
     *   data: {
     *     // ... data to create a Farm
     *   }
     * })
     * 
     */
    create<T extends FarmCreateArgs>(args: SelectSubset<T, FarmCreateArgs<ExtArgs>>): Prisma__FarmClient<$Result.GetResult<Prisma.$FarmPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Farms.
     * @param {FarmCreateManyArgs} args - Arguments to create many Farms.
     * @example
     * // Create many Farms
     * const farm = await prisma.farm.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FarmCreateManyArgs>(args?: SelectSubset<T, FarmCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Farms and returns the data saved in the database.
     * @param {FarmCreateManyAndReturnArgs} args - Arguments to create many Farms.
     * @example
     * // Create many Farms
     * const farm = await prisma.farm.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Farms and only return the `id`
     * const farmWithIdOnly = await prisma.farm.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FarmCreateManyAndReturnArgs>(args?: SelectSubset<T, FarmCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FarmPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Farm.
     * @param {FarmDeleteArgs} args - Arguments to delete one Farm.
     * @example
     * // Delete one Farm
     * const Farm = await prisma.farm.delete({
     *   where: {
     *     // ... filter to delete one Farm
     *   }
     * })
     * 
     */
    delete<T extends FarmDeleteArgs>(args: SelectSubset<T, FarmDeleteArgs<ExtArgs>>): Prisma__FarmClient<$Result.GetResult<Prisma.$FarmPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Farm.
     * @param {FarmUpdateArgs} args - Arguments to update one Farm.
     * @example
     * // Update one Farm
     * const farm = await prisma.farm.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FarmUpdateArgs>(args: SelectSubset<T, FarmUpdateArgs<ExtArgs>>): Prisma__FarmClient<$Result.GetResult<Prisma.$FarmPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Farms.
     * @param {FarmDeleteManyArgs} args - Arguments to filter Farms to delete.
     * @example
     * // Delete a few Farms
     * const { count } = await prisma.farm.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FarmDeleteManyArgs>(args?: SelectSubset<T, FarmDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Farms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FarmUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Farms
     * const farm = await prisma.farm.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FarmUpdateManyArgs>(args: SelectSubset<T, FarmUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Farms and returns the data updated in the database.
     * @param {FarmUpdateManyAndReturnArgs} args - Arguments to update many Farms.
     * @example
     * // Update many Farms
     * const farm = await prisma.farm.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Farms and only return the `id`
     * const farmWithIdOnly = await prisma.farm.updateManyAndReturn({
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
    updateManyAndReturn<T extends FarmUpdateManyAndReturnArgs>(args: SelectSubset<T, FarmUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FarmPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Farm.
     * @param {FarmUpsertArgs} args - Arguments to update or create a Farm.
     * @example
     * // Update or create a Farm
     * const farm = await prisma.farm.upsert({
     *   create: {
     *     // ... data to create a Farm
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Farm we want to update
     *   }
     * })
     */
    upsert<T extends FarmUpsertArgs>(args: SelectSubset<T, FarmUpsertArgs<ExtArgs>>): Prisma__FarmClient<$Result.GetResult<Prisma.$FarmPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Farms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FarmCountArgs} args - Arguments to filter Farms to count.
     * @example
     * // Count the number of Farms
     * const count = await prisma.farm.count({
     *   where: {
     *     // ... the filter for the Farms we want to count
     *   }
     * })
    **/
    count<T extends FarmCountArgs>(
      args?: Subset<T, FarmCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FarmCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Farm.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FarmAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends FarmAggregateArgs>(args: Subset<T, FarmAggregateArgs>): Prisma.PrismaPromise<GetFarmAggregateType<T>>

    /**
     * Group by Farm.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FarmGroupByArgs} args - Group by arguments.
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
      T extends FarmGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FarmGroupByArgs['orderBy'] }
        : { orderBy?: FarmGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, FarmGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFarmGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Farm model
   */
  readonly fields: FarmFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Farm.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FarmClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    fields<T extends Farm$fieldsArgs<ExtArgs> = {}>(args?: Subset<T, Farm$fieldsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FieldPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Farm model
   */
  interface FarmFieldRefs {
    readonly id: FieldRef<"Farm", 'String'>
    readonly name: FieldRef<"Farm", 'String'>
    readonly userId: FieldRef<"Farm", 'String'>
    readonly createdAt: FieldRef<"Farm", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Farm findUnique
   */
  export type FarmFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Farm
     */
    select?: FarmSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Farm
     */
    omit?: FarmOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmInclude<ExtArgs> | null
    /**
     * Filter, which Farm to fetch.
     */
    where: FarmWhereUniqueInput
  }

  /**
   * Farm findUniqueOrThrow
   */
  export type FarmFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Farm
     */
    select?: FarmSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Farm
     */
    omit?: FarmOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmInclude<ExtArgs> | null
    /**
     * Filter, which Farm to fetch.
     */
    where: FarmWhereUniqueInput
  }

  /**
   * Farm findFirst
   */
  export type FarmFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Farm
     */
    select?: FarmSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Farm
     */
    omit?: FarmOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmInclude<ExtArgs> | null
    /**
     * Filter, which Farm to fetch.
     */
    where?: FarmWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Farms to fetch.
     */
    orderBy?: FarmOrderByWithRelationInput | FarmOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Farms.
     */
    cursor?: FarmWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Farms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Farms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Farms.
     */
    distinct?: FarmScalarFieldEnum | FarmScalarFieldEnum[]
  }

  /**
   * Farm findFirstOrThrow
   */
  export type FarmFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Farm
     */
    select?: FarmSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Farm
     */
    omit?: FarmOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmInclude<ExtArgs> | null
    /**
     * Filter, which Farm to fetch.
     */
    where?: FarmWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Farms to fetch.
     */
    orderBy?: FarmOrderByWithRelationInput | FarmOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Farms.
     */
    cursor?: FarmWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Farms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Farms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Farms.
     */
    distinct?: FarmScalarFieldEnum | FarmScalarFieldEnum[]
  }

  /**
   * Farm findMany
   */
  export type FarmFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Farm
     */
    select?: FarmSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Farm
     */
    omit?: FarmOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmInclude<ExtArgs> | null
    /**
     * Filter, which Farms to fetch.
     */
    where?: FarmWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Farms to fetch.
     */
    orderBy?: FarmOrderByWithRelationInput | FarmOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Farms.
     */
    cursor?: FarmWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Farms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Farms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Farms.
     */
    distinct?: FarmScalarFieldEnum | FarmScalarFieldEnum[]
  }

  /**
   * Farm create
   */
  export type FarmCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Farm
     */
    select?: FarmSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Farm
     */
    omit?: FarmOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmInclude<ExtArgs> | null
    /**
     * The data needed to create a Farm.
     */
    data: XOR<FarmCreateInput, FarmUncheckedCreateInput>
  }

  /**
   * Farm createMany
   */
  export type FarmCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Farms.
     */
    data: FarmCreateManyInput | FarmCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Farm createManyAndReturn
   */
  export type FarmCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Farm
     */
    select?: FarmSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Farm
     */
    omit?: FarmOmit<ExtArgs> | null
    /**
     * The data used to create many Farms.
     */
    data: FarmCreateManyInput | FarmCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Farm update
   */
  export type FarmUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Farm
     */
    select?: FarmSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Farm
     */
    omit?: FarmOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmInclude<ExtArgs> | null
    /**
     * The data needed to update a Farm.
     */
    data: XOR<FarmUpdateInput, FarmUncheckedUpdateInput>
    /**
     * Choose, which Farm to update.
     */
    where: FarmWhereUniqueInput
  }

  /**
   * Farm updateMany
   */
  export type FarmUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Farms.
     */
    data: XOR<FarmUpdateManyMutationInput, FarmUncheckedUpdateManyInput>
    /**
     * Filter which Farms to update
     */
    where?: FarmWhereInput
    /**
     * Limit how many Farms to update.
     */
    limit?: number
  }

  /**
   * Farm updateManyAndReturn
   */
  export type FarmUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Farm
     */
    select?: FarmSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Farm
     */
    omit?: FarmOmit<ExtArgs> | null
    /**
     * The data used to update Farms.
     */
    data: XOR<FarmUpdateManyMutationInput, FarmUncheckedUpdateManyInput>
    /**
     * Filter which Farms to update
     */
    where?: FarmWhereInput
    /**
     * Limit how many Farms to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Farm upsert
   */
  export type FarmUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Farm
     */
    select?: FarmSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Farm
     */
    omit?: FarmOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmInclude<ExtArgs> | null
    /**
     * The filter to search for the Farm to update in case it exists.
     */
    where: FarmWhereUniqueInput
    /**
     * In case the Farm found by the `where` argument doesn't exist, create a new Farm with this data.
     */
    create: XOR<FarmCreateInput, FarmUncheckedCreateInput>
    /**
     * In case the Farm was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FarmUpdateInput, FarmUncheckedUpdateInput>
  }

  /**
   * Farm delete
   */
  export type FarmDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Farm
     */
    select?: FarmSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Farm
     */
    omit?: FarmOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmInclude<ExtArgs> | null
    /**
     * Filter which Farm to delete.
     */
    where: FarmWhereUniqueInput
  }

  /**
   * Farm deleteMany
   */
  export type FarmDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Farms to delete
     */
    where?: FarmWhereInput
    /**
     * Limit how many Farms to delete.
     */
    limit?: number
  }

  /**
   * Farm.fields
   */
  export type Farm$fieldsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Field
     */
    select?: FieldSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Field
     */
    omit?: FieldOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FieldInclude<ExtArgs> | null
    where?: FieldWhereInput
    orderBy?: FieldOrderByWithRelationInput | FieldOrderByWithRelationInput[]
    cursor?: FieldWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FieldScalarFieldEnum | FieldScalarFieldEnum[]
  }

  /**
   * Farm without action
   */
  export type FarmDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Farm
     */
    select?: FarmSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Farm
     */
    omit?: FarmOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmInclude<ExtArgs> | null
  }


  /**
   * Model Field
   */

  export type AggregateField = {
    _count: FieldCountAggregateOutputType | null
    _avg: FieldAvgAggregateOutputType | null
    _sum: FieldSumAggregateOutputType | null
    _min: FieldMinAggregateOutputType | null
    _max: FieldMaxAggregateOutputType | null
  }

  export type FieldAvgAggregateOutputType = {
    area: number | null
  }

  export type FieldSumAggregateOutputType = {
    area: number | null
  }

  export type FieldMinAggregateOutputType = {
    id: string | null
    name: string | null
    farmId: string | null
    area: number | null
    cropType: string | null
    plantingDate: Date | null
    createdAt: Date | null
  }

  export type FieldMaxAggregateOutputType = {
    id: string | null
    name: string | null
    farmId: string | null
    area: number | null
    cropType: string | null
    plantingDate: Date | null
    createdAt: Date | null
  }

  export type FieldCountAggregateOutputType = {
    id: number
    name: number
    farmId: number
    geoPolygon: number
    area: number
    cropType: number
    equipmentConfig: number
    soilMetadata: number
    plantingDate: number
    agronomicData: number
    createdAt: number
    _all: number
  }


  export type FieldAvgAggregateInputType = {
    area?: true
  }

  export type FieldSumAggregateInputType = {
    area?: true
  }

  export type FieldMinAggregateInputType = {
    id?: true
    name?: true
    farmId?: true
    area?: true
    cropType?: true
    plantingDate?: true
    createdAt?: true
  }

  export type FieldMaxAggregateInputType = {
    id?: true
    name?: true
    farmId?: true
    area?: true
    cropType?: true
    plantingDate?: true
    createdAt?: true
  }

  export type FieldCountAggregateInputType = {
    id?: true
    name?: true
    farmId?: true
    geoPolygon?: true
    area?: true
    cropType?: true
    equipmentConfig?: true
    soilMetadata?: true
    plantingDate?: true
    agronomicData?: true
    createdAt?: true
    _all?: true
  }

  export type FieldAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Field to aggregate.
     */
    where?: FieldWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Fields to fetch.
     */
    orderBy?: FieldOrderByWithRelationInput | FieldOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FieldWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Fields from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Fields.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Fields
    **/
    _count?: true | FieldCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FieldAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FieldSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FieldMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FieldMaxAggregateInputType
  }

  export type GetFieldAggregateType<T extends FieldAggregateArgs> = {
        [P in keyof T & keyof AggregateField]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateField[P]>
      : GetScalarType<T[P], AggregateField[P]>
  }




  export type FieldGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FieldWhereInput
    orderBy?: FieldOrderByWithAggregationInput | FieldOrderByWithAggregationInput[]
    by: FieldScalarFieldEnum[] | FieldScalarFieldEnum
    having?: FieldScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FieldCountAggregateInputType | true
    _avg?: FieldAvgAggregateInputType
    _sum?: FieldSumAggregateInputType
    _min?: FieldMinAggregateInputType
    _max?: FieldMaxAggregateInputType
  }

  export type FieldGroupByOutputType = {
    id: string
    name: string
    farmId: string
    geoPolygon: JsonValue
    area: number
    cropType: string
    equipmentConfig: JsonValue | null
    soilMetadata: JsonValue | null
    plantingDate: Date | null
    agronomicData: JsonValue | null
    createdAt: Date
    _count: FieldCountAggregateOutputType | null
    _avg: FieldAvgAggregateOutputType | null
    _sum: FieldSumAggregateOutputType | null
    _min: FieldMinAggregateOutputType | null
    _max: FieldMaxAggregateOutputType | null
  }

  type GetFieldGroupByPayload<T extends FieldGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FieldGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FieldGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FieldGroupByOutputType[P]>
            : GetScalarType<T[P], FieldGroupByOutputType[P]>
        }
      >
    >


  export type FieldSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    farmId?: boolean
    geoPolygon?: boolean
    area?: boolean
    cropType?: boolean
    equipmentConfig?: boolean
    soilMetadata?: boolean
    plantingDate?: boolean
    agronomicData?: boolean
    createdAt?: boolean
    farm?: boolean | FarmDefaultArgs<ExtArgs>
    operations?: boolean | Field$operationsArgs<ExtArgs>
    dailyMetrics?: boolean | Field$dailyMetricsArgs<ExtArgs>
    seasonSummary?: boolean | Field$seasonSummaryArgs<ExtArgs>
    irrigationConfig?: boolean | Field$irrigationConfigArgs<ExtArgs>
    soilAnalysis?: boolean | Field$soilAnalysisArgs<ExtArgs>
    yieldConfig?: boolean | Field$yieldConfigArgs<ExtArgs>
    _count?: boolean | FieldCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["field"]>

  export type FieldSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    farmId?: boolean
    geoPolygon?: boolean
    area?: boolean
    cropType?: boolean
    equipmentConfig?: boolean
    soilMetadata?: boolean
    plantingDate?: boolean
    agronomicData?: boolean
    createdAt?: boolean
    farm?: boolean | FarmDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["field"]>

  export type FieldSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    farmId?: boolean
    geoPolygon?: boolean
    area?: boolean
    cropType?: boolean
    equipmentConfig?: boolean
    soilMetadata?: boolean
    plantingDate?: boolean
    agronomicData?: boolean
    createdAt?: boolean
    farm?: boolean | FarmDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["field"]>

  export type FieldSelectScalar = {
    id?: boolean
    name?: boolean
    farmId?: boolean
    geoPolygon?: boolean
    area?: boolean
    cropType?: boolean
    equipmentConfig?: boolean
    soilMetadata?: boolean
    plantingDate?: boolean
    agronomicData?: boolean
    createdAt?: boolean
  }

  export type FieldOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "farmId" | "geoPolygon" | "area" | "cropType" | "equipmentConfig" | "soilMetadata" | "plantingDate" | "agronomicData" | "createdAt", ExtArgs["result"]["field"]>
  export type FieldInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    farm?: boolean | FarmDefaultArgs<ExtArgs>
    operations?: boolean | Field$operationsArgs<ExtArgs>
    dailyMetrics?: boolean | Field$dailyMetricsArgs<ExtArgs>
    seasonSummary?: boolean | Field$seasonSummaryArgs<ExtArgs>
    irrigationConfig?: boolean | Field$irrigationConfigArgs<ExtArgs>
    soilAnalysis?: boolean | Field$soilAnalysisArgs<ExtArgs>
    yieldConfig?: boolean | Field$yieldConfigArgs<ExtArgs>
    _count?: boolean | FieldCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type FieldIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    farm?: boolean | FarmDefaultArgs<ExtArgs>
  }
  export type FieldIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    farm?: boolean | FarmDefaultArgs<ExtArgs>
  }

  export type $FieldPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Field"
    objects: {
      farm: Prisma.$FarmPayload<ExtArgs>
      operations: Prisma.$OperationPayload<ExtArgs>[]
      dailyMetrics: Prisma.$FieldDailyMetricsPayload<ExtArgs>[]
      seasonSummary: Prisma.$FieldSeasonSummaryPayload<ExtArgs>[]
      irrigationConfig: Prisma.$IrrigationConfigPayload<ExtArgs> | null
      soilAnalysis: Prisma.$SoilAnalysisPayload<ExtArgs>[]
      yieldConfig: Prisma.$YieldConfigPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      farmId: string
      geoPolygon: Prisma.JsonValue
      area: number
      cropType: string
      equipmentConfig: Prisma.JsonValue | null
      soilMetadata: Prisma.JsonValue | null
      plantingDate: Date | null
      agronomicData: Prisma.JsonValue | null
      createdAt: Date
    }, ExtArgs["result"]["field"]>
    composites: {}
  }

  type FieldGetPayload<S extends boolean | null | undefined | FieldDefaultArgs> = $Result.GetResult<Prisma.$FieldPayload, S>

  type FieldCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FieldFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FieldCountAggregateInputType | true
    }

  export interface FieldDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Field'], meta: { name: 'Field' } }
    /**
     * Find zero or one Field that matches the filter.
     * @param {FieldFindUniqueArgs} args - Arguments to find a Field
     * @example
     * // Get one Field
     * const field = await prisma.field.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FieldFindUniqueArgs>(args: SelectSubset<T, FieldFindUniqueArgs<ExtArgs>>): Prisma__FieldClient<$Result.GetResult<Prisma.$FieldPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Field that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FieldFindUniqueOrThrowArgs} args - Arguments to find a Field
     * @example
     * // Get one Field
     * const field = await prisma.field.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FieldFindUniqueOrThrowArgs>(args: SelectSubset<T, FieldFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FieldClient<$Result.GetResult<Prisma.$FieldPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Field that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FieldFindFirstArgs} args - Arguments to find a Field
     * @example
     * // Get one Field
     * const field = await prisma.field.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FieldFindFirstArgs>(args?: SelectSubset<T, FieldFindFirstArgs<ExtArgs>>): Prisma__FieldClient<$Result.GetResult<Prisma.$FieldPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Field that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FieldFindFirstOrThrowArgs} args - Arguments to find a Field
     * @example
     * // Get one Field
     * const field = await prisma.field.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FieldFindFirstOrThrowArgs>(args?: SelectSubset<T, FieldFindFirstOrThrowArgs<ExtArgs>>): Prisma__FieldClient<$Result.GetResult<Prisma.$FieldPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Fields that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FieldFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Fields
     * const fields = await prisma.field.findMany()
     * 
     * // Get first 10 Fields
     * const fields = await prisma.field.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const fieldWithIdOnly = await prisma.field.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FieldFindManyArgs>(args?: SelectSubset<T, FieldFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FieldPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Field.
     * @param {FieldCreateArgs} args - Arguments to create a Field.
     * @example
     * // Create one Field
     * const Field = await prisma.field.create({
     *   data: {
     *     // ... data to create a Field
     *   }
     * })
     * 
     */
    create<T extends FieldCreateArgs>(args: SelectSubset<T, FieldCreateArgs<ExtArgs>>): Prisma__FieldClient<$Result.GetResult<Prisma.$FieldPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Fields.
     * @param {FieldCreateManyArgs} args - Arguments to create many Fields.
     * @example
     * // Create many Fields
     * const field = await prisma.field.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FieldCreateManyArgs>(args?: SelectSubset<T, FieldCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Fields and returns the data saved in the database.
     * @param {FieldCreateManyAndReturnArgs} args - Arguments to create many Fields.
     * @example
     * // Create many Fields
     * const field = await prisma.field.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Fields and only return the `id`
     * const fieldWithIdOnly = await prisma.field.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FieldCreateManyAndReturnArgs>(args?: SelectSubset<T, FieldCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FieldPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Field.
     * @param {FieldDeleteArgs} args - Arguments to delete one Field.
     * @example
     * // Delete one Field
     * const Field = await prisma.field.delete({
     *   where: {
     *     // ... filter to delete one Field
     *   }
     * })
     * 
     */
    delete<T extends FieldDeleteArgs>(args: SelectSubset<T, FieldDeleteArgs<ExtArgs>>): Prisma__FieldClient<$Result.GetResult<Prisma.$FieldPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Field.
     * @param {FieldUpdateArgs} args - Arguments to update one Field.
     * @example
     * // Update one Field
     * const field = await prisma.field.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FieldUpdateArgs>(args: SelectSubset<T, FieldUpdateArgs<ExtArgs>>): Prisma__FieldClient<$Result.GetResult<Prisma.$FieldPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Fields.
     * @param {FieldDeleteManyArgs} args - Arguments to filter Fields to delete.
     * @example
     * // Delete a few Fields
     * const { count } = await prisma.field.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FieldDeleteManyArgs>(args?: SelectSubset<T, FieldDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Fields.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FieldUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Fields
     * const field = await prisma.field.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FieldUpdateManyArgs>(args: SelectSubset<T, FieldUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Fields and returns the data updated in the database.
     * @param {FieldUpdateManyAndReturnArgs} args - Arguments to update many Fields.
     * @example
     * // Update many Fields
     * const field = await prisma.field.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Fields and only return the `id`
     * const fieldWithIdOnly = await prisma.field.updateManyAndReturn({
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
    updateManyAndReturn<T extends FieldUpdateManyAndReturnArgs>(args: SelectSubset<T, FieldUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FieldPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Field.
     * @param {FieldUpsertArgs} args - Arguments to update or create a Field.
     * @example
     * // Update or create a Field
     * const field = await prisma.field.upsert({
     *   create: {
     *     // ... data to create a Field
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Field we want to update
     *   }
     * })
     */
    upsert<T extends FieldUpsertArgs>(args: SelectSubset<T, FieldUpsertArgs<ExtArgs>>): Prisma__FieldClient<$Result.GetResult<Prisma.$FieldPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Fields.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FieldCountArgs} args - Arguments to filter Fields to count.
     * @example
     * // Count the number of Fields
     * const count = await prisma.field.count({
     *   where: {
     *     // ... the filter for the Fields we want to count
     *   }
     * })
    **/
    count<T extends FieldCountArgs>(
      args?: Subset<T, FieldCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FieldCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Field.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FieldAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends FieldAggregateArgs>(args: Subset<T, FieldAggregateArgs>): Prisma.PrismaPromise<GetFieldAggregateType<T>>

    /**
     * Group by Field.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FieldGroupByArgs} args - Group by arguments.
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
      T extends FieldGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FieldGroupByArgs['orderBy'] }
        : { orderBy?: FieldGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, FieldGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFieldGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Field model
   */
  readonly fields: FieldFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Field.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FieldClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    farm<T extends FarmDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FarmDefaultArgs<ExtArgs>>): Prisma__FarmClient<$Result.GetResult<Prisma.$FarmPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    operations<T extends Field$operationsArgs<ExtArgs> = {}>(args?: Subset<T, Field$operationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OperationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    dailyMetrics<T extends Field$dailyMetricsArgs<ExtArgs> = {}>(args?: Subset<T, Field$dailyMetricsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FieldDailyMetricsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    seasonSummary<T extends Field$seasonSummaryArgs<ExtArgs> = {}>(args?: Subset<T, Field$seasonSummaryArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FieldSeasonSummaryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    irrigationConfig<T extends Field$irrigationConfigArgs<ExtArgs> = {}>(args?: Subset<T, Field$irrigationConfigArgs<ExtArgs>>): Prisma__IrrigationConfigClient<$Result.GetResult<Prisma.$IrrigationConfigPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    soilAnalysis<T extends Field$soilAnalysisArgs<ExtArgs> = {}>(args?: Subset<T, Field$soilAnalysisArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SoilAnalysisPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    yieldConfig<T extends Field$yieldConfigArgs<ExtArgs> = {}>(args?: Subset<T, Field$yieldConfigArgs<ExtArgs>>): Prisma__YieldConfigClient<$Result.GetResult<Prisma.$YieldConfigPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Field model
   */
  interface FieldFieldRefs {
    readonly id: FieldRef<"Field", 'String'>
    readonly name: FieldRef<"Field", 'String'>
    readonly farmId: FieldRef<"Field", 'String'>
    readonly geoPolygon: FieldRef<"Field", 'Json'>
    readonly area: FieldRef<"Field", 'Float'>
    readonly cropType: FieldRef<"Field", 'String'>
    readonly equipmentConfig: FieldRef<"Field", 'Json'>
    readonly soilMetadata: FieldRef<"Field", 'Json'>
    readonly plantingDate: FieldRef<"Field", 'DateTime'>
    readonly agronomicData: FieldRef<"Field", 'Json'>
    readonly createdAt: FieldRef<"Field", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Field findUnique
   */
  export type FieldFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Field
     */
    select?: FieldSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Field
     */
    omit?: FieldOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FieldInclude<ExtArgs> | null
    /**
     * Filter, which Field to fetch.
     */
    where: FieldWhereUniqueInput
  }

  /**
   * Field findUniqueOrThrow
   */
  export type FieldFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Field
     */
    select?: FieldSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Field
     */
    omit?: FieldOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FieldInclude<ExtArgs> | null
    /**
     * Filter, which Field to fetch.
     */
    where: FieldWhereUniqueInput
  }

  /**
   * Field findFirst
   */
  export type FieldFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Field
     */
    select?: FieldSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Field
     */
    omit?: FieldOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FieldInclude<ExtArgs> | null
    /**
     * Filter, which Field to fetch.
     */
    where?: FieldWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Fields to fetch.
     */
    orderBy?: FieldOrderByWithRelationInput | FieldOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Fields.
     */
    cursor?: FieldWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Fields from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Fields.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Fields.
     */
    distinct?: FieldScalarFieldEnum | FieldScalarFieldEnum[]
  }

  /**
   * Field findFirstOrThrow
   */
  export type FieldFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Field
     */
    select?: FieldSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Field
     */
    omit?: FieldOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FieldInclude<ExtArgs> | null
    /**
     * Filter, which Field to fetch.
     */
    where?: FieldWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Fields to fetch.
     */
    orderBy?: FieldOrderByWithRelationInput | FieldOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Fields.
     */
    cursor?: FieldWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Fields from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Fields.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Fields.
     */
    distinct?: FieldScalarFieldEnum | FieldScalarFieldEnum[]
  }

  /**
   * Field findMany
   */
  export type FieldFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Field
     */
    select?: FieldSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Field
     */
    omit?: FieldOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FieldInclude<ExtArgs> | null
    /**
     * Filter, which Fields to fetch.
     */
    where?: FieldWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Fields to fetch.
     */
    orderBy?: FieldOrderByWithRelationInput | FieldOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Fields.
     */
    cursor?: FieldWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Fields from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Fields.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Fields.
     */
    distinct?: FieldScalarFieldEnum | FieldScalarFieldEnum[]
  }

  /**
   * Field create
   */
  export type FieldCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Field
     */
    select?: FieldSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Field
     */
    omit?: FieldOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FieldInclude<ExtArgs> | null
    /**
     * The data needed to create a Field.
     */
    data: XOR<FieldCreateInput, FieldUncheckedCreateInput>
  }

  /**
   * Field createMany
   */
  export type FieldCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Fields.
     */
    data: FieldCreateManyInput | FieldCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Field createManyAndReturn
   */
  export type FieldCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Field
     */
    select?: FieldSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Field
     */
    omit?: FieldOmit<ExtArgs> | null
    /**
     * The data used to create many Fields.
     */
    data: FieldCreateManyInput | FieldCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FieldIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Field update
   */
  export type FieldUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Field
     */
    select?: FieldSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Field
     */
    omit?: FieldOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FieldInclude<ExtArgs> | null
    /**
     * The data needed to update a Field.
     */
    data: XOR<FieldUpdateInput, FieldUncheckedUpdateInput>
    /**
     * Choose, which Field to update.
     */
    where: FieldWhereUniqueInput
  }

  /**
   * Field updateMany
   */
  export type FieldUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Fields.
     */
    data: XOR<FieldUpdateManyMutationInput, FieldUncheckedUpdateManyInput>
    /**
     * Filter which Fields to update
     */
    where?: FieldWhereInput
    /**
     * Limit how many Fields to update.
     */
    limit?: number
  }

  /**
   * Field updateManyAndReturn
   */
  export type FieldUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Field
     */
    select?: FieldSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Field
     */
    omit?: FieldOmit<ExtArgs> | null
    /**
     * The data used to update Fields.
     */
    data: XOR<FieldUpdateManyMutationInput, FieldUncheckedUpdateManyInput>
    /**
     * Filter which Fields to update
     */
    where?: FieldWhereInput
    /**
     * Limit how many Fields to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FieldIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Field upsert
   */
  export type FieldUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Field
     */
    select?: FieldSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Field
     */
    omit?: FieldOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FieldInclude<ExtArgs> | null
    /**
     * The filter to search for the Field to update in case it exists.
     */
    where: FieldWhereUniqueInput
    /**
     * In case the Field found by the `where` argument doesn't exist, create a new Field with this data.
     */
    create: XOR<FieldCreateInput, FieldUncheckedCreateInput>
    /**
     * In case the Field was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FieldUpdateInput, FieldUncheckedUpdateInput>
  }

  /**
   * Field delete
   */
  export type FieldDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Field
     */
    select?: FieldSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Field
     */
    omit?: FieldOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FieldInclude<ExtArgs> | null
    /**
     * Filter which Field to delete.
     */
    where: FieldWhereUniqueInput
  }

  /**
   * Field deleteMany
   */
  export type FieldDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Fields to delete
     */
    where?: FieldWhereInput
    /**
     * Limit how many Fields to delete.
     */
    limit?: number
  }

  /**
   * Field.operations
   */
  export type Field$operationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Operation
     */
    select?: OperationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Operation
     */
    omit?: OperationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OperationInclude<ExtArgs> | null
    where?: OperationWhereInput
    orderBy?: OperationOrderByWithRelationInput | OperationOrderByWithRelationInput[]
    cursor?: OperationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OperationScalarFieldEnum | OperationScalarFieldEnum[]
  }

  /**
   * Field.dailyMetrics
   */
  export type Field$dailyMetricsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FieldDailyMetrics
     */
    select?: FieldDailyMetricsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FieldDailyMetrics
     */
    omit?: FieldDailyMetricsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FieldDailyMetricsInclude<ExtArgs> | null
    where?: FieldDailyMetricsWhereInput
    orderBy?: FieldDailyMetricsOrderByWithRelationInput | FieldDailyMetricsOrderByWithRelationInput[]
    cursor?: FieldDailyMetricsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FieldDailyMetricsScalarFieldEnum | FieldDailyMetricsScalarFieldEnum[]
  }

  /**
   * Field.seasonSummary
   */
  export type Field$seasonSummaryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FieldSeasonSummary
     */
    select?: FieldSeasonSummarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the FieldSeasonSummary
     */
    omit?: FieldSeasonSummaryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FieldSeasonSummaryInclude<ExtArgs> | null
    where?: FieldSeasonSummaryWhereInput
    orderBy?: FieldSeasonSummaryOrderByWithRelationInput | FieldSeasonSummaryOrderByWithRelationInput[]
    cursor?: FieldSeasonSummaryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FieldSeasonSummaryScalarFieldEnum | FieldSeasonSummaryScalarFieldEnum[]
  }

  /**
   * Field.irrigationConfig
   */
  export type Field$irrigationConfigArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IrrigationConfig
     */
    select?: IrrigationConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IrrigationConfig
     */
    omit?: IrrigationConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IrrigationConfigInclude<ExtArgs> | null
    where?: IrrigationConfigWhereInput
  }

  /**
   * Field.soilAnalysis
   */
  export type Field$soilAnalysisArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SoilAnalysis
     */
    select?: SoilAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SoilAnalysis
     */
    omit?: SoilAnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SoilAnalysisInclude<ExtArgs> | null
    where?: SoilAnalysisWhereInput
    orderBy?: SoilAnalysisOrderByWithRelationInput | SoilAnalysisOrderByWithRelationInput[]
    cursor?: SoilAnalysisWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SoilAnalysisScalarFieldEnum | SoilAnalysisScalarFieldEnum[]
  }

  /**
   * Field.yieldConfig
   */
  export type Field$yieldConfigArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the YieldConfig
     */
    select?: YieldConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the YieldConfig
     */
    omit?: YieldConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: YieldConfigInclude<ExtArgs> | null
    where?: YieldConfigWhereInput
  }

  /**
   * Field without action
   */
  export type FieldDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Field
     */
    select?: FieldSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Field
     */
    omit?: FieldOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FieldInclude<ExtArgs> | null
  }


  /**
   * Model Operation
   */

  export type AggregateOperation = {
    _count: OperationCountAggregateOutputType | null
    _min: OperationMinAggregateOutputType | null
    _max: OperationMaxAggregateOutputType | null
  }

  export type OperationMinAggregateOutputType = {
    id: string | null
    type: string | null
    date: Date | null
    fieldId: string | null
    createdAt: Date | null
  }

  export type OperationMaxAggregateOutputType = {
    id: string | null
    type: string | null
    date: Date | null
    fieldId: string | null
    createdAt: Date | null
  }

  export type OperationCountAggregateOutputType = {
    id: number
    type: number
    date: number
    metadata: number
    fieldId: number
    createdAt: number
    _all: number
  }


  export type OperationMinAggregateInputType = {
    id?: true
    type?: true
    date?: true
    fieldId?: true
    createdAt?: true
  }

  export type OperationMaxAggregateInputType = {
    id?: true
    type?: true
    date?: true
    fieldId?: true
    createdAt?: true
  }

  export type OperationCountAggregateInputType = {
    id?: true
    type?: true
    date?: true
    metadata?: true
    fieldId?: true
    createdAt?: true
    _all?: true
  }

  export type OperationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Operation to aggregate.
     */
    where?: OperationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Operations to fetch.
     */
    orderBy?: OperationOrderByWithRelationInput | OperationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OperationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Operations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Operations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Operations
    **/
    _count?: true | OperationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OperationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OperationMaxAggregateInputType
  }

  export type GetOperationAggregateType<T extends OperationAggregateArgs> = {
        [P in keyof T & keyof AggregateOperation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOperation[P]>
      : GetScalarType<T[P], AggregateOperation[P]>
  }




  export type OperationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OperationWhereInput
    orderBy?: OperationOrderByWithAggregationInput | OperationOrderByWithAggregationInput[]
    by: OperationScalarFieldEnum[] | OperationScalarFieldEnum
    having?: OperationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OperationCountAggregateInputType | true
    _min?: OperationMinAggregateInputType
    _max?: OperationMaxAggregateInputType
  }

  export type OperationGroupByOutputType = {
    id: string
    type: string
    date: Date
    metadata: JsonValue
    fieldId: string
    createdAt: Date
    _count: OperationCountAggregateOutputType | null
    _min: OperationMinAggregateOutputType | null
    _max: OperationMaxAggregateOutputType | null
  }

  type GetOperationGroupByPayload<T extends OperationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OperationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OperationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OperationGroupByOutputType[P]>
            : GetScalarType<T[P], OperationGroupByOutputType[P]>
        }
      >
    >


  export type OperationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    date?: boolean
    metadata?: boolean
    fieldId?: boolean
    createdAt?: boolean
    field?: boolean | FieldDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["operation"]>

  export type OperationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    date?: boolean
    metadata?: boolean
    fieldId?: boolean
    createdAt?: boolean
    field?: boolean | FieldDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["operation"]>

  export type OperationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    date?: boolean
    metadata?: boolean
    fieldId?: boolean
    createdAt?: boolean
    field?: boolean | FieldDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["operation"]>

  export type OperationSelectScalar = {
    id?: boolean
    type?: boolean
    date?: boolean
    metadata?: boolean
    fieldId?: boolean
    createdAt?: boolean
  }

  export type OperationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "type" | "date" | "metadata" | "fieldId" | "createdAt", ExtArgs["result"]["operation"]>
  export type OperationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    field?: boolean | FieldDefaultArgs<ExtArgs>
  }
  export type OperationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    field?: boolean | FieldDefaultArgs<ExtArgs>
  }
  export type OperationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    field?: boolean | FieldDefaultArgs<ExtArgs>
  }

  export type $OperationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Operation"
    objects: {
      field: Prisma.$FieldPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      type: string
      date: Date
      metadata: Prisma.JsonValue
      fieldId: string
      createdAt: Date
    }, ExtArgs["result"]["operation"]>
    composites: {}
  }

  type OperationGetPayload<S extends boolean | null | undefined | OperationDefaultArgs> = $Result.GetResult<Prisma.$OperationPayload, S>

  type OperationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OperationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OperationCountAggregateInputType | true
    }

  export interface OperationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Operation'], meta: { name: 'Operation' } }
    /**
     * Find zero or one Operation that matches the filter.
     * @param {OperationFindUniqueArgs} args - Arguments to find a Operation
     * @example
     * // Get one Operation
     * const operation = await prisma.operation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OperationFindUniqueArgs>(args: SelectSubset<T, OperationFindUniqueArgs<ExtArgs>>): Prisma__OperationClient<$Result.GetResult<Prisma.$OperationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Operation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OperationFindUniqueOrThrowArgs} args - Arguments to find a Operation
     * @example
     * // Get one Operation
     * const operation = await prisma.operation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OperationFindUniqueOrThrowArgs>(args: SelectSubset<T, OperationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OperationClient<$Result.GetResult<Prisma.$OperationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Operation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OperationFindFirstArgs} args - Arguments to find a Operation
     * @example
     * // Get one Operation
     * const operation = await prisma.operation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OperationFindFirstArgs>(args?: SelectSubset<T, OperationFindFirstArgs<ExtArgs>>): Prisma__OperationClient<$Result.GetResult<Prisma.$OperationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Operation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OperationFindFirstOrThrowArgs} args - Arguments to find a Operation
     * @example
     * // Get one Operation
     * const operation = await prisma.operation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OperationFindFirstOrThrowArgs>(args?: SelectSubset<T, OperationFindFirstOrThrowArgs<ExtArgs>>): Prisma__OperationClient<$Result.GetResult<Prisma.$OperationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Operations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OperationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Operations
     * const operations = await prisma.operation.findMany()
     * 
     * // Get first 10 Operations
     * const operations = await prisma.operation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const operationWithIdOnly = await prisma.operation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OperationFindManyArgs>(args?: SelectSubset<T, OperationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OperationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Operation.
     * @param {OperationCreateArgs} args - Arguments to create a Operation.
     * @example
     * // Create one Operation
     * const Operation = await prisma.operation.create({
     *   data: {
     *     // ... data to create a Operation
     *   }
     * })
     * 
     */
    create<T extends OperationCreateArgs>(args: SelectSubset<T, OperationCreateArgs<ExtArgs>>): Prisma__OperationClient<$Result.GetResult<Prisma.$OperationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Operations.
     * @param {OperationCreateManyArgs} args - Arguments to create many Operations.
     * @example
     * // Create many Operations
     * const operation = await prisma.operation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OperationCreateManyArgs>(args?: SelectSubset<T, OperationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Operations and returns the data saved in the database.
     * @param {OperationCreateManyAndReturnArgs} args - Arguments to create many Operations.
     * @example
     * // Create many Operations
     * const operation = await prisma.operation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Operations and only return the `id`
     * const operationWithIdOnly = await prisma.operation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OperationCreateManyAndReturnArgs>(args?: SelectSubset<T, OperationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OperationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Operation.
     * @param {OperationDeleteArgs} args - Arguments to delete one Operation.
     * @example
     * // Delete one Operation
     * const Operation = await prisma.operation.delete({
     *   where: {
     *     // ... filter to delete one Operation
     *   }
     * })
     * 
     */
    delete<T extends OperationDeleteArgs>(args: SelectSubset<T, OperationDeleteArgs<ExtArgs>>): Prisma__OperationClient<$Result.GetResult<Prisma.$OperationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Operation.
     * @param {OperationUpdateArgs} args - Arguments to update one Operation.
     * @example
     * // Update one Operation
     * const operation = await prisma.operation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OperationUpdateArgs>(args: SelectSubset<T, OperationUpdateArgs<ExtArgs>>): Prisma__OperationClient<$Result.GetResult<Prisma.$OperationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Operations.
     * @param {OperationDeleteManyArgs} args - Arguments to filter Operations to delete.
     * @example
     * // Delete a few Operations
     * const { count } = await prisma.operation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OperationDeleteManyArgs>(args?: SelectSubset<T, OperationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Operations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OperationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Operations
     * const operation = await prisma.operation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OperationUpdateManyArgs>(args: SelectSubset<T, OperationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Operations and returns the data updated in the database.
     * @param {OperationUpdateManyAndReturnArgs} args - Arguments to update many Operations.
     * @example
     * // Update many Operations
     * const operation = await prisma.operation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Operations and only return the `id`
     * const operationWithIdOnly = await prisma.operation.updateManyAndReturn({
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
    updateManyAndReturn<T extends OperationUpdateManyAndReturnArgs>(args: SelectSubset<T, OperationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OperationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Operation.
     * @param {OperationUpsertArgs} args - Arguments to update or create a Operation.
     * @example
     * // Update or create a Operation
     * const operation = await prisma.operation.upsert({
     *   create: {
     *     // ... data to create a Operation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Operation we want to update
     *   }
     * })
     */
    upsert<T extends OperationUpsertArgs>(args: SelectSubset<T, OperationUpsertArgs<ExtArgs>>): Prisma__OperationClient<$Result.GetResult<Prisma.$OperationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Operations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OperationCountArgs} args - Arguments to filter Operations to count.
     * @example
     * // Count the number of Operations
     * const count = await prisma.operation.count({
     *   where: {
     *     // ... the filter for the Operations we want to count
     *   }
     * })
    **/
    count<T extends OperationCountArgs>(
      args?: Subset<T, OperationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OperationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Operation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OperationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends OperationAggregateArgs>(args: Subset<T, OperationAggregateArgs>): Prisma.PrismaPromise<GetOperationAggregateType<T>>

    /**
     * Group by Operation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OperationGroupByArgs} args - Group by arguments.
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
      T extends OperationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OperationGroupByArgs['orderBy'] }
        : { orderBy?: OperationGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, OperationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOperationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Operation model
   */
  readonly fields: OperationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Operation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OperationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    field<T extends FieldDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FieldDefaultArgs<ExtArgs>>): Prisma__FieldClient<$Result.GetResult<Prisma.$FieldPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Operation model
   */
  interface OperationFieldRefs {
    readonly id: FieldRef<"Operation", 'String'>
    readonly type: FieldRef<"Operation", 'String'>
    readonly date: FieldRef<"Operation", 'DateTime'>
    readonly metadata: FieldRef<"Operation", 'Json'>
    readonly fieldId: FieldRef<"Operation", 'String'>
    readonly createdAt: FieldRef<"Operation", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Operation findUnique
   */
  export type OperationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Operation
     */
    select?: OperationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Operation
     */
    omit?: OperationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OperationInclude<ExtArgs> | null
    /**
     * Filter, which Operation to fetch.
     */
    where: OperationWhereUniqueInput
  }

  /**
   * Operation findUniqueOrThrow
   */
  export type OperationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Operation
     */
    select?: OperationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Operation
     */
    omit?: OperationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OperationInclude<ExtArgs> | null
    /**
     * Filter, which Operation to fetch.
     */
    where: OperationWhereUniqueInput
  }

  /**
   * Operation findFirst
   */
  export type OperationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Operation
     */
    select?: OperationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Operation
     */
    omit?: OperationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OperationInclude<ExtArgs> | null
    /**
     * Filter, which Operation to fetch.
     */
    where?: OperationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Operations to fetch.
     */
    orderBy?: OperationOrderByWithRelationInput | OperationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Operations.
     */
    cursor?: OperationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Operations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Operations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Operations.
     */
    distinct?: OperationScalarFieldEnum | OperationScalarFieldEnum[]
  }

  /**
   * Operation findFirstOrThrow
   */
  export type OperationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Operation
     */
    select?: OperationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Operation
     */
    omit?: OperationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OperationInclude<ExtArgs> | null
    /**
     * Filter, which Operation to fetch.
     */
    where?: OperationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Operations to fetch.
     */
    orderBy?: OperationOrderByWithRelationInput | OperationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Operations.
     */
    cursor?: OperationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Operations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Operations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Operations.
     */
    distinct?: OperationScalarFieldEnum | OperationScalarFieldEnum[]
  }

  /**
   * Operation findMany
   */
  export type OperationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Operation
     */
    select?: OperationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Operation
     */
    omit?: OperationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OperationInclude<ExtArgs> | null
    /**
     * Filter, which Operations to fetch.
     */
    where?: OperationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Operations to fetch.
     */
    orderBy?: OperationOrderByWithRelationInput | OperationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Operations.
     */
    cursor?: OperationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Operations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Operations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Operations.
     */
    distinct?: OperationScalarFieldEnum | OperationScalarFieldEnum[]
  }

  /**
   * Operation create
   */
  export type OperationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Operation
     */
    select?: OperationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Operation
     */
    omit?: OperationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OperationInclude<ExtArgs> | null
    /**
     * The data needed to create a Operation.
     */
    data: XOR<OperationCreateInput, OperationUncheckedCreateInput>
  }

  /**
   * Operation createMany
   */
  export type OperationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Operations.
     */
    data: OperationCreateManyInput | OperationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Operation createManyAndReturn
   */
  export type OperationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Operation
     */
    select?: OperationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Operation
     */
    omit?: OperationOmit<ExtArgs> | null
    /**
     * The data used to create many Operations.
     */
    data: OperationCreateManyInput | OperationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OperationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Operation update
   */
  export type OperationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Operation
     */
    select?: OperationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Operation
     */
    omit?: OperationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OperationInclude<ExtArgs> | null
    /**
     * The data needed to update a Operation.
     */
    data: XOR<OperationUpdateInput, OperationUncheckedUpdateInput>
    /**
     * Choose, which Operation to update.
     */
    where: OperationWhereUniqueInput
  }

  /**
   * Operation updateMany
   */
  export type OperationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Operations.
     */
    data: XOR<OperationUpdateManyMutationInput, OperationUncheckedUpdateManyInput>
    /**
     * Filter which Operations to update
     */
    where?: OperationWhereInput
    /**
     * Limit how many Operations to update.
     */
    limit?: number
  }

  /**
   * Operation updateManyAndReturn
   */
  export type OperationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Operation
     */
    select?: OperationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Operation
     */
    omit?: OperationOmit<ExtArgs> | null
    /**
     * The data used to update Operations.
     */
    data: XOR<OperationUpdateManyMutationInput, OperationUncheckedUpdateManyInput>
    /**
     * Filter which Operations to update
     */
    where?: OperationWhereInput
    /**
     * Limit how many Operations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OperationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Operation upsert
   */
  export type OperationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Operation
     */
    select?: OperationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Operation
     */
    omit?: OperationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OperationInclude<ExtArgs> | null
    /**
     * The filter to search for the Operation to update in case it exists.
     */
    where: OperationWhereUniqueInput
    /**
     * In case the Operation found by the `where` argument doesn't exist, create a new Operation with this data.
     */
    create: XOR<OperationCreateInput, OperationUncheckedCreateInput>
    /**
     * In case the Operation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OperationUpdateInput, OperationUncheckedUpdateInput>
  }

  /**
   * Operation delete
   */
  export type OperationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Operation
     */
    select?: OperationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Operation
     */
    omit?: OperationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OperationInclude<ExtArgs> | null
    /**
     * Filter which Operation to delete.
     */
    where: OperationWhereUniqueInput
  }

  /**
   * Operation deleteMany
   */
  export type OperationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Operations to delete
     */
    where?: OperationWhereInput
    /**
     * Limit how many Operations to delete.
     */
    limit?: number
  }

  /**
   * Operation without action
   */
  export type OperationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Operation
     */
    select?: OperationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Operation
     */
    omit?: OperationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OperationInclude<ExtArgs> | null
  }


  /**
   * Model FieldDailyMetrics
   */

  export type AggregateFieldDailyMetrics = {
    _count: FieldDailyMetricsCountAggregateOutputType | null
    _avg: FieldDailyMetricsAvgAggregateOutputType | null
    _sum: FieldDailyMetricsSumAggregateOutputType | null
    _min: FieldDailyMetricsMinAggregateOutputType | null
    _max: FieldDailyMetricsMaxAggregateOutputType | null
  }

  export type FieldDailyMetricsAvgAggregateOutputType = {
    season: number | null
    tmax: number | null
    tmin: number | null
    humidity: number | null
    precipitation: number | null
    gddDaily: number | null
    accumulatedGdd: number | null
    chillingHoursToday: number | null
    accumulatedChilling: number | null
    gddToNextStage: number | null
  }

  export type FieldDailyMetricsSumAggregateOutputType = {
    season: number | null
    tmax: number | null
    tmin: number | null
    humidity: number | null
    precipitation: number | null
    gddDaily: number | null
    accumulatedGdd: number | null
    chillingHoursToday: number | null
    accumulatedChilling: number | null
    gddToNextStage: number | null
  }

  export type FieldDailyMetricsMinAggregateOutputType = {
    id: string | null
    fieldId: string | null
    date: Date | null
    season: number | null
    tmax: number | null
    tmin: number | null
    humidity: number | null
    precipitation: number | null
    gddDaily: number | null
    accumulatedGdd: number | null
    chillingHoursToday: number | null
    accumulatedChilling: number | null
    bioFixReached: boolean | null
    currentStage: string | null
    gddToNextStage: number | null
    createdAt: Date | null
  }

  export type FieldDailyMetricsMaxAggregateOutputType = {
    id: string | null
    fieldId: string | null
    date: Date | null
    season: number | null
    tmax: number | null
    tmin: number | null
    humidity: number | null
    precipitation: number | null
    gddDaily: number | null
    accumulatedGdd: number | null
    chillingHoursToday: number | null
    accumulatedChilling: number | null
    bioFixReached: boolean | null
    currentStage: string | null
    gddToNextStage: number | null
    createdAt: Date | null
  }

  export type FieldDailyMetricsCountAggregateOutputType = {
    id: number
    fieldId: number
    date: number
    season: number
    tmax: number
    tmin: number
    humidity: number
    precipitation: number
    gddDaily: number
    accumulatedGdd: number
    chillingHoursToday: number
    accumulatedChilling: number
    bioFixReached: number
    currentStage: number
    gddToNextStage: number
    createdAt: number
    _all: number
  }


  export type FieldDailyMetricsAvgAggregateInputType = {
    season?: true
    tmax?: true
    tmin?: true
    humidity?: true
    precipitation?: true
    gddDaily?: true
    accumulatedGdd?: true
    chillingHoursToday?: true
    accumulatedChilling?: true
    gddToNextStage?: true
  }

  export type FieldDailyMetricsSumAggregateInputType = {
    season?: true
    tmax?: true
    tmin?: true
    humidity?: true
    precipitation?: true
    gddDaily?: true
    accumulatedGdd?: true
    chillingHoursToday?: true
    accumulatedChilling?: true
    gddToNextStage?: true
  }

  export type FieldDailyMetricsMinAggregateInputType = {
    id?: true
    fieldId?: true
    date?: true
    season?: true
    tmax?: true
    tmin?: true
    humidity?: true
    precipitation?: true
    gddDaily?: true
    accumulatedGdd?: true
    chillingHoursToday?: true
    accumulatedChilling?: true
    bioFixReached?: true
    currentStage?: true
    gddToNextStage?: true
    createdAt?: true
  }

  export type FieldDailyMetricsMaxAggregateInputType = {
    id?: true
    fieldId?: true
    date?: true
    season?: true
    tmax?: true
    tmin?: true
    humidity?: true
    precipitation?: true
    gddDaily?: true
    accumulatedGdd?: true
    chillingHoursToday?: true
    accumulatedChilling?: true
    bioFixReached?: true
    currentStage?: true
    gddToNextStage?: true
    createdAt?: true
  }

  export type FieldDailyMetricsCountAggregateInputType = {
    id?: true
    fieldId?: true
    date?: true
    season?: true
    tmax?: true
    tmin?: true
    humidity?: true
    precipitation?: true
    gddDaily?: true
    accumulatedGdd?: true
    chillingHoursToday?: true
    accumulatedChilling?: true
    bioFixReached?: true
    currentStage?: true
    gddToNextStage?: true
    createdAt?: true
    _all?: true
  }

  export type FieldDailyMetricsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FieldDailyMetrics to aggregate.
     */
    where?: FieldDailyMetricsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FieldDailyMetrics to fetch.
     */
    orderBy?: FieldDailyMetricsOrderByWithRelationInput | FieldDailyMetricsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FieldDailyMetricsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FieldDailyMetrics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FieldDailyMetrics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FieldDailyMetrics
    **/
    _count?: true | FieldDailyMetricsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FieldDailyMetricsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FieldDailyMetricsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FieldDailyMetricsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FieldDailyMetricsMaxAggregateInputType
  }

  export type GetFieldDailyMetricsAggregateType<T extends FieldDailyMetricsAggregateArgs> = {
        [P in keyof T & keyof AggregateFieldDailyMetrics]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFieldDailyMetrics[P]>
      : GetScalarType<T[P], AggregateFieldDailyMetrics[P]>
  }




  export type FieldDailyMetricsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FieldDailyMetricsWhereInput
    orderBy?: FieldDailyMetricsOrderByWithAggregationInput | FieldDailyMetricsOrderByWithAggregationInput[]
    by: FieldDailyMetricsScalarFieldEnum[] | FieldDailyMetricsScalarFieldEnum
    having?: FieldDailyMetricsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FieldDailyMetricsCountAggregateInputType | true
    _avg?: FieldDailyMetricsAvgAggregateInputType
    _sum?: FieldDailyMetricsSumAggregateInputType
    _min?: FieldDailyMetricsMinAggregateInputType
    _max?: FieldDailyMetricsMaxAggregateInputType
  }

  export type FieldDailyMetricsGroupByOutputType = {
    id: string
    fieldId: string
    date: Date
    season: number
    tmax: number
    tmin: number
    humidity: number | null
    precipitation: number | null
    gddDaily: number
    accumulatedGdd: number
    chillingHoursToday: number
    accumulatedChilling: number
    bioFixReached: boolean
    currentStage: string | null
    gddToNextStage: number | null
    createdAt: Date
    _count: FieldDailyMetricsCountAggregateOutputType | null
    _avg: FieldDailyMetricsAvgAggregateOutputType | null
    _sum: FieldDailyMetricsSumAggregateOutputType | null
    _min: FieldDailyMetricsMinAggregateOutputType | null
    _max: FieldDailyMetricsMaxAggregateOutputType | null
  }

  type GetFieldDailyMetricsGroupByPayload<T extends FieldDailyMetricsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FieldDailyMetricsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FieldDailyMetricsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FieldDailyMetricsGroupByOutputType[P]>
            : GetScalarType<T[P], FieldDailyMetricsGroupByOutputType[P]>
        }
      >
    >


  export type FieldDailyMetricsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fieldId?: boolean
    date?: boolean
    season?: boolean
    tmax?: boolean
    tmin?: boolean
    humidity?: boolean
    precipitation?: boolean
    gddDaily?: boolean
    accumulatedGdd?: boolean
    chillingHoursToday?: boolean
    accumulatedChilling?: boolean
    bioFixReached?: boolean
    currentStage?: boolean
    gddToNextStage?: boolean
    createdAt?: boolean
    field?: boolean | FieldDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["fieldDailyMetrics"]>

  export type FieldDailyMetricsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fieldId?: boolean
    date?: boolean
    season?: boolean
    tmax?: boolean
    tmin?: boolean
    humidity?: boolean
    precipitation?: boolean
    gddDaily?: boolean
    accumulatedGdd?: boolean
    chillingHoursToday?: boolean
    accumulatedChilling?: boolean
    bioFixReached?: boolean
    currentStage?: boolean
    gddToNextStage?: boolean
    createdAt?: boolean
    field?: boolean | FieldDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["fieldDailyMetrics"]>

  export type FieldDailyMetricsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fieldId?: boolean
    date?: boolean
    season?: boolean
    tmax?: boolean
    tmin?: boolean
    humidity?: boolean
    precipitation?: boolean
    gddDaily?: boolean
    accumulatedGdd?: boolean
    chillingHoursToday?: boolean
    accumulatedChilling?: boolean
    bioFixReached?: boolean
    currentStage?: boolean
    gddToNextStage?: boolean
    createdAt?: boolean
    field?: boolean | FieldDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["fieldDailyMetrics"]>

  export type FieldDailyMetricsSelectScalar = {
    id?: boolean
    fieldId?: boolean
    date?: boolean
    season?: boolean
    tmax?: boolean
    tmin?: boolean
    humidity?: boolean
    precipitation?: boolean
    gddDaily?: boolean
    accumulatedGdd?: boolean
    chillingHoursToday?: boolean
    accumulatedChilling?: boolean
    bioFixReached?: boolean
    currentStage?: boolean
    gddToNextStage?: boolean
    createdAt?: boolean
  }

  export type FieldDailyMetricsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "fieldId" | "date" | "season" | "tmax" | "tmin" | "humidity" | "precipitation" | "gddDaily" | "accumulatedGdd" | "chillingHoursToday" | "accumulatedChilling" | "bioFixReached" | "currentStage" | "gddToNextStage" | "createdAt", ExtArgs["result"]["fieldDailyMetrics"]>
  export type FieldDailyMetricsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    field?: boolean | FieldDefaultArgs<ExtArgs>
  }
  export type FieldDailyMetricsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    field?: boolean | FieldDefaultArgs<ExtArgs>
  }
  export type FieldDailyMetricsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    field?: boolean | FieldDefaultArgs<ExtArgs>
  }

  export type $FieldDailyMetricsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FieldDailyMetrics"
    objects: {
      field: Prisma.$FieldPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      fieldId: string
      date: Date
      season: number
      tmax: number
      tmin: number
      humidity: number | null
      precipitation: number | null
      gddDaily: number
      accumulatedGdd: number
      chillingHoursToday: number
      accumulatedChilling: number
      bioFixReached: boolean
      currentStage: string | null
      gddToNextStage: number | null
      createdAt: Date
    }, ExtArgs["result"]["fieldDailyMetrics"]>
    composites: {}
  }

  type FieldDailyMetricsGetPayload<S extends boolean | null | undefined | FieldDailyMetricsDefaultArgs> = $Result.GetResult<Prisma.$FieldDailyMetricsPayload, S>

  type FieldDailyMetricsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FieldDailyMetricsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FieldDailyMetricsCountAggregateInputType | true
    }

  export interface FieldDailyMetricsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FieldDailyMetrics'], meta: { name: 'FieldDailyMetrics' } }
    /**
     * Find zero or one FieldDailyMetrics that matches the filter.
     * @param {FieldDailyMetricsFindUniqueArgs} args - Arguments to find a FieldDailyMetrics
     * @example
     * // Get one FieldDailyMetrics
     * const fieldDailyMetrics = await prisma.fieldDailyMetrics.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FieldDailyMetricsFindUniqueArgs>(args: SelectSubset<T, FieldDailyMetricsFindUniqueArgs<ExtArgs>>): Prisma__FieldDailyMetricsClient<$Result.GetResult<Prisma.$FieldDailyMetricsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one FieldDailyMetrics that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FieldDailyMetricsFindUniqueOrThrowArgs} args - Arguments to find a FieldDailyMetrics
     * @example
     * // Get one FieldDailyMetrics
     * const fieldDailyMetrics = await prisma.fieldDailyMetrics.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FieldDailyMetricsFindUniqueOrThrowArgs>(args: SelectSubset<T, FieldDailyMetricsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FieldDailyMetricsClient<$Result.GetResult<Prisma.$FieldDailyMetricsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FieldDailyMetrics that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FieldDailyMetricsFindFirstArgs} args - Arguments to find a FieldDailyMetrics
     * @example
     * // Get one FieldDailyMetrics
     * const fieldDailyMetrics = await prisma.fieldDailyMetrics.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FieldDailyMetricsFindFirstArgs>(args?: SelectSubset<T, FieldDailyMetricsFindFirstArgs<ExtArgs>>): Prisma__FieldDailyMetricsClient<$Result.GetResult<Prisma.$FieldDailyMetricsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FieldDailyMetrics that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FieldDailyMetricsFindFirstOrThrowArgs} args - Arguments to find a FieldDailyMetrics
     * @example
     * // Get one FieldDailyMetrics
     * const fieldDailyMetrics = await prisma.fieldDailyMetrics.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FieldDailyMetricsFindFirstOrThrowArgs>(args?: SelectSubset<T, FieldDailyMetricsFindFirstOrThrowArgs<ExtArgs>>): Prisma__FieldDailyMetricsClient<$Result.GetResult<Prisma.$FieldDailyMetricsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more FieldDailyMetrics that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FieldDailyMetricsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FieldDailyMetrics
     * const fieldDailyMetrics = await prisma.fieldDailyMetrics.findMany()
     * 
     * // Get first 10 FieldDailyMetrics
     * const fieldDailyMetrics = await prisma.fieldDailyMetrics.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const fieldDailyMetricsWithIdOnly = await prisma.fieldDailyMetrics.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FieldDailyMetricsFindManyArgs>(args?: SelectSubset<T, FieldDailyMetricsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FieldDailyMetricsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a FieldDailyMetrics.
     * @param {FieldDailyMetricsCreateArgs} args - Arguments to create a FieldDailyMetrics.
     * @example
     * // Create one FieldDailyMetrics
     * const FieldDailyMetrics = await prisma.fieldDailyMetrics.create({
     *   data: {
     *     // ... data to create a FieldDailyMetrics
     *   }
     * })
     * 
     */
    create<T extends FieldDailyMetricsCreateArgs>(args: SelectSubset<T, FieldDailyMetricsCreateArgs<ExtArgs>>): Prisma__FieldDailyMetricsClient<$Result.GetResult<Prisma.$FieldDailyMetricsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many FieldDailyMetrics.
     * @param {FieldDailyMetricsCreateManyArgs} args - Arguments to create many FieldDailyMetrics.
     * @example
     * // Create many FieldDailyMetrics
     * const fieldDailyMetrics = await prisma.fieldDailyMetrics.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FieldDailyMetricsCreateManyArgs>(args?: SelectSubset<T, FieldDailyMetricsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many FieldDailyMetrics and returns the data saved in the database.
     * @param {FieldDailyMetricsCreateManyAndReturnArgs} args - Arguments to create many FieldDailyMetrics.
     * @example
     * // Create many FieldDailyMetrics
     * const fieldDailyMetrics = await prisma.fieldDailyMetrics.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many FieldDailyMetrics and only return the `id`
     * const fieldDailyMetricsWithIdOnly = await prisma.fieldDailyMetrics.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FieldDailyMetricsCreateManyAndReturnArgs>(args?: SelectSubset<T, FieldDailyMetricsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FieldDailyMetricsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a FieldDailyMetrics.
     * @param {FieldDailyMetricsDeleteArgs} args - Arguments to delete one FieldDailyMetrics.
     * @example
     * // Delete one FieldDailyMetrics
     * const FieldDailyMetrics = await prisma.fieldDailyMetrics.delete({
     *   where: {
     *     // ... filter to delete one FieldDailyMetrics
     *   }
     * })
     * 
     */
    delete<T extends FieldDailyMetricsDeleteArgs>(args: SelectSubset<T, FieldDailyMetricsDeleteArgs<ExtArgs>>): Prisma__FieldDailyMetricsClient<$Result.GetResult<Prisma.$FieldDailyMetricsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one FieldDailyMetrics.
     * @param {FieldDailyMetricsUpdateArgs} args - Arguments to update one FieldDailyMetrics.
     * @example
     * // Update one FieldDailyMetrics
     * const fieldDailyMetrics = await prisma.fieldDailyMetrics.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FieldDailyMetricsUpdateArgs>(args: SelectSubset<T, FieldDailyMetricsUpdateArgs<ExtArgs>>): Prisma__FieldDailyMetricsClient<$Result.GetResult<Prisma.$FieldDailyMetricsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more FieldDailyMetrics.
     * @param {FieldDailyMetricsDeleteManyArgs} args - Arguments to filter FieldDailyMetrics to delete.
     * @example
     * // Delete a few FieldDailyMetrics
     * const { count } = await prisma.fieldDailyMetrics.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FieldDailyMetricsDeleteManyArgs>(args?: SelectSubset<T, FieldDailyMetricsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FieldDailyMetrics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FieldDailyMetricsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FieldDailyMetrics
     * const fieldDailyMetrics = await prisma.fieldDailyMetrics.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FieldDailyMetricsUpdateManyArgs>(args: SelectSubset<T, FieldDailyMetricsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FieldDailyMetrics and returns the data updated in the database.
     * @param {FieldDailyMetricsUpdateManyAndReturnArgs} args - Arguments to update many FieldDailyMetrics.
     * @example
     * // Update many FieldDailyMetrics
     * const fieldDailyMetrics = await prisma.fieldDailyMetrics.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more FieldDailyMetrics and only return the `id`
     * const fieldDailyMetricsWithIdOnly = await prisma.fieldDailyMetrics.updateManyAndReturn({
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
    updateManyAndReturn<T extends FieldDailyMetricsUpdateManyAndReturnArgs>(args: SelectSubset<T, FieldDailyMetricsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FieldDailyMetricsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one FieldDailyMetrics.
     * @param {FieldDailyMetricsUpsertArgs} args - Arguments to update or create a FieldDailyMetrics.
     * @example
     * // Update or create a FieldDailyMetrics
     * const fieldDailyMetrics = await prisma.fieldDailyMetrics.upsert({
     *   create: {
     *     // ... data to create a FieldDailyMetrics
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FieldDailyMetrics we want to update
     *   }
     * })
     */
    upsert<T extends FieldDailyMetricsUpsertArgs>(args: SelectSubset<T, FieldDailyMetricsUpsertArgs<ExtArgs>>): Prisma__FieldDailyMetricsClient<$Result.GetResult<Prisma.$FieldDailyMetricsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of FieldDailyMetrics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FieldDailyMetricsCountArgs} args - Arguments to filter FieldDailyMetrics to count.
     * @example
     * // Count the number of FieldDailyMetrics
     * const count = await prisma.fieldDailyMetrics.count({
     *   where: {
     *     // ... the filter for the FieldDailyMetrics we want to count
     *   }
     * })
    **/
    count<T extends FieldDailyMetricsCountArgs>(
      args?: Subset<T, FieldDailyMetricsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FieldDailyMetricsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FieldDailyMetrics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FieldDailyMetricsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends FieldDailyMetricsAggregateArgs>(args: Subset<T, FieldDailyMetricsAggregateArgs>): Prisma.PrismaPromise<GetFieldDailyMetricsAggregateType<T>>

    /**
     * Group by FieldDailyMetrics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FieldDailyMetricsGroupByArgs} args - Group by arguments.
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
      T extends FieldDailyMetricsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FieldDailyMetricsGroupByArgs['orderBy'] }
        : { orderBy?: FieldDailyMetricsGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, FieldDailyMetricsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFieldDailyMetricsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FieldDailyMetrics model
   */
  readonly fields: FieldDailyMetricsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FieldDailyMetrics.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FieldDailyMetricsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    field<T extends FieldDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FieldDefaultArgs<ExtArgs>>): Prisma__FieldClient<$Result.GetResult<Prisma.$FieldPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the FieldDailyMetrics model
   */
  interface FieldDailyMetricsFieldRefs {
    readonly id: FieldRef<"FieldDailyMetrics", 'String'>
    readonly fieldId: FieldRef<"FieldDailyMetrics", 'String'>
    readonly date: FieldRef<"FieldDailyMetrics", 'DateTime'>
    readonly season: FieldRef<"FieldDailyMetrics", 'Int'>
    readonly tmax: FieldRef<"FieldDailyMetrics", 'Float'>
    readonly tmin: FieldRef<"FieldDailyMetrics", 'Float'>
    readonly humidity: FieldRef<"FieldDailyMetrics", 'Float'>
    readonly precipitation: FieldRef<"FieldDailyMetrics", 'Float'>
    readonly gddDaily: FieldRef<"FieldDailyMetrics", 'Float'>
    readonly accumulatedGdd: FieldRef<"FieldDailyMetrics", 'Float'>
    readonly chillingHoursToday: FieldRef<"FieldDailyMetrics", 'Float'>
    readonly accumulatedChilling: FieldRef<"FieldDailyMetrics", 'Float'>
    readonly bioFixReached: FieldRef<"FieldDailyMetrics", 'Boolean'>
    readonly currentStage: FieldRef<"FieldDailyMetrics", 'String'>
    readonly gddToNextStage: FieldRef<"FieldDailyMetrics", 'Float'>
    readonly createdAt: FieldRef<"FieldDailyMetrics", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * FieldDailyMetrics findUnique
   */
  export type FieldDailyMetricsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FieldDailyMetrics
     */
    select?: FieldDailyMetricsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FieldDailyMetrics
     */
    omit?: FieldDailyMetricsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FieldDailyMetricsInclude<ExtArgs> | null
    /**
     * Filter, which FieldDailyMetrics to fetch.
     */
    where: FieldDailyMetricsWhereUniqueInput
  }

  /**
   * FieldDailyMetrics findUniqueOrThrow
   */
  export type FieldDailyMetricsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FieldDailyMetrics
     */
    select?: FieldDailyMetricsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FieldDailyMetrics
     */
    omit?: FieldDailyMetricsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FieldDailyMetricsInclude<ExtArgs> | null
    /**
     * Filter, which FieldDailyMetrics to fetch.
     */
    where: FieldDailyMetricsWhereUniqueInput
  }

  /**
   * FieldDailyMetrics findFirst
   */
  export type FieldDailyMetricsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FieldDailyMetrics
     */
    select?: FieldDailyMetricsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FieldDailyMetrics
     */
    omit?: FieldDailyMetricsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FieldDailyMetricsInclude<ExtArgs> | null
    /**
     * Filter, which FieldDailyMetrics to fetch.
     */
    where?: FieldDailyMetricsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FieldDailyMetrics to fetch.
     */
    orderBy?: FieldDailyMetricsOrderByWithRelationInput | FieldDailyMetricsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FieldDailyMetrics.
     */
    cursor?: FieldDailyMetricsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FieldDailyMetrics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FieldDailyMetrics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FieldDailyMetrics.
     */
    distinct?: FieldDailyMetricsScalarFieldEnum | FieldDailyMetricsScalarFieldEnum[]
  }

  /**
   * FieldDailyMetrics findFirstOrThrow
   */
  export type FieldDailyMetricsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FieldDailyMetrics
     */
    select?: FieldDailyMetricsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FieldDailyMetrics
     */
    omit?: FieldDailyMetricsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FieldDailyMetricsInclude<ExtArgs> | null
    /**
     * Filter, which FieldDailyMetrics to fetch.
     */
    where?: FieldDailyMetricsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FieldDailyMetrics to fetch.
     */
    orderBy?: FieldDailyMetricsOrderByWithRelationInput | FieldDailyMetricsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FieldDailyMetrics.
     */
    cursor?: FieldDailyMetricsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FieldDailyMetrics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FieldDailyMetrics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FieldDailyMetrics.
     */
    distinct?: FieldDailyMetricsScalarFieldEnum | FieldDailyMetricsScalarFieldEnum[]
  }

  /**
   * FieldDailyMetrics findMany
   */
  export type FieldDailyMetricsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FieldDailyMetrics
     */
    select?: FieldDailyMetricsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FieldDailyMetrics
     */
    omit?: FieldDailyMetricsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FieldDailyMetricsInclude<ExtArgs> | null
    /**
     * Filter, which FieldDailyMetrics to fetch.
     */
    where?: FieldDailyMetricsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FieldDailyMetrics to fetch.
     */
    orderBy?: FieldDailyMetricsOrderByWithRelationInput | FieldDailyMetricsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FieldDailyMetrics.
     */
    cursor?: FieldDailyMetricsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FieldDailyMetrics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FieldDailyMetrics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FieldDailyMetrics.
     */
    distinct?: FieldDailyMetricsScalarFieldEnum | FieldDailyMetricsScalarFieldEnum[]
  }

  /**
   * FieldDailyMetrics create
   */
  export type FieldDailyMetricsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FieldDailyMetrics
     */
    select?: FieldDailyMetricsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FieldDailyMetrics
     */
    omit?: FieldDailyMetricsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FieldDailyMetricsInclude<ExtArgs> | null
    /**
     * The data needed to create a FieldDailyMetrics.
     */
    data: XOR<FieldDailyMetricsCreateInput, FieldDailyMetricsUncheckedCreateInput>
  }

  /**
   * FieldDailyMetrics createMany
   */
  export type FieldDailyMetricsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FieldDailyMetrics.
     */
    data: FieldDailyMetricsCreateManyInput | FieldDailyMetricsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FieldDailyMetrics createManyAndReturn
   */
  export type FieldDailyMetricsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FieldDailyMetrics
     */
    select?: FieldDailyMetricsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FieldDailyMetrics
     */
    omit?: FieldDailyMetricsOmit<ExtArgs> | null
    /**
     * The data used to create many FieldDailyMetrics.
     */
    data: FieldDailyMetricsCreateManyInput | FieldDailyMetricsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FieldDailyMetricsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * FieldDailyMetrics update
   */
  export type FieldDailyMetricsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FieldDailyMetrics
     */
    select?: FieldDailyMetricsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FieldDailyMetrics
     */
    omit?: FieldDailyMetricsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FieldDailyMetricsInclude<ExtArgs> | null
    /**
     * The data needed to update a FieldDailyMetrics.
     */
    data: XOR<FieldDailyMetricsUpdateInput, FieldDailyMetricsUncheckedUpdateInput>
    /**
     * Choose, which FieldDailyMetrics to update.
     */
    where: FieldDailyMetricsWhereUniqueInput
  }

  /**
   * FieldDailyMetrics updateMany
   */
  export type FieldDailyMetricsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FieldDailyMetrics.
     */
    data: XOR<FieldDailyMetricsUpdateManyMutationInput, FieldDailyMetricsUncheckedUpdateManyInput>
    /**
     * Filter which FieldDailyMetrics to update
     */
    where?: FieldDailyMetricsWhereInput
    /**
     * Limit how many FieldDailyMetrics to update.
     */
    limit?: number
  }

  /**
   * FieldDailyMetrics updateManyAndReturn
   */
  export type FieldDailyMetricsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FieldDailyMetrics
     */
    select?: FieldDailyMetricsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FieldDailyMetrics
     */
    omit?: FieldDailyMetricsOmit<ExtArgs> | null
    /**
     * The data used to update FieldDailyMetrics.
     */
    data: XOR<FieldDailyMetricsUpdateManyMutationInput, FieldDailyMetricsUncheckedUpdateManyInput>
    /**
     * Filter which FieldDailyMetrics to update
     */
    where?: FieldDailyMetricsWhereInput
    /**
     * Limit how many FieldDailyMetrics to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FieldDailyMetricsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * FieldDailyMetrics upsert
   */
  export type FieldDailyMetricsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FieldDailyMetrics
     */
    select?: FieldDailyMetricsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FieldDailyMetrics
     */
    omit?: FieldDailyMetricsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FieldDailyMetricsInclude<ExtArgs> | null
    /**
     * The filter to search for the FieldDailyMetrics to update in case it exists.
     */
    where: FieldDailyMetricsWhereUniqueInput
    /**
     * In case the FieldDailyMetrics found by the `where` argument doesn't exist, create a new FieldDailyMetrics with this data.
     */
    create: XOR<FieldDailyMetricsCreateInput, FieldDailyMetricsUncheckedCreateInput>
    /**
     * In case the FieldDailyMetrics was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FieldDailyMetricsUpdateInput, FieldDailyMetricsUncheckedUpdateInput>
  }

  /**
   * FieldDailyMetrics delete
   */
  export type FieldDailyMetricsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FieldDailyMetrics
     */
    select?: FieldDailyMetricsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FieldDailyMetrics
     */
    omit?: FieldDailyMetricsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FieldDailyMetricsInclude<ExtArgs> | null
    /**
     * Filter which FieldDailyMetrics to delete.
     */
    where: FieldDailyMetricsWhereUniqueInput
  }

  /**
   * FieldDailyMetrics deleteMany
   */
  export type FieldDailyMetricsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FieldDailyMetrics to delete
     */
    where?: FieldDailyMetricsWhereInput
    /**
     * Limit how many FieldDailyMetrics to delete.
     */
    limit?: number
  }

  /**
   * FieldDailyMetrics without action
   */
  export type FieldDailyMetricsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FieldDailyMetrics
     */
    select?: FieldDailyMetricsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FieldDailyMetrics
     */
    omit?: FieldDailyMetricsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FieldDailyMetricsInclude<ExtArgs> | null
  }


  /**
   * Model FieldSeasonSummary
   */

  export type AggregateFieldSeasonSummary = {
    _count: FieldSeasonSummaryCountAggregateOutputType | null
    _avg: FieldSeasonSummaryAvgAggregateOutputType | null
    _sum: FieldSeasonSummarySumAggregateOutputType | null
    _min: FieldSeasonSummaryMinAggregateOutputType | null
    _max: FieldSeasonSummaryMaxAggregateOutputType | null
  }

  export type FieldSeasonSummaryAvgAggregateOutputType = {
    season: number | null
    accumulatedGdd: number | null
    accumulatedChilling: number | null
    gddToNextStage: number | null
    daysInCurrentStage: number | null
    totalPrecipitation: number | null
    avgTemperature: number | null
  }

  export type FieldSeasonSummarySumAggregateOutputType = {
    season: number | null
    accumulatedGdd: number | null
    accumulatedChilling: number | null
    gddToNextStage: number | null
    daysInCurrentStage: number | null
    totalPrecipitation: number | null
    avgTemperature: number | null
  }

  export type FieldSeasonSummaryMinAggregateOutputType = {
    id: string | null
    fieldId: string | null
    season: number | null
    currentStage: string | null
    accumulatedGdd: number | null
    accumulatedChilling: number | null
    bioFixReached: boolean | null
    bioFixDate: Date | null
    gddToNextStage: number | null
    daysInCurrentStage: number | null
    lastUpdated: Date | null
    predictedFloweringDate: Date | null
    predictedHarvestDate: Date | null
    totalPrecipitation: number | null
    avgTemperature: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FieldSeasonSummaryMaxAggregateOutputType = {
    id: string | null
    fieldId: string | null
    season: number | null
    currentStage: string | null
    accumulatedGdd: number | null
    accumulatedChilling: number | null
    bioFixReached: boolean | null
    bioFixDate: Date | null
    gddToNextStage: number | null
    daysInCurrentStage: number | null
    lastUpdated: Date | null
    predictedFloweringDate: Date | null
    predictedHarvestDate: Date | null
    totalPrecipitation: number | null
    avgTemperature: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FieldSeasonSummaryCountAggregateOutputType = {
    id: number
    fieldId: number
    season: number
    currentStage: number
    accumulatedGdd: number
    accumulatedChilling: number
    bioFixReached: number
    bioFixDate: number
    gddToNextStage: number
    daysInCurrentStage: number
    lastUpdated: number
    predictedFloweringDate: number
    predictedHarvestDate: number
    totalPrecipitation: number
    avgTemperature: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type FieldSeasonSummaryAvgAggregateInputType = {
    season?: true
    accumulatedGdd?: true
    accumulatedChilling?: true
    gddToNextStage?: true
    daysInCurrentStage?: true
    totalPrecipitation?: true
    avgTemperature?: true
  }

  export type FieldSeasonSummarySumAggregateInputType = {
    season?: true
    accumulatedGdd?: true
    accumulatedChilling?: true
    gddToNextStage?: true
    daysInCurrentStage?: true
    totalPrecipitation?: true
    avgTemperature?: true
  }

  export type FieldSeasonSummaryMinAggregateInputType = {
    id?: true
    fieldId?: true
    season?: true
    currentStage?: true
    accumulatedGdd?: true
    accumulatedChilling?: true
    bioFixReached?: true
    bioFixDate?: true
    gddToNextStage?: true
    daysInCurrentStage?: true
    lastUpdated?: true
    predictedFloweringDate?: true
    predictedHarvestDate?: true
    totalPrecipitation?: true
    avgTemperature?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FieldSeasonSummaryMaxAggregateInputType = {
    id?: true
    fieldId?: true
    season?: true
    currentStage?: true
    accumulatedGdd?: true
    accumulatedChilling?: true
    bioFixReached?: true
    bioFixDate?: true
    gddToNextStage?: true
    daysInCurrentStage?: true
    lastUpdated?: true
    predictedFloweringDate?: true
    predictedHarvestDate?: true
    totalPrecipitation?: true
    avgTemperature?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FieldSeasonSummaryCountAggregateInputType = {
    id?: true
    fieldId?: true
    season?: true
    currentStage?: true
    accumulatedGdd?: true
    accumulatedChilling?: true
    bioFixReached?: true
    bioFixDate?: true
    gddToNextStage?: true
    daysInCurrentStage?: true
    lastUpdated?: true
    predictedFloweringDate?: true
    predictedHarvestDate?: true
    totalPrecipitation?: true
    avgTemperature?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type FieldSeasonSummaryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FieldSeasonSummary to aggregate.
     */
    where?: FieldSeasonSummaryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FieldSeasonSummaries to fetch.
     */
    orderBy?: FieldSeasonSummaryOrderByWithRelationInput | FieldSeasonSummaryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FieldSeasonSummaryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FieldSeasonSummaries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FieldSeasonSummaries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FieldSeasonSummaries
    **/
    _count?: true | FieldSeasonSummaryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FieldSeasonSummaryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FieldSeasonSummarySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FieldSeasonSummaryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FieldSeasonSummaryMaxAggregateInputType
  }

  export type GetFieldSeasonSummaryAggregateType<T extends FieldSeasonSummaryAggregateArgs> = {
        [P in keyof T & keyof AggregateFieldSeasonSummary]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFieldSeasonSummary[P]>
      : GetScalarType<T[P], AggregateFieldSeasonSummary[P]>
  }




  export type FieldSeasonSummaryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FieldSeasonSummaryWhereInput
    orderBy?: FieldSeasonSummaryOrderByWithAggregationInput | FieldSeasonSummaryOrderByWithAggregationInput[]
    by: FieldSeasonSummaryScalarFieldEnum[] | FieldSeasonSummaryScalarFieldEnum
    having?: FieldSeasonSummaryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FieldSeasonSummaryCountAggregateInputType | true
    _avg?: FieldSeasonSummaryAvgAggregateInputType
    _sum?: FieldSeasonSummarySumAggregateInputType
    _min?: FieldSeasonSummaryMinAggregateInputType
    _max?: FieldSeasonSummaryMaxAggregateInputType
  }

  export type FieldSeasonSummaryGroupByOutputType = {
    id: string
    fieldId: string
    season: number
    currentStage: string | null
    accumulatedGdd: number
    accumulatedChilling: number
    bioFixReached: boolean
    bioFixDate: Date | null
    gddToNextStage: number | null
    daysInCurrentStage: number
    lastUpdated: Date
    predictedFloweringDate: Date | null
    predictedHarvestDate: Date | null
    totalPrecipitation: number
    avgTemperature: number | null
    createdAt: Date
    updatedAt: Date
    _count: FieldSeasonSummaryCountAggregateOutputType | null
    _avg: FieldSeasonSummaryAvgAggregateOutputType | null
    _sum: FieldSeasonSummarySumAggregateOutputType | null
    _min: FieldSeasonSummaryMinAggregateOutputType | null
    _max: FieldSeasonSummaryMaxAggregateOutputType | null
  }

  type GetFieldSeasonSummaryGroupByPayload<T extends FieldSeasonSummaryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FieldSeasonSummaryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FieldSeasonSummaryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FieldSeasonSummaryGroupByOutputType[P]>
            : GetScalarType<T[P], FieldSeasonSummaryGroupByOutputType[P]>
        }
      >
    >


  export type FieldSeasonSummarySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fieldId?: boolean
    season?: boolean
    currentStage?: boolean
    accumulatedGdd?: boolean
    accumulatedChilling?: boolean
    bioFixReached?: boolean
    bioFixDate?: boolean
    gddToNextStage?: boolean
    daysInCurrentStage?: boolean
    lastUpdated?: boolean
    predictedFloweringDate?: boolean
    predictedHarvestDate?: boolean
    totalPrecipitation?: boolean
    avgTemperature?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    field?: boolean | FieldDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["fieldSeasonSummary"]>

  export type FieldSeasonSummarySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fieldId?: boolean
    season?: boolean
    currentStage?: boolean
    accumulatedGdd?: boolean
    accumulatedChilling?: boolean
    bioFixReached?: boolean
    bioFixDate?: boolean
    gddToNextStage?: boolean
    daysInCurrentStage?: boolean
    lastUpdated?: boolean
    predictedFloweringDate?: boolean
    predictedHarvestDate?: boolean
    totalPrecipitation?: boolean
    avgTemperature?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    field?: boolean | FieldDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["fieldSeasonSummary"]>

  export type FieldSeasonSummarySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fieldId?: boolean
    season?: boolean
    currentStage?: boolean
    accumulatedGdd?: boolean
    accumulatedChilling?: boolean
    bioFixReached?: boolean
    bioFixDate?: boolean
    gddToNextStage?: boolean
    daysInCurrentStage?: boolean
    lastUpdated?: boolean
    predictedFloweringDate?: boolean
    predictedHarvestDate?: boolean
    totalPrecipitation?: boolean
    avgTemperature?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    field?: boolean | FieldDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["fieldSeasonSummary"]>

  export type FieldSeasonSummarySelectScalar = {
    id?: boolean
    fieldId?: boolean
    season?: boolean
    currentStage?: boolean
    accumulatedGdd?: boolean
    accumulatedChilling?: boolean
    bioFixReached?: boolean
    bioFixDate?: boolean
    gddToNextStage?: boolean
    daysInCurrentStage?: boolean
    lastUpdated?: boolean
    predictedFloweringDate?: boolean
    predictedHarvestDate?: boolean
    totalPrecipitation?: boolean
    avgTemperature?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type FieldSeasonSummaryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "fieldId" | "season" | "currentStage" | "accumulatedGdd" | "accumulatedChilling" | "bioFixReached" | "bioFixDate" | "gddToNextStage" | "daysInCurrentStage" | "lastUpdated" | "predictedFloweringDate" | "predictedHarvestDate" | "totalPrecipitation" | "avgTemperature" | "createdAt" | "updatedAt", ExtArgs["result"]["fieldSeasonSummary"]>
  export type FieldSeasonSummaryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    field?: boolean | FieldDefaultArgs<ExtArgs>
  }
  export type FieldSeasonSummaryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    field?: boolean | FieldDefaultArgs<ExtArgs>
  }
  export type FieldSeasonSummaryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    field?: boolean | FieldDefaultArgs<ExtArgs>
  }

  export type $FieldSeasonSummaryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FieldSeasonSummary"
    objects: {
      field: Prisma.$FieldPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      fieldId: string
      season: number
      currentStage: string | null
      accumulatedGdd: number
      accumulatedChilling: number
      bioFixReached: boolean
      bioFixDate: Date | null
      gddToNextStage: number | null
      daysInCurrentStage: number
      lastUpdated: Date
      predictedFloweringDate: Date | null
      predictedHarvestDate: Date | null
      totalPrecipitation: number
      avgTemperature: number | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["fieldSeasonSummary"]>
    composites: {}
  }

  type FieldSeasonSummaryGetPayload<S extends boolean | null | undefined | FieldSeasonSummaryDefaultArgs> = $Result.GetResult<Prisma.$FieldSeasonSummaryPayload, S>

  type FieldSeasonSummaryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FieldSeasonSummaryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FieldSeasonSummaryCountAggregateInputType | true
    }

  export interface FieldSeasonSummaryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FieldSeasonSummary'], meta: { name: 'FieldSeasonSummary' } }
    /**
     * Find zero or one FieldSeasonSummary that matches the filter.
     * @param {FieldSeasonSummaryFindUniqueArgs} args - Arguments to find a FieldSeasonSummary
     * @example
     * // Get one FieldSeasonSummary
     * const fieldSeasonSummary = await prisma.fieldSeasonSummary.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FieldSeasonSummaryFindUniqueArgs>(args: SelectSubset<T, FieldSeasonSummaryFindUniqueArgs<ExtArgs>>): Prisma__FieldSeasonSummaryClient<$Result.GetResult<Prisma.$FieldSeasonSummaryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one FieldSeasonSummary that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FieldSeasonSummaryFindUniqueOrThrowArgs} args - Arguments to find a FieldSeasonSummary
     * @example
     * // Get one FieldSeasonSummary
     * const fieldSeasonSummary = await prisma.fieldSeasonSummary.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FieldSeasonSummaryFindUniqueOrThrowArgs>(args: SelectSubset<T, FieldSeasonSummaryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FieldSeasonSummaryClient<$Result.GetResult<Prisma.$FieldSeasonSummaryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FieldSeasonSummary that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FieldSeasonSummaryFindFirstArgs} args - Arguments to find a FieldSeasonSummary
     * @example
     * // Get one FieldSeasonSummary
     * const fieldSeasonSummary = await prisma.fieldSeasonSummary.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FieldSeasonSummaryFindFirstArgs>(args?: SelectSubset<T, FieldSeasonSummaryFindFirstArgs<ExtArgs>>): Prisma__FieldSeasonSummaryClient<$Result.GetResult<Prisma.$FieldSeasonSummaryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FieldSeasonSummary that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FieldSeasonSummaryFindFirstOrThrowArgs} args - Arguments to find a FieldSeasonSummary
     * @example
     * // Get one FieldSeasonSummary
     * const fieldSeasonSummary = await prisma.fieldSeasonSummary.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FieldSeasonSummaryFindFirstOrThrowArgs>(args?: SelectSubset<T, FieldSeasonSummaryFindFirstOrThrowArgs<ExtArgs>>): Prisma__FieldSeasonSummaryClient<$Result.GetResult<Prisma.$FieldSeasonSummaryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more FieldSeasonSummaries that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FieldSeasonSummaryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FieldSeasonSummaries
     * const fieldSeasonSummaries = await prisma.fieldSeasonSummary.findMany()
     * 
     * // Get first 10 FieldSeasonSummaries
     * const fieldSeasonSummaries = await prisma.fieldSeasonSummary.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const fieldSeasonSummaryWithIdOnly = await prisma.fieldSeasonSummary.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FieldSeasonSummaryFindManyArgs>(args?: SelectSubset<T, FieldSeasonSummaryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FieldSeasonSummaryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a FieldSeasonSummary.
     * @param {FieldSeasonSummaryCreateArgs} args - Arguments to create a FieldSeasonSummary.
     * @example
     * // Create one FieldSeasonSummary
     * const FieldSeasonSummary = await prisma.fieldSeasonSummary.create({
     *   data: {
     *     // ... data to create a FieldSeasonSummary
     *   }
     * })
     * 
     */
    create<T extends FieldSeasonSummaryCreateArgs>(args: SelectSubset<T, FieldSeasonSummaryCreateArgs<ExtArgs>>): Prisma__FieldSeasonSummaryClient<$Result.GetResult<Prisma.$FieldSeasonSummaryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many FieldSeasonSummaries.
     * @param {FieldSeasonSummaryCreateManyArgs} args - Arguments to create many FieldSeasonSummaries.
     * @example
     * // Create many FieldSeasonSummaries
     * const fieldSeasonSummary = await prisma.fieldSeasonSummary.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FieldSeasonSummaryCreateManyArgs>(args?: SelectSubset<T, FieldSeasonSummaryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many FieldSeasonSummaries and returns the data saved in the database.
     * @param {FieldSeasonSummaryCreateManyAndReturnArgs} args - Arguments to create many FieldSeasonSummaries.
     * @example
     * // Create many FieldSeasonSummaries
     * const fieldSeasonSummary = await prisma.fieldSeasonSummary.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many FieldSeasonSummaries and only return the `id`
     * const fieldSeasonSummaryWithIdOnly = await prisma.fieldSeasonSummary.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FieldSeasonSummaryCreateManyAndReturnArgs>(args?: SelectSubset<T, FieldSeasonSummaryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FieldSeasonSummaryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a FieldSeasonSummary.
     * @param {FieldSeasonSummaryDeleteArgs} args - Arguments to delete one FieldSeasonSummary.
     * @example
     * // Delete one FieldSeasonSummary
     * const FieldSeasonSummary = await prisma.fieldSeasonSummary.delete({
     *   where: {
     *     // ... filter to delete one FieldSeasonSummary
     *   }
     * })
     * 
     */
    delete<T extends FieldSeasonSummaryDeleteArgs>(args: SelectSubset<T, FieldSeasonSummaryDeleteArgs<ExtArgs>>): Prisma__FieldSeasonSummaryClient<$Result.GetResult<Prisma.$FieldSeasonSummaryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one FieldSeasonSummary.
     * @param {FieldSeasonSummaryUpdateArgs} args - Arguments to update one FieldSeasonSummary.
     * @example
     * // Update one FieldSeasonSummary
     * const fieldSeasonSummary = await prisma.fieldSeasonSummary.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FieldSeasonSummaryUpdateArgs>(args: SelectSubset<T, FieldSeasonSummaryUpdateArgs<ExtArgs>>): Prisma__FieldSeasonSummaryClient<$Result.GetResult<Prisma.$FieldSeasonSummaryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more FieldSeasonSummaries.
     * @param {FieldSeasonSummaryDeleteManyArgs} args - Arguments to filter FieldSeasonSummaries to delete.
     * @example
     * // Delete a few FieldSeasonSummaries
     * const { count } = await prisma.fieldSeasonSummary.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FieldSeasonSummaryDeleteManyArgs>(args?: SelectSubset<T, FieldSeasonSummaryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FieldSeasonSummaries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FieldSeasonSummaryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FieldSeasonSummaries
     * const fieldSeasonSummary = await prisma.fieldSeasonSummary.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FieldSeasonSummaryUpdateManyArgs>(args: SelectSubset<T, FieldSeasonSummaryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FieldSeasonSummaries and returns the data updated in the database.
     * @param {FieldSeasonSummaryUpdateManyAndReturnArgs} args - Arguments to update many FieldSeasonSummaries.
     * @example
     * // Update many FieldSeasonSummaries
     * const fieldSeasonSummary = await prisma.fieldSeasonSummary.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more FieldSeasonSummaries and only return the `id`
     * const fieldSeasonSummaryWithIdOnly = await prisma.fieldSeasonSummary.updateManyAndReturn({
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
    updateManyAndReturn<T extends FieldSeasonSummaryUpdateManyAndReturnArgs>(args: SelectSubset<T, FieldSeasonSummaryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FieldSeasonSummaryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one FieldSeasonSummary.
     * @param {FieldSeasonSummaryUpsertArgs} args - Arguments to update or create a FieldSeasonSummary.
     * @example
     * // Update or create a FieldSeasonSummary
     * const fieldSeasonSummary = await prisma.fieldSeasonSummary.upsert({
     *   create: {
     *     // ... data to create a FieldSeasonSummary
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FieldSeasonSummary we want to update
     *   }
     * })
     */
    upsert<T extends FieldSeasonSummaryUpsertArgs>(args: SelectSubset<T, FieldSeasonSummaryUpsertArgs<ExtArgs>>): Prisma__FieldSeasonSummaryClient<$Result.GetResult<Prisma.$FieldSeasonSummaryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of FieldSeasonSummaries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FieldSeasonSummaryCountArgs} args - Arguments to filter FieldSeasonSummaries to count.
     * @example
     * // Count the number of FieldSeasonSummaries
     * const count = await prisma.fieldSeasonSummary.count({
     *   where: {
     *     // ... the filter for the FieldSeasonSummaries we want to count
     *   }
     * })
    **/
    count<T extends FieldSeasonSummaryCountArgs>(
      args?: Subset<T, FieldSeasonSummaryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FieldSeasonSummaryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FieldSeasonSummary.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FieldSeasonSummaryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends FieldSeasonSummaryAggregateArgs>(args: Subset<T, FieldSeasonSummaryAggregateArgs>): Prisma.PrismaPromise<GetFieldSeasonSummaryAggregateType<T>>

    /**
     * Group by FieldSeasonSummary.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FieldSeasonSummaryGroupByArgs} args - Group by arguments.
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
      T extends FieldSeasonSummaryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FieldSeasonSummaryGroupByArgs['orderBy'] }
        : { orderBy?: FieldSeasonSummaryGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, FieldSeasonSummaryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFieldSeasonSummaryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FieldSeasonSummary model
   */
  readonly fields: FieldSeasonSummaryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FieldSeasonSummary.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FieldSeasonSummaryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    field<T extends FieldDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FieldDefaultArgs<ExtArgs>>): Prisma__FieldClient<$Result.GetResult<Prisma.$FieldPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the FieldSeasonSummary model
   */
  interface FieldSeasonSummaryFieldRefs {
    readonly id: FieldRef<"FieldSeasonSummary", 'String'>
    readonly fieldId: FieldRef<"FieldSeasonSummary", 'String'>
    readonly season: FieldRef<"FieldSeasonSummary", 'Int'>
    readonly currentStage: FieldRef<"FieldSeasonSummary", 'String'>
    readonly accumulatedGdd: FieldRef<"FieldSeasonSummary", 'Float'>
    readonly accumulatedChilling: FieldRef<"FieldSeasonSummary", 'Float'>
    readonly bioFixReached: FieldRef<"FieldSeasonSummary", 'Boolean'>
    readonly bioFixDate: FieldRef<"FieldSeasonSummary", 'DateTime'>
    readonly gddToNextStage: FieldRef<"FieldSeasonSummary", 'Float'>
    readonly daysInCurrentStage: FieldRef<"FieldSeasonSummary", 'Int'>
    readonly lastUpdated: FieldRef<"FieldSeasonSummary", 'DateTime'>
    readonly predictedFloweringDate: FieldRef<"FieldSeasonSummary", 'DateTime'>
    readonly predictedHarvestDate: FieldRef<"FieldSeasonSummary", 'DateTime'>
    readonly totalPrecipitation: FieldRef<"FieldSeasonSummary", 'Float'>
    readonly avgTemperature: FieldRef<"FieldSeasonSummary", 'Float'>
    readonly createdAt: FieldRef<"FieldSeasonSummary", 'DateTime'>
    readonly updatedAt: FieldRef<"FieldSeasonSummary", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * FieldSeasonSummary findUnique
   */
  export type FieldSeasonSummaryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FieldSeasonSummary
     */
    select?: FieldSeasonSummarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the FieldSeasonSummary
     */
    omit?: FieldSeasonSummaryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FieldSeasonSummaryInclude<ExtArgs> | null
    /**
     * Filter, which FieldSeasonSummary to fetch.
     */
    where: FieldSeasonSummaryWhereUniqueInput
  }

  /**
   * FieldSeasonSummary findUniqueOrThrow
   */
  export type FieldSeasonSummaryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FieldSeasonSummary
     */
    select?: FieldSeasonSummarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the FieldSeasonSummary
     */
    omit?: FieldSeasonSummaryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FieldSeasonSummaryInclude<ExtArgs> | null
    /**
     * Filter, which FieldSeasonSummary to fetch.
     */
    where: FieldSeasonSummaryWhereUniqueInput
  }

  /**
   * FieldSeasonSummary findFirst
   */
  export type FieldSeasonSummaryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FieldSeasonSummary
     */
    select?: FieldSeasonSummarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the FieldSeasonSummary
     */
    omit?: FieldSeasonSummaryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FieldSeasonSummaryInclude<ExtArgs> | null
    /**
     * Filter, which FieldSeasonSummary to fetch.
     */
    where?: FieldSeasonSummaryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FieldSeasonSummaries to fetch.
     */
    orderBy?: FieldSeasonSummaryOrderByWithRelationInput | FieldSeasonSummaryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FieldSeasonSummaries.
     */
    cursor?: FieldSeasonSummaryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FieldSeasonSummaries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FieldSeasonSummaries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FieldSeasonSummaries.
     */
    distinct?: FieldSeasonSummaryScalarFieldEnum | FieldSeasonSummaryScalarFieldEnum[]
  }

  /**
   * FieldSeasonSummary findFirstOrThrow
   */
  export type FieldSeasonSummaryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FieldSeasonSummary
     */
    select?: FieldSeasonSummarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the FieldSeasonSummary
     */
    omit?: FieldSeasonSummaryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FieldSeasonSummaryInclude<ExtArgs> | null
    /**
     * Filter, which FieldSeasonSummary to fetch.
     */
    where?: FieldSeasonSummaryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FieldSeasonSummaries to fetch.
     */
    orderBy?: FieldSeasonSummaryOrderByWithRelationInput | FieldSeasonSummaryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FieldSeasonSummaries.
     */
    cursor?: FieldSeasonSummaryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FieldSeasonSummaries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FieldSeasonSummaries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FieldSeasonSummaries.
     */
    distinct?: FieldSeasonSummaryScalarFieldEnum | FieldSeasonSummaryScalarFieldEnum[]
  }

  /**
   * FieldSeasonSummary findMany
   */
  export type FieldSeasonSummaryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FieldSeasonSummary
     */
    select?: FieldSeasonSummarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the FieldSeasonSummary
     */
    omit?: FieldSeasonSummaryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FieldSeasonSummaryInclude<ExtArgs> | null
    /**
     * Filter, which FieldSeasonSummaries to fetch.
     */
    where?: FieldSeasonSummaryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FieldSeasonSummaries to fetch.
     */
    orderBy?: FieldSeasonSummaryOrderByWithRelationInput | FieldSeasonSummaryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FieldSeasonSummaries.
     */
    cursor?: FieldSeasonSummaryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FieldSeasonSummaries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FieldSeasonSummaries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FieldSeasonSummaries.
     */
    distinct?: FieldSeasonSummaryScalarFieldEnum | FieldSeasonSummaryScalarFieldEnum[]
  }

  /**
   * FieldSeasonSummary create
   */
  export type FieldSeasonSummaryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FieldSeasonSummary
     */
    select?: FieldSeasonSummarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the FieldSeasonSummary
     */
    omit?: FieldSeasonSummaryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FieldSeasonSummaryInclude<ExtArgs> | null
    /**
     * The data needed to create a FieldSeasonSummary.
     */
    data: XOR<FieldSeasonSummaryCreateInput, FieldSeasonSummaryUncheckedCreateInput>
  }

  /**
   * FieldSeasonSummary createMany
   */
  export type FieldSeasonSummaryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FieldSeasonSummaries.
     */
    data: FieldSeasonSummaryCreateManyInput | FieldSeasonSummaryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FieldSeasonSummary createManyAndReturn
   */
  export type FieldSeasonSummaryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FieldSeasonSummary
     */
    select?: FieldSeasonSummarySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FieldSeasonSummary
     */
    omit?: FieldSeasonSummaryOmit<ExtArgs> | null
    /**
     * The data used to create many FieldSeasonSummaries.
     */
    data: FieldSeasonSummaryCreateManyInput | FieldSeasonSummaryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FieldSeasonSummaryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * FieldSeasonSummary update
   */
  export type FieldSeasonSummaryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FieldSeasonSummary
     */
    select?: FieldSeasonSummarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the FieldSeasonSummary
     */
    omit?: FieldSeasonSummaryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FieldSeasonSummaryInclude<ExtArgs> | null
    /**
     * The data needed to update a FieldSeasonSummary.
     */
    data: XOR<FieldSeasonSummaryUpdateInput, FieldSeasonSummaryUncheckedUpdateInput>
    /**
     * Choose, which FieldSeasonSummary to update.
     */
    where: FieldSeasonSummaryWhereUniqueInput
  }

  /**
   * FieldSeasonSummary updateMany
   */
  export type FieldSeasonSummaryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FieldSeasonSummaries.
     */
    data: XOR<FieldSeasonSummaryUpdateManyMutationInput, FieldSeasonSummaryUncheckedUpdateManyInput>
    /**
     * Filter which FieldSeasonSummaries to update
     */
    where?: FieldSeasonSummaryWhereInput
    /**
     * Limit how many FieldSeasonSummaries to update.
     */
    limit?: number
  }

  /**
   * FieldSeasonSummary updateManyAndReturn
   */
  export type FieldSeasonSummaryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FieldSeasonSummary
     */
    select?: FieldSeasonSummarySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FieldSeasonSummary
     */
    omit?: FieldSeasonSummaryOmit<ExtArgs> | null
    /**
     * The data used to update FieldSeasonSummaries.
     */
    data: XOR<FieldSeasonSummaryUpdateManyMutationInput, FieldSeasonSummaryUncheckedUpdateManyInput>
    /**
     * Filter which FieldSeasonSummaries to update
     */
    where?: FieldSeasonSummaryWhereInput
    /**
     * Limit how many FieldSeasonSummaries to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FieldSeasonSummaryIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * FieldSeasonSummary upsert
   */
  export type FieldSeasonSummaryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FieldSeasonSummary
     */
    select?: FieldSeasonSummarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the FieldSeasonSummary
     */
    omit?: FieldSeasonSummaryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FieldSeasonSummaryInclude<ExtArgs> | null
    /**
     * The filter to search for the FieldSeasonSummary to update in case it exists.
     */
    where: FieldSeasonSummaryWhereUniqueInput
    /**
     * In case the FieldSeasonSummary found by the `where` argument doesn't exist, create a new FieldSeasonSummary with this data.
     */
    create: XOR<FieldSeasonSummaryCreateInput, FieldSeasonSummaryUncheckedCreateInput>
    /**
     * In case the FieldSeasonSummary was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FieldSeasonSummaryUpdateInput, FieldSeasonSummaryUncheckedUpdateInput>
  }

  /**
   * FieldSeasonSummary delete
   */
  export type FieldSeasonSummaryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FieldSeasonSummary
     */
    select?: FieldSeasonSummarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the FieldSeasonSummary
     */
    omit?: FieldSeasonSummaryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FieldSeasonSummaryInclude<ExtArgs> | null
    /**
     * Filter which FieldSeasonSummary to delete.
     */
    where: FieldSeasonSummaryWhereUniqueInput
  }

  /**
   * FieldSeasonSummary deleteMany
   */
  export type FieldSeasonSummaryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FieldSeasonSummaries to delete
     */
    where?: FieldSeasonSummaryWhereInput
    /**
     * Limit how many FieldSeasonSummaries to delete.
     */
    limit?: number
  }

  /**
   * FieldSeasonSummary without action
   */
  export type FieldSeasonSummaryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FieldSeasonSummary
     */
    select?: FieldSeasonSummarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the FieldSeasonSummary
     */
    omit?: FieldSeasonSummaryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FieldSeasonSummaryInclude<ExtArgs> | null
  }


  /**
   * Model IrrigationConfig
   */

  export type AggregateIrrigationConfig = {
    _count: IrrigationConfigCountAggregateOutputType | null
    _avg: IrrigationConfigAvgAggregateOutputType | null
    _sum: IrrigationConfigSumAggregateOutputType | null
    _min: IrrigationConfigMinAggregateOutputType | null
    _max: IrrigationConfigMaxAggregateOutputType | null
  }

  export type IrrigationConfigAvgAggregateOutputType = {
    dripperFlowRate: number | null
    drippersPerTree: number | null
    treeDensity: number | null
    efficiency: number | null
  }

  export type IrrigationConfigSumAggregateOutputType = {
    dripperFlowRate: number | null
    drippersPerTree: number | null
    treeDensity: number | null
    efficiency: number | null
  }

  export type IrrigationConfigMinAggregateOutputType = {
    id: string | null
    fieldId: string | null
    dripperFlowRate: number | null
    drippersPerTree: number | null
    treeDensity: number | null
    efficiency: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type IrrigationConfigMaxAggregateOutputType = {
    id: string | null
    fieldId: string | null
    dripperFlowRate: number | null
    drippersPerTree: number | null
    treeDensity: number | null
    efficiency: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type IrrigationConfigCountAggregateOutputType = {
    id: number
    fieldId: number
    dripperFlowRate: number
    drippersPerTree: number
    treeDensity: number
    efficiency: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type IrrigationConfigAvgAggregateInputType = {
    dripperFlowRate?: true
    drippersPerTree?: true
    treeDensity?: true
    efficiency?: true
  }

  export type IrrigationConfigSumAggregateInputType = {
    dripperFlowRate?: true
    drippersPerTree?: true
    treeDensity?: true
    efficiency?: true
  }

  export type IrrigationConfigMinAggregateInputType = {
    id?: true
    fieldId?: true
    dripperFlowRate?: true
    drippersPerTree?: true
    treeDensity?: true
    efficiency?: true
    createdAt?: true
    updatedAt?: true
  }

  export type IrrigationConfigMaxAggregateInputType = {
    id?: true
    fieldId?: true
    dripperFlowRate?: true
    drippersPerTree?: true
    treeDensity?: true
    efficiency?: true
    createdAt?: true
    updatedAt?: true
  }

  export type IrrigationConfigCountAggregateInputType = {
    id?: true
    fieldId?: true
    dripperFlowRate?: true
    drippersPerTree?: true
    treeDensity?: true
    efficiency?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type IrrigationConfigAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which IrrigationConfig to aggregate.
     */
    where?: IrrigationConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of IrrigationConfigs to fetch.
     */
    orderBy?: IrrigationConfigOrderByWithRelationInput | IrrigationConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: IrrigationConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` IrrigationConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` IrrigationConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned IrrigationConfigs
    **/
    _count?: true | IrrigationConfigCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: IrrigationConfigAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: IrrigationConfigSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: IrrigationConfigMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: IrrigationConfigMaxAggregateInputType
  }

  export type GetIrrigationConfigAggregateType<T extends IrrigationConfigAggregateArgs> = {
        [P in keyof T & keyof AggregateIrrigationConfig]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateIrrigationConfig[P]>
      : GetScalarType<T[P], AggregateIrrigationConfig[P]>
  }




  export type IrrigationConfigGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: IrrigationConfigWhereInput
    orderBy?: IrrigationConfigOrderByWithAggregationInput | IrrigationConfigOrderByWithAggregationInput[]
    by: IrrigationConfigScalarFieldEnum[] | IrrigationConfigScalarFieldEnum
    having?: IrrigationConfigScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: IrrigationConfigCountAggregateInputType | true
    _avg?: IrrigationConfigAvgAggregateInputType
    _sum?: IrrigationConfigSumAggregateInputType
    _min?: IrrigationConfigMinAggregateInputType
    _max?: IrrigationConfigMaxAggregateInputType
  }

  export type IrrigationConfigGroupByOutputType = {
    id: string
    fieldId: string
    dripperFlowRate: number
    drippersPerTree: number
    treeDensity: number
    efficiency: number
    createdAt: Date
    updatedAt: Date
    _count: IrrigationConfigCountAggregateOutputType | null
    _avg: IrrigationConfigAvgAggregateOutputType | null
    _sum: IrrigationConfigSumAggregateOutputType | null
    _min: IrrigationConfigMinAggregateOutputType | null
    _max: IrrigationConfigMaxAggregateOutputType | null
  }

  type GetIrrigationConfigGroupByPayload<T extends IrrigationConfigGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<IrrigationConfigGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof IrrigationConfigGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], IrrigationConfigGroupByOutputType[P]>
            : GetScalarType<T[P], IrrigationConfigGroupByOutputType[P]>
        }
      >
    >


  export type IrrigationConfigSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fieldId?: boolean
    dripperFlowRate?: boolean
    drippersPerTree?: boolean
    treeDensity?: boolean
    efficiency?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    field?: boolean | FieldDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["irrigationConfig"]>

  export type IrrigationConfigSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fieldId?: boolean
    dripperFlowRate?: boolean
    drippersPerTree?: boolean
    treeDensity?: boolean
    efficiency?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    field?: boolean | FieldDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["irrigationConfig"]>

  export type IrrigationConfigSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fieldId?: boolean
    dripperFlowRate?: boolean
    drippersPerTree?: boolean
    treeDensity?: boolean
    efficiency?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    field?: boolean | FieldDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["irrigationConfig"]>

  export type IrrigationConfigSelectScalar = {
    id?: boolean
    fieldId?: boolean
    dripperFlowRate?: boolean
    drippersPerTree?: boolean
    treeDensity?: boolean
    efficiency?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type IrrigationConfigOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "fieldId" | "dripperFlowRate" | "drippersPerTree" | "treeDensity" | "efficiency" | "createdAt" | "updatedAt", ExtArgs["result"]["irrigationConfig"]>
  export type IrrigationConfigInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    field?: boolean | FieldDefaultArgs<ExtArgs>
  }
  export type IrrigationConfigIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    field?: boolean | FieldDefaultArgs<ExtArgs>
  }
  export type IrrigationConfigIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    field?: boolean | FieldDefaultArgs<ExtArgs>
  }

  export type $IrrigationConfigPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "IrrigationConfig"
    objects: {
      field: Prisma.$FieldPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      fieldId: string
      dripperFlowRate: number
      drippersPerTree: number
      treeDensity: number
      efficiency: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["irrigationConfig"]>
    composites: {}
  }

  type IrrigationConfigGetPayload<S extends boolean | null | undefined | IrrigationConfigDefaultArgs> = $Result.GetResult<Prisma.$IrrigationConfigPayload, S>

  type IrrigationConfigCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<IrrigationConfigFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: IrrigationConfigCountAggregateInputType | true
    }

  export interface IrrigationConfigDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['IrrigationConfig'], meta: { name: 'IrrigationConfig' } }
    /**
     * Find zero or one IrrigationConfig that matches the filter.
     * @param {IrrigationConfigFindUniqueArgs} args - Arguments to find a IrrigationConfig
     * @example
     * // Get one IrrigationConfig
     * const irrigationConfig = await prisma.irrigationConfig.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends IrrigationConfigFindUniqueArgs>(args: SelectSubset<T, IrrigationConfigFindUniqueArgs<ExtArgs>>): Prisma__IrrigationConfigClient<$Result.GetResult<Prisma.$IrrigationConfigPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one IrrigationConfig that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {IrrigationConfigFindUniqueOrThrowArgs} args - Arguments to find a IrrigationConfig
     * @example
     * // Get one IrrigationConfig
     * const irrigationConfig = await prisma.irrigationConfig.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends IrrigationConfigFindUniqueOrThrowArgs>(args: SelectSubset<T, IrrigationConfigFindUniqueOrThrowArgs<ExtArgs>>): Prisma__IrrigationConfigClient<$Result.GetResult<Prisma.$IrrigationConfigPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first IrrigationConfig that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IrrigationConfigFindFirstArgs} args - Arguments to find a IrrigationConfig
     * @example
     * // Get one IrrigationConfig
     * const irrigationConfig = await prisma.irrigationConfig.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends IrrigationConfigFindFirstArgs>(args?: SelectSubset<T, IrrigationConfigFindFirstArgs<ExtArgs>>): Prisma__IrrigationConfigClient<$Result.GetResult<Prisma.$IrrigationConfigPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first IrrigationConfig that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IrrigationConfigFindFirstOrThrowArgs} args - Arguments to find a IrrigationConfig
     * @example
     * // Get one IrrigationConfig
     * const irrigationConfig = await prisma.irrigationConfig.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends IrrigationConfigFindFirstOrThrowArgs>(args?: SelectSubset<T, IrrigationConfigFindFirstOrThrowArgs<ExtArgs>>): Prisma__IrrigationConfigClient<$Result.GetResult<Prisma.$IrrigationConfigPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more IrrigationConfigs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IrrigationConfigFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all IrrigationConfigs
     * const irrigationConfigs = await prisma.irrigationConfig.findMany()
     * 
     * // Get first 10 IrrigationConfigs
     * const irrigationConfigs = await prisma.irrigationConfig.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const irrigationConfigWithIdOnly = await prisma.irrigationConfig.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends IrrigationConfigFindManyArgs>(args?: SelectSubset<T, IrrigationConfigFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IrrigationConfigPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a IrrigationConfig.
     * @param {IrrigationConfigCreateArgs} args - Arguments to create a IrrigationConfig.
     * @example
     * // Create one IrrigationConfig
     * const IrrigationConfig = await prisma.irrigationConfig.create({
     *   data: {
     *     // ... data to create a IrrigationConfig
     *   }
     * })
     * 
     */
    create<T extends IrrigationConfigCreateArgs>(args: SelectSubset<T, IrrigationConfigCreateArgs<ExtArgs>>): Prisma__IrrigationConfigClient<$Result.GetResult<Prisma.$IrrigationConfigPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many IrrigationConfigs.
     * @param {IrrigationConfigCreateManyArgs} args - Arguments to create many IrrigationConfigs.
     * @example
     * // Create many IrrigationConfigs
     * const irrigationConfig = await prisma.irrigationConfig.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends IrrigationConfigCreateManyArgs>(args?: SelectSubset<T, IrrigationConfigCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many IrrigationConfigs and returns the data saved in the database.
     * @param {IrrigationConfigCreateManyAndReturnArgs} args - Arguments to create many IrrigationConfigs.
     * @example
     * // Create many IrrigationConfigs
     * const irrigationConfig = await prisma.irrigationConfig.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many IrrigationConfigs and only return the `id`
     * const irrigationConfigWithIdOnly = await prisma.irrigationConfig.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends IrrigationConfigCreateManyAndReturnArgs>(args?: SelectSubset<T, IrrigationConfigCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IrrigationConfigPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a IrrigationConfig.
     * @param {IrrigationConfigDeleteArgs} args - Arguments to delete one IrrigationConfig.
     * @example
     * // Delete one IrrigationConfig
     * const IrrigationConfig = await prisma.irrigationConfig.delete({
     *   where: {
     *     // ... filter to delete one IrrigationConfig
     *   }
     * })
     * 
     */
    delete<T extends IrrigationConfigDeleteArgs>(args: SelectSubset<T, IrrigationConfigDeleteArgs<ExtArgs>>): Prisma__IrrigationConfigClient<$Result.GetResult<Prisma.$IrrigationConfigPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one IrrigationConfig.
     * @param {IrrigationConfigUpdateArgs} args - Arguments to update one IrrigationConfig.
     * @example
     * // Update one IrrigationConfig
     * const irrigationConfig = await prisma.irrigationConfig.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends IrrigationConfigUpdateArgs>(args: SelectSubset<T, IrrigationConfigUpdateArgs<ExtArgs>>): Prisma__IrrigationConfigClient<$Result.GetResult<Prisma.$IrrigationConfigPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more IrrigationConfigs.
     * @param {IrrigationConfigDeleteManyArgs} args - Arguments to filter IrrigationConfigs to delete.
     * @example
     * // Delete a few IrrigationConfigs
     * const { count } = await prisma.irrigationConfig.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends IrrigationConfigDeleteManyArgs>(args?: SelectSubset<T, IrrigationConfigDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more IrrigationConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IrrigationConfigUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many IrrigationConfigs
     * const irrigationConfig = await prisma.irrigationConfig.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends IrrigationConfigUpdateManyArgs>(args: SelectSubset<T, IrrigationConfigUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more IrrigationConfigs and returns the data updated in the database.
     * @param {IrrigationConfigUpdateManyAndReturnArgs} args - Arguments to update many IrrigationConfigs.
     * @example
     * // Update many IrrigationConfigs
     * const irrigationConfig = await prisma.irrigationConfig.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more IrrigationConfigs and only return the `id`
     * const irrigationConfigWithIdOnly = await prisma.irrigationConfig.updateManyAndReturn({
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
    updateManyAndReturn<T extends IrrigationConfigUpdateManyAndReturnArgs>(args: SelectSubset<T, IrrigationConfigUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IrrigationConfigPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one IrrigationConfig.
     * @param {IrrigationConfigUpsertArgs} args - Arguments to update or create a IrrigationConfig.
     * @example
     * // Update or create a IrrigationConfig
     * const irrigationConfig = await prisma.irrigationConfig.upsert({
     *   create: {
     *     // ... data to create a IrrigationConfig
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the IrrigationConfig we want to update
     *   }
     * })
     */
    upsert<T extends IrrigationConfigUpsertArgs>(args: SelectSubset<T, IrrigationConfigUpsertArgs<ExtArgs>>): Prisma__IrrigationConfigClient<$Result.GetResult<Prisma.$IrrigationConfigPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of IrrigationConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IrrigationConfigCountArgs} args - Arguments to filter IrrigationConfigs to count.
     * @example
     * // Count the number of IrrigationConfigs
     * const count = await prisma.irrigationConfig.count({
     *   where: {
     *     // ... the filter for the IrrigationConfigs we want to count
     *   }
     * })
    **/
    count<T extends IrrigationConfigCountArgs>(
      args?: Subset<T, IrrigationConfigCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], IrrigationConfigCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a IrrigationConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IrrigationConfigAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends IrrigationConfigAggregateArgs>(args: Subset<T, IrrigationConfigAggregateArgs>): Prisma.PrismaPromise<GetIrrigationConfigAggregateType<T>>

    /**
     * Group by IrrigationConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IrrigationConfigGroupByArgs} args - Group by arguments.
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
      T extends IrrigationConfigGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: IrrigationConfigGroupByArgs['orderBy'] }
        : { orderBy?: IrrigationConfigGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, IrrigationConfigGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetIrrigationConfigGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the IrrigationConfig model
   */
  readonly fields: IrrigationConfigFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for IrrigationConfig.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__IrrigationConfigClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    field<T extends FieldDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FieldDefaultArgs<ExtArgs>>): Prisma__FieldClient<$Result.GetResult<Prisma.$FieldPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the IrrigationConfig model
   */
  interface IrrigationConfigFieldRefs {
    readonly id: FieldRef<"IrrigationConfig", 'String'>
    readonly fieldId: FieldRef<"IrrigationConfig", 'String'>
    readonly dripperFlowRate: FieldRef<"IrrigationConfig", 'Float'>
    readonly drippersPerTree: FieldRef<"IrrigationConfig", 'Int'>
    readonly treeDensity: FieldRef<"IrrigationConfig", 'Int'>
    readonly efficiency: FieldRef<"IrrigationConfig", 'Float'>
    readonly createdAt: FieldRef<"IrrigationConfig", 'DateTime'>
    readonly updatedAt: FieldRef<"IrrigationConfig", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * IrrigationConfig findUnique
   */
  export type IrrigationConfigFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IrrigationConfig
     */
    select?: IrrigationConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IrrigationConfig
     */
    omit?: IrrigationConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IrrigationConfigInclude<ExtArgs> | null
    /**
     * Filter, which IrrigationConfig to fetch.
     */
    where: IrrigationConfigWhereUniqueInput
  }

  /**
   * IrrigationConfig findUniqueOrThrow
   */
  export type IrrigationConfigFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IrrigationConfig
     */
    select?: IrrigationConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IrrigationConfig
     */
    omit?: IrrigationConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IrrigationConfigInclude<ExtArgs> | null
    /**
     * Filter, which IrrigationConfig to fetch.
     */
    where: IrrigationConfigWhereUniqueInput
  }

  /**
   * IrrigationConfig findFirst
   */
  export type IrrigationConfigFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IrrigationConfig
     */
    select?: IrrigationConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IrrigationConfig
     */
    omit?: IrrigationConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IrrigationConfigInclude<ExtArgs> | null
    /**
     * Filter, which IrrigationConfig to fetch.
     */
    where?: IrrigationConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of IrrigationConfigs to fetch.
     */
    orderBy?: IrrigationConfigOrderByWithRelationInput | IrrigationConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for IrrigationConfigs.
     */
    cursor?: IrrigationConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` IrrigationConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` IrrigationConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of IrrigationConfigs.
     */
    distinct?: IrrigationConfigScalarFieldEnum | IrrigationConfigScalarFieldEnum[]
  }

  /**
   * IrrigationConfig findFirstOrThrow
   */
  export type IrrigationConfigFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IrrigationConfig
     */
    select?: IrrigationConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IrrigationConfig
     */
    omit?: IrrigationConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IrrigationConfigInclude<ExtArgs> | null
    /**
     * Filter, which IrrigationConfig to fetch.
     */
    where?: IrrigationConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of IrrigationConfigs to fetch.
     */
    orderBy?: IrrigationConfigOrderByWithRelationInput | IrrigationConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for IrrigationConfigs.
     */
    cursor?: IrrigationConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` IrrigationConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` IrrigationConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of IrrigationConfigs.
     */
    distinct?: IrrigationConfigScalarFieldEnum | IrrigationConfigScalarFieldEnum[]
  }

  /**
   * IrrigationConfig findMany
   */
  export type IrrigationConfigFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IrrigationConfig
     */
    select?: IrrigationConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IrrigationConfig
     */
    omit?: IrrigationConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IrrigationConfigInclude<ExtArgs> | null
    /**
     * Filter, which IrrigationConfigs to fetch.
     */
    where?: IrrigationConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of IrrigationConfigs to fetch.
     */
    orderBy?: IrrigationConfigOrderByWithRelationInput | IrrigationConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing IrrigationConfigs.
     */
    cursor?: IrrigationConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` IrrigationConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` IrrigationConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of IrrigationConfigs.
     */
    distinct?: IrrigationConfigScalarFieldEnum | IrrigationConfigScalarFieldEnum[]
  }

  /**
   * IrrigationConfig create
   */
  export type IrrigationConfigCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IrrigationConfig
     */
    select?: IrrigationConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IrrigationConfig
     */
    omit?: IrrigationConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IrrigationConfigInclude<ExtArgs> | null
    /**
     * The data needed to create a IrrigationConfig.
     */
    data: XOR<IrrigationConfigCreateInput, IrrigationConfigUncheckedCreateInput>
  }

  /**
   * IrrigationConfig createMany
   */
  export type IrrigationConfigCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many IrrigationConfigs.
     */
    data: IrrigationConfigCreateManyInput | IrrigationConfigCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * IrrigationConfig createManyAndReturn
   */
  export type IrrigationConfigCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IrrigationConfig
     */
    select?: IrrigationConfigSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the IrrigationConfig
     */
    omit?: IrrigationConfigOmit<ExtArgs> | null
    /**
     * The data used to create many IrrigationConfigs.
     */
    data: IrrigationConfigCreateManyInput | IrrigationConfigCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IrrigationConfigIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * IrrigationConfig update
   */
  export type IrrigationConfigUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IrrigationConfig
     */
    select?: IrrigationConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IrrigationConfig
     */
    omit?: IrrigationConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IrrigationConfigInclude<ExtArgs> | null
    /**
     * The data needed to update a IrrigationConfig.
     */
    data: XOR<IrrigationConfigUpdateInput, IrrigationConfigUncheckedUpdateInput>
    /**
     * Choose, which IrrigationConfig to update.
     */
    where: IrrigationConfigWhereUniqueInput
  }

  /**
   * IrrigationConfig updateMany
   */
  export type IrrigationConfigUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update IrrigationConfigs.
     */
    data: XOR<IrrigationConfigUpdateManyMutationInput, IrrigationConfigUncheckedUpdateManyInput>
    /**
     * Filter which IrrigationConfigs to update
     */
    where?: IrrigationConfigWhereInput
    /**
     * Limit how many IrrigationConfigs to update.
     */
    limit?: number
  }

  /**
   * IrrigationConfig updateManyAndReturn
   */
  export type IrrigationConfigUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IrrigationConfig
     */
    select?: IrrigationConfigSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the IrrigationConfig
     */
    omit?: IrrigationConfigOmit<ExtArgs> | null
    /**
     * The data used to update IrrigationConfigs.
     */
    data: XOR<IrrigationConfigUpdateManyMutationInput, IrrigationConfigUncheckedUpdateManyInput>
    /**
     * Filter which IrrigationConfigs to update
     */
    where?: IrrigationConfigWhereInput
    /**
     * Limit how many IrrigationConfigs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IrrigationConfigIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * IrrigationConfig upsert
   */
  export type IrrigationConfigUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IrrigationConfig
     */
    select?: IrrigationConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IrrigationConfig
     */
    omit?: IrrigationConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IrrigationConfigInclude<ExtArgs> | null
    /**
     * The filter to search for the IrrigationConfig to update in case it exists.
     */
    where: IrrigationConfigWhereUniqueInput
    /**
     * In case the IrrigationConfig found by the `where` argument doesn't exist, create a new IrrigationConfig with this data.
     */
    create: XOR<IrrigationConfigCreateInput, IrrigationConfigUncheckedCreateInput>
    /**
     * In case the IrrigationConfig was found with the provided `where` argument, update it with this data.
     */
    update: XOR<IrrigationConfigUpdateInput, IrrigationConfigUncheckedUpdateInput>
  }

  /**
   * IrrigationConfig delete
   */
  export type IrrigationConfigDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IrrigationConfig
     */
    select?: IrrigationConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IrrigationConfig
     */
    omit?: IrrigationConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IrrigationConfigInclude<ExtArgs> | null
    /**
     * Filter which IrrigationConfig to delete.
     */
    where: IrrigationConfigWhereUniqueInput
  }

  /**
   * IrrigationConfig deleteMany
   */
  export type IrrigationConfigDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which IrrigationConfigs to delete
     */
    where?: IrrigationConfigWhereInput
    /**
     * Limit how many IrrigationConfigs to delete.
     */
    limit?: number
  }

  /**
   * IrrigationConfig without action
   */
  export type IrrigationConfigDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IrrigationConfig
     */
    select?: IrrigationConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IrrigationConfig
     */
    omit?: IrrigationConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IrrigationConfigInclude<ExtArgs> | null
  }


  /**
   * Model SoilAnalysis
   */

  export type AggregateSoilAnalysis = {
    _count: SoilAnalysisCountAggregateOutputType | null
    _avg: SoilAnalysisAvgAggregateOutputType | null
    _sum: SoilAnalysisSumAggregateOutputType | null
    _min: SoilAnalysisMinAggregateOutputType | null
    _max: SoilAnalysisMaxAggregateOutputType | null
  }

  export type SoilAnalysisAvgAggregateOutputType = {
    ph: number | null
    organicMatter: number | null
    nitrogen: number | null
    phosphorus: number | null
    potassium: number | null
  }

  export type SoilAnalysisSumAggregateOutputType = {
    ph: number | null
    organicMatter: number | null
    nitrogen: number | null
    phosphorus: number | null
    potassium: number | null
  }

  export type SoilAnalysisMinAggregateOutputType = {
    id: string | null
    fieldId: string | null
    analysisDate: Date | null
    ph: number | null
    organicMatter: number | null
    nitrogen: number | null
    phosphorus: number | null
    potassium: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SoilAnalysisMaxAggregateOutputType = {
    id: string | null
    fieldId: string | null
    analysisDate: Date | null
    ph: number | null
    organicMatter: number | null
    nitrogen: number | null
    phosphorus: number | null
    potassium: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SoilAnalysisCountAggregateOutputType = {
    id: number
    fieldId: number
    analysisDate: number
    ph: number
    organicMatter: number
    nitrogen: number
    phosphorus: number
    potassium: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SoilAnalysisAvgAggregateInputType = {
    ph?: true
    organicMatter?: true
    nitrogen?: true
    phosphorus?: true
    potassium?: true
  }

  export type SoilAnalysisSumAggregateInputType = {
    ph?: true
    organicMatter?: true
    nitrogen?: true
    phosphorus?: true
    potassium?: true
  }

  export type SoilAnalysisMinAggregateInputType = {
    id?: true
    fieldId?: true
    analysisDate?: true
    ph?: true
    organicMatter?: true
    nitrogen?: true
    phosphorus?: true
    potassium?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SoilAnalysisMaxAggregateInputType = {
    id?: true
    fieldId?: true
    analysisDate?: true
    ph?: true
    organicMatter?: true
    nitrogen?: true
    phosphorus?: true
    potassium?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SoilAnalysisCountAggregateInputType = {
    id?: true
    fieldId?: true
    analysisDate?: true
    ph?: true
    organicMatter?: true
    nitrogen?: true
    phosphorus?: true
    potassium?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SoilAnalysisAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SoilAnalysis to aggregate.
     */
    where?: SoilAnalysisWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SoilAnalyses to fetch.
     */
    orderBy?: SoilAnalysisOrderByWithRelationInput | SoilAnalysisOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SoilAnalysisWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SoilAnalyses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SoilAnalyses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SoilAnalyses
    **/
    _count?: true | SoilAnalysisCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SoilAnalysisAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SoilAnalysisSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SoilAnalysisMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SoilAnalysisMaxAggregateInputType
  }

  export type GetSoilAnalysisAggregateType<T extends SoilAnalysisAggregateArgs> = {
        [P in keyof T & keyof AggregateSoilAnalysis]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSoilAnalysis[P]>
      : GetScalarType<T[P], AggregateSoilAnalysis[P]>
  }




  export type SoilAnalysisGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SoilAnalysisWhereInput
    orderBy?: SoilAnalysisOrderByWithAggregationInput | SoilAnalysisOrderByWithAggregationInput[]
    by: SoilAnalysisScalarFieldEnum[] | SoilAnalysisScalarFieldEnum
    having?: SoilAnalysisScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SoilAnalysisCountAggregateInputType | true
    _avg?: SoilAnalysisAvgAggregateInputType
    _sum?: SoilAnalysisSumAggregateInputType
    _min?: SoilAnalysisMinAggregateInputType
    _max?: SoilAnalysisMaxAggregateInputType
  }

  export type SoilAnalysisGroupByOutputType = {
    id: string
    fieldId: string
    analysisDate: Date
    ph: number | null
    organicMatter: number | null
    nitrogen: number | null
    phosphorus: number | null
    potassium: number | null
    createdAt: Date
    updatedAt: Date
    _count: SoilAnalysisCountAggregateOutputType | null
    _avg: SoilAnalysisAvgAggregateOutputType | null
    _sum: SoilAnalysisSumAggregateOutputType | null
    _min: SoilAnalysisMinAggregateOutputType | null
    _max: SoilAnalysisMaxAggregateOutputType | null
  }

  type GetSoilAnalysisGroupByPayload<T extends SoilAnalysisGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SoilAnalysisGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SoilAnalysisGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SoilAnalysisGroupByOutputType[P]>
            : GetScalarType<T[P], SoilAnalysisGroupByOutputType[P]>
        }
      >
    >


  export type SoilAnalysisSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fieldId?: boolean
    analysisDate?: boolean
    ph?: boolean
    organicMatter?: boolean
    nitrogen?: boolean
    phosphorus?: boolean
    potassium?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    field?: boolean | FieldDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["soilAnalysis"]>

  export type SoilAnalysisSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fieldId?: boolean
    analysisDate?: boolean
    ph?: boolean
    organicMatter?: boolean
    nitrogen?: boolean
    phosphorus?: boolean
    potassium?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    field?: boolean | FieldDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["soilAnalysis"]>

  export type SoilAnalysisSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fieldId?: boolean
    analysisDate?: boolean
    ph?: boolean
    organicMatter?: boolean
    nitrogen?: boolean
    phosphorus?: boolean
    potassium?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    field?: boolean | FieldDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["soilAnalysis"]>

  export type SoilAnalysisSelectScalar = {
    id?: boolean
    fieldId?: boolean
    analysisDate?: boolean
    ph?: boolean
    organicMatter?: boolean
    nitrogen?: boolean
    phosphorus?: boolean
    potassium?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SoilAnalysisOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "fieldId" | "analysisDate" | "ph" | "organicMatter" | "nitrogen" | "phosphorus" | "potassium" | "createdAt" | "updatedAt", ExtArgs["result"]["soilAnalysis"]>
  export type SoilAnalysisInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    field?: boolean | FieldDefaultArgs<ExtArgs>
  }
  export type SoilAnalysisIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    field?: boolean | FieldDefaultArgs<ExtArgs>
  }
  export type SoilAnalysisIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    field?: boolean | FieldDefaultArgs<ExtArgs>
  }

  export type $SoilAnalysisPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SoilAnalysis"
    objects: {
      field: Prisma.$FieldPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      fieldId: string
      analysisDate: Date
      ph: number | null
      organicMatter: number | null
      nitrogen: number | null
      phosphorus: number | null
      potassium: number | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["soilAnalysis"]>
    composites: {}
  }

  type SoilAnalysisGetPayload<S extends boolean | null | undefined | SoilAnalysisDefaultArgs> = $Result.GetResult<Prisma.$SoilAnalysisPayload, S>

  type SoilAnalysisCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SoilAnalysisFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SoilAnalysisCountAggregateInputType | true
    }

  export interface SoilAnalysisDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SoilAnalysis'], meta: { name: 'SoilAnalysis' } }
    /**
     * Find zero or one SoilAnalysis that matches the filter.
     * @param {SoilAnalysisFindUniqueArgs} args - Arguments to find a SoilAnalysis
     * @example
     * // Get one SoilAnalysis
     * const soilAnalysis = await prisma.soilAnalysis.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SoilAnalysisFindUniqueArgs>(args: SelectSubset<T, SoilAnalysisFindUniqueArgs<ExtArgs>>): Prisma__SoilAnalysisClient<$Result.GetResult<Prisma.$SoilAnalysisPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SoilAnalysis that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SoilAnalysisFindUniqueOrThrowArgs} args - Arguments to find a SoilAnalysis
     * @example
     * // Get one SoilAnalysis
     * const soilAnalysis = await prisma.soilAnalysis.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SoilAnalysisFindUniqueOrThrowArgs>(args: SelectSubset<T, SoilAnalysisFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SoilAnalysisClient<$Result.GetResult<Prisma.$SoilAnalysisPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SoilAnalysis that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SoilAnalysisFindFirstArgs} args - Arguments to find a SoilAnalysis
     * @example
     * // Get one SoilAnalysis
     * const soilAnalysis = await prisma.soilAnalysis.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SoilAnalysisFindFirstArgs>(args?: SelectSubset<T, SoilAnalysisFindFirstArgs<ExtArgs>>): Prisma__SoilAnalysisClient<$Result.GetResult<Prisma.$SoilAnalysisPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SoilAnalysis that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SoilAnalysisFindFirstOrThrowArgs} args - Arguments to find a SoilAnalysis
     * @example
     * // Get one SoilAnalysis
     * const soilAnalysis = await prisma.soilAnalysis.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SoilAnalysisFindFirstOrThrowArgs>(args?: SelectSubset<T, SoilAnalysisFindFirstOrThrowArgs<ExtArgs>>): Prisma__SoilAnalysisClient<$Result.GetResult<Prisma.$SoilAnalysisPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SoilAnalyses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SoilAnalysisFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SoilAnalyses
     * const soilAnalyses = await prisma.soilAnalysis.findMany()
     * 
     * // Get first 10 SoilAnalyses
     * const soilAnalyses = await prisma.soilAnalysis.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const soilAnalysisWithIdOnly = await prisma.soilAnalysis.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SoilAnalysisFindManyArgs>(args?: SelectSubset<T, SoilAnalysisFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SoilAnalysisPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SoilAnalysis.
     * @param {SoilAnalysisCreateArgs} args - Arguments to create a SoilAnalysis.
     * @example
     * // Create one SoilAnalysis
     * const SoilAnalysis = await prisma.soilAnalysis.create({
     *   data: {
     *     // ... data to create a SoilAnalysis
     *   }
     * })
     * 
     */
    create<T extends SoilAnalysisCreateArgs>(args: SelectSubset<T, SoilAnalysisCreateArgs<ExtArgs>>): Prisma__SoilAnalysisClient<$Result.GetResult<Prisma.$SoilAnalysisPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SoilAnalyses.
     * @param {SoilAnalysisCreateManyArgs} args - Arguments to create many SoilAnalyses.
     * @example
     * // Create many SoilAnalyses
     * const soilAnalysis = await prisma.soilAnalysis.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SoilAnalysisCreateManyArgs>(args?: SelectSubset<T, SoilAnalysisCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SoilAnalyses and returns the data saved in the database.
     * @param {SoilAnalysisCreateManyAndReturnArgs} args - Arguments to create many SoilAnalyses.
     * @example
     * // Create many SoilAnalyses
     * const soilAnalysis = await prisma.soilAnalysis.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SoilAnalyses and only return the `id`
     * const soilAnalysisWithIdOnly = await prisma.soilAnalysis.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SoilAnalysisCreateManyAndReturnArgs>(args?: SelectSubset<T, SoilAnalysisCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SoilAnalysisPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SoilAnalysis.
     * @param {SoilAnalysisDeleteArgs} args - Arguments to delete one SoilAnalysis.
     * @example
     * // Delete one SoilAnalysis
     * const SoilAnalysis = await prisma.soilAnalysis.delete({
     *   where: {
     *     // ... filter to delete one SoilAnalysis
     *   }
     * })
     * 
     */
    delete<T extends SoilAnalysisDeleteArgs>(args: SelectSubset<T, SoilAnalysisDeleteArgs<ExtArgs>>): Prisma__SoilAnalysisClient<$Result.GetResult<Prisma.$SoilAnalysisPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SoilAnalysis.
     * @param {SoilAnalysisUpdateArgs} args - Arguments to update one SoilAnalysis.
     * @example
     * // Update one SoilAnalysis
     * const soilAnalysis = await prisma.soilAnalysis.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SoilAnalysisUpdateArgs>(args: SelectSubset<T, SoilAnalysisUpdateArgs<ExtArgs>>): Prisma__SoilAnalysisClient<$Result.GetResult<Prisma.$SoilAnalysisPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SoilAnalyses.
     * @param {SoilAnalysisDeleteManyArgs} args - Arguments to filter SoilAnalyses to delete.
     * @example
     * // Delete a few SoilAnalyses
     * const { count } = await prisma.soilAnalysis.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SoilAnalysisDeleteManyArgs>(args?: SelectSubset<T, SoilAnalysisDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SoilAnalyses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SoilAnalysisUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SoilAnalyses
     * const soilAnalysis = await prisma.soilAnalysis.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SoilAnalysisUpdateManyArgs>(args: SelectSubset<T, SoilAnalysisUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SoilAnalyses and returns the data updated in the database.
     * @param {SoilAnalysisUpdateManyAndReturnArgs} args - Arguments to update many SoilAnalyses.
     * @example
     * // Update many SoilAnalyses
     * const soilAnalysis = await prisma.soilAnalysis.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SoilAnalyses and only return the `id`
     * const soilAnalysisWithIdOnly = await prisma.soilAnalysis.updateManyAndReturn({
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
    updateManyAndReturn<T extends SoilAnalysisUpdateManyAndReturnArgs>(args: SelectSubset<T, SoilAnalysisUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SoilAnalysisPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SoilAnalysis.
     * @param {SoilAnalysisUpsertArgs} args - Arguments to update or create a SoilAnalysis.
     * @example
     * // Update or create a SoilAnalysis
     * const soilAnalysis = await prisma.soilAnalysis.upsert({
     *   create: {
     *     // ... data to create a SoilAnalysis
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SoilAnalysis we want to update
     *   }
     * })
     */
    upsert<T extends SoilAnalysisUpsertArgs>(args: SelectSubset<T, SoilAnalysisUpsertArgs<ExtArgs>>): Prisma__SoilAnalysisClient<$Result.GetResult<Prisma.$SoilAnalysisPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SoilAnalyses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SoilAnalysisCountArgs} args - Arguments to filter SoilAnalyses to count.
     * @example
     * // Count the number of SoilAnalyses
     * const count = await prisma.soilAnalysis.count({
     *   where: {
     *     // ... the filter for the SoilAnalyses we want to count
     *   }
     * })
    **/
    count<T extends SoilAnalysisCountArgs>(
      args?: Subset<T, SoilAnalysisCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SoilAnalysisCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SoilAnalysis.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SoilAnalysisAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SoilAnalysisAggregateArgs>(args: Subset<T, SoilAnalysisAggregateArgs>): Prisma.PrismaPromise<GetSoilAnalysisAggregateType<T>>

    /**
     * Group by SoilAnalysis.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SoilAnalysisGroupByArgs} args - Group by arguments.
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
      T extends SoilAnalysisGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SoilAnalysisGroupByArgs['orderBy'] }
        : { orderBy?: SoilAnalysisGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SoilAnalysisGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSoilAnalysisGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SoilAnalysis model
   */
  readonly fields: SoilAnalysisFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SoilAnalysis.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SoilAnalysisClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    field<T extends FieldDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FieldDefaultArgs<ExtArgs>>): Prisma__FieldClient<$Result.GetResult<Prisma.$FieldPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the SoilAnalysis model
   */
  interface SoilAnalysisFieldRefs {
    readonly id: FieldRef<"SoilAnalysis", 'String'>
    readonly fieldId: FieldRef<"SoilAnalysis", 'String'>
    readonly analysisDate: FieldRef<"SoilAnalysis", 'DateTime'>
    readonly ph: FieldRef<"SoilAnalysis", 'Float'>
    readonly organicMatter: FieldRef<"SoilAnalysis", 'Float'>
    readonly nitrogen: FieldRef<"SoilAnalysis", 'Float'>
    readonly phosphorus: FieldRef<"SoilAnalysis", 'Float'>
    readonly potassium: FieldRef<"SoilAnalysis", 'Float'>
    readonly createdAt: FieldRef<"SoilAnalysis", 'DateTime'>
    readonly updatedAt: FieldRef<"SoilAnalysis", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SoilAnalysis findUnique
   */
  export type SoilAnalysisFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SoilAnalysis
     */
    select?: SoilAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SoilAnalysis
     */
    omit?: SoilAnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SoilAnalysisInclude<ExtArgs> | null
    /**
     * Filter, which SoilAnalysis to fetch.
     */
    where: SoilAnalysisWhereUniqueInput
  }

  /**
   * SoilAnalysis findUniqueOrThrow
   */
  export type SoilAnalysisFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SoilAnalysis
     */
    select?: SoilAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SoilAnalysis
     */
    omit?: SoilAnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SoilAnalysisInclude<ExtArgs> | null
    /**
     * Filter, which SoilAnalysis to fetch.
     */
    where: SoilAnalysisWhereUniqueInput
  }

  /**
   * SoilAnalysis findFirst
   */
  export type SoilAnalysisFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SoilAnalysis
     */
    select?: SoilAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SoilAnalysis
     */
    omit?: SoilAnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SoilAnalysisInclude<ExtArgs> | null
    /**
     * Filter, which SoilAnalysis to fetch.
     */
    where?: SoilAnalysisWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SoilAnalyses to fetch.
     */
    orderBy?: SoilAnalysisOrderByWithRelationInput | SoilAnalysisOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SoilAnalyses.
     */
    cursor?: SoilAnalysisWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SoilAnalyses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SoilAnalyses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SoilAnalyses.
     */
    distinct?: SoilAnalysisScalarFieldEnum | SoilAnalysisScalarFieldEnum[]
  }

  /**
   * SoilAnalysis findFirstOrThrow
   */
  export type SoilAnalysisFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SoilAnalysis
     */
    select?: SoilAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SoilAnalysis
     */
    omit?: SoilAnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SoilAnalysisInclude<ExtArgs> | null
    /**
     * Filter, which SoilAnalysis to fetch.
     */
    where?: SoilAnalysisWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SoilAnalyses to fetch.
     */
    orderBy?: SoilAnalysisOrderByWithRelationInput | SoilAnalysisOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SoilAnalyses.
     */
    cursor?: SoilAnalysisWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SoilAnalyses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SoilAnalyses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SoilAnalyses.
     */
    distinct?: SoilAnalysisScalarFieldEnum | SoilAnalysisScalarFieldEnum[]
  }

  /**
   * SoilAnalysis findMany
   */
  export type SoilAnalysisFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SoilAnalysis
     */
    select?: SoilAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SoilAnalysis
     */
    omit?: SoilAnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SoilAnalysisInclude<ExtArgs> | null
    /**
     * Filter, which SoilAnalyses to fetch.
     */
    where?: SoilAnalysisWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SoilAnalyses to fetch.
     */
    orderBy?: SoilAnalysisOrderByWithRelationInput | SoilAnalysisOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SoilAnalyses.
     */
    cursor?: SoilAnalysisWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SoilAnalyses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SoilAnalyses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SoilAnalyses.
     */
    distinct?: SoilAnalysisScalarFieldEnum | SoilAnalysisScalarFieldEnum[]
  }

  /**
   * SoilAnalysis create
   */
  export type SoilAnalysisCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SoilAnalysis
     */
    select?: SoilAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SoilAnalysis
     */
    omit?: SoilAnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SoilAnalysisInclude<ExtArgs> | null
    /**
     * The data needed to create a SoilAnalysis.
     */
    data: XOR<SoilAnalysisCreateInput, SoilAnalysisUncheckedCreateInput>
  }

  /**
   * SoilAnalysis createMany
   */
  export type SoilAnalysisCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SoilAnalyses.
     */
    data: SoilAnalysisCreateManyInput | SoilAnalysisCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SoilAnalysis createManyAndReturn
   */
  export type SoilAnalysisCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SoilAnalysis
     */
    select?: SoilAnalysisSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SoilAnalysis
     */
    omit?: SoilAnalysisOmit<ExtArgs> | null
    /**
     * The data used to create many SoilAnalyses.
     */
    data: SoilAnalysisCreateManyInput | SoilAnalysisCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SoilAnalysisIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * SoilAnalysis update
   */
  export type SoilAnalysisUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SoilAnalysis
     */
    select?: SoilAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SoilAnalysis
     */
    omit?: SoilAnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SoilAnalysisInclude<ExtArgs> | null
    /**
     * The data needed to update a SoilAnalysis.
     */
    data: XOR<SoilAnalysisUpdateInput, SoilAnalysisUncheckedUpdateInput>
    /**
     * Choose, which SoilAnalysis to update.
     */
    where: SoilAnalysisWhereUniqueInput
  }

  /**
   * SoilAnalysis updateMany
   */
  export type SoilAnalysisUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SoilAnalyses.
     */
    data: XOR<SoilAnalysisUpdateManyMutationInput, SoilAnalysisUncheckedUpdateManyInput>
    /**
     * Filter which SoilAnalyses to update
     */
    where?: SoilAnalysisWhereInput
    /**
     * Limit how many SoilAnalyses to update.
     */
    limit?: number
  }

  /**
   * SoilAnalysis updateManyAndReturn
   */
  export type SoilAnalysisUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SoilAnalysis
     */
    select?: SoilAnalysisSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SoilAnalysis
     */
    omit?: SoilAnalysisOmit<ExtArgs> | null
    /**
     * The data used to update SoilAnalyses.
     */
    data: XOR<SoilAnalysisUpdateManyMutationInput, SoilAnalysisUncheckedUpdateManyInput>
    /**
     * Filter which SoilAnalyses to update
     */
    where?: SoilAnalysisWhereInput
    /**
     * Limit how many SoilAnalyses to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SoilAnalysisIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * SoilAnalysis upsert
   */
  export type SoilAnalysisUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SoilAnalysis
     */
    select?: SoilAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SoilAnalysis
     */
    omit?: SoilAnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SoilAnalysisInclude<ExtArgs> | null
    /**
     * The filter to search for the SoilAnalysis to update in case it exists.
     */
    where: SoilAnalysisWhereUniqueInput
    /**
     * In case the SoilAnalysis found by the `where` argument doesn't exist, create a new SoilAnalysis with this data.
     */
    create: XOR<SoilAnalysisCreateInput, SoilAnalysisUncheckedCreateInput>
    /**
     * In case the SoilAnalysis was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SoilAnalysisUpdateInput, SoilAnalysisUncheckedUpdateInput>
  }

  /**
   * SoilAnalysis delete
   */
  export type SoilAnalysisDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SoilAnalysis
     */
    select?: SoilAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SoilAnalysis
     */
    omit?: SoilAnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SoilAnalysisInclude<ExtArgs> | null
    /**
     * Filter which SoilAnalysis to delete.
     */
    where: SoilAnalysisWhereUniqueInput
  }

  /**
   * SoilAnalysis deleteMany
   */
  export type SoilAnalysisDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SoilAnalyses to delete
     */
    where?: SoilAnalysisWhereInput
    /**
     * Limit how many SoilAnalyses to delete.
     */
    limit?: number
  }

  /**
   * SoilAnalysis without action
   */
  export type SoilAnalysisDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SoilAnalysis
     */
    select?: SoilAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SoilAnalysis
     */
    omit?: SoilAnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SoilAnalysisInclude<ExtArgs> | null
  }


  /**
   * Model YieldConfig
   */

  export type AggregateYieldConfig = {
    _count: YieldConfigCountAggregateOutputType | null
    _avg: YieldConfigAvgAggregateOutputType | null
    _sum: YieldConfigSumAggregateOutputType | null
    _min: YieldConfigMinAggregateOutputType | null
    _max: YieldConfigMaxAggregateOutputType | null
  }

  export type YieldConfigAvgAggregateOutputType = {
    targetYield: number | null
  }

  export type YieldConfigSumAggregateOutputType = {
    targetYield: number | null
  }

  export type YieldConfigMinAggregateOutputType = {
    id: string | null
    fieldId: string | null
    targetYield: number | null
    bearingStatus: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type YieldConfigMaxAggregateOutputType = {
    id: string | null
    fieldId: string | null
    targetYield: number | null
    bearingStatus: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type YieldConfigCountAggregateOutputType = {
    id: number
    fieldId: number
    targetYield: number
    bearingStatus: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type YieldConfigAvgAggregateInputType = {
    targetYield?: true
  }

  export type YieldConfigSumAggregateInputType = {
    targetYield?: true
  }

  export type YieldConfigMinAggregateInputType = {
    id?: true
    fieldId?: true
    targetYield?: true
    bearingStatus?: true
    createdAt?: true
    updatedAt?: true
  }

  export type YieldConfigMaxAggregateInputType = {
    id?: true
    fieldId?: true
    targetYield?: true
    bearingStatus?: true
    createdAt?: true
    updatedAt?: true
  }

  export type YieldConfigCountAggregateInputType = {
    id?: true
    fieldId?: true
    targetYield?: true
    bearingStatus?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type YieldConfigAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which YieldConfig to aggregate.
     */
    where?: YieldConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of YieldConfigs to fetch.
     */
    orderBy?: YieldConfigOrderByWithRelationInput | YieldConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: YieldConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` YieldConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` YieldConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned YieldConfigs
    **/
    _count?: true | YieldConfigCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: YieldConfigAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: YieldConfigSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: YieldConfigMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: YieldConfigMaxAggregateInputType
  }

  export type GetYieldConfigAggregateType<T extends YieldConfigAggregateArgs> = {
        [P in keyof T & keyof AggregateYieldConfig]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateYieldConfig[P]>
      : GetScalarType<T[P], AggregateYieldConfig[P]>
  }




  export type YieldConfigGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: YieldConfigWhereInput
    orderBy?: YieldConfigOrderByWithAggregationInput | YieldConfigOrderByWithAggregationInput[]
    by: YieldConfigScalarFieldEnum[] | YieldConfigScalarFieldEnum
    having?: YieldConfigScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: YieldConfigCountAggregateInputType | true
    _avg?: YieldConfigAvgAggregateInputType
    _sum?: YieldConfigSumAggregateInputType
    _min?: YieldConfigMinAggregateInputType
    _max?: YieldConfigMaxAggregateInputType
  }

  export type YieldConfigGroupByOutputType = {
    id: string
    fieldId: string
    targetYield: number
    bearingStatus: string
    createdAt: Date
    updatedAt: Date
    _count: YieldConfigCountAggregateOutputType | null
    _avg: YieldConfigAvgAggregateOutputType | null
    _sum: YieldConfigSumAggregateOutputType | null
    _min: YieldConfigMinAggregateOutputType | null
    _max: YieldConfigMaxAggregateOutputType | null
  }

  type GetYieldConfigGroupByPayload<T extends YieldConfigGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<YieldConfigGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof YieldConfigGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], YieldConfigGroupByOutputType[P]>
            : GetScalarType<T[P], YieldConfigGroupByOutputType[P]>
        }
      >
    >


  export type YieldConfigSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fieldId?: boolean
    targetYield?: boolean
    bearingStatus?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    field?: boolean | FieldDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["yieldConfig"]>

  export type YieldConfigSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fieldId?: boolean
    targetYield?: boolean
    bearingStatus?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    field?: boolean | FieldDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["yieldConfig"]>

  export type YieldConfigSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fieldId?: boolean
    targetYield?: boolean
    bearingStatus?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    field?: boolean | FieldDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["yieldConfig"]>

  export type YieldConfigSelectScalar = {
    id?: boolean
    fieldId?: boolean
    targetYield?: boolean
    bearingStatus?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type YieldConfigOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "fieldId" | "targetYield" | "bearingStatus" | "createdAt" | "updatedAt", ExtArgs["result"]["yieldConfig"]>
  export type YieldConfigInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    field?: boolean | FieldDefaultArgs<ExtArgs>
  }
  export type YieldConfigIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    field?: boolean | FieldDefaultArgs<ExtArgs>
  }
  export type YieldConfigIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    field?: boolean | FieldDefaultArgs<ExtArgs>
  }

  export type $YieldConfigPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "YieldConfig"
    objects: {
      field: Prisma.$FieldPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      fieldId: string
      targetYield: number
      bearingStatus: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["yieldConfig"]>
    composites: {}
  }

  type YieldConfigGetPayload<S extends boolean | null | undefined | YieldConfigDefaultArgs> = $Result.GetResult<Prisma.$YieldConfigPayload, S>

  type YieldConfigCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<YieldConfigFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: YieldConfigCountAggregateInputType | true
    }

  export interface YieldConfigDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['YieldConfig'], meta: { name: 'YieldConfig' } }
    /**
     * Find zero or one YieldConfig that matches the filter.
     * @param {YieldConfigFindUniqueArgs} args - Arguments to find a YieldConfig
     * @example
     * // Get one YieldConfig
     * const yieldConfig = await prisma.yieldConfig.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends YieldConfigFindUniqueArgs>(args: SelectSubset<T, YieldConfigFindUniqueArgs<ExtArgs>>): Prisma__YieldConfigClient<$Result.GetResult<Prisma.$YieldConfigPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one YieldConfig that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {YieldConfigFindUniqueOrThrowArgs} args - Arguments to find a YieldConfig
     * @example
     * // Get one YieldConfig
     * const yieldConfig = await prisma.yieldConfig.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends YieldConfigFindUniqueOrThrowArgs>(args: SelectSubset<T, YieldConfigFindUniqueOrThrowArgs<ExtArgs>>): Prisma__YieldConfigClient<$Result.GetResult<Prisma.$YieldConfigPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first YieldConfig that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {YieldConfigFindFirstArgs} args - Arguments to find a YieldConfig
     * @example
     * // Get one YieldConfig
     * const yieldConfig = await prisma.yieldConfig.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends YieldConfigFindFirstArgs>(args?: SelectSubset<T, YieldConfigFindFirstArgs<ExtArgs>>): Prisma__YieldConfigClient<$Result.GetResult<Prisma.$YieldConfigPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first YieldConfig that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {YieldConfigFindFirstOrThrowArgs} args - Arguments to find a YieldConfig
     * @example
     * // Get one YieldConfig
     * const yieldConfig = await prisma.yieldConfig.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends YieldConfigFindFirstOrThrowArgs>(args?: SelectSubset<T, YieldConfigFindFirstOrThrowArgs<ExtArgs>>): Prisma__YieldConfigClient<$Result.GetResult<Prisma.$YieldConfigPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more YieldConfigs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {YieldConfigFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all YieldConfigs
     * const yieldConfigs = await prisma.yieldConfig.findMany()
     * 
     * // Get first 10 YieldConfigs
     * const yieldConfigs = await prisma.yieldConfig.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const yieldConfigWithIdOnly = await prisma.yieldConfig.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends YieldConfigFindManyArgs>(args?: SelectSubset<T, YieldConfigFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$YieldConfigPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a YieldConfig.
     * @param {YieldConfigCreateArgs} args - Arguments to create a YieldConfig.
     * @example
     * // Create one YieldConfig
     * const YieldConfig = await prisma.yieldConfig.create({
     *   data: {
     *     // ... data to create a YieldConfig
     *   }
     * })
     * 
     */
    create<T extends YieldConfigCreateArgs>(args: SelectSubset<T, YieldConfigCreateArgs<ExtArgs>>): Prisma__YieldConfigClient<$Result.GetResult<Prisma.$YieldConfigPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many YieldConfigs.
     * @param {YieldConfigCreateManyArgs} args - Arguments to create many YieldConfigs.
     * @example
     * // Create many YieldConfigs
     * const yieldConfig = await prisma.yieldConfig.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends YieldConfigCreateManyArgs>(args?: SelectSubset<T, YieldConfigCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many YieldConfigs and returns the data saved in the database.
     * @param {YieldConfigCreateManyAndReturnArgs} args - Arguments to create many YieldConfigs.
     * @example
     * // Create many YieldConfigs
     * const yieldConfig = await prisma.yieldConfig.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many YieldConfigs and only return the `id`
     * const yieldConfigWithIdOnly = await prisma.yieldConfig.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends YieldConfigCreateManyAndReturnArgs>(args?: SelectSubset<T, YieldConfigCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$YieldConfigPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a YieldConfig.
     * @param {YieldConfigDeleteArgs} args - Arguments to delete one YieldConfig.
     * @example
     * // Delete one YieldConfig
     * const YieldConfig = await prisma.yieldConfig.delete({
     *   where: {
     *     // ... filter to delete one YieldConfig
     *   }
     * })
     * 
     */
    delete<T extends YieldConfigDeleteArgs>(args: SelectSubset<T, YieldConfigDeleteArgs<ExtArgs>>): Prisma__YieldConfigClient<$Result.GetResult<Prisma.$YieldConfigPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one YieldConfig.
     * @param {YieldConfigUpdateArgs} args - Arguments to update one YieldConfig.
     * @example
     * // Update one YieldConfig
     * const yieldConfig = await prisma.yieldConfig.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends YieldConfigUpdateArgs>(args: SelectSubset<T, YieldConfigUpdateArgs<ExtArgs>>): Prisma__YieldConfigClient<$Result.GetResult<Prisma.$YieldConfigPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more YieldConfigs.
     * @param {YieldConfigDeleteManyArgs} args - Arguments to filter YieldConfigs to delete.
     * @example
     * // Delete a few YieldConfigs
     * const { count } = await prisma.yieldConfig.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends YieldConfigDeleteManyArgs>(args?: SelectSubset<T, YieldConfigDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more YieldConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {YieldConfigUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many YieldConfigs
     * const yieldConfig = await prisma.yieldConfig.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends YieldConfigUpdateManyArgs>(args: SelectSubset<T, YieldConfigUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more YieldConfigs and returns the data updated in the database.
     * @param {YieldConfigUpdateManyAndReturnArgs} args - Arguments to update many YieldConfigs.
     * @example
     * // Update many YieldConfigs
     * const yieldConfig = await prisma.yieldConfig.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more YieldConfigs and only return the `id`
     * const yieldConfigWithIdOnly = await prisma.yieldConfig.updateManyAndReturn({
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
    updateManyAndReturn<T extends YieldConfigUpdateManyAndReturnArgs>(args: SelectSubset<T, YieldConfigUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$YieldConfigPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one YieldConfig.
     * @param {YieldConfigUpsertArgs} args - Arguments to update or create a YieldConfig.
     * @example
     * // Update or create a YieldConfig
     * const yieldConfig = await prisma.yieldConfig.upsert({
     *   create: {
     *     // ... data to create a YieldConfig
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the YieldConfig we want to update
     *   }
     * })
     */
    upsert<T extends YieldConfigUpsertArgs>(args: SelectSubset<T, YieldConfigUpsertArgs<ExtArgs>>): Prisma__YieldConfigClient<$Result.GetResult<Prisma.$YieldConfigPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of YieldConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {YieldConfigCountArgs} args - Arguments to filter YieldConfigs to count.
     * @example
     * // Count the number of YieldConfigs
     * const count = await prisma.yieldConfig.count({
     *   where: {
     *     // ... the filter for the YieldConfigs we want to count
     *   }
     * })
    **/
    count<T extends YieldConfigCountArgs>(
      args?: Subset<T, YieldConfigCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], YieldConfigCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a YieldConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {YieldConfigAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends YieldConfigAggregateArgs>(args: Subset<T, YieldConfigAggregateArgs>): Prisma.PrismaPromise<GetYieldConfigAggregateType<T>>

    /**
     * Group by YieldConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {YieldConfigGroupByArgs} args - Group by arguments.
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
      T extends YieldConfigGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: YieldConfigGroupByArgs['orderBy'] }
        : { orderBy?: YieldConfigGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, YieldConfigGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetYieldConfigGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the YieldConfig model
   */
  readonly fields: YieldConfigFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for YieldConfig.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__YieldConfigClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    field<T extends FieldDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FieldDefaultArgs<ExtArgs>>): Prisma__FieldClient<$Result.GetResult<Prisma.$FieldPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the YieldConfig model
   */
  interface YieldConfigFieldRefs {
    readonly id: FieldRef<"YieldConfig", 'String'>
    readonly fieldId: FieldRef<"YieldConfig", 'String'>
    readonly targetYield: FieldRef<"YieldConfig", 'Float'>
    readonly bearingStatus: FieldRef<"YieldConfig", 'String'>
    readonly createdAt: FieldRef<"YieldConfig", 'DateTime'>
    readonly updatedAt: FieldRef<"YieldConfig", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * YieldConfig findUnique
   */
  export type YieldConfigFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the YieldConfig
     */
    select?: YieldConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the YieldConfig
     */
    omit?: YieldConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: YieldConfigInclude<ExtArgs> | null
    /**
     * Filter, which YieldConfig to fetch.
     */
    where: YieldConfigWhereUniqueInput
  }

  /**
   * YieldConfig findUniqueOrThrow
   */
  export type YieldConfigFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the YieldConfig
     */
    select?: YieldConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the YieldConfig
     */
    omit?: YieldConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: YieldConfigInclude<ExtArgs> | null
    /**
     * Filter, which YieldConfig to fetch.
     */
    where: YieldConfigWhereUniqueInput
  }

  /**
   * YieldConfig findFirst
   */
  export type YieldConfigFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the YieldConfig
     */
    select?: YieldConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the YieldConfig
     */
    omit?: YieldConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: YieldConfigInclude<ExtArgs> | null
    /**
     * Filter, which YieldConfig to fetch.
     */
    where?: YieldConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of YieldConfigs to fetch.
     */
    orderBy?: YieldConfigOrderByWithRelationInput | YieldConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for YieldConfigs.
     */
    cursor?: YieldConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` YieldConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` YieldConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of YieldConfigs.
     */
    distinct?: YieldConfigScalarFieldEnum | YieldConfigScalarFieldEnum[]
  }

  /**
   * YieldConfig findFirstOrThrow
   */
  export type YieldConfigFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the YieldConfig
     */
    select?: YieldConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the YieldConfig
     */
    omit?: YieldConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: YieldConfigInclude<ExtArgs> | null
    /**
     * Filter, which YieldConfig to fetch.
     */
    where?: YieldConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of YieldConfigs to fetch.
     */
    orderBy?: YieldConfigOrderByWithRelationInput | YieldConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for YieldConfigs.
     */
    cursor?: YieldConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` YieldConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` YieldConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of YieldConfigs.
     */
    distinct?: YieldConfigScalarFieldEnum | YieldConfigScalarFieldEnum[]
  }

  /**
   * YieldConfig findMany
   */
  export type YieldConfigFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the YieldConfig
     */
    select?: YieldConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the YieldConfig
     */
    omit?: YieldConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: YieldConfigInclude<ExtArgs> | null
    /**
     * Filter, which YieldConfigs to fetch.
     */
    where?: YieldConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of YieldConfigs to fetch.
     */
    orderBy?: YieldConfigOrderByWithRelationInput | YieldConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing YieldConfigs.
     */
    cursor?: YieldConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` YieldConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` YieldConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of YieldConfigs.
     */
    distinct?: YieldConfigScalarFieldEnum | YieldConfigScalarFieldEnum[]
  }

  /**
   * YieldConfig create
   */
  export type YieldConfigCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the YieldConfig
     */
    select?: YieldConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the YieldConfig
     */
    omit?: YieldConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: YieldConfigInclude<ExtArgs> | null
    /**
     * The data needed to create a YieldConfig.
     */
    data: XOR<YieldConfigCreateInput, YieldConfigUncheckedCreateInput>
  }

  /**
   * YieldConfig createMany
   */
  export type YieldConfigCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many YieldConfigs.
     */
    data: YieldConfigCreateManyInput | YieldConfigCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * YieldConfig createManyAndReturn
   */
  export type YieldConfigCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the YieldConfig
     */
    select?: YieldConfigSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the YieldConfig
     */
    omit?: YieldConfigOmit<ExtArgs> | null
    /**
     * The data used to create many YieldConfigs.
     */
    data: YieldConfigCreateManyInput | YieldConfigCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: YieldConfigIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * YieldConfig update
   */
  export type YieldConfigUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the YieldConfig
     */
    select?: YieldConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the YieldConfig
     */
    omit?: YieldConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: YieldConfigInclude<ExtArgs> | null
    /**
     * The data needed to update a YieldConfig.
     */
    data: XOR<YieldConfigUpdateInput, YieldConfigUncheckedUpdateInput>
    /**
     * Choose, which YieldConfig to update.
     */
    where: YieldConfigWhereUniqueInput
  }

  /**
   * YieldConfig updateMany
   */
  export type YieldConfigUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update YieldConfigs.
     */
    data: XOR<YieldConfigUpdateManyMutationInput, YieldConfigUncheckedUpdateManyInput>
    /**
     * Filter which YieldConfigs to update
     */
    where?: YieldConfigWhereInput
    /**
     * Limit how many YieldConfigs to update.
     */
    limit?: number
  }

  /**
   * YieldConfig updateManyAndReturn
   */
  export type YieldConfigUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the YieldConfig
     */
    select?: YieldConfigSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the YieldConfig
     */
    omit?: YieldConfigOmit<ExtArgs> | null
    /**
     * The data used to update YieldConfigs.
     */
    data: XOR<YieldConfigUpdateManyMutationInput, YieldConfigUncheckedUpdateManyInput>
    /**
     * Filter which YieldConfigs to update
     */
    where?: YieldConfigWhereInput
    /**
     * Limit how many YieldConfigs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: YieldConfigIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * YieldConfig upsert
   */
  export type YieldConfigUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the YieldConfig
     */
    select?: YieldConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the YieldConfig
     */
    omit?: YieldConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: YieldConfigInclude<ExtArgs> | null
    /**
     * The filter to search for the YieldConfig to update in case it exists.
     */
    where: YieldConfigWhereUniqueInput
    /**
     * In case the YieldConfig found by the `where` argument doesn't exist, create a new YieldConfig with this data.
     */
    create: XOR<YieldConfigCreateInput, YieldConfigUncheckedCreateInput>
    /**
     * In case the YieldConfig was found with the provided `where` argument, update it with this data.
     */
    update: XOR<YieldConfigUpdateInput, YieldConfigUncheckedUpdateInput>
  }

  /**
   * YieldConfig delete
   */
  export type YieldConfigDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the YieldConfig
     */
    select?: YieldConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the YieldConfig
     */
    omit?: YieldConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: YieldConfigInclude<ExtArgs> | null
    /**
     * Filter which YieldConfig to delete.
     */
    where: YieldConfigWhereUniqueInput
  }

  /**
   * YieldConfig deleteMany
   */
  export type YieldConfigDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which YieldConfigs to delete
     */
    where?: YieldConfigWhereInput
    /**
     * Limit how many YieldConfigs to delete.
     */
    limit?: number
  }

  /**
   * YieldConfig without action
   */
  export type YieldConfigDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the YieldConfig
     */
    select?: YieldConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the YieldConfig
     */
    omit?: YieldConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: YieldConfigInclude<ExtArgs> | null
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


  export const UserScalarFieldEnum: {
    id: 'id',
    fullName: 'fullName',
    email: 'email',
    password: 'password',
    phoneNumber: 'phoneNumber',
    role: 'role',
    createdAt: 'createdAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const FarmScalarFieldEnum: {
    id: 'id',
    name: 'name',
    userId: 'userId',
    createdAt: 'createdAt'
  };

  export type FarmScalarFieldEnum = (typeof FarmScalarFieldEnum)[keyof typeof FarmScalarFieldEnum]


  export const FieldScalarFieldEnum: {
    id: 'id',
    name: 'name',
    farmId: 'farmId',
    geoPolygon: 'geoPolygon',
    area: 'area',
    cropType: 'cropType',
    equipmentConfig: 'equipmentConfig',
    soilMetadata: 'soilMetadata',
    plantingDate: 'plantingDate',
    agronomicData: 'agronomicData',
    createdAt: 'createdAt'
  };

  export type FieldScalarFieldEnum = (typeof FieldScalarFieldEnum)[keyof typeof FieldScalarFieldEnum]


  export const OperationScalarFieldEnum: {
    id: 'id',
    type: 'type',
    date: 'date',
    metadata: 'metadata',
    fieldId: 'fieldId',
    createdAt: 'createdAt'
  };

  export type OperationScalarFieldEnum = (typeof OperationScalarFieldEnum)[keyof typeof OperationScalarFieldEnum]


  export const FieldDailyMetricsScalarFieldEnum: {
    id: 'id',
    fieldId: 'fieldId',
    date: 'date',
    season: 'season',
    tmax: 'tmax',
    tmin: 'tmin',
    humidity: 'humidity',
    precipitation: 'precipitation',
    gddDaily: 'gddDaily',
    accumulatedGdd: 'accumulatedGdd',
    chillingHoursToday: 'chillingHoursToday',
    accumulatedChilling: 'accumulatedChilling',
    bioFixReached: 'bioFixReached',
    currentStage: 'currentStage',
    gddToNextStage: 'gddToNextStage',
    createdAt: 'createdAt'
  };

  export type FieldDailyMetricsScalarFieldEnum = (typeof FieldDailyMetricsScalarFieldEnum)[keyof typeof FieldDailyMetricsScalarFieldEnum]


  export const FieldSeasonSummaryScalarFieldEnum: {
    id: 'id',
    fieldId: 'fieldId',
    season: 'season',
    currentStage: 'currentStage',
    accumulatedGdd: 'accumulatedGdd',
    accumulatedChilling: 'accumulatedChilling',
    bioFixReached: 'bioFixReached',
    bioFixDate: 'bioFixDate',
    gddToNextStage: 'gddToNextStage',
    daysInCurrentStage: 'daysInCurrentStage',
    lastUpdated: 'lastUpdated',
    predictedFloweringDate: 'predictedFloweringDate',
    predictedHarvestDate: 'predictedHarvestDate',
    totalPrecipitation: 'totalPrecipitation',
    avgTemperature: 'avgTemperature',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type FieldSeasonSummaryScalarFieldEnum = (typeof FieldSeasonSummaryScalarFieldEnum)[keyof typeof FieldSeasonSummaryScalarFieldEnum]


  export const IrrigationConfigScalarFieldEnum: {
    id: 'id',
    fieldId: 'fieldId',
    dripperFlowRate: 'dripperFlowRate',
    drippersPerTree: 'drippersPerTree',
    treeDensity: 'treeDensity',
    efficiency: 'efficiency',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type IrrigationConfigScalarFieldEnum = (typeof IrrigationConfigScalarFieldEnum)[keyof typeof IrrigationConfigScalarFieldEnum]


  export const SoilAnalysisScalarFieldEnum: {
    id: 'id',
    fieldId: 'fieldId',
    analysisDate: 'analysisDate',
    ph: 'ph',
    organicMatter: 'organicMatter',
    nitrogen: 'nitrogen',
    phosphorus: 'phosphorus',
    potassium: 'potassium',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SoilAnalysisScalarFieldEnum = (typeof SoilAnalysisScalarFieldEnum)[keyof typeof SoilAnalysisScalarFieldEnum]


  export const YieldConfigScalarFieldEnum: {
    id: 'id',
    fieldId: 'fieldId',
    targetYield: 'targetYield',
    bearingStatus: 'bearingStatus',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type YieldConfigScalarFieldEnum = (typeof YieldConfigScalarFieldEnum)[keyof typeof YieldConfigScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


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
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    fullName?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    phoneNumber?: StringNullableFilter<"User"> | string | null
    role?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    farms?: FarmListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    fullName?: SortOrder
    email?: SortOrder
    password?: SortOrder
    phoneNumber?: SortOrderInput | SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    farms?: FarmOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    phoneNumber?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    fullName?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    role?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    farms?: FarmListRelationFilter
  }, "id" | "email" | "phoneNumber">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    fullName?: SortOrder
    email?: SortOrder
    password?: SortOrder
    phoneNumber?: SortOrderInput | SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    fullName?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    phoneNumber?: StringNullableWithAggregatesFilter<"User"> | string | null
    role?: StringWithAggregatesFilter<"User"> | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type FarmWhereInput = {
    AND?: FarmWhereInput | FarmWhereInput[]
    OR?: FarmWhereInput[]
    NOT?: FarmWhereInput | FarmWhereInput[]
    id?: StringFilter<"Farm"> | string
    name?: StringFilter<"Farm"> | string
    userId?: StringFilter<"Farm"> | string
    createdAt?: DateTimeFilter<"Farm"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    fields?: FieldListRelationFilter
  }

  export type FarmOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    fields?: FieldOrderByRelationAggregateInput
  }

  export type FarmWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: FarmWhereInput | FarmWhereInput[]
    OR?: FarmWhereInput[]
    NOT?: FarmWhereInput | FarmWhereInput[]
    name?: StringFilter<"Farm"> | string
    userId?: StringFilter<"Farm"> | string
    createdAt?: DateTimeFilter<"Farm"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    fields?: FieldListRelationFilter
  }, "id">

  export type FarmOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    _count?: FarmCountOrderByAggregateInput
    _max?: FarmMaxOrderByAggregateInput
    _min?: FarmMinOrderByAggregateInput
  }

  export type FarmScalarWhereWithAggregatesInput = {
    AND?: FarmScalarWhereWithAggregatesInput | FarmScalarWhereWithAggregatesInput[]
    OR?: FarmScalarWhereWithAggregatesInput[]
    NOT?: FarmScalarWhereWithAggregatesInput | FarmScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Farm"> | string
    name?: StringWithAggregatesFilter<"Farm"> | string
    userId?: StringWithAggregatesFilter<"Farm"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Farm"> | Date | string
  }

  export type FieldWhereInput = {
    AND?: FieldWhereInput | FieldWhereInput[]
    OR?: FieldWhereInput[]
    NOT?: FieldWhereInput | FieldWhereInput[]
    id?: StringFilter<"Field"> | string
    name?: StringFilter<"Field"> | string
    farmId?: StringFilter<"Field"> | string
    geoPolygon?: JsonFilter<"Field">
    area?: FloatFilter<"Field"> | number
    cropType?: StringFilter<"Field"> | string
    equipmentConfig?: JsonNullableFilter<"Field">
    soilMetadata?: JsonNullableFilter<"Field">
    plantingDate?: DateTimeNullableFilter<"Field"> | Date | string | null
    agronomicData?: JsonNullableFilter<"Field">
    createdAt?: DateTimeFilter<"Field"> | Date | string
    farm?: XOR<FarmScalarRelationFilter, FarmWhereInput>
    operations?: OperationListRelationFilter
    dailyMetrics?: FieldDailyMetricsListRelationFilter
    seasonSummary?: FieldSeasonSummaryListRelationFilter
    irrigationConfig?: XOR<IrrigationConfigNullableScalarRelationFilter, IrrigationConfigWhereInput> | null
    soilAnalysis?: SoilAnalysisListRelationFilter
    yieldConfig?: XOR<YieldConfigNullableScalarRelationFilter, YieldConfigWhereInput> | null
  }

  export type FieldOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    farmId?: SortOrder
    geoPolygon?: SortOrder
    area?: SortOrder
    cropType?: SortOrder
    equipmentConfig?: SortOrderInput | SortOrder
    soilMetadata?: SortOrderInput | SortOrder
    plantingDate?: SortOrderInput | SortOrder
    agronomicData?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    farm?: FarmOrderByWithRelationInput
    operations?: OperationOrderByRelationAggregateInput
    dailyMetrics?: FieldDailyMetricsOrderByRelationAggregateInput
    seasonSummary?: FieldSeasonSummaryOrderByRelationAggregateInput
    irrigationConfig?: IrrigationConfigOrderByWithRelationInput
    soilAnalysis?: SoilAnalysisOrderByRelationAggregateInput
    yieldConfig?: YieldConfigOrderByWithRelationInput
  }

  export type FieldWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: FieldWhereInput | FieldWhereInput[]
    OR?: FieldWhereInput[]
    NOT?: FieldWhereInput | FieldWhereInput[]
    name?: StringFilter<"Field"> | string
    farmId?: StringFilter<"Field"> | string
    geoPolygon?: JsonFilter<"Field">
    area?: FloatFilter<"Field"> | number
    cropType?: StringFilter<"Field"> | string
    equipmentConfig?: JsonNullableFilter<"Field">
    soilMetadata?: JsonNullableFilter<"Field">
    plantingDate?: DateTimeNullableFilter<"Field"> | Date | string | null
    agronomicData?: JsonNullableFilter<"Field">
    createdAt?: DateTimeFilter<"Field"> | Date | string
    farm?: XOR<FarmScalarRelationFilter, FarmWhereInput>
    operations?: OperationListRelationFilter
    dailyMetrics?: FieldDailyMetricsListRelationFilter
    seasonSummary?: FieldSeasonSummaryListRelationFilter
    irrigationConfig?: XOR<IrrigationConfigNullableScalarRelationFilter, IrrigationConfigWhereInput> | null
    soilAnalysis?: SoilAnalysisListRelationFilter
    yieldConfig?: XOR<YieldConfigNullableScalarRelationFilter, YieldConfigWhereInput> | null
  }, "id">

  export type FieldOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    farmId?: SortOrder
    geoPolygon?: SortOrder
    area?: SortOrder
    cropType?: SortOrder
    equipmentConfig?: SortOrderInput | SortOrder
    soilMetadata?: SortOrderInput | SortOrder
    plantingDate?: SortOrderInput | SortOrder
    agronomicData?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: FieldCountOrderByAggregateInput
    _avg?: FieldAvgOrderByAggregateInput
    _max?: FieldMaxOrderByAggregateInput
    _min?: FieldMinOrderByAggregateInput
    _sum?: FieldSumOrderByAggregateInput
  }

  export type FieldScalarWhereWithAggregatesInput = {
    AND?: FieldScalarWhereWithAggregatesInput | FieldScalarWhereWithAggregatesInput[]
    OR?: FieldScalarWhereWithAggregatesInput[]
    NOT?: FieldScalarWhereWithAggregatesInput | FieldScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Field"> | string
    name?: StringWithAggregatesFilter<"Field"> | string
    farmId?: StringWithAggregatesFilter<"Field"> | string
    geoPolygon?: JsonWithAggregatesFilter<"Field">
    area?: FloatWithAggregatesFilter<"Field"> | number
    cropType?: StringWithAggregatesFilter<"Field"> | string
    equipmentConfig?: JsonNullableWithAggregatesFilter<"Field">
    soilMetadata?: JsonNullableWithAggregatesFilter<"Field">
    plantingDate?: DateTimeNullableWithAggregatesFilter<"Field"> | Date | string | null
    agronomicData?: JsonNullableWithAggregatesFilter<"Field">
    createdAt?: DateTimeWithAggregatesFilter<"Field"> | Date | string
  }

  export type OperationWhereInput = {
    AND?: OperationWhereInput | OperationWhereInput[]
    OR?: OperationWhereInput[]
    NOT?: OperationWhereInput | OperationWhereInput[]
    id?: StringFilter<"Operation"> | string
    type?: StringFilter<"Operation"> | string
    date?: DateTimeFilter<"Operation"> | Date | string
    metadata?: JsonFilter<"Operation">
    fieldId?: StringFilter<"Operation"> | string
    createdAt?: DateTimeFilter<"Operation"> | Date | string
    field?: XOR<FieldScalarRelationFilter, FieldWhereInput>
  }

  export type OperationOrderByWithRelationInput = {
    id?: SortOrder
    type?: SortOrder
    date?: SortOrder
    metadata?: SortOrder
    fieldId?: SortOrder
    createdAt?: SortOrder
    field?: FieldOrderByWithRelationInput
  }

  export type OperationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: OperationWhereInput | OperationWhereInput[]
    OR?: OperationWhereInput[]
    NOT?: OperationWhereInput | OperationWhereInput[]
    type?: StringFilter<"Operation"> | string
    date?: DateTimeFilter<"Operation"> | Date | string
    metadata?: JsonFilter<"Operation">
    fieldId?: StringFilter<"Operation"> | string
    createdAt?: DateTimeFilter<"Operation"> | Date | string
    field?: XOR<FieldScalarRelationFilter, FieldWhereInput>
  }, "id">

  export type OperationOrderByWithAggregationInput = {
    id?: SortOrder
    type?: SortOrder
    date?: SortOrder
    metadata?: SortOrder
    fieldId?: SortOrder
    createdAt?: SortOrder
    _count?: OperationCountOrderByAggregateInput
    _max?: OperationMaxOrderByAggregateInput
    _min?: OperationMinOrderByAggregateInput
  }

  export type OperationScalarWhereWithAggregatesInput = {
    AND?: OperationScalarWhereWithAggregatesInput | OperationScalarWhereWithAggregatesInput[]
    OR?: OperationScalarWhereWithAggregatesInput[]
    NOT?: OperationScalarWhereWithAggregatesInput | OperationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Operation"> | string
    type?: StringWithAggregatesFilter<"Operation"> | string
    date?: DateTimeWithAggregatesFilter<"Operation"> | Date | string
    metadata?: JsonWithAggregatesFilter<"Operation">
    fieldId?: StringWithAggregatesFilter<"Operation"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Operation"> | Date | string
  }

  export type FieldDailyMetricsWhereInput = {
    AND?: FieldDailyMetricsWhereInput | FieldDailyMetricsWhereInput[]
    OR?: FieldDailyMetricsWhereInput[]
    NOT?: FieldDailyMetricsWhereInput | FieldDailyMetricsWhereInput[]
    id?: StringFilter<"FieldDailyMetrics"> | string
    fieldId?: StringFilter<"FieldDailyMetrics"> | string
    date?: DateTimeFilter<"FieldDailyMetrics"> | Date | string
    season?: IntFilter<"FieldDailyMetrics"> | number
    tmax?: FloatFilter<"FieldDailyMetrics"> | number
    tmin?: FloatFilter<"FieldDailyMetrics"> | number
    humidity?: FloatNullableFilter<"FieldDailyMetrics"> | number | null
    precipitation?: FloatNullableFilter<"FieldDailyMetrics"> | number | null
    gddDaily?: FloatFilter<"FieldDailyMetrics"> | number
    accumulatedGdd?: FloatFilter<"FieldDailyMetrics"> | number
    chillingHoursToday?: FloatFilter<"FieldDailyMetrics"> | number
    accumulatedChilling?: FloatFilter<"FieldDailyMetrics"> | number
    bioFixReached?: BoolFilter<"FieldDailyMetrics"> | boolean
    currentStage?: StringNullableFilter<"FieldDailyMetrics"> | string | null
    gddToNextStage?: FloatNullableFilter<"FieldDailyMetrics"> | number | null
    createdAt?: DateTimeFilter<"FieldDailyMetrics"> | Date | string
    field?: XOR<FieldScalarRelationFilter, FieldWhereInput>
  }

  export type FieldDailyMetricsOrderByWithRelationInput = {
    id?: SortOrder
    fieldId?: SortOrder
    date?: SortOrder
    season?: SortOrder
    tmax?: SortOrder
    tmin?: SortOrder
    humidity?: SortOrderInput | SortOrder
    precipitation?: SortOrderInput | SortOrder
    gddDaily?: SortOrder
    accumulatedGdd?: SortOrder
    chillingHoursToday?: SortOrder
    accumulatedChilling?: SortOrder
    bioFixReached?: SortOrder
    currentStage?: SortOrderInput | SortOrder
    gddToNextStage?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    field?: FieldOrderByWithRelationInput
  }

  export type FieldDailyMetricsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    fieldId_date?: FieldDailyMetricsFieldIdDateCompoundUniqueInput
    AND?: FieldDailyMetricsWhereInput | FieldDailyMetricsWhereInput[]
    OR?: FieldDailyMetricsWhereInput[]
    NOT?: FieldDailyMetricsWhereInput | FieldDailyMetricsWhereInput[]
    fieldId?: StringFilter<"FieldDailyMetrics"> | string
    date?: DateTimeFilter<"FieldDailyMetrics"> | Date | string
    season?: IntFilter<"FieldDailyMetrics"> | number
    tmax?: FloatFilter<"FieldDailyMetrics"> | number
    tmin?: FloatFilter<"FieldDailyMetrics"> | number
    humidity?: FloatNullableFilter<"FieldDailyMetrics"> | number | null
    precipitation?: FloatNullableFilter<"FieldDailyMetrics"> | number | null
    gddDaily?: FloatFilter<"FieldDailyMetrics"> | number
    accumulatedGdd?: FloatFilter<"FieldDailyMetrics"> | number
    chillingHoursToday?: FloatFilter<"FieldDailyMetrics"> | number
    accumulatedChilling?: FloatFilter<"FieldDailyMetrics"> | number
    bioFixReached?: BoolFilter<"FieldDailyMetrics"> | boolean
    currentStage?: StringNullableFilter<"FieldDailyMetrics"> | string | null
    gddToNextStage?: FloatNullableFilter<"FieldDailyMetrics"> | number | null
    createdAt?: DateTimeFilter<"FieldDailyMetrics"> | Date | string
    field?: XOR<FieldScalarRelationFilter, FieldWhereInput>
  }, "id" | "fieldId_date">

  export type FieldDailyMetricsOrderByWithAggregationInput = {
    id?: SortOrder
    fieldId?: SortOrder
    date?: SortOrder
    season?: SortOrder
    tmax?: SortOrder
    tmin?: SortOrder
    humidity?: SortOrderInput | SortOrder
    precipitation?: SortOrderInput | SortOrder
    gddDaily?: SortOrder
    accumulatedGdd?: SortOrder
    chillingHoursToday?: SortOrder
    accumulatedChilling?: SortOrder
    bioFixReached?: SortOrder
    currentStage?: SortOrderInput | SortOrder
    gddToNextStage?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: FieldDailyMetricsCountOrderByAggregateInput
    _avg?: FieldDailyMetricsAvgOrderByAggregateInput
    _max?: FieldDailyMetricsMaxOrderByAggregateInput
    _min?: FieldDailyMetricsMinOrderByAggregateInput
    _sum?: FieldDailyMetricsSumOrderByAggregateInput
  }

  export type FieldDailyMetricsScalarWhereWithAggregatesInput = {
    AND?: FieldDailyMetricsScalarWhereWithAggregatesInput | FieldDailyMetricsScalarWhereWithAggregatesInput[]
    OR?: FieldDailyMetricsScalarWhereWithAggregatesInput[]
    NOT?: FieldDailyMetricsScalarWhereWithAggregatesInput | FieldDailyMetricsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"FieldDailyMetrics"> | string
    fieldId?: StringWithAggregatesFilter<"FieldDailyMetrics"> | string
    date?: DateTimeWithAggregatesFilter<"FieldDailyMetrics"> | Date | string
    season?: IntWithAggregatesFilter<"FieldDailyMetrics"> | number
    tmax?: FloatWithAggregatesFilter<"FieldDailyMetrics"> | number
    tmin?: FloatWithAggregatesFilter<"FieldDailyMetrics"> | number
    humidity?: FloatNullableWithAggregatesFilter<"FieldDailyMetrics"> | number | null
    precipitation?: FloatNullableWithAggregatesFilter<"FieldDailyMetrics"> | number | null
    gddDaily?: FloatWithAggregatesFilter<"FieldDailyMetrics"> | number
    accumulatedGdd?: FloatWithAggregatesFilter<"FieldDailyMetrics"> | number
    chillingHoursToday?: FloatWithAggregatesFilter<"FieldDailyMetrics"> | number
    accumulatedChilling?: FloatWithAggregatesFilter<"FieldDailyMetrics"> | number
    bioFixReached?: BoolWithAggregatesFilter<"FieldDailyMetrics"> | boolean
    currentStage?: StringNullableWithAggregatesFilter<"FieldDailyMetrics"> | string | null
    gddToNextStage?: FloatNullableWithAggregatesFilter<"FieldDailyMetrics"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"FieldDailyMetrics"> | Date | string
  }

  export type FieldSeasonSummaryWhereInput = {
    AND?: FieldSeasonSummaryWhereInput | FieldSeasonSummaryWhereInput[]
    OR?: FieldSeasonSummaryWhereInput[]
    NOT?: FieldSeasonSummaryWhereInput | FieldSeasonSummaryWhereInput[]
    id?: StringFilter<"FieldSeasonSummary"> | string
    fieldId?: StringFilter<"FieldSeasonSummary"> | string
    season?: IntFilter<"FieldSeasonSummary"> | number
    currentStage?: StringNullableFilter<"FieldSeasonSummary"> | string | null
    accumulatedGdd?: FloatFilter<"FieldSeasonSummary"> | number
    accumulatedChilling?: FloatFilter<"FieldSeasonSummary"> | number
    bioFixReached?: BoolFilter<"FieldSeasonSummary"> | boolean
    bioFixDate?: DateTimeNullableFilter<"FieldSeasonSummary"> | Date | string | null
    gddToNextStage?: FloatNullableFilter<"FieldSeasonSummary"> | number | null
    daysInCurrentStage?: IntFilter<"FieldSeasonSummary"> | number
    lastUpdated?: DateTimeFilter<"FieldSeasonSummary"> | Date | string
    predictedFloweringDate?: DateTimeNullableFilter<"FieldSeasonSummary"> | Date | string | null
    predictedHarvestDate?: DateTimeNullableFilter<"FieldSeasonSummary"> | Date | string | null
    totalPrecipitation?: FloatFilter<"FieldSeasonSummary"> | number
    avgTemperature?: FloatNullableFilter<"FieldSeasonSummary"> | number | null
    createdAt?: DateTimeFilter<"FieldSeasonSummary"> | Date | string
    updatedAt?: DateTimeFilter<"FieldSeasonSummary"> | Date | string
    field?: XOR<FieldScalarRelationFilter, FieldWhereInput>
  }

  export type FieldSeasonSummaryOrderByWithRelationInput = {
    id?: SortOrder
    fieldId?: SortOrder
    season?: SortOrder
    currentStage?: SortOrderInput | SortOrder
    accumulatedGdd?: SortOrder
    accumulatedChilling?: SortOrder
    bioFixReached?: SortOrder
    bioFixDate?: SortOrderInput | SortOrder
    gddToNextStage?: SortOrderInput | SortOrder
    daysInCurrentStage?: SortOrder
    lastUpdated?: SortOrder
    predictedFloweringDate?: SortOrderInput | SortOrder
    predictedHarvestDate?: SortOrderInput | SortOrder
    totalPrecipitation?: SortOrder
    avgTemperature?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    field?: FieldOrderByWithRelationInput
  }

  export type FieldSeasonSummaryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    fieldId_season?: FieldSeasonSummaryFieldIdSeasonCompoundUniqueInput
    AND?: FieldSeasonSummaryWhereInput | FieldSeasonSummaryWhereInput[]
    OR?: FieldSeasonSummaryWhereInput[]
    NOT?: FieldSeasonSummaryWhereInput | FieldSeasonSummaryWhereInput[]
    fieldId?: StringFilter<"FieldSeasonSummary"> | string
    season?: IntFilter<"FieldSeasonSummary"> | number
    currentStage?: StringNullableFilter<"FieldSeasonSummary"> | string | null
    accumulatedGdd?: FloatFilter<"FieldSeasonSummary"> | number
    accumulatedChilling?: FloatFilter<"FieldSeasonSummary"> | number
    bioFixReached?: BoolFilter<"FieldSeasonSummary"> | boolean
    bioFixDate?: DateTimeNullableFilter<"FieldSeasonSummary"> | Date | string | null
    gddToNextStage?: FloatNullableFilter<"FieldSeasonSummary"> | number | null
    daysInCurrentStage?: IntFilter<"FieldSeasonSummary"> | number
    lastUpdated?: DateTimeFilter<"FieldSeasonSummary"> | Date | string
    predictedFloweringDate?: DateTimeNullableFilter<"FieldSeasonSummary"> | Date | string | null
    predictedHarvestDate?: DateTimeNullableFilter<"FieldSeasonSummary"> | Date | string | null
    totalPrecipitation?: FloatFilter<"FieldSeasonSummary"> | number
    avgTemperature?: FloatNullableFilter<"FieldSeasonSummary"> | number | null
    createdAt?: DateTimeFilter<"FieldSeasonSummary"> | Date | string
    updatedAt?: DateTimeFilter<"FieldSeasonSummary"> | Date | string
    field?: XOR<FieldScalarRelationFilter, FieldWhereInput>
  }, "id" | "fieldId_season">

  export type FieldSeasonSummaryOrderByWithAggregationInput = {
    id?: SortOrder
    fieldId?: SortOrder
    season?: SortOrder
    currentStage?: SortOrderInput | SortOrder
    accumulatedGdd?: SortOrder
    accumulatedChilling?: SortOrder
    bioFixReached?: SortOrder
    bioFixDate?: SortOrderInput | SortOrder
    gddToNextStage?: SortOrderInput | SortOrder
    daysInCurrentStage?: SortOrder
    lastUpdated?: SortOrder
    predictedFloweringDate?: SortOrderInput | SortOrder
    predictedHarvestDate?: SortOrderInput | SortOrder
    totalPrecipitation?: SortOrder
    avgTemperature?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: FieldSeasonSummaryCountOrderByAggregateInput
    _avg?: FieldSeasonSummaryAvgOrderByAggregateInput
    _max?: FieldSeasonSummaryMaxOrderByAggregateInput
    _min?: FieldSeasonSummaryMinOrderByAggregateInput
    _sum?: FieldSeasonSummarySumOrderByAggregateInput
  }

  export type FieldSeasonSummaryScalarWhereWithAggregatesInput = {
    AND?: FieldSeasonSummaryScalarWhereWithAggregatesInput | FieldSeasonSummaryScalarWhereWithAggregatesInput[]
    OR?: FieldSeasonSummaryScalarWhereWithAggregatesInput[]
    NOT?: FieldSeasonSummaryScalarWhereWithAggregatesInput | FieldSeasonSummaryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"FieldSeasonSummary"> | string
    fieldId?: StringWithAggregatesFilter<"FieldSeasonSummary"> | string
    season?: IntWithAggregatesFilter<"FieldSeasonSummary"> | number
    currentStage?: StringNullableWithAggregatesFilter<"FieldSeasonSummary"> | string | null
    accumulatedGdd?: FloatWithAggregatesFilter<"FieldSeasonSummary"> | number
    accumulatedChilling?: FloatWithAggregatesFilter<"FieldSeasonSummary"> | number
    bioFixReached?: BoolWithAggregatesFilter<"FieldSeasonSummary"> | boolean
    bioFixDate?: DateTimeNullableWithAggregatesFilter<"FieldSeasonSummary"> | Date | string | null
    gddToNextStage?: FloatNullableWithAggregatesFilter<"FieldSeasonSummary"> | number | null
    daysInCurrentStage?: IntWithAggregatesFilter<"FieldSeasonSummary"> | number
    lastUpdated?: DateTimeWithAggregatesFilter<"FieldSeasonSummary"> | Date | string
    predictedFloweringDate?: DateTimeNullableWithAggregatesFilter<"FieldSeasonSummary"> | Date | string | null
    predictedHarvestDate?: DateTimeNullableWithAggregatesFilter<"FieldSeasonSummary"> | Date | string | null
    totalPrecipitation?: FloatWithAggregatesFilter<"FieldSeasonSummary"> | number
    avgTemperature?: FloatNullableWithAggregatesFilter<"FieldSeasonSummary"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"FieldSeasonSummary"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"FieldSeasonSummary"> | Date | string
  }

  export type IrrigationConfigWhereInput = {
    AND?: IrrigationConfigWhereInput | IrrigationConfigWhereInput[]
    OR?: IrrigationConfigWhereInput[]
    NOT?: IrrigationConfigWhereInput | IrrigationConfigWhereInput[]
    id?: StringFilter<"IrrigationConfig"> | string
    fieldId?: StringFilter<"IrrigationConfig"> | string
    dripperFlowRate?: FloatFilter<"IrrigationConfig"> | number
    drippersPerTree?: IntFilter<"IrrigationConfig"> | number
    treeDensity?: IntFilter<"IrrigationConfig"> | number
    efficiency?: FloatFilter<"IrrigationConfig"> | number
    createdAt?: DateTimeFilter<"IrrigationConfig"> | Date | string
    updatedAt?: DateTimeFilter<"IrrigationConfig"> | Date | string
    field?: XOR<FieldScalarRelationFilter, FieldWhereInput>
  }

  export type IrrigationConfigOrderByWithRelationInput = {
    id?: SortOrder
    fieldId?: SortOrder
    dripperFlowRate?: SortOrder
    drippersPerTree?: SortOrder
    treeDensity?: SortOrder
    efficiency?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    field?: FieldOrderByWithRelationInput
  }

  export type IrrigationConfigWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    fieldId?: string
    AND?: IrrigationConfigWhereInput | IrrigationConfigWhereInput[]
    OR?: IrrigationConfigWhereInput[]
    NOT?: IrrigationConfigWhereInput | IrrigationConfigWhereInput[]
    dripperFlowRate?: FloatFilter<"IrrigationConfig"> | number
    drippersPerTree?: IntFilter<"IrrigationConfig"> | number
    treeDensity?: IntFilter<"IrrigationConfig"> | number
    efficiency?: FloatFilter<"IrrigationConfig"> | number
    createdAt?: DateTimeFilter<"IrrigationConfig"> | Date | string
    updatedAt?: DateTimeFilter<"IrrigationConfig"> | Date | string
    field?: XOR<FieldScalarRelationFilter, FieldWhereInput>
  }, "id" | "fieldId">

  export type IrrigationConfigOrderByWithAggregationInput = {
    id?: SortOrder
    fieldId?: SortOrder
    dripperFlowRate?: SortOrder
    drippersPerTree?: SortOrder
    treeDensity?: SortOrder
    efficiency?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: IrrigationConfigCountOrderByAggregateInput
    _avg?: IrrigationConfigAvgOrderByAggregateInput
    _max?: IrrigationConfigMaxOrderByAggregateInput
    _min?: IrrigationConfigMinOrderByAggregateInput
    _sum?: IrrigationConfigSumOrderByAggregateInput
  }

  export type IrrigationConfigScalarWhereWithAggregatesInput = {
    AND?: IrrigationConfigScalarWhereWithAggregatesInput | IrrigationConfigScalarWhereWithAggregatesInput[]
    OR?: IrrigationConfigScalarWhereWithAggregatesInput[]
    NOT?: IrrigationConfigScalarWhereWithAggregatesInput | IrrigationConfigScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"IrrigationConfig"> | string
    fieldId?: StringWithAggregatesFilter<"IrrigationConfig"> | string
    dripperFlowRate?: FloatWithAggregatesFilter<"IrrigationConfig"> | number
    drippersPerTree?: IntWithAggregatesFilter<"IrrigationConfig"> | number
    treeDensity?: IntWithAggregatesFilter<"IrrigationConfig"> | number
    efficiency?: FloatWithAggregatesFilter<"IrrigationConfig"> | number
    createdAt?: DateTimeWithAggregatesFilter<"IrrigationConfig"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"IrrigationConfig"> | Date | string
  }

  export type SoilAnalysisWhereInput = {
    AND?: SoilAnalysisWhereInput | SoilAnalysisWhereInput[]
    OR?: SoilAnalysisWhereInput[]
    NOT?: SoilAnalysisWhereInput | SoilAnalysisWhereInput[]
    id?: StringFilter<"SoilAnalysis"> | string
    fieldId?: StringFilter<"SoilAnalysis"> | string
    analysisDate?: DateTimeFilter<"SoilAnalysis"> | Date | string
    ph?: FloatNullableFilter<"SoilAnalysis"> | number | null
    organicMatter?: FloatNullableFilter<"SoilAnalysis"> | number | null
    nitrogen?: FloatNullableFilter<"SoilAnalysis"> | number | null
    phosphorus?: FloatNullableFilter<"SoilAnalysis"> | number | null
    potassium?: FloatNullableFilter<"SoilAnalysis"> | number | null
    createdAt?: DateTimeFilter<"SoilAnalysis"> | Date | string
    updatedAt?: DateTimeFilter<"SoilAnalysis"> | Date | string
    field?: XOR<FieldScalarRelationFilter, FieldWhereInput>
  }

  export type SoilAnalysisOrderByWithRelationInput = {
    id?: SortOrder
    fieldId?: SortOrder
    analysisDate?: SortOrder
    ph?: SortOrderInput | SortOrder
    organicMatter?: SortOrderInput | SortOrder
    nitrogen?: SortOrderInput | SortOrder
    phosphorus?: SortOrderInput | SortOrder
    potassium?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    field?: FieldOrderByWithRelationInput
  }

  export type SoilAnalysisWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SoilAnalysisWhereInput | SoilAnalysisWhereInput[]
    OR?: SoilAnalysisWhereInput[]
    NOT?: SoilAnalysisWhereInput | SoilAnalysisWhereInput[]
    fieldId?: StringFilter<"SoilAnalysis"> | string
    analysisDate?: DateTimeFilter<"SoilAnalysis"> | Date | string
    ph?: FloatNullableFilter<"SoilAnalysis"> | number | null
    organicMatter?: FloatNullableFilter<"SoilAnalysis"> | number | null
    nitrogen?: FloatNullableFilter<"SoilAnalysis"> | number | null
    phosphorus?: FloatNullableFilter<"SoilAnalysis"> | number | null
    potassium?: FloatNullableFilter<"SoilAnalysis"> | number | null
    createdAt?: DateTimeFilter<"SoilAnalysis"> | Date | string
    updatedAt?: DateTimeFilter<"SoilAnalysis"> | Date | string
    field?: XOR<FieldScalarRelationFilter, FieldWhereInput>
  }, "id">

  export type SoilAnalysisOrderByWithAggregationInput = {
    id?: SortOrder
    fieldId?: SortOrder
    analysisDate?: SortOrder
    ph?: SortOrderInput | SortOrder
    organicMatter?: SortOrderInput | SortOrder
    nitrogen?: SortOrderInput | SortOrder
    phosphorus?: SortOrderInput | SortOrder
    potassium?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SoilAnalysisCountOrderByAggregateInput
    _avg?: SoilAnalysisAvgOrderByAggregateInput
    _max?: SoilAnalysisMaxOrderByAggregateInput
    _min?: SoilAnalysisMinOrderByAggregateInput
    _sum?: SoilAnalysisSumOrderByAggregateInput
  }

  export type SoilAnalysisScalarWhereWithAggregatesInput = {
    AND?: SoilAnalysisScalarWhereWithAggregatesInput | SoilAnalysisScalarWhereWithAggregatesInput[]
    OR?: SoilAnalysisScalarWhereWithAggregatesInput[]
    NOT?: SoilAnalysisScalarWhereWithAggregatesInput | SoilAnalysisScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SoilAnalysis"> | string
    fieldId?: StringWithAggregatesFilter<"SoilAnalysis"> | string
    analysisDate?: DateTimeWithAggregatesFilter<"SoilAnalysis"> | Date | string
    ph?: FloatNullableWithAggregatesFilter<"SoilAnalysis"> | number | null
    organicMatter?: FloatNullableWithAggregatesFilter<"SoilAnalysis"> | number | null
    nitrogen?: FloatNullableWithAggregatesFilter<"SoilAnalysis"> | number | null
    phosphorus?: FloatNullableWithAggregatesFilter<"SoilAnalysis"> | number | null
    potassium?: FloatNullableWithAggregatesFilter<"SoilAnalysis"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"SoilAnalysis"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"SoilAnalysis"> | Date | string
  }

  export type YieldConfigWhereInput = {
    AND?: YieldConfigWhereInput | YieldConfigWhereInput[]
    OR?: YieldConfigWhereInput[]
    NOT?: YieldConfigWhereInput | YieldConfigWhereInput[]
    id?: StringFilter<"YieldConfig"> | string
    fieldId?: StringFilter<"YieldConfig"> | string
    targetYield?: FloatFilter<"YieldConfig"> | number
    bearingStatus?: StringFilter<"YieldConfig"> | string
    createdAt?: DateTimeFilter<"YieldConfig"> | Date | string
    updatedAt?: DateTimeFilter<"YieldConfig"> | Date | string
    field?: XOR<FieldScalarRelationFilter, FieldWhereInput>
  }

  export type YieldConfigOrderByWithRelationInput = {
    id?: SortOrder
    fieldId?: SortOrder
    targetYield?: SortOrder
    bearingStatus?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    field?: FieldOrderByWithRelationInput
  }

  export type YieldConfigWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    fieldId?: string
    AND?: YieldConfigWhereInput | YieldConfigWhereInput[]
    OR?: YieldConfigWhereInput[]
    NOT?: YieldConfigWhereInput | YieldConfigWhereInput[]
    targetYield?: FloatFilter<"YieldConfig"> | number
    bearingStatus?: StringFilter<"YieldConfig"> | string
    createdAt?: DateTimeFilter<"YieldConfig"> | Date | string
    updatedAt?: DateTimeFilter<"YieldConfig"> | Date | string
    field?: XOR<FieldScalarRelationFilter, FieldWhereInput>
  }, "id" | "fieldId">

  export type YieldConfigOrderByWithAggregationInput = {
    id?: SortOrder
    fieldId?: SortOrder
    targetYield?: SortOrder
    bearingStatus?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: YieldConfigCountOrderByAggregateInput
    _avg?: YieldConfigAvgOrderByAggregateInput
    _max?: YieldConfigMaxOrderByAggregateInput
    _min?: YieldConfigMinOrderByAggregateInput
    _sum?: YieldConfigSumOrderByAggregateInput
  }

  export type YieldConfigScalarWhereWithAggregatesInput = {
    AND?: YieldConfigScalarWhereWithAggregatesInput | YieldConfigScalarWhereWithAggregatesInput[]
    OR?: YieldConfigScalarWhereWithAggregatesInput[]
    NOT?: YieldConfigScalarWhereWithAggregatesInput | YieldConfigScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"YieldConfig"> | string
    fieldId?: StringWithAggregatesFilter<"YieldConfig"> | string
    targetYield?: FloatWithAggregatesFilter<"YieldConfig"> | number
    bearingStatus?: StringWithAggregatesFilter<"YieldConfig"> | string
    createdAt?: DateTimeWithAggregatesFilter<"YieldConfig"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"YieldConfig"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    fullName: string
    email: string
    password: string
    phoneNumber?: string | null
    role?: string
    createdAt?: Date | string
    farms?: FarmCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    fullName: string
    email: string
    password: string
    phoneNumber?: string | null
    role?: string
    createdAt?: Date | string
    farms?: FarmUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    farms?: FarmUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    farms?: FarmUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    fullName: string
    email: string
    password: string
    phoneNumber?: string | null
    role?: string
    createdAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FarmCreateInput = {
    id?: string
    name: string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutFarmsInput
    fields?: FieldCreateNestedManyWithoutFarmInput
  }

  export type FarmUncheckedCreateInput = {
    id?: string
    name: string
    userId: string
    createdAt?: Date | string
    fields?: FieldUncheckedCreateNestedManyWithoutFarmInput
  }

  export type FarmUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutFarmsNestedInput
    fields?: FieldUpdateManyWithoutFarmNestedInput
  }

  export type FarmUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fields?: FieldUncheckedUpdateManyWithoutFarmNestedInput
  }

  export type FarmCreateManyInput = {
    id?: string
    name: string
    userId: string
    createdAt?: Date | string
  }

  export type FarmUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FarmUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FieldCreateInput = {
    id?: string
    name: string
    geoPolygon: JsonNullValueInput | InputJsonValue
    area: number
    cropType?: string
    equipmentConfig?: NullableJsonNullValueInput | InputJsonValue
    soilMetadata?: NullableJsonNullValueInput | InputJsonValue
    plantingDate?: Date | string | null
    agronomicData?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    farm: FarmCreateNestedOneWithoutFieldsInput
    operations?: OperationCreateNestedManyWithoutFieldInput
    dailyMetrics?: FieldDailyMetricsCreateNestedManyWithoutFieldInput
    seasonSummary?: FieldSeasonSummaryCreateNestedManyWithoutFieldInput
    irrigationConfig?: IrrigationConfigCreateNestedOneWithoutFieldInput
    soilAnalysis?: SoilAnalysisCreateNestedManyWithoutFieldInput
    yieldConfig?: YieldConfigCreateNestedOneWithoutFieldInput
  }

  export type FieldUncheckedCreateInput = {
    id?: string
    name: string
    farmId: string
    geoPolygon: JsonNullValueInput | InputJsonValue
    area: number
    cropType?: string
    equipmentConfig?: NullableJsonNullValueInput | InputJsonValue
    soilMetadata?: NullableJsonNullValueInput | InputJsonValue
    plantingDate?: Date | string | null
    agronomicData?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    operations?: OperationUncheckedCreateNestedManyWithoutFieldInput
    dailyMetrics?: FieldDailyMetricsUncheckedCreateNestedManyWithoutFieldInput
    seasonSummary?: FieldSeasonSummaryUncheckedCreateNestedManyWithoutFieldInput
    irrigationConfig?: IrrigationConfigUncheckedCreateNestedOneWithoutFieldInput
    soilAnalysis?: SoilAnalysisUncheckedCreateNestedManyWithoutFieldInput
    yieldConfig?: YieldConfigUncheckedCreateNestedOneWithoutFieldInput
  }

  export type FieldUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    geoPolygon?: JsonNullValueInput | InputJsonValue
    area?: FloatFieldUpdateOperationsInput | number
    cropType?: StringFieldUpdateOperationsInput | string
    equipmentConfig?: NullableJsonNullValueInput | InputJsonValue
    soilMetadata?: NullableJsonNullValueInput | InputJsonValue
    plantingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    agronomicData?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    farm?: FarmUpdateOneRequiredWithoutFieldsNestedInput
    operations?: OperationUpdateManyWithoutFieldNestedInput
    dailyMetrics?: FieldDailyMetricsUpdateManyWithoutFieldNestedInput
    seasonSummary?: FieldSeasonSummaryUpdateManyWithoutFieldNestedInput
    irrigationConfig?: IrrigationConfigUpdateOneWithoutFieldNestedInput
    soilAnalysis?: SoilAnalysisUpdateManyWithoutFieldNestedInput
    yieldConfig?: YieldConfigUpdateOneWithoutFieldNestedInput
  }

  export type FieldUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    farmId?: StringFieldUpdateOperationsInput | string
    geoPolygon?: JsonNullValueInput | InputJsonValue
    area?: FloatFieldUpdateOperationsInput | number
    cropType?: StringFieldUpdateOperationsInput | string
    equipmentConfig?: NullableJsonNullValueInput | InputJsonValue
    soilMetadata?: NullableJsonNullValueInput | InputJsonValue
    plantingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    agronomicData?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    operations?: OperationUncheckedUpdateManyWithoutFieldNestedInput
    dailyMetrics?: FieldDailyMetricsUncheckedUpdateManyWithoutFieldNestedInput
    seasonSummary?: FieldSeasonSummaryUncheckedUpdateManyWithoutFieldNestedInput
    irrigationConfig?: IrrigationConfigUncheckedUpdateOneWithoutFieldNestedInput
    soilAnalysis?: SoilAnalysisUncheckedUpdateManyWithoutFieldNestedInput
    yieldConfig?: YieldConfigUncheckedUpdateOneWithoutFieldNestedInput
  }

  export type FieldCreateManyInput = {
    id?: string
    name: string
    farmId: string
    geoPolygon: JsonNullValueInput | InputJsonValue
    area: number
    cropType?: string
    equipmentConfig?: NullableJsonNullValueInput | InputJsonValue
    soilMetadata?: NullableJsonNullValueInput | InputJsonValue
    plantingDate?: Date | string | null
    agronomicData?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type FieldUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    geoPolygon?: JsonNullValueInput | InputJsonValue
    area?: FloatFieldUpdateOperationsInput | number
    cropType?: StringFieldUpdateOperationsInput | string
    equipmentConfig?: NullableJsonNullValueInput | InputJsonValue
    soilMetadata?: NullableJsonNullValueInput | InputJsonValue
    plantingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    agronomicData?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FieldUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    farmId?: StringFieldUpdateOperationsInput | string
    geoPolygon?: JsonNullValueInput | InputJsonValue
    area?: FloatFieldUpdateOperationsInput | number
    cropType?: StringFieldUpdateOperationsInput | string
    equipmentConfig?: NullableJsonNullValueInput | InputJsonValue
    soilMetadata?: NullableJsonNullValueInput | InputJsonValue
    plantingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    agronomicData?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OperationCreateInput = {
    id?: string
    type: string
    date?: Date | string
    metadata: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    field: FieldCreateNestedOneWithoutOperationsInput
  }

  export type OperationUncheckedCreateInput = {
    id?: string
    type: string
    date?: Date | string
    metadata: JsonNullValueInput | InputJsonValue
    fieldId: string
    createdAt?: Date | string
  }

  export type OperationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    field?: FieldUpdateOneRequiredWithoutOperationsNestedInput
  }

  export type OperationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    metadata?: JsonNullValueInput | InputJsonValue
    fieldId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OperationCreateManyInput = {
    id?: string
    type: string
    date?: Date | string
    metadata: JsonNullValueInput | InputJsonValue
    fieldId: string
    createdAt?: Date | string
  }

  export type OperationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OperationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    metadata?: JsonNullValueInput | InputJsonValue
    fieldId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FieldDailyMetricsCreateInput = {
    id?: string
    date: Date | string
    season: number
    tmax: number
    tmin: number
    humidity?: number | null
    precipitation?: number | null
    gddDaily: number
    accumulatedGdd?: number
    chillingHoursToday?: number
    accumulatedChilling?: number
    bioFixReached?: boolean
    currentStage?: string | null
    gddToNextStage?: number | null
    createdAt?: Date | string
    field: FieldCreateNestedOneWithoutDailyMetricsInput
  }

  export type FieldDailyMetricsUncheckedCreateInput = {
    id?: string
    fieldId: string
    date: Date | string
    season: number
    tmax: number
    tmin: number
    humidity?: number | null
    precipitation?: number | null
    gddDaily: number
    accumulatedGdd?: number
    chillingHoursToday?: number
    accumulatedChilling?: number
    bioFixReached?: boolean
    currentStage?: string | null
    gddToNextStage?: number | null
    createdAt?: Date | string
  }

  export type FieldDailyMetricsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    season?: IntFieldUpdateOperationsInput | number
    tmax?: FloatFieldUpdateOperationsInput | number
    tmin?: FloatFieldUpdateOperationsInput | number
    humidity?: NullableFloatFieldUpdateOperationsInput | number | null
    precipitation?: NullableFloatFieldUpdateOperationsInput | number | null
    gddDaily?: FloatFieldUpdateOperationsInput | number
    accumulatedGdd?: FloatFieldUpdateOperationsInput | number
    chillingHoursToday?: FloatFieldUpdateOperationsInput | number
    accumulatedChilling?: FloatFieldUpdateOperationsInput | number
    bioFixReached?: BoolFieldUpdateOperationsInput | boolean
    currentStage?: NullableStringFieldUpdateOperationsInput | string | null
    gddToNextStage?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    field?: FieldUpdateOneRequiredWithoutDailyMetricsNestedInput
  }

  export type FieldDailyMetricsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fieldId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    season?: IntFieldUpdateOperationsInput | number
    tmax?: FloatFieldUpdateOperationsInput | number
    tmin?: FloatFieldUpdateOperationsInput | number
    humidity?: NullableFloatFieldUpdateOperationsInput | number | null
    precipitation?: NullableFloatFieldUpdateOperationsInput | number | null
    gddDaily?: FloatFieldUpdateOperationsInput | number
    accumulatedGdd?: FloatFieldUpdateOperationsInput | number
    chillingHoursToday?: FloatFieldUpdateOperationsInput | number
    accumulatedChilling?: FloatFieldUpdateOperationsInput | number
    bioFixReached?: BoolFieldUpdateOperationsInput | boolean
    currentStage?: NullableStringFieldUpdateOperationsInput | string | null
    gddToNextStage?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FieldDailyMetricsCreateManyInput = {
    id?: string
    fieldId: string
    date: Date | string
    season: number
    tmax: number
    tmin: number
    humidity?: number | null
    precipitation?: number | null
    gddDaily: number
    accumulatedGdd?: number
    chillingHoursToday?: number
    accumulatedChilling?: number
    bioFixReached?: boolean
    currentStage?: string | null
    gddToNextStage?: number | null
    createdAt?: Date | string
  }

  export type FieldDailyMetricsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    season?: IntFieldUpdateOperationsInput | number
    tmax?: FloatFieldUpdateOperationsInput | number
    tmin?: FloatFieldUpdateOperationsInput | number
    humidity?: NullableFloatFieldUpdateOperationsInput | number | null
    precipitation?: NullableFloatFieldUpdateOperationsInput | number | null
    gddDaily?: FloatFieldUpdateOperationsInput | number
    accumulatedGdd?: FloatFieldUpdateOperationsInput | number
    chillingHoursToday?: FloatFieldUpdateOperationsInput | number
    accumulatedChilling?: FloatFieldUpdateOperationsInput | number
    bioFixReached?: BoolFieldUpdateOperationsInput | boolean
    currentStage?: NullableStringFieldUpdateOperationsInput | string | null
    gddToNextStage?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FieldDailyMetricsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    fieldId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    season?: IntFieldUpdateOperationsInput | number
    tmax?: FloatFieldUpdateOperationsInput | number
    tmin?: FloatFieldUpdateOperationsInput | number
    humidity?: NullableFloatFieldUpdateOperationsInput | number | null
    precipitation?: NullableFloatFieldUpdateOperationsInput | number | null
    gddDaily?: FloatFieldUpdateOperationsInput | number
    accumulatedGdd?: FloatFieldUpdateOperationsInput | number
    chillingHoursToday?: FloatFieldUpdateOperationsInput | number
    accumulatedChilling?: FloatFieldUpdateOperationsInput | number
    bioFixReached?: BoolFieldUpdateOperationsInput | boolean
    currentStage?: NullableStringFieldUpdateOperationsInput | string | null
    gddToNextStage?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FieldSeasonSummaryCreateInput = {
    id?: string
    season: number
    currentStage?: string | null
    accumulatedGdd?: number
    accumulatedChilling?: number
    bioFixReached?: boolean
    bioFixDate?: Date | string | null
    gddToNextStage?: number | null
    daysInCurrentStage?: number
    lastUpdated?: Date | string
    predictedFloweringDate?: Date | string | null
    predictedHarvestDate?: Date | string | null
    totalPrecipitation?: number
    avgTemperature?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    field: FieldCreateNestedOneWithoutSeasonSummaryInput
  }

  export type FieldSeasonSummaryUncheckedCreateInput = {
    id?: string
    fieldId: string
    season: number
    currentStage?: string | null
    accumulatedGdd?: number
    accumulatedChilling?: number
    bioFixReached?: boolean
    bioFixDate?: Date | string | null
    gddToNextStage?: number | null
    daysInCurrentStage?: number
    lastUpdated?: Date | string
    predictedFloweringDate?: Date | string | null
    predictedHarvestDate?: Date | string | null
    totalPrecipitation?: number
    avgTemperature?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FieldSeasonSummaryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    season?: IntFieldUpdateOperationsInput | number
    currentStage?: NullableStringFieldUpdateOperationsInput | string | null
    accumulatedGdd?: FloatFieldUpdateOperationsInput | number
    accumulatedChilling?: FloatFieldUpdateOperationsInput | number
    bioFixReached?: BoolFieldUpdateOperationsInput | boolean
    bioFixDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gddToNextStage?: NullableFloatFieldUpdateOperationsInput | number | null
    daysInCurrentStage?: IntFieldUpdateOperationsInput | number
    lastUpdated?: DateTimeFieldUpdateOperationsInput | Date | string
    predictedFloweringDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    predictedHarvestDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    totalPrecipitation?: FloatFieldUpdateOperationsInput | number
    avgTemperature?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    field?: FieldUpdateOneRequiredWithoutSeasonSummaryNestedInput
  }

  export type FieldSeasonSummaryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fieldId?: StringFieldUpdateOperationsInput | string
    season?: IntFieldUpdateOperationsInput | number
    currentStage?: NullableStringFieldUpdateOperationsInput | string | null
    accumulatedGdd?: FloatFieldUpdateOperationsInput | number
    accumulatedChilling?: FloatFieldUpdateOperationsInput | number
    bioFixReached?: BoolFieldUpdateOperationsInput | boolean
    bioFixDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gddToNextStage?: NullableFloatFieldUpdateOperationsInput | number | null
    daysInCurrentStage?: IntFieldUpdateOperationsInput | number
    lastUpdated?: DateTimeFieldUpdateOperationsInput | Date | string
    predictedFloweringDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    predictedHarvestDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    totalPrecipitation?: FloatFieldUpdateOperationsInput | number
    avgTemperature?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FieldSeasonSummaryCreateManyInput = {
    id?: string
    fieldId: string
    season: number
    currentStage?: string | null
    accumulatedGdd?: number
    accumulatedChilling?: number
    bioFixReached?: boolean
    bioFixDate?: Date | string | null
    gddToNextStage?: number | null
    daysInCurrentStage?: number
    lastUpdated?: Date | string
    predictedFloweringDate?: Date | string | null
    predictedHarvestDate?: Date | string | null
    totalPrecipitation?: number
    avgTemperature?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FieldSeasonSummaryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    season?: IntFieldUpdateOperationsInput | number
    currentStage?: NullableStringFieldUpdateOperationsInput | string | null
    accumulatedGdd?: FloatFieldUpdateOperationsInput | number
    accumulatedChilling?: FloatFieldUpdateOperationsInput | number
    bioFixReached?: BoolFieldUpdateOperationsInput | boolean
    bioFixDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gddToNextStage?: NullableFloatFieldUpdateOperationsInput | number | null
    daysInCurrentStage?: IntFieldUpdateOperationsInput | number
    lastUpdated?: DateTimeFieldUpdateOperationsInput | Date | string
    predictedFloweringDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    predictedHarvestDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    totalPrecipitation?: FloatFieldUpdateOperationsInput | number
    avgTemperature?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FieldSeasonSummaryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    fieldId?: StringFieldUpdateOperationsInput | string
    season?: IntFieldUpdateOperationsInput | number
    currentStage?: NullableStringFieldUpdateOperationsInput | string | null
    accumulatedGdd?: FloatFieldUpdateOperationsInput | number
    accumulatedChilling?: FloatFieldUpdateOperationsInput | number
    bioFixReached?: BoolFieldUpdateOperationsInput | boolean
    bioFixDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gddToNextStage?: NullableFloatFieldUpdateOperationsInput | number | null
    daysInCurrentStage?: IntFieldUpdateOperationsInput | number
    lastUpdated?: DateTimeFieldUpdateOperationsInput | Date | string
    predictedFloweringDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    predictedHarvestDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    totalPrecipitation?: FloatFieldUpdateOperationsInput | number
    avgTemperature?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IrrigationConfigCreateInput = {
    id?: string
    dripperFlowRate: number
    drippersPerTree: number
    treeDensity: number
    efficiency?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    field: FieldCreateNestedOneWithoutIrrigationConfigInput
  }

  export type IrrigationConfigUncheckedCreateInput = {
    id?: string
    fieldId: string
    dripperFlowRate: number
    drippersPerTree: number
    treeDensity: number
    efficiency?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type IrrigationConfigUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    dripperFlowRate?: FloatFieldUpdateOperationsInput | number
    drippersPerTree?: IntFieldUpdateOperationsInput | number
    treeDensity?: IntFieldUpdateOperationsInput | number
    efficiency?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    field?: FieldUpdateOneRequiredWithoutIrrigationConfigNestedInput
  }

  export type IrrigationConfigUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fieldId?: StringFieldUpdateOperationsInput | string
    dripperFlowRate?: FloatFieldUpdateOperationsInput | number
    drippersPerTree?: IntFieldUpdateOperationsInput | number
    treeDensity?: IntFieldUpdateOperationsInput | number
    efficiency?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IrrigationConfigCreateManyInput = {
    id?: string
    fieldId: string
    dripperFlowRate: number
    drippersPerTree: number
    treeDensity: number
    efficiency?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type IrrigationConfigUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    dripperFlowRate?: FloatFieldUpdateOperationsInput | number
    drippersPerTree?: IntFieldUpdateOperationsInput | number
    treeDensity?: IntFieldUpdateOperationsInput | number
    efficiency?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IrrigationConfigUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    fieldId?: StringFieldUpdateOperationsInput | string
    dripperFlowRate?: FloatFieldUpdateOperationsInput | number
    drippersPerTree?: IntFieldUpdateOperationsInput | number
    treeDensity?: IntFieldUpdateOperationsInput | number
    efficiency?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SoilAnalysisCreateInput = {
    id?: string
    analysisDate: Date | string
    ph?: number | null
    organicMatter?: number | null
    nitrogen?: number | null
    phosphorus?: number | null
    potassium?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    field: FieldCreateNestedOneWithoutSoilAnalysisInput
  }

  export type SoilAnalysisUncheckedCreateInput = {
    id?: string
    fieldId: string
    analysisDate: Date | string
    ph?: number | null
    organicMatter?: number | null
    nitrogen?: number | null
    phosphorus?: number | null
    potassium?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SoilAnalysisUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    analysisDate?: DateTimeFieldUpdateOperationsInput | Date | string
    ph?: NullableFloatFieldUpdateOperationsInput | number | null
    organicMatter?: NullableFloatFieldUpdateOperationsInput | number | null
    nitrogen?: NullableFloatFieldUpdateOperationsInput | number | null
    phosphorus?: NullableFloatFieldUpdateOperationsInput | number | null
    potassium?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    field?: FieldUpdateOneRequiredWithoutSoilAnalysisNestedInput
  }

  export type SoilAnalysisUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fieldId?: StringFieldUpdateOperationsInput | string
    analysisDate?: DateTimeFieldUpdateOperationsInput | Date | string
    ph?: NullableFloatFieldUpdateOperationsInput | number | null
    organicMatter?: NullableFloatFieldUpdateOperationsInput | number | null
    nitrogen?: NullableFloatFieldUpdateOperationsInput | number | null
    phosphorus?: NullableFloatFieldUpdateOperationsInput | number | null
    potassium?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SoilAnalysisCreateManyInput = {
    id?: string
    fieldId: string
    analysisDate: Date | string
    ph?: number | null
    organicMatter?: number | null
    nitrogen?: number | null
    phosphorus?: number | null
    potassium?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SoilAnalysisUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    analysisDate?: DateTimeFieldUpdateOperationsInput | Date | string
    ph?: NullableFloatFieldUpdateOperationsInput | number | null
    organicMatter?: NullableFloatFieldUpdateOperationsInput | number | null
    nitrogen?: NullableFloatFieldUpdateOperationsInput | number | null
    phosphorus?: NullableFloatFieldUpdateOperationsInput | number | null
    potassium?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SoilAnalysisUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    fieldId?: StringFieldUpdateOperationsInput | string
    analysisDate?: DateTimeFieldUpdateOperationsInput | Date | string
    ph?: NullableFloatFieldUpdateOperationsInput | number | null
    organicMatter?: NullableFloatFieldUpdateOperationsInput | number | null
    nitrogen?: NullableFloatFieldUpdateOperationsInput | number | null
    phosphorus?: NullableFloatFieldUpdateOperationsInput | number | null
    potassium?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type YieldConfigCreateInput = {
    id?: string
    targetYield: number
    bearingStatus: string
    createdAt?: Date | string
    updatedAt?: Date | string
    field: FieldCreateNestedOneWithoutYieldConfigInput
  }

  export type YieldConfigUncheckedCreateInput = {
    id?: string
    fieldId: string
    targetYield: number
    bearingStatus: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type YieldConfigUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    targetYield?: FloatFieldUpdateOperationsInput | number
    bearingStatus?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    field?: FieldUpdateOneRequiredWithoutYieldConfigNestedInput
  }

  export type YieldConfigUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fieldId?: StringFieldUpdateOperationsInput | string
    targetYield?: FloatFieldUpdateOperationsInput | number
    bearingStatus?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type YieldConfigCreateManyInput = {
    id?: string
    fieldId: string
    targetYield: number
    bearingStatus: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type YieldConfigUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    targetYield?: FloatFieldUpdateOperationsInput | number
    bearingStatus?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type YieldConfigUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    fieldId?: StringFieldUpdateOperationsInput | string
    targetYield?: FloatFieldUpdateOperationsInput | number
    bearingStatus?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type FarmListRelationFilter = {
    every?: FarmWhereInput
    some?: FarmWhereInput
    none?: FarmWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type FarmOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    fullName?: SortOrder
    email?: SortOrder
    password?: SortOrder
    phoneNumber?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    fullName?: SortOrder
    email?: SortOrder
    password?: SortOrder
    phoneNumber?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    fullName?: SortOrder
    email?: SortOrder
    password?: SortOrder
    phoneNumber?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
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

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type FieldListRelationFilter = {
    every?: FieldWhereInput
    some?: FieldWhereInput
    none?: FieldWhereInput
  }

  export type FieldOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FarmCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
  }

  export type FarmMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
  }

  export type FarmMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
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

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
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

  export type FarmScalarRelationFilter = {
    is?: FarmWhereInput
    isNot?: FarmWhereInput
  }

  export type OperationListRelationFilter = {
    every?: OperationWhereInput
    some?: OperationWhereInput
    none?: OperationWhereInput
  }

  export type FieldDailyMetricsListRelationFilter = {
    every?: FieldDailyMetricsWhereInput
    some?: FieldDailyMetricsWhereInput
    none?: FieldDailyMetricsWhereInput
  }

  export type FieldSeasonSummaryListRelationFilter = {
    every?: FieldSeasonSummaryWhereInput
    some?: FieldSeasonSummaryWhereInput
    none?: FieldSeasonSummaryWhereInput
  }

  export type IrrigationConfigNullableScalarRelationFilter = {
    is?: IrrigationConfigWhereInput | null
    isNot?: IrrigationConfigWhereInput | null
  }

  export type SoilAnalysisListRelationFilter = {
    every?: SoilAnalysisWhereInput
    some?: SoilAnalysisWhereInput
    none?: SoilAnalysisWhereInput
  }

  export type YieldConfigNullableScalarRelationFilter = {
    is?: YieldConfigWhereInput | null
    isNot?: YieldConfigWhereInput | null
  }

  export type OperationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FieldDailyMetricsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FieldSeasonSummaryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SoilAnalysisOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FieldCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    farmId?: SortOrder
    geoPolygon?: SortOrder
    area?: SortOrder
    cropType?: SortOrder
    equipmentConfig?: SortOrder
    soilMetadata?: SortOrder
    plantingDate?: SortOrder
    agronomicData?: SortOrder
    createdAt?: SortOrder
  }

  export type FieldAvgOrderByAggregateInput = {
    area?: SortOrder
  }

  export type FieldMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    farmId?: SortOrder
    area?: SortOrder
    cropType?: SortOrder
    plantingDate?: SortOrder
    createdAt?: SortOrder
  }

  export type FieldMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    farmId?: SortOrder
    area?: SortOrder
    cropType?: SortOrder
    plantingDate?: SortOrder
    createdAt?: SortOrder
  }

  export type FieldSumOrderByAggregateInput = {
    area?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
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
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
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

  export type FieldScalarRelationFilter = {
    is?: FieldWhereInput
    isNot?: FieldWhereInput
  }

  export type OperationCountOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    date?: SortOrder
    metadata?: SortOrder
    fieldId?: SortOrder
    createdAt?: SortOrder
  }

  export type OperationMaxOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    date?: SortOrder
    fieldId?: SortOrder
    createdAt?: SortOrder
  }

  export type OperationMinOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    date?: SortOrder
    fieldId?: SortOrder
    createdAt?: SortOrder
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

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type FieldDailyMetricsFieldIdDateCompoundUniqueInput = {
    fieldId: string
    date: Date | string
  }

  export type FieldDailyMetricsCountOrderByAggregateInput = {
    id?: SortOrder
    fieldId?: SortOrder
    date?: SortOrder
    season?: SortOrder
    tmax?: SortOrder
    tmin?: SortOrder
    humidity?: SortOrder
    precipitation?: SortOrder
    gddDaily?: SortOrder
    accumulatedGdd?: SortOrder
    chillingHoursToday?: SortOrder
    accumulatedChilling?: SortOrder
    bioFixReached?: SortOrder
    currentStage?: SortOrder
    gddToNextStage?: SortOrder
    createdAt?: SortOrder
  }

  export type FieldDailyMetricsAvgOrderByAggregateInput = {
    season?: SortOrder
    tmax?: SortOrder
    tmin?: SortOrder
    humidity?: SortOrder
    precipitation?: SortOrder
    gddDaily?: SortOrder
    accumulatedGdd?: SortOrder
    chillingHoursToday?: SortOrder
    accumulatedChilling?: SortOrder
    gddToNextStage?: SortOrder
  }

  export type FieldDailyMetricsMaxOrderByAggregateInput = {
    id?: SortOrder
    fieldId?: SortOrder
    date?: SortOrder
    season?: SortOrder
    tmax?: SortOrder
    tmin?: SortOrder
    humidity?: SortOrder
    precipitation?: SortOrder
    gddDaily?: SortOrder
    accumulatedGdd?: SortOrder
    chillingHoursToday?: SortOrder
    accumulatedChilling?: SortOrder
    bioFixReached?: SortOrder
    currentStage?: SortOrder
    gddToNextStage?: SortOrder
    createdAt?: SortOrder
  }

  export type FieldDailyMetricsMinOrderByAggregateInput = {
    id?: SortOrder
    fieldId?: SortOrder
    date?: SortOrder
    season?: SortOrder
    tmax?: SortOrder
    tmin?: SortOrder
    humidity?: SortOrder
    precipitation?: SortOrder
    gddDaily?: SortOrder
    accumulatedGdd?: SortOrder
    chillingHoursToday?: SortOrder
    accumulatedChilling?: SortOrder
    bioFixReached?: SortOrder
    currentStage?: SortOrder
    gddToNextStage?: SortOrder
    createdAt?: SortOrder
  }

  export type FieldDailyMetricsSumOrderByAggregateInput = {
    season?: SortOrder
    tmax?: SortOrder
    tmin?: SortOrder
    humidity?: SortOrder
    precipitation?: SortOrder
    gddDaily?: SortOrder
    accumulatedGdd?: SortOrder
    chillingHoursToday?: SortOrder
    accumulatedChilling?: SortOrder
    gddToNextStage?: SortOrder
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

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type FieldSeasonSummaryFieldIdSeasonCompoundUniqueInput = {
    fieldId: string
    season: number
  }

  export type FieldSeasonSummaryCountOrderByAggregateInput = {
    id?: SortOrder
    fieldId?: SortOrder
    season?: SortOrder
    currentStage?: SortOrder
    accumulatedGdd?: SortOrder
    accumulatedChilling?: SortOrder
    bioFixReached?: SortOrder
    bioFixDate?: SortOrder
    gddToNextStage?: SortOrder
    daysInCurrentStage?: SortOrder
    lastUpdated?: SortOrder
    predictedFloweringDate?: SortOrder
    predictedHarvestDate?: SortOrder
    totalPrecipitation?: SortOrder
    avgTemperature?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FieldSeasonSummaryAvgOrderByAggregateInput = {
    season?: SortOrder
    accumulatedGdd?: SortOrder
    accumulatedChilling?: SortOrder
    gddToNextStage?: SortOrder
    daysInCurrentStage?: SortOrder
    totalPrecipitation?: SortOrder
    avgTemperature?: SortOrder
  }

  export type FieldSeasonSummaryMaxOrderByAggregateInput = {
    id?: SortOrder
    fieldId?: SortOrder
    season?: SortOrder
    currentStage?: SortOrder
    accumulatedGdd?: SortOrder
    accumulatedChilling?: SortOrder
    bioFixReached?: SortOrder
    bioFixDate?: SortOrder
    gddToNextStage?: SortOrder
    daysInCurrentStage?: SortOrder
    lastUpdated?: SortOrder
    predictedFloweringDate?: SortOrder
    predictedHarvestDate?: SortOrder
    totalPrecipitation?: SortOrder
    avgTemperature?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FieldSeasonSummaryMinOrderByAggregateInput = {
    id?: SortOrder
    fieldId?: SortOrder
    season?: SortOrder
    currentStage?: SortOrder
    accumulatedGdd?: SortOrder
    accumulatedChilling?: SortOrder
    bioFixReached?: SortOrder
    bioFixDate?: SortOrder
    gddToNextStage?: SortOrder
    daysInCurrentStage?: SortOrder
    lastUpdated?: SortOrder
    predictedFloweringDate?: SortOrder
    predictedHarvestDate?: SortOrder
    totalPrecipitation?: SortOrder
    avgTemperature?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FieldSeasonSummarySumOrderByAggregateInput = {
    season?: SortOrder
    accumulatedGdd?: SortOrder
    accumulatedChilling?: SortOrder
    gddToNextStage?: SortOrder
    daysInCurrentStage?: SortOrder
    totalPrecipitation?: SortOrder
    avgTemperature?: SortOrder
  }

  export type IrrigationConfigCountOrderByAggregateInput = {
    id?: SortOrder
    fieldId?: SortOrder
    dripperFlowRate?: SortOrder
    drippersPerTree?: SortOrder
    treeDensity?: SortOrder
    efficiency?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type IrrigationConfigAvgOrderByAggregateInput = {
    dripperFlowRate?: SortOrder
    drippersPerTree?: SortOrder
    treeDensity?: SortOrder
    efficiency?: SortOrder
  }

  export type IrrigationConfigMaxOrderByAggregateInput = {
    id?: SortOrder
    fieldId?: SortOrder
    dripperFlowRate?: SortOrder
    drippersPerTree?: SortOrder
    treeDensity?: SortOrder
    efficiency?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type IrrigationConfigMinOrderByAggregateInput = {
    id?: SortOrder
    fieldId?: SortOrder
    dripperFlowRate?: SortOrder
    drippersPerTree?: SortOrder
    treeDensity?: SortOrder
    efficiency?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type IrrigationConfigSumOrderByAggregateInput = {
    dripperFlowRate?: SortOrder
    drippersPerTree?: SortOrder
    treeDensity?: SortOrder
    efficiency?: SortOrder
  }

  export type SoilAnalysisCountOrderByAggregateInput = {
    id?: SortOrder
    fieldId?: SortOrder
    analysisDate?: SortOrder
    ph?: SortOrder
    organicMatter?: SortOrder
    nitrogen?: SortOrder
    phosphorus?: SortOrder
    potassium?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SoilAnalysisAvgOrderByAggregateInput = {
    ph?: SortOrder
    organicMatter?: SortOrder
    nitrogen?: SortOrder
    phosphorus?: SortOrder
    potassium?: SortOrder
  }

  export type SoilAnalysisMaxOrderByAggregateInput = {
    id?: SortOrder
    fieldId?: SortOrder
    analysisDate?: SortOrder
    ph?: SortOrder
    organicMatter?: SortOrder
    nitrogen?: SortOrder
    phosphorus?: SortOrder
    potassium?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SoilAnalysisMinOrderByAggregateInput = {
    id?: SortOrder
    fieldId?: SortOrder
    analysisDate?: SortOrder
    ph?: SortOrder
    organicMatter?: SortOrder
    nitrogen?: SortOrder
    phosphorus?: SortOrder
    potassium?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SoilAnalysisSumOrderByAggregateInput = {
    ph?: SortOrder
    organicMatter?: SortOrder
    nitrogen?: SortOrder
    phosphorus?: SortOrder
    potassium?: SortOrder
  }

  export type YieldConfigCountOrderByAggregateInput = {
    id?: SortOrder
    fieldId?: SortOrder
    targetYield?: SortOrder
    bearingStatus?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type YieldConfigAvgOrderByAggregateInput = {
    targetYield?: SortOrder
  }

  export type YieldConfigMaxOrderByAggregateInput = {
    id?: SortOrder
    fieldId?: SortOrder
    targetYield?: SortOrder
    bearingStatus?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type YieldConfigMinOrderByAggregateInput = {
    id?: SortOrder
    fieldId?: SortOrder
    targetYield?: SortOrder
    bearingStatus?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type YieldConfigSumOrderByAggregateInput = {
    targetYield?: SortOrder
  }

  export type FarmCreateNestedManyWithoutUserInput = {
    create?: XOR<FarmCreateWithoutUserInput, FarmUncheckedCreateWithoutUserInput> | FarmCreateWithoutUserInput[] | FarmUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FarmCreateOrConnectWithoutUserInput | FarmCreateOrConnectWithoutUserInput[]
    createMany?: FarmCreateManyUserInputEnvelope
    connect?: FarmWhereUniqueInput | FarmWhereUniqueInput[]
  }

  export type FarmUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<FarmCreateWithoutUserInput, FarmUncheckedCreateWithoutUserInput> | FarmCreateWithoutUserInput[] | FarmUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FarmCreateOrConnectWithoutUserInput | FarmCreateOrConnectWithoutUserInput[]
    createMany?: FarmCreateManyUserInputEnvelope
    connect?: FarmWhereUniqueInput | FarmWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type FarmUpdateManyWithoutUserNestedInput = {
    create?: XOR<FarmCreateWithoutUserInput, FarmUncheckedCreateWithoutUserInput> | FarmCreateWithoutUserInput[] | FarmUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FarmCreateOrConnectWithoutUserInput | FarmCreateOrConnectWithoutUserInput[]
    upsert?: FarmUpsertWithWhereUniqueWithoutUserInput | FarmUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: FarmCreateManyUserInputEnvelope
    set?: FarmWhereUniqueInput | FarmWhereUniqueInput[]
    disconnect?: FarmWhereUniqueInput | FarmWhereUniqueInput[]
    delete?: FarmWhereUniqueInput | FarmWhereUniqueInput[]
    connect?: FarmWhereUniqueInput | FarmWhereUniqueInput[]
    update?: FarmUpdateWithWhereUniqueWithoutUserInput | FarmUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: FarmUpdateManyWithWhereWithoutUserInput | FarmUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: FarmScalarWhereInput | FarmScalarWhereInput[]
  }

  export type FarmUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<FarmCreateWithoutUserInput, FarmUncheckedCreateWithoutUserInput> | FarmCreateWithoutUserInput[] | FarmUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FarmCreateOrConnectWithoutUserInput | FarmCreateOrConnectWithoutUserInput[]
    upsert?: FarmUpsertWithWhereUniqueWithoutUserInput | FarmUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: FarmCreateManyUserInputEnvelope
    set?: FarmWhereUniqueInput | FarmWhereUniqueInput[]
    disconnect?: FarmWhereUniqueInput | FarmWhereUniqueInput[]
    delete?: FarmWhereUniqueInput | FarmWhereUniqueInput[]
    connect?: FarmWhereUniqueInput | FarmWhereUniqueInput[]
    update?: FarmUpdateWithWhereUniqueWithoutUserInput | FarmUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: FarmUpdateManyWithWhereWithoutUserInput | FarmUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: FarmScalarWhereInput | FarmScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutFarmsInput = {
    create?: XOR<UserCreateWithoutFarmsInput, UserUncheckedCreateWithoutFarmsInput>
    connectOrCreate?: UserCreateOrConnectWithoutFarmsInput
    connect?: UserWhereUniqueInput
  }

  export type FieldCreateNestedManyWithoutFarmInput = {
    create?: XOR<FieldCreateWithoutFarmInput, FieldUncheckedCreateWithoutFarmInput> | FieldCreateWithoutFarmInput[] | FieldUncheckedCreateWithoutFarmInput[]
    connectOrCreate?: FieldCreateOrConnectWithoutFarmInput | FieldCreateOrConnectWithoutFarmInput[]
    createMany?: FieldCreateManyFarmInputEnvelope
    connect?: FieldWhereUniqueInput | FieldWhereUniqueInput[]
  }

  export type FieldUncheckedCreateNestedManyWithoutFarmInput = {
    create?: XOR<FieldCreateWithoutFarmInput, FieldUncheckedCreateWithoutFarmInput> | FieldCreateWithoutFarmInput[] | FieldUncheckedCreateWithoutFarmInput[]
    connectOrCreate?: FieldCreateOrConnectWithoutFarmInput | FieldCreateOrConnectWithoutFarmInput[]
    createMany?: FieldCreateManyFarmInputEnvelope
    connect?: FieldWhereUniqueInput | FieldWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutFarmsNestedInput = {
    create?: XOR<UserCreateWithoutFarmsInput, UserUncheckedCreateWithoutFarmsInput>
    connectOrCreate?: UserCreateOrConnectWithoutFarmsInput
    upsert?: UserUpsertWithoutFarmsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutFarmsInput, UserUpdateWithoutFarmsInput>, UserUncheckedUpdateWithoutFarmsInput>
  }

  export type FieldUpdateManyWithoutFarmNestedInput = {
    create?: XOR<FieldCreateWithoutFarmInput, FieldUncheckedCreateWithoutFarmInput> | FieldCreateWithoutFarmInput[] | FieldUncheckedCreateWithoutFarmInput[]
    connectOrCreate?: FieldCreateOrConnectWithoutFarmInput | FieldCreateOrConnectWithoutFarmInput[]
    upsert?: FieldUpsertWithWhereUniqueWithoutFarmInput | FieldUpsertWithWhereUniqueWithoutFarmInput[]
    createMany?: FieldCreateManyFarmInputEnvelope
    set?: FieldWhereUniqueInput | FieldWhereUniqueInput[]
    disconnect?: FieldWhereUniqueInput | FieldWhereUniqueInput[]
    delete?: FieldWhereUniqueInput | FieldWhereUniqueInput[]
    connect?: FieldWhereUniqueInput | FieldWhereUniqueInput[]
    update?: FieldUpdateWithWhereUniqueWithoutFarmInput | FieldUpdateWithWhereUniqueWithoutFarmInput[]
    updateMany?: FieldUpdateManyWithWhereWithoutFarmInput | FieldUpdateManyWithWhereWithoutFarmInput[]
    deleteMany?: FieldScalarWhereInput | FieldScalarWhereInput[]
  }

  export type FieldUncheckedUpdateManyWithoutFarmNestedInput = {
    create?: XOR<FieldCreateWithoutFarmInput, FieldUncheckedCreateWithoutFarmInput> | FieldCreateWithoutFarmInput[] | FieldUncheckedCreateWithoutFarmInput[]
    connectOrCreate?: FieldCreateOrConnectWithoutFarmInput | FieldCreateOrConnectWithoutFarmInput[]
    upsert?: FieldUpsertWithWhereUniqueWithoutFarmInput | FieldUpsertWithWhereUniqueWithoutFarmInput[]
    createMany?: FieldCreateManyFarmInputEnvelope
    set?: FieldWhereUniqueInput | FieldWhereUniqueInput[]
    disconnect?: FieldWhereUniqueInput | FieldWhereUniqueInput[]
    delete?: FieldWhereUniqueInput | FieldWhereUniqueInput[]
    connect?: FieldWhereUniqueInput | FieldWhereUniqueInput[]
    update?: FieldUpdateWithWhereUniqueWithoutFarmInput | FieldUpdateWithWhereUniqueWithoutFarmInput[]
    updateMany?: FieldUpdateManyWithWhereWithoutFarmInput | FieldUpdateManyWithWhereWithoutFarmInput[]
    deleteMany?: FieldScalarWhereInput | FieldScalarWhereInput[]
  }

  export type FarmCreateNestedOneWithoutFieldsInput = {
    create?: XOR<FarmCreateWithoutFieldsInput, FarmUncheckedCreateWithoutFieldsInput>
    connectOrCreate?: FarmCreateOrConnectWithoutFieldsInput
    connect?: FarmWhereUniqueInput
  }

  export type OperationCreateNestedManyWithoutFieldInput = {
    create?: XOR<OperationCreateWithoutFieldInput, OperationUncheckedCreateWithoutFieldInput> | OperationCreateWithoutFieldInput[] | OperationUncheckedCreateWithoutFieldInput[]
    connectOrCreate?: OperationCreateOrConnectWithoutFieldInput | OperationCreateOrConnectWithoutFieldInput[]
    createMany?: OperationCreateManyFieldInputEnvelope
    connect?: OperationWhereUniqueInput | OperationWhereUniqueInput[]
  }

  export type FieldDailyMetricsCreateNestedManyWithoutFieldInput = {
    create?: XOR<FieldDailyMetricsCreateWithoutFieldInput, FieldDailyMetricsUncheckedCreateWithoutFieldInput> | FieldDailyMetricsCreateWithoutFieldInput[] | FieldDailyMetricsUncheckedCreateWithoutFieldInput[]
    connectOrCreate?: FieldDailyMetricsCreateOrConnectWithoutFieldInput | FieldDailyMetricsCreateOrConnectWithoutFieldInput[]
    createMany?: FieldDailyMetricsCreateManyFieldInputEnvelope
    connect?: FieldDailyMetricsWhereUniqueInput | FieldDailyMetricsWhereUniqueInput[]
  }

  export type FieldSeasonSummaryCreateNestedManyWithoutFieldInput = {
    create?: XOR<FieldSeasonSummaryCreateWithoutFieldInput, FieldSeasonSummaryUncheckedCreateWithoutFieldInput> | FieldSeasonSummaryCreateWithoutFieldInput[] | FieldSeasonSummaryUncheckedCreateWithoutFieldInput[]
    connectOrCreate?: FieldSeasonSummaryCreateOrConnectWithoutFieldInput | FieldSeasonSummaryCreateOrConnectWithoutFieldInput[]
    createMany?: FieldSeasonSummaryCreateManyFieldInputEnvelope
    connect?: FieldSeasonSummaryWhereUniqueInput | FieldSeasonSummaryWhereUniqueInput[]
  }

  export type IrrigationConfigCreateNestedOneWithoutFieldInput = {
    create?: XOR<IrrigationConfigCreateWithoutFieldInput, IrrigationConfigUncheckedCreateWithoutFieldInput>
    connectOrCreate?: IrrigationConfigCreateOrConnectWithoutFieldInput
    connect?: IrrigationConfigWhereUniqueInput
  }

  export type SoilAnalysisCreateNestedManyWithoutFieldInput = {
    create?: XOR<SoilAnalysisCreateWithoutFieldInput, SoilAnalysisUncheckedCreateWithoutFieldInput> | SoilAnalysisCreateWithoutFieldInput[] | SoilAnalysisUncheckedCreateWithoutFieldInput[]
    connectOrCreate?: SoilAnalysisCreateOrConnectWithoutFieldInput | SoilAnalysisCreateOrConnectWithoutFieldInput[]
    createMany?: SoilAnalysisCreateManyFieldInputEnvelope
    connect?: SoilAnalysisWhereUniqueInput | SoilAnalysisWhereUniqueInput[]
  }

  export type YieldConfigCreateNestedOneWithoutFieldInput = {
    create?: XOR<YieldConfigCreateWithoutFieldInput, YieldConfigUncheckedCreateWithoutFieldInput>
    connectOrCreate?: YieldConfigCreateOrConnectWithoutFieldInput
    connect?: YieldConfigWhereUniqueInput
  }

  export type OperationUncheckedCreateNestedManyWithoutFieldInput = {
    create?: XOR<OperationCreateWithoutFieldInput, OperationUncheckedCreateWithoutFieldInput> | OperationCreateWithoutFieldInput[] | OperationUncheckedCreateWithoutFieldInput[]
    connectOrCreate?: OperationCreateOrConnectWithoutFieldInput | OperationCreateOrConnectWithoutFieldInput[]
    createMany?: OperationCreateManyFieldInputEnvelope
    connect?: OperationWhereUniqueInput | OperationWhereUniqueInput[]
  }

  export type FieldDailyMetricsUncheckedCreateNestedManyWithoutFieldInput = {
    create?: XOR<FieldDailyMetricsCreateWithoutFieldInput, FieldDailyMetricsUncheckedCreateWithoutFieldInput> | FieldDailyMetricsCreateWithoutFieldInput[] | FieldDailyMetricsUncheckedCreateWithoutFieldInput[]
    connectOrCreate?: FieldDailyMetricsCreateOrConnectWithoutFieldInput | FieldDailyMetricsCreateOrConnectWithoutFieldInput[]
    createMany?: FieldDailyMetricsCreateManyFieldInputEnvelope
    connect?: FieldDailyMetricsWhereUniqueInput | FieldDailyMetricsWhereUniqueInput[]
  }

  export type FieldSeasonSummaryUncheckedCreateNestedManyWithoutFieldInput = {
    create?: XOR<FieldSeasonSummaryCreateWithoutFieldInput, FieldSeasonSummaryUncheckedCreateWithoutFieldInput> | FieldSeasonSummaryCreateWithoutFieldInput[] | FieldSeasonSummaryUncheckedCreateWithoutFieldInput[]
    connectOrCreate?: FieldSeasonSummaryCreateOrConnectWithoutFieldInput | FieldSeasonSummaryCreateOrConnectWithoutFieldInput[]
    createMany?: FieldSeasonSummaryCreateManyFieldInputEnvelope
    connect?: FieldSeasonSummaryWhereUniqueInput | FieldSeasonSummaryWhereUniqueInput[]
  }

  export type IrrigationConfigUncheckedCreateNestedOneWithoutFieldInput = {
    create?: XOR<IrrigationConfigCreateWithoutFieldInput, IrrigationConfigUncheckedCreateWithoutFieldInput>
    connectOrCreate?: IrrigationConfigCreateOrConnectWithoutFieldInput
    connect?: IrrigationConfigWhereUniqueInput
  }

  export type SoilAnalysisUncheckedCreateNestedManyWithoutFieldInput = {
    create?: XOR<SoilAnalysisCreateWithoutFieldInput, SoilAnalysisUncheckedCreateWithoutFieldInput> | SoilAnalysisCreateWithoutFieldInput[] | SoilAnalysisUncheckedCreateWithoutFieldInput[]
    connectOrCreate?: SoilAnalysisCreateOrConnectWithoutFieldInput | SoilAnalysisCreateOrConnectWithoutFieldInput[]
    createMany?: SoilAnalysisCreateManyFieldInputEnvelope
    connect?: SoilAnalysisWhereUniqueInput | SoilAnalysisWhereUniqueInput[]
  }

  export type YieldConfigUncheckedCreateNestedOneWithoutFieldInput = {
    create?: XOR<YieldConfigCreateWithoutFieldInput, YieldConfigUncheckedCreateWithoutFieldInput>
    connectOrCreate?: YieldConfigCreateOrConnectWithoutFieldInput
    connect?: YieldConfigWhereUniqueInput
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type FarmUpdateOneRequiredWithoutFieldsNestedInput = {
    create?: XOR<FarmCreateWithoutFieldsInput, FarmUncheckedCreateWithoutFieldsInput>
    connectOrCreate?: FarmCreateOrConnectWithoutFieldsInput
    upsert?: FarmUpsertWithoutFieldsInput
    connect?: FarmWhereUniqueInput
    update?: XOR<XOR<FarmUpdateToOneWithWhereWithoutFieldsInput, FarmUpdateWithoutFieldsInput>, FarmUncheckedUpdateWithoutFieldsInput>
  }

  export type OperationUpdateManyWithoutFieldNestedInput = {
    create?: XOR<OperationCreateWithoutFieldInput, OperationUncheckedCreateWithoutFieldInput> | OperationCreateWithoutFieldInput[] | OperationUncheckedCreateWithoutFieldInput[]
    connectOrCreate?: OperationCreateOrConnectWithoutFieldInput | OperationCreateOrConnectWithoutFieldInput[]
    upsert?: OperationUpsertWithWhereUniqueWithoutFieldInput | OperationUpsertWithWhereUniqueWithoutFieldInput[]
    createMany?: OperationCreateManyFieldInputEnvelope
    set?: OperationWhereUniqueInput | OperationWhereUniqueInput[]
    disconnect?: OperationWhereUniqueInput | OperationWhereUniqueInput[]
    delete?: OperationWhereUniqueInput | OperationWhereUniqueInput[]
    connect?: OperationWhereUniqueInput | OperationWhereUniqueInput[]
    update?: OperationUpdateWithWhereUniqueWithoutFieldInput | OperationUpdateWithWhereUniqueWithoutFieldInput[]
    updateMany?: OperationUpdateManyWithWhereWithoutFieldInput | OperationUpdateManyWithWhereWithoutFieldInput[]
    deleteMany?: OperationScalarWhereInput | OperationScalarWhereInput[]
  }

  export type FieldDailyMetricsUpdateManyWithoutFieldNestedInput = {
    create?: XOR<FieldDailyMetricsCreateWithoutFieldInput, FieldDailyMetricsUncheckedCreateWithoutFieldInput> | FieldDailyMetricsCreateWithoutFieldInput[] | FieldDailyMetricsUncheckedCreateWithoutFieldInput[]
    connectOrCreate?: FieldDailyMetricsCreateOrConnectWithoutFieldInput | FieldDailyMetricsCreateOrConnectWithoutFieldInput[]
    upsert?: FieldDailyMetricsUpsertWithWhereUniqueWithoutFieldInput | FieldDailyMetricsUpsertWithWhereUniqueWithoutFieldInput[]
    createMany?: FieldDailyMetricsCreateManyFieldInputEnvelope
    set?: FieldDailyMetricsWhereUniqueInput | FieldDailyMetricsWhereUniqueInput[]
    disconnect?: FieldDailyMetricsWhereUniqueInput | FieldDailyMetricsWhereUniqueInput[]
    delete?: FieldDailyMetricsWhereUniqueInput | FieldDailyMetricsWhereUniqueInput[]
    connect?: FieldDailyMetricsWhereUniqueInput | FieldDailyMetricsWhereUniqueInput[]
    update?: FieldDailyMetricsUpdateWithWhereUniqueWithoutFieldInput | FieldDailyMetricsUpdateWithWhereUniqueWithoutFieldInput[]
    updateMany?: FieldDailyMetricsUpdateManyWithWhereWithoutFieldInput | FieldDailyMetricsUpdateManyWithWhereWithoutFieldInput[]
    deleteMany?: FieldDailyMetricsScalarWhereInput | FieldDailyMetricsScalarWhereInput[]
  }

  export type FieldSeasonSummaryUpdateManyWithoutFieldNestedInput = {
    create?: XOR<FieldSeasonSummaryCreateWithoutFieldInput, FieldSeasonSummaryUncheckedCreateWithoutFieldInput> | FieldSeasonSummaryCreateWithoutFieldInput[] | FieldSeasonSummaryUncheckedCreateWithoutFieldInput[]
    connectOrCreate?: FieldSeasonSummaryCreateOrConnectWithoutFieldInput | FieldSeasonSummaryCreateOrConnectWithoutFieldInput[]
    upsert?: FieldSeasonSummaryUpsertWithWhereUniqueWithoutFieldInput | FieldSeasonSummaryUpsertWithWhereUniqueWithoutFieldInput[]
    createMany?: FieldSeasonSummaryCreateManyFieldInputEnvelope
    set?: FieldSeasonSummaryWhereUniqueInput | FieldSeasonSummaryWhereUniqueInput[]
    disconnect?: FieldSeasonSummaryWhereUniqueInput | FieldSeasonSummaryWhereUniqueInput[]
    delete?: FieldSeasonSummaryWhereUniqueInput | FieldSeasonSummaryWhereUniqueInput[]
    connect?: FieldSeasonSummaryWhereUniqueInput | FieldSeasonSummaryWhereUniqueInput[]
    update?: FieldSeasonSummaryUpdateWithWhereUniqueWithoutFieldInput | FieldSeasonSummaryUpdateWithWhereUniqueWithoutFieldInput[]
    updateMany?: FieldSeasonSummaryUpdateManyWithWhereWithoutFieldInput | FieldSeasonSummaryUpdateManyWithWhereWithoutFieldInput[]
    deleteMany?: FieldSeasonSummaryScalarWhereInput | FieldSeasonSummaryScalarWhereInput[]
  }

  export type IrrigationConfigUpdateOneWithoutFieldNestedInput = {
    create?: XOR<IrrigationConfigCreateWithoutFieldInput, IrrigationConfigUncheckedCreateWithoutFieldInput>
    connectOrCreate?: IrrigationConfigCreateOrConnectWithoutFieldInput
    upsert?: IrrigationConfigUpsertWithoutFieldInput
    disconnect?: IrrigationConfigWhereInput | boolean
    delete?: IrrigationConfigWhereInput | boolean
    connect?: IrrigationConfigWhereUniqueInput
    update?: XOR<XOR<IrrigationConfigUpdateToOneWithWhereWithoutFieldInput, IrrigationConfigUpdateWithoutFieldInput>, IrrigationConfigUncheckedUpdateWithoutFieldInput>
  }

  export type SoilAnalysisUpdateManyWithoutFieldNestedInput = {
    create?: XOR<SoilAnalysisCreateWithoutFieldInput, SoilAnalysisUncheckedCreateWithoutFieldInput> | SoilAnalysisCreateWithoutFieldInput[] | SoilAnalysisUncheckedCreateWithoutFieldInput[]
    connectOrCreate?: SoilAnalysisCreateOrConnectWithoutFieldInput | SoilAnalysisCreateOrConnectWithoutFieldInput[]
    upsert?: SoilAnalysisUpsertWithWhereUniqueWithoutFieldInput | SoilAnalysisUpsertWithWhereUniqueWithoutFieldInput[]
    createMany?: SoilAnalysisCreateManyFieldInputEnvelope
    set?: SoilAnalysisWhereUniqueInput | SoilAnalysisWhereUniqueInput[]
    disconnect?: SoilAnalysisWhereUniqueInput | SoilAnalysisWhereUniqueInput[]
    delete?: SoilAnalysisWhereUniqueInput | SoilAnalysisWhereUniqueInput[]
    connect?: SoilAnalysisWhereUniqueInput | SoilAnalysisWhereUniqueInput[]
    update?: SoilAnalysisUpdateWithWhereUniqueWithoutFieldInput | SoilAnalysisUpdateWithWhereUniqueWithoutFieldInput[]
    updateMany?: SoilAnalysisUpdateManyWithWhereWithoutFieldInput | SoilAnalysisUpdateManyWithWhereWithoutFieldInput[]
    deleteMany?: SoilAnalysisScalarWhereInput | SoilAnalysisScalarWhereInput[]
  }

  export type YieldConfigUpdateOneWithoutFieldNestedInput = {
    create?: XOR<YieldConfigCreateWithoutFieldInput, YieldConfigUncheckedCreateWithoutFieldInput>
    connectOrCreate?: YieldConfigCreateOrConnectWithoutFieldInput
    upsert?: YieldConfigUpsertWithoutFieldInput
    disconnect?: YieldConfigWhereInput | boolean
    delete?: YieldConfigWhereInput | boolean
    connect?: YieldConfigWhereUniqueInput
    update?: XOR<XOR<YieldConfigUpdateToOneWithWhereWithoutFieldInput, YieldConfigUpdateWithoutFieldInput>, YieldConfigUncheckedUpdateWithoutFieldInput>
  }

  export type OperationUncheckedUpdateManyWithoutFieldNestedInput = {
    create?: XOR<OperationCreateWithoutFieldInput, OperationUncheckedCreateWithoutFieldInput> | OperationCreateWithoutFieldInput[] | OperationUncheckedCreateWithoutFieldInput[]
    connectOrCreate?: OperationCreateOrConnectWithoutFieldInput | OperationCreateOrConnectWithoutFieldInput[]
    upsert?: OperationUpsertWithWhereUniqueWithoutFieldInput | OperationUpsertWithWhereUniqueWithoutFieldInput[]
    createMany?: OperationCreateManyFieldInputEnvelope
    set?: OperationWhereUniqueInput | OperationWhereUniqueInput[]
    disconnect?: OperationWhereUniqueInput | OperationWhereUniqueInput[]
    delete?: OperationWhereUniqueInput | OperationWhereUniqueInput[]
    connect?: OperationWhereUniqueInput | OperationWhereUniqueInput[]
    update?: OperationUpdateWithWhereUniqueWithoutFieldInput | OperationUpdateWithWhereUniqueWithoutFieldInput[]
    updateMany?: OperationUpdateManyWithWhereWithoutFieldInput | OperationUpdateManyWithWhereWithoutFieldInput[]
    deleteMany?: OperationScalarWhereInput | OperationScalarWhereInput[]
  }

  export type FieldDailyMetricsUncheckedUpdateManyWithoutFieldNestedInput = {
    create?: XOR<FieldDailyMetricsCreateWithoutFieldInput, FieldDailyMetricsUncheckedCreateWithoutFieldInput> | FieldDailyMetricsCreateWithoutFieldInput[] | FieldDailyMetricsUncheckedCreateWithoutFieldInput[]
    connectOrCreate?: FieldDailyMetricsCreateOrConnectWithoutFieldInput | FieldDailyMetricsCreateOrConnectWithoutFieldInput[]
    upsert?: FieldDailyMetricsUpsertWithWhereUniqueWithoutFieldInput | FieldDailyMetricsUpsertWithWhereUniqueWithoutFieldInput[]
    createMany?: FieldDailyMetricsCreateManyFieldInputEnvelope
    set?: FieldDailyMetricsWhereUniqueInput | FieldDailyMetricsWhereUniqueInput[]
    disconnect?: FieldDailyMetricsWhereUniqueInput | FieldDailyMetricsWhereUniqueInput[]
    delete?: FieldDailyMetricsWhereUniqueInput | FieldDailyMetricsWhereUniqueInput[]
    connect?: FieldDailyMetricsWhereUniqueInput | FieldDailyMetricsWhereUniqueInput[]
    update?: FieldDailyMetricsUpdateWithWhereUniqueWithoutFieldInput | FieldDailyMetricsUpdateWithWhereUniqueWithoutFieldInput[]
    updateMany?: FieldDailyMetricsUpdateManyWithWhereWithoutFieldInput | FieldDailyMetricsUpdateManyWithWhereWithoutFieldInput[]
    deleteMany?: FieldDailyMetricsScalarWhereInput | FieldDailyMetricsScalarWhereInput[]
  }

  export type FieldSeasonSummaryUncheckedUpdateManyWithoutFieldNestedInput = {
    create?: XOR<FieldSeasonSummaryCreateWithoutFieldInput, FieldSeasonSummaryUncheckedCreateWithoutFieldInput> | FieldSeasonSummaryCreateWithoutFieldInput[] | FieldSeasonSummaryUncheckedCreateWithoutFieldInput[]
    connectOrCreate?: FieldSeasonSummaryCreateOrConnectWithoutFieldInput | FieldSeasonSummaryCreateOrConnectWithoutFieldInput[]
    upsert?: FieldSeasonSummaryUpsertWithWhereUniqueWithoutFieldInput | FieldSeasonSummaryUpsertWithWhereUniqueWithoutFieldInput[]
    createMany?: FieldSeasonSummaryCreateManyFieldInputEnvelope
    set?: FieldSeasonSummaryWhereUniqueInput | FieldSeasonSummaryWhereUniqueInput[]
    disconnect?: FieldSeasonSummaryWhereUniqueInput | FieldSeasonSummaryWhereUniqueInput[]
    delete?: FieldSeasonSummaryWhereUniqueInput | FieldSeasonSummaryWhereUniqueInput[]
    connect?: FieldSeasonSummaryWhereUniqueInput | FieldSeasonSummaryWhereUniqueInput[]
    update?: FieldSeasonSummaryUpdateWithWhereUniqueWithoutFieldInput | FieldSeasonSummaryUpdateWithWhereUniqueWithoutFieldInput[]
    updateMany?: FieldSeasonSummaryUpdateManyWithWhereWithoutFieldInput | FieldSeasonSummaryUpdateManyWithWhereWithoutFieldInput[]
    deleteMany?: FieldSeasonSummaryScalarWhereInput | FieldSeasonSummaryScalarWhereInput[]
  }

  export type IrrigationConfigUncheckedUpdateOneWithoutFieldNestedInput = {
    create?: XOR<IrrigationConfigCreateWithoutFieldInput, IrrigationConfigUncheckedCreateWithoutFieldInput>
    connectOrCreate?: IrrigationConfigCreateOrConnectWithoutFieldInput
    upsert?: IrrigationConfigUpsertWithoutFieldInput
    disconnect?: IrrigationConfigWhereInput | boolean
    delete?: IrrigationConfigWhereInput | boolean
    connect?: IrrigationConfigWhereUniqueInput
    update?: XOR<XOR<IrrigationConfigUpdateToOneWithWhereWithoutFieldInput, IrrigationConfigUpdateWithoutFieldInput>, IrrigationConfigUncheckedUpdateWithoutFieldInput>
  }

  export type SoilAnalysisUncheckedUpdateManyWithoutFieldNestedInput = {
    create?: XOR<SoilAnalysisCreateWithoutFieldInput, SoilAnalysisUncheckedCreateWithoutFieldInput> | SoilAnalysisCreateWithoutFieldInput[] | SoilAnalysisUncheckedCreateWithoutFieldInput[]
    connectOrCreate?: SoilAnalysisCreateOrConnectWithoutFieldInput | SoilAnalysisCreateOrConnectWithoutFieldInput[]
    upsert?: SoilAnalysisUpsertWithWhereUniqueWithoutFieldInput | SoilAnalysisUpsertWithWhereUniqueWithoutFieldInput[]
    createMany?: SoilAnalysisCreateManyFieldInputEnvelope
    set?: SoilAnalysisWhereUniqueInput | SoilAnalysisWhereUniqueInput[]
    disconnect?: SoilAnalysisWhereUniqueInput | SoilAnalysisWhereUniqueInput[]
    delete?: SoilAnalysisWhereUniqueInput | SoilAnalysisWhereUniqueInput[]
    connect?: SoilAnalysisWhereUniqueInput | SoilAnalysisWhereUniqueInput[]
    update?: SoilAnalysisUpdateWithWhereUniqueWithoutFieldInput | SoilAnalysisUpdateWithWhereUniqueWithoutFieldInput[]
    updateMany?: SoilAnalysisUpdateManyWithWhereWithoutFieldInput | SoilAnalysisUpdateManyWithWhereWithoutFieldInput[]
    deleteMany?: SoilAnalysisScalarWhereInput | SoilAnalysisScalarWhereInput[]
  }

  export type YieldConfigUncheckedUpdateOneWithoutFieldNestedInput = {
    create?: XOR<YieldConfigCreateWithoutFieldInput, YieldConfigUncheckedCreateWithoutFieldInput>
    connectOrCreate?: YieldConfigCreateOrConnectWithoutFieldInput
    upsert?: YieldConfigUpsertWithoutFieldInput
    disconnect?: YieldConfigWhereInput | boolean
    delete?: YieldConfigWhereInput | boolean
    connect?: YieldConfigWhereUniqueInput
    update?: XOR<XOR<YieldConfigUpdateToOneWithWhereWithoutFieldInput, YieldConfigUpdateWithoutFieldInput>, YieldConfigUncheckedUpdateWithoutFieldInput>
  }

  export type FieldCreateNestedOneWithoutOperationsInput = {
    create?: XOR<FieldCreateWithoutOperationsInput, FieldUncheckedCreateWithoutOperationsInput>
    connectOrCreate?: FieldCreateOrConnectWithoutOperationsInput
    connect?: FieldWhereUniqueInput
  }

  export type FieldUpdateOneRequiredWithoutOperationsNestedInput = {
    create?: XOR<FieldCreateWithoutOperationsInput, FieldUncheckedCreateWithoutOperationsInput>
    connectOrCreate?: FieldCreateOrConnectWithoutOperationsInput
    upsert?: FieldUpsertWithoutOperationsInput
    connect?: FieldWhereUniqueInput
    update?: XOR<XOR<FieldUpdateToOneWithWhereWithoutOperationsInput, FieldUpdateWithoutOperationsInput>, FieldUncheckedUpdateWithoutOperationsInput>
  }

  export type FieldCreateNestedOneWithoutDailyMetricsInput = {
    create?: XOR<FieldCreateWithoutDailyMetricsInput, FieldUncheckedCreateWithoutDailyMetricsInput>
    connectOrCreate?: FieldCreateOrConnectWithoutDailyMetricsInput
    connect?: FieldWhereUniqueInput
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

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type FieldUpdateOneRequiredWithoutDailyMetricsNestedInput = {
    create?: XOR<FieldCreateWithoutDailyMetricsInput, FieldUncheckedCreateWithoutDailyMetricsInput>
    connectOrCreate?: FieldCreateOrConnectWithoutDailyMetricsInput
    upsert?: FieldUpsertWithoutDailyMetricsInput
    connect?: FieldWhereUniqueInput
    update?: XOR<XOR<FieldUpdateToOneWithWhereWithoutDailyMetricsInput, FieldUpdateWithoutDailyMetricsInput>, FieldUncheckedUpdateWithoutDailyMetricsInput>
  }

  export type FieldCreateNestedOneWithoutSeasonSummaryInput = {
    create?: XOR<FieldCreateWithoutSeasonSummaryInput, FieldUncheckedCreateWithoutSeasonSummaryInput>
    connectOrCreate?: FieldCreateOrConnectWithoutSeasonSummaryInput
    connect?: FieldWhereUniqueInput
  }

  export type FieldUpdateOneRequiredWithoutSeasonSummaryNestedInput = {
    create?: XOR<FieldCreateWithoutSeasonSummaryInput, FieldUncheckedCreateWithoutSeasonSummaryInput>
    connectOrCreate?: FieldCreateOrConnectWithoutSeasonSummaryInput
    upsert?: FieldUpsertWithoutSeasonSummaryInput
    connect?: FieldWhereUniqueInput
    update?: XOR<XOR<FieldUpdateToOneWithWhereWithoutSeasonSummaryInput, FieldUpdateWithoutSeasonSummaryInput>, FieldUncheckedUpdateWithoutSeasonSummaryInput>
  }

  export type FieldCreateNestedOneWithoutIrrigationConfigInput = {
    create?: XOR<FieldCreateWithoutIrrigationConfigInput, FieldUncheckedCreateWithoutIrrigationConfigInput>
    connectOrCreate?: FieldCreateOrConnectWithoutIrrigationConfigInput
    connect?: FieldWhereUniqueInput
  }

  export type FieldUpdateOneRequiredWithoutIrrigationConfigNestedInput = {
    create?: XOR<FieldCreateWithoutIrrigationConfigInput, FieldUncheckedCreateWithoutIrrigationConfigInput>
    connectOrCreate?: FieldCreateOrConnectWithoutIrrigationConfigInput
    upsert?: FieldUpsertWithoutIrrigationConfigInput
    connect?: FieldWhereUniqueInput
    update?: XOR<XOR<FieldUpdateToOneWithWhereWithoutIrrigationConfigInput, FieldUpdateWithoutIrrigationConfigInput>, FieldUncheckedUpdateWithoutIrrigationConfigInput>
  }

  export type FieldCreateNestedOneWithoutSoilAnalysisInput = {
    create?: XOR<FieldCreateWithoutSoilAnalysisInput, FieldUncheckedCreateWithoutSoilAnalysisInput>
    connectOrCreate?: FieldCreateOrConnectWithoutSoilAnalysisInput
    connect?: FieldWhereUniqueInput
  }

  export type FieldUpdateOneRequiredWithoutSoilAnalysisNestedInput = {
    create?: XOR<FieldCreateWithoutSoilAnalysisInput, FieldUncheckedCreateWithoutSoilAnalysisInput>
    connectOrCreate?: FieldCreateOrConnectWithoutSoilAnalysisInput
    upsert?: FieldUpsertWithoutSoilAnalysisInput
    connect?: FieldWhereUniqueInput
    update?: XOR<XOR<FieldUpdateToOneWithWhereWithoutSoilAnalysisInput, FieldUpdateWithoutSoilAnalysisInput>, FieldUncheckedUpdateWithoutSoilAnalysisInput>
  }

  export type FieldCreateNestedOneWithoutYieldConfigInput = {
    create?: XOR<FieldCreateWithoutYieldConfigInput, FieldUncheckedCreateWithoutYieldConfigInput>
    connectOrCreate?: FieldCreateOrConnectWithoutYieldConfigInput
    connect?: FieldWhereUniqueInput
  }

  export type FieldUpdateOneRequiredWithoutYieldConfigNestedInput = {
    create?: XOR<FieldCreateWithoutYieldConfigInput, FieldUncheckedCreateWithoutYieldConfigInput>
    connectOrCreate?: FieldCreateOrConnectWithoutYieldConfigInput
    upsert?: FieldUpsertWithoutYieldConfigInput
    connect?: FieldWhereUniqueInput
    update?: XOR<XOR<FieldUpdateToOneWithWhereWithoutYieldConfigInput, FieldUpdateWithoutYieldConfigInput>, FieldUncheckedUpdateWithoutYieldConfigInput>
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
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
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

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
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

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type FarmCreateWithoutUserInput = {
    id?: string
    name: string
    createdAt?: Date | string
    fields?: FieldCreateNestedManyWithoutFarmInput
  }

  export type FarmUncheckedCreateWithoutUserInput = {
    id?: string
    name: string
    createdAt?: Date | string
    fields?: FieldUncheckedCreateNestedManyWithoutFarmInput
  }

  export type FarmCreateOrConnectWithoutUserInput = {
    where: FarmWhereUniqueInput
    create: XOR<FarmCreateWithoutUserInput, FarmUncheckedCreateWithoutUserInput>
  }

  export type FarmCreateManyUserInputEnvelope = {
    data: FarmCreateManyUserInput | FarmCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type FarmUpsertWithWhereUniqueWithoutUserInput = {
    where: FarmWhereUniqueInput
    update: XOR<FarmUpdateWithoutUserInput, FarmUncheckedUpdateWithoutUserInput>
    create: XOR<FarmCreateWithoutUserInput, FarmUncheckedCreateWithoutUserInput>
  }

  export type FarmUpdateWithWhereUniqueWithoutUserInput = {
    where: FarmWhereUniqueInput
    data: XOR<FarmUpdateWithoutUserInput, FarmUncheckedUpdateWithoutUserInput>
  }

  export type FarmUpdateManyWithWhereWithoutUserInput = {
    where: FarmScalarWhereInput
    data: XOR<FarmUpdateManyMutationInput, FarmUncheckedUpdateManyWithoutUserInput>
  }

  export type FarmScalarWhereInput = {
    AND?: FarmScalarWhereInput | FarmScalarWhereInput[]
    OR?: FarmScalarWhereInput[]
    NOT?: FarmScalarWhereInput | FarmScalarWhereInput[]
    id?: StringFilter<"Farm"> | string
    name?: StringFilter<"Farm"> | string
    userId?: StringFilter<"Farm"> | string
    createdAt?: DateTimeFilter<"Farm"> | Date | string
  }

  export type UserCreateWithoutFarmsInput = {
    id?: string
    fullName: string
    email: string
    password: string
    phoneNumber?: string | null
    role?: string
    createdAt?: Date | string
  }

  export type UserUncheckedCreateWithoutFarmsInput = {
    id?: string
    fullName: string
    email: string
    password: string
    phoneNumber?: string | null
    role?: string
    createdAt?: Date | string
  }

  export type UserCreateOrConnectWithoutFarmsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutFarmsInput, UserUncheckedCreateWithoutFarmsInput>
  }

  export type FieldCreateWithoutFarmInput = {
    id?: string
    name: string
    geoPolygon: JsonNullValueInput | InputJsonValue
    area: number
    cropType?: string
    equipmentConfig?: NullableJsonNullValueInput | InputJsonValue
    soilMetadata?: NullableJsonNullValueInput | InputJsonValue
    plantingDate?: Date | string | null
    agronomicData?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    operations?: OperationCreateNestedManyWithoutFieldInput
    dailyMetrics?: FieldDailyMetricsCreateNestedManyWithoutFieldInput
    seasonSummary?: FieldSeasonSummaryCreateNestedManyWithoutFieldInput
    irrigationConfig?: IrrigationConfigCreateNestedOneWithoutFieldInput
    soilAnalysis?: SoilAnalysisCreateNestedManyWithoutFieldInput
    yieldConfig?: YieldConfigCreateNestedOneWithoutFieldInput
  }

  export type FieldUncheckedCreateWithoutFarmInput = {
    id?: string
    name: string
    geoPolygon: JsonNullValueInput | InputJsonValue
    area: number
    cropType?: string
    equipmentConfig?: NullableJsonNullValueInput | InputJsonValue
    soilMetadata?: NullableJsonNullValueInput | InputJsonValue
    plantingDate?: Date | string | null
    agronomicData?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    operations?: OperationUncheckedCreateNestedManyWithoutFieldInput
    dailyMetrics?: FieldDailyMetricsUncheckedCreateNestedManyWithoutFieldInput
    seasonSummary?: FieldSeasonSummaryUncheckedCreateNestedManyWithoutFieldInput
    irrigationConfig?: IrrigationConfigUncheckedCreateNestedOneWithoutFieldInput
    soilAnalysis?: SoilAnalysisUncheckedCreateNestedManyWithoutFieldInput
    yieldConfig?: YieldConfigUncheckedCreateNestedOneWithoutFieldInput
  }

  export type FieldCreateOrConnectWithoutFarmInput = {
    where: FieldWhereUniqueInput
    create: XOR<FieldCreateWithoutFarmInput, FieldUncheckedCreateWithoutFarmInput>
  }

  export type FieldCreateManyFarmInputEnvelope = {
    data: FieldCreateManyFarmInput | FieldCreateManyFarmInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutFarmsInput = {
    update: XOR<UserUpdateWithoutFarmsInput, UserUncheckedUpdateWithoutFarmsInput>
    create: XOR<UserCreateWithoutFarmsInput, UserUncheckedCreateWithoutFarmsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutFarmsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutFarmsInput, UserUncheckedUpdateWithoutFarmsInput>
  }

  export type UserUpdateWithoutFarmsInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateWithoutFarmsInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FieldUpsertWithWhereUniqueWithoutFarmInput = {
    where: FieldWhereUniqueInput
    update: XOR<FieldUpdateWithoutFarmInput, FieldUncheckedUpdateWithoutFarmInput>
    create: XOR<FieldCreateWithoutFarmInput, FieldUncheckedCreateWithoutFarmInput>
  }

  export type FieldUpdateWithWhereUniqueWithoutFarmInput = {
    where: FieldWhereUniqueInput
    data: XOR<FieldUpdateWithoutFarmInput, FieldUncheckedUpdateWithoutFarmInput>
  }

  export type FieldUpdateManyWithWhereWithoutFarmInput = {
    where: FieldScalarWhereInput
    data: XOR<FieldUpdateManyMutationInput, FieldUncheckedUpdateManyWithoutFarmInput>
  }

  export type FieldScalarWhereInput = {
    AND?: FieldScalarWhereInput | FieldScalarWhereInput[]
    OR?: FieldScalarWhereInput[]
    NOT?: FieldScalarWhereInput | FieldScalarWhereInput[]
    id?: StringFilter<"Field"> | string
    name?: StringFilter<"Field"> | string
    farmId?: StringFilter<"Field"> | string
    geoPolygon?: JsonFilter<"Field">
    area?: FloatFilter<"Field"> | number
    cropType?: StringFilter<"Field"> | string
    equipmentConfig?: JsonNullableFilter<"Field">
    soilMetadata?: JsonNullableFilter<"Field">
    plantingDate?: DateTimeNullableFilter<"Field"> | Date | string | null
    agronomicData?: JsonNullableFilter<"Field">
    createdAt?: DateTimeFilter<"Field"> | Date | string
  }

  export type FarmCreateWithoutFieldsInput = {
    id?: string
    name: string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutFarmsInput
  }

  export type FarmUncheckedCreateWithoutFieldsInput = {
    id?: string
    name: string
    userId: string
    createdAt?: Date | string
  }

  export type FarmCreateOrConnectWithoutFieldsInput = {
    where: FarmWhereUniqueInput
    create: XOR<FarmCreateWithoutFieldsInput, FarmUncheckedCreateWithoutFieldsInput>
  }

  export type OperationCreateWithoutFieldInput = {
    id?: string
    type: string
    date?: Date | string
    metadata: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type OperationUncheckedCreateWithoutFieldInput = {
    id?: string
    type: string
    date?: Date | string
    metadata: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type OperationCreateOrConnectWithoutFieldInput = {
    where: OperationWhereUniqueInput
    create: XOR<OperationCreateWithoutFieldInput, OperationUncheckedCreateWithoutFieldInput>
  }

  export type OperationCreateManyFieldInputEnvelope = {
    data: OperationCreateManyFieldInput | OperationCreateManyFieldInput[]
    skipDuplicates?: boolean
  }

  export type FieldDailyMetricsCreateWithoutFieldInput = {
    id?: string
    date: Date | string
    season: number
    tmax: number
    tmin: number
    humidity?: number | null
    precipitation?: number | null
    gddDaily: number
    accumulatedGdd?: number
    chillingHoursToday?: number
    accumulatedChilling?: number
    bioFixReached?: boolean
    currentStage?: string | null
    gddToNextStage?: number | null
    createdAt?: Date | string
  }

  export type FieldDailyMetricsUncheckedCreateWithoutFieldInput = {
    id?: string
    date: Date | string
    season: number
    tmax: number
    tmin: number
    humidity?: number | null
    precipitation?: number | null
    gddDaily: number
    accumulatedGdd?: number
    chillingHoursToday?: number
    accumulatedChilling?: number
    bioFixReached?: boolean
    currentStage?: string | null
    gddToNextStage?: number | null
    createdAt?: Date | string
  }

  export type FieldDailyMetricsCreateOrConnectWithoutFieldInput = {
    where: FieldDailyMetricsWhereUniqueInput
    create: XOR<FieldDailyMetricsCreateWithoutFieldInput, FieldDailyMetricsUncheckedCreateWithoutFieldInput>
  }

  export type FieldDailyMetricsCreateManyFieldInputEnvelope = {
    data: FieldDailyMetricsCreateManyFieldInput | FieldDailyMetricsCreateManyFieldInput[]
    skipDuplicates?: boolean
  }

  export type FieldSeasonSummaryCreateWithoutFieldInput = {
    id?: string
    season: number
    currentStage?: string | null
    accumulatedGdd?: number
    accumulatedChilling?: number
    bioFixReached?: boolean
    bioFixDate?: Date | string | null
    gddToNextStage?: number | null
    daysInCurrentStage?: number
    lastUpdated?: Date | string
    predictedFloweringDate?: Date | string | null
    predictedHarvestDate?: Date | string | null
    totalPrecipitation?: number
    avgTemperature?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FieldSeasonSummaryUncheckedCreateWithoutFieldInput = {
    id?: string
    season: number
    currentStage?: string | null
    accumulatedGdd?: number
    accumulatedChilling?: number
    bioFixReached?: boolean
    bioFixDate?: Date | string | null
    gddToNextStage?: number | null
    daysInCurrentStage?: number
    lastUpdated?: Date | string
    predictedFloweringDate?: Date | string | null
    predictedHarvestDate?: Date | string | null
    totalPrecipitation?: number
    avgTemperature?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FieldSeasonSummaryCreateOrConnectWithoutFieldInput = {
    where: FieldSeasonSummaryWhereUniqueInput
    create: XOR<FieldSeasonSummaryCreateWithoutFieldInput, FieldSeasonSummaryUncheckedCreateWithoutFieldInput>
  }

  export type FieldSeasonSummaryCreateManyFieldInputEnvelope = {
    data: FieldSeasonSummaryCreateManyFieldInput | FieldSeasonSummaryCreateManyFieldInput[]
    skipDuplicates?: boolean
  }

  export type IrrigationConfigCreateWithoutFieldInput = {
    id?: string
    dripperFlowRate: number
    drippersPerTree: number
    treeDensity: number
    efficiency?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type IrrigationConfigUncheckedCreateWithoutFieldInput = {
    id?: string
    dripperFlowRate: number
    drippersPerTree: number
    treeDensity: number
    efficiency?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type IrrigationConfigCreateOrConnectWithoutFieldInput = {
    where: IrrigationConfigWhereUniqueInput
    create: XOR<IrrigationConfigCreateWithoutFieldInput, IrrigationConfigUncheckedCreateWithoutFieldInput>
  }

  export type SoilAnalysisCreateWithoutFieldInput = {
    id?: string
    analysisDate: Date | string
    ph?: number | null
    organicMatter?: number | null
    nitrogen?: number | null
    phosphorus?: number | null
    potassium?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SoilAnalysisUncheckedCreateWithoutFieldInput = {
    id?: string
    analysisDate: Date | string
    ph?: number | null
    organicMatter?: number | null
    nitrogen?: number | null
    phosphorus?: number | null
    potassium?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SoilAnalysisCreateOrConnectWithoutFieldInput = {
    where: SoilAnalysisWhereUniqueInput
    create: XOR<SoilAnalysisCreateWithoutFieldInput, SoilAnalysisUncheckedCreateWithoutFieldInput>
  }

  export type SoilAnalysisCreateManyFieldInputEnvelope = {
    data: SoilAnalysisCreateManyFieldInput | SoilAnalysisCreateManyFieldInput[]
    skipDuplicates?: boolean
  }

  export type YieldConfigCreateWithoutFieldInput = {
    id?: string
    targetYield: number
    bearingStatus: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type YieldConfigUncheckedCreateWithoutFieldInput = {
    id?: string
    targetYield: number
    bearingStatus: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type YieldConfigCreateOrConnectWithoutFieldInput = {
    where: YieldConfigWhereUniqueInput
    create: XOR<YieldConfigCreateWithoutFieldInput, YieldConfigUncheckedCreateWithoutFieldInput>
  }

  export type FarmUpsertWithoutFieldsInput = {
    update: XOR<FarmUpdateWithoutFieldsInput, FarmUncheckedUpdateWithoutFieldsInput>
    create: XOR<FarmCreateWithoutFieldsInput, FarmUncheckedCreateWithoutFieldsInput>
    where?: FarmWhereInput
  }

  export type FarmUpdateToOneWithWhereWithoutFieldsInput = {
    where?: FarmWhereInput
    data: XOR<FarmUpdateWithoutFieldsInput, FarmUncheckedUpdateWithoutFieldsInput>
  }

  export type FarmUpdateWithoutFieldsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutFarmsNestedInput
  }

  export type FarmUncheckedUpdateWithoutFieldsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OperationUpsertWithWhereUniqueWithoutFieldInput = {
    where: OperationWhereUniqueInput
    update: XOR<OperationUpdateWithoutFieldInput, OperationUncheckedUpdateWithoutFieldInput>
    create: XOR<OperationCreateWithoutFieldInput, OperationUncheckedCreateWithoutFieldInput>
  }

  export type OperationUpdateWithWhereUniqueWithoutFieldInput = {
    where: OperationWhereUniqueInput
    data: XOR<OperationUpdateWithoutFieldInput, OperationUncheckedUpdateWithoutFieldInput>
  }

  export type OperationUpdateManyWithWhereWithoutFieldInput = {
    where: OperationScalarWhereInput
    data: XOR<OperationUpdateManyMutationInput, OperationUncheckedUpdateManyWithoutFieldInput>
  }

  export type OperationScalarWhereInput = {
    AND?: OperationScalarWhereInput | OperationScalarWhereInput[]
    OR?: OperationScalarWhereInput[]
    NOT?: OperationScalarWhereInput | OperationScalarWhereInput[]
    id?: StringFilter<"Operation"> | string
    type?: StringFilter<"Operation"> | string
    date?: DateTimeFilter<"Operation"> | Date | string
    metadata?: JsonFilter<"Operation">
    fieldId?: StringFilter<"Operation"> | string
    createdAt?: DateTimeFilter<"Operation"> | Date | string
  }

  export type FieldDailyMetricsUpsertWithWhereUniqueWithoutFieldInput = {
    where: FieldDailyMetricsWhereUniqueInput
    update: XOR<FieldDailyMetricsUpdateWithoutFieldInput, FieldDailyMetricsUncheckedUpdateWithoutFieldInput>
    create: XOR<FieldDailyMetricsCreateWithoutFieldInput, FieldDailyMetricsUncheckedCreateWithoutFieldInput>
  }

  export type FieldDailyMetricsUpdateWithWhereUniqueWithoutFieldInput = {
    where: FieldDailyMetricsWhereUniqueInput
    data: XOR<FieldDailyMetricsUpdateWithoutFieldInput, FieldDailyMetricsUncheckedUpdateWithoutFieldInput>
  }

  export type FieldDailyMetricsUpdateManyWithWhereWithoutFieldInput = {
    where: FieldDailyMetricsScalarWhereInput
    data: XOR<FieldDailyMetricsUpdateManyMutationInput, FieldDailyMetricsUncheckedUpdateManyWithoutFieldInput>
  }

  export type FieldDailyMetricsScalarWhereInput = {
    AND?: FieldDailyMetricsScalarWhereInput | FieldDailyMetricsScalarWhereInput[]
    OR?: FieldDailyMetricsScalarWhereInput[]
    NOT?: FieldDailyMetricsScalarWhereInput | FieldDailyMetricsScalarWhereInput[]
    id?: StringFilter<"FieldDailyMetrics"> | string
    fieldId?: StringFilter<"FieldDailyMetrics"> | string
    date?: DateTimeFilter<"FieldDailyMetrics"> | Date | string
    season?: IntFilter<"FieldDailyMetrics"> | number
    tmax?: FloatFilter<"FieldDailyMetrics"> | number
    tmin?: FloatFilter<"FieldDailyMetrics"> | number
    humidity?: FloatNullableFilter<"FieldDailyMetrics"> | number | null
    precipitation?: FloatNullableFilter<"FieldDailyMetrics"> | number | null
    gddDaily?: FloatFilter<"FieldDailyMetrics"> | number
    accumulatedGdd?: FloatFilter<"FieldDailyMetrics"> | number
    chillingHoursToday?: FloatFilter<"FieldDailyMetrics"> | number
    accumulatedChilling?: FloatFilter<"FieldDailyMetrics"> | number
    bioFixReached?: BoolFilter<"FieldDailyMetrics"> | boolean
    currentStage?: StringNullableFilter<"FieldDailyMetrics"> | string | null
    gddToNextStage?: FloatNullableFilter<"FieldDailyMetrics"> | number | null
    createdAt?: DateTimeFilter<"FieldDailyMetrics"> | Date | string
  }

  export type FieldSeasonSummaryUpsertWithWhereUniqueWithoutFieldInput = {
    where: FieldSeasonSummaryWhereUniqueInput
    update: XOR<FieldSeasonSummaryUpdateWithoutFieldInput, FieldSeasonSummaryUncheckedUpdateWithoutFieldInput>
    create: XOR<FieldSeasonSummaryCreateWithoutFieldInput, FieldSeasonSummaryUncheckedCreateWithoutFieldInput>
  }

  export type FieldSeasonSummaryUpdateWithWhereUniqueWithoutFieldInput = {
    where: FieldSeasonSummaryWhereUniqueInput
    data: XOR<FieldSeasonSummaryUpdateWithoutFieldInput, FieldSeasonSummaryUncheckedUpdateWithoutFieldInput>
  }

  export type FieldSeasonSummaryUpdateManyWithWhereWithoutFieldInput = {
    where: FieldSeasonSummaryScalarWhereInput
    data: XOR<FieldSeasonSummaryUpdateManyMutationInput, FieldSeasonSummaryUncheckedUpdateManyWithoutFieldInput>
  }

  export type FieldSeasonSummaryScalarWhereInput = {
    AND?: FieldSeasonSummaryScalarWhereInput | FieldSeasonSummaryScalarWhereInput[]
    OR?: FieldSeasonSummaryScalarWhereInput[]
    NOT?: FieldSeasonSummaryScalarWhereInput | FieldSeasonSummaryScalarWhereInput[]
    id?: StringFilter<"FieldSeasonSummary"> | string
    fieldId?: StringFilter<"FieldSeasonSummary"> | string
    season?: IntFilter<"FieldSeasonSummary"> | number
    currentStage?: StringNullableFilter<"FieldSeasonSummary"> | string | null
    accumulatedGdd?: FloatFilter<"FieldSeasonSummary"> | number
    accumulatedChilling?: FloatFilter<"FieldSeasonSummary"> | number
    bioFixReached?: BoolFilter<"FieldSeasonSummary"> | boolean
    bioFixDate?: DateTimeNullableFilter<"FieldSeasonSummary"> | Date | string | null
    gddToNextStage?: FloatNullableFilter<"FieldSeasonSummary"> | number | null
    daysInCurrentStage?: IntFilter<"FieldSeasonSummary"> | number
    lastUpdated?: DateTimeFilter<"FieldSeasonSummary"> | Date | string
    predictedFloweringDate?: DateTimeNullableFilter<"FieldSeasonSummary"> | Date | string | null
    predictedHarvestDate?: DateTimeNullableFilter<"FieldSeasonSummary"> | Date | string | null
    totalPrecipitation?: FloatFilter<"FieldSeasonSummary"> | number
    avgTemperature?: FloatNullableFilter<"FieldSeasonSummary"> | number | null
    createdAt?: DateTimeFilter<"FieldSeasonSummary"> | Date | string
    updatedAt?: DateTimeFilter<"FieldSeasonSummary"> | Date | string
  }

  export type IrrigationConfigUpsertWithoutFieldInput = {
    update: XOR<IrrigationConfigUpdateWithoutFieldInput, IrrigationConfigUncheckedUpdateWithoutFieldInput>
    create: XOR<IrrigationConfigCreateWithoutFieldInput, IrrigationConfigUncheckedCreateWithoutFieldInput>
    where?: IrrigationConfigWhereInput
  }

  export type IrrigationConfigUpdateToOneWithWhereWithoutFieldInput = {
    where?: IrrigationConfigWhereInput
    data: XOR<IrrigationConfigUpdateWithoutFieldInput, IrrigationConfigUncheckedUpdateWithoutFieldInput>
  }

  export type IrrigationConfigUpdateWithoutFieldInput = {
    id?: StringFieldUpdateOperationsInput | string
    dripperFlowRate?: FloatFieldUpdateOperationsInput | number
    drippersPerTree?: IntFieldUpdateOperationsInput | number
    treeDensity?: IntFieldUpdateOperationsInput | number
    efficiency?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IrrigationConfigUncheckedUpdateWithoutFieldInput = {
    id?: StringFieldUpdateOperationsInput | string
    dripperFlowRate?: FloatFieldUpdateOperationsInput | number
    drippersPerTree?: IntFieldUpdateOperationsInput | number
    treeDensity?: IntFieldUpdateOperationsInput | number
    efficiency?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SoilAnalysisUpsertWithWhereUniqueWithoutFieldInput = {
    where: SoilAnalysisWhereUniqueInput
    update: XOR<SoilAnalysisUpdateWithoutFieldInput, SoilAnalysisUncheckedUpdateWithoutFieldInput>
    create: XOR<SoilAnalysisCreateWithoutFieldInput, SoilAnalysisUncheckedCreateWithoutFieldInput>
  }

  export type SoilAnalysisUpdateWithWhereUniqueWithoutFieldInput = {
    where: SoilAnalysisWhereUniqueInput
    data: XOR<SoilAnalysisUpdateWithoutFieldInput, SoilAnalysisUncheckedUpdateWithoutFieldInput>
  }

  export type SoilAnalysisUpdateManyWithWhereWithoutFieldInput = {
    where: SoilAnalysisScalarWhereInput
    data: XOR<SoilAnalysisUpdateManyMutationInput, SoilAnalysisUncheckedUpdateManyWithoutFieldInput>
  }

  export type SoilAnalysisScalarWhereInput = {
    AND?: SoilAnalysisScalarWhereInput | SoilAnalysisScalarWhereInput[]
    OR?: SoilAnalysisScalarWhereInput[]
    NOT?: SoilAnalysisScalarWhereInput | SoilAnalysisScalarWhereInput[]
    id?: StringFilter<"SoilAnalysis"> | string
    fieldId?: StringFilter<"SoilAnalysis"> | string
    analysisDate?: DateTimeFilter<"SoilAnalysis"> | Date | string
    ph?: FloatNullableFilter<"SoilAnalysis"> | number | null
    organicMatter?: FloatNullableFilter<"SoilAnalysis"> | number | null
    nitrogen?: FloatNullableFilter<"SoilAnalysis"> | number | null
    phosphorus?: FloatNullableFilter<"SoilAnalysis"> | number | null
    potassium?: FloatNullableFilter<"SoilAnalysis"> | number | null
    createdAt?: DateTimeFilter<"SoilAnalysis"> | Date | string
    updatedAt?: DateTimeFilter<"SoilAnalysis"> | Date | string
  }

  export type YieldConfigUpsertWithoutFieldInput = {
    update: XOR<YieldConfigUpdateWithoutFieldInput, YieldConfigUncheckedUpdateWithoutFieldInput>
    create: XOR<YieldConfigCreateWithoutFieldInput, YieldConfigUncheckedCreateWithoutFieldInput>
    where?: YieldConfigWhereInput
  }

  export type YieldConfigUpdateToOneWithWhereWithoutFieldInput = {
    where?: YieldConfigWhereInput
    data: XOR<YieldConfigUpdateWithoutFieldInput, YieldConfigUncheckedUpdateWithoutFieldInput>
  }

  export type YieldConfigUpdateWithoutFieldInput = {
    id?: StringFieldUpdateOperationsInput | string
    targetYield?: FloatFieldUpdateOperationsInput | number
    bearingStatus?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type YieldConfigUncheckedUpdateWithoutFieldInput = {
    id?: StringFieldUpdateOperationsInput | string
    targetYield?: FloatFieldUpdateOperationsInput | number
    bearingStatus?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FieldCreateWithoutOperationsInput = {
    id?: string
    name: string
    geoPolygon: JsonNullValueInput | InputJsonValue
    area: number
    cropType?: string
    equipmentConfig?: NullableJsonNullValueInput | InputJsonValue
    soilMetadata?: NullableJsonNullValueInput | InputJsonValue
    plantingDate?: Date | string | null
    agronomicData?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    farm: FarmCreateNestedOneWithoutFieldsInput
    dailyMetrics?: FieldDailyMetricsCreateNestedManyWithoutFieldInput
    seasonSummary?: FieldSeasonSummaryCreateNestedManyWithoutFieldInput
    irrigationConfig?: IrrigationConfigCreateNestedOneWithoutFieldInput
    soilAnalysis?: SoilAnalysisCreateNestedManyWithoutFieldInput
    yieldConfig?: YieldConfigCreateNestedOneWithoutFieldInput
  }

  export type FieldUncheckedCreateWithoutOperationsInput = {
    id?: string
    name: string
    farmId: string
    geoPolygon: JsonNullValueInput | InputJsonValue
    area: number
    cropType?: string
    equipmentConfig?: NullableJsonNullValueInput | InputJsonValue
    soilMetadata?: NullableJsonNullValueInput | InputJsonValue
    plantingDate?: Date | string | null
    agronomicData?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    dailyMetrics?: FieldDailyMetricsUncheckedCreateNestedManyWithoutFieldInput
    seasonSummary?: FieldSeasonSummaryUncheckedCreateNestedManyWithoutFieldInput
    irrigationConfig?: IrrigationConfigUncheckedCreateNestedOneWithoutFieldInput
    soilAnalysis?: SoilAnalysisUncheckedCreateNestedManyWithoutFieldInput
    yieldConfig?: YieldConfigUncheckedCreateNestedOneWithoutFieldInput
  }

  export type FieldCreateOrConnectWithoutOperationsInput = {
    where: FieldWhereUniqueInput
    create: XOR<FieldCreateWithoutOperationsInput, FieldUncheckedCreateWithoutOperationsInput>
  }

  export type FieldUpsertWithoutOperationsInput = {
    update: XOR<FieldUpdateWithoutOperationsInput, FieldUncheckedUpdateWithoutOperationsInput>
    create: XOR<FieldCreateWithoutOperationsInput, FieldUncheckedCreateWithoutOperationsInput>
    where?: FieldWhereInput
  }

  export type FieldUpdateToOneWithWhereWithoutOperationsInput = {
    where?: FieldWhereInput
    data: XOR<FieldUpdateWithoutOperationsInput, FieldUncheckedUpdateWithoutOperationsInput>
  }

  export type FieldUpdateWithoutOperationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    geoPolygon?: JsonNullValueInput | InputJsonValue
    area?: FloatFieldUpdateOperationsInput | number
    cropType?: StringFieldUpdateOperationsInput | string
    equipmentConfig?: NullableJsonNullValueInput | InputJsonValue
    soilMetadata?: NullableJsonNullValueInput | InputJsonValue
    plantingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    agronomicData?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    farm?: FarmUpdateOneRequiredWithoutFieldsNestedInput
    dailyMetrics?: FieldDailyMetricsUpdateManyWithoutFieldNestedInput
    seasonSummary?: FieldSeasonSummaryUpdateManyWithoutFieldNestedInput
    irrigationConfig?: IrrigationConfigUpdateOneWithoutFieldNestedInput
    soilAnalysis?: SoilAnalysisUpdateManyWithoutFieldNestedInput
    yieldConfig?: YieldConfigUpdateOneWithoutFieldNestedInput
  }

  export type FieldUncheckedUpdateWithoutOperationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    farmId?: StringFieldUpdateOperationsInput | string
    geoPolygon?: JsonNullValueInput | InputJsonValue
    area?: FloatFieldUpdateOperationsInput | number
    cropType?: StringFieldUpdateOperationsInput | string
    equipmentConfig?: NullableJsonNullValueInput | InputJsonValue
    soilMetadata?: NullableJsonNullValueInput | InputJsonValue
    plantingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    agronomicData?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dailyMetrics?: FieldDailyMetricsUncheckedUpdateManyWithoutFieldNestedInput
    seasonSummary?: FieldSeasonSummaryUncheckedUpdateManyWithoutFieldNestedInput
    irrigationConfig?: IrrigationConfigUncheckedUpdateOneWithoutFieldNestedInput
    soilAnalysis?: SoilAnalysisUncheckedUpdateManyWithoutFieldNestedInput
    yieldConfig?: YieldConfigUncheckedUpdateOneWithoutFieldNestedInput
  }

  export type FieldCreateWithoutDailyMetricsInput = {
    id?: string
    name: string
    geoPolygon: JsonNullValueInput | InputJsonValue
    area: number
    cropType?: string
    equipmentConfig?: NullableJsonNullValueInput | InputJsonValue
    soilMetadata?: NullableJsonNullValueInput | InputJsonValue
    plantingDate?: Date | string | null
    agronomicData?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    farm: FarmCreateNestedOneWithoutFieldsInput
    operations?: OperationCreateNestedManyWithoutFieldInput
    seasonSummary?: FieldSeasonSummaryCreateNestedManyWithoutFieldInput
    irrigationConfig?: IrrigationConfigCreateNestedOneWithoutFieldInput
    soilAnalysis?: SoilAnalysisCreateNestedManyWithoutFieldInput
    yieldConfig?: YieldConfigCreateNestedOneWithoutFieldInput
  }

  export type FieldUncheckedCreateWithoutDailyMetricsInput = {
    id?: string
    name: string
    farmId: string
    geoPolygon: JsonNullValueInput | InputJsonValue
    area: number
    cropType?: string
    equipmentConfig?: NullableJsonNullValueInput | InputJsonValue
    soilMetadata?: NullableJsonNullValueInput | InputJsonValue
    plantingDate?: Date | string | null
    agronomicData?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    operations?: OperationUncheckedCreateNestedManyWithoutFieldInput
    seasonSummary?: FieldSeasonSummaryUncheckedCreateNestedManyWithoutFieldInput
    irrigationConfig?: IrrigationConfigUncheckedCreateNestedOneWithoutFieldInput
    soilAnalysis?: SoilAnalysisUncheckedCreateNestedManyWithoutFieldInput
    yieldConfig?: YieldConfigUncheckedCreateNestedOneWithoutFieldInput
  }

  export type FieldCreateOrConnectWithoutDailyMetricsInput = {
    where: FieldWhereUniqueInput
    create: XOR<FieldCreateWithoutDailyMetricsInput, FieldUncheckedCreateWithoutDailyMetricsInput>
  }

  export type FieldUpsertWithoutDailyMetricsInput = {
    update: XOR<FieldUpdateWithoutDailyMetricsInput, FieldUncheckedUpdateWithoutDailyMetricsInput>
    create: XOR<FieldCreateWithoutDailyMetricsInput, FieldUncheckedCreateWithoutDailyMetricsInput>
    where?: FieldWhereInput
  }

  export type FieldUpdateToOneWithWhereWithoutDailyMetricsInput = {
    where?: FieldWhereInput
    data: XOR<FieldUpdateWithoutDailyMetricsInput, FieldUncheckedUpdateWithoutDailyMetricsInput>
  }

  export type FieldUpdateWithoutDailyMetricsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    geoPolygon?: JsonNullValueInput | InputJsonValue
    area?: FloatFieldUpdateOperationsInput | number
    cropType?: StringFieldUpdateOperationsInput | string
    equipmentConfig?: NullableJsonNullValueInput | InputJsonValue
    soilMetadata?: NullableJsonNullValueInput | InputJsonValue
    plantingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    agronomicData?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    farm?: FarmUpdateOneRequiredWithoutFieldsNestedInput
    operations?: OperationUpdateManyWithoutFieldNestedInput
    seasonSummary?: FieldSeasonSummaryUpdateManyWithoutFieldNestedInput
    irrigationConfig?: IrrigationConfigUpdateOneWithoutFieldNestedInput
    soilAnalysis?: SoilAnalysisUpdateManyWithoutFieldNestedInput
    yieldConfig?: YieldConfigUpdateOneWithoutFieldNestedInput
  }

  export type FieldUncheckedUpdateWithoutDailyMetricsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    farmId?: StringFieldUpdateOperationsInput | string
    geoPolygon?: JsonNullValueInput | InputJsonValue
    area?: FloatFieldUpdateOperationsInput | number
    cropType?: StringFieldUpdateOperationsInput | string
    equipmentConfig?: NullableJsonNullValueInput | InputJsonValue
    soilMetadata?: NullableJsonNullValueInput | InputJsonValue
    plantingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    agronomicData?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    operations?: OperationUncheckedUpdateManyWithoutFieldNestedInput
    seasonSummary?: FieldSeasonSummaryUncheckedUpdateManyWithoutFieldNestedInput
    irrigationConfig?: IrrigationConfigUncheckedUpdateOneWithoutFieldNestedInput
    soilAnalysis?: SoilAnalysisUncheckedUpdateManyWithoutFieldNestedInput
    yieldConfig?: YieldConfigUncheckedUpdateOneWithoutFieldNestedInput
  }

  export type FieldCreateWithoutSeasonSummaryInput = {
    id?: string
    name: string
    geoPolygon: JsonNullValueInput | InputJsonValue
    area: number
    cropType?: string
    equipmentConfig?: NullableJsonNullValueInput | InputJsonValue
    soilMetadata?: NullableJsonNullValueInput | InputJsonValue
    plantingDate?: Date | string | null
    agronomicData?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    farm: FarmCreateNestedOneWithoutFieldsInput
    operations?: OperationCreateNestedManyWithoutFieldInput
    dailyMetrics?: FieldDailyMetricsCreateNestedManyWithoutFieldInput
    irrigationConfig?: IrrigationConfigCreateNestedOneWithoutFieldInput
    soilAnalysis?: SoilAnalysisCreateNestedManyWithoutFieldInput
    yieldConfig?: YieldConfigCreateNestedOneWithoutFieldInput
  }

  export type FieldUncheckedCreateWithoutSeasonSummaryInput = {
    id?: string
    name: string
    farmId: string
    geoPolygon: JsonNullValueInput | InputJsonValue
    area: number
    cropType?: string
    equipmentConfig?: NullableJsonNullValueInput | InputJsonValue
    soilMetadata?: NullableJsonNullValueInput | InputJsonValue
    plantingDate?: Date | string | null
    agronomicData?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    operations?: OperationUncheckedCreateNestedManyWithoutFieldInput
    dailyMetrics?: FieldDailyMetricsUncheckedCreateNestedManyWithoutFieldInput
    irrigationConfig?: IrrigationConfigUncheckedCreateNestedOneWithoutFieldInput
    soilAnalysis?: SoilAnalysisUncheckedCreateNestedManyWithoutFieldInput
    yieldConfig?: YieldConfigUncheckedCreateNestedOneWithoutFieldInput
  }

  export type FieldCreateOrConnectWithoutSeasonSummaryInput = {
    where: FieldWhereUniqueInput
    create: XOR<FieldCreateWithoutSeasonSummaryInput, FieldUncheckedCreateWithoutSeasonSummaryInput>
  }

  export type FieldUpsertWithoutSeasonSummaryInput = {
    update: XOR<FieldUpdateWithoutSeasonSummaryInput, FieldUncheckedUpdateWithoutSeasonSummaryInput>
    create: XOR<FieldCreateWithoutSeasonSummaryInput, FieldUncheckedCreateWithoutSeasonSummaryInput>
    where?: FieldWhereInput
  }

  export type FieldUpdateToOneWithWhereWithoutSeasonSummaryInput = {
    where?: FieldWhereInput
    data: XOR<FieldUpdateWithoutSeasonSummaryInput, FieldUncheckedUpdateWithoutSeasonSummaryInput>
  }

  export type FieldUpdateWithoutSeasonSummaryInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    geoPolygon?: JsonNullValueInput | InputJsonValue
    area?: FloatFieldUpdateOperationsInput | number
    cropType?: StringFieldUpdateOperationsInput | string
    equipmentConfig?: NullableJsonNullValueInput | InputJsonValue
    soilMetadata?: NullableJsonNullValueInput | InputJsonValue
    plantingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    agronomicData?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    farm?: FarmUpdateOneRequiredWithoutFieldsNestedInput
    operations?: OperationUpdateManyWithoutFieldNestedInput
    dailyMetrics?: FieldDailyMetricsUpdateManyWithoutFieldNestedInput
    irrigationConfig?: IrrigationConfigUpdateOneWithoutFieldNestedInput
    soilAnalysis?: SoilAnalysisUpdateManyWithoutFieldNestedInput
    yieldConfig?: YieldConfigUpdateOneWithoutFieldNestedInput
  }

  export type FieldUncheckedUpdateWithoutSeasonSummaryInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    farmId?: StringFieldUpdateOperationsInput | string
    geoPolygon?: JsonNullValueInput | InputJsonValue
    area?: FloatFieldUpdateOperationsInput | number
    cropType?: StringFieldUpdateOperationsInput | string
    equipmentConfig?: NullableJsonNullValueInput | InputJsonValue
    soilMetadata?: NullableJsonNullValueInput | InputJsonValue
    plantingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    agronomicData?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    operations?: OperationUncheckedUpdateManyWithoutFieldNestedInput
    dailyMetrics?: FieldDailyMetricsUncheckedUpdateManyWithoutFieldNestedInput
    irrigationConfig?: IrrigationConfigUncheckedUpdateOneWithoutFieldNestedInput
    soilAnalysis?: SoilAnalysisUncheckedUpdateManyWithoutFieldNestedInput
    yieldConfig?: YieldConfigUncheckedUpdateOneWithoutFieldNestedInput
  }

  export type FieldCreateWithoutIrrigationConfigInput = {
    id?: string
    name: string
    geoPolygon: JsonNullValueInput | InputJsonValue
    area: number
    cropType?: string
    equipmentConfig?: NullableJsonNullValueInput | InputJsonValue
    soilMetadata?: NullableJsonNullValueInput | InputJsonValue
    plantingDate?: Date | string | null
    agronomicData?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    farm: FarmCreateNestedOneWithoutFieldsInput
    operations?: OperationCreateNestedManyWithoutFieldInput
    dailyMetrics?: FieldDailyMetricsCreateNestedManyWithoutFieldInput
    seasonSummary?: FieldSeasonSummaryCreateNestedManyWithoutFieldInput
    soilAnalysis?: SoilAnalysisCreateNestedManyWithoutFieldInput
    yieldConfig?: YieldConfigCreateNestedOneWithoutFieldInput
  }

  export type FieldUncheckedCreateWithoutIrrigationConfigInput = {
    id?: string
    name: string
    farmId: string
    geoPolygon: JsonNullValueInput | InputJsonValue
    area: number
    cropType?: string
    equipmentConfig?: NullableJsonNullValueInput | InputJsonValue
    soilMetadata?: NullableJsonNullValueInput | InputJsonValue
    plantingDate?: Date | string | null
    agronomicData?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    operations?: OperationUncheckedCreateNestedManyWithoutFieldInput
    dailyMetrics?: FieldDailyMetricsUncheckedCreateNestedManyWithoutFieldInput
    seasonSummary?: FieldSeasonSummaryUncheckedCreateNestedManyWithoutFieldInput
    soilAnalysis?: SoilAnalysisUncheckedCreateNestedManyWithoutFieldInput
    yieldConfig?: YieldConfigUncheckedCreateNestedOneWithoutFieldInput
  }

  export type FieldCreateOrConnectWithoutIrrigationConfigInput = {
    where: FieldWhereUniqueInput
    create: XOR<FieldCreateWithoutIrrigationConfigInput, FieldUncheckedCreateWithoutIrrigationConfigInput>
  }

  export type FieldUpsertWithoutIrrigationConfigInput = {
    update: XOR<FieldUpdateWithoutIrrigationConfigInput, FieldUncheckedUpdateWithoutIrrigationConfigInput>
    create: XOR<FieldCreateWithoutIrrigationConfigInput, FieldUncheckedCreateWithoutIrrigationConfigInput>
    where?: FieldWhereInput
  }

  export type FieldUpdateToOneWithWhereWithoutIrrigationConfigInput = {
    where?: FieldWhereInput
    data: XOR<FieldUpdateWithoutIrrigationConfigInput, FieldUncheckedUpdateWithoutIrrigationConfigInput>
  }

  export type FieldUpdateWithoutIrrigationConfigInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    geoPolygon?: JsonNullValueInput | InputJsonValue
    area?: FloatFieldUpdateOperationsInput | number
    cropType?: StringFieldUpdateOperationsInput | string
    equipmentConfig?: NullableJsonNullValueInput | InputJsonValue
    soilMetadata?: NullableJsonNullValueInput | InputJsonValue
    plantingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    agronomicData?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    farm?: FarmUpdateOneRequiredWithoutFieldsNestedInput
    operations?: OperationUpdateManyWithoutFieldNestedInput
    dailyMetrics?: FieldDailyMetricsUpdateManyWithoutFieldNestedInput
    seasonSummary?: FieldSeasonSummaryUpdateManyWithoutFieldNestedInput
    soilAnalysis?: SoilAnalysisUpdateManyWithoutFieldNestedInput
    yieldConfig?: YieldConfigUpdateOneWithoutFieldNestedInput
  }

  export type FieldUncheckedUpdateWithoutIrrigationConfigInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    farmId?: StringFieldUpdateOperationsInput | string
    geoPolygon?: JsonNullValueInput | InputJsonValue
    area?: FloatFieldUpdateOperationsInput | number
    cropType?: StringFieldUpdateOperationsInput | string
    equipmentConfig?: NullableJsonNullValueInput | InputJsonValue
    soilMetadata?: NullableJsonNullValueInput | InputJsonValue
    plantingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    agronomicData?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    operations?: OperationUncheckedUpdateManyWithoutFieldNestedInput
    dailyMetrics?: FieldDailyMetricsUncheckedUpdateManyWithoutFieldNestedInput
    seasonSummary?: FieldSeasonSummaryUncheckedUpdateManyWithoutFieldNestedInput
    soilAnalysis?: SoilAnalysisUncheckedUpdateManyWithoutFieldNestedInput
    yieldConfig?: YieldConfigUncheckedUpdateOneWithoutFieldNestedInput
  }

  export type FieldCreateWithoutSoilAnalysisInput = {
    id?: string
    name: string
    geoPolygon: JsonNullValueInput | InputJsonValue
    area: number
    cropType?: string
    equipmentConfig?: NullableJsonNullValueInput | InputJsonValue
    soilMetadata?: NullableJsonNullValueInput | InputJsonValue
    plantingDate?: Date | string | null
    agronomicData?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    farm: FarmCreateNestedOneWithoutFieldsInput
    operations?: OperationCreateNestedManyWithoutFieldInput
    dailyMetrics?: FieldDailyMetricsCreateNestedManyWithoutFieldInput
    seasonSummary?: FieldSeasonSummaryCreateNestedManyWithoutFieldInput
    irrigationConfig?: IrrigationConfigCreateNestedOneWithoutFieldInput
    yieldConfig?: YieldConfigCreateNestedOneWithoutFieldInput
  }

  export type FieldUncheckedCreateWithoutSoilAnalysisInput = {
    id?: string
    name: string
    farmId: string
    geoPolygon: JsonNullValueInput | InputJsonValue
    area: number
    cropType?: string
    equipmentConfig?: NullableJsonNullValueInput | InputJsonValue
    soilMetadata?: NullableJsonNullValueInput | InputJsonValue
    plantingDate?: Date | string | null
    agronomicData?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    operations?: OperationUncheckedCreateNestedManyWithoutFieldInput
    dailyMetrics?: FieldDailyMetricsUncheckedCreateNestedManyWithoutFieldInput
    seasonSummary?: FieldSeasonSummaryUncheckedCreateNestedManyWithoutFieldInput
    irrigationConfig?: IrrigationConfigUncheckedCreateNestedOneWithoutFieldInput
    yieldConfig?: YieldConfigUncheckedCreateNestedOneWithoutFieldInput
  }

  export type FieldCreateOrConnectWithoutSoilAnalysisInput = {
    where: FieldWhereUniqueInput
    create: XOR<FieldCreateWithoutSoilAnalysisInput, FieldUncheckedCreateWithoutSoilAnalysisInput>
  }

  export type FieldUpsertWithoutSoilAnalysisInput = {
    update: XOR<FieldUpdateWithoutSoilAnalysisInput, FieldUncheckedUpdateWithoutSoilAnalysisInput>
    create: XOR<FieldCreateWithoutSoilAnalysisInput, FieldUncheckedCreateWithoutSoilAnalysisInput>
    where?: FieldWhereInput
  }

  export type FieldUpdateToOneWithWhereWithoutSoilAnalysisInput = {
    where?: FieldWhereInput
    data: XOR<FieldUpdateWithoutSoilAnalysisInput, FieldUncheckedUpdateWithoutSoilAnalysisInput>
  }

  export type FieldUpdateWithoutSoilAnalysisInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    geoPolygon?: JsonNullValueInput | InputJsonValue
    area?: FloatFieldUpdateOperationsInput | number
    cropType?: StringFieldUpdateOperationsInput | string
    equipmentConfig?: NullableJsonNullValueInput | InputJsonValue
    soilMetadata?: NullableJsonNullValueInput | InputJsonValue
    plantingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    agronomicData?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    farm?: FarmUpdateOneRequiredWithoutFieldsNestedInput
    operations?: OperationUpdateManyWithoutFieldNestedInput
    dailyMetrics?: FieldDailyMetricsUpdateManyWithoutFieldNestedInput
    seasonSummary?: FieldSeasonSummaryUpdateManyWithoutFieldNestedInput
    irrigationConfig?: IrrigationConfigUpdateOneWithoutFieldNestedInput
    yieldConfig?: YieldConfigUpdateOneWithoutFieldNestedInput
  }

  export type FieldUncheckedUpdateWithoutSoilAnalysisInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    farmId?: StringFieldUpdateOperationsInput | string
    geoPolygon?: JsonNullValueInput | InputJsonValue
    area?: FloatFieldUpdateOperationsInput | number
    cropType?: StringFieldUpdateOperationsInput | string
    equipmentConfig?: NullableJsonNullValueInput | InputJsonValue
    soilMetadata?: NullableJsonNullValueInput | InputJsonValue
    plantingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    agronomicData?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    operations?: OperationUncheckedUpdateManyWithoutFieldNestedInput
    dailyMetrics?: FieldDailyMetricsUncheckedUpdateManyWithoutFieldNestedInput
    seasonSummary?: FieldSeasonSummaryUncheckedUpdateManyWithoutFieldNestedInput
    irrigationConfig?: IrrigationConfigUncheckedUpdateOneWithoutFieldNestedInput
    yieldConfig?: YieldConfigUncheckedUpdateOneWithoutFieldNestedInput
  }

  export type FieldCreateWithoutYieldConfigInput = {
    id?: string
    name: string
    geoPolygon: JsonNullValueInput | InputJsonValue
    area: number
    cropType?: string
    equipmentConfig?: NullableJsonNullValueInput | InputJsonValue
    soilMetadata?: NullableJsonNullValueInput | InputJsonValue
    plantingDate?: Date | string | null
    agronomicData?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    farm: FarmCreateNestedOneWithoutFieldsInput
    operations?: OperationCreateNestedManyWithoutFieldInput
    dailyMetrics?: FieldDailyMetricsCreateNestedManyWithoutFieldInput
    seasonSummary?: FieldSeasonSummaryCreateNestedManyWithoutFieldInput
    irrigationConfig?: IrrigationConfigCreateNestedOneWithoutFieldInput
    soilAnalysis?: SoilAnalysisCreateNestedManyWithoutFieldInput
  }

  export type FieldUncheckedCreateWithoutYieldConfigInput = {
    id?: string
    name: string
    farmId: string
    geoPolygon: JsonNullValueInput | InputJsonValue
    area: number
    cropType?: string
    equipmentConfig?: NullableJsonNullValueInput | InputJsonValue
    soilMetadata?: NullableJsonNullValueInput | InputJsonValue
    plantingDate?: Date | string | null
    agronomicData?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    operations?: OperationUncheckedCreateNestedManyWithoutFieldInput
    dailyMetrics?: FieldDailyMetricsUncheckedCreateNestedManyWithoutFieldInput
    seasonSummary?: FieldSeasonSummaryUncheckedCreateNestedManyWithoutFieldInput
    irrigationConfig?: IrrigationConfigUncheckedCreateNestedOneWithoutFieldInput
    soilAnalysis?: SoilAnalysisUncheckedCreateNestedManyWithoutFieldInput
  }

  export type FieldCreateOrConnectWithoutYieldConfigInput = {
    where: FieldWhereUniqueInput
    create: XOR<FieldCreateWithoutYieldConfigInput, FieldUncheckedCreateWithoutYieldConfigInput>
  }

  export type FieldUpsertWithoutYieldConfigInput = {
    update: XOR<FieldUpdateWithoutYieldConfigInput, FieldUncheckedUpdateWithoutYieldConfigInput>
    create: XOR<FieldCreateWithoutYieldConfigInput, FieldUncheckedCreateWithoutYieldConfigInput>
    where?: FieldWhereInput
  }

  export type FieldUpdateToOneWithWhereWithoutYieldConfigInput = {
    where?: FieldWhereInput
    data: XOR<FieldUpdateWithoutYieldConfigInput, FieldUncheckedUpdateWithoutYieldConfigInput>
  }

  export type FieldUpdateWithoutYieldConfigInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    geoPolygon?: JsonNullValueInput | InputJsonValue
    area?: FloatFieldUpdateOperationsInput | number
    cropType?: StringFieldUpdateOperationsInput | string
    equipmentConfig?: NullableJsonNullValueInput | InputJsonValue
    soilMetadata?: NullableJsonNullValueInput | InputJsonValue
    plantingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    agronomicData?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    farm?: FarmUpdateOneRequiredWithoutFieldsNestedInput
    operations?: OperationUpdateManyWithoutFieldNestedInput
    dailyMetrics?: FieldDailyMetricsUpdateManyWithoutFieldNestedInput
    seasonSummary?: FieldSeasonSummaryUpdateManyWithoutFieldNestedInput
    irrigationConfig?: IrrigationConfigUpdateOneWithoutFieldNestedInput
    soilAnalysis?: SoilAnalysisUpdateManyWithoutFieldNestedInput
  }

  export type FieldUncheckedUpdateWithoutYieldConfigInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    farmId?: StringFieldUpdateOperationsInput | string
    geoPolygon?: JsonNullValueInput | InputJsonValue
    area?: FloatFieldUpdateOperationsInput | number
    cropType?: StringFieldUpdateOperationsInput | string
    equipmentConfig?: NullableJsonNullValueInput | InputJsonValue
    soilMetadata?: NullableJsonNullValueInput | InputJsonValue
    plantingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    agronomicData?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    operations?: OperationUncheckedUpdateManyWithoutFieldNestedInput
    dailyMetrics?: FieldDailyMetricsUncheckedUpdateManyWithoutFieldNestedInput
    seasonSummary?: FieldSeasonSummaryUncheckedUpdateManyWithoutFieldNestedInput
    irrigationConfig?: IrrigationConfigUncheckedUpdateOneWithoutFieldNestedInput
    soilAnalysis?: SoilAnalysisUncheckedUpdateManyWithoutFieldNestedInput
  }

  export type FarmCreateManyUserInput = {
    id?: string
    name: string
    createdAt?: Date | string
  }

  export type FarmUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fields?: FieldUpdateManyWithoutFarmNestedInput
  }

  export type FarmUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fields?: FieldUncheckedUpdateManyWithoutFarmNestedInput
  }

  export type FarmUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FieldCreateManyFarmInput = {
    id?: string
    name: string
    geoPolygon: JsonNullValueInput | InputJsonValue
    area: number
    cropType?: string
    equipmentConfig?: NullableJsonNullValueInput | InputJsonValue
    soilMetadata?: NullableJsonNullValueInput | InputJsonValue
    plantingDate?: Date | string | null
    agronomicData?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type FieldUpdateWithoutFarmInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    geoPolygon?: JsonNullValueInput | InputJsonValue
    area?: FloatFieldUpdateOperationsInput | number
    cropType?: StringFieldUpdateOperationsInput | string
    equipmentConfig?: NullableJsonNullValueInput | InputJsonValue
    soilMetadata?: NullableJsonNullValueInput | InputJsonValue
    plantingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    agronomicData?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    operations?: OperationUpdateManyWithoutFieldNestedInput
    dailyMetrics?: FieldDailyMetricsUpdateManyWithoutFieldNestedInput
    seasonSummary?: FieldSeasonSummaryUpdateManyWithoutFieldNestedInput
    irrigationConfig?: IrrigationConfigUpdateOneWithoutFieldNestedInput
    soilAnalysis?: SoilAnalysisUpdateManyWithoutFieldNestedInput
    yieldConfig?: YieldConfigUpdateOneWithoutFieldNestedInput
  }

  export type FieldUncheckedUpdateWithoutFarmInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    geoPolygon?: JsonNullValueInput | InputJsonValue
    area?: FloatFieldUpdateOperationsInput | number
    cropType?: StringFieldUpdateOperationsInput | string
    equipmentConfig?: NullableJsonNullValueInput | InputJsonValue
    soilMetadata?: NullableJsonNullValueInput | InputJsonValue
    plantingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    agronomicData?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    operations?: OperationUncheckedUpdateManyWithoutFieldNestedInput
    dailyMetrics?: FieldDailyMetricsUncheckedUpdateManyWithoutFieldNestedInput
    seasonSummary?: FieldSeasonSummaryUncheckedUpdateManyWithoutFieldNestedInput
    irrigationConfig?: IrrigationConfigUncheckedUpdateOneWithoutFieldNestedInput
    soilAnalysis?: SoilAnalysisUncheckedUpdateManyWithoutFieldNestedInput
    yieldConfig?: YieldConfigUncheckedUpdateOneWithoutFieldNestedInput
  }

  export type FieldUncheckedUpdateManyWithoutFarmInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    geoPolygon?: JsonNullValueInput | InputJsonValue
    area?: FloatFieldUpdateOperationsInput | number
    cropType?: StringFieldUpdateOperationsInput | string
    equipmentConfig?: NullableJsonNullValueInput | InputJsonValue
    soilMetadata?: NullableJsonNullValueInput | InputJsonValue
    plantingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    agronomicData?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OperationCreateManyFieldInput = {
    id?: string
    type: string
    date?: Date | string
    metadata: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type FieldDailyMetricsCreateManyFieldInput = {
    id?: string
    date: Date | string
    season: number
    tmax: number
    tmin: number
    humidity?: number | null
    precipitation?: number | null
    gddDaily: number
    accumulatedGdd?: number
    chillingHoursToday?: number
    accumulatedChilling?: number
    bioFixReached?: boolean
    currentStage?: string | null
    gddToNextStage?: number | null
    createdAt?: Date | string
  }

  export type FieldSeasonSummaryCreateManyFieldInput = {
    id?: string
    season: number
    currentStage?: string | null
    accumulatedGdd?: number
    accumulatedChilling?: number
    bioFixReached?: boolean
    bioFixDate?: Date | string | null
    gddToNextStage?: number | null
    daysInCurrentStage?: number
    lastUpdated?: Date | string
    predictedFloweringDate?: Date | string | null
    predictedHarvestDate?: Date | string | null
    totalPrecipitation?: number
    avgTemperature?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SoilAnalysisCreateManyFieldInput = {
    id?: string
    analysisDate: Date | string
    ph?: number | null
    organicMatter?: number | null
    nitrogen?: number | null
    phosphorus?: number | null
    potassium?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OperationUpdateWithoutFieldInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OperationUncheckedUpdateWithoutFieldInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OperationUncheckedUpdateManyWithoutFieldInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FieldDailyMetricsUpdateWithoutFieldInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    season?: IntFieldUpdateOperationsInput | number
    tmax?: FloatFieldUpdateOperationsInput | number
    tmin?: FloatFieldUpdateOperationsInput | number
    humidity?: NullableFloatFieldUpdateOperationsInput | number | null
    precipitation?: NullableFloatFieldUpdateOperationsInput | number | null
    gddDaily?: FloatFieldUpdateOperationsInput | number
    accumulatedGdd?: FloatFieldUpdateOperationsInput | number
    chillingHoursToday?: FloatFieldUpdateOperationsInput | number
    accumulatedChilling?: FloatFieldUpdateOperationsInput | number
    bioFixReached?: BoolFieldUpdateOperationsInput | boolean
    currentStage?: NullableStringFieldUpdateOperationsInput | string | null
    gddToNextStage?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FieldDailyMetricsUncheckedUpdateWithoutFieldInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    season?: IntFieldUpdateOperationsInput | number
    tmax?: FloatFieldUpdateOperationsInput | number
    tmin?: FloatFieldUpdateOperationsInput | number
    humidity?: NullableFloatFieldUpdateOperationsInput | number | null
    precipitation?: NullableFloatFieldUpdateOperationsInput | number | null
    gddDaily?: FloatFieldUpdateOperationsInput | number
    accumulatedGdd?: FloatFieldUpdateOperationsInput | number
    chillingHoursToday?: FloatFieldUpdateOperationsInput | number
    accumulatedChilling?: FloatFieldUpdateOperationsInput | number
    bioFixReached?: BoolFieldUpdateOperationsInput | boolean
    currentStage?: NullableStringFieldUpdateOperationsInput | string | null
    gddToNextStage?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FieldDailyMetricsUncheckedUpdateManyWithoutFieldInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    season?: IntFieldUpdateOperationsInput | number
    tmax?: FloatFieldUpdateOperationsInput | number
    tmin?: FloatFieldUpdateOperationsInput | number
    humidity?: NullableFloatFieldUpdateOperationsInput | number | null
    precipitation?: NullableFloatFieldUpdateOperationsInput | number | null
    gddDaily?: FloatFieldUpdateOperationsInput | number
    accumulatedGdd?: FloatFieldUpdateOperationsInput | number
    chillingHoursToday?: FloatFieldUpdateOperationsInput | number
    accumulatedChilling?: FloatFieldUpdateOperationsInput | number
    bioFixReached?: BoolFieldUpdateOperationsInput | boolean
    currentStage?: NullableStringFieldUpdateOperationsInput | string | null
    gddToNextStage?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FieldSeasonSummaryUpdateWithoutFieldInput = {
    id?: StringFieldUpdateOperationsInput | string
    season?: IntFieldUpdateOperationsInput | number
    currentStage?: NullableStringFieldUpdateOperationsInput | string | null
    accumulatedGdd?: FloatFieldUpdateOperationsInput | number
    accumulatedChilling?: FloatFieldUpdateOperationsInput | number
    bioFixReached?: BoolFieldUpdateOperationsInput | boolean
    bioFixDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gddToNextStage?: NullableFloatFieldUpdateOperationsInput | number | null
    daysInCurrentStage?: IntFieldUpdateOperationsInput | number
    lastUpdated?: DateTimeFieldUpdateOperationsInput | Date | string
    predictedFloweringDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    predictedHarvestDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    totalPrecipitation?: FloatFieldUpdateOperationsInput | number
    avgTemperature?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FieldSeasonSummaryUncheckedUpdateWithoutFieldInput = {
    id?: StringFieldUpdateOperationsInput | string
    season?: IntFieldUpdateOperationsInput | number
    currentStage?: NullableStringFieldUpdateOperationsInput | string | null
    accumulatedGdd?: FloatFieldUpdateOperationsInput | number
    accumulatedChilling?: FloatFieldUpdateOperationsInput | number
    bioFixReached?: BoolFieldUpdateOperationsInput | boolean
    bioFixDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gddToNextStage?: NullableFloatFieldUpdateOperationsInput | number | null
    daysInCurrentStage?: IntFieldUpdateOperationsInput | number
    lastUpdated?: DateTimeFieldUpdateOperationsInput | Date | string
    predictedFloweringDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    predictedHarvestDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    totalPrecipitation?: FloatFieldUpdateOperationsInput | number
    avgTemperature?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FieldSeasonSummaryUncheckedUpdateManyWithoutFieldInput = {
    id?: StringFieldUpdateOperationsInput | string
    season?: IntFieldUpdateOperationsInput | number
    currentStage?: NullableStringFieldUpdateOperationsInput | string | null
    accumulatedGdd?: FloatFieldUpdateOperationsInput | number
    accumulatedChilling?: FloatFieldUpdateOperationsInput | number
    bioFixReached?: BoolFieldUpdateOperationsInput | boolean
    bioFixDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gddToNextStage?: NullableFloatFieldUpdateOperationsInput | number | null
    daysInCurrentStage?: IntFieldUpdateOperationsInput | number
    lastUpdated?: DateTimeFieldUpdateOperationsInput | Date | string
    predictedFloweringDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    predictedHarvestDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    totalPrecipitation?: FloatFieldUpdateOperationsInput | number
    avgTemperature?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SoilAnalysisUpdateWithoutFieldInput = {
    id?: StringFieldUpdateOperationsInput | string
    analysisDate?: DateTimeFieldUpdateOperationsInput | Date | string
    ph?: NullableFloatFieldUpdateOperationsInput | number | null
    organicMatter?: NullableFloatFieldUpdateOperationsInput | number | null
    nitrogen?: NullableFloatFieldUpdateOperationsInput | number | null
    phosphorus?: NullableFloatFieldUpdateOperationsInput | number | null
    potassium?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SoilAnalysisUncheckedUpdateWithoutFieldInput = {
    id?: StringFieldUpdateOperationsInput | string
    analysisDate?: DateTimeFieldUpdateOperationsInput | Date | string
    ph?: NullableFloatFieldUpdateOperationsInput | number | null
    organicMatter?: NullableFloatFieldUpdateOperationsInput | number | null
    nitrogen?: NullableFloatFieldUpdateOperationsInput | number | null
    phosphorus?: NullableFloatFieldUpdateOperationsInput | number | null
    potassium?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SoilAnalysisUncheckedUpdateManyWithoutFieldInput = {
    id?: StringFieldUpdateOperationsInput | string
    analysisDate?: DateTimeFieldUpdateOperationsInput | Date | string
    ph?: NullableFloatFieldUpdateOperationsInput | number | null
    organicMatter?: NullableFloatFieldUpdateOperationsInput | number | null
    nitrogen?: NullableFloatFieldUpdateOperationsInput | number | null
    phosphorus?: NullableFloatFieldUpdateOperationsInput | number | null
    potassium?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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