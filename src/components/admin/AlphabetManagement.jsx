import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  Filter,
  Download,
  Upload
} from 'lucide-react';

const AlphabetManagement = () => {
  const { user, isAdmin } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [selectedItems, setSelectedItems] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  
  // Debug logging
  console.log('AlphabetManagement - User state:', { user, isAdmin });

  // Mock data - in a real app, this would come from an API
  const [alphabetData, setAlphabetData] = useState([
    {
      id: '1',
      character: 'あ',
      romanji: 'a',
      pronunciation: '/a/',
      type: 'hiragana',
      category: 'vowels',
      examples: ['愛 (ai - love)', 'あさ (asa - morning)'],
      created: '2024-01-15',
      updated: '2024-01-15'
    },
    {
      id: '2',
      character: 'か',
      romanji: 'ka',
      pronunciation: '/ka/',
      type: 'hiragana',
      category: 'k-sounds',
      examples: ['かぞく (kazoku - family)', 'かわ (kawa - river)'],
      created: '2024-01-15',
      updated: '2024-01-15'
    },
    {
      id: '3',
      character: 'ア',
      romanji: 'a',
      pronunciation: '/a/',
      type: 'katakana',
      category: 'vowels',
      examples: ['アメリカ (Amerika - America)', 'アイス (aisu - ice)'],
      created: '2024-01-15',
      updated: '2024-01-15'
    },
    {
      id: '4',
      character: 'カ',
      romanji: 'ka',
      pronunciation: '/ka/',
      type: 'katakana',
      category: 'k-sounds',
      examples: ['カメラ (kamera - camera)', 'カフェ (kafe - cafe)'],
      created: '2024-01-15',
      updated: '2024-01-15'
    }
  ]);

  const filteredData = alphabetData.filter(item => {
    const matchesSearch = item.character.includes(searchTerm) || 
                         item.romanji.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.pronunciation.includes(searchTerm);
    const matchesFilter = filterType === 'all' || item.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const handleDelete = (id) => {
    if (confirm('Bạn có chắc chắn muốn xóa ký tự này?')) {
      setAlphabetData(prev => prev.filter(item => item.id !== id));
    }
  };

  const handleBulkDelete = () => {
    if (confirm(`Bạn có chắc chắn muốn xóa ${selectedItems.length} ký tự đã chọn?`)) {
      setAlphabetData(prev => prev.filter(item => !selectedItems.includes(item.id)));
      setSelectedItems([]);
    }
  };

  const toggleSelectItem = (id) => {
    setSelectedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    setSelectedItems(
      selectedItems.length === filteredData.length 
        ? [] 
        : filteredData.map(item => item.id)
    );
  };

  return (
    <div className="space-y-6">
      {/* Debug Info */}
      <div className="card border-yellow-200 bg-yellow-50">
        <div className="p-4">
          <h3 className="font-semibold text-yellow-800 mb-2">Debug Info:</h3>
          <p className="text-sm text-yellow-700">
            User: {user?.username || 'None'} | 
            Admin: {isAdmin ? 'Yes' : 'No'} | 
            Role: {user?.role || 'None'}
          </p>
        </div>
      </div>
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Quản lý bảng chữ cái</h1>
          <p className="text-muted-foreground mt-2">
            Quản lý Hiragana và Katakana
          </p>
        </div>
        <div className="flex space-x-2 mt-4 sm:mt-0">
          <button className="btn btn-outline btn-sm">
            <Upload className="w-4 h-4 mr-2" />
            Import
          </button>
          <button className="btn btn-outline btn-sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
          <button className="btn btn-sm" onClick={() => setShowAddModal(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Thêm ký tự
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="card">
        <div className="p-4">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <input
                type="text"
                placeholder="Tìm kiếm ký tự, romanji..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-input rounded-md bg-background text-foreground input"
              />
            </div>

            {/* Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-2 border border-input rounded-md bg-background text-foreground"
              >
                <option value="all">Tất cả</option>
                <option value="hiragana">Hiragana</option>
                <option value="katakana">Katakana</option>
              </select>
            </div>

            {/* Bulk actions */}
            {selectedItems.length > 0 && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">
                  Đã chọn {selectedItems.length}
                </span>
                <button className="btn btn-destructive btn-sm" onClick={handleBulkDelete}>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Xóa đã chọn
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="card">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">
            Danh sách ký tự ({filteredData.length})
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">
                    <input
                      type="checkbox"
                      checked={selectedItems.length === filteredData.length && filteredData.length > 0}
                      onChange={toggleSelectAll}
                      className="rounded"
                    />
                  </th>
                  <th className="text-left p-2 font-medium">Ký tự</th>
                  <th className="text-left p-2 font-medium">Romanji</th>
                  <th className="text-left p-2 font-medium">Phát âm</th>
                  <th className="text-left p-2 font-medium">Loại</th>
                  <th className="text-left p-2 font-medium">Danh mục</th>
                  <th className="text-left p-2 font-medium">Ví dụ</th>
                  <th className="text-left p-2 font-medium">Cập nhật</th>
                  <th className="text-left p-2 font-medium">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-muted/50">
                    <td className="p-2">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(item.id)}
                        onChange={() => toggleSelectItem(item.id)}
                        className="rounded"
                      />
                    </td>
                    <td className="p-2">
                      <div className="text-2xl font-bold text-primary">
                        {item.character}
                      </div>
                    </td>
                    <td className="p-2 font-medium">{item.romanji}</td>
                    <td className="p-2 text-muted-foreground">{item.pronunciation}</td>
                    <td className="p-2">
                      <span 
                        className={`badge ${
                          item.type === 'hiragana' ? 'badge-default' : 'badge-secondary'
                        } ${item.type === 'hiragana' ? 'text-hiragana' : 'text-katakana'}`}
                      >
                        {item.type}
                      </span>
                    </td>
                    <td className="p-2 text-sm text-muted-foreground">{item.category}</td>
                    <td className="p-2">
                      <div className="max-w-xs">
                        <div className="text-sm text-muted-foreground truncate">
                          {item.examples.join(', ')}
                        </div>
                      </div>
                    </td>
                    <td className="p-2 text-sm text-muted-foreground">{item.updated}</td>
                    <td className="p-2">
                      <div className="flex space-x-2">
                        <button className="btn btn-ghost btn-icon btn-sm">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button 
                          className="btn btn-ghost btn-icon btn-sm"
                          onClick={() => console.log('Edit:', item)}
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          className="btn btn-ghost btn-icon btn-sm"
                          onClick={() => handleDelete(item.id)}
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {filteredData.length === 0 && (
              <div className="text-center py-8">
                <div className="text-muted-foreground">
                  Không tìm thấy ký tự nào
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add/Edit Modal would go here */}
      {showAddModal && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="card w-full max-w-md mx-4">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Thêm ký tự mới</h3>
              <div className="space-y-4">
                <div>
                  <label className="label">Ký tự</label>
                  <input 
                    type="text" 
                    className="w-full p-2 border rounded-md bg-background input"
                    placeholder="あ"
                  />
                </div>
                <div>
                  <label className="label">Romanji</label>
                  <input 
                    type="text" 
                    className="w-full p-2 border rounded-md bg-background input"
                    placeholder="a"
                  />
                </div>
                <div>
                  <label className="label">Phát âm</label>
                  <input 
                    type="text" 
                    className="w-full p-2 border rounded-md bg-background input"
                    placeholder="/a/"
                  />
                </div>
                <div>
                  <label className="label">Loại</label>
                  <select className="w-full p-2 border rounded-md bg-background">
                    <option value="hiragana">Hiragana</option>
                    <option value="katakana">Katakana</option>
                  </select>
                </div>
                <div className="flex space-x-2">
                  <button className="btn flex-1">Lưu</button>
                  <button 
                    className="btn btn-outline flex-1"
                    onClick={() => setShowAddModal(false)}
                  >
                    Hủy
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlphabetManagement;