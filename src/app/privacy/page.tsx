import type { Metadata } from "next";
import { Logo } from "@/components/site/Logo";
import { Footer } from "@/components/site/Footer";
import { getServerLocale } from "@/lib/i18n/server";
import { getSiteSettings } from "@/lib/data";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: `Політика конфіденційності — ${SITE_NAME}`,
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

export default async function PrivacyPage() {
  const [locale, settings] = await Promise.all([getServerLocale(), getSiteSettings()]);
  const isEn = locale === "en";

  const legalName = (isEn ? settings?.legal_name_en : settings?.legal_name) || "RAKURS TRADE";
  const email = settings?.email || "";

  return (
    <>
      <header className="border-b border-white/5 bg-ink py-6">
        <div className="container-page">
          <Logo />
        </div>
      </header>

      <main className="flex-1 py-14">
        <div className="container-page max-w-3xl">
          {isEn ? (
            <>
              <h1 className="font-heading text-2xl font-extrabold uppercase tracking-wide text-white sm:text-3xl">
                Privacy Policy
              </h1>
              <p className="mt-2 text-sm text-white/50">Last updated: 2026</p>

              <div className="mt-8 space-y-6 text-sm leading-relaxed text-white/70">
                <p>
                  {legalName} ("we", "us") respects your privacy and is committed to protecting the
                  personal data you share with us through the contact form on this website, in
                  accordance with the Law of Ukraine "On Personal Data Protection".
                </p>

                <section>
                  <h2 className="font-heading text-base font-bold text-white">1. What data we collect</h2>
                  <p className="mt-2">
                    When you submit the contact form, we collect: name, phone number, company name
                    (optional), email address (optional), and the message you provide.
                  </p>
                </section>

                <section>
                  <h2 className="font-heading text-base font-bold text-white">2. Purpose of processing</h2>
                  <p className="mt-2">
                    We use this data solely to respond to your request, prepare a commercial offer,
                    and contact you regarding our products and services.
                  </p>
                </section>

                <section>
                  <h2 className="font-heading text-base font-bold text-white">3. Legal basis</h2>
                  <p className="mt-2">
                    Processing is based on your explicit consent, given by checking the consent box
                    before submitting the form.
                  </p>
                </section>

                <section>
                  <h2 className="font-heading text-base font-bold text-white">4. Data storage and sharing</h2>
                  <p className="mt-2">
                    Submitted data is stored in our secure database and may be forwarded to our
                    internal team messenger (Telegram) so a manager can respond promptly. We do not
                    sell or share your data with third parties for marketing purposes.
                  </p>
                </section>

                <section>
                  <h2 className="font-heading text-base font-bold text-white">5. Your rights</h2>
                  <p className="mt-2">
                    You may request access to, correction of, or deletion of your personal data, and
                    withdraw your consent at any time by contacting us{email ? " at " : ""}
                    {email && (
                      <a href={`mailto:${email}`} className="text-brand underline underline-offset-2">
                        {email}
                      </a>
                    )}
                    .
                  </p>
                </section>
              </div>
            </>
          ) : (
            <>
              <h1 className="font-heading text-2xl font-extrabold uppercase tracking-wide text-white sm:text-3xl">
                Політика конфіденційності
              </h1>
              <p className="mt-2 text-sm text-white/50">Останнє оновлення: 2026</p>

              <div className="mt-8 space-y-6 text-sm leading-relaxed text-white/70">
                <p>
                  {legalName} (далі — «ми») поважає вашу приватність і зобов'язується захищати
                  персональні дані, які ви надаєте через форму зворотного зв'язку на цьому сайті,
                  відповідно до Закону України «Про захист персональних даних».
                </p>

                <section>
                  <h2 className="font-heading text-base font-bold text-white">1. Які дані ми збираємо</h2>
                  <p className="mt-2">
                    При заповненні форми зворотного зв'язку ми збираємо: ім'я, номер телефону, назву
                    компанії (за бажанням), email (за бажанням) та текст вашого повідомлення.
                  </p>
                </section>

                <section>
                  <h2 className="font-heading text-base font-bold text-white">2. Мета обробки</h2>
                  <p className="mt-2">
                    Ці дані використовуються виключно для відповіді на ваш запит, підготовки
                    комерційної пропозиції та зв'язку з вами щодо наших товарів і послуг.
                  </p>
                </section>

                <section>
                  <h2 className="font-heading text-base font-bold text-white">3. Правова підстава</h2>
                  <p className="mt-2">
                    Обробка персональних даних здійснюється на підставі вашої явно вираженої згоди,
                    наданої шляхом встановлення позначки згоди перед надсиланням форми.
                  </p>
                </section>

                <section>
                  <h2 className="font-heading text-base font-bold text-white">4. Зберігання та передача даних</h2>
                  <p className="mt-2">
                    Надіслані дані зберігаються в нашій захищеній базі даних і можуть пересилатися
                    у внутрішній месенджер команди (Telegram), щоб менеджер міг оперативно
                    відповісти. Ми не продаємо та не передаємо ваші дані третім особам з
                    маркетинговою метою.
                  </p>
                </section>

                <section>
                  <h2 className="font-heading text-base font-bold text-white">5. Ваші права</h2>
                  <p className="mt-2">
                    Ви можете запросити доступ до своїх персональних даних, їх виправлення чи
                    видалення, а також відкликати згоду в будь-який момент, звернувшись до
                    нас{email ? " на " : ""}
                    {email && (
                      <a href={`mailto:${email}`} className="text-brand underline underline-offset-2">
                        {email}
                      </a>
                    )}
                    .
                  </p>
                </section>
              </div>
            </>
          )}
        </div>
      </main>

      <Footer settings={settings} />
    </>
  );
}
