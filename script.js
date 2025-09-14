// Global variables
let courses = [];
let students = [];
let classScoreConfig = {
    enabled: false,
    classPercentage: 30,
    examPercentage: 70
};
let gradingSystem = {
    type: 'university',
    grades: {
        'A+': 90, 'A': 85, 'A-': 80, 'B+': 75, 'B': 70, 'B-': 65, 'C+': 60, 'C': 55, 'C-': 50, 'D+': 45, 'D': 40, 'F': 0
    }
};

// Authentication state
let currentUser = null;
let isAuthenticated = false;

// Theme Management
let currentTheme = localStorage.getItem('examSystem_theme') || 'light';

// DOM elements
const authSection = document.getElementById('auth-section');
const mainContent = document.getElementById('main-content');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const themeToggle = document.getElementById('themeToggle');
const logoutBtn = document.getElementById('logoutBtn');
const courseCountInput = document.getElementById('courseCount');
const generateCourseFormBtn = document.getElementById('generateCourseForm');
const courseFormContainer = document.getElementById('courseFormContainer');
const courseInputs = document.getElementById('courseInputs');
const createStudentFormBtn = document.getElementById('createStudentForm');
const classScoreConfigSection = document.getElementById('class-score-config');
const enableClassScoresCheckbox = document.getElementById('enableClassScores');
const classScoreConfigContainer = document.getElementById('classScoreConfigContainer');
const classScorePercentageInput = document.getElementById('classScorePercentage');
const examScorePercentageInput = document.getElementById('examScorePercentage');
const courseClassScoreConfigs = document.getElementById('courseClassScoreConfigs');
const saveClassScoreConfigBtn = document.getElementById('saveClassScoreConfig');
const proceedToStudentEntryBtn = document.getElementById('proceedToStudentEntry');
const gradingSystemConfigSection = document.getElementById('grading-system-config');
const gradingSystemTypeSelect = document.getElementById('gradingSystemType');
const gradingSystemConfig = document.getElementById('gradingSystemConfig');
const gradeRangesContainer = document.getElementById('gradeRangesContainer');
const saveGradingSystemBtn = document.getElementById('saveGradingSystem');
const proceedToStudentEntryFromGradingBtn = document.getElementById('proceedToStudentEntryFromGrading');

// Custom grading system naming elements
const customGradingNaming = document.getElementById('customGradingNaming');
const gradingSystemNameInput = document.getElementById('gradingSystemName');
const creatorNameInput = document.getElementById('creatorName');
const gradingSystemDescriptionInput = document.getElementById('gradingSystemDescription');

// Saved grading systems elements
const savedGradingSystems = document.getElementById('savedGradingSystems');
const savedSystemsList = document.getElementById('savedSystemsList');
const loadGradingSystemBtn = document.getElementById('loadGradingSystem');
const deleteGradingSystemBtn = document.getElementById('deleteGradingSystem');

// Assessment options elements
const includeClassAssessmentsCheckbox = document.getElementById('includeClassAssessments');
const studentEntrySection = document.getElementById('student-entry');
const studentNameInput = document.getElementById('studentName');
const studentClassNameInput = document.getElementById('studentClassName');
const studentTermInput = document.getElementById('studentTerm');
const studentSessionYearInput = document.getElementById('studentSessionYear');
const scoreInputs = document.getElementById('scoreInputs');
const addStudentBtn = document.getElementById('addStudent');
const clearFormBtn = document.getElementById('clearForm');

// New step navigation elements
const step1Container = document.getElementById('step1-container');
const step2Container = document.getElementById('step2-container');
const step3Container = document.getElementById('step3-container');
const step4Container = document.getElementById('step4-container');
const nextToStudentInfoBtn = document.getElementById('nextToStudentInfo');
const backToStep1Btn = document.getElementById('backToStep1');
const nextToClassAssessmentsBtn = document.getElementById('nextToClassAssessments');
const backToStudentInfoBtn = document.getElementById('backToStudentInfo');
const nextToExamScoresBtn = document.getElementById('nextToExamScores');
const backToClassAssessmentsBtn = document.getElementById('backToClassAssessments');
const classAssessmentInputs = document.getElementById('classAssessmentInputs');
const examScoreInputs = document.getElementById('examScoreInputs');

// Batch settings elements
const batchClassNameInput = document.getElementById('batchClassName');
const batchTermInput = document.getElementById('batchTerm');
const batchSessionYearInput = document.getElementById('batchSessionYear');
const resultsTable = document.getElementById('resultsTable');
const importDataBtn = document.getElementById('importData');
const exportDataBtn = document.getElementById('exportData');
const settingsBtn = document.getElementById('settingsBtn');
const clearAllBtn = document.getElementById('clearAll');
const messageContainer = document.getElementById('messageContainer');
const studentComment1Input = document.getElementById('studentComment1');
const studentComment2Input = document.getElementById('studentComment2');
const reportSetupBtn = document.getElementById('reportSetupBtn');
const printReportsBtn = document.getElementById('printReportsBtn');
const reportCardsContainer = document.getElementById('reportCardsContainer');
const csvImportModal = document.getElementById('csvImportModal');
const closeImportModalBtn = document.getElementById('closeImportModal');
const csvFileInput = document.getElementById('csvFileInput');
const importPreview = document.getElementById('importPreview');
const importPreviewHeader = document.getElementById('importPreviewHeader');
const importPreviewBody = document.getElementById('importPreviewBody');
const saveImportedDataBtn = document.getElementById('saveImportedData');
const cancelImportBtn = document.getElementById('cancelImport');
const downloadTemplateBtn = document.getElementById('downloadTemplate');

// Event listeners
loginForm.addEventListener('submit', handleLogin);
signupForm.addEventListener('submit', handleSignup);
logoutBtn.addEventListener('click', handleLogout);
generateCourseFormBtn.addEventListener('click', generateCourseForm);
createStudentFormBtn.addEventListener('click', createStudentForm);
enableClassScoresCheckbox.addEventListener('change', toggleClassScoreConfig);
classScorePercentageInput.addEventListener('input', updateExamPercentage);
saveClassScoreConfigBtn.addEventListener('click', saveClassScoreConfig);
proceedToStudentEntryBtn.addEventListener('click', proceedToStudentEntry);
gradingSystemTypeSelect.addEventListener('change', handleGradingSystemChange);
saveGradingSystemBtn.addEventListener('click', saveGradingSystem);
proceedToStudentEntryFromGradingBtn.addEventListener('click', proceedToStudentEntryFromGrading);

// Custom grading system event listeners
loadGradingSystemBtn.addEventListener('click', loadSelectedGradingSystem);
deleteGradingSystemBtn.addEventListener('click', deleteSelectedGradingSystem);

// Assessment options event listeners
includeClassAssessmentsCheckbox.addEventListener('change', toggleClassAssessmentInputs);

// Theme toggle event listener
themeToggle.addEventListener('click', toggleTheme);
addStudentBtn.addEventListener('click', addStudent);
clearFormBtn.addEventListener('click', clearStudentForm);

// Step navigation event listeners
nextToStudentInfoBtn.addEventListener('click', goToStudentInfo);
backToStep1Btn.addEventListener('click', goToStep1);
nextToClassAssessmentsBtn.addEventListener('click', goToClassAssessments);
backToStudentInfoBtn.addEventListener('click', goToStep1);
nextToExamScoresBtn.addEventListener('click', goToExamScores);
backToClassAssessmentsBtn.addEventListener('click', goToClassAssessments);
importDataBtn.addEventListener('click', openImportModal);
exportDataBtn.addEventListener('click', exportData);
settingsBtn.addEventListener('click', openSettings);
clearAllBtn.addEventListener('click', clearAllData);
if (reportSetupBtn) reportSetupBtn.addEventListener('click', openReportSetup);
if (printReportsBtn) printReportsBtn.addEventListener('click', handlePrintReports);
closeImportModalBtn.addEventListener('click', closeImportModal);
csvFileInput.addEventListener('change', handleCSVFileSelect);
saveImportedDataBtn.addEventListener('click', saveImportedData);
cancelImportBtn.addEventListener('click', closeImportModal);
downloadTemplateBtn.addEventListener('click', downloadCSVTemplate);

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    checkAuthState();
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === csvImportModal) {
            closeImportModal();
        }
    });
});

// ==================== AUTHENTICATION FUNCTIONS ====================

// Create demo user for testing (remove in production)
function createDemoUser() {
    const users = JSON.parse(localStorage.getItem('examSystem_users') || '[]');
    
    // Check if demo user already exists
    const demoExists = users.find(u => u.email === 'demo@example.com');
    if (demoExists) return;
    
    const demoUser = {
        id: 'demo_user_123',
        username: 'Demo User',
        email: 'demo@example.com',
        password: 'demo123',
        createdAt: new Date().toISOString(),
        isDemo: true
    };
    
    users.push(demoUser);
    localStorage.setItem('examSystem_users', JSON.stringify(users));
}


// Create demo user for testing (remove in production)
createDemoUser();

// Enhanced authentication with better security
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    const minLength = 6;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    
    return {
        isValid: password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers,
        errors: []
    };
}

// Password strength checker
document.addEventListener('DOMContentLoaded', function() {
    const signupPassword = document.getElementById('signupPassword');
    const passwordStrength = document.getElementById('passwordStrength');
    
    if (signupPassword && passwordStrength) {
        signupPassword.addEventListener('input', function() {
            const password = this.value;
            const strength = checkPasswordStrength(password);
            
            passwordStrength.textContent = strength.text;
            passwordStrength.className = `password-strength ${strength.class}`;
        });
    }
});

function checkPasswordStrength(password) {
    if (password.length === 0) {
        return { text: '', class: '' };
    }
    
    let score = 0;
    let feedback = [];
    
    // Length check
    if (password.length >= 8) score++;
    else feedback.push('At least 8 characters');
    
    // Character variety checks
    if (/[a-z]/.test(password)) score++;
    else feedback.push('Lowercase letters');
    
    if (/[A-Z]/.test(password)) score++;
    else feedback.push('Uppercase letters');
    
    if (/[0-9]/.test(password)) score++;
    else feedback.push('Numbers');
    
    if (/[^A-Za-z0-9]/.test(password)) score++;
    else feedback.push('Special characters');
    
    // Additional security checks
    if (password.length >= 12) score++;
    if (!/(.)\1{2,}/.test(password)) score++; // No repeated characters
    if (!/(123|abc|qwe|password|admin)/i.test(password)) score++; // No common patterns
    
    if (score <= 3) {
        return { 
            text: `Weak password. Add: ${feedback.slice(0, 2).join(', ')}`, 
            class: 'weak' 
        };
    } else if (score <= 5) {
        return { 
            text: `Medium strength. Add: ${feedback.slice(0, 1).join(', ')}`, 
            class: 'medium' 
        };
    } else {
        return { 
            text: 'Strong password!', 
            class: 'strong' 
        };
    }
}

// Rate limiting for login attempts
let loginAttempts = 0;
let lastLoginAttempt = 0;
const MAX_LOGIN_ATTEMPTS = 5;
const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes

function isAccountLocked() {
    if (loginAttempts >= MAX_LOGIN_ATTEMPTS) {
        const timeSinceLastAttempt = Date.now() - lastLoginAttempt;
        if (timeSinceLastAttempt < LOCKOUT_DURATION) {
            const remainingTime = Math.ceil((LOCKOUT_DURATION - timeSinceLastAttempt) / 60000);
            return { locked: true, remainingMinutes: remainingTime };
        } else {
            // Reset lockout after duration
            loginAttempts = 0;
            return { locked: false, remainingMinutes: 0 };
        }
    }
    return { locked: false, remainingMinutes: 0 };
}

// Enhanced login with rate limiting
function handleLogin(e) {
    e.preventDefault();
    
    // Check if account is locked
    const lockStatus = isAccountLocked();
    if (lockStatus.locked) {
        showMessage(`Account temporarily locked. Try again in ${lockStatus.remainingMinutes} minutes.`, 'error');
        return;
    }
    
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    
    if (!email || !password) {
        showMessage('Please fill in all fields', 'error');
        return;
    }
    
    if (!validateEmail(email)) {
        showMessage('Please enter a valid email address', 'error');
        return;
    }
    
    // Simulate authentication (in a real app, this would be an API call)
    const users = JSON.parse(localStorage.getItem('examSystem_users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        // Successful login - reset attempts
        loginAttempts = 0;
        
        currentUser = {
            id: user.id,
            username: user.username || user.name, // Support both old and new format
            email: user.email,
            isDemo: user.isDemo || false
        };
        
        if (rememberMe) {
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
        } else {
            sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
        }
        
        isAuthenticated = true;
        showMainContent();
        
        if (user.isDemo) {
            showMessage(`Welcome to the demo! You can explore all features.`, 'success');
        } else {
            showMessage(`Welcome back, ${currentUser.username}!`, 'success');
        }
        
        // Clear form
        loginForm.reset();
    } else {
        // Failed login attempt
        loginAttempts++;
        lastLoginAttempt = Date.now();
        
        if (loginAttempts >= MAX_LOGIN_ATTEMPTS) {
            showMessage(`Too many failed attempts. Account locked for 15 minutes.`, 'error');
        } else {
            const remainingAttempts = MAX_LOGIN_ATTEMPTS - loginAttempts;
            showMessage(`Invalid email or password. ${remainingAttempts} attempts remaining.`, 'error');
        }
        
        // Clear password field and add delay
        setTimeout(() => {
            document.getElementById('loginPassword').value = '';
        }, 1000);
    }
}

// Enhanced signup with better validation
function handleSignup(e) {
    e.preventDefault();
    
    const username = document.getElementById('signupName').value.trim();
    const email = document.getElementById('signupEmail').value.trim();
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirmPassword').value;
    const agreeTerms = document.getElementById('agreeTerms').checked;
    
    if (!username || !email || !password || !confirmPassword) {
        showMessage('Please fill in all fields', 'error');
        return;
    }
    
    if (username.length < 2) {
        showMessage('Username must be at least 2 characters long', 'error');
        return;
    }
    
    if (!validateEmail(email)) {
        showMessage('Please enter a valid email address', 'error');
        return;
    }
    
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
        showMessage('Password must be at least 6 characters with uppercase, lowercase, and numbers', 'error');
        return;
    }
    
    if (password !== confirmPassword) {
        showMessage('Passwords do not match', 'error');
        return;
    }
    
    if (!agreeTerms) {
        showMessage('Please agree to the terms and conditions', 'error');
        return;
    }
    
    // Check if user already exists
    const users = JSON.parse(localStorage.getItem('examSystem_users') || '[]');
    if (users.find(u => u.email === email)) {
        showMessage('User with this email already exists', 'error');
        return;
    }
    
    // Create new user
    const newUser = {
        id: Date.now().toString(),
        username: username,
        email: email,
        password: password,
        createdAt: new Date().toISOString(),
        isDemo: false
    };
    
    users.push(newUser);
    localStorage.setItem('examSystem_users', JSON.stringify(users));
    
    // Clear signup form
    signupForm.reset();
    
    // Switch to login form and show success message
    toggleAuthForm('login');
    showMessage(`Account created successfully! Please sign in with your credentials.`, 'success');
    
    // Pre-fill the email in login form for convenience
    const loginEmailInput = document.getElementById('loginEmail');
    if (loginEmailInput) {
        loginEmailInput.value = email;
    }
}

// Enhanced logout with confirmation
function handleLogout() {
    if (currentUser && currentUser.isDemo) {
        // For demo users, just logout without confirmation
        performLogout();
    } else {
        // For regular users, ask for confirmation
        if (confirm('Are you sure you want to logout?')) {
            performLogout();
        }
    }
}

