"use client";

import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import {
  Autocomplete,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Container,
  IconButton,
  Paper,
  Stack,
  Switch,
  TextField,
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
  createPost,
  getTags,
  getUsers,
  updatePost,
} from "@/components/Forms/Post/action";
import { authClient } from "@/lib/auth-client";

type Tag = { id: string; name: string };
type User = { id: string; name: string; email: string };
type PostWithTags = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  isSalesApplication: boolean;
  isStudio: boolean;
  studioMgmtNo: number | null;
  authorId: string;
  tags: { tag: Tag }[];
};

const DEFAULT_NEW_POST: PostWithTags = {
  id: "",
  title: "",
  description: "",
  imageUrl: "",
  isSalesApplication: false,
  isStudio: false,
  studioMgmtNo: null,
  authorId: "",
  tags: [],
};

function PostEditFormContent({ post }: { post?: PostWithTags }) {
  const currentPost = post ?? DEFAULT_NEW_POST;
  const isCreateMode = !post;
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [submitting, setSubmitting] = useState(false);
  const [availableTags, setAvailableTags] = useState<Tag[]>([]);
  const [availableUsers, setAvailableUsers] = useState<User[]>([]);

  // Form State
  const [title, setTitle] = useState(currentPost.title);
  const [description, setDescription] = useState(currentPost.description);
  const [image, setImage] = useState<File | null>(null);
  const [selectedTags, setSelectedTags] = useState<(Tag | string)[]>(
    currentPost.tags.map((t) => t.tag),
  );
  const [salesAgreementChecked, setSalesAgreementChecked] = useState(
    currentPost.isSalesApplication,
  );
  const [isStudioChecked, setIsStudioChecked] = useState(currentPost.isStudio);
  const [studioMgmtNo, setStudioMgmtNo] = useState<string>(
    currentPost.studioMgmtNo != null ? String(currentPost.studioMgmtNo) : "",
  );
  const [selectedAuthorId, setSelectedAuthorId] = useState(
    currentPost.authorId,
  );
  const [tosChecked, setTosChecked] = useState(true);
  const parsedStudioMgmtNo = studioMgmtNo.trim()
    ? Number.parseInt(studioMgmtNo, 10)
    : null;
  const isStudioMgmtNoValid =
    parsedStudioMgmtNo !== null &&
    Number.isInteger(parsedStudioMgmtNo) &&
    parsedStudioMgmtNo > 0;

  useEffect(() => {
    getTags().then(setAvailableTags).catch(console.error);
    getUsers()
      .then((users) => {
        setAvailableUsers(users);
        if (!selectedAuthorId && users.length > 0) {
          setSelectedAuthorId(users[0].id);
        }
      })
      .catch(console.error);
  }, [selectedAuthorId]);

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
      if (isStudioChecked && !isStudioMgmtNoValid) {
        enqueueSnackbar("Studio投稿では管理番号(正の整数)が必須です", {
          variant: "error",
        });
        return;
      }

      const tagNames = selectedTags.map((t) =>
        typeof t === "string" ? t : t.name,
      );
      const ok = isCreateMode
        ? await createPost({
            title,
            content: description,
            image: image as File,
            userId: session.user.id,
            authorId: selectedAuthorId,
            isSalesApplication: salesAgreementChecked,
            isStudio: isStudioChecked,
            studioMgmtNo: parsedStudioMgmtNo,
            tagNames,
          })
        : await updatePost({
            id: currentPost.id,
            title,
            content: description,
            image,
            isSalesApplication: salesAgreementChecked,
            isStudio: isStudioChecked,
            studioMgmtNo: parsedStudioMgmtNo,
            authorId: selectedAuthorId,
            tagNames,
          });

      if (ok) {
        router.push(
          isCreateMode ? "/admin/posts" : `/admin/posts/${currentPost.id}`,
        );
        router.refresh();
      } else {
        enqueueSnackbar(
          isCreateMode ? "投稿の作成に失敗しました" : "更新に失敗しました",
          { variant: "error" },
        );
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
          {isCreateMode ? "投稿の新規作成" : "投稿の編集"}
        </Typography>
        {!isCreateMode && (
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 3 }}>
            <Typography variant="caption" color="text.secondary">
              ID: {currentPost.id}
            </Typography>
            <Tooltip title="IDをコピー">
              <IconButton
                size="small"
                onClick={() => {
                  navigator.clipboard
                    .writeText(currentPost.id)
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
        )}

        <Stack spacing={4} component={"form"} onSubmit={handleSubmit}>
          <Box
            sx={{
              p: 2,
              borderRadius: 2,
              backgroundColor: "action.hover",
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <Stack direction="row" alignItems="center" spacing={2}>
              <Switch
                checked={isStudioChecked}
                onChange={(e) => setIsStudioChecked(e.target.checked)}
                disabled={submitting}
              />
              <Box>
                <Typography variant="h6" fontWeight="bold" lineHeight={1.2}>
                  Studio投稿
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ONにすると投稿の種類を「Studio」として保存します
                </Typography>
              </Box>
            </Stack>
            <TextField
              sx={{ mt: 2 }}
              label="Studio管理番号"
              type="number"
              value={studioMgmtNo}
              onChange={(e) => setStudioMgmtNo(e.target.value)}
              required={isStudioChecked}
              disabled={submitting || !isStudioChecked}
              inputProps={{ min: 1, step: 1 }}
              helperText={
                isStudioChecked
                  ? "Studio投稿では管理番号(正の整数)が必須です"
                  : "Studio投稿をONにすると入力できます"
              }
              error={isStudioChecked && !isStudioMgmtNoValid}
              fullWidth
            />
          </Box>

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
            existingImageUrl={currentPost.imageUrl || undefined}
            disabled={submitting}
          />

          <PostTagField
            availableTags={availableTags}
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
            disabled={submitting}
          />

          <Box>
            <Typography variant="subtitle1" fontWeight="bold" mb={1}>
              投稿者
            </Typography>
            <Autocomplete
              options={availableUsers}
              value={
                availableUsers.find((user) => user.id === selectedAuthorId) ??
                null
              }
              onChange={(_, value) => setSelectedAuthorId(value?.id ?? "")}
              getOptionLabel={(option) =>
                option.name ? `${option.name} (${option.email})` : option.email
              }
              isOptionEqualToValue={(option, value) => option.id === value.id}
              disabled={submitting}
              renderInput={(params) => (
                <TextField {...params} label="投稿者を選択" required />
              )}
            />
          </Box>

          <PostPublicationFields
            isSalesApplication={currentPost.isSalesApplication}
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
            <Button
              type="submit"
              variant="contained"
              disabled={
                submitting ||
                !tosChecked ||
                !selectedAuthorId ||
                !title.trim() ||
                !description.trim() ||
                (isStudioChecked && !isStudioMgmtNoValid) ||
                (isCreateMode && !image)
              }
            >
              {submitting
                ? isCreateMode
                  ? "作成中..."
                  : "保存中..."
                : isCreateMode
                  ? "投稿を作成"
                  : "変更を保存"}
            </Button>
          </Box>
        </Stack>
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

export default function PostEditForm({ post }: { post?: PostWithTags }) {
  return (
    <SnackbarProvider maxSnack={3}>
      <PostEditFormContent post={post} />
    </SnackbarProvider>
  );
}
