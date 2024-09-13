import { expect, test } from "vitest";
import {
  getFilterTextFromRouteQuery,
  getFilterTextFromActiveFilters,
  getSearchQuery,
} from "./constants";
import { getLocalizedValue } from "@/util/helpers";

const fromDate = "2020-01-01";
const toDate = "2024-01-01";
const stars = 10000;
const filters = {
  language: ["javascript", "typescript"],
  created: { from: "2020-01-01", to: null },
  stars: { from: 10000 },
};
const expectedResult = [
  `from ${getLocalizedValue(fromDate)}`,
  `to ${getLocalizedValue(toDate)}`,
  `between ${getLocalizedValue(fromDate)} and ${getLocalizedValue(toDate)}`,
  `with at least ${getLocalizedValue(stars)} stars`,
];

test("get active filter text from route query", () => {
  const result1 = getFilterTextFromRouteQuery(`created:>=${fromDate}`, filters);
  const result2 = getFilterTextFromRouteQuery(`created:<=${toDate}`, filters);
  const result3 = getFilterTextFromRouteQuery(
    `created:${fromDate}..${toDate}`,
    filters
  );
  const result4 = getFilterTextFromRouteQuery("stars:>=10000", filters);

  expect(result1).toBe(expectedResult[0]);
  expect(result2).toBe(expectedResult[1]);
  expect(result3).toBe(expectedResult[2]);
  expect(result4).toBe(expectedResult[3]);
});

test("get search query from filters", () => {
  const result = getFilterTextFromActiveFilters(filters);

  expect(result).toBeInstanceOf(Array);
  expect(result.length).toBe(2);
  expect(result).toEqual([expectedResult[0], expectedResult[3]]);
});

test("get search query from filters", () => {
  const result = getSearchQuery(filters);

  expect(result).toBe(
    `language:javascript+language:typescript+created:>=${fromDate}+stars:>=${stars}`
  );
});
