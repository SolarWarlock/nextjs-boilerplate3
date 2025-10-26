import { Section } from './types';
const sections: Section[] = [
    {
        id: 'ancient',
        title: 'Кубань в древности',
        description: 'История Кубани от каменного века до Античности',
        icon: '/images/pot.svg',
        quizFile: '/1/1quiz.json',
        glossaryFile: '/1/1glossary.json',
        topics: [ { id: 'kubanKamen', title: 'Кубань в каменном веке', image: '/1/1/7.jpg', contentFile: '/1/1/1.1text.md' }, { id: 'bronzeCulture', title: 'Культуры эпохи бронзы', image: '/1/2/8.jpg', contentFile: '/1/2/1.2text.md' }, { id: '1.3', title: 'Население Северо-Западного Кавказа в железном веке', image: '/1/4/szkpreview.jpg', contentFile: '/1/3/1.3text.md' }, { id: '1.4', title: 'Греческая колонизация Северо-Западного Кавказа', image: '/1/4/4.jpg', contentFile: '/1/4/1.4text.md' },]
    },
    {
        id: 'kuban_middle_age',
        title: 'Северо-Западный Кавказ в эпоху средневековья',
        description: 'История региона в средневековье',
        icon: '/images/swords.svg',
        quizFile: '/2/2quiz.json',
        glossaryFile: '/2/2glossary.json',
        topics: [ { id: 'topic1', title: 'Кубань в период домонгольского вторжения', image: '/2/1/5.jpg', contentFile: '/2/1/2.1text.md' }, { id: 'topic2', title: 'Нашествие монгол и полчищ Темирлана в ХIII-ХIV вв.', image: '/2/2/2.jpg', contentFile: '/2/2/2.2text.md' }, { id: 'topic3', title: 'Итальянское проникновение на Черноморское побережье. Генуэзские колонии в ХIII-ХV вв.', image: '/2/3/4.jpg', contentFile: '/2/3/2.3text.md' }, { id: 'topic4', title: 'Северо-Западный Кавказ в международных отношениях второй половины ХV - ХVII вв.', image: '/2/4/3.jpg', contentFile: '/2/4/2.4text.md' }, { id: 'topic5', title: 'Первые русские поселенцы на Кубани', image: '/2/5/5.jpg', contentFile: '/2/5/2.5text.md' }]
    },
    {
        id: 'kuban18-19',
        title: 'Кубань в ХVIII -  ХIХ вв.',
        description: 'Социально-экономическое и политическое развитие Кубани',
        icon: '/images/crown.svg',
        quizFile: '/3/3quiz.json',
        glossaryFile: '/3/3glossary.json',
        topics: [ { id: 'topic1', title: 'Территория расселения и общественно-политическое устройство адыгов в ХVIII - середине ХIХ вв.', image: '/3/1/5.jpg', contentFile: '/3/1/3.1text.md' }, { id: 'topic2', title: 'Военно-политическая ситуация на Северо-Западном Кавказе в ХVIII веке', image: '/3/2/szk18.jpg', contentFile: '/3/2/3.2text.md' }, { id: 'topic3', title: 'Переселение черноморских и донских казаков на Кубань', image: '/3/2/migration.jpg', contentFile: '/3/3/3.3text.md' }, { id: 'topic4', title: 'Присоединение Северо-Западного Кавказа к России', image: '/3/4/9.jpg', contentFile: '/3/4/3.4text.md' }, { id: 'topic5', title: 'Военно-казачья и народная колонизация Кубани', image: '/3/5/1.jpg', contentFile: '/3/5/3.5text.md' }, { id: 'topic6', title: 'Иностранная колонизация Кубани', image: '/3/6/4.jpg', contentFile: '/3/6/3.6text.md' }, { id: 'topic7', title: 'Образование Кубанской области и Кубанского казачьего войска. Военная служба казаков.', image: '/3/7/2.jpg', contentFile: '/3/7/3.7text.md' }, { id: 'topic8', title: 'Социально-экономическое развитие Кубани во второй половине ХIХ в.', image: '/3/8/4.jpg', contentFile: '/3/8/3.8text.md' }, { id: 'topic9', title: 'Культура и быт казачества и адыгов', image: '/3/9/3.jpg', contentFile: '/3/9/3.9text.md' }]
    },
    {
        id: 'kuban20-21',
        title: 'Кубанская область в годы империалистических войн,  революционных потрясений и социалистической модернизации',
        description: 'Кубань на пути социально-политической и экономической трансформации',
        icon: '/images/hammer.svg',
        quizFile: '/4/4quiz.json',
        glossaryFile: '/4/4glossary.json',
        topics: [ { id: 'topic1', title: 'Экономика Кубани, особенности ее развития', image: '/4/1/3.jpg', contentFile: '/4/1/4.1text.md' }, { id: 'topic2', title: 'Политическая жизнь региона в годы Первой русской революции 1905-1907 гг', image: '/4/2/3.jpg', contentFile: '/4/2/4.2text.md' }, { id: 'topic3', title: 'Кубанцы в Первой мировой войне', image: '/4/3/4.jpg', contentFile: '/4/3/4.3text.md' }, { id: 'topic4', title: 'Резонанс революционных событий 1917 г. на Кубани', image: '/4/4/4.jpg', contentFile: '/4/4/4.4text.md' }, { id: 'topic5', title: 'Кубань в пламени Гражданской войны', image: '/4/5/prev.jpg', contentFile: '/4/5/4.5text.md' }, { id: 'topic6', title: 'НЭП на Кубани', image: '/4/6/32.jpg', contentFile: '/4/6/4.6text.md' }, { id: 'topic7', title: 'Коллективизация и индустриализация на Кубани', image: '/4/7/8.jpg', contentFile: '/4/7/4.7text.md' }]
    },
    {
        id: 'kuban_in_war',
        title: 'Героические страницы истории Великой Отечественной войны',
        description: 'Кубань в годы Великой Отечественной войны',
        icon: '/images/star.svg',
        quizFile: '/5/5quiz.json',
        glossaryFile: '/5/5glossary.json',
        topics: [ { id: 'topic1', title: 'Мобилизация региона', image: '/5/1/2.jpg', contentFile: '/5/1/5.1text.md' }, { id: 'topic2', title: 'Битва за Кавказ. Оборонительный период', image: '/5/2/4.jpg', contentFile: '/5/2/5.2text.md' }, { id: 'topic3', title: 'Преступления немецкого оккупационного режима на Кубани', image: '/5/3/3.jpg', contentFile: '/5/3/5.3text.md' }, { id: 'topic4', title: 'Партизанское и подпольное движение на Кубани', image: '/5/4/3.jpg', contentFile: '/5/4/5.4text.md' }, { id: 'topic5', title: 'Наступательный период битвы за Кавказ. Освобождение Кубани', image: '/5/5/6.jpg', contentFile: '/5/5/5.5text.md' }, { id: 'topic6', title: 'Воздушные бои над Кубанью', image: '/5/6/2.jpg', contentFile: '/5/6/5.6text.md' }, { id: 'topic7', title: 'Восстановление и развитие народного хозяйства в 1945-1950 гг.', image: '/5/7/4.jpg', contentFile: '/5/7/5.7text.md' }]
    },
];