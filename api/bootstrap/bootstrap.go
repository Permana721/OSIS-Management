

package bootstrap

import (
	"api/configs"
	"api/configs/app_config"
	"api/database"
	"api/migration"
	"api/routes"
	"log"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func BootstrapApp() {
	// Load .env file
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file") // Hentikan program jika gagal
	}

	// Init config
	configs.InitConfig()

	// Connect to database
	database.ConnectDatabase()

	// Jalankan migrasi
	migration.MigrateDatabase() 

	// Init Gin engine
	app := gin.Default()

	// Init routes
	routes.InitRoute(app)

	// Jalankan server dengan PORT yang benar
	app.Run(app_config.PORT)
}