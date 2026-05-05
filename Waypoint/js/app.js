/* ============================================
   WanderWise AI - JavaScript Application
   
   A beginner-friendly JavaScript file with
   clear sections and helpful comments!
   
   TABLE OF CONTENTS:
   1. Configuration (Backend API Endpoint)
   2. Data (Featured Destinations)
   3. DOM Elements (References to HTML elements)
   4. Initialization (App startup)
   5. Navigation & View Switching
   6. Destination Cards (Rendering & Interaction)
   7. AI Itinerary Generation (Backend API Integration)
   8. LocalStorage (Save & Load Trips)
   9. Utility Functions (Date Formatting, Logging)
   ============================================ */

// ============================================
// 1. CONFIGURATION
//
// Backend API endpoint for secure AI integration.
// The API key is now safely stored in the backend,
// not exposed in the frontend code.
// ============================================

// const API_ENDPOINT = "https://wander-wise-demo.vercel.app/api/generate-itinerary";
const API_ENDPOINT = "/api/generate-itinerary";

// ============================================
// 2. DATA - Featured Destinations
//
// An array of objects containing destination info.
// Each object has: id, name, description, image, tag
// ============================================

const featuredDestinations = [
  {
    id: 1,
    name: "Bali, Indonesia",
    description: "Tropical paradise with stunning beaches, ancient temples, lush rice terraces, and vibrant cultural experiences.",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
    tag: "🏝️ Tropical",
  },
  {
    id: 2,
    name: "Tokyo, Japan",
    description: "A fascinating blend of ultra-modern technology and traditional culture, from neon-lit streets to serene shrines.",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80",
    tag: "🏙️ Urban",
  },
  {
    id: 3,
    name: "Paris, France",
    description: "The city of love, art, and gastronomy featuring iconic landmarks, world-class museums, and romantic ambiance.",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80",
    tag: "🗼 Romantic",
  },
  {
    id: 4,
    name: "Iceland",
    description: "Land of fire and ice with dramatic volcanic landscapes, powerful waterfalls, geysers, and northern lights.",
    image: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=800&q=80",
    tag: "❄️ Adventure",
  },
];

// ============================================
// 3. DOM ELEMENTS
//
// We store references to HTML elements we'll use
// frequently. This is more efficient than calling
// document.getElementById() every time!
// ============================================

const elements = {
  // ----- Navigation Elements -----
  navLinks: document.querySelectorAll(".nav-link"),

  // ----- View Sections -----
  views: document.querySelectorAll(".view"),
  exploreView: document.getElementById("explore-view"),
  savedView: document.getElementById("saved-view"),

  // ----- Explore View -----
  destinationsGrid: document.getElementById("destinations-grid"),

  // ----- Hero Quick Planner -----
  heroForm: document.getElementById("quick-planner-form"),
  heroDestination: document.getElementById("hero-destination"),
  heroDays: document.getElementById("hero-days"),
  heroBudget: document.getElementById("hero-budget"),
  heroInterests: document.getElementById("hero-interests"),
  btnGenerateHero: document.getElementById("btn-generate-hero"),

  // ----- Modal Elements -----
  plannerModal: document.getElementById("planner-modal"),
  modalClose: document.getElementById("modal-close"),
  btnOpenPlanner: document.getElementById("btn-open-planner"),
  floatingAiBtn: document.getElementById("floating-ai-btn"),
  emptyStartPlanning: document.getElementById("empty-start-planning"),
  btnNew: document.getElementById("btn-new"),
  plannerFormContainer: document.getElementById("planner-form-container"),

  // ----- Planner Form (inside modal) -----
  plannerForm: document.getElementById("planner-form"),
  destinationInput: document.getElementById("destination"),
  daysInput: document.getElementById("days"),
  budgetInput: document.getElementById("budget"),
  interestsInput: document.getElementById("interests"),
  btnGenerate: document.getElementById("btn-generate"),

  // ----- Result Display -----
  resultContainer: document.getElementById("result-container"),
  itineraryResult: document.getElementById("itinerary-result"),
  btnSave: document.getElementById("btn-save"),

  // ----- Saved Trips -----
  savedTripsList: document.getElementById("saved-trips-list"),
  emptyState: document.getElementById("empty-state"),

  // ----- Loader -----
  loaderOverlay: document.getElementById("loader-overlay"),
};

