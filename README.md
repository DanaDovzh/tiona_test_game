# TionaTestGame

A reaction time testing game. This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.6.

## About the Project

**TionaTestGame** is an interactive web-based game built with Angular that tests a player's reaction speed. The game tracks results and saves them to your browser's local storage.

### Key Features:
- 🎮 Interactive game to test reaction speed
- 📊 Results table with game history
- 🕐 Customizable game interval
- 💾 Automatic result storage in local browser storage
- 🎨 UI built with Angular Material


### Installation Steps:

```bash
# Clone the repository
git clone https://github.com/DanaDovzh/tiona_test_game.git

# Navigate to the project directory
cd tiona_test_game

# Install dependencies
npm install
```

## Development

### Starting the Development Server:

```bash
npm start
```

or

```bash
ng serve
```

After the server starts, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any source files.

## GitHub Pages

```bash
npm run github-build    # Build for GitHub Pages
npm run github-deploy   # Deploy to GitHub Pages
```

## Tech Stack

- Angular (standalone components)
- RxJS
- Angular Material

## How to Play 🎮

1. Click the **"Start Game"** button on the main page
2. Wait for the cells to change color 🟦 -> 🟨
3. Click on the cell as quickly as possible after the color change
4. Your result will be recorded in the results table
5. Results are automatically saved in your browser
6. The first to reach 10 points wins the game 🏆
> 💡 **Note:**  
> You can customize the time interval between cell changes (in milliseconds) using the input field before starting the game.

## 🎮 [Live Demo](https://danadovzh.github.io/tiona_test_game/ "Open the deployed game")

