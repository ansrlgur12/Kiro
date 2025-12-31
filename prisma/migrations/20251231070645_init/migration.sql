-- CreateTable
CREATE TABLE `user` (
    `user_id` VARCHAR(191) NOT NULL,
    `user_email` VARCHAR(191) NOT NULL,
    `user_password_hash` VARCHAR(191) NOT NULL,
    `user_name` VARCHAR(191) NOT NULL,
    `user_avatar_url` TEXT NULL,
    `user_created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `user_updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `user_user_email_key`(`user_email`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `workspace` (
    `workspace_id` VARCHAR(191) NOT NULL,
    `workspace_name` VARCHAR(191) NOT NULL,
    `workspace_icon` VARCHAR(191) NULL,
    `workspace_owner_id` VARCHAR(191) NOT NULL,
    `workspace_created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `workspace_updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`workspace_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `workspace_member` (
    `workspace_member_id` VARCHAR(191) NOT NULL,
    `workspace_member_workspace_id` VARCHAR(191) NOT NULL,
    `workspace_member_user_id` VARCHAR(191) NOT NULL,
    `workspace_member_role` ENUM('OWNER', 'ADMIN', 'MEMBER') NOT NULL,
    `workspace_member_joined_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `workspace_member_workspace_member_workspace_id_workspace_mem_key`(`workspace_member_workspace_id`, `workspace_member_user_id`),
    PRIMARY KEY (`workspace_member_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `page` (
    `page_id` VARCHAR(191) NOT NULL,
    `page_workspace_id` VARCHAR(191) NOT NULL,
    `page_parent_id` VARCHAR(191) NULL,
    `page_title` VARCHAR(191) NOT NULL,
    `page_icon` VARCHAR(191) NULL,
    `page_cover_image` TEXT NULL,
    `page_position` INTEGER NOT NULL,
    `page_created_by` VARCHAR(191) NOT NULL,
    `page_created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `page_updated_at` DATETIME(3) NOT NULL,
    `page_is_deleted` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`page_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `block` (
    `block_id` VARCHAR(191) NOT NULL,
    `block_page_id` VARCHAR(191) NOT NULL,
    `block_type` ENUM('TEXT', 'HEADING', 'LIST', 'CODE', 'IMAGE') NOT NULL,
    `block_content` JSON NOT NULL,
    `block_position` INTEGER NOT NULL,
    `block_created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `block_updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`block_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `page_permission` (
    `page_permission_id` VARCHAR(191) NOT NULL,
    `page_permission_page_id` VARCHAR(191) NOT NULL,
    `page_permission_user_id` VARCHAR(191) NULL,
    `page_permission_level` ENUM('VIEW', 'COMMENT', 'EDIT') NOT NULL,
    `page_permission_share_link_token` VARCHAR(191) NULL,
    `page_permission_created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `page_permission_expires_at` DATETIME(3) NULL,

    UNIQUE INDEX `page_permission_page_permission_share_link_token_key`(`page_permission_share_link_token`),
    PRIMARY KEY (`page_permission_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `comment` (
    `comment_id` VARCHAR(191) NOT NULL,
    `comment_page_id` VARCHAR(191) NOT NULL,
    `comment_block_id` VARCHAR(191) NULL,
    `comment_user_id` VARCHAR(191) NOT NULL,
    `comment_content` TEXT NOT NULL,
    `comment_parent_comment_id` VARCHAR(191) NULL,
    `comment_created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `comment_updated_at` DATETIME(3) NOT NULL,
    `comment_is_deleted` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`comment_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mention` (
    `mention_id` VARCHAR(191) NOT NULL,
    `mention_comment_id` VARCHAR(191) NOT NULL,
    `mention_mentioned_user_id` VARCHAR(191) NOT NULL,
    `mention_is_read` BOOLEAN NOT NULL DEFAULT false,
    `mention_created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`mention_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `recent_page` (
    `recent_page_id` VARCHAR(191) NOT NULL,
    `recent_page_user_id` VARCHAR(191) NOT NULL,
    `recent_page_page_id` VARCHAR(191) NOT NULL,
    `recent_page_visited_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `recent_page_recent_page_user_id_recent_page_page_id_key`(`recent_page_user_id`, `recent_page_page_id`),
    PRIMARY KEY (`recent_page_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `workspace` ADD CONSTRAINT `workspace_workspace_owner_id_fkey` FOREIGN KEY (`workspace_owner_id`) REFERENCES `user`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `workspace_member` ADD CONSTRAINT `workspace_member_workspace_member_workspace_id_fkey` FOREIGN KEY (`workspace_member_workspace_id`) REFERENCES `workspace`(`workspace_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `workspace_member` ADD CONSTRAINT `workspace_member_workspace_member_user_id_fkey` FOREIGN KEY (`workspace_member_user_id`) REFERENCES `user`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `page` ADD CONSTRAINT `page_page_workspace_id_fkey` FOREIGN KEY (`page_workspace_id`) REFERENCES `workspace`(`workspace_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `page` ADD CONSTRAINT `page_page_created_by_fkey` FOREIGN KEY (`page_created_by`) REFERENCES `user`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `page` ADD CONSTRAINT `page_page_parent_id_fkey` FOREIGN KEY (`page_parent_id`) REFERENCES `page`(`page_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `block` ADD CONSTRAINT `block_block_page_id_fkey` FOREIGN KEY (`block_page_id`) REFERENCES `page`(`page_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `page_permission` ADD CONSTRAINT `page_permission_page_permission_page_id_fkey` FOREIGN KEY (`page_permission_page_id`) REFERENCES `page`(`page_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `page_permission` ADD CONSTRAINT `page_permission_page_permission_user_id_fkey` FOREIGN KEY (`page_permission_user_id`) REFERENCES `user`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comment` ADD CONSTRAINT `comment_comment_page_id_fkey` FOREIGN KEY (`comment_page_id`) REFERENCES `page`(`page_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comment` ADD CONSTRAINT `comment_comment_block_id_fkey` FOREIGN KEY (`comment_block_id`) REFERENCES `block`(`block_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comment` ADD CONSTRAINT `comment_comment_user_id_fkey` FOREIGN KEY (`comment_user_id`) REFERENCES `user`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comment` ADD CONSTRAINT `comment_comment_parent_comment_id_fkey` FOREIGN KEY (`comment_parent_comment_id`) REFERENCES `comment`(`comment_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mention` ADD CONSTRAINT `mention_mention_comment_id_fkey` FOREIGN KEY (`mention_comment_id`) REFERENCES `comment`(`comment_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mention` ADD CONSTRAINT `mention_mention_mentioned_user_id_fkey` FOREIGN KEY (`mention_mentioned_user_id`) REFERENCES `user`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `recent_page` ADD CONSTRAINT `recent_page_recent_page_user_id_fkey` FOREIGN KEY (`recent_page_user_id`) REFERENCES `user`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `recent_page` ADD CONSTRAINT `recent_page_recent_page_page_id_fkey` FOREIGN KEY (`recent_page_page_id`) REFERENCES `page`(`page_id`) ON DELETE CASCADE ON UPDATE CASCADE;
