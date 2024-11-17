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

// Function to call LLM API to translate text to Chinese
function translateToChinese(codeSnippet) {
    return new Promise((resolve, reject) => {
        const pythonPath = path.join(__dirname, 'generate_translate.py');

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

function correctCommentText(commentText) {
    return new Promise((resolve, reject) => {
        const pythonPath = path.join(__dirname, 'correct_comment.py');
        execFile('python', [pythonPath, commentText], (error, stdout, stderr) => {
            if (error) {
                reject(`Error: ${stderr}`);
            } else {
                resolve(stdout.trim());
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
                    // Show a confirmation dialog with options
                    const choice = await vscode.window.showInformationMessage(
                        `Generated comment: "${commentText}". Do you want to accept this comment?`,
                        { modal: false },
                        'Accept', 'Reject'
                    );
    
                    if (choice === 'Accept') {
                        // Insert the generated comment at the start of the selected code
                        editor.edit(editBuilder => {
                            editBuilder.insert(selection.start, `// ${commentText}\n`);
                        });
                    } else if (choice === 'Reject') {
                        vscode.window.showInformationMessage('Comment rejected. No changes were made.');
                    }
                }
            } catch (error) {
                vscode.window.showErrorMessage('Failed to generate comment: ' + error);
            }
        }
    });
    

    // // Command to generate comment for selected code
    // let generateComment = vscode.commands.registerCommand('extension.generateComment', async function () {
    //     const editor = vscode.window.activeTextEditor;
    //     if (editor) {
    //         const selection = editor.selection;
    //         const selectedText = editor.document.getText(selection);
    //         if (!selectedText) {
    //             vscode.window.showInformationMessage('Please select code to generate comment');
    //             return;
    //         }

    //         try {
    //             // Call the Python script to generate the comment
    //             const commentText = await runPythonScript(selectedText);
    //             if (commentText) {
    //                 // Insert the generated comment at the start of the selected code
    //                 editor.edit(editBuilder => {
    //                     editBuilder.insert(selection.start, `// ${commentText}\n`);
    //                 });
    //             }
    //         } catch (error) {
    //             vscode.window.showErrorMessage('Failed to generate comment: ' + error);
    //         }
    //     }
    // });

    // Command to translate selected comment to Chinese
    let translateComment = vscode.commands.registerCommand('extension.translateComment', async function () {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const selection = editor.selection;
            const selectedText = editor.document.getText(selection);
            if (!selectedText) {
                vscode.window.showInformationMessage('Please select a comment to translate');
                return;
            }

            try {
                // Call LLM API to translate the comment
                const translatedText = await translateToChinese(selectedText);
                if (translatedText) {
                    // Replace the selected text with the translated comment
                    editor.edit(editBuilder => {
                        editBuilder.insert(selection.start, ` ${translatedText}\n`);
                    });
                }
            } catch (error) {
                vscode.window.showErrorMessage('Failed to translate comment: ' + error.message);
            }
        }
    });

    let correctComment = vscode.commands.registerCommand('extension.correctComment', async function () {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const selection = editor.selection;
            const selectedText = editor.document.getText(selection);
            if (!selectedText) {
                vscode.window.showInformationMessage('Please select a comment to correct');
                return;
            }

            try {
                const correctedText = await correctCommentText(selectedText);
                if (correctedText) {
                    editor.edit(editBuilder => {
                        editBuilder.replace(selection, correctedText);
                    });
                }
            } catch (error) {
                vscode.window.showErrorMessage('Failed to correct comment: ' + error.message);
            }
        }
    });

    // Register the commands
    context.subscriptions.push(convertToUpperCase);
    context.subscriptions.push(convertToLowerCase);
    context.subscriptions.push(generateComment);
    context.subscriptions.push(translateComment);
    context.subscriptions.push(correctComment);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};
