type ValueKind = "string" | "number" | "boolean" | "date";

type TsFromKind<K extends ValueKind> =
    K extends "number" ? number :
    K extends "string" ? string :
    K extends "boolean" ? boolean :
    K extends "date" ? Date : never;

type ModelKey = string;

type ColumnOptions = {
    show?: boolean;
    filterable?: boolean;
    sortable?: boolean;
};

type ModelKeyedColumn<K extends ModelKey, VK extends ValueKind> = {
    key: K;
    valueType: VK;
    title: string;
    options?: ColumnOptions;
};

export type ModelColumn = ModelKeyedColumn<ModelKey, ValueKind>;

export type ColumnModelDef = readonly ModelColumn[];

export type RowFromModel<M extends ColumnModelDef> = {
    [C in Extract<M[number], { key: ModelKey }> as C["key"]]: C extends { valueType: infer VK extends ValueKind }
    ? TsFromKind<VK>
    : never
};

export type SSTableFromModelProps<M extends ColumnModelDef> = {
    columnModel: M;
    data: readonly RowFromModel<M>[];
};

type KeyedCols<M extends ColumnModelDef> = Extract<M[number], { key: ModelKey }>;
type KeysOf<M extends ColumnModelDef> = KeyedCols<M>["key"];

// For a specific key K, get that column's ValueKind
type KindForKey<M extends ColumnModelDef, K extends KeysOf<M>> =
    Extract<KeyedCols<M>, { key: K }>["valueType"];

type ComparisonOp = "gt" | "gte" | "lt" | "lte" | "eq" | "neq";

export type FilterDescriptor<M extends ColumnModelDef> = {
    [K in KeysOf<M>]:
    KindForKey<M, K> extends "number" | "date"
    ? {
        key: K;
        value: TsFromKind<KindForKey<M, K>>;
        operation: ComparisonOp;
    }
    : {
        key: K;
        value: TsFromKind<KindForKey<M, K>>;
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

export function makeInitialState<M extends ColumnModelDef>(): State<M> {
    return {
        filters: [],
        page: 1,
        pageSize: 20
    };
}