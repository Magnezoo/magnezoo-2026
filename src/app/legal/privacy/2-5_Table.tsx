import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Link from "next/link";

function createData(
  toolProvider: string,
  toolName: string,
  terms: string,
  privacy: string,
  howtoOptout: string,
  infoProvided: string,
  purpose: string,
) {
  return {
    toolProvider,
    toolName,
    terms,
    privacy,
    howtoOptout,
    infoProvided,
    purpose,
  };
}

const rows = [
  createData(
    "Google LCC",
    "Google Analytics",
    "https://www.google.com/analytics/terms/?hl=ja",
    "https://policies.google.com/privacy?hl=ja",
    "https://support.google.com/analytics/answer/181881?hl=ja",
    "ユーザーID、Cookie、端末情報（OS種別、ブラウザの名称等）、サイトの利用者行動履歴",
    "ユーザーの行動分析や、サービスの機能提供のため",
  ),
];

export default function TableSec2Paragraph5() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ minWidth: 250 }}>ツール提供事業者</TableCell>
            <TableCell sx={{ minWidth: 250 }}>アクセス解析ツール</TableCell>
            <TableCell sx={{ minWidth: 250 }}>利用規約</TableCell>
            <TableCell sx={{ minWidth: 250 }}>プライバシーポリシー</TableCell>
            <TableCell sx={{ minWidth: 250 }}>オプトアウト方法</TableCell>
            <TableCell sx={{ minWidth: 250 }}>情報の提供内容</TableCell>
            <TableCell sx={{ minWidth: 250 }}>情報の利用目的</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.toolProvider}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.toolProvider}
              </TableCell>
              <TableCell>{row.toolName}</TableCell>
              <TableCell>
                <Link
                  href={row.terms}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {row.terms}
                </Link>
              </TableCell>
              <TableCell>
                <Link
                  href={row.privacy}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {row.privacy}
                </Link>
              </TableCell>
              <TableCell>
                <Link
                  href={row.howtoOptout}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {row.howtoOptout}
                </Link>
              </TableCell>
              <TableCell>{row.infoProvided}</TableCell>
              <TableCell>{row.purpose}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
