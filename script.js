// E-Learning Platform JavaScript

// Sample course data
const coursesData = [
    {
        id: 1,
        title: "Complete Web Development Bootcamp",
        category: "web-development",
        level: "beginner",
        price: "paid",
        rating: 4.8,
        reviews: 1234,
        duration: "40 hours",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop",
        description: "Master HTML, CSS, JavaScript, React, and Node.js in this comprehensive course.",
        priceCurrent: 89,
        priceOriginal: 199,
        instructor: "Sarah Johnson"
    },
    {
        id: 2,
        title: "Python for Data Science",
        category: "data-science",
        level: "intermediate",
        price: "paid",
        rating: 4.9,
        reviews: 856,
        duration: "35 hours",
        image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400&h=250&fit=crop",
        description: "Learn Python programming, data analysis, and machine learning from scratch.",
        priceCurrent: 79,
        priceOriginal: 149,
        instructor: "Dr. Michael Chen"
    },
    {
        id: 3,
        title: "UI/UX Design Masterclass",
        category: "design",
        level: "beginner",
        price: "paid",
        rating: 4.7,
        reviews: 642,
        duration: "28 hours",
        image: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=400&h=250&fit=crop",
        description: "Create stunning user interfaces and experiences with modern design principles.",
        priceCurrent: 69,
        priceOriginal: 129,
        instructor: "Emma Rodriguez"
    },
    {
        id: 4,
        title: "Advanced JavaScript",
        category: "web-development",
        level: "advanced",
        price: "paid",
        rating: 4.7,
        reviews: 892,
        duration: "25 hours",
        image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400&h=250&fit=crop",
        description: "Master advanced JavaScript concepts and modern ES6+ features.",
        priceCurrent: 79,
        priceOriginal: 149,
        instructor: "David Kim"
    },
    {
        id: 5,
        title: "React Development",
        category: "web-development",
        level: "intermediate",
        price: "paid",
        rating: 4.9,
        reviews: 1156,
        duration: "30 hours",
        image: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=400&h=250&fit=crop",
        description: "Build modern web applications with React and Redux.",
        priceCurrent: 89,
        priceOriginal: 179,
        instructor: "Sarah Johnson"
    },
    {
        id: 6,
        title: "Node.js Backend Development",
        category: "web-development",
        level: "intermediate",
        price: "paid",
        rating: 4.6,
        reviews: 743,
        duration: "35 hours",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop",
        description: "Learn server-side JavaScript with Node.js and Express.",
        priceCurrent: 99,
        priceOriginal: 199,
        instructor: "Alex Thompson"
    },
    {
        id: 7,
        title: "Digital Marketing Fundamentals",
        category: "marketing",
        level: "beginner",
        price: "free",
        rating: 4.5,
        reviews: 456,
        duration: "20 hours",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
        description: "Learn the basics of digital marketing and social media strategies.",
        priceCurrent: 0,
        priceOriginal: 0,
        instructor: "Lisa Wang"
    },
    {
        id: 8,
        title: "Business Analytics",
        category: "business",
        level: "intermediate",
        price: "paid",
        rating: 4.4,
        reviews: 321,
        duration: "32 hours",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
        description: "Master data analysis and business intelligence tools.",
        priceCurrent: 119,
        priceOriginal: 249,
        instructor: "Robert Davis"
    }
];

// DOM Elements
let currentPage = 1;
const coursesPerPage = 6;
let filteredCourses = [...coursesData];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeCourseListing();
    initializeProgressTracking();
    initializeCourseDetail();
    initializeSearchAndFilters();
    initializeTabs();
    initializeMobileMenu();
});

// Navigation functionality
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// Course listing functionality
function initializeCourseListing() {
    if (document.getElementById('coursesGrid')) {
        renderCourses();
        updateCourseCount();
    }
}

function renderCourses() {
    const coursesGrid = document.getElementById('coursesGrid');
    if (!coursesGrid) return;

    const startIndex = (currentPage - 1) * coursesPerPage;
    const endIndex = startIndex + coursesPerPage;
    const coursesToShow = filteredCourses.slice(startIndex, endIndex);

    coursesGrid.innerHTML = coursesToShow.map(course => `
        <div class="course-card" data-course-id="${course.id}">
            <div class="course-image">
                <img src="${course.image}" alt="${course.title}">
                <div class="course-overlay">
                    <button class="btn-play" onclick="openCourseDetail(${course.id})">
                        <i class="fas fa-play"></i>
                    </button>
                </div>
            </div>
            <div class="course-content">
                <div class="course-category">${getCategoryName(course.category)}</div>
                <h3 class="course-title">${course.title}</h3>
                <p class="course-description">${course.description}</p>
                <div class="course-meta">
                    <div class="course-rating">
                        <i class="fas fa-star"></i>
                        <span>${course.rating}</span>
                        <span class="rating-count">(${course.reviews})</span>
                    </div>
                    <div class="course-duration">
                        <i class="fas fa-clock"></i>
                        <span>${course.duration}</span>
                    </div>
                </div>
                <div class="course-footer">
                    <div class="course-price">
                        ${course.price === 'free' ? 
                            '<span class="price-current">Free</span>' : 
                            `<span class="price-current">$${course.priceCurrent}</span>
                             <span class="price-original">$${course.priceOriginal}</span>`
                        }
                    </div>
                    <button class="btn-primary btn-small" onclick="enrollCourse(${course.id})">Enroll Now</button>
                </div>
            </div>
        </div>
    `).join('');

    // Add click event to course cards
    document.querySelectorAll('.course-card').forEach(card => {
        card.addEventListener('click', function(e) {
            if (!e.target.closest('.btn-play') && !e.target.closest('.btn-primary')) {
                const courseId = this.dataset.courseId;
                openCourseDetail(parseInt(courseId));
            }
        });
    });
}

