-- CreateTable
CREATE TABLE `lnk_mh_algorithm_ques` (
    `disease_subclass_id` INTEGER NOT NULL,
    `infant` INTEGER NULL,
    `child` INTEGER NULL,
    `adult_female` INTEGER NOT NULL,
    `adult_male` INTEGER NOT NULL,
    `elderly_female` INTEGER NULL,
    `elderly_male` INTEGER NULL,
    `pregnant` INTEGER NULL,
    `nursing` INTEGER NULL,

    PRIMARY KEY (`disease_subclass_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
