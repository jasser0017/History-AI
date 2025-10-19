from __future__ import annotations

from typing import Tuple
from app.core.config import settings

try:
    import google.generativeai as genai
    _HAS_GEMINI=True
except Exception:
    _HAS_GEMINI=False

SYSTEM_DEFAULT = (
    "Tu es un historien impartial. Structure en sections (Résumé, Contexte, Chronologie, Acteurs, "
    "Conséquences, Lectures suggérées). Cite explicitement des sources si possible."
)


def _init_gemini():
    if not settings.gemini_enabled() or not _HAS_GEMINI:
        return None
    genai.configure(api_key=settings.gemini_api_key)
    return genai.GenerativeModel(settings.gemini_model)

def generate_blog(
    title: str,
    system_prompt: str | None,
    topics: list[str] | None,
) -> Tuple[str, list[str]]:
   
    sys_prompt = system_prompt or SYSTEM_DEFAULT
    topics = topics or []
    model = _init_gemini()

    prompt = f"""
Système: {sys_prompt}

Titre: {title}
Sujets à couvrir: {', '.join(topics) if topics else 'libre'}
Tâche: Rédige un article Markdown neutre et factuel.
Inclure: Résumé, Contexte, Chronologie, Acteurs, Conséquences, Lectures suggérées.
    """.strip()

    resp = model.generate_content(prompt)  
    content = (resp.text or "").strip()
    '''
    else:
       
        content = (
            f"# {title}\n\n"
            f"**Résumé.** Brouillon (fallback dev).\n\n"
            f"## Chronologie\n- Entrée 1\n- Entrée 2\n\n"
            f"## Acteurs\n- A\n- B\n\n"
            f"## Conséquences\n- ...\n\n"
            f"## Lectures suggérées\n- ...\n"
        )
    '''
   
    kw = set(topics or [])
    for w in (title or "").split():
        if len(w) > 3:
            kw.add(w.lower())
    return content, sorted(kw)


def copilot_answer(question: str, context: str) -> str:
    model = _init_gemini()
    user = f"Contexte:\n{context}\n\nQuestion: {question}\nRéponds de manière claire et factuelle."
    if model:
        return (model.generate_content(user).text or "").strip() 
    return "(Réponse simulée – fournissez GEMINI_API_KEY pour activer le modèle.)"


def bias_judge(text: str) -> tuple[float, str]:
    """
    Analyse un texte avec Gemini pour détecter un biais potentiel.
    Retourne un score estimé de biais (0 = neutre, 1 = très biaisé) + explication.
    """

    model = _init_gemini()

    if not model:
        # Fallback si Gemini n'est pas disponible
        return 0.0, "Analyse IA désactivée. Gemini non disponible dans cet environnement."

    # Prompt envoyé à Gemini
    prompt = f"""
Tu es un expert en journalisme et communication.
Analyse le texte suivant et indique :
1. S'il présente un biais (politique, émotionnel, idéologique, etc.)
2. Attribue un score de biais entre 0.0 (neutre) et 1.0 (très biaisé)
3. Donne une explication claire et objective

Texte :
{text}
"""

    try:
        response = model.generate_content(prompt)
        result = response.text.strip() if response.text else ""

       
        import re
        match = re.search(r'([01](?:\.\d+)?)', result)
        score = float(match.group(1)) if match else 0.5  

        return score, result

    except Exception as e:
        return 0.0, f"Erreur lors de l’analyse IA : {str(e)}"



if __name__ == "__main__":
    model=_init_gemini()
    p=generate_blog(title="the arabic spring",system_prompt="your an expert historien, please in english",topics=[])
    p1=copilot_answer(question="quelles sont les raisons de guerre of 1967",,context="Réponds de manière claire et factuelle")
    print(p1)