package configs

import (
	"api/configs/app_config"
	"api/configs/db_config"
)

func InitConfig() {
	app_config.InitAppConfig()
	app_config.CORSConfig()
	db_config.InitDatabaseConfig()
}