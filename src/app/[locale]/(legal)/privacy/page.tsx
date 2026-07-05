"use client";

import { useLocale, useTranslations } from "next-intl";

export default function PrivacyPage() {
  const locale = useLocale();
  const t = useTranslations("legal");

  if (locale === "en") {
    return (
      <article className="prose dark:prose-invert max-w-none">
        <h1>{t("privacyTitle")}</h1>
        <p className="text-muted-foreground text-sm">{t("lastUpdated")}: 2025-05-24</p>

        <h2>1. Data Controller</h2>
        <p>
          Individual entrepreneur (self-employed), Russian Federation.<br />
          Email: <a href="mailto:ilray@mail.ru">ilray@mail.ru</a>
        </p>

        <h2>2. Data We Collect</h2>
        <ul>
          <li><strong>Account data:</strong> email address, display name</li>
          <li><strong>Test results:</strong> answers, scores, dimension profiles</li>
          <li><strong>AI conversations:</strong> chat history with AI coach</li>
          <li><strong>Technical data:</strong> IP address, browser type, language preference</li>
          <li><strong>Payment data:</strong> transaction IDs (processed by YuKassa; we do not store card numbers)</li>
        </ul>

        <h2>3. Purpose of Processing</h2>
        <ul>
          <li>Providing psychological testing services</li>
          <li>AI-powered personality analysis and coaching</li>
          <li>Personalizing user experience (language, theme, AI provider)</li>
          <li>Processing payments for premium features</li>
          <li>Service improvement and analytics</li>
        </ul>

        <h2>4. Legal Basis</h2>
        <p>Your explicit consent given during registration (Federal Law No. 152-FZ, Article 6).</p>

        <h2>5. Data Storage & Sharing</h2>
        <p>
          Your data (account, test results, AI conversations) is stored and processed on our own
          servers located in the Russian Federation.
        </p>
        <p>We share a limited amount of data with the following third parties for service delivery:</p>
        <ul>
          <li><strong>DeepSeek</strong> (China) — AI analysis of your requests</li>
          <li><strong>YuKassa</strong> (Russia) — payment processing</li>
        </ul>

        <h2>6. Cross-Border Data Transfer</h2>
        <p>
          Your personal data is stored in the Russian Federation. For AI analysis, your requests may
          be transferred to DeepSeek (China). By accepting this policy, you consent to such transfer
          in accordance with Federal Law No. 152-FZ, Article 12.
        </p>

        <h2>7. Data Retention</h2>
        <p>
          We retain your data until you delete your account, or for 3 years of inactivity,
          whichever comes first. Payment records are retained for 5 years as required by law.
        </p>

        <h2>8. Your Rights</h2>
        <p>You have the right to:</p>
        <ul>
          <li>Access your personal data</li>
          <li>Correct inaccurate data</li>
          <li>Delete your account and all associated data</li>
          <li>Withdraw consent at any time</li>
          <li>Export your data in machine-readable format</li>
        </ul>
        <p>To exercise these rights, contact us at <a href="mailto:ilray@mail.ru">ilray@mail.ru</a> or use the Settings page.</p>

        <h2>9. Medical Disclaimer</h2>
        <p>
          <strong>Our tests are not clinical diagnoses.</strong> Results are for self-discovery and educational
          purposes only. They should not replace professional psychological or medical advice.
          If you experience mental health concerns, please consult a qualified professional.
        </p>

        <h2>10. Changes</h2>
        <p>We may update this policy. Significant changes will be communicated via email.</p>
      </article>
    );
  }

  return (
    <article className="prose dark:prose-invert max-w-none">
      <h1>{t("privacyTitle")}</h1>
      <p className="text-muted-foreground text-sm">{t("lastUpdated")}: 24.05.2025</p>

      <h2>1. Оператор персональных данных</h2>
      <p>
        Самозанятый, Российская Федерация.<br />
        Email: <a href="mailto:ilray@mail.ru">ilray@mail.ru</a>
      </p>

      <h2>2. Какие данные мы собираем</h2>
      <ul>
        <li><strong>Данные аккаунта:</strong> email, отображаемое имя</li>
        <li><strong>Результаты тестов:</strong> ответы, баллы, профили по измерениям</li>
        <li><strong>ИИ-разговоры:</strong> история чата с ИИ-коучем</li>
        <li><strong>Технические данные:</strong> IP-адрес, тип браузера, язык</li>
        <li><strong>Платёжные данные:</strong> ID транзакций (обрабатываются ЮKassa; мы не храним данные карт)</li>
      </ul>

      <h2>3. Цели обработки</h2>
      <ul>
        <li>Проведение психологических тестов</li>
        <li>ИИ-анализ личности и коучинг</li>
        <li>Персонализация (язык, тема, провайдер ИИ)</li>
        <li>Обработка платежей за премиум-функции</li>
        <li>Улучшение сервиса и аналитика</li>
      </ul>

      <h2>4. Правовое основание</h2>
      <p>Ваше явное согласие, данное при регистрации (152-ФЗ, статья 6).</p>

      <h2>5. Хранение и передача данных</h2>
      <p>
        Ваши данные (аккаунт, результаты тестов, ИИ-разговоры) хранятся и обрабатываются на наших
        собственных серверах, расположенных на территории Российской Федерации.
      </p>
      <p>Ограниченный объём данных мы передаём следующим третьим лицам для оказания услуг:</p>
      <ul>
        <li><strong>DeepSeek</strong> (Китай) — ИИ-анализ ваших запросов</li>
        <li><strong>ЮKassa</strong> (Россия) — обработка платежей</li>
      </ul>

      <h2>6. Трансграничная передача данных</h2>
      <p>
        Ваши персональные данные хранятся на территории Российской Федерации. Для ИИ-анализа ваши
        запросы могут передаваться в DeepSeek (Китай). Принимая настоящую политику, вы даёте согласие
        на такую передачу в соответствии с 152-ФЗ, статья 12.
      </p>

      <h2>7. Сроки хранения</h2>
      <p>
        Мы храним данные до удаления аккаунта или 3 года неактивности (что наступит раньше).
        Платёжные записи хранятся 5 лет в соответствии с законодательством.
      </p>

      <h2>8. Ваши права</h2>
      <p>Вы имеете право:</p>
      <ul>
        <li>Получить доступ к своим персональным данным</li>
        <li>Исправить неточные данные</li>
        <li>Удалить аккаунт и все связанные данные</li>
        <li>Отозвать согласие в любое время</li>
        <li>Экспортировать данные в машиночитаемом формате</li>
      </ul>
      <p>Для реализации прав обратитесь по адресу <a href="mailto:ilray@mail.ru">ilray@mail.ru</a> или используйте страницу Настроек.</p>

      <h2>9. Медицинский дисклеймер</h2>
      <p>
        <strong>Наши тесты не являются клиническим диагнозом.</strong> Результаты предназначены для
        самопознания и образовательных целей. Они не заменяют профессиональную психологическую или
        медицинскую консультацию. При наличии проблем с психическим здоровьем обратитесь к
        квалифицированному специалисту.
      </p>

      <h2>10. Изменения</h2>
      <p>Мы можем обновлять эту политику. О существенных изменениях будем уведомлять по email.</p>
    </article>
  );
}
