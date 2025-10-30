function Header() {
  try {
    const currentPath = window.location.pathname;
    const isChat = currentPath.includes('index.html') || currentPath === '/';
    const isDashboard = currentPath.includes('dashboard.html');
    
    return (
      <header className="w-full bg-transparent px-6 py-4" data-name="header" data-file="components/Header.js">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl gradient-bg flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <div className="icon-heart text-2xl text-white"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Eunoia</h1>
              <p className="text-xs text-white/70">AI Emotional Companion</p>
            </div>
          </div>
          
          <nav className="flex items-center gap-3">
            <a href="index.html" className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all duration-300 ${
              isChat 
                ? 'bg-white text-gray-900 shadow-lg' 
                : 'text-white hover:bg-white/20'
            }`}>
              <div className="icon-message-circle text-lg"></div>
              <span>Chat</span>
            </a>
            <a href="dashboard.html" className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all duration-300 ${
              isDashboard 
                ? 'bg-white text-gray-900 shadow-lg' 
                : 'text-white hover:bg-white/20'
            }`}>
              <div className="icon-chart-bar text-lg"></div>
              <span>Dashboard</span>
            </a>
          </nav>
        </div>
      </header>
    );
  } catch (error) {
    console.error('Header component error:', error);
    return null;
  }
}