function getCategoryName(category) {
    const categories = {
        'web-development': 'Web Development',
        'data-science': 'Data Science',
        'design': 'Design',
        'business': 'Business',
        'marketing': 'Marketing'
    };
    return categories[category] || category;
}

function updateCourseCount() {
    const courseCountElement = document.getElementById('courseCount');
    if (courseCountElement) {
        courseCountElement.textContent = `${filteredCourses.length} courses found`;
    }
}

// Search and filter functionality
function initializeSearchAndFilters() {
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const levelFilter = document.getElementById('levelFilter');
    const priceFilter = document.getElementById('priceFilter');
    const sortFilter = document.getElementById('sortFilter');

    if (searchInput) {
        searchInput.addEventListener('input', debounce(handleSearch, 300));
    }

    if (categoryFilter) {
        categoryFilter.addEventListener('change', handleFilter);
    }

    if (levelFilter) {
        levelFilter.addEventListener('change', handleFilter);
    }

    if (priceFilter) {
        priceFilter.addEventListener('change', handleFilter);
    }

    if (sortFilter) {
        sortFilter.addEventListener('change', handleSort);
    }
}

function handleSearch() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    applyFilters();
}

function handleFilter() {
    applyFilters();
}

function handleSort() {
    const sortBy = document.getElementById('sortFilter').value;
    sortCourses(sortBy);
    currentPage = 1;
    renderCourses();
}

function applyFilters() {
    const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || '';
    const category = document.getElementById('categoryFilter')?.value || '';
    const level = document.getElementById('levelFilter')?.value || '';
    const price = document.getElementById('priceFilter')?.value || '';

    filteredCourses = coursesData.filter(course => {
        const matchesSearch = course.title.toLowerCase().includes(searchTerm) ||
                            course.description.toLowerCase().includes(searchTerm) ||
                            course.instructor.toLowerCase().includes(searchTerm);
        
        const matchesCategory = !category || course.category === category;
        const matchesLevel = !level || course.level === level;
        const matchesPrice = !price || course.price === price;

        return matchesSearch && matchesCategory && matchesLevel && matchesPrice;
    });

    currentPage = 1;
    renderCourses();
    updateCourseCount();
    updatePagination();
}

function sortCourses(sortBy) {
    switch (sortBy) {
        case 'popular':
            filteredCourses.sort((a, b) => b.reviews - a.reviews);
            break;
        case 'newest':
            filteredCourses.sort((a, b) => b.id - a.id);
            break;
        case 'rating':
            filteredCourses.sort((a, b) => b.rating - a.rating);
            break;
        case 'price-low':
            filteredCourses.sort((a, b) => a.priceCurrent - b.priceCurrent);
            break;
        case 'price-high':
            filteredCourses.sort((a, b) => b.priceCurrent - a.priceCurrent);
            break;
    }
}

// Pagination functionality
function updatePagination() {
    const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
    const paginationContainer = document.querySelector('.pagination');
    
    if (!paginationContainer) return;

    const prevButton = paginationContainer.querySelector('.btn-outline:first-child');
    const nextButton = paginationContainer.querySelector('.btn-outline:last-child');
    const numbersContainer = paginationContainer.querySelector('.pagination-numbers');

    // Update prev/next buttons
    if (prevButton) {
        prevButton.disabled = currentPage === 1;
        prevButton.onclick = () => {
            if (currentPage > 1) {
                currentPage--;
                renderCourses();
                updatePagination();
            }
        };
    }

    if (nextButton) {
        nextButton.disabled = currentPage === totalPages;
        nextButton.onclick = () => {
            if (currentPage < totalPages) {
                currentPage++;
                renderCourses();
                updatePagination();
            }
        };
    }

    // Update page numbers
    if (numbersContainer) {
        let numbersHTML = '';
        const maxVisiblePages = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        if (startPage > 1) {
            numbersHTML += `<button class="pagination-btn" onclick="goToPage(1)">1</button>`;
            if (startPage > 2) {
                numbersHTML += `<span class="pagination-dots">...</span>`;
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            numbersHTML += `<button class="pagination-btn ${i === currentPage ? 'active' : ''}" onclick="goToPage(${i})">${i}</button>`;
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                numbersHTML += `<span class="pagination-dots">...</span>`;
            }
            numbersHTML += `<button class="pagination-btn" onclick="goToPage(${totalPages})">${totalPages}</button>`;
        }

        numbersContainer.innerHTML = numbersHTML;
    }
}

