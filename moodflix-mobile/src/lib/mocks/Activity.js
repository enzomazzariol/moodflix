export const activities = [
  {
    type: "like",
    user: {
      name: "Enzo Mazzariol",
      avatar: "https://picsum.photos/id/1/200/300",
    },
    movie: { title: "The Shawshank Redemption", id: "278" },
    createdAt: "3h",
  },
  {
    type: "watchlist",
    user: {
      name: "Jackson Esponja",
      avatar: "https://picsum.photos/id/10/200/300",
    },
    movie: { title: "Star Wars: The Force Awakens", id: "140607" },
    createdAt: "5h",
  },
  {
    type: "review",
    user: {
      name: "Roberto Hernandez",
      avatar: "https://picsum.photos/id/11/200/300",
    },
    movie: {
      title: "The Godfather: Part II",
      id: "240",
      posterPath: "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    },
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit +\n" +
      "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\n",
    rating: 4,
    createdAt: "6h",
  },
  {
    type: "watchlist",
    user: {
      name: "Jackson Esponja",
      avatar: "https://picsum.photos/id/10/200/300",
    },
    movie: { title: "Star Wars: The Force Awakens", id: "140607" },
    createdAt: "5h",
  },
];
