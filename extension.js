// // The module 'vscode' contains the VS Code extensibility API
// // Import the module and reference it with the alias vscode in your code below
// const vscode = require('vscode');

// // This method is called when your extension is activated
// // Your extension is activated the very first time the command is executed

// /**
//  * @param {vscode.ExtensionContext} context
//  */
// function activate(context) {

// 	// Use the console to output diagnostic information (console.log) and errors (console.error)
// 	// This line of code will only be executed once when your extension is activated
// 	console.log('Congratulations, your extension "se-group6" is now active!');

// 	// The command has been defined in the package.json file
// 	// Now provide the implementation of the command with  registerCommand
// 	// The commandId parameter must match the command field in package.json
// 	const disposable = vscode.commands.registerCommand('se-group6.helloWorld', function () {
// 		// The code you place here will be executed every time your command is executed

// 		// Display a message box to the user
// 		vscode.window.showInformationMessage('Hello World from SE-Group6!');
// 	});

// 	context.subscriptions.push(disposable);
// }

// // This method is called when your extension is deactivated
// function deactivate() {}

// module.exports = {
// 	activate,
// 	deactivate
// }


const vscode = require('vscode');

function activate(context) {
    // 注册转换为大写的命令
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

    // 注册转换为小写的命令
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

