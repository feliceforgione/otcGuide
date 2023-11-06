-- DropForeignKey
ALTER TABLE `images` DROP FOREIGN KEY `images_upc_fkey`;

-- AlterTable
ALTER TABLE `images` MODIFY `upc` VARCHAR(25) NULL;

-- AddForeignKey
ALTER TABLE `images` ADD CONSTRAINT `images_upc_fkey` FOREIGN KEY (`upc`) REFERENCES `upc`(`upc`) ON DELETE SET NULL ON UPDATE CASCADE;
