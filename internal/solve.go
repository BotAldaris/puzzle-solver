package internal

import (
	"container/list"
	"fmt"
)

const Size_8 int8 = 4
const Size = 4

type Data struct {
	data   [Size][Size]int8
	move   int8
	parent *Data
}

func Solve_bfs(nums [Size][Size]int8) [][Size][Size]int8 {
	visited := make(map[[Size][Size]int8]struct{})

	to_visit := list.New()
	to_visit.PushBack(Data{data: nums, move: 0, parent: nil})
	correctBoard := createCorrectBoard()
	for to_visit.Len() != 0 {
		current_element := to_visit.Front()
		to_visit.Remove(current_element)
		current := current_element.Value.(Data)
		moves := findMoveOpportunity(current.data)

		for _, v := range moves {
			if v == correctBoard {
				var result [][Size][Size]int8
				for {
					result = append(result, current.data)
					if current.parent == nil {
						return result
					}
					current = *current.parent
				}
			}
			_, exists := visited[v]
			if exists {
				continue
			}
			visited[v] = struct{}{}
			to_visit.PushBack(Data{data: v, move: 0, parent: &current})
		}
	}
	return nil
}

func createCorrectBoard() [Size][Size]int8 {
	var nums [Size][Size]int8
	for index := 0; index < Size*Size-1; index++ {
		nums[index/Size][index%Size] = int8(index + 1)
	}

	// Add the 0 to the last row
	nums[Size-1][Size-1] = 0

	fmt.Println("board_correct")
	fmt.Println(nums)

	return nums
}

// findZero finds the position of 0 in the matrix
func findZero(nums [Size][Size]int8) (int8, int8) {
	for i := 0; i < Size; i++ {
		for j := 0; j < Size; j++ {
			if nums[i][j] == 0 {
				return int8(i), int8(j)
			}
		}
	}
	return 0, 0
}

// deepCopyMatrix creates a deep copy of a 2D slice
func deepCopyMatrix(nums [Size][Size]int8) [Size][Size]int8 {
	return nums
}

// findMoveOpportunity returns all possible boards after moving the zero
func findMoveOpportunity(nums [Size][Size]int8) [][Size][Size]int8 {
	i, j := findZero(nums)
	nextIndexList := make([][Size][Size]int8, 4)

	// move up
	if i > 0 {
		numMod := deepCopyMatrix(nums)
		numMod[i][j], numMod[i-1][j] = numMod[i-1][j], 0
		nextIndexList = append(nextIndexList, numMod)
	}

	// move down
	if i < Size_8-1 {
		numMod := deepCopyMatrix(nums)
		numMod[i][j], numMod[i+1][j] = numMod[i+1][j], 0
		nextIndexList = append(nextIndexList, numMod)
	}

	// move left
	if j > 0 {
		numMod := deepCopyMatrix(nums)
		numMod[i][j], numMod[i][j-1] = numMod[i][j-1], 0
		nextIndexList = append(nextIndexList, numMod)
	}

	// move right
	if j < Size_8-1 {
		numMod := deepCopyMatrix(nums)
		numMod[i][j], numMod[i][j+1] = numMod[i][j+1], 0
		nextIndexList = append(nextIndexList, numMod)
	}

	return nextIndexList
}
