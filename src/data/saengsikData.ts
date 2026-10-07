export interface IngredientItem {
  name: string;
  category: 'grain' | 'vegetable' | 'fruit' | 'seaweed' | 'seed';
  origin: string;
  char: string;
}

export const INGREDIENT_CATEGORIES = [
  { id: 'all', label: '전체 (50종)' },
  { id: 'grain', label: '곡물류 (12종)' },
  { id: 'vegetable', label: '채소·뿌리채소 (16종)' },
  { id: 'fruit', label: '과일류 (8종)' },
  { id: 'seaweed', label: '해조류 (5종)' },
  { id: 'seed', label: '견과·종실·버섯 (9종)' },
] as const;

export const INGREDIENTS_50: IngredientItem[] = [
  // 곡물류 12종
  { name: '발아현미', category: 'grain', origin: '100% 국내산 (전남 해남)', char: '자연 발아로 부드럽고 구수한 풍미' },
  { name: '서리태(검정콩)', category: 'grain', origin: '100% 국내산 (경북 안동)', char: '단단하고 고소한 토종 검은콩' },
  { name: '찰보리', category: 'grain', origin: '100% 국내산 (전북 군산)', char: '식이섬유가 풍부하고 찰진 식감' },
  { name: '율무', category: 'grain', origin: '100% 국내산 (경기 연천)', char: '담백하고 은은한 단맛의 잡곡' },
  { name: '현미찹쌀', category: 'grain', origin: '100% 국내산 (충남 당진)', char: '부드러운 목넘김과 은은한 구수함' },
  { name: '찰수수', category: 'grain', origin: '100% 국내산 (강원 영월)', char: '자연 본연의 깊고 그윽한 맛' },
  { name: '차조', category: 'grain', origin: '100% 국내산 (제주도)', char: '작은 알곡에 담긴 알찬 고소함' },
  { name: '기장', category: 'grain', origin: '100% 국내산 (충북 제천)', char: '담백하고 부드러운 전통 곡물' },
  { name: '흑미', category: 'grain', origin: '100% 국내산 (전남 진도)', char: '짙은 자줏빛과 깊은 향미' },
  { name: '귀리', category: 'grain', origin: '100% 국내산 (전북 정읍)', char: '든든함을 더해주는 대표 통곡물' },
  { name: '백태(메주콩)', category: 'grain', origin: '100% 국내산 (경북 영주)', char: '깔끔하고 깊은 콩 본연의 고소함' },
  { name: '메밀', category: 'grain', origin: '100% 국내산 (강원 평창)', char: '산뜻하고 그윽한 전통 풍미' },

  // 채소류 16종
  { name: '케일', category: 'vegetable', origin: '100% 국내산 (충북 충주)', char: '초록 잎채소의 싱그러운 영양' },
  { name: '신선초', category: 'vegetable', origin: '100% 국내산 (경남 양산)', char: '자연의 푸른 생명력을 담은 잎채소' },
  { name: '시금치', category: 'vegetable', origin: '100% 국내산 (경북 포항)', char: '단맛이 도는 신선한 제철 포항초' },
  { name: '양배추', category: 'vegetable', origin: '100% 국내산 (제주 애월)', char: '속을 편안하게 돕는 달큰한 채소' },
  { name: '브로콜리', category: 'vegetable', origin: '100% 국내산 (강원 평창)', char: '초록빛 꽃봉오리 영양 가득 채소' },
  { name: '단호박', category: 'vegetable', origin: '100% 국내산 (경북 안동)', char: '자연스러운 부드러운 단맛' },
  { name: '당근', category: 'vegetable', origin: '100% 국내산 (제주 구좌)', char: '흙내음 머금은 달콤한 구좌 당근' },
  { name: '비트', category: 'vegetable', origin: '100% 국내산 (제주 한림)', char: '붉은빛 자연 채소의 싱그러움' },
  { name: '연근', category: 'vegetable', origin: '100% 국내산 (대구 달성)', char: '아삭한 흙속 뿌리채소의 담백함' },
  { name: '우엉', category: 'vegetable', origin: '100% 국내산 (경북 안동)', char: '깊고 구수한 뿌리채소 본연의 맛' },
  { name: '무', category: 'vegetable', origin: '100% 국내산 (전북 고창)', char: '시원하고 개운한 맛을 더하는 채소' },
  { name: '무청시래기', category: 'vegetable', origin: '100% 국내산 (강원 양구)', char: '햇볕과 바람으로 말린 자연의 맛' },
  { name: '쑥', category: 'vegetable', origin: '100% 국내산 (인천 강화)', char: '봄 햇살 머금은 은은한 향' },
  { name: '미나리', category: 'vegetable', origin: '100% 국내산 (경북 청도)', char: '산뜻하고 깨끗한 향취' },
  { name: '표고버섯', category: 'vegetable', origin: '100% 국내산 (전남 장흥)', char: '풍부한 감칠맛과 숲의 향' },
  { name: '양파', category: 'vegetable', origin: '100% 국내산 (전남 무안)', char: '부드럽고 달큼한 풍미' },

  // 과일류 8종
  { name: '사과', category: 'fruit', origin: '100% 국내산 (경북 청송)', char: '새콤달콤 자연 그대로의 과즙 맛' },
  { name: '배', category: 'fruit', origin: '100% 국내산 (전남 나주)', char: '시원하고 달콤한 자연의 청량감' },
  { name: '단감', category: 'fruit', origin: '100% 국내산 (경남 창원)', char: '은은한 가을 햇살의 단맛' },
  { name: '토마토', category: 'fruit', origin: '100% 국내산 (충남 부여)', char: '풍성한 수분과 산뜻한 감칠맛' },
  { name: '유자', category: 'fruit', origin: '100% 국내산 (전남 고흥)', char: '향긋하고 싱그러운 노란 향기' },
  { name: '매실', category: 'fruit', origin: '100% 국내산 (전남 광양)', char: '깔끔한 뒷맛을 전하는 전통 열매' },
  { name: '대추', category: 'fruit', origin: '100% 국내산 (충북 보은)', char: '포근하고 깊은 자연의 단맛' },
  { name: '산수유', category: 'fruit', origin: '100% 국내산 (전남 구례)', char: '자연의 붉은 열매가 주는 산뜻함' },

  // 해조류 5종
  { name: '미역', category: 'seaweed', origin: '100% 국내산 (전남 완도)', char: '청정 바다 햇살을 머금은 원초' },
  { name: '다시마', category: 'seaweed', origin: '100% 국내산 (전남 완도)', char: '바다의 깊은 미네랄과 감칠맛' },
  { name: '파래', category: 'seaweed', origin: '100% 국내산 (전남 장흥)', char: '향긋한 바다 내음 가득한 해조' },
  { name: '톳', category: 'seaweed', origin: '100% 국내산 (전남 완도)', char: '오독오독 바다의 보물' },
  { name: '김', category: 'seaweed', origin: '100% 국내산 (충남 서천)', char: '고소하고 향긋한 전통 김' },

  // 견과·종실·버섯 9종
  { name: '참깨', category: 'seed', origin: '100% 국내산 (경북 예천)', char: '황금빛 알알이 터지는 깊은 고소함' },
  { name: '들깨', category: 'seed', origin: '100% 국내산 (강원 횡성)', char: '토종 들깨 특유의 풍성한 향' },
  { name: '호박씨', category: 'seed', origin: '100% 국내산 (충남 천안)', char: '씹을수록 담백한 천연 씨앗' },
  { name: '해바라기씨', category: 'seed', origin: '100% 국내산 (경기 양평)', char: '담백하고 깔끔한 맛' },
  { name: '새싹보리', category: 'seed', origin: '100% 국내산 (전남 영광)', char: '파릇파릇 10cm 어린 싹의 싱그러움' },
  { name: '밀싹', category: 'seed', origin: '100% 국내산 (전북 익산)', char: '자연의 맑은 초록 에너지를 담은 새싹' },
  { name: '쌀눈', category: 'seed', origin: '100% 국내산 (경기 김포)', char: '현미의 영양이 집중된 귀한 쌀눈' },
  { name: '팽이버섯', category: 'seed', origin: '100% 국내산 (충북 청주)', char: '자연스러운 감칠맛과 담백함' },
  { name: '느타리버섯', category: 'seed', origin: '100% 국내산 (경기 포천)', char: '은은한 풍미와 부드러운 조화' },
];

