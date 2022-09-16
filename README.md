# uspy

sudo apt update
sudo apt -y install git
sudo apt -y install screen
sudo apt -y install python3-pip
sudo apt -y install npm
npm install -g npm@8.19.2
echo "alias python=python3" > .bash_aliases
source ~/.bash_aliases
git clone git@github.com:krshubh/uspy.git
cd uspy
pip install virtualenv
python -m virtualenv venv
source venv/bin/activate
pip install -r requirements.txt
screen -S backend
source venv/bin/activate
python manage.py makemigrations
python manage.py migrate
python manage.py migrate --run-syncdb
python manage.py runserver 0.0.0.0:8000
ctrl + a + d
screen -S frontend
source venv/bin/activate
cd frontend
npm install
ctrl + a + d



