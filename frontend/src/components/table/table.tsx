/** biome-ignore-all lint/suspicious/noArrayIndexKey: Leave me alone bruh */

import { ArrowDown, ArrowUp, ArrowUpDown, Filter } from "lucide-react";
import { type ActionDispatch, useMemo, useReducer } from "react";
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
import { Button } from "../ui/button";
import { type Action, type ColumnModelDef, type ModelColumn, makeInitialState, type SSTableFromModelProps, type State } from "./types";
import { cn } from "@/lib/utils";

export function stateReducer<M extends ColumnModelDef>(
    state: State<M>,
    action: Action<M>
): State<M> {
    switch (action.type) {
        case "setFilter": {
            const next = { ...state.filters, [action.filter.key]: action.filter } as State<M>["filters"];
            return { ...state, filters: next };
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

    console.log(state.sort);

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
                {props.state?.sort && props.state?.sort.by === props.colModel.key ?
                    SortIcons[props.state.sort.order] :
                    SortIcons.default
                }
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            {
                props.colModel.options?.sortable &&
                (
                    <>
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
                        <DropdownMenuItem>Componente de filtrossss</DropdownMenuItem>
                    </>
                )
            }
        </DropdownMenuContent>
    </DropdownMenu>
}