import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { 
  Send, 
  Copy, 
  RotateCcw, 
  Play, 
  Image, 
  Code, 
  Zap, 
  Settings,
  Loader2,
  CheckCircle,
  AlertCircle,
  Download,
  Share2
} from 'lucide-react';

// 類�?定義
interface AIPlaygroundProps {
  type: 'prompt-engineering' | 'image-generation' | 'code-editor';
  expectedOutput: string;
  onOutputGenerated: (output: string) => void;
}

interface PromptResult {
  id: string;
  prompt: string;
  response: string;
  timestamp: Date;
  parameters: {
    temperature: number;
    maxTokens: number;
    model: string;
  };
}

interface ImageResult {
  id: string;
  prompt: string;
  imageUrl: string;
  timestamp: Date;
  parameters: {
    width: number;
    height: number;
    steps: number;
    guidance: number;
  };
}

interface CodeResult {
  id: string;
  code: string;
  output: string;
  timestamp: Date;
  language: string;
  success: boolean;
}

export const AIPlayground: React.FC<AIPlaygroundProps> = ({ 
  type, 
  expectedOutput, 
  onOutputGenerated 
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentInput, setCurrentInput] = useState('');
  const [results, setResults] = useState<(PromptResult | ImageResult | CodeResult)[]>([]);
  
  // Prompt Engineering ?�??
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(1000);
  const [selectedModel, setSelectedModel] = useState('gpt-4');
  
  // Image Generation ?�??
  const [imageWidth, setImageWidth] = useState(512);
  const [imageHeight, setImageHeight] = useState(512);
  const [steps, setSteps] = useState(50);
  const [guidance, setGuidance] = useState(7.5);
  
  // Code Editor ?�??
  const [selectedLanguage, setSelectedLanguage] = useState('python');
  const [code, setCode] = useState('# ?�這裡寫您?�代碼\nprint("Hello, AI!")');

  // ?��??�交
  const handleSubmit = async () => {
    if (!currentInput.trim() && type !== 'code-editor') return;
    
    setIsLoading(true);
    
    try {
      let result;
      
      switch (type) {
        case 'prompt-engineering':
          result = await handlePromptSubmission();
          break;
        case 'image-generation':
          result = await handleImageGeneration();
          break;
        case 'code-editor':
          result = await handleCodeExecution();
          break;
      }
      
      if (result) {
        setResults(prev => [result, ...prev]);
        onOutputGenerated(result.response || result.output || result.imageUrl);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 模擬 Prompt Engineering API 調用
  const handlePromptSubmission = async (): Promise<PromptResult> => {
    // 模擬 API 延遲
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockResponse = `?�是對您??prompt "${currentInput}" ?��??��?
    
?��?實�?實現中�??�裡?�調?�實?��? AI API (�?OpenAI GPT-4)??
    
?�數設置�?
- Temperature: ${temperature}
- Max Tokens: ${maxTokens}
- Model: ${selectedModel}

?�個�??��??��??��??��? prompt ?��??�。`;

    return {
      id: Date.now().toString(),
      prompt: currentInput,
      response: mockResponse,
      timestamp: new Date(),
      parameters: {
        temperature,
        maxTokens,
        model: selectedModel
      }
    };
  };

  // 模擬 Image Generation API 調用
  const handleImageGeneration = async (): Promise<ImageResult> => {
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    return {
      id: Date.now().toString(),
      prompt: currentInput,
      imageUrl: `https://picsum.photos/${imageWidth}/${imageHeight}?random=${Date.now()}`,
      timestamp: new Date(),
      parameters: {
        width: imageWidth,
        height: imageHeight,
        steps,
        guidance
      }
    };
  };

  // 模擬 Code Execution
  const handleCodeExecution = async (): Promise<CodeResult> => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const mockOutput = `?��?結�?�?
    
Hello, AI!
    
�?��?��??��?�?
?��?實�?實現中�??�裡?�在安全?��??�環境中?��??��?�?��?�`;

    return {
      id: Date.now().toString(),
      code: code,
      output: mockOutput,
      timestamp: new Date(),
      language: selectedLanguage,
      success: true
    };
  };

  // 清除結�?
  const clearResults = () => {
    setResults([]);
  };

  // 複製?�剪貼板
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  // 渲�? Prompt Engineering ?�面
  const renderPromptEngineering = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="prompt">Prompt 輸入</Label>
        <Textarea
          id="prompt"
          value={currentInput}
          onChange={(e) => setCurrentInput(e.target.value)}
          placeholder="請輸?�您??prompt..."
          className="min-h-[100px] bg-gray-700 border-gray-600 text-white"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Temperature: {temperature}</Label>
          <Slider
            value={[temperature]}
            onValueChange={(value) => setTemperature(value[0])}
            max={2}
            min={0}
            step={0.1}
            className="w-full"
          />
        </div>
        
        <div className="space-y-2">
          <Label>Max Tokens: {maxTokens}</Label>
          <Slider
            value={[maxTokens]}
            onValueChange={(value) => setMaxTokens(value[0])}
            max={4000}
            min={100}
            step={100}
            className="w-full"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label>Model</Label>
        <select
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value)}
          className="w-full bg-gray-700 border-gray-600 text-white rounded-md p-2"
        >
          <option value="gpt-4">GPT-4</option>
          <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
          <option value="claude-3">Claude 3</option>
        </select>
      </div>
    </div>
  );

  // 渲�? Image Generation ?�面
  const renderImageGeneration = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="image-prompt">Image Prompt</Label>
        <Textarea
          id="image-prompt"
          value={currentInput}
          onChange={(e) => setCurrentInput(e.target.value)}
          placeholder="?�述?�想要�??��??��?..."
          className="min-h-[100px] bg-gray-700 border-gray-600 text-white"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>寬度: {imageWidth}px</Label>
          <Slider
            value={[imageWidth]}
            onValueChange={(value) => setImageWidth(value[0])}
            max={1024}
            min={256}
            step={64}
            className="w-full"
          />
        </div>
        
        <div className="space-y-2">
          <Label>高度: {imageHeight}px</Label>
          <Slider
            value={[imageHeight]}
            onValueChange={(value) => setImageHeight(value[0])}
            max={1024}
            min={256}
            step={64}
            className="w-full"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Steps: {steps}</Label>
          <Slider
            value={[steps]}
            onValueChange={(value) => setSteps(value[0])}
            max={100}
            min={10}
            step={10}
            className="w-full"
          />
        </div>
        
        <div className="space-y-2">
          <Label>Guidance: {guidance}</Label>
          <Slider
            value={[guidance]}
            onValueChange={(value) => setGuidance(value[0])}
            max={20}
            min={1}
            step={0.5}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );

  // 渲�? Code Editor ?�面
  const renderCodeEditor = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Programming Language</Label>
        <select
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className="w-full bg-gray-700 border-gray-600 text-white rounded-md p-2"
        >
          <option value="python">Python</option>
          <option value="javascript">JavaScript</option>
          <option value="typescript">TypeScript</option>
          <option value="java">Java</option>
          <option value="cpp">C++</option>
        </select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="code-editor">Code Editor</Label>
        <Textarea
          id="code-editor"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="?�這裡寫您?�代�?.."
          className="min-h-[200px] bg-gray-900 border-gray-600 text-white font-mono text-sm"
        />
      </div>
    </div>
  );

  return (
    <div className="h-full flex flex-col bg-gray-900 text-white">
      {/* ?�部?�制?� */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            {type === 'prompt-engineering' && <Zap className="w-5 h-5 text-yellow-400" />}
            {type === 'image-generation' && <Image className="w-5 h-5 text-pink-400" />}
            {type === 'code-editor' && <Code className="w-5 h-5 text-green-400" />}
            <span className="font-medium">
              {type === 'prompt-engineering' && 'Prompt Engineering'}
              {type === 'image-generation' && 'Image Generation'}
              {type === 'code-editor' && 'Code Editor'}
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={clearResults}
              disabled={results.length === 0}
            >
              <RotateCcw className="w-4 h-4 mr-1" />
              清除
            </Button>
          </div>
        </div>
        
        {/* 輸入?�面 */}
        {type === 'prompt-engineering' && renderPromptEngineering()}
        {type === 'image-generation' && renderImageGeneration()}
        {type === 'code-editor' && renderCodeEditor()}
        
        {/* ?�交?��? */}
        <Button
          onClick={handleSubmit}
          disabled={isLoading || (!currentInput.trim() && type !== 'code-editor')}
          className="w-full mt-4 bg-blue-600 hover:bg-blue-700"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              {type === 'prompt-engineering' && '生成中...'}
              {type === 'image-generation' && '生成圖片中...'}
              {type === 'code-editor' && '執行中...'}
            </>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              {type === 'prompt-engineering' && '發送'}
              {type === 'image-generation' && '生成圖片'}
              {type === 'code-editor' && '執行代碼'}
            </>
          )}
        </Button>
      </div>
      
      {/* 結�?展示?� */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="p-4 space-y-4">
            {results.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-gray-500 mb-2">
                  {type === 'prompt-engineering' && <Zap className="w-12 h-12 mx-auto mb-4 text-yellow-400" />}
                  {type === 'image-generation' && <Image className="w-12 h-12 mx-auto mb-4 text-pink-400" />}
                  {type === 'code-editor' && <Code className="w-12 h-12 mx-auto mb-4 text-green-400" />}
                </div>
                <p className="text-gray-400">
                  {type === 'prompt-engineering' && '?��?輸入?��? prompt...'}
                  {type === 'image-generation' && '?�述?�想要�??��??��?...'}
                  {type === 'code-editor' && '寫�??��?�?��並執�?..'}
                </p>
              </div>
            ) : (
              results.map((result) => (
                <Card key={result.id} className="bg-gray-800 border-gray-700">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-medium">
                        {result.timestamp.toLocaleTimeString()}
                      </CardTitle>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(
                            'response' in result ? result.response : 
                            'output' in result ? result.output : 
                            result.imageUrl
                          )}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {type === 'prompt-engineering' && 'response' in result && (
                      <div className="space-y-3">
                        <div>
                          <Label className="text-xs text-gray-400">Prompt:</Label>
                          <p className="text-sm bg-gray-700 p-2 rounded mt-1">{result.prompt}</p>
                        </div>
                        <div>
                          <Label className="text-xs text-gray-400">Response:</Label>
                          <p className="text-sm bg-gray-900 p-3 rounded mt-1 whitespace-pre-wrap">{result.response}</p>
                        </div>
                      </div>
                    )}
                    
                    {type === 'image-generation' && 'imageUrl' in result && (
                      <div className="space-y-3">
                        <div>
                          <Label className="text-xs text-gray-400">Prompt:</Label>
                          <p className="text-sm bg-gray-700 p-2 rounded mt-1">{result.prompt}</p>
                        </div>
                        <div>
                          <Label className="text-xs text-gray-400">Generated Image:</Label>
                          <img 
                            src={result.imageUrl} 
                            alt="Generated" 
                            className="mt-1 rounded-lg max-w-full h-auto"
                          />
                        </div>
                      </div>
                    )}
                    
                    {type === 'code-editor' && 'output' in result && (
                      <div className="space-y-3">
                        <div>
                          <Label className="text-xs text-gray-400">Code:</Label>
                          <pre className="text-sm bg-gray-900 p-3 rounded mt-1 overflow-x-auto">
                            <code>{result.code}</code>
                          </pre>
                        </div>
                        <div>
                          <Label className="text-xs text-gray-400">Output:</Label>
                          <pre className="text-sm bg-gray-700 p-3 rounded mt-1 whitespace-pre-wrap">
                            {result.output}
                          </pre>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default AIPlayground; 
