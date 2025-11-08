import "react-i18next";

import type { AppTranslationResources } from "./i18n";

declare module "react-i18next" {
  interface CustomTypeOptions {
    resources: AppTranslationResources;
  }
}

