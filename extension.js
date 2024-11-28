const vscode = require('vscode');
const { execFile } = require('child_process');
const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');


function logOperation(operation, details) {
    const logFilePath = path.join(__dirname, 'log.txt');
    const timestamp = new Date().toLocaleString();
    const logEntry = `\n------------------------------\n` +
                     `[${timestamp}] ${operation}:\n` +
                     `${JSON.stringify(details, null, 2)}\n` + 
                     `------------------------------\n`;
    
    try {
        fs.appendFileSync(logFilePath, logEntry); // 使用同步写入
    } catch (err) {
        console.error('Failed to write to log file:', err);
    }
}

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


// Python script path
function runWholePythonScript(codeSnippet) {
    return new Promise((resolve, reject) => {
        const pythonPath = path.join(__dirname, 'generate_whole_comment.py');

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
                            editBuilder.insert(selection.start, `${commentText}\n`);
                        });
    
                        // Log the accept operation
                        logOperation('AcceptComment', {
                            originalCode: selectedText,
                            generatedComment: commentText,
                            userChoice: 'Accept'
                        });
                    } else if (choice === 'Reject') {
                        vscode.window.showInformationMessage('Comment rejected. No changes were made.');
    
                        // Log the reject operation
                        logOperation('RejectComment', {
                            originalCode: selectedText,
                            generatedComment: commentText,
                            userChoice: 'Reject'
                        });
                    }
                }
            } catch (error) {
                vscode.window.showErrorMessage('Failed to generate comment: ' + error);
    
                // Log the error
                logOperation('GenerateCommentError', {
                    originalCode: selectedText,
                    error: error.message
                });
            }
        }
    });

    let generateWholeComment = vscode.commands.registerCommand('extension.generateWholeComment', async function () {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const selection = editor.selection;
            const selectedText = editor.document.getText(selection);
            if (!selectedText) {
                vscode.window.showInformationMessage('Please select code to generate whole comment');
                return;
            }
    
            try {
                // Call the Python script to generate the comment
                const commentText = await runWholePythonScript(selectedText);
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
                            editBuilder.insert(selection.start, `${commentText}\n`);
                        });
    
                        // Log the accept operation
                        logOperation('AcceptComment', {
                            originalCode: selectedText,
                            generatedComment: commentText,
                            userChoice: 'Accept'
                        });
                    } else if (choice === 'Reject') {
                        vscode.window.showInformationMessage('Comment rejected. No changes were made.');
    
                        // Log the reject operation
                        logOperation('RejectComment', {
                            originalCode: selectedText,
                            generatedComment: commentText,
                            userChoice: 'Reject'
                        });
                    }
                }
            } catch (error) {
                vscode.window.showErrorMessage('Failed to generate whole comment: ' + error);
    
                // Log the error
                logOperation('GenerateCommentError', {
                    originalCode: selectedText,
                    error: error.message
                });
            }
        }
    });
    

    // let translateComment = vscode.commands.registerCommand('extension.translateComment', async function () {
    //     const editor = vscode.window.activeTextEditor;
    //     if (editor) {
    //         const selection = editor.selection;
    //         const selectedText = editor.document.getText(selection);
    //         if (!selectedText) {
    //             vscode.window.showInformationMessage('Please select a comment to translate');
    //             return;
    //         }
    
    //         try {
    //             // Call LLM API to translate the comment
    //             const translatedText = await translateToChinese(selectedText);
    //             if (translatedText) {
    //                 // Show a confirmation dialog with options
    //                 const choice = await vscode.window.showInformationMessage(
    //                     `Generated translated comment: "${translatedText}". Do you want to accept this translation?`,
    //                     { modal: false },
    //                     'Accept', 'Reject'
    //                 );
    
    //                 if (choice === 'Accept') {
    //                     // Replace the selected text with the translated comment
    //                     editor.edit(editBuilder => {
    //                         editBuilder.replace(selection, translatedText);
    //                     });
    
    //                     // Log the accept operation
    //                     logOperation('AcceptTranslation', {
    //                         originalComment: selectedText,
    //                         translatedComment: translatedText,
    //                         userChoice: 'Accept'
    //                     });
    //                 } else if (choice === 'Reject') {
    //                     vscode.window.showInformationMessage('Translation rejected. No changes were made.');
    
    //                     // Log the reject operation
    //                     logOperation('RejectTranslation', {
    //                         originalComment: selectedText,
    //                         translatedComment: translatedText,
    //                         userChoice: 'Reject'
    //                     });
    //                 }
    //             }
    //         } catch (error) {
    //             vscode.window.showErrorMessage('Failed to translate comment: ' + error.message);
    
    //             // Log the error
    //             logOperation('TranslateCommentError', {
    //                 originalComment: selectedText,
    //                 error: error.message
    //             });
    //         }
    //     }
    // });


    let translateComment = vscode.commands.registerCommand('extension.translateComment', async function () {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const selection = editor.selection;
            const selectedText = editor.document.getText(selection);
            if (!selectedText) {
                vscode.window.showInformationMessage('Please select a comment to translate');
                return;
            }

            // Call Python script to detect the language
            const pythonScriptPath = path.join(__dirname, 'generate_translate.py'); // 替换为你的Python脚本路径
            const command = `python "${pythonScriptPath}" "${selectedText}" "detect"`;

            try {
                const detectedLanguage = await new Promise((resolve, reject) => {
                    exec(command, (error, stdout, stderr) => {
                        if (error) {
                            reject('Failed to detect language: ' + error.message);
                        } else if (stderr) {
                            reject('Error: ' + stderr);
                        } else {
                            resolve(stdout.trim());
                        }
                    });
                });

                // Show quick pick for language selection based on detected language
                let targetLanguage;
                if (detectedLanguage === 'zh-cn') {
                    targetLanguage = 'en'; // 如果是英文，翻译成中文
                } else if (detectedLanguage === 'en') {
                    targetLanguage = 'zh'; // 如果是中文，翻译成英文
                } else {
                    // 其他语言，提供选择
                    targetLanguage = await vscode.window.showQuickPick(
                        ['English', 'Chinese'],
                        { placeHolder: 'Select target language for translation' }
                    );
    
                    if (!targetLanguage) {
                        vscode.window.showInformationMessage('Translation canceled.');
                        return;
                    }
    
                    // 将用户选择映射到语言代码
                    targetLanguage = targetLanguage === 'English' ? 'en' : 'zh';
                }
    

                // Call Python script to translate the comment
                const translateCommand = `python "${pythonScriptPath}" "${selectedText}" "${targetLanguage}"`;

                const translatedText = await new Promise((resolve, reject) => {
                    exec(translateCommand, (translateError, translateStdout, translateStderr) => {
                        if (translateError) {
                            reject('Failed to translate comment: ' + translateError.message);
                        } else if (translateStderr) {
                            reject('Error: ' + translateStderr);
                        } else {
                            resolve(translateStdout.trim());
                        }
                    });
                });

                const choice = await vscode.window.showInformationMessage(
                    `Generated translated comment: "${translatedText}". Do you want to accept this translation?`,
                    { modal: false },
                    'Accept', 'Reject'
                );

                if (choice === 'Accept') {
                    editor.edit(editBuilder => {
                        editBuilder.replace(selection, translatedText);
                    });
                } else {
                    vscode.window.showInformationMessage('Translation rejected. No changes were made.');
                }
            } catch (error) {
                vscode.window.showErrorMessage(error);
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
                    // Show a confirmation dialog with options
                    const choice = await vscode.window.showInformationMessage(
                        `Generated corrected comment: "${correctedText}". Do you want to accept this correction?`,
                        { modal: false },
                        'Accept', 'Reject'
                    );
    
                    if (choice === 'Accept') {
                        // Replace the selected text with the corrected comment
                        editor.edit(editBuilder => {
                            editBuilder.replace(selection, correctedText); // Replace instead of insert
                        });
    
                        // Log the accept operation
                        logOperation('AcceptCorrection', {
                            originalComment: selectedText,
                            correctedComment: correctedText,
                            userChoice: 'Accept'
                        });
                    } else if (choice === 'Reject') {
                        vscode.window.showInformationMessage('Correction rejected. No changes were made.');
    
                        // Log the reject operation
                        logOperation('RejectCorrection', {
                            originalComment: selectedText,
                            correctedComment: correctedText,
                            userChoice: 'Reject'
                        });
                    }
                }
            } catch (error) {
                vscode.window.showErrorMessage('Failed to correct comment: ' + error.message);
    
                // Log the error
                logOperation('CorrectCommentError', {
                    originalComment: selectedText,
                    error: error.message
                });
            }
        }
    });
    

    
    // Register the commands
    context.subscriptions.push(convertToUpperCase);
    context.subscriptions.push(convertToLowerCase);
    context.subscriptions.push(generateComment);
    context.subscriptions.push(generateWholeComment);
    context.subscriptions.push(translateComment);
    context.subscriptions.push(correctComment);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};
