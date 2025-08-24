---
layout: page
title: Projects
subtitle: A showcase of my work and creations
css: 
  - "/assets/css/github-projects.css"
  - "/assets/css/projects.css"
js: 
  - "/assets/js/github-projects.js"
  - "/assets/js/projects.js"
---

<div class="projects-header">
  <div class="container">
    <h1 class="projects-title">My Projects</h1>
    <p class="projects-subtitle">
      Explore my collection of software development projects, from web applications to open-source contributions. 
      All projects are automatically fetched from my GitHub repositories.
    </p>
  </div>
</div>

<div class="projects-container">
  <div class="projects-filters">
    <button class="filter-btn active" data-filter="all">All Projects</button>
    <button class="filter-btn" data-filter="web">Web Development</button>
    <button class="filter-btn" data-filter="programming">Programming</button>
    <button class="filter-btn" data-filter="open-source">Open Source</button>
  </div>
  
  <div id="projects-container">
    <!-- Projects will be loaded here via JavaScript -->
  </div>
</div>

<script>
// Enhanced projects page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize GitHub projects fetcher
    const gitHubFetcher = new GitHubProjectsFetcher();
    gitHubFetcher.renderProjects('projects-container');
    
    // Filter functionality (will be enhanced based on loaded projects)
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            const projectCards = document.querySelectorAll('.project-card');
            
            projectCards.forEach(card => {
                if (filter === 'all') {
                    card.style.display = 'block';
                } else {
                    // Simple filtering based on project topics or language
                    const topics = card.querySelectorAll('.topic-tag');
                    const language = card.querySelector('.project-language');
                    
                    let shouldShow = false;
                    
                    if (filter === 'web') {
                        shouldShow = Array.from(topics).some(topic => 
                            ['website', 'web', 'html', 'css', 'javascript'].includes(topic.textContent.toLowerCase())
                        ) || (language && ['HTML', 'CSS', 'JavaScript'].includes(language.textContent.trim()));
                    } else if (filter === 'programming') {
                        shouldShow = language && ['Python', 'Java', 'C++', 'JavaScript', 'TypeScript'].includes(language.textContent.trim());
                    } else if (filter === 'open-source') {
                        shouldShow = Array.from(topics).some(topic => 
                            ['open-source', 'opensource', 'library', 'framework'].includes(topic.textContent.toLowerCase())
                        );
                    }
                    
                    card.style.display = shouldShow ? 'block' : 'none';
                }
            });
        });
    });
});
</script>