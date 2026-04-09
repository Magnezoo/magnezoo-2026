"use client";

import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { SnackbarProvider, useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import PostImageField from "@/components/admin/PostEditor/PostImageField";
import PostPublicationFields from "@/components/admin/PostEditor/PostPublicationFields";
import PostTagField from "@/components/admin/PostEditor/PostTagField";
import PostTitleDescFields from "@/components/admin/PostEditor/PostTitleDescFields";
import {
  deletePost,
  getTags,
  updatePost,
} from "@/components/Forms/Post/action";
import { authClient } from "@/lib/auth-client";

type Tag = { id: string; name: string };
type PostWithTags = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  isSalesApplication: boolean;
  tags: { tag: Tag }[];
};

function PostEditFormContent({ post }: { post: PostWithTags }) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [submitting, setSubmitting] = useState(false);
  const [availableTags, setAvailableTags] = useState<Tag[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // Form State
  const [title, setTitle] = useState(post.title);
  const [description, setDescription] = useState(post.description);
  const [image, setImage] = useState<File | null>(null);
  const [selectedTags, setSelectedTags] = useState<(Tag | string)[]>(
    post.tags.map((t) => t.tag),
  );
  const [salesAgreementChecked, setSalesAgreementChecked] = useState(
    post.isSalesApplication,
  );
  const [tosChecked, setTosChecked] = useState(true);

  useEffect(() => {
    getTags().then(setAvailableTags).catch(console.error);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data: session } = await authClient.getSession();
    if (!session?.user.id) {
      enqueueSnackbar("ログインセッションが見つかりません", {
        variant: "error",
      });
      return;
    }

    setSubmitting(true);

    try {
      const tagNames = selectedTags.map((t) =>
        typeof t === "string" ? t : t.name,
      );
      const ok = await updatePost({
        id: post.id,
        title,
        content: description,
        image,
        isSalesApplication: salesAgreementChecked,
        tagNames,
        userId: session.user.id,
      });

      if (ok) {
        router.push(`/admin/posts/${post.id}`);
      } else {
        enqueueSnackbar("更新に失敗しました", { variant: "error" });
      }
    } catch (err) {
      console.error(err);
      enqueueSnackbar("エラーが発生しました", { variant: "error" });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    const { data: session } = await authClient.getSession();
    if (!session?.user.id) {
      enqueueSnackbar("ログインセッションが見つかりません", {
        variant: "error",
      });
      return;
    }

    setSubmitting(true);
    setDeleteDialogOpen(false);

    try {
      const ok = await deletePost({
        id: post.id,
        userId: session.user.id,
      });

      if (ok) {
        enqueueSnackbar("投稿を削除しました", { variant: "success" });
        router.push("/posts");
      } else {
        enqueueSnackbar("削除に失敗しました", { variant: "error" });
      }
    } catch (err) {
      console.error(err);
      enqueueSnackbar("エラーが発生しました", { variant: "error" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" mb={1} fontWeight="bold">
          投稿の編集
        </Typography>
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 3 }}>
          <Typography variant="caption" color="text.secondary">
            ID: {post.id}
          </Typography>
          <Tooltip title="IDをコピー">
            <IconButton
              size="small"
              onClick={() => {
                navigator.clipboard
                  .writeText(post.id)
                  .then(() => {
                    enqueueSnackbar("IDをコピーしました", {
                      variant: "info",
                      autoHideDuration: 2000,
                    });
                  })
                  .catch((err) => {
                    console.error("Failed to copy ID:", err);
                    enqueueSnackbar("コピーに失敗しました", {
                      variant: "error",
                    });
                  });
              }}
              sx={{ p: 0.5 }}
            >
              <ContentCopyIcon sx={{ fontSize: "1rem" }} />
            </IconButton>
          </Tooltip>
        </Stack>

        <Stack spacing={4} component={"form"} onSubmit={handleSubmit}>
          <PostTitleDescFields
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
            disabled={submitting}
          />

          <PostImageField
            image={image}
            setImage={setImage}
            existingImageUrl={post.imageUrl}
            disabled={submitting}
          />

          <PostTagField
            availableTags={availableTags}
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
            disabled={submitting}
          />

          <PostPublicationFields
            isSalesApplication={post.isSalesApplication}
            salesAgreementChecked={salesAgreementChecked}
            setSalesAgreementChecked={setSalesAgreementChecked}
            tosChecked={tosChecked}
            setTosChecked={setTosChecked}
            disabled={true}
          />

          <Box
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "flex-end",
              mt: 2,
            }}
          >
            <Button
              variant="outlined"
              onClick={() => router.back()}
              disabled={submitting}
            >
              キャンセル
            </Button>
            <Box sx={{ flexGrow: 1 }} />
            <Button
              variant="outlined"
              color="error"
              onClick={() => setDeleteDialogOpen(true)}
              disabled={submitting}
            >
              投稿を削除
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={submitting || !tosChecked}
            >
              {submitting ? "保存中..." : "変更を保存"}
            </Button>
          </Box>
        </Stack>

        <Dialog
          open={deleteDialogOpen}
          onClose={() => !submitting && setDeleteDialogOpen(false)}
        >
          <DialogTitle>投稿の削除</DialogTitle>
          <DialogContent>
            <DialogContentText>
              本当に投稿を削除しますか？この操作は取り消せません。
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setDeleteDialogOpen(false)}
              disabled={submitting}
            >
              キャンセル
            </Button>
            <Button onClick={handleDelete} color="error" disabled={submitting}>
              {submitting ? "削除中..." : "削除する"}
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>

      <Backdrop open={submitting} sx={{ zIndex: 1300 }}>
        <Stack alignItems="center" spacing={2} color="#fff">
          <CircularProgress color="inherit" />
          <Typography>保存中…</Typography>
        </Stack>
      </Backdrop>
    </Container>
  );
}

export default function PostEditForm({ post }: { post: PostWithTags }) {
  return (
    <SnackbarProvider maxSnack={3}>
      <PostEditFormContent post={post} />
    </SnackbarProvider>
  );
}
