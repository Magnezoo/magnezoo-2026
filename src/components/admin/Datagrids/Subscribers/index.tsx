"use client";

import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  DataGrid,
  GridActionsCellItem,
  type GridColDef,
  type GridRowId,
  useGridApiRef,
} from "@mui/x-data-grid";
import { jaJP } from "@mui/x-data-grid/locales";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import React from "react";
import { deleteUser } from "./actions";

type Row = {
  id: number | string;
  email: string;
  event: "magnezoo" | "booth" | string;
};

export default function SubscribersDataGrid({
  rows,
  canDelete = true,
}: {
  rows: Row[];
  canDelete?: boolean;
}) {
  const apiRef = useGridApiRef();
  const router = useRouter();
  const [localRows, setLocalRows] = React.useState<Row[]>(rows);
  React.useEffect(() => setLocalRows(rows), [rows]);

  const columns = React.useMemo<GridColDef<Row>[]>(
    () => [
      {
        field: "actions",
        headerName: "操作",
        type: "actions",
        width: 140,
        getActions: ({ id }: { id: GridRowId }) => {
          const actions: React.ReactNode[] = [];
          actions.push(
            <GridActionsCellItem
              key={"view-detail"}
              icon={<VisibilityIcon />}
              label="View"
              onClick={() => router.push(`/dashboard/users/${id}`)}
            />,
          );
          if (canDelete) {
            actions.push(
              <GridActionsCellItem
                key={"delete-row"}
                icon={<DeleteIcon />}
                label="削除"
                onClick={async () => {
                  if (!confirm("選択したユーザーを削除しますか？")) return;
                  const ok = await deleteUser(String(id));
                  if (ok) {
                    enqueueSnackbar("ユーザーを削除しました", {
                      variant: "success",
                    });
                    setLocalRows((prev) =>
                      prev.filter((r) => String(r.id) !== String(id)),
                    );
                    apiRef.current?.updateRows([{ id, _action: "delete" }]);
                  } else {
                    enqueueSnackbar("削除に失敗しました", { variant: "error" });
                  }
                }}
              />,
            );
          }
          return actions;
        },
      },
      { field: "id", headerName: "ID", width: 250 },
      { field: "email", headerName: "メール", width: 250 },
      { field: "event", headerName: "イベント", width: 150 },
    ],
    [apiRef, canDelete, router],
  );

  return (
    <div style={{ width: "100%" }}>
      <div>
        <DataGrid
          rows={localRows}
          columns={columns}
          apiRef={apiRef}
          disableRowSelectionOnClick
          initialState={{
            columns: { columnVisibilityModel: { id: false } },
          }}
          localeText={jaJP.components.MuiDataGrid.defaultProps.localeText}
          autoHeight
        />
      </div>
    </div>
  );
}
