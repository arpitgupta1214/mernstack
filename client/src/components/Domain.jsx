import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/Domain.css";
function Domain() {
  const [data, setData] = useState([]);
  const [config, setConfig] = useState({
    keyword: null,
    pageSize: null,
    page: null,
    sortField: null,
    sortDirection: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`http://localhost:5000/api/domain`, {
        params: config,
      });
      setData(res.data.domainLists);
    };
    fetchData();
  }, [config]);

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
            <th>#</th>
            <th>
              Domain
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
            </th>
            <th>
              Host
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
            </th>
            <th>
              Daily Limit
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
            </th>
            <th>
              Status
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
            </th>
            <th>
              Action
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
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((post, i) => (
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
        <a href="#">&laquo;</a>
        <a href="#" className="active">
          1
        </a>
        <a href="#">2</a>
        <a href="#">3</a>
        <a href="#">4</a>
        <a href="#">5</a>
        <a href="#">6</a>
        <a href="#">&raquo;</a>
      </div>

      <div className="show_entery">
        <p>
          Show entries <a href="#">10/1000</a>
        </p>
      </div>
    </div>
  );
}

export default Domain;
