import { useEffect, useMemo, useState } from 'react';
import BlogCard from './BlogCard';
import Pagination from './Pagination';
import blogPosts from './blogData';
import './Blog.css';

const PAGE_SIZE = 6;

export default function Blog() {
  const categories = useMemo(() => {
    const unique = Array.from(new Set(blogPosts.map((post) => post.category)));
    return ['All', ...unique];
  }, []);

  const [activeCategory, setActiveCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredPosts = useMemo(() => {
    if (activeCategory === 'All') return blogPosts;
    return blogPosts.filter((post) => post.category === activeCategory);
  }, [activeCategory]);

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / PAGE_SIZE));

  const visiblePosts = filteredPosts.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  return (
    <div className="blog-page">
      {/* Hero */}
      <section className="blog-hero">
        <h1 className="blog-hero-title">Blog</h1>

        <div className="blog-filter-row" role="tablist" aria-label="Filter posts by category">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              role="tab"
              aria-selected={activeCategory === category}
              className={`blog-filter-pill ${activeCategory === category ? 'active' : ''}`}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Grid */}
      <main className="blog-main">
        {visiblePosts.length === 0 && (
          <div className="blog-empty">
            <p>No posts in this category yet — check back soon.</p>
          </div>
        )}

        {visiblePosts.length > 0 && (
          <div className="blog-grid">
            {visiblePosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}

        <div className="blog-pagination-wrap">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </main>
    </div>
  );
}