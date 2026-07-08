import React from "react";

const articles = [
  {
    id: 1,
    image:
      "https://www.practostatic.com/fit/5fd27b74d9477cb633445cf3f105078bbc479910",
    category: "CORONAVIRUS",
    title: "12 Coronavirus Myths and Facts That You Should Be Aware Of",
    author: "Dr. Diana Borgio",
  },
  {
    id: 2,
    image:
      "https://www.practostatic.com/fit/bade52edc7fb158bf627216bf96c2b881a97f30c",
    category: "VITAMINS AND SUPPLEMENTS",
    title: "Eating Right to Build Immunity Against Cold and Viral Infections",
    author: "Dr. Diana Borgio",
  },
];

function Articles() {
  return (
    <div className="container">
      <div className="row align-items-start">

        {/* Left Content */}
        <div className="col-lg-4 mb-4">
          <h1 className="fw-bold">
            Read top articles from <br />
            health experts
          </h1>

          <p className="text-muted mt-3">
            Health articles that keep you informed about good
            health practices and achieve your goals.
          </p>

          <button className="btn btn-info text-white px-5 py-3 mt-3 fw-semibold">
            See all articles
          </button>
        </div>

        {/* Right Cards */}
        <div className="col-lg-8">
          <div className="row">

            {articles.map((article) => (
              <div className="col-md-6 mb-4" key={article.id}>
                <div className="card border-0">

                  <img
                    src={article.image}
                    className="card-img-top rounded-3"
                    alt={article.title}
                    style={{
                      height: "250px",
                      objectFit: "cover",
                    }}
                  />

                  <div className="card-body px-0">

                    <small
                      className="fw-bold"
                      style={{ color: "#0d6e8c" }}
                    >
                      {article.category}
                    </small>

                    <h3
                      className="mt-2"
                      style={{
                        fontSize: "1.8rem",
                        lineHeight: "1.4",
                      }}
                    >
                      {article.title}
                    </h3>

                    <p className="text-muted mt-3">
                      {article.author}
                    </p>

                  </div>
                </div>
              </div>
            ))}

          </div>
        </div>

      </div>
    </div>
  );
}

export default Articles;