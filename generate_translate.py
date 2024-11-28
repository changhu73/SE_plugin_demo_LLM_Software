import sys
import time
from zhipuai import ZhipuAI
from langdetect import detect
# Reconfigure stdout encoding to utf-8 to handle non-ASCII characters
sys.stdout.reconfigure(encoding='utf-8')

# Get the code snippet passed from the command line
code_snippet = sys.argv[1]
mode = sys.argv[2]

# Replace with your own API key
client = ZhipuAI(api_key="6a7189b8e74f19128e8b181a70a3b47c.rWOEtdYJR4dwVmnS")


def detect_language(comment):
    """Detect the language of the comment."""
    try:
        lang = detect(comment)
        return lang
    except Exception as e:
        print(f"Language detection failed: {e}")
        return None

def generate_translate(code_snippet, target_language):
    # Prepare the translation prompt based on the target language
    if target_language == 'zh':
        prompt = f"Please translate the following comment to Chinese, only translate the comments with symbols, do not add anything else: \n\n{code_snippet}"
    else:
        prompt = f"Please translate the following comment to English, only translate the comments with symbols, do not add anything else: \n\n{code_snippet}"

    # Send a request to ZhipuAI API with the prompt
    response = client.chat.asyncCompletions.create(
        model="glm-4-flash", 
        messages=[
            {
                "role": "user",
                "content": prompt
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
            comment = result_response.choices[0].message.content
            return comment
        
        time.sleep(2)  # Check the task status every 2 seconds
        get_cnt += 1

    return "Failed to translate the comment or task timed out"

# Determine action based on mode
if mode == 'detect':
    detected_language = detect_language(code_snippet)
    print(detected_language)  # Output detected language
else:
    # Assume mode is 'translate'
    target_language = sys.argv[2]  # This will be 'en' or 'zh'
    translated_comment = generate_translate(code_snippet, target_language)
    print(translated_comment)