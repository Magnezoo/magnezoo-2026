"use client";

import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import {
  Autocomplete,
  Box,
  Checkbox,
  Chip,
  TextField,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { useState } from "react";

type Tag = { id: string; name: string };
const MAX_TAGS = 5;
const MAX_TAG_LENGTH = 32;

const getTagName = (tag: Tag | string | undefined) => {
  if (!tag) return "";
  return typeof tag === "string" ? tag : tag.name;
};

export default function PostTagField({
  availableTags,
  selectedTags,
  setSelectedTags,
  disabled,
}: {
  availableTags: Tag[];
  selectedTags: (Tag | string)[];
  setSelectedTags: (tags: (Tag | string)[]) => void;
  disabled: boolean;
}) {
  const { enqueueSnackbar } = useSnackbar();
  const [tagInputValue, setTagInputValue] = useState("");

  const handleTagsChange = (_: unknown, newValue: (Tag | string)[]) => {
    // 重複を除去（名前ベース）
    const uniqueValues = newValue.reduce<(Tag | string)[]>((acc, current) => {
      const currentName = getTagName(current).trim();
      if (!currentName) return acc;

      const isDuplicate = acc.some(
        (item) =>
          getTagName(item).trim().toLowerCase() === currentName.toLowerCase(),
      );

      if (!isDuplicate) {
        acc.push(current);
      }
      return acc;
    }, []);

    if (uniqueValues.length > MAX_TAGS) {
      enqueueSnackbar(`タグは最大${MAX_TAGS}件までです。`, {
        variant: "warning",
      });
      return;
    }

    const tooLongTag = uniqueValues.find(
      (tag) => getTagName(tag).length > MAX_TAG_LENGTH,
    );
    if (tooLongTag) {
      enqueueSnackbar(`タグは最大${MAX_TAG_LENGTH}文字までです。`, {
        variant: "warning",
      });
      return;
    }

    setSelectedTags(uniqueValues);
  };

  const handleTagInputChange = (
    _: unknown,
    newInputValue: string,
    reason: string,
  ) => {
    if (reason === "input" && newInputValue.length > MAX_TAG_LENGTH) {
      setTagInputValue(newInputValue.slice(0, MAX_TAG_LENGTH));
      if (tagInputValue.length < MAX_TAG_LENGTH) {
        enqueueSnackbar(`タグは最大${MAX_TAG_LENGTH}文字までです。`, {
          variant: "warning",
        });
      }
      return;
    }

    setTagInputValue(newInputValue);
  };

  return (
    <Box>
      <Typography variant="subtitle1" fontWeight="bold" mb={1}>
        タグ
      </Typography>
      <Autocomplete
        multiple
        freeSolo
        options={availableTags}
        value={selectedTags}
        onChange={handleTagsChange}
        inputValue={tagInputValue}
        onInputChange={handleTagInputChange}
        getOptionLabel={getTagName}
        renderInput={(params) => (
          <TextField {...params} label="タグ" placeholder="5つまで追加可能" />
        )}
        renderOption={(props, option, { selected }) => {
          const { key, ...rest } =
            props as React.HTMLAttributes<HTMLLIElement> & { key: React.Key };
          return (
            <li key={key} {...rest}>
              <Checkbox
                icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                checkedIcon={<CheckBoxIcon fontSize="small" />}
                checked={selected}
                size="small"
              />
              {getTagName(option)}
            </li>
          );
        }}
        renderValue={(value, getItemProps) =>
          value.map((option, index) => {
            const { key, ...itemProps } = getItemProps({ index });
            return (
              <Chip
                key={key}
                label={getTagName(option)}
                size="small"
                {...itemProps}
              />
            );
          })
        }
        disabled={disabled}
      />
    </Box>
  );
}
