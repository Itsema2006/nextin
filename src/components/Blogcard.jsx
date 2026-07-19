import { Link } from 'react-router-dom';

export default function BlogCard({ post }) {
  const postUrl = `/blog/${post.slug}`;

  return (
    <article className="blog-card">
      <Link to={postUrl} className="blog-card-media" aria-label={`Read ${post.title}`}>
        <img src={post.image} alt={post.title} loading="lazy" />
      </Link>

      <div className="blog-card-body">
        <div className="blog-card-meta">
          <span className="blog-card-author">{post.author}</span>
          <span className="blog-card-dot">•</span>
          <span>{post.date}</span>
          <span className="blog-card-dot">•</span>
          <span>{post.readTime}</span>
        </div>

        <h3 className="blog-card-title">
          <Link to={postUrl}>{post.title}</Link>
        </h3>

        <p className="blog-card-excerpt">{post.excerpt}</p>

        {/* Footer row: category tag + small arrow affordance.
            Card height wraps to its content — no extra svg,
            no forced whitespace underneath. */}
        <div className="blog-card-footer">
          <span className="blog-card-tag">{post.category}</span>

          <Link to={postUrl} className="blog-card-arrow" aria-label={`Read ${post.title}`}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17L17 7" />
              <path d="M8 7h9v9" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}