package routes

import (
    "api/configs/app_config"
    user_controller "api/controllers/user_controller"
    "api/middleware"

    "github.com/gin-gonic/gin"
)

func InitRoute(app *gin.Engine) {
    route := app
    app.Use(app_config.CORSConfig())

    route.Static(app_config.STATIC_ROUTE, app_config.STATIC_DIR)
    route.POST("/user/login", user_controller.Login)
    route.POST("/user/register", user_controller.Register)

    protected := route.Group("/")
    protected.Use(middleware.AuthMiddleware())
    {
        protected.POST("/user/add", user_controller.Store)
        protected.GET("/user", user_controller.GetAllUser)
        protected.GET("/user/:id", user_controller.GetById)
        protected.PATCH("/user/update/:id", user_controller.Update)
        protected.DELETE("/user/delete/:id", user_controller.Delete)
    }
}