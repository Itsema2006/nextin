export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages < 1) return null;

  const getPageList = () => {
    const delta = 1;
    const middle = [];
    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i += 1
    ) {
      middle.push(i);
    }

    const pages = [1];
    if (middle[0] > 2) pages.push('ellipsis-start');
    pages.push(...middle);
    if (middle[middle.length - 1] < totalPages - 1) pages.push('ellipsis-end');
    if (totalPages > 1) pages.push(totalPages);

    return pages;
  };

  const pages = getPageList();

  return (
    <nav className="pagination" aria-label="Blog pagination">
      <button
        type="button"
        className="pagination-arrow"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      {pages.map((page, index) =>
        typeof page === 'number' ? (
          <button
            key={page}
            type="button"
            className={`pagination-page ${page === currentPage ? 'active' : ''}`}
            onClick={() => onPageChange(page)}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </button>
        ) : (
          <span key={`${page}-${index}`} className="pagination-ellipsis">
            …
          </span>
        )
      )}

      <button
        type="button"
        className="pagination-arrow"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
    </nav>
  );
}