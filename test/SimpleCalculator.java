package test;
// SimpleCalculator is a basic command-line calculator program.

import java.util.Scanner; // Import the Scanner class to use it

public class SimpleCalculator { // Define a public class named SimpleCalculator

    public static void main(String[] args) { // Define the main method which is the entry point of the program
        Scanner scanner = new Scanner(System.in); // 创建一个Scanner对象来从控制台读取输入

        System.out.println("Welcome to the Simple Calculator!"); // 打印欢迎信息

        System.out.print("Enter the first number: "); // 提示用户输入第一个数字

        double num1 = scanner.nextDouble(); // 读取第一个数字作为double
        System.out.print("Enter the second number: "); // Prompt the user to enter the second number
        double num2 = scanner.nextDouble(); // Read the second number as a double

        System.out.println("Choose an operation:"); // Prompt the user to choose an operation
        System.out.println("1. Addition"); // Display the options for the user
        System.out.println("2. Subtraction");
        System.out.println("3. Multiplication");
        System.out.println("4. Division");

        int choice = scanner.nextInt(); // Read the user's choice as an integer
        double result; // Declare a variable to hold the result of the operation

        switch (choice) { // Start a switch statement based on the user's choice
            case 1:
                result = add(num1, num2); // Call the add method and store the result
                System.out.println("Result: " + result); // Print the result of the addition
                break; // Exit the switch statement
            case 2:
                result = subtract(num1, num2); // Call the subtract method and store the result
                System.out.println("Result: " + result); // Print the result of the subtraction
                break; // Exit the switch statement
            case 3:
                result = multiply(num1, num2); // Call the multiply method and store the result
                System.out.println("Result: " + result); // Print the result of the multiplication
                break; // Exit the switch statement
            case 4:
                if (num2 != 0) { // Check if the second number is not zero
                    result = divide(num1, num2); // Call the divide method and store the result
                    System.out.println("Result: " + result); // Print the result of the division
                } else { // If the second number is zero
                    System.out.println("Error: Cannot divide by zero!"); // Print an error message
                }
                break; // Exit the switch statement
            default:
                System.out.println("Invalid choice!"); // Print an error message if the choice is not valid
        }

        scanner.close(); // Close the Scanner object
    }

    public static double add(double x, double y) { // Define the add method that takes two doubles and returns their sum
        return x + y; // Return the sum of x and y
    }

    public static double subtract(double x, double y) { // Define the subtract method that takes two doubles and returns their difference
        return x - y; // Return the difference of x and y
    }

    public static double multiply(double x, double y) { // Define the multiply method that takes two doubles and returns their product
        return x * y; // Return the product of x and y
    }

    public static double divide(double x, double y) { // Define the divide method that takes two doubles and returns their quotient
        return x / y; // Return the quotient of x and y
    }
}
