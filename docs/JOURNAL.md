## Assets Persistence

- Added localStorage integration to the AssetsStoreService
- Implemented a constructor to load assets from localStorage on initialization
- Added private methods for saving to and loading from localStorage
- Modified all dispatch methods to save changes to localStorage after updating state
- Added error handling around localStorage operations
- Committed changes with conventional commit message: "feat(assets): add localStorage persistence for assets" 

## Assets Persistence Refactoring

- Refactored localStorage integration to use reactive approach
- Implemented OnDestroy interface to properly manage subscriptions
- Added subscription to assets BehaviorSubject to save on every change
- Removed imperative saveToLocalStorage calls from dispatch methods
- Modified saveToLocalStorage method to accept assets parameter
- Committed changes with conventional commit message: "refactor(assets): implement reactive localStorage persistence" 