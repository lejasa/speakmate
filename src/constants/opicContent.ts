// OPIc AL 마스터 코스 콘텐츠

export interface ScriptSentence {
  id: number;
  english: string;
  korean: string;
}

export interface CompletedScript {
  id: string;
  title: string;
  sentences: ScriptSentence[];
}

export interface CoreExpression {
  expression: string;
  meaning: string;
  example?: string;
}

export interface Keyword {
  text: string;
}

export interface LessonContent {
  id: string;
  day: number;
  title: string;
  goal: string[];
  context: string;
  strategy: string[];
  completedScript: CompletedScript;
  coreExpressions: CoreExpression[];
  keywords: Keyword[];
}

export interface DayLesson {
  dayNumber: number;
  theme: string;
  lessons: LessonContent[];
}

// DAY 1 - Self Introduction + Daily Life + Free Time
export const DAY1_LESSONS: DayLesson = {
  dayNumber: 1,
  theme: 'Self Introduction + Daily Life + Free Time',
  lessons: [
    {
      id: 'day1-1',
      day: 1,
      title: 'Self Introduction',
      goal: [
        '기본 답변 구조 익히기',
        '현재형 사용하기',
        '자신을 자연스럽게 소개하기',
        '40~60초 답변 만들기',
      ],
      context: 'OPIc 테스트의 첫 번째 질문으로 자신을 소개하고 현재 생활 상황을 설명합니다.',
      strategy: [
        '이름과 현재 상황 말하기',
        '생활 환경 설명하기',
        '여가 활동 간단히 언급하기',
        '시험을 보는 이유 설명하기',
      ],
      completedScript: {
        id: 'script-day1-1',
        title: 'Tell me about yourself.',
        sentences: [
          {
            id: 1,
            english: 'Hi, my name is Jaesang.',
            korean: '안녕하세요. 제 이름은 재상입니다.',
          },
          {
            id: 2,
            english: "I'm not a student, and I'm not working right now.",
            korean: '저는 학생도 아니고 현재 일하고 있지 않습니다.',
          },
          {
            id: 3,
            english:
              "To be honest, it's been more than five years since I last took an English class, so I'm a little rusty.",
            korean:
              '솔직히 말해서 영어 수업을 마지막으로 받은 지 5년이 넘어서 좀 녹슬었어요.',
          },
          {
            id: 4,
            english: 'I live with my family, and we spend a lot of time together at home.',
            korean: '저는 가족과 함께 살고 있으며 집에서 많은 시간을 함께 보냅니다.',
          },
          {
            id: 5,
            english:
              'When I have some free time, I usually watch movies, go to cafes, or listen to music.',
            korean:
              '시간이 나면 주로 영화를 보거나 카페를 가거나 음악을 듣습니다.',
          },
          {
            id: 6,
            english: 'I also like going for walks when I want to get some fresh air.',
            korean: '신선한 공기를 마시고 싶을 때는 산책을 하는 것도 좋아합니다.',
          },
          {
            id: 7,
            english:
              'I decided to take this test because I wanted to challenge myself and get better at speaking English.',
            korean:
              '저는 스스로에게 도전하고 영어 회화를 더 잘하고 싶어서 이 시험을 보기로 결정했습니다.',
          },
          {
            id: 8,
            english: "So, I'm a little nervous, but I'm going to do my best.",
            korean: '그래서 좀 긴장되지만 최선을 다하겠습니다.',
          },
        ],
      },
      coreExpressions: [
        {
          expression: "I'm a little rusty.",
          meaning: '오랫동안 사용하지 않아서 감이 떨어졌다',
          example:
            "My English is a little rusty because I haven't practiced in a long time.",
        },
        {
          expression: 'When I have some free time...',
          meaning: '여가 시간이 있을 때 (여가 활동을 이야기할 때 사용)',
          example: 'When I have some free time, I usually watch movies or listen to music.',
        },
        {
          expression: 'I wanted to challenge myself.',
          meaning: '스스로에게 도전하고 싶었다 (새로운 것에 도전하는 상황에서 사용)',
          example:
            'I decided to take the OPIC test because I wanted to challenge myself.',
        },
      ],
      keywords: [
        { text: 'Jaesang' },
        { text: 'not a student' },
        { text: 'not working' },
        { text: 'five years' },
        { text: 'rusty' },
        { text: 'family' },
        { text: 'movies' },
        { text: 'cafes' },
        { text: 'music' },
        { text: 'walking' },
        { text: 'challenge myself' },
        { text: 'nervous' },
      ],
    },
    {
      id: 'day1-2',
      day: 1,
      title: 'Free Time',
      goal: [
        '여가 활동을 자세히 설명하기',
        '각 활동을 할 때 하는 일 구체화하기',
        '감정과 이유 추가하기',
        '60초 이상의 답변 만들기',
      ],
      context:
        '여가 시간에 하는 활동들을 구체적이고 자연스럽게 설명하는 연습입니다.',
      strategy: [
        '대표적인 활동 2~3개 선택하기',
        '각 활동마다 언제, 어디서, 무엇을 하는지 설명하기',
        '왜 그 활동을 좋아하는지 이유 말하기',
        '개인적인 경험이나 감정 추가하기',
      ],
      completedScript: {
        id: 'script-day1-2',
        title: 'What do you usually do in your free time?',
        sentences: [
          {
            id: 1,
            english:
              'In my free time, I usually watch movies, go to cafes, or listen to music.',
            korean:
              '저는 시간이 날 때 주로 영화를 보거나 카페를 가거나 음악을 듣습니다.',
          },
          {
            id: 2,
            english: 'I watch movies when I want to relax at home.',
            korean: '집에서 편안하게 쉬고 싶을 때 영화를 봅니다.',
          },
          {
            id: 3,
            english: "I don't really have a favorite genre, but I usually enjoy movies with an interesting story.",
            korean:
              '특별한 장르는 없지만 보통 흥미로운 스토리의 영화를 즐깁니다.',
          },
          {
            id: 4,
            english: 'I also like going to cafes.',
            korean: '카페에 가는 것도 좋아합니다.',
          },
          {
            id: 5,
            english:
              'I usually order a drink, sit somewhere comfortable, and just take a break.',
            korean:
              '주로 음료를 주문하고 편안한 자리에 앉아서 휴식을 취합니다.',
          },
          {
            id: 6,
            english: 'Sometimes I listen to music or check my phone.',
            korean: '때때로 음악을 듣거나 휴대폰을 확인합니다.',
          },
          {
            id: 7,
            english: 'And when the weather is nice, I like going for a walk.',
            korean: '날씨가 좋으면 산책을 하는 것도 좋아합니다.',
          },
          {
            id: 8,
            english:
              "I don't always want to do a serious workout, so walking is an easy way to get some fresh air and clear my head.",
            korean:
              '항상 힘든 운동을 하고 싶은 것은 아니라서, 산책은 신선한 공기를 마시고 머리를 식히는 쉬운 방법입니다.',
          },
        ],
      },
      coreExpressions: [
        {
          expression: 'when I want to relax',
          meaning: '~하고 싶을 때 (특정 상황이나 필요를 표현)',
          example: 'I watch movies when I want to relax and forget about my daily stress.',
        },
        {
          expression: 'sit somewhere comfortable',
          meaning: '편안한 곳에 앉다',
          example: 'I go to the cafe, order a drink, and sit somewhere comfortable.',
        },
        {
          expression: 'clear my head',
          meaning: '생각을 정리하다, 스트레스를 풀다',
          example: 'Going for a walk helps me clear my head when I feel stressed.',
        },
      ],
      keywords: [
        { text: 'movies' },
        { text: 'relax' },
        { text: 'interesting story' },
        { text: 'cafes' },
        { text: 'drink' },
        { text: 'comfortable seat' },
        { text: 'break' },
        { text: 'walking' },
        { text: 'nice weather' },
        { text: 'fresh air' },
        { text: 'clear my head' },
      ],
    },
  ],
};