// ============================================
// 4. INITIALIZATION
//
// This function runs when the page first loads.
// It sets everything up for the user.
// ============================================

function init() {
  console.log("🌍 WanderWise AI Initialized!");
  console.log("Welcome to your AI-powered travel planner.");

  // Step 1: Render destination cards on the Explore page
  renderDestinations();

  // Step 2: Set up all event listeners (clicks, form submit, etc.)
  setupEventListeners();

  // Step 3: Load any saved trips from localStorage
  loadSavedTrips();
}

// Run the init function when the DOM is fully loaded
// This ensures all HTML elements exist before we try to use them
document.addEventListener("DOMContentLoaded", init);

// ============================================
// 5. NAVIGATION & VIEW SWITCHING
//
// Functions to handle switching between the
// different views (Explore, AI Planner, Saved Trips)
// ============================================

/**
 * Set up all event listeners for the application.
 * Called once during initialization.
 */
function setupEventListeners() {
  // ----- Navbar Navigation Clicks -----
  elements.navLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const viewName = link.dataset.view;
      if (viewName) {
        switchView(viewName);
        // Update active state
        elements.navLinks.forEach((l) => l.classList.remove("active"));
        link.classList.add("active");
      }
    });
  });

  // ----- Modal Open Buttons -----
  if (elements.btnOpenPlanner) {
    elements.btnOpenPlanner.addEventListener("click", openPlannerModal);
  }
  if (elements.floatingAiBtn) {
    elements.floatingAiBtn.addEventListener("click", openPlannerModal);
  }
  if (elements.emptyStartPlanning) {
    elements.emptyStartPlanning.addEventListener("click", openPlannerModal);
  }

  // ----- Modal Close -----
  if (elements.modalClose) {
    elements.modalClose.addEventListener("click", closePlannerModal);
  }
  if (elements.plannerModal) {
    elements.plannerModal.addEventListener("click", function (e) {
      if (e.target === elements.plannerModal) {
        closePlannerModal();
      }
    });
  }

  // ----- New Trip Button (in result view) -----
  if (elements.btnNew) {
    elements.btnNew.addEventListener("click", resetPlannerForm);
  }

  // ----- Hero Quick Planner Form (Main Form) -----
  if (elements.heroForm) {
    elements.heroForm.addEventListener("submit", handleHeroFormSubmit);
  }

  // ----- Planner Form (Modal - Keep for "AI Planner" button) -----
  if (elements.plannerForm) {
    elements.plannerForm.addEventListener("submit", handleFormSubmit);
  }

  // ----- Save Trip Button -----
  if (elements.btnSave) {
    elements.btnSave.addEventListener("click", saveCurrentTrip);
  }

  // ----- Mobile Menu Toggle -----
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const navMenu = document.querySelector(".nav-menu");

  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener("click", function (e) {
      e.stopPropagation(); // Prevent event bubbling
      navMenu.classList.toggle("mobile-active");
      mobileMenuBtn.classList.toggle("active");
      console.log("📱 Mobile menu toggled");
    });

    // Close mobile menu when clicking on a link
    elements.navLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        navMenu.classList.remove("mobile-active");
        mobileMenuBtn.classList.remove("active");
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener("click", function (e) {
      if (!navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        navMenu.classList.remove("mobile-active");
        mobileMenuBtn.classList.remove("active");
      }
    });
  }

  // ----- Filter Pills (Quick Select Cities) -----
  const filterPills = document.querySelectorAll(".filter-pill");

  filterPills.forEach(function (pill) {
    pill.addEventListener("click", function () {
      // Get destination from data attribute
      const destination = pill.dataset.destination;

      // Fill destination input
      if (elements.heroDestination) {
        elements.heroDestination.value = destination;
      }

      // Update active state
      filterPills.forEach((p) => p.classList.remove("active"));
      pill.classList.add("active");

      // Focus on days input (next field)
      if (elements.heroDays) {
        elements.heroDays.focus();
      }

      console.log("🏙️ Selected destination:", destination);
    });
  });
}

