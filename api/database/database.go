package database

import (
	"api/configs/db_config"
	"fmt"
	"log"

	"gorm.io/driver/mysql"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDatabase() {
	db_config.InitDatabaseConfig()

	var errConnection error

	if(db_config.DB_DRIVER == "mysql") {
		dsnMySQL := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local", db_config.DB_USER, db_config.DB_PASSWORD, db_config.DB_HOST, db_config.DB_PORT, db_config.DB_NAME)
		DB, errConnection = gorm.Open(mysql.Open(dsnMySQL), &gorm.Config{})
	}

	if(db_config.DB_DRIVER == "postgres") {
		dsnMySQL := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable TimeZone=Asia/Jakarta", db_config.DB_HOST, db_config.DB_USER, db_config.DB_PASSWORD, db_config.DB_NAME, db_config.DB_PORT)
		DB, errConnection = gorm.Open(postgres.Open(dsnMySQL), &gorm.Config{})
	}

	if errConnection != nil {
		panic("Failed to connect to database")
	} 

	log.Println("Database connected")
}