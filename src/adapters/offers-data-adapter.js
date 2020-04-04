class OffersDataAdapter {
  constructor(offerData) {
    this.id = offerData[`id`];
    this.city = offerData[`city`];
    this.previewImage = offerData[`preview_image`];
    this.images = offerData[`images`];
    this.title = offerData[`title`];
    this.isFavorite = offerData[`is_favorite`];
    this.isPremium = offerData[`is_premium`];
    this.rating = offerData[`rating`];
    this.type = offerData[`type`];
    this.bedrooms = offerData[`bedrooms`];
    this.maxAdults = offerData[`max_adults`];
    this.price = offerData[`price`];
    this.goods = offerData[`goods`];
    this.host = {
      id: offerData.host[`id`],
      name: offerData.host[`name`],
      isPro: offerData.host[`is_pro`],
      avatarUrl: offerData.host[`avatar_url`],
    };
    this.description = offerData[`description`];
    this.location = offerData[`location`];
  }

  static parseOffer(offerData) {
    return new OffersDataAdapter(offerData);
  }

  static parseOffers(offers) {
    return offers.map(OffersDataAdapter.parseOffer);
  }
}

export default OffersDataAdapter;
