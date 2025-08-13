// Premium ProcessFlow Presentation - Enhanced JavaScript - 7 SLIDES VERSION - FIXED BUTTONS

class ProcessFlowPresentation {
    constructor() {
        this.currentSlide = 1;
        this.totalSlides = 7; // UPDATED: Changed from 8 to 7 slides
        this.slides = document.querySelectorAll('.slide');
        this.isTransitioning = false;
        this.autoAdvanceTimer = null;
        
        // Navigation elements
        this.progressFill = document.getElementById('progress-fill');
        this.currentSlideSpan = document.getElementById('current-slide');
        this.totalSlidesSpan = document.getElementById('total-slides');
        this.prevBtn = document.getElementById('prev-btn');
        this.nextBtn = document.getElementById('next-btn');
        this.slidesContainer = document.getElementById('slides-container');
        
        // Hamburger menu elements
        this.hamburgerBtn = document.getElementById('hamburger-btn');
        this.navDrawer = document.getElementById('nav-drawer');
        this.drawerOverlay = document.getElementById('drawer-overlay');
        this.drawerClose = document.getElementById('drawer-close');
        this.drawerLinks = document.querySelectorAll('.drawer-link');
        
        // Admin elements
        this.adminModal = document.getElementById('admin-modal');
        this.modalOverlay = document.getElementById('modal-overlay');
        this.modalClose = document.getElementById('modal-close');
        this.cancelAdmin = document.getElementById('cancel-admin');
        this.saveAdmin = document.getElementById('save-admin');
        this.adminTitle = document.getElementById('admin-title');
        this.adminSpeed = document.getElementById('admin-speed');
        this.adminMode = document.getElementById('admin-mode');
        this.adminNotes = document.getElementById('admin-notes');
        
        // Touch handling properties
        this.touchStartX = null;
        this.touchStartY = null;
        this.touchStartTime = 0;
        this.touchThreshold = 75;
        this.isDrawerOpen = false;
        this.isModalOpen = false;
        
        // Settings
        this.settings = this.loadSettings();
        
        this.init();
    }
    
    init() {
        console.log('🚀 Initializing Premium ProcessFlow Presentation (7 slides)...');
        
        // Initialize AOS (Animate On Scroll)
        AOS.init({
            duration: 800,
            easing: 'ease-out',
            once: false,
            offset: 50,
            delay: 0
        });
        
        // Apply saved settings
        this.applySettings();
        
        // Set initial state
        this.updateUI();
        this.showSlide(1);
        
        // Add event listeners
        this.addEventListeners();
        
        // Create premium visual effects
        this.createVisualEffects();
        
        // Check slides for vertical scroll needs after a delay to ensure proper rendering
        setTimeout(() => {
            this.checkSlidesForVerticalScroll();
        }, 1000);
        
        // FIXED: Add CTA button handlers immediately and recheck periodically
        this.addCTAButtonHandlers();
        
        console.log('✨ Premium ProcessFlow Presentation initialized successfully!');
        
        // Show welcome hint
        this.showWelcomeHint();
    }
    
    // FIXED: Better vertical scroll detection
    checkSlidesForVerticalScroll() {
        this.slides.forEach((slide, index) => {
            const slideContent = slide.querySelector('.slide-content');
            if (slideContent) {
                // Get actual content height vs available space
                const contentHeight = slideContent.scrollHeight;
                const availableHeight = slide.clientHeight - 120; // Account for padding
                
                const needsVerticalScroll = contentHeight > availableHeight;
                
                if (needsVerticalScroll) {
                    slide.classList.add('scroll-vertical');
                    console.log(`📜 Slide ${index + 1} needs vertical scrolling (${contentHeight}px > ${availableHeight}px)`);
                } else {
                    slide.classList.remove('scroll-vertical');
                    console.log(`📄 Slide ${index + 1} fits without scrolling (${contentHeight}px <= ${availableHeight}px)`);
                }
            }
        });
    }
    
    loadSettings() {
        try {
            const saved = localStorage.getItem('processflow-settings');
            return saved ? JSON.parse(saved) : {
                title: 'ProcessFlow - Apresentação Comercial Premium',
                speed: '0.5',
                mode: 'manual',
                notes: ''
            };
        } catch (e) {
            return {
                title: 'ProcessFlow - Apresentação Comercial Premium',
                speed: '0.5',
                mode: 'manual',
                notes: ''
            };
        }
    }
    
    saveSettings() {
        try {
            localStorage.setItem('processflow-settings', JSON.stringify(this.settings));
        } catch (e) {
            console.warn('Could not save settings to localStorage');
        }
    }
    