// DAY 2 - Walking + Jogging
export const DAY2_LESSONS: DayLesson = {
  dayNumber: 2,
  theme: 'Walking + Jogging',
  lessons: [
    {
      id: 'day2-1',
      day: 2,
      title: 'Exercise Routine',
      goal: [
        '운동 습관을 자연스럽게 설명하기',
        '장소와 빈도 구체화하기',
        '운동을 하는 이유 명확히 하기',
        '운동의 이점 설명하기',
      ],
      context:
        '평소 운동 습관과 루틴을 구체적으로 설명하는 연습입니다.',
      strategy: [
        '하는 운동의 종류 명시하기 (가벼운 운동)',
        '운동하는 장소와 시간 설명하기',
        '왜 이 운동을 선택했는지 이유 말하기',
        '운동으로 얻는 이점 나열하기',
      ],
      completedScript: {
        id: 'script-day2-1',
        title: 'What do you usually do for exercise?',
        sentences: [
          {
            id: 1,
            english: 'I usually go for a walk or do some light jogging.',
            korean: '저는 보통 산책을 하거나 가벼운 조깅을 합니다.',
          },
          {
            id: 2,
            english: "I'm not really into intense workouts, so I prefer something simple that I can do whenever I have time.",
            korean:
              '저는 힘든 운동을 별로 좋아하지 않아서 시간이 날 때마다 할 수 있는 간단한 운동을 선호합니다.',
          },
          {
            id: 3,
            english: "There's a park near my place, and I usually go there when the weather is nice.",
            korean:
              '제 집 근처에 공원이 있고 날씨가 좋으면 그곳에 가는 편입니다.',
          },
          {
            id: 4,
            english: 'I walk for a while, and if I feel like it, I jog a little.',
            korean: '한동안 걷다가 기분이 내키면 조금 조깅을 합니다.',
          },
          {
            id: 5,
            english:
              'I like doing this because I don\'t need any special equipment or preparation.',
            korean:
              '특별한 장비나 준비가 필요 없어서 이 운동을 좋아합니다.',
          },
          {
            id: 6,
            english: 'I can just put on my shoes and go outside.',
            korean: '신발만 신고 나가면 되거든요.',
          },
          {
            id: 7,
            english:
              "It also helps me clear my head, especially when I've had a stressful day.",
            korean:
              '특히 스트레스를 받는 날에는 머리를 식히는 데 도움이 됩니다.',
          },
        ],
      },
      coreExpressions: [
        {
          expression: "I'm not really into...",
          meaning: '~을 별로 좋아하지 않는다',
          example:
            "I'm not really into intense workouts, so I prefer light exercise.",
        },
        {
          expression: 'if I feel like it',
          meaning: '내키면, 하고 싶으면',
          example: "I usually walk for a while, and if I feel like it, I jog a little.",
        },
        {
          expression: 'clear my head',
          meaning: '머리를 식히다, 생각을 정리하다',
          example:
            'Going for a walk helps me clear my head when I feel stressed.',
        },
      ],
      keywords: [
        { text: 'walk or jog' },
        { text: 'not into intense workouts' },
        { text: 'simple' },
        { text: 'park' },
        { text: 'nice weather' },
        { text: 'if I feel like it' },
        { text: 'no equipment' },
        { text: 'shoes' },
        { text: 'clear my head' },
        { text: 'stressful day' },
      ],
    },
    {
      id: 'day2-2',
      day: 2,
      title: 'Memorable Exercise Experience',
      goal: [
        '과거 경험을 현재와 자연스럽게 연결하기',
        '사건의 전개를 구체적으로 설명하기',
        '감정 변화 표현하기',
        '경험에서 얻은 통찰력 공유하기',
      ],
      context:
        '운동하면서 있었던 기억에 남는 경험을 이야기하고, 그 경험을 통해 배운 점을 표현합니다.',
      strategy: [
        '평범한 상황부터 시작하기',
        '예상하지 못한 사건 추가하기',
        '상황의 변화 설명하기',
        '처음과 나중의 감정 대비하기',
        '경험의 의미 정리하기',
      ],
      completedScript: {
        id: 'script-day2-2',
        title: 'Tell me about a memorable experience you had while walking or jogging.',
        sentences: [
          {
            id: 1,
            english:
              'I remember one evening when I went jogging after a pretty stressful day.',
            korean:
              '꽤 스트레스를 많이 받는 날 저녁에 조깅을 하러 나갔던 기억이 납니다.',
          },
          {
            id: 2,
            english: "I wasn't planning to run for very long.",
            korean: '저는 오래 달릴 계획이 없었어요.',
          },
          {
            id: 3,
            english: 'I just wanted to get outside for a while.',
            korean: '그냥 좀 밖으로 나가고 싶었을 뿐이에요.',
          },
          {
            id: 4,
            english: 'I started walking, and after a few minutes, I decided to jog.',
            korean: '산책을 시작했다가 몇 분 후에 조깅을 하기로 결정했어요.',
          },
          {
            id: 5,
            english: 'The weather was really nice, and there weren\'t many people around.',
            korean: '날씨도 정말 좋았고 주변에 사람도 많지 않았어요.',
          },
          {
            id: 6,
            english: 'I ended up running longer than I expected.',
            korean: '결국 제 예상보다 더 오래 달렸어요.',
          },
          {
            id: 7,
            english: 'When I got home, I was tired, but I actually felt much better.',
            korean:
              '집에 돌아왔을 때는 피곤했지만 실제로는 훨씬 나은 기분이 들었어요.',
          },
          {
            id: 8,
            english:
              'It was nothing special, but I realized that even a short walk or jog can really change my mood.',
            korean:
              '특별한 일은 아니었지만, 짧은 산책이나 조깅도 정말 기분을 바꿀 수 있다는 걸 깨달았어요.',
          },
        ],
      },
      coreExpressions: [
        {
          expression: "I wasn't planning to...",
          meaning: '처음에는 ~할 계획이 아니었다',
          example: "I wasn't planning to run for very long, but I ended up jogging for an hour.",
        },
        {
          expression: 'I ended up...',
          meaning: '결국 ~하게 되었다, ~하고 말았다',
          example:
            'I decided to take a short walk, but I ended up walking for two hours.',
        },
        {
          expression: 'It was nothing special, but...',
          meaning: '특별한 일은 아니었지만... (작은 사건의 의미를 강조할 때)',
          example:
            'It was nothing special, but that experience changed how I think about exercise.',
        },
      ],
      keywords: [
        { text: 'jogging' },
        { text: 'stressful day' },
        { text: 'not planning' },
        { text: 'outside' },
        { text: 'nice weather' },
        { text: 'ended up' },
        { text: 'tired' },
        { text: 'felt better' },
        { text: 'nothing special' },
        { text: 'change my mood' },
      ],
    },
  ],
};


