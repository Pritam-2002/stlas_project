#!/bin/bash

# Define the src directory
SRC_DIR="src"

# Define subdirectories
DIRECTORIES=(
    "config"
    "controllers"
    "middlewares"
    "models"
    "routes"
    "services"
    "utils"
    "websocket"
)

# Create src folder and subdirectories
echo "Creating src directory structure..."
mkdir -p "$SRC_DIR"
for dir in "${DIRECTORIES[@]}"; do
    mkdir -p "$SRC_DIR/$dir"
done

# Create config files
touch "$SRC_DIR/config/db.ts"
touch "$SRC_DIR/config/env.ts"

# Create controller files
touch "$SRC_DIR/controllers/auth.controller.ts"
touch "$SRC_DIR/controllers/chat.controller.ts"
touch "$SRC_DIR/controllers/user.controller.ts"

# Create middleware files
touch "$SRC_DIR/middlewares/auth.middleware.ts"
touch "$SRC_DIR/middlewares/error.middleware.ts"

# Create model files
touch "$SRC_DIR/models/user.model.ts"
touch "$SRC_DIR/models/chat.model.ts"

# Create route files
touch "$SRC_DIR/routes/auth.routes.ts"
touch "$SRC_DIR/routes/user.routes.ts"
touch "$SRC_DIR/routes/chat.routes.ts"

# Create service files
touch "$SRC_DIR/services/auth.service.ts"
touch "$SRC_DIR/services/chat.service.ts"

# Create utility files
touch "$SRC_DIR/utils/logger.ts"

# Create WebSocket files
touch "$SRC_DIR/websocket/ws.server.ts"
touch "$SRC_DIR/websocket/ws.handlers.ts"

# Create server entry point
touch "$SRC_DIR/server.ts"

echo "✅ Project structure created successfully!"
