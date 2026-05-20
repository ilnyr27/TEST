"use client";

import { useLocale } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowLeft,
  Heart,
  Wind,
  Timer,
  Eye,
  HandMetal,
  Phone,
  ShieldCheck,
  Brain,
  Footprints,
  Droplets,
  AlertTriangle,
} from "lucide-react";

export default function AnxietyGuidePage() {
  const locale = useLocale() as "ru" | "en";
  const isRu = locale === "ru";

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link href="/dashboard">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">
            {isRu ? "Помощь при тревоге и панике" : "Anxiety & Panic Attack Guide"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {isRu
              ? "Практические инструкции, которые работают прямо сейчас"
              : "Practical instructions that work right now"}
          </p>
        </div>
      </div>

      {/* Emergency banner */}
      <Card className="border-red-500/30 bg-red-500/5">
        <CardContent className="flex items-start gap-3 py-4">
          <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 shrink-0" />
          <div>
            <p className="font-medium text-sm">
              {isRu
                ? "Если вы в опасности или думаете о суициде — звоните прямо сейчас"
                : "If you are in danger or having suicidal thoughts — call now"}
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              <a href="tel:88002000122">
                <Button variant="destructive" size="sm" className="gap-1">
                  <Phone className="h-3.5 w-3.5" />
                  {isRu ? "8-800-2000-122 (РФ, бесплатно)" : "8-800-2000-122 (Russia, free)"}
                </Button>
              </a>
              <a href="tel:112">
                <Button variant="outline" size="sm" className="gap-1 border-red-500/30">
                  <Phone className="h-3.5 w-3.5" />
                  112
                </Button>
              </a>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {isRu
                ? "Телефон доверия работает круглосуточно. Звонок бесплатный и анонимный."
                : "Crisis hotline is available 24/7. The call is free and anonymous."}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* PANIC ATTACK: What to do RIGHT NOW */}
      <div>
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Wind className="h-5 w-5 text-primary" />
          {isRu ? "Паническая атака: что делать ПРЯМО СЕЙЧАС" : "Panic Attack: What to Do RIGHT NOW"}
        </h2>

        <div className="grid gap-4">
          {/* Step 1: Breathing */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">1</span>
                {isRu ? "Дышите по квадрату (4-4-4-4)" : "Box Breathing (4-4-4-4)"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="rounded-lg bg-blue-500/10 p-3 text-center">
                  <Wind className="h-4 w-4 mx-auto mb-1 text-blue-500" />
                  <p className="font-medium">{isRu ? "Вдох" : "Inhale"}</p>
                  <p className="text-2xl font-bold text-blue-500">4 {isRu ? "сек" : "sec"}</p>
                </div>
                <div className="rounded-lg bg-cyan-500/10 p-3 text-center">
                  <Timer className="h-4 w-4 mx-auto mb-1 text-cyan-500" />
                  <p className="font-medium">{isRu ? "Задержка" : "Hold"}</p>
                  <p className="text-2xl font-bold text-cyan-500">4 {isRu ? "сек" : "sec"}</p>
                </div>
                <div className="rounded-lg bg-green-500/10 p-3 text-center">
                  <Wind className="h-4 w-4 mx-auto mb-1 text-green-500" />
                  <p className="font-medium">{isRu ? "Выдох" : "Exhale"}</p>
                  <p className="text-2xl font-bold text-green-500">4 {isRu ? "сек" : "sec"}</p>
                </div>
                <div className="rounded-lg bg-violet-500/10 p-3 text-center">
                  <Timer className="h-4 w-4 mx-auto mb-1 text-violet-500" />
                  <p className="font-medium">{isRu ? "Задержка" : "Hold"}</p>
                  <p className="text-2xl font-bold text-violet-500">4 {isRu ? "сек" : "sec"}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                {isRu
                  ? "Повторите 4-6 раз. Это активирует парасимпатическую нервную систему и замедляет сердцебиение."
                  : "Repeat 4-6 times. This activates the parasympathetic nervous system and slows your heart rate."}
              </p>
            </CardContent>
          </Card>

          {/* Step 2: Grounding 5-4-3-2-1 */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">2</span>
                {isRu ? "Заземление: техника 5-4-3-2-1" : "Grounding: 5-4-3-2-1 Technique"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Eye className="h-4 w-4 mt-1 text-violet-500 shrink-0" />
                  <p className="text-sm">
                    <span className="font-bold text-violet-500">5</span>{" "}
                    {isRu ? "вещей, которые вы ВИДИТЕ (назовите вслух)" : "things you can SEE (name them out loud)"}
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <HandMetal className="h-4 w-4 mt-1 text-blue-500 shrink-0" />
                  <p className="text-sm">
                    <span className="font-bold text-blue-500">4</span>{" "}
                    {isRu ? "вещи, которые вы можете ПОТРОГАТЬ (коснитесь их)" : "things you can TOUCH (reach out and feel them)"}
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Heart className="h-4 w-4 mt-1 text-green-500 shrink-0" />
                  <p className="text-sm">
                    <span className="font-bold text-green-500">3</span>{" "}
                    {isRu ? "звука, которые вы СЛЫШИТЕ" : "things you can HEAR"}
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Droplets className="h-4 w-4 mt-1 text-amber-500 shrink-0" />
                  <p className="text-sm">
                    <span className="font-bold text-amber-500">2</span>{" "}
                    {isRu ? "запаха, которые вы ЧУВСТВУЕТЕ" : "things you can SMELL"}
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Footprints className="h-4 w-4 mt-1 text-pink-500 shrink-0" />
                  <p className="text-sm">
                    <span className="font-bold text-pink-500">1</span>{" "}
                    {isRu ? "вкус, который вы можете ОЩУТИТЬ" : "thing you can TASTE"}
                  </p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-3">
                {isRu
                  ? "Эта техника «вытаскивает» мозг из спирали тревоги, переключая внимание на реальное окружение."
                  : "This technique pulls your brain out of the anxiety spiral by redirecting attention to your real surroundings."}
              </p>
            </CardContent>
          </Card>

          {/* Step 3: Physical reset */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">3</span>
                {isRu ? "Физический сброс" : "Physical Reset"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <Droplets className="h-4 w-4 mt-0.5 text-blue-500 shrink-0" />
                  <span>{isRu
                    ? "Умойте лицо холодной водой или приложите лёд к запястьям — это запускает «рефлекс ныряльщика» и замедляет пульс"
                    : "Splash cold water on your face or press ice to your wrists — this triggers the 'dive reflex' and slows your pulse"}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Footprints className="h-4 w-4 mt-0.5 text-green-500 shrink-0" />
                  <span>{isRu
                    ? "Сильно сожмите кулаки на 10 секунд, потом резко расслабьте — это снимает мышечное напряжение"
                    : "Clench your fists tightly for 10 seconds, then release suddenly — this releases muscle tension"}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Footprints className="h-4 w-4 mt-0.5 text-orange-500 shrink-0" />
                  <span>{isRu
                    ? "Топайте ногами, чувствуя пол — это возвращает ощущение «я здесь, я в безопасности»"
                    : "Stomp your feet, feeling the floor — this brings back the sense of 'I'm here, I'm safe'"}</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Step 4: Self-talk */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">4</span>
                {isRu ? "Разговор с собой" : "Self-Talk"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg bg-primary/5 p-4 space-y-2">
                <p className="text-sm font-medium italic">
                  {isRu ? "Повторяйте вслух или про себя:" : "Repeat out loud or in your head:"}
                </p>
                <ul className="space-y-1.5 text-sm">
                  <li>{isRu ? "«Это паническая атака. Она пройдёт. Она ВСЕГДА проходит.»" : "\"This is a panic attack. It will pass. It ALWAYS passes.\""}</li>
                  <li>{isRu ? "«Мне не грозит опасность. Моё тело просто реагирует на стресс.»" : "\"I am not in danger. My body is just reacting to stress.\""}</li>
                  <li>{isRu ? "«Я уже переживал(а) это раньше и справился(ась).»" : "\"I have been through this before and I got through it.\""}</li>
                  <li>{isRu ? "«Через 10-20 минут это закончится.»" : "\"In 10-20 minutes this will be over.\""}</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* DAILY ANXIETY MANAGEMENT */}
      <div>
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          {isRu ? "Ежедневное управление тревогой" : "Daily Anxiety Management"}
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">
                {isRu ? "Утренний ритуал" : "Morning Ritual"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                <li>{isRu ? "1. Не хватайте телефон первые 15 минут" : "1. Don't grab your phone for the first 15 minutes"}</li>
                <li>{isRu ? "2. 5 минут глубокого дыхания или медитации" : "2. 5 minutes of deep breathing or meditation"}</li>
                <li>{isRu ? "3. Запишите 3 вещи, за которые благодарны" : "3. Write down 3 things you're grateful for"}</li>
                <li>{isRu ? "4. Лёгкая разминка или прогулка" : "4. Light stretching or a walk"}</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">
                {isRu ? "Вечерний ритуал" : "Evening Ritual"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                <li>{isRu ? "1. Экраны выключить за 1 час до сна" : "1. Screens off 1 hour before bed"}</li>
                <li>{isRu ? "2. Тёплый душ или ванна" : "2. Warm shower or bath"}</li>
                <li>{isRu ? "3. Запишите тревоги на бумагу — «выгрузите» мозг" : "3. Write down your worries — 'unload' your brain"}</li>
                <li>{isRu ? "4. Прогрессивная мышечная релаксация (напряжение → расслабление)" : "4. Progressive muscle relaxation (tense → release)"}</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">
                {isRu ? "Когнитивные техники" : "Cognitive Techniques"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                <li>{isRu
                  ? "«Самое худшее, что может случиться?» — часто ответ не так страшен"
                  : "\"What's the worst that could happen?\" — often the answer isn't that scary"}</li>
                <li>{isRu
                  ? "«Что бы я сказал(а) другу в этой ситуации?» — мы добрее к другим"
                  : "\"What would I tell a friend in this situation?\" — we're kinder to others"}</li>
                <li>{isRu
                  ? "«Это факт или мысль?» — отличайте реальность от катастрофизации"
                  : "\"Is this a fact or a thought?\" — distinguish reality from catastrophizing"}</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">
                {isRu ? "Физическая активность" : "Physical Activity"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                <li>{isRu
                  ? "30 минут ходьбы в день снижает тревогу на 40%"
                  : "30 minutes of walking daily reduces anxiety by 40%"}</li>
                <li>{isRu
                  ? "Йога и растяжка — научно доказанное снижение кортизола"
                  : "Yoga and stretching — scientifically proven cortisol reduction"}</li>
                <li>{isRu
                  ? "Интенсивные тренировки «сжигают» адреналин"
                  : "Intense workouts 'burn off' adrenaline"}</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* When to seek help */}
      <Card className="border-primary/30 bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-primary" />
            {isRu ? "Когда пора к специалисту" : "When to See a Professional"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm">
            {isRu
              ? "Обратитесь к психологу или психотерапевту, если:"
              : "See a psychologist or therapist if:"}
          </p>
          <ul className="space-y-1.5 text-sm">
            <li>{isRu ? "- Тревога мешает работе, учёбе или отношениям" : "- Anxiety interferes with work, study, or relationships"}</li>
            <li>{isRu ? "- Панические атаки случаются чаще 1 раза в неделю" : "- Panic attacks happen more than once a week"}</li>
            <li>{isRu ? "- Вы избегаете мест или ситуаций из-за страха" : "- You avoid places or situations because of fear"}</li>
            <li>{isRu ? "- Нарушен сон более 2 недель подряд" : "- Sleep has been disrupted for more than 2 weeks"}</li>
            <li>{isRu ? "- Вы используете алкоголь или вещества, чтобы справиться" : "- You use alcohol or substances to cope"}</li>
            <li>{isRu ? "- Физические симптомы (боли в груди, онемение, головокружение) не проходят" : "- Physical symptoms (chest pain, numbness, dizziness) persist"}</li>
          </ul>
          <p className="text-sm font-medium text-primary mt-2">
            {isRu
              ? "Обращение за помощью — это не слабость, это мудрость. КПТ (когнитивно-поведенческая терапия) помогает 70-90% людей с тревожными расстройствами."
              : "Seeking help is not weakness, it's wisdom. CBT (Cognitive Behavioral Therapy) helps 70-90% of people with anxiety disorders."}
          </p>
        </CardContent>
      </Card>

      {/* Back to dashboard */}
      <div className="text-center pb-4">
        <Link href="/dashboard">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            {isRu ? "Вернуться к панели" : "Back to Dashboard"}
          </Button>
        </Link>
      </div>
    </div>
  );
}