// DAY 3-7 - topic practice for the rest of the intensive course
const createTopicLesson = (
  day: number,
  title: string,
  question: string,
  goal: string[],
  strategy: string[],
  expressions: CoreExpression[],
  keywords: string[],
  sentences: Array<{ english: string; korean: string }>
): LessonContent => ({
  id: `day${day}-1`,
  day,
  title,
  goal,
  context: `DAY ${day} OPIc 핵심 주제를 자연스럽게 확장해 답하는 연습입니다.`,
  strategy,
  completedScript: {
    id: `script-day${day}-1`,
    title: question,
    sentences: sentences.map((sentence, index) => ({
      id: day * 100 + index + 1,
      ...sentence,
    })),
  },
  coreExpressions: expressions,
  keywords: keywords.map((text) => ({ text })),
});

export const DAY3_LESSONS: DayLesson = {
  dayNumber: 3,
  theme: 'Home + Neighborhood',
  lessons: [createTopicLesson(3, 'My Home and Neighborhood', 'Tell me about your home and neighborhood.', ['집과 동네를 구체적으로 묘사하기', '일상적인 장점을 덧붙이기'], ['집의 분위기 소개하기', '주변 장소와 이동 편의성 말하기', '개인적인 만족으로 마무리하기'], [{ expression: 'What I like most is...', meaning: '제가 가장 좋아하는 점은...' }, { expression: 'within walking distance', meaning: '걸어서 갈 수 있는 거리 안에' }], ['cozy', 'family', 'nearby park', 'cafes', 'convenient'], [{ english: 'I live in a cozy apartment with my family.', korean: '저는 가족과 함께 아늑한 아파트에 살고 있습니다.' }, { english: 'What I like most is that there is a park within walking distance.', korean: '제가 가장 좋아하는 점은 걸어서 갈 수 있는 거리에 공원이 있다는 것입니다.' }, { english: 'There are also several cafes and stores nearby, so it is very convenient.', korean: '근처에는 카페와 가게도 여러 곳 있어서 매우 편리합니다.' }, { english: 'It is a comfortable place where I can relax after a busy day.', korean: '바쁜 하루 뒤에 편하게 쉴 수 있는 곳입니다.' }])],
};

