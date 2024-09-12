import { GithubFilter, SearchRepositoriesFilters } from "./types";
import { t } from "@/plugins/i18n";
import { getLocalizedDate } from "@/util/helpers";

export const filterReqex = /^(.+):(.+)$/;
export const betweenRegex = /^(.+)..(.+)$/;
export const fromRegex = /^>=(.+)$/;
export const toRegex = /^<=(.+)$/;

export const filtersDefinition = {
  between: {
    regex: /^(.+)\.\.(.+)$/,
    title: t("filters.between"),
    query: (from: string | number, to: string | number) => {
      return `${from}..${to}`;
    },
  },
  from: {
    regex: /^>=(.+)$/,
    title: t("filters.from"),
    query: (value: string | number) => {
      return `>=${value}`;
    },
  },
  to: {
    regex: /^<=(.+)$/,
    title: t("filters.to"),
    query: (value: string | number) => {
      return `<=${value}`;
    },
  },
};

export const getFilterText = (
  filter: string,
  filters: SearchRepositoriesFilters
) => {
  const filterMatch = filterReqex.exec(filter);

  if (!filterMatch) return "";
  const filterKey = filterMatch[1];
  if (!(filterKey in filters) || filterKey === "language") return "";
  const value = filterMatch[2];

  for (const definition of Object.values(filtersDefinition)) {
    const valueMatch = definition.regex.exec(value);
    if (!valueMatch) continue;

    const values = valueMatch
      .slice(1)
      .map((item) => {
        const numVal = Number(item);
        if (!isNaN(numVal)) return numVal.toLocaleString();
        return getLocalizedDate(item);
      })
      .join(" " + t("misc.and") + " ");
    if (filterKey === "stars")
      return `${t("github.filters.stars.label").toLowerCase()} ${values} ${t(
        "github.filters.stars.self"
      )}`;
    return `${definition.title} ${values}`;
  }

  return "";
};

const getRangeQuery = (
  from?: number | string | null,
  to?: number | string | null
) => {
  if (from && to) return filtersDefinition.between.query(from, to);
  if (from) return filtersDefinition.from.query(from);
  return filtersDefinition.to.query(`${to}`);
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
  return queries.join("+");
};
