package v1

import (
	"database/sql"
	"fmt"
	"math/rand"
	"net/http"

	"github.com/gin-gonic/gin"
)

type RequestRecoInfo struct {
	ID string `json:"userId" binding:"required"`
}
type RecipeLike struct {
	ID       string `json:"userId" binding:"required"`
	RecipeId int    `json:"recipeId" binding:"required"`
}

func Recommended(c *gin.Context) {
	var req RequestRecoInfo
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
	var likes []RecipeLike
	for rows.Next() {
		err := rows.Scan(&userId, &recipeId)
		if err != nil {
			fmt.Println(err.Error())
		}
		var recipeLike RecipeLike
		recipeLike.ID = userId
		recipeLike.RecipeId = recipeId
		likes = append(likes, recipeLike)
	}
	fmt.Println(len(likes))
	if len(likes) == 0 {
		rows, err = conn.Query("SELECT * FROM recipe_info order by 조회수 desc limit 10")
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
	} else {
		index := rand.Intn(len(likes))
		var a int
		var l0 int
		var l1 int
		var l2 int
		var l3 int
		var l4 int
		var l5 int
		var l6 int
		var l7 int
		var l8 int
		var l9 int
		err = conn.QueryRow("SELECT * FROM recipe_recommend where ID = ?", likes[index].RecipeId).Scan(&a, &l0, &l1, &l2, &l3, &l4, &l5, &l6, &l7, &l8, &l9)
		if err != nil {
			fmt.Println(err.Error())
		}
		var t []int
		t = append(t, l0, l1, l2, l3, l4, l5, l6, l7, l8, l9)
		var res []Recipes
		for i := 0; i < len(t); i++ {
			var title string
			var id int
			var views int
			var ingredients string
			err = conn.QueryRow("SELECT * FROM recipe_info where ID = ?", t[i]).Scan(&title, &id, &views, &ingredients)
			if err != nil {
				fmt.Println(err.Error())
			}
			var tmp Recipes
			tmp.Title = title
			tmp.ID = id
			tmp.Views = views
			tmp.Ingredient = ingredients
			res = append(res, tmp)
		}
		c.JSON(http.StatusOK, res)
	}
}