export const DAY4_LESSONS: DayLesson = {
  dayNumber: 4,
  theme: 'Travel + Vacation',
  lessons: [createTopicLesson(4, 'A Memorable Trip', 'Tell me about a memorable trip you took.', ['과거 여행을 순서대로 설명하기', '감정과 인상적인 순간 표현하기'], ['여행지와 동행 소개하기', '기억에 남는 활동 말하기', '느낀 점으로 마무리하기'], [{ expression: 'One trip that stands out is...', meaning: '특히 기억에 남는 여행은...' }, { expression: 'I was impressed by...', meaning: '~에 깊은 인상을 받았다' }], ['weekend trip', 'scenery', 'local food', 'relaxed', 'memorable'], [{ english: 'One trip that stands out is a weekend trip I took with my family.', korean: '특히 기억에 남는 여행은 가족과 함께 갔던 주말 여행입니다.' }, { english: 'We enjoyed the scenery, tried local food, and took lots of pictures.', korean: '우리는 풍경을 즐기고 지역 음식을 먹으며 사진을 많이 찍었습니다.' }, { english: 'I was impressed by how relaxed and peaceful the whole trip felt.', korean: '여행 내내 느껴졌던 편안하고 평화로운 분위기가 인상적이었습니다.' }, { english: 'Even now, it makes me smile when I look at the photos.', korean: '지금도 그 사진을 보면 미소가 납니다.' }])],
};

