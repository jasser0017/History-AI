#Base => défini par SQLAlchemy:définir les table dans la base
#BaseModel => défini par Pydantic pour définir les schémas (validation des donnés d'entrés/sortie)

#SQLAlchemy: démarre automatiquement les transactions avec la base de donnés(implicitement), mais en peut le rendre explicit(manuelle), lorsque on veut plus de controle,gérer les erreurs,gerer des programmes complexes.

#PRAGMA  table_info : SQLAchemy interroge SQLlite pour demander la structure de la table (est une commande spéciale pour inspecter une table)

#[raw sql] (), suit immédiatement la requete précedente, elle montre que ORM n'est pas construit par ORM,mais une requette sql.

#Gnerator: est une fonction spéciale qui ne retourne directement une valeur, mais peut produire plusieurs valeurs, une a une , un fois qu'on demande.yield met la fonction en pause, peut retourner plusieurs valeurs au fil du temps et peut etre repris plusieurs fois, alors return ne peut pas applé q'une seul fois et arrete completement la fonction

#APIRouter, un outil de FASTAPI  qui nous permet d'organiser les routes
d'une maniére modilaire et hiéarchique au niveau local (module spécifique) et au niveau globale (application)

#Querry():elle sert a déclarer un parametre de requette HTTP avec des options de validation