import { Volume2, Eye } from "lucide-react";

const AlphabetSection = () => {
  const hiraganaChars = [
    { char: "あ", romaji: "a", vietnamese: "/a/" },
    { char: "か", romaji: "ka", vietnamese: "/ga/" },
    { char: "さ", romaji: "sa", vietnamese: "/sa/" },
    { char: "た", romaji: "ta", vietnamese: "/da/" },
    { char: "な", romaji: "na", vietnamese: "/na/" },
    { char: "は", romaji: "ha", vietnamese: "/ha/" },
    { char: "ま", romaji: "ma", vietnamese: "/ma/" },
    { char: "や", romaji: "ya", vietnamese: "/ya/" },
    { char: "ら", romaji: "ra", vietnamese: "/la/" },
    { char: "わ", romaji: "wa", vietnamese: "/wa/" },
  ];

  const katakanaChars = [
    { char: "ア", romaji: "a", vietnamese: "/a/" },
    { char: "カ", romaji: "ka", vietnamese: "/ga/" },
    { char: "サ", romaji: "sa", vietnamese: "/sa/" },
    { char: "タ", romaji: "ta", vietnamese: "/da/" },
    { char: "ナ", romaji: "na", vietnamese: "/na/" },
    { char: "ハ", romaji: "ha", vietnamese: "/ha/" },
    { char: "マ", romaji: "ma", vietnamese: "/ma/" },
    { char: "ヤ", romaji: "ya", vietnamese: "/ya/" },
    { char: "ラ", romaji: "ra", vietnamese: "/la/" },
    { char: "ワ", romaji: "wa", vietnamese: "/wa/" },
  ];

  const kanjiExamples = [
    { char: "日", kun: "ひ", on: "ニチ", meaning: "Mặt trời, ngày", words: ["日本", "今日"] },
    { char: "本", kun: "もと", on: "ホン", meaning: "Sách, gốc", words: ["日本", "本当"] },
    { char: "人", kun: "ひと", on: "ジン", meaning: "Người", words: ["人間", "日本人"] },
    { char: "学", kun: "まな", on: "ガク", meaning: "Học", words: ["学校", "学習"] },
  ];

  const CharacterCard = ({ char, romaji, vietnamese, type }) => (
    <div className="card card-modern group cursor-pointer hover-lift">
      <div className="p-6 text-center relative z-10">
        <div className={`text-5xl font-bold mb-3 transition-all duration-300 group-hover:scale-110 ${
          type === 'hiragana' ? 'text-blue-600' : 
          type === 'katakana' ? 'text-purple-600' : 'text-indigo-600'
        }`}>
          {char}
        </div>
        <div className="text-sm font-medium text-gray-600 mb-2">{romaji}</div>
        <div className="text-xs text-gray-500 mb-4">{vietnamese}</div>
        <div className="flex justify-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="btn btn-ghost h-8 w-8 p-0 hover:bg-blue-100">
            <Volume2 className="w-4 h-4 text-blue-600" />
          </button>
          <button className="btn btn-ghost h-8 w-8 p-0 hover:bg-purple-100">
            <Eye className="w-4 h-4 text-purple-600" />
          </button>
        </div>
      </div>
    </div>
  );

  const KanjiCard = ({ char, kun, on, meaning, words }) => (
    <div className="card card-modern group hover-lift">
      <div className="p-6 relative z-10">
        <div className="text-center mb-6">
          <div className="text-6xl font-bold text-indigo-600 mb-4 group-hover:scale-110 transition-transform duration-300">{char}</div>
          <div className="flex justify-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button className="btn btn-ghost h-8 w-8 p-0 hover:bg-blue-100">
              <Volume2 className="w-4 h-4 text-blue-600" />
            </button>
            <button className="btn btn-ghost h-8 w-8 p-0 hover:bg-purple-100">
              <Eye className="w-4 h-4 text-purple-600" />
            </button>
          </div>
        </div>
        
        <div className="space-y-3 text-sm">
          <div className="bg-blue-50 p-3 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-blue-600 font-medium">Kun:</span>
              <span className="font-bold text-blue-800">{kun}</span>
            </div>
          </div>
          <div className="bg-purple-50 p-3 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-purple-600 font-medium">On:</span>
              <span className="font-bold text-purple-800">{on}</span>
            </div>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg text-center">
            <div className="text-gray-600 font-medium mb-2">Nghĩa:</div>
            <div className="font-bold text-gray-800">{meaning}</div>
          </div>
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-3 rounded-lg text-center">
            <div className="text-gray-600 font-medium mb-2">Từ ghép:</div>
            <div className="flex flex-wrap justify-center gap-2">
              {words.map((word, idx) => (
                <span key={idx} className="bg-white px-3 py-1 rounded-full text-xs font-medium text-indigo-600 border border-indigo-200 hover:bg-indigo-50 transition-colors duration-200">
                  {word}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section id="learn" className="py-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50"></div>
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient-rainbow">
            Học bảng chữ cái tiếng Nhật
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Thành thạo thứ tự nét viết và cách phát âm Hiragana, Katakana, Kanji với giao diện tương tác hiện đại
          </p>
        </div>

        <div className="tabs max-w-7xl mx-auto">
          <div className="tabs-list mb-12 bg-white/80 backdrop-blur-sm border-0 shadow-lg rounded-2xl p-2">
            <button 
              className="tab-trigger active text-blue-600 font-bold text-lg py-3 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 data-[state=active]:text-white transition-all duration-300"
              data-value="hiragana"
            >
              ひらがな
            </button>
            <button 
              className="tab-trigger text-purple-600 font-bold text-lg py-3 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-purple-600 data-[state=active]:text-white transition-all duration-300"
              data-value="katakana"
            >
              カタカナ
            </button>
            <button 
              className="tab-trigger text-indigo-600 font-bold text-lg py-3 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white transition-all duration-300"
              data-value="kanji"
            >
              漢字
            </button>
          </div>

          <div className="tab-content">
            <div className="tab-panel active" data-value="hiragana">
              <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-6">
                {hiraganaChars.map((char, index) => (
                  <div key={index} className="animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                    <CharacterCard {...char} type="hiragana" />
                  </div>
                ))}
              </div>
            </div>

            <div className="tab-panel" data-value="katakana">
              <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-6">
                {katakanaChars.map((char, index) => (
                  <div key={index} className="animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                    <CharacterCard {...char} type="katakana" />
                  </div>
                ))}
              </div>
            </div>

            <div className="tab-panel" data-value="kanji">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {kanjiExamples.map((kanji, index) => (
                  <div key={index} className="animate-fade-in-up" style={{ animationDelay: `${index * 150}ms` }}>
                    <KanjiCard {...kanji} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <button className="btn btn-default btn-lg btn-modern bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
            Xem tất cả chữ cái
          </button>
        </div>
      </div>
    </section>
  );
};

export default AlphabetSection;