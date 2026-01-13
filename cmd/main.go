package main

import (
	"fmt"
	"time"

	"github.com/botaldaris/puzzle-solver/internal"
)

func main() {
	// numBegin := [4][4]int8{
	// 	{5, 3, 12, 7},
	// 	{0, 1, 14, 9},
	// 	{2, 13, 10, 4},
	// 	{15, 8, 11, 6},
	// }
	numBegin := [4][4]int8{
		{1, 2, 3, 4},
		{5, 6, 7, 8},
		{9, 10, 11, 12},
		{13, 14, 0, 15},
	}
	start := time.Now()
	result := internal.Solve_bfs(numBegin)
	duration := time.Since(start)
	fmt.Printf("Solved in %v (%s)\n", duration, duration.String())

	for _, v := range result {
		fmt.Printf("[")
		for i := 0; i < internal.Size; i++ {
			fmt.Printf("[")
			for j := 0; j < internal.Size; j++ {
				if j > 0 {
					fmt.Printf(",")
				}
				fmt.Printf("%d", v[i][j])
			}
			fmt.Printf("]")
			if i < internal.Size-1 {
				fmt.Printf(",")
			}
		}
		fmt.Println()
	}
}
