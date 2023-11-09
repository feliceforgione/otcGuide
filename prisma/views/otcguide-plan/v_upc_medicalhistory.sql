SELECT
  row_number() OVER (
    ORDER BY
      `r`.`upc`,
      `r`.`ingredient_name_id`,
      `r`.`medical_condition_id`
  ) AS `row_num`,
  `r`.`upc` AS `upc`,
  `r`.`ingredient_id` AS `ingredient_id`,
  `r`.`ingredient_name_id` AS `ingredient_name_id`,
  `r`.`ingredient_name` AS `ingredient_name`,
  `r`.`ingredient_broader_name_id` AS `ingredient_broader_name_id`,
  `r`.`ingredient_broader_name` AS `ingredient_broader_name`,
  `r`.`ingredient_type_id` AS `ingredient_type_id`,
  `r`.`ingredient_hypoallergenic` AS `ingredient_hypoallergenic`,
  `r`.`medical_condition_id` AS `medical_condition_id`,
  `r`.`medical_condition_layman_term` AS `medical_condition_layman_term`
FROM
  (
    SELECT
      DISTINCT `bc`.`upc` AS `upc`,
      `i`.`ingredient_id` AS `ingredient_id`,
      `in`.`ingredient_name_id` AS `ingredient_name_id`,
      `in`.`ingredient_name` AS `ingredient_name`,
      `ibn`.`ingredient_name_id` AS `ingredient_broader_name_id`,
      `ibn`.`ingredient_name` AS `ingredient_broader_name`,
      `it`.`ingredient_type_id` AS `ingredient_type_id`,
      `i`.`ingredient_hypoallergenic` AS `ingredient_hypoallergenic`,
      `limc`.`medical_condition_id` AS `medical_condition_id`,
      `mc`.`medical_condition_layman_term` AS `medical_condition_layman_term`
    FROM
      (
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
              JOIN `otcguide-plan`.`ingredient_name` `in` ON(
                (
                  `i`.`ingredient_name_id` = `in`.`ingredient_name_id`
                )
              )
            )
            LEFT JOIN `otcguide-plan`.`ingredient_name` `ibn` ON(
              (
                `in`.`ingredient_broader_name_id` = `ibn`.`ingredient_name_id`
              )
            )
          )
          LEFT JOIN `otcguide-plan`.`lnk_ingredient_medical_condition` `limc` ON((`limc`.`ingredient_id` = `i`.`ingredient_id`))
        )
        LEFT JOIN `otcguide-plan`.`medical_conditions` `mc` ON(
          (
            `limc`.`medical_condition_id` = `mc`.`medical_condition_id`
          )
        )
      )
  ) `r`