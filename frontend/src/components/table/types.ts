import type { ActionDispatch, ComponentType, ReactNode } from "react";

export type ValueKind = "string" | "number" | "boolean" | "date";

type TsFromKind<K extends ValueKind> =
  K extends "number" ? number :
  K extends "string" ? string :
  K extends "boolean" ? boolean :
  K extends "date" ? Date :
  never;

type ModelKey = string;

type ColumnOptions = {
  show?: boolean;
  filterable?: boolean;
  sortable?: boolean;
};

// Generic cell renderer (works for both keyed and accessor columns)
export type CellRenderer<V, R = unknown> = (ctx: {
  value: V;
  row: R;
  rowIndex: number;
}) => ReactNode;

// Or allow a component type too (devs can pass a React component)
export type CellComponent<V, R = unknown> = ComponentType<{ value: V; row: R; rowIndex: number }>;

export type ModelKeyedColumn<
  K extends ModelKey = ModelKey,
  VK extends ValueKind = ValueKind,
  R = unknown
> = {
  key: K;
  valueType: VK;
  title: string;
  options?: ColumnOptions;
  cell?: CellRenderer<TsFromKind<VK>, R>;
};

export type ModelColumn<R = unknown> = ModelKeyedColumn<ModelKey, ValueKind, R>;
export type ColumnModelDef<R = unknown> = readonly ModelKeyedColumn<ModelKey, ValueKind, R>[];

export type RowFromModel<M extends ColumnModelDef> = {
  [C in Extract<M[number], { key: ModelKey }> as C["key"]]: C extends { valueType: infer VK extends ValueKind }
  ? TsFromKind<VK>
  : never
};

export type SSTableFromModelProps<M extends ColumnModelDef> = {
  columnModel: M;
  data: readonly RowFromModel<M>[];
  state: State<M>,
  dispatch: ActionDispatch<[action: Action<M>]>
};

export type KeyedCols<M extends ColumnModelDef> = Extract<M[number], { key: string }>;
export type KeysOf<M extends ColumnModelDef> = KeyedCols<M>["key"];

export type BooleanCol<M extends ColumnModelDef> = Extract<KeyedCols<M>, { valueType: "boolean" }>;
export type NumberCol<M extends ColumnModelDef> = Extract<KeyedCols<M>, { valueType: "number" }>;
export type TextCol<M extends ColumnModelDef> = Extract<KeyedCols<M>, { valueType: "string" }>;
export type DateCol<M extends ColumnModelDef> = Extract<KeyedCols<M>, { valueType: "date" }>;

export type NumberOperators = "gt" | "gte" | "lt" | "lte" | "eq" | "ne";
export type DateOperators = NumberOperators | "range";

export type KindForKey<M extends ColumnModelDef, K extends KeysOf<M>> =
  Extract<KeyedCols<M>, { key: K }>["valueType"];
export type BooleanKeys<M extends ColumnModelDef> =
  Extract<KeyedCols<M>, { valueType: "boolean" }>["key"];

export type FilterForKey<M extends ColumnModelDef, K extends KeysOf<M>> =
  KindForKey<M, K> extends "number" | "date"
  ? { key: K; value: TsFromKind<KindForKey<M, K>>; operation: NumberOperators }
  : { key: K; value: TsFromKind<KindForKey<M, K>> };

export type DateOpDescriptor<M extends ColumnModelDef, K extends KeysOf<M>> =
  | {
    key: K;
    operation: Exclude<DateOperators, "range">;
    value: Date;
  }
  | {
    key: K;
    operation: "range";
    from: Date;
    to: Date;
  };

export type FilterDescriptor<M extends ColumnModelDef> = {
  [K in KeysOf<M>]:
  KindForKey<M, K> extends "number"
  ? {
    key: K;
    value: number;
    operation: NumberOperators;
  }
  : KindForKey<M, K> extends "date"
  ? DateOpDescriptor<M, K>
  : {
    key: K;
    value: TsFromKind<KindForKey<M, K>>;    // string | boolean, etc.
  }
}[KeysOf<M>];

export type SortDescriptor<M extends ColumnModelDef> = {
  [K in KeysOf<M>]: {
    by: K;
    order: 'asc' | 'desc'
  }
}[KeysOf<M>];

export type State<M extends ColumnModelDef> = {
  page?: number,
  pageSize?: number,
  sort?: SortDescriptor<M>,
  filters?: FilterDescriptor<M>[];
}

export type Action<M extends ColumnModelDef> =
  | { type: "setFilter"; filter: FilterDescriptor<M> }
  | { type: "removeFilter"; key: KeysOf<M> }
  | { type: "setSort"; sort: SortDescriptor<M> }
  | { type: "removeSort"; }
  | { type: "setPage"; page: number }
  | { type: "setPerPage"; perPage: number }
  | { type: "toggleColumn"; key: KeysOf<M>; show: boolean };