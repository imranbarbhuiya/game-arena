import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "game-arena" is now active!');

  const openGameDisposable = vscode.commands.registerCommand(
    'game-arena.startGameArena',
    () => {
      const panel = vscode.window.createWebviewPanel(
        'gameArena',
        'Games Arena',
        vscode.ViewColumn.One,
        {
          enableScripts: true,
          retainContextWhenHidden: true,
        }
      );

      panel.webview.html = getWebviewContent(context);
    }
  );

  context.subscriptions.push(openGameDisposable);
}

function getWebviewContent(context: vscode.ExtensionContext): string {
  const htmlPath = path.join(context.extensionPath, 'game.html');
  try {
    return fs.readFileSync(htmlPath, 'utf8');
  } catch (error) {
    console.error('Error reading game.html:', error);
    return `
      <html>
        <body>
          <h1>Error</h1>
          <p>Could not load game.html file.</p>
          <p>Error: ${error}</p>
        </body>
      </html>
    `;
  }
}

export function deactivate() {}
