"use client";

import React, { useState, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  MessageSquare,
  Share2,
  Search,
  MoreHorizontal,
  Plus,
  Home,
  TrendingUp,
  Newspaper,
  Compass,
  ArrowUp,
  ArrowDown,
  Award,
  Bell,
  PlusCircle,
  X,
  ArrowLeft,
  Heart,
  Code,
  Menu,
} from "lucide-react";

/* ── Types ── */
interface ForumComment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  likes: number;
  replies?: ForumComment[];
}

interface ForumPost {
  id: string;
  authorName: string;
  community: string;
  title: string;
  content: string;
  upvotes: number;
  userVote: "up" | "down" | null;
  hearts: number;
  userHearted: boolean;
  timestamp: string;
  imageUrl?: string;
  comments: ForumComment[];
}

/* ── xCelero Communities ── */
const COMMUNITIES = [
  { name: "Energy & Infrastructure", color: "bg-[#FF4D00]" },
  { name: "Life Sciences", color: "bg-emerald-600" },
  { name: "Digital Finance", color: "bg-amber-600" },
  { name: "Route Operations", color: "bg-sky-600" },
  { name: "Capital & Deals", color: "bg-rose-600" },
  { name: "Founders Corner", color: "bg-violet-600" },
];

/* ── Seed Posts ── */
const PRESET_POSTS: ForumPost[] = [
  {
    id: "post-1",
    authorName: "Dr. Amina Osei",
    community: "Life Sciences",
    title: "Regulatory pathways for diagnostics in East Africa — lessons from our Rwanda pilot",
    content:
      "We just completed a 6-month pilot for our point-of-care diagnostic in Kigali. The regulatory landscape is fragmented but navigable. Key takeaway: start with the Rwanda FDA pathway, then use mutual recognition to expand to Kenya and Uganda. Happy to share our full compliance timeline if anyone is interested.",
    upvotes: 87,
    userVote: null,
    hearts: 14,
    userHearted: false,
    timestamp: "3 hr. ago",
    comments: [
      {
        id: "c1",
        author: "Kofi Mensah",
        content: "This is incredibly useful. We've been spinning our wheels on the Kenya Medical Board side. Would love to see that timeline.",
        timestamp: "1 hr. ago",
        likes: 12,
      },
    ],
  },
  {
    id: "post-2",
    authorName: "Yusuf Hassan",
    community: "Energy & Infrastructure",
    title: "Mini-grid economics in Northern Nigeria: unit economics from Cohort 7",
    content:
      "Sharing our updated unit economics after 18 months of operations. Revenue per connection up 40% from initial projections. The key variable turns out to be productive-use appliances — once you bundle in refrigeration and welding, the revenue per user completely changes. Full breakdown in the thread.",
    upvotes: 142,
    userVote: null,
    hearts: 23,
    userHearted: false,
    imageUrl:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1200&q=80",
    timestamp: "5 hr. ago",
    comments: [],
  },
  {
    id: "post-3",
    authorName: "Fatima Al-Rashid",
    community: "Digital Finance",
    title: "Cross-border payments infrastructure: what we learned building across 3 corridors",
    content:
      "After 14 months of live operations across the Lagos-Accra-Nairobi corridor, here's what we wish we knew before starting. The biggest surprise wasn't regulatory — it was settlement timing. Mobile money settlement in East Africa is fundamentally different from West African bank-based rails. Thread below.",
    upvotes: 204,
    userVote: null,
    hearts: 31,
    userHearted: false,
    timestamp: "8 hr. ago",
    comments: [
      {
        id: "c2",
        author: "Samuel Mengistu",
        content: "The settlement timing issue is real. We lost 3 weeks on our first M-Pesa integration because we didn't account for the batch processing window.",
        timestamp: "6 hr. ago",
        likes: 8,
      },
    ],
  },
  {
    id: "post-4",
    authorName: "Chioma Adekunle",
    community: "Route Operations",
    title: "Hub utilization data: what 12 months of XEmbassy Lagos tells us",
    content:
      "We've been tracking desk utilization, meeting room bookings, and event attendance across XEmbassy Lagos for the past year. The data is clear: weekday co-working is nice, but the real flywheel is Friday masterclasses + weekend hack sessions. Sharing the full dashboard with anyone who DMs me.",
    upvotes: 56,
    userVote: null,
    hearts: 9,
    userHearted: false,
    timestamp: "12 hr. ago",
    comments: [],
  },
  {
    id: "post-5",
    authorName: "Amara Diallo",
    community: "Capital & Deals",
    title: "SPV deployment update: Q1 2026 portfolio construction",
    content:
      "Quick update on the four SPVs we deployed through last year. Aggregate IRR is tracking at 34% on a time-weighted basis. The life sciences allocation is the outperformer. Full LP memo going out next week. Happy to answer high-level questions here.",
    upvotes: 312,
    userVote: null,
    hearts: 44,
    userHearted: false,
    timestamp: "1 day ago",
    comments: [
      {
        id: "c3",
        author: "Ngozi Eze",
        content: "Is the life sciences outperformance driven by the Allele acquisition, or is it broader?",
        timestamp: "20 hr. ago",
        likes: 6,
        replies: [
          {
            id: "c3r1",
            author: "Amara Diallo",
            content: "Broader. Allele is the headline, but the diagnostics sub-basket is also performing well above baseline.",
            timestamp: "18 hr. ago",
            likes: 4,
          },
        ],
      },
    ],
  },
  {
    id: "post-6",
    authorName: "Liya Tadesse",
    community: "Founders Corner",
    title: "Hiring your first 5 engineers in Addis — what worked and what didn't",
    content:
      "We went from 0 to 5 engineers in 4 months. The conventional wisdom is to hire from the diaspora. We did the opposite — hired locally, invested heavily in onboarding, and it paid off. Retention is 100% after 12 months. Here's the playbook.",
    upvotes: 98,
    userVote: null,
    hearts: 19,
    userHearted: false,
    timestamp: "1 day ago",
    comments: [],
  },
];

