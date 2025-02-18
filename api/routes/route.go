package routes

import (
	"api/configs/app_config"
	user_controller "api/controllers/user_controller"

	"github.com/gin-gonic/gin"
)

func InitRoute(app *gin.Engine) {
    route := app
    app.Use(app_config.CORSConfig())

    route.Static(app_config.STATIC_ROUTE, app_config.STATIC_DIR)
    route.POST("/user/login", user_controller.Login)

    route.POST("/user/add", user_controller.Store)
    route.GET("/user", user_controller.GetAllUser)
    route.GET("/user/:id", user_controller.GetById)
    route.PATCH("/user/update/:id", user_controller.Update)
    route.DELETE("/user/delete/:id", user_controller.Delete)
}
