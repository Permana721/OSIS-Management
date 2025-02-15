package user_controller

import (
	"math/rand"
	"path/filepath"
    // "strconv"
	"time"
	"api/database"
	"api/models/user_model"
	"api/request"
	"api/responses"
	"fmt"
	"net/http"
	"os"
	"golang.org/x/crypto/bcrypt"
	"github.com/golang-jwt/jwt/v4"

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
		"message" : "data transmitted",
		"data": user,
	})
}

func Store(ctx *gin.Context) {
	// Ambil input dari form-data
	name := ctx.PostForm("name")
	kelas := ctx.PostForm("kelas")
	email := ctx.PostForm("email")
	password := ctx.PostForm("password")
	proker := ctx.PostForm("proker")

	// Cek apakah email sudah digunakan
	var userExist models.User
	if err := database.DB.Where("email = ?", email).First(&userExist).Error; err == nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": "Email already used."})
		return
	}

	// Hash password
	hashedPasswordBytes, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to hash password."})
		return
	}
	hashedPasswordStr := string(hashedPasswordBytes)

	// Proses upload foto
	file, err := ctx.FormFile("photo")
	var filename string

	if err == nil {
		// Generate nama file unik: "foto-XXX.jpg"
		rand.Seed(time.Now().UnixNano())
		randomNumber := rand.Intn(900) + 100 // Angka 3 digit (100-999)
		ext := filepath.Ext(file.Filename)
		filename = fmt.Sprintf("foto-%d%s", randomNumber, ext)

		// Path penyimpanan ke dalam folder frontend React (public/uploads/)
		savePath := fmt.Sprintf("../web/public/uploads/%s", filename)

		// Simpan file ke folder uploads dalam frontend
		if err := ctx.SaveUploadedFile(file, savePath); err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to upload file."})
			return
		}
	} else {
		filename = "" // Jika tidak ada file yang diunggah
	}

	// Simpan ke database
	user := models.User{
		Name:     &name,
		Kelas:    &kelas,
		Email:    &email,
		Password: &hashedPasswordStr,
		Proker:   &proker,
		Foto:    &filename, // Hanya simpan nama file, bukan path lengkap
	}

	if err := database.DB.Create(&user).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"message": "Can't create data."})
		return
	}

	// Beri respon sukses
	ctx.JSON(http.StatusOK, gin.H{
		"message": "Data Successfully Created",
		"data":    user,
	})
}


func Update(ctx *gin.Context) {
	id := ctx.Param("id")
	user := new(models.User)
	userReq := new(request.UserRequest)
	userEmailExist := new(models.User)

	// Bind data dari request ke struct
	if errReq := ctx.ShouldBind(&userReq); errReq != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"message": errReq.Error(),
		})
		return
	}

	// Cek apakah data user dengan ID yang diberikan ada
	errDb := database.DB.Table("users").Where("id = ?", id).Find(&user).Error
	if errDb != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"message": "Internal server error",
		})
		return
	}

	if user.ID == nil {
		ctx.JSON(http.StatusNotFound, gin.H{
			"message": "Data not found",
		})
		return
	}

	// Cek apakah email sudah digunakan oleh user lain
	erruserEmailExist := database.DB.Table("users").Where("email = ?", userReq.Email).Find(&userEmailExist).Error
	if erruserEmailExist != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"message": "Internal server error",
		})
		return
	}

	if userEmailExist.Email != nil && *user.ID != *userEmailExist.ID {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"message": "Email already used",
		})
		return
	}

	// Jika password diisi, hash password baru
	if userReq.Password != "" {
		hashedPassword, err := bcrypt.GenerateFromPassword([]byte(userReq.Password), bcrypt.DefaultCost)
		if err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{
				"message": "Failed to hash password",
			})
			return
		}
		hashedPasswordStr := string(hashedPassword)
		user.Password = &hashedPasswordStr
	}

	// Update data user
	user.Name = &userReq.Name
	user.Kelas = &userReq.Kelas
	user.Email = &userReq.Email
	user.Proker = &userReq.Proker

	errUpdate := database.DB.Table("users").Where("id = ?", id).Updates(&user).Error
	if errUpdate != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"message": "Can't update data",
		})
		return
	}

	ctx.JSON(200, user)
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
            "error": errDb.Error(),
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
	loginReq := new(request.LoginRequest)

	if err := ctx.ShouldBindJSON(&loginReq); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"message": "Invalid request data",
		})
		return
	}

	user := new(models.User)
	err := database.DB.Table("users").Where("email = ?", loginReq.Email).First(&user).Error
	if err != nil {
		ctx.JSON(http.StatusUnauthorized, gin.H{
			"message": "Invalid email or password",
		})
		return
	}

	err = bcrypt.CompareHashAndPassword([]byte(*user.Password), []byte(loginReq.Password))
	if err != nil {
		ctx.JSON(http.StatusUnauthorized, gin.H{
			"message": "Invalid email or password",
		})
		return
	}

	// Buat token JWT
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"email": user.Email,
		"exp":   time.Now().Add(24 * time.Hour).Unix(),
	})

	tokenString, err := token.SignedString([]byte("your_secret_key"))
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"message": "Could not create token",
		})
		return
	}

	// Kirim respon dengan token
	ctx.JSON(http.StatusOK, gin.H{
		"message": "Login successful",
		"token":   tokenString,
	})
}

func HandleUploadFile(ctx *gin.Context) {
    // Ambil file dari request
    fileHeader, err := ctx.FormFile("file")
    if err != nil {
        ctx.AbortWithStatusJSON(400, gin.H{
            "message": "file is required",
        })
        return
    }

    // Pastikan direktori penyimpanan ada
    os.MkdirAll("./public/files", os.ModePerm)

    // Simpan file ke direktori public/files
    savePath := fmt.Sprintf("./public/files/%s", fileHeader.Filename)
    errUpload := ctx.SaveUploadedFile(fileHeader, savePath)
    if errUpload != nil {
        ctx.JSON(500, gin.H{
            "message": "internal server error, can't save file",
        })
        return
    }

    // Kirimkan respons sukses
    ctx.JSON(200, gin.H{
        "message": "file uploaded",
        "path":    savePath,
    })
}