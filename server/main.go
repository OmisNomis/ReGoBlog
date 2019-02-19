package main

import (
	"log"
	"net/http"
	"os"
	"os/signal"
	"time"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"github.com/spf13/viper"
)

func init() {
	viper.SetConfigName("config") // name of config file (without extension)
	viper.AddConfigPath(".")      // path to look for the config file in

	err := viper.ReadInConfig() // Find and read the config file
	if err != nil {
		log.Fatalf("Error reading config file: %+v", err)
	}

	viper.WatchConfig() // Watch the config file for changes
}

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

	api.HandleFunc("/posts/{pageNumber}", simpleHandler).Methods("GET")
	api.HandleFunc("/post/{pageSlug}", simpleHandler).Methods("GET")
	api.HandleFunc("/categories", simpleHandler).Methods("GET")
	api.HandleFunc("/category/{category}", simpleHandler).Methods("GET")

	var handler http.Handler
	handler = router
	handler = handlers.LoggingHandler(os.Stdout, handler)

	srv := &http.Server{
		Handler:      handler,
		Addr:         viper.GetString("listenAddress"),
		WriteTimeout: 15 * time.Second,
		ReadTimeout:  15 * time.Second,
	}

	log.Fatal(srv.ListenAndServe())
}

func simpleHandler(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(200)
	w.Write([]byte("Hello World"))
}
