class UserDataAdapter {
  constructor(data) {
    this.id = data[`id`];
    this.name = data[`name`];
    this.email = data[`email`];
    this.avatarUrl = data[`avatar_url`];
    this.isPro = data[`is_pro`];
  }

  static parseData(data) {
    return new UserDataAdapter(data);
  }
}

export default UserDataAdapter;
