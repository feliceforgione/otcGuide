-- AlterTable
ALTER TABLE `algorithm_questions` MODIFY `yes_type` ENUM('question', 'referral', 'plan', 'symptoms') NULL,
    MODIFY `no_type` ENUM('question', 'referral', 'plan', 'symptoms') NULL,
    MODIFY `referral_comments` TINYTEXT NULL,
    MODIFY `comments` TEXT NULL;
