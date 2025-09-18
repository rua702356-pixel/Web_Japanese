import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import { useToast } from '../../contexts/ToastContext';
import { Pencil, Trash2, Plus, Search, Filter, BookOpen, X } from 'lucide-react';
import '../../styles/components/grammar-form.css';

const GrammarManagement = () => {
  const { isAdmin } = useAuth();
  const { grammar, addGrammar, updateGrammar, deleteGrammar } = useData();
  const { toast } = useToast();
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [formData, setFormData] = useState({
    title: '',
    pattern: '',
    explanation: '',
    vietnamese: '',
    examples: [{ japanese: '', vietnamese: '' }],
    difficulty: 'beginner',
    category: ''
  });

  // Redirect if not admin
  useEffect(() => {
    if (!isAdmin) {
      toast({
        title: 'Truy cập bị từ chối',
        description: 'Bạn cần quyền admin để truy cập trang này.',
        variant: 'destructive'
      });
    }
  }, [isAdmin, toast]);

  // Get unique categories
  const categories = [...new Set(grammar.map(item => item.category))];

  // Filter grammar based on search and filters
  const filteredGrammar = grammar.filter(item => {
    const matchesSearch = searchQuery ? 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.pattern.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.explanation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.vietnamese.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) :
      true;
    
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || item.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.pattern || !formData.explanation || !formData.vietnamese || !formData.category) {
      toast({
        title: 'Thiếu thông tin',
        description: 'Vui lòng điền đầy đủ các trường bắt buộc.',
        variant: 'destructive'
      });
      return;
    }

    // Validate examples
    const validExamples = formData.examples.filter(ex => ex.japanese && ex.vietnamese);
    if (validExamples.length === 0) {
      toast({
        title: 'Thiếu ví dụ',
        description: 'Vui lòng thêm ít nhất một ví dụ.',
        variant: 'destructive'
      });
      return;
    }

    try {
      let result;
      
      if (editingItem) {
        result = await updateGrammar(editingItem.id, { ...formData, examples: validExamples });
      } else {
        result = await addGrammar({ ...formData, examples: validExamples });
      }

      if (result.success) {
        toast({
          title: 'Thành công',
          description: result.message
        });
        
        setIsDialogOpen(false);
        setEditingItem(null);
        setFormData({
          title: '',
          pattern: '',
          explanation: '',
          vietnamese: '',
          examples: [{ japanese: '', vietnamese: '' }],
          difficulty: 'beginner',
          category: ''
        });
      } else {
        toast({
          title: 'Lỗi',
          description: result.message,
          variant: 'destructive'
        });
      }
    } catch (error) {
      toast({
        title: 'Lỗi',
        description: 'Có lỗi xảy ra khi lưu dữ liệu.',
        variant: 'destructive'
      });
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      pattern: item.pattern,
      explanation: item.explanation,
      vietnamese: item.vietnamese,
      examples: item.examples.length > 0 ? item.examples : [{ japanese: '', vietnamese: '' }],
      difficulty: item.difficulty,
      category: item.category
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa ngữ pháp này?')) {
      try {
        const result = await deleteGrammar(id);
        
        if (result.success) {
          toast({
            title: 'Thành công',
            description: result.message
          });
        } else {
          toast({
            title: 'Lỗi',
            description: result.message,
            variant: 'destructive'
          });
        }
      } catch (error) {
        toast({
          title: 'Lỗi',
          description: 'Có lỗi xảy ra khi xóa dữ liệu.',
          variant: 'destructive'
        });
      }
    }
  };

  const handleAddNew = () => {
    setEditingItem(null);
    setFormData({
      title: '',
      pattern: '',
      explanation: '',
      vietnamese: '',
      examples: [{ japanese: '', vietnamese: '' }],
      difficulty: 'beginner',
      category: ''
    });
    setIsDialogOpen(true);
  };

  const addExample = () => {
    setFormData({
      ...formData,
      examples: [...formData.examples, { japanese: '', vietnamese: '' }]
    });
  };

  const updateExample = (index, field, value) => {
    const newExamples = [...formData.examples];
    newExamples[index][field] = value;
    setFormData({ ...formData, examples: newExamples });
  };

  const removeExample = (index) => {
    if (formData.examples.length > 1) {
      const newExamples = formData.examples.filter((_, i) => i !== index);
      setFormData({ ...formData, examples: newExamples });
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner': return '#22c55e';
      case 'intermediate': return '#f59e0b';
      case 'advanced': return '#ef4444';
      default: return '#64748b';
    }
  };

  if (!isAdmin) {
    return (
      <div className="grammar-form-container" style={{ textAlign: 'center', paddingTop: '2rem' }}>
        <h1>Truy cập bị từ chối</h1>
        <p>Bạn cần quyền admin để truy cập trang này.</p>
      </div>
    );
  }

  return (
    <div className="grammar-form-container">
      <div className="grammar-form-header">
        <div>
          <h1 className="grammar-form-title">Quản lý ngữ pháp</h1>
          <p className="grammar-form-subtitle">Thêm, sửa, xóa và quản lý ngữ pháp tiếng Nhật</p>
        </div>
        
        <div className={`dialog-overlay ${isDialogOpen ? '' : 'hidden'}`}>
          <div className="dialog-content">
            <div className="dialog-header">
              <button 
                className="dialog-close" 
                onClick={() => setIsDialogOpen(false)}
              >
                <X size={16} />
              </button>
              <h2 className="dialog-title">
                {editingItem ? 'Chỉnh sửa ngữ pháp' : 'Thêm ngữ pháp mới'}
              </h2>
              <p className="text-muted-foreground">
                {editingItem ? 'Cập nhật thông tin ngữ pháp' : 'Nhập thông tin cho ngữ pháp mới'}
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="grammar-form">
              <div className="grammar-form-group">
                <label htmlFor="title" className="label">Tiêu đề *</label>
                <input
                  id="title"
                  className="input"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="例：です/である"
                  required
                />
              </div>
              
              <div className="grammar-form-group">
                <label htmlFor="pattern" className="label">Cấu trúc *</label>
                <input
                  id="pattern"
                  className="input"
                  value={formData.pattern}
                  onChange={(e) => setFormData({ ...formData, pattern: e.target.value })}
                  placeholder="例：[Danh từ] + です"
                  required
                />
              </div>
              
              <div className="grammar-form-group">
                <label htmlFor="explanation" className="label">Giải thích *</label>
                <textarea
                  id="explanation"
                  className="textarea"
                  value={formData.explanation}
                  onChange={(e) => setFormData({ ...formData, explanation: e.target.value })}
                  placeholder="Giải thích cách sử dụng ngữ pháp này..."
                  rows={2}
                  required
                />
              </div>
              
              <div className="grammar-form-group">
                <label htmlFor="vietnamese" className="label">Dịch tiếng Việt *</label>
                <input
                  id="vietnamese"
                  className="input"
                  value={formData.vietnamese}
                  onChange={(e) => setFormData({ ...formData, vietnamese: e.target.value })}
                  placeholder="Ý nghĩa trong tiếng Việt"
                  required
                />
              </div>
              
              <div className="grammar-form-row">
                <div className="grammar-form-group">
                  <label htmlFor="category" className="label">Danh mục *</label>
                  <input
                    id="category"
                    className="input"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="例：cơ bản"
                    required
                  />
                </div>
                
                <div className="grammar-form-group">
                  <label htmlFor="difficulty" className="label">Độ khó</label>
                  <select
                    id="difficulty"
                    className="select"
                    value={formData.difficulty}
                    onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                  >
                    <option value="beginner">Cơ bản</option>
                    <option value="intermediate">Trung cấp</option>
                    <option value="advanced">Nâng cao</option>
                  </select>
                </div>
              </div>
              
              <div className="grammar-form-group">
                <div className="grammar-examples-header">
                  <label className="label">Ví dụ *</label>
                  <button type="button" className="btn btn-outline btn-sm" onClick={addExample}>
                    <Plus size={12} style={{ marginRight: '0.25rem' }} />
                    Thêm ví dụ
                  </button>
                </div>
                
                {formData.examples.map((example, index) => (
                  <div key={index} className="grammar-example-item">
                    <div className="grammar-example-header">
                      <span className="grammar-example-title">Ví dụ {index + 1}</span>
                      {formData.examples.length > 1 && (
                        <button 
                          type="button" 
                          className="btn btn-ghost btn-sm"
                          onClick={() => removeExample(index)}
                          style={{ color: '#ef4444' }}
                        >
                          <Trash2 size={12} />
                        </button>
                      )}
                    </div>
                    
                    <div className="grammar-example-inputs">
                      <input
                        className="input"
                        placeholder="Câu tiếng Nhật..."
                        value={example.japanese}
                        onChange={(e) => updateExample(index, 'japanese', e.target.value)}
                      />
                      <input
                        className="input"
                        placeholder="Dịch tiếng Việt..."
                        value={example.vietnamese}
                        onChange={(e) => updateExample(index, 'vietnamese', e.target.value)}
                      />
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="grammar-form-actions">
                <button 
                  type="button" 
                  className="btn btn-outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Hủy
                </button>
                <button 
                  type="submit"
                  className="btn btn-primary"
                >
                  {editingItem ? 'Cập nhật' : 'Thêm mới'}
                </button>
              </div>
            </form>
          </div>
        </div>
        
        <button onClick={handleAddNew} className="btn btn-primary">
          <Plus size={16} />
          Thêm ngữ pháp mới
        </button>
      </div>

      {/* Search and Filters */}
      <div className="card p-4 mb-6">
        <div className="grammar-search-container">
          <div className="grammar-search-input-wrapper">
            <Search size={16} className="grammar-search-icon" />
            <input
              className="input"
              placeholder="Tìm kiếm ngữ pháp..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="grammar-filters">
            <Filter size={16} style={{ color: '#64748b' }} />
            
            <select 
              className="select" 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">Tất cả danh mục</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            
            <select 
              className="select" 
              value={selectedDifficulty} 
              onChange={(e) => setSelectedDifficulty(e.target.value)}
            >
              <option value="all">Tất cả độ khó</option>
              <option value="beginner">Cơ bản</option>
              <option value="intermediate">Trung cấp</option>
              <option value="advanced">Nâng cao</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grammar List */}
      <div className="grammar-cards-container">
        {filteredGrammar.map((item) => (
          <div key={item.id} className="card">
            <div className="p-4">
              <div className="grammar-card-header">
                <div className="grammar-card-title-section">
                  <div className="grammar-card-title-row">
                    <h3 className="font-semibold">{item.title}</h3>
                    <span 
                      className="badge"
                      style={{ backgroundColor: getDifficultyColor(item.difficulty), color: 'white' }}
                    >
                      {item.difficulty === 'beginner' ? 'Cơ bản' : 
                       item.difficulty === 'intermediate' ? 'Trung cấp' : 'Nâng cao'}
                    </span>
                    <span className="badge badge-outline">
                      {item.category}
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">{item.pattern}</div>
                  <div className="text-sm mt-1">{item.vietnamese}</div>
                </div>
                
                <div className="grammar-card-actions">
                  <button
                    className="btn btn-ghost btn-sm"
                    onClick={() => handleEdit(item)}
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    className="btn btn-ghost btn-sm"
                    onClick={() => handleDelete(item.id)}
                    style={{ color: '#ef4444' }}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              
              <div className="grammar-card-content mt-4">
                <div className="grammar-card-explanation">
                  <h4 className="font-medium mb-2">Giải thích:</h4>
                  <p className="text-sm">{item.explanation}</p>
                </div>
                
                <div className="mt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen size={16} style={{ color: '#64748b' }} />
                    <h4 className="font-medium">Ví dụ ({item.examples.length}):</h4>
                  </div>
                  
                  <div className="space-y-2">
                    {item.examples.slice(0, 2).map((example, index) => (
                      <div key={index} className="p-2 bg-muted rounded">
                        <div className="text-sm font-medium">{example.japanese}</div>
                        <div className="text-sm text-muted-foreground">{example.vietnamese}</div>
                      </div>
                    ))}
                    {item.examples.length > 2 && (
                      <div className="text-sm text-muted-foreground">
                        và {item.examples.length - 2} ví dụ khác...
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredGrammar.length === 0 && (
        <div className="card p-8 text-center">
          <div className="text-4xl mb-4">📖</div>
          <h3 className="text-xl font-semibold mb-2">Không tìm thấy ngữ pháp</h3>
          <p className="text-muted-foreground mb-4">
            {searchQuery || selectedCategory !== 'all' || selectedDifficulty !== 'all'
              ? 'Thử thay đổi bộ lọc để xem thêm kết quả.'
              : 'Bắt đầu thêm ngữ pháp mới để quản lý nội dung học tập.'}
          </p>
          {!searchQuery && selectedCategory === 'all' && selectedDifficulty === 'all' && (
            <button onClick={handleAddNew} className="btn btn-primary">
              <Plus size={16} />
              Thêm ngữ pháp đầu tiên
            </button>
          )}
        </div>
      )}
      
      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="card p-4 text-center">
          <div className="text-2xl font-bold text-blue-500">{grammar.length}</div>
          <div className="text-sm text-muted-foreground">Tổng ngữ pháp</div>
        </div>
        <div className="card p-4 text-center">
          <div className="text-2xl font-bold text-green-500">{filteredGrammar.length}</div>
          <div className="text-sm text-muted-foreground">Hiển thị</div>
        </div>
        <div className="card p-4 text-center">
          <div className="text-2xl font-bold text-yellow-500">{categories.length}</div>
          <div className="text-sm text-muted-foreground">Danh mục</div>
        </div>
      </div>
    </div>
  );
};

export default GrammarManagement;