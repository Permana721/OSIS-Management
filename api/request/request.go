package request

type UserRequest struct {
	Name     string `json:"name" form:"name" binding:"required"`
	Email    string `json:"email" form:"email" binding:"required"`
	Kelas    string `json:"kelas" form:"kelas" binding:"required"`
	Password string `json:"password" form:"password" binding:"required"`
	Proker	 string `json:"proker" form:"proker" binding:"required"`
	Foto	 string `json:"foto" form:"foto" binding:"required"`
}

type LoginRequest struct {
    Email    string `json:"email" binding:"required,email"`
    Password string `json:"password" binding:"required"`
}