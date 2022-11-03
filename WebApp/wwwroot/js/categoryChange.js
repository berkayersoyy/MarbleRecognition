function categoryChange(event) {
    var category = event.target.value;
    if (category == "popular") {
        getPopularPosts();
        return;
    }
    if (category == "answeredByUser") {
        getPostsByAnsweredByUser();
        return;
    }
    if (category == "shuffledPosts"){
        getShuffledPosts();
        return;
    }
    var categoryId = parseInt(category);
    getPostsByCategoryId(categoryId);
}