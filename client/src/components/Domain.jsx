import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/Domain.css";
function Domain() {
  const [data, setData] = useState({
    domainLists: [],
    page: 1,
    totalPages: null,
    pages: [1, 2, 3, 4, 5],
    totalEntries: null,
  });

  const [config, setConfig] = useState({
    keyword: null,
    pageSize: 10,
    page: 1,
    sortField: null,
    sortDirection: null,
  });

  const tableHeads = [
    { name: "#" },
    { name: "Domain", sortField: "domainName" },
    { name: "Host", sortField: "apiKey" },
    { name: "Daily Limit", sortField: "emailLimit" },
    { name: "Status" },
    { name: "Action" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`http://localhost:5000/api/domain`, {
        params: config,
      });
      setData(res.data);
    };
    fetchData();
  }, [config]);
  const setSortField = (sortField) => {
    if (sortField) {
      let sortDirection = 1;
      if (config.sortField == sortField && config.sortDirection == 1) {
        sortDirection = -1;
      }
      setConfig({ ...config, sortField, sortDirection });
    }
  };
  console.log(config);
  return (
    <div>
      <div class="table_elements">
        <div className="show_entries">
          <label for="">Show</label>
          <span>
            <select
              class="en_selectbox"
              onChange={(e) => {
                console.log(e.target.value);
                setConfig({ ...config, pageSize: e.target.value });
              }}
            >
              <option>10</option>
              <option value="15">15</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </span>
          <span className="items">items</span>
        </div>

        <div className="search_div">
          <form>
            <input
              className="search"
              placeholder="Search"
              name="q"
              onChange={(e) =>
                setConfig({ ...config, keyword: e.target.value })
              }
            />
            <span>
              <i class="fa fa-search search" aria-hidden="true"></i>
            </span>
          </form>
        </div>
      </div>

      <table className="table table-striped">
        <thead>
          <tr className="table_header">
            {tableHeads.map((head) => (
              <th onClick={() => setSortField(head.sortField)}>
                {head.name}
                {head.sortField ? (
                  <React.Fragment>
                    <span>
                      <i
                        style={{ paddingLeft: "0.5rem" }}
                        class="fa fa-long-arrow-up"
                        aria-hidden="true"
                      ></i>
                    </span>
                    <span>
                      <i
                        style={{ paddingLeft: "0.2rem" }}
                        class="fa fa-long-arrow-down"
                        aria-hidden="true"
                      ></i>
                    </span>
                  </React.Fragment>
                ) : null}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.domainLists.map((post, i) => (
            <tr>
              <td key={post.id}>{++i}</td>
              <td>{post.domainName}</td>
              <td>{post.apiKey}</td>
              <td>{post.emailLimit}</td>
              <td>Active</td>
              <td>
                <i style={{ color: "white" }} class="fa fa-pencil-square-o"></i>
                <i
                  style={{ paddingLeft: "1.5rem", color: "white" }}
                  class="fa fa-share-square-o"
                ></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <a
          href="#"
          onClick={() => {
            if (config.page > 1)
              setConfig({ ...config, page: config.page - 1 });
          }}
        >
          &laquo;
        </a>
        {data.pages.map((pageNum) => (
          <a
            href="#"
            className={data.page === pageNum ? "active" : ""}
            onClick={() => setConfig({ ...config, page: pageNum })}
          >
            {pageNum}
          </a>
        ))}

        <a
          href="#"
          onClick={() => {
            if (config.page < data.totalPages)
              setConfig({ ...config, page: config.page + 1 });
          }}
        >
          &raquo;
        </a>
      </div>

      <div className="show_entery">
        <p>
          Show entries{" "}
          <a href="#">
            {config.pageSize}/{data.totalEntries}
          </a>
        </p>
      </div>
    </div>
  );
}

export default Domain;
