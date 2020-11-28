package v1

import (
	"database/sql"
	"fmt"
	"net/http"
	"sort"

	"github.com/gin-gonic/gin"
)

type RequestSearchInfo struct {
	Content []string `json:"content"`
}

func Search(c *gin.Context) {
	var req RequestSearchInfo
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	conn, err := sql.Open("mysql", "root:1234@tcp(127.0.0.1:3306)/recipe")
	if err != nil {
		fmt.Println(err.Error())
	}
	defer conn.Close()
	var query string
	query = "select * from recipe_info "
	for i := 0; i < len(req.Content); i++ {
		query = query + "where 재료 like '%" + req.Content[i] + "%' and "
	}
	query = query[:len(query)-5]
	query += ";"

	rows, err := conn.Query(query)
	if err != nil {
		fmt.Println(err.Error())
	}
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
		fmt.Println(recipe)
		recipes = append(recipes, recipe)
	}
	sort.Slice(recipes, func(i, j int) bool {
		return recipes[i].Views > recipes[j].Views
	})
	recipes = recipes[:10]
	c.JSON(http.StatusOK, recipes)
}
