import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { 
  Play, 
  Copy, 
  BookOpen, 
  Clock, 
  Star, 
  Tag,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  AlertCircle,
  Lightbulb,
  Code,
  Quote
} from 'lucide-react';

interface Note {
  id: string;
  timestamp: string;
  content: string;
  codeSnippet?: string;
  type: 'concept' | 'example' | 'tip' | 'warning';
}

interface SmartNotesProps {
  notes: Note[];
  onTimestampClick: (seconds: number) => void;
}

export const SmartNotes: React.FC<SmartNotesProps> = ({ notes, onTimestampClick }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'concept' | 'example' | 'tip' | 'warning'>('all');
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');

  // ?ÇÈ??≥Ë??õÁÇ∫ÁßíÊï∏
  const timestampToSeconds = (timestamp: string): number => {
    const [minutes, seconds] = timestamp.split(':').map(Number);
    return minutes * 60 + seconds;
  };

  // ?éÊøæÁ≠ÜË?
  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.codeSnippet?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || note.type === filterType;
    return matchesSearch && matchesFilter;
  });

  // ?≤Â?È°ûÂ??ñÊ?
  const getTypeIcon = (type: Note['type']) => {
    switch (type) {
      case 'concept':
        return <BookOpen className="w-4 h-4 text-blue-400" />;
      case 'example':
        return <Code className="w-4 h-4 text-green-400" />;
      case 'tip':
        return <Lightbulb className="w-4 h-4 text-yellow-400" />;
      case 'warning':
        return <AlertCircle className="w-4 h-4 text-red-400" />;
      default:
        return <BookOpen className="w-4 h-4 text-gray-400" />;
    }
  };

  // ?≤Â?È°ûÂ?È°èËâ≤
  const getTypeColor = (type: Note['type']) => {
    switch (type) {
      case 'concept':
        return 'bg-blue-600';
      case 'example':
        return 'bg-green-600';
      case 'tip':
        return 'bg-yellow-600';
      case 'warning':
        return 'bg-red-600';
      default:
        return 'bg-gray-600';
    }
  };

  // ?≤Â?È°ûÂ?Ê®ôÁ±§
  const getTypeLabel = (type: Note['type']) => {
    switch (type) {
      case 'concept':
        return 'Ê¶ÇÂøµ';
      case 'example':
        return 'ÁØÑ‰?';
      case 'tip':
        return '?êÁ§∫';
      case 'warning':
        return 'Ë≠¶Â?';
      default:
        return 'Á≠ÜË?';
    }
  };

  // Ë§áË£Ω?ßÂÆπ
  const copyNote = (note: Note) => {
    const content = `[${note.timestamp}] ${note.content}${note.codeSnippet ? `\n\n${note.codeSnippet}` : ''}`;
    navigator.clipboard.writeText(content);
  };

  // ?ïÁ?Á∑®ËºØ
  const handleEdit = (noteId: string, content: string) => {
    setIsEditing(noteId);
    setEditContent(content);
  };

  // ‰øùÂ?Á∑®ËºØ
  const handleSaveEdit = (noteId: string) => {
    // ?®ÂØ¶?õÊ??®‰∏≠ÔºåÈÄôË£°?ÉÊõ¥?∞Á?Ë®?
    console.log('Save edit for note:', noteId, 'New content:', editContent);
    setIsEditing(null);
    setEditContent('');
  };

  // Â¶ÇÊ?Ê≤íÊ?Á≠ÜË?ÔºåÈ°ØÁ§∫Á©∫?Ä??
  if (notes.length === 0) {
    return (
      <div className="p-4 h-full flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-300 mb-2">?ÑÊ??âÁ?Ë®?/h3>
          <p className="text-sm text-gray-500">
            ?®Â≠∏ÁøíÈ?Á®ã‰∏≠ÔºåÁ≥ªÁµ±Ê??™Â??∫ÊÇ®?üÊ??∫ËÉΩÁ≠ÜË?Ôº?
            ?ÖÂê´?çË?Ê¶ÇÂøµ?Å‰ª£Á¢ºÁ?‰æãÂ?Â≠∏Á??êÁ§∫??
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* ?úÁ¥¢?åÈ?ÊøæÊéß??*/}
      <div className="p-4 border-b border-gray-700 space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="?úÁ¥¢Á≠ÜË?..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-gray-700 border-gray-600 text-white"
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <div className="flex space-x-2">
            {[
              { value: 'all', label: '?®ÈÉ®' },
              { value: 'concept', label: 'Ê¶ÇÂøµ' },
              { value: 'example', label: 'ÁØÑ‰?' },
              { value: 'tip', label: '?êÁ§∫' },
              { value: 'warning', label: 'Ë≠¶Â?' }
            ].map(({ value, label }) => (
              <Button
                key={value}
                variant={filterType === value ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterType(value as any)}
                className={`text-xs ${
                  filterType === value 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                    : 'text-gray-400 border-gray-600 hover:bg-gray-600'
                }`}
              >
                {label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Á≠ÜË??óË°® */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="p-4 space-y-4">
            {filteredNotes.length === 0 ? (
              <div className="text-center py-8">
                <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400">Ê≤íÊ??æÂà∞?∏È?Á≠ÜË?</p>
              </div>
            ) : (
              filteredNotes.map((note) => (
                <motion.div
                  key={note.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="group"
                >
                  <Card className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        {/* È°ûÂ??ñÊ? */}
                        <div className={`p-2 rounded-lg ${getTypeColor(note.type)}`}>
                          {getTypeIcon(note.type)}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          {/* ?≠ÈÉ®Ë≥áË? */}
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => onTimestampClick(timestampToSeconds(note.timestamp))}
                                className="text-blue-400 hover:text-blue-300 p-0 h-auto font-mono text-sm"
                              >
                                <Clock className="w-3 h-3 mr-1" />
                                {note.timestamp}
                              </Button>
                              <Badge variant="outline" className={`text-xs ${getTypeColor(note.type)} border-current`}>
                                {getTypeLabel(note.type)}
                              </Badge>
                            </div>
                            
                            <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => copyNote(note)}
                                className="text-gray-400 hover:text-white p-1 h-auto"
                              >
                                <Copy className="w-3 h-3" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEdit(note.id, note.content)}
                                className="text-gray-400 hover:text-white p-1 h-auto"
                              >
                                <Edit className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                          
                          {/* Á≠ÜË??ßÂÆπ */}
                          <div className="space-y-2">
                            {isEditing === note.id ? (
                              <div className="space-y-2">
                                <Input
                                  value={editContent}
                                  onChange={(e) => setEditContent(e.target.value)}
                                  className="bg-gray-700 border-gray-600 text-white"
                                />
                                <div className="flex space-x-2">
                                  <Button
                                    size="sm"
                                    onClick={() => handleSaveEdit(note.id)}
                                    className="bg-green-600 hover:bg-green-700"
                                  >
                                    <CheckCircle className="w-3 h-3 mr-1" />
                                    ‰øùÂ?
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => setIsEditing(null)}
                                    className="text-gray-400 border-gray-600"
                                  >
                                    ?ñÊ?
                                  </Button>
                                </div>
                              </div>
                            ) : (
                              <p className="text-gray-300 text-sm leading-relaxed">
                                {note.content}
                              </p>
                            )}
                            
                            {/* ‰ª?¢º?áÊÆµ */}
                            {note.codeSnippet && (
                              <div className="bg-gray-900 rounded-lg p-3 border border-gray-700">
                                <div className="flex items-center justify-between mb-2">
                                  <div className="flex items-center space-x-2">
                                    <Code className="w-3 h-3 text-green-400" />
                                    <span className="text-xs text-gray-400">‰ª?¢º?áÊÆµ</span>
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => navigator.clipboard.writeText(note.codeSnippet!)}
                                    className="text-gray-400 hover:text-white p-1 h-auto"
                                  >
                                    <Copy className="w-3 h-3" />
                                  </Button>
                                </div>
                                <pre className="text-xs text-green-400 font-mono overflow-x-auto">
                                  <code>{note.codeSnippet}</code>
                                </pre>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Â∫ïÈÉ®Áµ±Ë? */}
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center justify-between text-sm text-gray-400">
          <span>
            ??{filteredNotes.length} Ê¢ùÁ?Ë®?
            {searchTerm && ` ???úÁ¥¢: "${searchTerm}"`}
            {filterType !== 'all' && ` ??È°ûÂ?: ${getTypeLabel(filterType)}`}
          </span>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <BookOpen className="w-3 h-3 text-blue-400" />
              <span>{notes.filter(n => n.type === 'concept').length}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Code className="w-3 h-3 text-green-400" />
              <span>{notes.filter(n => n.type === 'example').length}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Lightbulb className="w-3 h-3 text-yellow-400" />
              <span>{notes.filter(n => n.type === 'tip').length}</span>
            </div>
            <div className="flex items-center space-x-1">
              <AlertCircle className="w-3 h-3 text-red-400" />
              <span>{notes.filter(n => n.type === 'warning').length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartNotes; 
