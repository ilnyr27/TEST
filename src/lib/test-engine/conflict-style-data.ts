import { Question, QuestionOption } from "@/types/database";

// Стиль в конфликте — 25 вопросов, 5 измерений по 5 вопросов
// Адаптировано из Thomas-Kilmann Conflict Mode Instrument
// COMPET=Соперничество, COLLAB=Сотрудничество, COMPR=Компромисс, AVOID=Избегание, ACCOM=Приспособление

interface ConflictItem {
  number: number;
  textRu: string;
  textEn: string;
  dimension: "COMPET" | "COLLAB" | "COMPR" | "AVOID" | "ACCOM";
}

const items: ConflictItem[] = [
  // COMPET — Соперничество (настаивает на своём, результат важнее отношений)
  { number: 1,  dimension: "COMPET", textRu: "В споре я настаиваю на своей позиции, даже если это создаёт напряжение", textEn: "In a dispute I insist on my position even if it creates tension" },
  { number: 2,  dimension: "COMPET", textRu: "Когда мои интересы затронуты, я готов бороться за них до конца", textEn: "When my interests are at stake, I'm ready to fight for them to the end" },
  { number: 3,  dimension: "COMPET", textRu: "Мне важно отстоять свою правоту в конфликте — уступка кажется слабостью", textEn: "It's important to me to prove I'm right in a conflict — giving in feels like weakness" },
  { number: 4,  dimension: "COMPET", textRu: "Я прямо говорю о том, чего хочу, и не жду, что другие сами догадаются", textEn: "I directly state what I want and don't wait for others to figure it out themselves" },
  { number: 5,  dimension: "COMPET", textRu: "Результат для меня важнее сохранения мирной атмосферы в моменте", textEn: "The result matters more to me than maintaining a peaceful atmosphere in the moment" },

  // COLLAB — Сотрудничество (ищет решение, устраивающее обе стороны)
  { number: 6,  dimension: "COLLAB", textRu: "В конфликте я стараюсь найти решение, которое полностью устроит обе стороны", textEn: "In a conflict I try to find a solution that fully satisfies both sides" },
  { number: 7,  dimension: "COLLAB", textRu: "Я готов потратить время на то, чтобы разобраться в глубинных потребностях другого человека", textEn: "I'm willing to take time to understand the underlying needs of the other person" },
  { number: 8,  dimension: "COLLAB", textRu: "Я верю, что любой конфликт — это возможность найти лучшее решение, чем каждый из нас предлагал изначально", textEn: "I believe any conflict is an opportunity to find a better solution than either of us initially proposed" },
  { number: 9,  dimension: "COLLAB", textRu: "Я открыто говорю о своих потребностях и одновременно внимательно слушаю другого", textEn: "I openly talk about my needs while also listening carefully to the other person" },
  { number: 10, dimension: "COLLAB", textRu: "Совместный поиск решения приносит мне удовлетворение, даже если это требует усилий", textEn: "Finding a solution together brings me satisfaction even if it takes effort" },

  // COMPR — Компромисс (каждый уступает чем-то, встречаются на полпути)
  { number: 11, dimension: "COMPR", textRu: "Когда есть разногласия, я ищу «золотую середину» — чтобы каждый чем-то уступил", textEn: "When there are disagreements I look for the 'middle ground' — so each person gives up something" },
  { number: 12, dimension: "COMPR", textRu: "Я считаю нормальным уступить в чём-то, если другой тоже идёт навстречу", textEn: "I think it's normal to give ground on something if the other person also meets me halfway" },
  { number: 13, dimension: "COMPR", textRu: "Быстрое компромиссное решение для меня лучше долгих споров", textEn: "A quick compromise is better for me than long arguments" },
  { number: 14, dimension: "COMPR", textRu: "В переговорах я готов пожертвовать частью своих требований ради приемлемого для всех итога", textEn: "In negotiations I'm willing to sacrifice part of my demands for an outcome acceptable to all" },
  { number: 15, dimension: "COMPR", textRu: "Я воспринимаю компромисс как честное решение: никто не выигрывает всё, но никто и не проигрывает всё", textEn: "I see compromise as a fair solution: no one wins everything but no one loses everything either" },

  // AVOID — Избегание (уходит от конфликта, откладывает, замалчивает)
  { number: 16, dimension: "AVOID", textRu: "Когда возникает конфликт, я предпочитаю взять паузу или переключиться, чем разбираться сразу", textEn: "When conflict arises I prefer to take a pause or switch topics rather than deal with it immediately" },
  { number: 17, dimension: "AVOID", textRu: "Мне проще промолчать о проблеме, чем рисковать неприятным разговором", textEn: "It's easier for me to stay silent about a problem than to risk an unpleasant conversation" },
  { number: 18, dimension: "AVOID", textRu: "Я часто надеюсь, что конфликт разрешится сам по себе, если не трогать его", textEn: "I often hope that conflict will resolve itself if left alone" },
  { number: 19, dimension: "AVOID", textRu: "Я стараюсь держаться подальше от ситуаций, которые могут привести к столкновению", textEn: "I try to stay away from situations that might lead to a confrontation" },
  { number: 20, dimension: "AVOID", textRu: "Когда отношения накаляются, я предпочитаю уйти, а не выяснять отношения", textEn: "When relations heat up I prefer to leave rather than have it out" },

  // ACCOM — Приспособление (уступает ради сохранения отношений)
  { number: 21, dimension: "ACCOM", textRu: "В конфликте я часто уступаю, чтобы сохранить мир и не обидеть другого", textEn: "In a conflict I often give in to keep the peace and not hurt the other person" },
  { number: 22, dimension: "ACCOM", textRu: "Мне важнее сохранить отношения, чем отстоять свою позицию", textEn: "It matters more to me to preserve the relationship than to defend my position" },
  { number: 23, dimension: "ACCOM", textRu: "Я нередко соглашаюсь с другим, даже если внутри не согласен — лишь бы не было конфликта", textEn: "I often agree with the other person even if I disagree inside — just to avoid conflict" },
  { number: 24, dimension: "ACCOM", textRu: "Видя, что другому важнее победить, я готов отступить", textEn: "Seeing that the other person needs to win more, I'm willing to step back" },
  { number: 25, dimension: "ACCOM", textRu: "Для меня дискомфорт другого человека важнее моего собственного несогласия", textEn: "The other person's discomfort matters more to me than my own disagreement" },
];

