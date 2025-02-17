package models

type User struct {
	ID       *uint    `gorm:"primaryKey" json:"id"`
	Name     *string  `gorm:"type:varchar(255)" json:"name"`
	Kelas    *string  `gorm:"type:varchar(255)" json:"kelas"`
	Email    *string  `gorm:"type:varchar(255);unique" json:"email"`
	Password *string  `gorm:"type:varchar(255)" json:"password"`
	Proker   *string  `gorm:"type:varchar(255)" json:"proker"`
	Foto     *string  `gorm:"type:varchar(255)" json:"foto"`
}
