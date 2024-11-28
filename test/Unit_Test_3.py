# After the comment check
def add(x, y):
    return x + y  # Function to add one number to another

# The original code had incorrect comments
# def add(x, y):
#    return x + y  # Function to subtract one number from another
def subtract(x, y):
    return x - y



def multiply(x, y):  # Define a function named multiply that takes two arguments x and y
    return x * y      # Return the product of x and y

def divide(x, y):   # Define a function named divide that takes two arguments x and y
    if y == 0:      # Check if the second argument y is zero
        return "Cannot divide by zero"  # If y is zero, return an error message
    return x / y     # Otherwise, return the quotient of x divided by y

def multiply(x, y):
    return x * y  

def divide(x, y):
    if y == 0:
        return "Cannot divide by zero"
    return x / y

def calculator():
    print("Select operation:")
    print("1. Addition")
    print("2. Subtraction")
    print("3. Multiplication")
    print("4. Division")

    while True:
        choice = input("Enter your choice (1/2/3/4): ")

        if choice in ['1', '2', '3', '4']:
            num1 = float(input("Enter first number: "))
            num2 = float(input("Enter second number: "))

            if choice == '1':
                print(f"{num1} + {num2} = {add(num1, num2)}")
            elif choice == '2':
                print(f"{num1} - {num2} = {subtract(num1, num2)}")
            elif choice == '3':
                print(f"{num1} * {num2} = {multiply(num1, num2)}")
            elif choice == '4':
                result = divide(num1, num2)
                print(f"{num1} / {num2} = {result}")

            next_calculation = input("Would you like to perform another calculation? (yes/no): ")
            if next_calculation.lower() != 'yes':
                break
        else:
            print("Invalid input, please choose 1, 2, 3, or 4.")

if __name__ == "__main__":
    calculator()