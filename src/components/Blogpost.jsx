import { useEffect } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import BlogCard from './BlogCard';
import blogPosts from './blogData';
import './BlogPost.css';

export default function BlogPost() {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  // Reset scroll on navigation between posts.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // --- Real viewport height fix -------------------------------------
  // Mobile browsers report `100vh` taller than the actual visible
  // viewport (they include the space the address bar temporarily
  // occupies). That mismatch is what causes a stray black gap to
  // appear right where the hero should end and the white panel
  // should begin. We measure the true viewport height in JS and
  // expose it as --vh (1% of it), then every height/scroll-distance
  // in the CSS is built from that variable instead of a raw vh unit.
  // This is not an animation or a scroll library — it's a single
  // resize listener that keeps a CSS variable accurate.
  useEffect(() => {
    const setViewportUnit = () => {
      document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    };
    setViewportUnit();
    window.addEventListener('resize', setViewportUnit);
    window.addEventListener('orientationchange', setViewportUnit);
    return () => {
      window.removeEventListener('resize', setViewportUnit);
      window.removeEventListener('orientationchange', setViewportUnit);
    };
  }, []);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const morePosts = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  const currentIndex = blogPosts.findIndex((p) => p.slug === post.slug);
  const olderPost = blogPosts[currentIndex + 1];
  const newerPost = blogPosts[currentIndex - 1];

  return (
    <div className="blog-page post-page">
      {/* ============================================================
          BLACK HERO PANEL
          Pinned via position: sticky inside a taller "spacer" box.
          Contains ONLY breadcrumb / category / title / meta — no
          article content. It stays fixed to the screen while the
          spacer's extra height is scrolled through; once that's
          consumed, the white panel (pulled up by the exact same
          amount via a negative margin) has fully covered it.
          ============================================================ */}
      <div className="post-pin-spacer">
        <header className="post-hero-sticky">
          <div className="post-hero-inner">
            <div className="post-breadcrumb">
              <Link to="/blog">← Back to blog</Link>
            </div>

            <div className="post-hero-bottom">
              <span className="post-category">{post.category}</span>
              <h1 className="post-title">{post.title}</h1>
              <div className="post-meta">
                <span className="post-author">{post.author}</span>
                <span className="post-meta-dot">•</span>
                <span>{post.date}</span>
                {post.readTime && (
                  <>
                    <span className="post-meta-dot">•</span>
                    <span>{post.readTime}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </header>
      </div>

      {/* ============================================================
          WHITE ARTICLE PANEL
          Normal document flow, pulled up over the pinned hero with
          a negative margin equal to the spacer's extra height —
          the "sheet of paper sliding up and covering the black
          panel" layer.
          ============================================================ */}
      <article className="post-content-panel">
        {/* Cover image */}
        <div className="post-cover">
          <img src={post.image} alt={post.title} />
        </div>

        {/* Body */}
        <div className="post-body">
          {post.content.map((block, index) => {
            if (block.type === 'h3') {
              return (
                <h3 className="post-heading" key={index}>
                  {block.text}
                </h3>
              );
            }
            if (block.type === 'quote') {
              return (
                <blockquote className="post-quote" key={index}>
                  <p>{block.text}</p>
                  {block.cite && <cite>— {block.cite}</cite>}
                </blockquote>
              );
            }
            return (
              <p className="post-paragraph" key={index}>
                {block.text}
              </p>
            );
          })}
        </div>

        {/* Prev / Next navigation */}
        {(olderPost || newerPost) && (
          <nav className="post-nav" aria-label="More posts navigation">
            {newerPost ? (
              <Link to={`/blog/${newerPost.slug}`} className="post-nav-link post-nav-prev">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
                <span>
                  <em>Newer post</em>
                  {newerPost.title}
                </span>
              </Link>
            ) : (
              <span />
            )}

            {olderPost ? (
              <Link to={`/blog/${olderPost.slug}`} className="post-nav-link post-nav-next">
                <span>
                  <em>Older post</em>
                  {olderPost.title}
                </span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </Link>
            ) : (
              <span />
            )}
          </nav>
        )}

        {/* More posts */}
        {morePosts.length > 0 && (
          <section className="post-more-section" aria-label="More posts">
            <h2 className="post-more-title">More from the blog</h2>
            <div className="post-more-grid">
              {morePosts.map((p) => (
                <BlogCard key={p.id} post={p} />
              ))}
            </div>
          </section>
        )}
      </article>
    </div>
  );
}