/* ── Comment Node ── */
function CommentNode({
  comment,
  postId,
  replyingToCommentId,
  setReplyingToCommentId,
  replyContent,
  setReplyContent,
  handleAddReply,
}: {
  comment: ForumComment;
  postId: string;
  replyingToCommentId: string | null;
  setReplyingToCommentId: (id: string | null) => void;
  replyContent: string;
  setReplyContent: (content: string) => void;
  handleAddReply: (postId: string, commentId: string) => void;
}) {
  const community = COMMUNITIES.find((c) => comment.author.includes("Dr.")) || COMMUNITIES[0];
  return (
    <div className="group mt-1 pt-2">
      <div className="flex">
        <div className="flex flex-col items-center mr-2 relative group/line cursor-pointer shrink-0">
          <div className="w-[28px] h-[28px] rounded-full bg-[#FF4D00] overflow-hidden flex items-center justify-center font-bold text-white text-[10px] z-10">
            {comment.author[0]}
          </div>
          <div className="w-[2px] bg-[#111111]/10 group-hover/line:bg-[#111111]/20 transition-colors absolute top-8 bottom-[-8px] sm:bottom-[-16px]" />
        </div>

        <div className="flex-1 min-w-0 pb-1 sm:pb-3">
          <div className="flex items-center gap-2 text-[12px] mb-1">
            <span className="font-bold text-[#111111]">{comment.author}</span>
            <span className="text-[#111111]/40">• {comment.timestamp}</span>
          </div>
          <div className="text-[14px] text-[#111111]/70 leading-relaxed prose prose-slate max-w-none mb-0.5">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{comment.content}</ReactMarkdown>
          </div>

          <div className="flex flex-wrap items-center gap-0.5 sm:gap-1.5 mt-1 -ml-2">
            <div className="flex items-center">
              <button className="flex items-center justify-center p-1.5 hover:bg-[#111111]/5 rounded text-[#111111]/40 hover:text-[#FF4D00] transition-colors">
                <ArrowUp className="w-4 h-4" />
              </button>
              <span className="text-xs font-bold text-[#111111]/40 px-0.5">
                {comment.likes || "Vote"}
              </span>
              <button className="flex items-center justify-center p-1.5 hover:bg-[#111111]/5 rounded text-[#111111]/40 hover:text-[#111111]/60 transition-colors">
                <ArrowDown className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={() =>
                setReplyingToCommentId(replyingToCommentId === comment.id ? null : comment.id)
              }
              className="flex items-center gap-1.5 px-2 py-1.5 text-[#111111]/40 hover:bg-[#111111]/5 rounded-full transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span className="text-xs font-bold leading-none">Reply</span>
            </button>
            <button className="hidden sm:flex items-center gap-1.5 px-2 py-1.5 text-[#111111]/40 hover:bg-[#111111]/5 rounded transition-colors">
              <Share2 className="w-4 h-4" />
              <span className="text-xs font-bold leading-none">Share</span>
            </button>
          </div>

          {replyingToCommentId === comment.id && (
            <div className="mt-3 flex gap-2 items-start mb-3">
              <textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="What are your thoughts?"
                rows={3}
                className="flex-1 bg-[#FAFAFA] border border-[#111111]/10 focus:border-[#FF4D00]/30 focus:ring-1 focus:ring-[#FF4D00]/20 rounded px-3 py-2 text-sm text-[#111111] outline-none transition resize-y"
              />
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => handleAddReply(postId, comment.id)}
                  disabled={!replyContent.trim()}
                  className="px-4 py-1.5 bg-[#FF4D00] text-white font-bold rounded text-xs disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#FF4D00]/90 transition"
                >
                  Reply
                </button>
                <button
                  onClick={() => setReplyingToCommentId(null)}
                  className="px-4 py-1.5 bg-transparent text-[#111111]/50 hover:bg-[#111111]/5 font-bold rounded text-xs transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-0">
              {comment.replies.map((reply) => (
                <CommentNode
                  key={reply.id}
                  comment={reply}
                  postId={postId}
                  replyingToCommentId={replyingToCommentId}
                  setReplyingToCommentId={setReplyingToCommentId}
                  replyContent={replyContent}
                  setReplyContent={setReplyContent}
                  handleAddReply={handleAddReply}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   TOWN SQUARE PAGE
   ══════════════════════════════════════════════════════════════════════════ */
export function TownSquare() {
  const [posts, setPosts] = useState<ForumPost[]>(() => {
    if (typeof window === "undefined") return PRESET_POSTS;
    const saved = localStorage.getItem("xcelero_townsquare_posts");
    return saved ? JSON.parse(saved) : PRESET_POSTS;
  });

  const [activeCommunity, setActiveCommunity] = useState<string>("all");
  const [activeCategory, setActiveCategory] = useState<string>("home");
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [expandedPostId, setExpandedPostId] = useState<string | null>(null);
  const [commentText, setCommentText] = useState("");
  const [replyingToCommentId, setReplyingToCommentId] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [isComposing, setIsComposing] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const userName = "You";
  const userAvatarColor = "#FF4D00";

  const handleSave = (newPosts: ForumPost[]) => {
    localStorage.setItem("xcelero_townsquare_posts", JSON.stringify(newPosts));
    setPosts(newPosts);
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const created: ForumPost = {
      id: `post-${Date.now()}`,
      authorName: userName,
      community: activeCommunity === "all" ? COMMUNITIES[0].name : activeCommunity,
      title: newTitle,
      content: newContent,
      upvotes: 1,
      userVote: "up",
      hearts: 0,
      userHearted: false,
      timestamp: "Just now",
      comments: [],
    };
    handleSave([created, ...posts]);
    setNewTitle("");
    setNewContent("");
    setIsComposing(false);
  };

  const handleVote = (id: string, dir: "up" | "down", e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = posts.map((p) => {
      if (p.id !== id) return p;
      let diff = 0;
      let nextVote: "up" | "down" | null = dir;
      if (p.userVote === dir) {
        diff = dir === "up" ? -1 : 1;
        nextVote = null;
      } else if (p.userVote === null) {
        diff = dir === "up" ? 1 : -1;
      } else {
        diff = dir === "up" ? 2 : -2;
      }
      return { ...p, userVote: nextVote, upvotes: p.upvotes + diff };
    });
    handleSave(updated);
  };

  const handleHeart = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = posts.map((p) => {
      if (p.id !== id) return p;
      return { ...p, userHearted: !p.userHearted, hearts: p.hearts + (p.userHearted ? -1 : 1) };
    });
    handleSave(updated);
  };

  const handleAddComment = (postId: string) => {
    if (!commentText.trim()) return;
    const newComment: ForumComment = {
      id: `comment-${Date.now()}`,
      author: userName,
      content: commentText,
      timestamp: "Just now",
      likes: 0,
    };
    const updated = posts.map((p) => {
      if (p.id !== postId) return p;
      return { ...p, comments: [...p.comments, newComment] };
    });
    handleSave(updated);
    setCommentText("");
  };

  const handleAddReply = (postId: string, commentId: string) => {
    if (!replyContent.trim()) return;
    const newReply: ForumComment = {
      id: `reply-${Date.now()}`,
      author: userName,
      content: replyContent,
      timestamp: "Just now",
      likes: 0,
    };
    const updated = posts.map((p) => {
      if (p.id !== postId) return p;
      const addReplyToComment = (comments: ForumComment[]): ForumComment[] => {
        return comments.map((c) => {
          if (c.id === commentId) return { ...c, replies: [...(c.replies || []), newReply] };
          if (c.replies && c.replies.length > 0) return { ...c, replies: addReplyToComment(c.replies) };
          return c;
        });
      };
      return { ...p, comments: addReplyToComment(p.comments) };
    });
    handleSave(updated);
    setReplyContent("");
    setReplyingToCommentId(null);
  };

  const filteredPosts = useMemo(() => {
    let result = activeCommunity === "all" ? posts : posts.filter((p) => p.community === activeCommunity);
    if (activeCategory === "popular") result = [...result].sort((a, b) => b.upvotes - a.upvotes);
    else if (activeCategory === "news") result = [...result].sort((a, b) => b.id.localeCompare(a.id));
    else if (activeCategory === "explore") result = [...result].sort((a, b) => b.comments.length - a.comments.length);
    return result;
  }, [posts, activeCommunity, activeCategory]);

  const selectedPost = selectedPostId ? posts.find((p) => p.id === selectedPostId) : null;

  return (
    <div className="flex flex-col min-h-screen bg-white text-[#111111] font-sans text-sm">
      {/* ── TOP HEADER ── */}
      <header className="h-[56px] bg-white border-b border-[#111111]/10 px-4 md:px-8 flex items-center justify-between shrink-0 sticky top-0 z-50">
        <div className="flex items-center gap-4 min-w-0">
          <button
            className="xl:hidden p-2 hover:bg-[#111111]/5 rounded text-[#111111]/60"
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2.5 cursor-pointer select-none">
            <div className="w-8 h-8 bg-[#FF4D00] flex items-center justify-center">
              <MessageSquare className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="text-lg font-display font-medium tracking-tight text-[#111111]">
                Town<span className="text-[#111111]/30 font-normal"> Square</span>
              </span>
              <span className="hidden md:inline text-[10px] font-mono font-bold tracking-[0.15em] uppercase text-[#FF4D00] ml-3">
                XCitizen Forum
              </span>
            </div>
          </div>
        </div>

        <div className="flex-1 max-w-[500px] px-4 md:px-8 relative hidden sm:block">
          <div className="relative flex items-center bg-[#FAFAFA] hover:bg-[#F5F5F5] focus-within:bg-white focus-within:border-[#FF4D00]/30 focus-within:ring-1 focus-within:ring-[#FF4D00]/20 border border-[#111111]/10 rounded px-3 py-1.5 transition-colors">
            <Search className="w-4 h-4 text-[#111111]/30 shrink-0" />
            <input
              type="text"
              placeholder="Search discussions"
              className="flex-1 bg-transparent border-none text-sm text-[#111111] placeholder-[#111111]/30 outline-none ml-2 min-w-0"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 justify-end">
          <button
            onClick={() => setIsComposing(true)}
            className="flex items-center gap-1.5 px-4 py-1.5 bg-[#FF4D00] text-white text-[11px] font-bold uppercase tracking-[0.1em] hover:bg-[#FF4D00]/90 transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            <span className="hidden md:inline">New Post</span>
          </button>
          <button className="p-2 hover:bg-[#111111]/5 rounded text-[#111111]/40">
            <Bell className="w-5 h-5" />
          </button>
          <div
            className="w-8 h-8 flex items-center justify-center font-bold text-white text-xs ml-1"
            style={{ backgroundColor: userAvatarColor }}
          >
            {userName[0]}
          </div>
        </div>
      </header>

      {/* ── MAIN CONTENT ── */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* LEFT SIDEBAR */}
        {(!selectedPostId || typeof window !== "undefined") && (
          <aside
            className={`w-[260px] shrink-0 border-r border-[#111111]/10 overflow-y-auto hidden xl:block p-4 h-[calc(100vh-56px)] sticky top-[56px] ${
              mobileSidebarOpen ? "!block absolute z-40 bg-white h-[calc(100vh-56px)] shadow-lg" : ""
            }`}
          >
            <nav className="space-y-0.5 mb-6 pb-6 border-b border-[#111111]/10">
              {[
                { key: "home", icon: Home, label: "Home" },
                { key: "popular", icon: TrendingUp, label: "Popular" },
                { key: "news", icon: Newspaper, label: "Latest" },
                { key: "explore", icon: Compass, label: "Explore" },
              ].map(({ key, icon: Icon, label }) => (
                <button
                  key={key}
                  onClick={() => {
                    setActiveCategory(key);
                    setActiveCommunity("all");
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded transition-colors ${
                    activeCategory === key && activeCommunity === "all"
                      ? "bg-[#111111]/5 text-[#111111]"
                      : "hover:bg-[#111111]/5 text-[#111111]/60"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium text-[13px]">{label}</span>
                </button>
              ))}
            </nav>

            <div className="mb-6">
              <h3 className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#111111]/30 mb-3 px-3">
                Communities
              </h3>
              <div className="space-y-0.5">
                {COMMUNITIES.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => {
                      setActiveCommunity(c.name);
                      setMobileSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded transition-colors ${
                      activeCommunity === c.name
                        ? "bg-[#111111]/5 text-[#111111]"
                        : "hover:bg-[#111111]/5 text-[#111111]/60"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${c.color}`}
                    >
                      <span className="text-[8px] font-bold text-white uppercase">
                        {c.name[0]}
                      </span>
                    </div>
                    <span className="text-[13px] font-medium truncate">{c.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </aside>
        )}

        {/* CENTER FEED */}
        <div className="flex-1 overflow-y-auto w-full flex justify-center pt-6 px-0 sm:px-4 md:px-6 pb-12">
          <div className="flex max-w-[1040px] w-full gap-6 items-start justify-center">
            <main className="flex-1 min-w-0 max-w-[700px] w-full flex flex-col gap-4">
              {isComposing ? (
                /* ── COMPOSE VIEW ── */
                <div className="bg-white border border-[#111111]/10 p-0 overflow-hidden">
                  <div className="flex items-center justify-between p-4 border-b border-[#111111]/10">
                    <h2 className="text-lg font-display font-medium tracking-tight">
                      New discussion
                    </h2>
                    <button
                      onClick={() => setIsComposing(false)}
                      className="text-[#111111]/40 hover:text-[#111111] transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleCreatePost} className="p-4 flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                      <select
                        value={activeCommunity === "all" ? COMMUNITIES[0].name : activeCommunity}
                        onChange={(e) => setActiveCommunity(e.target.value)}
                        className="bg-[#FAFAFA] border border-[#111111]/10 rounded px-3 py-2 text-sm text-[#111111] font-medium outline-none cursor-pointer"
                      >
                        {COMMUNITIES.map((c) => (
                          <option key={c.name} value={c.name}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <input
                      autoFocus
                      type="text"
                      placeholder="Title*"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      maxLength={300}
                      className="w-full bg-transparent border border-[#111111]/10 focus:border-[#FF4D00]/30 focus:ring-1 focus:ring-[#FF4D00]/20 rounded px-4 py-3 text-[15px] font-medium text-[#111111] placeholder-[#111111]/30 outline-none transition"
                    />

                    <textarea
                      placeholder="Body text (optional)"
                      value={newContent}
                      onChange={(e) => setNewContent(e.target.value)}
                      rows={6}
                      className="w-full bg-transparent border border-[#111111]/10 focus:border-[#FF4D00]/30 focus:ring-1 focus:ring-[#FF4D00]/20 rounded px-4 py-3 text-[14px] text-[#111111]/70 placeholder-[#111111]/30 outline-none transition resize-y min-h-[120px]"
                    />

                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setIsComposing(false)}
                        className="px-5 py-2 text-sm font-bold text-[#111111]/50 hover:bg-[#111111]/5 rounded transition"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={!newTitle.trim()}
                        className="px-6 py-2 text-sm font-bold bg-[#FF4D00] text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#FF4D00]/90 rounded transition"
                      >
                        Post
                      </button>
                    </div>
                  </form>
                </div>
              ) : selectedPost ? (
                /* ── POST DETAIL VIEW ── */
                <div className="bg-white border border-[#111111]/10 overflow-hidden">
                  <div className="p-4 md:p-6 flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-[#111111]/40">
                        <button
                          onClick={() => setSelectedPostId(null)}
                          className="p-1 hover:bg-[#111111]/5 rounded transition-colors mr-1"
                        >
                          <ArrowLeft className="w-[18px] h-[18px] text-[#111111]/60" />
                        </button>
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                            COMMUNITIES.find((c) => c.name === selectedPost.community)?.color ||
                            "bg-[#FF4D00]"
                          }`}
                        >
                          <span className="text-[8px] font-bold text-white uppercase">
                            {selectedPost.community[0]}
                          </span>
                        </div>
                        <span className="font-bold text-[#111111]/60">{selectedPost.community}</span>
                        <span>•</span>
                        <span>{selectedPost.timestamp}</span>
                        <span>•</span>
                        <span className="text-[#111111]/60">{selectedPost.authorName}</span>
                      </div>
                      <button className="p-1 hover:bg-[#111111]/5 rounded transition-colors">
                        <MoreHorizontal className="w-5 h-5 text-[#111111]/30" />
                      </button>
                    </div>

                    <h1 className="text-xl font-display font-medium tracking-tight text-[#111111] leading-snug mt-1">
                      {selectedPost.title}
                    </h1>

                    {selectedPost.content && (
                      <div className="text-[14px] text-[#111111]/60 leading-relaxed prose prose-slate max-w-none py-1">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {selectedPost.content}
                        </ReactMarkdown>
                      </div>
                    )}

                    {selectedPost.imageUrl && (
                      <div className="mt-3 w-full overflow-hidden border border-[#111111]/10">
                        <img
                          src={selectedPost.imageUrl}
                          alt=""
                          className="w-full h-auto max-h-[500px] object-cover"
                        />
                      </div>
                    )}

                    {/* Post Actions */}
                    <div className="flex items-center gap-2 py-2 mt-2 border-t border-b border-[#111111]/5">
                      <div className="flex items-center bg-[#FAFAFA] rounded border border-[#111111]/5">
                        <button
                          onClick={(e) => handleVote(selectedPost.id, "up", e)}
                          className={`p-1.5 hover:bg-[#111111]/5 rounded-l transition-colors ${
                            selectedPost.userVote === "up" ? "text-[#FF4D00]" : "text-[#111111]/30"
                          }`}
                        >
                          <ArrowUp className="w-4 h-4" strokeWidth={2.5} />
                        </button>
                        <span
                          className={`text-[13px] font-bold px-1.5 ${
                            selectedPost.userVote === "up"
                              ? "text-[#FF4D00]"
                              : selectedPost.userVote === "down"
                              ? "text-[#111111]/40"
                              : "text-[#111111]/50"
                          }`}
                        >
                          {selectedPost.upvotes}
                        </span>
                        <button
                          onClick={(e) => handleVote(selectedPost.id, "down", e)}
                          className={`p-1.5 hover:bg-[#111111]/5 rounded-r transition-colors ${
                            selectedPost.userVote === "down" ? "text-[#111111]/60" : "text-[#111111]/30"
                          }`}
                        >
                          <ArrowDown className="w-4 h-4" strokeWidth={2.5} />
                        </button>
                      </div>
                      <button
                        onClick={(e) => handleHeart(selectedPost.id, e)}
                        className="flex items-center gap-1 px-2.5 py-1.5 bg-[#FAFAFA] hover:bg-[#111111]/5 border border-[#111111]/5 rounded transition-colors"
                      >
                        <Heart
                          className={`w-4 h-4 ${
                            selectedPost.userHearted
                              ? "text-[#FF4D00] fill-[#FF4D00]"
                              : "text-[#111111]/30"
                          }`}
                        />
                        <span className="text-[13px] font-bold text-[#111111]/50">
                          {selectedPost.hearts || ""}
                        </span>
                      </button>
                      <button className="flex items-center gap-1 px-2.5 py-1.5 bg-[#FAFAFA] hover:bg-[#111111]/5 border border-[#111111]/5 rounded transition-colors">
                        <MessageSquare className="w-4 h-4 text-[#111111]/30" />
                        <span className="text-[13px] font-bold text-[#111111]/50">
                          {selectedPost.comments.length}
                        </span>
                      </button>
                      <button className="flex items-center gap-1 px-2.5 py-1.5 bg-[#FAFAFA] hover:bg-[#111111]/5 border border-[#111111]/5 rounded transition-colors">
                        <Share2 className="w-4 h-4 text-[#111111]/30" />
                        <span className="text-[13px] font-bold text-[#111111]/50 hidden sm:inline">
                          Share
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Add Comment */}
                  <div className="px-4 md:px-6 py-3 border-t border-[#111111]/5">
                    <div className="flex gap-3 items-start">
                      <div
                        className="w-8 h-8 flex items-center justify-center font-bold text-white text-xs shrink-0"
                        style={{ backgroundColor: userAvatarColor }}
                      >
                        {userName[0]}
                      </div>
                      <div className="flex-1 flex flex-col gap-2">
                        <textarea
                          value={commentText}
                          onChange={(e) => setCommentText(e.target.value)}
                          placeholder="Add a comment"
                          rows={2}
                          className="w-full bg-[#FAFAFA] border border-[#111111]/10 focus:border-[#FF4D00]/30 focus:ring-1 focus:ring-[#FF4D00]/20 rounded px-3 py-2 text-sm text-[#111111] outline-none transition resize-y"
                        />
                        <div className="flex justify-end">
                          <button
                            onClick={() => handleAddComment(selectedPost.id)}
                            disabled={!commentText.trim()}
                            className="px-4 py-1.5 bg-[#FF4D00] text-white font-bold rounded text-xs disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#FF4D00]/90 transition"
                          >
                            Comment
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Comments */}
                  <div className="px-4 md:px-6 pb-6 border-t border-[#111111]/5">
                    <div className="py-3">
                      <span className="text-[11px] font-mono font-bold tracking-[0.15em] uppercase text-[#111111]/30">
                        {selectedPost.comments.length} Comments
                      </span>
                    </div>
                    {selectedPost.comments.length === 0 ? (
                      <div className="py-8 text-center text-[#111111]/30 text-sm">
                        No comments yet. Start the discussion.
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {selectedPost.comments.map((comment) => (
                          <CommentNode
                            key={comment.id}
                            comment={comment}
                            postId={selectedPost.id}
                            replyingToCommentId={replyingToCommentId}
                            setReplyingToCommentId={setReplyingToCommentId}
                            replyContent={replyContent}
                            setReplyContent={setReplyContent}
                            handleAddReply={handleAddReply}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                /* ── FEED VIEW ── */
                <>
                  {/* Compact Create Post */}
                  <div className="bg-white border border-[#111111]/10 p-3 flex gap-3 items-center sticky top-[56px] z-40">
                    <div
                      className="w-9 h-9 flex items-center justify-center font-bold text-white text-sm shrink-0"
                      style={{ backgroundColor: userAvatarColor }}
                    >
                      {userName[0]}
                    </div>
                    <input
                      type="text"
                      placeholder="Start a discussion"
                      readOnly
                      onClick={() => setIsComposing(true)}
                      className="flex-1 bg-[#FAFAFA] hover:bg-[#F5F5F5] cursor-text border border-[#111111]/10 px-4 py-2 text-[#111111]/40 outline-none transition-colors text-sm"
                    />
                    <button
                      onClick={() => setIsComposing(true)}
                      className="p-2 hover:bg-[#111111]/5 rounded text-[#111111]/30 hover:text-[#FF4D00] transition-colors"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Community filter bar (mobile) */}
                  <div className="xl:hidden flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                    <button
                      onClick={() => setActiveCommunity("all")}
                      className={`shrink-0 px-3 py-1.5 text-[11px] font-mono font-bold tracking-[0.1em] uppercase border transition-colors ${
                        activeCommunity === "all"
                          ? "bg-[#111111] text-white border-[#111111]"
                          : "bg-white text-[#111111]/40 border-[#111111]/10 hover:border-[#111111]/20"
                      }`}
                    >
                      All
                    </button>
                    {COMMUNITIES.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setActiveCommunity(c.name)}
                        className={`shrink-0 px-3 py-1.5 text-[11px] font-mono font-bold tracking-[0.1em] uppercase border transition-colors ${
                          activeCommunity === c.name
                            ? "bg-[#111111] text-white border-[#111111]"
                            : "bg-white text-[#111111]/40 border-[#111111]/10 hover:border-[#111111]/20"
                        }`}
                      >
                        {c.name.split(" ")[0]}
                      </button>
                    ))}
                  </div>

                  {/* Feed items */}
                  {filteredPosts.map((post) => {
                    const isUpvoted = post.userVote === "up";
                    const isDownvoted = post.userVote === "down";
                    const communityDetails = COMMUNITIES.find((c) => c.name === post.community);

                    return (
                      <article
                        key={post.id}
                        className="bg-white border border-[#111111]/10 hover:border-[#FF4D00]/20 transition-colors overflow-hidden group"
                      >
                        <div
                          className="p-4 flex flex-col gap-2 cursor-pointer"
                          onClick={() => setSelectedPostId(post.id)}
                        >
                          {/* Header */}
                          <div className="flex items-center gap-1.5 text-xs text-[#111111]/40">
                            <div
                              className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                                communityDetails?.color || "bg-[#FF4D00]"
                              }`}
                            >
                              <span className="text-[8px] font-bold text-white uppercase">
                                {post.community[0]}
                              </span>
                            </div>
                            <span
                              className="font-bold text-[#111111]/60 hover:underline"
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveCommunity(post.community);
                              }}
                            >
                              {post.community}
                            </span>
                            <span>•</span>
                            <span>{post.timestamp}</span>
                            <span>•</span>
                            <span className="text-[#111111]/40">{post.authorName}</span>
                          </div>

                          {/* Content */}
                          <h3 className="text-base font-display font-medium tracking-tight text-[#111111] leading-snug pr-4">
                            {post.title}
                          </h3>
                          {post.content && (
                            <div className="text-[13px] text-[#111111]/50 leading-relaxed line-clamp-3">
                              {post.content}
                            </div>
                          )}
                          {post.imageUrl && (
                            <div className="mt-2 w-full max-h-[300px] overflow-hidden border border-[#111111]/10">
                              <img
                                src={post.imageUrl}
                                alt=""
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                        </div>

                        {/* Actions bar */}
                        <div className="flex items-center gap-2 px-4 pb-3">
                          <div className="flex items-center bg-[#FAFAFA] border border-[#111111]/5 rounded">
                            <button
                              onClick={(e) => handleVote(post.id, "up", e)}
                              className={`p-1.5 hover:bg-[#111111]/5 rounded-l transition-colors ${
                                isUpvoted ? "text-[#FF4D00]" : "text-[#111111]/30 hover:text-[#FF4D00]"
                              }`}
                            >
                              <ArrowUp className="w-4 h-4" strokeWidth={2.5} />
                            </button>
                            <span
                              className={`text-[13px] font-bold px-1 ${
                                isUpvoted
                                  ? "text-[#FF4D00]"
                                  : isDownvoted
                                  ? "text-[#111111]/40"
                                  : "text-[#111111]/40"
                              }`}
                            >
                              {post.upvotes}
                            </span>
                            <button
                              onClick={(e) => handleVote(post.id, "down", e)}
                              className={`p-1.5 hover:bg-[#111111]/5 rounded-r transition-colors ${
                                isDownvoted
                                  ? "text-[#111111]/60"
                                  : "text-[#111111]/30 hover:text-[#111111]/60"
                              }`}
                            >
                              <ArrowDown className="w-4 h-4" strokeWidth={2.5} />
                            </button>
                          </div>
                          <button
                            onClick={(e) => handleHeart(post.id, e)}
                            className="flex items-center gap-1 px-2 py-1.5 bg-[#FAFAFA] hover:bg-[#111111]/5 border border-[#111111]/5 rounded transition-colors"
                          >
                            <Heart
                              className={`w-4 h-4 ${
                                post.userHearted
                                  ? "text-[#FF4D00] fill-[#FF4D00]"
                                  : "text-[#111111]/30"
                              }`}
                            />
                            <span className="text-[13px] font-bold text-[#111111]/40">
                              {post.hearts || ""}
                            </span>
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedPostId(post.id);
                            }}
                            className="flex items-center gap-1 px-2 py-1.5 bg-[#FAFAFA] hover:bg-[#111111]/5 border border-[#111111]/5 rounded transition-colors"
                          >
                            <MessageSquare className="w-4 h-4 text-[#111111]/30" />
                            <span className="text-[13px] font-bold text-[#111111]/40">
                              {post.comments.length}
                            </span>
                          </button>
                          <button className="flex items-center gap-1 px-2 py-1.5 bg-[#FAFAFA] hover:bg-[#111111]/5 border border-[#111111]/5 rounded transition-colors ml-auto">
                            <Share2 className="w-4 h-4 text-[#111111]/30" />
                          </button>
                        </div>
                      </article>
                    );
                  })}
                </>
              )}
            </main>

            {/* RIGHT SIDEBAR — Trending */}
            <aside className="w-[300px] shrink-0 hidden lg:block">
              <div className="border border-[#111111]/10 overflow-hidden sticky top-[72px]">
                <div className="p-4 border-b border-[#111111]/10 bg-[#111111] text-white">
                  <h2 className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#FF4D00]">
                    Town Square
                  </h2>
                  <p className="text-[12px] text-white/50 mt-1 leading-relaxed">
                    The XCitizen forum. Where builders share what they&apos;re
                    learning, what they&apos;re building, and what they need.
                  </p>
                </div>

                <div className="p-4">
                  <h3 className="text-[10px] font-mono font-bold tracking-[0.15em] uppercase text-[#111111]/30 mb-3">
                    Trending Discussions
                  </h3>
                  {posts.slice(0, 5).map((post) => {
                    const postCommunity = COMMUNITIES.find((c) => c.name === post.community);
                    return (
                      <div
                        key={`trending-${post.id}`}
                        onClick={() => setSelectedPostId(post.id)}
                        className="py-3 border-b border-[#111111]/5 last:border-b-0 cursor-pointer hover:bg-[#FAFAFA] -mx-2 px-2 transition-colors"
                      >
                        <div className="flex items-center gap-1.5 text-[11px] text-[#111111]/30 mb-1">
                          <div
                            className={`w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 ${
                              postCommunity?.color || "bg-[#FF4D00]"
                            }`}
                          >
                            <span className="text-[6px] font-bold text-white uppercase">
                              {post.community[0]}
                            </span>
                          </div>
                          <span className="font-medium text-[#111111]/50 truncate">
                            {post.community}
                          </span>
                          <span>•</span>
                          <span>{post.timestamp}</span>
                        </div>
                        <h4 className="text-[13px] font-medium text-[#111111]/70 leading-snug line-clamp-2">
                          {post.title}
                        </h4>
                        <div className="text-[10px] text-[#111111]/30 mt-1 flex items-center gap-2">
                          <span>{post.upvotes} upvotes</span>
                          <span>•</span>
                          <span>{post.comments.length} comments</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="px-4 py-3 border-t border-[#111111]/5 text-[10px] text-[#111111]/20 font-mono">
                  xCelero Town Square © 2026
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
