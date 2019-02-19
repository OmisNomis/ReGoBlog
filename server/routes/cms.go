package routes

import (
	"encoding/json"
	"net/http"

	"../config"

	"github.com/buttercms/buttercms-go"
	"github.com/gorilla/mux"
)

func init() {
	ButterCMS.SetAuthToken(config.GetString("cms.authToken"))
}

// GetAllPosts returns a map of blog posts
func GetAllPosts(w http.ResponseWriter, r *http.Request) {
	page := mux.Vars(r)["pageNumber"]

	params := map[string]string{"page": page}
	posts, _ := ButterCMS.GetPosts(params)

	w.Header().Set("Content-Type", "application/json")

	e := json.NewEncoder(w)
	e.Encode(posts)
}

// GetPost returns a blog post
func GetPost(w http.ResponseWriter, r *http.Request) {
	pageSlug := mux.Vars(r)["pageSlug"]

	post, _ := ButterCMS.GetPost(pageSlug)

	w.Header().Set("Content-Type", "application/json")

	e := json.NewEncoder(w)
	e.Encode(post)
}

// GetCategories returns a map of blog posts
func GetCategories(w http.ResponseWriter, r *http.Request) {
	params := map[string]string{"include": "recent_posts"}

	categories, _ := ButterCMS.GetCategories(params)

	w.Header().Set("Content-Type", "application/json")

	e := json.NewEncoder(w)
	e.Encode(categories)
}

// GetCategory returns a map of blog posts
func GetCategory(w http.ResponseWriter, r *http.Request) {
	params := map[string]string{"include": "recent_posts"}

	category := mux.Vars(r)["category"]

	posts, _ := ButterCMS.GetCategory(category, params)

	w.Header().Set("Content-Type", "application/json")

	e := json.NewEncoder(w)
	e.Encode(posts)
}
