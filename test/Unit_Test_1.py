# Comment the following code
def add(x, y):  # Function to add two numbers
    return x + y

def subtract(x, y):  # Function to subtract one number from another
    return x - y

def multiply(x, y):  # Function to multiply two numbers
    return x * y

def divide(x, y):  # Function to divide one number by another, handles division by zero
    if y == 0:
        return "Cannot divide by zero"
    return x / y

def calculator():  # Function to run the calculator
    print("Select operation:")  # Display options for the user
    print("1. Addition")
    print("2. Subtraction")
    print("3. Multiplication")
    print("4. Division")

    while True:  # Loop to allow multiple calculations
        choice = input("Enter your choice (1/2/3/4): ")  # Get user's choice

        if choice in ['1', '2', '3', '4']:  # Check if the choice is valid
            num1 = float(input("Enter first number: "))  # Get first number from user
            num2 = float(input("Enter second number: "))  # Get second number from user

            if choice == '1':
                print(f"{num1} + {num2} = {add(num1, num2)}")  # Perform addition
            elif choice == '2':
                print(f"{num1} - {num2} = {subtract(num1, num2)}")  # Perform subtraction
            elif choice == '3':
                print(f"{num1} * {num2} = {multiply(num1, num2)}")  # Perform multiplication
            elif choice == '4':
                result = divide(num1, num2)  # Perform division
                print(f"{num1} / {num2} = {result}")

            next_calculation = input("Would you like to perform another calculation? (yes/no): ")  # Ask if user wants to continue
            if next_calculation.lower() != 'yes':  # Check if user wants to continue
                break
        else:
            print("Invalid input, please choose 1, 2, 3, or 4.")  # Inform user of invalid input

if __name__ == "__main__":
    calculator()  # Run the calculator if this script is executed directly

