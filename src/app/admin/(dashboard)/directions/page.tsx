import { Plus, Trash2, Zap } from "lucide-react";
import { getDirectionsAdmin } from "@/lib/admin-data";
import { Field, inputClass } from "@/components/admin/Field";
import { SaveButton } from "@/components/admin/SaveButton";
import { ConfirmSubmitButton } from "@/components/admin/ConfirmSubmitButton";
import { VisibilityToggle } from "@/components/admin/VisibilityToggle";
import { SortButtons } from "@/components/admin/SortButtons";
import { IconPicker } from "@/components/admin/IconPicker";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { getServerLocale } from "@/lib/i18n/server";
import { dictionaries } from "@/lib/i18n/dictionary";
import {
  addDirection,
  addDirectionItem,
  deleteDirection,
  deleteDirectionItem,
  moveDirection,
  moveDirectionItem,
  toggleDirection,
  toggleDirectionItem,
  updateDirection,
  updateDirectionItem,
} from "./actions";

export const metadata = { title: "Наші напрями — RAKURS TRADE" };

export default async function DirectionsAdminPage() {
  const [directions, locale] = await Promise.all([getDirectionsAdmin(), getServerLocale()]);
  const dict = dictionaries[locale].admin;
  const t = dict.directions;
  const ukSuffix = dict.common.contentUkSuffix;
  const enSuffix = dict.common.contentEnSuffix;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-extrabold text-white">{t.title}</h1>
          <p className="mt-1 text-sm text-white/50">{t.subtitle}</p>
        </div>
        <form action={addDirection}>
          <button
            type="submit"
            className="flex items-center gap-1.5 rounded-none border border-brand/30 px-3 py-2 text-xs font-bold uppercase tracking-wide text-brand hover:bg-brand/10"
          >
            <Plus className="h-3.5 w-3.5" />
            {t.addDirectionButton}
          </button>
        </form>
      </div>

      <div className="space-y-6">
        {directions.map((direction, i) => (
          <div key={direction.id} className="rounded-none border border-ink-border bg-ink-card p-6">
            <div className="flex items-start gap-3">
              <SortButtons
                onUp={moveDirection.bind(null, direction.id, "up")}
                onDown={moveDirection.bind(null, direction.id, "down")}
                disableUp={i === 0}
                disableDown={i === directions.length - 1}
                locale={locale}
              />

              <form
                action={updateDirection.bind(null, direction.id)}
                className="flex-1 space-y-4"
              >
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field label={`${t.titleLabel}${ukSuffix}`}>
                    <input name="title" defaultValue={direction.title} className={inputClass} />
                  </Field>
                  <Field label={t.iconLabel}>
                    <IconPicker name="icon" defaultValue={direction.icon} locale={locale} />
                  </Field>
                </div>
                <Field label={`${t.titleLabel}${enSuffix}`}>
                  <input name="title_en" defaultValue={direction.title_en} className={inputClass} />
                </Field>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field label={`${t.buttonTextLabel}${ukSuffix}`}>
                    <input
                      name="button_text"
                      defaultValue={direction.button_text}
                      className={inputClass}
                    />
                  </Field>
                  <Field label={`${t.buttonTextLabel}${enSuffix}`}>
                    <input
                      name="button_text_en"
                      defaultValue={direction.button_text_en}
                      className={inputClass}
                    />
                  </Field>
                </div>
                <Field label={t.buttonLinkLabel}>
                  <input
                    name="button_link"
                    defaultValue={direction.button_link}
                    className={inputClass}
                  />
                </Field>

                <Field label={t.imageLabel} hint={t.imageHint}>
                  <ImageUploader
                    name="image_url"
                    defaultUrl={direction.image_url}
                    folder="directions"
                    locale={locale}
                  />
                </Field>

                <label className="flex items-center gap-2.5 text-sm text-white/70">
                  <input
                    type="checkbox"
                    name="enable_lightning_effect"
                    defaultChecked={direction.enable_lightning_effect}
                    className="h-4 w-4 rounded-none border-ink-border accent-brand"
                  />
                  <Zap className="h-4 w-4 text-brand" />
                  {t.lightningLabel}
                </label>

                <SaveButton locale={locale} />
              </form>

              <div className="flex flex-col items-center gap-2">
                <VisibilityToggle
                  isVisible={direction.is_visible}
                  action={toggleDirection.bind(null, direction.id, direction.is_visible)}
                  locale={locale}
                />
                <form action={deleteDirection}>
                  <input type="hidden" name="id" value={direction.id} />
                  <ConfirmSubmitButton
                    label={<Trash2 className="h-4 w-4" />}
                    confirmText={t.deleteDirectionConfirm}
                    className="flex h-8 w-8 items-center justify-center rounded-none border border-red-500/20 text-red-400 hover:bg-red-500/10"
                  />
                </form>
              </div>
            </div>

            <div className="ml-8 mt-5 border-t border-ink-border pt-5">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold uppercase tracking-wide text-white/50">
                  {t.itemsHeading}
                </p>
                <form action={addDirectionItem.bind(null, direction.id)}>
                  <button
                    type="submit"
                    className="flex items-center gap-1 text-xs font-bold uppercase tracking-wide text-brand hover:underline"
                  >
                    <Plus className="h-3 w-3" />
                    {t.addItemButton}
                  </button>
                </form>
              </div>

              <div className="mt-3 space-y-2">
                {direction.items.map((item, itemIndex) => (
                  <div key={item.id} className="flex items-center gap-2">
                    <SortButtons
                      onUp={moveDirectionItem.bind(null, direction.id, item.id, "up")}
                      onDown={moveDirectionItem.bind(null, direction.id, item.id, "down")}
                      disableUp={itemIndex === 0}
                      disableDown={itemIndex === direction.items.length - 1}
                      locale={locale}
                    />
                    <form
                      action={updateDirectionItem.bind(null, item.id)}
                      className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center"
                    >
                      <input
                        name="text"
                        defaultValue={item.text}
                        placeholder={`${ukSuffix}`}
                        className={`${inputClass} flex-1`}
                      />
                      <input
                        name="text_en"
                        defaultValue={item.text_en}
                        placeholder={`${enSuffix}`}
                        className={`${inputClass} flex-1`}
                      />
                      <SaveButton label="OK" locale={locale} />
                    </form>
                    <VisibilityToggle
                      isVisible={item.is_visible}
                      action={toggleDirectionItem.bind(null, item.id, item.is_visible)}
                      locale={locale}
                    />
                    <form action={deleteDirectionItem}>
                      <input type="hidden" name="id" value={item.id} />
                      <ConfirmSubmitButton
                        label={<Trash2 className="h-4 w-4" />}
                        confirmText={t.deleteItemConfirm}
                        className="flex h-8 w-8 items-center justify-center rounded-none border border-red-500/20 text-red-400 hover:bg-red-500/10"
                      />
                    </form>
                  </div>
                ))}

                {direction.items.length === 0 && (
                  <p className="text-xs text-white/30">{t.emptyItems}</p>
                )}
              </div>
            </div>
          </div>
        ))}

        {directions.length === 0 && (
          <p className="rounded-none border border-dashed border-ink-border p-8 text-center text-sm text-white/40">
            {t.emptyDirections}
          </p>
        )}
      </div>
    </div>
  );
}
