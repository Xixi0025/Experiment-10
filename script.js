// PokeAPI Base URL
const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

// Type Colors for Pokemon Types
const TYPE_COLORS = {
  normal: '#A8A878',
  fire: '#F08030',
  water: '#6890F0',
  electric: '#F8D030',
  grass: '#78C850',
  ice: '#98D8D8',
  fighting: '#C03028',
  poison: '#A040A0',
  ground: '#E0C068',
  flying: '#A890F0',
  psychic: '#F85888',
  bug: '#A8B820',
  rock: '#B8A038',
  ghost: '#705898',
  dragon: '#7038F8',
  dark: '#705848',
  steel: '#B8B8D0',
  fairy: '#EE99AC'
};

// DOM Elements
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const loadingIndicator = document.getElementById('loading');
const errorMessage = document.getElementById('errorMessage');
const resultsContainer = document.getElementById('resultsContainer');

// Event Listeners
searchBtn.addEventListener('click', handleSearch);
searchInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    handleSearch();
  }
});

/**
 * Handle the search action
 */
function handleSearch() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  
  if (!searchTerm) {
    showError('Please enter a Pokémon name or ID');
    return;
  }
  
  fetchPokemonData(searchTerm);
}

/**
 * Fetch Pokemon data from PokeAPI using async/await
 * @param {string} nameOrId - Pokemon name or ID to search for
 */
async function fetchPokemonData(nameOrId) {
  // Clear previous results and errors
  clearResults();
  clearError();
  
  // Show loading state
  showLoading();
  
  try {
    // Make the API request
    const response = await fetch(`${POKEAPI_BASE_URL}/${nameOrId}`);
    
    // Check if the response is successful
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Pokémon not found. Please check the name or ID and try again.');
      }
      throw new Error('Failed to fetch Pokémon data. Please try again later.');
    }
    
    // Parse the JSON response
    const pokemonData = await response.json();
    
    // Hide loading and display the Pokemon data
    hideLoading();
    displayPokemonData(pokemonData);
    
  } catch (error) {
    // Handle errors
    hideLoading();
    showError(error.message);
    console.error('Error fetching Pokemon data:', error);
  }
}

/**
 * Display the fetched Pokemon data
 * @param {Object} data - Pokemon data from the API
 */
function displayPokemonData(data) {
  // Extract the required data
  const name = capitalizeFirstLetter(data.name);
  const id = data.id;
  const image = data.sprites.other['official-artwork'].front_default || data.sprites.front_default;
  const types = data.types;
  const abilities = data.abilities;
  const height = (data.height / 10).toFixed(1); // Convert from decimeters to meters
  const weight = (data.weight / 10).toFixed(1); // Convert from hectograms to kilograms
  const baseExperience = data.base_experience;
  const stats = data.stats;
  
  // Create the Pokemon card HTML
  const pokemonCardHTML = `
    <div class="pokemon-card">
      <div class="pokemon-header">
        <div class="pokemon-title">
          <h2 class="pokemon-name">${name}</h2>
          <span class="pokemon-id">#${String(id).padStart(3, '0')}</span>
        </div>
        <div class="pokemon-types">
          ${types.map(typeInfo => `
            <span class="type-badge" style="background-color: ${TYPE_COLORS[typeInfo.type.name]}">
              ${typeInfo.type.name}
            </span>
          `).join('')}
        </div>
      </div>
      
      <div class="pokemon-content">
        <div class="pokemon-image-section">
          <img src="${image}" alt="${name}" class="pokemon-image">
        </div>
        
        <div class="pokemon-details">
          <div class="detail-group">
            <div class="detail-label">Height</div>
            <div class="detail-value">${height} m</div>
          </div>
          
          <div class="detail-group">
            <div class="detail-label">Weight</div>
            <div class="detail-value">${weight} kg</div>
          </div>
          
          <div class="detail-group">
            <div class="detail-label">Base Experience</div>
            <div class="detail-value">${baseExperience}</div>
          </div>
          
          <div class="detail-group">
            <div class="detail-label">Abilities</div>
            <div class="abilities-list">
              ${abilities.map(abilityInfo => `
                <span class="ability-item">${capitalizeFirstLetter(abilityInfo.ability.name)}</span>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
      
      <div class="pokemon-stats">
        <h3 class="stats-title">Base Stats</h3>
        ${stats.map(statInfo => {
          const statName = formatStatName(statInfo.stat.name);
          const statValue = statInfo.base_stat;
          const percentage = (statValue / 255) * 100; // Max stat is typically 255
          
          return `
            <div class="stat-item">
              <span class="stat-name">${statName}</span>
              <div class="stat-bar">
                <div class="stat-fill" style="width: ${percentage}%">
                  <span class="stat-value">${statValue}</span>
                </div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
  
  // Insert the HTML into the results container
  resultsContainer.innerHTML = pokemonCardHTML;
  resultsContainer.classList.remove('hidden');
}

/**
 * Show loading indicator
 */
function showLoading() {
  loadingIndicator.classList.remove('hidden');
  searchBtn.disabled = true;
}

/**
 * Hide loading indicator
 */
function hideLoading() {
  loadingIndicator.classList.add('hidden');
  searchBtn.disabled = false;
}

/**
 * Show error message
 * @param {string} message - Error message to display
 */
function showError(message) {
  errorMessage.textContent = message;
  errorMessage.classList.remove('hidden');
}

/**
 * Clear error message
 */
function clearError() {
  errorMessage.textContent = '';
  errorMessage.classList.add('hidden');
}

/**
 * Clear previous results
 */
function clearResults() {
  resultsContainer.innerHTML = '';
  resultsContainer.classList.add('hidden');
}

/**
 * Capitalize the first letter of a string
 * @param {string} str - String to capitalize
 * @returns {string} Capitalized string
 */
function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Format stat names for better display
 * @param {string} statName - Stat name from API
 * @returns {string} Formatted stat name
 */
function formatStatName(statName) {
  const statNameMap = {
    'hp': 'HP',
    'attack': 'Attack',
    'defense': 'Defense',
    'special-attack': 'Sp. Attack',
    'special-defense': 'Sp. Defense',
    'speed': 'Speed'
  };
  
  return statNameMap[statName] || capitalizeFirstLetter(statName);
}

// Initialize: Focus on search input when page loads
window.addEventListener('load', () => {
  searchInput.focus();
});