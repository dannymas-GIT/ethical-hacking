@echo off
echo 🛠️ Setting up development environment...

:: Create necessary directories
mkdir frontend\src\components 2>nul
mkdir frontend\src\pages 2>nul
mkdir frontend\src\types 2>nul
mkdir backend\app 2>nul

:: Install frontend dependencies
cd frontend
call npm install
cd ..

:: Create Python virtual environment
python -m venv backend\venv

:: Activate virtual environment and install dependencies
call backend\venv\Scripts\activate
cd backend
pip install -r requirements.txt
cd ..

echo ✅ Setup complete! 