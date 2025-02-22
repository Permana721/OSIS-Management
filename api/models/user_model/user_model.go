package models

type User struct {
	ID       *uint   `gorm:"primaryKey" json:"id"`
	Name     *string `gorm:"type:varchar(255);not null" json:"name"`
	Kelas    *string `gorm:"type:varchar(255)" json:"kelas"`
	No_Urut  *int    `gorm:"type:integer" json:"no_urut"`
	Posisi   *string `gorm:"type:varchar(255)" json:"posisi"`
	Email    *string `gorm:"type:varchar(255)" json:"email"`
	Password *string `gorm:"type:varchar(255)" json:"password"`
	Visi     *string `gorm:"type:varchar(255)" json:"visi"`
	Misi     *string `gorm:"type:varchar(255)" json:"misi"`
	Proker   *string `gorm:"type:varchar(255)" json:"proker"`
	Foto     *string `gorm:"type:varchar(255)" json:"foto"`
}