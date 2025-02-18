package models

type User struct {
	ID       *uint   `gorm:"primaryKey" json:"id"`
	Name     *string `gorm:"type:varchar(255);not null" json:"name"`
	Kelas    *string `gorm:"type:varchar(255);not null" json:"kelas"`
	No_Urut  *int    `gorm:"type:integer;not null" json:"no_urut"`
	Role     *string `gorm:"type:varchar(255);not null" json:"role"`
	Posisi   *string `gorm:"type:varchar(255);not null" json:"posisi"`
	Email    *string `gorm:"type:varchar(255);unique;not null" json:"email"`
	Password *string `gorm:"type:varchar(255);not null" json:"password"`
	Proker   *string `gorm:"type:varchar(255);not null" json:"proker"`
	Foto     *string `gorm:"type:varchar(255);not null" json:"foto"`
}