const sortedItems = [...items].sort((a, b) => a.number - b.number);

export const CONFLICT_STYLE_TEST_ID = "conflict-style";

export const conflictStyleTestMeta = {
  id: CONFLICT_STYLE_TEST_ID,
  slug: "conflict-style",
  nameRu: "Стиль в конфликте",
  nameEn: "Conflict Style",
  descriptionRu: "Как вы ведёте себя в конфликте? Тест по модели Томаса-Килмана выявляет ваш доминирующий стиль из пяти: соперничество, сотрудничество, компромисс, избегание или приспособление.",
  descriptionEn: "How do you behave in conflict? Based on the Thomas-Kilmann model, the test identifies your dominant style from five: competing, collaborating, compromising, avoiding, or accommodating.",
  methodology: "Thomas-Kilmann Conflict Mode Instrument (adapted)",
  estimatedMinutes: 6,
  questionCount: 25,
  category: "family",
};

export const conflictStyleDimensions = {
  COMPET: {
    nameRu: "Соперничество",
    nameEn: "Competing",
    color: "#EF4444",
    descHighRu: "Соперничество — ваш ведущий стиль. Вы отстаиваете позицию уверенно и решительно. Это эффективно в кризисных ситуациях и когда вы точно правы. Зона риска — отношения могут страдать, если этот стиль применяется слишком часто.",
    descHighEn: "Competing is your dominant style. You defend your position confidently and decisively. This is effective in crisis situations and when you're clearly right. Risk zone — relationships may suffer if this style is used too often.",
    descLowRu: "Соперничество не характерно для вас — вы редко настаиваете на своём в ущерб отношениям.",
    descLowEn: "Competing is not typical for you — you rarely insist on your position at the expense of relationships.",
  },
  COLLAB: {
    nameRu: "Сотрудничество",
    nameEn: "Collaborating",
    color: "#10B981",
    descHighRu: "Сотрудничество — ваш ведущий стиль. Вы ищете решения, которые устраивают всех, и готовы потратить время на это. Это наиболее конструктивный подход — особенно в важных отношениях. Требует энергии и готовности другой стороны.",
    descHighEn: "Collaborating is your dominant style. You seek solutions that satisfy everyone and are willing to invest time for it. This is the most constructive approach — especially in important relationships. It requires energy and the other party's willingness.",
    descLowRu: "Сотрудничество менее выражено — вы реже ищете совместное решение, предпочитая более быстрые подходы.",
    descLowEn: "Collaborating is less pronounced — you less often seek joint solutions, preferring faster approaches.",
  },
  COMPR: {
    nameRu: "Компромисс",
    nameEn: "Compromising",
    color: "#F59E0B",
    descHighRu: "Компромисс — ваш основной инструмент. Вы умеете быстро находить взаимоприемлемое решение — это практично и удерживает отношения. Минус: «половинчатые» решения иногда не решают проблему по-настоящему.",
    descHighEn: "Compromising is your main tool. You can quickly find mutually acceptable solutions — this is practical and preserves relationships. Downside: 'halfway' solutions sometimes don't truly resolve the problem.",
    descLowRu: "Компромисс менее характерен — вы склонны идти дальше середины в ту или иную сторону.",
    descLowEn: "Compromising is less typical — you tend to go further than the middle in one direction or another.",
  },
  AVOID: {
    nameRu: "Избегание",
    nameEn: "Avoiding",
    color: "#6366F1",
    descHighRu: "Избегание — ваш преобладающий стиль. Вы отступаете от конфликта или откладываете его. Иногда это мудро — дать страстям улечься. Но систематическое избегание накапливает напряжение и лишает отношения честности.",
    descHighEn: "Avoiding is your prevailing style. You withdraw from conflict or postpone it. Sometimes this is wise — letting passions cool. But systematic avoidance accumulates tension and strips relationships of honesty.",
    descLowRu: "Избегание не характерно — вы не уклоняетесь от трудных разговоров.",
    descLowEn: "Avoiding is not typical — you don't shy away from difficult conversations.",
  },
  ACCOM: {
    nameRu: "Приспособление",
    nameEn: "Accommodating",
    color: "#8B5CF6",
    descHighRu: "Приспособление — ваш ведущий стиль. Вы уступаете ради сохранения отношений и мира. Это великодушно и иногда правильно. Но систематическое приспособление стирает ваши потребности и может порождать скрытое недовольство.",
    descHighEn: "Accommodating is your dominant style. You yield to preserve relationships and peace. This is generous and sometimes right. But systematic accommodation erases your needs and can breed hidden resentment.",
    descLowRu: "Приспособление не характерно — вы не склонны жертвовать своими интересами ради мира.",
    descLowEn: "Accommodating is not typical — you don't tend to sacrifice your interests for peace.",
  },
};