export interface RecommendTarget {
  id: number;
  badge: string;
  title: string;
  problem: string;
  solution: string;
  detail: string;
  iconName: string;
}

export const RECOMMEND_TARGETS: RecommendTarget[] = [
  {
    id: 1,
    badge: '첫 번째 추천',
    title: '아침을 거르는 분',
    problem: '바쁜 출근길·등굣길, 10분의 여유도 없어 빈속으로 하루를 시작하시나요?',
    solution: '30초 만에 든든하게 완성되는 하루 첫 식사',
    detail: '아침 식사를 거르면 점심에 과식하기 쉽습니다. 생식 1포를 보틀에 넣고 흔들어 마시면, 준비부터 마시는 시간까지 1분이면 충분합니다.',
    iconName: 'AlarmClock',
  },
  {
    id: 2,
    badge: '두 번째 추천',
    title: '끼니 챙기기 번거로운 분',
    problem: '장보기, 요리하기, 설거지까지… 매끼 식사 준비가 부담스러우신가요?',
    solution: '불도 칼도 필요 없는 간편하고 깔끔한 한끼',
    detail: '물이나 우유만 부어 흔들면 끝! 조리 냄새도 없고 번거로운 잔반이나 설거지 없이 보틀 하나만 가볍게 헹구면 됩니다.',
    iconName: 'Sparkles',
  },
  {
    id: 3,
    badge: '세 번째 추천',
    title: '자연 그대로의 식사를 찾는 분',
    problem: '기름진 배달 음식과 인스턴트에 지쳐 담백하고 편안한 한끼를 원하시나요?',
    solution: '국내산 50가지 원료 그대로, 순수한 자연의 맛',
    detail: '인공 감미료나 합성 향료 없이 국내산 곡물과 채소 본연의 구수함을 담았습니다. 식사 후 속이 더부룩하지 않고 편안합니다.',
    iconName: 'Leaf',
  },
];

