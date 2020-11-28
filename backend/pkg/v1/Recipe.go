package v1

import (
	"database/sql"
	"fmt"
	"math/rand"
	"net/http"

	"github.com/gin-gonic/gin"
)

type Recipes struct {
	Title      string `json:"recipeName" binding:"required"`
	ID         int    `json:"id" binding:"required"`
	Views      int    `json:"views" binding:"required"`
	Ingredient string `json:"ingredients" binding:"required"`
}

func RemoveIndex(s []Recipes, index int) []Recipes {
	return append(s[:index], s[index+1:]...)
}
func Recipe(c *gin.Context) {
	conn, err := sql.Open("mysql", "root:1234@tcp(127.0.0.1:3306)/recipe")
	if err != nil {
		fmt.Println(err.Error())
	}

	defer conn.Close()
	rows, err := conn.Query("SELECT * FROM recipe_info order by 조회수 desc limit 30")
	var title string
	var id int
	var views int
	var ingredients string
	var recipes []Recipes
	for rows.Next() {
		err := rows.Scan(&title, &id, &views, &ingredients)
		if err != nil {
			fmt.Println(err.Error())
		}
		var recipe Recipes
		recipe.Title = title
		recipe.ID = id
		recipe.Views = views
		recipe.Ingredient = ingredients
		recipes = append(recipes, recipe)
	}
	var result []Recipes
	for {
		if len(result) >= 10 {
			break
		}
		index := rand.Intn(len(recipes))
		result = append(result, recipes[index])
		recipes = recipes[:index+copy(recipes[index:], recipes[index+1:])]
	}
	c.JSON(http.StatusOK, result)
}