function performLogout() {
    currentUser = null;
    isAuthenticated = false;
    
    // Clear stored user data
    localStorage.removeItem('currentUser');
    sessionStorage.removeItem('currentUser');
    
    // Clear current session data to prevent data leakage between users
    courses = [];
    students = [];
    classScoreConfig = {
        enabled: false,
        classPercentage: 30,
        examPercentage: 70
    };
    gradingSystem = {
        type: 'university',
        grades: {
            'A+': 90, 'A': 85, 'A-': 80, 'B+': 75, 'B': 70, 'B-': 65, 'C+': 60, 'C': 55, 'C-': 50, 'D+': 45, 'D': 40, 'F': 0
        }
    };
    
    // Clear UI elements and reset form states
    if (courseFormContainer) courseFormContainer.innerHTML = '';
    if (scoreInputs) scoreInputs.innerHTML = '';
    if (resultsTable) resultsTable.innerHTML = '';
    if (courseCountInput) courseCountInput.value = '';
    
    // Reset class score configuration UI
    if (enableClassScoresCheckbox) enableClassScoresCheckbox.checked = false;
    if (classScoreConfigContainer) classScoreConfigContainer.style.display = 'none';
    if (classScorePercentageInput) classScorePercentageInput.value = '30';
    if (examScorePercentageInput) examScorePercentageInput.value = '70';
    if (classScoreConfigSection) classScoreConfigSection.style.display = 'none';
    
    // Reset grading system configuration UI
    if (gradingSystemConfigSection) gradingSystemConfigSection.style.display = 'none';
    if (gradingSystemTypeSelect) gradingSystemTypeSelect.value = 'university';
    if (gradeRangesContainer) gradeRangesContainer.innerHTML = '';
    
    // Reset batch settings UI
    if (batchClassNameInput) batchClassNameInput.value = '';
    if (batchTermInput) batchTermInput.value = '';
    if (batchSessionYearInput) batchSessionYearInput.value = '';
    
    // Reset student entry form UI
    if (studentNameInput) studentNameInput.value = '';
    if (studentClassNameInput) studentClassNameInput.value = '';
    if (studentTermInput) studentTermInput.value = '';
    if (studentSessionYearInput) studentSessionYearInput.value = '';
    if (studentComment1Input) studentComment1Input.value = '';
    if (studentComment2Input) studentComment2Input.value = '';
    
    // Reset step navigation
    if (step1Container) step1Container.style.display = 'block';
    if (step2Container) step2Container.style.display = 'none';
    if (step3Container) step3Container.style.display = 'none';
    if (step4Container) step4Container.style.display = 'none';
    
    // Reset assessment options
    if (includeClassAssessmentsCheckbox) includeClassAssessmentsCheckbox.checked = true;
    if (classAssessmentInputs) classAssessmentInputs.innerHTML = '';
    if (examScoreInputs) examScoreInputs.innerHTML = '';
    
    // Hide all sections that should be hidden initially
    if (courseFormContainer) courseFormContainer.style.display = 'none';
    if (studentEntrySection) studentEntrySection.style.display = 'none';
    
    showAuthForm();
    showMessage('You have been logged out successfully', 'success');
}



// Initialize demo user and check auth state
function checkAuthState() {
    // Create demo user for testing
    createDemoUser();
    
    const savedUser = localStorage.getItem('currentUser');
    const sessionUser = sessionStorage.getItem('currentUser');
    
    if (savedUser) {
        try {
            const parsedUser = JSON.parse(savedUser);
            // Validate the user object structure
            if (parsedUser && parsedUser.id && parsedUser.email && (parsedUser.username || parsedUser.name)) {
                currentUser = parsedUser;
                isAuthenticated = true;
                showMainContent();
            } else {
                console.warn('Invalid user data structure:', parsedUser);
                localStorage.removeItem('currentUser');
                showAuthForm();
            }
        } catch (e) {
            console.error('Error parsing saved user:', e);
            localStorage.removeItem('currentUser');
            showAuthForm();
        }
    } else if (sessionUser) {
        try {
            const parsedUser = JSON.parse(sessionUser);
            // Validate the user object structure
            if (parsedUser && parsedUser.id && parsedUser.email && (parsedUser.username || parsedUser.name)) {
                currentUser = parsedUser;
                isAuthenticated = true;
                showMainContent();
            } else {
                console.warn('Invalid user data structure:', parsedUser);
                sessionStorage.removeItem('currentUser');
                showAuthForm();
            }
        } catch (e) {
            console.error('Error parsing session user:', e);
            sessionStorage.removeItem('currentUser');
            showAuthForm();
        }
    } else {
        showAuthForm();
    }
}

function showAuthForm() {
    authSection.style.display = 'block';
    mainContent.style.display = 'none';
    
    // Hide logout button
    if (logoutBtn) {
        logoutBtn.style.display = 'none';
    }
    
    // Hide user info
    const userInfo = document.getElementById('userInfo');
    if (userInfo) {
        userInfo.style.display = 'none';
    }
    
    isAuthenticated = false;
    currentUser = null;
}

function showMainContent() {
    authSection.style.display = 'none';
    mainContent.style.display = 'block';
    
    // Show logout button
    if (logoutBtn) {
        logoutBtn.style.display = 'inline-flex';
    }
    
    // Show user info
    const userInfo = document.getElementById('userInfo');
    const userName = document.getElementById('userName');
    if (userInfo && userName && currentUser) {
        userInfo.style.display = 'block';
        
        // Ensure we have a valid username
        let displayName = 'User';
        if (currentUser.username && typeof currentUser.username === 'string' && currentUser.username.trim() !== '') {
            displayName = currentUser.username.trim();
        } else if (currentUser.name && typeof currentUser.name === 'string' && currentUser.name.trim() !== '') {
            // Fallback to old name field for backward compatibility
            displayName = currentUser.name.trim();
        } else if (currentUser.email) {
            // Fallback to email if username is missing
            displayName = currentUser.email.split('@')[0];
        }
        
        console.log('Current user:', currentUser); // Debug log
        console.log('Display name:', displayName); // Debug log
        
        userName.textContent = displayName;
        
        // Update welcome time
        updateWelcomeTime();
        // Update time every minute
        if (!window.welcomeTimeInterval) {
            window.welcomeTimeInterval = setInterval(updateWelcomeTime, 60000);
        }
    }
    
    isAuthenticated = true;
    
    // DOM elements are now queried dynamically in functions, so no re-initialization needed
    
    // Debug: Test DOM element accessibility after login
    setTimeout(() => {
        const testElement = document.getElementById('generateCourseForm');
        console.log('Generate Course Form Button after login:', testElement);
        if (testElement) {
            console.log('Button is accessible and visible:', testElement.offsetParent !== null);
        }
    }, 100);
    
    // Load data first, then reset UI elements that should be clean for new users
    loadData();
    
    // Reset only UI elements that should start clean (not data-dependent elements)
    resetNonDataUIElements();
    
    updateResultsTable();
}

// Re-initialize main content event listeners after authentication
function initializeMainContentEventListeners() {
    // Re-query DOM elements to ensure they're properly accessible
    const generateCourseFormBtnRefresh = document.getElementById('generateCourseForm');
    const createStudentFormBtnRefresh = document.getElementById('createStudentForm');
    const enableClassScoresCheckboxRefresh = document.getElementById('enableClassScores');
    const classScorePercentageInputRefresh = document.getElementById('classScorePercentage');
    const saveClassScoreConfigBtnRefresh = document.getElementById('saveClassScoreConfig');
    const proceedToStudentEntryBtnRefresh = document.getElementById('proceedToStudentEntry');
    const gradingSystemTypeSelectRefresh = document.getElementById('gradingSystemType');
    const saveGradingSystemBtnRefresh = document.getElementById('saveGradingSystem');
    const proceedToStudentEntryFromGradingBtnRefresh = document.getElementById('proceedToStudentEntryFromGrading');
    const addStudentBtnRefresh = document.getElementById('addStudent');
    const clearFormBtnRefresh = document.getElementById('clearForm');
    const nextToStudentInfoBtnRefresh = document.getElementById('nextToStudentInfo');
    const backToStep1BtnRefresh = document.getElementById('backToStep1');
    const nextToClassAssessmentsBtnRefresh = document.getElementById('nextToClassAssessments');
    const backToStudentInfoBtnRefresh = document.getElementById('backToStudentInfo');
    const nextToExamScoresBtnRefresh = document.getElementById('nextToExamScores');
    const backToClassAssessmentsBtnRefresh = document.getElementById('backToClassAssessments');
    const includeClassAssessmentsCheckboxRefresh = document.getElementById('includeClassAssessments');
    
    // Remove existing event listeners and add new ones to prevent duplicates
    if (generateCourseFormBtnRefresh) {
        generateCourseFormBtnRefresh.removeEventListener('click', generateCourseForm);
        generateCourseFormBtnRefresh.addEventListener('click', generateCourseForm);
    }
    
    if (createStudentFormBtnRefresh) {
        createStudentFormBtnRefresh.removeEventListener('click', createStudentForm);
        createStudentFormBtnRefresh.addEventListener('click', createStudentForm);
    }
    
    if (enableClassScoresCheckboxRefresh) {
        enableClassScoresCheckboxRefresh.removeEventListener('change', toggleClassScoreConfig);
        enableClassScoresCheckboxRefresh.addEventListener('change', toggleClassScoreConfig);
    }
    
    if (classScorePercentageInputRefresh) {
        classScorePercentageInputRefresh.removeEventListener('input', updateExamPercentage);
        classScorePercentageInputRefresh.addEventListener('input', updateExamPercentage);
    }
    
    if (saveClassScoreConfigBtnRefresh) {
        saveClassScoreConfigBtnRefresh.removeEventListener('click', saveClassScoreConfig);
        saveClassScoreConfigBtnRefresh.addEventListener('click', saveClassScoreConfig);
    }
    
    if (proceedToStudentEntryBtnRefresh) {
        proceedToStudentEntryBtnRefresh.removeEventListener('click', proceedToStudentEntry);
        proceedToStudentEntryBtnRefresh.addEventListener('click', proceedToStudentEntry);
    }
    
    if (gradingSystemTypeSelectRefresh) {
        gradingSystemTypeSelectRefresh.removeEventListener('change', handleGradingSystemChange);
        gradingSystemTypeSelectRefresh.addEventListener('change', handleGradingSystemChange);
    }
    
    if (saveGradingSystemBtnRefresh) {
        saveGradingSystemBtnRefresh.removeEventListener('click', saveGradingSystem);
        saveGradingSystemBtnRefresh.addEventListener('click', saveGradingSystem);
    }
    
    if (proceedToStudentEntryFromGradingBtnRefresh) {
        proceedToStudentEntryFromGradingBtnRefresh.removeEventListener('click', proceedToStudentEntryFromGrading);
        proceedToStudentEntryFromGradingBtnRefresh.addEventListener('click', proceedToStudentEntryFromGrading);
    }
    
    if (addStudentBtnRefresh) {
        addStudentBtnRefresh.removeEventListener('click', addStudent);
        addStudentBtnRefresh.addEventListener('click', addStudent);
    }
    
    if (clearFormBtnRefresh) {
        clearFormBtnRefresh.removeEventListener('click', clearStudentForm);
        clearFormBtnRefresh.addEventListener('click', clearStudentForm);
    }
    
    if (nextToStudentInfoBtnRefresh) {
        nextToStudentInfoBtnRefresh.removeEventListener('click', goToStudentInfo);
        nextToStudentInfoBtnRefresh.addEventListener('click', goToStudentInfo);
    }
    
    if (backToStep1BtnRefresh) {
        backToStep1BtnRefresh.removeEventListener('click', goToStep1);
        backToStep1BtnRefresh.addEventListener('click', goToStep1);
    }
    
    if (nextToClassAssessmentsBtnRefresh) {
        nextToClassAssessmentsBtnRefresh.removeEventListener('click', goToClassAssessments);
        nextToClassAssessmentsBtnRefresh.addEventListener('click', goToClassAssessments);
    }
    
    if (backToStudentInfoBtnRefresh) {
        backToStudentInfoBtnRefresh.removeEventListener('click', goToStep1);
        backToStudentInfoBtnRefresh.addEventListener('click', goToStep1);
    }
    
    if (nextToExamScoresBtnRefresh) {
        nextToExamScoresBtnRefresh.removeEventListener('click', goToExamScores);
        nextToExamScoresBtnRefresh.addEventListener('click', goToExamScores);
    }
    
    if (backToClassAssessmentsBtnRefresh) {
        backToClassAssessmentsBtnRefresh.removeEventListener('click', goToClassAssessments);
        backToClassAssessmentsBtnRefresh.addEventListener('click', goToClassAssessments);
    }
    
    if (includeClassAssessmentsCheckboxRefresh) {
        includeClassAssessmentsCheckboxRefresh.removeEventListener('change', toggleClassAssessmentInputs);
        includeClassAssessmentsCheckboxRefresh.addEventListener('change', toggleClassAssessmentInputs);
    }
}

// Reset only non-data UI elements for new user login
function resetNonDataUIElements() {
    // Reset step navigation to step 1 (but don't clear data-dependent forms)
    if (step1Container) step1Container.style.display = 'block';
    if (step2Container) step2Container.style.display = 'none';
    if (step3Container) step3Container.style.display = 'none';
    if (step4Container) step4Container.style.display = 'none';
    
    // Clear only input fields that should start fresh (not configuration)
    if (studentNameInput) studentNameInput.value = '';
    if (studentClassNameInput) studentClassNameInput.value = '';
    if (studentTermInput) studentTermInput.value = '';
    if (studentSessionYearInput) studentSessionYearInput.value = '';
    if (studentComment1Input) studentComment1Input.value = '';
    if (studentComment2Input) studentComment2Input.value = '';
    
    // Clear dynamic assessment inputs (these will be regenerated based on user data)
    if (classAssessmentInputs) classAssessmentInputs.innerHTML = '';
    if (examScoreInputs) examScoreInputs.innerHTML = '';
    
    // Note: We don't reset course forms, class score config, grading system config
    // as these should be restored from user data by loadData()
}

function toggleAuthForm(formType) {
    const loginFormEl = document.getElementById('login-form');
    const signupFormEl = document.getElementById('signup-form');
    
    if (formType === 'signup') {
        loginFormEl.classList.remove('active');
        signupFormEl.classList.add('active');
    } else {
        signupFormEl.classList.remove('active');
        loginFormEl.classList.add('active');
    }
}

function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const toggle = input.parentElement.querySelector('.password-toggle i');
    
    if (input.type === 'password') {
        input.type = 'text';
        toggle.className = 'fas fa-eye-slash';
    } else {
        input.type = 'password';
        toggle.className = 'fas fa-eye';
    }
}

// ==================== EXISTING FUNCTIONS ====================

// -------------------- Report Cards & Printing --------------------

function loadReportSettings() {
    const saved = localStorage.getItem('examSystem_reportSettings');
    let defaults = { order: 'position', term: '', className: '', sessionYear: '', comment1: '', comment2: '' };
    try {
        return saved ? { ...defaults, ...JSON.parse(saved) } : defaults;
    } catch (e) {
        return defaults;
    }
}

function saveReportSettings(settings) {
    localStorage.setItem('examSystem_reportSettings', JSON.stringify(settings));
}

