export const programmingLanguages = [
  { value: "javascript", title: "JavaScript" },
  { value: "typescript", title: "TypeScript" },
  { value: "c", title: "C" },
] as const;

export const programmingLanguagesTitles = programmingLanguages.reduce(
  (acc, item) => {
    Object.assign(acc, { [item.value]: item.title });
    return acc;
  },
  <{ [key: string]: string }>{}
);
