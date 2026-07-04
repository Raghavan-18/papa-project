import { auth } from "./firebase.js";
import { getUserData } from "./firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

document.addEventListener('DOMContentLoaded', () => {
    const chatMessages = document.getElementById('chatMessages');
    const messageInput = document.getElementById('messageInput');
    const sendBtn = document.getElementById('sendBtn');
    const typingMessage = document.getElementById('typingMessage');
    const typingIndicator = document.getElementById('typingIndicator');

    let currentUserData = null;

    // Listen to Auth State
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            try {
                currentUserData = await getUserData(user.uid);
                addBotMessage(`Hello ${currentUserData?.fullName || 'there'}! I'm your AI assistant. I've analyzed your profile (Occupation: ${currentUserData?.occupation || 'Not set'}, State: ${currentUserData?.state || 'Not set'}). How can I help you find schemes today? Try asking "What schemes am I eligible for?"`);
            } catch (err) {
                addBotMessage(window.chatbotResponses.greetings[0]);
            }
        } else {
            addBotMessage(window.chatbotResponses.greetings[0]);
        }
    });

    // Event Listeners
    sendBtn.addEventListener('click', handleSend);
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    });

    async function handleSend() {
        const text = messageInput.value.trim();
        if (!text) return;

        // Add user message
        addUserMessage(text);
        messageInput.value = '';

        // Show typing indicator
        showTypingIndicator();

        // Simulate AI processing delay
        setTimeout(async () => {
            hideTypingIndicator();
            const response = await getBotResponse(text.toLowerCase());
            addBotMessage(response);
        }, 1500 + Math.random() * 1000);
    }

    function addUserMessage(text) {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'message user';
        msgDiv.innerHTML = `<div class="message-bubble">${text}</div>`;
        chatMessages.insertBefore(msgDiv, typingMessage);
        scrollToBottom();
    }

    function addBotMessage(text) {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'message bot';
        msgDiv.innerHTML = `
            <div class="message-icon"><i class="fa-solid fa-robot"></i></div>
            <div class="message-bubble">${text}</div>
        `;
        chatMessages.insertBefore(msgDiv, typingMessage);
        scrollToBottom();
    }

    function showTypingIndicator() {
        typingMessage.style.display = 'flex';
        typingIndicator.classList.add('active');
        scrollToBottom();
    }

    function hideTypingIndicator() {
        typingMessage.style.display = 'none';
        typingIndicator.classList.remove('active');
    }

    function scrollToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    async function getBotResponse(input) {
        const schemes = window.schemesData || [];

        // 1. Personalized request matching (if user asks for their specific schemes)
        if (currentUserData && (input.includes('for me') || input.includes('my profile') || input.includes('am i eligible') || input.includes('suggest') || input.includes('recommend'))) {
            const userOcc = (currentUserData.occupation || '').toLowerCase();
            const userState = (currentUserData.state || '').toLowerCase();
            
            let recommended = schemes.filter(s => {
                const textToSearch = JSON.stringify(s).toLowerCase();
                // Simple matching: if the scheme data mentions the user's occupation or state
                return (userOcc && textToSearch.includes(userOcc)) || (userState && textToSearch.includes(userState));
            });

            if (recommended.length > 0) {
                let response = `Based on your profile as a <b>${userOcc || 'citizen'}</b> in <b>${userState || 'India'}</b>, I found ${recommended.length} scheme(s) tailored for you:<br><br>`;
                recommended.slice(0, 3).forEach(scheme => {
                    response += `<strong>${scheme.title}</strong> (${scheme.category})<br>
                                 <span style="font-size: 0.85em; color: var(--gray-text);">${scheme.description}</span><br>
                                 <a href="${scheme.website}" target="_blank" style="color: var(--accent-cyan); text-decoration: underline; font-size: 0.9em;">View Details / Apply</a><br><br>`;
                });
                return response;
            } else {
                return `Based on your profile, I couldn't find exact matches for your specific occupation or state. However, many schemes are generally applicable. Could you tell me more about what you need? (e.g. loans, education, agriculture)`;
            }
        }

        // 2. Deep Search Integration (Checks benefits, documents, and eligibility arrays)
        let matchingSchemes = schemes.filter(scheme => {
            const titleMatch = scheme.title.toLowerCase().includes(input);
            const catMatch = scheme.category.toLowerCase().includes(input);
            const descMatch = scheme.description.toLowerCase().includes(input);
            const subCatMatch = scheme.subCategory && scheme.subCategory.toLowerCase().includes(input);
            
            const benefitsMatch = scheme.benefits && scheme.benefits.some(b => b.toLowerCase().includes(input));
            const docsMatch = scheme.documents && scheme.documents.some(d => d.toLowerCase().includes(input));
            const eligMatch = scheme.eligibilityCriteria && scheme.eligibilityCriteria.some(e => e.toLowerCase().includes(input));

            return titleMatch || catMatch || descMatch || subCatMatch || benefitsMatch || docsMatch || eligMatch;
        });
        
        // 3. Fallback broad keyword mapping
        if (matchingSchemes.length === 0) {
            if (input.includes('farmer') || input.includes('agriculture') || input.includes('crop') || input.includes('farm')) {
                matchingSchemes = schemes.filter(s => s.category === 'Farmer');
            } else if (input.includes('student') || input.includes('education') || input.includes('scholarship') || input.includes('school') || input.includes('college')) {
                matchingSchemes = schemes.filter(s => s.category === 'Student');
            } else if (input.includes('woman') || input.includes('women') || input.includes('girl')) {
                matchingSchemes = schemes.filter(s => s.category === 'Women');
            } else if (input.includes('health') || input.includes('medical') || input.includes('doctor') || input.includes('hospital')) {
                matchingSchemes = schemes.filter(s => s.category === 'Healthcare');
            } else if (input.includes('environment') || input.includes('water') || input.includes('tree') || input.includes('green')) {
                matchingSchemes = schemes.filter(s => s.category === 'Environment');
            }
        }

        // 4. Format and Return Response
        if (matchingSchemes.length > 0) {
            let response = `I analyzed all available scheme information (including benefits, eligibility, and documents) and found ${matchingSchemes.length} matching scheme(s) for your query:<br><br>`;
            // Limit to top 3
            matchingSchemes.slice(0, 3).forEach(scheme => {
                response += `<strong>${scheme.title}</strong><br>
                             <span style="font-size: 0.85em; color: var(--gray-text);">${scheme.description}</span><br>
                             <a href="${scheme.website}" target="_blank" style="color: var(--accent-cyan); text-decoration: underline; font-size: 0.9em;">View Details / Apply</a><br><br>`;
            });
            if (matchingSchemes.length > 3) {
                response += `<a href="results.html" style="color: var(--primary-blue);">View all ${matchingSchemes.length} matching schemes...</a>`;
            }
            return response;
        }

        // 5. Default/Greetings
        if (input.includes('hello') || input.includes('hi')) {
            return window.chatbotResponses.greetings[1];
        } else {
            return "I couldn't find a specific scheme for that. I can search through scheme benefits, required documents, and eligibility criteria! Try asking about something specific like 'Aadhaar Card', '₹6000', or 'scholarship'.";
        }
    }
});