function openReportSetup() {
    const settings = loadReportSettings();
    const institutionName = localStorage.getItem('examSystem_institutionName') || '';
    const institutionLogo = localStorage.getItem('examSystem_institutionLogo') || '';

    const modal = document.createElement('div');
    modal.className = 'pin-modal';
    modal.innerHTML = `
        <div class="pin-modal-content">
            <div class="pin-modal-header">
                <h3><i class="fas fa-file-signature"></i> Report Setup</h3>
                <p>Configure institution details and print order</p>
            </div>
            <div class="pin-modal-body">
                <div class="form-group">
                    <label for="institutionNameInput">Institution Name:</label>
                    <input type="text" id="institutionNameInput" class="form-input" placeholder="e.g., Mahama Senior High School" value="${institutionName.replace(/"/g, '&quot;')}">
                </div>
                <div class="form-group">
                    <label for="institutionLogoInput">Institution Logo (optional):</label>
                    <input type="file" id="institutionLogoInput" class="form-input" accept="image/*">
                    <small class="form-help">PNG with transparent background recommended. Max ~1MB.</small>
                </div>
                <div class="form-group" style="text-align:center;">
                    <img id="institutionLogoPreview" src="${institutionLogo}" alt="Logo Preview" style="max-height:80px; ${institutionLogo ? '' : 'display:none;'}">
                </div>
                <div class="form-group">
                    <label for="termInput">Term:</label>
                    <input type="text" id="termInput" class="form-input" placeholder="e.g., Term 1" value="${(settings.term || '').replace(/"/g, '&quot;')}">
                </div>
                <div class="form-group">
                    <label for="classNameInput">Class:</label>
                    <input type="text" id="classNameInput" class="form-input" placeholder="e.g., Form 2A" value="${(settings.className || '').replace(/"/g, '&quot;')}">
                </div>
                <div class="form-group">
                    <label for="sessionYearInput">Session/Year:</label>
                    <input type="text" id="sessionYearInput" class="form-input" placeholder="e.g., 2024/2025" value="${(settings.sessionYear || '').replace(/"/g, '&quot;')}">
                </div>
                <div class="form-group">
                    <label for="reportOrderSelect">Student Order:</label>
                    <select id="reportOrderSelect" class="form-input">
                        <option value="position" ${settings.order === 'position' ? 'selected' : ''}>By Overall Position (1st → last)</option>
                        <option value="name" ${settings.order === 'name' ? 'selected' : ''}>Alphabetical (A → Z)</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="comment1Input">Teacher's Comment (optional):</label>
                    <textarea id="comment1Input" class="form-input" rows="3" placeholder="e.g., Excellent performance and class participation.">${(settings.comment1 || '').replace(/</g,'&lt;').replace(/>/g,'&gt;')}</textarea>
                </div>
                <div class="form-group">
                    <label for="comment2Input">Head's Comment (optional):</label>
                    <textarea id="comment2Input" class="form-input" rows="3" placeholder="e.g., Keep up the great work.">${(settings.comment2 || '').replace(/</g,'&lt;').replace(/>/g,'&gt;')}</textarea>
                </div>
            </div>
            <div class="pin-modal-footer">
                <button id="saveReportSetup" class="btn btn-success"><i class="fas fa-save"></i> Save</button>
                <button id="cancelReportSetup" class="btn btn-secondary"><i class="fas fa-times"></i> Cancel</button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    const logoInput = document.getElementById('institutionLogoInput');
    const logoPreview = document.getElementById('institutionLogoPreview');
    logoInput.addEventListener('change', function() {
        const file = this.files && this.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = function(e) {
            const dataUrl = e.target && e.target.result ? e.target.result : '';
            logoPreview.src = dataUrl;
            logoPreview.style.display = dataUrl ? 'inline-block' : 'none';
            localStorage.setItem('examSystem_institutionLogo', dataUrl);
        };
        reader.readAsDataURL(file);
    });

    document.getElementById('saveReportSetup').addEventListener('click', function() {
        const name = document.getElementById('institutionNameInput').value.trim();
        const order = document.getElementById('reportOrderSelect').value;
        const term = (document.getElementById('termInput').value || '').trim();
        const className = (document.getElementById('classNameInput').value || '').trim();
        const sessionYear = (document.getElementById('sessionYearInput').value || '').trim();
        const comment1 = (document.getElementById('comment1Input').value || '').trim();
        const comment2 = (document.getElementById('comment2Input').value || '').trim();
        localStorage.setItem('examSystem_institutionName', name);
        saveReportSettings({ order, term, className, sessionYear, comment1, comment2 });
        showMessage('Report settings saved', 'success');
        document.body.removeChild(modal);
    });

    document.getElementById('cancelReportSetup').addEventListener('click', function() {
        document.body.removeChild(modal);
    });
}

function handlePrintReports() {
    if (students.length === 0 || courses.length === 0) {
        showMessage('Add courses and students before printing reports', 'error');
        return;
    }
    generateReportCards();
    const cleanup = () => {
        if (reportCardsContainer) {
            reportCardsContainer.style.display = 'none';
            reportCardsContainer.innerHTML = '';
        }
        window.removeEventListener('afterprint', cleanup);
    };
    window.addEventListener('afterprint', cleanup);
    window.print();
    // Fallback cleanup in case afterprint doesn't fire
    setTimeout(cleanup, 1500);
}

function generateReportCards() {
    const settings = loadReportSettings();
    const institutionName = localStorage.getItem('examSystem_institutionName') || '';
    const institutionLogo = localStorage.getItem('examSystem_institutionLogo') || '';

    const overallPositions = computeOverallPositions();
    const perCoursePositions = computeCoursePositions();

    // Sort students
    let orderedStudents = [...students];
    if (settings.order === 'position') {
        orderedStudents.sort((a, b) => {
            const pa = overallPositions[a.id] || 9999;
            const pb = overallPositions[b.id] || 9999;
            if (pa !== pb) return pa - pb;
            // tie-break by name
            return a.name.localeCompare(b.name);
        });
    } else {
        orderedStudents.sort((a, b) => a.name.localeCompare(b.name));
    }

    // Build cards
    reportCardsContainer.innerHTML = '';
    reportCardsContainer.style.display = 'block';

    orderedStudents.forEach((student, idx) => {
        const overallPos = overallPositions[student.id] || '-';
        const overallPosText = typeof overallPos === 'number' ? getOrdinal(overallPos) : '-';
        const overallGrade = getGrade(student.average);

        let cardHTML = '';
        cardHTML += '<div class="report-card">';
        cardHTML += '  <div class="rc-header">';
        cardHTML += '    <div class="rc-brand">';
        if (institutionLogo) {
            cardHTML += `      <img class="rc-logo" src="${institutionLogo}" alt="Logo">`;
        }
        cardHTML += '      <div class="rc-title">';
        cardHTML += `        <h2>${institutionName || 'Institution'}</h2>`;
        cardHTML += '        <h3>Report Card</h3>';
        cardHTML += '      </div>';
        cardHTML += '    </div>';
        cardHTML += '  </div>';

        cardHTML += '  <div class="rc-student">';
        cardHTML += `    <div><strong>Student:</strong> ${student.name}</div>`;
        // Prefer per-student class/term/session, fallback to global settings
        const sClass = (student.className || '').trim() || (settings.className || '').trim();
        const sTerm = (student.term || '').trim() || (settings.term || '').trim();
        const sSession = (student.sessionYear || '').trim() || (settings.sessionYear || '').trim();
        if (sClass) {
            cardHTML += `    <div><strong>Class:</strong> ${sClass}</div>`;
        }
        if (sTerm) {
            cardHTML += `    <div><strong>Term:</strong> ${sTerm}</div>`;
        }
        if (sSession) {
            cardHTML += `    <div><strong>Session/Year:</strong> ${sSession}</div>`;
        }
        cardHTML += `    <div><strong>Overall Position:</strong> ${overallPosText}</div>`;
        cardHTML += `    <div><strong>Total:</strong> ${student.total}</div>`;
        cardHTML += `    <div><strong>Average:</strong> ${student.average}%</div>`;
        cardHTML += `    <div><strong>Overall Grade:</strong> ${overallGrade}</div>`;
        cardHTML += '  </div>';

        // Table
        cardHTML += '  <table class="rc-table">';
        cardHTML += '    <thead><tr>';
        cardHTML += '      <th>Course</th>';
        if (classScoreConfig.enabled) {
            cardHTML += '      <th>Class</th><th>Exam</th>';
        }
        cardHTML += '      <th>Final</th><th>Grade</th><th>Position</th>';
        cardHTML += '    </tr></thead>';
        cardHTML += '    <tbody>';

        courses.forEach((courseName, cIdx) => {
            const finalScore = student.scores[cIdx];
            const grade = getGrade(finalScore);
            const pos = perCoursePositions[cIdx][student.id];
            const posText = typeof pos === 'number' ? getOrdinal(pos) : '-';
            cardHTML += '      <tr>';
            cardHTML += `        <td>${courseName}</td>`;
            if (classScoreConfig.enabled && student.classScores && student.examScores) {
                cardHTML += `        <td>${student.classScores[cIdx]}</td>`;
                cardHTML += `        <td>${student.examScores[cIdx]}</td>`;
            }
            cardHTML += `        <td>${finalScore}</td>`;
            cardHTML += `        <td>${grade}</td>`;
            cardHTML += `        <td>${posText}</td>`;
            cardHTML += '      </tr>';
        });

        cardHTML += '    </tbody>';
        cardHTML += '  </table>';

        // Comments: prefer per-student; fallback to global settings
        const sComment1 = (student.comment1 || '').trim() || (settings.comment1 || '').trim();
        const sComment2 = (student.comment2 || '').trim() || (settings.comment2 || '').trim();
        if (sComment1 || sComment2) {
            cardHTML += '  <div class="rc-comments">';
            if (sComment1) {
                cardHTML += `    <div class="rc-comment"><strong>Teacher's Comment:</strong> ${sComment1.replace(/</g,'&lt;').replace(/>/g,'&gt;')}</div>`;
            }
            if (sComment2) {
                cardHTML += `    <div class="rc-comment"><strong>Head's Comment:</strong> ${sComment2.replace(/</g,'&lt;').replace(/>/g,'&gt;')}</div>`;
            }
            cardHTML += '  </div>';
        }

        cardHTML += '  <div class="rc-footer">';
        cardHTML += '    <div class="rc-sign">Class Teacher: ________________________</div>';
        cardHTML += '    <div class="rc-sign">Head Teacher: _________________________</div>';
        cardHTML += '  </div>';

        cardHTML += '</div>';

        const wrapper = document.createElement('div');
        wrapper.innerHTML = cardHTML;
        reportCardsContainer.appendChild(wrapper.firstChild);
    });
}

function computeCoursePositions() {
    // Returns array per courseIndex: map studentId -> position (1-based)
    const positionsPerCourse = courses.map(() => ({}));
    courses.forEach((_, idx) => {
        const records = students.map(st => ({ id: st.id, score: st.scores[idx] }));
        // sort desc by score
        records.sort((a, b) => (b.score - a.score));
        let currentRank = 0;
        let lastScore = null;
        let seen = 0;
        records.forEach(r => {
            seen += 1;
            if (lastScore === null || r.score !== lastScore) {
                currentRank = seen; // competition ranking (1,2,2,4)
                lastScore = r.score;
            }
            positionsPerCourse[idx][r.id] = currentRank;
        });
    });
    return positionsPerCourse;
}

function computeOverallPositions() {
    // Map studentId -> overall position by total desc with ties
    const records = students.map(st => ({ id: st.id, total: st.total, name: st.name }));
    records.sort((a, b) => {
        if (b.total !== a.total) return b.total - a.total;
        return a.name.localeCompare(b.name);
    });
    const posMap = {};
    let currentRank = 0;
    let lastTotal = null;
    let seen = 0;
    records.forEach(r => {
        seen += 1;
        if (lastTotal === null || r.total !== lastTotal) {
            currentRank = seen;
            lastTotal = r.total;
        }
        posMap[r.id] = currentRank;
    });
    return posMap;
}

