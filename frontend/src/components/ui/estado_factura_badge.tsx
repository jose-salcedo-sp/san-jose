export type EstadoFactura = 1 | 2 | 3 | 4 | 5;

import clsx from "clsx";
import { Badge } from "@/components/ui/badge";

const LABEL: Record<EstadoFactura, string> = {
  1: "Por aprobar",
  2: "Aprobada",
  3: "En proceso",
  4: "Por pagar",
  5: "Facturado",
};

const STYLES: Record<EstadoFactura, string> = {
  1: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200",
  2: "bg-emerald-500 text-white",
  3: "bg-blue-500 text-white",
  4: "bg-zinc-200 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100",
  5: "bg-indigo-500 text-white",
};

export default function EstadoFacturaBadge({ estado }: { estado: EstadoFactura }) {
  return (
    <Badge className={clsx("font-medium", STYLES[estado])}>
      {LABEL[estado]}
    </Badge>
  );
}