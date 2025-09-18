import React, { useState, useEffect } from 'react';
import { useActionHandler } from '../../hooks/use-action-handler';
import { Search, Plus, Edit, Trash2, BookOpen } from 'lucide-react';
import { useToast } from '../../contexts/ToastContext';

const VocabularyManagement = () => {
  const { handleLoad, handleCreate, handleUpdate, handleDelete, isLoading } = useActionHandler();
  const { toast } = useToast();
  
  const [vocabularies, setVocabularies] = useState([]);
  const [filteredVocabularies, setFilteredVocabularies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingVocabulary, setEditingVocabulary] = useState(null);
  
  const [formData, setFormData] = useState({
    word: '',
    reading: '',
    meaning: '',
    exampleSentence: '',
    level: 'N5'
  });

  // Mock data for demonstration
  const mockVocabularies = [
    {
      id: 1,
      word: 'こんにちは',
      reading: 'Konnichiwa',
      meaning: 'Xin chào',
      exampleSentence: 'こんにちは、元気ですか？',
      level: 'N5'
    },
    {
      id: 2,
      word: 'ありがとう',
      reading: 'Arigatou',
      meaning: 'Cảm ơn',
      exampleSentence: 'ありがとうございません。',
      level: 'N5'
    },
    {
      id: 3,
      word: 'すみません',
      reading: 'Sumimasen',
      meaning: 'Xin lỗi',
      exampleSentence: 'すみません、道を教えていただけますか？',
      level: 'N5'
    }
  ];

  // Load vocabularies
  useEffect(() => {
    loadVocabularies();
  }, []);

  // Filter vocabularies based on search term
  useEffect(() => {
    if (!searchTerm) {
      setFilteredVocabularies(vocabularies);
    } else {
      const filtered = vocabularies.filter(vocab => 
        vocab.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vocab.reading.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vocab.meaning.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredVocabularies(filtered);
    }
  }, [searchTerm, vocabularies]);

  const loadVocabularies = async () => {
    await handleLoad(async () => {
      // In a real app, this would be an API call
      setVocabularies(mockVocabularies);
      setFilteredVocabularies(mockVocabularies);
    }, {
      errorMessage: 'Không thể tải danh sách từ vựng'
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    if (editingVocabulary) {
      // Update existing vocabulary
      await handleUpdate(editingVocabulary, async () => {
        const updatedVocabularies = vocabularies.map(vocab => 
          vocab.id === editingVocabulary.id 
            ? { ...vocab, ...formData }
            : vocab
        );
        setVocabularies(updatedVocabularies);
        setFilteredVocabularies(updatedVocabularies);
        resetForm();
        toast({
          title: 'Cập nhật thành công',
          description: 'Từ vựng đã được cập nhật',
          variant: 'default'
        });
      }, {
        errorMessage: 'Không thể cập nhật từ vựng'
      });
    } else {
      // Create new vocabulary
      await handleCreate(formData, async () => {
        const newVocabulary = {
          id: Date.now(),
          ...formData
        };
        const updatedVocabularies = [...vocabularies, newVocabulary];
        setVocabularies(updatedVocabularies);
        setFilteredVocabularies(updatedVocabularies);
        resetForm();
        toast({
          title: 'Thêm mới thành công',
          description: 'Từ vựng đã được thêm vào danh sách',
          variant: 'default'
        });
      }, {
        errorMessage: 'Không thể thêm từ vựng mới'
      });
    }
  };

  const handleEdit = (vocabulary) => {
    setEditingVocabulary(vocabulary);
    setFormData({
      word: vocabulary.word,
      reading: vocabulary.reading,
      meaning: vocabulary.meaning,
      exampleSentence: vocabulary.exampleSentence,
      level: vocabulary.level
    });
    setIsDialogOpen(true);
  };

  const handleDeleteVocabulary = async (vocabulary) => {
    await handleDelete(vocabulary, async () => {
      const updatedVocabularies = vocabularies.filter(vocab => vocab.id !== vocabulary.id);
      setVocabularies(updatedVocabularies);
      setFilteredVocabularies(updatedVocabularies);
      toast({
        title: 'Xóa thành công',
        description: 'Từ vựng đã được xóa khỏi danh sách',
        variant: 'default'
      });
    }, {
      errorMessage: 'Không thể xóa từ vựng'
    });
  };

  const resetForm = () => {
    setFormData({
      word: '',
      reading: '',
      meaning: '',
      exampleSentence: '',
      level: 'N5'
    });
    setEditingVocabulary(null);
    setIsDialogOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="vocabulary-management">
      <div className="container-full">
        <div className="px-4 md:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Quản lý từ vựng</h1>
              <p className="text-muted-foreground">Quản lý và tổ chức từ vựng tiếng Nhật</p>
            </div>
            <button 
              className="btn btn-primary"
              onClick={resetForm}
            >
              <Plus className="w-4 h-4 mr-2" />
              Thêm từ vựng mới
            </button>
          </div>

          {/* Search */}
          <div className="card mb-6">
            <div className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Tìm kiếm từ vựng..."
                  className="input pl-10 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Add/Edit Dialog */}
          <div className={`dialog-overlay ${isDialogOpen ? '' : 'hidden'}`}>
            <div className="dialog-content max-w-2xl">
              <div className="dialog-header">
                <button 
                  className="dialog-close"
                  onClick={resetForm}
                >
                  <X className="w-4 h-4" />
                </button>
                <h2 className="dialog-title">
                  {editingVocabulary ? 'Chỉnh sửa từ vựng' : 'Thêm từ vựng mới'}
                </h2>
                <p className="text-muted-foreground">
                  {editingVocabulary ? 'Chỉnh sửa thông tin từ vựng' : 'Thêm từ vựng mới vào danh sách'}
                </p>
              </div>
              
              <form onSubmit={handleFormSubmit} className="dialog-body space-y-4">
                <div>
                  <label htmlFor="word" className="label">Từ vựng *</label>
                  <input
                    id="word"
                    name="word"
                    className="input"
                    value={formData.word}
                    onChange={handleInputChange}
                    placeholder="例：こんにちは"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="reading" className="label">Cách đọc *</label>
                  <input
                    id="reading"
                    name="reading"
                    className="input"
                    value={formData.reading}
                    onChange={handleInputChange}
                    placeholder="例：Konnichiwa"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="meaning" className="label">Ý nghĩa *</label>
                  <input
                    id="meaning"
                    name="meaning"
                    className="input"
                    value={formData.meaning}
                    onChange={handleInputChange}
                    placeholder="例：Xin chào"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="exampleSentence" className="label">Câu ví dụ</label>
                  <textarea
                    id="exampleSentence"
                    name="exampleSentence"
                    className="textarea"
                    value={formData.exampleSentence}
                    onChange={handleInputChange}
                    placeholder="例：こんにちは、元気ですか？"
                    rows={3}
                  />
                </div>
                
                <div>
                  <label htmlFor="level" className="label">Mức độ</label>
                  <select
                    id="level"
                    name="level"
                    className="select"
                    value={formData.level}
                    onChange={handleInputChange}
                  >
                    <option value="N5">N5</option>
                    <option value="N4">N4</option>
                    <option value="N3">N3</option>
                    <option value="N2">N2</option>
                    <option value="N1">N1</option>
                  </select>
                </div>
                
                <div className="dialog-footer">
                  <button 
                    type="button" 
                    className="btn btn-outline"
                    onClick={resetForm}
                  >
                    Hủy
                  </button>
                  <button 
                    type="submit"
                    className="btn btn-primary"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Đang xử lý...' : (editingVocabulary ? 'Cập nhật' : 'Thêm từ vựng')}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Vocabulary Table */}
          <div className="card">
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-5 h-5" />
                <h3 className="text-lg font-semibold">Danh sách từ vựng</h3>
              </div>
              
              <div className="rounded-md border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Từ vựng</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cách đọc</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ý nghĩa</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mức độ</th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Hành động</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredVocabularies.map((vocabulary) => (
                        <tr key={vocabulary.id}>
                          <td className="px-4 py-3 font-medium">{vocabulary.word}</td>
                          <td className="px-4 py-3">{vocabulary.reading}</td>
                          <td className="px-4 py-3">{vocabulary.meaning}</td>
                          <td className="px-4 py-3">
                            <span className={`badge ${
                              vocabulary.level === 'N1' ? 'badge-destructive' :
                              vocabulary.level === 'N2' ? 'badge-default' :
                              vocabulary.level === 'N3' ? 'badge-secondary' :
                              'badge-outline'
                            }`}>
                              {vocabulary.level}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <div className="flex justify-end gap-2">
                              <button
                                className="btn btn-outline btn-sm"
                                onClick={() => handleEdit(vocabulary)}
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                className="btn btn-destructive btn-sm"
                                onClick={() => handleDeleteVocabulary(vocabulary)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              {filteredVocabularies.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Không tìm thấy từ vựng nào</p>
                  <p className="text-sm mt-1">Hãy thử thay đổi từ khóa tìm kiếm</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VocabularyManagement;