function getOrdinal(n) {
    const s = ["th", "st", "nd", "rd"], v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

// Generate course form based on number of courses
function generateCourseForm() {
    // Query DOM elements dynamically to ensure fresh references
    const courseCountInputElement = document.getElementById('courseCount');
    const courseInputsElement = document.getElementById('courseInputs');
    const courseFormContainerElement = document.getElementById('courseFormContainer');
    
    if (!courseCountInputElement || !courseInputsElement || !courseFormContainerElement) {
        showMessage('Course form elements not found. Please refresh the page.', 'error');
        return;
    }
    
    const courseCount = parseInt(courseCountInputElement.value);
    
    if (courseCount < 1 || courseCount > 20) {
        showMessage('Please enter a valid number of courses (1-20)', 'error');
        return;
    }
    
    courseInputsElement.innerHTML = '';
    
    for (let i = 0; i < courseCount; i++) {
        const courseInputGroup = document.createElement('div');
        courseInputGroup.className = 'course-input-group';
        
        const label = document.createElement('label');
        label.textContent = `Course ${i + 1}:`;
        
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'form-input';
        input.placeholder = `Enter course ${i + 1} name`;
        input.required = true;
        
        courseInputGroup.appendChild(label);
        courseInputGroup.appendChild(input);
        courseInputsElement.appendChild(courseInputGroup);
    }
    
    courseFormContainerElement.style.display = 'block';
    showMessage('Course form generated successfully!', 'success');
}

// Create student form after courses are defined
function createStudentForm() {
    // Query DOM elements dynamically
    const courseInputsElement = document.getElementById('courseInputs');
    const classScoreConfigSectionElement = document.getElementById('class-score-config');
    
    if (!courseInputsElement || !classScoreConfigSectionElement) {
        showMessage('Required elements not found. Please refresh the page.', 'error');
        return;
    }
    
    const courseInputElements = courseInputsElement.querySelectorAll('input');
    courses = [];
    
    // Validate and collect course names
    for (let i = 0; i < courseInputElements.length; i++) {
        const courseName = courseInputElements[i].value.trim();
        if (!courseName) {
            showMessage(`Please enter a name for Course ${i + 1}`, 'error');
            return;
        }
        if (courses.includes(courseName)) {
            showMessage(`Course "${courseName}" is already added. Please use unique course names.`, 'error');
            return;
        }
        courses.push(courseName);
    }
    
    // Show class score configuration section
    classScoreConfigSectionElement.style.display = 'block';
    generateClassScoreConfigForm();
    showMessage('Course setup completed! Configure class score settings.', 'success');
    
    // Save courses to localStorage and mark forms as created
    localStorage.setItem('examSystem_formsCreated', 'true');
    saveData();
}

// Generate class score configuration form
function generateClassScoreConfigForm() {
    courseClassScoreConfigs.innerHTML = '';
    
    // Add a note about the configuration
    const noteDiv = document.createElement('div');
    noteDiv.className = 'config-note';
    noteDiv.innerHTML = `
        <div class="note-box">
            <i class="fas fa-info-circle"></i>
            <p><strong>Configuration Note:</strong> The percentage allocation you set here will be applied to all courses. 
            Individual class and exam scores will be entered in the student entry form.</p>
        </div>
    `;
    courseClassScoreConfigs.appendChild(noteDiv);
}

// Toggle class score configuration visibility
function toggleClassScoreConfig() {
    const enabled = enableClassScoresCheckbox.checked;
    classScoreConfigContainer.style.display = enabled ? 'block' : 'none';
    classScoreConfig.enabled = enabled;
}

// Update exam percentage when class percentage changes
function updateExamPercentage() {
    const classPercentage = parseInt(classScorePercentageInput.value) || 0;
    const examPercentage = 100 - classPercentage;
    examScorePercentageInput.value = examPercentage;
    classScoreConfig.classPercentage = classPercentage;
    classScoreConfig.examPercentage = examPercentage;
    
    // Update validation messages if they exist
    updateValidationMessages();
}

// Update validation messages for existing score inputs
function updateValidationMessages() {
    const classScoreInputs = document.querySelectorAll('[id^="class-score-input-"]');
    const examScoreInputs = document.querySelectorAll('[id^="exam-score-input-"]');
    
    classScoreInputs.forEach((input, index) => {
        const helpText = input.parentElement.querySelector('.form-help.error');
        if (helpText && helpText.textContent.includes('Must be above')) {
            helpText.textContent = `Must be above ${classScoreConfig.classPercentage}%`;
        }
        input.min = classScoreConfig.classPercentage + 1;
        input.placeholder = `Over ${classScoreConfig.classPercentage}`;
    });
    
    examScoreInputs.forEach((input, index) => {
        const helpText = input.parentElement.querySelector('.form-help.error');
        if (helpText && helpText.textContent.includes('Must be above')) {
            helpText.textContent = `Must be above ${classScoreConfig.examPercentage}%`;
        }
        input.min = classScoreConfig.examPercentage + 1;
        input.placeholder = `Over ${classScoreConfig.examPercentage}`;
    });
}

// Save class score configuration
function saveClassScoreConfig() {
    if (!classScoreConfig.enabled) {
        proceedToStudentEntry();
        return;
    }
    
    // Validate percentage inputs
    const classPercentage = parseInt(classScorePercentageInput.value);
    if (isNaN(classPercentage) || classPercentage < 0 || classPercentage > 100) {
        showMessage('Please enter a valid class score percentage (0-100)', 'error');
        return;
    }
    
    showMessage('Class score configuration saved successfully!', 'success');
    proceedToStudentEntry();
}

// Proceed to student entry form
function proceedToStudentEntry() {
    // Mark forms as created
    localStorage.setItem('examSystem_formsCreated', 'true');
    
    // Show grading system configuration section
    gradingSystemConfigSection.style.display = 'block';
    handleGradingSystemChange();
    showMessage('Configure your grading system before proceeding.', 'success');
}

// Handle grading system type change
function handleGradingSystemChange() {
    const selectedType = gradingSystemTypeSelect.value;
    gradingSystem.type = selectedType;
    
    // Set default grades based on type
    if (selectedType === 'university') {
        gradingSystem.grades = {
            'A+': 90, 'A': 85, 'A-': 80, 'B+': 75, 'B': 70, 'B-': 65, 
            'C+': 60, 'C': 55, 'C-': 50, 'D+': 45, 'D': 40, 'F': 0
        };
    } else if (selectedType === 'secondary') {
        gradingSystem.grades = {
            'A1': 90, 'B2': 80, 'B3': 70, 'C4': 60, 'C5': 55, 
            'C6': 50, 'D7': 45, 'E8': 40, 'F9': 0
        };
    } else if (selectedType === 'custom') {
        // For custom, start with empty grades or keep existing
        if (!gradingSystem.grades || Object.keys(gradingSystem.grades).length === 0) {
            gradingSystem.grades = {};
        }
    }
    
    // Show display for all systems
    updateGradingSystemDisplay();
    
    // Show configuration only for custom systems
    if (selectedType === 'custom') {
        gradingSystemConfig.style.display = 'block';
        customGradingNaming.style.display = 'block';
        generateGradeRangesForm();
    } else {
        gradingSystemConfig.style.display = 'none';
        customGradingNaming.style.display = 'none';
    }
    
    loadSavedGradingSystems();
}

// Update grading system display
function updateGradingSystemDisplay() {
    const gradingSystemDisplay = document.getElementById('gradingSystemDisplay');
    const gradingSystemPreview = document.getElementById('gradingSystemPreview');
    const gradeList = document.getElementById('gradeList');
    
    if (!gradingSystemDisplay || !gradingSystemPreview || !gradeList) return;
    
    const grades = Object.keys(gradingSystem.grades).sort((a, b) => {
        return gradingSystem.grades[b] - gradingSystem.grades[a];
    });
    
    if (grades.length === 0) {
        gradingSystemDisplay.style.display = 'none';
        return;
    }
    
    gradingSystemDisplay.style.display = 'block';
    
    // Update preview text
    const previewText = gradingSystemPreview.querySelector('.preview-text');
    if (previewText) {
        const systemName = gradingSystemTypeSelect.options[gradingSystemTypeSelect.selectedIndex].text;
        previewText.textContent = `${systemName} - ${grades.length} grades`;
    }
    
    // Generate grade list
    gradeList.innerHTML = '';
    grades.forEach((grade, index) => {
        const gradeItem = document.createElement('div');
        gradeItem.className = 'grade-item';
        
        const minScore = gradingSystem.grades[grade];
        const maxScore = index > 0 ? gradingSystem.grades[grades[index - 1]] - 1 : 100;
        
        // Add edit/delete buttons for custom grading systems
        const actionButtons = gradingSystem.type === 'custom' ? `
            <div class="grade-actions">
                <button class="btn-icon edit-grade" onclick="editCustomGrade('${grade}')" title="Edit Grade">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-icon delete-grade" onclick="deleteCustomGrade('${grade}')" title="Delete Grade">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        ` : '';
        
        gradeItem.innerHTML = `
            <div class="grade-info">
                <div class="grade-name">${grade}</div>
                <div class="grade-range">
                    <strong>${minScore}%</strong> - ${maxScore}%
                </div>
            </div>
            ${actionButtons}
        `;
        
        gradeList.appendChild(gradeItem);
    });
    
    // Add click and touch events for dropdown toggle
    if (!gradingSystemPreview.hasAttribute('data-listener-added')) {
        gradingSystemPreview.setAttribute('data-listener-added', 'true');
        gradingSystemPreview.setAttribute('role', 'button');
        gradingSystemPreview.setAttribute('tabindex', '0');
        gradingSystemPreview.setAttribute('aria-expanded', 'false');
        
        // Add both click and touch events for better mobile support
        gradingSystemPreview.addEventListener('click', toggleGradingSystemDropdown);
        gradingSystemPreview.addEventListener('touchstart', handleTouchStart, { passive: false });
        gradingSystemPreview.addEventListener('keydown', handleKeyDown);
    }
}

// Toggle grading system dropdown
function toggleGradingSystemDropdown(event) {
    event.preventDefault();
    event.stopPropagation();
    
    // Find the specific dropdown that was clicked
    const clickedPreview = event.target.closest('.grading-system-preview');
    const dropdown = clickedPreview ? clickedPreview.closest('.grading-system-dropdown') : null;
    
    if (dropdown) {
        const isExpanded = dropdown.classList.contains('expanded');
        const details = dropdown.querySelector('.grading-system-details');
        
        // Close any other open dropdowns first
        document.querySelectorAll('.grading-system-dropdown.expanded').forEach(d => {
            if (d !== dropdown) {
                d.classList.remove('expanded');
                const otherPreview = d.querySelector('.grading-system-preview');
                const otherDetails = d.querySelector('.grading-system-details');
                if (otherPreview) {
                    otherPreview.setAttribute('aria-expanded', 'false');
                }
                if (otherDetails) {
                    otherDetails.style.maxHeight = '0';
                }
            }
        });
        
        // Toggle current dropdown
        if (isExpanded) {
            // Collapse
            dropdown.classList.remove('expanded');
            if (details) {
                details.style.maxHeight = '0';
            }
            if (clickedPreview) {
                clickedPreview.setAttribute('aria-expanded', 'false');
            }
            document.removeEventListener('click', closeDropdownOnClickOutside);
            document.removeEventListener('touchstart', closeDropdownOnClickOutside);
        } else {
            // Expand
            dropdown.classList.add('expanded');
            if (details) {
                // Calculate the actual content height
                details.style.maxHeight = 'none';
                const height = details.scrollHeight;
                details.style.maxHeight = '0';
                // Force reflow then animate to actual height
                setTimeout(() => {
                    details.style.maxHeight = Math.min(height, 350) + 'px';
                }, 10);
            }
            if (clickedPreview) {
                clickedPreview.setAttribute('aria-expanded', 'true');
            }
            setTimeout(() => {
                document.addEventListener('click', closeDropdownOnClickOutside);
                document.addEventListener('touchstart', closeDropdownOnClickOutside, { passive: true });
            }, 100);
        }
    }
}

// Close dropdown when clicking outside
function closeDropdownOnClickOutside(event) {
    const dropdowns = document.querySelectorAll('.grading-system-dropdown.expanded');
    dropdowns.forEach(dropdown => {
        if (!dropdown.contains(event.target)) {
            dropdown.classList.remove('expanded');
            const details = dropdown.querySelector('.grading-system-details');
            const preview = dropdown.querySelector('.grading-system-preview');
            if (details) {
                details.style.maxHeight = '0';
            }
            if (preview) {
                preview.setAttribute('aria-expanded', 'false');
            }
        }
    });
    
    // Remove listeners if no dropdowns are open
    if (!document.querySelector('.grading-system-dropdown.expanded')) {
        document.removeEventListener('click', closeDropdownOnClickOutside);
        document.removeEventListener('touchstart', closeDropdownOnClickOutside);
    }
}

// Handle touch start for mobile devices
function handleTouchStart(event) {
    // Don't prevent default for better mobile compatibility
    event.stopPropagation();
    
    // Find the specific preview element that was touched
    const touchedElement = event.target.closest('.grading-system-preview');
    if (!touchedElement) return;
    
    // Prevent double-tap zoom on mobile
    const now = Date.now();
    const lastTouchTime = touchedElement.lastTouchTime || 0;
    
    if (now - lastTouchTime < 300) {
        // Double tap detected, prevent default behavior
        event.preventDefault();
        return false;
    }
    
    touchedElement.lastTouchTime = now;
    
    // Add visual feedback for touch
    touchedElement.classList.add('touching');
    
    // Remove visual feedback after a short delay
    setTimeout(() => {
        touchedElement.classList.remove('touching');
    }, 150);
    
    // Trigger the dropdown toggle
    toggleGradingSystemDropdown(event);
}

// Handle keyboard navigation
function handleKeyDown(event) {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggleGradingSystemDropdown(event);
    } else if (event.key === 'Escape') {
        const dropdown = document.querySelector('.grading-system-dropdown.expanded');
        if (dropdown) {
            dropdown.classList.remove('expanded');
            const preview = dropdown.querySelector('.grading-system-preview');
            if (preview) {
                preview.setAttribute('aria-expanded', 'false');
                preview.focus();
            }
        }
    }
}

// Generate grade ranges form (simplified for custom systems only)
function generateGradeRangesForm() {
    gradeRangesContainer.innerHTML = '';
    
    if (gradingSystem.type === 'custom') {
        // Add controls for custom grade management
        const controlsDiv = document.createElement('div');
        controlsDiv.className = 'custom-grade-controls';
        controlsDiv.innerHTML = `
            <div class="add-grade-section">
                <div class="form-group">
                    <label for="newGradeName">Grade Name:</label>
                    <input type="text" id="newGradeName" class="form-input" placeholder="e.g., A+, B, C1" maxlength="5">
                </div>
                <div class="form-group">
                    <label for="newGradeScore">Minimum Score:</label>
                    <input type="number" id="newGradeScore" class="form-input" placeholder="0-100" min="0" max="100">
                </div>
                <button id="addGradeBtn" class="btn btn-primary">
                    <i class="fas fa-plus"></i> Add Grade
                </button>
            </div>
        `;
        gradeRangesContainer.appendChild(controlsDiv);
        
        // Add event listener for adding grades
        document.getElementById('addGradeBtn').addEventListener('click', addCustomGrade);
        
        // Show message if no grades yet
        const grades = Object.keys(gradingSystem.grades);
        if (grades.length === 0) {
            const noGradesDiv = document.createElement('div');
            noGradesDiv.className = 'no-grades-message';
            noGradesDiv.innerHTML = `
                <div class="note-box">
                    <i class="fas fa-info-circle"></i>
                    <p><strong>No grades added yet.</strong> Use the form above to add your custom grades.</p>
                </div>
            `;
            gradeRangesContainer.appendChild(noGradesDiv);
        }
    }
}
        input.placeholder = 'Min Score';
        input.min = '0';
        input.max = '100';
        input.value = gradingSystem.grades[grade];
        input.id = `grade-${grade}`;
        
        const rangeInfo = document.createElement('small');
        if (index === 0) {
            rangeInfo.textContent = `${input.value}-100`;
        } else {
            const prevGrade = grades[index - 1];
            const prevValue = gradingSystem.grades[prevGrade];
            rangeInfo.textContent = `${input.value}-${prevValue - 1}`;
        }



// Update grade ranges when inputs change (for custom systems only)
function updateGradeRanges() {
    const gradeInputs = gradeRangesContainer.querySelectorAll('.grade-range-input');
    
    // Update grades object
    gradeInputs.forEach(input => {
        const grade = input.id.replace('grade-', '');
        gradingSystem.grades[grade] = parseInt(input.value) || 0;
    });
    
    // Update the grading system display
    updateGradingSystemDisplay();
}

// Add custom grade
function addCustomGrade() {
    const gradeName = document.getElementById('newGradeName').value.trim();
    const gradeScore = parseInt(document.getElementById('newGradeScore').value);
    
    // Validate inputs
    if (!gradeName) {
        showMessage('Please enter a grade name', 'error');
        return;
    }
    
    if (isNaN(gradeScore) || gradeScore < 0 || gradeScore > 100) {
        showMessage('Please enter a valid score (0-100)', 'error');
        return;
    }
    
    // Check if grade already exists
    if (gradingSystem.grades.hasOwnProperty(gradeName)) {
        showMessage(`Grade "${gradeName}" already exists`, 'error');
        return;
    }
    
    // Add the grade
    gradingSystem.grades[gradeName] = gradeScore;
    
    // Clear inputs
    document.getElementById('newGradeName').value = '';
    document.getElementById('newGradeScore').value = '';
    
    // Regenerate the form and update display
    generateGradeRangesForm();
    updateGradingSystemDisplay();
    
    showMessage(`Grade "${gradeName}" added successfully!`, 'success');
}

// Edit custom grade
function editCustomGrade(gradeName) {
    const currentScore = gradingSystem.grades[gradeName];
    
    // Create edit modal
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Edit Grade</h3>
                <button class="modal-close" onclick="closeEditModal()">&times;</button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label for="editGradeName">Grade Name:</label>
                    <input type="text" id="editGradeName" class="form-input" value="${gradeName}" maxlength="5">
                </div>
                <div class="form-group">
                    <label for="editGradeScore">Minimum Score:</label>
                    <input type="number" id="editGradeScore" class="form-input" value="${currentScore}" min="0" max="100">
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary" onclick="closeEditModal()">Cancel</button>
                <button class="btn btn-primary" onclick="saveGradeEdit('${gradeName}')">Save Changes</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Focus on the grade name input
    setTimeout(() => {
        document.getElementById('editGradeName').focus();
        document.getElementById('editGradeName').select();
    }, 100);
}

// Save grade edit
function saveGradeEdit(originalGradeName) {
    const newGradeName = document.getElementById('editGradeName').value.trim();
    const newGradeScore = parseInt(document.getElementById('editGradeScore').value);
    
    // Validate inputs
    if (!newGradeName) {
        showMessage('Please enter a grade name', 'error');
        return;
    }
    
    if (isNaN(newGradeScore) || newGradeScore < 0 || newGradeScore > 100) {
        showMessage('Please enter a valid score (0-100)', 'error');
        return;
    }
    
    // Check if new grade name already exists (and it's different from original)
    if (newGradeName !== originalGradeName && gradingSystem.grades.hasOwnProperty(newGradeName)) {
        showMessage(`Grade "${newGradeName}" already exists`, 'error');
        return;
    }
    
    // Remove old grade if name changed
    if (newGradeName !== originalGradeName) {
        delete gradingSystem.grades[originalGradeName];
    }
    
    // Add/update the grade
    gradingSystem.grades[newGradeName] = newGradeScore;
    
    // Close modal and update display
    closeEditModal();
    generateGradeRangesForm();
    updateGradingSystemDisplay();
    
    showMessage('Data exported successfully!', 'success');
}

