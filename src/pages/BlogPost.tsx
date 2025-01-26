import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Tag, Twitter, Linkedin, Facebook, Copy, AlertTriangle } from 'lucide-react';
import { posts } from '../data/posts';

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  const post = posts.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Post not found</h1>
          <Link 
            to="/" 
            className="text-green-400 hover:text-green-500 transition-colors"
          >
            Return to home
          </Link>
        </div>
      </div>
    );
  }

  const relatedPosts = posts
    .filter(p => p.id !== post.id && p.tags.some(tag => post.tags.includes(tag)))
    .slice(0, 3);

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = `Check out this article: ${post.title}`;
    
    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`);
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`);
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`);
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        break;
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="relative h-[40vh] md:h-[50vh]">
        <img 
          src={post.image} 
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 -mt-32 relative">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-green-400 hover:text-green-500 transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        <article className="prose prose-invert prose-green max-w-4xl mx-auto">
          {/* Article Header */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
            
            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 text-gray-400 mb-6">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </span>
              <span>{post.date}</span>
            </div>

            {/* Author Info */}
            <div className="flex items-center gap-4 mb-6">
              <img 
                src={post.author.avatar}
                alt={post.author.name}
                className="w-12 h-12 rounded-full border-2 border-green-400/20"
              />
              <div>
                <h4 className="font-bold text-green-400">{post.author.name}</h4>
                <p className="text-gray-400 text-sm">CEO</p>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map(tag => (
                <span 
                  key={tag}
                  className="inline-flex items-center gap-1 text-sm px-3 py-1 bg-green-400/10 rounded-full border border-green-400/20"
                >
                  <Tag className="w-4 h-4" />
                  {tag}
                </span>
              ))}
            </div>

            {/* Social Share */}
            <div className="flex items-center gap-6 mb-8 pb-8 border-b border-green-400/20">
              <button 
                onClick={() => handleShare('twitter')}
                className="flex items-center gap-2 text-gray-400 hover:text-green-400 transition-colors"
              >
                <Twitter className="w-5 h-5" />
                <span className="hidden md:inline">Share on Twitter</span>
              </button>
              <button 
                onClick={() => handleShare('linkedin')}
                className="flex items-center gap-2 text-gray-400 hover:text-green-400 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
                <span className="hidden md:inline">Share on LinkedIn</span>
              </button>
              <button 
                onClick={() => handleShare('facebook')}
                className="flex items-center gap-2 text-gray-400 hover:text-green-400 transition-colors"
              >
                <Facebook className="w-5 h-5" />
                <span className="hidden md:inline">Share on Facebook</span>
              </button>
              <button 
                onClick={() => handleShare('copy')}
                className="flex items-center gap-2 text-gray-400 hover:text-green-400 transition-colors"
              >
                <Copy className="w-5 h-5" />
                <span className="hidden md:inline">Copy Link</span>
              </button>
            </div>
          </div>

          {/* Warning Box */}
          <div className="bg-yellow-400/10 border border-yellow-400/20 rounded-lg p-4 mb-8">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
              <div>
                <h4 className="text-yellow-400 font-bold mb-2">Disclaimer</h4>
                <p className="text-sm text-gray-300">
                  This article is for educational purposes only. The techniques described should only be used in authorized testing environments. Always follow applicable laws and regulations.
                </p>
              </div>
            </div>
          </div>

          {/* Table of Contents */}
          <div className="bg-black/40 backdrop-blur-sm border border-green-400/20 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">Table of Contents</h2>
            <nav className="space-y-2">
              <a href="#introduction" className="block text-gray-400 hover:text-green-400 transition-colors">
                1. Introduction
              </a>
              <a href="#understanding" className="block text-gray-400 hover:text-green-400 transition-colors">
                2. Understanding the Vulnerability
              </a>
              <a href="#exploitation" className="block text-gray-400 hover:text-green-400 transition-colors">
                3. The Exploitation Chain
              </a>
              <a href="#mitigation" className="block text-gray-400 hover:text-green-400 transition-colors">
                4. Mitigation Steps
              </a>
            </nav>
          </div>

          {/* Main Content */}
          <div 
            className="mt-8 prose prose-invert prose-green max-w-none
              prose-h2:text-2xl prose-h2:font-bold prose-h2:text-green-400 prose-h2:mt-8 prose-h2:mb-4
              prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-4
              prose-ul:list-disc prose-ul:list-inside prose-ul:text-gray-300 prose-ul:mb-4
              prose-li:mb-2
              prose-pre:bg-black/40 prose-pre:border prose-pre:border-green-400/20
              prose-code:text-green-400"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Author Bio */}
          <div className="mt-16 bg-black/40 backdrop-blur-sm border border-green-400/20 rounded-lg p-6">
            <div className="flex items-center gap-4 mb-4">
              <img 
                src={post.author.avatar}
                alt={post.author.name}
                className="w-16 h-16 rounded-full border-2 border-green-400/20"
              />
              <div>
                <h4 className="font-bold text-green-400 text-lg">{post.author.name}</h4>
                <p className="text-gray-400">CEO</p>
              </div>
            </div>
            <p className="text-gray-300">
            I'm the CEO of Klore Security. A passionate cybersecurity researcher with expertise in penetration testing, vulnerability assessment, and red team operations. Committed to making the digital world safer through education and responsible disclosure.
            </p>
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="mt-16 pt-8 border-t border-green-400/20">
              <h2 className="text-2xl font-bold mb-6">Related Posts</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map(relatedPost => (
                  <Link 
                    key={relatedPost.id}
                    to={`/blog/${relatedPost.slug}`}
                    className="group"
                  >
                    <div className="bg-black/40 backdrop-blur-sm border border-green-400/20 rounded-lg overflow-hidden">
                      <div className="relative h-48">
                        <img 
                          src={relatedPost.image}
                          alt={relatedPost.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-4">
                          <h3 className="text-lg font-bold group-hover:text-green-400 transition-colors">
                            {relatedPost.title}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-gray-400 mt-2">
                            <Clock className="w-4 h-4" />
                            <span>{relatedPost.readTime}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
      </div>
    </div>
  );
};

export default BlogPost;