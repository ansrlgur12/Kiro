/*
  Warnings:

  - You are about to drop the `recent_page` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `recent_page` DROP FOREIGN KEY `recent_page_recent_page_page_id_fkey`;

-- DropForeignKey
ALTER TABLE `recent_page` DROP FOREIGN KEY `recent_page_recent_page_user_id_fkey`;

-- DropTable
DROP TABLE `recent_page`;
