package db

import (
	"database/sql"
	"fmt"
	"os"
	"time"

	_ "github.com/go-sql-driver/mysql"
)

var db *sql.DB

var dbName = "recipe"

func DBInit() {
	conn, err := sql.Open("mysql", "root:1234@tcp(127.0.0.1:3306)/")

	if err != nil {
		fmt.Println(err.Error())
	}

	defer conn.Close()

	// DB 생성
	_, err = conn.Exec("create database if not exists " + dbName)
	if err != nil {
		fmt.Println(err.Error())
	} else {
		fmt.Println("Successfully created databse..")
	}

	// DB 선택
	_, err = conn.Exec("Use " + dbName)
	if err != nil {
		fmt.Println(err.Error())
	} else {
		fmt.Println("DB selected successfully..")
	}

	// 테이블 생성
	_, err = conn.Exec("CREATE Table if not exists User(nickname varchar(20) not null, user_id varchar(20) not null, user_pw varchar(20) not null);")
	if err != nil {
		fmt.Println(err.Error())
	} else {
		fmt.Println("User Table created successfully..")
	}
	_, err = conn.Exec("CREATE Table if not exists User_Likes(user_id varchar(20) not null, recipe_id int not null);")
	if err != nil {
		fmt.Println(err.Error())
	} else {
		fmt.Println("User_Likes Table created successfully..")
	}
	_, err = conn.Exec("CREATE Table if not exists recipe_info(제목 TEXT, ID INT, 조회수 INT, 재료 TEXT);")
	if err != nil {
		fmt.Println(err.Error())
	} else {
		fmt.Println("Recipe_Info created successfully..")
	}
	_, err = conn.Exec("CREATE Table if not exists recipe_recommend(ID INT, `1` INT, `2` INT, `3` INT, `4` INT, `5` INT, `6` INT, `7` INT, `8` INT, `9` INT, `10` INT);")
	if err != nil {
		fmt.Println(err.Error())
	} else {
		fmt.Println("Recipe_Recommend created successfully..")
	}
}

func InsertTest(i int) {
	conn, err := sql.Open("mysql", "root:1234@tcp(127.0.0.1:3306)/"+dbName)
	defer conn.Close()
	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
	conn.SetConnMaxLifetime(30 * time.Minute)

	_, err = conn.Exec("insert into test values (?);", i)
	if err != nil {
		fmt.Println(err)
	}
}
