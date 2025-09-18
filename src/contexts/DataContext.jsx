import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext(undefined);

// Mock data for vocabulary
const initialVocabulary = [
  {
    id: 'vocab1',
    japanese: '私',
    hiragana: 'わたし',
    vietnamese: 'tôi',
    category: 'đại từ',
    difficulty: 'beginner',
    example: '私は学生です。',
    exampleTranslation: 'Tôi là học sinh.',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    id: 'vocab2',
    japanese: '本',
    hiragana: 'ほん',
    vietnamese: 'sách',
    category: 'danh từ',
    difficulty: 'beginner',
    example: '本を読みます。',
    exampleTranslation: 'Đọc sách.',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    id: 'vocab3',
    japanese: '食べる',
    hiragana: 'たべる',
    vietnamese: 'ăn',
    category: 'động từ',
    difficulty: 'beginner',
    example: 'ご飯を食べます。',
    exampleTranslation: 'Ăn cơm.',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  }
];

// Mock data for grammar
const initialGrammar = [
  {
    id: 'grammar1',
    title: 'です/である (desu/de aru)',
    pattern: '[Danh từ] + です',
    explanation: 'Dùng để khẳng định, tương đương với "là" trong tiếng Việt',
    vietnamese: 'Cách nói lịch sự cho "là"',
    examples: [
      { japanese: '私は学生です。', vietnamese: 'Tôi là học sinh.' },
      { japanese: 'これは本です。', vietnamese: 'Đây là quyển sách.' }
    ],
    difficulty: 'beginner',
    category: 'cơ bản',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    id: 'grammar2',
    title: 'を (wo/o)',
    pattern: '[Danh từ] + を + [Động từ]',
    explanation: 'Trợ từ chỉ tân ngữ trực tiếp',
    vietnamese: 'Chỉ đối tượng của hành động',
    examples: [
      { japanese: '本を読みます。', vietnamese: 'Đọc sách.' },
      { japanese: 'ご飯を食べます。', vietnamese: 'Ăn cơm.' }
    ],
    difficulty: 'beginner',
    category: 'trợ từ',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  }
];

export const DataProvider = ({ children }) => {
  const [vocabulary, setVocabulary] = useState(initialVocabulary);
  const [grammar, setGrammar] = useState(initialGrammar);

  // Load data from localStorage on mount
  useEffect(() => {
    try {
      const savedVocabulary = localStorage.getItem('japanese_vocabulary');
      const savedGrammar = localStorage.getItem('japanese_grammar');
      
      if (savedVocabulary) {
        setVocabulary(JSON.parse(savedVocabulary));
      }
      
      if (savedGrammar) {
        setGrammar(JSON.parse(savedGrammar));
      }
    } catch (error) {
      console.error('Error loading data from localStorage:', error);
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('japanese_vocabulary', JSON.stringify(vocabulary));
    } catch (error) {
      console.error('Error saving vocabulary to localStorage:', error);
    }
  }, [vocabulary]);

  useEffect(() => {
    try {
      localStorage.setItem('japanese_grammar', JSON.stringify(grammar));
    } catch (error) {
      console.error('Error saving grammar to localStorage:', error);
    }
  }, [grammar]);

  // Vocabulary functions
  const addVocabulary = async (item) => {
    try {
      const newItem = {
        ...item,
        id: `vocab_${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      setVocabulary(prev => [...prev, newItem]);
      
      return {
        success: true,
        message: 'Thêm từ vựng thành công!'
      };
    } catch (error) {
      return {
        success: false,
        message: 'Có lỗi xảy ra khi thêm từ vựng'
      };
    }
  };

  const updateVocabulary = async (id, updates) => {
    try {
      setVocabulary(prev => 
        prev.map(item => 
          item.id === id 
            ? { ...item, ...updates, updatedAt: new Date().toISOString() }
            : item
        )
      );
      
      return {
        success: true,
        message: 'Cập nhật từ vựng thành công!'
      };
    } catch (error) {
      return {
        success: false,
        message: 'Có lỗi xảy ra khi cập nhật từ vựng'
      };
    }
  };

  const deleteVocabulary = async (id) => {
    try {
      setVocabulary(prev => prev.filter(item => item.id !== id));
      
      return {
        success: true,
        message: 'Xóa từ vựng thành công!'
      };
    } catch (error) {
      return {
        success: false,
        message: 'Có lỗi xảy ra khi xóa từ vựng'
      };
    }
  };

  const getVocabularyById = (id) => {
    return vocabulary.find(item => item.id === id);
  };

  // Grammar functions
  const addGrammar = async (item) => {
    try {
      const newItem = {
        ...item,
        id: `grammar_${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      setGrammar(prev => [...prev, newItem]);
      
      return {
        success: true,
        message: 'Thêm ngữ pháp thành công!'
      };
    } catch (error) {
      return {
        success: false,
        message: 'Có lỗi xảy ra khi thêm ngữ pháp'
      };
    }
  };

  const updateGrammar = async (id, updates) => {
    try {
      setGrammar(prev => 
        prev.map(item => 
          item.id === id 
            ? { ...item, ...updates, updatedAt: new Date().toISOString() }
            : item
        )
      );
      
      return {
        success: true,
        message: 'Cập nhật ngữ pháp thành công!'
      };
    } catch (error) {
      return {
        success: false,
        message: 'Có lỗi xảy ra khi cập nhật ngữ pháp'
      };
    }
  };

  const deleteGrammar = async (id) => {
    try {
      setGrammar(prev => prev.filter(item => item.id !== id));
      
      return {
        success: true,
        message: 'Xóa ngữ pháp thành công!'
      };
    } catch (error) {
      return {
        success: false,
        message: 'Có lỗi xảy ra khi xóa ngữ pháp'
      };
    }
  };

  const getGrammarById = (id) => {
    return grammar.find(item => item.id === id);
  };

  // Search and filter functions
  const searchVocabulary = (query) => {
    const lowercaseQuery = query.toLowerCase();
    return vocabulary.filter(item => 
      item.japanese.toLowerCase().includes(lowercaseQuery) ||
      item.hiragana.toLowerCase().includes(lowercaseQuery) ||
      item.vietnamese.toLowerCase().includes(lowercaseQuery) ||
      item.category.toLowerCase().includes(lowercaseQuery)
    );
  };

  const searchGrammar = (query) => {
    const lowercaseQuery = query.toLowerCase();
    return grammar.filter(item => 
      item.title.toLowerCase().includes(lowercaseQuery) ||
      item.pattern.toLowerCase().includes(lowercaseQuery) ||
      item.explanation.toLowerCase().includes(lowercaseQuery) ||
      item.vietnamese.toLowerCase().includes(lowercaseQuery) ||
      item.category.toLowerCase().includes(lowercaseQuery)
    );
  };

  const filterVocabularyByCategory = (category) => {
    return vocabulary.filter(item => item.category === category);
  };

  const filterGrammarByCategory = (category) => {
    return grammar.filter(item => item.category === category);
  };

  const value = {
    vocabulary,
    addVocabulary,
    updateVocabulary,
    deleteVocabulary,
    getVocabularyById,
    grammar,
    addGrammar,
    updateGrammar,
    deleteGrammar,
    getGrammarById,
    searchVocabulary,
    searchGrammar,
    filterVocabularyByCategory,
    filterGrammarByCategory
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export default DataContext;