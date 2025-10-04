const fs = require('fs');
const path = require('path');

// 转换TSX文件为JSX文件
const convertTsxToJsx = (inputPath, outputPath) => {
  // 读取文件内容
  let content = fs.readFileSync(inputPath, 'utf8');
  
  // 移除TypeScript特定的语法
  content = content.replace(/: React\.JSX\.Element/g, '');
  content = content.replace(/: any/g, '');
  content = content.replace(/: string/g, '');
  content = content.replace(/: number/g, '');
  content = content.replace(/: boolean/g, '');
  content = content.replace(/: \w+\[\]/g, '');
  content = content.replace(/: \w+/g, '');
  
  // 将.tsx扩展名改为.jsx
  const newContent = content.replace(/\.tsx/g, '.jsx');
  
  // 写入新文件
  fs.writeFileSync(outputPath, newContent);
  console.log(`Converted ${inputPath} to ${outputPath}`);
};

// 获取components目录中的所有tsx文件
const componentsDir = path.join(__dirname, 'EmotionPreview', 'components');
const files = fs.readdirSync(componentsDir);

files.forEach(file => {
  if (file.endsWith('.tsx')) {
    const inputPath = path.join(componentsDir, file);
    const outputPath = path.join(componentsDir, file.replace('.tsx', '.jsx'));
    convertTsxToJsx(inputPath, outputPath);
  }
});

console.log('Conversion complete!');