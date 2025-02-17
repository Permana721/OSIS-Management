package migration

import (
	"log"
	"api/database"
	"api/models/user_model"
)

func MigrateDatabase() {
	database.ConnectDatabase()

	err := database.DB.AutoMigrate(
		&models.User{}, 
	)

	if err != nil {
		log.Fatal("Migration failed:", err)
	}

	log.Println("Migration successful!")
}
