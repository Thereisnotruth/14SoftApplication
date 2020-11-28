package v1

import "net/http"

func SetCookie(w http.ResponseWriter, ID string) {
	c := http.Cookie{
		Name:     "access-token",
		Value:    ID,
		HttpOnly: true,
		MaxAge:   3600,
	}
	w.Header().Set("Set-Cookie", c.String())
}