function updateWelcomeTime() {
    const welcomeTimeElement = document.getElementById('welcomeTime');
    if (welcomeTimeElement) {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            minute: '2-digit',
            hour12: true 
        });
        welcomeTimeElement.textContent = timeString;
    }
}

// Open settings modal
function closeEditModal() {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
        modal.remove();
    }
}

// Delete custom grade
function deleteCustomGrade(gradeName) {
    if (confirm(`Are you sure you want to delete grade "${gradeName}"?\n\nThis action cannot be undone.`)) {
        delete gradingSystem.grades[gradeName];
        generateGradeRangesForm();
        updateGradingSystemDisplay();
        showMessage(`Grade "${gradeName}" deleted successfully!`, 'success');
    }
}

// Save grading system
function saveGradingSystem() {
    // For custom grading system, check if grades exist
    if (gradingSystem.type === 'custom' && Object.keys(gradingSystem.grades).length === 0) {
        showMessage('Please add at least one grade for the custom grading system', 'error');
        return;
    }
    
    // For custom systems, validate the grades
    if (gradingSystem.type === 'custom') {
        const grades = Object.values(gradingSystem.grades);
        const sortedGrades = grades.sort((a, b) => b - a);
        
        // Check for overlapping ranges
        for (let i = 0; i < sortedGrades.length - 1; i++) {
            if (sortedGrades[i] <= sortedGrades[i + 1]) {
                showMessage('Grade ranges cannot overlap. Please adjust the minimum scores.', 'error');
                return;
            }
        }
        
        const systemName = gradingSystemNameInput.value.trim();
        const creatorName = creatorNameInput.value.trim();
        
        if (!systemName || !creatorName) {
            showMessage('Please provide both a grading system name and your name/position', 'error');
            return;
        }
        
        // Save the custom grading system
        saveCustomGradingSystem(systemName, creatorName);
    }
    
    showMessage('Grading system saved successfully!', 'success');
    proceedToStudentEntryFromGrading();
}

// Proceed to student entry from grading system
function proceedToStudentEntryFromGrading() {
    // Mark forms as created
    localStorage.setItem('examSystem_formsCreated', 'true');
    
    // Show student entry section and start with step 1 (batch settings)
    studentEntrySection.style.display = 'block';
    goToStep1();
    
    showMessage('Student entry form created successfully! You can now enter student information in four steps.', 'success');
}

// Add a new student with scores
function addStudent() {
    const studentName = studentNameInput.value.trim();
    
    if (!studentName) {
        showMessage('Please enter a student name', 'error');
        return;
    }
    
    if (students.some(student => student.name.toLowerCase() === studentName.toLowerCase())) {
        showMessage('A student with this name already exists', 'error');
        return;
    }
    
    // Validate that we have all the required scores
    // Note: Class score configuration is now optional with flexible assessment options
    
    const scores = [];
    const classScores = [];
    const examScores = [];
    const classAssessmentDetails = [];
    
    // Collect class assessment and exam scores
    for (let i = 0; i < courses.length; i++) {
        let finalScore, classScore, examScore, classAssessmentDetail;
        
        if (includeClassAssessmentsCheckbox.checked) {
            // Check if class score configuration is enabled for weighting
            if (!classScoreConfig.enabled) {
                showMessage('Please enable class score configuration to use class assessments. Go to Class Score Configuration section and check "Enable Class Scores".', 'error');
                return;
            }
            
            // Get class assessment scores
            const assignment = parseInt(document.getElementById(`assignment-${i}`).value) || 0;
            const homework = parseInt(document.getElementById(`homework-${i}`).value) || 0;
            const midterm = parseInt(document.getElementById(`midterm-${i}`).value) || 0;
            const classwork = parseInt(document.getElementById(`classwork-${i}`).value) || 0;
            
            // Validate class assessment scores
            if (assignment < 1 || assignment > 20) {
                showMessage(`Please enter a valid class test score (1-20) for ${courses[i]}`, 'error');
                return;
            }
            
            if (homework < 1 || homework > 10) {
                showMessage(`Please enter a valid homework score (1-10) for ${courses[i]}`, 'error');
                return;
            }
            
            if (midterm < 1 || midterm > 100) {
                showMessage(`Please enter a valid mid-term score (1-100) for ${courses[i]}`, 'error');
                return;
            }
            
            if (classwork < 1 || classwork > 10) {
                showMessage(`Please enter a valid classwork score (1-10) for ${courses[i]}`, 'error');
                return;
            }
            
            // Get exam score
            examScore = parseInt(document.getElementById(`exam-${i}`).value);
            
            if (isNaN(examScore) || examScore < 0 || examScore > 100) {
                showMessage(`Please enter a valid exam score (0-100) for ${courses[i]}`, 'error');
                return;
            }
            
            // Calculate class assessment total (raw scores, no percentages for individual components)
            // Only Mid-term uses percentage weighting (60%), others use raw scores
            const classAssessmentTotal = assignment + homework + (midterm * 0.60) + classwork;
            const weightedClassScore = Math.round(classAssessmentTotal * (classScoreConfig.classPercentage / 100) * 10) / 10;
            
            // Calculate weighted exam score
            const weightedExamScore = Math.round(examScore * (classScoreConfig.examPercentage / 100) * 10) / 10;
            
            // Calculate final weighted score
            finalScore = Math.round((weightedClassScore + weightedExamScore) * 10) / 10;
            classScore = Math.round(classAssessmentTotal * 10) / 10;
            
            // Store detailed class assessment information
            classAssessmentDetail = {
                assignment,
                homework,
                midterm,
                classwork,
                total: Math.round(classAssessmentTotal * 10) / 10,
                average: classAssessmentTotal,
                weighted: weightedClassScore
            };
        } else {
            // Only exam scores (100% weight)
            examScore = parseInt(document.getElementById(`exam-${i}`).value);
            
            if (isNaN(examScore) || examScore < 0 || examScore > 100) {
                showMessage(`Please enter a valid exam score (0-100) for ${courses[i]}`, 'error');
                return;
            }
            
            // Exam score is the final score (100% weight)
            finalScore = examScore;
            classScore = 0; // No class score
            
            // Store empty class assessment information
            classAssessmentDetail = {
                assignment: 0,
                homework: 0,
                midterm: 0,
                classwork: 0,
                total: 0,
                average: 0,
                weighted: 0
            };
        }
        
        scores.push(finalScore);
        classScores.push(classScore);
        examScores.push(examScore);
        classAssessmentDetails.push(classAssessmentDetail);
    }
    
    // Create student object
    const student = {
        id: Date.now(),
        name: studentName,
        className: batchClassNameInput.value.trim(),
        term: batchTermInput.value.trim(),
        sessionYear: batchSessionYearInput.value.trim(),
        scores: scores,
        classScores: classScores,
        examScores: examScores,
        classAssessmentDetails: classAssessmentDetails,
        average: calculateAverage(scores),
        total: scores.reduce((sum, score) => sum + score, 0),
        comment1: (studentComment1Input && studentComment1Input.value ? studentComment1Input.value.trim() : ''),
        comment2: (studentComment2Input && studentComment2Input.value ? studentComment2Input.value.trim() : '')
    };
    
    students.push(student);
    
    // Clear form and return to step 1
    clearStudentForm();
    goToStep1();
    updateResultsTable();
    saveData();
    
    showMessage(`Student "${studentName}" added successfully!`, 'success');
}

// Calculate average score
function calculateAverage(scores) {
    return Math.round((scores.reduce((sum, score) => sum + score, 0) / scores.length) * 10) / 10;
}

// Clear student form
function clearStudentForm() {
    studentNameInput.value = '';
    if (studentComment1Input) studentComment1Input.value = '';
    if (studentComment2Input) studentComment2Input.value = '';
    
    // Reset class assessment checkbox
    includeClassAssessmentsCheckbox.checked = true;
    
    // Clear class assessment inputs
    if (classAssessmentInputs) {
        classAssessmentInputs.innerHTML = '';
    }
    
    // Clear exam score inputs
    if (examScoreInputs) {
        examScoreInputs.innerHTML = '';
    }
    
    // Return to step 1 (batch settings)
    goToStep1();
    
    studentNameInput.focus();
}

// Update results table with improved design and horizontal scrolling
function updateResultsTable() {
    if (students.length === 0) {
        resultsTable.innerHTML = '<p class="no-data">No student data available. Add students to see results.</p>';
        return;
    }
    
    // Create table with horizontal scroll wrapper
    let tableHTML = `
        <div class="table-scroll-wrapper">
            <table class="results-table">
                <thead>
                    <tr>
                        <th>Student Name</th>
    `;
    
    // Add course headers with appropriate columns
    courses.forEach(course => {
        if (classScoreConfig.enabled) {
            tableHTML += `
                        <th>Class Score</th>
                        <th>Exam Score</th>
                        <th>Final Score</th>
                        <th>${course} Grade</th>
            `;
        } else {
            tableHTML += `
                        <th>${course} Score</th>
                        <th>${course} Grade</th>
            `;
        }
    });
    
    tableHTML += `
                        <th>Total Points</th>
                        <th>Average %</th>
                        <th>Overall Grade</th>
                        <th>Position</th>
                    </tr>
                </thead>
                <tbody>
    `;
    
    // Calculate positions for display using proper tied ranking
    const positions = computeOverallPositions();
    
    // Add student rows
    students.forEach(student => {
        tableHTML += `
                    <tr>
                        <td>${student.name}</td>
        `;
        
        // Add scores with individual grades for each course
        student.scores.forEach((score, index) => {
            const courseGrade = getGrade(score);
            const gradeClass = courseGrade.replace('+', '\\+').replace('-', '\\-');
            
            if (classScoreConfig.enabled && student.classScores && student.examScores) {
                const classScore = student.classScores[index] || 0;
                const examScore = student.examScores[index] || 0;
                tableHTML += `
                        <td>${classScore}</td>
                        <td>${examScore}</td>
                        <td><strong>${score}</strong></td>
                        <td><span class="grade-${gradeClass}">${courseGrade}</span></td>
                `;
            } else {
                tableHTML += `
                        <td><strong>${score}</strong></td>
                        <td><span class="grade-${gradeClass}">${courseGrade}</span></td>
                `;
            }
        });
        
        // Add total, average, overall grade, and position
        const overallGrade = getGrade(student.average);
        const overallGradeClass = overallGrade.replace('+', '\\+').replace('-', '\\-');
        const position = positions[student.id];
        const positionSuffix = getOrdinal(position);
        
        tableHTML += `
                        <td><strong>${Math.round(student.total * 10) / 10}</strong></td>
                        <td><strong>${student.average}%</strong></td>
                        <td><span class="grade-${overallGradeClass}">${overallGrade}</span></td>
                        <td><strong>${positionSuffix}</strong></td>
                    </tr>
        `;
    });
    
    tableHTML += `
                </tbody>
            </table>
        </div>
    `;
    
    resultsTable.innerHTML = tableHTML;
    
    // Update statistics section separately
    if (students.length > 0) {
        generateStatistics();
    } else {
        // Hide statistics section if no students
        const statisticsSection = document.getElementById('statisticsSection');
        if (statisticsSection) {
            statisticsSection.style.display = 'none';
        }
    }
}

// Generate statistics
function generateStatistics() {
    if (students.length === 0) {
        // Hide statistics section if no students
        const statisticsSection = document.getElementById('statisticsSection');
        if (statisticsSection) {
            statisticsSection.style.display = 'none';
        }
        return '';
    }
    
    const totalStudents = students.length;
    const totalCourses = courses.length;
    
    // Find top performer
    const sortedStudents = [...students].sort((a, b) => b.average - a.average);
    const topStudent = sortedStudents[0];
    
    // Update the statistics display
    updateStatisticsDisplay(totalStudents, totalCourses, topStudent);
    
    // Show statistics section
    const statisticsSection = document.getElementById('statisticsSection');
    if (statisticsSection) {
        statisticsSection.style.display = 'block';
    }
    
    
    return '';
}

function updateStatisticsDisplay(totalStudents, totalCourses, topStudent) {
    // Update total students count
    const totalStudentsElement = document.getElementById('totalStudentsCount');
    if (totalStudentsElement) {
        totalStudentsElement.textContent = totalStudents;
    }
    
    // Update total courses count
    const totalCoursesElement = document.getElementById('totalCoursesCount');
    if (totalCoursesElement) {
        totalCoursesElement.textContent = totalCourses;
    }
    
    // Update top performer
    const topPerformerNameElement = document.getElementById('topPerformerName');
    const topPerformerScoreElement = document.getElementById('topPerformerScore');
    if (topPerformerNameElement && topPerformerScoreElement && topStudent) {
        topPerformerNameElement.textContent = topStudent.name;
        topPerformerScoreElement.textContent = `${topStudent.average}%`;
    }
}


// Create course performance pie chart
let courseChart = null; // Global variable to store chart instance

function createCoursePerformanceChart(courseNames, courseAverages) {
    const canvas = document.getElementById('coursePerformanceChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Destroy existing chart if it exists
    if (courseChart) {
        courseChart.destroy();
    }
    
    // Generate colors for each course
    const colors = [
        '#667eea', '#f093fb', '#4facfe', '#43e97b', '#fa709a',
        '#a8edea', '#ffecd2', '#fcb69f', '#ff9a9e', '#a18cd1',
        '#fbc2eb', '#84fab0', '#fad0c4', '#ffd1ff', '#c2e9fb'
    ];
    
    // Create gradient colors for better visual appeal
    const backgroundColors = courseNames.map((_, index) => {
        const color = colors[index % colors.length];
        return color;
    });
    
    const borderColors = backgroundColors.map(color => {
        // Darken the color for border
        return color.replace(/[0-9a-f]{2}/gi, match => {
            const num = parseInt(match, 16);
            const darker = Math.max(0, num - 30);
            return darker.toString(16).padStart(2, '0');
        });
    });
    
    // Chart configuration
    const config = {
        type: 'pie',
        data: {
            labels: courseNames,
            datasets: [{
                label: 'Course Average (%)',
                data: courseAverages,
                backgroundColor: backgroundColors,
                borderColor: borderColors,
                borderWidth: 2,
                hoverOffset: 10
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: false
                },
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true,
                        font: {
                            size: 12,
                            family: 'Inter, sans-serif'
                        },
                        color: getComputedStyle(document.documentElement)
                            .getPropertyValue('--primary-text').trim() || '#1e293b'
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: 'white',
                    bodyColor: 'white',
                    borderColor: '#667eea',
                    borderWidth: 1,
                    cornerRadius: 8,
                    displayColors: true,
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed || 0;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((value / total) * 100).toFixed(1);
                            return `${label}: ${value}% (${percentage}% of total)`;
                        }
                    }
                }
            },
            animation: {
                animateRotate: true,
                animateScale: true,
                duration: 1000,
                easing: 'easeOutQuart'
            },
            interaction: {
                intersect: false,
                mode: 'nearest'
            }
        }
    };
    
    // Create the chart
    courseChart = new Chart(ctx, config);
    
    // Update legend colors based on theme
    const updateChartTheme = () => {
        const textColor = getComputedStyle(document.documentElement)
            .getPropertyValue('--primary-text').trim() || '#1e293b';
        
        if (courseChart) {
            courseChart.options.plugins.legend.labels.color = textColor;
            courseChart.update('none');
        }
    };
    
    // Listen for theme changes
    const observer = new MutationObserver(() => {
        updateChartTheme();
    });
    
    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-theme']
    });
}