export const DAY5_LESSONS: DayLesson = {
  dayNumber: 5,
  theme: 'Food + Restaurants',
  lessons: [createTopicLesson(5, 'A Favorite Restaurant', 'Tell me about a restaurant you enjoy visiting.', ['음식점의 분위기와 메뉴 묘사하기', '추천 이유를 구체화하기'], ['어디에 있는지 소개하기', '좋아하는 메뉴 말하기', '방문 상황과 감정 덧붙이기'], [{ expression: 'I tend to go there when...', meaning: '저는 보통 ~할 때 그곳에 간다' }, { expression: 'The best part is...', meaning: '가장 좋은 점은...' }], ['casual restaurant', 'signature dish', 'friendly staff', 'comfortable', 'recommend'], [{ english: 'There is a casual restaurant near my home that I enjoy visiting.', korean: '집 근처에 제가 즐겨 가는 편안한 분위기의 식당이 있습니다.' }, { english: 'I tend to go there when I want a good meal without too much planning.', korean: '많은 계획 없이 맛있는 식사를 하고 싶을 때 주로 그곳에 갑니다.' }, { english: 'The best part is their signature dish and the friendly staff.', korean: '가장 좋은 점은 대표 메뉴와 친절한 직원들입니다.' }, { english: 'I would recommend it to anyone who wants a comfortable meal.', korean: '편안한 식사를 원하는 사람에게 추천하고 싶습니다.' }])],
};

export const DAY6_LESSONS: DayLesson = {
  dayNumber: 6,
  theme: 'Unexpected Situation + Problem Solving',
  lessons: [createTopicLesson(6, 'An Unexpected Problem', 'Tell me about an unexpected problem you solved.', ['문제 상황을 명확히 설명하기', '해결 과정과 결과 말하기'], ['예상치 못한 일 소개하기', '취한 행동 설명하기', '배운 점으로 마무리하기'], [{ expression: 'Out of nowhere...', meaning: '갑자기, 예상치 못하게' }, { expression: 'It worked out in the end.', meaning: '결국 잘 해결되었다' }], ['unexpected', 'stay calm', 'ask for help', 'solution', 'relieved'], [{ english: 'One day, I had an unexpected problem while I was on my way to an appointment.', korean: '어느 날 약속 장소로 가는 길에 예상치 못한 문제가 생겼습니다.' }, { english: 'Out of nowhere, I realized that I had gone to the wrong place.', korean: '갑자기 제가 잘못된 장소에 왔다는 것을 알게 되었습니다.' }, { english: 'I stayed calm, asked for help, and found the right route on my phone.', korean: '침착하게 도움을 요청하고 휴대폰으로 올바른 경로를 찾았습니다.' }, { english: 'It worked out in the end, and I felt relieved after solving it.', korean: '결국 잘 해결되었고, 문제를 해결한 뒤 안도감을 느꼈습니다.' }])],
};

export const DAY7_LESSONS: DayLesson = {
  dayNumber: 7,
  theme: 'AL Mock Test + Review',
  lessons: [createTopicLesson(7, 'AL Level Story Practice', 'Describe a recent experience that changed your perspective.', ['AL 수준의 서사형 답변 구성하기', '상황·변화·느낀 점을 연결하기'], ['배경 설명하기', '변화나 사건 전개하기', '구체적 감정과 통찰로 마무리하기'], [{ expression: 'Looking back, ...', meaning: '돌이켜보면...' }, { expression: 'It made me realize that...', meaning: '그 일을 통해 ~을 깨달았다' }], ['recent experience', 'challenge', 'perspective', 'confidence', 'reflection'], [{ english: 'Recently, I had an experience that made me look at my daily routine differently.', korean: '최근에 일상을 다르게 바라보게 한 경험이 있었습니다.' }, { english: 'At first, it felt like a small challenge, but it pushed me out of my comfort zone.', korean: '처음에는 작은 도전처럼 느껴졌지만 저를 익숙한 영역 밖으로 이끌었습니다.' }, { english: 'After trying it several times, I became more confident and open to new experiences.', korean: '여러 번 시도한 뒤 더 자신감이 생겼고 새로운 경험에 열린 마음을 갖게 되었습니다.' }, { english: 'Looking back, it made me realize that small changes can lead to real growth.', korean: '돌이켜보면 작은 변화가 진짜 성장으로 이어질 수 있다는 것을 깨달았습니다.' }])],
};

export const ALL_LESSONS = [DAY1_LESSONS, DAY2_LESSONS, DAY3_LESSONS, DAY4_LESSONS, DAY5_LESSONS, DAY6_LESSONS, DAY7_LESSONS];

