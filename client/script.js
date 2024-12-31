document.getElementById("storyForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const gender = document.getElementById("gender").value;
    const topic = document.getElementById("topic").value;

    if (!gender || !topic) {
        alert("Please fill in all fields.");
        return;
    }

    try {
        // Make API request to the backend server
        const response = await fetch(`http://3.109.55.138:7000/?gender=${gender}&topic=${encodeURIComponent(topic)}`);
        const story = await response.text();

        // Display the generated story
        document.getElementById("storyOutput").innerHTML = story;

    } catch (error) {
        console.error("Error generating story:", error);
        alert("Something went wrong. Please try again later.");
    }
});
