document.addEventListener("DOMContentLoaded", function () {
    console.log("Script loaded");

    // Sign-in Form
    const signinForm = document.getElementById('signin-form');
    if (signinForm) {
        signinForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            console.log("Sign-in triggered");

            const email = document.querySelector(".signin-email").value;
            const password = document.querySelector(".signin-password").value;

            const response = await fetch("http://localhost:3000/user/sign-in", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            console.log(data);

            if (response.ok) {
                alert("Sign-in successful!");
                window.location.href = "/home.html";
            } else {
                alert("Sign-in failed: " + data.message);
            }
        });
    } else {
        console.warn("Sign-in form not found");
    }

    // Sign-up Form
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            console.log("Sign-up triggered");

            const username = document.querySelector(".signup-username").value;
            const email = document.querySelector(".signup-email").value;
            const password = document.querySelector(".signup-password").value;

            const response = await fetch("http://localhost:3000/user/sign-up", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email, password }),
            });

            const data = await response.json();
            console.log(data);

            if (response.ok) {
                alert("Sign-up successful! Please log in.");
                window.location.href = "/";
            } else {
                alert("Sign-up failed: " + data.message);
            }
        });
    } else {
        console.warn("Sign-up form not found");
    }

    // Review Form
    const reviewForm = document.getElementById('reviewForm');
    const reviewsList = document.getElementById('reviewsList');
    const searchReviews = document.getElementById('searchReviews');

    if (reviewForm) {
        reviewForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            console.log("Review form triggered");

            const company = document.getElementById("company").value;
            const pros = document.getElementById("pros").value;
            const cons = document.getElementById("cons").value;
            const rating = document.querySelector('input[name="rating"]:checked')?.value || 0;

            try {
                await fetch("http://localhost:3000/review", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ company, pros, cons, rating })
                });

                renderReviews();
                reviewForm.reset();
            } catch (error) {
                console.error("Error adding review:", error);
            }
        });
    } else {
        console.warn("Review form not found");
    }

    // Fetch all reviews
    const fetchReviews = async () => {
        try {
            const response = await fetch("http://localhost:3000/review");
            const data = await response.json();
            return data.reviews || [];
        } catch (error) {
            console.error("Error fetching reviews:", error);
            return [];
        }
    };

    // Render reviews
    const renderReviews = async () => {
        if (!reviewsList) return;
        const reviews = await fetchReviews();
        reviewsList.innerHTML = "";

        reviews.forEach((review) => {
            console.log(review);
            const div = document.createElement("div");
            div.classList.add("card", "p-3", "mb-3");
            div.innerHTML = `
                <h5>
                    ${review.company} - 
                    ${"★".repeat(Math.floor(review.rating))}  
                    ${review.rating % 1 !== 0 ? '<span class="half-star">☆</span>' : ''} 
                    ${"☆".repeat(Math.max(0, 5 - Math.ceil(review.rating)))} 
                </h5>
                <p><strong>Pros:</strong> ${review.pros}</p>
                <p><strong>Cons:</strong> ${review.cons}</p>
            `;
            reviewsList.appendChild(div);
        });
    };

    if (reviewsList) {
        renderReviews();
    }

    // Search reviews
    if (searchReviews) {
        searchReviews.addEventListener("input", async (e) => {
            const query = e.target.value.toLowerCase();
            const reviews = await fetchReviews();
            const filteredReviews = reviews.filter((review) =>
                review.company.toLowerCase().includes(query)
            );
            reviewsList.innerHTML = "";

            filteredReviews.forEach((review) => {
                const safeRating = Math.max(1, Math.min(5, review.rating || 1));
                const div = document.createElement("div");
                div.classList.add("card", "p-3", "mb-3");
                div.innerHTML = `
                    <h5>${review.company} - ${"★".repeat(safeRating)}${"☆".repeat(5 - safeRating)}</h5>
                    <p><strong>Pros:</strong> ${review.pros}</p>
                    <p><strong>Cons:</strong> ${review.cons}</p>
                `;
                reviewsList.appendChild(div);
            });
        });
    }
});
