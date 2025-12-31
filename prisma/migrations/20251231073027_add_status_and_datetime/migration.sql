/*
  Warnings:

  - You are about to drop the column `block_created_at` on the `block` table. All the data in the column will be lost.
  - You are about to drop the column `block_updated_at` on the `block` table. All the data in the column will be lost.
  - You are about to drop the column `comment_created_at` on the `comment` table. All the data in the column will be lost.
  - You are about to drop the column `comment_is_deleted` on the `comment` table. All the data in the column will be lost.
  - You are about to drop the column `comment_updated_at` on the `comment` table. All the data in the column will be lost.
  - You are about to drop the column `mention_created_at` on the `mention` table. All the data in the column will be lost.
  - You are about to drop the column `page_created_at` on the `page` table. All the data in the column will be lost.
  - You are about to drop the column `page_is_deleted` on the `page` table. All the data in the column will be lost.
  - You are about to drop the column `page_updated_at` on the `page` table. All the data in the column will be lost.
  - You are about to drop the column `page_permission_created_at` on the `page_permission` table. All the data in the column will be lost.
  - You are about to drop the column `user_created_at` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `user_updated_at` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `workspace_created_at` on the `workspace` table. All the data in the column will be lost.
  - You are about to drop the column `workspace_updated_at` on the `workspace` table. All the data in the column will be lost.
  - You are about to drop the column `workspace_member_joined_at` on the `workspace_member` table. All the data in the column will be lost.
  - Added the required column `upd_datetime` to the `block` table without a default value. This is not possible if the table is not empty.
  - Added the required column `upd_datetime` to the `comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `upd_datetime` to the `page` table without a default value. This is not possible if the table is not empty.
  - Added the required column `upd_datetime` to the `page_permission` table without a default value. This is not possible if the table is not empty.
  - Added the required column `upd_datetime` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `upd_datetime` to the `workspace` table without a default value. This is not possible if the table is not empty.
  - Added the required column `upd_datetime` to the `workspace_member` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `block` DROP COLUMN `block_created_at`,
    DROP COLUMN `block_updated_at`,
    ADD COLUMN `reg_datetime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `upd_datetime` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `comment` DROP COLUMN `comment_created_at`,
    DROP COLUMN `comment_is_deleted`,
    DROP COLUMN `comment_updated_at`,
    ADD COLUMN `comment_status` ENUM('ACTIVE', 'DELETED') NOT NULL DEFAULT 'ACTIVE',
    ADD COLUMN `del_datetime` DATETIME(3) NULL,
    ADD COLUMN `reg_datetime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `upd_datetime` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `mention` DROP COLUMN `mention_created_at`,
    ADD COLUMN `reg_datetime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `page` DROP COLUMN `page_created_at`,
    DROP COLUMN `page_is_deleted`,
    DROP COLUMN `page_updated_at`,
    ADD COLUMN `del_datetime` DATETIME(3) NULL,
    ADD COLUMN `page_status` ENUM('ACTIVE', 'DELETED') NOT NULL DEFAULT 'ACTIVE',
    ADD COLUMN `reg_datetime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `upd_datetime` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `page_permission` DROP COLUMN `page_permission_created_at`,
    ADD COLUMN `reg_datetime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `upd_datetime` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `user_created_at`,
    DROP COLUMN `user_updated_at`,
    ADD COLUMN `del_datetime` DATETIME(3) NULL,
    ADD COLUMN `reg_datetime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `upd_datetime` DATETIME(3) NOT NULL,
    ADD COLUMN `user_status` ENUM('ACTIVE', 'INACTIVE', 'SUSPENDED', 'DELETED') NOT NULL DEFAULT 'ACTIVE';

-- AlterTable
ALTER TABLE `workspace` DROP COLUMN `workspace_created_at`,
    DROP COLUMN `workspace_updated_at`,
    ADD COLUMN `del_datetime` DATETIME(3) NULL,
    ADD COLUMN `reg_datetime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `upd_datetime` DATETIME(3) NOT NULL,
    ADD COLUMN `workspace_status` ENUM('ACTIVE', 'ARCHIVED', 'DELETED') NOT NULL DEFAULT 'ACTIVE';

-- AlterTable
ALTER TABLE `workspace_member` DROP COLUMN `workspace_member_joined_at`,
    ADD COLUMN `reg_datetime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `upd_datetime` DATETIME(3) NOT NULL,
    ADD COLUMN `workspace_member_status` ENUM('ACTIVE', 'INVITED', 'INACTIVE') NOT NULL DEFAULT 'ACTIVE';
