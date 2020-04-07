class ReviewsDataAdapter {
  constructor(reviewData) {
    this.id = reviewData[`id`];
    this.text = reviewData[`comment`];
    this.rating = reviewData[`rating`];
    this.date = reviewData[`date`];
    this.user = {
      id: reviewData.user[`id`],
      name: reviewData.user[`name`],
      isPro: reviewData.user[`is_pro`],
      avatarUrl: reviewData.user[`avatar_url`],
    };
  }

  static parseReviews(reviews) {
    return reviews.map((review) => new ReviewsDataAdapter(review));
  }
}

export default ReviewsDataAdapter;
