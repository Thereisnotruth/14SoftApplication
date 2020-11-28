package v1

import (
	"database/sql"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

type RequestLikeInfo struct {
	ID       string `json:"userId"`
	RecipeId int    `json:"recipeId"`
}

func Like(c *gin.Context) {
	var req RequestLikeInfo
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	conn, err := sql.Open("mysql", "root:1234@tcp(127.0.0.1:3306)/recipe")
	if err != nil {
		fmt.Println(err.Error())
	}
	defer conn.Close()
	fmt.Println(req.ID, req.RecipeId)
	_, err = conn.Exec("insert into user_likes (user_id, recipe_id) select * from (select ? as user_id, ? as recipe_id) as tmp where not exists(select * from user_likes where user_id = ? and recipe_id = ?) limit 1;", req.ID, req.RecipeId, req.ID, req.RecipeId)
	if err != nil {
		fmt.Println(err.Error())
	}
	c.JSON(http.StatusOK, gin.H{"message": "Like Success..."})
}