/**
 * Open the AI Planner modal
 * Always show FORM and hide RESULT when opening from button
 */
function openPlannerModal() {
  // Open modal
  if (elements.plannerModal) {
    elements.plannerModal.classList.add("active");
    document.body.style.overflow = "hidden"; // Prevent background scroll
  }

  // Show form container, hide result container
  if (elements.plannerFormContainer) {
    elements.plannerFormContainer.classList.remove("hidden");
  }
  if (elements.resultContainer) {
    elements.resultContainer.classList.add("hidden");
  }

  console.log("📋 Planner modal opened - showing form");
}

/**
 * Close the AI Planner modal
 */
function closePlannerModal() {
  elements.plannerModal.classList.remove("active");
  document.body.style.overflow = ""; // Restore scroll
  console.log("📋 Planner modal closed");
}

/**
 * Reset the planner form to show form again (hide results)
 */
function resetPlannerForm() {
  // Hide result container
  if (elements.resultContainer) {
    elements.resultContainer.classList.add("hidden");
  }

  // Show form container
  if (elements.plannerFormContainer) {
    elements.plannerFormContainer.classList.remove("hidden");
  }

  // Reset form fields
  if (elements.plannerForm) {
    elements.plannerForm.reset();
  }

  // Clear current trip
  window.currentTrip = null;

  console.log("🔄 Planner form reset - showing form again");
}

/**
 * Switch to a different view (Explore or Saved)
 * @param {string} viewName - The name of the view to show
 */