    applySettings() {
        // Apply transition speed
        const speed = parseFloat(this.settings.speed);
        document.documentElement.style.setProperty('--transition-duration', `${speed}s`);
        
        // Update document title
        document.title = this.settings.title;
        
        // Setup auto-advance if needed
        if (this.settings.mode.startsWith('auto-')) {
            const seconds = parseInt(this.settings.mode.split('-')[1]);
            this.setupAutoAdvance(seconds * 1000);
        }
    }
    
    setupAutoAdvance(interval) {
        if (this.autoAdvanceTimer) {
            clearInterval(this.autoAdvanceTimer);
        }
        
        this.autoAdvanceTimer = setInterval(() => {
            if (!this.isModalOpen && !this.isDrawerOpen) {
                if (this.currentSlide < this.totalSlides) {
                    this.nextSlide();
                } else {
                    this.goToSlide(1); // Loop back to start
                }
            }
        }, interval);
    }
    
    createVisualEffects() {
        // Add floating particles effect
        this.createFloatingParticles();
        
        // Add gradient animation
        this.animateBackgroundGradient();
        
        // Add 3D dots indicator
        this.enhance3DEffects();
    }
    
    createFloatingParticles() {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles-container';
        particlesContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
            overflow: hidden;
        `;
        
        // Create subtle floating particles
        for (let i = 0; i < 15; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 2}px;
                height: ${Math.random() * 4 + 2}px;
                background: rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1});
                border-radius: 50%;
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                animation: float ${Math.random() * 20 + 10}s infinite linear;
                backdrop-filter: blur(1px);
            `;
            particlesContainer.appendChild(particle);
        }
        
