/** biome-ignore-all lint/suspicious/noArrayIndexKey: Leave me alone bruh */

import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { type ActionDispatch, type ChangeEvent, useEffect, useMemo, useReducer, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button";
import type { Action, ColumnModelDef, ModelColumn, SSTableFromModelProps, State, FilterDescriptor, KeyedCols, BooleanCol, NumberCol, DateCol, TextCol, NumberOperators, DateOperators, DateOpDescriptor, KeysOf } from "./types";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { DatePicker, DateRangePicker } from "../date-picker/date-picker";
import type { DateRange } from "react-day-picker";
import { addDays } from "date-fns";

function makeInitialState<M extends ColumnModelDef>(): State<M> {
    return {
        filters: [],
        page: 1,
        pageSize: 20
    };
}

export function stateReducer<M extends ColumnModelDef>(
    state: State<M>,
    action: Action<M>
): State<M> {
    switch (action.type) {
        case "setFilter": {
            const next_filters = state.filters ?
                [...state.filters.filter(f => f.key !== action.filter.key), action.filter] :
                [action.filter];
            return { ...state, filters: next_filters };
        }
        case "removeFilter": {
            const next_filters = state.filters ?
                [...state.filters.filter(f => f.key !== action.key)] :
                [];
            return { ...state, filters: next_filters };
        }
        case "setSort":
            return { ...state, sort: action.sort };
        case "removeSort": {
            const next = { ...state };
            delete next.sort;
            return next;
        }
        case "setPage":
            return { ...state, page: action.page };
        case "setPerPage":
            return { ...state, pageSize: action.perPage };
        default:
            return state;
    }
}

export function SSTable<T extends ColumnModelDef>(props: SSTableFromModelProps<T>) {
    const { data, columnModel } = props;
    const [state, dispatch] = useReducer(
        stateReducer<T>,
        makeInitialState()
    );
    const visibleCols = useMemo(
        () => columnModel.filter(c => c.options?.show ?? true),
        [columnModel]
    );

    console.log(state);

    return (
        <Table>
            <SSHeader columnModel={columnModel} state={state} dispatch={dispatch} />
            <TableBody>
                {data.map((row, rowIndex) => (
                    <TableRow key={rowIndex}>
                        {visibleCols
                            .filter(c => c.options?.show ?? true)
                            .map((c, i) => {
                                const value = row[c.key as keyof typeof row];

                                return <TableCell key={`${c.key}-${i}`}>
                                    {String(value)}
                                </TableCell>;
                            })}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

type SSHeaderProps<M extends ColumnModelDef> = {
    columnModel: M,
    state: State<M>,
    dispatch: ActionDispatch<[action: Action<M>]>
};

function SSHeader<M extends ColumnModelDef>(props: SSHeaderProps<M>) {
    const sortable_cols = useMemo(() => new Set([...props.columnModel].filter(col => col.options?.sortable).map(col => col.key)), [props.columnModel]);
    const filterable_cols = useMemo(() => new Set([...props.columnModel].filter(col => col.options?.filterable).map(col => col.key)), [props.columnModel]);

    return <TableHeader>
        <TableRow>
            {props.columnModel.map(c => {
                const showMenu = filterable_cols.has(c.key) || sortable_cols.has(c.key);

                return <TableHead
                    key={String(c.key)}
                >
                    <div className={cn("flex justify-center items-center w-full")}>
                        {
                            showMenu ?
                                (
                                    <ColumnHeaderMenu colModel={c} dispatch={props.dispatch} state={props.state} />
                                ) :
                                (
                                    <span className="truncate">{c.title}</span>
                                )
                        }
                    </div>
                </TableHead>
            })}
        </TableRow>
    </TableHeader>
}

type ColumnHeaderMenuProps<M extends ColumnModelDef> = {
    colModel: ModelColumn,
    state: State<M>,
    dispatch: ActionDispatch<[action: Action<M>]>
}

const SortIcons = {
    'asc': <ArrowUp className="h-full aspect-square" />,
    'desc': <ArrowDown className="h-full aspect-square" />,
    'default': <ArrowUpDown className="h-full aspect-square" />,
} as const;

function ColumnHeaderMenu<M extends ColumnModelDef>(props: ColumnHeaderMenuProps<M>) {
    function sortHandler(c: ModelColumn, order: 'asc' | 'desc') {
        return () => {
            if (isSortSelected(c, order)) {
                props.dispatch({ type: 'removeSort' });
                return;
            }

            props.dispatch({ type: 'setSort', sort: { by: c.key, order } });
        }
    }

    function isSortSelected(c: ModelColumn, order: 'asc' | 'desc') {
        return props.state?.sort && props.state?.sort.by === c.key && props.state.sort.order === order
    }

    return <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant={"ghost"}>
                {props.colModel.title}
                {
                    props.colModel.options?.sortable ?
                        (
                            props.state?.sort && props.state?.sort.by === props.colModel.key ?
                                SortIcons[props.state.sort.order] :
                                SortIcons.default
                        ) :
                        null
                }
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            {
                props.colModel.options?.sortable &&
                (
                    <>
                        <DropdownMenuLabel>Ordenar</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            className={cn(
                                "flex",
                                isSortSelected(props.colModel, 'asc') && "bg-accent"
                            )}
                            onClick={sortHandler(props.colModel, 'asc')}
                        >
                            <span className="grow">Ascendente</span>
                            <ArrowUp />
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className={cn(
                                "flex",
                                isSortSelected(props.colModel, 'desc') && "bg-accent"
                            )}
                            onClick={sortHandler(props.colModel, 'desc')}
                        >
                            <span className="grow">Descendente</span>
                            <ArrowDown />
                        </DropdownMenuItem>
                    </>
                )
            }

            {
                (props.colModel.options?.sortable && props.colModel.options?.filterable) && <DropdownMenuSeparator />
            }

            {
                props.colModel.options?.filterable &&
                (
                    <>
                        <DropdownMenuLabel>Filtrar</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <ColumnFilter colModel={props.colModel as KeyedCols<M>} state={props.state} dispatch={props.dispatch} />
                        </DropdownMenuItem>
                    </>
                )
            }
        </DropdownMenuContent>
    </DropdownMenu>
}

type ColumnFilterProps<M extends ColumnModelDef> = {
    state: State<M>;
    dispatch: ActionDispatch<[action: Action<M>]>;
    colModel: KeyedCols<M>;
};

function NumberFilter<M extends ColumnModelDef>(
    props: Omit<ColumnFilterProps<M>, "colModel"> & { colModel: NumberCol<M> }
) {
    const [operator, setOperator] = useState<NumberOperators>('eq');

    function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
        const value = e.target.valueAsNumber;

        if (!value) {
            props.dispatch({
                type: 'removeFilter',
                key: props.colModel.key
            });

            return;
        }

        const fd = { key: props.colModel.key, value, operation: operator } satisfies {
            key: NumberCol<M>["key"];
            value: number;
            operation: NumberOperators
        };

        props.dispatch({
            type: "setFilter",
            filter: fd as FilterDescriptor<M>,
        });
    }

    return <div className="flex gap-2">
        <Select onValueChange={op => setOperator(op as NumberOperators)}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecciona…" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="eq">Igual</SelectItem>
                <SelectItem value="gt">Mayor que</SelectItem>
                <SelectItem value="gte">Mayor o igual que</SelectItem>
                <SelectItem value="lt">Menor que</SelectItem>
                <SelectItem value="lte">Menor o igual que</SelectItem>
                <SelectItem value="ne">No igual a</SelectItem>
            </SelectContent>
        </Select>
        <Input onChange={handleInputChange} type="number" placeholder={`Filtrar ${props.colModel.title}...`} />
    </div>
}

function BooleanFilter<M extends ColumnModelDef>(
    props: Omit<ColumnFilterProps<M>, "colModel"> & { colModel: BooleanCol<M> }
) {
    function handleSelectionChange(value: boolean) {
        const fd = { key: props.colModel.key, value } satisfies {
            key: BooleanCol<M>["key"];
            value: boolean;
        };

        props.dispatch({
            type: "setFilter",
            filter: fd as FilterDescriptor<M>,
        });
    }

    return (
        <Select onValueChange={(s) => handleSelectionChange(s === "true")}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecciona…" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="true">Verdadero</SelectItem>
                <SelectItem value="false">Falso</SelectItem>
            </SelectContent>
        </Select>
    );
}

function DateFilter<M extends ColumnModelDef>(
    props: Omit<ColumnFilterProps<M>, "colModel"> & { colModel: DateCol<M> }
) {
    const today = new Date();
    const defaultDate: DateRange = {
        from: today,
        to: addDays(today, 5),
    };

    const [operator, setOperator] = useState<DateOperators>('eq');
    const [date, setDate] = useState<Date>();
    const [dateRange, setDateRange] = useState<DateRange | undefined>(defaultDate);

    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
        if (operator && date)
            handleFilterChange({
                operation: operator as Exclude<DateOperators, 'range'>,
                value: date as Date
            });
    }, [operator, date]);

    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
        if (operator && dateRange && dateRange.from && dateRange.to)
            handleFilterChange({
                operation: operator as Extract<DateOperators, 'range'>,
                from: dateRange.from,
                to: dateRange.to
            });
    }, [operator, dateRange]);

    type DateAction = {
        operation: Extract<DateOperators, 'range'>,
        from: Date,
        to: Date
    } | {
        operation: Exclude<DateOperators, 'range'>
        value: Date
    };

    function handleFilterChange(action: DateAction) {
        const fd = {
            key: props.colModel.key,
            ...action
        } satisfies DateOpDescriptor<M, KeysOf<M>>;

        props.dispatch({
            type: "setFilter",
            filter: fd as FilterDescriptor<M>,
        });
    }

    return <div className="flex gap-2">
        <Select onValueChange={op => setOperator(op as DateOperators)}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecciona…" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="eq">Igual</SelectItem>
                <SelectItem value="gt">Mayor que</SelectItem>
                <SelectItem value="gte">Mayor o igual que</SelectItem>
                <SelectItem value="lt">Menor que</SelectItem>
                <SelectItem value="lte">Menor o igual que</SelectItem>
                <SelectItem value="ne">No igual a</SelectItem>
                <SelectItem value="range">Rango</SelectItem>
            </SelectContent>
        </Select>

        {
            operator === "range"
                ? <DateRangePicker dateRange={dateRange} setDateRange={setDateRange} />
                : <DatePicker date={date} setDate={setDate} />
        }

    </div>
}

function TextFilter<M extends ColumnModelDef>(
    props: Omit<ColumnFilterProps<M>, "colModel"> & { colModel: TextCol<M> }
) {
    function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
        const value = e.target.value.trim();

        if (!value) {
            props.dispatch({
                type: 'removeFilter',
                key: props.colModel.key
            });

            return;
        }

        const fd = { key: props.colModel.key, value } satisfies {
            key: TextCol<M>["key"];
            value: string;
        };

        props.dispatch({
            type: "setFilter",
            filter: fd as FilterDescriptor<M>,
        });
    }

    return <Input onChange={handleInputChange} placeholder={`Filtrar ${props.colModel.title}...`} />
}

function ColumnFilter<M extends ColumnModelDef>(props: ColumnFilterProps<M>) {
    switch (props.colModel.valueType) {
        case "boolean": return <BooleanFilter colModel={props.colModel as BooleanCol<M>} state={props.state} dispatch={props.dispatch} />
        case "number": return <NumberFilter colModel={props.colModel as NumberCol<M>} state={props.state} dispatch={props.dispatch} />
        case "string": return <TextFilter colModel={props.colModel as TextCol<M>} state={props.state} dispatch={props.dispatch} />
        case "date": return <DateFilter colModel={props.colModel as DateCol<M>} state={props.state} dispatch={props.dispatch} />
    }
}