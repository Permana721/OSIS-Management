package responses

type UserResponse struct {	
	ID     		*int    	`json:"id"`
	Name 		*string 	`json:"name"`
	Kelas     	*string  	`json:"kelas"`
	Email		*string  	`json:"email"`
	Password    *string  	`json:"password"`
	Proker     	*string    	`json:"proker"`
	Foto		*string    	`json:"foto"`
}