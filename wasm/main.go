//go:build js && wasm

package main

import (
	"encoding/json"
	"syscall/js"

	"github.com/botaldaris/puzzle-solver/internal"
)

func main() {
	js.Global().Set("solveBFS", js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		boardJS := args[0]
		size := boardJS.Length()

		var board [internal.Size][internal.Size]int8
		for i := 0; i < size; i++ {
			rowJS := boardJS.Index(i)
			for j := 0; j < size; j++ {
				board[i][j] = int8(rowJS.Index(j).Int())
			}
		}
		result := internal.Solve_bfs(board)
		jsonData, err := json.Marshal(result)
		if err != nil {
			panic(err)
		}
		return string(jsonData)
	}))
	select {}
}
