import { useState } from "react";
import { Volume2, Star, BookOpen } from "lucide-react";

const VocabularySection = () => {
  const [activeTab, setActiveTab] = useState('themes');

  const vocabularyThemes = [
    {
      title: "家族",
      subtitle: "Gia đình",
      words: [
        { japanese: "父", hiragana: "ちち", vietnamese: "cha", romaji: "chichi" },
        { japanese: "母", hiragana: "はは", vietnamese: "mẹ", romaji: "haha" },
        { japanese: "兄", hiragana: "あに", vietnamese: "anh trai", romaji: "ani" },
        { japanese: "姉", hiragana: "あね", vietnamese: "chị gái", romaji: "ane" },
        { japanese: "弟", hiragana: "おとうと", vietnamese: "em trai", romaji: "otouto" },
        { japanese: "妹", hiragana: "いもうと", vietnamese: "em gái", romaji: "imouto" }
      ]
    },
    {
      title: "食べ物",
      subtitle: "Đồ ăn",
      words: [
        { japanese: "ご飯", hiragana: "ごはん", vietnamese: "cơm", romaji: "gohan" },
        { japanese: "魚", hiragana: "さかな", vietnamese: "cá", romaji: "sakana" },
        { japanese: "肉", hiragana: "にく", vietnamese: "thịt", romaji: "niku" },
        { japanese: "野菜", hiragana: "やさい", vietnamese: "rau", romaji: "yasai" },
        { japanese: "果物", hiragana: "くだもの", vietnamese: "trái cây", romaji: "kudamono" },
        { japanese: "水", hiragana: "みず", vietnamese: "nước", romaji: "mizu" }
      ]
    },
    {
      title: "学校",
      subtitle: "Trường học",
      words: [
        { japanese: "学校", hiragana: "がっこう", vietnamese: "trường học", romaji: "gakkou" },
        { japanese: "先生", hiragana: "せんせい", vietnamese: "giáo viên", romaji: "sensei" },
        { japanese: "学生", hiragana: "がくせい", vietnamese: "học sinh", romaji: "gakusei" },
        { japanese: "授業", hiragana: "じゅぎょう", vietnamese: "buổi học", romaji: "jugyou" },
        { japanese: "宿題", hiragana: "しゅくだい", vietnamese: "bài tập về nhà", romaji: "shukudai" },
        { japanese: "試験", hiragana: "しけん", vietnamese: "kỳ thi", romaji: "shiken" }
      ]
    }
  ];

  const jlptVocab = [
    {
      level: "N5",
      words: [
        { japanese: "今日", reading: "きょう", meaning: "hôm nay", romaji: "kyou" },
        { japanese: "明日", reading: "あした", meaning: "ngày mai", romaji: "ashita" },
        { japanese: "昨日", reading: "きのう", meaning: "hôm qua", romaji: "kinou" },
        { japanese: "時間", reading: "じかん", meaning: "thời gian", romaji: "jikan" }
      ]
    },
    {
      level: "N4",
      words: [
        { japanese: "経験", reading: "けいけん", meaning: "kinh nghiệm", romaji: "keiken" },
        { japanese: "説明", reading: "せつめい", meaning: "giải thích", romaji: "setsumei" },
        { japanese: "準備", reading: "じゅんび", meaning: "chuẩn bị", romaji: "junbi" },
        { japanese: "約束", reading: "やくそく", meaning: "lời hứa", romaji: "yakusoku" }
      ]
    },
    {
      level: "N3", 
      words: [
        { japanese: "雰囲気", reading: "ふんいき", meaning: "không khí", romaji: "fun'iki" },
        { japanese: "印象", reading: "いんしょう", meaning: "ấn tượng", romaji: "inshou" },
        { japanese: "効果", reading: "こうか", meaning: "hiệu quả", romaji: "kouka" },
        { japanese: "現実", reading: "げんじつ", meaning: "thực tế", romaji: "genjitsu" }
      ]
    }
  ];

  const WordCard = ({ word }) => (
    <div className="card p-4 hover:shadow-soft transition-smooth group cursor-pointer">
      <div className="text-center">
        <div className="text-2xl font-bold mb-2 text-primary">{word.japanese}</div>
        <div className="text-lg text-hiragana mb-2">{word.hiragana || word.reading}</div>
        <div className="text-sm text-muted-foreground mb-2">{word.romaji}</div>
        <div className="text-accent font-medium mb-3">{word.vietnamese || word.meaning}</div>
        <div className="flex justify-center space-x-2">
          <button className="btn btn-ghost btn-icon h-8 w-8 p-0">
            <Volume2 className="w-3 h-3" />
          </button>
          <button className="btn btn-ghost btn-icon h-8 w-8 p-0">
            <Star className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <section className="py-16 bg-gradient-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Tăng vốn từ vựng
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Học từ vựng hiệu quả theo chủ đề và cấp độ JLPT
          </p>
        </div>

        <div className="tabs max-w-6xl mx-auto">
          <div className="tabs-list grid w-full grid-cols-2 mb-8">
            <button 
              className={`tab-trigger flex items-center justify-center space-x-2 ${
                activeTab === 'themes' ? 'active' : ''
              }`}
              onClick={() => setActiveTab('themes')}
            >
              <BookOpen className="w-4 h-4" />
              <span>Theo chủ đề</span>
            </button>
            <button 
              className={`tab-trigger flex items-center justify-center space-x-2 ${
                activeTab === 'jlpt' ? 'active' : ''
              }`}
              onClick={() => setActiveTab('jlpt')}
            >
              <Star className="w-4 h-4" />
              <span>Theo JLPT</span>
            </button>
          </div>

          {activeTab === 'themes' && (
            <div className="tab-content">
              <div className="space-y-12">
                {vocabularyThemes.map((theme, index) => (
                  <div key={index}>
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-bold mb-2">{theme.title}</h3>
                      <p className="text-muted-foreground">{theme.subtitle}</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                      {theme.words.map((word, idx) => (
                        <WordCard key={idx} word={word} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'jlpt' && (
            <div className="tab-content">
              <div className="space-y-12">
                {jlptVocab.map((level, index) => (
                  <div key={index}>
                    <div className="text-center mb-6">
                      <span className={`badge bg-jlpt-${level.level.toLowerCase()} text-white text-lg px-4 py-2 mb-2`}>
                        JLPT {level.level}
                      </span>
                      <p className="text-muted-foreground">
                        Từ vựng quan trọng cấp độ {level.level}
                      </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {level.words.map((word, idx) => (
                        <WordCard key={idx} word={word} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="text-center mt-12">
          <button className="btn btn-default bg-gradient-primary hover:opacity-90 mr-4 btn-lg">
            Tạo sổ từ vựng
          </button>
          <button className="btn btn-outline btn-lg">
            Thẻ ghi nhớ
          </button>
        </div>
      </div>
    </section>
  );
};

export default VocabularySection;