import { createI18n } from "vue-i18n";
import en from "./en";

// Ready translated locale messages
const messages = {
  en,
};

export type MessageSchema = typeof en;

const isProd = import.meta.env.PROD;

const options = {
  locale: "en", // set locale
  legacy: false,
  missingWarn: !isProd,
  fallbackWarn: !isProd,
  silentTranslationWarn: isProd,
  messages, // set locale messages
};

const i18n = createI18n<[MessageSchema], "en">(options);

export default i18n;

export const t = i18n.global.t;
export const te = i18n.global.te;
