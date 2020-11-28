package v1

import (
	"database/sql"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

type RequestLoginInfo struct {
	ID       string `json:"userId" binding:"required"`
	Password string `json:"userPw" binding:"required"`
}

func Login(c *gin.Context) {
	var req RequestLoginInfo
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	conn, err := sql.Open("mysql", "root:1234@tcp(127.0.0.1:3306)/recipe")
	if err != nil {
		fmt.Println(err.Error())
	}
	defer conn.Close()
	var user string
	err = conn.QueryRow("select user_id from user where user_id = ? and user_pw = ?", req.ID, req.Password).Scan(&user)
	if err != nil {
		c.JSON(http.StatusNotFound, err)
	}
	c.SetCookie("access_cookie", req.ID, 60*60, "/", "localhost:3001", false, false)
	c.JSON(http.StatusOK, gin.H{"message": "Login Success..."})
}
