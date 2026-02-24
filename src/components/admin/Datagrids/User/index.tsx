"use client";

import React from "react";
import { Button, darken } from "@mui/material";
import {
  DataGrid,
  DataGridProps,
  GridActionsCellItem,
  gridClasses,
  GridColDef,
  GridRowId,
  GridValidRowModel,
  useGridApiRef,
} from "@mui/x-data-grid";
import RestoreIcon from "@mui/icons-material/Restore";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import { jaJP } from "@mui/x-data-grid/locales";
import { enqueueSnackbar } from "notistack";
import { useRouter } from "next/navigation";
import { deleteUser, updateUser } from "./actions";

type Row = {
  id: string;
  name: string;
  email?: string | null;
  emailVerified?: boolean;
  createdAt?: Date | string | null;
  updatedAt?: Date | string | null;
  image?: string | null;
  role?: string | null;
  banned?: boolean | null;
  banReason?: string | null;
  banExpires?: Date | string | null;
};

export default function UsersDatagrid({
  rows,
  canDelete = true,
  canUpdate = true,
}: {
  rows: Row[];
  canDelete?: boolean;
  canUpdate?: boolean;
}) {
  const apiRef = useGridApiRef();
  const router = useRouter();
  const [localRows, setLocalRows] = React.useState<Row[]>(rows);
  React.useEffect(() => setLocalRows(rows), [rows]);

  const [hasUnsavedRows, setHasUnsavedRows] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);

  const unsavedChangesRef = React.useRef<{
    unsavedRows: Record<GridRowId, GridValidRowModel>;
    rowsBeforeChange: Record<GridRowId, GridValidRowModel>;
  }>({
    unsavedRows: {},
    rowsBeforeChange: {},
  });

  const columns = React.useMemo<GridColDef<Row>[]>(() => {
    return [
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
          actions.push(
            <GridActionsCellItem
              key={"discard-changes"}
              icon={<RestoreIcon />}
              label="Discard"
              disabled={unsavedChangesRef.current.unsavedRows[id] === undefined}
              onClick={() => {
                apiRef.current?.updateRows([
                  unsavedChangesRef.current.rowsBeforeChange[id],
                ]);
                delete unsavedChangesRef.current.rowsBeforeChange[id];
                delete unsavedChangesRef.current.unsavedRows[id];
                setHasUnsavedRows(
                  Object.keys(unsavedChangesRef.current.unsavedRows).length > 0,
                );
              }}
            />,
          );
          return actions;
        },
      },
      { field: "id", headerName: "ID", width: 250 },
      { field: "name", headerName: "名前", width: 180, editable: canUpdate },
      { field: "email", headerName: "メール", width: 250, editable: canUpdate },
      {
        field: "emailVerified",
        headerName: "メール確認",
        width: 140,
        type: "boolean",
      },
      {
        field: "role",
        headerName: "ロール",
        width: 120,
        editable: canUpdate,
        type: "singleSelect",
        valueOptions: ["user", "admin"],
      },
      {
        field: "banned",
        headerName: "Banned",
        width: 100,
        type: "boolean",
        editable: canUpdate,
      },
      {
        field: "banReason",
        headerName: "Ban Reason",
        width: 200,
        editable: canUpdate,
      },
      {
        field: "banExpires",
        headerName: "Ban Expires",
        width: 200,
        type: "dateTime",
        editable: canUpdate,
        valueGetter: (value: string) =>
          value ? new Date(value as string) : null,
      },
      {
        field: "createdAt",
        headerName: "作成日時",
        width: 180,
        type: "dateTime",
        valueGetter: (value: string) =>
          value ? new Date(value as string) : null,
      },
      {
        field: "updatedAt",
        headerName: "更新日時",
        width: 180,
        type: "dateTime",
        valueGetter: (value: string) =>
          value ? new Date(value as string) : null,
      },
    ];
  }, [apiRef, canDelete, canUpdate, router]);

  const processRowUpdate = React.useCallback<
    NonNullable<DataGridProps["processRowUpdate"]>
  >((newRow, oldRow) => {
    const rowId = newRow.id;
    unsavedChangesRef.current.unsavedRows[rowId] = newRow;
    if (!unsavedChangesRef.current.rowsBeforeChange[rowId]) {
      unsavedChangesRef.current.rowsBeforeChange[rowId] = oldRow;
    }
    setHasUnsavedRows(true);
    return newRow;
  }, []);

  const discardChanges = React.useCallback(() => {
    setHasUnsavedRows(false);
    Object.values(unsavedChangesRef.current.rowsBeforeChange).forEach((row) => {
      apiRef.current?.updateRows([row]);
    });
    unsavedChangesRef.current = { unsavedRows: {}, rowsBeforeChange: {} };
  }, [apiRef]);

  const saveChanges = React.useCallback(async () => {
    try {
      setIsSaving(true);
      const unsaved = Object.values(unsavedChangesRef.current.unsavedRows);
      for (const row of unsaved) {
        try {
          const payload: {
            id: string;
            name?: string | undefined;
            role?: string | null | undefined;
            banned?: boolean | null | undefined;
            banReason?: string | null | undefined;
            banExpires?: Date | null | undefined;
          } = {
            id: row.id,
            name: row.name,
            role: row.role ?? null,
            banned: row.banned ?? null,
            banReason: row.banReason ?? null,
            banExpires: row.banExpires ? new Date(row.banExpires) : null,
          };
          const ok = await updateUser(payload);
          if (ok) {
            // refresh localRows
            setLocalRows((prev) =>
              prev.map((r) =>
                String(r.id) === String(row.id) ? { ...r, ...row } : r,
              ),
            );
            apiRef.current?.updateRows([row]);
          } else {
            console.error("Failed to save row", row);
          }
        } catch (err) {
          console.error("Save row failed:", err);
        }
      }
      setIsSaving(false);
      setHasUnsavedRows(false);
      enqueueSnackbar("変更を保存しました", { variant: "success" });
      unsavedChangesRef.current = { unsavedRows: {}, rowsBeforeChange: {} };
    } catch {
      setIsSaving(false);
      enqueueSnackbar("保存中にエラーが発生しました", { variant: "error" });
    }
  }, [apiRef]);

  const getRowClassName = React.useCallback<
    NonNullable<DataGridProps["getRowClassName"]>
  >(({ id }) => {
    const unsavedRow = unsavedChangesRef.current.unsavedRows[id];
    if (unsavedRow) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((unsavedRow as any)._action === "delete") return "row--removed";
      return "row--edited";
    }
    return "";
  }, []);

  return (
    <div style={{ width: "100%" }}>
      {canUpdate && (
        <div style={{ marginBottom: 8 }}>
          <Button
            disabled={!hasUnsavedRows}
            onClick={saveChanges}
            startIcon={<SaveIcon />}
          >
            変更を保存
          </Button>
          <Button
            disabled={!hasUnsavedRows || isSaving}
            onClick={discardChanges}
            startIcon={<RestoreIcon />}
          >
            変更を元に戻す
          </Button>
        </div>
      )}
      <div>
        <DataGrid
          rows={localRows}
          columns={columns}
          apiRef={apiRef}
          disableRowSelectionOnClick
          processRowUpdate={processRowUpdate}
          initialState={{
            columns: { columnVisibilityModel: { id: false } },
          }}
          sx={{
            [`& .${gridClasses.row}.row--removed`]: {
              backgroundColor: (theme) =>
                theme.palette.mode === "light"
                  ? "rgba(255,170,170,0.3)"
                  : darken("rgba(255,170,170,1)", 0.7),
            },
            [`& .${gridClasses.row}.row--edited`]: {
              backgroundColor: (theme) =>
                theme.palette.mode === "light"
                  ? "rgba(255,254,176,0.3)"
                  : darken("rgba(255,254,176,1)", 0.6),
            },
          }}
          localeText={jaJP.components.MuiDataGrid.defaultProps.localeText}
          loading={isSaving}
          getRowClassName={getRowClassName}
          autoHeight
        />
      </div>
    </div>
  );
}
