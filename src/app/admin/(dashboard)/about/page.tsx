import { Plus, Trash2 } from "lucide-react";
import { getAboutContentAdmin, getAboutStatsAdmin } from "@/lib/admin-data";
import { Field, inputClass } from "@/components/admin/Field";
import { SaveButton } from "@/components/admin/SaveButton";
import { ConfirmSubmitButton } from "@/components/admin/ConfirmSubmitButton";
import { VisibilityToggle } from "@/components/admin/VisibilityToggle";
import { SortButtons } from "@/components/admin/SortButtons";
import { IconPicker } from "@/components/admin/IconPicker";
import {
  addAboutStat,
  deleteAboutStat,
  moveAboutStat,
  toggleAboutStat,
  updateAboutContent,
  updateAboutStat,
} from "./actions";

export const metadata = { title: "Про компанію — RAKURS TRADE" };

export default async function AboutAdminPage() {
  const [about, stats] = await Promise.all([getAboutContentAdmin(), getAboutStatsAdmin()]);

  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-heading text-2xl font-extrabold text-white">Про компанію</h1>
        <p className="mt-1 text-sm text-white/50">Текст про компанію та ключові показники.</p>
      </div>

      <form
        action={updateAboutContent}
        className="space-y-4 rounded-xl border border-ink-border bg-ink-card p-6"
      >
        <Field label="Заголовок секції">
          <input name="heading" defaultValue={about?.heading} className={inputClass} />
        </Field>
        <Field label="Перший абзац">
          <textarea
            name="paragraph_1"
            defaultValue={about?.paragraph_1}
            rows={3}
            className={inputClass}
          />
        </Field>
        <Field label="Другий абзац">
          <textarea
            name="paragraph_2"
            defaultValue={about?.paragraph_2}
            rows={3}
            className={inputClass}
          />
        </Field>
        <SaveButton />
      </form>

      <div>
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-lg font-bold text-white">Показники</h2>
          <form action={addAboutStat}>
            <button
              type="submit"
              className="flex items-center gap-1.5 rounded-lg border border-brand/30 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-brand hover:bg-brand/10"
            >
              <Plus className="h-3.5 w-3.5" />
              Додати
            </button>
          </form>
        </div>

        <div className="mt-4 space-y-3">
          {stats.map((stat, i) => (
            <div key={stat.id} className="flex gap-3 rounded-xl border border-ink-border bg-ink-card p-4">
              <div className="flex items-center">
                <SortButtons
                  onUp={moveAboutStat.bind(null, stat.id, "up")}
                  onDown={moveAboutStat.bind(null, stat.id, "down")}
                  disableUp={i === 0}
                  disableDown={i === stats.length - 1}
                />
              </div>

              <form
                action={updateAboutStat.bind(null, stat.id)}
                className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-[10rem_6rem_1fr]"
              >
                <IconPicker name="icon" defaultValue={stat.icon} />
                <input
                  name="number_text"
                  defaultValue={stat.number_text}
                  className={inputClass}
                  placeholder="10+"
                />
                <input
                  name="label_text"
                  defaultValue={stat.label_text}
                  className={inputClass}
                  placeholder="Опис показника"
                />
                <div className="sm:col-span-3">
                  <SaveButton />
                </div>
              </form>

              <div className="flex flex-col items-center gap-2">
                <VisibilityToggle
                  isVisible={stat.is_visible}
                  action={toggleAboutStat.bind(null, stat.id, stat.is_visible)}
                />
                <form action={deleteAboutStat}>
                  <input type="hidden" name="id" value={stat.id} />
                  <ConfirmSubmitButton
                    label={<Trash2 className="h-4 w-4" />}
                    confirmText="Видалити цей показник?"
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-red-500/20 text-red-400 hover:bg-red-500/10"
                  />
                </form>
              </div>
            </div>
          ))}

          {stats.length === 0 && (
            <p className="rounded-xl border border-dashed border-ink-border p-6 text-center text-sm text-white/40">
              Ще немає жодного показника. Натисніть &quot;Додати&quot;.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
