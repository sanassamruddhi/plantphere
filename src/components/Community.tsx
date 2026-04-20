import { 
  MessageSquare, 
  Heart, 
  Share2, 
  MoreHorizontal, 
  Plus, 
  TrendingUp, 
  Users, 
  Image as ImageIcon, 
  Video, 
  Hash,
  Send,
  Bookmark
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'motion/react';
import { POSTS, TRENDING_TOPICS } from '@/src/constants';
import { useState } from 'react';

export default function Community() {
  const [activeTab, setActiveTab] = useState('Feed');
  const tabs = ['Feed', 'Trending', 'Following', 'Groups'];

  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-12 gap-10">
        
        {/* Left Sidebar - Navigation & Profile */}
        <aside className="lg:col-span-3 hidden lg:block space-y-8">
          <div className="glass-card p-8 rounded-[2.5rem] text-center border-white/5">
            <div className="relative inline-block mb-6">
              <div className="absolute -inset-2 bg-gradient-to-tr from-primary to-accent rounded-full blur-md opacity-50" />
              <Avatar className="w-24 h-24 border-4 border-background relative">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </div>
            <h3 className="text-xl font-bold mb-1">John Doe</h3>
            <p className="text-sm text-muted-foreground mb-6 font-medium">@leafy_explorer</p>
            <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-6">
              <div>
                <p className="text-lg font-bold">1.2k</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Followers</p>
              </div>
              <div>
                <p className="text-lg font-bold">450</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Following</p>
              </div>
            </div>
          </div>

          <div className="glass-card p-6 rounded-[2.5rem] border-white/5">
            <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-6 px-4">Menu</h4>
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-sm font-bold transition-all ${
                    activeTab === tab 
                      ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                      : 'text-muted-foreground hover:bg-white/5 hover:text-foreground'
                  }`}
                >
                  {tab === 'Feed' && <Users className="w-5 h-5" />}
                  {tab === 'Trending' && <TrendingUp className="w-5 h-5" />}
                  {tab === 'Following' && <Heart className="w-5 h-5" />}
                  {tab === 'Groups' && <Hash className="w-5 h-5" />}
                  {tab}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Feed */}
        <main className="lg:col-span-6 space-y-8">
          {/* Create Post */}
          <div className="glass-card p-6 rounded-[2.5rem] border-white/5">
            <div className="flex gap-4 mb-6">
              <Avatar className="w-12 h-12">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <textarea 
                placeholder="Share your plant journey..."
                className="flex-1 bg-transparent border-none outline-none resize-none py-2 text-lg placeholder:text-muted-foreground/50"
                rows={2}
              />
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-white/5">
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" className="rounded-xl hover:bg-primary/10 hover:text-primary">
                  <ImageIcon className="w-5 h-5 mr-2" />
                  Photo
                </Button>
                <Button variant="ghost" size="sm" className="rounded-xl hover:bg-accent/10 hover:text-accent">
                  <Video className="w-5 h-5 mr-2" />
                  Video
                </Button>
              </div>
              <Button className="btn-primary py-2 px-6 rounded-xl h-auto">Post</Button>
            </div>
          </div>

          {/* Posts List */}
          <div className="space-y-8">
            {POSTS.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card rounded-[2.5rem] overflow-hidden border-white/5"
              >
                {/* Post Header */}
                <div className="p-6 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-12 h-12 border-2 border-primary/20">
                      <AvatarImage src={post.user.avatar} />
                      <AvatarFallback>{post.user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-bold">{post.user.name}</h4>
                      <p className="text-xs text-muted-foreground font-medium">{post.time}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <MoreHorizontal className="w-5 h-5" />
                  </Button>
                </div>

                {/* Post Content */}
                <div className="px-6 pb-4">
                  <p className="text-lg leading-relaxed mb-4">{post.caption}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map(tag => (
                      <span key={tag} className="text-primary font-bold text-sm hover:underline cursor-pointer">#{tag}</span>
                    ))}
                  </div>
                </div>

                {/* Post Media */}
                <div className="relative aspect-square sm:aspect-video bg-black/20">
                  {post.video ? (
                    <video 
                      src={post.video} 
                      controls 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img 
                      src={post.image} 
                      alt="Post" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  )}
                </div>

                {/* Post Actions */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-6">
                      <button className="flex items-center gap-2 group">
                        <div className="p-2 rounded-full group-hover:bg-red-500/10 transition-colors">
                          <Heart className="w-6 h-6 group-hover:text-red-500 transition-colors" />
                        </div>
                        <span className="text-sm font-bold">{post.likes}</span>
                      </button>
                      <button className="flex items-center gap-2 group">
                        <div className="p-2 rounded-full group-hover:bg-primary/10 transition-colors">
                          <MessageSquare className="w-6 h-6 group-hover:text-primary transition-colors" />
                        </div>
                        <span className="text-sm font-bold">{post.comments.length}</span>
                      </button>
                      <button className="flex items-center gap-2 group">
                        <div className="p-2 rounded-full group-hover:bg-accent/10 transition-colors">
                          <Share2 className="w-6 h-6 group-hover:text-accent transition-colors" />
                        </div>
                        <span className="text-sm font-bold">{post.shares}</span>
                      </button>
                    </div>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <Bookmark className="w-6 h-6" />
                    </Button>
                  </div>

                  {/* Comments Preview */}
                  {post.comments.length > 0 && (
                    <div className="space-y-4 pt-6 border-t border-white/5">
                      {post.comments.map(comment => (
                        <div key={comment.id} className="flex gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback>{comment.user[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 bg-white/5 p-3 rounded-2xl text-sm">
                            <p><span className="font-bold mr-2">{comment.user}</span>{comment.text}</p>
                            <p className="text-[10px] text-muted-foreground mt-1 font-bold uppercase">{comment.time}</p>
                          </div>
                        </div>
                      ))}
                      <div className="flex gap-3 items-center pt-2">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" />
                        </Avatar>
                        <div className="flex-1 relative">
                          <input 
                            type="text" 
                            placeholder="Add a comment..."
                            className="w-full bg-white/5 border-none rounded-full py-2 px-4 pr-10 text-sm outline-none focus:bg-white/10 transition-all"
                          />
                          <Send className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary cursor-pointer" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </main>

        {/* Right Sidebar - Trending & Suggestions */}
        <aside className="lg:col-span-3 space-y-8">
          <div className="glass-card p-8 rounded-[2.5rem] border-white/5">
            <h4 className="text-xl font-bold mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Trending Topics
            </h4>
            <div className="space-y-6">
              {TRENDING_TOPICS.map((topic) => (
                <div key={topic.id} className="group cursor-pointer">
                  <p className="text-sm font-bold group-hover:text-primary transition-colors">{topic.name}</p>
                  <p className="text-xs text-muted-foreground font-medium">{topic.postsCount} posts</p>
                </div>
              ))}
            </div>
            <Button variant="link" className="text-primary font-bold p-0 mt-6">Show More</Button>
          </div>

          <div className="glass-card p-8 rounded-[2.5rem] border-white/5">
            <h4 className="text-xl font-bold mb-6">Who to follow</h4>
            <div className="space-y-6">
              {[
                { name: 'PlantDoctor', handle: '@dr_green', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Doc' },
                { name: 'UrbanJungle', handle: '@city_plants', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Urban' },
                { name: 'RareFinds', handle: '@rare_collector', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rare' },
              ].map((user) => (
                <div key={user.handle} className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="text-sm font-bold truncate">{user.name}</p>
                      <p className="text-[10px] text-muted-foreground font-medium truncate">{user.handle}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="rounded-full border-primary/20 text-primary hover:bg-primary hover:text-white h-8 px-4 text-xs font-bold">
                    Follow
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
