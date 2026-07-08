import { ICON_OPTIONS } from "@/lib/icons";
import { inputClass } from "./Field";
import type { Locale } from "@/lib/i18n/locale";
import { dictionaries } from "@/lib/i18n/dictionary";

export function IconPicker({
  name,
  defaultValue,
  locale = "uk",
}: {
  name: string;
  defaultValue: string;
  locale?: Locale;
}) {
  const labels = dictionaries[locale].admin.iconPicker;

  return (
    <select
      name={name}
      defaultValue={defaultValue}
      className={`${inputClass} transition-colors duration-200 hover:border-brand/50`}
    >
      {ICON_OPTIONS.map((icon) => (
        <option key={icon} value={icon}>
          {labels[icon as keyof typeof labels] ?? icon}
        </option>
      ))}
    </select>
  );
}
