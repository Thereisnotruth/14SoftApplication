package v1

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func Logout(c *gin.Context) {
	c.SetCookie("access_cookie", "", -1, "/", "localhost:3001/", false, false)
	c.JSON(http.StatusOK, gin.H{"message": "Logout Success..."})
}
