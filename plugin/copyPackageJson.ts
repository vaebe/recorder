import { Plugin } from 'vite';
import fs from 'fs';
import path from 'path';

interface CopyPackageJsonPluginOptions {
  targetDir?: string; // 目标目录，如果未提供，默认为 dist
}

export default function copyPackageJsonPlugin(options: CopyPackageJsonPluginOptions = {}): Plugin {
  return {
    name: 'copy-package-json',
    apply: 'build', // 确保在构建阶段应用插件
    enforce: 'post', // 确保在所有插件之后执行
    writeBundle() {
      const rootDir = process.cwd(); // 获取根目录路径
      const packageJsonPath = path.resolve(rootDir, 'package.json');
      const distDir = options.targetDir ? path.resolve(rootDir, options.targetDir) : path.resolve(rootDir, 'dist');
      const distPackageJsonPath = path.join(distDir, 'package.json');

      // 复制 package.json 文件到目标目录
      fs.copyFileSync(packageJsonPath, distPackageJsonPath);

      console.log('package.json copied to:', distPackageJsonPath);
    },
  };
}
