import { useEffect, useState } from 'react';
import { Pagination } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Paginate({ pages, page, isAdmin = false, keyword = '' }) {
  const navigate = useNavigate();
  const [activeIdx, setActiveIdx] = useState(page - 1);

  const handlePageClick = pageNumber => {
    let url;
    if (isAdmin) url = `/admin/productlist?page=${pageNumber}`;
    else
      url = keyword
        ? `/?search=${keyword}&page=${pageNumber}`
        : `/?page=${pageNumber}`;

    navigate(url);
  };

  useEffect(() => {
    setActiveIdx(page - 1);
  }, [page]);

  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map(x => (
          <Pagination.Item
            active={activeIdx === x}
            onClick={() => handlePageClick(x + 1)}
            key={x + 1}
          >
            {x + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    )
  );
}

export default Paginate;