        // Add CSS animation for particles
        const style = document.createElement('style');
        style.textContent = `
            @keyframes float {
                0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
                10% { opacity: 1; }
                90% { opacity: 1; }
                100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
        document.body.appendChild(particlesContainer);
    }
    
    animateBackgroundGradient() {
        let gradientPhase = 0;
        setInterval(() => {
            gradientPhase += 0.5;
            const hue1 = (220 + Math.sin(gradientPhase * 0.01) * 20);
            const hue2 = (280 + Math.cos(gradientPhase * 0.01) * 20);
            
            document.querySelector('.presentation-container').style.background = 
                `linear-gradient(135deg, hsl(${hue1}, 70%, 55%) 0%, hsl(${hue2}, 80%, 45%) 100%)`;
        }, 100);
    }
    
    enhance3DEffects() {
        // Magic wand effect and punch effect on glass cards
        document.querySelectorAll('.glass-card').forEach(card => {
            // Magic wand effect
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
            });
            
            card.addEventListener('mouseenter', (e) => {
                card.style.setProperty('--mouse-x', '50%');
                card.style.setProperty('--mouse-y', '50%');
            });
            
            card.addEventListener('mouseleave', (e) => {
                card.style.removeProperty('--mouse-x');
                card.style.removeProperty('--mouse-y');
            });
            
            // Punch effect on click
            card.addEventListener('click', (e) => {
                // Remove any existing punch class
                card.classList.remove('punch');
                
                // Force reflow to ensure the class removal takes effect
                card.offsetHeight;
                
                // Add punch class to trigger animation
                card.classList.add('punch');
                
                // Create subtle dust particles
                this.createSmokeEffect(card, e);
                
                // Remove the class after animation completes
                setTimeout(() => {
                    card.classList.remove('punch');
                }, 300);
            });
            
            // Also add punch effect for touch devices
            card.addEventListener('touchstart', (e) => {
                card.classList.remove('punch');
                card.offsetHeight;
                card.classList.add('punch');
                
                // Create smoke particles for touch
                this.createSmokeEffect(card, e);
                
                setTimeout(() => {
                    card.classList.remove('punch');
                }, 300);
            });
        });
    }
    
    addEventListeners() {
        // FIXED: Navigation buttons - ensure they work properly
        if (this.prevBtn) {
            // Remove any existing listeners and add new ones
            this.prevBtn.replaceWith(this.prevBtn.cloneNode(true));
            this.prevBtn = document.getElementById('prev-btn');
            
            this.prevBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('🔵 Previous button clicked');
                this.previousSlide();
            });
            
            this.prevBtn.addEventListener('touchend', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('🔵 Previous button touched');
                this.previousSlide();
            });
        }
        
        if (this.nextBtn) {
            // Remove any existing listeners and add new ones
            this.nextBtn.replaceWith(this.nextBtn.cloneNode(true));
            this.nextBtn = document.getElementById('next-btn');
            
            this.nextBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('🔵 Next button clicked');
                this.nextSlide();
            });
            
            this.nextBtn.addEventListener('touchend', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('🔵 Next button touched');
                this.nextSlide();
            });
        }
        
        // Hamburger menu
        if (this.hamburgerBtn) {
            this.hamburgerBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleDrawer();
            });
        }
        
        // Drawer controls
        if (this.drawerClose) {
            this.drawerClose.addEventListener('click', (e) => {
                e.preventDefault();
                this.closeDrawer();
            });
        }
        
        if (this.drawerOverlay) {
            this.drawerOverlay.addEventListener('click', (e) => {
                e.preventDefault();
                this.closeDrawer();
            });
        }
        
        // Drawer links
        this.drawerLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const slideNum = parseInt(link.dataset.slide);
                if (slideNum) {
                    this.goToSlide(slideNum);
                    this.closeDrawer();
                }
            });
        });
        
        // Admin modal controls
        if (this.modalClose) {
            this.modalClose.addEventListener('click', (e) => {
                e.preventDefault();
                this.closeAdminModal();
            });
        }
        
        if (this.cancelAdmin) {
            this.cancelAdmin.addEventListener('click', (e) => {
                e.preventDefault();
                this.closeAdminModal();
            });
        }
        
        if (this.saveAdmin) {
            this.saveAdmin.addEventListener('click', (e) => {
                e.preventDefault();
                this.saveAdminSettings();
            });
        }
        
        if (this.modalOverlay) {
            this.modalOverlay.addEventListener('click', (e) => {
                e.preventDefault();
                this.closeAdminModal();
            });
        }
        
        // FIXED: Keyboard navigation with proper admin shortcut
        document.addEventListener('keydown', (e) => {
            if (this.isModalOpen) {
                if (e.key === 'Escape') this.closeAdminModal();
                return;
            }
            
            if (this.isDrawerOpen) {
                if (e.key === 'Escape') this.closeDrawer();
                return;
            }
            
            // FIXED: Admin shortcut - check for proper key combination
            if (e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
                e.preventDefault();
                this.openAdminModal();
                console.log('🔧 Admin shortcut triggered: Ctrl+Shift+A');
                return;
            }
            
            switch(e.key) {
                case 'ArrowLeft':
                case 'ArrowUp':
                    e.preventDefault();
                    this.previousSlide();
                    break;
                case 'ArrowRight':
                case 'ArrowDown':
                case ' ': // Spacebar
                    e.preventDefault();
                    this.nextSlide();
                    break;
                case 'Home':
                    e.preventDefault();
                    this.goToSlide(1);
                    break;
                case 'End':
                    e.preventDefault();
                    this.goToSlide(this.totalSlides);
                    break;
                case 'Escape':
                    e.preventDefault();
                    this.exitFullscreen();
                    break;
                case 'f':
                case 'F':
                    e.preventDefault();
                    this.toggleFullscreen();
                    break;
            }
        });
        
        // FIXED: Enhanced touch handling with vertical scroll support
        this.addTouchEvents();
        
        // FIXED: Mouse wheel navigation with vertical scroll support
        this.addWheelNavigation();
        
        // Window resize handling
        window.addEventListener('resize', () => this.handleResize());
        
        // Visibility change handling (for auto-advance)
        document.addEventListener('visibilitychange', () => {
            if (document.hidden && this.autoAdvanceTimer) {
                clearInterval(this.autoAdvanceTimer);
            } else if (!document.hidden && this.settings.mode.startsWith('auto-')) {
                const seconds = parseInt(this.settings.mode.split('-')[1]);
                this.setupAutoAdvance(seconds * 1000);
            }
        });
        
        // Mouse trail particles
        this.addMouseTrailEffect();
    }
    
    // FIXED: Add CTA button event handlers for slide 7 with improved reliability
    addCTAButtonHandlers() {
        const addHandlers = () => {
            // Handle "Ver Protótipo do Sistema" button
            const prototypeButton = document.getElementById('prototype-btn');
            if (prototypeButton) {
                // Remove any existing listeners by cloning the element
                const newPrototypeButton = prototypeButton.cloneNode(true);
                prototypeButton.parentNode.replaceChild(newPrototypeButton, prototypeButton);
                
                newPrototypeButton.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('👁️ "Ver Protótipo do Sistema" button clicked');
                    this.handlePrototypeAction();
                });
                
                newPrototypeButton.addEventListener('touchend', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('👁️ "Ver Protótipo do Sistema" button touched');
                    this.handlePrototypeAction();
                });
                
                console.log('✅ Prototype button handler attached');
            }
            
            // Handle "Solicitar Proposta" (WhatsApp) button
            const whatsappButton = document.getElementById('whatsapp-btn');
            if (whatsappButton) {
                // Remove any existing listeners by cloning the element
                const newWhatsappButton = whatsappButton.cloneNode(true);
                whatsappButton.parentNode.replaceChild(newWhatsappButton, whatsappButton);
                
                newWhatsappButton.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('💬 "Solicitar Proposta" (WhatsApp) button clicked');
                    this.handleWhatsAppAction();
                });
                
                newWhatsappButton.addEventListener('touchend', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('💬 "Solicitar Proposta" (WhatsApp) button touched');
                    this.handleWhatsAppAction();
                });
                
                console.log('✅ WhatsApp button handler attached');
            }
        };
        
        // Try to add handlers immediately
        addHandlers();
        
        // Also try after a delay to ensure DOM is ready
        setTimeout(addHandlers, 500);
        setTimeout(addHandlers, 1500);
        setTimeout(addHandlers, 3000);
    }
    
    // Handle "Ver Protótipo do Sistema" action
    handlePrototypeAction() {
        console.log('🔗 Opening prototype system...');
        this.showNotification('🔗 Abrindo protótipo do sistema...', 'info');
        
        // Open prototype link in new tab
        setTimeout(() => {
            const url = 'https://apresenta-iota.vercel.app/';
            console.log('🔗 Opening URL:', url);
            window.open(url, '_blank', 'noopener');
        }, 500);
    }
    
    // Handle "Solicitar Proposta" (WhatsApp) action
    handleWhatsAppAction() {
        console.log('💬 Opening WhatsApp...');
        this.showNotification('💬 Abrindo WhatsApp...', 'success');
        
        // Open WhatsApp with pre-filled message
        setTimeout(() => {
            const url = 'https://wa.me/5511960438548?text=Gostei%2C%20vamos%20fechar';
            console.log('💬 Opening WhatsApp URL:', url);
            window.open(url, '_blank', 'noopener');
        }, 500);
    }
    
    // FIXED: Touch events that respect vertical scrolling
    addTouchEvents() {
        let startX, startY, startTime, moved = false;
        
        document.addEventListener('touchstart', (e) => {
            if (this.isDrawerOpen || this.isModalOpen) return;
            
            const touch = e.touches[0];
            startX = touch.clientX;
            startY = touch.clientY;
            startTime = Date.now();
            moved = false;
        }, { passive: true });
        
        document.addEventListener('touchmove', (e) => {
            if (!startX || !startY || this.isDrawerOpen || this.isModalOpen) return;
            
            moved = true;
            const touch = e.touches[0];
            const deltaX = startX - touch.clientX;
            const deltaY = startY - touch.clientY;
            
            // FIXED: Only prevent default for horizontal swipes on slides that don't need vertical scroll
            const currentSlideElement = this.slides[this.currentSlide - 1];
            const hasVerticalScroll = currentSlideElement && currentSlideElement.classList.contains('scroll-vertical');
            
            // If slide has vertical scroll, only prevent horizontal swipes when they're clearly horizontal
            if (hasVerticalScroll) {
                // Only prevent if it's a strong horizontal gesture
                if (Math.abs(deltaX) > Math.abs(deltaY) * 2 && Math.abs(deltaX) > 40) {
                    e.preventDefault();
                }
            } else {
                // For slides without vertical scroll, prevent all strong horizontal movements
                if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 20) {
                    e.preventDefault();
                }
            }
        }, { passive: false });
        
        document.addEventListener('touchend', (e) => {
            if (!startX || !startY || this.isDrawerOpen || this.isModalOpen) return;
            
            const touch = e.changedTouches[0];
            const deltaX = startX - touch.clientX;
            const deltaY = startY - touch.clientY;
            const duration = Date.now() - startTime;
            
            // FIXED: Only trigger slide change for clear horizontal swipes
            const currentSlideElement = this.slides[this.currentSlide - 1];
            const hasVerticalScroll = currentSlideElement && currentSlideElement.classList.contains('scroll-vertical');
            
            // More restrictive conditions for slide changes
            const isHorizontalSwipe = Math.abs(deltaX) > Math.abs(deltaY) * 1.5; // More horizontal than vertical
            const isStrongSwipe = Math.abs(deltaX) > this.touchThreshold;
            const isFastSwipe = duration < 800;
            
            if (moved && isHorizontalSwipe && isStrongSwipe && isFastSwipe) {
                // Additional check for slides with vertical scroll - require stronger horizontal movement
                if (hasVerticalScroll && Math.abs(deltaX) < this.touchThreshold * 1.5) {
                    // Don't trigger slide change, let vertical scroll happen
                } else {
                    if (deltaX > 0) {
                        this.nextSlide();
                    } else {
                        this.previousSlide();
                    }
                }
            }
            
            // Reset
            startX = startY = null;
        }, { passive: true });
    }
    
    // FIXED: Wheel navigation that respects vertical scrolling
    addWheelNavigation() {
        let wheelTimeout = null;
        document.addEventListener('wheel', (e) => {
            if (this.isDrawerOpen || this.isModalOpen || wheelTimeout) return;
            
            // FIXED: Check if current slide needs vertical scrolling
            const currentSlideElement = this.slides[this.currentSlide - 1];
            const hasVerticalScroll = currentSlideElement && currentSlideElement.classList.contains('scroll-vertical');
            
            // If slide has vertical scroll capability, don't intercept wheel events
            if (hasVerticalScroll) {
                return; // Let the browser handle vertical scrolling
            }
            
            wheelTimeout = setTimeout(() => {
                wheelTimeout = null;
            }, 500);
            
            if (Math.abs(e.deltaY) > 30) {
                e.preventDefault();
                if (e.deltaY > 0) {
                    this.nextSlide();
                } else {
                    this.previousSlide();
                }
            }
        }, { passive: false });
    }
    
    // Show slide using horizontal scroll
    showSlide(slideNumber, direction = 'forward') {
        if (this.isTransitioning || slideNumber < 1 || slideNumber > this.totalSlides) {
            return;
        }
        
        if (slideNumber === this.currentSlide) return;
        
        this.isTransitioning = true;
        
        console.log(`🎬 Transitioning to slide ${slideNumber}`);
        
        // Calculate the transform position for horizontal layout (7 slides)
        const translateX = -((slideNumber - 1) * 100);
        
        // Apply transform to slides container
        if (this.slidesContainer) {
            this.slidesContainer.style.transform = `translateX(${translateX}vw)`;
        }
        
        this.currentSlide = slideNumber;
        this.updateUI();
        
        // Trigger AOS refresh for the new slide
        setTimeout(() => {
            AOS.refresh();
            this.isTransitioning = false;
            
            // Recheck slides for vertical scroll after transition
            this.checkSlidesForVerticalScroll();
            
            // Re-add CTA button handlers after slide change
            this.addCTAButtonHandlers();
        }, 100);
        
        // Add premium transition effects
        this.addSlideTransitionEffects();
        
        // Reset transition lock
        setTimeout(() => {
            this.isTransitioning = false;
        }, 600);
    }
    
    addSlideTransitionEffects() {
        // Add a subtle screen flash effect
        const flash = document.createElement('div');
        flash.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(45deg, transparent, rgba(255,255,255,0.03), transparent);
            pointer-events: none;
            z-index: 1000;
            animation: slideFlash 0.6s ease-out;
        `;
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideFlash {
                0% { opacity: 0; transform: translateX(-100%); }
                50% { opacity: 1; transform: translateX(0%); }
                100% { opacity: 0; transform: translateX(100%); }
            }
        `;
        
        if (!document.getElementById('slide-flash-style')) {
            style.id = 'slide-flash-style';
            document.head.appendChild(style);
        }
        
        document.body.appendChild(flash);
        setTimeout(() => flash.remove(), 600);
    }
    
    // Create subtle dust impact effect when card is punched
    createSmokeEffect(card, event) {
        const rect = card.getBoundingClientRect();
        const particleCount = 8; // Fewer particles for subtlety
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = `smoke-particle ${this.getRandomSize()}`;
            
            // Position particles around the bottom and sides of the card for impact effect
            const angle = (i / particleCount) * Math.PI * 2; // Distribute in circle
            const radius = rect.width * 0.3;
            const offsetX = Math.cos(angle) * radius + (Math.random() - 0.5) * 30;
            const offsetY = Math.abs(Math.sin(angle)) * 20 + (Math.random() * 10); // More particles at bottom
            
            // Position relative to card center bottom
            particle.style.left = `${rect.left + rect.width / 2 + offsetX}px`;
            particle.style.top = `${rect.bottom - offsetY}px`;
            
            // Add random horizontal drift - more subtle
            const driftX = offsetX * 0.5 + (Math.random() - 0.5) * 50;
            particle.style.setProperty('--drift-x', `${driftX}px`);
            
            document.body.appendChild(particle);
            
            // Trigger animation with staggered delay for wave effect
            setTimeout(() => {
                particle.classList.add('active');
            }, i * 40);
            
            // Remove particle after animation completes (much longer duration now)
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 4500 + (i * 40));
        }
    }
    
    // Get random particle size class with cloud option
    getRandomSize() {
        const sizes = ['small', 'medium', 'large', 'cloud'];
        return sizes[Math.floor(Math.random() * sizes.length)];
    }
    
    // Add mouse trail particle effect
    addMouseTrailEffect() {
        let lastTrailTime = 0;
        let mouseX = 0;
        let mouseY = 0;
        let isMoving = false;
        let moveTimeout = null;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            isMoving = true;
            
            // Clear previous timeout
            if (moveTimeout) {
                clearTimeout(moveTimeout);
            }
            
            // Set timeout to detect when mouse stops
            moveTimeout = setTimeout(() => {
                isMoving = false;
            }, 100);
            
            const now = Date.now();
            
            // Create particles more frequently when moving (every 30ms)
            if (now - lastTrailTime > 30) {
                this.createTrailParticle(mouseX, mouseY, isMoving);
                lastTrailTime = now;
            }
        });
    }
    
    // Create a single trail particle at mouse position
    createTrailParticle(x, y, isMoving = false) {
        // Don't create particles if modal or drawer is open
        if (this.isModalOpen || this.isDrawerOpen) return;
        
        // Higher chance when moving, lower when stationary
        const chanceThreshold = isMoving ? 0.7 : 0.1;
        if (Math.random() > chanceThreshold) return;
        
        // Create multiple particles when moving for better trail effect
        const particleCount = isMoving ? Math.floor(Math.random() * 3) + 1 : 1;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = `trail-particle ${this.getTrailSize()}`;
            
            // Position with more spread when moving
            const spreadRadius = isMoving ? 15 : 5;
            const offsetX = (Math.random() - 0.5) * spreadRadius;
            const offsetY = (Math.random() - 0.5) * spreadRadius;
            
            particle.style.left = `${x + offsetX}px`;
            particle.style.top = `${y + offsetY}px`;
            
            document.body.appendChild(particle);
            
            // Trigger animation with slight delay for trail effect
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.classList.add('active');
                }
            }, i * 20);
            
            // Remove particle after animation
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 1500 + (i * 20));
        }
    }
    
    // Get random trail particle size
    getTrailSize() {
        const sizes = ['small', 'medium', 'large'];
        return sizes[Math.floor(Math.random() * sizes.length)];
    }
    
    nextSlide() {
        if (this.currentSlide < this.totalSlides) {
            this.showSlide(this.currentSlide + 1, 'forward');
        }
    }
    
    previousSlide() {
        if (this.currentSlide > 1) {
            this.showSlide(this.currentSlide - 1, 'backward');
        }
    }
    
    goToSlide(slideNumber) {
        if (slideNumber >= 1 && slideNumber <= this.totalSlides) {
            const direction = slideNumber > this.currentSlide ? 'forward' : 'backward';
            this.showSlide(slideNumber, direction);
        }
    }
    
    updateUI() {
        // Update slide counter
        if (this.currentSlideSpan) {
            this.currentSlideSpan.textContent = this.currentSlide;
        }
        
        if (this.totalSlidesSpan) {
            this.totalSlidesSpan.textContent = this.totalSlides;
        }
        
        // Update progress bar (7 slides)
        if (this.progressFill) {
            const progress = (this.currentSlide / this.totalSlides) * 100;
            this.progressFill.style.width = `${progress}%`;
        }
        
        // Update navigation buttons
        if (this.prevBtn) {
            this.prevBtn.disabled = this.currentSlide <= 1;
        }
        
        if (this.nextBtn) {
            this.nextBtn.disabled = this.currentSlide >= this.totalSlides;
        }
        
        // Update drawer links
        this.drawerLinks.forEach(link => {
            const slideNum = parseInt(link.dataset.slide);
            link.classList.toggle('active', slideNum === this.currentSlide);
        });
    }
    
    // Drawer functionality
    toggleDrawer() {
        if (this.isDrawerOpen) {
            this.closeDrawer();
        } else {
            this.openDrawer();
        }
    }
    
    openDrawer() {
        if (this.navDrawer && this.drawerOverlay && this.hamburgerBtn) {
            this.navDrawer.classList.add('open');
            this.drawerOverlay.classList.add('visible');
            this.hamburgerBtn.classList.add('active');
            document.body.style.overflow = 'hidden';
            this.isDrawerOpen = true;
            console.log('📱 Drawer opened');
        }
    }
    
    closeDrawer() {
        if (this.navDrawer && this.drawerOverlay && this.hamburgerBtn) {
            this.navDrawer.classList.remove('open');
            this.drawerOverlay.classList.remove('visible');
            this.hamburgerBtn.classList.remove('active');
            document.body.style.overflow = '';
            this.isDrawerOpen = false;
            console.log('📱 Drawer closed');
        }
    }
    
    // FIXED: Admin modal functionality
    openAdminModal() {
        if (this.adminModal && this.modalOverlay) {
            // Populate current values
            if (this.adminTitle) this.adminTitle.value = this.settings.title;
            if (this.adminSpeed) this.adminSpeed.value = this.settings.speed;
            if (this.adminMode) this.adminMode.value = this.settings.mode;
            if (this.adminNotes) this.adminNotes.value = this.settings.notes;
            
            this.adminModal.classList.remove('hidden');
            this.adminModal.classList.add('visible');
            this.modalOverlay.classList.remove('hidden');
            this.modalOverlay.classList.add('visible');
            document.body.style.overflow = 'hidden';
            this.isModalOpen = true;
            
            // Close drawer if open
            if (this.isDrawerOpen) {
                this.closeDrawer();
            }
            
            // Focus first input
            setTimeout(() => {
                if (this.adminTitle) this.adminTitle.focus();
            }, 300);
            
            console.log('⚙️ Admin modal opened via keyboard shortcut');
        }
    }
    
    closeAdminModal() {
        if (this.adminModal && this.modalOverlay) {
            this.adminModal.classList.add('hidden');
            this.adminModal.classList.remove('visible');
            this.modalOverlay.classList.add('hidden');
            this.modalOverlay.classList.remove('visible');
            document.body.style.overflow = '';
            this.isModalOpen = false;
            console.log('⚙️ Admin modal closed');
        }
    }
    
    saveAdminSettings() {
        // Update settings
        this.settings = {
            title: this.adminTitle ? this.adminTitle.value : this.settings.title,
            speed: this.adminSpeed ? this.adminSpeed.value : this.settings.speed,
            mode: this.adminMode ? this.adminMode.value : this.settings.mode,
            notes: this.adminNotes ? this.adminNotes.value : this.settings.notes
        };
        
        // Save to localStorage
        this.saveSettings();
        
        // Apply new settings
        this.applySettings();
        
        // Show success notification
        this.showNotification('✅ Configurações salvas com sucesso!', 'success');
        
        this.closeAdminModal();
        
        console.log('💾 Admin settings saved:', this.settings);
    }
    
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.innerHTML = message;
        
        const bgColor = type === 'success' ? '#10B981' : 
                       type === 'error' ? '#EF4444' : '#F97316';
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${bgColor};
            color: white;
            padding: 16px 24px;
            border-radius: 12px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
            backdrop-filter: blur(10px);
            z-index: 2000;
            font-size: 1rem;
            font-weight: 600;
            transform: translateX(400px);
            transition: all 0.4s ease-out;
            max-width: 300px;
            border: 1px solid rgba(255, 255, 255, 0.2);
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Animate out and remove
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 400);
        }, 3000);
    }
    
    showWelcomeHint() {
        const isMobile = window.innerWidth < 768;
        const hint = document.createElement('div');
        
        const hintText = isMobile ? 
            '📱 Deslize ou use os botões para navegar • Menu ☰ para acesso rápido • Conteúdo longo pode rolar verticalmente' :
            '🖱️ Use ← → arrows, clique nas setas, ou swipe para navegar • Ctrl+Shift+A para admin • Slides com muito conteúdo rolam verticalmente';
        
        hint.innerHTML = `
            <div style="
                position: fixed;
                bottom: 100px;
                left: 50%;
                transform: translateX(-50%);
                background: rgba(0, 0, 0, 0.8);
                backdrop-filter: blur(10px);
                color: white;
                padding: 12px 20px;
                border-radius: 25px;
                font-size: 0.9rem;
                z-index: 1500;
                transition: opacity 0.5s ease;
                text-align: center;
                max-width: 90vw;
                border: 1px solid rgba(255, 255, 255, 0.2);
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
                line-height: 1.4;
            ">
                ${hintText}
            </div>
        `;
        
        document.body.appendChild(hint);
        
        // Fade out after 6 seconds (extended to show vertical scroll info)
        setTimeout(() => {
            hint.style.opacity = '0';
            setTimeout(() => hint.remove(), 500);
        }, 6000);
    }
    
    toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.log(`Error attempting to enable fullscreen: ${err.message}`);
            });
        } else {
            document.exitFullscreen().catch(err => {
                console.log(`Error attempting to exit fullscreen: ${err.message}`);
            });
        }
    }
    
    exitFullscreen() {
        if (document.fullscreenElement) {
            document.exitFullscreen().catch(err => {
                console.log(`Error attempting to exit fullscreen: ${err.message}`);
            });
        }
    }
    
    handleResize() {
        const isMobile = window.innerWidth < 768;
        
        // Close drawer on desktop resize
        if (!isMobile && this.isDrawerOpen) {
            this.closeDrawer();
        }
        
        // Refresh AOS
        AOS.refresh();
        
        // Recheck slides for vertical scroll after resize
        setTimeout(() => {
            this.checkSlidesForVerticalScroll();
        }, 300);
        
        // Re-add CTA button handlers after resize
        setTimeout(() => {
            this.addCTAButtonHandlers();
        }, 500);
    }
}

// Initialize presentation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Small delay to ensure all elements are ready
    setTimeout(() => {
        try {
            const presentation = new ProcessFlowPresentation();
            
            // Handle window resize
            window.addEventListener('resize', () => {
                presentation.handleResize();
            });
            
            // Handle orientation change on mobile
            window.addEventListener('orientationchange', () => {
                setTimeout(() => {
                    presentation.handleResize();
                    // Force viewport recalculation
                    document.body.style.height = '100vh';
                    setTimeout(() => {
                        document.body.style.height = '';
                    }, 100);
                }, 300);
            });
            
            // Prevent zoom on double tap (iOS)
            let lastTouchEnd = 0;
            document.addEventListener('touchend', (e) => {
                const now = Date.now();
                if (now - lastTouchEnd <= 300) {
                    e.preventDefault();
                }
                lastTouchEnd = now;
            }, { passive: false });
            
            // Auto-hide cursor on desktop during inactivity
            if (window.innerWidth >= 768) {
                let cursorTimeout;
                const resetCursorTimer = () => {
                    document.body.style.cursor = 'default';
                    clearTimeout(cursorTimeout);
                    cursorTimeout = setTimeout(() => {
                        document.body.style.cursor = 'none';
                    }, 4000);
                };
                
                document.addEventListener('mousemove', resetCursorTimer);
                document.addEventListener('mousedown', resetCursorTimer);
                document.addEventListener('keydown', resetCursorTimer);
            }
            
            // Expose globally for debugging
            window.presentation = presentation;
            
            console.log('🎉 Premium ProcessFlow Presentation ready! - 7 slides with FIXED navigation and CTA buttons');
            
        } catch (error) {
            console.error('❌ Error initializing presentation:', error);
        }
    }, 200);
});

// Prevent context menu for cleaner presentation
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});

// Handle visibility changes
document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        // Refresh AOS when tab becomes visible
        setTimeout(() => {
            if (window.AOS) {
                AOS.refresh();
            }
        }, 100);
    }
});

// FIXED: Help overlay with updated admin shortcut and 7 slides info
document.addEventListener('keydown', (e) => {
    if (e.key === 'h' || e.key === 'H') {
        if (!document.querySelector('.admin-modal.visible')) {
            e.preventDefault();
            showHelpOverlay();
        }
    }
});

function showHelpOverlay() {
    const overlay = document.createElement('div');
    const isMobile = window.innerWidth < 768;
    
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        backdrop-filter: blur(10px);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        font-family: inherit;
        padding: 20px;
    `;
    
