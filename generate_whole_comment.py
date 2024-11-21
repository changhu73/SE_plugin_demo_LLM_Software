import sys
import time
from zhipuai import ZhipuAI

# Reconfigure stdout encoding to utf-8 to handle non-ASCII characters
sys.stdout.reconfigure(encoding='utf-8')

# Get the code snippet passed from the command line
code_snippet = sys.argv[1]

# Replace with your own API key
client = ZhipuAI(api_key="6a7189b8e74f19128e8b181a70a3b47c.rWOEtdYJR4dwVmnS")

def generate_whole_comment(code_snippet):
    # Send a request to ZhipuAI API to provide a summary of the code's overall functionality
    response = client.chat.asyncCompletions.create(
        model="glm-4-flash",  # Use the glm-4 model
        messages=[
            {
                "role": "user",
                "content": f"Please comment on the following code as a whole, each line in your comment begins with the vscode comment symbol corresponding to the language in which the code you are commenting is written, You need to give me an overall comment instead of commenting on each line of code, and automatically wrap lines based on comment length, each line should be no more than fifteen words:  \n\n{code_snippet}"
            }
        ]
    )

    task_id = response.id  # Get the task ID
    task_status = ''
    get_cnt = 0

    # Wait for the task to complete, checking up to 40 times
    while task_status != 'SUCCESS' and task_status != 'FAILED' and get_cnt <= 40:
        result_response = client.chat.asyncCompletions.retrieve_completion_result(id=task_id)
        
        # Get the task status
        task_status = result_response.task_status  

        if task_status == 'SUCCESS':
            # If the task is successful, get the generated comment
            comment = result_response.choices[0].message.content  # Use .content to access the result
            return comment
        
        time.sleep(2)  # Check the task status every 2 seconds
        get_cnt += 1

    # If the task is not completed after 40 checks, return a failure message
    return "Failed to generate a global comment for the entire code or task timed out"

# Generate the comment
comment = generate_whole_comment(code_snippet)
# Print the generated comment
print(comment)