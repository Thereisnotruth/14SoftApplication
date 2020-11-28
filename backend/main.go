package main

import (
	"github.com/Thereisnotruth/14SOFTAPPLICATION/backend/pkg/db"
	t "github.com/Thereisnotruth/14SOFTAPPLICATION/backend/pkg/v1"
	"github.com/gin-contrib/static"
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()
	router.Use(static.Serve("/", static.LocalFile("../frontend/build", true)))
	db.DBInit()

	router.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})
	v1 := router.Group("/v1")
	{
		v1.POST("/signup", t.SignUp)
		v1.POST("/login", t.Login)
		v1.POST("/logout", t.Logout)
		v1.POST("/recommended", t.Recommended)
		v1.POST("/search", t.Search)
		v1.GET("/recipe", t.Recipe)
		v1.POST("/like", t.Like)
		v1.POST("/favor", t.Favor)
	}

	router.Run(":3001")
}
