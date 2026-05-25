"use client";

import { useLocale, useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Globe, FileText } from "lucide-react";

export default function ContactsPage() {
  const locale = useLocale();
  const t = useTranslations("legal");

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{t("contactsTitle")}</h1>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            {locale === "ru" ? "Реквизиты" : "Legal Details"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div>
            <p className="text-muted-foreground">
              {locale === "ru" ? "ФИО" : "Full Name"}
            </p>
            <p className="font-medium">
              {locale === "ru" ? "Сабиров Ильнур Ильдусович" : "Sabirov Ilnur Ildusovich"}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground">
              {locale === "ru" ? "Организационная форма" : "Legal Form"}
            </p>
            <p className="font-medium">
              {locale === "ru" ? "Самозанятый (НПД)" : "Self-employed (Tax on Professional Income)"}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground">ИНН</p>
            <p className="font-medium">165207104133</p>
          </div>
          <div>
            <p className="text-muted-foreground">
              {locale === "ru" ? "Налоговый режим" : "Tax Regime"}
            </p>
            <p className="font-medium">
              {locale === "ru" ? "Налог на профессиональный доход (НПД)" : "Tax on Professional Income (NPD)"}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            {locale === "ru" ? "Контакты" : "Contacts"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div>
            <p className="text-muted-foreground">Email</p>
            <a href="mailto:ilray@mail.ru" className="font-medium text-primary hover:underline">
              ilray@mail.ru
            </a>
          </div>
          <div>
            <p className="text-muted-foreground">
              {locale === "ru" ? "Время ответа" : "Response Time"}
            </p>
            <p className="font-medium">
              {locale === "ru" ? "До 3 рабочих дней" : "Up to 3 business days"}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            {locale === "ru" ? "Платформа" : "Platform"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div>
            <p className="text-muted-foreground">
              {locale === "ru" ? "Название" : "Name"}
            </p>
            <p className="font-medium">
              {locale === "ru" ? "Познай Себя" : "Know Yourself"}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground">URL</p>
            <p className="font-medium">poznaiy-sebya.ru</p>
          </div>
          <div>
            <p className="text-muted-foreground">
              {locale === "ru" ? "Обработка платежей" : "Payment Processing"}
            </p>
            <p className="font-medium">
              {locale === "ru"
                ? "ЮKassa (ООО НКО «ЮМани», ИНН 7750005725)"
                : "YuKassa (NBK LLC, INN 7750005725)"}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
