// ===========================================
// MOCK DATA & CONSTANTS FOR JAPANESE LEARNING APP
// ===========================================

// User Management
export const MOCK_PASSWORDS = {
  'admin@japanese.com': 'admin123',
  'user@japanese.com': 'user123',
  'test@japanese.com': 'test123',
  'admin@123': '123',
  'user@123': '1234'
};

export const MOCK_USERS = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@japanese.com',
    fullName: 'Admin User',
    role: 'admin',
    createdAt: '2024-01-01'
  },
  {
    id: '2',
    username: 'user',
    email: 'user@japanese.com',
    fullName: 'Regular User',
    role: 'user',
    createdAt: '2024-01-02'
  },
  {
    id: '3',
    username: 'testuser',
    email: 'test@japanese.com',
    fullName: 'Test User',
    role: 'user',
    createdAt: '2024-01-03'
  }
];

// Flashcards Data
export const MOCK_FLASHCARDS = [
  {
    id: '1',
    front: { japanese: 'こんにちは', hiragana: 'こんにちは' },
    back: { vietnamese: 'xin chào', romaji: 'konnichiwa', example: 'こんにちは、田中さん。' },
    difficulty: 'easy',
    category: 'greeting',
    reviewCount: 5,
    correctCount: 4
  },
  {
    id: '2',
    front: { japanese: '学校', hiragana: 'がっこう' },
    back: { vietnamese: 'trường học', romaji: 'gakkou', example: '学校に行きます。' },
    difficulty: 'medium',
    category: 'education',
    reviewCount: 3,
    correctCount: 2
  },
  {
    id: '3',
    front: { japanese: '先生', hiragana: 'せんせい' },
    back: { vietnamese: 'giáo viên', romaji: 'sensei', example: '先生は親切です。' },
    difficulty: 'easy',
    category: 'education',
    reviewCount: 7,
    correctCount: 6
  },
  {
    id: '4',
    front: { japanese: 'ありがとう', hiragana: 'ありがとう' },
    back: { vietnamese: 'cảm ơn', romaji: 'arigatou', example: 'ありがとうございます。' },
    difficulty: 'easy',
    category: 'greeting',
    reviewCount: 8,
    correctCount: 7
  },
  {
    id: '5',
    front: { japanese: '家', hiragana: 'いえ' },
    back: { vietnamese: 'nhà', romaji: 'ie', example: '家に帰ります。' },
    difficulty: 'easy',
    category: 'basic',
    reviewCount: 4,
    correctCount: 3
  }
];

export const FLASHCARD_CATEGORIES = ['greeting', 'education', 'family', 'food', 'colors', 'numbers', 'basic'];

// Dictionary Data
export const MOCK_DICTIONARY_DATA = [
  {
    id: '1',
    japanese: 'こんにちは',
    hiragana: 'こんにちは',
    romaji: 'konnichiwa',
    vietnamese: 'xin chào',
    type: 'chào hỏi',
    jlptLevel: 'N5',
    examples: [
      { japanese: 'こんにちは、田中さん。', vietnamese: 'Xin chào anh Tanaka.' }
    ]
  },
  {
    id: '2',
    japanese: '学校',
    hiragana: 'がっこう',
    romaji: 'gakkou',
    vietnamese: 'trường học',
    type: 'danh từ',
    jlptLevel: 'N5',
    examples: [
      { japanese: '学校に行きます。', vietnamese: 'Tôi đi đến trường.' }
    ]
  },
  {
    id: '3',
    japanese: '先生',
    hiragana: 'せんせい',
    romaji: 'sensei',
    vietnamese: 'giáo viên',
    type: 'danh từ',
    jlptLevel: 'N5',
    examples: [
      { japanese: '先生は親切です。', vietnamese: 'Thầy cô rất tốt bụng.' }
    ]
  }
];

// JLPT Levels Data
export const JLPT_LEVELS = [
  {
    level: "N5",
    name: "Cơ bản",
    description: "Hiểu được những câu và cụm từ thường gặp",
    vocabulary: 800,
    kanji: 103,
    grammar: 75,
    duration: "3-6 tháng",
    difficulty: "Dễ",
    color: "green",
    progress: 65,
    enrolled: 1250
  },
  {
    level: "N4", 
    name: "Sơ cấp",
    description: "Hiểu được tiếng Nhật cơ bản trong cuộc sống",
    vocabulary: 1500,
    kanji: 250,
    grammar: 150,
    duration: "6-12 tháng",
    difficulty: "Dễ",
    color: "blue",
    progress: 40,
    enrolled: 890
  },
  {
    level: "N3",
    name: "Trung cấp thấp", 
    description: "Hiểu được tiếng Nhật trong các tình huống thường ngày",
    vocabulary: 3000,
    kanji: 650,
    grammar: 200,
    duration: "12-18 tháng",
    difficulty: "Trung bình",
    color: "yellow",
    progress: 20,
    enrolled: 567
  },
  {
    level: "N2",
    name: "Trung cấp",
    description: "Hiểu được tiếng Nhật trong nhiều tình huống",
    vocabulary: 6000,
    kanji: 1000,
    grammar: 280,
    duration: "18-24 tháng", 
    difficulty: "Khó",
    color: "orange",
    progress: 5,
    enrolled: 234
  },
  {
    level: "N1",
    name: "Cao cấp",
    description: "Hiểu được tiếng Nhật trong mọi tình huống",
    vocabulary: 10000,
    kanji: 2000,
    grammar: 350,
    duration: "24+ tháng",
    difficulty: "Rất khó", 
    color: "red",
    progress: 0,
    enrolled: 89
  }
];

