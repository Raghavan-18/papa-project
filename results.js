document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('schemesContainer');
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const sortFilter = document.getElementById('sortFilter');

    // Initial Render
    renderSchemes(schemesData);

    // Event Listeners for Filters
    searchInput.addEventListener('input', applyFilters);
    categoryFilter.addEventListener('change', applyFilters);
    sortFilter.addEventListener('change', applyFilters);

    function applyFilters() {
        let filtered = [...schemesData];
        
        // 1. Search filter
        const searchTerm = searchInput.value.toLowerCase();
        if (searchTerm) {
            filtered = filtered.filter(scheme => 
                scheme.title.toLowerCase().includes(searchTerm) || 
                scheme.description.toLowerCase().includes(searchTerm)
            );
        }

        // 2. Category filter
        const category = categoryFilter.value;
        if (category !== 'all') {
            filtered = filtered.filter(scheme => scheme.category === category);
        }

        // 3. Sort
        const sortVal = sortFilter.value;
        if (sortVal === 'match_high') {
            filtered.sort((a, b) => b.eligibility - a.eligibility);
        } else if (sortVal === 'match_low') {
            filtered.sort((a, b) => a.eligibility - b.eligibility);
        } else if (sortVal === 'deadline') {
            // Simplistic string sort for date
            filtered.sort((a, b) => {
                if (a.deadline === 'Ongoing') return 1;
                if (b.deadline === 'Ongoing') return -1;
                return a.deadline.localeCompare(b.deadline);
            });
        }

        renderSchemes(filtered);
    }

    function renderSchemes(schemes) {
        container.innerHTML = '';
        
        if (schemes.length === 0) {
            container.innerHTML = `
                <div class="no-results">
                    <i class="fa-solid fa-folder-open" style="font-size: 3rem; margin-bottom: 20px; color: var(--card-border);"></i>
                    <h3>No Schemes Found</h3>
                    <p>Try adjusting your search or filters.</p>
                </div>
            `;
            return;
        }

        schemes.forEach((scheme, index) => {
            // Create a slight staggered animation delay based on index
            const delay = index * 0.1;
            
            const card = document.createElement('div');
            card.className = 'glass-card scheme-card reveal active';
            card.style.animationDelay = `${delay}s`;
            
            // Format benefits
            const benefitsHtml = scheme.benefits.slice(0,2).map(b => `<li><i class="fa-solid fa-check"></i> ${b}</li>`).join('');

            card.innerHTML = `
                <div class="eligibility-badge">${scheme.eligibility}% Match</div>
                <span class="category-tag">${scheme.category}</span>
                <h3>${scheme.title}</h3>
                <div class="scheme-info">
                    <p>${scheme.description}</p>
                    <ul class="info-list">
                        ${benefitsHtml}
                    </ul>
                    <div style="font-size: 0.85rem; color: var(--gray-text); margin-top: 15px;">
                        <i class="fa-regular fa-calendar"></i> Deadline: <strong>${scheme.deadline}</strong>
                    </div>
                </div>
                <div class="card-actions">
                    <button class="btn btn-save" onclick="saveScheme(${scheme.id})">
                        <i class="fa-regular fa-bookmark"></i> Save
                    </button>
                    <a href="${scheme.website}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-glow">
                        Apply Now
                    </a>
                </div>
            `;
            
            container.appendChild(card);
        });
    }
});

function saveScheme(id) {
    alert('Scheme saved to your profile!');
    // In a real app, we'd save this to localStorage or backend
}
