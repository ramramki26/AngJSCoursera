import spacy
nlp = spacy.load("en_core_web_sm")

### Strictly subject object? Or just relationships?
SUBJECTS = ["nsubj", "nsubjpass", "csubj", "csubjpass", "agent", "expl"]
OBJECTS = ["dobj", "attr", "oprd","pobj"]
text = nlp("")
sentences = list(text.sents)
for doc in sentences:
    relation = ""
    obj = ""
    sub = ""
    
    for token in doc:
        print("{2}({3}-{4}, {0}-{1})".format(token.text, token.tag_, token.dep_, token.head.text, token.head.tag_))
    
    for token in doc:    
        if(token.dep_ == "ROOT"):
            relation = token.text
            break
    for token in doc:
        if token.head.text in relation and token.tag_ in ["RP","IN","VBG","VBN"] and abs(token.head.i - token.i) == 1 :
            if(token.head.i - token.i == -1):
                relation+=" "+token.text
            else:
                relation=token.text+" "+relation
    for token in doc:        
        if(token.dep_ in SUBJECTS and token.head.text in relation):
            sub = token.text
            break
    for token in doc:        
        if(token.dep_ in OBJECTS and token.head.text in relation):
            obj = token.text
            break
    
    if(sub==""):
        for token in doc:
            if(token.dep_ == "advmod"):
                if token.head.text in relation:
                    sub = token.text
                    break

    if(obj==""):
        for token in doc:
            if(token.dep_ == "advmod"):
                if token.head.text in relation:
                    obj = token.text
                    break

    if(obj==""):
        for token in doc:
            if(token.dep_ in OBJECTS):
                if token.tag_ in ["NN","NNS","NNP","NNPS","PRP"]:
                    obj = token.text
                    break

    if(obj==""):
        for token in reversed(doc):
            if(token.dep_ in SUBJECTS and token.text not in sub):
                if token.tag_ in ["NN","NNS","NNP","NNPS","PRP"]:
                    obj = token.text
                    break

    for token in reversed(doc):
        if token.dep_ == "compound":
            if token.head.text in sub:
                sub=token.text+" "+sub
            if token.head.text in obj:
                obj=token.text+" "+obj

    for token in reversed(doc):
        if token.head.text in sub and token.tag_ in ["JJ","JJS","JJR"]:
            sub=token.text+" "+sub
        if token.head.text in obj and token.tag_ in ["JJ","JJS","JJR"]:
            obj=token.text+" "+obj

    for token in doc:
        if token.dep_ == "poss":
            if token.head.text in sub:
                sub=token.text+" "+sub
            if token.head.text in obj:
                obj=token.text+" "+obj

    for token in doc:
        if token.dep_ == "det" and token.text.lower() in ["the","a","an"]:
            if token.head.text in sub:
                sub=token.text+" "+sub
            if token.head.text in obj:
                obj=token.text+" "+obj

    for token in doc:
        if token.dep_ == "neg":
            if token.head.text in relation:
                relation=token.text+" "+relation
            for token in doc:
                if token.dep_ == "aux":
                    if token.head.text in relation:
                        if "'" in relation:
                            relation=token.text+relation
                        else:
                            relation=token.text+" "+relation

    for token in doc:
        if token.dep_ == "conj":
            if token.head.text in sub:
                sub+=", "+token.text
            if token.head.text in obj:
                obj+=", "+token.text

    print({'subject': sub, 'object': obj, 'relationship': relation})
