import { Plus, Trash2 } from "lucide-react";
import { getHeroAdmin, getHeroFeaturesAdmin } from "@/lib/admin-data";
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
  addHeroFeature,
  deleteHeroFeature,
  moveHeroFeature,
  toggleHeroFeature,
  updateHero,
  updateHeroFeature,
} from "./actions";

export const metadata = { title: "Головний банер — RAKURS TRADE" };

export default async function HeroAdminPage() {
  const [hero, features, locale] = await Promise.all([
    getHeroAdmin(),
    getHeroFeaturesAdmin(),
    getServerLocale(),
  ]);
  const dict = dictionaries[locale].admin;
  const t = dict.hero;
  const ukSuffix = dict.common.contentUkSuffix;
  const enSuffix = dict.common.contentEnSuffix;

  return (
    <div className="admin-fade-up space-y-10">
      <div>
        <h1 className="font-heading text-2xl font-extrabold text-white">{t.title}</h1>
        <p className="mt-1 text-sm text-white/50">{t.subtitle}</p>
      </div>

      <form action={updateHero} className="admin-card-hover space-y-4 rounded-none border border-ink-border bg-ink-card p-6">
        <Field label={`${t.titleMainLabel}${ukSuffix}`} hint={t.titleMainHint}>
          <textarea
            name="title_main"
            defaultValue={hero?.title_main}
            rows={3}
            className={inputClass}
          />
        </Field>
        <Field label={`${t.titleMainLabel}${enSuffix}`}>
          <textarea
            name="title_main_en"
            defaultValue={hero?.title_main_en}
            rows={3}
            className={inputClass}
          />
        </Field>
        <Field label={`${t.titleHighlightLabel}${ukSuffix}`} hint={t.titleHighlightHint}>
          <textarea
            name="title_highlight"
            defaultValue={hero?.title_highlight}
            rows={2}
            className={inputClass}
          />
        </Field>
        <Field label={`${t.titleHighlightLabel}${enSuffix}`}>
          <textarea
            name="title_highlight_en"
            defaultValue={hero?.title_highlight_en}
            rows={2}
            className={inputClass}
          />
        </Field>
        <Field label={`${t.subtitleLabel}${ukSuffix}`}>
          <textarea
            name="subtitle"
            defaultValue={hero?.subtitle}
            rows={3}
            className={inputClass}
          />
        </Field>
        <Field label={`${t.subtitleLabel}${enSuffix}`}>
          <textarea
            name="subtitle_en"
            defaultValue={hero?.subtitle_en}
            rows={3}
            className={inputClass}
          />
        </Field>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label={`${t.ctaTextLabel}${ukSuffix}`}>
            <input name="cta_text" defaultValue={hero?.cta_text} className={inputClass} />
          </Field>
          <Field label={`${t.ctaTextLabel}${enSuffix}`}>
            <input name="cta_text_en" defaultValue={hero?.cta_text_en} className={inputClass} />
          </Field>
        </div>
        <Field label={t.ctaLinkLabel} hint={t.ctaLinkHint}>
          <input name="cta_link" defaultValue={hero?.cta_link} className={inputClass} />
        </Field>
        <Field label={t.backgroundImageLabel} hint={t.backgroundImageHint}>
          <ImageUploader
            name="background_image_url"
            defaultUrl={hero?.background_image_url ?? null}
            folder="hero"
            locale={locale}
          />
        </Field>
        <SaveButton locale={locale} />
      </form>

      <div>
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-lg font-bold text-white">{t.featuresHeading}</h2>
          <form action={addHeroFeature}>
            <button
              type="submit"
              className="flex items-center gap-1.5 rounded-none border border-brand/30 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-brand transition-all hover:-translate-y-0.5 hover:bg-brand/10"
            >
              <Plus className="h-3.5 w-3.5" />
              {t.addButton}
            </button>
          </form>
        </div>

        <div className="mt-4 space-y-4">
          {features.map((feature, i) => (
            <div
              key={feature.id}
              style={{ animationDelay: `${i * 70}ms` }}
              className="admin-card-hover admin-stagger-in rounded-none border border-ink-border bg-ink-card p-6"
            >
              <div className="flex items-start gap-3">
                <SortButtons
                  onUp={moveHeroFeature.bind(null, feature.id, "up")}
                  onDown={moveHeroFeature.bind(null, feature.id, "down")}
                  disableUp={i === 0}
                  disableDown={i === features.length - 1}
                  locale={locale}
                />

                <form
                  action={updateHeroFeature.bind(null, feature.id)}
                  className="flex-1 space-y-4"
                >
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-[12rem_1fr_1fr]">
                    <Field label={t.featureIconLabel}>
                      <IconPicker name="icon" defaultValue={feature.icon} locale={locale} />
                    </Field>
                    <Field label={`${t.featureTitlePlaceholder}${ukSuffix}`}>
                      <input name="title" defaultValue={feature.title} className={inputClass} />
                    </Field>
                    <Field label={`${t.featureTitlePlaceholder}${enSuffix}`}>
                      <input name="title_en" defaultValue={feature.title_en} className={inputClass} />
                    </Field>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Field label={`${t.featureSubtitlePlaceholder}${ukSuffix}`}>
                      <textarea
                        name="subtitle"
                        defaultValue={feature.subtitle}
                        rows={2}
                        className={inputClass}
                      />
                    </Field>
                    <Field label={`${t.featureSubtitlePlaceholder}${enSuffix}`}>
                      <textarea
                        name="subtitle_en"
                        defaultValue={feature.subtitle_en}
                        rows={2}
                        className={inputClass}
                      />
                    </Field>
                  </div>

                  <SaveButton label={dict.common.save} locale={locale} />
                </form>

                <div className="flex flex-col items-center gap-2">
                  <VisibilityToggle
                    isVisible={feature.is_visible}
                    action={toggleHeroFeature.bind(null, feature.id, feature.is_visible)}
                    locale={locale}
                  />
                  <form action={deleteHeroFeature}>
                    <input type="hidden" name="id" value={feature.id} />
                    <ConfirmSubmitButton
                      label={<Trash2 className="h-4 w-4" />}
                      confirmText={t.deleteFeatureConfirm}
                      className="flex h-8 w-8 items-center justify-center rounded-none border border-red-500/20 text-red-400 hover:bg-red-500/10"
                    />
                  </form>
                </div>
              </div>
            </div>
          ))}

          {features.length === 0 && (
            <p className="rounded-none border border-dashed border-ink-border p-6 text-center text-sm text-white/40">
              {t.emptyFeatures}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