function goToPage(page) {
    currentPage = page;
    renderCourses();
    updatePagination();
}

// Progress tracking functionality
function initializeProgressTracking() {
    if (document.querySelector('.courses-tabs')) {
        initializeProgressTabs();
    }
}

function initializeProgressTabs() {
    const tabButtons = document.querySelectorAll('.courses-tabs .tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.dataset.tab;

            // Remove active class from all buttons and panels
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));

            // Add active class to clicked button and corresponding panel
            button.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
}

// Course detail functionality
function initializeCourseDetail() {
    if (document.querySelector('.course-tabs')) {
        initializeCourseDetailTabs();
    }
}

function initializeCourseDetailTabs() {
    const tabButtons = document.querySelectorAll('.course-tabs .tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.dataset.tab;

            // Remove active class from all buttons and panels
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));

            // Add active class to clicked button and corresponding panel
            button.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
}

// Tab functionality
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.dataset.tab;
            const tabContainer = button.closest('.tab-content') || button.closest('.course-content');
            
            if (tabContainer) {
                // Remove active class from all buttons and panels in this container
                const allButtons = tabContainer.querySelectorAll('.tab-btn');
                const allPanels = tabContainer.querySelectorAll('.tab-panel');
                
                allButtons.forEach(btn => btn.classList.remove('active'));
                allPanels.forEach(panel => panel.classList.remove('active'));

                // Add active class to clicked button and corresponding panel
                button.classList.add('active');
                const targetPanel = document.getElementById(targetTab);
                if (targetPanel) {
                    targetPanel.classList.add('active');
                }
            }
        });
    });
}

// Mobile menu functionality
function initializeMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

// Course actions
function openCourseDetail(courseId) {
    const course = coursesData.find(c => c.id === courseId);
    if (course) {
        // In a real application, you would navigate to the course detail page
        // For now, we'll show an alert
        alert(`Opening course: ${course.title}`);
        // window.location.href = `course-detail.html?id=${courseId}`;
    }
}

function openCourse(courseId) {
    const course = coursesData.find(c => c.id === courseId);
    if (course) {
        alert(`Starting course: ${course.title}`);
        // In a real application, you would open the course player
    }
}

function enrollCourse(courseId) {
    const course = coursesData.find(c => c.id === courseId);
    if (course) {
        if (course.price === 'free') {
            alert(`Enrolled in free course: ${course.title}`);
        } else {
            alert(`Redirecting to payment for: ${course.title} - $${course.priceCurrent}`);
        }
    }
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add loading states for buttons
function addLoadingState(button) {
    const originalText = button.textContent;
    button.textContent = 'Loading...';
    button.disabled = true;
    
    return function removeLoadingState() {
        button.textContent = originalText;
        button.disabled = false;
    };
}

// Form validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Newsletter subscription
document.addEventListener('DOMContentLoaded', function() {
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const submitButton = this.querySelector('button');
            
            if (emailInput && validateEmail(emailInput.value)) {
                const removeLoading = addLoadingState(submitButton);
                
                // Simulate API call
                setTimeout(() => {
                    removeLoading();
                    alert('Thank you for subscribing to our newsletter!');
                    emailInput.value = '';
                }, 1000);
            } else {
                alert('Please enter a valid email address.');
            }
        });
    });
});

// Search functionality enhancement
function enhanceSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleSearch();
            }
        });
    }
}

// Initialize enhanced search
document.addEventListener('DOMContentLoaded', enhanceSearch);

// Course card hover effects
document.addEventListener('DOMContentLoaded', function() {
    const courseCards = document.querySelectorAll('.course-card');
    
    courseCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// Progress bar animations
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.style.width;
                progressBar.style.width = '0%';
                setTimeout(() => {
                    progressBar.style.width = width;
                }, 100);
            }
        });
    });
    
    progressBars.forEach(bar => observer.observe(bar));
}

// Initialize progress bar animations
document.addEventListener('DOMContentLoaded', animateProgressBars);

// Add to wishlist functionality
function toggleWishlist(courseId) {
    const course = coursesData.find(c => c.id === courseId);
    if (course) {
        // In a real application, you would make an API call
        alert(`Added "${course.title}" to wishlist`);
    }
}

// Course rating functionality
function rateCourse(courseId, rating) {
    const course = coursesData.find(c => c.id === courseId);
    if (course) {
        // In a real application, you would make an API call
        alert(`Rated "${course.title}" with ${rating} stars`);
    }
}

// Export functions for global access
window.openCourseDetail = openCourseDetail;
window.openCourse = openCourse;
window.enrollCourse = enrollCourse;
window.toggleWishlist = toggleWishlist;
window.rateCourse = rateCourse;
window.goToPage = goToPage;
