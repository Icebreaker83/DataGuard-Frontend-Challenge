import { defineStore } from "pinia";
import {
  SearchRepositoriesFilters,
  GithubRepository,
  GithubRepositoriesByLanguage,
} from "./types";

export const useGithubStore = defineStore(
  "github",
  () => {
    const filters = ref<SearchRepositoriesFilters>({
      language: [],
      created: { from: null, to: null },
      stars: { from: null },
    });
    const repositoriesByLanguage = ref<GithubRepositoriesByLanguage[]>([]);

    const setRepositoriesByLanguage = (repositories: GithubRepository[]) => {
      repositoriesByLanguage.value = repositories.reduce((acc, item) => {
        const {
          language,
          name,
          description,
          stargazers_count,
          html_url,
          created_at,
        } = item;
        const toAdd = {
          language,
          name,
          description,
          stargazers_count,
          html_url,
          created_at,
        };
        const languageGroup = acc.find((el) => el.value === item.language);
        if (!languageGroup) {
          acc.push({ value: item.language, items: [toAdd] });
          return acc;
        }
        languageGroup.items.push(toAdd);
        return acc;
      }, <GithubRepositoriesByLanguage[]>[]);
    };

    return {
      filters,
      repositoriesByLanguage,
      setRepositoriesByLanguage,
    };
  },
  { persist: true }
);
