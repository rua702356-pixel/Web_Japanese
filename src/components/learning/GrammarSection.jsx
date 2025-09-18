import { BookOpen, Volume2 } from "lucide-react";

const GrammarSection = () => {
  const grammarLessons = [
    {
      level: "N5",
      title: "です・である",
      description: "Cách sử dụng です và である trong câu khẳng định",
      examples: [
        { japanese: "私は学生です。", vietnamese: "Tôi là học sinh.", romaji: "Watashi wa gakusei desu." },
        { japanese: "これは本です。", vietnamese: "Đây là quyển sách.", romaji: "Kore wa hon desu." }
      ],
      color: "jlpt-n5"
    },
    {
      level: "N4", 
      title: "て形",
      description: "Cách chia động từ dạng て và các cách sử dụng",
      examples: [
        { japanese: "映画を見てください。", vietnamese: "Hãy xem phim.", romaji: "Eiga wo mite kudasai." },
        { japanese: "友達と話しています。", vietnamese: "Đang nói chuyện với bạn.", romaji: "Tomodachi to hanashite imasu." }
      ],
      color: "jlpt-n4"
    },
    {
      level: "N3",
      title: "ば条件文",
      description: "Câu điều kiện với ば và các biến thể",
      examples: [
        { japanese: "雨が降れば、家にいます。", vietnamese: "Nếu trời mưa thì ở nhà.", romaji: "Ame ga fureba, ie ni imasu." },
        { japanese: "時間があれば、手伝います。", vietnamese: "Nếu có thời gian thì sẽ giúp.", romaji: "Jikan ga areba, tetsudaimasu." }
      ],
      color: "jlpt-n3"
    },
    {
      level: "N2",
      title: "敬語表現",
      description: "Ngôn ngữ kính trọng và khiêm nhường",
      examples: [
        { japanese: "いらっしゃいませ。", vietnamese: "Xin chào (tôn kính).", romaji: "Irasshaimase." },
        { japanese: "お疲れ様でした。", vietnamese: "Anh/chị đã vất vả.", romaji: "Otsukaresama deshita." }
      ],
      color: "jlpt-n2"
    }
  ];

  const dialogues = [
    {
      title: "レストランで",
      subtitle: "Tại nhà hàng",
      conversation: [
        { speaker: "店員", text: "いらっしゃいませ。何名様ですか？", translation: "Xin chào. Mấy người ạ?" },
        { speaker: "客", text: "二人です。", translation: "Hai người." },
        { speaker: "店員", text: "こちらへどうぞ。", translation: "Xin mời đi theo." }
      ]
    },
    {
      title: "駅で",
      subtitle: "Tại ga tàu",
      conversation: [
        { speaker: "A", text: "すみません、東京駅はどこですか？", translation: "Xin lỗi, ga Tokyo ở đâu?" },
        { speaker: "B", text: "まっすぐ行って、右に曲がってください。", translation: "Đi thẳng rồi rẽ phải." },
        { speaker: "A", text: "ありがとうございます。", translation: "Cảm ơn." }
      ]
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50 to-gray-100"></div>
      <div className="absolute inset-0">
        <div className="absolute top-20 right-10 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 right-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
            Ngữ pháp và cụm từ
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Học ngữ pháp theo từng cấp độ JLPT và các cuộc hội thoại thực tế với phương pháp học tương tác hiện đại
          </p>
        </div>

        {/* Grammar Lessons */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold mb-12 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Bài học ngữ pháp JLPT</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {grammarLessons.map((lesson, index) => (
              <div key={index} className="card card-modern group hover-lift animate-fade-in-up" style={{ animationDelay: `${index * 200}ms` }}>
                <div className="p-8 relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <span className={`badge px-3 py-1 text-sm font-bold text-white shadow-md ${
                          lesson.level === 'N5' ? 'bg-gradient-to-r from-green-500 to-emerald-600' :
                          lesson.level === 'N4' ? 'bg-gradient-to-r from-blue-500 to-cyan-600' :
                          lesson.level === 'N3' ? 'bg-gradient-to-r from-purple-500 to-violet-600' :
                          'bg-gradient-to-r from-red-500 to-pink-600'
                        }`}>
                          {lesson.level}
                        </span>
                        <BookOpen className="w-6 h-6 text-indigo-600" />
                      </div>
                      <h4 className="text-2xl font-bold mb-3 text-gray-900">{lesson.title}</h4>
                      <p className="text-gray-600 leading-relaxed">{lesson.description}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {lesson.examples.map((example, idx) => (
                      <div key={idx} className="bg-gradient-to-r from-gray-50 to-white p-4 rounded-xl border border-gray-100 hover:border-blue-200 transition-all duration-300 group/example">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-bold text-lg text-gray-900 group-hover/example:text-blue-600 transition-colors duration-300">{example.japanese}</span>
                          <button className="btn btn-ghost h-8 w-8 p-0 hover:bg-blue-100 opacity-0 group-hover/example:opacity-100 transition-all duration-300">
                            <Volume2 className="w-4 h-4 text-blue-600" />
                          </button>
                        </div>
                        <div className="text-sm text-gray-500 mb-2 font-medium">{example.romaji}</div>
                        <div className="text-sm text-indigo-600 font-medium">{example.vietnamese}</div>
                      </div>
                    ))}
                  </div>

                  <button className="btn btn-default w-full mt-6 btn-modern bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-md hover:shadow-lg transition-all duration-300">
                    Học chi tiết
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dialogue Section */}
        <div>
          <h3 className="text-3xl font-bold mb-12 text-center bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Hội thoại thực tế</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {dialogues.map((dialogue, index) => (
              <div key={index} className="card card-modern group hover-lift animate-fade-in-up" style={{ animationDelay: `${(index + 2) * 200}ms` }}>
                <div className="bg-gradient-to-r from-green-600 to-blue-600 p-6 text-white rounded-t-2xl">
                  <div className="text-center">
                    <h4 className="text-2xl font-bold mb-2">{dialogue.title}</h4>
                    <p className="text-green-100 text-lg">{dialogue.subtitle}</p>
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  {dialogue.conversation.map((line, idx) => (
                    <div key={idx} className="group/line">
                      <div className="flex items-center justify-between mb-3">
                        <span className="badge badge-outline text-sm font-medium px-3 py-1 border-2 border-blue-200 text-blue-700 bg-blue-50">
                          {line.speaker}
                        </span>
                        <button className="btn btn-ghost h-8 w-8 p-0 hover:bg-blue-100 opacity-0 group-hover/line:opacity-100 transition-all duration-300">
                          <Volume2 className="w-4 h-4 text-blue-600" />
                        </button>
                      </div>
                      <div className="bg-gradient-to-r from-blue-50 to-green-50 p-4 rounded-xl border border-blue-100 hover:border-blue-200 transition-all duration-300">
                        <div className="font-bold text-lg text-gray-900 mb-2">{line.text}</div>
                        <div className="text-green-700 font-medium">{line.translation}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-6 pt-0">
                  <button className="btn btn-default w-full btn-modern bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white border-0 shadow-md hover:shadow-lg transition-all duration-300">
                    Luyện tập
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GrammarSection;