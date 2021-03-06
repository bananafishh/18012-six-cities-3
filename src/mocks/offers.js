export default {
  Amsterdam: {
    city: {
      name: `Amsterdam`,
      coords: [52.37403, 4.88969],
    },
    offers: [
      {
        id: 1,
        title: `Luxe 1-Bedroom Flat Near Manhattan`,
        type: `apartment`,
        price: 120,
        pictures: [
          `https://placeimg.com/260/200/arch/${Math.random()}`,
          `https://placeimg.com/260/200/arch/${Math.random()}`,
          `https://placeimg.com/260/200/arch/${Math.random()}`,
          `https://placeimg.com/260/200/arch/${Math.random()}`,
          `https://placeimg.com/260/200/arch/${Math.random()}`,
          `https://placeimg.com/260/200/arch/${Math.random()}`,
        ],
        rating: 4.5,
        isPremium: true,
        isBookmarked: false,
        description: `This is a unique and lovely apartment located in the heart of the Manhattan. Its truly original interior design will help you to experience New-York's unforgettable charm.
        The apartment is very clean. It has high ceilings, TV set with a selection of movies to enjoy on a rainy day, hi-fi system, high speed wi-fi and a tiny but fully-equipped kitchenette.`,
        bedroomsCount: 1,
        guestsCountMax: 2,
        householdItems: [
          `Wi-Fi`,
          `Washing machine`,
          `Towels`,
          `Heating`,
          `Coffee machine`,
          `Kitchen`,
          `Dishwasher`,
          `Cabel TV`,
          `Fridge`,
        ],
        host: {
          picture: `https://api.adorable.io/avatars/128/${Math.random()}`,
          name: `Abott`,
          isSuper: true,
        },
        coords: [52.3909553943508, 4.85309666406198],
        reviews: [
          {
            id: 1,
            text: `Excellent location in a charming building. It’s about the size of a typical hotel room and 
            perhaps a little smaller than Airbnb places tend to be overall. Would recommend though as it’s 
            a great value and location.`,
            rating: 5,
            date: new Date(`2020-02-15`),
            user: {
              name: `Steven`,
              picture: `https://api.adorable.io/avatars/128/${Math.random()}`,
            },
          },
          {
            id: 2,
            text: `Apartment was very pretty and quaint! Location was excellent , very close to the main 
            sights in Porto. Abott greeted us and was very helpful, gave us some great tips.`,
            rating: 4,
            date: new Date(`2020-03-15`),
            user: {
              name: `Monica`,
              picture: `https://api.adorable.io/avatars/128/${Math.random()}`,
            },
          },
        ],
      },
      {
        id: 2,
        title: `Bright & Airy in Highland Park`,
        type: `house`,
        price: 200,
        pictures: [
          `https://placeimg.com/260/200/arch/${Math.random()}`,
          `https://placeimg.com/260/200/arch/${Math.random()}`,
          `https://placeimg.com/260/200/arch/${Math.random()}`,
          `https://placeimg.com/260/200/arch/${Math.random()}`,
          `https://placeimg.com/260/200/arch/${Math.random()}`,
          `https://placeimg.com/260/200/arch/${Math.random()}`,
        ],
        rating: 3.9,
        isPremium: false,
        isBookmarked: true,
        description: `Wake up in the heart of the city, surrounded by city's most popular sights and attractions. Eat a hearty breakfast, then curl up with a coffee next to the floor-to-ceiling windows and soak up the Aussie sun & City views. Be ready to discover Sydney.
        The apartment is in the prime sought-after location and offers luxury, comfort, space & security. For 5th & 6th guest the sofa bed in the living room will be set.`,
        bedroomsCount: 2,
        guestsCountMax: 4,
        householdItems: [
          `Wi-Fi`,
          `Washing machine`,
          `Heating`,
          `Coffee machine`,
          `Kitchen`,
          `Fridge`,
        ],
        host: {
          picture: `https://api.adorable.io/avatars/128/${Math.random()}`,
          name: `Alice`,
          isSuper: true,
        },
        coords: [52.369553943508, 4.85309666406198],
        reviews: [
          {
            id: 1,
            text: `Excellent location in a charming building. It’s about the size of a typical hotel room and 
            perhaps a little smaller than Airbnb places tend to be overall. Would recommend though as it’s 
            a great value and location.`,
            rating: 5,
            date: new Date(`2020-02-15`),
            user: {
              name: `Steven`,
              picture: `https://api.adorable.io/avatars/128/${Math.random()}`,
            },
          },
        ],
      },
    ],
  },
  Paris: {
    city: {
      name: `Paris`,
      coords: [48.85341, 2.3488],
    },
    offers: [
      {
        id: 3,
        title: `Cozy Parkside Studio in the ❤ of the East Village`,
        type: `hotel`,
        price: 500,
        pictures: [
          `https://placeimg.com/260/200/arch/${Math.random()}`,
          `https://placeimg.com/260/200/arch/${Math.random()}`,
          `https://placeimg.com/260/200/arch/${Math.random()}`,
          `https://placeimg.com/260/200/arch/${Math.random()}`,
          `https://placeimg.com/260/200/arch/${Math.random()}`,
          `https://placeimg.com/260/200/arch/${Math.random()}`,
        ],
        rating: 5,
        isPremium: true,
        isBookmarked: true,
        description: `Awaken in a comfy queen size bed, ready to explore nearby attractions. Everything needed is readily at hand in this cozy space. Start the day with a quick breakfast in a compact kitchen, then refresh under a rain shower in a gleaming white bathroom.
        Please note that this unit is located above a late night bar, which may add to the charm of it for some but may also pose to be a noise nuisance for light sleepers. We encourage you to read the reviews of past guests to make an informed decision.`,
        bedroomsCount: 3,
        guestsCountMax: 7,
        householdItems: [
          `Wi-Fi`,
          `Heating`,
          `Coffee machine`,
          `Kitchen`,
          `Dishwasher`,
          `Cabel TV`,
          `Fridge`,
        ],
        host: {
          picture: `https://api.adorable.io/avatars/128/${Math.random()}`,
          name: `John`,
          isSuper: false,
        },
        coords: [48.830943, 2.270875],
        reviews: [
          {
            id: 2,
            text: `Apartment was very pretty and quaint! Location was excellent , very close to the main 
            sights in Porto. Abott greeted us and was very helpful, gave us some great tips.`,
            rating: 4,
            date: new Date(`2020-03-15`),
            user: {
              name: `Monica`,
              picture: `https://api.adorable.io/avatars/128/${Math.random()}`,
            }
          },
        ],
      },
    ],
  },
  Brussels: {
    city: {
      name: `Brussels`,
      coords: [50.85045, 4.34878],
    },
    offers: [
      {
        id: 4,
        title: `Sunny, Modern room in East Village!`,
        type: `room`,
        price: 80,
        pictures: [
          `https://placeimg.com/260/200/arch/${Math.random()}`,
          `https://placeimg.com/260/200/arch/${Math.random()}`,
          `https://placeimg.com/260/200/arch/${Math.random()}`,
          `https://placeimg.com/260/200/arch/${Math.random()}`,
          `https://placeimg.com/260/200/arch/${Math.random()}`,
          `https://placeimg.com/260/200/arch/${Math.random()}`,
        ],
        rating: 2.5,
        isPremium: false,
        isBookmarked: false,
        description: `Whip up tasty home-cooked meals in this chic, modern condo. Though cozy in size, the open-plan layout maximizes on space. You’ll have everything you need for the duration of your stay including a patio and great local attractions.`,
        bedroomsCount: 2,
        guestsCountMax: 2,
        householdItems: [
          `Wi-Fi`,
          `Heating`,
          `Kitchen`,
          `Dishwasher`,
          `Cabel TV`,
          `Fridge`,
        ],
        host: {
          picture: `https://api.adorable.io/avatars/128/${Math.random()}`,
          name: `Kate`,
          isSuper: false,
        },
        coords: [50.837329, 4.373417],
        reviews: [],
      },
    ],
  },
};
