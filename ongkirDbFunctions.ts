"use server";
import { sql } from "drizzle-orm";

export async function searchSubdistrict(searchTerm: string) {
  const results = await sql`
    SELECT
      d.subdistrict_id AS "subdistrictId",
      d.subdistrict_name AS "subdistrictName",
      c.city_id AS "cityId",
      c.city_name AS "cityName",
      p.province_id AS "provinceId",
      p.province_name AS "provinceName"
    FROM
      dot_assignment.tb_ro_subdistricts d
    LEFT JOIN
      dot_assignment.tb_ro_cities c ON d.city_id = c.city_id
    LEFT JOIN
      dot_assignment.tb_ro_provinces p ON c.province_id = p.province_id
    WHERE
      d.subdistrict_name ILIKE '%' || ${searchTerm} || '%'
    LIMIT 10
  `;

  const decodedResults = Array.isArray(results)
    ? results.map((row) =>
        // @ts-ignore
        results.decoder.mapFromDriverValue(row)
      )
    : [];

  return decodedResults;
}
