-- AlterTable
ALTER TABLE `lnk_trt_plan_upc` MODIFY `upc` VARCHAR(25) NULL;

-- AddForeignKey
ALTER TABLE `lnk_trt_plan_upc` ADD CONSTRAINT `lnk_trt_plan_upc_upc_fkey` FOREIGN KEY (`upc`) REFERENCES `upc`(`upc`) ON DELETE SET NULL ON UPDATE CASCADE;
