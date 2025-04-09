import os

# File and folder structure (relative to repo root)
paths = [
    "index.html",
    "form.html",
    "card.html",
    "js/form.js",
    "js/card.js",
    "js/qrcode.min.js",
    "assets/logo.png",        # Placeholder file
    "assets/qr/",             # Folder for saved/generated QR codes
    "supabase/config.js"
]

def create_structure(base_path="."):
    for path in paths:
        full_path = os.path.join(base_path, path)
        if path.endswith("/"):  # It's a folder
            os.makedirs(full_path, exist_ok=True)
        else:  # It's a file
            os.makedirs(os.path.dirname(full_path), exist_ok=True)
            with open(full_path, "w", encoding="utf-8") as f:
                f.write("")  # Create empty file

if __name__ == "__main__":
    create_structure()
    print("✅ Project structure created directly in the current directory!")
