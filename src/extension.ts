import * as vscode from 'vscode';

import {
  replaceSelectedWithParsed,
  replaceSelectedWithStringified
} from './lib';

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand(
      'extension.stringifyJson',
      replaceSelectedWithStringified
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand(
      'extension.parseJson',
      replaceSelectedWithParsed
    )
  );
}

// this method is called when your extension is deactivated
export function deactivate() {}