// Get grade based on average score using custom grading system
function getGrade(average) {
    const grades = Object.keys(gradingSystem.grades).sort((a, b) => {
        return gradingSystem.grades[b] - gradingSystem.grades[a];
    });
    
    for (const grade of grades) {
        if (average >= gradingSystem.grades[grade]) {
            return grade;
        }
    }
    
    // Fallback to lowest grade
    return grades[grades.length - 1] || 'F';
}

// Export data to CSV
function exportData() {
    if (students.length === 0) {
        showMessage('No data to export', 'error');
        return;
    }
    
    let csvContent = '';
    
    // Header row
    csvContent += 'Student Name,';
    if (classScoreConfig.enabled) {
        courses.forEach(course => {
            csvContent += `${course} Class Score,${course} Exam Score,${course} Final Score,${course} Grade,`;
        });
    } else {
        courses.forEach(course => {
            csvContent += `${course} Score,${course} Grade,`;
        });
    }
    csvContent += 'Total,Average,Overall Grade\n';
    
    // Data rows
    students.forEach(student => {
        csvContent += `"${student.name}",`;
        
        if (classScoreConfig.enabled && student.classScores && student.examScores) {
            student.scores.forEach((score, index) => {
                const courseGrade = getGrade(score);
                const classScore = student.classScores[index];
                const examScore = student.examScores[index];
                csvContent += `${classScore},${examScore},${score},${courseGrade},`;
            });
        } else {
            student.scores.forEach(score => {
                const courseGrade = getGrade(score);
                csvContent += `${score},${courseGrade},`;
            });
        }
        
        csvContent += `${student.total},${student.average},${getGrade(student.average)}\n`;
    });
    
    // Create blob for better mobile compatibility
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    
    // Check if we're on mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        // Mobile-friendly approach: open in new tab for manual save
        const dataUrl = URL.createObjectURL(blob);
        const newWindow = window.open(dataUrl, '_blank');
        
        if (newWindow) {
            // Add instructions for mobile users
            setTimeout(() => {
                showMessage('File opened in new tab. Use browser menu to save/download the file.', 'info');
            }, 500);
        } else {
            // Fallback: try direct download
            tryDirectDownload(blob);
        }
    } else {
        // Desktop: use direct download
        tryDirectDownload(blob);
    }
}

// Helper function for direct download
function tryDirectDownload(blob) {
    try {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'student_results.csv';
        link.style.display = 'none';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Clean up the URL object
        setTimeout(() => URL.revokeObjectURL(url), 100);
        
        showMessage('Data exported successfully!', 'success');
    } catch (error) {
        console.error('Download failed:', error);
        showMessage('Export failed. Please try again or use a different browser.', 'error');
    }
}

// Open settings modal
function openSettings() {
    const defaultPin = '1234';
    const savedPin = localStorage.getItem('examSystem_pin') || defaultPin;
    
    // Create settings modal
    const settingsModal = document.createElement('div');
    settingsModal.className = 'pin-modal';
    settingsModal.innerHTML = `
        <div class="pin-modal-content">
            <div class="pin-modal-header">
                <h3><i class="fas fa-cog"></i> Settings</h3>
                <p>Manage your application settings</p>
            </div>
            <div class="pin-modal-body">
                <div class="form-group">
                    <label for="currentPin">Current PIN:</label>
                    <input type="password" id="currentPin" class="form-input" placeholder="Enter current PIN" maxlength="4" autocomplete="off">
                </div>
                <div class="form-group">
                    <label for="newPin">New PIN:</label>
                    <input type="password" id="newPin" class="form-input" placeholder="Enter new 4-digit PIN" maxlength="4" autocomplete="off">
                </div>
                <div class="form-group">
                    <label for="confirmNewPin">Confirm New PIN:</label>
                    <input type="password" id="confirmNewPin" class="form-input" placeholder="Confirm new PIN" maxlength="4" autocomplete="off">
                </div>
                <div class="pin-info">
                    <div class="pin-tips">
                        <h4><i class="fas fa-lightbulb"></i> PIN Management Tips</h4>
                        <div class="tip-item">
                            <strong>Current PIN:</strong> Your current PIN is <code>${savedPin}</code>
                        </div>
                        <div class="tip-item">
                            <strong>Purpose:</strong> The PIN protects the "Clear All Data" function to prevent accidental data loss
                        </div>
                        <div class="tip-item">
                            <strong>How to Change:</strong>
                            <ol>
                                <li>Enter your current PIN in the first field</li>
                                <li>Set a new 4-digit PIN</li>
                                <li>Confirm the new PIN</li>
                                <li>Click "Save Changes"</li>
                            </ol>
                        </div>
                        <div class="tip-item">
                            <strong>Security Tips:</strong>
                            <ul>
                                <li>Choose a PIN that's easy for you to remember</li>
                                <li>Don't share your PIN with unauthorized users</li>
                                <li>Change your PIN regularly for better security</li>
                            </ul>
                        </div>
                        <div class="tip-item warning">
                            <i class="fas fa-exclamation-triangle"></i>
                            <strong>Important:</strong> Keep your PIN safe! You'll need it to clear all data if necessary.
                        </div>
                    </div>
                </div>
            </div>
            <div class="pin-modal-footer">
                <button id="saveSettings" class="btn btn-success">
                    <i class="fas fa-save"></i> Save Changes
                </button>
                <button id="cancelSettings" class="btn btn-secondary">
                    <i class="fas fa-times"></i> Cancel
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(settingsModal);
    
    // Focus on current PIN input
    const currentPinInput = document.getElementById('currentPin');
    currentPinInput.focus();
    
    // Handle save settings
    document.getElementById('saveSettings').addEventListener('click', function() {
        const currentPin = document.getElementById('currentPin').value.trim();
        const newPin = document.getElementById('newPin').value.trim();
        const confirmNewPin = document.getElementById('confirmNewPin').value.trim();
        
        // Validate current PIN
        if (currentPin !== savedPin) {
            showMessage('Current PIN is incorrect', 'error');
            return;
        }
        
        // Validate new PIN
        if (newPin.length !== 4 || !/^\d+$/.test(newPin)) {
            showMessage('New PIN must be exactly 4 digits', 'error');
            return;
        }
        
        // Validate PIN confirmation
        if (newPin !== confirmNewPin) {
            showMessage('New PIN and confirmation do not match', 'error');
            return;
        }
        
        // Save new PIN
        localStorage.setItem('examSystem_pin', newPin);
        showMessage('PIN updated successfully!', 'success');
        document.body.removeChild(settingsModal);
    });
    
    // Handle cancel
    document.getElementById('cancelSettings').addEventListener('click', function() {
        document.body.removeChild(settingsModal);
    });
    
    // Handle Enter key on inputs
    const inputs = settingsModal.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                document.getElementById('saveSettings').click();
            }
        });
        
        input.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                document.getElementById('cancelSettings').click();
            }
        });
    });
}

// Clear all data with PIN protection
function clearAllData() {
    // Default PIN is 1234, but can be changed by user
    const defaultPin = '1234';
    const savedPin = localStorage.getItem('examSystem_pin') || defaultPin;
    
    // Create PIN input modal
    const pinModal = document.createElement('div');
    pinModal.className = 'pin-modal';
    pinModal.innerHTML = `
        <div class="pin-modal-content">
            <div class="pin-modal-header">
                <h3><i class="fas fa-shield-alt"></i> Security Verification</h3>
                <p>Enter PIN to clear all data</p>
            </div>
            <div class="pin-modal-body">
                <div class="form-group">
                    <label for="pinInput">PIN:</label>
                    <input type="password" id="pinInput" class="form-input" placeholder="Enter 4-digit PIN" maxlength="4" autocomplete="off">
                </div>
                <div class="pin-info">
                    <small>Default PIN: 1234 (you can change this in settings)</small>
                </div>
            </div>
            <div class="pin-modal-footer">
                <button id="confirmPin" class="btn btn-danger">
                    <i class="fas fa-trash"></i> Clear All Data
                </button>
                <button id="cancelPin" class="btn btn-secondary">
                    <i class="fas fa-times"></i> Cancel
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(pinModal);
    
    // Focus on PIN input
    const pinInput = document.getElementById('pinInput');
    pinInput.focus();
    
    // Handle PIN confirmation
    document.getElementById('confirmPin').addEventListener('click', function() {
        const enteredPin = pinInput.value.trim();
        
        if (enteredPin === savedPin) {
            // PIN is correct, clear all data
            students = [];
            courses = [];
            classScoreConfig = {
                enabled: false,
                classPercentage: 30,
                examPercentage: 70
            };
            gradingSystem = {
                type: 'university',
                grades: {
                    'A+': 90, 'A': 85, 'A-': 80, 'B+': 75, 'B': 70, 'B-': 65, 
                    'C+': 60, 'C': 55, 'C-': 50, 'D+': 45, 'D': 40, 'F': 0
                }
            };
            
            // Reset UI state
            courseFormContainer.style.display = 'none';
            classScoreConfigSection.style.display = 'none';
            gradingSystemConfigSection.style.display = 'none';
            studentEntrySection.style.display = 'none';
            
            // Clear form inputs
            courseInputs.innerHTML = '';
            classAssessmentInputs.innerHTML = '';
            examScoreInputs.innerHTML = '';
            
            // Reset checkboxes and form elements
            enableClassScoresCheckbox.checked = false;
            includeClassAssessmentsCheckbox.checked = true;
            classScoreConfigContainer.style.display = 'none';
            gradingSystemTypeSelect.value = 'university';
            
            // Reset step navigation
            if (step1Container && step2Container && step3Container && step4Container) {
                step1Container.style.display = 'block';
                step2Container.style.display = 'none';
                step3Container.style.display = 'none';
                step4Container.style.display = 'none';
            }
            
            // Clear form fields
            if (studentNameInput) studentNameInput.value = '';
            if (studentComment1Input) studentComment1Input.value = '';
            if (studentComment2Input) studentComment2Input.value = '';
            if (batchClassNameInput) batchClassNameInput.value = '';
            if (batchTermInput) batchTermInput.value = '';
            if (batchSessionYearInput) batchSessionYearInput.value = '';
            
            // Update results table
            updateResultsTable();
            
            // Clear statistics section
            const statisticsSection = document.getElementById('statisticsSection');
            if (statisticsSection) {
                statisticsSection.style.display = 'none';
                // Clear statistics content
                const totalStudentsElement = document.getElementById('totalStudentsCount');
                const totalCoursesElement = document.getElementById('totalCoursesCount');
                const topStudentElement = document.getElementById('topStudentName');
                const topStudentScoreElement = document.getElementById('topStudentScore');
                
                if (totalStudentsElement) totalStudentsElement.textContent = '0';
                if (totalCoursesElement) totalCoursesElement.textContent = '0';
                if (topStudentElement) topStudentElement.textContent = 'N/A';
                if (topStudentScoreElement) topStudentScoreElement.textContent = 'N/A';
            }
            
            // Reset PIN to default
            localStorage.removeItem('examSystem_pin');
            
            // Save cleared data to localStorage and remove forms created flag
            localStorage.removeItem('examSystem_formsCreated');
            saveData();
            
            // Show success message
            showMessage('All data cleared successfully! The system has been reset to its initial state.', 'success');
            
            // Remove modal
            document.body.removeChild(pinModal);
        } else {
            // PIN is incorrect
            showMessage('Incorrect PIN. Please try again.', 'error');
            pinInput.value = '';
            pinInput.focus();
        }
    });
    
    // Handle cancel
    document.getElementById('cancelPin').addEventListener('click', function() {
        document.body.removeChild(pinModal);
    });
    
    // Handle Enter key
    pinInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            document.getElementById('confirmPin').click();
        }
    });
    
    // Handle Escape key
    pinInput.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            document.getElementById('cancelPin').click();
        }
    });
}

// Show message
function showMessage(message, type) {
    const messageElement = document.createElement('div');
    messageElement.className = `message ${type}`;
    messageElement.textContent = message;
    
    messageContainer.appendChild(messageElement);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        if (messageElement.parentNode) {
            messageElement.parentNode.removeChild(messageElement);
        }
    }, 3000);
}

// Save data to localStorage with user-specific key
function saveData() {
    if (!currentUser || !currentUser.email) {
        console.warn('No authenticated user - cannot save data');
        return;
    }
    
    const data = {
        courses,
        students,
        classScoreConfig,
        gradingSystem
    };
    const userKey = `examSystemData_${currentUser.email}`;
    localStorage.setItem(userKey, JSON.stringify(data));
}

// Load data from localStorage for current user
function loadData() {
    if (!currentUser || !currentUser.email) {
        console.warn('No authenticated user - cannot load data');
        return;
    }
    
    const userKey = `examSystemData_${currentUser.email}`;
    const savedData = localStorage.getItem(userKey);
    
    if (savedData) {
        try {
            const data = JSON.parse(savedData);
            courses = data.courses || [];
            students = data.students || [];
            classScoreConfig = data.classScoreConfig || {
                enabled: false,
                classPercentage: 30,
                examPercentage: 70
            };
            gradingSystem = data.gradingSystem || {
                type: 'university',
                grades: {
                    'A+': 90, 'A': 85, 'A-': 80, 'B+': 75, 'B': 70, 'B-': 65, 'C+': 60, 'C': 55, 'C-': 50, 'D+': 45, 'D': 40, 'F': 0
                }
            };
            
            // Recreate forms if data exists
            if (courses.length > 0) {
                recreateCourseForm();
                if (classScoreConfig.enabled) {
                    classScoreConfigSection.style.display = 'block';
                    enableClassScoresCheckbox.checked = true;
                    classScoreConfigContainer.style.display = 'block';
                    generateClassScoreConfigForm();
                    classScorePercentageInput.value = classScoreConfig.classPercentage;
                    examScorePercentageInput.value = classScoreConfig.examPercentage;
                }
                if (gradingSystem && gradingSystem.grades) {
                    gradingSystemConfigSection.style.display = 'block';
                    gradingSystemTypeSelect.value = gradingSystem.type;
                    handleGradingSystemChange();
                }
                recreateStudentForm();
                updateResultsTable();
            }
        } catch (error) {
            console.error('Error loading user data:', error);
            showMessage('Error loading saved data', 'error');
        }
    } else {
        // Initialize with default values for new user
        courses = [];
        students = [];
        classScoreConfig = {
            enabled: false,
            classPercentage: 30,
            examPercentage: 70
        };
        gradingSystem = {
            type: 'university',
            grades: {
                'A+': 90, 'A': 85, 'A-': 80, 'B+': 75, 'B': 70, 'B-': 65, 'C+': 60, 'C': 55, 'C-': 50, 'D+': 45, 'D': 40, 'F': 0
            }
        };
    }
}

// Recreate course form from saved data
function recreateCourseForm() {
    courseCountInput.value = courses.length;
    generateCourseForm();
    
    // Fill in course names
    const courseInputElements = courseInputs.querySelectorAll('input');
    courses.forEach((course, index) => {
        if (courseInputElements[index]) {
            courseInputElements[index].value = course;
        }
    });
}

// Recreate student form from saved data
function recreateStudentForm() {
    // Show grading system configuration if not already configured
    if (gradingSystem && gradingSystem.grades) {
        gradingSystemConfigSection.style.display = 'block';
        gradingSystemTypeSelect.value = gradingSystem.type;
        handleGradingSystemChange();
    } else {
        // Generate simple score input fields
        scoreInputs.innerHTML = '';
        
        courses.forEach((course, index) => {
            const scoreInputGroup = document.createElement('div');
            scoreInputGroup.className = 'score-input-group';
            
            const label = document.createElement('label');
            label.textContent = `${course} Score:`;
            
            const input = document.createElement('input');
            input.type = 'number';
            input.className = 'form-input';
            input.placeholder = '0-100';
            input.min = '0';
            input.max = '100';
            input.required = true;
            input.id = `score-${index}`;
            
            scoreInputGroup.appendChild(label);
            scoreInputGroup.appendChild(input);
            scoreInputs.appendChild(scoreInputGroup);
        });
        
        studentEntrySection.style.display = 'block';
    }
}

