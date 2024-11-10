
# VS Code Plugin Development(SE-GROUP6)

## 1. Environment Setup

### 1.1 Install Node.js

Make sure Node.js is installed on your system. You can download and install the latest version from the [Node.js official website](https://nodejs.org/). After installation, check the versions of Node.js and npm by running:

```bash
node -v
npm -v
```

### 1.2 Install Visual Studio Code

If you haven't installed Visual Studio Code yet, download and install it from the [VS Code official website](https://code.visualstudio.com/).

### 1.3 Install Yeoman and the VS Code Extension Generator

Use npm to install Yeoman and the VS Code extension generator globally:

```bash
npm install -g yo generator-code
```

### 1.4 Install `vsce` (VS Code Extension Manager)

`vsce` is used for packaging and publishing your extensions:

```bash
npm install -g vsce
```

## 2. Create the Plugin Project

### 2.1 Use Yeoman to Create a New Project

Open your command line tool (such as Terminal or Command Prompt) and run the following command to create a new plugin:

```bash
yo code
```

When prompted, choose the following options:

- **What type of extension do you want to create?** Select `New Extension (JavaScript)`.
- **What's the name of your extension?** Enter your plugin name (e.g., `My VS Code Plugin`).
- **What's the identifier of your extension?** Enter the identifier (e.g., `my-vscode-plugin`).
- **What's the description of your extension?** Provide a description of your plugin.
- **Enable JavaScript support?** Select `Yes`.
- **Initialize a git repository?** Choose `Yes` (optional).
- **Which package manager to use?** Select `npm`.

The generated project structure will include a basic VS Code plugin framework.

### 2.2 Project Structure

The generated project will contain the following structure:

``` md
my-vscode-plugin/
├── .vscode/
├── node_modules/
├── out/
├── src/
│   └── extension.js
├── package.json
├── README.md
└── .gitignore
```

## 3. Develop Plugin Features

In the `src/extension.js` file, add your plugin functionality. For example, here is a simple plugin that converts selected text to uppercase or lowercase:

```javascript
const vscode = require('vscode');

function activate(context) {
    let convertToUpperCase = vscode.commands.registerCommand('extension.convertToUpperCase', function () {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const selection = editor.selection;
            const selectedText = editor.document.getText(selection);
            if (!selectedText) {
                vscode.window.showInformationMessage('Please select texts');
                return;
            }
            const upperCaseText = selectedText.toUpperCase();
            editor.edit(editBuilder => {
                editBuilder.replace(selection, upperCaseText);
            });
        }
    });

    let convertToLowerCase = vscode.commands.registerCommand('extension.convertToLowerCase', function () {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const selection = editor.selection;
            const selectedText = editor.document.getText(selection);
            if (!selectedText) {
                vscode.window.showInformationMessage('Please select texts');
                return;
            }
            const lowerCaseText = selectedText.toLowerCase();
            editor.edit(editBuilder => {
                editBuilder.replace(selection, lowerCaseText);
            });
        }
    });

    context.subscriptions.push(convertToUpperCase);
    context.subscriptions.push(convertToLowerCase);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};
```

## 4. Update `package.json`

Make sure to register the commands and their shortcuts in the `package.json` file. For example:

```json
{
    "name": "my-vscode-plugin",
    "displayName": "My VS Code Plugin",
    "description": "A simple VS Code plugin to convert selected text to uppercase or lowercase.",
    "version": "0.0.1",
    "publisher": "your-name",
    "engines": {
        "vscode": "^1.50.0"
    },
    "activationEvents": [
        "onCommand:extension.convertToUpperCase",
        "onCommand:extension.convertToLowerCase"
    ],
    "main": "./out/extension.js",
    "contributes": {
        "commands": [
            {
                "command": "extension.convertToUpperCase",
                "title": "Convert Selected Text to Uppercase"
            },
            {
                "command": "extension.convertToLowerCase",
                "title": "Convert Selected Text to Lowercase"
            }
        ],
        "keybindings": [
            {
                "command": "extension.convertToUpperCase",
                "key": "ctrl+shift+u",
                "when": "editorTextFocus"
            },
            {
                "command": "extension.convertToLowerCase",
                "key": "ctrl+shift+l",
                "when": "editorTextFocus"
            }
        ]
    }
}
```

## 5. Debugging the Plugin

### 5.1 Open the Project in VS Code

Open your plugin project folder in Visual Studio Code.

### 5.2 Start Debugging

Press `F5` to start debugging. VS Code will open a new window with your extension loaded. You can test your functionality in this new window.

### 5.3 Use the Commands

1. Select the text you want to convert.
2. Use the shortcut keys or open the command palette (`Ctrl+Shift+P`) to run your commands.

## 6. Package the Plugin

### 6.1 Package the Plugin

In the root directory of your project, run the following command to package your plugin:

```bash
vsce package
```

This will generate a `.vsix` file.

### 6.2 Install the Plugin

You can install the `.vsix` file in two ways:

1. **Using VS Code**:
   - Open VS Code, go to the Extensions view (`Ctrl+Shift+X`).
   - Click on the three-dot menu in the upper right corner and select "Install from VSIX...".

2. **Command Line Installation**:

   ```bash
   code --install-extension my-vscode-plugin-0.0.1.vsix
   ```

## 7. Conclusion

By following the above steps, you can successfully create, debug, and package a simple VS Code plugin. This guide provides a foundational workflow, and as you delve deeper into VS Code extension development, you can add more complex features and functionalities. If you have any questions or need further assistance, feel free to reach out!
