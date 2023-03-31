import axios from "axios";
import React, { useEffect, useState } from "react";
import { Pagination } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import Infobar from "../../Common_Components/Infobar";
import "./blog.css";
import Loader from "../../Common_Components/Loader";

const Paginate = ({ pages, page, isAdmin = false, keyword = "" }) => {
  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((x) => (
          <Pagination.Item key={x + 1}>
            <Link key={x + 1} to={`/blogs/page/${x + 1}`}>
              {x + 1}
            </Link>
          </Pagination.Item>
        ))}
      </Pagination>
    )
  );
};

const BlogPage = () => {
  const [blogList, setBlogList] = useState([]);
  const { pageNumber } = useParams() || 1;
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const blog_detailsHandler = (id) => {
    navigate(`/blog/${id}`);
  };

  useEffect(() => {
    setLoading(true);
    axios.get(`/api/blogs?pageNumber=${pageNumber}`).then((res) => {
      setBlogList(res.data.all_blogs);
      setPage(res.data.page);
      setPages(res.data.pages);
      setLoading(false);
    });
  }, [pageNumber]);

  if (loading) return <Loader />;

  return (
    <div className="bg-white relative">
      <Infobar start_text={""} end_text={"Blogs"} invert_text_color={true} />

      <div className="container2 mx-auto">
        {blogList &&
          blogList.map((blog) => (
            <div
              className="card cursor-pointer"
              key={blog._id}
              onClick={() => blog_detailsHandler(blog._id)}
            >
              <div className="card__header">
                <img
                  src={`/${blog.banner}`}
                  alt="card__image"
                  className="card__image"
                />
              </div>
              <div className="card__body">
                <h4> {blog.title}</h4>
                <p>
                  Check out this Blog right now
                </p>
              </div>
              {/* <div className="card__footer">
                <div className="user">
                  <img
                    src="https://img.icons8.com/ios-glyphs/30/737373/administrator-male.png"
                    alt="user__image"
                    className="user__image"
                  />
                  <div className="user__info">
                    <h5>Admin</h5>
                  </div>
                </div>
              </div> */}
            </div>
          ))}
      </div>
      <div className="my-8">
        <Paginate pages={pages} page={page} />
      </div>
    </div>
  );
};

export default BlogPage;