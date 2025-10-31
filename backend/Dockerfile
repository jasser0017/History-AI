
#image de base 
FROM python:3.11-slim


#python , par défault, quand il excute le code,cree un fichier .pyc
#(un fichier "compilé",une version rapide, ce sont des fichiers qui 
#seront enrigistrés, don on put pas q'elle soit dans notre conteneur)

#concernant les logs, les erreurs, python les garde en memoire pendant
#un moment, puis les affiche tous en meme temps,mais nous voulans une
#interaction en temps reel.
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1


# 3. Installer Poetry dans le conteneur 
#apt-get est un gestionnaire de paquet (on va mettre a jur cette outil pour ne pas installer une version aberante)
# install -y curl (curl est un outil qui nous permet de telecharger  des fichiers en ligne (internet))
# (-s: silencieux (pas de barre de chargement),-S(ffiche les erreurs sil existaient))
#quand poetry va etre telacharger , elle va etre placer dans (/root/.local/bin/), donc on va
#creer un lien avel path pour nous ouvons ecrire "poetry dans le termianl"
#nettoyer l'image docker file aprés l'instalation en vidant le cache 
RUN apt-get update && apt-get install -y curl && \ 
    curl -sSL https://install.python-poetry.org | python3 - && \
    ln -s /root/.local/bin/poetry /usr/local/bin/poetry && \
    apt-get clean && rm -rf /var/lib/apt/lists/*


#4 on va definir le dossier de travail

WORKDIR /app
#5 on va copier les fichiers pyproject.toml et poetry.lock dans l'image docker plus
#précisement dans le reperoire de travail app
COPY pyproject.toml poetry.lock /app/

#ici , on va demander a poetry de ne pas creer une environnement virtuelle (cree par default)
#puisque le contenur q'on va le creer est deja isolé
RUN poetry config virtualenvs.create false
#on va installer tous les dépendences  défini dans pyproject.toml
RUN poetry install --no-root

COPY app /app/app

EXPOSE 8000
#le serveur pour laner une app FastAPI,donc il va chercher un paquet dont il contient
#un fichier main.py au sein de lui un variable app=fastAPI(), tous les adrees IP sont
#disponibles
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]