export const HOW_TO_STEPS = [
  {
    step: '1',
    stepTitle: 'STEP 01',
    action: '액체 먼저 붓기',
    description: '보틀에 찬물 또는 우유·두유 200ml를 먼저 부어주세요.',
    tip: '가루를 먼저 넣지 않고 액체를 먼저 넣어야 바닥에 뭉치지 않고 잘 풀립니다.',
    amount: '200 ml',
    liquidOption: '물 / 우유 / 두유',
  },
  {
    step: '2',
    stepTitle: 'STEP 02',
    action: '생식 1포 넣기',
    description: '온하루 생식 1포(30g)의 이지컷을 톡 뜯어 보틀에 넣어주세요.',
    tip: '개별 스틱 포장으로 휴대가 간편하며 가루 날림 없이 깔끔하게 들어갑니다.',
    amount: '1 포 (30g)',
    liquidOption: '개별 위생 스틱',
  },
  {
    step: '3',
    stepTitle: 'STEP 03',
    action: '흔들어서 마시기',
    description: '뚜껑을 꼭 닫고 상하로 10~15초간 가볍게 흔들어 맛있게 드세요.',
    tip: '기호에 따라 꿀 반 스푼이나 얼음 2~3조각을 함께 넣으면 더욱 시원하고 고소합니다.',
    amount: '10 ~ 15초',
    liquidOption: '고소한 완성',
  },
];

export const MAIN_PRODUCT = {
  id: 'onharu-saengsik-30',
  name: '온하루 50곡 자연생식 (30포 / 1박스)',
  subName: '100% 국내산 원료 50종 · 비가열 동결건조 · 1개월분',
  capacity: '30g × 30포 (총 900g)',
  originalPrice: 58000,
  salePrice: 42000,
  discountRate: 27,
  freeShipping: true,
  freeGift: '전용 쉐이커 보틀(350ml BPA-FREE) 1개 무료 증정',
  bundles: [
    { count: 1, label: '1박스 (30일분)', price: 42000, origPrice: 58000, discount: '27% 할인' },
    { count: 2, label: '2박스 (60일분 - 인기)', price: 79000, origPrice: 116000, discount: '32% 할인' },
    { count: 3, label: '3박스 (90일분 - 대용량)', price: 112000, origPrice: 174000, discount: '36% 할인' },
  ],
};

export const FAQ_LIST = [
  {
    question: '생식(生食)과 선식(禪食)의 차이점은 무엇인가요?',
    answer: '선식은 주로 곡물을 볶거나 쪄서 열을 가해 가공하는 반면, 생식은 신선한 곡물과 채소를 가열하지 않고 비가열 동결건조 공법 등으로 원물 그대로의 자연 영양과 풍미를 고스란히 담아내는 일반 식품입니다.',
  },
  {
    question: '하루에 몇 번, 언제 먹는 것이 좋은가요?',
    answer: '하루 1~2회, 식사 대용이나 가벼운 간식으로 언제든 편하게 드실 수 있습니다. 특히 아침 식사를 거르기 쉬운 출근 전이나 가벼운 저녁 한끼로 가장 많이 애용하십니다.',
  },
  {
    question: '어떻게 보관해야 하나요?',
    answer: '직사광선과 고온다습한 곳을 피해 서늘하고 통풍이 잘되는 실온에 보관해 주시면 됩니다. 개별 밀봉 스틱 포장으로 보관이 매우 간편합니다.',
  },
  {
    question: '단맛이나 첨가물이 들어있나요?',
    answer: '합성 감미료, 착색료, 보존료, 정제 설탕을 일절 첨가하지 않았습니다. 곡물 본연의 구수함과 사과, 단호박, 대추 등 자연 원물이 내는 은은한 단맛을 느끼실 수 있습니다.',
  },
];
