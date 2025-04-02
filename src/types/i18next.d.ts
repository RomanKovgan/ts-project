import "i18next";
import en from "../locales/en.json";
import ru from "../locales/ru.json";

type Resources = typeof en & typeof ru;
declare module "i18next" {
  interface CustomTypeOptions {
    resources: Resources;
  }
}