function switchView(viewName) {
  // Hide all views
  elements.views.forEach(function (view) {
    view.classList.remove("active");
  });

  // Show the target view
  const targetView = document.getElementById(viewName + "-view");
  if (targetView) {
    targetView.classList.add("active");
  }

  // Update navigation active state
  elements.navLinks.forEach(function (link) {
    if (link.dataset.view === viewName) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  console.log("📍 Switched to view:", viewName);
}

// ============================================
// 6. DESTINATION CARDS
//
// Functions to render the destination cards
// and handle clicking on them.
// ============================================

/**
 * Render all destination cards in the grid.
 * Uses the featuredDestinations array.
 */
function renderDestinations() {
  // Clear any existing content
  elements.destinationsGrid.innerHTML = "";

  // Loop through each destination and create a card
  featuredDestinations.forEach(function (destination) {
    const card = createDestinationCard(destination);
    elements.destinationsGrid.appendChild(card);
  });

  console.log("🗺️ Rendered", featuredDestinations.length, "destination cards");
}

/**
 * Create a single destination card element.
 * @param {Object} destination - The destination data object
 * @returns {HTMLElement} - The card element
 */
function createDestinationCard(destination) {
  // Create the card container
  const card = document.createElement("div");
  card.className = "destination-card";

  // Extract city and country
  const [city, country] = destination.name.split(", ");

  // Set the inner HTML with clean design
  card.innerHTML = `
        <div class="destination-image-container">
            <img 
                src="${destination.image}" 
                alt="${destination.name}" 
                class="destination-image"
                loading="lazy"
            >
            <span class="destination-tag">${destination.tag}</span>
        </div>
        <div class="destination-info">
            <p class="destination-route">Your City → ${city}</p>
            <h3 class="destination-name">${destination.name}</h3>
            <p class="destination-dates">Explore with AI Planner</p>
            <div class="destination-price">
                <span class="price-label">From</span>
                <span class="price-value">AI Trip</span>
            </div>
        </div>
    `;

  // Add click event - open planner modal with destination pre-filled
  card.addEventListener("click", function () {
    // Extract just the city name (before the comma)
    const cityName = destination.name.split(",")[0];

    // Pre-fill the modal form
    elements.destinationInput.value = cityName;
    elements.heroDestination.value = cityName;

    // Open the planner modal
    openPlannerModal();

    // Focus on the days input
    elements.daysInput.focus();

    console.log("🎯 Pre-filled destination:", cityName);
  });

  return card;
}

// ============================================
// 7. AI ITINERARY GENERATION
//
// Functions to handle form submission and
// communicate with the Gemini AI API.
// ============================================

/**
 * Handle the planner form submission.
 * @param {Event} event - The form submit event
 */
async function handleFormSubmit(event) {
  // Prevent the default form submission (page reload)
  event.preventDefault();

  // ----- Get Form Values -----
  const destination = elements.destinationInput.value.trim();
  const days = elements.daysInput.value;
  const budget = elements.budgetInput.value;
  const interests = elements.interestsInput.value.trim() || "general sightseeing and local experiences";

  console.log("📝 Form submitted:", { destination, days, budget, interests });

  // ----- Show Loading State -----
  showLoader();
  elements.btnGenerate.classList.add("loading");
  elements.btnGenerate.disabled = true;
  elements.resultContainer.classList.add("hidden");

  try {
    // ----- Call the AI API -----
    const itinerary = await generateItinerary(destination, days, budget, interests);

    // ----- Hide Form & Display the Result -----
    elements.plannerFormContainer.style.display = "none";
    elements.itineraryResult.innerHTML = itinerary;
    elements.resultContainer.classList.remove("hidden");

    // ----- Store Current Trip for Saving -----
    window.currentTrip = {
      destination: destination,
      days: days,
      budget: budget,
      interests: interests,
      itinerary: itinerary,
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
    };

    console.log("✅ Itinerary generated successfully!");
  } catch (error) {
    // ----- Handle Errors -----
    console.error("❌ Error generating itinerary:", error);

    // Check if it's a rate limit error
    let errorMessage = "";
    if (error.message.includes("429")) {
      errorMessage = `
                <div style="text-align: center; padding: 40px;">
                    <span style="font-size: 48px; display: block; margin-bottom: 16px;">⏳</span>
                    <h3 style="color: #f59e0b; margin-bottom: 8px;">Rate Limit Exceeded</h3>
                    <p style="color: #94a3b8;">
                        Too many requests! Please wait <strong>1-2 minutes</strong> and try again.<br><br>
                        <small>This happens when the API receives too many requests in a short time.</small>
                    </p>
                </div>
            `;
    } else {
      errorMessage = `
                <div style="text-align: center; padding: 40px;">
                    <span style="font-size: 48px; display: block; margin-bottom: 16px;">😢</span>
                    <h3 style="color: #ef4444; margin-bottom: 8px;">Oops! Something went wrong</h3>
                    <p style="color: #94a3b8;">
                        Please check your API key and try again.<br>
                        Make sure you have a valid Gemini API key configured.
                    </p>
                </div>
            `;
    }

    elements.itineraryResult.innerHTML = errorMessage;
    elements.resultContainer.classList.remove("hidden");
  } finally {
    // ----- Remove Loading State -----
    // This runs whether there was an error or not
    hideLoader();
    elements.btnGenerate.classList.remove("loading");
    elements.btnGenerate.disabled = false;
  }
}

/**
 * Generate an itinerary using the secure backend API.
 *
 * IMPORTANT: This function demonstrates "Separation of Concerns" - a key software principle.
 * The backend handles:
 *   - Calling the Gemini AI API (with secure API key)
 *   - Converting Markdown to HTML (parseMarkdown)
 *   - Error handling and validation
 *
 * The frontend (this function) only:
 *   - Sends the user's trip preferences
 *   - Receives the formatted HTML
 *   - Displays it to the user
 *
 * This is a PROFESSIONAL pattern that:
 *   ✅ Keeps API keys secure (not exposed in browser)
 *   ✅ Avoids duplicate logic (DRY principle)
 *   ✅ Makes code easier to maintain
 *   ✅ Separates backend and frontend responsibilities
 *
 * @param {string} destination - The travel destination
 * @param {string} days - Number of days
 * @param {string} budget - Budget level (budget/moderate/luxury)
 * @param {string} interests - User's interests (used as 'style' in backend)
 * @returns {Promise<string>} - The generated itinerary HTML (already formatted by backend!)
 */
async function generateItinerary(destination, days, budget, interests) {
  console.log("🤖 Calling Backend API...");
  console.log("📝 Parameters:", { destination, days, budget, style: interests });

  // ----- Make the API Request to Backend -----
  const response = await fetch(API_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      destination: destination,
      days: parseInt(days),
      budget: budget,
      style: interests || "general sightseeing and local experiences",
    }),
  });

  // ----- Parse the Response -----
  const data = await response.json();

  // ----- Check if Request was Successful -----
  if (!response.ok || !data.success) {
    console.error("❌ Backend Error:", data.error);

    // Check for specific error types
    if (response.status === 429) {
      throw new Error("429");
    }

    throw new Error(data.error || "Failed to generate itinerary");
  }

  console.log("✅ Received itinerary from backend");

  // The backend already returns fully formatted HTML!
  // No need to call parseMarkdown() or any other processing.
  // We can directly use this HTML in our page.
  // This is an example of "Separation of Concerns" - backend handles processing,
  // frontend handles display.
  return data.itinerary;
}

