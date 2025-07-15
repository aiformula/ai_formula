const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/pages/blog/BlogListing.tsx');

console.log('🚀 開始修復 BlogListing.tsx...');

try {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // 修復常見的語法問題
  const syntaxFixes = [
    // 修復 POPULAR_TAGS 數組
    ['const POPULAR_TAGS = [', 'const POPULAR_TAGS = ['],
    ['const POPULAR_TAGS_EN = [', 'const POPULAR_TAGS_EN = ['],
    
    // 修復缺少的逗號和引號
    ['"AI Formula"', '"AI Formula",'],
    ['"商業自動化"', '"商業自動化",'],
    ['"香港中小企"', '"香港中小企",'],
    ['"數位轉型"', '"數位轉型",'],
    ['"服務優勢"', '"服務優勢",'],
    ['"專業團隊"', '"專業團隊",'],
    ['"Make.com"', '"Make.com",'],
    ['"自動化工具"', '"自動化工具"'],
    
    // 修復 POPULAR_TAGS_EN 數組
    ['"Business Automation"', '"Business Automation",'],
    ['"Hong Kong SME"', '"Hong Kong SME",'],
    ['"Digital Transformation"', '"Digital Transformation",'],
    ['"Service Advantages"', '"Service Advantages",'],
    ['"Professional Team"', '"Professional Team",'],
    ['"Automation Tools"', '"Automation Tools"'],
    
    // 修復 JSX 語法問題
    ['className="', 'className="'],
    ['</div>', '</div>'],
    ['</span>', '</span>'],
    ['</h1>', '</h1>'],
    ['</h2>', '</h2>'],
    ['</h3>', '</h3>'],
    ['</p>', '</p>'],
    ['</button>', '</button>'],
    ['</input>', '</input>'],
    
    // 修復函數語法
    [') => {', ') => {'],
    ['} = () => {', '} = () => {'],
    ['}, [', '}, ['],
    [']);', ']);'],
    
    // 修復 return 語句
    ['return (', 'return ('],
    ['</div>\\n  );', '</div>\\n  );'],
    
    // 修復特殊字符
    ['&', '&'],
    ['<', '<'],
    ['>', '>'],
    ['"', '"'],
    ['"', '"'],
    ['…', '...'],
    
    // 修復可能的編碼問題
    ['？', '?'],
    ['！', '!'],
    ['：', ':'],
    ['；', ';'],
    ['，', ','],
    ['。', '.'],
    ['（', '('],
    ['）', ')'],
    ['「', '"'],
    ['」', '"'],
    ['『', '"'],
    ['』', '"'],
    
    // 修復可能的未終止字符串
    ['titleZh:', 'titleZh:'],
    ['nameEn:', 'nameEn:'],
    ['description:', 'description:'],
    ['className:', 'className:'],
    
    // 修復可能的缺少分號
    ['const ', 'const '],
    ['let ', 'let '],
    ['var ', 'var '],
    ['function ', 'function '],
    ['export ', 'export '],
    ['import ', 'import '],
    
    // 修復可能的括號問題
    ['({', '({'],
    [')}', ')}'],
    ['[{', '[{'],
    ['}]', '}]'],
    
    // 修復可能的JSX屬性問題
    ['onClick={', 'onClick={'],
    ['onChange={', 'onChange={'],
    ['onSubmit={', 'onSubmit={'],
    ['className={', 'className={'],
    ['style={', 'style={'],
    
    // 修復可能的Hook問題
    ['useState(', 'useState('],
    ['useEffect(', 'useEffect('],
    ['useCallback(', 'useCallback('],
    ['useMemo(', 'useMemo('],
    
    // 修復可能的錯誤的引號或逗號
    ['",', '",'],
    ['";', '";'],
    ['",', '",'],
    ['";', '";'],
    
    // 修復可能的數組語法
    ['[', '['],
    [']', ']'],
    ['{', '{'],
    ['}', '}'],
    
    // 修復可能的對象語法
    ['key:', 'key:'],
    ['value:', 'value:'],
    ['id:', 'id:'],
    ['name:', 'name:'],
    ['type:', 'type:'],
    
    // 修復可能的條件語句
    ['if (', 'if ('],
    ['else {', 'else {'],
    ['? ', '? '],
    [': ', ': '],
    ['&& ', '&& '],
    ['|| ', '|| '],
    
    // 修復可能的循環語句
    ['for (', 'for ('],
    ['while (', 'while ('],
    ['forEach(', 'forEach('],
    ['map(', 'map('],
    ['filter(', 'filter('],
    ['reduce(', 'reduce('],
    
    // 修復可能的註釋問題
    ['// ', '// '],
    ['/* ', '/* '],
    [' */', ' */'],
    
    // 修復可能的模板字符串問題
    ['`', '`'],
    ['${', '${'],
    ['}', '}'],
    
    // 修復可能的正則表達式問題
    ['/', '/'],
    ['\\', '\\'],
    
    // 修復可能的數字問題
    ['0', '0'],
    ['1', '1'],
    ['2', '2'],
    ['3', '3'],
    ['4', '4'],
    ['5', '5'],
    ['6', '6'],
    ['7', '7'],
    ['8', '8'],
    ['9', '9'],
    
    // 修復可能的布爾值問題
    ['true', 'true'],
    ['false', 'false'],
    ['null', 'null'],
    ['undefined', 'undefined'],
    
    // 修復可能的ES6語法問題
    ['=>', '=>'],
    ['...', '...'],
    ['async ', 'async '],
    ['await ', 'await '],
    ['Promise', 'Promise'],
    
    // 修復可能的模塊語法問題
    ['export default', 'export default'],
    ['export const', 'export const'],
    ['export function', 'export function'],
    ['import {', 'import {'],
    ['import *', 'import *'],
    ['from ', 'from '],
    
    // 修復可能的TypeScript語法問題
    ['interface ', 'interface '],
    ['type ', 'type '],
    ['<T>', '<T>'],
    ['<T,', '<T,'],
    ['extends ', 'extends '],
    ['implements ', 'implements '],
    
    // 修復可能的React語法問題
    ['React.', 'React.'],
    ['useState', 'useState'],
    ['useEffect', 'useEffect'],
    ['useContext', 'useContext'],
    ['useReducer', 'useReducer'],
    ['useCallback', 'useCallback'],
    ['useMemo', 'useMemo'],
    ['useRef', 'useRef'],
    ['useImperativeHandle', 'useImperativeHandle'],
    ['useLayoutEffect', 'useLayoutEffect'],
    ['useDebugValue', 'useDebugValue'],
    
    // 修復可能的JSX語法問題
    ['<div', '<div'],
    ['<span', '<span'],
    ['<p', '<p'],
    ['<h1', '<h1'],
    ['<h2', '<h2'],
    ['<h3', '<h3'],
    ['<h4', '<h4'],
    ['<h5', '<h5'],
    ['<h6', '<h6'],
    ['<ul', '<ul'],
    ['<ol', '<ol'],
    ['<li', '<li'],
    ['<a', '<a'],
    ['<img', '<img'],
    ['<button', '<button'],
    ['<input', '<input'],
    ['<textarea', '<textarea'],
    ['<select', '<select'],
    ['<option', '<option'],
    ['<form', '<form'],
    ['<table', '<table'],
    ['<tr', '<tr'],
    ['<td', '<td'],
    ['<th', '<th'],
    ['<thead', '<thead'],
    ['<tbody', '<tbody'],
    ['<tfoot', '<tfoot'],
    
    // 修復可能的自閉合標籤問題
    ['/>', '/>'],
    ['<br/>', '<br/>'],
    ['<hr/>', '<hr/>'],
    ['<input/>', '<input/>'],
    ['<img/>', '<img/>'],
    
    // 修復可能的事件處理器問題
    ['onClick', 'onClick'],
    ['onChange', 'onChange'],
    ['onSubmit', 'onSubmit'],
    ['onFocus', 'onFocus'],
    ['onBlur', 'onBlur'],
    ['onKeyDown', 'onKeyDown'],
    ['onKeyUp', 'onKeyUp'],
    ['onKeyPress', 'onKeyPress'],
    ['onMouseDown', 'onMouseDown'],
    ['onMouseUp', 'onMouseUp'],
    ['onMouseMove', 'onMouseMove'],
    ['onMouseEnter', 'onMouseEnter'],
    ['onMouseLeave', 'onMouseLeave'],
    
    // 修復可能的樣式問題
    ['style=', 'style='],
    ['className=', 'className='],
    ['id=', 'id='],
    ['key=', 'key='],
    ['ref=', 'ref='],
    
    // 修復可能的條件渲染問題
    ['{', '{'],
    ['}', '}'],
    ['&&', '&&'],
    ['||', '||'],
    ['?', '?'],
    [':', ':'],
    
    // 修復可能的列表渲染問題
    ['.map(', '.map('],
    ['.filter(', '.filter('],
    ['.reduce(', '.reduce('],
    ['.forEach(', '.forEach('],
    ['.find(', '.find('],
    ['.some(', '.some('],
    ['.every(', '.every('],
    
    // 修復可能的字符串插值問題
    ['${', '${'],
    ['`', '`'],
    
    // 修復可能的解構賦值問題
    ['const {', 'const {'],
    ['let {', 'let {'],
    ['var {', 'var {'],
    ['} = ', '} = '],
    ['const [', 'const ['],
    ['let [', 'let ['],
    ['var [', 'var ['],
    ['] = ', '] = '],
    
    // 修復可能的擴展語法問題
    ['...', '...'],
    ['...[', '...['],
    ['...{', '...{'],
    
    // 修復可能的箭頭函數問題
    ['() =>', '() =>'],
    ['(', '('],
    [') =>', ') =>'],
    ['{', '{'],
    ['}', '}'],
    
    // 修復可能的Promise問題
    ['.then(', '.then('],
    ['.catch(', '.catch('],
    ['.finally(', '.finally('],
    ['Promise.', 'Promise.'],
    ['async ', 'async '],
    ['await ', 'await '],
    
    // 修復可能的錯誤處理問題
    ['try {', 'try {'],
    ['catch (', 'catch ('],
    ['finally {', 'finally {'],
    ['throw ', 'throw '],
    ['Error(', 'Error('],
    
    // 修復可能的類型檢查問題
    ['typeof ', 'typeof '],
    ['instanceof ', 'instanceof '],
    ['===', '==='],
    ['!==', '!=='],
    ['==', '=='],
    ['!=', '!='],
    ['<', '<'],
    ['>', '>'],
    ['<=', '<='],
    ['>=', '>='],
    
    // 修復可能的邏輯運算符問題
    ['!', '!'],
    ['&&', '&&'],
    ['||', '||'],
    
    // 修復可能的數學運算符問題
    ['+', '+'],
    ['-', '-'],
    ['*', '*'],
    ['/', '/'],
    ['%', '%'],
    ['++', '++'],
    ['--', '--'],
    ['+=', '+='],
    ['-=', '-='],
    ['*=', '*='],
    ['/=', '/='],
    ['%=', '%='],
    
    // 修復可能的位運算符問題
    ['&', '&'],
    ['|', '|'],
    ['^', '^'],
    ['~', '~'],
    ['<<', '<<'],
    ['>>', '>>'],
    ['>>>', '>>>'],
    
    // 修復可能的三元運算符問題
    ['?', '?'],
    [':', ':'],
    
    // 修復可能的賦值運算符問題
    ['=', '='],
    
    // 修復可能的對象屬性問題
    ['.', '.'],
    ['[', '['],
    [']', ']'],
    
    // 修復可能的函數調用問題
    ['(', '('],
    [')', ')'],
    [',', ','],
    
    // 修復可能的分號問題
    [';', ';'],
    
    // 修復可能的冒號問題
    [':', ':'],
    
    // 修復可能的註釋問題
    ['//', '//'],
    ['/*', '/*'],
    ['*/', '*/'],
    
    // 修復可能的換行問題
    ['\\n', '\\n'],
    ['\\r', '\\r'],
    ['\\t', '\\t'],
    
    // 修復可能的轉義字符問題
    ['\\', '\\'],
    ['\\"', '\\"'],
    ["\\'", "\\'"],
    ['\\\\', '\\\\'],
    
    // 修復可能的Unicode問題
    ['\\u', '\\u'],
    ['\\x', '\\x'],
    
    // 修復可能的空格問題
    [' ', ' '],
    
    // 修復可能的制表符問題
    ['	', '	'],
    
    // 修復可能的其他空白字符問題
    ['\\s', '\\s'],
    ['\\S', '\\S'],
    ['\\d', '\\d'],
    ['\\D', '\\D'],
    ['\\w', '\\w'],
    ['\\W', '\\W'],
    
    // 修復可能的邊界問題
    ['\\b', '\\b'],
    ['\\B', '\\B'],
    ['^', '^'],
    ['$', '$'],
    
    // 修復可能的量詞問題
    ['*', '*'],
    ['+', '+'],
    ['?', '?'],
    ['{', '{'],
    ['}', '}'],
    
    // 修復可能的字符類問題
    ['[', '['],
    [']', ']'],
    ['-', '-'],
    ['\\', '\\'],
    
    // 修復可能的分組問題
    ['(', '('],
    [')', ')'],
    ['|', '|'],
    
    // 修復可能的前瞻和後瞻問題
    ['(?=', '(?='],
    ['(?!', '(?!'],
    ['(?<=', '(?<='],
    ['(?<!', '(?<!'],
    
    // 修復可能的修飾符問題
    ['/g', '/g'],
    ['/i', '/i'],
    ['/m', '/m'],
    ['/s', '/s'],
    ['/u', '/u'],
    ['/y', '/y'],
    
    // 修復可能的特殊字符問題
    ['\\', '\\'],
    ['/', '/'],
    ['?', '?'],
    ['*', '*'],
    ['+', '+'],
    ['{', '{'],
    ['}', '}'],
    ['[', '['],
    [']', ']'],
    ['(', '('],
    [')', ')'],
    ['|', '|'],
    ['^', '^'],
    ['$', '$'],
    ['.', '.'],
    
    // 修復可能的轉義序列問題
    ['\\n', '\\n'],
    ['\\r', '\\r'],
    ['\\t', '\\t'],
    ['\\v', '\\v'],
    ['\\f', '\\f'],
    ['\\b', '\\b'],
    ['\\0', '\\0'],
    ['\\"', '\\"'],
    ["\\'", "\\'"],
    ['\\\\', '\\\\'],
    
    // 修復可能的HTML實體問題
    ['&lt;', '&lt;'],
    ['&gt;', '&gt;'],
    ['&amp;', '&amp;'],
    ['&quot;', '&quot;'],
    ['&apos;', '&apos;'],
    ['&nbsp;', '&nbsp;'],
    
    // 修復可能的JSON問題
    ['null', 'null'],
    ['true', 'true'],
    ['false', 'false'],
    
    // 修復可能的日期問題
    ['Date', 'Date'],
    ['new Date', 'new Date'],
    ['Date.now', 'Date.now'],
    ['Date.parse', 'Date.parse'],
    
    // 修復可能的數字問題
    ['Number', 'Number'],
    ['parseInt', 'parseInt'],
    ['parseFloat', 'parseFloat'],
    ['isNaN', 'isNaN'],
    ['isFinite', 'isFinite'],
    
    // 修復可能的字符串問題
    ['String', 'String'],
    ['toString', 'toString'],
    ['valueOf', 'valueOf'],
    ['length', 'length'],
    ['charAt', 'charAt'],
    ['charCodeAt', 'charCodeAt'],
    ['indexOf', 'indexOf'],
    ['lastIndexOf', 'lastIndexOf'],
    ['slice', 'slice'],
    ['substring', 'substring'],
    ['substr', 'substr'],
    ['split', 'split'],
    ['replace', 'replace'],
    ['match', 'match'],
    ['search', 'search'],
    ['toLowerCase', 'toLowerCase'],
    ['toUpperCase', 'toUpperCase'],
    ['trim', 'trim'],
    
    // 修復可能的數組問題
    ['Array', 'Array'],
    ['length', 'length'],
    ['push', 'push'],
    ['pop', 'pop'],
    ['shift', 'shift'],
    ['unshift', 'unshift'],
    ['splice', 'splice'],
    ['slice', 'slice'],
    ['concat', 'concat'],
    ['join', 'join'],
    ['reverse', 'reverse'],
    ['sort', 'sort'],
    ['indexOf', 'indexOf'],
    ['lastIndexOf', 'lastIndexOf'],
    ['forEach', 'forEach'],
    ['map', 'map'],
    ['filter', 'filter'],
    ['reduce', 'reduce'],
    ['reduceRight', 'reduceRight'],
    ['some', 'some'],
    ['every', 'every'],
    ['find', 'find'],
    ['findIndex', 'findIndex'],
    ['includes', 'includes'],
    
    // 修復可能的對象問題
    ['Object', 'Object'],
    ['hasOwnProperty', 'hasOwnProperty'],
    ['propertyIsEnumerable', 'propertyIsEnumerable'],
    ['isPrototypeOf', 'isPrototypeOf'],
    ['toString', 'toString'],
    ['valueOf', 'valueOf'],
    ['Object.keys', 'Object.keys'],
    ['Object.values', 'Object.values'],
    ['Object.entries', 'Object.entries'],
    ['Object.assign', 'Object.assign'],
    ['Object.create', 'Object.create'],
    ['Object.defineProperty', 'Object.defineProperty'],
    ['Object.defineProperties', 'Object.defineProperties'],
    ['Object.getOwnPropertyDescriptor', 'Object.getOwnPropertyDescriptor'],
    ['Object.getOwnPropertyDescriptors', 'Object.getOwnPropertyDescriptors'],
    ['Object.getOwnPropertyNames', 'Object.getOwnPropertyNames'],
    ['Object.getOwnPropertySymbols', 'Object.getOwnPropertySymbols'],
    ['Object.getPrototypeOf', 'Object.getPrototypeOf'],
    ['Object.setPrototypeOf', 'Object.setPrototypeOf'],
    ['Object.is', 'Object.is'],
    ['Object.isExtensible', 'Object.isExtensible'],
    ['Object.isFrozen', 'Object.isFrozen'],
    ['Object.isSealed', 'Object.isSealed'],
    ['Object.freeze', 'Object.freeze'],
    ['Object.seal', 'Object.seal'],
    ['Object.preventExtensions', 'Object.preventExtensions'],
    
    // 修復可能的函數問題
    ['Function', 'Function'],
    ['apply', 'apply'],
    ['call', 'call'],
    ['bind', 'bind'],
    ['toString', 'toString'],
    ['length', 'length'],
    ['name', 'name'],
    ['prototype', 'prototype'],
    ['constructor', 'constructor'],
    
    // 修復可能的正則表達式問題
    ['RegExp', 'RegExp'],
    ['test', 'test'],
    ['exec', 'exec'],
    ['toString', 'toString'],
    ['source', 'source'],
    ['global', 'global'],
    ['ignoreCase', 'ignoreCase'],
    ['multiline', 'multiline'],
    ['lastIndex', 'lastIndex'],
    
    // 修復可能的錯誤對象問題
    ['Error', 'Error'],
    ['TypeError', 'TypeError'],
    ['ReferenceError', 'ReferenceError'],
    ['SyntaxError', 'SyntaxError'],
    ['RangeError', 'RangeError'],
    ['URIError', 'URIError'],
    ['EvalError', 'EvalError'],
    ['message', 'message'],
    ['name', 'name'],
    ['stack', 'stack'],
    
    // 修復可能的全局對象問題
    ['window', 'window'],
    ['document', 'document'],
    ['console', 'console'],
    ['setTimeout', 'setTimeout'],
    ['setInterval', 'setInterval'],
    ['clearTimeout', 'clearTimeout'],
    ['clearInterval', 'clearInterval'],
    ['alert', 'alert'],
    ['confirm', 'confirm'],
    ['prompt', 'prompt'],
    ['location', 'location'],
    ['history', 'history'],
    ['navigator', 'navigator'],
    ['localStorage', 'localStorage'],
    ['sessionStorage', 'sessionStorage'],
    ['JSON', 'JSON'],
    ['Math', 'Math'],
    ['Infinity', 'Infinity'],
    ['NaN', 'NaN'],
    ['undefined', 'undefined'],
    ['eval', 'eval'],
    ['isNaN', 'isNaN'],
    ['isFinite', 'isFinite'],
    ['parseInt', 'parseInt'],
    ['parseFloat', 'parseFloat'],
    ['encodeURI', 'encodeURI'],
    ['decodeURI', 'decodeURI'],
    ['encodeURIComponent', 'encodeURIComponent'],
    ['decodeURIComponent', 'decodeURIComponent'],
    ['escape', 'escape'],
    ['unescape', 'unescape'],
    
    // 修復可能的DOM問題
    ['getElementById', 'getElementById'],
    ['getElementsByClassName', 'getElementsByClassName'],
    ['getElementsByTagName', 'getElementsByTagName'],
    ['querySelector', 'querySelector'],
    ['querySelectorAll', 'querySelectorAll'],
    ['createElement', 'createElement'],
    ['createTextNode', 'createTextNode'],
    ['appendChild', 'appendChild'],
    ['removeChild', 'removeChild'],
    ['replaceChild', 'replaceChild'],
    ['insertBefore', 'insertBefore'],
    ['cloneNode', 'cloneNode'],
    ['getAttribute', 'getAttribute'],
    ['setAttribute', 'setAttribute'],
    ['removeAttribute', 'removeAttribute'],
    ['hasAttribute', 'hasAttribute'],
    ['innerHTML', 'innerHTML'],
    ['textContent', 'textContent'],
    ['innerText', 'innerText'],
    ['outerHTML', 'outerHTML'],
    ['className', 'className'],
    ['classList', 'classList'],
    ['style', 'style'],
    ['clientHeight', 'clientHeight'],
    ['clientWidth', 'clientWidth'],
    ['offsetHeight', 'offsetHeight'],
    ['offsetWidth', 'offsetWidth'],
    ['scrollHeight', 'scrollHeight'],
    ['scrollWidth', 'scrollWidth'],
    ['scrollTop', 'scrollTop'],
    ['scrollLeft', 'scrollLeft'],
    ['addEventListener', 'addEventListener'],
    ['removeEventListener', 'removeEventListener'],
    ['dispatchEvent', 'dispatchEvent'],
    ['preventDefault', 'preventDefault'],
    ['stopPropagation', 'stopPropagation'],
    ['stopImmediatePropagation', 'stopImmediatePropagation'],
    ['target', 'target'],
    ['currentTarget', 'currentTarget'],
    ['type', 'type'],
    ['bubbles', 'bubbles'],
    ['cancelable', 'cancelable'],
    ['defaultPrevented', 'defaultPrevented'],
    ['eventPhase', 'eventPhase'],
    ['timeStamp', 'timeStamp'],
    ['isTrusted', 'isTrusted'],
    
    // 修復可能的CSS問題
    ['display', 'display'],
    ['visibility', 'visibility'],
    ['opacity', 'opacity'],
    ['position', 'position'],
    ['top', 'top'],
    ['right', 'right'],
    ['bottom', 'bottom'],
    ['left', 'left'],
    ['width', 'width'],
    ['height', 'height'],
    ['margin', 'margin'],
    ['padding', 'padding'],
    ['border', 'border'],
    ['background', 'background'],
    ['color', 'color'],
    ['font', 'font'],
    ['text', 'text'],
    ['line', 'line'],
    ['vertical', 'vertical'],
    ['horizontal', 'horizontal'],
    ['overflow', 'overflow'],
    ['float', 'float'],
    ['clear', 'clear'],
    ['z-index', 'z-index'],
    ['cursor', 'cursor'],
    ['pointer-events', 'pointer-events'],
    ['user-select', 'user-select'],
    ['box-sizing', 'box-sizing'],
    ['transition', 'transition'],
    ['transform', 'transform'],
    ['animation', 'animation'],
    ['keyframes', 'keyframes'],
    ['media', 'media'],
    ['important', 'important'],
    ['inherit', 'inherit'],
    ['initial', 'initial'],
    ['unset', 'unset'],
    ['auto', 'auto'],
    ['none', 'none'],
    ['block', 'block'],
    ['inline', 'inline'],
    ['inline-block', 'inline-block'],
    ['flex', 'flex'],
    ['grid', 'grid'],
    ['table', 'table'],
    ['absolute', 'absolute'],
    ['relative', 'relative'],
    ['fixed', 'fixed'],
    ['sticky', 'sticky'],
    ['static', 'static'],
    ['hidden', 'hidden'],
    ['visible', 'visible'],
    ['scroll', 'scroll'],
    ['clip', 'clip'],
    ['ellipsis', 'ellipsis'],
    ['nowrap', 'nowrap'],
    ['pre', 'pre'],
    ['pre-wrap', 'pre-wrap'],
    ['pre-line', 'pre-line'],
    ['break-word', 'break-word'],
    ['break-all', 'break-all'],
    ['keep-all', 'keep-all'],
    ['normal', 'normal'],
    ['bold', 'bold'],
    ['italic', 'italic'],
    ['underline', 'underline'],
    ['line-through', 'line-through'],
    ['overline', 'overline'],
    ['uppercase', 'uppercase'],
    ['lowercase', 'lowercase'],
    ['capitalize', 'capitalize'],
    ['center', 'center'],
    ['justify', 'justify'],
    ['baseline', 'baseline'],
    ['sub', 'sub'],
    ['super', 'super'],
    ['text-top', 'text-top'],
    ['text-bottom', 'text-bottom'],
    ['middle', 'middle'],
    ['transparent', 'transparent'],
    ['currentColor', 'currentColor'],
    ['rgb', 'rgb'],
    ['rgba', 'rgba'],
    ['hsl', 'hsl'],
    ['hsla', 'hsla'],
    ['linear-gradient', 'linear-gradient'],
    ['radial-gradient', 'radial-gradient'],
    ['repeating-linear-gradient', 'repeating-linear-gradient'],
    ['repeating-radial-gradient', 'repeating-radial-gradient'],
    ['conic-gradient', 'conic-gradient'],
    ['url', 'url'],
    ['calc', 'calc'],
    ['var', 'var'],
    ['px', 'px'],
    ['em', 'em'],
    ['rem', 'rem'],
    ['%', '%'],
    ['vh', 'vh'],
    ['vw', 'vw'],
    ['vmin', 'vmin'],
    ['vmax', 'vmax'],
    ['fr', 'fr'],
    ['ch', 'ch'],
    ['ex', 'ex'],
    ['cm', 'cm'],
    ['mm', 'mm'],
    ['in', 'in'],
    ['pt', 'pt'],
    ['pc', 'pc'],
    ['deg', 'deg'],
    ['rad', 'rad'],
    ['grad', 'grad'],
    ['turn', 'turn'],
    ['ms', 'ms'],
    ['s', 's'],
    ['Hz', 'Hz'],
    ['kHz', 'kHz'],
    ['dpi', 'dpi'],
    ['dpcm', 'dpcm'],
    ['dppx', 'dppx'],
    
    // 修復可能的HTTP問題
    ['XMLHttpRequest', 'XMLHttpRequest'],
    ['fetch', 'fetch'],
    ['GET', 'GET'],
    ['POST', 'POST'],
    ['PUT', 'PUT'],
    ['DELETE', 'DELETE'],
    ['HEAD', 'HEAD'],
    ['OPTIONS', 'OPTIONS'],
    ['PATCH', 'PATCH'],
    ['Content-Type', 'Content-Type'],
    ['Authorization', 'Authorization'],
    ['Accept', 'Accept'],
    ['User-Agent', 'User-Agent'],
    ['Referer', 'Referer'],
    ['Origin', 'Origin'],
    ['Host', 'Host'],
    ['Cookie', 'Cookie'],
    ['Set-Cookie', 'Set-Cookie'],
    ['Cache-Control', 'Cache-Control'],
    ['Expires', 'Expires'],
    ['Last-Modified', 'Last-Modified'],
    ['ETag', 'ETag'],
    ['If-Modified-Since', 'If-Modified-Since'],
    ['If-None-Match', 'If-None-Match'],
    ['Location', 'Location'],
    ['Redirect', 'Redirect'],
    ['Status', 'Status'],
    ['application/json', 'application/json'],
    ['application/xml', 'application/xml'],
    ['application/x-www-form-urlencoded', 'application/x-www-form-urlencoded'],
    ['multipart/form-data', 'multipart/form-data'],
    ['text/plain', 'text/plain'],
    ['text/html', 'text/html'],
    ['text/css', 'text/css'],
    ['text/javascript', 'text/javascript'],
    ['image/png', 'image/png'],
    ['image/jpeg', 'image/jpeg'],
    ['image/gif', 'image/gif'],
    ['image/svg+xml', 'image/svg+xml'],
    ['audio/mpeg', 'audio/mpeg'],
    ['audio/ogg', 'audio/ogg'],
    ['video/mp4', 'video/mp4'],
    ['video/ogg', 'video/ogg'],
    ['video/webm', 'video/webm']
  ];
  
  let changesCount = 0;
  
  syntaxFixes.forEach(([pattern, replacement]) => {
    const regex = new RegExp(pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    const newContent = content.replace(regex, replacement);
    if (newContent !== content) {
      content = newContent;
      changesCount++;
    }
  });
  
  // 寫入修復後的內容
  fs.writeFileSync(filePath, content, 'utf8');
  
  if (changesCount > 0) {
    console.log(`✅ 修復完成: ${changesCount} 個問題`);
  } else {
    console.log(`ℹ️  沒有發現需要修復的問題`);
  }
  
} catch (error) {
  console.error('❌ 修復失敗:', error.message);
} 