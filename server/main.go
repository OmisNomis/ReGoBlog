package main

import (
	"log"
	"net/http"
	"os"
	"os/signal"
	"time"

	"./config"
	"./middleware"
	"./routes"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

func main() {
	signalChan := make(chan os.Signal, 1)
	signal.Notify(signalChan, os.Interrupt)

	go func() {
		<-signalChan

		appCleanup()
		os.Exit(1)
	}()

	start()
}

func appCleanup() {
	log.Println("Shutting down server...")
}

func start() {
	router := mux.NewRouter()

	/** API Routes */
	api := router.PathPrefix("/api/v1").Subrouter()

	api.Use(middleware.BasicAuth)

	api.HandleFunc("/posts/{pageNumber}", routes.GetAllPosts).Methods("GET")
	api.HandleFunc("/post/{pageSlug}", routes.GetPost).Methods("GET")
	api.HandleFunc("/categories", routes.GetCategories).Methods("GET")
	api.HandleFunc("/category/{category}", routes.GetCategory).Methods("GET")

	// Serve static assets directly.
	router.PathPrefix("/static/").Handler(http.FileServer(http.Dir("../public")))
	// Serve index page on all unhandled routes
	router.PathPrefix("/").HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "../public/index.html")
	})

	var handler http.Handler
	handler = router
	handler = handlers.LoggingHandler(os.Stdout, handler)
	handler = middleware.RemoveTrailingSlash(handler)

	srv := &http.Server{
		Handler:      handler,
		Addr:         config.GetString("listenAddress"),
		WriteTimeout: 15 * time.Second,
		ReadTimeout:  15 * time.Second,
	}

	log.Fatal(srv.ListenAndServe())
}