/**
 * Handle the HERO form submission.
 * Generate itinerary and show result directly in MODAL (not inline).
 * @param {Event} event - The form submit event
 */
async function handleHeroFormSubmit(event) {
  // Prevent the default form submission (page reload)
  event.preventDefault();

  // ----- Get Form Values from Hero Form -----
  const destination = elements.heroDestination.value.trim();
  const days = elements.heroDays.value;
  const budget = elements.heroBudget.value;
  const interests = elements.heroInterests.value.trim() || "general sightseeing and local experiences";

  console.log("📝 Hero form submitted:", { destination, days, budget, interests });

  // ----- Show Loading State on Button -----
  if (elements.btnGenerateHero) {
    showLoader();
    elements.btnGenerateHero.classList.add("loading");
    elements.btnGenerateHero.disabled = true;
  }

  try {
    // ----- Call the AI API -----
    console.log("🚀 Generating itinerary from hero form...");
    const itinerary = await generateItinerary(destination, days, budget, interests);

    // ----- Store Current Trip for Saving -----
    window.currentTrip = {
      destination: destination,
      days: days,
      budget: budget,
      interests: interests,
      itinerary: itinerary,
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
    };

    // ----- Display in Modal Result Container -----
    if (elements.itineraryResult) {
      elements.itineraryResult.innerHTML = itinerary;
    }

    // ----- Open Modal & Show Result -----
    if (elements.plannerModal) {
      elements.plannerModal.classList.add("active");
      document.body.style.overflow = "hidden";
    }

    // Show result container, hide form container
    if (elements.plannerFormContainer) {
      elements.plannerFormContainer.classList.add("hidden");
    }
    if (elements.resultContainer) {
      elements.resultContainer.classList.remove("hidden");
    }

    console.log("✅ Itinerary generated and displayed in modal!");
  } catch (error) {
    // ----- Handle Errors -----
    console.error("❌ Error generating itinerary:", error);

    // Check if it's a rate limit error
    let errorMessage = "";
    if (error.message.includes("429")) {
      errorMessage = `
                <div style="text-align: center; padding: 40px;">
                    <span style="font-size: 48px; display: block; margin-bottom: 16px;">⏳</span>
                    <h3 style="color: #f59e0b; margin-bottom: 8px;">Rate Limit Exceeded</h3>
                    <p style="color: #64748b;">
                        Too many requests! Please wait <strong>1-2 minutes</strong> and try again.<br><br>
                        <small>This happens when the API receives too many requests in a short time.</small>
                    </p>
                </div>
            `;
    } else {
      errorMessage = `
                <div style="text-align: center; padding: 40px;">
                    <span style="font-size: 48px; display: block; margin-bottom: 16px;">😢</span>
                    <h3 style="color: #ef4444; margin-bottom: 8px;">Oops! Something went wrong</h3>
                    <p style="color: #64748b;">
                        Please check your connection and try again.<br>
                        If the problem persists, try again in a few moments.
                    </p>
                </div>
            `;
    }

    // Show error in modal
    if (elements.itineraryResult) {
      elements.itineraryResult.innerHTML = errorMessage;
    }

    // Open modal and show result container with error
    if (elements.plannerModal) {
      elements.plannerModal.classList.add("active");
      document.body.style.overflow = "hidden";
    }
    if (elements.plannerFormContainer) {
      elements.plannerFormContainer.classList.add("hidden");
    }
    if (elements.resultContainer) {
      elements.resultContainer.classList.remove("hidden");
    }
  } finally {
    // ----- Remove Loading State -----
    if (elements.btnGenerateHero) {
      hideLoader();
      elements.btnGenerateHero.classList.remove("loading");
      elements.btnGenerateHero.disabled = false;
    }
  }
}

