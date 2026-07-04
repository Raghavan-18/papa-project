import { auth } from "./firebase.js";
import { getUserData, updateUserData } from "./firestore.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

document.addEventListener('DOMContentLoaded', () => {
    // Local toast function
    function showToast(message, isError = false) {
        const toast = document.getElementById('toast');
        if(!toast) return;
        toast.textContent = message;
        if (isError) {
            toast.style.background = '#ef4444';
        } else {
            toast.style.background = 'var(--primary-blue)';
        }
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3000);
    }
    
    // Check authentication state
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            // User is signed in
            console.log("User is signed in:", user.uid);
            
            // Load user data from Firestore
            try {
                let userData = await getUserData(user.uid);
                
                if (!userData) {
                    // Fallback to basic auth info if Firestore doc doesn't exist
                    userData = {
                        fullName: user.displayName || 'User',
                        email: user.email,
                    };
                }
                
                // Populate Dashboard UI
                const nameDisplay = document.getElementById('profileNameDisplay');
                const subtextDisplay = document.getElementById('profileSubtextDisplay');
                const avatar = document.getElementById('profileAvatar');
                
                if (nameDisplay) nameDisplay.textContent = userData.fullName || 'User';
                if (avatar) avatar.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.fullName || 'User')}&background=2563eb&color=fff&size=150`;
                if (subtextDisplay) {
                    let subtext = [];
                    if (userData.occupation) subtext.push(userData.occupation);
                    if (userData.state) subtext.push(userData.state);
                    subtextDisplay.textContent = subtext.length > 0 ? subtext.join(' | ') : 'No details provided';
                }
                
                // Populate Form Fields
                const nameInput = document.getElementById('profileNameInput');
                const emailInput = document.getElementById('profileEmailInput');
                const phoneInput = document.getElementById('profilePhoneInput');
                const stateInput = document.getElementById('profileStateInput');
                const occupationInput = document.getElementById('profileOccupationInput');
                const incomeInput = document.getElementById('profileIncomeInput');
                
                if (nameInput) nameInput.value = userData.fullName || '';
                if (emailInput) emailInput.value = userData.email || user.email || '';
                if (phoneInput) phoneInput.value = userData.phone || '';
                if (stateInput) stateInput.value = userData.state || '';
                if (occupationInput) occupationInput.value = userData.occupation || '';
                if (incomeInput) incomeInput.value = userData.annualIncome || '';
                
            } catch (error) {
                console.error("Error fetching user data for dashboard:", error);
                const subtextDisplay = document.getElementById('profileSubtextDisplay');
                if (subtextDisplay) subtextDisplay.textContent = 'Error loading details';
            }
        } else {
            // User is signed out, redirect to login
            window.location.href = 'login.html';
        }
    });

    // Logout functionality
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async () => {
            try {
                await signOut(auth);
                // Redirect will happen via onAuthStateChanged, but can explicitly redirect:
                window.location.href = 'login.html';
            } catch (error) {
                console.error("Error signing out:", error);
                alert("Error signing out. Please try again.");
            }
        });
    }

    // Save Profile functionality
    const saveProfileBtn = document.getElementById('saveProfileBtn');
    if (saveProfileBtn) {
        saveProfileBtn.addEventListener('click', async () => {
            const user = auth.currentUser;
            if (!user) {
                showToast("You must be logged in to save changes.", true);
                return;
            }

            const updatedData = {
                fullName: document.getElementById('profileNameInput')?.value || '',
                phone: document.getElementById('profilePhoneInput')?.value || '',
                state: document.getElementById('profileStateInput')?.value || '',
                occupation: document.getElementById('profileOccupationInput')?.value || '',
                annualIncome: document.getElementById('profileIncomeInput')?.value || ''
            };

            try {
                const prevBtnText = saveProfileBtn.textContent;
                saveProfileBtn.textContent = 'Saving...';
                
                await updateUserData(user.uid, updatedData);
                
                // Update UI right away
                const nameDisplay = document.getElementById('profileNameDisplay');
                const subtextDisplay = document.getElementById('profileSubtextDisplay');
                const avatar = document.getElementById('profileAvatar');
                if (nameDisplay) nameDisplay.textContent = updatedData.fullName || 'User';
                if (avatar) avatar.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(updatedData.fullName || 'User')}&background=2563eb&color=fff&size=150`;
                if (subtextDisplay) {
                    let subtext = [];
                    if (updatedData.occupation) subtext.push(updatedData.occupation);
                    if (updatedData.state) subtext.push(updatedData.state);
                    subtextDisplay.textContent = subtext.length > 0 ? subtext.join(' | ') : 'No details provided';
                }
                
                showToast("Profile updated successfully!");
                saveProfileBtn.textContent = prevBtnText;
            } catch (error) {
                console.error("Error updating profile:", error);
                showToast("Error updating profile. Please try again.", true);
                saveProfileBtn.textContent = 'Save Changes';
            }
        });
    }
});