export function getConflictStyleQuestions(): (Question & { options: QuestionOption[] })[] {
  return sortedItems.map((item, idx) => ({
    id: `cs-q-${item.number}`,
    test_id: CONFLICT_STYLE_TEST_ID,
    question_number: idx + 1,
    text_ru: item.textRu,
    text_en: item.textEn,
    type: "scale" as const,
    depth_level: 1,
    scale_min: 1,
    scale_max: 5,
    scale_min_label_ru: "Совсем не про меня",
    scale_min_label_en: "Not me at all",
    scale_max_label_ru: "Очень точно",
    scale_max_label_en: "Very accurate",
    is_required: true,
    branch_logic: null,
    scoring_key: { dimension: item.dimension },
    metadata: null,
    created_at: new Date().toISOString(),
    options: [
      { id: `cs-o-${item.number}-1`, question_id: `cs-q-${item.number}`, option_key: "1", text_ru: "Совсем не про меня", text_en: "Not me at all", sort_order: 0 },
      { id: `cs-o-${item.number}-2`, question_id: `cs-q-${item.number}`, option_key: "2", text_ru: "Редко", text_en: "Rarely", sort_order: 1 },
      { id: `cs-o-${item.number}-3`, question_id: `cs-q-${item.number}`, option_key: "3", text_ru: "Иногда", text_en: "Sometimes", sort_order: 2 },
      { id: `cs-o-${item.number}-4`, question_id: `cs-q-${item.number}`, option_key: "4", text_ru: "Часто", text_en: "Often", sort_order: 3 },
      { id: `cs-o-${item.number}-5`, question_id: `cs-q-${item.number}`, option_key: "5", text_ru: "Очень точно", text_en: "Very accurate", sort_order: 4 },
    ],
  }));
}
