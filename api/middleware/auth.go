package middleware

import (
    "net/http"
    "strings"
    "api/helpers"

    "github.com/gin-gonic/gin"
)

func AuthMiddleware() gin.HandlerFunc {
    return func(ctx *gin.Context) {
        authHeader := ctx.GetHeader("Authorization")
        if (authHeader == "") {
            ctx.JSON(http.StatusUnauthorized, gin.H{"message": "Harapp login terlebih dahulu"})
            ctx.Abort()
            return
        }

        parts := strings.Split(authHeader, " ")
        if len(parts) != 2 || parts[0] != "Bearer" {
            ctx.JSON(http.StatusUnauthorized, gin.H{"message": "Format token tidak valid"})
            ctx.Abort()
            return
        }

        tokenString := parts[1]
        claims, err := helpers.DecodeJWT(tokenString)
        if err != nil {
            ctx.JSON(http.StatusUnauthorized, gin.H{"message": "Token tidak valid atau kedaluwarsa"})
            ctx.Abort()
            return
        }

        ctx.Set("user_id", claims["id"])
        ctx.Set("user_email", claims["email"])

        ctx.Next()
    }
}