// ============================================
// 8. LOCAL STORAGE
//
// Functions to save and load trips using
// the browser's localStorage feature.
// ============================================

/**
 * Save the current trip to localStorage.
 * Called when user clicks the "Save Trip" button.
 */
function saveCurrentTrip() {
  // Check if there's a trip to save
  if (!window.currentTrip) {
    alert("No trip to save! Generate an itinerary first.");
    return;
  }

  // Get existing saved trips from localStorage
  const savedTrips = getSavedTrips();

  // Create a new trip object with a unique ID
  const tripToSave = {
    id: Date.now(), // Use timestamp as unique ID
    destination: window.currentTrip.destination,
    days: window.currentTrip.days,
    budget: window.currentTrip.budget,
    interests: window.currentTrip.interests,
    itinerary: window.currentTrip.itinerary,
    date: window.currentTrip.date,
  };

  // Add the new trip to the array
  savedTrips.push(tripToSave);

  // Save back to localStorage
  localStorage.setItem("wanderwise_trips", JSON.stringify(savedTrips));

  // Show success message
  alert("✅ Trip saved successfully!");

  // Refresh the saved trips view
  loadSavedTrips();

  console.log("💾 Trip saved:", tripToSave.destination);
}

/**
 * Get all saved trips from localStorage.
 * @returns {Array} - Array of saved trip objects
 */
function getSavedTrips() {
  // Get the trips string from localStorage
  const tripsString = localStorage.getItem("wanderwise_trips");

  // If nothing saved yet, return empty array
  if (!tripsString) {
    return [];
  }

  // Parse the JSON string back to an array
  try {
    return JSON.parse(tripsString);
  } catch (error) {
    console.error("Error parsing saved trips:", error);
    return [];
  }
}

/**
 * Load and display all saved trips.
 * Called during init and after saving/deleting trips.
 */
function loadSavedTrips() {
  const savedTrips = getSavedTrips();

  // Clear existing content
  elements.savedTripsList.innerHTML = "";

  // Show/hide empty state based on whether there are trips
  if (savedTrips.length === 0) {
    elements.emptyState.classList.remove("hidden");
    console.log("📭 No saved trips found");
    return;
  }

  // Hide empty state since we have trips
  elements.emptyState.classList.add("hidden");

  // Render each saved trip (newest first)
  savedTrips.reverse().forEach(function (trip) {
    const tripCard = createSavedTripCard(trip);
    elements.savedTripsList.appendChild(tripCard);
  });

  console.log("📚 Loaded", savedTrips.length, "saved trips");
}

/**
 * Create a card element for a saved trip.
 * @param {Object} trip - The saved trip data
 * @returns {HTMLElement} - The card element
 */
function createSavedTripCard(trip) {
  const card = document.createElement("div");
  card.className = "saved-trip-card";

  card.innerHTML = `
        <div class="saved-trip-header">
            <div>
                <h3 class="saved-trip-title">📍 ${trip.destination}</h3>
                <span class="saved-trip-date">${trip.days} days • ${trip.budget} budget • ${trip.date}</span>
            </div>
            <button class="btn-delete" data-id="${trip.id}">🗑️ Delete</button>
        </div>
        <div class="saved-trip-content">
            ${trip.itinerary}
        </div>
    `;

  // Add delete button functionality
  const deleteBtn = card.querySelector(".btn-delete");
  deleteBtn.addEventListener("click", function () {
    deleteTrip(trip.id);
  });

  return card;
}