// Grade styling is now handled in CSS 

// -------------------- CSV Import Functionality --------------------

// Global variable to store imported data
let importedStudents = [];

// Open CSV import modal
function openImportModal() {
    if (courses.length === 0) {
        showMessage('Please set up courses first before importing data', 'error');
        return;
    }
    
    csvImportModal.style.display = 'flex';
    importPreview.style.display = 'none';
    csvFileInput.value = '';
    importedStudents = [];
}

// Close CSV import modal
function closeImportModal() {
    csvImportModal.style.display = 'none';
    importPreview.style.display = 'none';
    importedStudents = [];
}

// Handle CSV file selection
function handleCSVFileSelect(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
        showMessage('Please select a valid CSV file', 'error');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            parseCSV(e.target.result);
        } catch (error) {
            showMessage('Error parsing CSV file: ' + error.message, 'error');
        }
    };
    reader.readAsText(file);
}

// Parse CSV content
function parseCSV(csvContent) {
    const lines = csvContent.split('\n').filter(line => line.trim());
    if (lines.length < 2) {
        throw new Error('CSV file must have at least a header row and one data row');
    }
    
    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
    const dataRows = lines.slice(1);
    
    // Validate headers
    const requiredHeaders = ['Student Name'];
    const missingHeaders = requiredHeaders.filter(h => !headers.includes(h));
    if (missingHeaders.length > 0) {
        throw new Error(`Missing required headers: ${missingHeaders.join(', ')}`);
    }
    
    // Find course columns (should match current courses)
    const courseColumns = [];
    courses.forEach(course => {
        const courseIndex = headers.findIndex(h => h === course);
        if (courseIndex === -1) {
            throw new Error(`Course "${course}" not found in CSV headers`);
        }
        courseColumns.push(courseIndex);
    });
    
    // Parse data rows
    importedStudents = [];
    dataRows.forEach((row, rowIndex) => {
        if (!row.trim()) return;
        
        const values = parseCSVRow(row);
        if (values.length < headers.length) {
            console.warn(`Row ${rowIndex + 2} has fewer values than headers, skipping`);
            return;
        }
        
        const student = {
            name: values[headers.indexOf('Student Name')].trim(),
            className: headers.includes('Class') ? values[headers.indexOf('Class')].trim() : '',
            term: headers.includes('Term') ? values[headers.indexOf('Term')].trim() : '',
            sessionYear: headers.includes('Session/Year') ? values[headers.indexOf('Session/Year')].trim() : '',
            scores: [],
            classScores: classScoreConfig.enabled ? [] : null,
            examScores: classScoreConfig.enabled ? [] : null,
            comment1: headers.includes('Comment 1') ? values[headers.indexOf('Comment 1')].trim() : '',
            comment2: headers.includes('Comment 2') ? values[headers.indexOf('Comment 2')].trim() : ''
        };
        
        // Parse scores
        courseColumns.forEach((courseIndex, courseIndex2) => {
            let score = parseFloat(values[courseIndex]);
            if (isNaN(score) || score < 0 || score > 100) {
                score = 0; // Default to 0 if invalid
            }
            
            if (classScoreConfig.enabled) {
                // For class score system, assume the CSV has separate class and exam scores
                // If not, we'll need to handle this differently
                student.classScores.push(score);
                student.examScores.push(score);
                const weightedScore = Math.round(
                    (score * classScoreConfig.classPercentage + score * classScoreConfig.examPercentage) / 100 * 10
                ) / 10;
                student.scores.push(weightedScore);
            } else {
                student.scores.push(score);
            }
        });
        
        // Calculate totals
        student.total = student.scores.reduce((sum, score) => sum + score, 0);
        student.average = calculateAverage(student.scores);
        
        importedStudents.push(student);
    });
    
    if (importedStudents.length === 0) {
        throw new Error('No valid student data found in CSV');
    }
    
    // Show preview
    showImportPreview(headers, courseColumns);
}

// Parse CSV row (handles quoted values with commas)
function parseCSVRow(row) {
    const values = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < row.length; i++) {
        const char = row[i];
        
        if (char === '"') {
            inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
            values.push(current);
            current = '';
        } else {
            current += char;
        }
    }
    
    values.push(current);
    return values.map(v => v.trim().replace(/^"|"$/g, ''));
}

// Show import preview with editable table
function showImportPreview(headers, courseColumns) {
    // Generate header row
    let headerHTML = '<th>Student Name</th>';
    if (headers.includes('Class')) headerHTML += '<th>Class</th>';
    if (headers.includes('Term')) headerHTML += '<th>Term</th>';
    if (headers.includes('Session/Year')) headerHTML += '<th>Session/Year</th>';
    
    courses.forEach(course => {
        if (classScoreConfig.enabled) {
            headerHTML += `<th>${course}<br><small>Class | Exam | Final | Grade</small></th>`;
        } else {
            headerHTML += `<th>${course}<br><small>Score | Grade</small></th>`;
        }
    });
    
    headerHTML += '<th>Total</th><th>Average</th><th>Overall Grade</th>';
    if (headers.includes('Comment 1')) headerHTML += '<th>Comment 1</th>';
    if (headers.includes('Comment 2')) headerHTML += '<th>Comment 2</th>';
    
    importPreviewHeader.innerHTML = headerHTML;
    
    // Generate data rows
    let bodyHTML = '';
    importedStudents.forEach((student, studentIndex) => {
        bodyHTML += '<tr>';
        
        // Student name (editable)
        bodyHTML += `<td><input type="text" value="${student.name}" onchange="updateImportedStudent(${studentIndex}, 'name', this.value)"></td>`;
        
        // Optional fields (editable)
        if (headers.includes('Class')) {
            bodyHTML += `<td><input type="text" value="${student.className}" onchange="updateImportedStudent(${studentIndex}, 'className', this.value)"></td>`;
        }
        if (headers.includes('Term')) {
            bodyHTML += `<td><input type="text" value="${student.term}" onchange="updateImportedStudent(${studentIndex}, 'term', this.value)"></td>`;
        }
        if (headers.includes('Session/Year')) {
            bodyHTML += `<td><input type="text" value="${student.sessionYear}" onchange="updateImportedStudent(${studentIndex}, 'sessionYear', this.value)"></td>`;
        }
        
        // Course scores (editable)
        student.scores.forEach((score, courseIndex) => {
            const courseGrade = getGrade(score);
            
            if (classScoreConfig.enabled && student.classScores && student.examScores) {
                const classScore = student.classScores[courseIndex];
                const examScore = student.examScores[courseIndex];
                bodyHTML += `
                    <td>
                        <input type="number" min="0" max="100" value="${classScore}" 
                               onchange="updateImportedStudentScore(${studentIndex}, ${courseIndex}, 'class', this.value)" 
                               style="width: 40px; margin-right: 2px;">
                        |
                        <input type="number" min="0" max="100" value="${examScore}" 
                               onchange="updateImportedStudentScore(${studentIndex}, ${courseIndex}, 'exam', this.value)" 
                               style="width: 40px; margin-left: 2px;">
                        |
                        ${score} |
                        <span class="grade grade-${courseGrade.toLowerCase()}">${courseGrade}</span>
                    </td>
                `;
            } else {
                bodyHTML += `
                    <td>
                        <input type="number" min="0" max="100" value="${score}" 
                               onchange="updateImportedStudentScore(${studentIndex}, ${courseIndex}, 'single', this.value)" 
                               style="width: 60px;">
                        |
                        <span class="grade grade-${courseGrade.toLowerCase()}">${courseGrade}</span>
                    </td>
                `;
            }
        });
        
        // Total and average (calculated, not editable)
        bodyHTML += `<td><strong>${student.total}</strong></td>`;
        bodyHTML += `<td><strong>${student.average}%</strong></td>`;
        bodyHTML += `<td><span class="grade grade-${getGrade(student.average).toLowerCase()}">${getGrade(student.average)}</span></td>`;
        
        // Comments (editable)
        if (headers.includes('Comment 1')) {
            bodyHTML += `<td><input type="text" value="${student.comment1}" onchange="updateImportedStudent(${studentIndex}, 'comment1', this.value)"></td>`;
        }
        if (headers.includes('Comment 2')) {
            bodyHTML += `<td><input type="text" value="${student.comment2}" onchange="updateImportedStudent(${studentIndex}, 'comment2', this.value)"></td>`;
        }
        
        bodyHTML += '</tr>';
    });
    
    importPreviewBody.innerHTML = bodyHTML;
    importPreview.style.display = 'block';
}

// Update imported student field
function updateImportedStudent(studentIndex, field, value) {
    if (studentIndex >= 0 && studentIndex < importedStudents.length) {
        importedStudents[studentIndex][field] = value;
    }
}

// Update imported student score
function updateImportedStudentScore(studentIndex, courseIndex, type, value) {
    if (studentIndex >= 0 && studentIndex < importedStudents.length) {
        const student = importedStudents[studentIndex];
        const score = parseInt(value) || 0;
        
        if (type === 'class' && student.classScores) {
            student.classScores[courseIndex] = score;
            // Recalculate weighted score
            const examScore = student.examScores[courseIndex];
            student.scores[courseIndex] = Math.round(
                (score * classScoreConfig.classPercentage + examScore * classScoreConfig.examPercentage) / 100 * 10
            ) / 10;
        } else if (type === 'exam' && student.examScores) {
            student.examScores[courseIndex] = score;
            // Recalculate weighted score
            const classScore = student.classScores[courseIndex];
            student.scores[courseIndex] = Math.round(
                (classScore * classScoreConfig.classPercentage + score * classScoreConfig.examPercentage) / 100 * 10
            ) / 10;
        } else if (type === 'single') {
            student.scores[courseIndex] = score;
        }
        
        // Recalculate totals
        student.total = student.scores.reduce((sum, score) => sum + score, 0);
        student.average = calculateAverage(student.scores);
        
        // Refresh preview
        const file = csvFileInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                try {
                    const lines = e.target.result.split('\n').filter(line => line.trim());
                    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
                    const courseColumns = [];
                    courses.forEach(course => {
                        const courseIndex = headers.findIndex(h => h === course);
                        if (courseIndex !== -1) {
                            courseColumns.push(courseIndex);
                        }
                    });
                    showImportPreview(headers, courseColumns);
                } catch (error) {
                    console.error('Error refreshing preview:', error);
                }
            };
            reader.readAsText(file);
        }
    }
}

// Save imported data
function saveImportedData() {
    if (importedStudents.length === 0) {
        showMessage('No data to save', 'error');
        return;
    }
    
    // Validate data
    const errors = [];
    importedStudents.forEach((student, index) => {
        if (!student.name.trim()) {
            errors.push(`Row ${index + 1}: Student name is required`);
        }
        
        student.scores.forEach((score, scoreIndex) => {
            if (isNaN(score) || score < 0 || score > 100) {
                errors.push(`Row ${index + 1}: Invalid score for ${courses[scoreIndex]}`);
            }
        });
    });
    
    if (errors.length > 0) {
        showMessage('Please fix the following errors:\n' + errors.join('\n'), 'error');
        return;
    }
    
    // Check for duplicate names
    const existingNames = students.map(s => s.name.toLowerCase());
    const duplicateNames = importedStudents
        .map(s => s.name.trim())
        .filter(name => existingNames.includes(name.toLowerCase()));
    
    if (duplicateNames.length > 0) {
        const shouldOverwrite = confirm(
            `The following students already exist:\n${duplicateNames.join(', ')}\n\nDo you want to overwrite their data?`
        );
        
        if (shouldOverwrite) {
            // Remove existing students with duplicate names
            students = students.filter(s => !duplicateNames.includes(s.name));
        } else {
            // Skip duplicate names
            importedStudents = importedStudents.filter(s => !duplicateNames.includes(s.name.trim()));
        }
    }
    
    // Add imported students
    const addedCount = importedStudents.length;
    importedStudents.forEach(student => {
        student.id = Date.now() + Math.random(); // Ensure unique ID
        students.push(student);
    });
    
    // Save and update
    saveData();
    updateResultsTable();
    closeImportModal();
    
    showMessage(`Successfully imported ${addedCount} students!`, 'success');
}

// Download CSV template
function downloadCSVTemplate() {
    if (courses.length === 0) {
        showMessage('Please set up courses first before downloading template', 'error');
        return;
    }
    
    let csvContent = 'data:text/csv;charset=utf-8,';
    
    // Header row
    csvContent += 'Student Name,Class,Term,Session/Year,Comment 1,Comment 2,';
    courses.forEach(course => {
        csvContent += `${course},`;
    });
    csvContent = csvContent.slice(0, -1); // Remove last comma
    csvContent += '\n';
    
    // Sample data rows
    const sampleData = [
        ['John Doe', 'Form 2A', 'Term 1', '2024/2025', 'Excellent performance', 'Keep up the great work', '85', '92', '78'],
        ['Jane Smith', 'Form 2A', 'Term 1', '2024/2025', 'Good effort shown', 'Continue improving', '78', '85', '82'],
        ['Mike Johnson', 'Form 2A', 'Term 1', '2024/2025', 'Satisfactory work', 'Room for improvement', '72', '68', '75']
    ];
    
    sampleData.forEach(row => {
        // Ensure we have the right number of columns
        const paddedRow = [row[0], row[1], row[2], row[3], row[4], row[5]];
        // Add course scores (repeat the last score if we don't have enough)
        for (let i = 0; i < courses.length; i++) {
            paddedRow.push(row[6 + i] || row[6]); // Use available score or repeat last one
        }
        csvContent += paddedRow.map(cell => `"${cell}"`).join(',') + '\n';
    });
    
    // Create download link
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'student_import_template.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showMessage('CSV template downloaded successfully!', 'success');
}

// Step Navigation Functions
function goToStep1() {
    step1Container.style.display = 'block';
    step2Container.style.display = 'none';
    step3Container.style.display = 'none';
    step4Container.style.display = 'none';
}

function goToStudentInfo() {
    // Validate batch settings
    const batchClassName = batchClassNameInput.value.trim();
    const batchTerm = batchTermInput.value.trim();
    const batchSessionYear = batchSessionYearInput.value.trim();
    
    if (!batchClassName || !batchTerm || !batchSessionYear) {
        showMessage('Please fill in all batch settings (Class, Term, and Academic Year)', 'error');
        return;
    }
    
    step1Container.style.display = 'none';
    step2Container.style.display = 'block';
    step3Container.style.display = 'none';
    step4Container.style.display = 'none';
}

function goToClassAssessments() {
    // Validate student information
    const studentName = studentNameInput.value.trim();
    if (!studentName) {
        showMessage('Please enter a student name', 'error');
        return;
    }
    
    // Generate class assessment form based on user preference
    // Preserve data when navigating back from exam scores
    const isNavigatingBack = step4Container.style.display === 'block';
    generateClassAssessmentForm(isNavigatingBack);
    
    step1Container.style.display = 'none';
    step2Container.style.display = 'none';
    step3Container.style.display = 'block';
    step4Container.style.display = 'none';
}

function goToExamScores() {
    // Validate class assessments only if they are included
    if (includeClassAssessmentsCheckbox.checked && !validateClassAssessments()) {
        return;
    }
    
    // Generate exam score form
    generateExamScoreForm();
    
    step1Container.style.display = 'none';
    step2Container.style.display = 'none';
    step3Container.style.display = 'none';
    step4Container.style.display = 'block';
    
    // Scroll to the exam scores section to prevent jumping to results table
    setTimeout(() => {
        step4Container.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }, 100);
}

