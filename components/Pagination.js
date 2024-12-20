import Link from "next/link";

const Pagination = ({ pages, current_page = 1, onPageChange }) => {
  return (
    <div className="flex items-center space-x-1 mt-8">
      {pages.map((page) => (
        <Link key={page} href={`/page/${page}`} passHref>
          <div
            onClick={() => onPageChange(page)} // ページをクリックしたときに onPageChange を呼び出す
            className={`px-4 py-2 border hover:bg-black hover:text-white ${
            current_page === page ?  "bg-black text-white" : ""
            }`}
          >
            {page}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Pagination;
