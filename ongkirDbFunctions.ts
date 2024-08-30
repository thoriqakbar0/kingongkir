"use server";
import { db, districts, cities, provinces } from "./schema";
import { eq, like } from "drizzle-orm";

export async function searchSubdistrict(searchTerm: string) {
  console.log("Searching for subdistrict:", searchTerm);
  const results = await db
    .select({
      subdistrictId: districts.id,
      subdistrictName: districts.name,
      cityId: cities.id,
      cityName: cities.name,
      provinceId: provinces.id,
      provinceName: provinces.name,
    })
    .from(districts)
    .leftJoin(cities, eq(districts.cityId, cities.id))
    .leftJoin(provinces, eq(cities.provinceId, provinces.id))
    .where(like(districts.name, `%${searchTerm}%`))
    .limit(10);

  return results;
}