    const helpContent = isMobile ? `
        <div style="text-align: center; max-width: 90%; padding: 40px 20px; background: rgba(255,255,255,0.1); border-radius: 20px; backdrop-filter: blur(10px);">
            <h2 style="margin-bottom: 30px; color: #F97316; font-size: 2rem;">📱 Controles Mobile</h2>
            <div style="text-align: left; line-height: 2.2; font-size: 1.1rem;">
                <p><strong>👆 Swipe ← →</strong> Navegar entre slides</p>
                <p><strong>🔘 Botões</strong> Navegação inferior</p>
                <p><strong>☰ Menu</strong> Acesso rápido aos slides (7 slides)</p>
                <p><strong>👆👆 Duplo toque</strong> Tela cheia</p>
                <p><strong>📜 Scroll ↕</strong> Rolar conteúdo longo verticalmente</p>
                <p><strong>💬 WhatsApp</strong> Botão direto no slide final</p>
                <p><strong>🔗 Protótipo</strong> Link direto no slide final</p>
            </div>
            <p style="margin-top: 30px; font-size: 0.9rem; opacity: 0.7;">
                Toque em qualquer lugar para continuar
            </p>
        </div>
    ` : `
        <div style="text-align: center; max-width: 600px; padding: 50px 40px; background: rgba(255,255,255,0.1); border-radius: 24px; backdrop-filter: blur(10px);">
            <h2 style="margin-bottom: 40px; color: #F97316; font-size: 2.5rem;">⌨️ Controles da Apresentação</h2>
            <div style="text-align: left; line-height: 2.5; font-size: 1.2rem;">
                <p><strong>← → ↑ ↓</strong> Navegar entre slides (7 total)</p>
                <p><strong>Home/End</strong> Primeiro/último slide</p>
                <p><strong>Space</strong> Próximo slide</p>
                <p><strong>F</strong> Alternar tela cheia</p>
                <p><strong>H</strong> Mostrar esta ajuda</p>
                <p><strong style="color: #10B981;">Ctrl+Shift+A</strong> Painel Admin</p>
                <p><strong>Esc</strong> Sair da tela cheia/modais</p>
                <p><strong>👆 Swipe/Scroll</strong> Navegação</p>
                <p><strong>📜</strong> Slides longos rolam verticalmente</p>
                <p><strong>💬 WhatsApp</strong> Botão direto no slide 7</p>
            </div>
            <p style="margin-top: 40px; font-size: 1rem; opacity: 0.7;">
                Pressione qualquer tecla para continuar
            </p>
        </div>
    `;
    
    overlay.innerHTML = helpContent;
    document.body.appendChild(overlay);
    
    const closeOverlay = (e) => {
        e.preventDefault();
        overlay.remove();
        document.removeEventListener('keydown', closeOverlay);
        overlay.removeEventListener('click', closeOverlay);
        overlay.removeEventListener('touchend', closeOverlay);
    };
    
    document.addEventListener('keydown', closeOverlay);
    overlay.addEventListener('click', closeOverlay);
    overlay.addEventListener('touchend', closeOverlay);
}