import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X, 
  BookOpen, 
  Tag, 
  Calendar,
  Search,
  Filter,
  Star,
  Lightbulb,
  Hash,
  Clock,
  StickyNote
} from 'lucide-react'

interface LearningNote {
  id: string
  title: string
  content: string
  tags: string[]
  lessonId: string
  lessonTitle: string
  createdAt: string
  updatedAt: string
  isHighlighted: boolean
  category: 'concept' | 'tip' | 'example' | 'question' | 'summary'
  userName: string  // ?��??�戶?�稱欄�?
  isPublic: boolean // ?��??��?/私人設�?
}

interface NotesFilters {
  searchTerm: string
  selectedTags: string[]
  selectedCategory: string
  sortBy: 'newest' | 'oldest' | 'alphabetical'
  userFilter: 'all' | 'mine' | 'others'  // ?��??�戶?�濾?��?
}

const useLearningNotes = () => {
  const [currentUser, setCurrentUser] = useState('wong xxx xxx')  // 模擬?��??�戶
  const [notes, setNotes] = useState<LearningNote[]>(() => {
    const saved = localStorage.getItem('learning_notes')
    return saved ? JSON.parse(saved) : [
      {
        id: '1',
        title: '?�示工�??�核心�?�?,
        content: '?�示工�??��?設�??�優?�輸?��?令�??��?，目?�是引�?AI模�??��?準確?�相?��??�用?�輸?�。�??��?素�??��?清晰?��?令、�??��?上�??�、適?��?例�??��?確�?輸出?��?要�???,
        tags: ['?��?概念', '定義', '?��?要�?'],
        lessonId: 'lesson-1',
        lessonTitle: '?�示工�??��?',
        createdAt: '2024-01-15T10:30:00Z',
        updatedAt: '2024-01-15T10:30:00Z',
        isHighlighted: true,
        category: 'concept',
        userName: 'wong xxx xxx',
        isPublic: true
      },
      {
        id: '2',
        title: '?��??�示?��?�?- wong xxx xxx note',
        content: '一?��??��??�示?�常?�含?�個主要部?��?1. ?�令（�?訴AI要�?什麼�?2. 上�??��??��??�景信息�?. 輸入?��?（具體�?資�??��?題�?4. 輸出?��?（�?義�??��??��??��?�?,
        tags: ['結�?', '組�?要�?', '?�佳實�?],
        lessonId: 'lesson-2',
        lessonTitle: '?�質?�示?��?�?,
        createdAt: '2024-01-16T14:20:00Z',
        updatedAt: '2024-01-16T14:20:00Z',
        isHighlighted: false,
        category: 'tip',
        userName: 'wong xxx xxx',
        isPublic: false
      },
      {
        id: '3',
        title: '角色?��??�示範�? - student abc note',
        content: '範�?�?你是一位�?深�??�業顧�?，�??��?位�??�業?��??��?學系學�??�寫一份�?業�?LinkedIn?��?，�?點�??�其Python?��??�學習�??��??��??�在?�創?�司?�到?��?實�?機�???',
        tags: ['角色?��?', '範�?', '實�??�用'],
        lessonId: 'lesson-2',
        lessonTitle: '?�質?�示?��?�?,
        createdAt: '2024-01-17T09:15:00Z',
        updatedAt: '2024-01-17T09:15:00Z',
        isHighlighted: false,
        category: 'example',
        userName: 'student abc',
        isPublic: true
      }
    ]
  })

  const [filters, setFilters] = useState<NotesFilters>({
    searchTerm: '',
    selectedTags: [],
    selectedCategory: 'all',
    sortBy: 'newest',
    userFilter: 'all'
  })

  useEffect(() => {
    localStorage.setItem('learning_notes', JSON.stringify(notes))
  }, [notes])

  const addNote = (noteData: Omit<LearningNote, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newNote: LearningNote = {
      ...noteData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    setNotes(prev => [newNote, ...prev])
    return newNote.id
  }

  const updateNote = (id: string, updates: Partial<LearningNote>) => {
    setNotes(prev => prev.map(note => 
      note.id === id 
        ? { ...note, ...updates, updatedAt: new Date().toISOString() }
        : note
    ))
  }

  const deleteNote = (id: string) => {
    setNotes(prev => prev.filter(note => note.id !== id))
  }

  const toggleHighlight = (id: string) => {
    updateNote(id, { isHighlighted: !notes.find(n => n.id === id)?.isHighlighted })
  }

  const getAllTags = () => {
    const tagSet = new Set<string>()
    notes.forEach(note => note.tags.forEach(tag => tagSet.add(tag)))
    return Array.from(tagSet)
  }

  const getFilteredNotes = () => {
    let filtered = notes

    // ?��??�濾
    if (filters.searchTerm) {
      filtered = filtered.filter(note => 
        note.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        note.content.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        note.tags.some(tag => tag.toLowerCase().includes(filters.searchTerm.toLowerCase()))
      )
    }

    // 標籤?�濾
    if (filters.selectedTags.length > 0) {
      filtered = filtered.filter(note => 
        filters.selectedTags.some(tag => note.tags.includes(tag))
      )
    }

    // 類別?�濾
    if (filters.selectedCategory !== 'all') {
      filtered = filtered.filter(note => note.category === filters.selectedCategory)
    }

    // ?�戶?�濾
    if (filters.userFilter !== 'all') {
      filtered = filtered.filter(note => 
        filters.userFilter === 'mine' ? note.userName === currentUser : note.userName !== currentUser
      )
    }

    // ?��?
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'newest':
          return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        case 'oldest':
          return new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
        case 'alphabetical':
          return a.title.localeCompare(b.title)
        default:
          return 0
      }
    })

    return filtered
  }

  return {
    notes,
    filters,
    setFilters,
    addNote,
    updateNote,
    deleteNote,
    toggleHighlight,
    getAllTags,
    getFilteredNotes
  }
}

