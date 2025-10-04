const fs = require('fs');
const path = require('path');

// ת��TSX�ļ�ΪJSX�ļ�
const convertTsxToJsx = (inputPath, outputPath) => {
  // ��ȡ�ļ�����
  let content = fs.readFileSync(inputPath, 'utf8');
  
  // �Ƴ�TypeScript�ض����﷨
  content = content.replace(/: React\.JSX\.Element/g, '');
  content = content.replace(/: any/g, '');
  content = content.replace(/: string/g, '');
  content = content.replace(/: number/g, '');
  content = content.replace(/: boolean/g, '');
  content = content.replace(/: \w+\[\]/g, '');
  content = content.replace(/: \w+/g, '');
  
  // ��.tsx��չ����Ϊ.jsx
  const newContent = content.replace(/\.tsx/g, '.jsx');
  
  // д�����ļ�
  fs.writeFileSync(outputPath, newContent);
  console.log(`Converted ${inputPath} to ${outputPath}`);
};

// ��ȡcomponentsĿ¼�е�����tsx�ļ�
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