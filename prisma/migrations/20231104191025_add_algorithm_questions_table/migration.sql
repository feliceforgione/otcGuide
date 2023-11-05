-- CreateTable
CREATE TABLE `algorithm_questions` (
    `algorithm_question_id` INTEGER NOT NULL AUTO_INCREMENT,
    `disease_subclass_id` INTEGER NULL,
    `question` VARCHAR(255) NULL,
    `question_list` TINYTEXT NULL,
    `yes_type` ENUM('question', 'referral', 'plan', 'symptoms') NOT NULL,
    `yes_link_id` INTEGER NULL,
    `no_type` ENUM('question', 'referral', 'plan', 'symptoms') NOT NULL,
    `no_link_id` INTEGER NULL,
    `referral_comments` TINYTEXT NOT NULL,
    `comments` TEXT NOT NULL,

    PRIMARY KEY (`algorithm_question_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
