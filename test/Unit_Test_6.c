```c
// Simple calculator program with basic arithmetic operations
```
// Include standard input/output library for printf and scanf functions
#include <stdio.h>

// 函数用于将两个浮点数相加并打印结果
void add(float a, float b) {
    printf("Result: %.2f\n", a + b);
}

// 函数用于从第一个浮点数减去第二个浮点数并打印结果
void subtract(float a, float b) {
    printf("Result: %.2f\n", a - b);
}

// 函数用于将两个浮点数相乘并打印结果
void multiply(float a, float b) {
    printf("Result: %.2f\n", a * b);
}

// 函数用于将第一个浮点数除以第二个浮点数并打印结果
// 检查除零以防止运行时错误
void divide(float a, float b) {
    if (b != 0) {
        printf("Result: %.2f\n", a / b);
    } else {
        printf("Error: Cannot divide by zero!\n");
    }
}

// Main function where the program execution starts
int main() {
    float num1, num2; // Declare two float variables to store user input
    int choice;       // Declare an integer variable to store user choice

    printf("Welcome to the Simple Calculator!\n"); // Display welcome message

    printf("Enter the first number: "); // Prompt user to enter the first number
    scanf("%f", &num1);                 // Read the first number from user input

    printf("Enter the second number: "); // Prompt user to enter the second number
    scanf("%f", &num2);                 // Read the second number from user input

    printf("Choose an operation:\n");   // Display options for user to choose from
    printf("1. Addition\n");            // Display addition option
    printf("2. Subtraction\n");          // Display subtraction option
    printf("3. Multiplication\n");       // Display multiplication option
    printf("4. Division\n");            // Display division option

    printf("Enter your choice (1-4): "); // Prompt user to enter their choice
    scanf("%d", &choice);               // Read the user's choice

    switch (choice) {                   // Begin a switch statement to handle different user choices
        case 1:
            add(num1, num2); // Call the add function if user chose addition
            break;           // Exit the switch statement
        case 2:
            subtract(num1, num2); // Call the subtract function if user chose subtraction
            break;              // Exit the switch statement
        case 3:
            multiply(num1, num2); // Call the multiply function if user chose multiplication
            break;               // Exit the switch statement
        case 4:
            divide(num1, num2); // Call the divide function if user chose division
            break;              // Exit the switch statement
        default:
            printf("Invalid choice!\n"); // Display an error message if the user choice is invalid
    }

    return 0; // End of the main function, return 0 to indicate successful execution
}
