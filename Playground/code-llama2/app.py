# Load model directly
from transformers import AutoTokenizer, AutoModelForCausalLM

tokenizer = AutoTokenizer.from_pretrained("codellama/CodeLlama-34b-Instruct-hf")
model = AutoModelForCausalLM.from_pretrained("codellama/CodeLlama-34b-Instruct-hf")


from transformers import AutoTokenizer, AutoModelForCausalLM

# Load the tokenizer
tokenizer = AutoTokenizer.from_pretrained("codellama/CodeLlama-34b-Instruct-hf")

# Load the model
model = AutoModelForCausalLM.from_pretrained("codellama/CodeLlama-34b-Instruct-hf")

# Prompt for text completion
prompt = "To build a successful AI model, you need to understand"
input_ids = tokenizer.encode(prompt, return_tensors="pt")

# Generate text completion
output = model.generate(input_ids, max_length=100, num_return_sequences=1, no_repeat_ngram_size=2)

# Decode and print the generated text
generated_text = tokenizer.decode(output[0], skip_special_tokens=True)
print(generated_text)
