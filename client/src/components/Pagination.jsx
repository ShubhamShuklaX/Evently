import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = (current, total) => {
    if (total <= 7) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    if (current <= 4) {
      return [1, 2, 3, 4, 5, "ellipsis-end", total];
    }

    if (current >= total - 3) {
      return [1, "ellipsis-start", total - 4, total - 3, total - 2, total - 1, total];
    }

    return [1, "ellipsis-start", current - 1, current, current + 1, "ellipsis-end", total];
  };

  const pages = getPageNumbers(currentPage, totalPages);

  return (
    <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-1.5 py-6 select-none">
      {/* Previous Page Button */}
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
        className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
      >
        <ChevronLeft size={16} />
      </button>

      {/* Page Numbers & Ellipses */}
      {pages.map((page) => {
        if (typeof page === "string" && page.startsWith("ellipsis")) {
          return (
            <span
              key={page}
              className="w-6 sm:w-8 text-center text-xs sm:text-sm font-bold text-neutral-400 select-none"
            >
              ...
            </span>
          );
        }

        const isActive = page === currentPage;

        return (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            aria-current={isActive ? "page" : undefined}
            className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold transition-all cursor-pointer active:scale-95 ${
              isActive
                ? "bg-[#1D1F23] text-white shadow-sm"
                : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100"
            }`}
          >
            {page}
          </button>
        );
      })}

      {/* Next Page Button */}
      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
        className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
};

export default Pagination;
