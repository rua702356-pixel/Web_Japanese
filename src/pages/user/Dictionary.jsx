import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useActionHandler } from '../../hooks/use-action-handler';
import PageLayout from '../../layouts/PageLayout';
import { useToast } from '../../contexts/ToastContext';
import { 
  Search, 
  Volume2, 
  Heart, 
  Copy, 
  ArrowRightLeft, 
  History, 
  ChevronDown, 
  ChevronUp 
} from 'lucide-react';
import '../../styles/components/dictionary.css';

const Dictionary = () => {
  const { isAuthenticated } = useAuth();
  const { handleSearch, handleLoad, isLoading } = useActionHandler();
  const { toast } = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('dictionary');
  const [searchResults, setSearchResults] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [expandedEntries, setExpandedEntries] = useState(new Set());

  const mockData = [
    {
      id: '1',
      japanese: 'こんにちは',
      hiragana: 'こんにちは',
      romaji: 'konnichiwa',
      vietnamese: 'xin chào',
      type: 'greeting',
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
      type: 'noun',
      jlptLevel: 'N5',
      examples: [
        { japanese: '学校に行きます。', vietnamese: 'Tôi đi đến trường.' }
      ]
    }
  ];

  useEffect(() => {
    loadInitialData();
    if (isAuthenticated) loadUserData();
  }, []);

  const loadInitialData = useCallback(async () => {
    await handleLoad(async () => {
      setSearchResults(mockData);
    }, { showLoading: false });
  }, [handleLoad]);

  const loadUserData = useCallback(async () => {
    const savedFavorites = localStorage.getItem('dictionary_favorites');
    const savedSearches = localStorage.getItem('dictionary_searches');
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
    if (savedSearches) setRecentSearches(JSON.parse(savedSearches));
  }, []);

  const performSearch = useCallback(async (query) => {
    if (!query.trim()) {
      setSearchResults(mockData);
      return;
    }

    await handleSearch(query, async (searchTerm) => {
      const filtered = mockData.filter(entry =>
        entry.japanese.includes(searchTerm) ||
        entry.vietnamese.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.romaji.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(filtered);
      
      if (isAuthenticated) {
        const newSearches = [searchTerm, ...recentSearches.filter(s => s !== searchTerm)].slice(0, 8);
        setRecentSearches(newSearches);
        localStorage.setItem('dictionary_searches', JSON.stringify(newSearches));
      }
    });
  }, [handleSearch, recentSearches, isAuthenticated]);

  const toggleFavorite = useCallback((entry) => {
    if (!isAuthenticated) {
      toast({
        title: 'Yêu cầu đăng nhập',
        description: 'Vui lòng đăng nhập để lưu từ yêu thích',
        variant: 'destructive'
      });
      return;
    }

    const isFavorite = favorites.some(fav => fav.id === entry.id);
    const newFavorites = isFavorite 
      ? favorites.filter(fav => fav.id !== entry.id)
      : [...favorites, entry];
    
    setFavorites(newFavorites);
    localStorage.setItem('dictionary_favorites', JSON.stringify(newFavorites));
    
    toast({
      title: isFavorite ? 'Đã xóa khỏi yêu thích' : 'Đã thêm vào yêu thích',
      description: entry.japanese
    });
  }, [isAuthenticated, favorites, toast]);

  const copyToClipboard = useCallback(async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: 'Đã sao chép', description: text });
    } catch {
      toast({ title: 'Lỗi sao chép', variant: 'destructive' });
    }
  }, [toast]);

  return (
    <PageLayout title="Từ điển tiếng Nhật" description="Tra cứu từ vựng và kanji" showFooter={false}>
      <div className={`dictionary-container ${isLoading ? 'dictionary-loading' : ''}`}>
        {/* Search Section */}
        <div className="dictionary-search-card">
          <div className="dictionary-search-input-wrapper">
            <Search className="dictionary-search-icon" />
            <input
              className="dictionary-search-input"
              placeholder="Nhập từ tiếng Nhật, tiếng Việt hoặc romaji..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                performSearch(e.target.value);
              }}
              disabled={isLoading}
            />
          </div>

          {/* Recent Searches */}
          {recentSearches.length > 0 && (
            <div className="dictionary-recent-searches">
              <div className="dictionary-recent-header">
                <History className="dictionary-recent-icon" />
                <span>Tìm kiếm gần đây:</span>
              </div>
              <div className="dictionary-recent-list">
                {recentSearches.map((term, index) => (
                  <span 
                    key={index}
                    className="dictionary-recent-badge"
                    onClick={() => {
                      setSearchQuery(term);
                      performSearch(term);
                    }}
                  >
                    {term}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="dictionary-results">
          {searchResults.length > 0 ? (
            searchResults.map((entry) => (
              <div key={entry.id} className="dictionary-entry">
                <div className="dictionary-entry-header">
                  <div className="dictionary-entry-main">
                    <div className="dictionary-entry-japanese">{entry.japanese}</div>
                    <div className="dictionary-entry-reading">{entry.hiragana} ({entry.romaji})</div>
                    <div className="dictionary-entry-meaning">{entry.vietnamese}</div>
                  </div>
                  
                  <div className="dictionary-entry-actions">
                    <button
                      onClick={() => copyToClipboard(entry.japanese)}
                      className="dictionary-action-btn"
                      title="Sao chép"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    
                    <button
                      onClick={() => toggleFavorite(entry)}
                      className={`dictionary-action-btn ${
                        favorites.some(fav => fav.id === entry.id) ? 'dictionary-action-favorited' : ''
                      }`}
                      title="Thêm vào yêu thích"
                    >
                      <Heart className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="dictionary-entry-meta">
                  <span className="dictionary-entry-type">{entry.type}</span>
                  <span className="dictionary-entry-level">JLPT {entry.jlptLevel}</span>
                </div>

                {/* Examples */}
                <div className="dictionary-entry-examples">
                  {entry.examples.map((example, index) => (
                    <div key={index} className="dictionary-example">
                      <div className="dictionary-example-japanese">{example.japanese}</div>
                      <div className="dictionary-example-vietnamese">{example.vietnamese}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="dictionary-no-results">
              <div className="dictionary-no-results-icon">
                <Search className="w-12 h-12" />
              </div>
              <h3>Không tìm thấy kết quả</h3>
              <p>Thử tìm kiếm với từ khóa khác</p>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default Dictionary;