// Alphabet Data (Hiragana/Katakana)
export const HIRAGANA_CHARACTERS = [
  { char: 'あ', romaji: 'a', vietnamese: '/a/', type: 'hiragana', row: 'a' },
  { char: 'い', romaji: 'i', vietnamese: '/i/', type: 'hiragana', row: 'a' },
  { char: 'う', romaji: 'u', vietnamese: '/u/', type: 'hiragana', row: 'a' },
  { char: 'え', romaji: 'e', vietnamese: '/e/', type: 'hiragana', row: 'a' },
  { char: 'お', romaji: 'o', vietnamese: '/o/', type: 'hiragana', row: 'a' },
  { char: 'か', romaji: 'ka', vietnamese: '/ga/', type: 'hiragana', row: 'k' },
  { char: 'き', romaji: 'ki', vietnamese: '/gi/', type: 'hiragana', row: 'k' },
  { char: 'く', romaji: 'ku', vietnamese: '/gu/', type: 'hiragana', row: 'k' },
  { char: 'け', romaji: 'ke', vietnamese: '/ge/', type: 'hiragana', row: 'k' },
  { char: 'こ', romaji: 'ko', vietnamese: '/go/', type: 'hiragana', row: 'k' }
];

export const KATAKANA_CHARACTERS = [
  { char: 'ア', romaji: 'a', vietnamese: '/a/', type: 'katakana', row: 'a' },
  { char: 'イ', romaji: 'i', vietnamese: '/i/', type: 'katakana', row: 'a' },
  { char: 'ウ', romaji: 'u', vietnamese: '/u/', type: 'katakana', row: 'a' },
  { char: 'エ', romaji: 'e', vietnamese: '/e/', type: 'katakana', row: 'a' },
  { char: 'オ', romaji: 'o', vietnamese: '/o/', type: 'katakana', row: 'a' },
  { char: 'カ', romaji: 'ka', vietnamese: '/ga/', type: 'katakana', row: 'k' },
  { char: 'キ', romaji: 'ki', vietnamese: '/gi/', type: 'katakana', row: 'k' },
  { char: 'ク', romaji: 'ku', vietnamese: '/gu/', type: 'katakana', row: 'k' },
  { char: 'ケ', romaji: 'ke', vietnamese: '/ge/', type: 'katakana', row: 'k' },
  { char: 'コ', romaji: 'ko', vietnamese: '/go/', type: 'katakana', row: 'k' }
];

// Kanji Data
export const MOCK_KANJI = [
  {
    char: '日',
    kun: 'ひ',
    on: 'ニチ、ジツ',
    meaning: 'mặt trời, ngày',
    words: ['日本 (Nhật Bản)', '今日 (hôm nay)', '毎日 (mỗi ngày)'],
    jlptLevel: 'N5',
    strokes: 4
  },
  {
    char: '学',
    kun: 'まな',
    on: 'ガク',
    meaning: 'học',
    words: ['学校 (trường học)', '学生 (học sinh)', '学習 (học tập)'],
    jlptLevel: 'N5', 
    strokes: 8
  },
  {
    char: '校',
    kun: '',
    on: 'コウ',
    meaning: 'trường',
    words: ['学校 (trường học)', '高校 (trường cấp 3)', '校長 (hiệu trưởng)'],
    jlptLevel: 'N5',
    strokes: 10
  }
];

// Study Plan Data
export const STUDY_PLAN = [
  {
    week: "Tuần 1-2",
    focus: "Hiragana cơ bản",
    tasks: [
      "Học hàng あ (a, i, u, e, o)",
      "Học hàng か (ka, ki, ku, ke, ko)", 
      "Luyện viết và đọc",
      "Bài kiểm tra tuần"
    ],
    completed: true
  },
  {
    week: "Tuần 3-4",
    focus: "Hiragana nâng cao",
    tasks: [
      "Học các hàng còn lại",
      "Dakuten và handakuten",
      "Từ vựng cơ bản",
      "Bài kiểm tra tuần"
    ],
    completed: true
  },
  {
    week: "Tuần 5-6",
    focus: "Katakana",
    tasks: [
      "Học Katakana cơ bản",
      "So sánh với Hiragana",
      "Từ vựng ngoại lai",
      "Bài kiểm tra tổng hợp"
    ],
    completed: false
  }
];

// App Configuration
export const APP_CONFIG = {
  name: 'Nihongo Hub',
  version: '1.0.0',
  description: 'Ứng dụng học tiếng Nhật hiệu quả',
  supportEmail: 'support@nihongohub.com',
  defaultLanguage: 'vi',
  themes: ['light', 'dark'],
  jlptLevels: ['N5', 'N4', 'N3', 'N2', 'N1'],
  studyModes: ['study', 'test', 'review'],
  difficulties: ['easy', 'medium', 'hard']
};

// Navigation Routes
export const ROUTES = {
  home: '/',
  login: '/login',
  register: '/register',
  profile: '/profile',
  lessons: '/lessons',
  flashcards: '/flashcards',
  quiz: '/quiz',
  dictionary: '/dictionary',
  jlpt: '/jlpt',
  dashboard: '/dashboard',
  progress: '/progress',
  admin: {
    root: '/admin',
    alphabet: '/admin/alphabet',
    grammar: '/admin/grammar',
    vocabulary: '/admin/vocabulary',
    quiz: '/admin/quiz',
    users: '/admin/users',
    settings: '/admin/settings'
  }
};

// UI Constants
export const UI_CONFIG = {
  toastDuration: 3000,
  animationDuration: 300,
  debounceDelay: 300,
  maxFileSize: 5 * 1024 * 1024, // 5MB
  itemsPerPage: 20,
  sidebarWidth: 288, // 18rem in px
  headerHeight: 64, // 4rem in px
  breakpoints: {
    sm: '640px',
    md: '768px', 
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
  }
};