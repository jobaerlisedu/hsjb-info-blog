// Social Share Button Integration
// Automatically adds Facebook, LinkedIn, and X share buttons to all post cards

document.addEventListener('DOMContentLoaded', function () {
    const BASE_URL = 'https://enablement.info/';

    // Find all post cards
    const postCards = document.querySelectorAll('.post-card');

    postCards.forEach(card => {
        // Find the "Read Article" link
        const readMoreLink = card.querySelector('a.read-more');

        if (readMoreLink) {
            const articleUrl = readMoreLink.getAttribute('href');
            const fullUrl = BASE_URL + articleUrl;
            const encodedUrl = encodeURIComponent(fullUrl);

            // Create the card-actions container
            const cardActions = document.createElement('div');
            cardActions.className = 'card-actions';

            // Move the read-more link into card-actions
            const readMoreClone = readMoreLink.cloneNode(true);
            cardActions.appendChild(readMoreClone);

            // Create share group
            const shareGroup = document.createElement('div');
            shareGroup.className = 'share-group';

            // Facebook share button
            const fbBtn = document.createElement('a');
            fbBtn.href = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
            fbBtn.target = '_blank';
            fbBtn.className = 'share-btn fb';
            fbBtn.title = 'Share on Facebook';
            fbBtn.innerHTML = "<i class='bx bxl-facebook'></i>";
            shareGroup.appendChild(fbBtn);

            // LinkedIn share button
            const liBtn = document.createElement('a');
            liBtn.href = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
            liBtn.target = '_blank';
            liBtn.className = 'share-btn li';
            liBtn.title = 'Share on LinkedIn';
            liBtn.innerHTML = "<i class='bx bxl-linkedin'></i>";
            shareGroup.appendChild(liBtn);

            // X (Twitter) share button
            const xBtn = document.createElement('a');
            xBtn.href = `https://twitter.com/intent/tweet?url=${encodedUrl}`;
            xBtn.target = '_blank';
            xBtn.className = 'share-btn x';
            xBtn.title = 'Share on X';
            xBtn.innerHTML = "<i class='bx bxl-twitter'></i>";
            shareGroup.appendChild(xBtn);

            // Add share group to card actions
            cardActions.appendChild(shareGroup);

            // Replace the original read-more link with the card-actions container
            readMoreLink.parentNode.replaceChild(cardActions, readMoreLink);
        }
    });
});
