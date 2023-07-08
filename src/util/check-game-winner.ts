export const checkGameState = (matrix: string[][]) => {
  const winningPatterns: [number, number, number][] = [
    // Linhas
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // Colunas
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // Diagonais
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const pattern of winningPatterns) {
    const [a, b, c] = pattern;
    if (
      matrix[Math.floor(a / 3)][a % 3] !== "" &&
      matrix[Math.floor(a / 3)][a % 3] === matrix[Math.floor(b / 3)][b % 3] &&
      matrix[Math.floor(b / 3)][b % 3] === matrix[Math.floor(c / 3)][c % 3]
    ) {
      const winnerSymbol = matrix[Math.floor(a / 3)][a % 3];
      const matrixWinner: any = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ];

      for (const index of pattern) {
        const row = Math.floor(index / 3);
        const col = index % 3;
        matrixWinner[row][col] = winnerSymbol;
      }

      return { winnerSymbol, matrixWinner }
    }
  }

  return null;
}