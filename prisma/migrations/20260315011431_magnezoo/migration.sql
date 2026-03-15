-- CreateEnum
CREATE TYPE "IconType" AS ENUM ('file', 'url');

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "email" VARCHAR(255),
    "nickname" VARCHAR(30) NOT NULL,
    "icon_path" VARCHAR(255) NOT NULL,
    "icon_type" "IconType" NOT NULL,
    "is_enabled" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "posts" (
    "id" UUID NOT NULL,
    "title" VARCHAR(64),
    "description" VARCHAR(255) NOT NULL,
    "image_path" VARCHAR(255) NOT NULL,
    "is_draft" BOOLEAN NOT NULL DEFAULT true,
    "user_id" UUID,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tags" (
    "id" UUID NOT NULL,
    "name" VARCHAR(20) NOT NULL,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tags_posts" (
    "tag_id" UUID NOT NULL,
    "post_id" UUID NOT NULL,

    CONSTRAINT "tags_posts_pkey" PRIMARY KEY ("tag_id","post_id")
);

-- CreateTable
CREATE TABLE "vote" (
    "user_id" UUID NOT NULL,
    "post_id" UUID NOT NULL,

    CONSTRAINT "vote_pkey" PRIMARY KEY ("user_id","post_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "idx_nickname" ON "users"("nickname");

-- CreateIndex
CREATE INDEX "idx_enabled" ON "users"("is_enabled");

-- CreateIndex
CREATE UNIQUE INDEX "posts_title_key" ON "posts"("title");

-- CreateIndex
CREATE INDEX "idx_draft" ON "posts"("is_draft");

-- CreateIndex
CREATE UNIQUE INDEX "tags_name_key" ON "tags"("name");

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tags_posts" ADD CONSTRAINT "tags_posts_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tags_posts" ADD CONSTRAINT "tags_posts_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vote" ADD CONSTRAINT "vote_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vote" ADD CONSTRAINT "vote_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
