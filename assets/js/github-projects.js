// GitHub Projects Fetcher
class GitHubProjectsFetcher {
    constructor(username = 'adityakad') {
        this.username = username;
        this.apiUrl = `https://api.github.com/users/${username}/repos`;
        this.projectsContainer = null;
    }

    async fetchProjects() {
        try {
            const response = await fetch(this.apiUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const repos = await response.json();
            
            // Filter and sort repositories
            const filteredRepos = repos
                .filter(repo => !repo.fork && !repo.archived)
                .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
                .slice(0, 6); // Show top 6 projects

            return filteredRepos;
        } catch (error) {
            console.error('Error fetching GitHub projects:', error);
            return this.getFallbackProjects();
        }
    }

    getFallbackProjects() {
        // Fallback projects if API fails
        return [
            {
                name: 'adityakad.github.io',
                description: 'Personal portfolio website built with Jekyll',
                html_url: 'https://github.com/adityakad/adityakad.github.io',
                language: 'HTML',
                topics: ['portfolio', 'jekyll', 'website'],
                stargazers_count: 0,
                updated_at: new Date().toISOString()
            }
        ];
    }

    createProjectCard(project) {
        const languageColors = {
            'JavaScript': '#f1e05a',
            'Python': '#3572A5',
            'HTML': '#e34c26',
            'CSS': '#563d7c',
            'Java': '#b07219',
            'TypeScript': '#2b7489',
            'C++': '#f34b7d',
            'PHP': '#4F5D95',
            'Ruby': '#701516',
            'Go': '#00ADD8',
            'Swift': '#fa7343',
            'Kotlin': '#F18E33'
        };

        const languageColor = languageColors[project.language] || '#6c757d';
        const topics = project.topics || [];
        const description = project.description || 'No description available';
        const stars = project.stargazers_count || 0;
        
        // Format last updated
        const lastUpdated = new Date(project.updated_at);
        const timeAgo = this.getTimeAgo(lastUpdated);

        return `
            <div class="project-card" data-category="web">
                <div class="project-header">
                    <div class="project-icon">
                        <i class="fab fa-github"></i>
                    </div>
                    <div class="project-stats">
                        <span class="project-stars">
                            <i class="fas fa-star"></i> ${stars}
                        </span>
                    </div>
                </div>
                
                <div class="project-content">
                    <h3 class="project-title">
                        <a href="${project.html_url}" target="_blank" rel="noopener noreferrer">
                            ${project.name}
                        </a>
                    </h3>
                    <p class="project-description">${description}</p>
                    
                    <div class="project-meta">
                        ${project.language ? `
                            <span class="project-language">
                                <span class="language-color" style="background-color: ${languageColor};"></span>
                                ${project.language}
                            </span>
                        ` : ''}
                        <span class="project-updated">Updated ${timeAgo}</span>
                    </div>
                    
                    ${topics.length > 0 ? `
                        <div class="project-topics">
                            ${topics.slice(0, 3).map(topic => `
                                <span class="topic-tag">${topic}</span>
                            `).join('')}
                        </div>
                    ` : ''}
                </div>
                
                <div class="project-actions">
                    <a href="${project.html_url}" target="_blank" rel="noopener noreferrer" class="btn-project">
                        <i class="fab fa-github"></i> View Code
                    </a>
                    ${project.homepage ? `
                        <a href="${project.homepage}" target="_blank" rel="noopener noreferrer" class="btn-project btn-live">
                            <i class="fas fa-external-link-alt"></i> Live Demo
                        </a>
                    ` : ''}
                </div>
            </div>
        `;
    }

    getTimeAgo(date) {
        const now = new Date();
        const diffInSeconds = Math.floor((now - date) / 1000);
        
        const intervals = {
            year: 31536000,
            month: 2592000,
            week: 604800,
            day: 86400,
            hour: 3600,
            minute: 60
        };

        for (const [unit, seconds] of Object.entries(intervals)) {
            const interval = Math.floor(diffInSeconds / seconds);
            if (interval >= 1) {
                return `${interval} ${unit}${interval === 1 ? '' : 's'} ago`;
            }
        }

        return 'Just now';
    }

    async renderProjects(containerId = 'projects-container') {
        this.projectsContainer = document.getElementById(containerId);
        
        if (!this.projectsContainer) {
            console.warn(`Container with id "${containerId}" not found`);
            return;
        }

        // Show loading state
        this.projectsContainer.innerHTML = `
            <div class="loading-projects">
                <div class="loading-spinner"></div>
                <p>Loading projects from GitHub...</p>
            </div>
        `;

        try {
            const projects = await this.fetchProjects();
            
            if (projects.length === 0) {
                this.projectsContainer.innerHTML = `
                    <div class="no-projects">
                        <i class="fab fa-github" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.3;"></i>
                        <p>No projects found.</p>
                    </div>
                `;
                return;
            }

            const projectsHTML = projects
                .map(project => this.createProjectCard(project))
                .join('');

            this.projectsContainer.innerHTML = `
                <div class="projects-grid">
                    ${projectsHTML}
                </div>
            `;

            // Add animation classes
            setTimeout(() => {
                const cards = this.projectsContainer.querySelectorAll('.project-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('animate-in');
                    }, index * 100);
                });
            }, 100);

        } catch (error) {
            console.error('Error rendering projects:', error);
            this.projectsContainer.innerHTML = `
                <div class="error-projects">
                    <i class="fas fa-exclamation-triangle" style="font-size: 3rem; margin-bottom: 1rem; color: var(--danger-color);"></i>
                    <p>Unable to load projects. Please try again later.</p>
                </div>
            `;
        }
    }

    // Method to update stats based on fetched projects
    async updateProjectStats() {
        try {
            const projects = await this.fetchProjects();
            const totalStars = projects.reduce((sum, repo) => sum + repo.stargazers_count, 0);
            const languages = [...new Set(projects.map(repo => repo.language).filter(Boolean))];
            
            // Update stats if elements exist
            const projectsCountElement = document.querySelector('[data-stat="projects"]');
            const starsCountElement = document.querySelector('[data-stat="stars"]');
            const languagesCountElement = document.querySelector('[data-stat="languages"]');
            
            if (projectsCountElement) {
                this.animateCounter(projectsCountElement, projects.length);
            }
            
            if (starsCountElement) {
                this.animateCounter(starsCountElement, totalStars);
            }
            
            if (languagesCountElement) {
                this.animateCounter(languagesCountElement, languages.length);
            }
            
        } catch (error) {
            console.error('Error updating project stats:', error);
        }
    }

    animateCounter(element, target) {
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            if (current < target) {
                current += increment;
                element.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };

        updateCounter();
    }
}

// Auto-initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const gitHubFetcher = new GitHubProjectsFetcher();
    
    // Update stats if on home page
    if (document.querySelector('.stats-section')) {
        gitHubFetcher.updateProjectStats();
    }
    
    // Render projects if container exists
    if (document.getElementById('github-projects') || document.getElementById('projects-container')) {
        gitHubFetcher.renderProjects(document.getElementById('github-projects') ? 'github-projects' : 'projects-container');
    }
});

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GitHubProjectsFetcher;
}