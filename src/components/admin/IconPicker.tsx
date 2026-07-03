import { ICON_OPTIONS } from "@/lib/icons";
import { inputClass } from "./Field";

const LABELS: Record<string, string> = {
  shield: "Щит (надійність)",
  gear: "Шестерня (експертиза)",
  trophy: "Кубок (якість)",
  "map-pin": "Мітка на карті",
  bolt: "Блискавка (енергія)",
  "shield-lightning": "Щит з блискавкою",
  crosshair: "Приціл (Defense)",
  calendar: "Календар",
  building: "Будівля",
  users: "Люди",
  "shield-check": "Щит з галочкою",
};

export function IconPicker({ name, defaultValue }: { name: string; defaultValue: string }) {
  return (
    <select name={name} defaultValue={defaultValue} className={inputClass}>
      {ICON_OPTIONS.map((icon) => (
        <option key={icon} value={icon}>
          {LABELS[icon] ?? icon}
        </option>
      ))}
    </select>
  );
}
