package main

import (
	"fmt"
	"log"
	"net/http"
)

func main() {
	http.HandleFunc("/", sayHello)
	err := http.ListenAndServe(":8081", nil)
	if err != nil {
		log.Fatal("ListenAnsServe: ", err)
	}
}

func sayHello(w http.ResponseWriter, r *http.Request) {
	_, err := fmt.Fprintf(w, "Привет!")
	if err != nil {
		log.Fatal("ResponseAnswer: ", err)
	}
}
