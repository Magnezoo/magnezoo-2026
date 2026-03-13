import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";

function createData(word: string, definition: string) {
  return {
    word,
    definition,
  };
}

const rows = [
  createData(
    "本サービス",
    "当方が提供する「Magnezoo(本サイト)」を指します。ユーザーが投稿したウチの子（ペットやキャラクターなど）を競うコンテストサイトです。",
  ),
  createData(
    "本アカウント",
    "本サービスを利用するために必要なユーザーアカウントを指します。",
  ),
  createData(
    "登録ユーザー",
    "本サービスに登録したユーザーを指します。登録ユーザーは、投稿者や投票者など、さまざまな役割を持ちます。",
  ),
  createData(
    "本規約",
    "本サービスの利用に関する条件を、登録ユーザーと当方の間で定める「Magnezoo利用規約」を指します。",
  ),
  createData(
    "登録情報",
    "登録ユーザーが本サービスに提供する情報を指します。これには、ユーザー名、メールアドレス、プロフィール情報などが含まれます。また、これらの情報は、投稿の詳細ページなどに表示される場合があるため、本名その他の個人を特定できる情報を含むユーザーネームやメールアドレスの使用には十分ご注意ください。",
  ),
  createData(
    "本ユーザー資格",
    "登録ユーザーが、本サービス上で有する資格をいい、具体的には本サービス上での記事投稿、他の登録ユーザーの投稿記事へのコメント又はいいね等の各種機能を使用することができることをいいます。",
  ),
  createData(
    "投稿内容",
    "本サービスを利用して登録ユーザーが投稿した投稿、コメント、公開プロフィールの自己紹介などのテキストデータ、画像、動画・音声ファイルを含む、本サービス上に投稿されたデータの総称をいいます。",
  ),
  createData(
    "外部サービス",
    "Google、GitHubなど、当社がその利用を承認し、又は連携する認証システムを有するサービスの総称をいいます。",
  ),
];

export default function TableSec1Paragraph1() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="table">
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.word}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row" sx={{ minWidth: 250 }}>
                {row.word}
              </TableCell>
              <TableCell sx={{ minWidth: 250 }}>{row.definition}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