/**
 * Delete a saved trip by its ID.
 * @param {number} tripId - The ID of the trip to delete
 */
function deleteTrip(tripId) {
  // Ask for confirmation
  const confirmed = confirm("Are you sure you want to delete this trip?");

  if (!confirmed) {
    return; // User cancelled
  }

  // Get current saved trips
  let savedTrips = getSavedTrips();

  // Filter out the trip with the matching ID
  savedTrips = savedTrips.filter(function (trip) {
    return trip.id !== tripId;
  });

  // Save the updated array back to localStorage
  localStorage.setItem("wanderwise_trips", JSON.stringify(savedTrips));

  // Refresh the display
  loadSavedTrips();

  console.log("🗑️ Deleted trip with ID:", tripId);
}

// ============================================
// 9. UTILITY FUNCTIONS
//
// Helper functions used throughout the app.
// ============================================

/**
 * Sanitize HTML to prevent XSS (Cross-Site Scripting) attacks.
 *
 * ⚠️ NOTE: This function is NOT currently used in this application.
 *
 * WHY IT'S NOT NEEDED HERE:
 * - The backend controls the AI prompt completely (line 94-104 in api/generate-itinerary.js)
 * - Users cannot inject their own HTML into the prompt
 * - The HTML we receive is directly from Gemini AI (a trusted source)
 * - The backend's parseMarkdown() function converts markdown to safe HTML
 *
 * WHEN YOU SHOULD USE THIS:
 * - If you allow users to input HTML directly
 * - If you're displaying user-generated content
 * - If you're accepting data from untrusted sources
 *
 * HOW IT WORKS:
 * - Creates a temporary div element
 * - Sets the input as textContent (which auto-escapes HTML)
 * - Returns the escaped HTML
 * - Example: "<script>alert('hack')</script>" becomes "&lt;script&gt;alert('hack')&lt;/script&gt;"
 *
 * LEARNING RESOURCE:
 * This is kept as a reference for learning about XSS protection.
 * For production apps with user input, consider using libraries like DOMPurify.
 *
 * @param {string} str - String to sanitize
 * @returns {string} - Sanitized string with HTML entities escaped
 */
function sanitizeHTML(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

/**
 * Format a date nicely.
 * @param {Date} date - The date to format
 * @returns {string} - Formatted date string
 */
function formatDate(date) {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/**
 * Log a styled message to the console.
 * @param {string} message - The message to log
 * @param {string} type - Type of message (info, success, error)
 */
function log(message, type = "info") {
  const styles = {
    info: "color: #3b82f6",
    success: "color: #10b981",
    error: "color: #ef4444",
  };

  console.log("%c" + message, styles[type] || styles.info);
}

/**
 * Show the loading overlay.
 */
function showLoader() {
  if (elements.loaderOverlay) {
    elements.loaderOverlay.classList.add("active");
  }
}

/**
 * Hide the loading overlay.
 */
function hideLoader() {
  if (elements.loaderOverlay) {
    elements.loaderOverlay.classList.remove("active");
  }
}

// ============================================
// NOTE FOR LEARNERS:
// You might wonder: "Where is the parseMarkdown function?"
//
// ANSWER: It's in the backend! (api/generate-itinerary.js)
//
// This is an example of "Separation of Concerns" - a key programming principle.
// The backend handles all data processing (including Markdown → HTML conversion),
// and the frontend only handles displaying that data.
//
// Benefits of this approach:
// ✅ Code isn't duplicated (DRY - Don't Repeat Yourself)
// ✅ Easier to maintain (fix bugs in one place only)
// ✅ More secure (processing happens on server, not in browser)
// ✅ Cleaner frontend code (less complexity)
//
// If you want to see how Markdown parsing works, check out:
// api/generate-itinerary.js (lines 192-248)
// ============================================
