# Morpion React (Tic-Tac-Toe)

Petit projet React pour jouer au morpion à deux joueurs. Le jeu affiche le plateau 3x3, gère les tours et affiche le gagnant.

## 🚀 Installation

1. Clone le projet :

   ```bash
   git clone https://github.com/ton-utilisateur/morpion-react.git
   cd morpion-react
   ```

2. Installe les dépendances :

   ```bash
   npm install
   ```

3. Lance le projet :

   ```bash
   npm start
   ```

4. Ouvre ton navigateur sur :  
   [http://localhost:3000](http://localhost:3000)

## 🎮 Utilisation

- Clique sur une case pour jouer.
- Les joueurs X et O jouent chacun leur tour.
- Le jeu indique le gagnant quand une ligne est complète.

## 📁 Structure

- `Board` : composant principal du plateau.
- `Square` : composant représentant une case.
- `calculateWinner` : fonction qui vérifie s’il y a un gagnant.