const LearningNotes: React.FC = () => {
  const { language } = useLanguage()
  const {
    filters,
    setFilters,
    addNote,
    updateNote,
    deleteNote,
    toggleHighlight,
    getAllTags,
    getFilteredNotes
  } = useLearningNotes()

  const [isAddingNote, setIsAddingNote] = useState(false)
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null)
  const [newNote, setNewNote] = useState({
    title: '',
    content: '',
    tags: '',
    lessonId: 'current',
    lessonTitle: '?��?課�?',
    category: 'concept' as LearningNote['category'],
    isHighlighted: false
  })

  const isZhTW = language === 'zh-HK'
  const filteredNotes = getFilteredNotes()
  const allTags = getAllTags()

  const categoryOptions = [
    { value: 'all', label: isZhTW ? '?�部類別' : 'All Categories' },
    { value: 'concept', label: isZhTW ? '概念' : 'Concept' },
    { value: 'tip', label: isZhTW ? '?��? : 'Tip' },
    { value: 'example', label: isZhTW ? '範�?' : 'Example' },
    { value: 'question', label: isZhTW ? '?��?' : 'Question' },
    { value: 'summary', label: isZhTW ? '總�?' : 'Summary' }
  ]

  const getCategoryIcon = (category: LearningNote['category']) => {
    switch (category) {
      case 'concept': return <Lightbulb className="h-4 w-4" />
      case 'tip': return <Star className="h-4 w-4" />
      case 'example': return <BookOpen className="h-4 w-4" />
      case 'question': return <Hash className="h-4 w-4" />
      case 'summary': return <StickyNote className="h-4 w-4" />
      default: return <BookOpen className="h-4 w-4" />
    }
  }

  const getCategoryColor = (category: LearningNote['category']) => {
    switch (category) {
      case 'concept': return 'bg-blue-500/20 text-blue-400 border-blue-400'
      case 'tip': return 'bg-yellow-500/20 text-yellow-400 border-yellow-400'
      case 'example': return 'bg-green-500/20 text-green-400 border-green-400'
      case 'question': return 'bg-purple-500/20 text-purple-400 border-purple-400'
      case 'summary': return 'bg-orange-500/20 text-orange-400 border-orange-400'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-400'
    }
  }

  const handleSaveNote = () => {
    if (newNote.title.trim() && newNote.content.trim()) {
      addNote({
        ...newNote,
        tags: newNote.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      })
      setNewNote({
        title: '',
        content: '',
        tags: '',
        lessonId: 'current',
        lessonTitle: '?��?課�?',
        category: 'concept',
        isHighlighted: false
      })
      setIsAddingNote(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return isZhTW ? 
      date.toLocaleDateString('zh-HK', { year: 'numeric', month: 'short', day: 'numeric' }) :
      date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
  }

  return (
    <div className="space-y-6">
      {/* 標�??�新增�???*/}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white flex items-center">
          <BookOpen className="h-6 w-6 mr-3 text-blue-400" />
          {isZhTW ? '學�?筆�?' : 'Learning Notes'}
        </h2>
        <Button
          onClick={() => setIsAddingNote(true)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          {isZhTW ? '?��?筆�?' : 'Add Note'}
        </Button>
      </div>

      {/* ?��??�篩??*/}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* ?��? */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder={isZhTW ? '?��?筆�?...' : 'Search notes...'}
                value={filters.searchTerm}
                onChange={(e) => setFilters(prev => ({ ...prev, searchTerm: e.target.value }))}
                className="pl-10 bg-gray-700 border-gray-600 text-white"
              />
            </div>

            {/* 類別篩選 */}
            <select
              value={filters.selectedCategory}
              onChange={(e) => setFilters(prev => ({ ...prev, selectedCategory: e.target.value }))}
              className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
            >
              {categoryOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            {/* ?��? */}
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as NotesFilters['sortBy'] }))}
              className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
            >
              <option value="newest">{isZhTW ? '?�?�優?? : 'Newest First'}</option>
              <option value="oldest">{isZhTW ? '?�?�優?? : 'Oldest First'}</option>
              <option value="alphabetical">{isZhTW ? '?��?母�?�? : 'Alphabetical'}</option>
            </select>

            {/* ?�戶篩選 */}
            <select
              value={filters.userFilter}
              onChange={(e) => setFilters(prev => ({ ...prev, userFilter: e.target.value as NotesFilters['userFilter'] }))}
              className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
            >
              <option value="all">{isZhTW ? '?�部?�戶' : 'All Users'}</option>
              <option value="mine">{isZhTW ? '?��?筆�?' : 'My Notes'}</option>
              <option value="others">{isZhTW ? '他人筆�?' : 'Other Users\' Notes'}</option>
            </select>

            {/* 標籤篩選 */}
            <div className="flex flex-wrap gap-2">
              {allTags.slice(0, 3).map(tag => (
                <Button
                  key={tag}
                  variant={filters.selectedTags.includes(tag) ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    setFilters(prev => ({
                      ...prev,
                      selectedTags: prev.selectedTags.includes(tag)
                        ? prev.selectedTags.filter(t => t !== tag)
                        : [...prev.selectedTags, tag]
                    }))
                  }}
                  className="text-xs"
                >
                  <Tag className="h-3 w-3 mr-1" />
                  {tag}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ?��?筆�?表單 */}
      <AnimatePresence>
        {isAddingNote && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  {isZhTW ? '?��?學�?筆�?' : 'Add Learning Note'}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsAddingNote(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  placeholder={isZhTW ? '筆�?標�?' : 'Note title'}
                  value={newNote.title}
                  onChange={(e) => setNewNote(prev => ({ ...prev, title: e.target.value }))}
                  className="bg-gray-700 border-gray-600 text-white"
                />
                
                <Textarea
                  placeholder={isZhTW ? '筆�??�容...' : 'Note content...'}
                  value={newNote.content}
                  onChange={(e) => setNewNote(prev => ({ ...prev, content: e.target.value }))}
                  className="bg-gray-700 border-gray-600 text-white min-h-[120px]"
                />
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input
                    placeholder={isZhTW ? '標籤 (?�逗�??��?)' : 'Tags (comma separated)'}
                    value={newNote.tags}
                    onChange={(e) => setNewNote(prev => ({ ...prev, tags: e.target.value }))}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                  
                  <select
                    value={newNote.category}
                    onChange={(e) => setNewNote(prev => ({ ...prev, category: e.target.value as LearningNote['category'] }))}
                    className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                  >
                    {categoryOptions.slice(1).map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="highlight"
                      checked={newNote.isHighlighted}
                      onChange={(e) => setNewNote(prev => ({ ...prev, isHighlighted: e.target.checked }))}
                      className="rounded border-gray-600"
                    />
                    <label htmlFor="highlight" className="text-white text-sm">
                      {isZhTW ? '標�??��?�? : 'Mark as highlighted'}
                    </label>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3">
                  <Button
                    variant="outline"
                    onClick={() => setIsAddingNote(false)}
                  >
                    {isZhTW ? '?��?' : 'Cancel'}
                  </Button>
                  <Button
                    onClick={handleSaveNote}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {isZhTW ? '?��?' : 'Save'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 筆�??�表 */}
      <div className="space-y-4">
        {filteredNotes.length === 0 ? (
          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-8 text-center">
              <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400">
                {isZhTW ? '尚無學�?筆�?' : 'No learning notes yet'}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredNotes.map((note) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className={`bg-gray-800/50 border-gray-700 hover:border-gray-600 transition-colors ${
                note.isHighlighted ? 'border-yellow-500/50 bg-yellow-900/10' : ''
              }`}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-white">
                          {note.title}
                        </h3>
                        {note.isHighlighted && (
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        )}
                        <Badge variant="outline" className={getCategoryColor(note.category)}>
                          <span className="flex items-center">
                            {getCategoryIcon(note.category)}
                            <span className="ml-1">
                              {categoryOptions.find(c => c.value === note.category)?.label}
                            </span>
                          </span>
                        </Badge>
                      </div>
                      
                      <p className="text-gray-300 mb-4 leading-relaxed">
                        {note.content}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        {note.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            <Tag className="h-3 w-3 mr-1" />
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {formatDate(note.updatedAt)}
                        </span>
                        <span className="flex items-center">
                          <BookOpen className="h-4 w-4 mr-1" />
                          {note.lessonTitle}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleHighlight(note.id)}
                        className={note.isHighlighted ? 'text-yellow-400' : 'text-gray-400'}
                      >
                        <Star className={`h-4 w-4 ${note.isHighlighted ? 'fill-current' : ''}`} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditingNoteId(note.id)}
                        className="text-gray-400 hover:text-white"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteNote(note.id)}
                        className="text-gray-400 hover:text-red-400"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        )}
      </div>
    </div>
  )
}

export default LearningNotes 