SELECT
  row_number() OVER (
    ORDER BY
      `r`.`upc`,
      `r`.`ingredient_name_id`,
      `r`.`filter_question_id`
  ) AS `row_num`,
  `r`.`upc` AS `upc`,
  `r`.`ingredient_id` AS `ingredient_id`,
  `r`.`ingredient_name_id` AS `ingredient_name_id`,
  `r`.`ingredient_name` AS `ingredient_name`,
  `r`.`filter_question_id` AS `filter_question_id`,
  `r`.`question` AS `question`
FROM
  (
    SELECT
      DISTINCT `bc`.`upc` AS `upc`,
      `i`.`ingredient_id` AS `ingredient_id`,
      `in`.`ingredient_name_id` AS `ingredient_name_id`,
      `in`.`ingredient_name` AS `ingredient_name`,
      `it`.`ingredient_type_id` AS `ingredient_type_id`,
      `fq`.`filter_question_id` AS `filter_question_id`,
      `fq`.`question` AS `question`
    FROM
      (
        (
          (
            (
              (
                `otcguide-plan`.`ingredients` `i`
                JOIN `otcguide-plan`.`brand_composition` `bc` ON((`bc`.`ingredient_id` = `i`.`ingredient_id`))
              )
              JOIN `otcguide-plan`.`ingredient_type` `it` ON(
                (
                  `bc`.`ingredient_type_id` = `it`.`ingredient_type_id`
                )
              )
            )
            LEFT JOIN `otcguide-plan`.`ingredient_name` `in` ON(
              (
                `i`.`ingredient_name_id` = `in`.`ingredient_name_id`
              )
            )
          )
          LEFT JOIN `otcguide-plan`.`lnk_ingredient_filter_questions` `lifq` ON((`lifq`.`ingredient_id` = `i`.`ingredient_id`))
        )
        LEFT JOIN `otcguide-plan`.`filter_questions` `fq` ON(
          (
            `lifq`.`filter_question_id` = `fq`.`filter_question_id`
          )
        )
      )
  ) `r`