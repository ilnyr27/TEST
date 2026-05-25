"use client";

import { useLocale, useTranslations } from "next-intl";

export default function OfferPage() {
  const locale = useLocale();
  const t = useTranslations("legal");

  if (locale === "en") {
    return (
      <article className="prose dark:prose-invert max-w-none">
        <h1>{t("offerTitle")}</h1>
        <p className="text-muted-foreground text-sm">{t("lastUpdated")}: 2025-05-25</p>

        <h2>1. General Provisions</h2>
        <p>
          This document is a public offer (hereinafter — &quot;Offer&quot;) from a self-employed individual
          registered in the Russian Federation (hereinafter — &quot;Service Provider&quot;) addressed to
          any individual (hereinafter — &quot;User&quot;) to enter into a service agreement on the
          terms set forth below.
        </p>
        <p>
          Acceptance of this Offer is the User&apos;s registration on the platform and/or payment
          for services. From the moment of acceptance, the Offer is considered a binding agreement.
        </p>

        <h2>2. Subject of the Agreement</h2>
        <p>The Service Provider offers the following services through the &quot;Know Yourself&quot; platform:</p>
        <ul>
          <li>Access to psychological self-assessment tests (free)</li>
          <li>AI-powered personality analysis using DeepSeek (free)</li>
          <li>AI-powered personality analysis using Claude (paid, credits)</li>
          <li>AI coaching sessions (paid, credits)</li>
          <li>Comprehensive personality report (paid, one-time)</li>
        </ul>

        <h2>3. Pricing and Payment</h2>
        <ul>
          <li>Credit packages: 3 credits — 149 RUB, 10 credits — 399 RUB</li>
          <li>Comprehensive report: 499 RUB</li>
          <li>Payments are processed by YuKassa (NBK LLC, INN 7750005725)</li>
          <li>Prices include all applicable taxes (self-employed tax regime)</li>
        </ul>

        <h2>4. Service Delivery</h2>
        <ul>
          <li>Credits are credited immediately upon successful payment</li>
          <li>Each credit equals one Claude AI analysis or one coaching session</li>
          <li>Services are delivered electronically through the platform</li>
          <li>The comprehensive report is generated within 5 minutes of purchase</li>
        </ul>

        <h2>5. Refund Policy</h2>
        <ul>
          <li>Unused credits: refundable within 14 days of purchase</li>
          <li>Used credits: non-refundable (service already rendered)</li>
          <li>Comprehensive report: non-refundable after generation</li>
          <li>Refund requests: contact 3drayway@gmail.com</li>
        </ul>

        <h2>6. Limitations and Disclaimers</h2>
        <ul>
          <li>Tests are for educational and self-discovery purposes only</li>
          <li>Results are not clinical diagnoses and do not replace professional medical advice</li>
          <li>AI analysis may contain inaccuracies</li>
          <li>The Service Provider is not responsible for decisions made based on test results</li>
        </ul>

        <h2>7. Intellectual Property</h2>
        <p>
          All platform content (tests, algorithms, interface) belongs to the Service Provider.
          User-generated content (results, conversations) belongs to the User.
        </p>

        <h2>8. Agreement Termination</h2>
        <p>
          The User may terminate this agreement by deleting their account. Unused credits
          are refunded upon request within 14 days of the last purchase.
        </p>

        <h2>9. Dispute Resolution</h2>
        <p>
          Disputes are resolved through negotiation. If no agreement is reached, disputes
          are resolved in accordance with the laws of the Russian Federation.
        </p>

        <h2>10. Service Provider Details</h2>
        <p>
          Self-employed individual<br />
          INN: 165207104133<br />
          Tax regime: Tax on Professional Income (NPD)<br />
          Email: <a href="mailto:3drayway@gmail.com">3drayway@gmail.com</a><br />
          Platform: <a href="https://poznaiy-sebya.ru">poznaiy-sebya.ru</a>
        </p>
      </article>
    );
  }

  return (
    <article className="prose dark:prose-invert max-w-none">
      <h1>{t("offerTitle")}</h1>
      <p className="text-muted-foreground text-sm">{t("lastUpdated")}: 25.05.2025</p>

      <h2>1. Общие положения</h2>
      <p>
        Настоящий документ является публичной офертой (далее — «Оферта») самозанятого,
        зарегистрированного в Российской Федерации (далее — «Исполнитель»), адресованной
        любому физическому лицу (далее — «Пользователь») заключить договор оказания услуг
        на изложенных ниже условиях.
      </p>
      <p>
        Акцептом настоящей Оферты является регистрация Пользователя на платформе и/или
        оплата услуг. С момента акцепта Оферта считается заключённым договором.
      </p>

      <h2>2. Предмет договора</h2>
      <p>Исполнитель оказывает следующие услуги через платформу «Познай Себя»:</p>
      <ul>
        <li>Доступ к психологическим тестам самооценки (бесплатно)</li>
        <li>ИИ-анализ личности с использованием DeepSeek (бесплатно)</li>
        <li>ИИ-анализ личности с использованием Claude (платно, кредиты)</li>
        <li>ИИ-коуч-сессии (платно, кредиты)</li>
        <li>Комплексный отчёт о личности (платно, разовый)</li>
      </ul>

      <h2>3. Стоимость и оплата</h2>
      <ul>
        <li>Пакеты кредитов: 3 кредита — 149 ₽, 10 кредитов — 399 ₽</li>
        <li>Комплексный отчёт: 499 ₽</li>
        <li>Оплата осуществляется через ЮKassa (ООО НКО «ЮМани», ИНН 7750005725)</li>
        <li>Цены включают все применимые налоги (режим НПД)</li>
      </ul>

      <h2>4. Порядок оказания услуг</h2>
      <ul>
        <li>Кредиты зачисляются сразу после успешной оплаты</li>
        <li>Один кредит равен одному анализу Claude или одной коуч-сессии</li>
        <li>Услуги оказываются в электронной форме через платформу</li>
        <li>Комплексный отчёт генерируется в течение 5 минут после оплаты</li>
      </ul>

      <h2>5. Возврат средств</h2>
      <ul>
        <li>Неиспользованные кредиты: возврат в течение 14 дней с момента покупки</li>
        <li>Использованные кредиты: возврату не подлежат (услуга оказана)</li>
        <li>Комплексный отчёт: возврат невозможен после генерации</li>
        <li>Запросы на возврат: 3drayway@gmail.com</li>
      </ul>

      <h2>6. Ограничения ответственности</h2>
      <ul>
        <li>Тесты предназначены для образовательных целей и самопознания</li>
        <li>Результаты не являются клиническим диагнозом и не заменяют консультацию специалиста</li>
        <li>ИИ-анализ может содержать неточности</li>
        <li>Исполнитель не несёт ответственности за решения, принятые на основе результатов тестов</li>
      </ul>

      <h2>7. Интеллектуальная собственность</h2>
      <p>
        Всё содержимое платформы (тесты, алгоритмы, интерфейс) принадлежит Исполнителю.
        Пользовательский контент (результаты, переписка) принадлежит Пользователю.
      </p>

      <h2>8. Расторжение договора</h2>
      <p>
        Пользователь может расторгнуть договор, удалив свой аккаунт. Неиспользованные
        кредиты возвращаются по запросу в течение 14 дней с момента последней покупки.
      </p>

      <h2>9. Разрешение споров</h2>
      <p>
        Споры разрешаются путём переговоров. При недостижении согласия — в соответствии
        с законодательством Российской Федерации.
      </p>

      <h2>10. Реквизиты Исполнителя</h2>
      <p>
        Самозанятый<br />
        ИНН: 165207104133<br />
        Налоговый режим: Налог на профессиональный доход (НПД)<br />
        Email: <a href="mailto:3drayway@gmail.com">3drayway@gmail.com</a><br />
        Платформа: <a href="https://poznaiy-sebya.ru">poznaiy-sebya.ru</a>
      </p>
    </article>
  );
}
