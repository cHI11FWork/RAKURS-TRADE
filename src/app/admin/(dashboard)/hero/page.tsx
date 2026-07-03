import { Plus, Trash2 } from "lucide-react";
import { getHeroAdmin, getHeroFeaturesAdmin } from "@/lib/admin-data";
import { Field, inputClass } from "@/components/admin/Field";
import { SaveButton } from "@/components/admin/SaveButton";
import { ConfirmSubmitButton } from "@/components/admin/ConfirmSubmitButton";
import { VisibilityToggle } from "@/components/admin/VisibilityToggle";
import { SortButtons } from "@/components/admin/SortButtons";
import { IconPicker } from "@/components/admin/IconPicker";
import { ImageUploader } from "@/components/admin/ImageUploader";
import {
  addHeroFeature,
  deleteHeroFeature,
  moveHeroFeature,
  toggleHeroFeature,
  updateHero,
  updateHeroFeature,
} from "./actions";

export const metadata = { title: "Головний банер — RAKURS TRADE" };

export default async function HeroAdminPage() {
  const [hero, features] = await Promise.all([getHeroAdmin(), getHeroFeaturesAdmin()]);

  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-heading text-2xl font-extrabold text-white">Головний банер</h1>
        <p className="mt-1 text-sm text-white/50">
          Перший екран сайту: заголовок, опис, кнопка та фонове зображення.
        </p>
      </div>

      <form action={updateHero} className="space-y-4 rounded-xl border border-ink-border bg-ink-card p-6">
        <Field label="Заголовок (основна частина)" hint="Виводиться білим кольором">
          <textarea
            name="title_main"
            defaultValue={hero?.title_main}
            rows={3}
            className={inputClass}
          />
        </Field>
        <Field label="Заголовок (виділена частина)" hint="Виводиться жовтим кольором, продовжує основний заголовок">
          <textarea
            name="title_highlight"
            defaultValue={hero?.title_highlight}
            rows={2}
            className={inputClass}
          />
        </Field>
        <Field label="Підзаголовок">
          <textarea
            name="subtitle"
            defaultValue={hero?.subtitle}
            rows={3}
            className={inputClass}
          />
        </Field>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Текст кнопки">
            <input name="cta_text" defaultValue={hero?.cta_text} className={inputClass} />
          </Field>
          <Field label="Посилання кнопки" hint="Наприклад #contacts або https://...">
            <input name="cta_link" defaultValue={hero?.cta_link} className={inputClass} />
          </Field>
        </div>
        <Field
          label="Фонове зображення"
          hint="Якщо не завантажити — використовується стандартна ілюстрація з ефектом вогників"
        >
          <ImageUploader
            name="background_image_url"
            defaultUrl={hero?.background_image_url ?? null}
            folder="hero"
          />
        </Field>
        <SaveButton />
      </form>

      <div>
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-lg font-bold text-white">
            Переваги під банером
          </h2>
          <form action={addHeroFeature}>
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
          {features.map((feature, i) => (
            <div
              key={feature.id}
              className="flex gap-3 rounded-xl border border-ink-border bg-ink-card p-4"
            >
              <div className="flex items-center">
                <SortButtons
                  onUp={moveHeroFeature.bind(null, feature.id, "up")}
                  onDown={moveHeroFeature.bind(null, feature.id, "down")}
                  disableUp={i === 0}
                  disableDown={i === features.length - 1}
                />
              </div>

              <form
                action={updateHeroFeature.bind(null, feature.id)}
                className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-[10rem_1fr_1fr]"
              >
                <IconPicker name="icon" defaultValue={feature.icon} />
                <input name="title" defaultValue={feature.title} className={inputClass} placeholder="Заголовок" />
                <input
                  name="subtitle"
                  defaultValue={feature.subtitle}
                  className={inputClass}
                  placeholder="Опис"
                />
                <div className="sm:col-span-3">
                  <SaveButton label="Зберегти" />
                </div>
              </form>

              <div className="flex flex-col items-center gap-2">
                <VisibilityToggle
                  isVisible={feature.is_visible}
                  action={toggleHeroFeature.bind(null, feature.id, feature.is_visible)}
                />
                <form action={deleteHeroFeature}>
                  <input type="hidden" name="id" value={feature.id} />
                  <ConfirmSubmitButton
                    label={<Trash2 className="h-4 w-4" />}
                    confirmText="Видалити цю перевагу?"
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-red-500/20 text-red-400 hover:bg-red-500/10"
                  />
                </form>
              </div>
            </div>
          ))}

          {features.length === 0 && (
            <p className="rounded-xl border border-dashed border-ink-border p-6 text-center text-sm text-white/40">
              Ще немає жодної переваги. Натисніть &quot;Додати&quot;.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
