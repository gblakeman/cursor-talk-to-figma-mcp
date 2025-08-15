import { defineConfig } from 'tsup';
import { copyFileSync, mkdirSync } from 'fs';
import { join } from 'path';

export default defineConfig([
  // MCP Server build configuration
  {
    entry: ['src/talk_to_figma_mcp/server.ts'],
    format: ['cjs', 'esm'],
    dts: true,
    clean: true,
    outDir: 'dist',
    target: 'node18',
    sourcemap: true,
    minify: false,
    splitting: false,
    bundle: true,
    name: 'server',
  },
  // Figma Plugin build configuration
  {
    entry: ['src/cursor_mcp_plugin/code.ts'],
    format: ['iife'],
    outDir: 'dist/plugin',
    target: 'es2020',
    sourcemap: true,
    minify: false,
    splitting: false,
    bundle: true,
    name: 'plugin',
    outExtension() {
      return {
        js: '.js',
      };
    },
    onSuccess: async () => {
      // Copy static files to plugin directory
      const pluginDir = 'dist/plugin';
      
      // Ensure plugin directory exists
      mkdirSync(pluginDir, { recursive: true });
      
      // Copy UI HTML file
      copyFileSync(
        join('src/cursor_mcp_plugin/ui.html'),
        join(pluginDir, 'ui.html')
      );
      
      // Copy manifest.json
      copyFileSync(
        join('src/cursor_mcp_plugin/manifest.json'),
        join(pluginDir, 'manifest.json')
      );
      
      console.log('✅ Plugin static files copied successfully');
    },
  },
]); 
