# Comments translated from code comments
def add(x, y):  # 函数用于计算两个数的和
    return x + y

def subtract(x, y):  # 函数用于从一个数中减去另一个数
    return x - y

def multiply(x, y):  # 函数用于计算两个数的乘积
    return x * y

def divide(x, y):  # 函数用于将一个数除以另一个数，处理除以零的情况
    if y == 0:
        return "Cannot divide by zero"
    return x / y

def calculator():  # 函数用于运行计算器
    print("Select operation:")  # 显示用户选项
    print("1. Addition")
    print("2. Subtraction")
    print("3. Multiplication")
    print("4. Division")

    while True:  # 循环以允许进行多次计算
        choice = input("Enter your choice (1/2/3/4): ")  # 获取用户的选择

        if choice in ['1', '2', '3', '4']:  # 检查选择是否有效
            num1 = float(input("Enter first number: "))  # 从用户那里获取第一个数
            num2 = float(input("Enter second number: "))  # 从用户那里获取第二个数

            if choice == '1':
                print(f"{num1} + {num2} = {add(num1, num2)}")  # 执行加法
            elif choice == '2':
                print(f"{num1} - {num2} = {subtract(num1, num2)}")  # 执行减法
            elif choice == '3':
                print(f"{num1} * {num2} = {multiply(num1, num2)}")  # 执行乘法
            elif choice == '4':
                result = divide(num1, num2)  # 执行除法
                print(f"{num1} / {num2} = {result}")

            next_calculation = input("Would you like to perform another calculation? (yes/no): ")  # 询问用户是否想要继续
            if next_calculation.lower() != 'yes':  # 检查用户是否想要继续
                break
        else:
            print("Invalid input, please choose 1, 2, 3, or 4.")  # 通知用户无效输入

if __name__ == "__main__":
    calculator()  # 如果这个脚本被直接执行，则运行计算器

# The original code comments are in English
# def add(x, y):  # Function to add two numbers
#     return x + y

# def subtract(x, y):  # Function to subtract one number from another
#     return x - y

# def multiply(x, y):  # Function to multiply two numbers
#     return x * y

# def divide(x, y):  # Function to divide one number by another, handles division by zero
#     if y == 0:
#         return "Cannot divide by zero"
#     return x / y

# def calculator():  # Function to run the calculator
#     print("Select operation:")  # Display options for the user
#     print("1. Addition")
#     print("2. Subtraction")
#     print("3. Multiplication")
#     print("4. Division")

#     while True:  # Loop to allow multiple calculations
#         choice = input("Enter your choice (1/2/3/4): ")  # Get user's choice

#         if choice in ['1', '2', '3', '4']:  # Check if the choice is valid
#             num1 = float(input("Enter first number: "))  # Get first number from user
#             num2 = float(input("Enter second number: "))  # Get second number from user

#             if choice == '1':
#                 print(f"{num1} + {num2} = {add(num1, num2)}")  # Perform addition
#             elif choice == '2':
#                 print(f"{num1} - {num2} = {subtract(num1, num2)}")  # Perform subtraction
#             elif choice == '3':
#                 print(f"{num1} * {num2} = {multiply(num1, num2)}")  # Perform multiplication
#             elif choice == '4':
#                 result = divide(num1, num2)  # Perform division
#                 print(f"{num1} / {num2} = {result}")

#             next_calculation = input("Would you like to perform another calculation? (yes/no): ")  # Ask if user wants to continue
#             if next_calculation.lower() != 'yes':  # Check if user wants to continue
#                 break
#         else:
#             print("Invalid input, please choose 1, 2, 3, or 4.")  # Inform user of invalid input

# if __name__ == "__main__":
#     calculator()  # Run the calculator if this script is executed directly