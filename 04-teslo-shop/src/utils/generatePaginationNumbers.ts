export const generatePaginationNumbers = (
  currentPage: number,
  totalPages: number
) => {
  // Número total de páginas 7 o menos
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  // Página está entre las primeras 3 páginas
  if (currentPage < 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages]
  }

  // Página está entre las últimas 3 páginas
  if (currentPage >= totalPages - 2) {
    return [1, 2, 3, '...', totalPages - 2, totalPages - 1, totalPages]
  }

  // Página está en otro lugar
  if (currentPage >= totalPages - 2) {
    return [
      1,
      '...',
      currentPage - 1,
      currentPage,
      currentPage + 1,
      '...',
      totalPages,
    ]
  }
}
