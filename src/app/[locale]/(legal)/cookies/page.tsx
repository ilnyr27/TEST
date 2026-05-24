"use client";

import { useLocale, useTranslations } from "next-intl";

export default function CookiesPage() {
  const locale = useLocale();
  const t = useTranslations("legal");

  if (locale === "en") {
    return (
      <article className="prose dark:prose-invert max-w-none">
        <h1>{t("cookiesTitle")}</h1>
        <p className="text-muted-foreground text-sm">{t("lastUpdated")}: 2025-05-24</p>

        <h2>1. What Are Cookies</h2>
        <p>
          Cookies are small text files stored on your device when you visit a website.
          We use cookies and similar technologies (localStorage) to provide and improve our service.
        </p>

        <h2>2. Essential Cookies</h2>
        <p>These are required for the service to function:</p>
        <ul>
          <li><strong>Authentication session</strong> — keeps you logged in</li>
          <li><strong>Language preference</strong> — remembers your language choice</li>
          <li><strong>Theme preference</strong> — remembers light/dark mode</li>
          <li><strong>Cookie consent</strong> — remembers your cookie preferences</li>
        </ul>

        <h2>3. Functional Storage (localStorage)</h2>
        <ul>
          <li><strong>Test results</strong> — stores your test results locally for offline access</li>
          <li><strong>Test progress</strong> — saves your progress during tests</li>
        </ul>

        <h2>4. Third-Party Cookies</h2>
        <p>
          We use Vercel Analytics for performance monitoring. No advertising cookies are used.
        </p>

        <h2>5. Managing Cookies</h2>
        <p>
          You can manage cookies through your browser settings. Disabling essential cookies
          may affect service functionality.
        </p>
      </article>
    );
  }

  return (
    <article className="prose dark:prose-invert max-w-none">
      <h1>{t("cookiesTitle")}</h1>
      <p className="text-muted-foreground text-sm">{t("lastUpdated")}: 24.05.2025</p>

      <h2>1. Что такое cookies</h2>
      <p>
        Cookies — небольшие текстовые файлы, сохраняемые на вашем устройстве при посещении сайта.
        Мы используем cookies и аналогичные технологии (localStorage) для работы и улучшения сервиса.
      </p>

      <h2>2. Необходимые cookies</h2>
      <p>Обязательны для работы сервиса:</p>
      <ul>
        <li><strong>Сессия аутентификации</strong> — поддерживает вход в аккаунт</li>
        <li><strong>Языковые настройки</strong> — запоминает выбранный язык</li>
        <li><strong>Настройки темы</strong> — запоминает светлую/тёмную тему</li>
        <li><strong>Согласие на cookies</strong> — запоминает ваш выбор</li>
      </ul>

      <h2>3. Функциональное хранилище (localStorage)</h2>
      <ul>
        <li><strong>Результаты тестов</strong> — хранит результаты локально для офлайн-доступа</li>
        <li><strong>Прогресс тестов</strong> — сохраняет прогресс прохождения</li>
      </ul>

      <h2>4. Сторонние cookies</h2>
      <p>
        Мы используем Vercel Analytics для мониторинга производительности.
        Рекламные cookies не используются.
      </p>

      <h2>5. Управление cookies</h2>
      <p>
        Вы можете управлять cookies через настройки браузера. Отключение обязательных cookies
        может повлиять на работу сервиса.
      </p>
    </article>
  );
}
