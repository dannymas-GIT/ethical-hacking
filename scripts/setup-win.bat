@echo off
echo 🛠️ Setting up development environment...

:: Install frontend dependencies
cd frontend
call npm install
cd ..

:: Install Python dependencies
python -m venv venv
call venv\Scripts\activate
cd backend
pip install -r requirements.txt
cd ..

:: Create necessary directories
mkdir frontend\src\pages 2>nul
mkdir frontend\src\components 2>nul
mkdir frontend\src\types 2>nul

:: Create the pages
echo Creating pages...
copy nul frontend\src\pages\ProgressPage.tsx
copy nul frontend\src\pages\ResourcesPage.tsx
copy nul frontend\src\pages\LabsPage.tsx
copy nul frontend\src\pages\ToolsPage.tsx

echo ✅ Setup complete! 