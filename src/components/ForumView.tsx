import React, { useState } from 'react';
import {
  MessageSquare,
  ThumbsUp,
  Share2,
  PlusCircle,
  Tag,
  Search,
  Filter,
  Send,
  X,
  Flame,
  Award
} from 'lucide-react';
import { useCricket } from '../context/CricketContext';
import { ForumPost } from '../types/cricket';

export const ForumView: React.FC = () => {
  const { forumPosts, addForumPost, upvoteForumPost, addForumReply, currentUser } = useCricket();
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [activeReplyingPostId, setActiveReplyingPostId] = useState<string | null>(null);
  const [replyInput, setReplyInput] = useState('');

  // New Post Form State
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState<ForumPost['category']>('Match Discussion');
  const [newTags, setNewTags] = useState('');

  const categories = ['ALL', 'Match Discussion', 'IPL Tactics', 'World Cup', 'Player Form', 'Debates'];

  const filteredPosts = forumPosts.filter((post) => {
    const matchesCategory = selectedCategory === 'ALL' || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const tagsArray = newTags
      .split(',')
      .map(t => t.trim().replace(/^#/, ''))
      .filter(Boolean);

    addForumPost(newTitle, newContent, newCategory, tagsArray.length > 0 ? tagsArray : ['Cricket']);
    setNewTitle('');
    setNewContent('');
    setNewTags('');
    setShowNewPostModal(false);
  };

  const handleSendReply = (postId: string) => {
    if (!replyInput.trim()) return;
    addForumReply(postId, replyInput);
    setReplyInput('');
    setActiveReplyingPostId(null);
  };

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Fan Discussion Forum
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Debate bowling strategies, auction buys, match-day decisions, and pitch conditions with fellow fans.
          </p>
        </div>

        <button
          onClick={() => setShowNewPostModal(true)}
          className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-emerald-500/20 transition-all hover:scale-102"
        >
          <PlusCircle className="w-4 h-4" />
          <span>New Discussion</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
        {/* Categories */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto scrollbar-none pb-1 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-emerald-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {cat === 'ALL' ? 'All Channels' : `#${cat}`}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search discussions & tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>
      </div>

      {/* Forum Posts List */}
      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="p-5 rounded-2xl bg-slate-900 border border-slate-800/90 hover:border-slate-700 transition-all duration-200 shadow-md"
          >
            {/* Post Meta */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-8 h-8 rounded-full object-cover ring-1 ring-emerald-500/50"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-white">{post.author.name}</span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-800 text-emerald-400">
                      {post.author.flairTeam}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">{post.timestamp}</span>
                </div>
              </div>

              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                {post.category}
              </span>
            </div>

            {/* Post Body */}
            <div className="mt-3">
              <h3 className="text-base font-bold text-white hover:text-emerald-400 transition-colors">
                {post.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1.5 leading-relaxed">
                {post.content}
              </p>

              {/* Tags */}
              <div className="flex items-center gap-1.5 mt-3 flex-wrap">
                {post.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-mono text-cyan-400 bg-cyan-950/40 border border-cyan-800/40 px-2 py-0.5 rounded"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Post Actions Bar */}
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-800/70 text-xs">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => upvoteForumPost(post.id)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border transition-colors ${
                    post.userVote === 'up'
                      ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400 font-bold'
                      : 'border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                  }`}
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>{post.upvotes}</span>
                </button>

                <button
                  onClick={() => setActiveReplyingPostId(activeReplyingPostId === post.id ? null : post.id)}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-slate-800 text-slate-400 hover:text-white transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{post.replies.length} Replies</span>
                </button>
              </div>

              <span className="text-[11px] text-slate-500">
                +50 Pts earned for participating
              </span>
            </div>

            {/* Replies Section */}
            {post.replies.length > 0 && (
              <div className="mt-4 pt-3 border-t border-slate-800/60 space-y-2.5 pl-4 sm:pl-6 border-l-2 border-slate-800">
                {post.replies.map((reply) => (
                  <div key={reply.id} className="p-2.5 rounded-xl bg-slate-950/50 border border-slate-800/60 text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <img
                          src={reply.avatar}
                          alt={reply.author}
                          className="w-4 h-4 rounded-full object-cover"
                        />
                        <span className="font-bold text-white text-[11px]">{reply.author}</span>
                        <span className="text-[9px] px-1.5 py-0.2 rounded bg-slate-800 text-emerald-400">
                          {reply.flairTeam}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-500 font-mono">{reply.timestamp}</span>
                    </div>
                    <p className="text-slate-300 text-xs pl-6">{reply.content}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Reply Input Box */}
            {activeReplyingPostId === post.id && (
              <div className="mt-3 flex items-center gap-2 pt-2 border-t border-slate-800">
                <input
                  type="text"
                  placeholder="Write your counter-argument or insights..."
                  value={replyInput}
                  onChange={(e) => setReplyInput(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
                <button
                  onClick={() => handleSendReply(post.id)}
                  className="px-3.5 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1 transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Reply</span>
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* New Post Modal */}
      {showNewPostModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold text-base text-white">Start a Cricket Discussion</h3>
              <button
                onClick={() => setShowNewPostModal(false)}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Discussion Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Can India defend 175 with dew at Wankhede?"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Category Channel
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as ForumPost['category'])}
                  className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="Match Discussion">Match Discussion</option>
                  <option value="IPL Tactics">IPL Tactics</option>
                  <option value="World Cup">World Cup</option>
                  <option value="Player Form">Player Form</option>
                  <option value="Debates">Debates</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Discussion Content & Analysis
                </label>
                <textarea
                  rows={4}
                  placeholder="Elaborate your observations, bowling matchups, field setups..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  placeholder="Bumrah, DeathOvers, Wankhede, IPL"
                  value={newTags}
                  onChange={(e) => setNewTags(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewPostModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs"
                >
                  Publish Post (+50 Pts)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
