package middleware

import (
	"crypto/subtle"
	"net/http"
	"strings"

	"../config"
)

// RemoveTrailingSlash removes the trailing slash from requests
func RemoveTrailingSlash(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.URL.Path != "/" {
			r.URL.Path = strings.TrimSuffix(r.URL.Path, "/")
		}
		next.ServeHTTP(w, r)
	})
}

// BasicAuth comment
func BasicAuth(next http.Handler) http.Handler {
	username := config.GetString("auth.basic.username")
	password := config.GetString("auth.basic.password")
	realm := config.GetString("auth.basic.realm")

	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		user, pass, ok := r.BasicAuth()

		if !ok || subtle.ConstantTimeCompare([]byte(user), []byte(username)) != 1 || subtle.ConstantTimeCompare([]byte(pass), []byte(password)) != 1 {
			w.Header().Set("WWW-Authenticate", `Basic realm="`+realm+`"`)
			w.WriteHeader(401)
			w.Write([]byte("Unauthorised.\n"))
			return
		}

		next.ServeHTTP(w, r)
	})
}
