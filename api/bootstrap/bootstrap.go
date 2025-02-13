package bootstrap

import (
	"api/configs"
	"api/configs/app_config"
	"api/database"
	"api/routes"
	"log"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func BootstrapApp() {
	// load .env file
	err := godotenv.Load()
	if err != nil {
		log.Println("Error loading .env file")
	}

	// init config
	configs.InitConfig()

	// connect to database
	database.ConnectDatabase()
	// init gin engine
	app := gin.Default()
	// init routes
	routes.InitRoute(app)
	// run app
    app.Run(app_config.PORT)
}