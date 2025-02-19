package user_controller

import (
	"math/rand"
	"os"
	"path/filepath"

	"api/database"
	models "api/models/user_model"
	"api/helpers"
	"api/responses"
	"fmt"
	"net/http"
	"strconv"
	"time"

	// "github.com/golang-jwt/jwt/v4"
	"golang.org/x/crypto/bcrypt"

	"github.com/gin-gonic/gin"
)

func GetAllUser(ctx *gin.Context) {
	users := new([]models.User)

	err := database.DB.Table("users").Find(&users).Error

	if err != nil {
		ctx.AbortWithStatusJSON(500, gin.H{
			"message": "Internal server error",
		})
		return
	}

	ctx.JSON(200, users)
}

func GetById(ctx *gin.Context) {
	id := ctx.Param("id")
	user := new(responses.UserResponse)

	errDb := database.DB.Table("users").Where("id = ?", id).Find(&user).Error
	if errDb != nil {
		ctx.JSON(500, gin.H{
			"message": "internal server error",
		})
		return
	}

	if user.ID == nil {
		ctx.JSON(http.StatusNotFound, gin.H{
			"message": "Data not found",
		})
		return
	}

	ctx.JSON(200, gin.H{
		"message": "data transmitted",
		"data":    user,
	})
}

func Store(ctx *gin.Context) {
	name := ctx.PostForm("name")
	kelas := ctx.PostForm("kelas")
	no_urutStr := ctx.PostForm("no_urut") 
	posisi := ctx.PostForm("posisi")
	email := ctx.PostForm("email")
	password := ctx.PostForm("password")
	proker := ctx.PostForm("proker")

	no_urut, err := strconv.Atoi(no_urutStr)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": "Nomor urut harus berupa angka."})
		return
	}

	var userExist models.User
	if err := database.DB.Where("email = ?", email).First(&userExist).Error; err == nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": "Email already used."})
		return
	}

	hashedPasswordBytes, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to hash password."})
		return
	}
	hashedPasswordStr := string(hashedPasswordBytes)

	file, err := ctx.FormFile("photo")
	var filename string

	if err == nil {
		ext := filepath.Ext(file.Filename) 
		filename = fmt.Sprintf("%s%s", name, ext) 

		savePath := fmt.Sprintf("../web/public/uploads/%s", filename)

		if err := ctx.SaveUploadedFile(file, savePath); err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to upload file."})
			return
		}
	} else {
		filename = ""
	}

	user := models.User{
		Name:     &name,
		Kelas:    &kelas,
		No_Urut:  &no_urut,
		Posisi:   &posisi,
		Email:    &email,
		Password: &hashedPasswordStr,
		Proker:   &proker,
		Foto:     &filename,
	}

	if err := database.DB.Create(&user).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"message": "Can't create data."})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"message": "Data Successfully Created",
		"data":    user,
	})
}

func Register(ctx *gin.Context) {
	name := ctx.PostForm("name")
	email := ctx.PostForm("email")
	password := ctx.PostForm("password")

	var userExist models.User
	if err := database.DB.Where("email = ?", email).First(&userExist).Error; err == nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": "Email already used."})
		return
	}

	hashedPasswordBytes, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to hash password."})
		return
	}
	hashedPasswordStr := string(hashedPasswordBytes)

	user := models.User{
		Name:     &name,
		Email:    &email,
		Password: &hashedPasswordStr,
	}

	if err := database.DB.Create(&user).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"message": "Can't create data."})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"message": "Data Successfully Created",
		"data":    user,
	})
}

func Update(c *gin.Context) {
	id := c.Param("id")
	name := c.PostForm("name")
	kelas := c.PostForm("kelas")
	no_urutStr := c.PostForm("no_urut")
	posisi := c.PostForm("posisi")
	email := c.PostForm("email")
	password := c.PostForm("password")
	proker := c.PostForm("proker")

	no_urut, err := strconv.Atoi(no_urutStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Nomor urut harus berupa angka."})
		return
	}

	var user models.User
	if err := database.DB.First(&user, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	file, err := c.FormFile("foto")
	var filename string
	if err == nil {
		rand.Seed(time.Now().UnixNano())
		randomNumber := rand.Intn(900) + 100
		ext := filepath.Ext(file.Filename)
		filename = fmt.Sprintf("foto-%d%s", randomNumber, ext)

		savePath := fmt.Sprintf("../web/public/uploads/%s", filename)
		if err := c.SaveUploadedFile(file, savePath); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to upload image"})
			return
		}

		if user.Foto != nil && *user.Foto != "" {
			oldFilePath := fmt.Sprintf("../web/public/uploads/%s", *user.Foto)
			if err := os.Remove(oldFilePath); err != nil {
				fmt.Println("Error removing old file:", err)
			}
		}
	} else {
		filename = *user.Foto
	}

	user.Name = &name
	user.Kelas = &kelas
	user.No_Urut = &no_urut
	user.Posisi = &posisi
	user.Email = &email
	user.Password = &password
	user.Proker = &proker
	user.Foto = &filename 

	if err := database.DB.Save(&user).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update user"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "User updated successfully"})
}

func Delete(ctx *gin.Context) {
	id := ctx.Param("id")
	user := new(models.User)

	result := database.DB.Table("users").Where("id = ?", id).Find(&user)
	if result.Error != nil {
		ctx.JSON(500, gin.H{
			"message": "internal server error",
		})
		return
	}
	if result.RowsAffected == 0 {
		ctx.JSON(404, gin.H{
			"message": "data not found",
		})
		return
	}

	errDb := database.DB.Table("users").Where("id = ?", id).Delete(&models.User{}).Error
	if errDb != nil {
		ctx.JSON(500, gin.H{
			"message": "internal server error",
			"error":   errDb.Error(),
		})
		return
	}

	ctx.JSON(200, gin.H{
		"message": "data deleted successfully",
	})
}

type LoginRequest struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required"`
}

func Login(ctx *gin.Context) {
	var loginReq LoginRequest

	if err := ctx.ShouldBindJSON(&loginReq); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": "Format data tidak valid"})
		return
	}

	// Cari user berdasarkan email
	var user models.User
	err := database.DB.Where("email = ?", loginReq.Email).First(&user).Error
	if err != nil {
		ctx.JSON(http.StatusUnauthorized, gin.H{"message": "Email atau password salah"})
		return
	}

	// Cocokkan password
	err = bcrypt.CompareHashAndPassword([]byte(*user.Password), []byte(loginReq.Password))
	if err != nil {
		ctx.JSON(http.StatusUnauthorized, gin.H{"message": "Email atau password salah"})
		return
	}

	// Generate token JWT
	token, err := helpers.GenerateJWT(*user.ID, *user.Email)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"message": "Gagal membuat token"})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"message": "Login berhasil",
		"token":   token,
		"user": gin.H{
			"id":    user.ID,
			"email": user.Email,
			"name":  user.Name,
		},
	})
}