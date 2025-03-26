import "i18next";
import translationEn from "../locales/en";

declare module "i18next" {
  interface CustomTypeOptions {
    resources: typeof translationEn;
    // Если есть несколько namespaces:
    // defaultNS: "translation";
    // ns: ["translation", "common"];
  }
}
