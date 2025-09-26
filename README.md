# Monorepo for stop de ontkoking

## Pre-MVP Features (Core Functionality)

### 1. Authentication

- [ ] Implement basic email/password authentication
- [ ] User roles:
  - [ ] **User**: Can create, edit, and delete their own recipes
  - [ ] **Admin**: Can manage all recipes and users
- [ ] Profile management: Users can update their profile information

### 2. Recipe Service

- [ ] CRUD operations for user recipes (Create, Read, Update, Delete)
- [ ] View recipes posted by other users
- [ ] Search recipes by:
  - [ ] Ingredients
  - [ ] Meal type:
    - [ ] Breakfast
    - [ ] Lunch
    - [ ] Dinner
    - [ ] Appetizer
    - [ ] Main course
    - [ ] Dessert

---

## Post-MVP Features (Enhancements)

### 1. Authentication Enhancements

- [ ] OAuth support (e.g., Google login)

### 2. Recipe Service Enhancements

- [ ] Comments on recipes
- [ ] Ratings for recipes
- [ ] Advanced Search:
  - [ ] Lexical search
  - [ ] Implement reverse index with BM25 ranking

### 3. AI-Powered Features

#### Meal Planning & Recipe Generation

- [ ] Personalized meal planning:
  - [ ] Daily meal plans
  - [ ] Weekly meal plans
  - [ ] Tailored to user preferences, dietary goals, or available ingredients
- [ ] Recipe auto-generation from user-provided ingredients

#### Recipe & Ingredient Intelligence

- [ ] Smart ingredient substitutions
- [ ] Portion adjustment (scale recipes based on servings)
- [ ] Nutritional analysis:
  - [ ] Calculate calories
  - [ ] Calculate macros
  - [ ] Provide dietary information
  - [ ] Integrate with portion adjustments for efficiency
