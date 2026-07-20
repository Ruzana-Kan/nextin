function createParticles() {
    const bg = document.querySelector('.animated-bg');
    
    const shapesContainer = document.createElement('div');
    shapesContainer.className = 'floating-shapes';
    for (let i = 0; i < 3; i++) {
        const shape = document.createElement('div');
        shape.className = 'shape';
        shapesContainer.appendChild(shape);
    }
    bg.appendChild(shapesContainer);
    
    const orb4 = document.createElement('div');
    orb4.className = 'gradient-orb orb-4';
    bg.appendChild(orb4);
    
    for (let i = 0; i < 100; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 8 + 's';
        particle.style.animationDuration = (Math.random() * 4 + 6) + 's';
        bg.appendChild(particle);
    }
}

function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => link.classList.remove('active'));

    const navLinksList = document.querySelector('.nav-links');
    const mobileMenu = document.getElementById('mobileMenu');
    if (window.innerWidth <= 768) {
        navLinksList.classList.remove('open');
        mobileMenu.classList.remove('open');
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

function toggleMobileMenu() {
    const navLinks = document.getElementById('navLinks');
    const mobileMenu = document.getElementById('mobileMenu');
    navLinks.classList.toggle('open');
    mobileMenu.classList.toggle('open');
}

const courseDetails = {
    'ai-prompt': {
        title: 'AI & Prompt Engineering',
        desc: 'Learn to design, refine, and optimize prompts for real-world AI tools. Covers prompt patterns, use-case workflows, and best practices for getting reliable results from modern AI models.',
        meta: ['📅 8 weeks', '🗓️ 2 classes/week', '⏱️ 1.5 hrs/class', '💻 Live on Google Meet'],
        price: '৳999',
        curriculum: [
            'Orientation: Careers in AI & Prompt Engineering',
            'Anatomy of a Perfect Prompt',
            'Advanced Prompt Structure & Formatting',
            'Research-Based Prompting',
            'Chain-of-Thought (CoT) & Reasoning',
            'Prompt Chaining & Iterative Refinement',
            'Negative Prompting & Guardrails',
            'Mid-Term Project: The Expert Consultant',
            'Introduction to AI Agents',
            'Building No-Code Workflows',
            'Multi-Agent Systems & Orchestration',
            'Image & Multimodal Prompting',
            'AI Safety, Ethics & Jailbreak Defense',
            'Project-Based Learning',
            'Project-Based Learning',
            'Job Hunt Strategy'
        ]
    },
    'digital-marketing': {
        title: 'Digital Marketing',
        desc: 'A practical introduction to SEO, social media growth, content strategy, and running online ad campaigns — built for beginners who want to market products and services online.',
        meta: ['📅 8 weeks', '🗓️ 2 classes/week', '⏱️ 1.5 hrs/class', '💻 Live on Google Meet'],
        price: '৳999',
        curriculum: [
            'Orientation: Careers in Digital Marketing, Salary Ranges',
            'Keyword Research',
            'SEO',
            'Competitor Research & SMM Strategy',
            'Facebook Marketing',
            'LinkedIn Marketing',
            'Instagram & X Marketing',
            'Q&A / Review Session',
            'SEM (Search Engine Marketing)',
            'Email Marketing',
            'Lead Generation & Ad Nurturing',
            'WordPress',
            'Freelancing Platforms',
            'Affiliate Marketing',
            'Real-Time Income Practicum',
            'Job Readiness'
        ]
    }
};

function openCourseModal(courseId) {
    const course = courseDetails[courseId];
    if (!course) return;

    document.getElementById('modal-title').textContent = course.title;
    document.getElementById('modal-desc').textContent = course.desc;
    document.getElementById('modal-price').textContent = course.price;

    const metaContainer = document.getElementById('modal-meta');
    metaContainer.innerHTML = '';
    course.meta.forEach(item => {
        const span = document.createElement('span');
        span.className = 'meta-item';
        span.textContent = item;
        metaContainer.appendChild(span);
    });

    const curriculumWrap = document.getElementById('modal-curriculum-wrap');
    const curriculumList = document.getElementById('modal-curriculum');
    curriculumList.innerHTML = '';

    if (course.curriculum && course.curriculum.length) {
        course.curriculum.forEach((item, index) => {
            const li = document.createElement('li');
            li.className = 'curriculum-item';

            const dayBadge = document.createElement('span');
            dayBadge.className = 'curriculum-day';
            dayBadge.textContent = 'Day ' + (index + 1);

            const text = document.createElement('span');
            text.textContent = item;

            li.appendChild(dayBadge);
            li.appendChild(text);
            curriculumList.appendChild(li);
        });
        curriculumWrap.style.display = 'block';
    } else {
        curriculumWrap.style.display = 'none';
    }

    document.getElementById('course-modal').classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeCourseModal() {
    document.getElementById('course-modal').classList.remove('open');
    document.body.style.overflow = '';
}

function closeCourseModalOnOverlay(event) {
    if (event.target.id === 'course-modal') {
        closeCourseModal();
    }
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeCourseModal();
});

window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loading').classList.add('hidden');
    }, 200);
});

document.addEventListener('DOMContentLoaded', () => {
    const yearEl = document.getElementById('copyright-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
});

document.addEventListener('DOMContentLoaded', () => {
    createParticles();
});

document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const cards = document.querySelectorAll('.course-card, .feature-card, .team-card');
    cards.forEach((card, i) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.6s ease ${Math.min(i * 0.06, 0.4)}s, transform 0.6s ease ${Math.min(i * 0.06, 0.4)}s`;
        observer.observe(card);
    });
});