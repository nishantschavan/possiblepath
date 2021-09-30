
// Javascript program to Print all possible paths from
// top left to bottom right of a mXn matrix

/* mat: Pointer to the starting of mXn matrix
i, j: Current position of the robot (For the first call use 0,0)
m, n: Dimentions of given the matrix
pi: Next index to be filed in path array
*path[0..pi-1]: The path traversed by robot till now (Array to hold the
				path need to have space for at least m+n elements) */
const printMatrix=(mat,m,n,i,j,path,idx,allpaths)=>
{
	path[idx] = mat[i][j];
		// Reached the bottom of the matrix so we are left with
		// only option to move right
		if (i === m - 1)
		{
			for (let k = j + 1; k < n; k++)
			{
				path[idx + k - j] = mat[i][k];
			}
			allpaths.push(path);
			return;
		}
		
		// Reached the right corner of the matrix we are left with
		// only the downward movement.
		if (j === n - 1)
		{
			for (let k = i + 1; k < m; k++)
			{
				path[idx + k - i] = mat[k][j];
			}
			allpaths.push(path);
			return;
		}
		// Print all the paths that are possible after moving down
		printMatrix(mat, m, n, i + 1, j, path, idx + 1,allpaths);

		// Print all the paths that are possible after moving right
		printMatrix(mat, m, n, i, j + 1, path, idx + 1,allpaths);
}

const printMatrixutil=(mat,m,n,i,j,path,idx)=>{
    const allpaths = [];

    printMatrix(mat,m,n,i,j,path,idx,allpaths);
    return allpaths;
}
