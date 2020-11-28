package v1

import (
	"database/sql"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

type RequestFavorInfo struct {
	ID string `json:"userId"`
}

func Favor(c *gin.Context) {
	var req RequestFavorInfo
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	conn, err := sql.Open("mysql", "root:1234@tcp(127.0.0.1:3306)/recipe")
	if err != nil {
		fmt.Println(err.Error())
	}
	defer conn.Close()

	rows, err := conn.Query("SELECT * FROM user_likes where user_id = ?", req.ID)
	if err != nil {
		fmt.Println(err.Error())
	}

	var userId string
	var recipeId int
	var favor []Recipes
	for rows.Next() {
		err := rows.Scan(&userId, &recipeId)
		if err != nil {
			fmt.Println(err.Error())
		}
		fmt.Println(recipeId)
		var tmp Recipes
		var title string
		var recipeId_t int
		var views int
		var ingredients string
		err = conn.QueryRow("SELECT * FROM recipe_info where ID = ?", recipeId).Scan(&title, &recipeId_t, &views, &ingredients)
		if err != nil {
			fmt.Println(err.Error())
		}
		tmp.Title = title
		tmp.ID = recipeId_t
		tmp.Views = views
		tmp.Ingredient = ingredients
		favor = append(favor, tmp)
	}

	c.JSON(http.StatusOK, favor)
}
