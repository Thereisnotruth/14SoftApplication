package v1

import (
	"database/sql"
	"fmt"
	"net/http"
	"reflect"

	"github.com/gin-gonic/gin"
)

type RequestUnlikeInfo struct {
	ID       string `json:"userId"`
	RecipeId int    `json:"recipeId"`
}

func Unlike(c *gin.Context) {
	var req RequestUnlikeInfo
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	conn, err := sql.Open("mysql", "root:1234@tcp(127.0.0.1:3306)/recipe")
	if err != nil {
		fmt.Println(err.Error())
	}
	defer conn.Close()
	fmt.Println(reflect.TypeOf(req.ID))
	_, err = conn.Exec("DELETE FROM user_likes where user_id = ? and recipe_id = ?", req.ID, req.RecipeId)
	if err != nil {
		fmt.Println(err.Error())
	}

	c.JSON(http.StatusOK, gin.H{"message": "Delete Success..."})
}