function generateClassAssessmentForm(preserveData = false) {
    // Store existing values before clearing if preserveData is true
    const existingValues = {};
    if (preserveData) {
        courses.forEach((course, courseIndex) => {
            const assignment = document.getElementById(`assignment-${courseIndex}`);
            const homework = document.getElementById(`homework-${courseIndex}`);
            const midterm = document.getElementById(`midterm-${courseIndex}`);
            const classwork = document.getElementById(`classwork-${courseIndex}`);
            
            if (assignment || homework || midterm || classwork) {
                existingValues[courseIndex] = {
                    assignment: assignment ? assignment.value : '',
                    homework: homework ? homework.value : '',
                    midterm: midterm ? midterm.value : '',
                    classwork: classwork ? classwork.value : ''
                };
            }
        });
    }
    
    classAssessmentInputs.innerHTML = '';
    
    if (!includeClassAssessmentsCheckbox.checked) {
        // Show message that class assessments are skipped
        const skipMessage = document.createElement('div');
        skipMessage.className = 'skip-message';
        skipMessage.innerHTML = `
            <div class="note-box info">
                <i class="fas fa-info-circle"></i>
                <p><strong>Class Assessments Skipped:</strong> You have chosen to use only exam scores. Exam scores will carry 100% weight for final grades.</p>
            </div>
        `;
        classAssessmentInputs.appendChild(skipMessage);
        return;
    }
    
    // Check if class score configuration is enabled
    if (!classScoreConfig.enabled) {
        const configMessage = document.createElement('div');
        configMessage.className = 'skip-message';
        configMessage.innerHTML = `
            <div class="note-box warning">
                <i class="fas fa-exclamation-triangle"></i>
                <p><strong>Class Score Configuration Required:</strong> To use class assessments, you must enable class scores in the Class Score Configuration section. Please go back and check "Enable Class Scores" to set up weighting percentages.</p>
            </div>
        `;
        classAssessmentInputs.appendChild(configMessage);
        return;
    }
    
    courses.forEach((course, courseIndex) => {
        const courseGroup = document.createElement('div');
        courseGroup.className = 'class-assessment-group';
        courseGroup.id = `course-assessment-${courseIndex}`;
        
                    courseGroup.innerHTML = `
                <h4><i class="fas fa-book"></i> ${course}</h4>
                
                <div class="assessment-input-row">
                    <div class="form-group">
                        <label for="assignment-${courseIndex}">Class Test Score:</label>
                        <input type="number" id="assignment-${courseIndex}" class="form-input" placeholder="1-20" min="1" max="20" onchange="calculateClassTotal(${courseIndex})">
                        <small class="form-help">Range: 1-20 marks</small>
                    </div>
                    <div class="form-group">
                        <label for="homework-${courseIndex}">Homework Score:</label>
                        <input type="number" id="homework-${courseIndex}" class="form-input" placeholder="1-10" min="1" max="10" onchange="calculateClassTotal(${courseIndex})">
                        <small class="form-help">Range: 1-10 marks</small>
                    </div>
                </div>
                
                <div class="assessment-input-row">
                    <div class="form-group">
                        <label for="midterm-${courseIndex}">Mid-term/Mid-semester Score:</label>
                        <input type="number" id="midterm-${courseIndex}" class="form-input" placeholder="1-100" min="1" max="100" onchange="calculateClassTotal(${courseIndex})">
                        <small class="form-help">Range: 1-100 marks (60% weight)</small>
                    </div>
                    <div class="form-group">
                        <label for="classwork-${courseIndex}">Class Work Score:</label>
                        <input type="number" id="classwork-${courseIndex}" class="form-input" placeholder="1-10" min="1" max="10" onchange="calculateClassTotal(${courseIndex})">
                        <small class="form-help">Range: 1-10 marks</small>
                    </div>
                </div>
            
            <div class="assessment-total">
                <h5>Class Assessment Summary</h5>
                <div class="total-score">Total: <span id="total-${courseIndex}">0</span></div>
                <div class="weighted-score">Weighted Score (${classScoreConfig.classPercentage}%): <span id="weighted-${courseIndex}">0</span></div>
            </div>
        `;
        
        classAssessmentInputs.appendChild(courseGroup);
        
        // Restore existing values if preserveData is true
        if (preserveData && existingValues[courseIndex]) {
            const values = existingValues[courseIndex];
            setTimeout(() => {
                const assignment = document.getElementById(`assignment-${courseIndex}`);
                const homework = document.getElementById(`homework-${courseIndex}`);
                const midterm = document.getElementById(`midterm-${courseIndex}`);
                const classwork = document.getElementById(`classwork-${courseIndex}`);
                
                if (assignment && values.assignment) assignment.value = values.assignment;
                if (homework && values.homework) homework.value = values.homework;
                if (midterm && values.midterm) midterm.value = values.midterm;
                if (classwork && values.classwork) classwork.value = values.classwork;
                
                // Recalculate totals after restoring values
                calculateClassTotal(courseIndex);
            }, 10);
        }
    });
}

function generateExamScoreForm() {
    examScoreInputs.innerHTML = '';
    
    courses.forEach((course, courseIndex) => {
        const courseGroup = document.createElement('div');
        courseGroup.className = 'exam-score-group';
        
        const weightPercentage = includeClassAssessmentsCheckbox.checked ? classScoreConfig.examPercentage : 100;
        const weightInfo = includeClassAssessmentsCheckbox.checked 
            ? `This score will be weighted by ${weightPercentage}%`
            : `This score will carry 100% weight (no class assessments)`;
        
        courseGroup.innerHTML = `
            <h4><i class="fas fa-file-alt"></i> ${course}</h4>
            <div class="exam-score-input">
                <label for="exam-${courseIndex}">Exam Score:</label>
                <input type="number" id="exam-${courseIndex}" class="form-input" placeholder="0-100" min="0" max="100" onchange="calculateExamWeighted(${courseIndex})">
                <div class="weighted-info">${weightInfo}</div>
            </div>
        `;
        
        examScoreInputs.appendChild(courseGroup);
    });
}

function calculateClassTotal(courseIndex) {
    const assignment = parseInt(document.getElementById(`assignment-${courseIndex}`).value) || 0;
    const homework = parseInt(document.getElementById(`homework-${courseIndex}`).value) || 0;
    const midterm = parseInt(document.getElementById(`midterm-${courseIndex}`).value) || 0;
    const classwork = parseInt(document.getElementById(`classwork-${courseIndex}`).value) || 0;
    
    // Calculate total using raw scores (no percentages for individual components)
    // Only Mid-term uses 60% weighting, others use raw scores
    const classTotal = assignment + homework + (midterm * 0.60) + classwork;
    const finalWeighted = Math.round(classTotal * (classScoreConfig.classPercentage / 100) * 10) / 10;
    
    document.getElementById(`total-${courseIndex}`).textContent = Math.round(classTotal * 10) / 10;
    document.getElementById(`weighted-${courseIndex}`).textContent = finalWeighted;
}

function calculateExamWeighted(courseIndex) {
    const examScore = parseInt(document.getElementById(`exam-${courseIndex}`).value) || 0;
    const weighted = Math.round(examScore * (classScoreConfig.examPercentage / 100) * 10) / 10;
    
    // Update the weighted info
    const weightedInfo = document.querySelector(`#exam-${courseIndex}`).parentElement.querySelector('.weighted-info');
    weightedInfo.textContent = `Weighted Score (${classScoreConfig.examPercentage}%): ${weighted}`;
}

function validateClassAssessments() {
    for (let i = 0; i < courses.length; i++) {
        const assignment = parseInt(document.getElementById(`assignment-${i}`).value) || 0;
        const homework = parseInt(document.getElementById(`homework-${i}`).value) || 0;
        const midterm = parseInt(document.getElementById(`midterm-${i}`).value) || 0;
        const classwork = parseInt(document.getElementById(`classwork-${i}`).value) || 0;
        
        // Validate ranges for each assessment type
        if (assignment > 0 && (assignment < 1 || assignment > 20)) {
            showMessage(`Class test score must be between 1-20 for ${courses[i]}`, 'error');
            return false;
        }
        
        if (homework > 0 && (homework < 1 || homework > 10)) {
            showMessage(`Homework score must be between 1-10 for ${courses[i]}`, 'error');
            return false;
        }
        
        if (midterm > 0 && (midterm < 1 || midterm > 100)) {
            showMessage(`Mid-term score must be between 1-100 for ${courses[i]}`, 'error');
            return false;
        }
        
        if (classwork > 0 && (classwork < 1 || classwork > 10)) {
            showMessage(`Class work score must be between 1-10 for ${courses[i]}`, 'error');
            return false;
        }
        
        // Check if at least one score is entered
        if (assignment === 0 && homework === 0 && midterm === 0 && classwork === 0) {
            showMessage(`Please enter at least one class assessment score for ${courses[i]}`, 'error');
            return false;
        }
    }
    return true;
}

// Custom Grading System Management Functions
function saveCustomGradingSystem(systemName, creatorName) {
    const description = gradingSystemDescriptionInput.value.trim();
    const currentGrades = { ...gradingSystem.grades };
    
    const customSystem = {
        id: Date.now().toString(),
        name: systemName,
        creator: creatorName,
        description: description,
        grades: currentGrades,
        createdAt: new Date().toISOString(),
        type: 'custom'
    };
    
    // Get existing saved systems
    const savedSystems = JSON.parse(localStorage.getItem('examSystem_savedGradingSystems') || '[]');
    
    // Check if system name already exists
    const existingIndex = savedSystems.findIndex(system => system.name === systemName);
    if (existingIndex !== -1) {
        // Update existing system
        savedSystems[existingIndex] = customSystem;
        showMessage(`Grading system "${systemName}" updated successfully!`, 'success');
    } else {
        // Add new system
        savedSystems.push(customSystem);
        showMessage(`Grading system "${systemName}" saved successfully!`, 'success');
    }
    
    // Save to localStorage
    localStorage.setItem('examSystem_savedGradingSystems', JSON.stringify(savedSystems));
    
    // Clear form fields
    gradingSystemNameInput.value = '';
    creatorNameInput.value = '';
    gradingSystemDescriptionInput.value = '';
    
    // Refresh the saved systems list
    loadSavedGradingSystems();
}

function loadSavedGradingSystems() {
    const savedSystems = JSON.parse(localStorage.getItem('examSystem_savedGradingSystems') || '[]');
    
    if (savedSystems.length === 0) {
        savedGradingSystems.style.display = 'none';
        return;
    }
    
    savedGradingSystems.style.display = 'block';
    savedSystemsList.innerHTML = '';
    
    savedSystems.forEach(system => {
        const systemItem = document.createElement('div');
        systemItem.className = 'saved-system-item';
        systemItem.dataset.systemId = system.id;
        
        const gradeCount = Object.keys(system.grades).length;
        const gradeList = Object.keys(system.grades).join(', ');
        
        systemItem.innerHTML = `
            <div class="saved-system-header">
                <input type="radio" name="selectedSystem" value="${system.id}" id="system-${system.id}">
                <label for="system-${system.id}" class="saved-system-name">${system.name}</label>
                <span class="saved-system-creator">${system.creator}</span>
            </div>
            ${system.description ? `<div class="saved-system-description">${system.description}</div>` : ''}
            <div class="saved-system-details">
                <span class="saved-system-grades">${gradeCount} grades: ${gradeList}</span>
                <span class="saved-system-date">${new Date(system.createdAt).toLocaleDateString()}</span>
            </div>
        `;
        
        // Add click event to select the system
        systemItem.addEventListener('click', function(e) {
            if (e.target.type !== 'radio') {
                const radio = this.querySelector('input[type="radio"]');
                radio.checked = true;
                updateSystemSelectionButtons();
            }
        });
        
        // Add radio change event
        const radio = systemItem.querySelector('input[type="radio"]');
        radio.addEventListener('change', updateSystemSelectionButtons);
        
        savedSystemsList.appendChild(systemItem);
    });
}

function updateSystemSelectionButtons() {
    const selectedSystem = document.querySelector('input[name="selectedSystem"]:checked');
    
    if (selectedSystem) {
        loadGradingSystemBtn.disabled = false;
        deleteGradingSystemBtn.disabled = false;
    } else {
        loadGradingSystemBtn.disabled = true;
        deleteGradingSystemBtn.disabled = true;
    }
}

function loadSelectedGradingSystem() {
    const selectedSystem = document.querySelector('input[name="selectedSystem"]:checked');
    
    if (!selectedSystem) {
        showMessage('Please select a grading system to load', 'error');
        return;
    }
    
    const systemId = selectedSystem.value;
    const savedSystems = JSON.parse(localStorage.getItem('examSystem_savedGradingSystems') || '[]');
    const systemToLoad = savedSystems.find(system => system.id === systemId);
    
    if (!systemToLoad) {
        showMessage('Selected grading system not found', 'error');
        return;
    }
    
    // Load the grading system
    gradingSystem.type = 'custom';
    gradingSystem.grades = { ...systemToLoad.grades };
    
    // Update the form
    gradingSystemTypeSelect.value = 'custom';
    generateGradeRangesForm();
    updateGradingSystemDisplay();
    
    // Show custom naming fields
    customGradingNaming.style.display = 'block';
    
    // Populate the naming fields
    gradingSystemNameInput.value = systemToLoad.name;
    creatorNameInput.value = systemToLoad.creator;
    gradingSystemDescriptionInput.value = systemToLoad.description || '';
    
    showMessage(`Grading system "${systemToLoad.name}" loaded successfully!`, 'success');
}

function deleteSelectedGradingSystem() {
    const selectedSystem = document.querySelector('input[name="selectedSystem"]:checked');
    
    if (!selectedSystem) {
        showMessage('Please select a grading system to delete', 'error');
        return;
    }
    
    const systemId = selectedSystem.value;
    const savedSystems = JSON.parse(localStorage.getItem('examSystem_savedGradingSystems') || '[]');
    const systemToDelete = savedSystems.find(system => system.id === systemId);
    
    if (!systemToDelete) {
        showMessage('Selected grading system not found', 'error');
        return;
    }
    
    const confirmDelete = confirm(`Are you sure you want to delete the grading system "${systemToDelete.name}"? This action cannot be undone.`);
    
    if (confirmDelete) {
        // Remove the system
        const updatedSystems = savedSystems.filter(system => system.id !== systemId);
        localStorage.setItem('examSystem_savedGradingSystems', JSON.stringify(updatedSystems));
        
        // Refresh the list
        loadSavedGradingSystems();
        
        // Clear selection
        updateSystemSelectionButtons();
        
        showMessage(`Grading system "${systemToDelete.name}" deleted successfully!`, 'success');
    }
}

// Toggle class assessment inputs based on checkbox state
function toggleClassAssessmentInputs() {
    generateClassAssessmentForm();
}

// Initialize step navigation when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme
    initializeTheme();
    
    // Check authentication state
    checkAuthState();
    
    // Load saved data
    loadData();
    
    // Add event listeners
    
    // Ensure step 1 is visible by default
    if (step1Container && step2Container && step3Container) {
        goToStep1();
    }
});

// Theme Management Functions
function initializeTheme() {
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeToggle();
}

function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('examSystem_theme', currentTheme);
    updateThemeToggle();
}

function updateThemeToggle() {
    const icon = themeToggle.querySelector('i');
    const text = themeToggle.querySelector('span');
    
    if (currentTheme === 'dark') {
        icon.className = 'fas fa-moon';
        text.textContent = 'Dark';
    } else {
        icon.className = 'fas fa-sun';
        text.textContent = 'Light';
    }
} 