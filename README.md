# Pokémon API Explorer

A simple web application that fetches real-time Pokémon data from the PokeAPI and displays it dynamically on the web page.

## 🚀 Quick Start

### How to Run
1. Clone or download this repository
2. Open `index.html` in your web browser
3. Done! No installation or setup required

### How to Use
1. Enter a Pokémon name (e.g., `pikachu`, `charizard`) or its ID number (e.g., `25`, `6`)
2. Click the "Search" button or press Enter
3. View the Pokémon's complete information

## 📊 What Gets Displayed

- **Name & ID** - Pokémon identifier
- **Image** - Official artwork from PokeAPI
- **Type(s)** - Color-coded type badges
- **Height & Weight** - Physical dimensions
- **Abilities** - All special abilities
- **Experience** - Base experience points
- **Stats** - Complete stat breakdown (HP, Attack, Defense, Sp. Atk, Sp. Def, Speed) with visual bars

## 💻 Technologies

- **HTML5** - Page structure
- **CSS3** - Modern styling with gradients and animations
- **JavaScript (ES6+)** - Fetch API with async/await for data fetching
- **PokeAPI** - Free REST API (no authentication needed)

## 🔧 Key Features

- ✨ Search by Pokémon name or ID
- 🎨 Clean, responsive design
- ⚡ Real-time API data fetching
- 🛡️ Error handling for invalid searches
- 📱 Works on mobile and desktop

## 📁 File Structure

```
├── index.html    # Main HTML page
├── style.css     # All styling
├── script.js     # Fetch logic and DOM manipulation
└── README.md     # This file
```

## 🎓 Learning Concepts Demonstrated

- Fetch API with async/await
- JSON parsing
- Dynamic HTML element creation
- Error handling and loading states
- Asynchronous JavaScript programming

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| "Pokémon not found" | Check spelling (e.g., "charizard" not "char") or use ID number |
| Image not loading | Check internet connection |
| Nothing happens on search | Open browser console (F12) to check for errors |

## 🌐 API Documentation

**PokeAPI** - https://pokeapi.co/docs/v2
- No API key required
- Free to use
- Endpoint: `/pokemon/{name or id}`

## 📝 Example Searches

| Search | Result |
|--------|--------|
| `pikachu` | Electric-type Pokémon #25 |
| `25` | Returns Pikachu |
| `dragonite` | Dragon/Flying-type Pokémon #149 |
| `6` | Returns Charizard |

## 📚 Resources

- [MDN Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [JavaScript Async/Await](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Promises)
- [PokeAPI Docs](https://pokeapi.co/docs/v2)

## 💡 Tip

Try these popular Pokémon: pikachu, charizard, dragonite, mewtwo, lugia, or their ID numbers (1-999)

---

**Status**: ✅ Fully Functional | **No Dependencies** | **No Installation Required**
