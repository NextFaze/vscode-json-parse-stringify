import * as vscode from 'vscode';

export function replaceSelectedWithParsed() {
  const selected = getSelectedText();

  if (!selected || !selected.trim()) {
    vscode.window.showInformationMessage('Select stringified JSON first');
    return;
  }

  try {
    const parsed = parseJsonString(selected);
    replaceSelectedText(JSON.stringify(parsed));
  } catch (ex) {
    vscode.window.showInformationMessage('Failed to parse input string');
  }
}

export function replaceSelectedWithStringified() {
  const selected = getSelectedText();

  if (!selected || !selected.trim()) {
    vscode.window.showInformationMessage('Select a javascript object or JSON');
    return;
  }
  try {
    replaceSelectedText(stringifyJsonString(selected));
  } catch (ex) {
    vscode.window.showInformationMessage('Failed to stringify input string');
  }
}

export function parseJsonString(value: string) {
  let obj: string = '';
  if (typeof value === 'string') {
    eval(`obj = ${value}`);
    try {
      return JSON.parse(obj);
    } catch (ex) {}
  }
  return JSON.parse(value);
}

export function stringifyJsonString(value: string) {
  let obj;
  try {
    eval(`obj = ${value}`);
  } catch (ex) {
    eval(`obj = "${value}"`);
  }
  return JSON.stringify(JSON.stringify(obj));
}

function getSelectedText(editor = vscode.window.activeTextEditor) {
  if (!editor) {
    return;
  }
  const selectedText = editor.document.getText(editor.selection);
  return selectedText;
}

function replaceSelectedText(
  value: string,
  editor = vscode.window.activeTextEditor
) {
  if (!editor) {
    return;
  }
  editor.edit(builder => {
    builder.replace(editor.selection, value);
  });
}
