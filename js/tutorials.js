// Tutorials page specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeTutorialsPage();
});

function initializeTutorialsPage() {
    // Initialize filter functionality
    initializeFilters();
    
    // Initialize tutorial cards
    initializeTutorialCards();
    
    // Initialize search functionality
    initializeSearch();
    
    // Initialize scroll animations
    initializeScrollAnimations();
}

function initializeFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const tutorialCards = document.querySelectorAll('.tutorial-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter tutorial cards
            filterTutorials(category, tutorialCards);
        });
    });
}

function filterTutorials(category, cards) {
    cards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        
        if (category === 'all' || cardCategory === category) {
            card.style.display = 'block';
            card.classList.add('visible');
            card.classList.remove('hidden');
            
            // Add animation
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
            }, 100);
        } else {
            card.classList.add('hidden');
            card.classList.remove('visible');
            
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
}

function initializeTutorialCards() {
    const tutorialCards = document.querySelectorAll('.tutorial-card');
    
    tutorialCards.forEach(card => {
        // Add hover effect
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Add click effect
        const tutorialLink = card.querySelector('.tutorial-link');
        if (tutorialLink) {
            tutorialLink.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Add loading state
                const originalText = this.textContent;
                this.textContent = 'Loading...';
                this.style.opacity = '0.7';
                
                // Simulate loading (replace with actual tutorial loading)
                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.opacity = '1';
                    
                    // Show success message
                    utils.showNotification('Tutorial started successfully!', 'success');
                }, 1500);
            });
        }
        
        // Add difficulty color coding with beauty theme
        const difficulty = card.querySelector('.difficulty');
        if (difficulty) {
            const difficultyLevel = difficulty.textContent.toLowerCase();
            switch (difficultyLevel) {
                case 'beginner':
                    difficulty.style.backgroundColor = '#ffeaa7';
                    difficulty.style.color = '#d63031';
                    break;
                case 'intermediate':
                    difficulty.style.backgroundColor = '#fd79a8';
                    difficulty.style.color = '#ffffff';
                    break;
                case 'advanced':
                    difficulty.style.backgroundColor = '#6c5ce7';
                    difficulty.style.color = '#ffffff';
                    break;
            }
        }
    });
}

function initializeSearch() {
    // Create search input if it doesn't exist
    const searchContainer = document.querySelector('.tutorial-filters');
    if (searchContainer && !document.querySelector('.tutorial-search')) {
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = 'Search beauty tutorials...';
        searchInput.className = 'tutorial-search';
        searchInput.style.cssText = `
            padding: 10px 15px;
            border: 2px solid #ddd;
            border-radius: 25px;
            margin-bottom: 1rem;
            width: 100%;
            max-width: 400px;
            font-size: 1rem;
            outline: none;
            transition: border-color 0.3s ease;
        `;
        
        searchContainer.insertBefore(searchInput, searchContainer.firstChild);
        
        // Add search functionality
        searchInput.addEventListener('input', utils.debounce(function() {
            const searchTerm = this.value.toLowerCase();
            const tutorialCards = document.querySelectorAll('.tutorial-card');
            
            tutorialCards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const description = card.querySelector('p').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || description.includes(searchTerm)) {
                    card.style.display = 'block';
                    card.classList.add('visible');
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                    card.classList.remove('visible');
                    
                    setTimeout(() => {
                        if (card.classList.contains('hidden')) {
                            card.style.display = 'none';
                        }
                    }, 300);
                }
            });
        }, 300));
        
        // Add focus styles
        searchInput.addEventListener('focus', function() {
            this.style.borderColor = '#3498db';
        });
        
        searchInput.addEventListener('blur', function() {
            this.style.borderColor = '#ddd';
        });
    }
}

function initializeScrollAnimations() {
    // Animate tutorial cards on scroll
    const tutorialCards = document.querySelectorAll('.tutorial-card');
    
    const cardObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out';
                cardObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    tutorialCards.forEach(card => {
        cardObserver.observe(card);
    });
}

// Add tutorial progress tracking
function trackTutorialProgress(tutorialId) {
    const progress = localStorage.getItem(`tutorial_${tutorialId}_progress`) || 0;
    return parseInt(progress);
}

function updateTutorialProgress(tutorialId, progress) {
    localStorage.setItem(`tutorial_${tutorialId}_progress`, progress.toString());
}

// Add tutorial bookmarking
function toggleTutorialBookmark(tutorialId) {
    const bookmarks = JSON.parse(localStorage.getItem('tutorial_bookmarks') || '[]');
    const index = bookmarks.indexOf(tutorialId);
    
    if (index > -1) {
        bookmarks.splice(index, 1);
        utils.showNotification('Tutorial removed from bookmarks', 'info');
    } else {
        bookmarks.push(tutorialId);
        utils.showNotification('Tutorial bookmarked!', 'success');
    }
    
    localStorage.setItem('tutorial_bookmarks', JSON.stringify(bookmarks));
    return bookmarks.includes(tutorialId);
}

// Add tutorial rating system
function rateTutorial(tutorialId, rating) {
    const ratings = JSON.parse(localStorage.getItem('tutorial_ratings') || '{}');
    ratings[tutorialId] = rating;
    localStorage.setItem('tutorial_ratings', JSON.stringify(ratings));
    
    utils.showNotification(`Thank you for rating this tutorial!`, 'success');
}

// Initialize tutorial interactions
document.addEventListener('DOMContentLoaded', function() {
    // Add bookmark buttons to tutorial cards
    const tutorialCards = document.querySelectorAll('.tutorial-card');
    
    tutorialCards.forEach((card, index) => {
        const tutorialId = `tutorial_${index + 1}`;
        
        // Add bookmark button
        const bookmarkBtn = document.createElement('button');
        bookmarkBtn.className = 'bookmark-btn';
        bookmarkBtn.innerHTML = '♡';
        bookmarkBtn.style.cssText = `
            position: absolute;
            top: 15px;
            right: 15px;
            background: rgba(255, 255, 255, 0.9);
            border: none;
            border-radius: 50%;
            width: 35px;
            height: 35px;
            cursor: pointer;
            font-size: 1.2rem;
            transition: all 0.3s ease;
            z-index: 10;
        `;
        
        card.style.position = 'relative';
        card.appendChild(bookmarkBtn);
        
        // Check if tutorial is bookmarked
        const bookmarks = JSON.parse(localStorage.getItem('tutorial_bookmarks') || '[]');
        if (bookmarks.includes(tutorialId)) {
            bookmarkBtn.innerHTML = '♥';
            bookmarkBtn.style.color = '#e74c3c';
        }
        
        // Add bookmark functionality
        bookmarkBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            const isBookmarked = toggleTutorialBookmark(tutorialId);
            
            if (isBookmarked) {
                this.innerHTML = '♥';
                this.style.color = '#e74c3c';
            } else {
                this.innerHTML = '♡';
                this.style.color = '#666';
            }
        });
        
        // Add hover effect
        bookmarkBtn.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });
        
        bookmarkBtn.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
});

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .tutorial-card {
        transition: all 0.3s ease;
    }
    
    .tutorial-card.hidden {
        opacity: 0;
        transform: scale(0.8);
    }
    
    .tutorial-card.visible {
        opacity: 1;
        transform: scale(1);
    }
    
    .tutorial-search:focus {
        border-color: #3498db !important;
        box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
    }
`;
document.head.appendChild(style);
