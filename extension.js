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
const { execFile } = require('child_process');
const path = require('path');

// Python script path
function runPythonScript(codeSnippet) {
    return new Promise((resolve, reject) => {
        const pythonPath = path.join(__dirname, 'generate_comment.py');

        // Execute the Python script and pass the code snippet as a parameter
        execFile('python', [pythonPath, codeSnippet], (error, stdout, stderr) => {
            if (error) {
                reject(`Error: ${stderr}`);
            } else {
                resolve(stdout.trim());  // Return the generated comment
            }
        });
    });
}

function activate(context) {
    // Command to convert selected text to uppercase
    let convertToUpperCase = vscode.commands.registerCommand('extension.convertToUpperCase', function () {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const selection = editor.selection;
            const selectedText = editor.document.getText(selection);
            if (!selectedText) {
                vscode.window.showInformationMessage('Please select text');
                return;
            }
            const upperCaseText = selectedText.toUpperCase();
            editor.edit(editBuilder => {
                editBuilder.replace(selection, upperCaseText);
            });
        }
    });

    // Command to convert selected text to lowercase
    let convertToLowerCase = vscode.commands.registerCommand('extension.convertToLowerCase', function () {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const selection = editor.selection;
            const selectedText = editor.document.getText(selection);
            if (!selectedText) {
                vscode.window.showInformationMessage('Please select text');
                return;
            }
            const lowerCaseText = selectedText.toLowerCase();
            editor.edit(editBuilder => {
                editBuilder.replace(selection, lowerCaseText);
            });
        }
    });

    // Command to generate comment for selected code
    let generateComment = vscode.commands.registerCommand('extension.generateComment', async function () {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const selection = editor.selection;
            const selectedText = editor.document.getText(selection);
            if (!selectedText) {
                vscode.window.showInformationMessage('Please select code to generate comment');
                return;
            }

            try {
                // Call the Python script to generate the comment
                const commentText = await runPythonScript(selectedText);
                if (commentText) {
                    // Insert the generated comment at the start of the selected code
                    editor.edit(editBuilder => {
                        editBuilder.insert(selection.start, `// ${commentText}\n`);
                    });
                }
            } catch (error) {
                vscode.window.showErrorMessage('Failed to generate comment: ' + error);
            }
        }
    });

    // Register the commands
    context.subscriptions.push(convertToUpperCase);
    context.subscriptions.push(convertToLowerCase);
    context.subscriptions.push(generateComment);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};



