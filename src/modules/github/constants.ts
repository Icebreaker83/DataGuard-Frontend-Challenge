import { GithubFilter } from "./types";

const getRangeQuery = (
  from?: number | string | null,
  to?: number | string | null
) => {
  if (from && to) return `${from}..${to}`;
  if (from) return `>=${from}`;
  return `<=${to}`;
};

export const getSearchQuery = (filters: { [key: string]: GithubFilter }) => {
  const queries = Object.entries(filters).reduce((acc, [key, value]) => {
    if (value === undefined || value === null || value === "") return acc;
    if (Array.isArray(value)) {
      value.length && acc.push(value.map((item) => `${key}:${item}`).join("+"));
      return acc;
    }
    if (typeof value === "object" && ("from" in value || "to" in value)) {
      (value.from || value.to) &&
        acc.push(`${key}:${getRangeQuery(value.from, value.to)}`);
      return acc;
    }
    typeof value !== "object" && acc.push(`${key}:${value}`);
    return acc;
  }, <string[]>[]);
  if (!queries.length) return "";
  return `q=${queries.join("+")}&sort=stars&order=desc`;
};
