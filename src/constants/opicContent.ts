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

// 추후 DAY 3-7은 별도로 추가할 예정
export const ALL_LESSONS = [DAY1_LESSONS, DAY2_LESSONS];
