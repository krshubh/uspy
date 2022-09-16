# uspy

sudo apt update

sudo apt -y install git

sudo apt -y install screen

sudo apt -y install python3-pip

curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash -

sudo apt -y install nodejs

echo "alias python=python3" > .bash_aliases

source ~/.bash_aliases

git clone https://github.com/krshubh/uspy.git

cd uspy

pip install virtualenv

python -m virtualenv venv

source venv/bin/activate

pip install -r requirements.txt

screen -d -m -S backend

screen -d -m -S backend bash -c $'source venv/bin/activate;python manage.py makemigrations;python manage.py migrate;python manage.py migrate --run-syncdb;python manage.py runserver 0.0.0.0:8000;'

screen -d -m -S frontend

screen -S frontend -X -p 0 stuff $'source venv/bin/activate'

screen -S frontend -X -p 0 stuff $'cd frontend'

screen -S frontend -X -p 0 stuff $'npm install'

screen -S frontend -X -p 0 stuff $'npm start'
