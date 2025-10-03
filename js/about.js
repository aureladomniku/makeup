// About page specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeAboutPage();
});

function initializeAboutPage() {
    // Initialize team member interactions
    initializeTeamMembers();
    
    // Initialize scroll animations
    initializeScrollAnimations();
    
    // Initialize image lazy loading
    initializeLazyLoading();
}

function initializeTeamMembers() {
    const teamMembers = document.querySelectorAll('.team-member');
    
    teamMembers.forEach(member => {
        // Add hover effect
        member.addEventListener('mouseenter', function() {
            const image = this.querySelector('.member-image img');
            if (image) {
                image.style.transform = 'scale(1.1)';
            }
        });
        
        member.addEventListener('mouseleave', function() {
            const image = this.querySelector('.member-image img');
            if (image) {
                image.style.transform = 'scale(1)';
            }
        });
        
        // Add click effect for team member details
        member.addEventListener('click', function() {
            const name = this.querySelector('h3').textContent;
            const role = this.querySelector('p').textContent;
            
            // Create modal or tooltip with member details
            showTeamMemberDetails(name, role);
        });
    });
}

function showTeamMemberDetails(name, role) {
    // Create a simple modal for team member details
    const modal = document.createElement('div');
    modal.className = 'team-member-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: white;
        padding: 2rem;
        border-radius: 10px;
        max-width: 400px;
        width: 90%;
        text-align: center;
        transform: scale(0.8);
        transition: transform 0.3s ease;
    `;
    
    modalContent.innerHTML = `
        <h3 style="color: #2c3e50; margin-bottom: 1rem;">${name}</h3>
        <p style="color: #666; margin-bottom: 1.5rem;">${role}</p>
        <p style="color: #666; font-size: 0.9rem; line-height: 1.6;">
            This is a placeholder for ${name}'s detailed information. 
            You can add more details about their background, experience, and contributions here.
        </p>
        <button class="close-modal" style="
            background: #3498db;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            margin-top: 1rem;
        ">Close</button>
    `;
    
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    // Animate in
    setTimeout(() => {
        modal.style.opacity = '1';
        modalContent.style.transform = 'scale(1)';
    }, 10);
    
    // Close modal functionality
    const closeModal = () => {
        modal.style.opacity = '0';
        modalContent.style.transform = 'scale(0.8)';
        setTimeout(() => {
            if (modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
        }, 300);
    };
    
    modalContent.querySelector('.close-modal').addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close on Escape key
    const handleEscape = (e) => {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', handleEscape);
        }
    };
    document.addEventListener('keydown', handleEscape);
}

function initializeScrollAnimations() {
    // Animate about content on scroll
    const aboutContent = document.querySelector('.about-content');
    if (aboutContent) {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const aboutText = entry.target.querySelector('.about-text');
                    const aboutImage = entry.target.querySelector('.about-image');
                    
                    if (aboutText) {
                        aboutText.style.animation = 'slideInLeft 0.8s ease-out';
                    }
                    if (aboutImage) {
                        aboutImage.style.animation = 'slideInRight 0.8s ease-out';
                    }
                    
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(aboutContent);
    }
    
    // Animate team section
    const teamSection = document.querySelector('.team');
    if (teamSection) {
        const teamObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const teamMembers = entry.target.querySelectorAll('.team-member');
                    teamMembers.forEach((member, index) => {
                        setTimeout(() => {
                            member.style.animation = 'fadeInUp 0.6s ease-out';
                        }, index * 100);
                    });
                    teamObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        teamObserver.observe(teamSection);
    }
}

function initializeLazyLoading() {
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    
    if (images.length > 0) {
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Add smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInLeft {
        from {
            opacity: 0;
            transform: translateX(-50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
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
    
    .lazy {
        opacity: 0;
        transition: opacity 0.3s;
    }
    
    .lazy.loaded {
        opacity: 1;
    }
`;
document.head.appendChild(style);
